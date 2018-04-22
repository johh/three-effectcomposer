const runTest = require( './utils/runner' ).run;


describe( 'CopyShader', () => {

	it( 'should match original in structure', ( done ) => {

		runTest( {
			test: () => {

				let error = false;

				try	{

					chai.assert.containsAllKeys( window.EffectComposer.CopyShader, THREE.CopyShader );

				} catch ( e ) {

					error = e;

				}

				return error || undefined;

			},
			callback: done,
		} );

	} );

} );
