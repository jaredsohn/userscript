//
// ==UserScript==
// @name           gotAPI labeler
// @namespace      http://sandgecko.net
// @description    puts labels around the sibling elements of checkboxes.  Public domain.
// @include        http://start.gotapi.com/
//
// ==/UserScript==

new function()
{
	var rid = 0;
	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++)
	{
		var input = inputs[i];
		try
		{
			if(input.getAttribute('type') == 'checkbox')
			{
				var id = input.getAttribute('id');
				if(!id) // gotapi checkboxes don't have IDs so make one
				{
					id = 'labeler_rid_'+rid;
					input.setAttribute('id', id);
					rid++;
					
				}
				var label = input.parentNode.appendChild(document.createElement("label"));
				label.setAttribute("for", id); // this label is for what
				label.setAttribute("id", label.parentNode.getAttribute("id")); // so the popups still work
				var sibling = input;
				var toMove = new Array();
				// find the siblings we need to put inside the label
				while(sibling = sibling.nextSibling)
				{
					if(sibling == label) continue;
					toMove[toMove.length] = sibling;
				}
				// move them into the label
				for(var s = 0; s < toMove.length; s++)
				{
					label.appendChild(input.parentNode.removeChild(toMove[s]));
				}
			}
		}
		catch(e){}
	}
}();