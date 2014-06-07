// ==UserScript==
// @name           Phase Killing
// @namespace      Killing
// @include        http://*animecubed.com/billy/bvs/villager00t*
// ==/UserScript==

function process_event(event) 
{

	if (event.keyCode==80) // p to push
           {
if(document.forms.namedItem("rootfight"))
document.forms.namedItem("rootfight").wrappedJSObject.submit();
           }

}
window.addEventListener("keyup", process_event, false);