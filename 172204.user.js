// ==UserScript==
// @name       Dagbladet.no remove Pluss (subscription content)
// @namespace  http://res.no
// @version    1.0
// @description  Removes Dagbladet pluss content and SOL.no ads
// @match      http://www.dagbladet.no/
// @match      http://dagbladet.no/
// @copyright  2013, Inge Brattaas
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==

$(document).ready(function () {
    // remove all articles that requires subscription
    $(".plussRef").each(function(){
        $(this).parent().attr('style','display:none');
    });
    // remove container with subscription articles
    $('.plussbox_container').attr('style', 'display:none');
    
    // remove SOL ads not fixed by adblocker
    $('#solBox').attr('style', 'display:none');
});