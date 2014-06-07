// ==UserScript==
// @name           tblp chatango
// @author         Noitaru
// @description    chatango mini for tblp
// @include        http://xcyzbreathesmoe.wordpress.com/*
// @version        1
// ==/UserScript==

// new stylesheet
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position:relative; right:0px; top:-15px; width:auto;background-color:transparent;padding:3px;margin-bottom:1em; z-index:10000"> ' +
'<div class="wp-caption aligncenter"><object width="250" height="360"><param name="movie" value="http://tblp.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1224535971439&a=000000&b=100&c=FFFFFF&d=CCCCCC&e=000000&g=F6F6F4&k=666666&l=333333&m=000000&n=FFFFFF&s=1&aa=1"/><embed src="http://tblp.chatango.com/group" width="250" height="360" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1224535971439&a=000000&b=100&c=FFFFFF&d=CCCCCC&e=000000&g=F6F6F4&k=666666&l=333333&m=000000&n=FFFFFF&s=1&aa=1"></embed></object>' +
'</div>';
var elmauthors = document.getElementById('authors-2');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);