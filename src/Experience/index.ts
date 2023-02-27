import { AmbientLight, BoxGeometry, Color, DirectionalLight, Mesh, MeshBasicMaterial, Scene, Vector3 } from 'three'
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
    directional.position.x = 2
    directional.position.y = 6
    directional.position.z = 3
    const directional2 = new DirectionalLight(0xffffff, 1)
    directional2.position.x = -3
    directional2.position.y = 7
    directional2.position.z = -2
    directional2.lookAt(new Vector3(0, 0, 0))
    this.scene.add(light, directional, directional2)

    const boxgeom = new BoxGeometry(1, 1, 1)
    const mat = new MeshBasicMaterial({color: '#f00'})
    const mesh = new Mesh(boxgeom, mat)

    const loader = new GLTFLoader()
    loader.loadAsync(modelUrl, undefined).then(gltf => {
      console.log('loaded')
      gltf.scene.scale.x = 0.1
      gltf.scene.scale.y = 0.1
      gltf.scene.scale.z = 0.1
      this.scene.add(gltf.scene)
      console.log(this.scene)
    })

    this.renderer = new Renderer(this.view, this.camera, this.scene)
  }

  public start() {
    this.renderer.start()
  }
}