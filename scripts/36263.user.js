// ==UserScript==
// @auther         Atushi Yamazaki
// @name           faceiconize4kbmjsns
// @namespace      http://atushiyamazaki.blogspot.com/
// @description    faceiconize4kbmjsns
// @include        htt*://sns.kbmj.jp/*
// @version        0.0.01 
// ==/UserScript==
var a = document.getElementsByTagName('a');
for (var i = 0; i < a.length; i++) {
  if (a[i].href.indexOf(location.protocol + '//' + location.host + '/users/') != -1
   && a[i].href.substr((location.protocol + '//' + location.host + '/users/').length, a[i].href.length).match('/') == null
   && a[i].href != location.protocol + '//' + location.host + 'albums') {
     var name = a[i].href.substr(a[i].href.lastIndexOf('/')+1, a[i].href.length);
     a[i].firstChild.src = 'http://usericons.relucks.org/turnyournameintoaface/' + name;
  }
}
