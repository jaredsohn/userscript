// ==UserScript==
// @author	  idea: zqqou  made: Dris
// @name          Travian Signature creater
// @namespace     http://userscripts.org/
// @description   This script creates automatically signature to your messages.
// @include       http://*.travian.*/nachrichten.php*
// @version		  1.2
// ==/UserScript==

// HOWTO: 
// 1, Download this script, and go to travian messages.
// 2, Right click in the greasemonkey button(right-down in the windows)and Manage UserScripts
// 3, Select the 'Travian message signature creater' and click 'Edit'
// 4, Well, now select the notepad or other text editor. 
// 5, Change the 'Your name' to your name.
// 6, Enjoy:)


// EDIT THIS////////////////
var sig = "فلان الفلاني"
var sig2 = "و السلآم عليكم و رحمه الله و بركـآتـه ..
اخووك,"
var sig3 = "السلآم عليكم و رحمه الله و بركـآتـه ..

أخبـآرك علومك ..؟ بشرني عنك ان شاء الله بخير ..,"
/////////////////////////////

// DONT CHANGE THIS
var igm = document.getElementById('igm');
if (igm) {
	igm.innerHTML = sig3 + "\n\n\n\n"+sig2 + "\n"+sig + igm.innerHTML;
}