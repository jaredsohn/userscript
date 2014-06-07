// ==UserScript==
// @name         LiveLib.ru SP
// @namespace    LiveLib
// @include      http://*livelib.ru/*
// @author       quarkie
// @description  Extends LiveLib.ru functionality
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

// the guts of this userscript
function main() {
jQuery.noConflict();
(function($) { 
	$(function() {
		Array.prototype.unique = function(){
			var vals = this;
			var uniques = [];
			for(var i=vals.length;i--;){
				var val = vals[i];  
				if($.inArray( val, uniques )===-1){
					uniques.unshift(val);
				}
			}
		return uniques;
		}
		var style = '#authors_ttip {position:absolute; display:none; background:#fafafa; border:2px solid #ccc; border-radius:5px; padding:8px 15px; cursor:pointer;} #authors_ttip span {display:block; margin:8px 0;} #authors_ttip em {color:#ccc;} .rname {font-size:16px;} .rname strong {color:#1752B6}';
		if (/\/reader\//.test(window.location)) {style = style+'#leftside > .row {float:left; clear:none; min-height:190px; margin: 14px 0; border: 0; clear: none; padding-top: 0; position:relative;}#leftside > .row > div:nth-child(4), #leftside > .row > div:nth-child(3) {display:none;}#leftside > .row > div:nth-child(1) {width:180px;}#leftside > .row .details .info:nth-child(2) , .details .info:nth-child(n+4) {display:none;}#leftside > .row .bookinfo {width:180px;}#leftside > .row .actionbar {position:absolute; bottom:30px; left:70px;}#leftside .separator {display:none;}.ub-own-p, .ub-own-a, ub-own-e{display:none;}#my-book-list-form {clear:left;}#leftside > .row .umpad {position:absolute; bottom:50px; left:65px; padding-top:0;}#leftside > .row .title {min-height:30px}'}
		$('body').append($('<style/>').text(style));
		$('body').append($('<div id="authors_ttip"></div>'));
		$('#authors_ttip').click(function(){
			$('#authors_ttip').hide().find('span').remove();
		});
		$('a.i-reader').click(function(e){
			e.preventDefault();
			$('#authors_ttip').hide().find('span').remove();
			var $this = $(this).parent('span.reader');
			var reader_url = $this.find('a:first').attr('href').replace('/profile', '');
			var reader_name = $this.find('a:last').text();
			function requestAuthors(callback){
				var authorReq = new XMLHttpRequest();
				authorReq.open('GET', 'http://www.livelib.ru'+reader_url+'/favorites/authors', true);
				authorReq.send(null);
				authorReq.onreadystatechange = function(){
					if (authorReq.readyState == 4 && authorReq.status == 200) {
						var html = authorReq.responseText;
						getAuthors(html);
					}
				};
			}
			
			function requestBooks(callback){
				var booksReq =  new XMLHttpRequest();
				booksReq.open('GET', 'http://www.livelib.ru'+reader_url+'/favorites/books', true);
				booksReq.send(null);
				booksReq.onreadystatechange = function(){
					if (booksReq.readyState == 4 && booksReq.status == 200) {
						var html = booksReq.responseText;
						getBooks(html);
					}
				};
			}
			
			function getAuthors(html) {
				var $html = $(html);
				var authors = [];
				$html.find('.author').each(function(){
					authors.push($(this).text());
				})
				if (authors.length>0) {
					callback(authors);
				} else {
					requestBooks(callback);
				}
			}
			
			function getBooks(html) {
				var $html = $(html);
				var books = [];
				$html.find('.author').each(function(){
					books.push($(this).text());
				})
				callback(books.unique());
			}
			var callback = function applyData(data) {
				var text = '<em>No favorites</em>';
				if (data.length>0) {
					text = data.join('</span><span>');
				}
				$('#authors_ttip').css('top', e.pageY+30+'px').css('left', e.pageX+'px').append($('<span class="rname"><strong>'+reader_name+'</strong> favorites:</span><span>'+text+'</span>')).show();
				
			};
			requestAuthors(callback);
		});
	});
})(jQuery);
}

// load jQuery and execute the main function
addJQuery(main);
