window.EffectComposer = require( '../../dist/cjs' );

window.canvasA = document.getElementById( 'canvas-a' );
window.canvasB = document.getElementById( 'canvas-b' );

window.scene = new THREE.Scene();
window.camera = new THREE.PerspectiveCamera();
window.scene.add( new THREE.Mesh(
	new THREE.IcosahedronBufferGeometry(),
	new THREE.MeshBasicMaterial( { color: 0xFA2299 } ),
) );
window.camera.position.z = 5;

window.maskScene = new THREE.Scene();
window.maskScene.add( new THREE.Mesh(
	new THREE.BoxBufferGeometry( 2, 0.5, 0.5 ),
	new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ),
) );


window.rendererA = new THREE.WebGLRenderer( {
	canvas: window.canvasA,
} );

window.rendererB = new THREE.WebGLRenderer( {
	canvas: window.canvasB,
} );


window.shader = {
	vertexShader: `
	precision mediump float;

	varying vec2 vUv;


	void main() {
		vUv = uv;

		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
	`,
	fragmentShader: `
	precision mediump float;

	uniform sampler2D tDiffuse;
	uniform sampler2D tTest;
	varying vec2 vUv;

	void main() {
		gl_FragColor = texture2D( tDiffuse, vUv ).rbga + texture2D( tTest, vUv ).brga;
	}
	`,
	uniforms: {
		tDiffuse: {
			value: null,
		},
		tTest: {
			value: null,
		},
	},
};

window.sampleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+Gkqr6gAAAYFpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/ZmjkR6NYWFhMwgqNEbFRRkJJGqMMNjNv3syoeeP13kiyVbZTlNj4teAvYKuslSJSsrGxJjZMz3nzpmaSObdzz+d+7z2ne88FVzitaGa1H7RM1ghNBH0LkUWf55VqaqlnAKKKqY/Ozk5T0b4eqLLjXY9dq/K5f60+rpoKVNUKjyi6kRWeFJ5ez+o27wq3KKloXPhcuNuQCwrf23rM4Tebkw7/2GyEQ2PgahL2Jcs4VsZKytCE5eV0aOk1pXgf+yUNamZ+TmK7eBsmISYI4mOKccYYpI9hmQfpIUCvrKiQ7y/kz7AquYrMOhsYrJAkRZZuUdekuioxIboqI82G3f+/fTUT/QGnekMQal4s66MTPDuQz1nW97Fl5U/A/QxXmVL+6hEMfYqeK2kdh+Ddgovrkhbbg8ttaH3So0a0ILnFXYkEvJ9BYwSab6FuyelZcZ/TRwhvylfdwP4BdMl57/IvGGdnwu6/EhAAAAAJcEhZcwAACxMAAAsTAQCanBgAAAJaSURBVCiRZZJPSBRhGMbfb76ZndnZ1XVxXHJz/BMz7DqhLHMppG556RQdTNJjIUgEtSBE1MFLpwg8RBB06qYICkKE0KGILGMRy2B1Nf+0a7YRO+5+OzvszNthqXX1Ob+/93nel4cgIqU0HA5TSuGEEHFiYmJ4eLi9vZ3jOEIIQURFUebm5hRF8TzvJDA/P69pmmmaqqoKgsADAMdxoVDIcZxyuQwAXwpfJU46LUf91I+IkiR1dXVls1nXdXVd52qbPM+zbdsqWWv5b5Nbk1OrU8vrny3LYowdHBwUi8VCoTA7OwsABBEjkcji4mKlUsn8ztxNJXNXs/QF7V/tT44ko9Ho0NAQpRQRGWOHh4f8sdAEAJ4D5AE8qKWdmZkJBoOWZY2NjQEAd3S6TWx7bD7R3mgDPweuX77h8Gc29gMbOd/ej1+U0ng83hCpahWqe9vlSHR9c1MUxRL0vPwU2w+JsLbf53t6Pzkqy7JhGHUHKf9HffWuafe7rmmdnZ3AybtMzpwPbOcq1SrIstzb29sQiWJPc36079Ek51YBEQCh4MEz75Tz+sG9W5qmua577AaB+BJC6+a52+PB7S2huNySvqB8iKbfjpv93SsrK4ZhAED9S8xj6XKaljgqPOx4/9F/ZfDi9DTP84iYyWRKpVJtrA7kSG6BLNgBO9wSuDNyrftsnG9qtm2bMeY4DiI2AIQQpaPt0s1BVVUlSWrVNFEUbdve2dlxXZdSSghpAPx+fywWSyQSgiD89/T5fLquIyIhhDFW7yMAmKaZSqW8I1paWjIMg/+nWvkR8S8OURQYIWAGfAAAAABJRU5ErkJggg==';

window.sampleTexture = new THREE.TextureLoader().load( window.sampleImage );
