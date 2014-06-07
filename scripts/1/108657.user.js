// ==UserScript==
// @name           Chowane szukaczki, galeria pod #siWrapper
// @description    Chowa szukaczke poza obszar przegladarki oraz przesuwa galerie pod dane dostawy
// @include        http*://*allegro.pl/*-i*.html
// @include        http*://*allegro.pl/show_item.php?item=*
// @include        http*://*allegro.pl/showItem2.php?item=*
// @version        2.2
// @copyright      Royd
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

galeria();
szukajka();

// galeria zdjec
function galeria(){

	var siWrapperH = $('#siWrapper').height();
	
	$('.siGallery').css({
		position: 'fixed',
		left: 5,
		top: siWrapperH+5
	});
 
};

// Szukajka
function szukajka(){

	var y = $('#searchPanel');
	var height = y.height();

	y.css({position: 'fixed', 
		top: -height+10, 
		height: 'auto',
		'z-index': 200,
		width: 1200,
		margin: 0
	});

	$('#searchPanel > #searchPanelContent').append('<div class="ukrywacz" style="text-align: center; color: #fff; cursor: pointer;"><img src="http://static.allegrostatic.pl/site_images/1/0/layout/arr_down.gif" /></div>');

	$('#searchPanel .ukrywacz').click(function(){
		if(y.css('top')=='0px'){
			y.animate({top: -height+10});
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