import { ACESFilmicToneMapping, LinearToneMapping, NoToneMapping, ReinhardToneMapping, Scene, sRGBEncoding, WebGLRenderer } from 'three'
import { RunOnTick } from './Time'
import View from './View'
import Camera from './Camera'

export default class Renderer {
  public renderer: WebGLRenderer

  constructor (
    public view: View,
    public camera: Camera,
    public scene: Scene
  ) {
    const renderer = this.renderer = new WebGLRenderer({canvas: view.HTMLCanvas})
    renderer.outputEncoding = sRGBEncoding
    renderer.physicallyCorrectLights = true
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.setPixelRatio(view.pixelRatio)
    this.view.onResize(this.onResize.bind(this))
  }

  public start() {
    RunOnTick(() => {
      this.renderer.render(this.scene, this.camera.instance)
    })
  }

  private onResize(view: View) {
    this.renderer.setSize(view.width, view.height)
    this.renderer.setPixelRatio(view.pixelRatio)
  }
}