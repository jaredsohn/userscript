// ==UserScript==
// @name          Freerice
// @namespace     Got Rice?
// @description   Give rice automatically!
// @include       http://freerice.com/*
// @include       http://www.freerice.com/*
// ==/UserScript==

var rannum=Math.floor(Math.random()*4)+1;

var errr = document.getElementById("errorDisplay");
if (errr != null)  
{
history.back();
}
    	
 allDivs = document.evaluate("//div[@class='wordSelection']//noscript",
 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

thisDiv = allDivs.snapshotItem(rannum-1);
newElement = document.createTextNode('-->');
thisDiv.parentNode.insertBefore(newElement, thisDiv);


window.setTimeout(
         function()
         {
         
         //why is it like this? because i am not a professional programmer and submitForm(rannum) doesn't work...
         switch (rannum)
         {
         case 1:
         window.location.href = "javascript:submitForm('1')";
	     break
	     case 2:
	     window.location.href = "javascript:submitForm('2')";
	     break
	     case 3:
      	window.location.href = "javascript:submitForm('3')";
      	break
      	case 4:
    	window.location.href = "javascript:submitForm('4')";
		break
		}

		}
          ,
         1500  //timeout
     ) ;

