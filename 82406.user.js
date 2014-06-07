// ==UserScript==
// @name           K's Sex141 script
// @namespace      kyle
// @description    K's Sex141 script
// @include        http://www.sex141.com/*/viewid.php?*
// ==/UserScript==

var s = document.body.innerHTML.toString();
var replace_fitWindows = s.toString().replace(/onclick=\"javascript\:fitPic\(\'/g,"href=\"");
var replace_fitWindows_2 = replace_fitWindows.toString().replace(/\'\);return false;\"/g,"\" rel='colorbox141'");
document.body.innerHTML = replace_fitWindows_2.toString();

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.4.3.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Add ColorBox js
var GM_ColorBox = document.createElement('script');
GM_ColorBox.src = 'http://colorpowered.com/colorbox/core/colorbox/jquery.colorbox-min.js';
GM_ColorBox.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_ColorBox);

// Add ColorBox Css
var GM_ColorBoxCSS = document.createElement('link');
GM_ColorBoxCSS.href = 'http://colorpowered.com/colorbox/core/example1/colorbox.css';
GM_ColorBoxCSS.type = 'text/css';
GM_ColorBoxCSS.rel = 'stylesheet';
document.getElementsByTagName('head')[0].appendChild(GM_ColorBoxCSS);



// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery(){
	//alert($); // check if the dollar (jquery) function works
	$("a[onMouseOver=\"this.style.cursor='pointer';\"]").colorbox();	
}
