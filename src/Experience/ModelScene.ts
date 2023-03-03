import { AxesHelper, Mesh, MeshStandardMaterial, Object3D, Scene as ThreeScene } from 'three'
import Lights from './Lights'

interface IModelSceneOptions { 
    showAxes?: boolean
}

const DEFUALT_OPTIONS: IModelSceneOptions = {
    showAxes: false
}

export default class ModelScene {
    public scene: ThreeScene

    constructor (private model: Object3D | null, { showAxes }: IModelSceneOptions = DEFUALT_OPTIONS) {
        const scene = this.scene = new ThreeScene()
        const lights = new Lights()

        scene.add(lights)
        if (model) scene.add(model)
        if (showAxes) scene.add(new AxesHelper())
    }

    public setModel(model?: Object3D) {
        if (this.model) this.scene.remove(this.model)
        if (model) {
            this.updateMaterials(model)
            this.scene.add(model)
        }
    }

    private updateMaterials(model: Object3D) {
        model.traverse(child => {
            if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }
}