// ==UserScript==
// @name           Pennergame Radio By basti1012
// @namespace      pennergame Radio by basti1012  (http://pennerhack.foren-city.de).version 6 Ueberarbeitet von NewMan (http://ego-shooters.net)
// @description    fuegt euch ein kleines radio auf den pennergame sseiten ein.
// @include        http://*pennergame.de*
// @include        http://*berlin.pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*dossergame.co.uk*
// ==/UserScript==


var hoch = '80';
var breit= '10';



//<div align="left"><table width="100%" border="0" cellpadding="0" cellspacing="0" height="90">'
//+'<tbody><tr><td valign="top"><div style="padding-left: 1px;"><center>'
//+'</center></div></td></tr></tbody></table></div></td></tr>


var link ='<a class="bbcode-link" href="http://wowszene.gamer-fm.de:8000/listen.pls">Outland.FM</a></b><a href="http://pennerhack.foren-city.de/"><strong>Radio</strong></a><br>'
+'<object type="application/x-shockwave-flash" data="http://www.wowszene.de/edur/flashplayer/test.swf" width="180" height="100">'
+'<param name="movie" value="/edur/flashplayer/test.swf">'
+'<param name="allowScriptAccess" value="sameDomain">'
+'<param name="quality" value="best">'
+'<param name="wmode" value="transparent">'
+'<param name="bgcolor" value="#000000">'
+'<param name="scale" value="noScale">'
+'<param name="salign" value="TL">'
+'<param name="FlashVars" value="playerMode=embedded">'
+'</object>';


document.getElementById("navigation").innerHTML += '<span name="Bastiradio" style="position:absolute;top:'+hoch+'px;right:'+breit+'px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;"><span style=" color:"blue""><b>'+link+'</b></span>';
