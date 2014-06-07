// ==UserScript==
// @name        InoReader Multiline Titles in Column View (LTR)
// @author      Zoltan Wacha
// @description Displays the whole title wrapped in the article list
// @namespace   https://www.inoreader.com/
// @include     http://beta.inoreader.com/*
// @version     0.4
// @grant		GM_addStyle
// ==/UserScript==

GM_addStyle ( "         								\
    .reader_pane_view_style_2 .article_header { 		\
	  white-space: normal;								\
	}													\
	.reader_pane_view_style_2 .article_header_text {	\
	  display: block;									\
	  white-space: normal;								\
	  width: auto !important;							\
	  min-width: 0;										\
	}													\
	.article_header_pane_right {						\
	  margin-left: inherit;								\
	  margin-right: 34px;								\
	  padding-right: 0 !important;						\
	}													\
" );