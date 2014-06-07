// ==UserScript==
// @name           Page Jumper
// @namespace      Page Jumper
// @description    Yayz
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// ==/UserScript==

var container = document.getElementsByClassName('pagination_container');
var jumpBox = document.createElement('div')
jumpBox.style.textAlign = 'center';
jumpBox.style.margin = '0 auto 0';
jumpBox.innerHTML = '<form id="page_jump" name="page_jump"><label style="font-size: 14px; font-weight: bold;" for="pageBox">Page Jump:</label> <input type="text" id="pageBox" value="" maxlength="4" style="width: 34px; border: 1px solid #5C5D5F;"><a id="hip_hoppity" href="javascript: void(0);">Go</a></form>';
container[0].appendChild(jumpBox);

function jump() { 
var current = document.URL;
var num = document.getElementById('pageBox').value; 
if(document.URL.search("&postRepeater") > -1){

// end fail by wubby
var lol = document.URL.slice(0,72)
window.location.assign(lol+num);
}
else 
{
window.location.assign(current+"\&postRepeater1-p="+num); 
}
}

var gogo = document.getElementById('hip_hoppity');
gogo.addEventListener('click', jump, true);

GM_addStyle("#page_jump a { color: #A3A3A4; background: #1B1D1F; border: 1px solid #5C5D5F; width: 30px; height: 24px; margin-left: 7px; line-height: 20px; display: inline-block; text-decoration: none;} #page_jump a:hover { color: #DCE8EE; background: #17668A; border: 1px solid #56AACD; }");

//end apoocalypex win