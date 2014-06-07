// ==UserScript==
// @name           Clean View on TempPic.com
// @namespace      http://userscripts.org/scripts/show/173551
// @description    No more advertisings when click to see the image.
// @version        8
// @icon           http://s3.amazonaws.com/uso_ss/icon/173551/large.png?1374091517
// @include        /http(s)?://(www.)?temppic.com/img/
// ==/UserScript==

var HTML = document.body.innerHTML;

HTML = HTML.replace(/<style(.|\n)*?<img src=\"http:\/\/www.temppic.com\/upload_picture/m, '<img src="http://www.temppic.com/upload_picture');
HTML = HTML.replace(/<\/td>(.|\n)*<\/noscript>/m, "");

document.body.innerHTML = HTML;


//var URL = content.document.location;
//var URL = window.location.href;

//URL = URL.replace(/<img src="http://www.temppic.com/upload_picture/, 'upload_picture/');
//URL = URL.replace(/(\d\d\d\d):/, "$1/images/");

//window.location.replace(URL);
//window.location.href = URL;
//document.location = URL;
//content.document.location = URL;
