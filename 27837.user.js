// ==UserScript==
// @name           Add Signature
// @description   Adds signatures into your Gmail messages
// @namespace      chetanbhatsp
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==
//
// version 1.0 - Last updated Jun 05, 2008
// Author: Chetan Bhat SP
//
// -------------------------------------------------------------------------------------------------------------
// ---------- Do not edit below this line unless you really know what you are doing  ----------
// -------------------------------------------------------------------------------------------------------------
var elems = Array();
var gmail = null;
var gmail2 = null;
var msg_box = null;
var select_from = null;
var edit_sig_link = false;
function get_new_sig()
{
	elems = gmail2.getActiveViewElement().getElementsByTagName("iframe");
	if(elems.length > 0)
	{
		msg_box = elems[0];
		var sign = prompt("Enter Your Signature");
		if(sign!=null)
		msg_box.contentDocument.body.innerHTML+=sign;
	}
	else
	{
		alert("Could not add the signature!");
	}
}
function draw_edit_sig_link()
{
	try {
		edit_sig_link.parentNode.removeChild(edit_sig_link);
	} catch(e) { }
	edit_sig_link = unsafeWindow.document.createElement('span');
	edit_sig_link.style.textDecoration = 'underline';
	edit_sig_link.style.cursor = 'pointer';
	edit_sig_link.style.fontSize = '13px';
	if(select_from != null)
	select_from.parentNode.appendChild(edit_sig_link);
	edit_sig_link.style.color = '#0000FF';
	edit_sig_link.innerHTML = 'Add Signature';
	edit_sig_link.onclick = get_new_sig;
}
window.addEventListener('load', function()
{
	if (unsafeWindow.gmonkey)
	{							 
		unsafeWindow.gmonkey.load
		( '1.0',
		function(gmail)
		{
			function setViewType()
			{
				if(gmail.getActiveViewType()=='co')
				{
					elems  = gmail.getActiveViewElement().getElementsByTagName('textarea');
					if(elems.length > 0)
					{
						for(x in elems)
						{
							if(elems[x].name == 'to')
							{
								select_from = elems[x];
								draw_edit_sig_link();
								break;
							}
						}
						elems = gmail.getActiveViewElement().getElementsByTagName("iframe");
						if(elems.length > 0)
						msg_box = elems[0];
					}
					else
					{
						alert("Could not add link!");
					}
				}
			}
			gmail2 = gmail;
			gmail.registerViewChangeCallback(setViewType);
			setViewType();
		}
		);
	}
}, true);