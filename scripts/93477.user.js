// ==UserScript==
// @name         YMail IM Fixes
// @namespace    sy1bzbn
// @description  Reduces space usage in left panel by removing contacts' avatar
// @include      *
// ==/UserScript==
// 
if(/mail.yahoo.com\/om\//.test(location.href) && /yimapp/.test(location.href)){
	GM_addStyle('ul.lg li > img{ display:none !important; }');
}
