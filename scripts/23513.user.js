// ==UserScript==
// @name           SearchSelected
// @namespace      http://jldupont.com
// @include        http://*/*
// @description	   Points the current page to Google's Search results for selected text. This action is initiated upon hitting "alt c".
// ==/UserScript==
/**
 * @author Jean-Lou Dupont (http://jldupont.com)
 * @example Navigate to a page, select some text using the mouse and then hit "alt c"
 */
/**
 * Declare our namespace
 */
function jld(){
}

/**
 * Methods
 */
jld.prototype = {

	/**
	 * Points the current page to Google Search results for the selected text.
	 */
	search: function(){
		document.location.href = "http://www.google.com/search?q="+this.getSelectedText();
	},

	/**
	 * Returns the currently selected text.
	 */
	getSelectedText: function(){
		return window.getSelection();
	},

	/**
	 * keypress handler
	 * EventListener interface
	 * 
	 * @param {Object} e
	 */
	handleEvent: function(event){

	     // Get the key pressed in string format
	     var k = String.fromCharCode( event.which );
	
		// greasemonkey only runs in Mozilla... 
		// don't bother with cross-browser issues!	 
		 if ( k == "c" && event.altKey )
			 	this.search();
	},

	/**
	 * init: just hooks up the required event listener
	 */
	init: function(){
		document.addEventListener( "keypress",	this, true );
	},	

}; //end class

// create an instance of 'jld'
var jldObj = new jld;

jldObj.init();