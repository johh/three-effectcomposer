const runTest = require( './utils/runner' ).run;


describe( 'Pass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error;

				try	{

					const A = new THREE.Pass();
					const B = new window.EffectComposer.Pass();

					chai.assert.containsAllKeys( B, A );

				} catch ( e ) {

					error = e;

				}

				return error;

			},
			callback,
		} );

	} );

	describe( '.FullScreenQuad', () => {

		it( 'should match original in structure', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const A = new THREE.Pass.FullScreenQuad();
						const B = new window.EffectComposer.Pass.FullScreenQuad();

						chai.assert.containsAllKeys( A, B );

					} catch ( e ) {

						error = e;

					}

					return error;

				},
				callback,
			} );

		} );

	} );

} );
