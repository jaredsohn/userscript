// ==UserScript==
// @name        erepdof
// @include     http://*erepublik.com/*/economy/donate-money/*?*
// @include     http://*erepublik.com/*/economy/donate-items/*?*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       unsafeWindow
// ==/UserScript==


function doscript()
{
    var el = Math.round(unsafeWindow.window.location.search.substr(1) * 100) / 100;
    if(!isNaN(el) && el > 0)
    {
        $('#donate_money_0').val(el+'');
        
        if(unsafeWindow.window.location.toString().indexOf('donate-items') > -1)
        {
            var obj = $('input[quality="7"][industry="2"]');
            if(obj.length)
            {
                $(obj).parent().prev().find('input').val(el+'');
            }
        }
    }
}

$(function()
{
    doscript();
});
