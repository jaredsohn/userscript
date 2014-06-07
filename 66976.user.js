// ==UserScript==
// @name           Sir Isaac Kell V. 0.6  (Credit for fixing this script goes to Shoecream)
// @namespace      shoecream@luelinks.net   
// @description    This script will help flesh out the brave knight Kelladros. Modifies topics such that his posts are visible.
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// ==/UserScript==

var userid = 130;
var username = 'Sir Kell of Dros';
var sayings = [
  '<b>You can not get ye flask.</b>',
  '<b>Thou hast wounded my honour!</b>',
  '<b>Knave, I smite thee!</b>',
  '<b>My sword aches for the blood of thy enemies!</b>',
  '<b>I must defend the Queen!</b>',
  '<b>FOR KING AND COUNTRY!</b>',
  '<b>You mean you wish to surrender to me? Very well, I accept.</b>',
  '<b>Thy flesh shall be rended beneath my blade!</b>',
  '<b>I am Sir Kell of Dros, called Isaac by those who sired me. I hail from the fabled land of 18773 Falda St. Eureka, CA 92344.</b>',
  '<b>I trust no man! I wander from town to town saving damsels!</b>',
  '<img src="http://i2.endoftheinter.net/i/n/5e456ad0e1456408c37ebb3b0cc1d0d4/mechbeth.png" />',
  '<b>Verily, \'tis but a flesh wound!</b>',
  '<b>I shall slay thee with thy own sword, ignoble cur!</b>',
  '<b>HALT! \'Tis the time of the hammer!</b>',
  '<b>Have at thee, villain!</b>',
  '<b>Forsooth, that doth vex me greatly!</b>',
  '<b>None shall pass!</b>',
  '<b>Hark! \'Tis a tale which entaileth how mine life hath been flipped, and the up-side turned downe..</b>',
  '<b>Expose thine teats or remove thyself!</b>',
  '<b>Nay, thou!</b>',
  '<b>Are all men from the future loud-mouthed braggarts?</b>',
  '<b>Art thou an enchanter?</b>',
  '<b>Speak not of such deviltry!</b>',
  '<b>Close thy mouth, witless lover of men.</b>',
  '<b>Hail, travellers! Greetings and welcome to the fabled Links of LUE!</b>',
  '<b>Verily.</b>',
  '<b>I strike at thee!</b>',
  '<b>Pardon? The oats and hay my mighty steed enjoy hath become cheaper by four stone within the past seven moons.</b>',
  '<b>What ho! A clicke of the Post Message link upon yonder topic doth reveal a text in crimson! Forsooth, what sayeth it? Verily, I shall investigate forthwith!</b>'
];
var signature = '<br>---<br>Thine wench!';

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