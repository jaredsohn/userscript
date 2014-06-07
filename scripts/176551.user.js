// ==UserScript==
// @name       Hide the Llama Group
// @namespace  Hide the Llama Group
// @version    0.1
// @description  Hide the Llama Group
// @include      http://leakforums.org*
// @include      http://*.leakforums.org*
// @match      http://leakforums.org*
// @match      http://*.leakforums.org*
// @copyright  2013+, Oscar Sanchez
// @icon http://www.leakforums.org/favicon.ico
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @run-at document-end
// ==/UserScript==

$("head").append('<style>a *[style="color: #FF69B4;"]{color:#222222 !important;}a *[style="color: #FF69B4;"]:visited{color:#222222 !important;}img[src*="llamas.png"]{visibility:hidden}</style>');
if (location.pathname == "/showthread.php")
{
    $("span [style='color: #FF69B4;']").closest("tr").find("img:first").attr("src","/uploads/avatars/avatar_29008.gif?dateline=1377446974");
}

