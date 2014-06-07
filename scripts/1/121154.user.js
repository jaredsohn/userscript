// ==UserScript==
// @name           Facebook RightBar Hider
// @namespace      http://joseluismartin.info
// @description    Remove Right Bar and give the extra space to the center
// @include        http://www.facebook.com/*
// @run-at         document-end
// ==/UserScript==

var style = " #rightCol { display: none !important; width: 0px !important; }" +
	    " .uiUfi { width: 594px !important; }" +
            " #contentArea { width: 755px !important; }" +
	    " #MessagingMainContent { width: 755px !important; }" +
            " #MessagingNetegoWrapper { display: none !important; }" +
	    " .MessagingMessage .content { width: 594px !important; }" +
            " #MessagingShelf { width: 594px !important; }" + 
	    " .MessagingComposerForm { max-width: 594px !important; }" +
	    " #MessagingInlineComposer textarea { max-width: 542px !important }" +
            " #MessagingComposerOptions { max-width: 594px !important; }" +
            " .note_content { width: 594px !important; }";


GM_addStyle(style);


