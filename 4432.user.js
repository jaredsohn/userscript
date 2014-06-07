// ==UserScript==
// @name           highlight heavy links
// @namespace      ~msn
// @description    changes background color of links to warn if video, pdf, ...
// @include        http://*.metafilter.com/
// @include        http://*.metafilter.com/*
// ==/UserScript==

HeavyColor = 'rgb(80,0,80)';
HeavyExtensions = ['swf', 'ram', 'rm', 'wmv', 'asx', 'mov', 'pdf', 'mp3', 'mpg', 'mpeg', 'wav'];
HeavyURLs = [
 /youtube.com\/.*\?v=/,
 /video.google.com\/videoplay/,
 /video.google.com\/googleplayer.swf/,
 /collegehumor.com\/movies\/.*\//,
]

HeavyExs = [];
for (var i=0; i<HeavyExtensions.length; i++)
 HeavyExs.push(new RegExp('.' + HeavyExtensions[i] + '$', 'i'));  // case insensitive

function heavyExtension(url){
 for (var i=0; i<HeavyExs.length; i++)
  if (url.match(HeavyExs[i])) return true;
 return false;
}
function heavyURL(url){
 for (var i=0; i<HeavyURLs.length; i++)
  if (url.match(HeavyURLs[i]))return true; 
 return false;
}
function Main (){
 var links = document.links;
  for (var i=0; i<links.length; i++)
   {var link = links[i];
     var url = link.href;
      if (heavyExtension(url) || heavyURL(url))
       link.style.backgroundColor = HeavyColor; 
    }
}
Main();