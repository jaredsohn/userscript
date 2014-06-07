// ==UserScript==
// @name           SlamShut  (Please note all credit for this script goes to Shoecream)
// @namespace      shoecream@luelinks.net   
// @description    Turns SlamShut into a good poster
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// ==/UserScript==

var userid = 5216;
var username = 'SlamShut';
var sayings = [
  '<img src="http://i1.endoftheinter.net/i/n/091598a8a776cfa6265bdba742a1605b/gene.jpg" />',
  '<img src="http://i2.endoftheinter.net/i/n/54e24cfc60789ac164c041cb53d3fd86/ww_045.jpg" />',
  '<img src="http://i1.endoftheinter.net/i/n/8bb48cbf390a8cee7759998420a5b2bd/ww_037.jpg" />',
  '<img src="http://i2.endoftheinter.net/i/n/dcbc46d03b927563f0bc923838407161/hamburglar.gif" />',
  '<img src="http://i1.endoftheinter.net/i/n/02de432bc15ae549e48b9bb8079273fa/hurp.jpg" />',
  '<img src="http://i3.endoftheinter.net/i/n/234d7f6fd1d0aa6c7998766bf61bf094/wonka9.jpg" />',
  '<img src="http://i2.endoftheinter.net/i/n/14cae63da9de257ce59ac2787b8a60b1/wonkatreat.jpg" />',
  '<img src="http://i3.endoftheinter.net/i/n/63f9b03c56c4244d8af3ee9e5b23ac09/wonk3.jpg" />',
  '<img src="http://i1.endoftheinter.net/i/n/0e241fb740b8dbea2b2ef94daffa064c/wonk8.jpg" />',
];
var signature = '<br/>---<br/>Im gay and rape my kids<br/>';

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