// ==UserScript==
// @name           met gallery stretcher
// @description    Bypasses the restrictive zoom box for viewing the high res versions of art.
// @namespace      met gallery stretcher
// @include        http://www.metmuseum.org/works_of_art/collection_database/all/*/objectview.aspx*
// ==/UserScript==
document.body.innerHTML=document.body.innerHTML.replace(/regular/g,"zoom");
document.body.innerHTML=document.body.innerHTML.replace(/.jpg\"/g,".jpg\" style=\"position:absolute;\"");