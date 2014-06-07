// ==UserScript==
// @name           Blablaland
// @version         1.0
// @description    Améliore la réponse rapide sur le forum de blablaland.
// @author 		   matheod
// @include        http://www.blablaland.com/forum/viewtopic.php
// ==/UserScript==

document.getElementById('punwrap').innerHTML=document.getElementById('punwrap').innerHTML.replace('name="preview"',' name="submit" style="color:red;"');
document.getElementById('punwrap').innerHTML=document.getElementById('punwrap').innerHTML.replace('value="Envoyer" accesskey="s" type="submit">','value="Envoyer" accesskey="s" type="submit"> <input type="submit" name="preview" value="Prévisualisation">');
