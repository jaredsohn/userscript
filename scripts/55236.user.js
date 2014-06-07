// ==UserScript==
// @name           Facebook - Common Error Fixer
// @namespace      Facebook
// @description    Detects the common error page and goes back to the previous page
// @include        *http://www.facebook.com/common/error.html*
// ==/UserScript==
if (document.URL == "http://www.facebook.com/common/error.html") {
	history.go(-1);
}
