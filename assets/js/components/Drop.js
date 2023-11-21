import { Mesh, SphereGeometry, MeshBasicMaterial, Color} from 'three/src/Three'
import { DropMaterial } from '../materials'
export default class Drop extends Mesh {
	constructor(){
		super()
		this.tick = 0
	}

	build() {
		// this.tick = 0
		this.position.set(0, 0, -100)
		this.createMesh()

	}

	createMesh() {
		this.geometry = new SphereGeometry( 15, 64, 32 ); 
		this.material = new DropMaterial( { color: new Color(0x00ffff) } );
		this.sphere = new Mesh( this.geometry, this.material )
		this.sphere.position.set(0, 0, 0)
		this.add( this.sphere )
	}

	animate() {
		this.tick++
		// this.sphere.rotation.set(0, store.WebGL.globalUniforms.uTime.value, 0)
		this.material.uniforms.uTime = store.WebGL.globalUniforms.uTime
	}
}