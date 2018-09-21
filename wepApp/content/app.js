var sizeMemory = "256";


$(document).ready(function () {
    getData();

    console.log(sizeMemory)

    $(".sizeInput, .arrivalInput, .firstCpu, .inOut, .lastCpu").keydown(function (e) {
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
