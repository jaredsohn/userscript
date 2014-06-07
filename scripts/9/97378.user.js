// ==UserScript==
// @name           Flowplayer for YouTube
// @namespace      userscripts.org
// @description    Replaces the default YouTube player with Flowplayer (flowplayer.org). Forked from version 1.2 of Youtube Alternate Video Player by Yansky.
// @include        *
// @copyright      Yansky, Delvin
// @licence        Creative Commons Attribution-Share Alike 3.0 Unported License; http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.5
// @attribution    Yansky
// @attribution    Delvin
// ==/UserScript==
var sa = document.getElementsByTagName('script');
var sl = sa.length;
for(var i=0;i<sl;i++){
    var s=sa[i];
    if (s.src=="someFile.js"){
        s.src="someOtherFile.js" ;
        break;
    }
}