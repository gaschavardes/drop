import { Group, Color, Mesh, MeshPhongMaterial, Vector3} from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import fontFile from '../../../public/fonts/helvetiker_bold.typeface.json'
import { BasicMaterial } from '../materials'
import store from '../store'
// import { copyObjectDataTransforms } from '../utils'

export default class Text extends Group {
	constructor() {
		super()
		// this.load()
		this.position.set(0, 0, -10)
		this.scale.setScalar(1)
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
	}

	setText() {
		this.geometry = new TextGeometry( 'THE DROP', {
			font: this.font,
			size: 1,
			height: 0,
			curveSegments: 10,
			bevelEnabled: false,
			bevelThickness: 1,
			bevelSize: 0,
			bevelOffset: 0,
			bevelSegments: 1
		}),
		this.material = new MeshPhongMaterial( { color: 0x00ffff } ),
		this.mesh = new Mesh(this.geometry, this.material)
		this.add(this.mesh)

		this.geometry.computeBoundingBox();
		const center = this.geometry.boundingBox.getSize(new Vector3());
		this.mesh.position.set(-center.x * 0.5, 0, 0. );
	}


	mouseMove = () => {
		
	}

	animate = () => {
		// if(this.mesh) this.mesh.rotation.set(0, store.WebGL.globalUniforms.uTime.value, store.WebGL.globalUniforms.uTime.value)
	}	

	load() {
		const fontLoader = new FontLoader()

		fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
			this.font = font
			this.setText()
		})
		this.assets = {
			models: {},
			textures: {}
		}
	}
}