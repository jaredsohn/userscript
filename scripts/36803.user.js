// ==UserScript==

// @name          Todayhumor firefox patch hsver.

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



// Remove ads

var all_table;

all_table = document.getElementsByTagName('TABLE');

for(var i = 0; i<all_table.length; i++) {

	element = all_table[i];

	if(element.bgColor == '#bababa' && element.textContent.match('outputOvertureList2()')){

		element.parentNode.removeChild(element);

	}
	if(element.width == "225"){
		element.setAttribute("width", "487");
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


// Remove ads

var all_a;

all_a = document.getElementsByTagName('A');

for(var i = 0; i<all_a.length; i++) {

	element = all_a[i];

	if(element.href.match("updown")){

		target_element = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

		target_element.parentNode.removeChild(target_element.previousSibling.previousSibling.previousSibling.previousSibling);

		target_element.parentNode.removeChild(target_element.previousSibling.previousSibling.previousSibling);

		target_element.parentNode.removeChild(target_element.previousSibling.previousSibling);

		target_element.parentNode.removeChild(target_element.previousSibling);

		target_element.parentNode.removeChild(target_element);

	}

}




// Remove ads

var all_iframe;

all_iframe = document.getElementsByTagName('IFRAME');

for(var i = 0;i<all_iframe.length;i++){

	element = all_iframe[i];

	if(element.src.match("ou&cnt=todayu_l") || element.src.match("18027@ou")){

		element.parentNode.removeChild(element);

	}
	else if(element.src.match("adtd_overture_list.php")){
		target_element = element.parentNode.parentNode;
		target_element.parentNode.removeChild(target_element);
	}

}



// Remove td
var all_img;
all_img = document.getElementsByTagName('img');

for(var i = 0;i<all_img.length;i++){

	element = all_img[i];

	if(element.src.match("view_info_ear_mt.gif") || element.src.match("view_info_M.gif") || element.src.match("view_info_ear_mb.gif")){
	target_element = element.parentNode;
	target_element.parentNode.removeChild(target_element);

	}

}


var all_td;
all_td = document.getElementsByTagName('td');

for(var i = 0;i<all_td.length;i++){

	element = all_td[i];

	if(element.width == "439"){
		element.setAttribute("width", "701");

	}
	else if(element.width == "411"){
		element.setAttribute("width", "673");

	}
	else if(element.width == "240"){
		element.setAttribute("width", "10");

	}
}


// Remove script ads
var all_script;

all_script = document.getElementsByTagName('script');

for(var i = 0; i<all_script.length; i++) {

	element = all_script[i];

	if(element.src == "http://connect.kr/js/connect.js"){
		target_element = element.parentNode.parentNode.parentNode;

		target_element.parentNode.removeChild(target_element);

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