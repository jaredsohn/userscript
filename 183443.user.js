// ==UserScript==
// @name       SG Fórum Htmlentity Fixer
// @namespace  http://dodo55.info/
// @version    1.02
// @description  Kijavítja a speciális karakterekből keletkező hibás hsz idézéseket
// @include      http://sg.hu/listazas.php3*
// @include      http://sg.hu/listazas_msg.php3*
// @copyright  2013, Dodo55
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(function(){
    $(".msg-text").each(function(){
        var msg=$(this).html();
        $(this).html(msg.replace(/(?:&amp;|&)<a href="JavaScript.+?(#\d+)<\/a>.+?;/g,'&$1;'));
    });
});