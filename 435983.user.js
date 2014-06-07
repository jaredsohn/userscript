// ==UserScript==
// @name       NO
// @namespace  http://ticketmastersolution.blogspot.in
// @version    0.1
// @description  enter something useful
// @match      http://tampermonkey.net/index.php?version=3.6.3737.80&ext=dhdg&updated=true
// @include    https://www.onlinesbi.com/*
// @include    https://www.onlinesbh.com/*
// @exclude    https://www.irctc.co.in/*
// @copyright  2012+, You
// ==/UserScript==
javascript:function E(){ f0=document.forms[0];f0['confirmButton'].click(); }E()