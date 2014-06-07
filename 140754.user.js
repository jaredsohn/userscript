// ==UserScript==
// @name       0v1 personal script 1
// @namespace  http://0v1.ro/
// @version    0.1
// @description  0v1 personal script 1
// @match http://*.triburile.*
// @include http://*.triburile.*
// @copyright  2012+, You
// ==/UserScript==


var lang = "en"; // Language option
var runOnce = false;


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {}

// the guts of this userscript
function main2() {
    var villages = [
    {id:'91175', name:'Baekje',   shortName: 'Bj'},
    {id:'93585', name:'Gaya',     shortName: 'Ga'},
    {id:'90870', name:'Goguryeo', shortName: 'Go'},
    {id:'91056', name:'Hanseong', shortName: 'H'},
    {id:'90267', name:'Silla',    shortName: 'S'}
   ];
    
    var header = $('#menu_row2_map').parent();
    var reportAfter = $('#attack_info_def');
    var sameBuilding = [];
    var crtUrl = window.location + '';
    for (var i in villages){
        var sbUrl = crtUrl.replace(/village=(\d*)/, 'village='+villages[i].id);// alert(sbUrl);
        sameBuilding.push('<a href="'+sbUrl+'">'+(villages[i].shortName)+'</a>');
    }
    header.append('<td> &nbsp;'+sameBuilding.join(' - ')+'&nbsp;&nbsp;');
    // get attacked_village
    var atkFarm = $('#attack_info_def a:first');
    if (atkFarm.length > 0){
        var atkFarmId = atkFarm.attr('href').match(/id=(\d*)/);
        if (typeof atkFarmId != 'undefined'){
            atkFarmId = atkFarmId[1];
            // villages links attack
            var atkLnks = []
            for (var i in villages){
                atkLnks.push('<a href="/game.php?village='+ (villages[i].id) +'&screen=place&target='+atkFarmId+'" target="_blank">'+(villages[i].shortName)+'</a>');
            };
            reportAfter.prepend('<tr><td>Ataca din</td><td> '+atkLnks.join(' - ')+' </td></tr>');
        }
    }
    
    
}

// load jQuery and execute the main function
addJQuery(main2);