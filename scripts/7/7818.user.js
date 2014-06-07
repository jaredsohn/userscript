// ==UserScript==
// @name           FreeXXXCenter Link fixer
// @namespace      http://mywebsite.com/myscripts
// @description    Fixes links
// @include        http://freexxxcenter.net/gallery.php*
// ==/UserScript==

as = document.getElementsByTagName("a");
re = /window.status='(.*)';return.*/;
for( i=0; i<as.length; i++){
    atag = as[i];
    if( atag.getAttribute("onmouseover") ) {
        re_result = re.exec(atag.getAttribute("onmouseover"))[1];
        if( re_result ) {
            atag.href = re_result;
        }
    }
}