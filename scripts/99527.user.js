// ==UserScript==
// @name           Gaia Relative Time
// @include        http://*gaiaonline.com/forum*
// @description    Brings Back Relative Time
// ==/UserScript==

var header = document.getElementsByTagName('head')[0];

var scriptCode = '(function(l){var d=YAHOO,e=d.util,k=e.Dom,j=e.Event,h=[],a=[],c=[],g=(new Date()).valueOf(),b=new Date(),i=function(m){return b-m},f=l.createElement("style");f.type="text/css";f.innerHTML=".recalc .relative-timestamp{display:none;}";l.getElementsByTagName("head")[0].appendChild(f);j.onDOMReady(function(){var o=20000,p=0,q=0,m=k.getElementsByClassName("relative-timestamp","abbr","content"),n=function(){var s=0,r=(new Date).valueOf(),t=0;k.addClass(l.getElementsByTagName("body")[0],"recalc");for(s=0;s<q;s++){t=Math.floor((r-c[s])/1000);m[s].innerHTML=(t>63072000)?(t/31536000).toFixed(1)+" years ago":(t>5356800)?(t/2678400).toFixed(1)+" months ago":(t>1209600)?(t/604800).toFixed(1)+" weeks ago":(t>172800)?(t/86400).toFixed(1)+" days ago":(t>7200)?(t/3600).toFixed(1)+" hours ago":(t>120)?(t/60).toFixed(0)+" minutes ago":(t>60)?"a minute ago":"seconds ago"}k.removeClass(l.getElementsByTagName("body")[0],"recalc")};q=m.length;for(p=0;p<q;p++){m[p]=m[p];c[p]=m[p].getAttribute("data-ts")*1000;a[p]=g-c[p]}n();setInterval(n,o)})})(document);';

var theScript = document.createElement('script');
theScript.innerHTML = scriptCode;
header.appendChild(theScript);
