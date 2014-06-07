// ==UserScript==
// @name TheAër's Tribal Wars Pack Debug Ver.
// @version 0.1.13
// ==/UserScript==

function getAttr(path, attr) {
  var li = path.split("?")[1].split("&");
  var array = new Array();
  for(i=0; i < li.length; i++) {
    key = li[i].split("=")[0];
    value = li[i].split("=")[1];
    array[key] = value;
  }
  return array[attr];
}

function convertToAttack(path) {
  var li = path.split("?")[1].split("&");
  var array = new Array();
  for(i=0; i < li.length; i++) {
    key = li[i].split("=")[0];
    value = li[i].split("=")[1];
    array[key] = value;
  }
  return '?village=' + array['village'] + '&screen=place&target=' + array['id'];
}

//http://pl63.plemiona.pl/game.php?village=11111&screen=report&mode=all&view=22222

scripts = {
           'report': function()
                     {
var def = document.getElementById("attack_info_def");
var link = def.children[0].children[1].children[1].children[0];
def.children[0].children[1].children[1].innerHTML += ' | ' + link.outerHTML;
def.children[0].children[1].children[1].children[1].setAttribute('id', 'attackLink');
var attackLink = document.getElementById('attackLink');
attackLink.innerHTML = 'Zaatakuj';
attackLink.search = convertToAttack(link.search);
                     },
           'overview': function()
                       {
    var village = getAttr(window.location.search, 'village');
    jquery.getScript('http://' + window.location.host + '/game.php?village=' + village + '&screen=main');
    var csrf = 'cfc6';
    var main = document.getElementById('order_level_main').parentNode;
    main.innerHTML = '<a href="http://pl63.plemiona.pl/game.php?village=' + village + '&screen=main&action=build&id=main&csrf=' + csrf + '">+</a>' + main.innerHTML;
                       }
};

var address = window.location.search;
var screen = getAttr(address, 'screen');
scripts[screen]();

