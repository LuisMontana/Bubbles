angular.module('miigo.controllers', [])

.controller('DashCtrl', function($scope, User) {
    $scope.user = User.get();
})

.controller('CardCtrl', function($scope, $filter, $ionicModal, $ionicLoading, CardService) {
  /*  General data for the app interaction */
  $scope.data = {
        showDelete: false,
        showReorder: false,
        tarjetas: datosTarjetas['NmTarjeta']
  };
  
  /** Cards registered by the user. */
  $scope.misTarjetas = CardService.misTarjetas;
  
  /** New card data */
  $scope.inputs = {
      franquicia: {},
      tarjeta: {}
  };
  
  /** Input data for simulation */
  $scope.simdata = {
      tipo: "compra",
      cuotas: 1,
      monto: null,
      calcular: false,
      result: {cuota: 0, millas: 0},
      card: {},
  };
  
  $scope.backUpTarjetas = function () {
      CardService.saveTarjetas();
  };
  
  /**
   * Add a new card tarjeta to the list misTarjetas.
   * @param {string} franquicia - The brand of the card. 
   * @param {any} in_tarjeta - Object representing the card. */
  $scope.agregarTarjeta = function (franquicia, in_tarjeta) {
      /* Prevent Undefined input */
      if (in_tarjeta["nombreTipo"])
          {
          var resultado = false;
          var tarjeta = angular.copy(in_tarjeta)
          tarjeta["nombreTipo"] = franquicia + " " + tarjeta["nombreTipo"];
          if ($filter('getByName')($scope.misTarjetas, tarjeta.nombreTipo) === null)
          {
              $scope.misTarjetas.push(tarjeta);
              $scope.backUpTarjetas();
              resultado =  true;
          }
          $scope.closeModal();
      }
  };
  
  /** Add a new card tarjeta to the list misTarjetas.
   * @param {any} tarjeta - Object representing the card. */
  $scope.removerTarjeta = function (tarjeta) {
      $scope.misTarjetas.splice($scope.misTarjetas.indexOf(tarjeta), 1);
      $scope.backUpTarjetas();
  };
  
  /** Reorder the list of cards. */
  $scope.moverTarjeta = function(item, fromIndex, toIndex) {
      $scope.misTarjetas.splice(fromIndex, 1);
      $scope.misTarjetas.splice(toIndex, 0, item);
      $scope.backUpTarjetas();
  };
  
  $scope.evaluarCuotas = function () {
      if ($scope.simdata.tipo == 'avance')
      {
          $scope.simdata.cuotas = 18;
      }
  };
  
  /** Simulate a purchase with the card and return the amount of miles generated and monthly payment.
   * @param {number} amount - Amount of money to pay.
   * @param {number} rate - interest rate.
   * @param {number} n - number of payments.
   * @param {number} milles - miles/dolar rate.
   * @param {boolean} withMilles - count milles.
   */
  $scope.simularCompra = function (amount, rate, n, milles, withMilles) {
      // Variables
      var result = {cuota: 0, millas: 0};
      // Check values
      if (amount > 0, rate > 0)
      {
          if (amount >= parametros.LimitesCompra.min || amount <= parametros.LimitesCompra.max)
          {
              if (n == 1)
              {
                  result.cuota = amount;
              } else {
                  rate = rate / 100;
                  result.cuota = Math.round(amount / ((1 - Math.pow((1 + rate),(-n))) / rate));
              }
              
              if (withMilles)
              {
                  result.millas = Math.floor(amount / parametros.trm * milles);
              }
          }
      }
      $scope.simdata.result = result;
  };
  
  $scope.simularTarjeta = function () {
      var rate = 0.00001;
      var milles = 0;
      var withMilles = true;
      var monto = ($scope.simdata.monto === null) ? 0 : $scope.simdata.monto;
      $scope.show();
      if ($scope.simdata.tipo == "avance") 
      {
          rate = $scope.simdata.card.Prop.Avance;
          withMilles = false;
      } else {
          rate = $scope.simdata.card.Prop.CompraNacional;
      }
      if ($scope.simdata.card.Prop.Millas == "NA")
      {
          withMilles = false;
      } else {
          milles = $scope.simdata.card.Prop.Millas / $scope.simdata.card.Prop.USD;
      }
      $scope.simularCompra(monto, rate, $scope.simdata.cuotas, milles, withMilles);
      $scope.simdata.calcular = true;
      $scope.hide();     
  };
  
  /* Sim card modal functions */
  $ionicModal.fromTemplateUrl('templates/card/sim-card.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.simmodal = modal;
  });
  $scope.openSModal = function(card) {
      $scope.simdata.card = card;
      $scope.simmodal.show();
      $scope.data.showDelete = false;
      $scope.data.showReorder = false;
  };
  $scope.closeSModal = function() {
      $scope.simmodal.hide();
      $scope.simdata = {
          tipo: "compra",
          cuotas: 1,
          monto: null,
          calcular: false,
          result: {cuota: 0, millas: 0},
          card: {},
      };
  };
      
  /* Add card functions */
  $ionicModal.fromTemplateUrl('templates/card/add-card.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
  });
  $scope.openModal = function() {
      $scope.modal.show();
      $scope.data.showDelete = false;
      $scope.data.showReorder = false;
  };
  $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.inputs = {
          franquicia: {},
          tarjeta: {}
      };
  };
  
  // Spinner functions for loading
  $scope.show = function() {
      $ionicLoading.show({
          template: '<ion-spinner></ion-spinner>'
      });
  };
  $scope.hide = function(){
      $ionicLoading.hide();
  };
  
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
      $scope.modal.remove();
      $scope.simmodal.remove();
  });
  
  $scope.test = function(){console.log($scope.data.tarjetas);};
})

