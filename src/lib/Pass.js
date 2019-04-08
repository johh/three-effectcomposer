/* eslint-disable no-underscore-dangle */

import {
	OrthographicCamera,
	PlaneBufferGeometry,
	Mesh,
} from 'three';


const camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
const geometry = new PlaneBufferGeometry( 2, 2 );


class _FullScreenQuad {

	constructor( material ) {

		this._mesh = new Mesh( geometry, material );

	}

	get material() {

		return this._mesh.material;

	}

	set material( value ) {

		this._mesh.material = value;

	}

	render( renderer ) {

		renderer.render( this._mesh, camera );

	}

}


export default class Pass {

	constructor() {

		this.enabled = true;
		this.needsSwap = false;
		this.clear = false;
		this.renderToScreen = false;

	}

	setSize( width, height ) {

	}

	render( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

	}

	static FullScreenQuad = _FullScreenQuad;

}
