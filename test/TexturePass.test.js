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


	describe( 'should produce the same visual results', () => {

		it( 'with basic texture', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						composerA.addPass( new THREE.RenderPass(
							window.scene,
							window.camera,
						) );

						const passA = new THREE.TexturePass( window.sampleTexture );
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						composerB.addPass( new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
						) );

						const passB = new window.EffectComposer.TexturePass( window.sampleTexture );
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


		it( 'with opacity overwrite', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						composerA.addPass( new THREE.RenderPass(
							window.scene,
							window.camera,
						) );

						const passA = new THREE.TexturePass( window.sampleTexture, 0.5 );
						composerA.addPass( new THREE.ClearPass() );
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						composerB.addPass( new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
						) );

						const passB = new window.EffectComposer.TexturePass( window.sampleTexture, 0.5 );
						composerB.addPass( new window.EffectComposer.ClearPass() );
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
