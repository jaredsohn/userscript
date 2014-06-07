// ==UserScript==
// @name        juu
// @namespace   http://www.sm-liiga.fi
// @description juuu
// @grant	none
// @include	http://www.sm-liiga*
// @version     1
// ==/UserScript==
var oo = $('.date').first().text().substring(3).replace(/(\D)(\d\D)/g,"$10$2").replace(/^(\d+)\.(\d+)\.(\d+)$/,"$3$2$1");
$('.match').each(function() { s=($(this).children('.teams').children().children('span')); home=$(s[0]).text().toLowerCase().replace(/ä/g,"a"); vis=$(s[1]).text().toLowerCase().replace(/ä/g,"a");
u="ohru://hls1.80155-live0.dna.qbrick.com/80155-hls1/live/hls/"+oo+"_"+home+"_"+vis+"_hls.m3u8";
$(this).children('.tv').html("<a href='"+u+"'><img src='http://vapriikki.net/jaakiekkomuseo/images/leijonat/106_kummola.jpg' height='40' width='40'/></a>");
});