var notasRef = new Firebase('https://nota-7fb52.firebaseio.com/notas/');

var chave = document.getElementById('chaveNota');
var WebCamera = require("webcamjs");
// Save data to firebase

var myApp = angular.module('DemoApp', ['firebase']);

myApp.constant("FIREBASE_URL", "https://nota-7fb52.firebaseio.com/entidades/68644723000167/notas/" )

function DemoCtrl($scope, $firebase, FIREBASE_URL) {
    // Get Stored TODOs
    var notasList = new Firebase(FIREBASE_URL);
    $scope.todos = $firebase(notasList);

    // Update the "completed" status
    $scope.changeStatus   = function (item) {
        // Get the Firebase reference of the item
        var itemRef = new  Firebase(FIREBASE_URL + item.chaveNota);
        $firebase(itemRef).$set({
        	chaveNota: item.chaveNota,
        	valor : item.valor,
        	status: !item.status
        });
    }

    // Remove a Todo
    $scope.removeNota   = function (index, item, event) {
       // Avoid wrong removing
       if (item.chaveNota == undefined)return;
       // Firebase: Remove item from the list
       $scope.todos.$remove(item.chaveNota);
   }

   $scope.addNota  = function () {
        // Get the Firebase reference of the item
        var chaveNota = new Firebase(FIREBASE_URL + $scope.chaveNota)

   		var timestamp = new Date().valueOf()
        // Get the Firebase reference of the item
        $firebase(chaveNota).$set({
            chaveNota: $scope.chaveNota,
            valor : "1555",
            status: false
        });
        $scope.chaveNota = "";

    }
}

/*
// CAMERA
function carregar(result) {
	var url = result
	chave = url.split('?')[1].split('=')[1].split('&')[0]
	valor = url.split('?')[1].split('NF=')[1].split('&')[0]
	icms = url.split('?')[1].split('ICMS=')[1].split('&')[0]
	$("#chave").text(chave)
	$("#valor").text(valor)
	$("#icms").text(icms)
	console.log()
}

var scanner = new Instascan.Scanner({ video: document.getElementById('preview'),
	mirror:false });
scanner.addListener(WebCamera, function (content) {
	carregar(content);
});
Instascan.Camera.getCameras().then(function (cameras) {
	if (cameras.length > 1) {
		scanner.start(cameras[1]);
	} else if (cameras.length > 0) {
		scanner.start(cameras[0]);
	}else {
		alert("Camera não econtrada, experimente em outro aparelho!");
		console.error('No cameras found.');
	}
}).catch(function (e) {
	console.error(e);
});
*/