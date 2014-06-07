// ==UserScript==
// @name Toast Bordure
// @namespace Shalenity
// @description Compilation Smileys Shalen
// @include http://www.shalenity.com/forum-1.html*
// @include http://www.shalenity.com/topic*
// @include http://www.shalenity.com/news.htm*
// @include http://www.shalenity.com/listeSmileys.htm*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:ahap ", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelsha[...]/1337610940-ahap.png' />");

var reg=new RegExp("(:tboll ", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/tboll.gif' />");

var reg=new RegExp("(:death ", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/death.gif' />");

var reg=new RegExp("(:dolan ", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/Dolan.gif' />");

var reg=new RegExp("(:fp ", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/facepalm.gif' />");

var reg=new RegExp("(:fdbb ", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/302.gif' />");

var reg=new RegExp("(:wtf ", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/wtf.gif' />");

var reg=new RegExp("(:tbollok ", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.netuxi.tk/smileys/tbollok.gif' />");

// @include http://www.shalenity.com/listeSmileys.php*
</div>
</div><br>

<div class="bloc2">
<center><h3>Chats</h3></center>
<div class="texte">
<center><table class="smileys"><tbody><tr class="ligne00"><td class="smiley_bordure"><img src="http://image.noelsha[...]quot;></td>
<td class="smiley_bordure"></td><td class="smiley_bordure"><http://image.noelsha[...]quot;></td>
<td class="smiley_bordure"></td><td class="smiley_bordure"><img src="http://www.netuxi.tk/smileys/tboll.gif"></td>
<td class="smiley_bordure"></td><td class="smiley_bordure"><img src="http://www.netuxi.tk/smileys/death.gif"></td>
<td class="smiley_bordure"></td></tr><tr class="ligne01"><td class="smiley_bordure"><img src="http://www.netuxi.tk/smileys/Dolan.gif"></td>
<td class="smiley_bordure"></td><td class="smiley_bordure"><img src="http://www.netuxi.tk[...]quot;></td>
<td class="smiley_bordure"></td><td class="smiley_bordure"><img src="http://www.netuxi.tk/smileys/302.gif"></td>
<td class="smiley_bordure"></td><td class="smiley_bordure"><img src="http://www.netuxi.tk/smileys/wtf.gif"></td>
<td class="smiley_bordure"></td></tr><tr class="ligne00"><td class="smiley_bordure"><img src="http://www.netuxi.tk[...]quot;></td>

</div>
</div><br>
</div><br>
<br>
</div>
</div>

document.body.innerHTML=chaine; 