// ==UserScript==

// @name          Todayhumor firefox patch hsver.02

// @namespace     http://ghacker.homelinux.net && http://blog.naver.com/bluelenz (hs)

// @description   Fix ok and tail layers. remove ads. AND more edited by hs

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



var target_element;


// set memoarea
var ua = navigator.userAgent;
if(ua.indexOf("Linux") != -1)
{

	var all_textarea;

	all_textarea = document.getElementsByTagName('textarea');

	for(var i = 0; i<all_textarea.length; i++) {

		element = all_textarea[i];

		if(element.name == "memo"){

			element.setAttribute("cols","40");

		}

	}
}


all_td = document.getElementsByTagName('td');

for(var i = 0;i<all_td.length;i++){

	element = all_td[i];
	if(element.bgColor == "#d5d2c4"){
		element.parentNode.setAttribute("valign", "top");
	}
}


// fix search form
var all_input = document.getElementsByTagName('input');

for(var i = 0; i < all_input.length; i++)
{
	element = all_input[i];
	if(element.value.match("검색"))
	{
		element.removeAttribute("onclick");
	}
}