.controller('BubblesCtrl', function($scope, $stateParams, $ionicPopup, Budgets, User) {

  $scope.budgets = Budgets.all();
  // add new budget 
  if ($stateParams.budgetId=='new'){
    console.log(Budgets.top().id+1);
    Budgets.newB(Date.now());
    $scope.topBudget = Budgets.top();
    console.log($scope.topBudget.strt, Date.now());
  }

  else{
    $scope.topBudget = Budgets.get($stateParams.budgetId);
  }
  

  $scope.user = User.get();
  $scope.extract = 0;
  $scope.topBudget.mleft = $scope.topBudget.salary;
  // day of the month 

  

  $scope.draggableObjects = [{name:'one'}];
  $scope.showExtract = true;

  

  $scope.minSlider = {
        value: 10
    };
  

   
  $scope.onInputChange = function () {
    $scope.topBudget.mleft = $scope.topBudget.salary;
  }
  // Pop up that will ask the user to select 
  $scope.showPopup = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.qty">',
      title: '¿Cuanto desea extraer?',
      subTitle: 'El monto debe ser menor al restante del salario',
      scope: $scope,
      buttons: [
      { text: 'Cancelar' },
      {
        text: '<b>Aceptar</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.qty ||
            $scope.data.qty > $scope.salary ) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            $scope.extract = $scope.data.qty;
            $scope.showExtract = false;
            $scope.topBudget.mleft = $scope.topBudget.mleft - $scope.extract;
          }
        }
      }
      ]
    });

  };
 
  $scope.onDropComplete = function(elem){
            $scope.topBudget[elem] += parseInt($scope.extract);
            $scope.extract = 0;
            $scope.showExtract = true;
  }

})

.controller('BubblesOvwCtrl', function($scope, $stateParams, Budgets,User) {
  $scope.budgets = Budgets.all();
  $scope.topBudget = Budgets.get($stateParams.budgetId);
  $scope.user = User.get();
  
  //constant to transform from miliseconds to days
  var multiplier = Math.floor((Date.now() - $scope.topBudget.strt)/86400000);

  //progress for each category 
  $scope.progressT = Math.floor($scope.topBudget.transp/$scope.topBudget.end)* multiplier; 
  $scope.progressF = Math.floor($scope.topBudget.food/$scope.topBudget.end)* multiplier; 
  $scope.progressU = Math.floor($scope.topBudget.util/$scope.topBudget.end)* multiplier; 
  $scope.progressE= Math.floor($scope.topBudget.educ/$scope.topBudget.end)* multiplier; 
  $scope.progressR = Math.floor($scope.topBudget.rent/$scope.topBudget.end)* multiplier; 
  $scope.progressD = Math.floor($scope.topBudget.debt/$scope.topBudget.end)* multiplier; 
  $scope.progressEn = Math.floor($scope.topBudget.entrt/$scope.topBudget.end)* multiplier; 
  $scope.progressS =  Math.floor($scope.topBudget.savi/$scope.topBudget.end)* multiplier; 
  
  $scope.spent = $scope.progressT + $scope.progressF + $scope.progressU 
                + $scope.progressE + $scope.progressR + $scope.progressD 
                + $scope.progressEn + $scope.progressS; 
  $scope.mleft = ($scope.topBudget.salary-$scope.spent); 
  //Chart Config
  $scope.labels = ["Spent", "Left"];
  $scope.data = [$scope.spent, $scope.mleft];
  $scope.colours = [{ // green
      strokeColor: 'rgba(156,188,58,1)'
    }, { // white
      strokeColor: 'rgba(240,240,240,1)'
    }];

})

