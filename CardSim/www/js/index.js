var app = angular.module('CardSim', ['ionic']);
/*
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    template: '<p>Hello, world!</p>'
  })
});
*/

/** Local storage for user data persistence */
app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = angular.toJson(value);
    },
    getObject: function(key) {
      return angular.fromJson($window.localStorage[key] || '[]');
    }
  }
}]);

// Filter for searching a card by name in an array, usable with ng-repeat
app.filter('getByName', function() {
  return function(input, nombre) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].nombreTipo == nombre) {
        return input[i];
      }
    }
    return null;
  }
});

app.factory('CardService', ['$localstorage', function($localstorage){
    var misTarjetas = $localstorage.getObject('misTarjetas');
    return {
        misTarjetas: misTarjetas,
        getTarjeta: function (index) {
            return misTarjetas[index];
        },
        saveTarjetas: function () {
            $localstorage.setObject('misTarjetas', misTarjetas);
        }
    }
}]);

app.controller('MainCtrl', ['$scope', '$filter', '$ionicModal', 'CardService', '$ionicLoading',
function($scope, $filter, $ionicModal, CardService, $ionicLoading)
{
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
    }
    
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
    }
    
    /** Simulate a purchase with the card and return the amount of miles generated and monthly payment.
     * @param {number} amount - Amount of money to pay.
     * @param {number} rate - interest rate.
     * @param {number} n - number of payments.
     * @param {number} milles - miles/dolar rate.
     * @param {boolean} withMilles - count milles.
     */
    $scope.simularCompra = function (amount, rate, n, milles, withMilles) {
        // Variables
        var result = {cuota: 0, millas: 0}
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
    $ionicModal.fromTemplateUrl('templates/sim-card.html', {
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
    $ionicModal.fromTemplateUrl('templates/add-card.html', {
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
        }
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
}]);