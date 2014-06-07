//
// ==UserScript==
// @name           Wowhead - Remove the Wowhead Like button! 
// @namespace      http://www.dacyclops.com.au
// @include        *wowhead.com*
// @description    Removes Facebook Like buttons from Wowhead. Because they make our beautiful Wowhead all dirty. Version 2.1
//
// ==/UserScript==


// //old version, run on http://www.facebook.com/plugins/like.php*wowhead.com*
// var docHTML = document.getElementsByTagName("html")[0];
// docHTML.innerHTML = "<html><body> &nbsp; </body></html>";
// //new version hits Wowhead itself...



function getElementsByClassName( strClassName, obj ) {
    if ( obj.className == strClassName ) {
        aryClassElements[aryClassElements.length] = obj;
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i] );
}


var docFacebookDiv = document.getElementsByClassName("blog-entry-facebook-like", document.body);
    for ( var i = 0; i < docFacebookDiv.length; i++ ) {
        docFacebookDiv[i].innerHTML = ' ';
    }