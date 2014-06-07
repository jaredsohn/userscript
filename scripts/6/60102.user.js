// ==UserScript==
// @name           Leon Gaywalski
// @namespace      shoecream@luelinks.net
// @description    Turns leon powalski into a homosexual
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// ==/UserScript==

var userid = 15463;
var username = 'Tranny Lover';
var sayings = [
  'i\'m a homo',
  'i\'m gay',
  'call me a dick sucking robot',
  'more cocks please'
];
var signature = '<br/>---<br/>DISREGARD MY POSTS <br/>I AM A SHITTY TROLL';

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