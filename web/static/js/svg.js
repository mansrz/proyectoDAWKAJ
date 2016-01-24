
    $(document).on('ready', function () {

	  $('#btnGuardarArchivo').click(function(){
		  var json = JSON.stringify(graphLienzo);
      var nombre =   $('#nombre').val();
      var descripcion =   $('#descripcion').val();
      console.log(nombre);
      console.log(descripcion);
		  $.post('/guardarImagen/',{'ruta':json, 'nombre':nombre,'descripcion':descripcion, 'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()}, function(data){
			 console.log(data);
		  });
	  });

	  $('#btnCargarImagen').click(function(){
		  $.get('/cargarImagen/',function(data){
			  console.log(data);
			  graphLienzo.fromJSON((JSON.parse(data)));
			});
	  });

    $('#chkshared').attr('checked', false);
    $("#divshared").css("visibility", "hidden");

    $('#chkshared').on( 'click', function() {
        if( $(this).is(':checked') ){
              $("#divshared").css("visibility", "visible");
        } else {
              $("#divshared").css("visibility", "hidden");
        }
    });

	  <!-- JOINT JS
		var erd = joint.shapes.erd;
		var cellSelected, cellSelectedToDelete;

	  var graphLienzo = new joint.dia.Graph();

		var paper = new joint.dia.Paper({
			el: $('#carrito'),
			width: 950,
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
     $("#divAtributoTabla").css("visibility", "visible");
		$('#InputAttr').prop('disabled',false);
	}

});


<!-- click sobre tabla para seleccionarla y eliminarla -->
paper.on('cell:pointerclick', function(cellView, evt, x, y) {
	if (cellView.model instanceof joint.shapes.devs.Model) { //interesada solo en models no en links
		cellSelectedToDelete= cellView.model; // estoy selccionando el model para que se le cambien los atributos
		//$('#InputAttr').prop('disabled',false);
  }
});
<!-- **************************************** FIN TIGGERS ****************************************************


	  <!-- GUARDAR SVG
	    var template = 0, svg, objeto1, objeto2, newel;
      /*
		   $('#save').on('click', function(){

			 var json = JSON.stringify(graphLienzo);

			alert("SVG creado con éxito");
		  });

	<!-- FIN GUARDAR SVG*/




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
    $('#InputAttr').val("");
		$('#InputAttr').prop('disabled',true);
    $("#divAtributoTabla").css("visibility", "hidden");
	});


		<!-- ***********************************  ELIMINAR TABLA *******************************************-->


	$('#btnEliminarTabla').click(function(){
	if(cellSelectedToDelete){
		cellSelectedToDelete.remove();
    $("#divAtributoTabla").css("visibility", "hidden");
		}
		else alert('Seleccione tabla a eliminar');
	});

  $('#btnLimpiarTabla').click(function(){
    var limpiar = "";
    cellSelected.attr({
			'.label': {text: limpiar}
		});

	});

//FIN DEL JQUERY
});
