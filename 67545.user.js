// ==UserScript==
// @name           Imdb
// @namespace      Movie
// @description    Customize imdb page for better view
// @include        http://www.imdb.com/title/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// ==/UserScript==

$('#tn15adrhs').hide();
$('.pro-link').hide();
$('#tn15content>table:nth-of-type(1)').css({float: 'right', width: '24%'});
$('.media_strip_thumbs').css('overflow', 'visible');
$('.media_strip_thumb').css('margin-bottom', '3px');
$("div.info a[href$=companycredits]").parent().parent().hide();
if (((new Date()).getYear() + 1900) > parseInt($('h1 span a').text())) {
	$("div.info a[href$=releaseinfo]").parent().parent().hide();
}
elems = $('h5');
for(var i=0;i<elems.length;i++) {
	var elem = $(elems[i]);
	if(elem.text().match(/Plot Keywords:/) != null) {
		$(elem).parent().hide();
	} else if(elem.text().match(/NewsDesk:/) != null) {
		$(elem).parent().hide();
	}
}