// ==UserScript==
// @name          RPH Cleanup
// @description   Removes the lower bar, as well as cleaning up the header to be the original 80px size. Also removes coloring, and makes it a neutral grey. Simply change the hex codes to whatever you want to change the color.
// @include       *http://www.rphaven.com/profile.php?*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$("#profileHeader").remove();
$("p.left,p.right,div.bottom").remove(); 

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('a,ul,li { font-size: 9px ! important; height: 9px ! important; top: 1px ! important; padding: 2px ! important; background:url("none") ! important;}');
addGlobalStyle('div#newmsgs { font-size: 9px ! important; height: 13px ! important; top: 1px ! important; padding: 0px ! important; width: 450px ! important; background:url("none"), #696969 ! important; -moz-border-radius: 0px 15px 15px 15px; border-radius: 0px; 15px 15px 15px; left: 33%;}');
addGlobalStyle('span { font-size: 9px ! important; color: #696969 ! important; height: 9px ! important; top: 1px ! important; padding: 2px ! important; background:url("none");}');
addGlobalStyle('span.error { font-size: 0px ! important; color: #999999 ! important; height: 9px ! important; top: 1px ! important; padding: 2px ! important; background:url("none");}');
addGlobalStyle('div#headContainer { font-size: 9px ! important; height: 80px ! important; padding: 0px ! important; width: 100% ! important; background:url("none") ! important;}');
addGlobalStyle('div.center{height: 20px ! important; width: 450px ! important; background:url("none"), #696969 ! important; -moz-border-radius: 10px 10px 0px 0px; border-radius: 10px; 10px 0px 0px; left: 33%;}');
