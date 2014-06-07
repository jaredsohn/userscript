// ==UserScript==
// @name           Cinema Paradiso: ratings link
// @namespace      http://raines.me.uk/
// @description    The number of DVDs in your list is a link but for some reason the number you've rated isn't. This script fixes that.
// @include        http://www.cinemaparadiso.co.uk/*
// ==/UserScript==

var user_info = document.getElementById('CtrUserInfo1_panUI');
if (user_info) {
	var number_rated = /\((\d+)\)/.exec(user_info.lastChild.nodeValue)[1];
	var sections = user_info.lastChild.nodeValue.split(/\(\d+\)/);
	user_info.removeChild(user_info.lastChild);
	user_info.appendChild(document.createTextNode(sections[0] + '('));
	var link = document.createElement('a');
	link.setAttribute('href', '/MySelection/MyRatings.aspx');
	link.appendChild(document.createTextNode(number_rated));
	user_info.appendChild(link);
	user_info.appendChild(document.createTextNode(')' + sections[1]));
}
