// ==UserScript==
// @name           Remove All CheckBoxes From Orkut Forum
// @version        1.0 Date: 26/05/2010
// @author         Prashant P Patil
// @profile        http://www.orkut.co.in/Profile?uid=17618220612205038709
// @scripturl      
// @Siteurl       https://www.chat32.com/
// @namespace      Remove All CheckBoxes From Orkut Forum
// @description    This scripts Removes All CheckBoxes From Orkut Forum!
// @include        http://*.orkut.*
// ==/UserScript==


function on_ld(){
// window.frames[0].
var i; 
for (i=1;i<=100;i++) { 
	var d = document.getElementsByTagName("input")[i].type;
	if(d == "checkbox")
		{ 
			document.getElementsByTagName("input")[i].type = "hidden"; 
				}
	}

}

document.body.onload = on_ld();

