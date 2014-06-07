// ==UserScript==
// @name           Strims.pl - NotificationAutoread
// @namespace      strims_notautoread
// @downloadurl    http://userscripts.org/scripts/source/177558.user.js
// @updateurl      http://userscripts.org/scripts/source/177558.meta.js 
// @description    Oznacza powiadomienia jako przeczytane po kliknięciu na ikonkę powiadomienia (jak przed zmianami)
// @include        *strims.pl*
// @version        1.1
// ==/UserScript==

$(function() {
    var notificationsURL = page_template.url_notifications;
    var typ;
    var token = page_template.token;
    var url = 'http://strims.pl' + notificationsURL + '_przeczytaj?typ=' + typ + '&token=' + token;
    var span = $("span.haze");
    $(".messages a.notifications_envelope").click(function(){
        $.getJSON( url, function(e){
            typ = 'domnie';
            if(e.status&&e.status=="OK"){
                $(".messages .notifications_read").addClass("no_display");
                span.addClass( "no_display" );
                document.title = document.title.replace(/\(([0-9]+)\)/, '');
                page_template.messages_new_count = 0;
            }
        });
    });
    $(".notifications a.notifications_envelope").click(function(){
        typ = 'pozostale';
        $.getJSON( url, function(e){
            if(e.status&&e.status=="OK"){
                $(".notifications .notifications_read").addClass("no_display");
                span.addClass( "no_display" );
                document.title = document.title.replace(/\(([0-9]+)\)/, '');
                page_template.notifications_new_count = 0;
            }
        });
    });
});