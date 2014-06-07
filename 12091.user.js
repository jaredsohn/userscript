// ==UserScript==
// @name           Contrast Incrementor
// @description    Some Web 2.0 websites use light gray text on a white background which is not very legible. This script increases the contrast of texts on hard to read websites. Doesn't work on all websites and probably has bugs. Improve it as you like. 
// @namespace      http://www.perikosmoy.de/
// ==/UserScript==
//
// Author: Sven Dieckert
// License: Creative Commons Germany 3.0 BY-NC (http://creativecommons.org/licenses/by-nc/3.0/deed.de)
//

//compute contrast ratio according to formula at w3.org
//http://www.w3.org/TR/2007/WD-WCAG20-20070517/Overview.html#relativeluminancedef
//INPUT		: 	inR, inG, inB : RGB values in 8bit format (0-255)
//OUTPUT	:	relative luminance
function computeRelativeLuminance(inR, inG, inB){
	var RsRGB = inR/255;
	var GsRGB = inG/255;
	var BsRGB = inB/255;

	var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow((RsRGB+0.055)/1.055, 2.4);
	var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow((GsRGB+0.055)/1.055, 2.4);
	var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow((BsRGB+0.055)/1.055, 2.4);

	return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

//traverse bottom-up through DOM tree
//INPUT		:	DOM node
//OUTPUT	:	DOM node with a background color or root node
function getParent(e){
	if (e.parentNode == null || document.defaultView.getComputedStyle(e, '').backgroundColor != "transparent" ) {
		return e;
	}
	else {
		return getParent(e.parentNode);
	}
}

//checks contrast and increases it if necessary
function checkContrast(tag){

	var tags = document.getElementsByTagName(tag);

	for (var i = 0; i < tags.length; i++) {
		if ( tags[i].hasChildNodes()
			&& tags[i].firstChild.data != null ) { 
		
			//get textcolor of data inside this tag
			var textcolor = document.defaultView.getComputedStyle(tags[i], '').color;
	
			//recursively get background color of data inside this tag
			var backcolor = document.defaultView.getComputedStyle(getParent(tags[i]), '').backgroundColor;
			
			//remove "rgb(..." and "...)" via regular expressions
			var textcolors = textcolor.split(", ");
			textcolors[0] = textcolors[0].replace(/rgb\(/, "");
			textcolors[2] = textcolors[2].replace(/\)/, "");
			
			var backcolors = backcolor.split(", ");
			backcolors[0] = backcolors[0].replace(/rgb\(/, "");
			backcolors[2] = backcolors[2].replace(/\)/, "");
			
			//convert colors to integers for calculations
			textcolors[0] = parseInt(textcolors[0]);
			textcolors[1] = parseInt(textcolors[1]);
			textcolors[2] = parseInt(textcolors[2]);
			
			backcolors[0] = parseInt(backcolors[0]);
			backcolors[1] = parseInt(backcolors[1]);
			backcolors[2] = parseInt(backcolors[2]);
			
			//compute contrast ratio according to formula at
			//http://www.w3.org/TR/UNDERSTANDING-WCAG20/Overview.html#visual-audio-contrast-contrast
			
			var backL = computeRelativeLuminance(backcolors[0],backcolors[1],backcolors[2]);
			var textL = computeRelativeLuminance(textcolors[0],textcolors[1],textcolors[2]);
			var contrastRatio = 0;
			var lightOnDark = false;
			
			//different formulas depending on polarisation are needed
			if (backL < textL) { //if negative text (light text on dark background)
				contrastRatio = (textL + 0.05) / ( backL + 0.05);
				lightOnDark = true;
			}
			else { //positive text (dark text on light background)
				contrastRatio = (backL + 0.05) / ( textL + 0.05);
			}
			
			//for debugging purposes
			if (debug) { 
				tags[i].style.backgroundColor = "red"; 
				alert(tag + "\n" + tags[i].firstChild.data + "\n" + contrastRatio); 
				tags[i].style.backgroundColor = "white"; 				
			}
			
			//w3.org says at minimum a contrast of 5:1 is desired... 
			//this is not enough according to research in cognitive psychology and ergonomics
			//(see e.g. research done by Ziefle)
			//I chose 12:1 as minimum contrast
			if (contrastRatio < 12) { //not readable --> increase contrast
				
				//check for text color:
				//if gray text on light background, switch to black text
				//if gray text on dark background, switch to white text
				if ( Math.abs(textcolors[0]-textcolors[1]) //test if gray
					+ Math.abs(textcolors[1]-textcolors[2]) 
					+ Math.abs(textcolors[2]-textcolors[0]) < 10 ) {
					if (lightOnDark) {
						tags[i].style.color = "#FFF!important";
						if (debug) { tags[i].style.backgroundColor = "red!important"; }
					}
					else {
						tags[i].style.color = "#000!important";
						if (debug) { tags[i].style.backgroundColor = "red!important"; }
					}
				}
				else 
				if (textcolors[0] < 120 && textcolors[1] < 170 && textcolors[2] > 120) { //blue
					tags[i].style.color = (lightOnDark) ? "white!important": "blue!important";
					if (debug) { tags[i].style.backgroundColor = "red!important"; }
				}
				else if (textcolors[0] > 100 && textcolors[1] < 120 && textcolors[2] < 120) { //red
					tags[i].style.color = (lightOnDark) ? "white!important" : "#EF0020!important";
					if (debug) { tags[i].style.backgroundColor = "red!important"; }
				}
				else if (textcolors[0] > 60 && textcolors[1] < 90 && textcolors[2] > 90) { //purple
					tags[i].style.color = (lightOnDark) ? "white!important" : "purple!important";
					if (debug) { tags[i].style.backgroundColor = "red!important"; }
				}
				else if (textcolors[0] < 190 && textcolors[1] > 10 && textcolors[2] < 90) { //green
					tags[i].style.color = (lightOnDark) ? "white!important" : "#green!important";
					if (debug) { tags[i].style.backgroundColor = "red!important"; }
				}
				else if (textcolors[0] > 200 && textcolors[1] < 180 && textcolors[1] > 80 && textcolors[2] < 80) { //orange
					tags[i].style.color = (lightOnDark) ? "black!important" :"#BF3F00!important";
					tags[i].style.backgroundColor = "white!important";
					if (debug) { tags[i].style.backgroundColor = "red!important"; }
				}
				else { //all other colors
					if (lightOnDark) {
						tags[i].style.color = "#FFF!important";
						tags[i].style.backgroundColor = "#000!important";
						if (debug) { tags[i].style.backgroundColor = "red!important"; }
					}
					else {
						tags[i].style.color = "#000!important";
						tags[i].style.backgroundColor = "#FFF!important";
						if (debug) { tags[i].style.backgroundColor = "red!important"; }
					}
				}
			}
		}
	}
}
//adds underscores to all links (anchor tags <a href...>)
//this is done because sometimes link colors aren't preserved
//but if you underline these links, you can still recognize them as links
function addUnderscores(){ 
	var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "a { text-decoration:underline!important; border-bottom:none!important }";
    head.appendChild(style);
}

var debug = false;

//MAIN
//checks contrast for the tags listed below
checkContrast("a");
checkContrast("p");
checkContrast("div");
checkContrast("li");
checkContrast("strong");
checkContrast("b");
checkContrast("h1");
checkContrast("h2");
checkContrast("h3");
checkContrast("blockquote");
checkContrast("span");
checkContrast("small");

//addUnderscores();