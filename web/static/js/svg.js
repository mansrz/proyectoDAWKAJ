
    $(document).on('ready', function () {

      $.ajax({
              type: "GET",
              url:'/imagen',
              async: true,
              dataType:"json",
              contenType:"application/Json; charset=utf-8",

              success: function(imagenes){
              //  console.log(imagenes);
                //var data = JSON.parse(imagenes);
                var data = imagenes;
              //  $("#rutaJson").text(data);


                    graphLienzo.clear();
                    var paper = new joint.dia.Paper({
                        el: $('#carrito2'),
                        width: 800,
                        height: 600,
                        gridSize: 1,
                        model: graphLienzo,
                        defaultLink: new joint.dia.Link({
                        attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } ,
                        '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z' }}
                        }),
                      });
                    //  alert(data);
                      graphLienzo.fromJSON(data);

                   //fin


              },
              error: function(data){
                console.log(data.responseText);

              }
        });

	  <!-- JOINT JS
		var erd = joint.shapes.erd;
		var cellSelected, cellSelectedToDelete;

	  var graphLienzo = new joint.dia.Graph();

		var paper = new joint.dia.Paper({
			el: $('#carrito'),
			width: 800,
			height: 600,
			gridSize: 1,
			model: graphLienzo,
			defaultLink: new joint.dia.Link({
			attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } ,
			'.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z' }}
			}),
		});



<!-- **************************************** ELEMENTOS JOINT JS ****************************************************


var uml = joint.shapes.uml;
var textoDiagrama =
"CLASE\nid: int\nnombre: string\n+setNombre()\n+getNombre()";
var t1 = new joint.shapes.devs.Model({
    position: { x: 50, y: 50 },
    size: { width: 90, height: 90 },
    inPorts: ['in1','in2'],
    outPorts: ['out'],
    attrs: {
        '.label': {text: textoDiagrama},

		<!--text: 'Class', 'ref-x': .4, 'ref-y': .2},
        rect: { fill: '#feb662' },
        '.inPorts circle': { fill: '#16A085' },
        '.outPorts circle': { fill: '#E74C3C' }
    }
});





//graphLienzo.addCell(t1);


