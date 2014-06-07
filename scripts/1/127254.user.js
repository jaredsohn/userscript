// ==UserScript==
// @name           4wdaction Forum Upgrade
// @namespace      cb4wda
// @description    Updates the link colour to assist colour blind users
// @include        http://www.4wdaction.com.au/forum/*
// ==/UserScript==



GM_addStyle( '\
#phpbbforum-page a:link, #phpbbforum-page a:visited {color: #cc2200 !important; font-weight: normal;} \
' );