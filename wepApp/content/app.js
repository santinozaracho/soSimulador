var sizeMemory = 256;
var typeMemory = "Fija";
var fitMemory = "Best Fit";
var algorithm = "FCFS";

var arrayProcess = [];

$(function () {
  $('[data-toggle="popover"]').popover()
})

$(document).ready(function () {
    getData();

    $(".quantumIn").hide();

    $(".optionFitTwo").hide();

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
      $('.progress-bar').clone().addClass('newClass').insertAfter('.progress');
   });
   //--------------

});


var cont = 0;
var maxpart = 5;
var memfija = []
var part = { "partid":1, "size":0}
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
        if(memfija.length > 0){
          memfija.forEach(function(sizepart,index) {
            tamdisp =  tamdisp - sizepart
          })
        }

        //Tamaño de particion ingreasda
        var sizepart = currentEntry.find('input').val()

        if( (sizepart <= tamdisp) & (sizepart > 0) ){

          memfija.push(sizepart)

          var controlForm = $('.controls form:first'),
              currentEntry = $(this).parents('.entry:first'),
              newEntry = $(currentEntry.clone()).appendTo(controlForm);

          newEntry.find('input').val('')

          cont = cont + 1;

          controlForm.find('.entry:not(:last) .input-group-prepend .span .input-group-text').innerHTML ="Particion " +cont;

          controlForm.find('.entry:not(:last) .inputMemory')
            .addClass('classDisabled')
            .removeClass('inputMemory')
            .prop("disabled", true);

          controlForm.find('.entry:not(:last) .btn-add')
              .removeClass('btn-add').addClass('btn-remove')
              .removeClass('btn-success').addClass('btn-danger')
              .html('<span class="glyphicon glyphicon-minus">Quitar</span>');


        }else{
          //Alerta por Nueva Particion muy grande
          $('.alertCustom').addClass('show');
        }

      }else{
          //alerta por cantidad maxima de particiones
          $('.alertCustom').addClass('show');
      }

    }).on('click', '.btn-remove', function(e){
      $(this).parents('.entry:first').remove();
      cont = cont - 1;
      console.log(memfija);
      memfija.pop();
      console.log(memfija);
      e.preventDefault();

      return false;
  });
//-------

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

          console.log(arrayProcess[1])

        });
    });
}

function secondStep(){
  $('[href="#profile"]').tab('show');
}

//algoritmo FCFS
// function FCFS(procesosMemoria){
//    var colaListo, i, tiempoE, salidaCPU, salidaES, bandera
//    badera=true
//    colaListo=procesosMemoria
//    i=0
//    while (colaListo!= null && bandera=true){
//          salidaCPU[]=colaListo[i]

//          if (colaListo[1]!=0 || colaListo[3]!=0){
//              tiempoE= listaProcesosGeneral[salidaCPU]
//              if (colaListo[1]!=0){
//               salidaCPU[1]=arrayProcess
//               }


//           }else{if (colaListo[2]<>0) {


//           }else{bandera=false}
//               }
//     }

// }
