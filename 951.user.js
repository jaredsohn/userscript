// ==UserScript==
// @name           Wiki Smart Edit
// @namespace      http://www.geocities.com/registrylord/wiki-clean-edit.user.js
// @description    keeps page editing from happening when double clicking a text feild (textarea or input).
// @include        *
// @compatability  DOM 2
// ==/UserScript==
//
// We hijack the ondblclick event handler from the body tag
//  it only gets called if..
//    the source tag is not "text"
//    the tag attribute "value" equals ""

var wse_debug // = 1
;

if(document.body.hasAttribute("ondblclick"))
{
	document.ondblclick = editPage;
	if (wse_debug) GM_log("dblclick intercepter loaded");
}

function editPage(e)
{
	if (!e)
	{
		var e = window.event;
		var f = e.srcElement;
	}
	else
		var f = e.target;
	try
	{
		if(f.type == 'text' || f.value)
		{
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();
			if (wse_debug) GM_log("dblclick cancled - " + f.type);
		}
		else
			throw(new Error("Bad"))
	}
	catch(e)
	{
		if (wse_debug)GM_log("dblclick allowed - " + f.type);
	}
}