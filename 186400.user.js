// ==UserScript==
// @name       Prettify Wikipedia
// @namespace  http://www.ariencaelestis.com
// @version    0.1
// @description  Make Wikipedia a little easier on the eyes
// @match      http://en.wikipedia.org/*
// @exclude 	http://en.wikipedia.org/wiki/Main_Page
// @copyright  2013+ Chris Bauer
// ==/UserScript==

// WEBFONT LOADER from https://github.com/typekit/webfontloader

WebFontConfig = {
    google: { families: [ 'Source+Sans+Pro:400:latin', 'Gentium+Basic:400,700:latin' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'false';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

var fileref=document.createElement("link")
fileref.setAttribute("rel", "stylesheet")
fileref.setAttribute("type", "text/css")
fileref.setAttribute("href", "http://www.ariencaelestis.com/external/css/wikipedia.css" )

document.getElementsByTagName("head")[0].appendChild(fileref);

var element = document.getElementById('p-personal');
element.parentNode.removeChild(element);

var element = document.getElementById('left-navigation');
element.parentNode.removeChild(element);

var element = document.getElementById('protected-icon');
element.parentNode.removeChild(element);

var element = document.getElementById('p-views');
element.parentNode.removeChild(element);