var sizeMemory = 256;
var typeMemory = "Variable";
var fitMemory = "First Fit";
var algorithm = "FCFS";
var arrayProcess = [];



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

      $('.quantumIn').keypress(function() {
          //falta hacer
      });

    });


   //control de la obtención del tamaño de la memoria
   $(".optionOne").click(function(){
      sizeMemory = parseInt($(".optionOne > input").val());
      console.log(sizeMemory)
   });
   $(".optionTwo").click(function(){
       sizeMemory = parseInt($(".optionTwo > input").val());
       console.log(sizeMemory)
   });
   $(".optionThree").click(function(){
      sizeMemory = parseInt($(".optionThree > input").val());
      console.log(sizeMemory)
   });
   //--------------------------------

   //control del tipo de memoria
   $(".optionTypeOne").click(function(){
      $(".fixedPart").show();
      var valueCurrent = $(".optionTypeOne > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
      $("#collapseExample").addClass("show");
      $(".optionFitTwo").hide();
      $(".optionFitOne").show();
   });
   $(".optionTypeTwo").click(function(){
      $(".fixedPart").hide();
      var valueCurrent = $(".optionTypeTwo > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
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
   });
   $(".optionFitTwo").click(function(){
      var valueCurrent = $(".optionFitTwo > input").val();
      fitMemory = valueCurrent;
      console.log(fitMemory);
   });
   $(".optionFitThree").click(function(){
      var valueCurrent = $(".optionFitThree > input").val();
      fitMemory = valueCurrent;
      console.log(fitMemory);
   });
   //------------------------------------

   //control de la seleccion de algoritmo
   $(".optionPlaningOne").click(function(){
      var valueCurrent = $(".optionPlaningOne > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").val("");
      $(".quantumIn").hide();
   });
   $(".optionPlaningTwo").click(function(){
      var valueCurrent = $(".optionPlaningTwo > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").show();
   });
   $(".optionPlaningThree").click(function(){
      var valueCurrent = $(".optionPlaningThree > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").val("");
      $(".quantumIn").hide();
   });
   $(".optionPlaningFour").click(function(){
      var valueCurrent = $(".optionPlaningFour > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").hide();
   });
   //------------------------------------

   //seguir
   $(".startButton").click(function(){

      var arrayFinish = firstComeFirstServed();

      var arrayCpu = arrayFinish[0];

      var firstIrruption = arrayCpu[0].irrupctionTime;
      arrayCpu[0].color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
      if(firstIrruption < 4){
          firstIrruption = 4
      }
      $('#proccessBar').attr('aria-valuenow', firstIrruption).css('width',firstIrruption+'%');
      var tagOne = $('#proccessBar').find('a');
      tagOne.attr('data-original-title', 'Datos de '+arrayCpu[0].name);
      var htmlPopover = '<div><b>De '+arrayCpu[0].inTime+' a '+arrayCpu[0].outTime+'</b></div>';
      tagOne.attr('data-content', htmlPopover);
      tagOne.text(arrayCpu[0].name);
      tagOne.css("background-color", arrayCpu[0].color).text(arrayCpu[0].name);
      tagOne.css("border-color", arrayCpu[0].color);
      var markupFirst = "<tr><th scope='row'>"+arrayCpu[0].name+"</th><td>"+arrayCpu[0].outTime+"</td><td>"+arrayCpu[0].arrivalTime+"</td><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime)+"</td></tr>";
      $('.tableResponse > tbody:last-child').append(markupFirst);
      var markWaitFirst = "<tr><th scope='row'>"+arrayCpu[0].name+"</th><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime)+"</td><td>"+arrayCpu[0].irrupctionTime+"</td><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime-arrayCpu[0].irrupctionTime)+"</td></tr>";
      $('.tableWait > tbody:last-child').append(markWaitFirst);

      for (var i = 1; i < arrayCpu.length; i++) {

          if(arrayCpu[i].color == null){
            var ind = arrayCpu.findIndex(x => x.name == arrayCpu[i].name);
            if(ind > -1 && arrayCpu[ind].color != null){
              arrayCpu[i].color = arrayCpu[ind].color;
            }else{
              arrayCpu[i].color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
            }
          }

          var item = arrayCpu[i];
          var newItem = $('#proccessBar').clone();

          var irruption = item.irrupctionTime;

          if(irruption < 4){
              irruption = 4
          }

          newItem.attr('aria-valuenow', item.irruption).css('width',irruption+'%');
          var tag = newItem.find('a');
          tag.attr('title', 'Datos de '+item.name);

          var htmlTag = '<div><b>De '+item.inTime+' a '+item.outTime+'</b></div>';

          tag.attr('data-content', htmlTag);
          tag.css("background-color", item.color).text(item.name);
          tag.css("border-color", item.color);
          $('#progressCpu').append(newItem);

          var markup = "<tr><th scope='row'>"+item.name+"</th><td>"+item.outTime+"</td><td>"+item.arrivalTime+"</td><td>"+(item.outTime-item.arrivalTime)+"</td></tr>";
          $('.tableResponse > tbody:last-child').append(markup);

          var markWait = "<tr><th scope='row'>"+item.name+"</th><td>"+(item.outTime-item.arrivalTime)+"</td><td>"+item.irrupctionTime+"</td><td>"+(item.outTime-item.arrivalTime-item.irrupctionTime)+"</td></tr>";
          $('.tableWait > tbody:last-child').append(markWait);
      }

      //-------- E/S -----

      var arrayEs = arrayFinish[1];
      var firstIrruptionEs = arrayEs[0].irrupctionTime;
      var indx = arrayCpu.findIndex(x => x.name == arrayEs[0].name);
      arrayEs[0].color = arrayCpu[indx].color;
      if(firstIrruptionEs < 4){
          firstIrruptionEs = 4
      }
      $('#proccessEs').attr('aria-valuenow', firstIrruptionEs).css('width',firstIrruptionEs+'%');
      var tagOneEs = $('#proccessEs').find('a');
      tagOneEs.attr('data-original-title', 'Datos de '+arrayEs[0].name);
      var htmlPopoverEs = '<div><b>De '+arrayEs[0].inTime+' a '+arrayEs[0].outTime+'</b></div>';
      tagOneEs.attr('data-content', htmlPopoverEs);
      tagOneEs.text(arrayEs[0].name);

      tagOneEs.css("background-color", arrayEs[0].color).text(arrayEs[0].name);
      tagOneEs.css("border-color", arrayEs[0].color);

      for (var i = 1; i < arrayEs.length; i++) {

          if(arrayEs[i].color == null){
            var ind = arrayCpu.findIndex(x => x.name == arrayEs[i].name);
            if(ind > -1 && arrayCpu[ind].color != null){
              arrayEs[i].color = arrayCpu[ind].color;
            }else{
              arrayEs[i].color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
            }
          }

          var item = arrayEs[i];
          var newItem = $('#proccessBar').clone();

          var irruption = item.irrupctionTime;

          if(irruption < 4){
              irruption = 4
          }

          newItem.attr('aria-valuenow', item.irruption).css('width',irruption+'%');
          var tag = newItem.find('a');
          tag.attr('title', 'Datos de '+item.name);

          var htmlTag = '<div><b>De '+item.inTime+' a '+item.outTime+'</b></div>';

          tag.attr('data-content', htmlTag);
          tag.css("background-color", item.color).text(item.name);
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


var cont = 0;
var maxpart = 5;
var memFija = []
//var part = { "partid":1, "size":0}
//inputs para crear las particiones
$(document).on('click', '.btn-add', function(e){

    $('.alertCustom').removeClass('show');
    $('.alertCustom').addClass('hide');

    e.preventDefault();

      if(cont < maxpart){
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
                currentEntry = $(this).parents('.entry:first'),
                newEntry = $(currentEntry.clone()).appendTo(controlForm);

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

            //Alerta por Nueva Particion muy grande
            $(".textoalert").text("El valor supera la cantida de la partición.");
            $('.alertCustom').addClass('show');

          }

        }else {

          $(".textoalert").text("Debes ingresar un valor.");
          $('.alertCustom').addClass('show');

        }
console.log(memFija);
}});

//falta hacer el borrado de la particion
$(".deleteInput").click(function(){
    alert("dsfsefsef.");
});


//-------

//button siguiente
$(document).on('click','.siguiente', function(e){
  $('[href="#procesos"]').tab('show')
});

//button siguiente2
$(document).on('click','.siguiente2', function(e){
  $('[href="#visualizacion"]').tab('show');
  console.log(roundRobin(5));
});

function newPart(size){
  var part = {};
  part.IdPart = null;
  part.size = size;
  part.used = null;
  return part
}

function usedMem(parts){
  var totused = 0;
  for (var i = 0; i < parts.length; i++) {
    if (part.used != null){
      totused += parts[i].used.size
    }
  }
  return totused
}

function fragExt(parts,proc){
    var used = usedMem(parts);
    if (sizeMemory - used >= proc.size) {
      return true
    }
    return false
}
//
function desFrag(parts){
return parts
}

function cargaIniMem(){
    var proc = []
    var particiones = []

    if (fitMemory == 'Worst Fit'){
      for (var i = 0; i < proc.length; i++) {
        if (particiones.length == 0) {
          part = newPart(sizeMemory);
          part.size = proc[i].size;
          part.process = proc[i].name;
          part.used = proc[i].size;
          particiones.push(part)
        }else {
          var ix = worstFit(particiones,proc[i]);
          if (ix) {
            particiones = asignarProcVar(particiones,proc[i],ix)
          }else {
            //no entra en alguna particion
            if (fragExt(particiones, proc[i])) {
              //hay fragmentacion externa
              particiones = desFrag(particiones);
            }

          }

        }

      }
    }
    if (fitMemory == 'First Fit'){
      for (var i = 0; i < listadeProc.length; i++) {
        if (particiones.length == 0) {
          newPart(size)
        }
        listadeProc[i]
      }
    }
}
//

function asignarProcVar(parts, proc, ix){
  var partRes = parts[ix];
  parts.splice(ix,1);
  var partProc = newPart(parseInt(proc.size))
  partProc.IdPart = partRes.IdPart
  partProc.used = proc;
  parts.splice(ix,0,partProc);
  var partEmpty = newPart(partRes.size - partProc.size);
  partEmpty.IdPart = parts.length + 1;
  partEmpty.used = null;
  parts.splice(ix+1,0,partEmpty);
  return parts
}

function reParticionar(){
  return true
}
//This will sort your array
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
  for (var i = 0; i < part.length; i++) {
    if (proc.size <= part[i].size && part[i].used == null) {
      return part[i].IdPart;
    }
  }
  return false
}

function bestFit(parts,proc){
  part = part.sort(SortBySize);
  for (var i = 0; i < part.length; i++) {
    if (proc.size <= part[i].size && part[i].used == null) {;
      return part[i].IdPart;
    }
  }
  return false
}

function worstFit(parts,proc){
  part = part.sort(SortBySizeDes);
  for (var i = 0; i < part.length; i++) {
    if (proc.size <= part[i].size && part[i].used == null) {;
      return part[i].IdPart;
    }
  }
  return false
}


//
// function worstFit(part,proc){};
//
//
// var arrayMemoria = arrayProc();
// //odenamos por arrivalTime
// sort(arrayMemoria)
// function PlanimemFija(particiones,sizeMemory,fitMemory,arrayMemoria) {
//   var listadeProc = []
//   arrayMemoria.forEach((proc) => {
//     if (proc.size) {
//       listadeProc.push(proc)
//     } }
//   return listadeProc
// };
//
//

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

function saveData() {

    var name = $('.name').val();
    var size = $('.size').val();
    var arrival = $('.arrival').val();
    var firstCpu = $('.firstCpu').val();
    var inOut = $('.inOut').val();
    var lastCpu = $('.lastCpu').val();

      //Para Verificacion del Tamaño de Procesos
    $('.alertProcess').removeClass('show');
    $('.alertProcess').addClass('hide');
    if (name&&size&&arrival&&firstCpu&&inOut&&lastCpu) {
      var maxTamPocess = getMaxProcessSize(typeMemory)
      if (size > maxTamPocess) {
        $(".textoalert").text("El tamaño del proceso no puede ser mayor al tamaño de memoria.");
        $('.alertProcess').addClass('show');
      }else {
        //Si el proceso entra en memoria se Guarda.
        saveFirebase(name, size, arrival, firstCpu, inOut, lastCpu);
    }
  }else {
    $(".textoalert").text("Ingrese los Datos.");
    $('.alertProcess').addClass('show');
  }
}

function saveFirebase(name, size, arrival, firstCpu, inOut, lastCpu) {

    db.collection("process").add({
        name: name,
        size: size,
        arrivalTime: arrival,
        cpuTime: firstCpu,
        ioTime: inOut,
        lastCpuTime: lastCpu
    }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

        $('.name').val("");
        $('.size').val("");
        $('.arrival').val("");
        $('.firstCpu').val("");
        $('.inOut').val("");
        $('.lastCpu').val("");

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

    var tabla = document.getElementById('tableId');

    db.collection("process").orderBy('arrivalTime').get().then((querySnapshot) => {

        tabla.innerHTML = '';
        var index = 1;

        querySnapshot.forEach((doc) => {

          tabla.innerHTML += `
            <tr>
                <td class="tdTable">${index}</td>
                <td class="tdTable">${doc.data().size}</td>
                <td class="tdTable">${doc.data().arrivalTime}</td>
                <td class="tdTable">${doc.data().cpuTime} - ${doc.data().ioTime} - ${doc.data().lastCpuTime}</td>
                <td class="tdTable"><button class="btn btn-danger" onclick="deleteData('${doc.id}')">Borrar</button></td>
            </tr>
            `;
            index += 1;

          arrayProcess.push(doc.data());
        });
    });

    console.log(arrayProcess)
}

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
      tiempoMax = tiempoMax + parseInt(procesos[i].ioTime) + parseInt(procesos[i].cpuTime) + parseInt(procesos[i].lastCpuTime);
  }
  return tiempoMax
}

