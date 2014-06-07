// ==UserScript==
// @name           Classifica Miss Mattino di Padova
// @namespace      http://userscripts.org/users/97977
// @description    Converte la lista delle ragazze nella classifica ordinata per voti di Miss Mattino di Padova (http://temi.repubblica.it/mattinopadova-sondaggio/?cmd=vedirisultati&pollId=1462)
// @include        http://temi.repubblica.it/mattinopadova-sondaggio/?cmd=vedirisultati&pollId=1462
// ==/UserScript==

// Add jQuery
var GM_jQuery = document.createElement('script');
//GM_jQuery.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.pack.js';
GM_jQuery.src = 'http://jquery.com/jquery-latest.js';
GM_jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_jQuery);

// Wait until jQuery has loaded
function GM_wait() {
    if( typeof unsafeWindow.jQuery == 'undefined' ) {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        GM_ready();
    }
}
GM_wait();

// Once document and jQuery are loaded
function GM_ready() {
    $(document).ready(function() {
        var ris = new Array();
        var i = 0;
        $(".answer-text").each(function() {
            ris[i] = new Array();
            ris[i][0] = $(this).text().split(/,/)[0]; //Nome
            ris[i][1] = parseInt($(this).text().match(/(\d{2}) anni/)[1]); //Anni
            ris[i][2] = $(this).parent().children().next().next().children().text().match(/(\d+) voti/); //Voti
            if (ris[i][2] == null)
                ris[i][2] = 1;
            else
                ris[i][2] = parseInt(ris[i][2][1]);
            ris[i][3] = parseInt($(this).parent().children().next().next().children().text().match(/\d{1,2}%/)); //Percentuale
            ris[i][4] = $(this).parent().children().html(); //Immagine
            ris[i][5] = $(this).children().attr('href'); //Url immagine grande
            ris[i][6] = $(this).text().split(/,/)[1].trim(); //Paese
            i++;
        });
        var tot = i;
        for (i=0; i < tot-1; i++) {
            for (j=i+1; j < tot; j++) {
                if (ris[i][2] > ris[j][2]) {
                    tmp = ris[i];
                    ris[i] = ris[j];
                    ris[j] = tmp;
                }
            }
        }

        var out = "<tr><th colspan=\"4\" style=\"font-size: 16px;\">&nbsp;</th></tr>";
        out += "<tr><th colspan=\"4\" style=\"font-size: 16px;\">Classifica per voti</th></tr>";
        for (i=tot-1; i>=0; i--) {
            out += "<tr>";
            out += "<td>"+(tot-i)+")</td>";
            out += "<td valign=\"top\" class=\"answer-img answer-border\"><a href=\""+ris[i][5]+"\">"+ris[i][4]+"</a></td>";
            out += "<td valign=\"top\" width=\"300\" class=\"answer-text answer-border\">"+ris[i][0]+" ("+ris[i][1]+" anni)<br />"+ris[i][6]+"</td>";
            out += "<td valign=\"middle\" class=\"answer-border\"><strong>"+ris[i][2]+"</strong> voti ("+ris[i][3]+"%)<br /><div class=\"answer-result-img\"><img src='http://temi.repubblica.it/mattinopadova-sondaggio/wp-content/plugins/sondaggi/objects/poll_011.gif' height=\"14\" width=\""+ris[i][3]+"%\" alt=\""+ris[i][2]+" voti ("+ris[i][3]+"%)\" /></div></td>";
            out += "</tr>";
        }
        $(".poll-table").empty();
        $(".poll-table").html(out);
    });
}