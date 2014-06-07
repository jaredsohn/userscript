// ==UserScript==
// @id             vsfinder
// @name           Valenth Shiny Finder
// @namespace      Phoobas Scripts
// @author         GrandPhooba, based on J. "TAKUMI" Burtons Valenth Finder
// @description    Now your Valenth pets have nowhere to hide! including shiny finder
// @version        1.00
// @include        http://www.valenth.com/*
// @include        http://valenth.com/*
// ==/UserScript==

GM_addStyle("img.Valenthpet { display: inline-block; height: 110px; width: 85px; border: 1px dashed sienna !important; }");
GM_addStyle("a:visited img.Valenthpet { border: 1px dashed #A88F52 !important; }");

GM_addStyle("img.ValenthShinyPet { display: inline-block; height: 110px; width: 85px; border: 3px solid red !important; }");
GM_addStyle("a:visited img.ValenthShinyPet { border: 1px dashed #A88F52 !important; }");

GM_registerMenuCommand( "Find Shinies", checkPageForShinies);

function analyzeImage(image)
{
	var canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.height = image.height;

	var context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);

	var imageData = context.getImageData(75, 87, 1, 1);
	// Now you can access pixel data from imageData.data.
	// It's a one-dimensional array of RGBA values.
	// Here's an example of how to get a pixel's color at (x,y)

	var index = 0
	var red = imageData.data[index];
	var green = imageData.data[index + 1];
	var blue = imageData.data[index + 2];
	var alpha = imageData.data[index + 3];

	if( red == 229 && blue == 215 && green == 119 )
	{
		petlist[i].className = 'ValenthShinyPet';	
		return true;	
	}
	else
	{
		return false;		
	}
}

function checkPageForShinies()
{
	var shinies = 0;
	for (i in petlist) {
		if (/(valenth\.com)?\/lab\/[0-9]+\.png/.test(petlist[i].src)) {
						
			if(analyzeImage(petlist[i]))
			{
				shinies++;
			}
					  
		}
	}
	alert( shinies + " shinies found");
}

petlist = document.getElementsByTagName("img");
var shinies = 0;
for (i in petlist) {
	if (/(valenth\.com)?\/lab\/[0-9]+\.png/.test(petlist[i].src)) {

		petlist[i].className = 'Valenthpet';

		if (petlist[i].naturalWidth == 0 && petlist[i].naturalHeight == 0) {
			petlist[i].src = petlist[i].src.replace('lab','view');
		}		

	}
}




