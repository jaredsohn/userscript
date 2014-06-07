// ==UserScript==
// @name           save_all_patches
// @namespace      mobilefree
// @include        http://mobilefree.ru/newbb_plus/viewtopic*
// @version        1.1.2
// @author         Fenex
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function getPatches() {
	document.getElementById('btn_open_patch_cancel').removeAttribute('disabled');
	document.getElementById('btn_open_patch').setAttribute('disabled', '');
    window.i = 0;
    window.timer1 = window.setInterval("openPatch()", 2500);
}

function openPatch() {
    if(elems[window.i].getElementsByTagName('input')[0].value=="Show") {
        elems[window.i].getElementsByTagName('input')[0].click();
    }
    window.i++;
    if (window.i == window.len) {
        clearInterval(window.timer1);
		//getTxtPatch()
    }
}
function getTxtPatch() {
	var txt = '<h1>'+document.getElementsByTagName('title')[0].innerHTML.substring(0, document.getElementsByTagName('title')[0].innerHTML.indexOf(":"))+'</h1>';
	var divs = document.getElementsByClassName('contt');
	for (j=0;j<divs.length;j++) {
		var fonts = divs[j].getElementsByTagName('font');
		for (k=0;k<fonts.length;k++) {
			txt += fonts[k].innerHTML.replace(/[(]+[сСcC]+[)]/g, '©');
		}
        txt += "<br><br>";
	}
	win1 = window.open("", "output", "width=400, height=600, menubar=yes, status=no, scrollbars=yes");
	win1.document.write(txt);
}
function abort() {
	clearInterval(window.timer1);
	document.getElementById('btn_open_patch').removeAttribute('disabled');
	document.getElementById('btn_open_patch_cancel').setAttribute('disabled', '');
}
var s1 = document.createElement('script');
s1.innerHTML="window.elems = document.getElementsByClassName('splr');window.len = elems.length;"+getTxtPatch+openPatch+getPatches+abort;
document.body.appendChild(s1);
var a = document.createElement('div');
a.innerHTML="<input type='button' id='btn_open_patch' value='open all pathes' onclick='getPatches()'> <input type='button' id='btn_open_patch_cancel' value='Cancel' onclick='abort()' disabled=''> <input type='button' id='btn_open_patch_show' value='Show all patches' onclick='getTxtPatch()'>";
document.body.appendChild(a);