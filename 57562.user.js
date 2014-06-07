// ==UserScript==
// @name           Supersize Google News Search Box
// @namespace      http://userscripts.org/users/tim
// @description    Supersize the Google News Search Box
// @include        http://news.google.*
// @include        https://news.google.*
// ==/UserScript==

GM_addStyle( <><![CDATA[

#page-header .search-form input {
	font-family: "Lucida Grande",sans-serif;
	font-size: 14px;
	font-weight: bold;
	height: 34px;
}
#page-header .searchField {
	font-size: 21px !important;
	padding: 0;
	width: 400px !important;
}

]]></>.toString() );
