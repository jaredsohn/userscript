//#deviantart_special_sign_fix.user.js
// ==UserScript==
// @name          Deviant Art - Special Signs fix.
// @author        Motty Katan
// @namespace     http://moppy.4free.co.il
// @description   DeviantArt has bad title/textarea control everywhere. Accents/different languages are html encoded and hence unreadable &amp123; ==> } this fix it. This is hugely useful when you are using notes/editing journal/deviation and more 14-09-2007 Motty Katan. last updated 25-09-2007 full view bug fix 
// @include       http://*.deviantart.com/*
// ==/UserScript==
//Change Log:
//20-09-2007 added &#233<img src="http://e.deviantart.com/emoticons/w/winkrazz.gif" width="15" height="15" alt=";p" title="Wink/Razz" />ee => epee bug
//           where ;P smilies appear inside the text.
//25-09-2007 full view bug fixed, no more going through all the innerHTML and replacing everything
//           now using a xpath to exclude script tags and select only elements with text

//create a temp div as a html parser
var oTempDiv = document.createElement("DIV");
function htmlDecode(s){ 
  //handle textarea/editable divs that contains text straight from db
  //replace &amp; to &
  oTempDiv.innerHTML = s.replace(/&amp;/,"&");
  //return the parsed string.
  return oTempDiv.innerHTML;
}
//all nodes that contains text but they are not a script tag which are inside the body.
//this fixes a bug that zoomIn/zoomOut of the thumbnail of the deviation(AKA full view)
var aResultLinks = document.evaluate( "//body//*[text() and not(self::script)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for (var n = 0; n < aResultLinks.snapshotLength; n++)
{
	oElement = aResultLinks.snapshotItem(n);
  sText = oElement.innerHTML;
  
  sText2 = sText.replace(/&amp;\#([0-9]+);/g,htmlDecode);
  
  //handle display text in da straight from db with ;P smily bug.
  //search for a letter(non space/number/break line character) followed by the ;p deviant art smily
  //replace it with the letter p.  
  sText2 = sText2.replace(/([^\s\d\r\n])<img.*title=\"Wink\/Razz\"[^>]*>/g,"$1p");
  
  //only if there was a change
  if (sText!=sText2){
    oElement.innerHTML = sText2;
  }	
}
