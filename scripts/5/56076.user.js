// ==UserScript==
// @name				cheating on flickr
// @author				destroyer85
// @namespace
// @include			http://www.flickr.com/photos/*
// @todo                        Find a easy way (without API) to find the original secret.
// ==/UserScript==

var arr_link = document.getElementsByTagName("link");
for (i = 0; i < arr_link.length; i++) {
	if (arr_link[i].rel == "image_src"){
		var img_src=arr_link[i].href;
	}
	if (arr_link[i].rel == "canonical"){
		var img_canon=arr_link[i].href;
	}
}
var img_name = img_src.substring(0,img_src.lastIndexOf(".")-2);
var img_ext = img_src.substring(img_src.lastIndexOf("."));
var arr_img_canon = img_canon.split("/");
var img_id = arr_img_canon[arr_img_canon.length - 2];

//var photo_name=document.getElementsByName("photo")[0].value;
var title_div="title_div" + img_id;

var button_bar = document.getElementById(title_div);
if (button_bar) {
	var div_gatso = document.createElement("div");
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_s" + img_ext + "\">Quadrata</a> - ";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_t" + img_ext + "\">Miniatura</a> - ";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_m" + img_ext + "\">Piccola</a> - ";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + img_ext + "\">Media</a> - ";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_b" + img_ext + "\">Grande</a><br>";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_s_d" + img_ext + "\">Quadrata</a> - ";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_t_d" + img_ext + "\">Miniatura</a> - ";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_m_d" + img_ext + "\">Piccola</a> - ";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_d" + img_ext + "\">Media</a> - ";
	div_gatso.innerHTML = div_gatso.innerHTML + "<a style=\"font-size: 12pt;\" href=\"" + img_name + "_b_d" + img_ext + "\">Grande</a><br>";
	button_bar.appendChild(div_gatso);
}
