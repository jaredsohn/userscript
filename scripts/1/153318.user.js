// ==UserScript==
// @name 7S Section Strip
// @description Strips sections/containers that I don't need.
// @include http://www.se7ensins.com/forums/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

window.addEventListener ("load", LocalMain, false);

function LocalMain () {
	var catsToHide = [ '.node_1', '.node_2' , '.node_255', '.node_285', '.node_275' ];
	var individualCats = [ '.node_340', '.node_24', '.node_365', '.node_210', '.node_364', '.node_307', '.node_218', '.node_183', '.node_227', '.node_172', '.node_263', '.node_27', '.node_341', '.node_139', '.node_234' ];

	// Auto hides cats I never view.
	$.each(catsToHide, function(index, value) {
		var cat_node = $(value);

		tc = cat_node.find('.toggle_arrow');
		cat_node.find('.nodeList').hide();
		tc.addClass('closed');
		tc.removeClass('open');
	});

	// Hides inner sections that I don't give a shit about.
	$.each(individualCats, function(index, value) {
		var cat_node = $(value);
		cat_node.hide();
	});
}