// ==UserScript==
// @name           Left 4 Dead 2 Fags Update (non epic edition)
// @namespace      shoecream@luelinks.net
// @description    Lets Leon Powalski know who his steam friends are on the boards
// @include        http://boards.endoftheinter.net*
// @include        https://boards.endoftheinter.net*
// @include        http://archives.endoftheinter.net*
// @include        https://archives.endoftheinter.net*
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// ==/UserScript==

var allboards = true;

var dictionary = {
  "xXBohunkEradicatorXx": "xXxBohunkSSJ4SephirothGokuhanVegitaEradicatorxXx",
  "PrinceRurik": "PrinceRurik (SuperJoe)",
  "NeoJanus": " NeoJanus (Iyse)",
  "Dragosal": "Drago",
  "chilicheese": "chili",
  "mega man is kool": "mmik",
  "solidsnakez": "solidsnakez (Candle Jack)",
  "TeDDD": "TeDDD (Zombie Steve Buscemi)",
  "postlcubed": "postlcubed (EHK)",
  "da drummer": "da drummer (Skyfallkavu)",
  "Aldehyde": "Aldehyde (Jinxy)",
  "KniGHt Of SoLaMniA": "Knight of Salami",
  "PhoenixFlame": "PhoenixFlame (Bacon Copter)",
  "Forget Me Not": "Forget Me Not (Red)",
  "Mantyke": "Mantyke (Sai)",
  "link9606": "link9606 (Zim)",
  "Duo Maxwell 64": "Duo Maxwell 64 (Chicken Boo)",
  "MinistryMemoryBank": "MinistryMemoryBank (Rutcrash)",
  "Person With GBA": "Person With GBA (Gabe)",
  "coolboy": "coolboy (Kudo)",
  "Sasuke Murisma": "Sasuke Murisma (HDisco)",
  "Zac": "Zac (Me#s)",
  "NotCurrentlyAvailabl": "NotCurrentlyAvailabl (Macfag)",
  "chibi super shadow": "chibi super shadow (Mr Bubbles)",
  "Poppy Bros Sr": "Poppy Bros Sr (Reg)",
  "shedlikeittosnow": "shedlikeittosnow (Gangsta Gibbs)",
  "Ultima Weapon": "Ultima Weapon (Rage)",
  "xturksx": "xturksx (Claude)",
  "Ogre Princess": "Ogre Princess (AIDs)",
  "Bebop268170": "Bebop268170 (TeoE)",
  "shadowzero313": "shadowzero313 (Shadowzero)",
  "i like cheeze": "i like cheeze (ChiLLe)",
  "Zac": "Zac (Me#s)",
  "The SwordsMaster": "The SwordsMaster (Funkytoad)",
  "Fox1EE7": "Fox1EE7 (Kathy Kidnap)",
  "DementedOompaLoompa": "DementedOompaLoompa (Prince Fielder)",
  "bloodshadow323": "bloodshadow323 (Monkeyscythe)",
  "akito10": "akito10 (hEATHEN)",
  "Madmaniac26": "Madmaniac26 (DStab)",
  "ThePinkAvenger": "ThePinkAvenger (Wurdle)",
  "xchaos12": "xchaos12 (Jimi Thing)",
  "thesweetkissinthief": "thesweetkissinthief (Lumice)",
  "El Bomb Davico": "El Bomb Davico (Urban Ranger)",

};


function update() {
  var a = document.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++) {
    if (/profile\.php/.test(a[i].href)) {
      if (dictionary[a[i].textContent]) {
        a[i].textContent = dictionary[a[i].textContent];
      }
    }
  }
}

if (allboards || /board=-8[456]/.test(document.location.search)) {
  update();
  document.addEventListener("DOMNodeInserted", update, false);
}

var userid = 6325;
var username = 'Prince Fielder (Autism Police)';
var sayings = [
  'YOU ALL HAVE AUTISM'
];
var signature = '<br/>---<br/>See this sig? That\'s autism. <br/>';

function search_links_for(regex, dom/*, element*/) {
  var element = arguments[2];
  var a = dom.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++) {
    var m = a[i].href.match(regex);
    if (m && m[1]) {
      if (element) return a[i];
      return m[1];
    }
  }
  return false;  
}

function process_messages (list) {
  if (list.target) list = [list.target];
  for (var i = 0; i < list.length; i++) {
    if (search_links_for(/profile.*user=(\d+)/, list[i]) != userid) continue;
    var id = search_links_for(/message\.php\?.*id=(\d+)/, list[i]);
    list[i].getElementsByClassName('message')[0].innerHTML = sayings[id % sayings.length] + signature;
    search_links_for(/profile\.ph(p)/, list[i], true).textContent = username;
  }
}

process_messages(document.getElementsByClassName('message-container'));

document.addEventListener('DOMNodeInserted', process_messages, false);

