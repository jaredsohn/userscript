// ==UserScript==
// @name           facebook sarcasm
// @namespace      www.kvasbo.no
// @include        *facebook*
// ==/UserScript==

if (document.getElementById("u_0_n").innerHTML != "post your awesome status here"){
    document.getElementById("u_0_n").innerHTML="post your awesome status here";
}


