// ==UserScript==
// @name           Banditi chat fucker
// @namespace      my
// @description    Fucked banditi
// @include        http://www.banditi.nl/index.php?a=mod_other_flashchat
// ==/UserScript==
//b=prompt("Geef de code:");
document.getElementsByTagName("center")[0].innerHTML='<iframe id="details" src="http://ssmm987.eu.pn/banditi.php" frameborder="0" scrolling="no" ></iframe><form><input type="text" id="a"><input type="submit" onclick="document.getElementsByTagName(&quot;center&quot;)[0].innerHTML=\'<div style=&quot;width: 580px; background-color: #e4dcc5;&quot;>	<embed wmode=&quot;transparent&quot; id=&quot;flashchat&quot; src=&quot;\'+document.getElementById(\'a\').value+\'&quot; width=&quot;580&quot; height=&quot;440&quot; allowscriptaccess=&quot;always&quot; allowfullscreen=&quot;true&quot;></div><div id=&quot;chat_open&quot; style=&quot;display: none;&quot;>De chat is in een ander venster geopend		</div>\';return false;"></form>';