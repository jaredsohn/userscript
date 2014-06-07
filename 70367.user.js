// ==UserScript==
// @name           BadYoshi V 0.000000000001
// @namespace      poocream@luelinks.net   
// @description    BadYoshi etc
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// ==/UserScript==

var userid = 12451;
var username = 'BadYoshi';
var sayings = [
  'lady gaga has the nicest cock i have ever sucked, better than my girlfriends, even',
  'ignore the (gs), im not one of those NUESers',
  'IdrA is such trash lol',
  'did you guys see that teamliquid post? here let me link it for you',
  'i am bad enough of a poster that even teamliquid banned me',
  'you dont have to play the game to know about it! i watch a lot of livestreams and that makes me credible',
  'did you guys watch winners league last night? i watched it with my girlfriend tee hee',
  'i browse TL with my girlfriend and we laugh at all those antisocial LOSERS together',
  'have you heard about Garimto? He was such a BONJWA!',
  'i may not have the sc2 beta, but at least i have a life!',
  'yeah i would play with you guys but i have a gf you know',
  'ok well ill be on tonight as long as im done with my homework/not spending time with my girlfriend',
  'hit me up guys im usually free if im not hangin with my gf',
  'well ive been pretty busy lately (school/work/girlfriend) but post if you want to play and ill let you know',
  'im totally trolling pie by being stupid on purpose',
  'ill upload a porn of your choice',
  ];
var signature = '<br>---<br><b>I have a girlfriend!</b>';

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