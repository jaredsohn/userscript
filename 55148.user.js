// ==UserScript==
// @name           Text Highlighter
// @include        *
// ==/UserScript==

/* Copyright (C) 2009 Volkan Unsal

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

The GPL is also available at http://www.gnu.org/copyleft/gpl.html
*/


(function(){
// Add jQuery
	if(typeof jQuery == 'undefined'){
		var GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
		GM_JQ.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	}
// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined' || typeof unsafeWindow.$ == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
	
// All your GM code must be inside this function
	function letsJQuery() {
		//make sure there is no conflict between jQuery and other libraries
		$.noConflict()
		//notify that jQuery is running...
		
		init();
		//start custom jQuery scripting.
	}
	
	//This boolean value keeps track of highlights on the page.
	
	var hilitesExist;
	function init(){
		var selectionMade = false;
		//#1 Attach an event listener to select and highlight event
		$(document).bind('mouseup',function(e){
			var sel = document.getSelection();          
			if(sel == '') return;
			
			hilite(sel);

			//set flag because a selection has been made;
			selectionMade = true;
		});
		
		//#5 When the selection is cancelled, remove highlighting from textual matches
		$(document).bind('click',function(e){
			//Call the removal function only if there is a selection and highlights on the page
			if(selectionMade == true && hilitesExist == true){
				removeHilite();
			}
		});
	}
	

	function hilite(TEXT){
		if(TEXT.length < 3) return;
		
		//#2 Identify the selected text		
		//#3 Parse the *textual* info in the document
		//#4 Highlight the matched results -- if the selected text is longer than, say, three characters
		
		var COLOR = "yellow";
		var allText = document.evaluate( "//text()[contains(., '" + TEXT + "' )]", document, null, XPathResult. ORDERED_NODE_SNAPSHOT_TYPE , null);
		
		for(var i = 0; i < allText.snapshotLength; i++)
		{
			var cur = allText.snapshotItem(i);
			var par = cur.parentNode;
			var textInd;
			var curName = cur.nodeName;
			do
			{
				var curText = cur.nodeValue;
				//GM_log("curText: " + curText);
				textInd = curText.indexOf(TEXT);
				if(textInd != -1){
					var before = document.createTextNode( curText.substring(0, textInd ) );
					var highlight = $('<span class="highlight" style="background-color:yellow">' + TEXT + '</span>').get(0);
					
					var after = document.createTextNode( curText.substring(textInd + TEXT.length) );
					par.insertBefore(before, cur);
					par.insertBefore(highlight, cur);
					par.insertBefore(after, cur);
					par.removeChild(cur);
					cur = after;
				}
			} while(textInd != -1)
		}	

		if(allText.snapshotLength > 0){
			//flag for later
			hilitesExist = true;
		}		

	}
	
	function removeHilite(){
		
		
		//Find span tags with highlight class. 
		$('span.highlight').each(function(){
				var $$ = $(this),
			//Get the text data. 
				text = $$.text();
				
			//Insert the text data after it.
				$$.after(text);
			//Remove the tag. 
				$$.remove();
			
		});					
					
		//reset the flag back to its original value "false."  No more highlights on the page.
		hilitesExist = false;
		
	}	
})();	