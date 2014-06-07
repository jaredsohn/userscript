// ==UserScript==
// @name       Kissmanga autofit
// @author     Bui Thanh Nhan
// @namespace  http://nerdyweekly.com/
// @version    0.1
// @description  Make wide pages on kissmanga.com fit into your browser width. No more horizontal scrolling!
// @match      http://kissmanga.com/Manga/*
// @copyright  Public domain
// ==/UserScript==

var imgs = document.getElementById('divImage').getElementsByTagName('p');
for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i].getElementsByTagName('img')[0];
    img.style['max-width'] = '100%';
}