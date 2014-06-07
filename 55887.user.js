// ==UserScript==

// @name           BVS Fields

// @namespace      jones

// @include        http://www.animecubed.com/billy/bvs/villagefields.html

// ==/UserScript==
function process_event(event) 
{

	if (event.keyCode==49) // option 1

           {
document.forms.namedItem("search1").wrappedJSObject.submit();
           }

	if (event.keyCode==50) // option 2

           {
document.forms.namedItem("search2").wrappedJSObject.submit();
           }

	if (event.keyCode==51) // option 3

           {
document.forms.namedItem("search3").wrappedJSObject.submit();
           }

	if (event.keyCode==52) // option 4

           {
document.forms.namedItem("search4").wrappedJSObject.submit();
           }


}
window.addEventListener("keyup", process_event, false);