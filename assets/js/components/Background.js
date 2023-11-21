import { Mesh, Color, PlaneGeometry} from 'three'
import { BackgroundMaterial } from '../materials'
import store from '../store'
// import { copyObjectDataTransforms } from '../utils'

export default class Background extends Mesh {
	constructor() {
		super(
			new PlaneGeometry(),
			new BackgroundMaterial({
			})
		)

		this.position.set(0, 0, -20)
		this.scale.setScalar(30)
		this.globalUniforms = {
			uColor: { value: new Color(0xf3ff8f) },
		}
		this.renderOrder = 1
		this.appaearProgress = 0
		this.load()
		store.RAFCollection.add(this.animate, 0)
		this.targetScroll = 0

	}

	build() {
		this.material.uniforms.uMap.value = store.MainScene.backgroundTexture
	}

	mouseMove = () => {
		
	}

	animate = () => {
		this.material.uniforms.uScroll.value = this.targetScroll
	}

	load() {
		this.assets = {
			models: {},
			textures: {}
		}
	}
}