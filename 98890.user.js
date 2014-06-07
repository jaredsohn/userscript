// ==UserScript==
// @name CNBAForo links
// @description Te cuesta ver los links en los mensajes de cnbaforo? Con esta extensión, podés crear ilimitadas frutas.
// @version 1.41592
// @include http://*.cnbaforo.com.ar/*
// @include http://cnbaforo.com.ar/*
// @match http://www.cnbaforo.com.ar/*
// @match http://cnbaforo.com.ar/*
// ==/UserScript==

/*
Tab width:4
This script is under a CC BY-SA 3.0 license.
You can read more about the license here :http://creativecommons.org/licenses/by-sa/3.0/

contact: joa.dev@live.com 
*/
newStyles = {
	/*
		@function void init(void )
		@description Creates the element that will act as a buffer.
		@return nothing
	*/
	'init': function() {
		newStyles.StylesheetElement = document.createElement('style');
	},
	/*
		@function void(str line)
		@description Appends a style into the buffer.
		@return nothing
	*/
	'append':function(line) {
		newStyles.StylesheetElement.innerHTML+=line;
	},
	/*
		@function void inject() 
		@description Injects the element into the DOM.
		@return nothing
	*/
	'inject':function() {
		document.getElementsByTagName("head")[0].appendChild(newStyles.StylesheetElement);
		
	}
}

newStyles.init();
newStyles.append('h2 a {background-color:#5CAE1C;padding:2px;color:white !important;}');
newStyles.append('div[id^=post_message] a {background-color:#5CAE1C;padding:2px;color:white !important;}');
newStyles.inject();
