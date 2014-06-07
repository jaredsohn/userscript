// ==UserScript==
// @name          Todayhumor Firefox Patch Modified Version (Made by Gh4ck3r, modified by Kaga)
// @namespace     http://ghacker.homelinux.net
// @description   Fix ok and tail layers. "Remove ads" option dropped
// @include       http://todayhumor.*
// @exclude       
// ==/UserScript==

var tail_layer;
var tail_layer_orig_height;
var is_tail_layer_folded=true;

tail_layer = document.getElementById('tail_layer');
if(tail_layer) {
	tail_layer.style.overflow="hidden";
	tail_layer_orig_height = tail_layer.style.height;
}

function control_tail_layer() {
	if(is_tail_layer_folded){
		tail_layer.style.height='100%';
		is_tail_layer_folded = false;
	} else {
		tail_layer.style.height=tail_layer_orig_height;
		is_tail_layer_folded = true;
	}
}

var ok_layer;
var ok_layer_orig_height;
var is_ok_layer_folded=true;

ok_layer = document.getElementById('ok_layer');
if(ok_layer) {
	ok_layer.style.overflow="hidden";
	ok_layer_orig_height = ok_layer.style.height;
}

function control_ok_layer() {
	if(is_ok_layer_folded) {
		ok_layer.style.height='100%';
		is_ok_layer_folded = false;
	} else {
		ok_layer.style.height = ok_layer_orig_height;
		is_ok_layer_folded = true;
	}
}

// fix tail_layer and ok_layer button
var all_input, element;
all_input = document.getElementsByTagName('input');

for(var i = 0; i<all_input.length; i++) {
	element = all_input[i];
	if(element.getAttribute('onclick') == 'combo()') {
		element.setAttribute('onclick', null);
		element.addEventListener("click", control_tail_layer, true);
	} else if(element.getAttribute('onclick') == 'combo_ok()') {
		element.setAttribute('onclick', null);
		element.addEventListener("click", control_ok_layer, true);
	}
}

