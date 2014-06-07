// ==UserScript==
// @name          Google Realtime Search Tweak
// @namespace     http://www.LincolnsWorld.com
// @description   Tweaks for maximizing the Real-Time view of Google search, on a Lilliput USB Monitor
// @include       http://www.google.com/*tbs=rltm:1*
// ==/UserScript==

var form = document.forms.namedItem("tsf");
var input = form.elements.namedItem("tbs");
var tbsValue = input.value;

if (tbsValue=="rltm:1")
{
	(function() 
	{
	   var css = "body {\n   overflow: hidden;\n}";
	   if (typeof GM_addStyle != "undefined") 
	   {
		  GM_addStyle(css);
	   }
	   else if (typeof PRO_addStyle != "undefined") 
	   {
		  PRO_addStyle(css);
	   }
	   else if (typeof addStyle != "undefined") 
	   {
		  addStyle(css);
	   }
	   else 
	   {
		  var heads = document.getElementsByTagName("head");
		  if (heads.length > 0) 
		  {
			 var node = document.createElement("style");
			 node.type = "text/css";
			 node.appendChild(document.createTextNode(css));
			 heads[0].appendChild(node); 
		  }
	   }
	})();

	function removeElement(elem)
	{
	   if (elem && elem.parentNode) { elem.parentNode.removeChild(elem); }
	}

	function removeElementsById(ids)
	{
	   var m;
	   for (m = 0; m < ids.length; m++) { removeElement(document.getElementById(ids[m])); }
	}

	function removeElementsByTagAndClass(tagName, classNameArray)
	{
	   var elem;
	   var elems;
	   var c;
	   var i;
	   var k;
	   var removable = false;
	  
	   for (elems = document.getElementsByTagName(tagName), i = 0; i < elems.length; i++)
	   {
		  elem = elems[i];
		  c = elem.getAttribute('class');
		  for (k = 0; k < classNameArray.length; k++) 
		  {
			 if (c == classNameArray[k]) { removeElement(elem); }
		  }
	   }
	}

	function removeElementByTagNameAndAttributes(tagName, attributeMap)
	{
		var elems, attributeName;
		var i, mismatchFound;
		for (elems = document.getElementsByTagName(tagName), i = 0; i < elems.length; i++) 
		{
			mismatchFound = false;
			for (attributeName in attributeMap) 
			{
			

				// alert(	i + 
						// ". Elem: " + elems[i] + "\n"
						// + "Attrib: " + attributeName + "\n"
						// + "Check: " + elems[i].getAttribute(attributeName) +
						// " is = to " + attributeMap[attributeName]
				// );
				if (elems[i].getAttribute(attributeName) != attributeMap[attributeName]) 
				{
					mismatchFound = true;
					break;
				}
				
				if (!mismatchFound && elems[i].parentNode) 
				{
					removeElement(elems[i]);
				}
			}
		}
	}

	for (j = 0; j < 2; j++)
	{
	   removeElementByTagNameAndAttributes('div', {'margin-left':'2em', 'list-style-position':'outside'});
	   removeElementsById(['gbar','guser','ssb','tsf','rth','tbd','sft']);
	   removeElementsByTagAndClass('div', ['gbh']);
	}
}
	
// END FILE