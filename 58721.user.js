// ==UserScript==
// @name           Premium Counter
// @namespace      AB
// @include        http://www.conquerclub.com/public.php?mode=scoreboard*
// ==/UserScript==

function getElementsByClassName(oElm, strTagName, strClassName, exact)
{
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
   oElement = arrElements[i];
   if (exact)
   {
    if(oElement.className==strClassName){
    arrReturnElements.push(oElement);
    }
   }
   else
   {
    if(oElement.className.has(strClassName)){
     arrReturnElements.push(oElement);
    }
   }
  }
  return (arrReturnElements)
}


var span = document.createElement('div');
span.innerHTML = "TEST";

var images = document.getElementsByTagName('img');
var fremiumCount = 0;
var premiumCount = 0;

for(var i=0; i<images.length; i++) 
{
if (images[i].src=="http://static.conquerclub.com/transparent.gif" && images[i].className.split(" ")[1]=="rank")
	{
		if (images[i].className.split(" ")[2] == "f")
		{
			fremiumCount++;
		}
		else
		{
			premiumCount++;
		}
	}
}
span.innerHTML = "Fremiums Count: " + fremiumCount + " Premium Count: " + premiumCount;

var container = document.createElement('div');
container.style.border = "1px dotted #565";
container.style.padding = "5px";
container.id = "gfdiv";
container.style.backgroundColor = "#eee";

var search = getElementsByClassName(document,'div','pagination',true);

var mid = document.getElementById('middleColumn');
var inside = getElementsByClassName(mid,'div','inside',true);
var block = inside[0];
block.insertBefore(container,search[0]);
container.appendChild(span);
