// ==UserScript==
// @name           Realistic Dogboy V. 1.0 
// @namespace      shoecream@luelinks.net   
// @description    This script will make dogboy's posts not only more tolerable, but higher quality as well. (credit to shoecream for most of the code)
// @include http://endoftheinter.net/*
// @include http://boards.endoftheinter.net/*
// @include https://endoftheinter.net/*
// @include https://boards.endoftheinter.net/*
// @include http://archives.endoftheinter.net/*
// ==/UserScript==

var userid = 7449;
var username = 'dogboty'
var sayings = [
  '<img src="http://i3.endoftheinter.net/i/n/e5098957b751a2311d14ce67ba3e922e/dog1.jpg" />
<b>AROOOO ARO AROOOOO!</b>',
  '<img src="http://i2.endoftheinter.net/i/n/5f5ccfb6db98eb6b939751edeb648f4e/dog2.jpg" />
<b>ARAAAAAAAAA AGGGGRAAARRR!</b>',
  '<img src="http://i1.endoftheinter.net/i/n/010a9d3731e86a3a49c92592b9b0d0a8/dog3.jpg" />
<b>AROO AROOP ROOOP ABROOOOO!</b>',
  '<img src="http://i3.endoftheinter.net/i/n/6f4898b43ef756b6f04b1a80697dd64e/dog4.jpg" />
<b>WOOF WOOF WOOF WOOF WOOF!</b>',
  '<img src="http://i3.endoftheinter.net/i/n/e8633c20ae92128560110d0785d4bd52/dog6.jpg" />
<b>GGGGGRRRRRRR ARF ARF GRRR!</b>',
  '<img src="http://i3.endoftheinter.net/i/n/a11401cc86744107b42c812417687609/dog7.jpg" />
<b>AROOOOOOOOOO ARUUUUUUUUUU!</b>',
  '<img src="http://i2.endoftheinter.net/i/n/525d3b86a6d881b8a62b354a0cb83b9e/dog8.jpg" />
<b>HIME HIME HIME HIME!</b>',
  '<img src="http://i3.endoftheinter.net/i/n/21229b6444418b5f3a4368ece8c280f1/dog9.jpg" />
<b>YIP YIP YIP YIP YAP YAP YARF!</b>',
  '<img src="http://i3.endoftheinter.net/i/n/215b13111902123c8fdc6669af8d89dc/dog10.jpg" />
<b>BLOR BLOR BLAROOOOOOF!</b>',
  '<img src="http://i3.endoftheinter.net/i/n/20d7a808b3947f41936960d6b84df63f/dog11.jpg" />
<b>HEHHHH HEH HEHH EHHHEH HHEHHH HEH!</b>',
  '<img src="http://i3.endoftheinter.net/i/n/22e7ce8448fc3ad46881d5e6e488c70a/dog12.jpg" />
<b>ARRRRRRRRRRRRRRRR HIME HYIP HIPE!</b>',
  '<img src="http://i4.endoftheinter.net/i/n/fe9ebb63cee70dbd174f1d443f11b50d/dog13.jpg" />
<b>ARRRRRRRRRRRRRRRR UURRRRR ARRRRF!</b>',
  '<img src="http://i2.endoftheinter.net/i/n/9e8c86c3203fa158f8825366e1b581a5/dog14.jpg" />
<b>BARK BARK BARK BARK!</b>',
  '<img src="http://i4.endoftheinter.net/i/n/b05236458806b5c1ea740d92bcbc9561/dog15.jpg" />
<b>AUROOOOOOP. AUWOOOOO AH AH AWOOOOOOO!</b>',
  '<img src="http://i2.endoftheinter.net/i/n/5216ea4a07aaeca8248b8b16e45dd91c/dog16.jpg" />
<b>ACK ACK PLEHW!<b>',
  '<img src="http://i3.endoftheinter.net/i/n/6dcdd4bbef0a53ca361974f6ca986903/dog17.jpg" />
<b>WAN WAN WAN WAN WAN</b>',
  '<img src="http://i2.endoftheinter.net/i/n/5f535974b781e5989b321c72364d9400/dog18.jpg" />
<b>GRRRRRRRRRRRRRRUFFF</b>',
];
var signature = '<br>---<br>YAP YAP <b>dog</b>';

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