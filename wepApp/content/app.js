var sizeMemory = "256";
var typeMemory = "Fija";
var fitMemory = "Best Fit";
var algorithm = "FCFS";

var arrayProcess = [];

$(document).ready(function () {
    getData();
    $(".quantumIn").hide();

    console.log(sizeMemory);
    console.log(typeMemory);
    console.log(fitMemory);
    console.log(algorithm);

    $(".sizeInput, .arrivalInput, .firstCpu, .inOut, .lastCpu, .quantumIn, .fixedPart").keydown(function (e) {
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
      var te = $(".optionOne > input").val();
      sizeMemory = te;
      console.log(sizeMemory)
   });
   $(".optionTwo").click(function(){
       var te = $(".optionTwo > input").val();
       sizeMemory = te;
       console.log(sizeMemory)
   });
   $(".optionThree").click(function(){
      var te = $(".optionThree > input").val();
      sizeMemory = te;
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
      //$("#collapseExample").removeClass("show");
      $("#collapseExample").addClass("show");
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

   //falta hacer
   $(".nexttab").click(function() {

   });
   //--------------

});

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

function saveData() {

    var name = $('.name').val();
    var size = $('.size').val();
    var arrival = $('.arrival').val();
    var firstCpu = $('.firstCpu').val();
    var inOut = $('.inOut').val();
    var lastCpu = $('.lastCpu').val();

    saveFirebase(name, size, arrival, firstCpu, inOut, lastCpu);
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

          console.log(arrayProcess);

          firstInFirstOut(arrayProcess);//borrar despues de probar

        });
    });
}

function secondStep(){
  $('[href="#profile"]').tab('show');
}

//algoritmo FCFS
//falta agregar arrayProcess como parametro
function firstInFirstOut(procesosMemoria){

   var colaListo = procesosMemoria;
   var i;
   var tiempoEspera;
   var salidaCPU= [];
   var salidaES= [];
   var salidaFinal = [];
   var bandera;
   var x=0;
   var controladorBucle = 0;
   var tiempoEspera;
   var enEjecucion = [];
   var salidaFinal= new Array;

   // for (var i = 0; i < colaListo.length; i++) {
   //    var firstCpu = parseInt(colaListo[i].ioTime) + parseInt(colaListo[i].cpuTime) + parseInt(colaListo[i].lastCpuTime);
   //    var controladorBucle =controladorBucle + firstCpu;
   //    console.log("La duración total del proceso",test);
   // }

   for (var x = 0; x < colaListo.length; x++) {
         enEjecucion = colaListo[x];
         salidaCPU.push(enEjecucion.name);
         salidaES.push(enEjecucion.name);

          if (enEjecucion.cpuTime!= 0){
            salidaCPU.push( enEjecucion.cpuTime );
            salidaES.push('Ocioso',enEjecucion.cpuTime);
            colaListo.cpuTime=0;
           }
         if(enEjecucion.ioTime!=0){
           salidaES.push( enEjecucion.ioTime );
           salidaCPU.push('Ocioso',enEjecucion.ioTime);
           colaListo.ioTime=0;
         }
         if(enEjecucion.lastCpuTime!=0){
           salidaCPU.push( enEjecucion.lastCpuTime );
           salidaES.push('Ocioso',enEjecucion.lastCpuTime);
           colaListo.lastCpuTime=0;
         }
  }
  salidaFinal.push(salidaCPU);
  salidaFinal.push(salidaES);

  console.log("Es la salida final", salidaFinal);
  
}
