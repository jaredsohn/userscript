// ==UserScript==
// @name         LiveLib.ru SP
// @namespace    LiveLib
// @include      http://*livelib.ru/*
// @author       quarkie
// @description  Extending LiveLib.ru functionality
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscrip t
function main() {
jQuery.noConflict();
(function($) { 
	$(function() {
		var style = '#authors_ttip {position:absolute; background:#fff; border:1px solid #ccc; padding:8px 15px; width:250px;}'
		$('body').append($('<style/>').html(style));
		$('span.reader').mouseenter(function(e){
			var pos = $(this).offset();
			reader_url = $(this).find('a:first').attr('href');
			var xhReq = new XMLHttpRequest();
			 xhReq.open('GET', 'http://www.livelib.ru'+reader_url+'/favorites/authors', false);
			 xhReq.send(null);
			 var $html = xhReq.responseText;
			 var pt = /<span class="author".*?title="(.*?)">.*?<\/span>/gi;
			 var spans = $html.match(pt);
			 var authors = [];
			 for (var i = 0; i<spans.length; i++) {
				var x = spans[i].replace('<span class="author" title="', '').replace(/".*>/gi, '');
				authors.push(x);
				if (authors.length>10) {
					break;
				}
			 }
			 var text = 'Empty';
			 if (authors.length>0) {
				text = authors.join(', ');
			 }
			$('body').append($('<div/>').attr('id', 'authors_ttip').css('top', pos.top+30+'px').css('left', pos.left+'px').html(text));
		});
		$('span.reader').mouseleave(function(){
			$('#authors_ttip').remove();
		});
	});
})(jQuery);
}

// load jQuery and execute the main function
addJQuery(main);
