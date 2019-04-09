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

	describe( 'should produce the same visual results', () => {

		it( 'basic render', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						const passA = new THREE.RenderPass( window.scene, window.camera );
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						const passB = new window.EffectComposer.RenderPass( window.scene, window.camera );
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

		it( 'material overwrite', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const material = new THREE.MeshNormalMaterial();

						const composerA = new THREE.EffectComposer( window.rendererA );
						const passA = new THREE.RenderPass(
							window.scene,
							window.camera,
							material,
						);
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						const passB = new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
							material,
						);
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

		it( 'clear color overwrite', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						const passA = new THREE.RenderPass(
							window.scene,
							window.camera,
							null,
							0xFA2A1A,
							0.5,
						);
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						const passB = new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
							null,
							0xFA2A1A,
							0.5,
						);
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
