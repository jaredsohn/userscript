// ==UserScript==
// @name        InterPals Resize
// @namespace   http://userscripts.org/users/524033
// @description Resize Interpals forum images automatically. 
// @include     http://www.interpals.net/phpBB/*
// @version     0.01
// @author      asdrubalivan
// @grant       GM_getValue
// @grant       GM_setValue
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==

/**
    Script released under public domain
    @author: Asdrúbal Iván Suárez (@asdrubalivan)
*/

window.addEventListener ("load", InterResizeMain, false);
function InterResizeMain()
{
    console.log("Script running");
    $('img').each(function(){
        if($(this).width()>700){
           /*
            * Here you can set the value in pixels you 
            * want as a maximum
            * width
            */
            $(this).width(700);
        }
    });
    console.log("End of function");
}
