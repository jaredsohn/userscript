// ==UserScript==
// @name           Unofficial Weber State University Scrollbar Fix
// @description    This fixes the problem during class registration where it is not possible to scroll up or down the page
// @version        1.0
// ==/UserScript==
@namespace url(http://www.w3.org/1999/xhtml);



@-moz-document domain("weber.edu") {

   body {overflow: auto!important;}

}