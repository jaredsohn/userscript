// ==UserScript==
// @name			Pixelgrid Quick Fill
// @namespace		http://www.ryannauman.com/
// @description		Use this script to quickly fill a block an entire color on Pixelgrid.de.
// @include		http://www.pixelgrid.de/editgrid.php?*
// ==/UserScript==
var buttons = document.getElementsByTagName('input');
var tehbutton = '';

for (var i=0; i < buttons.length; i++)
{
	if (buttons[i].value == 'Save Image!')
		tehbutton = buttons[i];
}

if (tehbutton)
{
	// Build new button and replace old
	var newbutton = document.createElement("input");
		newbutton.type = 'submit';
		newbutton.value = 'Quick Fill';
		newbutton.addEventListener("click", createColorBlock, true);
	tehbutton.parentNode.insertBefore(newbutton, tehbutton.nextSibling);
	
	// Build new div with directions
	var newdiv = document.createElement("div");
	newdiv.innerHTML = '<div style="margin: 5px 0 5px 0;"><span>' + 
		'<strong>Quick Fill:</strong> ' + 
		'Select the color from the palette you want the ' + 
		'entire square to be filled with.' + 
		'</span></div>';
	newbutton.parentNode.insertBefore(newdiv, newbutton);	
}

function createColorBlock()
{
	// Build gridData
	var choosenColor = document.getElementById('choosenColor');
	var pngString = '';
	for (var i = 0; i < 16; i++)
	{
		for (var j = 0; j < 16; j++)
		{
			pngString = pngString + choosenColor.value + ";";
		}
	}
	document.getElementById("gridData").value = pngString;
}