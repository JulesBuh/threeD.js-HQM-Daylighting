//scene.js https://github.com/JulesBuh/threeD.js
$(function () {
// Global Variables
	var scene, camera, renderer;
	var controls, guiControls, datGUI;
	var axis, grid, color;
	var wallGeometry,floorGeometry,ceilingGeometry,windowGeometry,planeGeometry;
	var planeMaterial, planeMaterial;annotationMaterial
	var wall, obstructionPlane;
	var annotationLineGeometry;
	var annotationLine;
	var spotlight,spotlight2,ambient;
	var stats;
	var SCREEN_WIDTH, SCREEN_HEIGHT;
// Starting Scene
// scene
	scene = new THREE.Scene();
// camera
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// renderer
	renderer = new THREE.WebGLRenderer();
			renderer.setClearColor(0xffffff);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.sshadowMapEnabled = true;
		renderer.sshadowMapSoft = true; 
// ContructSceneInContainer
	$("#webGL-container").append(renderer.domElement);
// Navigation Controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				
// axisPlanes
	axis = new THREE.AxisHelper(10);
				
	grid = new THREE.GridHelper( 50, 50 );
				grid.material.opacity = 0.25;
				grid.material.transparent = true;
// obstruction Plane
	planeGeometry = new THREE.PlaneGeometry(5, 1, 1);
	planeMaterial = new THREE.MeshLambertMaterial({color: 0x0033aa});
	planeMaterial.side = THREE.DoubleSide
	planeMaterial.opacity = 0.5;
	planeMaterial.transparent  = true;
	obstructionPlane = new THREE.Mesh(planeGeometry, planeMaterial);
// working Plane
	workplaneGeometry = new THREE.PlaneGeometry(5, 1, 1);
	workplaneMaterial = new THREE.MeshLambertMaterial({color: 0xFFEB00});
	workplaneMaterial.side = THREE.DoubleSide
	workplaneMaterial.opacity = 0.8;
	workplaneMaterial.transparent  = true;
	workPlane = new THREE.Mesh(workplaneGeometry, workplaneMaterial);
// window Plane
	windowGeometry = new THREE.PlaneGeometry(5, 1, 1);
	windowMaterial = new THREE.MeshLambertMaterial({color: 0x8888ee});
	windowMaterial.side = THREE.DoubleSide
	windowMaterial.opacity = 0.4;
	windowMaterial.transparent  = true;
	window1 = new THREE.Mesh(windowGeometry, windowMaterial);
//
	var annotationMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
	var annotationLineGeometry = new THREE.Geometry();
	annotationLineGeometry.vertices.push(
		new THREE.Vector3( -2.5, 0.85, -3.8 ),
		new THREE.Vector3( -2.5, 4.35, 7.7 )
	);
	var annotationLine2Geometry = new THREE.Geometry();
	annotationLine2Geometry.vertices.push(
		new THREE.Vector3( -2.5, 2.1, 0.15 ),
		new THREE.Vector3( -2.5, 1.1, -0.15 )
	);
	var annotationLine3Geometry = new THREE.Geometry();
	annotationLine3Geometry.vertices.push(
		new THREE.Vector3( -2.5, 2.1, 0 ),
		new THREE.Vector3( -2.5, 4.35, 7.7 )
	);
	var annotationLine = new THREE.Line( annotationLineGeometry, annotationMaterial );
	var annotationLine2 = new THREE.Line( annotationLine2Geometry, annotationMaterial );
	var annotationLine3 = new THREE.Line( annotationLine3Geometry, annotationMaterial );
// wall
	wallGeometry = new THREE.BoxGeometry(1, 1, 1);
	wall_principal_Geometry = new THREE.BoxGeometry(1, 1, 1);
	wallMaterial = new THREE.MeshLambertMaterial({color: 0x3663FF});
	wall = new THREE.Mesh(wall_principal_Geometry, wallMaterial);
	wall_cill = new THREE.Mesh(wall_principal_Geometry, wallMaterial);
	wall_head = new THREE.Mesh(wall_principal_Geometry, wallMaterial);
	wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
	wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
	
	windowGeometry = new THREE.BoxGeometry(1.1, 0.9, 0.4);
	windowMaterial = new THREE.MeshLambertMaterial({color: 0xbbaaff});
	opening = new THREE.Mesh(windowGeometry, windowMaterial);
	
		//var newBSP = wall.subtract(opening); //Boolean opreatins with ThreeCSG.js
	
	ceilingGeometry = new THREE.BoxGeometry(1, 0.3, 1);
	floorGeometry = new THREE.BoxGeometry(1, 0.3, 1);
	ceiling = new THREE.Mesh(ceilingGeometry, wallMaterial);
	floor = new THREE.Mesh(floorGeometry, wallMaterial);
	
// spotlight
	spotlight = new THREE.SpotLight(0xffffff);
	spotlight2 = new THREE.SpotLight(0xeeeeff);
	ambient = new THREE.AmbientLight( 0x80ffff );
	
				
// add objects to the scene
	//globalGrid placement
		grid.position.x = 0;
		grid.position.y = 0;
		grid.position.z = 0;
		grid.rotation.x = 0;
		grid.rotation.y = 0;
		grid.rotation.z = 0;
		scene.add(grid);
	//wall placement
		wall.scale.x = 2.5;
		wall.scale.y = 2.5;
		wall.position.x = 1.25;
		wall.rotation.x = 0;
		wall.rotation.y = 0;
		wall.rotation.z = 0;
		wall.castShadow = true;
		wall2.position.set(2.5, 1.25, 2.5);
		wall3.position.set(0, 1.25, -5);
		wall_cill.scale.y = 1.1;
		wall_cill.scale.x = 2.5;
		wall_cill.position.x = -1.25;
		wall_cill.position.y = 0.5;
		wall_head.scale.y = 0.9;
		wall_head.scale.x = 2.5;
		wall_head.position.x = -1.25;
		wall_head.position.y = 2.1;
		
		scene.add(wall);
		scene.add(wall_cill);
		scene.add(wall_head);
		scene.add(wall2);
		scene.add(wall3);
		scene.add(floor);
		scene.add(ceiling);
		//scene.add(newBSP); //Boolean opreatins with ThreeCSG.js
		
		//opening.position.set(-2.5+0.5, 1.5, 0);
		//scene.add(opening);
	//window placement
		window1.scale.set( 1, 2.5, 1 );
		window1.position.y = 2.5/2;
		window1.position.z = 0;
		window1.rotation.x = Math.PI;
		window1.receiveShadow = true;
		scene.add(window1);
	//obstructionPlane placement
		obstructionPlane.scale.set( 1, 1, 1 );
		obstructionPlane.position.y = 0.5;
		obstructionPlane.rotation.y = Math.PI;
		obstructionPlane.receiveShadow = true;
		scene.add(obstructionPlane);
	//workPlane placement
		workPlane.scale.set( 1, (5*(2.5-0.85))/2.9, 1 );
		workPlane.position.y = 0.85;
		workPlane.position.z = -((5*(2.5-0.85))/2.9/2);
		workPlane.rotation.x = Math.PI/2;
		workPlane.receiveShadow = true;
		scene.add(workPlane);
	//lighting placement
		spotlight.position.set(-15, 30, 60);
		spotlight.castShadow = true;
		scene.add(spotlight);
		spotlight2.position.set(-12, 15, -5);
		spotlight2.castShadow = true;
		scene.add(spotlight2);
		scene.add( ambient );
	//camera placement
		camera.position.set(-10, 5, 2.5);
		camera.lookAt(scene.position);
	// annotation
		scene.add( annotationLine );
		scene.add( annotationLine2 );
		scene.add( annotationLine3 );
// Controls
	// InteractiveControls
	var guiControls = new function(){
		this.rotationX_deg = 0;
		this.rotationY_deg = 0;
		this.rotationZ_deg = 0;
		this.object = 'wall';
		this.positionX = 0;
		this.positionY = 0;
		this.positionZ = 0;
		this.room_Depth = 5;
		this.room_Height_floor_to_ceiling = 2.5;
		this.D_obstruction_Position = 7.7;
		this.y_obstruction_Height_above_head_Window = 2.3;
		this.H_obstruction_Height_above_mid_Window = 0.5;
		this.h_head_Window_Height_above_FFL = 2.5;
		this.Hw_window_opening_dim_verticalHeight = 1.0;
		this.c_window_cill_Height_above_FFL = 1.05;
		this.Tw_Wall_Thickness = 0.3;
		this.d_skyline_workplane_depth = (5*(2.5-0.85))/2.9;
		this.d_skyline_workplane_depth_full = (5*(2.5-0.85))/2.9;
		this.P_skyline_Percentage_Depth = ((5*(2.5-0.85))/2.9)*100/5;
		this.window_Material = 'double glazing';
		this.wall_Material = 'magnolia paint';
		this.floor_Material = 'light carpet';
		this.ceiling_Material = 'white paint';
		this.space_Classification = 'Living Room';
		this.workPlane = 0.85;
		this.Daylight_Factor = 0;
	}
	var datGUI = new dat.GUI({width: 700});
	//datGUI.add(guiControls, 'rotationX_deg', -45, 45);
	//datGUI.add(guiControls, 'rotationY_deg', -360, 360);
	//datGUI.add(guiControls, 'rotationZ_deg', -360, 360);
	//datGUI.add(guiControls, 'positionX', -30.1, 30.1);
	//datGUI.add(guiControls, 'positionY', -30.1, 30.1);
	//datGUI.add(guiControls, 'positionZ', -30.1, 0);
	datGUI.add(guiControls, 'room_Depth', 1, 30).listen();
	datGUI.add(guiControls, 'D_obstruction_Position', 0.5, 30).listen();
	datGUI.add(guiControls, 'y_obstruction_Height_above_head_Window', 0.01, 20).listen();
	datGUI.add(guiControls, 'Hw_window_opening_dim_verticalHeight', 0.4, 2.4).listen();
	datGUI.add(guiControls, 'c_window_cill_Height_above_FFL', 0.05, guiControls.room_Height_floor_to_ceiling).listen();
	
	var f1 = datGUI.addFolder('Design Geometry Inputs (En_45;FI_60_55)');
	var f1r = f1.addFolder('Space Geometry Inputs (SL_45)');
	var f1c = f1.addFolder('Construction Geometry Inputs (EF_25)');
	var f1cw = f1c.addFolder('Wall Geometry Inputs (EF_25_10)');
	var f1co = f1c.addFolder('Opening Geometry Inputs (EF_25_30)');
	var f1o = f1.addFolder('Obstruction Geometry Inputs (En_##)');
	var fM = datGUI.addFolder('Design Material Inputs (Pr_35;FI_40_80)');
	var f2 = datGUI.addFolder('Design Geometry Outputs (Zz_20_20;FI_60_55)');
	var f3 = datGUI.addFolder('Calculation Outputs (FI_40_10)');
	f1r.add(guiControls, 'space_Classification', ['Kitchen','Living Room','Home Office','Dining Room','Open-plan Kitchen Living','Other Habitable']).listen();	
	f1r.add(guiControls, 'workPlane', 0.05, 0.9).listen();
	f1r.add(guiControls, 'room_Depth', 1, 30).listen();
	f1r.add(guiControls, 'floor_Material', ['light carpet','dark carpet','light tiles','dark tiles','timber']).listen();
	f1r.add(guiControls, 'ceiling_Material', ['white paint','magnolia paint','dark paint']).listen();
	f1r.add(guiControls, 'room_Height_floor_to_ceiling', 2, 10);
	f1o.add(guiControls, 'D_obstruction_Position', 0.5, 30).listen();
	f1o.add(guiControls, 'y_obstruction_Height_above_head_Window', 0.01, 20).listen();
	fM.add(guiControls, 'ceiling_Material', ['white paint','magnolia paint','dark paint']).listen();
	fM.add(guiControls, 'floor_Material', ['light carpet','dark carpet','light tiles','dark tiles','timber']).listen();
	fM.add(guiControls, 'wall_Material', ['magnolia paint','white paint','dark paint','tiles','timber','brick']).listen();
	f1cw.add(guiControls, 'wall_Material', ['magnolia paint','white paint','dark paint','tiles','timber','brick']).listen();
	fM.add(guiControls, 'window_Material', ['double glazing','triple glazing']).listen();
	f1co.add(guiControls, 'window_Material', ['double glazing','triple glazing']).listen();
	f1cw.add(guiControls, 'Tw_Wall_Thickness', 0.05, 1.0);
	f1co.add(guiControls, 'Hw_window_opening_dim_verticalHeight', 0.4, 2.4).listen();
	f1co.add(guiControls, 'c_window_cill_Height_above_FFL', 0.05, guiControls.room_Height_floor_to_ceiling).listen();
	f2.add(guiControls, 'H_obstruction_Height_above_mid_Window', 0.005, 20).listen();
	f2.add(guiControls, 'h_head_Window_Height_above_FFL', 0, guiControls.room_Height_floor_to_ceiling).listen();
	f2.add(guiControls, 'd_skyline_workplane_depth_full', 1, 30).listen();
	f3.add(guiControls, 'P_skyline_Percentage_Depth', 0, 100).listen();
	f3.add(guiControls, 'Daylight_Factor', 0, 25).listen();
	
	function updateSplineOutline() { 
					annotationLine.geometry.vertices[ 1 ].y = guiControls.y_obstruction_Height_above_head_Window + guiControls.h_head_Window_Height_above_FFL;
					annotationLine.geometry.vertices[ 1 ].z = guiControls.D_obstruction_Position+(guiControls.Tw_Wall_Thickness/2);
					annotationLine.geometry.vertices[ 0 ].y = guiControls.workPlane;
					annotationLine.geometry.vertices[ 0 ].z = guiControls.positionZ-guiControls.d_skyline_workplane_depth+(guiControls.Tw_Wall_Thickness/2);
					annotationLine.geometry.verticesNeedUpdate = true;
					
					var dcillworkplane = guiControls.Tw_Wall_Thickness*((guiControls.c_window_cill_Height_above_FFL - guiControls.workPlane)/guiControls.Hw_window_opening_dim_verticalHeight);
					var dheadworkplane = guiControls.Tw_Wall_Thickness*((guiControls.y_obstruction_Height_above_head_Window)/guiControls.Hw_window_opening_dim_verticalHeight);
					annotationLine2.geometry.vertices[ 1 ].y = guiControls.y_obstruction_Height_above_head_Window + guiControls.h_head_Window_Height_above_FFL;
					annotationLine2.geometry.vertices[ 1 ].z = guiControls.positionZ+dheadworkplane+guiControls.Tw_Wall_Thickness/2;
					annotationLine2.geometry.vertices[ 0 ].y = guiControls.workPlane;
					annotationLine2.geometry.vertices[ 0 ].z = guiControls.positionZ-dcillworkplane-guiControls.Tw_Wall_Thickness/2;
					annotationLine2.geometry.verticesNeedUpdate = true;
					
					annotationLine3.geometry.vertices[ 1 ].y = guiControls.y_obstruction_Height_above_head_Window + guiControls.h_head_Window_Height_above_FFL;
					annotationLine3.geometry.vertices[ 1 ].z = guiControls.D_obstruction_Position+(guiControls.Tw_Wall_Thickness/2);
					annotationLine3.geometry.vertices[ 0 ].y = guiControls.c_window_cill_Height_above_FFL + guiControls.Hw_window_opening_dim_verticalHeight/2;
					annotationLine3.geometry.vertices[ 0 ].z = guiControls.positionZ;
					annotationLine3.geometry.verticesNeedUpdate = true;
		} 
	function updateGeometry() {
	if(guiControls.space_Classification == 'Kitchen'){
	guiControls.workPlane=0.9;} else if (guiControls.space_Classification == 'Living Room'){
	guiControls.workPlane=0.8;}else{
	guiControls.workPlane=0.85;}
		guiControls.d_skyline_workplane_depth=((guiControls.D_obstruction_Position-guiControls.positionZ)*(guiControls.h_head_Window_Height_above_FFL-guiControls.workPlane))/guiControls.y_obstruction_Height_above_head_Window;
			var dcillworkplane = guiControls.Tw_Wall_Thickness*((guiControls.c_window_cill_Height_above_FFL - guiControls.workPlane)/guiControls.Hw_window_opening_dim_verticalHeight);
		guiControls.d_skyline_workplane_depth_full= guiControls.d_skyline_workplane_depth - guiControls.positionZ - dcillworkplane - guiControls.Tw_Wall_Thickness;
		if (guiControls.d_skyline_workplane_depth/guiControls.room_Depth<1){
		guiControls.P_skyline_Percentage_Depth = guiControls.d_skyline_workplane_depth_full*100/guiControls.room_Depth;} else {
		guiControls.P_skyline_Percentage_Depth = 100}
		guiControls.h_Hw_window_opening_dim_verticalHeight = guiControls.room_Height_floor_to_ceiling-Number(guiControls.c_window_cill_Height_above_FFL)-Number(guiControls.h_head_Window_Height_above_FFL);
		if (Number(guiControls.c_window_cill_Height_above_FFL)+Number(guiControls.Hw_window_opening_dim_verticalHeight)<guiControls.room_Height_floor_to_ceiling) {
		guiControls.h_head_Window_Height_above_FFL = Number(guiControls.c_window_cill_Height_above_FFL)+Number(guiControls.Hw_window_opening_dim_verticalHeight);
		wall_head.scale.set( 2.5, guiControls.room_Height_floor_to_ceiling-guiControls.h_head_Window_Height_above_FFL, Number(guiControls.Tw_Wall_Thickness));} else { 
		guiControls.h_head_Window_Height_above_FFL = guiControls.room_Height_floor_to_ceiling;
		wall_head.scale.x=0;
		wall_head.scale.z=0;
		}
		//Number(guiControls.c_window_cill_Height_above_FFL)+Number(guiControls.Hw_window_opening_dim_verticalHeight);
		if (Number(guiControls.c_window_cill_Height_above_FFL)+Number(guiControls.Hw_window_opening_dim_verticalHeight)>guiControls.room_Height_floor_to_ceiling) {
		var window_height = guiControls.room_Height_floor_to_ceiling-Number(guiControls.c_window_cill_Height_above_FFL);
		guiControls.Hw_window_opening_dim_verticalHeight = window_height;  }
		guiControls.H_obstruction_Height_above_mid_Window = guiControls.y_obstruction_Height_above_head_Window-(guiControls.Hw_window_opening_dim_verticalHeight/2)
	}
	/*function head_Window(){
		this.height = Number(guiControls.c_window_cill_Height_above_FFL)+Number(guiControls.Hw_window_opening_dim_verticalHeight);
		this.wall_height = 2.5-Number(guiControls.c_window_cill_Height_above_FFL)-Number(guiControls.Hw_window_opening_dim_verticalHeight);
	}*/
	
	
	function render(){
		updateGeometry();
		updateSplineOutline();
		workPlane.scale.set(1,guiControls.d_skyline_workplane_depth_full ,1);
		var moveWP = guiControls.d_skyline_workplane_depth-guiControls.d_skyline_workplane_depth_full;
		workPlane.position.set(0,guiControls.workPlane,guiControls.positionZ-(guiControls.d_skyline_workplane_depth-(Number(guiControls.Tw_Wall_Thickness)))/2 - moveWP/2);
		window1.position.set(0,guiControls.room_Height_floor_to_ceiling/2,guiControls.positionZ);
		window1.scale.set(1,guiControls.room_Height_floor_to_ceiling,1);
		axis.rotation.x = Number(guiControls.rotationX_deg)/180*Math.PI;
		axis.rotation.y = Number(guiControls.rotationY_deg)/180*Math.PI;
		axis.rotation.z = Number(guiControls.rotationZ_deg)/180*Math.PI;
		wall.rotation.x = Number(guiControls.rotationX_deg)/180*Math.PI;
		wall.rotation.y = Number(guiControls.rotationY_deg)/180*Math.PI;
		wall.rotation.z = Number(guiControls.rotationZ_deg)/180*Math.PI;
		wall_cill.scale.set( 2.5, Number(guiControls.c_window_cill_Height_above_FFL), Number(guiControls.Tw_Wall_Thickness) );
		wall_cill.position.set(-1.25,Number(guiControls.c_window_cill_Height_above_FFL)/2,guiControls.positionZ);
		wall_head.position.set(-1.25,(Number(guiControls.c_window_cill_Height_above_FFL)+Number(guiControls.Hw_window_opening_dim_verticalHeight))+(guiControls.room_Height_floor_to_ceiling-Number(guiControls.c_window_cill_Height_above_FFL)-Number(guiControls.Hw_window_opening_dim_verticalHeight))/2,guiControls.positionZ);
		wall.position.set(1.25,Number(guiControls.positionY) + guiControls.room_Height_floor_to_ceiling/2,Number(guiControls.positionZ));
		wall.scale.y = guiControls.room_Height_floor_to_ceiling;
		wall.scale.z = Number(guiControls.Tw_Wall_Thickness);
		wall2.rotation.y = 90/180*Math.PI;
		wall2.position.set(Number(guiControls.positionX)+2.35,Number(guiControls.positionY) + (guiControls.room_Height_floor_to_ceiling/2),Number(guiControls.positionZ)-(Number(guiControls.room_Depth)/2));
		wall2.scale.x = Number(guiControls.room_Depth);
		wall2.scale.y = guiControls.room_Height_floor_to_ceiling;
		wall2.scale.z = Number(guiControls.Tw_Wall_Thickness);
		wall3.scale.x = 5;
		wall3.scale.y = guiControls.room_Height_floor_to_ceiling;
		wall3.scale.z = Number(guiControls.Tw_Wall_Thickness);
		wall3.position.set(Number(guiControls.positionX),Number(guiControls.positionY) + (guiControls.room_Height_floor_to_ceiling/2),Number(guiControls.positionZ)-(Number(guiControls.room_Depth)));
		wall3.rotation.y = 180/180*Math.PI;
		floor.position.set(Number(guiControls.positionX),-0.15,Number(guiControls.positionZ)-(Number(guiControls.room_Depth))/2);
		floor.scale.x=5;
		floor.scale.z=Number(guiControls.room_Depth)+Number(guiControls.Tw_Wall_Thickness);
		ceiling.position.set(Number(guiControls.positionX),guiControls.room_Height_floor_to_ceiling+0.15,Number(guiControls.positionZ)-(Number(guiControls.room_Depth))/2);
		ceiling.scale.x=5;
		ceiling.scale.z=Number(guiControls.room_Depth)+Number(guiControls.Tw_Wall_Thickness);
		obstructionPlane.scale.set( 1, Number(guiControls.y_obstruction_Height_above_head_Window)+guiControls.h_head_Window_Height_above_FFL+0.3, 1 );
		obstructionPlane.position.y = ((guiControls.y_obstruction_Height_above_head_Window+ guiControls.h_head_Window_Height_above_FFL-0.3)/2);
		obstructionPlane.position.z = Number(guiControls.D_obstruction_Position)+(guiControls.Tw_Wall_Thickness/2);
	}
	
	function animate(){
		requestAnimationFrame(animate);
		render();     
		renderer.render(scene, camera);
	}
	$(window).resize(function(){
		SCREEN_WIDTH = window.innerWidth;
		SCREEN_HEIGHT = window.innerHeight;
		camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
		camera.updateProjectionMatrix();
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	});
	
	animate();
});