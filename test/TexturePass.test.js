const runTest = require( './utils/runner' ).run;


describe( 'TexturePass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error;

				try	{

					const A = new THREE.TexturePass( null, 1 );
					const B = new window.EffectComposer.TexturePass( null, 1 );

					chai.assert.containsAllKeys( B, A );

				} catch ( e ) {

					error = e;

				}

				return error;

			},
			callback,
		} );

	} );

} );
