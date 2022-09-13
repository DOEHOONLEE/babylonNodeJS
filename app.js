import { createRequire } from "module";
import '@babylonjs/loaders/glTF/index.js'
const require = createRequire(import.meta.url);
const fs = require('fs');
import {
  Engine, Scene, Color3, FreeCamera, Vector3, SceneLoader, HemisphericLight, Color4, Mesh
} from '@babylonjs/core'
const { createCanvas } = require('node-canvas-webgl/lib');
const XMLHttpRequest = require("xhr2");

global.XMLHttpRequest = XMLHttpRequest;

global.HTMLElement = function () {};
global.window = {
  setTimeout,
  addEventListener() {},
};
global.navigator = {};
global.document = {
  createElement() {
    return createCanvas(300, 150);
  },
  addEventListener() {},
};

const canvas = createCanvas(512, 512);

const engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
const scene = new Scene(engine);

const createScene = async function () {
  scene.clearColor = new Color4(0.5, 0.4, 0.4, 1);
  const camera = new FreeCamera('cam1', new Vector3(-6.8, 9.8, -9.3), scene)
  camera.setTarget(new Vector3(-1.8, 0, 0))
  
  const rootURL = 'https://playground.babylonjs.com/scenes/'
  const fileName = 'candle.babylon'
  
  console.log('GLTF EXTENSION availability ', SceneLoader.IsPluginForExtensionAvailable('gltf'))
  
  const { meshes } = await SceneLoader.ImportMeshAsync('', rootURL, fileName, scene, null, '.babylon')
  
  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
  
  scene.render();
};

createScene();


setTimeout(() => {
  fs.writeFileSync('./assets/modelScreenshot.png', canvas.toBuffer());
}, 3000)

