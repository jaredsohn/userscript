// ==UserScript==
// @name       Rimon pop-up remover
// @namespace  relbraun@gmail.com
// @version    2.0
// @description  removes the pop-up message of Internet Rimon
// @copyright  2013 Ariel Braun
// @include https://*
// @include http://*
// ==/UserScript==

function rimonPopupRemove(){
    var style="display:none!important;";
    try
    {
	_checkssl_popup_div.style.cssText = style;
	_checkssl_popup_div.setAttribute("style", style);
    }
    catch(ew)
    {
        setTimeout(rimonPopupRemove,500);
    }
}
rimonPopupRemove();