// ==UserScript==
// @name           vaheiscool  (Please note all credit for this script goes to Shoecream)
// @namespace      shoecream@luelinks.net   
// @description    Turns vaheiscool into a nonentity
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// ==/UserScript==

var userid = 7846;
var username = 'vaheiscool';
var sayings = [
  '       ',
  'hurf durf I judge all versions of games on the pc port',
  'hurr im a turrl',
  'PC MASTER RACE PC MASTER RACE PC MASTER RACE PC MASTER RACE',
  '<img src="http://i2.endoftheinter.net/i/n/9c65498c6d9dc601ee7652dccd392c32/vomit animation-1.gif" />'
];
var signature = '<br/>---<br/>UPGRADING COMPUTERS EVERY FEW YEARS FUCK YEAH<br/>';

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