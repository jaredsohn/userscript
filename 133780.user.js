// ==UserScript==
// @name           osijek031_gallery navigacija
// @namespace      os031_gallery
// @description    Adds key events to gallery (left key to go 1 image back, right key to to go 1 image forth) 
// @include        http://www.osijek031.com/galerija/displayimage.php*
// ==/UserScript==

// on load, remove some elements
var tableArray = document.getElementsByTagName("table");
var table = tableArray[1];
table.style.display = "none";

var tablePadding = tableArray[0].getElementsByTagName("td")[0];
tablePadding.style.paddingTop = "0";
tableArray[0].style.marginTop = "-18px";
tableArray[8].style.marginTop = 0;
tableArray[6].style.display = "none";

// check for key presses
document.onkeyup = KeyCheck;

function KeyCheck(event)
{
   var KeyID = event.keyCode;
   var posVal = parseInt(window.location.toString().substr(65));
   var albumVal = window.location.toString().substr(57,3);
   var url = "http://www.osijek031.com/galerija/displayimage.php?album="+albumVal+"&pos=";

   switch(KeyID)
   {
      case 37:
		if(posVal==0)
			return false;
		else
			window.location.assign(url+(posVal-1));
        break;
      case 39:
        window.location.assign(url+(posVal+1));
        break;
   }
}