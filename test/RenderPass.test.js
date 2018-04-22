const runTest = require( './utils/runner' ).run;


describe( 'RenderPass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error;

				try	{

					const A = new THREE.RenderPass();
					const B = new window.EffectComposer.RenderPass();

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
