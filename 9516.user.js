// ==UserScript==
// @name           lucky did you mean
// @namespace      userscripts.org/alien_scum
// @description    Combines google's "did you mean" and "I'm feeling lucky".
// @include        about:cache#meanlucky=*
// ==/UserScript==

document.body.innerHTML='Loading Bookmark...';
var q = location.href.match(/#meanlucky=(.*)/)[1];
document.body.innerHTML='Validating search terms...<br>'+unescape(q);
xhr('http://www.google.com/search?q='+q,function(r){
  m=r.match(/Did you mean: <\/font><a[^>]*>(.*?)<\/a>/);
  if (m) q=escape(m[1].replace(/<[^>]*>/g,''));
  document.body.innerHTML+='<br>Loading using:<br>'+unescape(q);
  search='http://www.google.com/search?btnI=I%27m+Feeling+Lucky&q='+q;
  location.replace(search);
});

	function xhr(uri,f,a,b,c) {GM_xmlhttpRequest({method: 'get',headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},url: uri,onload:function(res){f(res.responseText,a,b,c)}});}
