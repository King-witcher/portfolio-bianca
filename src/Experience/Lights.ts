import { AmbientLight, DirectionalLight, Group, } from 'three'

export default class Lights extends Group {
    constructor () {
        super()

        const ambient = new AmbientLight(0xffffff, 2)
    
        const dir1 = new DirectionalLight(0xffffff, 1)
        dir1.castShadow = true
        dir1.position.set(0.6, 1, 0.6)
        dir1.shadow.camera.far = 3
        dir1.shadow.blurSamples = 20
        dir1.shadow.mapSize.set(1024, 1024)
        dir1.shadow.camera.scale.set(1.414, 1.414, 1.414)
    
        const dir2 = new DirectionalLight(0xffffff, 1)
        dir2.castShadow = true
        dir2.position.set(0.6, 1, -0.6)
        dir2.shadow.camera.far = 3
        dir2.shadow.blurSamples = 20
        dir2.shadow.mapSize.set(1024, 1024)
        dir2.shadow.camera.scale.set(1.414, 1.414, 1.414)

        this.add(ambient, dir1, dir2)
    }
}