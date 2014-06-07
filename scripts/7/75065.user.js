// ==UserScript==
// @name           POF thumbox
// @namespace      PABz
// @description    Plentyoffish - make the in/sent box images smaller
// @include        http://www.plentyoffish.com/inbox.aspx*
// @include        http://www.plentyoffish.com/history.aspx*
// @version        0.0.4
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/(67|77)px/gi, "12px");
document.body.innerHTML = document.body.innerHTML.replace(/(">&nbsp;<\/div>)(<br>)/gi, "; float:left $1 &nbsp;&nbsp;");
document.body.innerHTML = document.body.innerHTML.replace(/(width="65"|height="65")/gi, "&nbsp;");
document.body.innerHTML = document.body.innerHTML.replace(/(<TD align="left".+?<img src="http:\/\/pics.plentyoffish.com\/thumbnails\/.+?")(><\/a>|>)(<br>)/gi, "$1 width=14 height=14 style='vertical-align:middle; opacity:0.5;' onMouseover='width=75; height=75; style.opacity=1;' onMouseout='width=14; height=14; style.opacity=0.7;'$2 &nbsp;");
document.body.innerHTML = document.body.innerHTML.replace(/(<tr><td colspan="7">)( &nbsp;&nbsp;(|\s))(<\/td><\/tr>)/gi, "$1<div style='display:block; height:1px'><\/div>$3");
