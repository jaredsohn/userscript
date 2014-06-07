// ==UserScript==
// @name           Left 4 Dead 2 Fags Update - Credit to Shoecream
// @namespace      leonbookclub@gmail.com
// @description    Lets Leon Powalski know who his steam friends are on the boards and cleans up the LL4D2 Topics
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
  "Thats So Gaben": "Oaf With GBA (Gabe)",
  "coolboy": "coolboy (Kudo)",
  "Sasuke Murisma": "Sasuke Murisma (HDisco)",
  "Zac": "Zac (Me#s)",
  "NotCurrentlyAvailabl": "NotCurrentlyAvailabl (Macfag)",
  "chibi super shadow": "chibi super shadow (Mr Bubbles)",
  "Poppy Bros Sr": "Poppy Bros Sr (Reg)",
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
  "Orion ZyGarian": "Orion ZyGarian (Orion The Tornado)",
  "Snake12": "Snake12 (Fred)",

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

var userid = 22373;
var username = 'Shit Master';
var sayings = [
  '<img src="http://i4.endoftheinter.net/i/n/b03a779471676166f386800be3a79cfe/carpe carp.gif" />',
  '<img src="http://i4.endoftheinter.net/i/n/f3cc92fd5d6bfd10b1de86684626d48d/240px-Regenwurm1.jpg" />',
  '<img src="http://i2.endoftheinter.net/i/n/59657427a23a42e01a3fdaa6578f8542/wvbld.gif" />',
  '<img src="http://i3.endoftheinter.net/i/n/eea8ec292d69972cbbe7053a2b8720ac/rikertrombone.gif" />',
  '<img src="http://i1.endoftheinter.net/i/n/8322b330f7d415021b8b9d1c887091b8/spideydanceslikeawhiteguy.gif" />',
  '<img src="http://i3.endoftheinter.net/i/n/e6d524eadac4a236d6806226ec5e85e3/GXmaster.jpg" />'
];
var signature = '<br/>---<br/>How is this a sig? Show me how this is a sig. <br/>';

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