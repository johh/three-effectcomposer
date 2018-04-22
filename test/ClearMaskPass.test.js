const runTest = require( './utils/runner' ).run;


describe( 'ClearMaskPass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error = false;

				try	{

					const A = new THREE.ClearMaskPass();
					const B = new window.EffectComposer.ClearMaskPass();

					chai.assert.containsAllKeys( B, A );

				} catch ( e ) {

					error = e;

				}

				return error || undefined;

			},
			callback,
		} );

	} );

} );
