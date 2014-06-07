// ==UserScript==
// @name           izleseneAdBlock
// @description    izlesene.com reklamlarını kaldırın
// @copyright      2009, Hasan Tayyar BEŞİK (http://hasantayyar.tekabul.com)
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://www.izlesene.com/*
// ==/UserScript==

var jq = document.createElement('script');
jq.src = 'http://jquery.com/src/jquery-latest.js';
jq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jq);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; fonksiyon(); }	
}
GM_wait();

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function fonksiyon(){
 addGlobalStyle('ads block{ position: relative ! important; display:none ! important;  } ');
 $("#virgul_901" ).hide(); 
}