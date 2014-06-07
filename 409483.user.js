// ==UserScript==
// @name        LeBonCoin Maps
// @namespace   charcuterie
// @description maps dans leboncoin
// @include     http://www.leboncoin.fr/locations/*
// @version     3
// @grant       none
// ==/UserScript==

var body = $('.content').text();
var title = $('#ad_subject').text();

var annonce = title + ', ' + body;

var addr = annonce.slice(annonce.indexOf('rue'), annonce.length);

//remove
addr = addr.replace(/\n/g,' ')


//addr = addr.split('.',1)[0]; //disabled: people use abbreviations
addr = addr.split(',',1)[0];
//addr = addr.split('au',1)[0];

console.log('ADDR: ' + addr);

//$('.content').append('<a href="http://maps.google.com/?q='+addr+ ', rennes' '">MAP</a>');

$('.mapsurl').remove();
var mapsUrl = 'https://maps.google.com/maps?saddr=sainte+anne,+rennes&daddr='+addr+', rennes'+'+to:Inria+Rennes+-+Bretagne+Atlantique,+Avenue+G%C3%A9n%C3%A9ral+Leclerc,+Rennes,+France';

$('.content').append('<a class="mapsurl" href="'+mapsUrl+'">MAP</a>');

//<iframe name="framename" id="myframe" src="mypage.html"></iframe>

//https://maps.google.com/maps?saddr=testa&daddr=testb+to:testc

var zoom = 13;
iframe = '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+mapsUrl+'&amp;z='+zoom+'&amp;output=embed"></iframe><br /><small><a href="'+mapsUrl+'">link to map</a></small>'

//$('.lbcOptions').css('width',426);
//$('div.floatLeft:nth-child(3)').css('width', 400);


$('.lbcContainer').prepend(iframe);

$('#ad_subject').append(' <span style="font-size: 18px; font-weight: bold; color: #F60;">'+$('span.price').text()+'</span>');
