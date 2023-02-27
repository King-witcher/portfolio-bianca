import { AmbientLight, BoxGeometry, CameraHelper, Color, DirectionalLight, DirectionalLightHelper, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, Scene, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Renderer from './Renderer'
import View from './View'
import Camera from './Camera'

export default class Experience {
  public view: View
  public scene: Scene
  public renderer: Renderer
  public camera: Camera

  constructor(
    rootDiv: HTMLDivElement,
    modelUrl: string
  ) {
    this.view = new View(rootDiv)
    this.scene = new Scene()
    this.scene.background = new Color(0xf0f0f0)
    this.camera = new Camera(this)
    const light = new AmbientLight(0xffffff, 2)
    
    const directional = new DirectionalLight(0xffffff, 1)
    directional.castShadow = true
    directional.position.set(0.3, 0.5, 0.3)
    directional.shadow.camera.far = 3
    directional.shadow.blurSamples = 20
    directional.shadow.mapSize.set(4096, 4096)
    
    const directional2 = new DirectionalLight(0xffffff, 1)
    directional2.castShadow = true
    directional2.position.set(0.3, 0.5, -0.3)
    directional2.shadow.camera.far = 3
    directional2.shadow.blurSamples = 20
    directional2.shadow.mapSize.set(4096, 4096)

    const helper = new CameraHelper(directional.shadow.camera)
    this.scene.add(light, directional, directional2, helper)

    const loader = new GLTFLoader()
    loader.loadAsync(modelUrl, undefined).then(gltf => {
      console.log('loaded')
      gltf.scene.scale.x = 0.1
      gltf.scene.scale.y = 0.1
      gltf.scene.scale.z = 0.1
      this.updateAllMaterials(gltf.scene)
      this.scene.add(gltf.scene)
      console.log(this.scene)
    })

    this.renderer = new Renderer(this.view, this.camera, this.scene)
  }

  public updateAllMaterials(model: Object3D) {
    model.traverse(child => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }

  public start() {
    this.renderer.start()
  }
}