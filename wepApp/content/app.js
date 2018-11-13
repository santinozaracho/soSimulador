var sizeMemory = 256; // Tamaño de memoria
var typeMemory = "Variable"; // tipo de Memoria
var fitMemory = "First Fit"; //Ajuste de memoria
var algorithm = "FCFS"; //Algoritmo de Planificacion
var generalQuantum = 0; // Quantum para roundRobin
var arrayProcess = []; //Arreglo con los procesos importados de la BD
var procesosTerminados = []; // cola de procesos Terminado
var particiones = []; // Memoria variable
var colaListo = []; //Cola de procesos Listos
var cont = 0;//contador de Particiones fijas
var maxpart = 5; //cantidad maxima de particiones fijas
var memFija = []; // memoria fija
var tiempo = 0
var lenArrayProcess = 0


$(function () {
  $("[data-toggle=popover]").popover({
        html: true
    });
})

$(document).ready(function () {
    getData();

    $(".quantumIn").hide();

    $(".optionFitOne").hide();

    console.log(sizeMemory);
    console.log(typeMemory);
    console.log(fitMemory);
    console.log(algorithm);

    $(".sizeInput, .arrivalInput, .firstCpu, .inOut, .lastCpu, .quantumIn, .fixedPart, .inputMemory").keydown(function (e) {
       if ((e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         (e.keyCode >= 35 && e.keyCode <= 40) ||
         $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1) {
         return;
      }
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
         (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }

    });

   //control de la obtención del tamaño de la memoria
   $(".optionOne").click(function(){
      sizeMemory = parseInt($(".optionOne > input").val());
      $(".tamInfo").text("256");
      maxpart = 5;
      $(".textoAlertMem").text("5 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
      console.log(sizeMemory)
   });
   $(".optionTwo").click(function(){
       sizeMemory = parseInt($(".optionTwo > input").val());
       $(".tamInfo").text("512");
       maxpart = 8;
       $(".textoAlertMem").text("8 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
       console.log(sizeMemory)
   });
   $(".optionThree").click(function(){
      sizeMemory = parseInt($(".optionThree > input").val());
      $(".tamInfo").text("1024");
      maxpart = 12;
      $(".textoAlertMem").text("12 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
      console.log(sizeMemory)
   });
   //--------------------------------

   //control del tipo de memoria
   $(".optionTypeOne").click(function(){
      $(".fixedPart").show();
      $(".memInfo").text("Fija");
      var valueCurrent = $(".optionTypeOne > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
      $(".alertMem").addClass("show");
      $("#collapseExample").addClass("show");
      $(".optionFitTwo").hide();
      $(".optionFitOne").show();

   });
   $(".optionTypeTwo").click(function(){
      $(".fixedPart").hide();
      $(".memInfo").text("Variable");
      var valueCurrent = $(".optionTypeTwo > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
      $(".alertMem").removeClass("show");
      $(".alertMem").addClass("hide");
      $("#collapseExample").removeClass("show");
      //$("#collapseExample").addClass("show");
      $(".optionFitTwo").show();
      $(".optionFitOne").hide();

   });
   //-------------------------

   //control de ajuste de memoria
   $(".optionFitOne").click(function(){
      var valueCurrent = $(".optionFitOne > input").val();
      fitMemory = valueCurrent;
      console.log(fitMemory);
      $(".ajuInfo").text("Best Fit");
   });
   $(".optionFitTwo").click(function(){
      var valueCurrent = $(".optionFitTwo > input").val();
      fitMemory = valueCurrent;
      console.log(fitMemory);
      $(".ajuInfo").text("First Fit");
   });
   $(".optionFitThree").click(function(){
      var valueCurrent = $(".optionFitThree > input").val();
      fitMemory = valueCurrent;
      console.log(fitMemory);
      $(".ajuInfo").text("Worst Fit");
   });
   //------------------------------------

   //control de la seleccion de algoritmo
   $(".optionPlaningOne").click(function(){
      var valueCurrent = $(".optionPlaningOne > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").val("");
      $(".quantumIn").hide();
      $(".algoInfo").text("FCFS");
   });
   $(".optionPlaningTwo").click(function(){
      var valueCurrent = $(".optionPlaningTwo > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").show();
      $(".algoInfo").text("RR");
   });
   $(".optionPlaningThree").click(function(){
      var valueCurrent = $(".optionPlaningThree > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").val("");
      $(".quantumIn").hide();
      $(".algoInfo").text("SJF");
   });
   $(".optionPlaningFour").click(function(){
      var valueCurrent = $(".optionPlaningFour > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").hide();
      $(".algoInfo").text("SRTF");
   });

   $(".quantumIn").keyup(function(){

     $('.alertProcess').removeClass('show');
     $('.alertProcess').addClass('hide');

     var quanto = parseInt($('.quantumIn').val())

     if (quanto > 0) {
       generalQuantum = quanto;
       $(".algoInfo").text("RR - Q:"+quanto);
     }else {

       $(".textoAlertProc").text("Debe ingresar un Quanto mayor a cero.");
       $('.alertProcess').addClass('show');
     }

    });

    $(".sizeInput").keyup(function(){

      $('.alertProcess').removeClass('show');
      $('.alertProcess').addClass('hide');

      var tamProc = parseInt($('.sizeInput').val())
      var maxTamPocess = getMaxProcessSize(typeMemory)

      if (tamProc > maxTamPocess) {
        $(".textoAlertProc").text("El tamaño del proceso no puede ser mayor al tamaño de la Memoria o Particion.");
        $('.alertProcess').addClass('show');
      }
     });


   //------------------------------------
$(document).on('click','.editarNombre',function(){
    $('.nomProc').prop("disabled", false)});

$(document).on('click','.memInfo',function(){
     $('[href="#memoria"]').tab('show')});

$(document).on('click','.ajuInfo',function(){
     $('[href="#memoria"]').tab('show')});

$(document).on('click','.tamInfo',function(){
     $('[href="#memoria"]').tab('show')});

$(document).on('click','.algoInfo',function(){
     $('[href="#procesos"]').tab('show')});

   //seguir
   $(".startButton").click(function(){

      //var arrayFinish = tiemposOcioso(firstComeFirstServed());  roundRobin
      //var arrayFinish = tiemposOcioso(roundRobin(5));

      $(".startButton").removeClass('btn-success').addClass('btn-secondary').text("Procesado").prop("disabled", true);

      var algortimoLocal;

      switch (algorithm) {
        case "FCFS":
          var arrayFinish = tiemposOcioso(firstComeFirstServed());
          break;
        case "RR":
          var arrayFinish = tiemposOcioso(roundRobin(generalQuantum));
          break;
        case "SJF":
          var arrayFinish = tiemposOcioso(shortestJobFirst());
          break;
        case "SRTF":
          var arrayFinish = tiemposOcioso(shortRemainingTimeFirst());
          break;
      }
      //Carga de las Barras
      //calculamos el tamaño de cada Tiempo para representarlo en la barra de porcentajes


      var arrayCpu = arrayFinish[0];
      var ultTiempo = arrayCpu[arrayCpu.length -1].outTime;
      var unit = 100/ultTiempo;
      var firstIrruption = arrayCpu[0].irrupctionTime * unit;
      if (arrayCpu[0].name == 'O') {
        arrayCpu[0].color = '#e9ecef'
      }else {
        arrayCpu[0].color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
      }
  //    if(firstIrruption < 4){
          //firstIrruption = 4
    //  }
      $('#proccessBar').attr('aria-valuenow', firstIrruption).css('width',firstIrruption+'%');
      var tagOne = $('#proccessBar').find('a');

      if(arrayCpu[0].name == "O"){
        tagOne.attr('data-original-title', 'Tiempo Ocioso');
      }else{
        tagOne.attr('data-original-title', 'Datos de '+arrayCpu[0].name);
      }

      var htmlPopover = '<div><b>De '+arrayCpu[0].inTime+' a '+arrayCpu[0].outTime+'</b></div>';
      htmlPopover += '</br><div><b>Tiempo de Ejecucion: '+arrayCpu[0].irrupctionTime+'</b></div>';
      if(arrayCpu[0].finish){
          htmlPopover += '</br><div><b>Proceso Terminado</b></div>';
          var markupFirst = "<tr><th scope='row'>"+arrayCpu[0].name+"</th><td>"+arrayCpu[0].outTime+"</td><td>"+arrayCpu[0].arrivalTime+"</td><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime)+"</td></tr>";
          $('.tableResponse > tbody:last-child').append(markupFirst);

          var markWaitFirst = "<tr><th scope='row'>"+arrayCpu[0].name+"</th><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime)+"</td><td>"+arrayCpu[0].irrupctionTime+"</td><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime-arrayCpu[0].irrupctionTime)+"</td></tr>";
          $('.tableWait > tbody:last-child').append(markWaitFirst);
      }

      tagOne.attr('data-content', htmlPopover);
      tagOne.text(arrayCpu[0].name);
      if (firstIrruption < 4) {
        tagOne.css("background-color", arrayCpu[0].color).text("-");
      }else {
        tagOne.css("background-color", arrayCpu[0].color).text(arrayCpu[0].name);
      }
      tagOne.css("border-color", arrayCpu[0].color);


      for (var i = 1; i < arrayCpu.length; i++) {

          if(arrayCpu[i].color == null){
            if (arrayCpu[i].name == 'O') {
              arrayCpu[i].color = '#e9ecef';
            }else {
              var ind = arrayCpu.findIndex(x => x.name == arrayCpu[i].name);
              if(ind > -1 && arrayCpu[ind].color != null){
                arrayCpu[i].color = arrayCpu[ind].color;
              }else{
                arrayCpu[i].color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
              }
            }
          }

          var item = arrayCpu[i];
          var newItem = $('#proccessBar').clone();

          var irruption = item.irrupctionTime * unit;

        //  if(irruption < 4){
              //irruption = 4
          //}

          newItem.attr('aria-valuenow', item.irruption).css('width',irruption+'%');
          var tag = newItem.find('a');
          var htmlTag = '<div><b>De '+item.inTime+' a '+item.outTime+'</b></div>';

          if(arrayCpu[i].name == 'O'){
            tag.attr('title', 'Tiempo Ocioso');
            tag.css("background-color", item.color).text("-");
          }else{
            tag.attr('title', 'Datos de '+item.name);
            if (irruption < 4 ) {
              tag.css("background-color", item.color).text("-");
            }else {
              tag.css("background-color", item.color).text(item.name);
            }

            htmlTag += '<div><b>Tiempo de Ejecucion: '+item.irrupctionTime+'</b></div>';
          }

          if(item.finish){
            htmlTag += '</br><div><b>Proceso Terminado</b></div>';

            var markup = "<tr><th scope='row'>"+item.name+"</th><td>"+item.outTime+"</td><td>"+item.arrivalTime+"</td><td>"+(item.outTime-item.arrivalTime)+"</td></tr>";
            $('.tableResponse > tbody:last-child').append(markup);

            var markWait = "<tr><th scope='row'>"+item.name+"</th><td>"+(item.outTime-item.arrivalTime)+"</td><td>"+item.irrupctionTime+"</td><td>"+(item.outTime-item.arrivalTime-item.irrupctionTime)+"</td></tr>";
            $('.tableWait > tbody:last-child').append(markWait);

          }
          //Graficamos la Memoria
          if (arrayCpu[i].name != 'O' && arrayCpu[i].memoria != null ) {
            htmlTag += 'Memoria:';
            //--Grafico de memoria
            htmlTag += graficarMem(arrayCpu[i].memoria);
          }



          //--Fin grafico de memoira
          tag.attr('data-content', htmlTag);

          tag.css("border-color", item.color);
          $('#progressCpu').append(newItem);

      }

      //-------- E/S -----

      var arrayEs = arrayFinish[1];
      var firstIrruptionEs = arrayEs[0].irrupctionTime * unit;
      var indx = arrayCpu.findIndex(x => x.name == arrayEs[0].name);
      if (indx == -1){
        arrayEs[0].color = '#e9ecef';
      }else {
        arrayEs[0].color = arrayCpu[indx].color
      }
    //  if(firstIrruptionEs < 4){
        //  firstIrruptionEs = 4
      //}
      $('#proccessEs').attr('aria-valuenow', firstIrruptionEs).css('width',firstIrruptionEs+'%');

      var tagOneEs = $('#proccessEs').find('a');

      var htmlPopoverEs = '<div><b>De '+arrayEs[0].inTime+' a '+arrayEs[0].outTime+'</b></div>';
      tagOneEs.attr('data-content', htmlPopoverEs);

      if(arrayEs[0].name == "O"){
        tagOneEs.attr('data-original-title', 'Tiempo Ocioso');
        tagOneEs.css("background-color", arrayEs[0].color).text("-");
      }else{
        if (firstIrruptionEs < 4) {
          tagOneEs.css("background-color", arrayEs[0].color).text("-");
        }else {
          tagOneEs.css("background-color", arrayEs[0].color).text(arrayEs[0].name);
        }
        tagOneEs.attr('data-original-title', 'Datos de '+arrayEs[0].name);

      }

      tagOneEs.css("border-color", arrayEs[0].color);

      for (var i = 1; i < arrayEs.length; i++) {

          if(arrayEs[i].color == null){

            if (arrayEs[i].name == 'O') {
              arrayEs[i].color = '#e9ecef';

            }else {
              var ind = arrayCpu.findIndex(x => x.name == arrayEs[i].name);
              if(ind > -1 && arrayCpu[ind].color != null){
                arrayEs[i].color = arrayCpu[ind].color;
              }else{
                arrayEs[i].color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
              }

            }
          }

          var item = arrayEs[i];
          var newItem = $('#proccessBar').clone();

          var irruption = item.irrupctionTime * unit;

          //if(irruption < 4){
            //  irruption = 4
        //  }

          newItem.attr('aria-valuenow', item.irruption).css('width',irruption+'%');
          var tag = newItem.find('a');

          var htmlTag = '<div><b>De '+item.inTime+' a '+item.outTime+'</b></div>';

          if(item.name == "O"){
            tag.attr('title', 'Tiempo Ocioso');
            tag.css("background-color", item.color).text("-");
          }else{
            if (irruption < 4) {
              tag.css("background-color", item.color).text("-");
            }else {
              tag.css("background-color", item.color).text(item.name);
            }

            tag.attr('title', 'Datos de '+item.name);
            htmlTag += '</br><div><b>Tiempo de Ejecucion: '+item.irrupctionTime+'</b></div>';
          }

          tag.attr('data-content', htmlTag);

          tag.css("border-color", item.color);
          $('#progressEs').append(newItem);
      }

      //----- fin E/S --------


   });
   //--------------

});

$(document).on('click', ".one", function (e) {
    e.preventDefault();
    $("[data-toggle=popover]").popover({
        html: true
    });
});



//var part = { "partid":1, "size":0}
//inputs para crear las particiones
$(document).on('click', '.btn-add', function(e){
    $('.alertPart').removeClass('show');
    $('.alertPart').addClass('hide');

    $('.alertPart').removeClass('alert-success');
    $('.alertPart').addClass('alert-danger');

    e.preventDefault();

    var controlForm = $('.controls form:first'),
        currentEntry = $(this).parents('.entry:first');

    //Variable que nos indica en cada momento el tamaño disponible
    var tamdisp = sizeMemory

    //Verificamos la existencia de alguna particion
    if(memFija.length > 0){
      // memFija.forEach(function(sizepart,index) {
      //   tamdisp =  tamdisp - sizepart
      // })
      for (var i = 0; i < memFija.length; i++) {
        tamdisp = tamdisp - memFija[i].size;
      }

    }

    //Tamaño de particion ingreasda
    var sizepart = currentEntry.find('input').val();

    sizepart = parseInt(sizepart);

    if (sizepart > 0) {

      if (sizepart <= tamdisp) {

        //se puede agregar particion
        //memFija.push(sizepart)

        var objPart = {};
        objPart.IdPart = cont;
        objPart.size = sizepart;
        objPart.used = null;

        memFija.push(objPart);


        cont = cont + 1;

        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first');

        if (cont < maxpart) {
          var newEntry = $(currentEntry.clone()).appendTo(controlForm);

          newEntry.find('input').val('');

          newEntry.find('.textPart').text("Partición " + cont)

          controlForm.find('.entry:not(:last) .inputMemory')
            .addClass('classDisabled')
            .removeClass('inputMemory')
            .prop("disabled", true);

          controlForm.find('.entry:not(:last) .btn-add')
              .removeClass('btn-add').addClass('btn-remove')
              .removeClass('btn-success').addClass('btn-danger')
              .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>');

            }else {
          controlForm.find('.entry:last .inputMemory')
            .addClass('classDisabled')
            .removeClass('inputMemory')
            .prop("disabled", true);

          controlForm.find('.entry:last .btn-add')
              .removeClass('btn-add').addClass('btn-remove')
              .removeClass('btn-success').addClass('btn-danger')
              .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>');
        }

      }else {

        //Alerta por Nueva Particion muy grande
        $(".textoAlertPart").text("El tamaño de la partición es mayor al disponible.");
        $('.alertPart').addClass('show');

      }

    }else {
      $(".textoAlertPart").text("Debes Ingresar un Valor");
      $('.alertPart').addClass('show');
      }

//console.log(memFija);
});


function elimPart(partSize){
  //EliminamosFisicamente
  for (var i = 0; i < memFija.length; i++) {
    if (memFija[i].size == partSize){
      memFija[i].size = 0;
    }
  }
};

//Borrado de particion
$(document).on('click','.btn-remove', function(){

  var currentEntry = $(this).parents('.entry:first');
  var sizeElim = currentEntry.find('input').val();
  elimPart(sizeElim);
  currentEntry.find('input').val('');
  currentEntry.find('.classDisabled')
    .addClass('inputMemory')
    .removeClass('classDisabled')
    .prop("disabled", false);

  currentEntry.find('.btn-remove')
      .removeClass('btn-remove').addClass('btn-udp')
      .removeClass('btn-danger').addClass('btn-success')
      .html('<span class="glyphicon glyphicon-plus">Agregar</span>');
  $(".textoAlertPart").text("Particion Eliminada Correctamente.");
  $('.alertPart').removeClass('alert-danger');
  $('.alertPart').addClass('alert-success');
  $('.alertPart').addClass('show');
  });

function setPart(sizePart){
  for (var i = 0; i < memFija.length; i++) {
    if (memFija[i].size == 0){
      memFija[i].size = sizePart;
    };
  }
};
//Reinput luego de haber borrado una particion
$(document).on('click','.btn-udp', function(){
  $('.alertPart').removeClass('show');
  $('.alertPart').addClass('hide');

  var currentEntry = $(this).parents('.entry:first');
  var sizeadd = parseInt(currentEntry.find('input').val());
  if (sizeadd > 0) {
    setPart(sizeadd);

    currentEntry.find('.inputMemory')
      .addClass('classDisabled')
      .removeClass('inputMemory')
      .prop("disabled", true);

    currentEntry.find('.btn-udp')
        .removeClass('btn-add').addClass('btn-remove')
        .removeClass('btn-success').addClass('btn-danger')
        .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>');

  }else {
    $(".textoAlertPart").text("Debes Ingresar un Valor");
    $('.alertPart').removeClass('alert-success');
    $('.alertPart').addClass('alert-danger');
    $('.alertPart').addClass('show');
  }
  });

//button siguiente
$(document).on('click','.siguiente', function(e){
  $('[href="#procesos"]').tab('show')
});

//button siguiente2
$(document).on('click','.siguiente2', function(e){
  $('[href="#visualizacion"]').tab('show');
});

//Funciones para la adminitracuon de al me
//crea una particion nueva
function newPart(size){
  var part = {};
  part.IdPart = null;
  part.size = size;
  part.used = null;
  return part
}
//calcula
function usedMem(parts){
  var totused = 0;
  for (var i = 0; i < parts.length; i++) {
    if (part.used != null){
      totused += parts[i].used.size
    }
  }
  return totused

}
//Verifica si se produce fragmentacion ext.
function fragExt(parts,proc){
    var used = usedMem(parts);
    if (sizeMemory - used >= proc.size) {
      return true
    }
    return false
}
//junta las particiones contiguas para obtener una mas grande
function desFrag(parts){
  var max = parts.length
  for (var j = 0; j < max ; j++) {
    for (var i = 0; i < parts.length - 1; i++) {
        if (parts[i].used == null && parts[i+1].used == null) {
          var rePar = newPart(parts[i].size + parts[i+1].size);
          rePar.IdPart = parts[i].IdPart;
          rePar.used = null
          //parts.splice(i+1,1);
          parts.splice(i,2);
          parts.splice(i,0,rePar);
        }
    }
  }
  return parts
}
//no hay desarollo todavia
function liberarParts(name){
  for (var i = 0; i < particiones.length; i++) {
    if (particiones[i].used) {
      if (particiones[i].used.name == name ) {
        particiones[i].used = null
        return true
      }
    }
  }
  return false
}
//devuelve el IdPart mayor para poder crear una nueva unica particion
function obtNewIdPart(parts){
  maxid = 0
  for (var i = 1; i < parts.length; i++) {
    if (parts[i].IdPart > maxid){
      maxid = parts[i].IdPart;
    }
  }
  return maxid
}
//Funcion de carga de memoria inicial
function cargaMem(){

  if (typeMemory = 'Variable') {
    //Para part Variables
    if (particiones.length == 0) {
      part = newPart(sizeMemory);
      part.IdPart = 0
      particiones.push(part)
      //mandamos a la Cola de Listos
    }
    particiones = desFrag(particiones)
    //tratamiento para Worst fitMemory
    if (fitMemory == 'Worst Fit'){
      for (var i = 0; i < arrayProcess.length; i++) {
        if (arrayProcess[i].arrivalTime <= tiempo) {
          var ix = worstFit(particiones,arrayProcess[i]);
          if (ix > 0) {
            //asinamos el proceos a la particion
            particiones = asignarProcVar(particiones,arrayProcess[i],ix)
            i = -1
          }else {
            if (ix == 0) {
              particiones = asignarProcVar(particiones,arrayProcess[i],ix)
              i = -1
              }else {
                return false
              }
            }
          }
        }
        return false
      }
    //Para First
    if (fitMemory == 'First Fit'){
      for (var i = 0; i < arrayProcess.length; i++) {
        if (arrayProcess[i].arrivalTime <= tiempo){
          var ix = firstFit(particiones,arrayProcess[i]);
          if (ix > 0) {
            //mandamos a la Cola de Listos
            particiones = asignarProcVar(particiones,arrayProcess[i],ix)
            i = -1
          }else {
            if (ix == 0) {
              particiones = asignarProcVar(particiones,arrayProcess[i],ix)
              i = -1
            }else {
              return false
            }

            }
        }
      }
      return false
  }

}

  if (typeMemory = "Fija") {
    if (fitMemory == 'Best Fit'){
      for (var i = 0; i < arrayProcess.length; i++) {
        if (arrayProcess[i].arrivalTime <= tiempo) {
          var ix = bestFit(memFija,arrayProcess[i]);
          if (ix) {
            particiones = asignarProcFij(memFija,arrayProcess[i],ix);
            i = -1;
          }
        }
      }
    }
    if (fitMemory == 'First Fit'){
      for (var i = 0; i < arrayProcess.length; i++) {
        if (arrayProcess[i].arrivalTime <= tiempo) {
          var ix = firstFit(memFija,arrayProcess[i]);
          if (ix) {
            particiones = asignarProcVar(memFija,arrayProcess[i],ix);
            i = -1;
          }
        }
      }
    }
  }

};

function graficarMem(particiones){
  barraProg = $('.barraMem');
  barraProg.empty();
  barraProg.append('<div class="progress-bar itemMem" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">F</div>');
  itemProg = barraProg.find('.itemMem');
  perc = 100/sizeMemory;
  //Carga del primer elememento de la barra
  tamBar = particiones[0].size * perc;
//  var tagB = itemProg.find('a');
  itemProg.attr('aria-valuenow', tamBar ).css('width',tamBar+'%');
  if (particiones[0].used == null) {
    itemProg.text('F').removeClass('bg-warning').addClass('bg-success');
  //  tagB.css("background-color","#28a745" ).text("F");
  }else {
    itemProg.text(particiones[0].used.name).removeClass('bg-success').addClass('bg-warning');
  //  tagB.css("background-color", "#ffc107").text(particiones[0].used.name);
  }
  //carga de los siguientes elemeetos
  for (var i = 1; i < particiones.length; i++) {
    tamBar = particiones[i].size * perc;
    var newBar = itemProg.clone();
  //  var tagB = newBar.find('a');
    newBar.attr('aria-valuenow', tamBar ).css('width',tamBar+'%');
    if (particiones[i].used == null) {
    //  tagB.css("background-color","#28a745" ).text("F");
  //    tagB.css("border-color", "#28a745");
      newBar.text("F").removeClass('bg-warning').addClass('bg-success');
    }else {
      //tagB.css("background-color", "#ffc107").text(particiones[i].used.name);
      //tagB.css("border-color", "#ffc107");
      newBar.text(particiones[i].used.name).removeClass('bg-success').addClass('bg-warning');
    }
    barraProg.append(newBar);
  }
  contentBarra = $('.contentBarra').html();
  return contentBarra
};

//funcion que asigna una proceso a una particion variable
function asignarProcVar(parts, proc, ix){
  //resguardo la particion para trabajar
  var partRes = parts[ix];
  //genero el nuevo id de part
  var idnew = obtNewIdPart(parts);
  //quito la particion resguardada
  parts.splice(ix,1);
  //agrego el Proc a la listo
  colaListo.push(proc);
  //creo particion de Proceso
  var partProc = newPart(parseInt(proc.size));
  partProc.IdPart = partRes.IdPart;
  partProc.used = proc;
  parts.splice(ix,0,partProc);
  //Creo particion restante
  var partEmpty = newPart(partRes.size - partProc.size);
  partEmpty.IdPart = idnew + 1;
  partEmpty.used = null;
  parts.splice(ix+1,0,partEmpty);
  //agrego el proceso a la lista de procesosTerminados
  procesosTerminados.push(proc);

  //Obtengo el id del proceso que ya se particiono
  var iElim = getIxByName(arrayProcess,proc.name);
  //elimino de la lista de procesos si es exitoso
  arrayProcess.splice(iElim,1);
  //devuelvo la particion
  return parts
}
//Funcion que asigna procesos a particiones fijas
function asignarProcFij(parts, proc, ix){
  //resguardo la particion para trabajar
  parts[ix].used = proc;
  //agrego el Proc a la listo
  colaListo.push(proc);
  //agrego el proceso a la lista de procesosTerminados
  procesosTerminados.push(proc);
  //Obtengo el id del proceso que ya se particiono
  var iElim = getIxByName(arrayProcess,proc.name);
  //elimino de la lista de procesos si es exitoso
  arrayProcess.splice(iElim,1);
  //devuelvo la particion
  return parts
}
//Funciones para ordenar
function SortBySize(a, b){
  var asize = a.size;
  var bsize = b.size;
  return ((asize < bsize) ? -1 : ((asize > bsize) ? 1 : 0));
}
function SortBySizeDes(a, b){
  var asize = a.size;
  var bsize = b.size;
  return ((asize > bsize) ? -1 : ((asize < bsize) ? 1 : 0));
}

//Algoritmo de planificacion de memoria,PARTICION FIJA
function firstFit(parts,proc){
  for (var i = 0; i < parts.length; i++) {
    if (proc.size <= parts[i].size && parts[i].used == null) {
      return parts[i].IdPart;
    }
  }
  return false
}

function bestFit(parts,proc){
  parts = parts.sort(SortBySize);
  for (var i = 0; i < parts.length; i++) {
    if (proc.size <= parts[i].size && parts[i].used == null) {;
      return parts[i].IdPart;
    }
  }
  return false
}

function worstFit(parts,proc){
  parts = parts.sort(SortBySizeDes);
  for (var i = 0; i < parts.length; i++) {
    if (proc.size <= parts[i].size && parts[i].used == null) {;
      return parts[i].IdPart;
    }
  }
  return false
}

function solicitarProcesos(name){
  //liberamos la particio
  var liberada = liberarParts(name)
    //obtenemos el id del proceso a eliminar
  var iElim = getIxByName(colaListo,name);
    //Eliminamos el proc que ya ha terminado
  colaListo.splice(iElim,1);

  //cargaMem();
  // if (arrayProcess.length > 0) {
  //
  //   if (typeMemory = "Variable"){
  //     if (fitMemory == 'Worst Fit'){
  //       for (var i = 0; i < arrayProcess.length; i++) {
  //           var ix = worstFit(particiones,arrayProcess[i]);
  //           if (ix) {
  //             particiones = asignarProcVar(particiones,arrayProcess[i],ix);
  //             i = -1;
  //           }else {
  //             //no entra en alguna particion
  //             if (fragExt(particiones, arrayProcess[i])) {
  //               //hay fragmentacion externa
  //               particiones = desFrag(particiones);
  //               var ix = worstFit(particiones,arrayProcess[i]);
  //               if (ix) {
  //                 particiones = asignarProcVar(particiones,arrayProcess[i],ix);
  //                 i = -1;
  //               }
  //             }
  //           }
  //       }
  //     }
  //     if (fitMemory == 'First Fit'){
  //       for (var i = 0; i < arrayProcess.length; i++) {
  //           var ix = firstFit(particiones,arrayProcess[i]);
  //           if (ix) {
  //             particiones = asignarProcVar(particiones,arrayProcess[i],ix);
  //             i = -1;
  //           }else {
  //             //no entra en alguna particion
  //             if (fragExt(particiones, arrayProcess[i])) {
  //               //hay fragmentacion externa
  //               particiones = desFrag(particiones);
  //               var ix = firstFit(particiones,arrayProcess[i]);
  //               if (ix) {
  //                 particiones = asignarProcVar(particiones,arrayProcess[i],ix);
  //                 i = -1;
  //               }
  //             }
  //           }
  //       }
  //     }
  //   }
  //
  //   if (typeMemory = "Fija") {
  //     if (fitMemory == 'Best Fit'){
  //       for (var i = 0; i < arrayProcess.length; i++) {
  //           var ix = bestFit(memFija,arrayProcess[i]);
  //           if (ix) {
  //             particiones = asignarProcFij(memFija,arrayProcess[i],ix);
  //             i = -1;
  //           }
  //       }
  //     }
  //     if (fitMemory == 'First Fit'){
  //       for (var i = 0; i < arrayProcess.length; i++) {
  //           var ix = firstFit(memFija,arrayProcess[i]);
  //           if (ix) {
  //             particiones = asignarProcVar(memFija,arrayProcess[i],ix);
  //             i = -1;
  //           }
  //       }
  //     }
  //   }
  // }
}

var config = {
    apiKey: "AIzaSyBPV-YDy4TwyVtAnKzG8SQ3fwKy4gyAHxQ",
    authDomain: "proyectoprocesos-fddd5.firebaseapp.com",
    databaseURL: "https://proyectoprocesos-fddd5.firebaseio.com",
    projectId: "proyectoprocesos-fddd5",
    storageBucket: "proyectoprocesos-fddd5.appspot.com",
    messagingSenderId: "80081573356"
};

firebase.initializeApp(config);

var db = firebase.firestore();

console.log(db.collection("process").orderBy('arrivalTime').get());

function getMaxProcessSize(typeMemory){
  if (typeMemory == 'Fija') {
    var maxPart = memFija[0].size;
    for (var i = 0; i < memFija.length; i++) {
      console.log(memFija[i].size);
      if (memFija[i].size > maxPart) {
          maxPart = memFija[i].size;
      }
    }
    return maxPart
  }else {
    return sizeMemory
    }
}


var raf=0;
var maxraf=5;
var cpuList = []
var esList = []
//agregar rafagas dinamicas
$(document).on('click', '.btn-add-raf', function(e){



    e.preventDefault();

      if(raf < maxraf){

        var controlForm = $('.rafdynamic form:first'),
            currentEntry = $(this).parents('.entryRaf:first');

        //rafaga de cpu ingreasda
        var cpu = currentEntry.find('.inputcpu').val();
        var es = currentEntry.find('.inputes').val();

        cpu = parseInt(cpu);
        es = parseInt(es);

        if (cpu > 0 && es > 0 ) {
          raf = raf + 1;
          //se puede agregar particion
          console.log(cpu);
          console.log(es);
          cpuList.push(cpu);
          esList.push(es);

          var controlForm = $('.rafdynamic form:first'),
              currentEntry = $(this).parents('.entryRaf:first'),
              newEntry = $(currentEntry.clone()).appendTo(controlForm);

            newEntry.find('.inputcpu').val('');
            newEntry.find('.inputes').val('');

            newEntry.find('.textCpu').text("CPU " + raf);
            newEntry.find('.textEs').text("E/S " + raf);

            controlForm.find('.entryRaf:not(:last) .inputcpu')
              .addClass('classDisabled')
              .removeClass('inputcpu')
              .prop("disabled", true);

            controlForm.find('.entryRaf:not(:last) .inputes')
                .addClass('classDisabled')
                .removeClass('inputes')
                .prop("disabled", true);

            controlForm.find('.entryRaf:not(:last) .btn-add-raf')
                .removeClass('btn-add-raf').addClass('btn-remove-raf')
                .removeClass('btn-success').addClass('btn-danger')
                .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>');
        }else {
          if (cpu > 0) {
            $(".textoalert").text("Debes ingresar un valor en ES.");
            $('.alertCustom').addClass('show');
          }else {
            $(".textoalert").text("Debes ingresar un valor en CPU.");
            $('.alertCustom').addClass('show');
          }
        }

      }

});

function saveData() {

    var name = $('.name').val();
    var size = $('.size').val();
    var arrival = $('.arrival').val();
    var cpuTimes = cpuList;
    var ioTimes = esList;
    var lastCpu = $('.lastCpu').val();

      //Para Verificacion del Tamaño de Procesos
    if (name&&size&&arrival&&(cpuTimes.length > 0)&&(ioTimes.length > 0)&&lastCpu) {
      var maxTamPocess = getMaxProcessSize(typeMemory)
      if (size > maxTamPocess) {
        $(".textoAlertProc").text("El tamaño del proceso no puede ser mayor al tamaño de memoria.");
        $('.alertProcess').addClass('show');
      }else {
        //Si el proceso entra en memoria se Guarda.
        saveFirebase(name, size, arrival, cpuTimes, ioTimes, lastCpu);
    }
  }else {
    $(".textoAlertProc").text("Ingrese los Datos.");
    $('.alertProcess').addClass('show');
  }
}

function saveFirebase(name, size, arrival, cpuTimes, ioTimes, lastCpu) {

    db.collection("process").add({
        name: name,
        size: size,
        arrivalTime: arrival,
        cpuTime: cpuTimes,
        ioTime: ioTimes,
        lastCpuTime: lastCpu
    }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);


      //  $('.name').val("");
      //  $('.size').val("");
      //  $('.arrival').val("");
      //  cpuTimes = [];
      //  ioTimes = [];
      //  $('.lastCpu').val("");

        getData();

    }).catch(function (error) {
        console.error("Error adding document: ", error);
    });
}

function deleteData(idData){

    db.collection("process").doc(idData).delete().then(function() {
        console.log("Document successfully deleted!");
        getData();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function getData(){
    arrayProcess = [];
    lenArrayProcess=0;
    var tabla = document.getElementById('tableId');

    db.collection("process").orderBy('arrivalTime').get().then((querySnapshot) => {

        tabla.innerHTML = '';
        var index = 1;

        querySnapshot.forEach((doc) => {
          var tiempos = ''
          for (var i = 0; i < doc.data().cpuTime.length; i++) {
            tiempos = tiempos + doc.data().cpuTime[i] +'-'+ doc.data().ioTime[i]+'-';
          }

          tabla.innerHTML += `
            <tr>
                <td class="tdTable">${doc.data().name}</td>
                <td class="tdTable">${doc.data().size}</td>
                <td class="tdTable">${doc.data().arrivalTime}</td>
                <td class="tdTable">${tiempos}${doc.data().lastCpuTime}</td>
                <td class="tdTable"><button class="btn btn-danger" onclick="deleteData('${doc.id}')">Borrar</button></td>
            </tr>
            `;
          index += 1;
          lenArrayProcess += 1;
          arrayProcess.push(doc.data());
          var ultNom = "P"+(lenArrayProcess+1);
          $(".nomProc").val(ultNom);
        });
    });
    console.log(arrayProcess)
};

function arrayProc(){
    db.collection("process").orderBy('arrivalTime').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {arrayProcess.push(doc.data());
        });
    });

    return arrayProcess
}

//obtención de la cantodad de tiempo de procesamiento

function obtenerTiempoMax(){
  var procesos = arrayProcess;
  var tiempoMax = 0
  for (var i = 0; i < procesos.length; i++) {
    tiempoMax += parseInt(procesos[i].lastCpuTime);
    for (var j = 0; j < procesos[i].cpuTime.length; j++) {
      tiempoMax += parseInt(procesos[i].ioTime[j]) + parseInt(procesos[i].cpuTime[j])
    }
  }
  return tiempoMax
};


function getIxByName(array,name){
  for (var i = 0; i < array.length; i++) {
    if (array[i].name == name){
      return i
    }
  }
  return false;
};

//Algoritmo de SAntino que me devuelve la cola de Listo

//Obtiene el Siguiente proceso libre de la Memoria
function siguienteProceso(colaListo,colaBloqueados,colaESFin,bloqDeCiclo){
  var noHayProc = true;
  for (var i = 0; i < colaListo.length; i++) {
    var esBloq = estaEn(colaBloqueados,colaListo[i])
    var esTer = estaEn(colaESFin,colaListo[i])
    if (esBloq == false && esTer == false) {
      if (colaListo[i] != bloqDeCiclo) {
        return colaListo[i]
      }
    }else {
      noHayProc = false
    }
  }
  if (noHayProc == false){
    return null
  }
};

//Genera un nuevo elemento para la salida
function nuevoElemento(proceso,tiempo){
  var elemento = {};
  elemento.inTime = tiempo;
  elemento.name=proceso.name;
  elemento.arrivalTime = proceso.arrivalTime;//Analizar este Tiempo
  elemento.irrupctionTime = 0;
  elemento.outTime = 0;
  elemento.finish = false;
  elemento.memoria = null;
  return elemento
}
//funcion que rellena el arreglo con tiempos muertos
function tiemposOcioso(gantt){
  var cpu = gantt[0];
  var es = gantt[1];
  if (cpu.length > 0) {
    for (var i = 0; i < cpu.length - 1; i++) {
    //  if (i < cpu.length-1) {
        if (cpu[i].outTime != cpu[i+1].inTime) {
          var vacio = {};
          vacio.inTime = cpu[i].outTime;
          vacio.name='O';
          vacio.arrivalTime = 1;//Analizar este Tiempo
          vacio.irrupctionTime = (cpu[i+1].inTime - cpu[i].outTime);
          vacio.outTime = cpu[i+1].inTime;
          vacio.finish = false;
          cpu.splice(i+1,0,vacio);
      //  }
      }
    }
    if (cpu[0].inTime > 0) {
      var vacio = {};
      vacio.inTime = 0;
      vacio.name='O';
      vacio.arrivalTime = 1;//Analizar este Tiempo
      vacio.irrupctionTime = cpu[0].inTime;
      vacio.outTime = cpu[0].inTime;
      vacio.finish = false;
      cpu.splice(0,0,vacio);
    }
  }else {
    var vacio = {};
    vacio.inTime = 0;
    vacio.name='NO HAY PROCESOS';
    vacio.arrivalTime = 1;//Analizar este Tiempo
    vacio.irrupctionTime = 100;
    vacio.outTime = 100;
    vacio.finish = false;
    cpu.splice(0,0,vacio);
  }
  if (es.length > 0) {
    for (var i = 0; i < es.length -1; i++) {
  //    if (i < es.length -1) {
        if (es[i].outTime != es[i+1].inTime) {
          var vacio = {};
          vacio.inTime = es[i].outTime;
          vacio.name='O';
          vacio.arrivalTime = 1;//Analizar este Tiempo
          vacio.irrupctionTime = (es[i+1].inTime - es[i].outTime);
          vacio.outTime = es[i+1].inTime;
          vacio.finish = false;
          es.splice(i+1,0,vacio);
    //    }
      }
    }
    var vacio = {};
    vacio.inTime = 0;
    vacio.name='O';
    vacio.arrivalTime = 1;//Analizar este Tiempo
    vacio.irrupctionTime = es[0].inTime;
    vacio.outTime = es[0].inTime;
    vacio.finish = false;
    es.splice(0,0,vacio);
  }else {
    var vacio = {};
    vacio.inTime = 0;
    vacio.name='NO HAY PROCESOS';
    vacio.arrivalTime = 1;//Analizar este Tiempo
    vacio.irrupctionTime = 100;
    vacio.outTime = 100;
    vacio.finish = false;
    es.splice(0,0,vacio);
  }

  var ganttconos = [];
  ganttconos.push(cpu);
  ganttconos.push(es);
  return ganttconos
}

//Verifica si un Proceso esta en una Cola
function estaEn(cola,proceso){
    var esta = false;
      for (var i = 0; i < cola.length; i++) {
        if (cola[i].name == proceso.name){
          esta = true ;
          break
        }
      }
     return esta
   }

//Obtiene el Siguiente proceso libre de la Memoria

//devuelve la rafaga actual
function ixRafaga(proc){
  for (var i = 0; i < proc.cpuTime.length; i++) {
    if (proc.cpuTime[i] > 0) {
      return i
    }
  }
  return false //es decir que se termino la lista de cpu y debemos analizar lastCpu
};

// EN ESTA POLÍTICA DE PLANIFICACIÓN, EL PROCESADOR EJECUTA CADA PROCESO HASTA QUE TERMINA,
//POR TANTO, LOS PROCESOS QUE EN COLA DE PROCESOS PREPARADOS PERMANECERÁN ENCOLADOS EN EL ORDEN
//EN QUE LLEGUEN HASTA QUE LES TOQUE SU EJECUCIÓN.
function firstComeFirstServed(){
  var controladorBucle = obtenerTiempoMax();
    //definimos las Vairables
   var colaBloqueados = [];
   //cargaIniMem();
   var colaESFin = []
   var salidaCPU = [];
   var salidaES = [];
   var salidaFinal = [];
   var enES = null;
   tiempo = 0;
   var enCPU = null;
   var bloqDeCiclo = null;

    //Inicio del algoritmo, el For que controla la ejecucion total del algoritmo
   for (var i=0; i < controladorBucle; i++) {
     cargaMem();
     //ya Cumplio ciclo ponemos en false
     bloqDeCiclo = null;
     //Analizamos el Trabajo en ES en el mismo tiempo t analizamos primero porque al pasar un proceso a bloqueado automaticamente ejecuta
      if (enES != null) {
       //Procesamso el elto else {
       //controlamos la rafagas
       if (enES.ioTime.length > 0) {
         enES.ioTime[0] -= 1;
         elementoES.irrupctionTime +=1;
         //Verificamos si debemos sacar de CPU
         if (enES.ioTime[0] < 1){
           //if (elementoES.irrupctionTime == 1) {
        //     if (colaESFin.length == 0) {
           bloqDeCiclo = enES
      //       }
      //     }
           elementoES.outTime = tiempo+1;
           enES.ioTime.shift();
           salidaES.push(elementoES);
           if (enES.ioTime.length < 1) {
             colaESFin.push(enES)
           }
           colaBloqueados.shift();
           enES = null;
         }
         //controlamos ciclo de ejecucion ES
       }

      }else{
         //Agregamos un Elemento de la COla de bloqueado
           if (colaBloqueados.length > 0) {
             enES = colaBloqueados[0];
             elementoES = nuevoElemento(enES,tiempo);
             //Pocesamos el Elto ES
             if (enES.ioTime.length > 0) {
               enES.ioTime[0] -= 1;
               elementoES.irrupctionTime +=1;
               //Verificamos si debemos sacar de CPU
               if (enES.ioTime[0] < 1){
                 //if (elementoES.irrupctionTime == 1) {
              //     if (colaESFin.length == 0) {
                 bloqDeCiclo = enES
                  // }
            //     }
                 elementoES.outTime = tiempo+1;
                 enES.ioTime.shift();
                 salidaES.push(elementoES);
                 colaESFin.push(enES)
                 colaBloqueados.shift();
                 enES = null;
               }
               //controlamos ciclo de ejecucion ES
             }
           }
         }



     //Analizamos el Trabajo en CPU en el tiempo t
     if (enCPU != null){

       //Verificamos si posee primer tiempo de CPU y Al terminar Pasamos a Bloquado para ser atendido en ES

       if (enCPU.cpuTime.length > 0){
         if (enCPU.cpuTime[0] > 0){
           enCPU.cpuTime[0] -= 1;
           elementoCPU.irrupctionTime +=1;
           //Verificamos si debemos Sacar de CPU 1
           if (enCPU.cpuTime[0] < 1){

              elementoCPU.outTime = tiempo+1;
              enCPU.cpuTime.shift();
              elementoCPU.memoria = [...particiones];
              salidaCPU.push(elementoCPU);
              //Agregamos a la lista de bloqueado los el proceso
              colaBloqueados.push(enCPU);
              elementoCPU = null;
              enCPU = null;
            }
          }
        }else{
          //Verificamos si posee Segundo Tiempo
          if (enCPU.lastCpuTime > 0){
            //Procesamos elto del tipo last CPU
            enCPU.lastCpuTime -= 1;
            elementoCPU.irrupctionTime +=1;
            //Verificamos si debemos sacar de CPU
            if (enCPU.lastCpuTime < 1){
              elementoCPU.outTime = tiempo+1;
              elementoCPU.finish = true;
              elementoCPU.memoria = [...particiones];
              salidaCPU.push(elementoCPU);
              solicitarProcesos(enCPU.name);
              elementoCPU = null;
              enCPU = null;
            }
          }
        }

      }else{
        //Primero analaizamos cola Bloaqueada y lo quitamos
        //Luego analaizamos Cola Listo
          if (colaESFin.length > 0 && (bloqDeCiclo == null)) {
            enCPU = colaESFin[0];
            //una Vez que empezamos a tratar lo Eliminamos de la cola pendientes
            colaESFin.shift();
            elementoCPU = nuevoElemento(enCPU,tiempo);
            //Procesamos elemento last clpu
            enCPU.lastCpuTime -= 1;
            elementoCPU.irrupctionTime +=1;
            //Verificamos si debemos sacar de CPU
            if (enCPU.lastCpuTime < 1){
              elementoCPU.outTime = tiempo;
              elementoCPU.finish = true;
              salidaCPU.push(elementoCPU);
              //Refrescamos la cola de listos
              solicitarProcesos(enCPU.name);
              enCPU = null;
              elementoCPU = null;
            }
            }else{
              // Solicitamos el Proximo Proceso en listo que no este bloqueddo
              enCPU = siguienteProceso(colaListo,colaBloqueados,colaESFin,bloqDeCiclo);
            //  if (bloqDeCiclo == true) {
              //  enCPU = siguienteProceso(colaListo,colaBloqueados,colaESFin)
              //}//Verificamos si hay algun proceso en la CL
              if (enCPU != null){
                elementoCPU = nuevoElemento(enCPU,tiempo);
                if (enCPU.cpuTime.length > 0){
                  if (enCPU.cpuTime[0] > 0){

                    enCPU.cpuTime[0] -= 1;
                    elementoCPU.irrupctionTime +=1;
                    //Verificamos si debemos Sacar de CPU 1
                    if (enCPU.cpuTime[0] < 1){

                       elementoCPU.outTime = tiempo+1;
                       enCPU.cpuTime.shift();
                       salidaCPU.push(elementoCPU);
                       //Agregamos a la lista de bloqueado los el proceso
                       colaBloqueados.push(enCPU);
                       elementoCPU = null;
                       enCPU = null;
                     }
                   }
                 }else{
                   //Verificamos si posee Segundo Tiempo
                   if (enCPU.lastCpuTime > 0){
                     //Procesamos elto del tipo last CPU
                     enCPU.lastCpuTime -= 1;
                     elementoCPU.irrupctionTime +=1;
                     //Verificamos si debemos sacar de CPU
                     if (enCPU.lastCpuTime < 1){
                       elementoCPU.outTime = tiempo+1;
                       elementoCPU.finish = true;
                       salidaCPU.push(elementoCPU);
                       solicitarProcesos(enCPU.name);
                       elementoCPU = null;
                       enCPU = null;
                     }
                   }
                 }
               }//si es Null entonces CPU ociosa
              }
        }

    //timer del PROCESADOR
    tiempo += 1;
    //Control FIN ALGORITMO
    if( (colaListo.length == 0) && ( (colaBloqueados.length == 0) && (colaESFin.length == 0) && (enCPU = null) ) ){
      break
    }
  }


  salidaFinal.push(salidaCPU);
  salidaFinal.push(salidaES);
  return salidaFinal;
}
//EJECUTA COMENZANDO POR EL PRIMER ELEMENTO Y DANDOLE UN TIEMPO DE EJECUCIÓN EQUITATIVO A TODOS LOS PROCEDIMIENTOS
//DE LA LISTA, RECORRE DE PRINCIPIO HASTA LLEGAR AL ULTIMO Y NUEVAMENTE EMPEZANDO DESDE EL PRIMER ELEMENTO HASTA TERMINAR.
function roundRobin(quantum){
  var controladorBucle=obtenerTiempoMax();
  //cargaIniMem();
  var enCPU = null;
  var elementoCPU={};
  var enES = null;
  var elementoES={};
  var colaCPU = [];
  var colaES=[];
  var salidaCPU=[];
  var salidaES=[];
  var salidaFinal=[];
  var i=0;
  var j=0;
  var x=0;
  var posicion=0;
  //var tiempo=0;
  var t1=0;
  var t2=0;

  //for que controla todo el algoritmo
  for (j = 0; j < controladorBucle; j++) {
    cargaMem();
    //para solicitar procesos a la cola de listo en caso de que el proceso haya terminado
    // y para repartir por cola de cpu y de e/s en caso de que no haya terminado
    for (var x = 0; x < colaListo.length; x++) {

      if (colaListo[x].cpuTime.length == colaListo[x].ioTime.length){
        if (colaListo[x].cpuTime.length != 0){
            if (estaEn(colaCPU,colaListo[x]) == false && enCPU != colaListo[x]) {
                      colaCPU.push(colaListo[x]);
            }
          }
      }else{
        if(colaListo[x].ioTime.length == (colaListo[x].cpuTime.length + 1)){
            if (estaEn(colaES,colaListo[x]) == false && enES != colaListo[x]){
                colaES.push(colaListo[x])
            }
        }
      }

      if (colaListo[x].cpuTime.length == 0 && colaListo[x].ioTime.length == 0){
        if ( (colaListo[x].lastCpuTime > 0)  && (estaEn(colaCPU,colaListo[x]) == false) && (enCPU != colaListo[x]) ){
          colaCPU.push(colaListo[x]);
        }
      }

      if (colaListo[x].cpuTime.length == 0 && colaListo[x].ioTime.length == 0){
        if ((colaListo[x].lastCpuTime == 0)  &&(estaEn(colaCPU,colaListo[x]) == false)){
          solicitarProcesos(colaListo[x].name)
        }
      }


    }
    //para darle valores a enCPU
    if (enCPU == null){
      if (colaCPU.length > 0) {
        enCPU = colaCPU[0];
        elementoCPU = nuevoElemento(enCPU,tiempo);
        colaCPU.splice(0,1);
        //var indice = getIxByName(colaListo, enCPU.name);
      }
    }
    //para darle valores a enES
    if (enES == null){
      if (colaES.length > 0) {
        enES=colaES[0];
        elementoES = nuevoElemento(enES,tiempo);
        colaES.splice(0,1);
        //var indice2 = getIxByName(colaListo, enES.name);
      }
    }
    //para procesar el contenido de enCPU
    if (enCPU != null){
      elementoCPU.irrupctionTime+=1;
      t1+=1;
      if(enCPU.cpuTime[0] > 0){
        enCPU.cpuTime[0]-=1;
        //colaListo[indice].cpuTime-=1;
        if (enCPU.cpuTime[0] < 1 || t1==quantum){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
          if (estaEn(colaListo,enCPU) == true){
            posicion=getIxByName(colaListo,enCPU.name);
            var test = colaListo[posicion].cpuTime.splice(0,1);
          }
          enCPU = null;
          salidaCPU.push(elementoCPU);
          t1=0;
        }

      }else{enCPU.lastCpuTime-=1;
            //colaListo[indice].lastCpuTime-=1;
            if (enCPU.lastCpuTime < 1 || t1==quantum){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                                    if(enCPU.lastCpuTime==0){elementoCPU.finish=true}
                                                    enCPU = null;
                                                    salidaCPU.push(elementoCPU);
                                                    t1=0;}
            }
    }
    //para procesar el contenido de enES
    if (enES != null){
      elementoES.irrupctionTime+=1;
      enES.ioTime[0]-=1;
      //colaListo[indice2].ioTime-=1;
      if (enES.ioTime[0] < 1){
        elementoES.outTime=elementoES.inTime+elementoES.irrupctionTime;
        if (estaEn(colaListo,enES) == true){
          posicion=getIxByName(colaListo,enES.name);
          colaListo[posicion].ioTime.splice(0,1);
        }
        enES = null;
        salidaES.push(elementoES);
      }
    }
    tiempo+=1;
    if (colaListo.length == 0 && colaCPU.length == 0 && enCPU == null && arrayProcess.length == 0){
      break;
    }

  }
  salidaFinal.push(salidaCPU);
  salidaFinal.push(salidaES);
  return salidaFinal
}




//ESTE ALGORITMO SELECCIONA AL PROCESO CON EL PRÓXIMO TIEMPO DE EJECUCIÓN MÁS CORTO
function shortestJobFirst(){
  var controladorBucle=obtenerTiempoMax();
  //cargaIniMem();
  var enCPU = null;
  var elementoCPU={};
  var enES = null;
  var elementoES={};
  var colaCPU = [];
  var colaES=[];
  var salidaCPU=[];
  var salidaES=[];
  var salidaFinal=[];
  var i=0;
  var j=0;
  var x=0;
//  var tiempo=0;
  var posicion=0;
  var min=99999;

  for (i = 0; i < controladorBucle; i++) {
    cargaMem();
    for (x = 0; x < colaListo.length; x++) {

      if (colaListo[x].cpuTime.length == colaListo[x].ioTime.length){
        if (estaEn(colaCPU,colaListo[x]) == false && enCPU != colaListo[x]) {
          colaCPU.push(colaListo[x]);}

      }else{
          if(colaListo[x].ioTime.length == (colaListo[x].cpuTime.length + 1)){
            if (estaEn(colaES,colaListo[x]) == false && enES != colaListo[x]) {
              colaES.push(colaListo[x])
            }
          }else{
            if (colaListo[x].cpuTime.length == 0 && colaListo[x].ioTime.length == 0){
              if (colaListo[x].lastCpuTime > 0  &&(estaEn(colaCPU,colaListo[x]) == false)){
                  colaCPU.push(colaListo[x]);
                }

            }else{solicitarProcesos(colaListo[x].name)}
              }
        }
    }

    //carga de procesos enCPU
      if (enCPU == null){
        if (colaCPU.length > 0) {

          //busca el que menor tiempo de cpu tienga

          for (j = 0; j < colaCPU.length; j++) {
            if (colaCPU[j].cpuTime[0] > 0) {
              if (colaCPU[j].cpuTime[0] < min){enCPU=colaCPU[j]; min=colaCPU[j].cpuTime[0];posicion=j;}
            }else{if(colaListo[j].ioTime.length == 0){
                  if (colaListo[j].lastCpuTime[0] < min){
                            enCPU=colaCPU[j];
                            min=colaCPU[j].lastCpuTime[0];
                            posicion=j;}}}
          }
          console.log('No hay CPU y hay elementos en colaCPU');
          elementoCPU = nuevoElemento(enCPU,tiempo);
          colaCPU.splice(posicion,1);
          min=999999;
        }
      }
      //carga de procesos enES
      if (enES == null){
        if (colaES.length > 0) {
          enES=colaES[0];
          elementoES = nuevoElemento(enES,tiempo);
          colaES.splice(0,1);
        }
      }

      //para procesar el contenido de enCPU

      if (enCPU != null){//trata tiempo de cpuTime

        elementoCPU.irrupctionTime+=1;
        if(enCPU.cpuTime[0] > 0){
          enCPU.cpuTime[0]-=1;
          if (enCPU.cpuTime[0] < 1){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                if (estaEn(colaListo,enCPU) == true){posicion=getIxByName(colaListo,enCPU.name);
                                                                      colaListo[posicion].cpuTime.splice(0,1)}
                                enCPU = null;
                                salidaCPU.push(elementoCPU);
                                }

        }else{enCPU.lastCpuTime[0]-=1;//trata tiempo de lastCpuTime

              if (enCPU.lastCpuTime[0] < 1){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                        if(enCPU.lastCpuTime == 0){elementoCPU.finish=true}
                                        enCPU = null;
                                        salidaCPU.push(elementoCPU);
                                        }
              }
      }
      //para procesar el contenido de enES
      if (enES != null){
        elementoES.irrupctionTime+=1;
        enES.ioTime[0]-=1;

        if (enES.ioTime[0] < 1){elementoES.outTime=elementoES.inTime+elementoES.irrupctionTime;

                            if (estaEn(colaListo,enES) == true){posicion=getIxByName(colaListo,enES.name);
                                                                  colaListo[posicion].ioTime.splice(0,1)}
                            enES = null;
                            salidaES.push(elementoES);
                            }
      }
      tiempo+=1;
      if (colaListo.length == 0 && colaCPU.length == 0 && enCPU == null){break}
  }
  salidaFinal.push(salidaCPU);
  salidaFinal.push(salidaES);
  return salidaFinal
}


//ordena por tiempo de cpuTime

function SortByCpuTime(a, b){
  var acpuTime = a.cpuTime;
  var bcpuTime = b.cpuTime;
  return ((acpuTime < bcpuTime) ? -1 : ((acpuTime > bcpuTime) ? 1 : 0));
}


//ES SIMILAR AL SJF, CON LA DIFERENCIA DE QUE SI UN NUEVO PROCESO PASA A LISTO SE ACTIVA UNA
//BANDERA flag Y SE RESGUARDA colaListo  PARA VER SI ES MÁS CORTO QUE LO QUE QUEDA POR EJECUTAR
//DEL PROCESO EN EJECUCIÓN. SI ES ASÍ, EL PROCESO EN EJECUCIÓN SALE DE enCPU PARA QUE INGRESE
//EL NUEVO PROCESO
function shortRemainingTimeFirst(){
  var controladorBucle=obtenerTiempoMax();
  //cargaIniMem();
  var colaResguardo=[]; //esta variable sirve para saber si existe un proceso nuevo para comparar
                          //su tiempo de CPU con el tiempo de cpu del proceso que esta enCPU
  var enCPU = null;
  var enES = null;
  var elementoCPU={};
  var elementoES={};
  var colaCPU = [];
  var colaES=[];
  var salidaCPU=[];
  var salidaES=[];
  var salidaFinal=[];
  var i=0;
  var j=0;
  var x=0;
//  var tiempo=0;
  var posicion=0;
  var min=99999;
  var newProcess =[];
  var flag = false;

  for (i = 0; i < controladorBucle; i++) {
    cargaMem();
    for (x = 0; x < colaListo.length; x++) {
      if ((colaListo[x].cpuTime.length) == (colaListo[x].ioTime.length)){
        if ((estaEn(colaCPU,colaListo[x]) == false) && (enCPU != colaListo[x])) {
          colaCPU.push(colaListo[x]);
        }
      }else{
          if((colaListo[x].ioTime.length) == (colaListo[x].cpuTime.length + 1)){
            if ((estaEn(colaES,colaListo[x]) == false) && (enES != colaListo[x])) {
              colaES.push(colaListo[x]);
            }
          }else{
            if ((colaListo[x].cpuTime.length == 0) && (colaListo[x].ioTime.length == 0)){
              if ((colaListo[x].lastCpuTime > 0)  && (estaEn(colaCPU,colaListo[x]) == false)){
                  colaCPU.push(colaListo[x]);

              }
            }else{
                  colaResguardo=colaListo; flag=false;
                  solicitarProcesos(colaListo[x].name);
                  for (var n = 0; n < colaListo.length; n++) {
                    if (estaEn(colaResguardo, colaListo[n].name) == false) {
                      newProcess.push(colaListo[n]);
                      flag = true;
                    }
                  }
              }
        }

      }
    }
    //ordena los procesos nuevos en colaListo

    if(flag == true){
      newProcess= newProcess.sort(SortByCpuTime);
    }
    //carga de procesos enCPU
      if (enCPU == null){
        if (colaCPU.length > 0) {
          for (j = 0; j < colaCPU.length; j++) {
            if (colaCPU[j].cpuTime[0] > 0) {
              if (colaCPU[j].cpuTime[0] < min){enCPU=colaCPU[j];
                                                min=colaCPU[j].cpuTime[0];
                                                posicion=j;}
            }else{if(colaListo[j].ioTime.length == 0){
                if (colaListo[j].lastCpuTime < min){
                      enCPU=colaCPU[j];
                      min=colaCPU[j].cpuTime[0];
                      posicion=j;}}}
          }
          console.log('No hay CPU y hay elementos en colaCPU');
          elementoCPU = nuevoElemento(enCPU,tiempo);
          colaCPU.splice(posicion,1);
          min=999999;
        }
      }
      //carga de procesos enES
      if (enES == null){
        if (colaES.length > 0) {

            enES=colaES[0];
            elementoES = nuevoElemento(enES,tiempo);
            colaES.splice(0,1);

        }
      }

      //para procesar el contenido de enCPU. Si flag es verdadero quiere decir que hay procesos que arribaron
      //y tengo que controlar si su cpu es menor a lo que le queda al proceso que esta enCPU
      if(flag == true){

        if (enCPU.cpuTime[0] > 0){//trata tiempos de cpuTime

            if (enCPU.cpuTime[0] > newProcess[0].cpuTime[0]) {
              elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
              salidaCPU.push(elementoCPU);
              enCPU=newProcess[0];
              elementoCPU = nuevoElemento(enCPU,tiempo);
              var indice = getIxByName(colaCPU, enCPU.name);
              colaCPU.splice(indice,1);
              elementoCPU.irrupctionTime+=1;
              enCPU.cpuTime[0]-=1;
              if (enCPU.cpuTime[0] < 1){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                      if (estaEn(colaListo,enCPU) == true){posicion=getIxByName(colaListo,enCPU.name);
                                                                            colaListo[posicion].cpuTime.splice(0,1)}
                                      enCPU = null;
                                      salidaCPU.push(elementoCPU);
                                      }
            }

        }else{if (enCPU.lastCpuTime > 0) {//trata tiempos de lastCpuTime

                if (enCPU.lastCpuTime > newProcess[0].cpuTime[0]) {
                  elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                  salidaCPU.push(elementoCPU);
                  enCPU=newProcess[0];
                  elementoCPU = nuevoElemento(enCPU,tiempo);
                  var indice = getIxByName(colaCPU, enCPU.name);
                  colaCPU.splice(indice,1);
                  elementoCPU.irrupctionTime+=1;
                  enCPU.lastCpuTime-=1;
                  if (enCPU.lastCpuTime < 1){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                            if(enCPU.lastCpuTime==0){elementoCPU.finish=true}
                                            enCPU = null;
                                            salidaCPU.push(elementoCPU);
                                            }
                  }}
          }
        }else{//el tratamiento comun se ejecuta si no hubieron procesos nuevos en colaListo

          if (enCPU != null){//trata tiempos de cpuTime

            elementoCPU.irrupctionTime+=1;
            if(enCPU.cpuTime[0] > 0){
              enCPU.cpuTime[0]-=1;
              if (enCPU.cpuTime[0] < 1){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                    if (estaEn(colaListo,enCPU) == true){posicion=getIxByName(colaListo,enCPU.name);
                                                                          colaListo[posicion].cpuTime.splice(0,1)}
                                    enCPU = null;
                                    salidaCPU.push(elementoCPU);
                                    }
            }else{enCPU.lastCpuTime-=1;//tratra tiempos de lastCpuTime

                  if (enCPU.lastCpuTime < 1){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                            if(enCPU.lastCpuTime==0){elementoCPU.finish=true}
                                            enCPU = null;
                                            salidaCPU.push(elementoCPU);
                                            }
                  }
          }
      }

      //para procesar el contenido de enES
      if (enES != null){
        elementoES.irrupctionTime+=1;
        enES.ioTime[0]-=1;

        if (enES.ioTime[0] < 1){elementoES.outTime=elementoES.inTime+elementoES.irrupctionTime;
                            if (estaEn(colaListo,enES) == true){posicion=getIxByName(colaListo,enES.name);

                                                                  colaListo[posicion].ioTime.splice(0,1)}
                            enES = null;
                            salidaES.push(elementoES);
                            }
      }
      tiempo+=1;
      if (colaListo.length == 0 && colaCPU.length == 0 && enCPU == null){break}
  }
  salidaFinal.push(salidaCPU);
  salidaFinal.push(salidaES);
  return salidaFinal
}
