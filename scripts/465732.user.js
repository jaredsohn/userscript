// ==UserScript==
// @name       MH Notifications
// @version    0.3
// @description  Display which notifications are new.
// @include      *forums.marvelheroes.com/profile/notifications
// @include      *forums.marvelheroes.com/profile/notifications*
// @updateURL      http://userscripts.org/scripts/source/465732.meta.js
// @installURL     http://userscripts.org/scripts/source/465732.user.js
// @copyright  2014+, Spedwards
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready( function(){
    if ( $('.MeButton.FlyoutButton .Alert') !== undefined ) {
        /* YOU HAVE A NOTIFICATION */
        var amt = $('.MeButton.FlyoutButton .Alert').text();
        
        $('ul.DataList.Activities.Notifications li.Item.Activity:lt(' + amt + ')').css('background-color', 'lightblue');
    }
});