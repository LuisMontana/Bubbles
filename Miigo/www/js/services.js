angular.module('miigo.services', [])

.factory('$localstorage', ['$window', function($window) {
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
}])

.factory('CardService', ['$localstorage', function($localstorage){
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
}])

.factory('User', function() {
  // Testing data
  var user = {
    id:1,
    cc:"12348765",
    f_name:"Jhon",
    l_name:"Doe",
    email:"jhond@example.com",
    balance: 1100000,
    points: 180,
    minutes: 30,
    cuota: 90
  };
  // This functions should consume a REST resource
  return {
    get: function() {
      return user;
    },
    update: function() {
      // Call the server and update the balance
      return true;
    }
  };
})

.factory('Wishes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var wishes = [{
    id: 0,
    name: 'Bicicleta',
    cost: 1000000,
    pic: 'img/ben.png',
    desc: 'Mi primera bici'
  }, {
    id: 1,
    name: 'Carro',
    cost: 5000000,
    pic: 'img/max.png',
    desc: 'Descripción Carro'
  }, {
    id: 2,
    name: 'Casa',
    cost: 45000000,
    pic: 'img/adam.jpg',
    desc: 'Descripción super descriptiva de la Casa'
  }];

  return {
    all: function() {
      return wishes;
    },
    remove: function(wish) {
      wishes.splice(wishes.indexOf(wish), 1);
    },
    get: function(wishId) {
      for (var i = 0; i < wishes.length; i++) {
        if (wishes[i].id === parseInt(wishId)) {
          return wishes[i];
        }
      }
      return null;
    },
    add: function(wish) {
      wishes.push(wish);
    },
    top: function() {
      if(wishes.length > 0)
      {
        var minValue = wishes[0].cost;
        var minWish = wishes[0];
        for (var i = 0; i < wishes.length; i++) {
          if (wishes[i].cost < minValue) {
            minValue = wishes[i].cost;
            minWish = wishes[i];
          }
        }
        return minWish;
      }
      return null;
    }
  };
})

.factory('Budgets', function(){

var budgets  = [{
    id: 0,
    educ: 1000,
    food: 2000,
    transp: 3000,
    rent: 4000,
    util: 5000,
    savi: 6000,
    entrt: 7000,
    debt: 8000,
    salary: 36000,
    strt: 1463212865548,
    end: 1
  }, {
    id: 1,
    educ: 0,
    food: 0,
    transp: 0,
    rent: 0,
    util: 0,
    savi: 0,
    entrt: 0,
    debt: 0,
    salary: 0,
    strt: 1463212865548,
    end: 1
  }, {
    id: 2,
    educ: 8000,
    food: 7000,
    transp: 6000,
    rent: 1000,
    util: 2000,
    savi: 3000,
    entrt: 4000,
    debt: 5000,
    salary: 36000,
    strt: 1463212865548,
    end: 1
}];

return {
    all: function() {
      return budgets;
    },
    remove: function(budget) {
      budgets.splice(budgets.indexOf(budget), 1);
    },
    get: function(budgetId) {
      for (var i = 0; i < budgets.length; i++) {
        if (budgets[i].id === parseInt(budgetId)) {
          return budgets[i];
        }
      }
      return null;
    },
    add: function(budget) {
      budgets.push(budget);
    },
    // Show the most recent
    top: function() {
      if(budgets.length > 0)
      {
        return budgets[budgets.length-1];
      }
      return null;
    }
  };

})

// Filter for searching a card by name in an array, usable with ng-repeat
.filter('getByName', function() {
  return function(input, nombre) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].nombreTipo == nombre) {
        return input[i];
      }
    }
    return null;
  }
})