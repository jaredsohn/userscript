// ==UserScript==
// @name           Show form elements names
// @namespace      http://kampde.fivemonkeys.net/userscripts
// @description    Shows the name for all form elements
// @include        *
// ==/UserScript==



function KIU_showFormNames()
{
//	alert("running on " + location);
	GM_addStyle(".KIU_showFormName { border: solid 1px #ccb; background-color: #ffb; color: #000; font-size: 9pt; text-decoration: none; text-style: none;}");
	KIU_traverseElements("input");
	KIU_traverseElements("select");
	KIU_traverseElements("textarea");
}

function KIU_traverseElements(elmName)
{
	var elems = document.getElementsByTagName(elmName);
//	alert(elems.length + " <"+elmName+"> elements found.");
	for (var i = 0; i < elems.length; i++)
	{
		var elmInput = elems[i];
		if (elmInput.getAttribute("type") != "hidden")
		{
			var p = KIU_createNameText(elmInput.getAttribute("Name"));
			KIU_insertElement(p, elmInput);
		}
	}
}

function KIU_insertElement(elm, nextTo)
{
	if (nextTo.nextSibling)
	{
		nextTo.parentNode.insertBefore(elm, nextTo.nextSibling);
	} else {
		nextTo.parentNode.appendChild(elm);
	}
}

function KIU_createNameText(txt)
{
	var txtElm;
	if (!txt)
	{
		txtElm = document.createElement("em");
		txtElm.appendChild(document.createTextNode("empty"));
	} else {
		txtElm = document.createTextNode("["+txt+"]");
	}
	var elm = document.createElement("span");
	elm.setAttribute("class", "KIU_showFormName");
	elm.appendChild(txtElm);
	return elm;
}

/* this function by Lenny Domnitser
 * (http://domnit.org/dev/web/foreachframe.js)
*/
function forEachFrame(callback, win) {
  if(!win) {
    win = window;
  }
  if(win.frames.length) {
    for(var c = 0, frame; frame = win.frames[c]; c++) {
      // use setTimeout 0 so exceptions don't kill the loop
      setTimeout(arguments.callee, 0, callback, frame);
    }
  } else {
    callback(win);
  }
}

//GM_registerMenuCommand("Show form elements names", KIU_showFormNames);
GM_registerMenuCommand("Show form elements names",
	function()
	{
		forEachFrame(KIU_showFormNames);
	}
);