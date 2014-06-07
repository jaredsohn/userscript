// ==UserScript==
// @name           Jump to last post CHROME
// @namespace      www.bungie.net
// @description    Adds a link to the bottom of the page to jump back to your most recent post
// @include        http://*bungie.net*
// @version        2
// ==/UserScript==

function getCookie(name) {
var results = document.cookie.match(name + '=(.*?)(;|$)');
if (results)
return (unescape(results[1]));
else
return null;}

xmlhttp=new XMLHttpRequest();
if(document.URL.search("admin") > -1){xmlhttp.open("GET","http://admin.bungie.net/Search/default.aspx?q="+getCookie(name)+"&g=5",false);}
else{xmlhttp.open("GET","http://www.bungie.net/Search/default.aspx?q="+getCookie(name)+"&g=5",false);}
xmlhttp.send(null);
var doc = document.implementation.createDocument("", "", null);
var html = document.createElement("html");
html.innerHTML = xmlhttp.responseText;
doc.appendChild(html);
var first_post = doc.getElementsByTagName('h6').item(0);
var linky = first_post.getElementsByTagName('a').item(0).href;
var footerlinks = document.getElementById('ctl00_footer_footerMenu');
footerlinks.innerHTML += '<a id="JTLP" target="_blank">Jump-to-last-post</a>';
var JTLP = document.getElementById('JTLP'); 
JTLP.href = linky;

//APX