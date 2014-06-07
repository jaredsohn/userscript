// ==UserScript==
// @name           PtP auto-redirect .org to .me
// @namespace      http://userscripts.org/users/brownt0wn
// @author         brownt0wn
// @include        http://passthepopcorn.org/*
// @include        http://www.passthepopcorn.org/*
// ==/UserScript==

location.href=window.location.href.replace("http://passthepopcorn.org","http://passthepopcorn.me");