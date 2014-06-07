// ==UserScript==
// @id             subranking
// @name           Mejora del ranking de Subcultura
// @version        1.0
// @namespace      http://www.puramaldad.com/SubRank
// @author         Willy Galleta
// @description    Mejoras en el ranking de Subcultura.es
// @include        http://subcultura.es/ranking/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @run-at         document-end
// ==/UserScript==
$(function()
{
    $(".cambio").each(function()
    {
        if($(this).attr("title"))
        {
            $(this).before('<div style="position:absolute;left:-55px;width:50px;text-align:right;color:rgb(105,138,5);">'+$(this).attr("title")+'</div>');
        }
    });
});