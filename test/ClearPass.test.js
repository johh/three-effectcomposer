const runTest = require( './utils/runner' ).run;


describe( 'ClearPass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error;

				try	{

					const A = new THREE.ClearPass();
					const B = new window.EffectComposer.ClearPass();

					chai.assert.containsAllKeys( B, A );

				} catch ( e ) {

					error = e;

				}

				return error;

			},
			callback,
		} );

	} );


	describe( 'should produce the same visual results', () => {

		it( 'with no parameters', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						composerA.addPass( new THREE.RenderPass(
							window.scene,
							window.camera,
						) );

						const passA = new THREE.ClearPass();
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						composerB.addPass( new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
						) );

						const passB = new window.EffectComposer.ClearPass();
						composerB.addPass( passB );
						composerB.render();


						chai.assert.strictEqual(
							window.canvasA.toDataURL(),
							window.canvasB.toDataURL(),
							'results don\'t visually match',
						);

					} catch ( e ) {

						error = e;

					}

					return error;

				},
				callback,
			} );

		} );


		it( 'with clear color overwrite', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						composerA.addPass( new THREE.RenderPass(
							window.scene,
							window.camera,
						) );

						const passA = new THREE.ClearPass( 0xA2B7E1, 0.5 );
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						composerB.addPass( new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
						) );

						const passB = new window.EffectComposer.ClearPass( 0xA2B7E1, 0.5 );
						composerB.addPass( passB );
						composerB.render();


						chai.assert.strictEqual(
							window.canvasA.toDataURL(),
							window.canvasB.toDataURL(),
							'results don\'t visually match',
						);

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
