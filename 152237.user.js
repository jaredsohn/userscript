// ==UserScript==
// @name        MH Harvester Calculator
// @namespace   passiveobservermechhero
// @description Shows debris weight and how many harvesters are needed, autofill on harvesting page
// @include     *.mechhero.com/Navigation*
// @version     4
// ==/UserScript==

// This script comes with ABSOLUTELY NO GUARANTEE OF ANY KIND. Or cookies.

window.addEventListener ("load", LocalMain, false);

var HARVESTER = 20; // harvester load capacity
var WEAPON_WEIGHT = { "Thor Missile": 43,
                      "Tesla Gun": 65,
                      "Cluster Missile": 35,
                      "Plasma Missile": 28,
                      "Long Range Missile": 22,
                      "LR-86sf Fire-Missile Pod": 17,
                      "Power Claws": 26,
                      "LR-86 Missile Pod": 16,
                      "Deflector Cannon": 54,
                      "Kinetic Projector": 120,
                      "Plasma Grenade Launcher": 32,
                      "Ion Pulse Cannon": 80,
                      "Railgun II": 36,
                      "EMP Bombs": 42,
                      "X1 Smart Missile": 8,
                      "Plasma Flame Thrower": 14,
                      "Railgun I": 29,
                      "Phantom Rifle": 13,
                      "Assault Rifle": 12,
                      "Mortar": 50,
                      "Advanced Machine Gun": 11,
                      "Light Laser": 15,
                      "Long Range Rifle": 22,
                      "Precise Laser Rifle": 25,
                      "Light Machine Gun": 10,
                      "Basic Metal Plating": 23,
                      "Ceramic Plating": 18,
                      "Multilayer Plating": 38,
                      "Advanced Defense System": 30,
                      "Selective Force Field": 10,
                      "e.22 Force Field": 52,
                      "Complete Force Field": 31,
                      "Adaptive Force Field": 45,
                      "Heavy Mortar": 420,
                      "Delta-Wave Emitter": 650,
                      "Dominator Missile": 340,
                      "Resonance Generator": 320,
                      "Puma Jetpack": 28,
                      "Athlas Jetpack": 52,
                      "Spider Tank Jetpack": 82
                    };


function LocalMain ()
{
  // To Self: square pages are cached, prerendered

  //TODO further integration
  //-- get square id and available harvesters.

  //TODO even further
  //-- check if another harvesting mission can be called, announce if not

  // tests if the current page has debris
  var debris = document.getElementById("navigationControl").getElementsByTagName("div")[1].getElementsByTagName("p")[3];
  if (debris.firstChild.innerHTML !== "debris field" ) {
    return;
  }

  var panel = document.createElement("span");
  var weight = new harvestCalc(), newLink;
  var oldLink = document.querySelector('[data-key="13"]').attributes["href"].value;

  panel.innerHTML = '<br /><i>' +
  'Res: <b style="color: ' + (weight.res() != 0 ? 'black' : 'gray') + '">' + weight.res() + '</b> + ' +
  'Wep: <b style="color: ' + (weight.wep() != 0 ? 'black' : 'gray') + '">' + weight.wep() + '</b> = ' +
  'Total: <b style="color: black">' + weight.resTotal() + '</b> // ' +
  'Harvesters: <b style="color: red">' + weight.harv() +'</b></i>';

  debris.appendChild(panel);

  newLink = oldLink.substring(0, oldLink.lastIndexOf("=")+1) + weight.harv();
  document.querySelector('[data-key="13"]').attributes["href"].value = newLink;




  function harvestCalc() { // calculates debris weight and harvesters needed to collect

    this.res = function resWeight() { // getting the weight of the resource debris
      var weight = 0;
      if (document.getElementById("navigationControl").getElementsByTagName("div")[2].firstChild.className != "hcost") {
        return weight; // in case the debris consists of equipment only, and no resources
      }
      var resPan = document.getElementById("navigationControl").getElementsByTagName("div")[2].firstChild.getElementsByTagName("span");
      for ( var i = 0; i < 3; i++ ) {
        weight += parseInt ( resPan[i].innerHTML, 10 ) / 100;
      }
      weight = Math.ceil(weight);
      return weight;
    };

    this.resTotal = function resTotal() { // calculates debris total weight
      var total = parseInt(this.res() + this.wep(), 10);
      return total;
    };

    this.harv = function harvesters() { // calculates the number of needed harvesters, so you don't have to ;)
      return Math.ceil(this.resTotal()/HARVESTER);
    };

    this.wep = function wepWeight() { // calculates weapon debris weight, compares with the list above
      var weight = 0, i;
      var weapons = getWeapons();
      for (i in weapons){
        if (WEAPON_WEIGHT[i] > 0 ) {
          weight += WEAPON_WEIGHT[i]*weapons[i];
        }
      }
      return weight;
    };

    function getWeapons() { //extracts weapon names from page, into a nice little array.
      var elems = document.getElementById("navigationControl").getElementsByTagName("div");
      var str, element, wep, count;
      var matchClass = "tiny_eq";
      var weapons = {}; // key = name, value = number
      for (var i = 0; i< elems.length; i++) {
        element = elems[i];
        if ((element.className).indexOf(matchClass) > -1) {
          str = element.innerHTML;
          wep = str.substring(str.indexOf(">") + 1, str.indexOf(" x ")).replace(/^\s+|\s+$/g,'');
          count = parseInt(element.getElementsByTagName("b")[0].innerHTML, 10);
          weapons[wep] = count;
        }
      }
      return weapons;
    }

  }

}

// The cookie part is nonegotiable.