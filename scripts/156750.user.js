// --------------------------------------------------------------------
// ==UserScript==
// @name          Tumblr: Show what's in the grey boxes
// @description   Automatically shows what's in the grey boxes on the tumblr dashboard.  Also enlarges mini-pictures.
// @include       http://*.tumblr.com/*
// @include       https://*.tumblr.com/*
// ==/UserScript==

userScript_showExternal();

function userScript_showExternal()
{
	try
	{

		var children = document.getElementsByClassName('inline_external_image');
	
		for (i=0;i<children.length;i++)
		{
			var child = children[i];

			if (!userScript_hasClass(child,'enlarged'))
			{
				child.setAttribute("original_src", child.src);
				child.src = child.getAttribute("external_src");
				child.className = child.className + " enlarged";
			}
		}

		var children = document.getElementsByClassName('inline_image');
	
		for (i=0;i<children.length;i++)
		{
			var child = children[i];

			child.className = child.className.replace('inline_image','');
		}

	}
	catch(e)
	{
		//alert(e);

	}
}

function userScript_hasClass(element, cls) {
    var r = new RegExp('\\b' + cls + '\\b');
    return r.test(element.className);
}

document.addEventListener("DOMNodeInserted", userScript_showExternal, false);


