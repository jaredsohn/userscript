// ==UserScript==
// @name           shoutcast.com - 2008 layout fixes 0.2.1
// @namespace      sc8
// @description    Makes some small adjustments to shoutcast.com's new layout.
// @include        http://shoutcast.com/*
// ==/UserScript==

// defaults
var killthem = ["adbannertop fontstyle","adbannerright","adbannerleft","adbannerbottom","spotLight"]
var FONT_FACTOR = 0.85
var FONT_FAMILY = true

// menu
GM_registerMenuCommand("Set font factor",sc8SetFontFactor);
GM_registerMenuCommand("Toggle Helvetica/Arial",sc8ToggleFont);

// Kill all advertisements. All of 'em. Just in case they add them.
var divs = document.getElementsByTagName("div")
for each (var div in divs) {
	if (div.className && (killthem.indexOf(div.className) != -1))
		div.style.display = "none"
}

// Open  all the details
function sc8OpenDetails() {
	for each (var div in divs) {
		if (div.className && (div.className == "dirMore")) {
			id = div.attributes.getNamedItem("onclick").value.match(/more\(([^)]+)\)/)[1]
			document.getElementById(id+"more").style.display = "none"
			document.getElementById(id).style.display = "block"
		}
	}
}
sc8OpenDetails()
// make sure they stay open
sdp = document.getElementById('StationDirectoryPage')
if (sdp != null) // because this scrips can run multiple times
	sdp.addEventListener("DOMNodeInserted",sc8OpenDetails,false)

// Aahhh... This looks better. :D
document.getElementsByTagName("body")[0].style.backgroundColor = "#222"

// Font size fix for high-DPI monitors, especially on linux.
function sc8FixFonts() {
	fontFactor = GM_getValue("fontFactor",FONT_FACTOR*10000)/10000
	fontFamily = GM_getValue("fontFamily",FONT_FAMILY)
	for (ss=0, sss=document.styleSheets.length; ss < sss; ss++) {
		for (r=0, rs=document.styleSheets[ss].cssRules.length; r < rs; r++) {
			style = document.styleSheets[ss].cssRules[r].style
			//selector = document.styleSheets[ss].cssRules[r].selectorText // DEBUG
			for (p=0, ps=style.length; p < ps; p++) {
				if (style[p] == "font-size") {
					//GM_log(selector+" { font-size: "+style.getPropertyValue(style[p])+" } -> { font-size: "+Math.round(parseInt(style.getPropertyValue(style[p]))*fontFactor)+"pt }") // DEBUG
					style.setProperty(style[p],Math.round(parseInt(style.getPropertyValue(style[p]))*fontFactor)+"pt","")
				} else if (fontFamily && style[p] == "font-family") {
					//GM_log(selector+" { font-family: "+style.getPropertyValue(style[p])+" } ->  { font-family: "+style.getPropertyValue(style[p]).replace("Arial","Helvetica","i")+" }") // DEBUG
					style.setProperty(style[p],style.getPropertyValue(style[p]).replace("Arial","Helvetica","i"),"")
				}
			}
		}
	}
}

// Hook into the theme chooser
/* DOES NOT WORK FOR NOW
window.sc8FixFonts = sc8FixFonts
var attr = null
for each (id in ["skinColorBlack","skinColorBlue","skinColorGrey"]) {
	attr = document.getElementById(id).attributes.getNamedItem("onclick")
	attr.value = attr.value+"; window.sc8FixFonts()";
}*/

// Menu functions
function sc8SetFontFactor() {
	GM_setValue("fontFactor",
		Math.round(prompt("Font Factor (in %)", GM_getValue("fontFactor",FONT_FACTOR)/100)*100)
	)
	location.reload()
}

function sc8ToggleFont() {
	GM_setValue("fontFamily",!GM_getValue("fontFamily",FONT_FAMILY))
	alert("The font will be set to "+(GM_getValue("fontFamily",FONT_FAMILY) ? "Helvetica" : "Arial")+". But you should be able to see that! ;)")
	location.reload()
}

// 0.2: Close the useless sidebar.
isExpanded = document.getElementById("expandButton").attributes.getNamedItem("onclick").value == "javascript:updateKeywordSearchExpCollapseCookie('expand','');"
if (isExpanded) { // because this scrips can run multiple times
	unsafeWindow.updateKeywordSearchExpCollapseCookie("expand","") // Strangely "expand" is the active state, and not the wanted state.
}

sc8FixFonts()