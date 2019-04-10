const runTest = require( './utils/runner' ).run;


describe( 'MaskPass', () => {

	it( 'should match original in structure', ( callback ) => {

		runTest( {
			test: () => {

				let error;

				try	{

					const A = new THREE.MaskPass();
					const B = new window.EffectComposer.MaskPass();

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

						const parameters = {
							minFilter: THREE.LinearFilter,
							magFilter: THREE.LinearFilter,
							format: THREE.RGBFormat,
							stencilBuffer: true,
						};
						const renderTargetA = new THREE.WebGLRenderTarget( 256, 256, parameters );
						const renderTargetB = new THREE.WebGLRenderTarget( 256, 256, parameters );


						const composerA = new THREE.EffectComposer( window.rendererA, renderTargetA );
						composerA.addPass( new THREE.RenderPass(
							window.scene,
							window.camera,
						) );

						const passA = new THREE.MaskPass( window.maskScene, window.camera );
						composerA.addPass( passA );
						composerA.addPass( new THREE.TexturePass( window.sampleTexture ) );
						composerA.addPass( new THREE.ClearMaskPass() );
						composerA.addPass( new THREE.ShaderPass( THREE.CopyShader ) );

						composerA.render();


						const composerB = new window.EffectComposer.default( window.rendererB, renderTargetB );
						composerB.addPass( new window.EffectComposer.RenderPass(
							window.scene,
							window.camera,
						) );

						const passB = new window.EffectComposer.MaskPass( window.maskScene, window.camera );
						composerB.addPass( passB );
						composerB.addPass( new window.EffectComposer.TexturePass( window.sampleTexture ) );
						composerB.addPass( new window.EffectComposer.ClearMaskPass() );
						composerB.addPass( new window.EffectComposer.ShaderPass( window.EffectComposer.CopyShader ) );

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
