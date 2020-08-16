# three.js EffectComposer
![three.js version](https://img.shields.io/badge/three.js-v0.105.0-green.svg?style=flat-square)
[![GitHub issues](https://img.shields.io/github/issues/johh/three-effectcomposer.svg?style=flat-square)](https://github.com/johh/three-effectcomposer/issues)

## Note for `three` >= v0.105.0
Please note, that starting with three.js r105, `EffectComposer` is included in the `three` package and installing `@johh/three-effectcomposer` is no longer necessary.

It can be accessed via

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
```
This package is deprecated and unmaintained.

## Installation
```
yarn add @johh/three-effectcomposer
```
```
npm i --save @johh/three-effectcomposer
```


## Description
three.js's r105 [EffectComposer](https://github.com/mrdoob/three.js/blob/dev/examples/js/postprocessing/EffectComposer.js) ported to ES6 for easy importing.


## Usage
```javascript
import { WebGLRenderer } from 'three';
import EffectComposer, {
	Pass,
	RenderPass,
	ShaderPass,
	TexturePass,
	ClearPass,
	MaskPass,
	ClearMaskPass,
	CopyShader,
} from '@johh/three-effectcomposer';

const renderer = new WebGLRenderer();
const composer = new EffectComposer( renderer );
```


## Differences to the original
- This package does not rely on namespace pollution, so `THREE.EffectComposer`, `THREE.Pass`, etc. remain undefined.

- An additional Pass, called `RenderingPass`, is exported. It includes a standard rendering setup, i.e. a scene (as `this.scene`), including an orthographic camera (`this.camera`) and quad (`this.quad`). This is useful if your custom pass requires said setup, but a customized rendering function. Since r103 this pass has been made redundant by Pass.FullScreenQuad, but remains for backwards compatibility.


## Testing
Testing is done with mocha in a Chromium environment using puppeteer.

The structure of each class, as well as its visual output, is compared to its original counterpart.

Due to the virtually infinite number of possible combinations it is pretty much impossible to cover **every** use case.


## Credits
This package is heavily based on code that was originally written by [alteredq](https://github.com/alteredq) and is licensed **MIT** © 2010-2019 three.js authors.
