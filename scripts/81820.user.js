// ==UserScript==
// @name           Teppic
// @namespace      shoecream@luelinks.net (modified by hollow life)
// @description    Turns Teppic into an outstanding member of the community
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// ==/UserScript==

var userid = 15795;
var username = 'Teppic';
var sayings = [
  'I love you guys',
  'I love the mod staff!',
  'hollow life is a good admin.',
  'SirPenguin is an outstanding individual',
  'Alveron is an amazing member of staff and I would very much enjoy some alone time with him.  Just one on one, mano-a-mano - together forever.',
  'Kiffe is kind of hot imo',
  'TidusWulf?  Yeah, I\'d drink a beer with him.',
  'Moltar is probably the best member of staff and is definitely a future admin',
  'BigCow is moo moo mooooo moo moooooooooo mooo moooo',
  'You know who I love?  darkinsanity.',
  'Wangalicious?  I used to play WoW with that dude',
  'bluntporcupinetoo is my homeboy.',
  'I\'d bend over and drop trou for Waldo tbqh',
  'Smoke up with COTM?  I would love too but my medication doesn\'t allow it.',
  'I Dudeboy I is just another fine example of the mod selection process.',
  'I would happily bend over and drop trou for I Dudeboy I',
  'Who\'s this \'Tiko\' fellow I\'ve been hearing about?',
  'Hang on, I need to find my camera so I can take a picture of my feet for shaunMD!',
  'System Error is so cool he chills out on the surface of the sun',
  'Bukkake Tsunami is everything I want in a woman',
  'Hey you!  Yeah you.  You\'re super cool.  Just so you know!',
  'This is how I feel about everybody: http://www.wimp.com/supercool/',
  'I get angry sometimes but what I say in anger will never detract from how awesome you all are',
  'Personally I believe the mod staff are doing a more than adequate job, in fact I\'d go as far as to say that they\'re doing an exemplary job!',
  ];
var signature = '<br/>---<br/>I love you guys so much it makes my sexy bits <b>literally</b> <i>tingle</i> <br/>';

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