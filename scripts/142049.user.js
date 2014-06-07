// ==UserScript==
// @name           UF Outlook Web Access - No Day Headers
// @description    Removes the day headers between emails
// @include        https://mail.ufl.edu/owa/*
// @include        https://mail.housing.ufl.edu/owa/*
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.2
// ==/UserScript==

// Message View
GM_addStyle(".gbIL .gh {display: none !important;}");
GM_addStyle("#divViewport {right: 0 !important; overflow-y: scroll;}");
GM_addStyle("#divScrollbar {width: 0 !important; display: none !important;}");