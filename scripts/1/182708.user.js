// ==UserScript==
// @name        GANOOLIZER
// @namespace   jmkl
// @include     http://ganool.com/page/*
// @include     http://ganool.com/category/*
// @include	http://ganool.com/
// @version     1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       none
// ==/UserScript==



var fnt = '<style>'+
'@font-face {'+
'font-family: "Noto Sans";'+
'font-style: normal;'+
'font-weight: 400;'+
'src: local("Noto Sans"), local("NotoSans"), url(http://themes.googleusercontent.com/static/fonts/notosans/v1/LeFlHvsZjXu2c3ZRgBq9nD8E0i7KZn-EPnyo3HZu7kw.woff) format("woff");'+
'}'+
'*, html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {'+
'font-family: "Noto Sans", sans-serif;'+
'}'+
'<style>';
$('head').append(fnt);
var alamat = window.location.href;
//kenyot javascript
$('script').remove();

$(document).ready(function() {
	var post = $('.post');
	$.each(post, function(index, p) {
	var link = $(p).find('a.more-link');
	link.attr('onclick','return false;');
	link.closest('strong').replaceWith(link);
	link.text('Expand Me!!!');
	link.prependTo($(p));
	link.hover(function() {
		$(this).css({
			'background': '#222',
			'transition':'all .2s ease-in-out'
		});
	}, function() {
		$(this).css({
		    'background': '-webkit-gradient(linear,left top,left bottom,from(#2186d4),to(#175dbd))',
		    'background': '-webkit-linear-gradient(#2186d4,#175dbd)',
		    'background': '-moz-linear-gradient(#2186d4,#175dbd)',
		    'background': '-o-linear-gradient(#2186d4,#175dbd)',
		    'background': 'linear-gradient(#2186d4,#175dbd)',
		    'transition':'all .2s ease-in-out'
		});
	});
	//CSS Style Credit to : http://cssdeck.com/labs/ready-to-use-buttons
	link.css({
    'text-decoration': 'none',
    'appearance': 'none',
    'border': '0',
    'padding': '10px',
    'width': '95%',
    'float':'left',
    'margin': '0',
    'border': '1px solid #fff',
    'font-size': '.8em',
    'line-height': '1',
    'color': '#2c3e50',
    'text-shadow': '0 0 0',
    'outline': '0',
    '-webkit-border-radius': '6px',
    '-moz-border-radius': '6px',
    'border-radius': '6px',
    'height': 'auto',
    'font-weight': 'bold',
    'font-size': '1.2em',
    'line-height': '.6',
    'background': '-webkit-gradient(linear,left top,left bottom,from(#2186d4),to(#175dbd))',
    'background': '-webkit-linear-gradient(#2186d4,#175dbd)',
    'background': '-moz-linear-gradient(#2186d4,#175dbd)',
    'background': '-o-linear-gradient(#2186d4,#175dbd)',
    'background': 'linear-gradient(#2186d4,#175dbd)',
    'color': '#fff',
    'border': '1px solid #244868',
    'text-shadow': '0 -1px 4px rgba(0,0,0,.4)',
    '-webkit-box-shadow': '0 1px 4px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 1px rgba(255,255,255,.1)',
    '-moz-box-shadow': '0 1px 4px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 1px rgba(255,255,255,.1)',
    'box-shadow': '0 1px 4px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 1px rgba(255,255,255,.1)'
    //'position':'relative'
	});
	link.click(function() {
		var konten1;
			var konten2;
			if(alamat.contains('category')){
				var k1 = $(p).find('.entry-summary');
				var k2 = $(p).find('.entry-content');
				konten1=k1[0];
				konten2=k2[0];
			}
			else{
				var k = $(p).find('.entry-content');
				konten1=k[0];
				konten2=k[1];

			}
		if($(this).text()=='Hide Me'){
			
			$(konten2).slideToggle('slow', function(){
				$(konten2).hide('slow');
				$(konten1).slideToggle('slow');
				$(link).text('Show Me');
			});
			
			return;
		}
		else if($(this).text()=='Show Me'){
			$(konten1).slideToggle('slow', function(){
				$(konten1).hide('slow');
				$(konten2).slideToggle('slow');
				$(link).text('Hide Me');
			});
			
			return;
		}

		$(this).text('Grabbing stuff, Please Wait...');
	$.getJSON('http://whateverorigin.org/get?url=' + 
		encodeURIComponent($(link).attr('href')) + 
		'&callback=?', 
		function(data){

				var konten = data.contents;
			if(alamat.contains('category'))
				var tkt = $(p).find('.entry-summary');
			else
				var tkt = $(p).find('.entry-content');

			var kt = $(konten).find('.entry-content');
				

				tkt.slideToggle('slow',function(){
					kt.hide();
					tkt.hide();
					$(p).append(kt);			
					kt.slideToggle('show');
					
				});
	
			
				
		}).done(function(){
			$(link).text('Hide Me');
			var imdb = $(p).find('a.autohyperlink');
			$.each(imdb, function(index, valex) {
				var l = $(valex).attr('href');
				if(l.contains('imdb')){
					var reg = /tt[0-9].*[0-9]/g;
					var m = l.match(reg);
					if(m){
						$.get('http://www.omdbapi.com/?i='+m[0], function(data) {
							var res = eval('('+data+')');
							var skors = $(p).find('a.autohyperlink');
							$.each(skors, function(index, skor) {
							 	if($(skor).attr('title').contains('imdb'))
							 		$(skor).text('IMDB Rating : '+res.imdbRating+'/'+res.imdbVotes+' votes');
							});

						});
					}
				}
			});
		});
	});


	});

});
