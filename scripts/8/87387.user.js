// ==UserScript==
// @name           BVS Spy
// @namespace      Easy Spy
// @include        http://*animecubed.com/billy/bvs/villagespy*
// ==/UserScript==

var myInputs = document.getElementsByTagName("input");
var mySpys = new Array();

for (var i=0; i<myInputs.length; i++) {
	var myElement = myInputs[i];
	if (myElement.getAttribute("name") == "spycheck") {
		mySpys.push(myElement);
	                                                  }
                                      }


for (var i=0; i<mySpys.length;i++)         {
	var mySpy = mySpys[i];
	if (mySpy.disabled == true) {
		mySpy.parentNode.removeChild(mySpy.nextSibling);
		mySpy.parentNode.removeChild(mySpy.nextSibling);
		mySpy.parentNode.removeChild(mySpy.nextSibling);
		mySpy.parentNode.removeChild(mySpy.nextSibling);
		mySpy.parentNode.removeChild(mySpy);
	                            }
                                            }

function process_event(event) 
{

	if (event.keyCode==83) // s to spy
           {
if(document.forms.namedItem("lookinto"))
document.forms.namedItem("lookinto").wrappedJSObject.submit();

if(document.forms.namedItem("spyatt"))
document.forms.namedItem("spyatt").wrappedJSObject.submit();

else if(document.forms.namedItem("spy"))
document.forms.namedItem("spy").wrappedJSObject.submit();

         }
}
window.addEventListener("keyup", process_event, false);