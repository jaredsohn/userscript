// ==UserScript==
// @name        PARANO - Easy Desktop Cleaner
// @namespace   Parano_easy_desktop_cleaner
// @description Permet d'effacer/ranger les messages sans être redirigé
// @grant       none
// @include     http://www.parano.be/v15/desktop.php
// @include     http://www.parano.be/bbs/desktop.php
// @include     http://www.com.euroot.net/v15/desktop.php
// @include     http://www.com.euroot.net/bbs/desktop.php
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     1
// ==/UserScript==

function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

jQuery(document).ready(function(){
    jQuery('a').click(function(e){
        linkClicked = jQuery(this);
        if(linkClicked.attr('href').match(/sauvegarder/gi) ||  linkClicked.attr('href').match(/effacer/gi)){
            e.preventDefault();
            actionLink = getURLParameter(linkClicked.attr('href'), 'action');
            mailId = getURLParameter(linkClicked.attr('href'), 'mail');
            jQuery.get('../v15/messages.php?action=' + actionLink + '&mail=' + mailId, function(data) {
                linkClicked.parent().parent().fadeOut('fast', function(){
                    jQuery(this).delete();
                });
            });
        }
    });
});