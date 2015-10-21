var camera, scene, renderer,
    geometry, material, mesh;

var meshes = [];

    init();
    animate();

    function init() {
        document.addEventListener( 'mousedown', onDocumentMouseDown_Ortho, false );
        scene = new THREE.Scene();

        //camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 1, 10000 );
        camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 100000);

        camera.position.z = 800;
        camera.position.y = 600;
        camera.position.x = 600;
        camera.lookAt(new THREE.Vector3(0,0,0));

        geometry3 = new THREE.BoxGeometry( 2400, 10, 2000 );
        material3 = new THREE.MeshBasicMaterial( { color: 0xa0afaf} );

        mesh3 = new THREE.Mesh( geometry3, material3 );


        light = new THREE.DirectionalLight (0xffffff, 0.4 )
        light.position.set (0,1200,0);
        light.castShadow = true;
        light.shadowCameraNear = 1;
        light.shadowCameraFar = 100000;
        light.shadowMapWidth = 1024; // default is 512
        light.shadowMapHeight = 1024; // default is 512
        light.shadowCameraRight     =  window.innerWidth / 2;
        light.shadowCameraLeft     = window.innerWidth / - 2;
        light.shadowCameraTop      =  window.innerHeight / 2;
        light.shadowCameraBottom   = window.innerHeight / - 2;

        scene.add( mesh3 );
        scene.add( light );



        mesh3.position.y = -100

        renderer = new THREE.WebGLRenderer( { alpha: true } );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize( window.innerWidth, window.innerHeight );

        $('.visualization').append( renderer.domElement );

        // Render initial data once the page has loaded fully
        $(document).ready(function(){
            renderData(_querydata);
        });

        // Execute fetchData whenever we click on the filter button
        $(document).on('click', '.filter', fetchData);
    }

    function fetchData() {
        // Array of filters might look like this
        // (would obviously be set from some select/slider element though)
        var filters = [
            {
                field: 'x',
                operator: '>=',
                value: 2
            }
        ];

        // Request JSON from the /data endpoint, passing our filters
        $.getJSON('/data', {
            filters: filters
        }, function(data){
            reset();
            renderData(data);
        });
    }

    function renderData(data) {
        var d;
        for (var i = 0; i < data.length; i++){
            d = data[i];
            addBar(d.x * 50, d.y * 2, d.z * 50);
        }
    }

    function animate() {

        requestAnimationFrame( animate );
        render();
    }

    function render() {
        renderer.render( scene, camera );
    }

    function reset() {
        for (var i = 0; i < meshes.length; i++) {
            scene.remove( meshes[i] );
        }
        meshes = [];
    }

    function addBar(x,y,z){
      geometry = new THREE.BoxGeometry( 50, y, 50 );
      for ( var i = 0; i < geometry.faces.length; i ++ ) {
          geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
      }
      material = new THREE.MeshBasicMaterial( { shading: THREE.FlatShading, vertexColors: THREE.FaceColors} );
      geometry.colorsNeedUpdate = true;
      mesh = new THREE.Mesh( geometry, material );
      mesh.position.y = 10 + y/2;
      mesh.position.x = x - 500;
      mesh.position.z = z;
      meshes.push(mesh);
      scene.add( mesh );
    }
