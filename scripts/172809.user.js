// ==UserScript==
// @name           Funnyjunk Stupid Quick Menu Remover
// @description    Removes stupid quick menu
// @author         posttwo (Post15951)
// @include        *funnyjunk.com*
// @version        1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
 


$(document).ready(function ()
{
        $("div[id='float-quick-menu']").remove();
})
