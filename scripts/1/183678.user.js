// ==UserScript==
// @name        Time To Say Goodbye
// @namespace   hiszilla
// @description Hiszilla Tickets werden anhand des letzten Eintrages überprüft. Sollten Tickes größer 14 oder 22 Tage sein, wird ein Warnhinweis angezeigt.
// @include     https://hiszilla.his.de/*
// @include     http://wikint.his.de/mediawiki/index.php/*/Anfragen_in_Bearbeitung
// @version     1.03
// @grant       none
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

// Variablen für Benutzer
var daystosaygodbye = 14;
var daystosaybyebye = 22;
var textKundeErinnerung = "Bitte überprüfe ob das Ticket geschlossen werden kann, oder sende an den Kunden eine Erinnerungsmail.";
var textKundeSchließen = "Der Kunde hat auf die letzte Erinnerungsmail NICHT reagiert. Du kannst das Ticket schließen.";
var textFrage = "\n"+"Soll die Standformulierung eingefügt werden?";
var textdaysToSayGoodbye = 'wir erlauben uns, Sie darauf hinzuweisen, dass wir zu dieser HISzilla-Anfrage noch eine Rückmeldung von Ihnen erwarten. Wir möchten Sie bitten, den Status der Anfrage auf "Erledigt" zu setzen, falls Sie keine weitere Supportunterstützung in dieser Angelegenheit benötigen.Wir gehen davon aus, dass sich Ihr Anliegen erledigt hat, falls wir bis zur nächsten Woche nichts Gegenteiliges von Ihnen erfahren. Die Anfrage wird dann geschlossen und kann bei Bedarf von Ihnen wieder geöffnet werden.';
var textdaysToSayByebye = 'aufgrund der verstrichenen Antwortzeit sehen wir diesen Fall als geschlossen an. Falls Ihre Anfrage noch nicht erledigt ist, setzen Sie bitte diesen Fall auf den Status "Wiedergeöffnet".';
var checkTagsErinnerung = 'Rückmeldung|Rückfragen';
//************************

 var date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
var time = date.getTime() / 1000;
//alert(time)
var time_h = (60 * 60 * 24);

var timeToSayGoodbye = parseInt(time - (time_h * daystosaygodbye));
var dateToSayGoodbye = new Date(timeToSayGoodbye*1000);
var timeToSayByeBye = parseInt(time - (time_h * daystosaybyebye));
var dateToSayByeBye = new Date(timeToSayByeBye*1000);
        
var url = $(location).attr('href');
if (url.indexOf('https://hiszilla.his.de') > -1){

    var bugStatus = $('select[id="bug_status"]').val();
    //alert(bugStatus)
    if (bugStatus == 'ASSIGNED' || bugStatus == 'REOPENED' || bugStatus == 'NEW')
    {
        var lastChance = 0; // 0=letzte Mail von Kunde / 1=letzte Mail von HIS / 2=es wurde eine Erinnerungsmail gesendet
        var lastEl = $('div[class="bz_comment"] > div[class="bz_comment_head"] > span[class="bz_comment_time"]').add('div[class="bz_comment bz_private"] > div[class="bz_comment_head"] > span[class="bz_comment_time"]').last();
        if (lastEl != null){
            var nameEl = lastEl.parent().find('span[class="bz_comment_user"] > span > a > span')
            var elementIsHis = nameEl.text().indexOf('(HIS)') > -1 ? true: false;
            var elementIsPrivate = lastEl.parent().parent().attr("class") == 'bz_comment bz_private'?true:false;
//            alert(elementIsPrivate)
            //alert(nameEl.text())
            var text = lastEl.parent().parent().find('pre[class="bz_comment_text"]').text();
            if (elementIsHis){
                lastChance = 1;
                if (!elementIsPrivate && checkErinnerung(text,checkTagsErinnerung)){
                    lastChance = 2;
                }
                
            }else{
                lastChance = 0;
            }
//        alert(lastChance)
            var userDateStr = lastEl.text().trim();
            userDateStr = userDateStr.substring(0, userDateStr.indexOf(","));
            var userDateAr = userDateStr.split(".");
            var userDate = new Date(userDateAr[2],userDateAr[1]-1,userDateAr[0]);
    
            if (lastChance == 0 || lastChance == 1){
                if ((userDate.getTime()/1000) <= timeToSayGoodbye){
                    if(confirm(textKundeErinnerung+textFrage)){
                        $('textarea[id="comment"]').val($('textarea[id="comment"]').val()+textdaysToSayGoodbye);
                    }
                }
            }else if (lastChance == 2){
                if ((userDate.getTime()/1000) <= timeToSayByeBye){
                    if(confirm(textKundeSchließen+textFrage)){        
                        $('textarea[id="comment"]').val($('textarea[id="comment"]').val()+textdaysToSayByebye);
                    }
                }
            }
        
        }
    }
}else if(url.indexOf("http://wikint.his.de/mediawiki/index.php/Hiszilla_") > -1){

    $('table[class="bugzilla sortable"] > tbody > tr:gt(0)').each(function(item){
    
        var standIndex = 7;
        var stand = $(this).parent().parent().first().find('th[title="Stand"]');
        if (stand != null) standIndex = stand.index();    

        var tds = $(this).children('td');
//        alert(tds.eq(standIndex).text())
        var ar = tds.eq(standIndex).text().split("-");
        if (ar.length >= 3){
            var standDate = new Date(ar[0],ar[1]-1,ar[2]);
            if ((standDate.getTime() / 1000) <= timeToSayByeBye){
                colorizeItem(tds,'#cb391f');        
            }else if ((standDate.getTime() / 1000) <= timeToSayGoodbye){
                colorizeItem(tds,'#f7ba00');
    
            }
        }
    });
    
}

function colorizeItem(item, color){
    item.css('color',color);
}


function checkErinnerung(text,checkText){
    var found = false;
    var ar = checkText.split("|");
    for(var i=0;i<=ar.length;i++){
        if (text.indexOf(ar[0].trim()) > -1) found = true;
    }
    return found;
}