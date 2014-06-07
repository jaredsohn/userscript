// ==UserScript==
// @name          HTTPSFacebook
// @author        Linzx
// @description	  Use facebook with HTTPS safe connection
// @include       http://facebook.com/
// @include       http://www.facebook.com/
// @include       http://facebook.com/login*
// @include       http://www.facebook.com/login*
// ==/UserScript==

function HTTPSFacebook()
    {
        location.href = location.href.replace(/http\:/, 'https:');
    }