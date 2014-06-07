// ==UserScript==
// @name           Disable Lightbox
// @namespace      1RV34
// @version        1.2
// @description    Disable JavaScript lightboxes. The main purpose for this is to allow quick-saving without JavaScript overriding the browser's behavior. Quick-saving is possible in Chrome by holding Alt and clicking a link.
// @match          http://*/*
// @match          https://*/*
// @copyright      Copyright 2013 1RV34
// @updateURL      https://dl.dropboxusercontent.com/u/25469217/userscripts/disable-lightbox.user.js
// ==/UserScript==

$(document).ready(function ()
{
	$("a[rel=lightbox]").removeAttr("rel").unbind()
});
