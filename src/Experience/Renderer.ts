import { Scene, WebGLRenderer } from 'three'
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
    this.renderer = new WebGLRenderer({canvas: view.HTMLCanvas})
    this.view.onResize(this.onResize.bind(this))
    this.renderer.setPixelRatio(view.pixelRatio)
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