// ==UserScript==
// @name           Emotikony hunted.pl
// @author		   Barts/Bazyl
// @namespace      Emotikony hunted.pl
// @description    Emotikony hunted.ppl
// @include        http://www.forum.toproste.pl/n*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var $j = jQuery.noConflict();

$j('.panel:first div:first-child .fieldset:last').html('<legend>Emotikony by Wiceps</legend><div id="wic" style="padding: 3px;">');
//$j('#wic');

var emoty = [
		'http://tinypic.pl/i/00049/jk7ygr0cjg2y_t.jpg',
		'http://i55.tinypic.com/2e0l55s.jpg',
		'http://i53.tinypic.com/11gkqxl.jpg',
		'http://i51.tinypic.com/ip45rq.jpg',
		'http://i51.tinypic.com/14t8r47.jpg',
		'http://i56.tinypic.com/2h8bhja.jpg',
		'http://i52.tinypic.com/s4wiae.jpg',
		'http://i54.tinypic.com/2qbd5kz.jpg',
		'http://i52.tinypic.com/28872j9.jpg',
		'http://i56.tinypic.com/2e56z3m.jpg',
		'http://i52.tinypic.com/350tlds.jpg',
		'http://i52.tinypic.com/dc68eb.jpg',
		'http://i56.tinypic.com/2po8eid.jpg',
		'http://i54.tinypic.com/35i27gp.jpg',
		'http://i54.tinypic.com/a2xk9.jpg',
		'http://i54.tinypic.com/24pxz03.jpg',
		'http://i52.tinypic.com/2hs2eqh.jpg',
		'http://i53.tinypic.com/2moc7mg.jpg',
		'http://i56.tinypic.com/256dbh1.jpg',
		'http://i56.tinypic.com/2qncs9y.jpg'	
];

$j(emoty).each(function(i,v){
	$j('#wic').append('<img src='+v+'>');
});

$j('#wic > img').live('click', function(){
	//alert(this.src);
	$j('#vB_Editor_001_textarea').val($j('#vB_Editor_001_textarea').val()+'[img]'+this.src+'[/img]');
})