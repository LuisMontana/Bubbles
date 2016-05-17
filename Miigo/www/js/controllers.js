angular.module('miigo.controllers', [])

.controller('DashCtrl', function($scope) {})

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

.controller('BubblesCtrl', function($scope, $ionicPopup, $ionicModal, Budgets, User) {

  $scope.budgets = Budgets.all();
  $scope.topBudget = Budgets.top();
  $scope.user = User.get();
  $scope.extract = 0;
  // day of the month 

  $scope.draggableObjects = [{name:'one'}];
  $scope.showExtract = true;
  
  $scope.minSlider = {
        value: 10
    };

  $ionicModal.fromTemplateUrl('templates/bubbles/sel-budget.html', {
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

  $scope.storeValues = function(){
    $scope.topBudget.salary = $scope.salary;
    $scope.topBudget.strt = Date.now();
    $scope.topBudget.end = $scope.days;
    console.log($scope.topBudget.salary, $scope.topBudget.strt , $scope.topBudget.end);

  }

  $scope.onDropComplete = function(elem){
            $scope.topBudget[elem] += parseInt($scope.extract);
            $scope.extract = 0;
            $scope.showExtract = true;
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
            $scope.topBudget.salary = $scope.topBudget.salary - $scope.extract;
          }
        }
      }
      ]
    });

  };

})

.controller('BubblesOvwCtrl', function($scope, Budgets,User) {
  $scope.budgets = Budgets.all();
  $scope.topBudget = Budgets.top();
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
  $scope.spent = Math.floor($scope.topBudget.salary/$scope.topBudget.end)* multiplier;

  console.log($scope.progressT, $scope.topBudget.transp, $scope.topBudget.end );

  $scope.labels = ["Spent", "Left"];
  $scope.data = [$scope.spent, ($scope.topBudget.salary-$scope.spent)];
  $scope.colours = ["#9DBD3A", "#36A2EB"]
})


.controller('WishCtrl', function($scope, Wishes, User) {
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
  
  $scope.topProgress = ($scope.topWish.cost < $scope.balance) ? 100 : Math.floor($scope.balance / $scope.topWish.cost * 100);
  
  $scope.remove = function(wish) {
    Wishes.remove(wish);
  };
})

.controller('WishDetailCtrl', function($scope, $stateParams, Wishes, User) {
  $scope.wish = Wishes.get($stateParams.wishId);
  $scope.user = User.get();
  $scope.balance = $scope.user.balance;
  $scope.progress = ($scope.wish.cost < $scope.balance) ? 100 : Math.floor($scope.balance / $scope.wish.cost * 100);
  
})

.controller('PointsCtrl', function($scope, User) {
  $scope.user = User.get();
  $scope.settings = {
    enableFriends: true
  };
});
