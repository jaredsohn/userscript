// ==UserScript==
// @name       FastPM
// @namespace  http://allise.net/
// @version    0.1
// @description  Introduce l'icona per l'invio dei messaggi privati dentro ai post scritti dagli utenti
// @match      http://community.eu.playstation.com/*
// @copyright  2012+, Lady R
// ==/UserScript==

$("head").append("<style type='text/css'>#lia-body .lia-content .lia-panel-message .lia-message-statistics { padding-top: 20px; } .fez-fastmp { font-weight: bold; cursor: pointer; }</style>");


$('.lia-message-author-avatar').append('<span class="fez-fastmp">Invia MP</span>');
    
$('.fez-fastmp').live( "click", function() { 
    
    var mp = $(this).parents('.lia-message-author-avatar').find('a.UserAvatar').attr('href');
    mp = mp.replace("user/viewprofilepage/user-id", "notes/privatenotespage/tab/compose/note-to-user-id");
    window.location = mp;
    
});
