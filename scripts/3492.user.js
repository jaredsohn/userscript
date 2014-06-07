// ==UserScript==
// @name           Focus 'login' box
// @namespace      http://www.ashishagnihotri.info	
// @description    Focuses the 'login' text boxes automatically. Instead of you to have to click on them.
// @include        *
// ==/UserScript==

var textBoxes = document.getElementsByTagName('input');
for(i=0;i<textBoxes.length;i++)
{
	obj = textBoxes[i];
	if(obj.type == 'text')
	{
		if(obj.name == 'login' || obj.name == 'LOGIN')
		{
			obj.focus();
		}
	}

}

