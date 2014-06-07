// ==UserScript==
// @name           [phpBB] Signature Character Counter
// @namespace      http://jonsdesigns.com/
// @description    Counts characters in your phpBB Signature
// @include        */ucp.php?i=profile&mode=signature*
// ==/UserScript==

var field = document.getElementById("signature");
var charcounter = document.createElement("p");
charcounter.innerHTML = 'Your message contains ' + '<b id="charcount">' + field.value.length + '</b>' + ' characters.';
document.getElementById("message-box").insertBefore(charcounter, document.getElementById("signature"));
var charcount = document.getElementById("charcount");

window.setInterval (update_counter, 1000);

function update_counter ()
{
  charcount.innerHTML = field.value.length;
}
