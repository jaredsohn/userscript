// ==UserScript==
// @name           Big FB Chat by Raphahxb
// @namespace	   http://userscripts.org/scripts/show/123589
// @editor         Raphahxb (xbox)
// @description    Increase the chat box size!
// @version	   2.0
// ==/UserScript==
	
// CSS to increase chat box size


addStyle( '.fbDockChatTabFlyout {width:263px!important;height:900px!important;} ');
addStyle( 'div.conversationContainer { height:1000px!important;} ');



// Function to add style


function addStyle(css) {

	if (typeof GM_addStyle !== 'undefined') { 
		return GM_addStyle(css); 
		}

	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
		}
}