var m1 = {

    mammal: new uml.Interface({
        position: { x:0  , y: 0 },
        size: { width: 120, height: 100 },
        name: 'Mammal',
        attributes: ['dob: Date'],

        methods: ['+ setDateOfBirth()','+ getAgeAsDays()'],
        attrs: {
            '.uml-class-name-rect': {
                fill: '#feb662',
                stroke: '#ffffff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect, .uml-class-methods-rect': {
                fill: '#fdc886',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-text': {
                ref: '.uml-class-attrs-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            },
            '.uml-class-methods-text': {
                ref: '.uml-class-methods-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }

        }
    })
};




<!-- FLECHAS

	 var f1 = new joint.dia.Link({
    source: { x: 10, y: 20 },
    target: { x: 100, y: 20 },
    attrs: {}
});


f1.attr({
    '.connection': { stroke: '#222138' },
    '.marker-source': { fill: '#31d0c6', stroke: 'none', d: 'M 10 0 L 0 5 L 10 10 z' },
    '.marker-target': { fill: '#fe854f', stroke: '#7c68fc', d: 'M 10 0 L 0 5 L 10 10 z' }
});
var f2 = new joint.dia.Link({
    source: { x: 10, y: 80 },
    target: { x: 100, y: 80 },
    attrs: {}
});

f2.attr({
    '.connection': { stroke: '#fe854f', 'stroke-width': 4 },
    '.marker-source': { stroke: '#fe854f', fill: '#fe854f', d: 'M 10 0 L 0 5 L 10 10 z' },
    '.marker-target': { stroke: '#fe854f', fill: '#fe854f', d: 'M 10 0 L 0 5 L 10 10 z' }
});



<!-- ************************************************** TRIGGERS *************************************************


<!-- DOBLE CLICK EN PAPER PARA CREAR TABLA-->

paper.on('blank:pointerdblclick', function(cellView, evt) {

	graphLienzo.addCell(t1.clone());

});


var cellSelected;

<!-- doble click sobre tabla para cargar los atributos -->
paper.on('cell:pointerdblclick', function(cellView, evt, x, y) {
	if (cellView.model instanceof joint.shapes.devs.Model) { //interesada solo en models no en links
		cellSelected= cellView.model; // estoy selccionando el model para que se le cambien los atributos
	}

});



<!-- click sobre tabla para seleccionarla y eliminarla -->
paper.on('cell:pointerclick', function(cellView, evt, x, y) {
	if (cellView.model instanceof joint.shapes.devs.Model) { //interesada solo en models no en links
		cellSelectedToDelete= cellView.model; // estoy selccionando el model para que se le cambien los atributos
		$('#InputAttr').prop('disabled',false);
  }
});
<!-- **************************************** FIN TIGGERS ****************************************************


	  <!-- GUARDAR SVG
	    var template = 0, svg, objeto1, objeto2, newel;
		   $('#save').on('click', function(){

			 var json = JSON.stringify(graphLienzo);

			alert("SVG creado con éxito");
		  });

	<!-- FIN GUARDAR SVG




	<!-- *************************************** DOWNLOAD AS JASON *************************************-->

	  var jsonName =  'er.json'; // You can use the .txt extension if you want

	 function donwloadJsonFile(jsonName) {
		 var json=JSON.stringify(graphLienzo);
		mimeType ='application/json';
		 btnDownloadJson.setAttribute('download', jsonName);
		 btnDownloadJson.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(json));

	 }


	function downloadPdfFile(name, dataUriString) {
	  var link = document.createElement('a');
	  link.addEventListener('click', function(ev) {
		link.href = dataUriString;
		link.download = name;
		document.body.removeChild(link);
	  }, false);
	  document.body.appendChild(link);
	  link.click();
	}


	$('#btnDownloadJson').click(function(){
		donwloadJsonFile(jsonName);
	});


	<!-- ***********************************  SET ATRIBUTOS     *******************************************-->


	$('#btnGuardarAttr').click(function(){
		cellSelected.attr({
			'.label': {text: $('#InputAttr').val()}
		});
		$('#InputAttr').prop('disabled',true);

	});


		<!-- ***********************************  ELIMINAR TABLA *******************************************-->


	$('#btnEliminarTabla').click(function(){
	if(cellSelectedToDelete){
		cellSelectedToDelete.remove();
		}
		else alert('Seleccione tabla a eliminar');
	});



	<!-- ******************************************* CARGAR ARCHIVO ***********************************************


      /*SVG*/
      $("#btnCargar").click(function () {

  		 var data =
          '{"cells":[{"type":"devs.Model","size":{"width":90,"height":90},"inPorts":["in1","in2"],"outPorts":["out"],"position":{"x":50,"y":50},"angle":0,"id":"70f7dfed-3c70-4235-af5a-f6bdf34c19d5","embeds":"","z":1,"attrs":{".label":{"text":"AJOS"},"rect":{"fill":"#feb662"},".inPorts circle":{"fill":"#16A085"},".outPorts circle":{"fill":"#E74C3C"},".inPorts>.port0>.port-label":{"text":"in1"},".inPorts>.port0>.port-body":{"port":{"id":"in1","type":"in"}},".inPorts>.port0":{"ref":".body","ref-y":0.25},".inPorts>.port1>.port-label":{"text":"in2"},".inPorts>.port1>.port-body":{"port":{"id":"in2","type":"in"}},".inPorts>.port1":{"ref":".body","ref-y":0.75},".outPorts>.port0>.port-label":{"text":"out"},".outPorts>.port0>.port-body":{"port":{"id":"out","type":"out"}},".outPorts>.port0":{"ref":".body","ref-y":0.5,"ref-dx":0}}}]}';

        //  var graph = new joint.dia.Graph();
          graphLienzo.clear();
        /*  var paper = new joint.dia.Paper({
            el: $('#carrito'),
            width: 800,
            height: 600,
            gridSize: 1,
            model: graphLienzo,
            defaultLink: new joint.dia.Link({
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } ,
            '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z' }}
            }),
          });*/


          //  alert(data);
          	graphLienzo.fromJSON(JSON.parse(data));
                    });

 });
