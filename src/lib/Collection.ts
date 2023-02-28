import { Object3D } from 'three'

export default class Collection extends Object3D {
    constructor(public name: string) {
        super()
        this.type = 'Collection'
    }
}