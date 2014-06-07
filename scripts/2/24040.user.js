// -*- coding:utf-8 -*-
// vim: set enc=utf8:
// ==UserScript==
// @name           Det store bildet
// @namespace      http://www.pvv.org/~alexanro
// @description    Makes small profile-images link to the larger versions
// @include        http://underskog.no/medlem/vis/*
// @include        http://www.underskog.no/medlem/vis/*
// @license        GPL 2
// @version        0.2
// @author         Alexander Rødseth
// ==/UserScript==

// Return the first div-tag with the given "class="
function get_div_by_class(classname) {
    var lst_div = document.getElementsByTagName("div");
    for (i=0; i < lst_div.length; i++) {
	if (lst_div[i].className == classname) {
	    return lst_div[i];
	}
    }
    return -1;
}

// Return the first img-tag within a given tag/element
function get_first_img(element) {
    return element.getElementsByTagName("img")[0];
}

// The main function
function main() {

    // Find the first div with class "member_image", and the image within
    var elm_div = get_div_by_class("member_image");
    var elm_img = get_first_img(elm_div);

    // Find the url to the big image
    var str_parts = elm_img.src.split("_");
    var str_bigimage = str_parts[0] + "." + str_parts[2].split(".")[1];

    // Replace the inner contents of the div-tag so that the
    // image is surrounded by <a> and is linked to the bigger image
    var str_img = elm_div.innerHTML;
    elm_div.innerHTML = '<a href="' + str_bigimage + '">' + str_img + '</a>';
}

main();
