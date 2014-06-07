// ==UserScript==
// @name           Fixed menu
// @description    Fixed menu
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

var byTag="getElementsByTagName", byId = "getElementById";

var head = document[byTag]("head")[0];

function text_node(text){
	return document.createTextNode(text);
}

function new_element(name){
	return document.createElement(name);
}

function set_my_style(style_text){
	var style_tag = new_element("style");
	style_tag.appendChild(text_node(style_text));
	head.appendChild(style_tag);
}

set_my_style("#side_bar{position: fixed; z-index: 50}#stl_side{position: fixed; z-index: 1}");
