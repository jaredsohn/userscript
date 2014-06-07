// ==UserScript==
// @name           [Social Media] Character Counter
// @namespace      http://jonsdesigns.com/
// @description    Character Counter for the Social Media Asstistants
// @include        http*://www.conquerclub.com/forum/posting.php?*f=586*
// ==/UserScript==

var field = document.getElementById("message");
var charcounter = document.createElement("p");
charcounter.innerHTML = 'Your message contains ' + '<b id="charcount">' + field.value.length + '</b>' + ' characters.';
document.getElementById("message-box").insertBefore(charcounter, document.getElementById("message"));
var charcount = document.getElementById("charcount");

window.setInterval (update_counter, 1000);

function update_counter ()
{
  charcount.innerHTML = field.value.length;
}