// ==UserScript==
// @name           greyToBlack
// @include        *
// @exclude        https*
// ==/UserScript==

// to see debug statements, set debugEnabled to true and use element id of "DEBUG" to get debug FOR THAT ELEMENT
debugEnabled = false;  // set to true to turn on debug
debugString = "DEBUG";

elementTypes = ['p','div','td','span','li'];

//  grey on black sites:
//  bbc iplayer <153
//  some <=67

//  grey on white sites:
//  facebook >= 128
//  bbc newsbeat >=70
greyShadeThreshold = 152; // the brightness (0-255) at or below which text will become black

greyVariationThreshold = 16;  // max permitted difference between R G and B for a colour to still be called grey


function print(message) {
	if (debugEnabled && debug) {
		alert(message);
	}
}


function isGrey (rgbArray) {
	// return true if approximately grey (max to min variation < 16)
	if (rgbArray == null) return false;
	if (rgbArray[0]-rgbArray[1] > greyVariationThreshold) return false;
	if (rgbArray[1]-rgbArray[0] > greyVariationThreshold) return false;
	if (rgbArray[0]-rgbArray[2] > greyVariationThreshold) return false;
	if (rgbArray[2]-rgbArray[0] > greyVariationThreshold) return false;
	if (rgbArray[1]-rgbArray[2] > greyVariationThreshold) return false;
	if (rgbArray[2]-rgbArray[1] > greyVariationThreshold) return false;

	return true;
}


function extractRgbValues (rgbString) {
	var rgbArray = null;
	if (rgbString.indexOf("rgb(") == 0) {
		from = "rgb(".length; //4 is length of "rgb("
		to   = rgbString.indexOf(",");
		red  = rgbString.substring(from, to);

		from = to+2;
		to   = rgbString.indexOf(",", from);
		green = rgbString.substring(from, to);

		from = to+2;
		to   = rgbString.indexOf(")");
		blue  = rgbString.substring(from, to);

		rgbArray = [red, green, blue];
	}
	// else we have a problem - rgbString is not a string with an rgb colour

	//print("extractRgbValues returns "+rgbArray);
	return rgbArray;
}


function processGreyOnGrey(element, fontShade, bgShade) {
	// if the text is darker than the background make text black
	// if the text is lighter than the background make text white - this is now disabled

	newColour = null;
	print("processGreyOnGrey fontShade="+fontShade+" bgShade="+bgShade);
	if (fontShade < bgShade) {
		if (fontShade > 0) newColour = "black";	
	} else if (fontShade > bgShade) {
		//if (fontShade < 256) newColour = "white";
	} else {
		// background and text are both the same shade of grey!
		newColour = "black";

		// uncomment to make it obvious that grey on grey existed
                //element.style.backgroundColor = "yellow";
	}

	// set the newly decided font colour
	if (newColour != null) {
		element.style.color = newColour;
	}
}


function processTransparentBackground(element, fontShade) {
	newColour = null;
	fontShade = new Number(fontRgbArray[0]);
	print ("processTransparentBackground  grey text on transparent background.  font is shade "+fontShade);
	if (fontShade <= greyShadeThreshold) {
		newColour = "black";	
	} else {
		//newColour = "white";
	}
	// set the newly decided font colour
	if (newColour != null) {
		element.style.color = newColour;
	}
}


function processGreyOnNonGrey(element, fontShade, bgRgbArray) {
	newColour = null;
	print("processGreyOnNonGrey  fontShade="+fontShade+" bgShade="+bgShade);

	// work out if font is light or dark.
	bgShade = (bgRgbArray[0]+bgRgbArray[1]+bgRgbArray[2])/3;
	processGreyOnGrey(element, fontShade, bgShade)
}


function processElement(element, style) {
	print("processElement id="+element.id);
	fontRgbString = style.color;
	print("fontRgbString="+fontRgbString);
	fontRgbArray = extractRgbValues(fontRgbString);
	if (fontRgbArray != null) {
		if (isGrey(fontRgbArray)) {
                        // the font is approximately grey.  Use the red element as the shade
			fontShade = new Number(fontRgbArray[0]);
			print("fontShade is "+fontShade);

			if (fontShade>0 && fontShade<255) {
				// font is not black or white, it's somewhere in between

				// if background some form of grey, including white or black, then
				// if the text is lighter make it white, or if the text is darker make it black

				bgRgbString = style.backgroundColor;
				print("bgColourString is "+bgRgbString);
				bgRgbArray = extractRgbValues(bgRgbString);
				if (bgRgbString=="transparent") {
					processTransparentBackground(element, fontShade);
				} else if (bgRgbArray == null){
					// don't know about the background
				} else if (isGrey(bgRgbArray)) {
					bgShade = new Number(bgRgbArray[0]);
					processGreyOnGrey(element, fontShade, bgShade);
				} else {
					//background is not grey
					print("grey text on non-grey background. text="+fontRgbString+" bg="+bgRgbString);
					processGreyOnNonGrey(element, fontShade, bgRgbArray);
				}

			}  
		} else {
			// non-grey text
		}			
	} else {
		print("null fontRgbArray");
	}

}


debug = false; // internal flag to mark when the current element is having debug statements shown

print("elementTypes length is "+elementTypes.length);
for (var i=0; i<elementTypes.length; i++) {
	var elements = document.body.getElementsByTagName(elementTypes[i]); 
	print("number of "+elementTypes[i]+" elements is "+elements.length);
	for (var j=0; j<elements.length; j++) {
		element = elements[j];
		if (element.id == debugString) {
			debug = true;
			print ("debug enabled for element ID="+element.id);
		}
		style = getComputedStyle(element,'');
		if (style != null) {	
			processElement(element, style);
		} else {
			//element.style.color = "black";
		}
		print ("debug disabled");
		debug = false;
	}	
}
