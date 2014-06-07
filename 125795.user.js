// ==UserScript==
// @name           Remove Montreal Gazette Nag Screen
// @namespace      http://userscripts.org/
// @description    Removes registration nag screen
// @version        1.2
// @author         Spookstaz
// @include        http://www.montrealgazette.com/*
// ==/UserScript==
GM_addStyle("#gregbox-wrap { display:none; }");
GM_addStyle("#gregbox-outer { display:none; }");
GM_addStyle("#gregbox-signInTab { display:none; }");
GM_addStyle("#gregbox-overlay { display:none; opacity: 0; height: 0px; width:0px; }");

var scripts = document.getElementsByTagName('script');

for (var J = scripts.length-1;  J >=0;  --J)
{
    if (scripts[J].src && scripts[J].src.search(/montreal/) == -1 && scripts[J].src.search(/canada/) == -1 && scripts[J].src.search(/facebook/) == -1 && scripts[J].src.search(/twitter/) == -1 && scripts[J].src.search(/google/) == -1)
    {
      console.log ("Killed", scripts[J].src);
      scripts[J].parentNode.removeChild (scripts[J]);
    }
}

var image, blacklist = new Array(
"/images/sub-promo.jpg"
);

for(var i=document.images.length-1; i>=0; i--) {
image = document.images[i];
for(var x=blacklist.length-1; x>=0; x--) {
if(image.src.indexOf(blacklist[x])!=-1) image.parentNode.removeChild(image);
}
}
