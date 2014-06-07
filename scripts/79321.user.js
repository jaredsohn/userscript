// ==UserScript==
// @name           AceProject Enable Context Menu
// @namespace      http://namespaces.ziesemer.com/Greasemonkey
// @description    Re-enable the right-click context menus for AceProject.com.
// @include        https://*.aceproject.com/EditTask.asp?*
// @author         Mark A. Ziesemer, www.ziesemer.com
// @version        2010-06-16
// @homepage       http://blogger.ziesemer.com
// ==/UserScript==

(function(){
	 var contextMenuEnable = function(){
			var parent = htmlarea_cancel_event;
			htmlarea_cancel_event = function(event){
						if(event.type=="contextmenu"){
									return true;
						}
						return parent(event);
			}
	 };
	 
	 var script = document.createElement("script");
	 script.type = "application/javascript";
	 script.textContent = "(" + contextMenuEnable + ")();";
	 document.body.appendChild(script);
})();
