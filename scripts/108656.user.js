// ==UserScript==
// @name					 Chowane szukaczki w liscie produktow
// @description		Chowa szukaczke w liscie produktow
// @include				http*://*allegro.pl/*-*
// @include				http*://*allegro.pl/show_user_auctions.php?*
// @include				http*://*allegro.pl/listing.php/search?*
// @include				http*://*allegro.pl/listing.php/showcat?*
// @exclude				http*://*allegro.pl/*-i*.html
// @version				2.1
// @copyright			Royd
// ==/UserScript== 

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
// the guts of this userscript
function main() {

szukajka();

// Szukajka
function szukajka(){

	var y = $('.search_panel');
	var height = y.height();

	y.css({position: 'fixed', 
		top: -height+5, 
		height: 'auto',
		'z-index': 200,
		width: 1200,
		margin: 0
	});

	$('.search_panel > .search_panel_1')
		.css({height: 'auto'})
		.append('<div class="ukrywacz" style="clear: both; text-align: center; color: #fff; cursor: pointer;"><img src="http://static.allegrostatic.pl/site_images/1/0/layout/arr_down.gif" /></div>');

	$('.search_panel .ukrywacz').click(function(){
		if(y.css('top')=='0px'){
			y.animate({top: -height+5});
			$(this).html('<img src="http://static.allegrostatic.pl/site_images/1/0/layout/arr_down.gif" />');
		}
		else {
			y.animate({top: 0});
			$(this).html('<img src="http://static.allegrostatic.pl/site_images/1/0/layout/arr_up.gif" />');
		}
	});
}

}

// load jQuery and execute the main function
addJQuery(main);
