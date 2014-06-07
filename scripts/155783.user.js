// ==UserScript==
// @name Set User-agent
// @namespace      http://www.w3.org/1999/xhtml
// @include        http://whatsmyuseragent.com/
// ==/UserScript==

GM_xmlhttpRequest({
  method: 'GET',
  url: window.location.href,
  headers: {
    'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    'Accept': '*/*',
  },
  onload:function(data){ alert(data.responseText.replace(/[\w\W]*<div id="MainBox">([\w\W]*?)<\/div>[\w\W]*/g,'$1').replace(/<.*?>/g,')) }
});