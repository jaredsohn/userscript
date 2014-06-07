// ==UserScript==
// @name           Test Lemon Pen
// @namespace      http://omgis.tistory.net
// @include        http://www.daum.net/*


var sitesids= {
    'daum.net': "230b95765a5f6d25",
};

var site = window.location.href.split('/')[2];
var sid = sitesids[site];

url = "http://script.lemonpen.com/site/lemonpen.js?sid=" + sid;

var myscript = document.createElement('script');
myscript.setAttribute('src', url);
myscript.setAttribute('charset', 'UTF-8');
myscript.setAttribute('type', 'text/javascript');
document.body.appendChild(myscript); 

// ex: ts=8 sts=4 sw=4 et