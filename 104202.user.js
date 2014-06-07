// ==UserScript==
// @name           YJ Search shortcut
// @namespace      http://saijo.dyndns.org/
// @description    Yahoo! JAPAN Search shortcut key
// @include        http://search.yahoo.co.jp/*
// ==/UserScript==

var current_pos=0;
var max_pos;
var field;
var links=[];
var result_all=[];
var result_algo=[];

var html = "<div class='acc' style='float:left;'><font style='font-size:12pt; font-weight:bolder'>&gt;</font></div>";
var color_on = "#0000ff";
var color_off = "#ffffff";

var shortcutKey_down = 'j';
var shortcutKey_up = 'k';
var shortcutKey_open = 'v';
var shortcutKey_insert = 'i';
var shortcutKey_append = 'a';

var disableKey = false;
var INPUTS = ['INPUT', 'TEXTAREA'];


window.addEventListener("load", function(e) {
	var count=0;
	var links_tmp=[];

    field = document.getElementById("yschsp");

	result_all = document.getElementsByClassName("hd");
	
	for(i=0; i<result_all.length; i++){
		cname = result_all[i].parentNode.className;
		cnames = cname.split(" ");
		if(cnames[0] == "w" || cnames[0] == "sm" || cnames[0] == "dd"){
			links_tmp = result_all[i].getElementsByTagName("a");
			links[count] = links_tmp[0];
			result_all[i].innerHTML = html + result_all[i].innerHTML;

			if(count==0){
				result_all[i].childNodes[0].style.color = color_on;
			}else{
				result_all[i].childNodes[0].style.color = color_off;
			}
			count++;
		}
	}
	result_algo = document.getElementsByClassName("acc");
	max_pos = count;
}, false);


function activateResult() {

    if(window.pageYOffset+100>result_algo[current_pos].offsetTop
    || window.pageYOffset + window.innerHeight < result_algo[current_pos].offsetTop+100) {
        window.scrollTo(0, result_algo[current_pos].offsetTop-window.innerHeight/2);
    }
}

document.addEventListener('keydown', function (e) {
    var pressed = String.fromCharCode(e.which).toLowerCase();
    pressed = (e.ctrlKey ? 'C-' : '') + (e.altKey ? 'A-' : '') + (e.shiftKey ? 'S-' : '') + pressed;

	if (INPUTS.indexOf(e.target.tagName) == -1 && pressed == shortcutKey_down) {
		e.preventDefault();
		if (!disableKey) {
			disableKey = true;

			result_algo[current_pos].childNodes[0].style.color = color_off;
			current_pos++;
			if(current_pos > max_pos-1){
				current_pos = max_pos-1;
			}
			result_algo[current_pos].childNodes[0].style.color = color_on;
			activateResult();

			disableKey = false;
		}
	}

	if (INPUTS.indexOf(e.target.tagName) == -1 && pressed == shortcutKey_up) {
		e.preventDefault();
		if (!disableKey) { //
			disableKey = true;

			result_algo[current_pos].childNodes[0].style.color = color_off;
			current_pos--;
			if(current_pos < 0){
				current_pos = 0;
			}
			result_algo[current_pos].childNodes[0].style.color = color_on;
			activateResult();

			disableKey = false;
		}
	}

	if (INPUTS.indexOf(e.target.tagName) == -1 && pressed == shortcutKey_open) {
		e.preventDefault();
		if (!disableKey) { //
			disableKey = true;

			GM_openInTab(links[current_pos]);

			disableKey = false;
		}
	}

	if (INPUTS.indexOf(e.target.tagName) == -1 && pressed == shortcutKey_insert) {
		e.preventDefault();
		if (!disableKey) { //
			disableKey = true;

			scrollTo(0, 0);
	        field.selectionStart=0 ;
			field.selectionEnd=field.value.length;
			field.focus();

			disableKey = false;
		}
	}

	if (INPUTS.indexOf(e.target.tagName) == -1 && pressed == shortcutKey_append) {
		e.preventDefault();
		if (!disableKey) { //
			disableKey = true;

			scrollTo(0, 0);
	        field.value=field.value+"  ";
	        field.selectionStart=field.value.length-1;
			field.selectionEnd=field.value.length;
			field.focus();

			disableKey = false;
		}
	}


}, false);
