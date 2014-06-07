// ==UserScript==
// @name           Forum text style script
// @namespace      Text styling script
// @description    This script preloads some text style bb-codes into the reply box. To edit the codes see the thread in the .co.uk forum for details and edit the first line of the source to meet your needs.
// @include        http://forum.tribalwars.*
// ==/UserScript==

textStyle("2","Kristen ITC","red",false,false);
	
function textStyle (size,font,colour,bold,italic) {
	theFrame = document.getElementsByTagName("iframe");
	theMsg = (theFrame[1])?theFrame[1].contentWindow.document.body.innerHTML:document.vbform.message.value;
	theFrame = (theFrame[1])?theFrame[1].contentWindow.document.body:document.vbform.message;
	var theQuote = "";
	if (theMsg.match(/\[QUOTE/i)) {
		first = theMsg.indexOf("[QUOTE");
		last = theMsg.lastIndexOf("[/QUOTE]");
		theQuote = theMsg.slice(first,last+8);
		theMsg = theMsg.replace(theQuote,"").replace(/^<br>/i,"");
		}
	if(size) size = new Array("[size="+size+"]","[/size]"); else size = new Array("","");
	if(font) font = new Array("[font="+font+"]","[/font]"); else font = new Array("","");
	if(colour) colour = new Array("[color="+colour+"]","[/color]"); else colour = new Array("","");
	if(bold) bold = new Array("[b]","[/b]"); else bold = new Array("","");
	if(italic) italic = new Array("[i]","[/i]"); else italic = new Array("","");
	theOutput = theQuote + size[0] + bold[0] + italic[0] + font[0] + colour[0] +  theMsg + colour[1] + font[1] + italic[1] + bold[1] + size[1];
	if (theFrame.value)theFrame.value = theOutput;
	else theFrame.innerHTML = theOutput;
	}