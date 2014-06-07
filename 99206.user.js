// ==UserScript==
// @name           Facebook HTTPS Redirect
// @description    Forces Facebook to use secure https connection.
// @namespace      c1b1.de
// @include        http://*facebook.com*
// ==/UserScript==

if ('http://' == location.href.slice(0,7) && document.getElementById('facebook')){
    document.body.innerHTML = '';
	location.href = location.href.replace(/http:/, 'https:');
}

