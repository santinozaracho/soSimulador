var sizeMemory = "256";
var typeMemory = "Fija";
var fitMemory = "Best Fit";
var algorithm = "FCFS"

$(document).ready(function () {
    getData();

    $(".quantumIn").hide();

    console.log(sizeMemory);
    console.log(typeMemory);
    console.log(fitMemory);
    console.log(algorithm);

    $(".sizeInput, .arrivalInput, .firstCpu, .inOut, .lastCpu, .quantumIn").keydown(function (e) {
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
      var valueCurrent = $(".optionTypeOne > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
   });
   $(".optionTypeTwo").click(function(){
      var valueCurrent = $(".optionTypeTwo > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
   });
   $(".optionTypeThree").click(function(){
      var valueCurrent = $(".optionTypeThree > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
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


});


firebase.initializeApp({
    apiKey: 'AIzaSyBPV-YDy4TwyVtAnKzG8SQ3fwKy4gyAHxQ',
    authDomain: 'proyectoprocesos-fddd5.firebaseapp.com',
    projectId: 'proyectoprocesos-fddd5'
});

// Initialize Cloud Firestore through Firebase
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

    db.collection("process").get().then((querySnapshot) => {

        tabla.innerHTML = '';

        var index = 1;

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().name}`);

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

        });
    });


}


/*Para ordenar por tiempo de arribo antes de procesar*/
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = doc.getElementById("tdTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = tdTable.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (x.innerHTML.arrivalTime > y.innerHTML.arribalTime) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


/*Algoritmo Round Robin*/
// function RoundRobin(){
//       var listaprocesos, procesoEjecucion, procesosCola, quantum, totalProcesos, bandera, i, tiempo, nprocesos;
//       listaprocesos=doc.getElementById("tdTable");
//       procesoEjecucion = tdTable.rows;
//       quantum=FATA DEFINIR EN LA TABLA;
//       totalProcesos= listaprocesos.length;
//       bandera= true;
//       tiempo=0;
//       nproceso=0;
//       while (listaprocesos>0){
//         if(tdTable.rows > nproceso and tiempo >= listadeprocesos[nproceso].innerHTML.arribalTime){
//               procesosCola.unshift(listadeprocesos[nproceso]);
//               nproceso = nproceso +1;
//
//           else
//             (if (nproceso>0 or procesosCola.length> 0){
//               if(procesoEjecucion =null){
//                 procesoEjecucion = delete procesosCola[0];
//                 bandera = true
//               else (if(bandera){
//                       if(procesoEjecucion.cpuTime >=quantum){
//                         procesoEjecucion.cpuTime = procesoEjecucion.cpuTime - quantum;
//                         tiempo = tiempo + quantum;
//                       else(tiempo = tiempo + procesoEjecusion.cpuTime
//                         procesoEjecucion.cpuTime = 0;}
//
//                       if(procesoEjecucion.cpuTime <1 ){
//                           procesoEjecucion.finalizacion = tiempo;
//                           procesoEjecucion.retorno = procesoEjecucion.finalizacion - procesoEjecucion.llegada;
//                           procesoEjecucion.espera = procesoEjecucion.retorno - procesoEjecucion.rafaga;
//                           totalProcesos = totalProcesos-1;
//                           procesoEjecusion = null;
//
//                       else
//                           bandera= false;}
//                     else
//                       procesosCola.unshift(procesoEjecucion);
//                       procesoEjecucion = null;}
//               }
//             else
//               tiempo = tiempo +1;})
//         }
//
//       totalretorno=0
//       totalespera=0
//       for proceso in listadeprocesos:
//           print("Proceso "+ str(proceso.id) + " Finalizo: "+str(proceso.finalizacion) + " Espera: "+str(proceso.espera)+ " Retorno: "+str(proceso.retorno))
//           totalretorno = totalretorno + proceso.retorno
//           totalespera = totalespera + proceso.espera
//       print()
//       print("Promedio de retorno: " +str(totalretorno/len(listadeprocesos)))
//       print("Promedio de espera: " +str(totalespera/len(listadeprocesos)))
//   else:
//       print("No es valido")
// except Exception as e:
//   print(e)
//
//         if listaprocesos =[]{
//             bandera=false;
//         }
//       }
//
// }
