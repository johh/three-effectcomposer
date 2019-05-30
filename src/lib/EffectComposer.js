/* eslint-disable no-underscore-dangle */

import * as THREE from 'three';

import ShaderPass from './ShaderPass';
import CopyShader from './CopyShader';
import MaskPass from './MaskPass';
import ClearMaskPass from './ClearMaskPass';


export default class EffectComposer {

	constructor( renderer, _renderTarget ) {

		let renderTarget = _renderTarget;

		this.renderer = renderer;

		if ( renderTarget === undefined ) {

			const parameters = {
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBAFormat,
				stencilBuffer: false,
			};

			const size = renderer.getSize( new THREE.Vector2() );
			this._pixelRatio = renderer.getPixelRatio();
			this._width = size.width;
			this._height = size.height;

			renderTarget = new THREE.WebGLRenderTarget(
				this._width * this._pixelRatio,
				this._height * this._pixelRatio,
				parameters,
			);

			renderTarget.texture.name = 'EffectComposer.rt1';

		} else {

			this._pixelRatio = 1;
			this._width = renderTarget.width;
			this._height = renderTarget.height;

		}

		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();
		this.renderTarget2.texture.name = 'EffectComposer.rt2';

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

		this.renderToScreen = true;

		this.passes = [];

		this.copyPass = new ShaderPass( CopyShader );

		this.clock = new THREE.Clock();

	}


	swapBuffers() {

		const tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;

	}


	addPass( pass ) {

		this.passes.push( pass );

		const size = this.renderer.getDrawingBufferSize( new THREE.Vector2() );
		pass.setSize( size.width, size.height );

	}


	insertPass( pass, index ) {

		this.passes.splice( index, 0, pass );

	}


	isLastEnabledPass( passIndex ) {

		for ( let i = passIndex + 1; i < this.passes.length; i += 1 ) {

			if ( this.passes[ i ].enabled ) {

				return false;

			}

		}

		return true;

	}


	render( deltaTime = this.clock.getDelta() ) {

		// deltaTime value is in seconds

		const currentRenderTarget = this.renderer.getRenderTarget();

		let maskActive = false;

		let pass;
		let i;
		const il = this.passes.length;

		for ( i = 0; i < il; i += 1 ) {

			pass = this.passes[ i ];

			if ( pass.enabled !== false ) {

				pass.renderToScreen = ( this.renderToScreen && this.isLastEnabledPass( i ) );
				pass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive );

				if ( pass.needsSwap ) {

					if ( maskActive ) {

						const { context } = this.renderer;

						context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

						this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime );

						context.stencilFunc( context.EQUAL, 1, 0xffffffff );

					}

					this.swapBuffers();

				}

			}


			if ( pass instanceof MaskPass ) {

				maskActive = true;

			} else if ( pass instanceof ClearMaskPass ) {

				maskActive = false;

			}


		}

		this.renderer.setRenderTarget( currentRenderTarget );

	}


	reset( _renderTarget ) {

		let renderTarget = _renderTarget;

		if ( renderTarget === undefined ) {

			const size = this.renderer.getSize( new THREE.Vector2() );
			this._pixelRatio = this.renderer.getPixelRatio();
			this._width = size.width;
			this._height = size.height;

			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize(
				this._width * this._pixelRatio,
				this._height * this._pixelRatio,
			);

		}

		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

	}


	setSize( width, height ) {

		this._width = width;
		this._height = height;

		const effectiveWidth = this._width * this._pixelRatio;
		const effectiveHeight = this._height * this._pixelRatio;

		this.renderTarget1.setSize( effectiveWidth, effectiveHeight );
		this.renderTarget2.setSize( effectiveWidth, effectiveHeight );

		for ( let i = 0; i < this.passes.length; i += 1 ) {

			this.passes[ i ].setSize( effectiveWidth, effectiveHeight );

		}

	}


	setPixelRatio( pixelRatio ) {

		this._pixelRatio = pixelRatio;

		this.setSize( this._width, this._height );

	}

}