function getIxByName(array,name){
  for (var i = 0; i < array.length; i++) {
    if (array[i].name == name){
      return i
    }
  }
  return false;
}

//Algoritmo de SAntino que me devuelve la cola de Listo
function solicitarProcesos(name){
  if (name == null) {
    return arrayProcess
  }else {
    var indice = getIxByName(arrayProcess, name);
    if(indice > -1){
      var test = arrayProcess.splice(indice,1);
      return arrayProcess;
    }
  }

}

//Obtiene el Siguiente proceso libre de la Memoria
function siguienteProceso(colaListo,colaBloqueados,colaESFin){
  var noHayProc = true;
  for (var i = 0; i < colaListo.length; i++) {
    console.log(colaESFin);
    console.log(colaBloqueados);
    var esBloq = estaEn(colaBloqueados,colaListo[i])
    var esTer = estaEn(colaESFin,colaListo[i])
    if (esBloq == false && esTer == false) {
      return colaListo[i]
    }else {
      noHayProc = false
    }
  }
  if (noHayProc == false){
    return null
  }
}

//Genera un nuevo elemento para la salida
function nuevoElemento(proceso,tiempo){
  var elemento = {};
  elemento.inTime = tiempo;
  elemento.name=proceso.name;
  elemento.arrivalTime = proceso.arrivalTime;//Analizar este Tiempo
  elemento.irrupctionTime = 0;
  elemento.outTime = 0;
  elemento.finish = false;
  return elemento
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
//algoritmo FCFS
function firstComeFirstServed(){
    //definimos las Vairables
   var colaBloqueados = [];
   var colaListo = solicitarProcesos(null);
   var colaESFin = []
   var salidaCPU = [];
   var salidaES = [];
   var salidaFinal = [];
   var enES = null;
   var tiempo = 0;
   var enCPU = null;
   var bloqDeCiclo = false;
   var controladorBucle = obtenerTiempoMax();
   console.log(controladorBucle);
   console.log('obtenemos el controlador de bucle');
    //Inicio del algoritmo, el For que controla la ejecucion total del algoritmo
   for (var i=controladorBucle; i > 0; i--) {
     //ya Cumplio ciclo ponemos en false
     bloqDeCiclo = false
     console.log(tiempo);
     console.log('Nuevo TIEMPO');
     console.log('ENTRADASALIDA');
     //Analizamos el Trabajo en ES en el mismo tiempo t analizamos primero porque al pasar un proceso a bloqueado automaticamente ejecuta
      if (enES != null) {
       console.log('hay Proc en ES');
       //Procesamso el elto else {
       enES.ioTime -= 1;
       elementoES.irrupctionTime +=1;
       //Verificamos si debemos sacar de CPU
       if (enES.ioTime < 1){
         //if (elementoES.irrupctionTime == 1) {
           if (colaESFin.length == 0) {
             bloqDeCiclo = true
           }
    //     }
         elementoES.outTime = tiempo+1;
         salidaES.push(elementoES);
         colaESFin.push(enES)
         colaBloqueados.shift();
         enES = null;
       }
       //controlamos ciclo de ejecucion ES
      }else{
       console.log('Cargamos proc en ES');
       //Agregamos un Elemento de la COla de bloqueado
         if (colaBloqueados.length > 0) {
           enES = colaBloqueados[0];
           elementoES = nuevoElemento(enES,tiempo);
           //Pocesamos el Elto ES
           enES.ioTime -= 1;
           elementoES.irrupctionTime +=1;
           //Verificamos si debemos sacar de CPU
           if (enES.ioTime < 1){
          //   if (elementoES.irrupctionTime == 1) {
               if (colaESFin.length == 0){
                bloqDeCiclo = true
                }
        //     }
             elementoES.outTime = tiempo+1;
             salidaES.push(elementoCPU);
             colaESFin.push(enES)
             colaBloqueados.shift()
             enES = null;
             }
         }else{
           console.log('No hay procesos en Bloqueados');
         }
       }

     //Analizamos el Trabajo en CPU en el tiempo t
     if (enCPU != null){
       console.log('hay proc en CPU');
       //Verificamos si posee primer tiempo de CPU y Al terminar Pasamos a Bloquado para ser atendido en ES
       if (enCPU.cpuTime > 0){
         console.log('Analizamos el 1er CPu');
         enCPU.cpuTime -= 1;
         elementoCPU.irrupctionTime +=1;
         //Verificamos si debemos Sacar de CPU 1
         if (enCPU.cpuTime < 1){
           console.log('Se proceso el Primer CPU y se pasa a Bloquado');
            elementoCPU.outTime = tiempo+1;
            salidaCPU.push(elementoCPU);
            //Agregamos a la lista de bloqueado los el proceso
            colaBloqueados.push(enCPU);
            elementoCPU = null;
            enCPU = null;
          }
        }else{
          console.log(enCPU);
          console.log('No posee primer tiempo');
          //Verificamos si posee Segundo Tiempo
          if (enCPU.lastCpuTime > 0){
            console.log('Posee Segundo Tiempo ');
            //Procesamos elto del tipo last CPU
            enCPU.lastCpuTime -= 1;
            elementoCPU.irrupctionTime +=1;
            //Verificamos si debemos sacar de CPU
            if (enCPU.lastCpuTime < 1){
              console.log('Proceso Terminado, Solicitamos Nuevos Procesos de la Memoria');
              elementoCPU.outTime = tiempo+1;
              salidaCPU.push(elementoCPU);
              colaListo = solicitarProcesos(enCPU.name);
              elementoCPU = null;
              enCPU = null;
            }
            }else{
              console.log('Error, Se metio un proceso de ES');
            }
        }
      }else{
        console.log('Cargamos un Nuevo proceso a CPU');
        //Primero analaizamos cola Bloaqueada y lo quitamos
        //Luego analaizamos Cola Listo
        if (bloqDeCiclo == true) {
          bloqDeCiclo = false
        }else {
          if (colaESFin.length > 0) {
            console.log('Hay procesos listos de ES');
            enCPU = colaESFin[0];
            //una Vez que empezamos a tratar lo Eliminamos de la cola pendientes
            colaESFin.shift();
            elementoCPU = nuevoElemento(enCPU,tiempo);
            //Procesamos elemento last clpu
            enCPU.lastCpuTime -= 1;
            elementoCPU.irrupctionTime +=1;
            //Verificamos si debemos sacar de CPU
            if (enCPU.lastCpuTime < 1){
              console.log('Se Proceso por Completo el');
              console.log(enCPU.name);
              elementoCPU.outTime = tiempo;
              salidaCPU.push(elementoCPU);
              console.log(salidaCPU);
              //Refrescamos la cola de listos
              colaListo = solicitarProcesos(enCPU.name);
              enCPU = null;
              elementoCPU = null;
            }
          }else{
            console.log('no hay terminados tomamos el siguiente no bloqueado');
            // Solicitamos el Proximo Proceso en listo que no este bloqueddo
            enCPU = siguienteProceso(colaListo,colaBloqueados,colaESFin);
            console.log(enCPU);
            //Verificamos si hay algun proceso en la CL
            if (enCPU != null){
              console.log('Se encontro un Proceso listo');
              elementoCPU = nuevoElemento(enCPU,tiempo);
              enCPU.cpuTime = enCPU.cpuTime-1;
              elementoCPU.irrupctionTime +=1;
              //Verificamos si debemos Sacar de CPU 1
              if (enCPU.cpuTime < 1){
                  //elementoCPU.outTime = elementoCPU.irrupctionTime + elementoCPU.inTime;
                  elementoCPU.outTime = tiempo
                  salidaCPU.push(elementoCPU);
                  console.log(salidaCPU);
                  //Agregamos a la lista de bloqueado los el proceso
                  colaBloqueados.push(enCPU);
                  elementoCPU = null;
                  enCPU = null;
                }
            }else{
              console.log('No hay mas Procesos no bloqueados');
            }//si es Null entonces CPU ociosa
          }
        }
      }
    //timer del PROCESADOR
    tiempo += 1;
    //Control FIN ALGORITMO
    if( (colaListo.length == 0) && (colaBloqueados.length == 0) && (colaESFin.length == 0) ){
      break
    }
  }
  salidaFinal.push(salidaCPU);
  salidaFinal.push(salidaES);
  console.log("Es la salida final", salidaFinal);

  return salidaFinal;
}


function roundRobin(quantum){
  var colaListo=solicitarProcesos(null);
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
  var controladorBucle=obtenerTiempoMax();
  var tiempo=0;
  var t1=0;
  var t2=0;

  //for que controla todo el algoritmo
  for (j = 0; j < controladorBucle; j++) {
    console.log(tiempo);
    //para solicitar procesos a la cola de listo en caso de que el proceso haya terminado
    // y para repartir por cola de cpu y de e/s en caso de que no haya terminado
    for (var x = 0; x < colaListo.length; x++) {
      if (colaListo[x].cpuTime > 0){
        if (estaEn(colaCPU,colaListo[x]) == false && enCPU != colaListo[x]) {
          colaCPU.push(colaListo[x]);
        }
      }else{
          if(colaListo[x].ioTime > 0 ){
            if (estaEn(colaES,colaListo[x]) == false && enES != colaListo[x]) {
              colaES.push(colaListo[x])
            }

          }else{
            if (colaListo[x].lastCpuTime > 0  &&(estaEn(colaCPU,colaListo[x]) == false)){
              if (colaListo[x].ioTime < 1) {
                colaCPU.push(colaListo[x]);
              }
            }else{colaListo=solicitarProcesos(colaListo[x].name)}
              }
        }
    }
    //para darle valores a enCPU
    if (enCPU == null){
      if (colaCPU.length > 0) {
        console.log('No hay CPU y hay elementos en colaCPU');
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
      if(enCPU.cpuTime > 0){
        enCPU.cpuTime-=1;
        //colaListo[indice].cpuTime-=1;
        if (enCPU.cpuTime < 1 || t1==quantum){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                            enCPU = null;
                                            salidaCPU.push(elementoCPU);
                                            t1=0;
                                          }
      }else{enCPU.lastCpuTime-=1;
            //colaListo[indice].lastCpuTime-=1;
            if (enCPU.lastCpuTime < 1 || t1==quantum){elementoCPU.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                                    if(enCPU.lastCpuTime==0){elementoCPU.finish=true}
                                                    enCPU = null;
                                                    if (quantum == 5) {
                                                      console.log('Agoto el quanto');
                                                    }
                                                    salidaCPU.push(elementoCPU);
                                                    t1=0;}
            }
    }
    //para procesar el contenido de enES
    if (enES != null){
      elementoES.irrupctionTime+=1;
      enES.ioTime-=1;
      //colaListo[indice2].ioTime-=1;
      if (enES.ioTime < 1){elementoES.outTime=elementoCPU.inTime+elementoCPU.irrupctionTime;
                                        enES = null;
                                        salidaES.push(elementoES);
                                        }
    }
    tiempo+=1;
    if (colaListo.length == 0 && colaCPU.length == 0 && enCPU == null){break}

  }
  salidaFinal.push(salidaCPU);
  salidaFinal.push(salidaES);
  console.log("Es la salida final", salidaFinal);
}