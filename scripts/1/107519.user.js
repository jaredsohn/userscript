// ==UserScript==
// @name           Facebook - Sidebar Disabler
// @namespace      Facebook - Sidebar Disabler
// @description    Facebook - Sidebar Disabler
// @include        http*://www.facebook.com/*
// ==/UserScript==

catchSidebar();
function catchSidebar(){
	if(!unsafeWindow.ChatSidebar){
	//if the chatsidebar hasn't loaded yet
		setTimeout(catchSidebar,1);
		//wait until it has
	}else{
	//if the chat sidebar has loaded
		unsafeWindow.ChatSidebar.enable = function(){
		//hijack the chatsidebar enable function so that it isn't enabled on page load
			return false;
		}
		unsafeWindow.ChatSidebar.isViewportCapable = function(){
		//hijack the viewportcapable function (basically, this is a function that determines if the screen is large enough to display the sidebar)
			return false;
			//all we do, is return false, tricking facebook into thinking our window is too small for the sidebar, gf facebook :)
		}
		
		if(unsafeWindow.ChatSidebar.isEnabled()){
			unsafeWindow.ChatSidebar.disable();
		}
	}
}