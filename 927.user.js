/*
   This Greasemonkey userscript is designed to remove unnecessary TV channels
   from the TV by Grid feature of eurotv.com.

   To use this extension, just update the badChannels array with the channels 
   you don't want to see.

   Author: Eric Darchis <eric_GM@darchis.be>
   The selectNodes function comes from Patrick Cavit, pcavit@gmail.com
   License: GNU GPL
   Version 1.0

   Changelog:
   1.0: First version
*/

// ==UserScript==
// @name          EuroTV Grid Reducer
// @namespace     http://www.darchis.be/eric/
// @description	  Removes unwanted channels from the EuroTV.com TV by Grid
// @include       http://*.eurotv.com/scripts/grid*
// ==/UserScript==

(function() 
{
	var badChannels= new Array('AB 3', 'AB 4', 'ARTE', 'BE CINE', 'BE 1', 'BE SPORT', 'Eurosport', 'Liberty', 'MCM', 'Plug', 'Teletoon');

	function selectNodes(doc, context, xpath) 
	{
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) 
	   {
	      result[x] = nodes.snapshotItem(x);
	   }
	   
	   return result;
	}

	var toDel= new Array();
	
	doc = window._content.document;
	
   	var channels = selectNodes(doc, doc.body, "//TD/FONT/B");

	for (var x=0; x<channels.length; x++)
	{
		for (var i=0; i<badChannels.length; i++) {
			if (channels[x].textContent.indexOf(badChannels[i]) != -1) {
				toDel[toDel.length]=channels[x].parentNode.parentNode.parentNode; // TR level
			}
		}
	}

	for (var i=0; i<toDel.length; i++) {
		toDel[i].parentNode.removeChild(toDel[i]);
	}
})();

