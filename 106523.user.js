// ==UserScript==
// @name           CHEAT
// @namespace      CHEAT
// @include        http://uni2.projet42.org/index.php?action=flotte*
// ==/UserScript==
document.getElementsByTagName('form')[0].innerHTML += '<input type="hidden" name="vaisseau101" value="0.000000000000000000001"> <input type="hidden" name="defense101" value="0.000000000000000000001"> <br/>SAT :<input type="text" name="vaisseau12" value="0.000000000000000000001">';

document.getElementsByTagName('vitesse')[0].value=1;