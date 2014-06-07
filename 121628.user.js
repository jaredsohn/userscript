
// ==UserScript==
// @name           Set Max Font Size
// @description    Sets a maximum font size for page readability
// @version        1.6
// @namespace      TWiG Software Services
// @include	   http://*huffingtonpost.com/*
// ==/UserScript==

//***************************************************************************//
//***                                                                     ***//
//*** Sets maximum annoying font size on a web page                       ***//
//***                                                                     ***//
//*** Currently set for Huffington Post... change to where you want it    ***//
//***                                                                     ***//
//***************************************************************************//

var maxFont   = 30;     // set to your threshold of pain
var debugFlag = 0;	// set to 1 to receive summary alert

var p         = document.getElementsByTagName('*');

var s	      = 0;	// each style element fontsize
var sElem     = 0;	// debug summary count of elements changed
var sData     = "";	// debug summary each element changed

for(i=0; i<p.length; i++)
{

   if(p[i].style.fontSize)
   {
      s = parseInt(p[i].style.fontSize.replace("px",""));

      if (s > maxFont)
      {
	 sElem++;
	 sData += "Element Font Downsized: " + s + '\n';

         p[i].style.fontSize = maxFont + "px";
      }
   }

}

if (debugFlag) {alert ("Summary: " + '\n' + '\n' + "Changed Elements: " + sElem + '\n' + sData);}



