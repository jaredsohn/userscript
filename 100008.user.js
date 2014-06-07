// ==UserScript==
// @name           Rad Mage Ragnarok V. 0.1 
// @namespace      shoecream@luelinks.net   
// @description    This script will make a certain user much radder. Modifies topics such that his posts are visible. (credit to shoecream for most of the code)
// @include http://endoftheinter.net/*
// @include http://boards.endoftheinter.net/*
// @include https://endoftheinter.net/*
// @include https://boards.endoftheinter.net/*
// @include http://archives.endoftheinter.net/*
// ==/UserScript==

var userid = 14470;
var username = 'Rad Mage Ragnarok';
var sayings = [
  '<b>Awesome!</b>',
  '<b>Radical!</b>',
  '<b>Bodacious!</b>',
  '<b>Wicked!</b>',
  '<b>Mondo!</b>',
  '<b>Gnarly!</b>',
  '<b>Reaganomics!</b>',
  '<b>David Duchovny!</b>',
  '<b>Bad!</b>',
  '<b>Bitchin\'!</b>',
  '<b>Totally!</b>',
  '<b>Tubular!</b>',
  '<b>Excellent!</b>',
  '<b>Rhombus!</b>',
  '<b>Mathematical!</b>',
  '<b>Far out!</b>',
  '<b>Raspberry vinagrette!</b>',
  '<b>Aquabatical!</b>',
  '<b>Righteous!</b>',
  '<b>Stegasaurus!</b>',
  '<b>Gnarlacious!</b>',
  '<b>Perpendicular!</b>',
  '<b>Liopleurodon!</b>',
  '<b>Flame broiled!</b>',
  '<b>Symbiotic!</b>',
  '<b>Transcontinental!</b>',
  '<b>Photoluminescent!</b>',
  '<b>Supercalifragilisticexpialidocious!</b>',
  '<b>Fresh!</b>',
  '<b>Maximum!</b>',
  '<b>Superfudge!</b>',
  '<b>Subterfuge!</b>',
  '<b>Awesomematical!</b>',
  '<b>BMX Bandits!</b>',
  '<b>Rocketeering!</b>',
  '<b>Verisimilitudical!</b>',
  '<b>Marvelous!</b>',
  '<b>Holistic!</b>',
  '<b>Bistromathics!</b>',
  '<b>Markhov Chain!</b>',
  '<b>Platonic!</b>',
  '<b>Unimaginable!</b>',
  '<b>Non-Euclidian!</b>',
  '<b>Postmodern!</b>',
  '<b>Hamiltonian!</b>',
  '<b>Supernatural!</b>',
  '<b>Biodegradable!</b>',
  '<b>Memetic!</b>',
  '<b>Informational!</b>',
  '<b>Bossa Nova!</b>',
  '<b>Vectormetric!</b>',
  '<b>Centrifugal!</b>',
  '<b>Computational Infrastructure!</b>',
  '<b>Information Superhighway!</b>',
  '<b>Unconventional!</b>',
  '<b>Oedipal complex!</b>',
  '<b>Freudian!</b>',
  '<b>Circumstantial!</b>',
  '<b>Cyclopean!</b>',
  '<b>Anthropomorphic!</b>',
];
var signature = '<br>---<br>The one, the only, the original <b>Rad Mage Ragnarok!</b>';

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