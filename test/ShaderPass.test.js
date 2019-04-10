const runTest = require( './utils/runner' ).run;


describe( 'ShaderPass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error;

				try	{

					const A = new THREE.ShaderPass();
					const B = new window.EffectComposer.ShaderPass();

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

		it( 'with basic shader', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						composerA.addPass( new THREE.RenderPass(
							window.scene,
							window.camera,
						) );

						const passA = new THREE.ShaderPass( window.shader );
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						composerB.addPass( new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
						) );

						const passB = new window.EffectComposer.ShaderPass( window.shader );
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


		it( 'with shader material', ( callback ) => {

			runTest( {
				test: () => {

					let error;
					const material = new THREE.ShaderMaterial( window.shader );

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						composerA.addPass( new THREE.RenderPass(
							window.scene,
							window.camera,
						) );

						const passA = new THREE.ShaderPass( material );
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						composerB.addPass( new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
						) );

						const passB = new window.EffectComposer.ShaderPass( material );
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

		it( 'with texture id overwrite', ( callback ) => {

			runTest( {
				test: () => {

					let error;

					try {

						const composerA = new THREE.EffectComposer( window.rendererA );
						composerA.addPass( new THREE.RenderPass(
							window.scene,
							window.camera,
						) );

						const passA = new THREE.ShaderPass( window.shader, 'tTest' );
						composerA.addPass( passA );
						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB );
						composerB.addPass( new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
						) );

						const passB = new window.EffectComposer.ShaderPass( window.shader, 'tTest' );
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
