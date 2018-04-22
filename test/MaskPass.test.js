const runTest = require( './utils/runner' ).run;


describe( 'MaskPass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error;

				try	{

					const A = new THREE.MaskPass();
					const B = new window.EffectComposer.MaskPass();

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
