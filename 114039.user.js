// ==UserScript==
// @name       depressionbot: Make Quotes Page Better
// @namespace  http://www.somethingafal.com/
// @version    0.1
// @description  Makes the quotes page better
// @include    http://nc.no.de:443/quotes/
// @include    http://nc.no.de:443/quotes/*
// @copyright  2011+, Dafydd "Afal" Francis
// ==/UserScript==

document.body.innerHTML += '<link rel="stylesheet" type="text/css" href="http://dl.dropbox.com/u/13375195/depressionbot/main.css">';
var quotes = document.getElementsByTagName("a");
var i, ii;
for (i = 0, ii = quotes.length; i < ii; i++) {
    var quote = quotes[i];
    var q_name = quote.innerHTML;
    var image = 'http://dl.dropbox.com/u/13375195/depressionbot/images/quoted/' + q_name + '.gif';
    var img = new Image();
    img.src = image;
    quote.innerHTML = img.outerHTML + ' <span>' + q_name + '</span>';
}