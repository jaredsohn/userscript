// ==UserScript==
// @name          iTS Banner Changer
// @author        rp
// @description   Changes banner on iTS
// @include       http*://feedthe.net/*
// @date          2011-10-28
// @version       0.1
// ==/UserScript==

function addGlobalStyle(css) {
   var head, style;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = css;
   head.appendChild(style);
}



addGlobalStyle('td.header_logo {background-image: url("http://i.imgur.com/yk401Jf.jpg"); !important;}');


// Tuna Halloween Blue Animated - http://www.pictureshack.us/images/87367_Blue.gif
// Tuna Halloween Red - http://i.imgur.com/ejgFK.png
// Tuna Halloween Gray - http://i.imgur.com/KxIRT.png
// FTN Modern - https://feedthe.net/pic/fTn_pHn/5/banner.png
// Mashimaro Halloween http://i.imgur.com/Zrzao.gif
// Tuna Modern Halloween http://www.pictureshack.us/images/97636_1.gif
// Tuna Halloween Orange http://www.pictureshack.us/images/12690_3.gif
// Zephyr xmas https://feedthe.net/pic/fTn_pHn/ftnlogo_xmas.jpg
// optimusprime's winter banner http://i.imgur.com/rILBrZh.jpg
// sheiks winter banner http://i.imgur.com/AQGNezO.png
// optimus' spring banner 2 http://i.imgur.com/k1snUSL.jpg
// Diablo's banner http://i.imgur.com/yk401Jf.jpg