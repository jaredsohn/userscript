// ==UserScript==
// @name          jakob nielsen
// @namespace     http://bon.gs/projects/greasemonkey/
// @description   adds large pictures of jakob nielsen
// @include       *
// ==/UserScript==

var pics = [
 'http://www.useit.com/jakob/photos/jakob_bluetie4_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_bluetie3_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_leanback_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_blue_look_left_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_buttons_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_blue_look_up_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_stripes_tall_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_speaking1_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_pensive_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_profile_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_argue2_big.jpg',
 'http://www.useit.com/jakob/photos/jakob_panel_1_big.jpg'
]

if (document.body && document.body.style) {
 document.body.style.backgroundImage = 'url('+pics[Math.floor(Math.random()*pics.length)]+')'
 document.body.style.backgroundRepeat = 'repeat'
}
