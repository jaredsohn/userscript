// ==UserScript==
// @name           lunarhawk99  (Please note all credit for this script goes to Shoecream)
// @namespace      shoecream@luelinks.net   
// @description    Turns Prism into a good poster
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// ==/UserScript==

var userid = 3336;
var username = 'failhawk99';
var sayings = [
  'SKARSENAL SKARSENAL SKARSENAL SKARSENAL SKARSENAL',
  'I ain\'t saving shit',
  '<b>I HATE POKEMON</b>',
  'i sucked so much they didn\'t let any more LUEsers in after me',
  'brb failing',
  'something totally irrelevant to the topic at hand goes here',
  'caw caw get it i\'m a hawk',
  'hurrrr durrrrrrrrrr SKARSENAL',
  '<img src="http://i1.endoftheinter.net/i/n/40d15b0b78cec5011a1e90383277895d/damnit.png" />',
  'fuck, did I fail again?',
  'I signed up for GameFAQs at a certain time and for that I deserve attention',
  'so how about a Skarmory evolution',
  '<img src="http://i3.endoftheinter.net/i/n/a884fd06d4e24002233b9a2d1e0017fa/X329.jpg" />',
  '<img src="http://i3.endoftheinter.net/i/n/a884fd06d4e24002233b9a2d1e0017fa/X329.jpg" />',
  '99 flavors of failure',
  'do you care about my opinion yet, guys?',
  'lunarhawk99 used SAVE LUE! ...But nothing happened!'
];
var signature = '<br/>---<br/>the 99 stands for how many dicks I suck daily <br/>';

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