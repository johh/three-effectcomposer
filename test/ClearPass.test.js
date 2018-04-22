const runTest = require( './utils/runner' ).run;


describe( 'ClearPass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error = false;

				try	{

					const A = new THREE.ClearPass();
					const B = new window.EffectComposer.ClearPass();

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