.controller('BubblesSelCtrl', function($scope, Budgets,User) {
  $scope.budgets = Budgets.all();
  $scope.user = User.get();
})

.controller('WishCtrl', function($scope, $ionicModal, $cordovaCamera, $cordovaFile, Wishes, User) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.wishes = Wishes.all();
  $scope.topWish = Wishes.top();
  $scope.user = User.get();
  $scope.balance = $scope.user.balance;
  
  // New Wish Data
  $scope.inputWish = {
    id:0,
    name: '',
    cost: 0,
    pic: 'img/ionic.png',
    desc: '',
    claimed: false
  };
  
  $scope.topProgress = ($scope.topWish.cost < $scope.balance) ? 100 : Math.floor($scope.balance / $scope.topWish.cost * 100);
  
  $scope.remove = function(wish) {
    Wishes.remove(wish);
  };
  
  /* Add Wish functions */
  $ionicModal.fromTemplateUrl('templates/wish/add-wish.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
  });
  $scope.openModal = function() {
      $scope.modal.show();
  };
  $scope.closeModal = function() {
      $scope.modal.hide();
  };
  
  $scope.addImage = function() {
      var options = {
        destinationType : Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
        allowEdit : false,
        targetWidth: 400,
        targetHeight: 400,
        saveToPhotoAlbum: true,
        encodingType: Camera.EncodingType.JPEG
      };
      
    $cordovaCamera.getPicture(options).then(function(imageData) {

        //onImageSuccess(imageData);
        $scope.inputWish.pic = imageData;
        $scope.$apply();
/*
        function onImageSuccess(fileURI) {
            createFileEntry(fileURI);
        }

        function createFileEntry(fileURI) {
            window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        }

        function copyFile(fileEntry) {
            var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
            var newName = makeid() + name;

            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                fileEntry.copyTo(
                    fileSystem2,
                    newName,
                    onCopySuccess,
                    fail
                );
            },
            fail);
        }

        function onCopySuccess(entry) {
            $scope.$apply(function () {
               $scope.inputWish.pic = entry.nativeURL;
            });
        }

        function fail(error) {
            console.log("fail: " + error.code);
        }

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i=0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
*/
    }, function(err) {
        console.log(err);
    });
  };
  // Every time we open the app the sandbox directory changes, so use this with $localStorage.
  $scope.urlForImage = function(imageName) {
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        return trueOrigin;
  }
  
  $scope.addWish = function() {
      Wishes.add(angular.copy($scope.inputWish));
      $scope.modal.hide();
  };
  
})

.controller('WishDetailCtrl', function($scope, $stateParams, Wishes, User) {
  $scope.wish = Wishes.get($stateParams.wishId);
  $scope.user = User.get();
  $scope.balance = $scope.user.balance;
  $scope.progress = ($scope.wish.cost < $scope.balance) ? 100 : Math.floor($scope.balance / $scope.wish.cost * 100);
  
  $scope.canClaim = function () {
      return (!$scope.wish.claimed && Wishes.canClaim && $scope.wish.cost <= $scope.balance);
  };
  $scope.claim = function() {
      if($scope.canClaim()) {
          $scope.wish.claimed = true;
          Wishes.claim();
          User.addPoints(10, "Wish Claimed");
          window.alert("Felicidades, te regalamos 10 puntos por lograr tu sueño.");
      }
  };
})

.controller('PointsCtrl', function($scope, User) {
  $scope.user = User.get();
  $scope.package = 'TS';
  $scope.equiv = {
      TS: [20,20],
      TM: [50,60],
      TL: [90,120],
      DS: [20,30],
      DM: [50,70],
      DL: [90,150]
  };
  
  $scope.isMinutos = function() {
      return ($scope.package == 'TS' || $scope.package == 'TM' || $scope.package == 'TL');
  };
  
  $scope.selectPackage = function(selected) {
      $scope.package = selected;
  }; 
  
  $scope.exchange = function (){
      if ($scope.user.points < $scope.equiv[$scope.package][0])
      {
          window.alert("Lo sentimos, no tienes puntos suficientes.");
      } else {
          if ($scope.package == 'TS' || $scope.package == 'TM' || $scope.package == 'TL')
          {
              User.exchange($scope.equiv[$scope.package][0], $scope.equiv[$scope.package][1],0);
          } else {
              User.exchange($scope.equiv[$scope.package][0], 0, $scope.equiv[$scope.package][1]);
          }
          window.alert("Cambio exitoso.");
      }
  };
});
