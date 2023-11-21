import {MarchingCubes} from 'three/examples/jsm/objects/MarchingCubes';
import { Mesh, SphereGeometry, MeshBasicMaterial, Color, WebGLRenderTarget} from 'three/src/Three'
import { DropMaterial, BackDropMaterial } from '../materials'
import matcap from '../../../public/textures/iridescent32.png'
import store from '../store'
export default class Drop extends Mesh {
	constructor(){
		super()
		this.tick = 0
		this.load()

	}

	build() {
		// this.tick = 0
		store.envFbo = new WebGLRenderTarget(
			store.window.w * store.WebGL.renderer.getPixelRatio(),
			store.window.h * store.WebGL.renderer.getPixelRatio()
		)

		this.fboCreate()


		const resolution = 100;
		this.material = this.dropMaterial
		this.effect = new MarchingCubes( resolution, this.material, true, true, 100000 );
		this.effect.position.set( 0, 0, 0 );

		this.effect.enableUvs = true;
		this.effect.enableColors = true;


		this.effectController = {

			speed: 1.0,
			numBlobs: 10,
			resolution: 28,
			isolation: 0,

			floor: false,
			wallx: false,
			wallz: false,

			dummy: function () {}

		};

		console.log(this.effect)
		this.effect.position.set(0, 0, -2)
		this.add( this.effect );

	}

	fboCreate = () => {
		this.backfaceFbo = new WebGLRenderTarget(store.window.w * store.WebGL.renderer.getPixelRatio(), store.window.h * store.WebGL.renderer.getPixelRatio())
		this.dropMaterial = new DropMaterial({
			envMap: store.envFbo.texture,
			resolution: [store.window.w * store.WebGL.renderer.getPixelRatio(), store.window.h * store.WebGL.renderer.getPixelRatio()],
			backfaceMap: this.backfaceFbo.texture,
			matcap: this.matcap,
			progress: 0,
			fresnelVal: 1,
			refractPower: 10,
			uMap: store.MainScene.backgroundTexture
		})
		console.log(store.MainScene.backgroundTexture.image)
		this.backdropMaterial = new BackDropMaterial()
		// this.item = new Mesh(new BufferGeometry(), this.DropMaterial)
		// this.fullItem = new Mesh(new PlaneGeometry(), this.backDropMaterial)
		// this.drawPieces()
		// this.drawBack()
		// this.item.rotation.x = -Math.PI * 0.5
		// this.fullItem.rotation.x = -Math.PI * 0.5
		// this.add(this.item)
		// this.add(this.fullItem)
		// this.fullItem.layers.set(1)
	}

	createMesh() {
		this.geometry = new SphereGeometry( 15, 64, 32 ); 
		this.material = new DropMaterial( { color: new Color(0x00ffff) } );
		this.sphere = new Mesh( this.geometry, this.material )
		this.sphere.position.set(0, 0, 0)
		this.add( this.sphere )
	}

	updateCubes( object, time, numblobs, floor, wallx, wallz ) {

		object.reset();
		// fill the field with some metaballs

		const rainbow = [
			new Color( 0xff0000 ),
			new Color( 0xffbb00 ),
			new Color( 0xffff00 ),
			new Color( 0x00ff00 ),
			new Color( 0x0000ff ),
			new Color( 0x9400bd ),
			new Color( 0xc800eb )
		];
		const subtract = 12;
		const strength = 1. / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );

		for ( let i = 0; i < numblobs; i ++ ) {

			const ballx = Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.1 + 0.5;
			const bally = Math.abs( Math.cos( i + 1.12 * time * Math.cos( 1.22 + 0.1424 * i ) ) ) * 0.1 + 0.5; // dip into the floor
			const ballz = Math.cos( i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.1 + 0.5;

			// const ballx = 0.5;
			// const bally = 0.5;
			// const ballz = 0.5;
			// if ( current_material === 'multiColors' ) {

			// 	object.addBall( ballx, bally, ballz, strength, subtract, rainbow[ i % 7 ] );

			// } else {

			// 	object.addBall( ballx, bally, ballz, strength, subtract );

			// }
			object.addBall( ballx, bally, ballz, strength, subtract );

		}

		if ( floor ) object.addPlaneY( 2, 12 );
		if ( wallz ) object.addPlaneZ( 2, 12 );
		if ( wallx ) object.addPlaneX( 2, 12 );

		object.update();

	}

	animate() {
		this.tick++
		//console.log(this.effect)
		this.updateCubes( this.effect, store.WebGL.globalUniforms.uTime.value, this.effectController.numBlobs, this.effectController.floor, this.effectController.wallx, this.effectController.wallz );


		this.effect.visible = false
		store.WebGL.renderer.setRenderTarget(store.envFbo)
		store.WebGL.renderer.render(store.MainScene, store.MainScene.activeCamera)
		this.effect.visible = true

		store.WebGL.renderer.setRenderTarget(null)
		this.effect.material = this.backdropMaterial
		store.WebGL.renderer.setRenderTarget(this.backfaceFbo)
		store.WebGL.renderer.render(store.MainScene, store.MainScene.activeCamera)

		store.WebGL.renderer.setRenderTarget(null)

		this.effect.visible = true

		this.effect.material = this.dropMaterial
	}

	load() {
		console.log('load')
		store.AssetLoader.loadTexture(matcap).then(texture => {
			this.matcap = texture
		})
	}
}