// ==UserScript==
// @name           I'm epileptic (Meebo.com)
// @author         Yoan Blanc <yoan at dosimple dot ch>
// @namespace      http://yoan.dosimple.ch/
// @description    Don't make the title blinking (and other tweaks)
// @include        http://www*.meebo.com/*
// @include        https://www*.meebo.com/*
// ==/UserScript==

// no more blinking:
if("gBrowser" in unsafeWindow)
	unsafeWindow.gBrowser.onFlashTitle = function(win) {
		// the focus is back, run and hide.
		if(!win.m_flash || win.m_focus){
			win.m_flashIndex = 0;
			win.m_flash=false;
			
			win.document.title = win.m_title;
		}
		// new message! let's count them
		else if (win.m_flashMessage) {
			win.m_flashIndex++;
			win.m_flashMessage = "";
			
			win.document.title = "(" + win.m_flashIndex + ") " + win.m_title;
		}
	};

// Hidden gems:
// 	uncomment to use, thanks for reading a script before
// 	installing it. You're a good guy, safety first.
//

// I've already subscribed to your blog in my RSS reader
//
//if("gWindowMgr" in unsafeWindow)
//	unsafeWindow.gWindowMgr.createWelcomeWindow = function(){};

// and I don't like that pane at the bottom cause I
// simply don't use it in a daily basis.
// 
//if("gGallery" in unsafeWindow)
//	unsafeWindow.gGallery.setVisibility(false);

// kthxbaiwtfbbq ;-)
