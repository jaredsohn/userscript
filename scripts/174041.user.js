// ==UserScript==
// @name          Remove sidebar
// @description   Removes sidebar
// @include       http://www.reddit.com/*
// ==/UserScript==

GM_addStyle ( "                                           \
    .content {                                            \
        margin-left: 0; 								  \
    }                                                     \
	.listing-chooser initialized {		\
		display: none;					\
	}									\
" );

alert(1);