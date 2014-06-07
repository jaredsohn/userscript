// ==UserScript==
// @name AttendsUneHeureAvantDeLire
// @namespace InGame
// @author Odul
// @date 22/11/2013
// @version 0.5
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Forum/*
// @exclude http://www.dreadcast.net/Forum/2-691-ami-du-flood-*
// @compat Firefox, Chrome
// ==/UserScript==


var months = {
    'Janvier' : '0',
    'Fevrier' : '1',
    'Mars' : '2',
    'Avril' : '3',
    'Mai' : '4',
    'Juin' : '5',
    'Juillet' : '6',
    'Août' : '7',
    'Septembre' : '8',
    'Octobre' : '9',
    'Novembre' : '10',
    'Décembre' : '11'
}


wait1hour();

function wait1hour() {
    if($("#header_forum").text().contains("Forum Hors Sujet") || $("#header_sujet").text().contains("Forum Hors Sujet") || $("#header_forum").text().contains("Forum Général") || $("#header_sujet").text().contains("Forum Général"))
    {
       $("#liste_messages .description").each(function(){
            var textdate = $(this).text().substring(12);
            textdate = textdate.substring(0, textdate.indexOf(":")+3).trim().split(" ");
            var heure = textdate[4].split(":");
            var date = new Date( parseInt(textdate[2],10),  parseInt(months[textdate[1]],10), parseInt(textdate[0],10), heure[0], heure[1]);
            
            var diff = new Number(new Date() - date);
            if(diff < 3600000)
            {
                var id = $(this).parent().attr('id');
                $('#'+id).hide();
                id = id.substring(id.indexOf('_')+1);
                $('#message_'+id).hide();
            }
      });
    }

setTimeout(wait1hour,1000)
};