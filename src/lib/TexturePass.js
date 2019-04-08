import * as THREE from 'three';

import Pass from './Pass';
import CopyShader from './CopyShader';


export default class TexturePass extends Pass {

	constructor( map, opacity ) {

		super();

		const shader = CopyShader;

		this.map = map;
		this.opacity = ( opacity !== undefined ) ? opacity : 1.0;

		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

		this.material = new THREE.ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			depthTest: false,
			depthWrite: false,

		} );

		this.needsSwap = false;

		this.fsQuad = new Pass.FullScreenQuad( null );

	}


	render( _renderer, writeBuffer, readBuffer ) {

		const renderer = _renderer;

		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		this.fsQuad.material = this.material;

		this.uniforms.opacity.value = this.opacity;
		this.uniforms.tDiffuse.value = this.map;
		this.material.transparent = ( this.opacity < 1.0 );

		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );
		if ( this.clear ) renderer.clear();
		this.fsQuad.render( renderer );

		renderer.autoClear = oldAutoClear;

	}

}
