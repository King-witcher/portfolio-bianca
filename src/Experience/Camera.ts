import { PerspectiveCamera, PointLight } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from '.'
import { RunOnTick } from './Time'
import View from './View'

export default class Camera {

  public instance: PerspectiveCamera
  public controls: OrbitControls

  constructor (experience: Experience) {
    const view = experience.view
    this.instance = new PerspectiveCamera(50, view.width / view.height)
    this.instance.position.z = 1.5

    const light = new PointLight()
    light.position.z = this.instance.position.z
    this.instance.add(light)

    const orbitControls = this.controls = new OrbitControls(this.instance, view.HTMLCanvas)
    orbitControls.enableDamping = true
    orbitControls.enablePan = false
    orbitControls.minPolarAngle = 20 * Math.PI / 180
    orbitControls.maxPolarAngle = 86 * Math.PI / 180
    orbitControls.dampingFactor = 0.1
    orbitControls.zoomSpeed = 2
    orbitControls.maxDistance = 2.5
    orbitControls.minDistance = 0.5

    RunOnTick(orbitControls.update)

    view.onResize(this.onResize.bind(this))
  }

  private update(delta: number) {
    this.controls.update()
    
  }

  private onResize(view: View) {
    this.instance.aspect = view.width / view.height
    this.instance.updateProjectionMatrix()
  }
}