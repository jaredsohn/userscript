// ==UserScript==
// @name       TF2R line breaks
// @version    1.0
// @description  Allows you to use line breaks in descriptions and user profile comments on TF2R
// @include		 http://tf2r.com/k*.html
// @include		 http://tf2r.com/user/*
// @copyright  Sk8erOfBodom
// ==/UserScript==

if ( /http:\/\/tf2r\.com\/k[0-9a-z]+\.html/.test(location.href) )
{
    $('#entry').parent().parent().parent().css('width', '100%');
    var desc = $('#entry').parent().parent().find('td').get(1);
    var desctext = $(desc).html();
    desctext = desctext.replace( /\r?\n|\n?\r/g, '<br/>' );
    $(desc).html(desctext);
}
else
{
    $('.userfeed .userfeedpost .ufmes').each(function() 
                                             {
                                                 var messtext = $(this).html();
                                                 messtext = messtext.replace( /\r?\n|\n?\r/g, '<br/>&nbsp;' );
                                                 $(this).html(messtext);
                                             });
}