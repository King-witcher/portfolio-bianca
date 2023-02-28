import { Color, Mesh, MeshStandardMaterial, Object3D, Scene } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Renderer from './Renderer'
import View from './View'
import Camera from './Camera'
import ModelScene from './ModelScene'

export default class Experience {
    public view: View
    public renderer: Renderer
    public camera: Camera
    public modelScene: ModelScene

    constructor(
        rootDiv: HTMLDivElement,
        modelUrl: string,
        modelScale = 1
    ) {
        this.view = new View(rootDiv)
        this.camera = new Camera(this)
        this.modelScene = new ModelScene(null, { showAxes: true })

        const loader = new GLTFLoader()
        loader.loadAsync(modelUrl, undefined).then(({ scene: model }) => {
            model.scale.set(modelScale, modelScale, modelScale)
            this.modelScene.setModel(model)
        })

        this.renderer = new Renderer(this.view, this.camera, this.modelScene.scene)
    }

    public start() {
        this.renderer.start()
    }
}