// ==UserScript==// @name           Walla Ad Removal// @namespace      http://tribla.4free.co.il
// @description    Remove all walla gif/swf banners. it may work for any website using the word 'banner' in every banner src location.// @include        http://*.walla.com/*
// @include        http://*.walla.co.il/*
// ==/UserScript==
var s = document.body.innerHTML;
s = s.replace(/(\".+banner.+\")/ig,'\"\" style=\"display:none\" ');
s = s.replace(/(\'.+banner.+\')/ig,'\'\' style=\'display:none\' ');
s = s.replace(/(src=.+banner[^ ]+)/ig,' style=\"display:none\" ');
s = s.replace(/(src=.+banner[^ >]+)/ig,' style=\"display:none\" ');
s = s.replace(/(\".+600x80.+\")/ig,'\"\" style=\"display:none\" ');
s = s.replace(/(\'.+600x80.+\')/ig,'\'\' style=\'display:none\' ');
s = s.replace(/(src=.+600x80[^ ]+)/ig,' style=\"display:none\" ');
s = s.replace(/(src=.+600x80[^ >]+)/ig,' style=\"display:none\" ');
document.body.innerHTML = s;
