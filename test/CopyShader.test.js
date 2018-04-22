const runTest = require( './utils/runner' ).run;


describe( 'CopyShader', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error;

				try	{

					chai.assert.containsAllKeys( window.EffectComposer.CopyShader, THREE.CopyShader );

				} catch ( e ) {

					error = e;

				}

				return error;

			},
			callback,
		} );

	} );

} );
