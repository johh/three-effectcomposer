const runTest = require( './utils/runner' ).run;


describe( 'ShaderPass', () => {

	it( 'should match original in structure', ( done ) => {

		runTest( {
			test: () => {

				let error = false;

				try	{

					const A = new THREE.ShaderPass();
					const B = new window.EffectComposer.ShaderPass();

					chai.assert.containsAllKeys( B, A );

				} catch ( e ) {

					error = e;

				}

				return error || undefined;

			},
			callback: done,
		} );

	} );

} );
