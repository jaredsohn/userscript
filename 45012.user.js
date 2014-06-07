// ==UserScript==
// @name           Pennergame WievielZumSchloss
// @namespace alkmona+DiamondDog
// @description    Das Script zeigt im Übersichtbereich an wieviel Geld noch bis zum Schloss fehlt.
// @include        http://*pennergame.de/overview/
// @version 2.1
// ==/UserScript==

var bottleUrl = 'http://www.pennergame.de/stock/bottle/';
var text = 'Schloss';
if (document.URL.match("berlin")) {
    bottleUrl = 'http://berlin.pennergame.de/stock/bottle/';
    text = 'Bundeskanzleramt';
}

GM_xmlhttpRequest({
    method: 'GET',
    url: bottleUrl,
    onload: function(responseDetails) {
        var side = responseDetails.responseText;
        user(side)}});

function user(side){
    var side_split = side.split('<td align="left" width="250"><span>');
    var geld1 = side.split('<li class="cash">&euro;')[1];
    var geld2 = geld1.split('</li>')[0];
    var side_split_2 = side_split[1].split('Pfandflaschen');

    if (geld2.length > 6)
    {
    //	alert('grösser 6');
        var geld_split1 = geld2.split('.')[0];
        var geld_split2 = geld2.split('.')[1];
        var geld_split3 = geld_split2.split(',')[0];
        var geld_split4 = geld_split2.split(',')[1];
    //	alert('geld_split1: '+geld_split1);
    //	alert('geld_split3: '+geld_split3);
    //  alert('geld_split4: '+geld_split4);
        var geld = (geld_split1+geld_split3+'.'+geld_split4);
    }
    else
    {
    //	alert('kleiner 6');
        var geld_split1 = geld2.split(',')[0];	
        var geld_split2 = geld2.split(',')[1];
    //	alert(geld_split1);
    //	alert(geld_split2);
        var geld = (geld_split1+'.'+geld_split2);
    };

//	alert(geld);
    var kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
    if(side.indexOf('Wirtschaftswunder') > 0) {
//		alert("WiWu aktiviert");
        kurs = 20; // WiWu
    }
//	alert(kurs);
    var ausBandenkassa = 200000;
    var flaschen = side_split_2[0] * 1.0;
//	alert(flaschen);
    var pfand = Math.round(kurs * flaschen) / 100;
//	alert(pfand);
    var rest_geld1 = (590000 - ausBandenkassa - geld - pfand);
    var rest_geld2 = rest_geld1 *= 100; //Fuer 2 nachkommastellen
    var rest_geld3 = Math.round(rest_geld2);
    var rest_geld  = rest_geld3 /= 100; //Um wieder die alte Zahl zu bekommen, nur gerundet
    
    if (rest_geld <= 0)
    {
        var newText = '<div class="double">&nbsp;</div><div class="double"><h4>&nbsp;</h4>'
                  + '<b><u>F&uuml;r das '+text+':</u></b><br>'
                  + 'Du bekommst aus der BK &euro; <b>'+ ausBandenkassa +'</b>.<br>'
                  + 'Du hast <b>'+ flaschen +'</b> Pfandflaschen.<br>'
                  + 'Der Pfandflaschen Preis liegt bei <b>'+ kurs +'</b> Cent.<br>'
                  + 'Dein Gewinn beim Verkauf wäre &euro; <b>'+ pfand +'</b>.<br>'
                  + 'Du hast <b>&euro; '+ geld +'</b> auf dem Konto.<br><br>'
                  + '<b><span style=\"color:#FF0000;\">Du hast genug Geld f&uuml;r das '+text+'!</span></b></div>';	
    }
    else
    {
        var newText = '<div class="double">&nbsp;</div><div class="double"><h4>&nbsp;</h4>'
                    + '<b><u>F&uuml;r das '+text+'</u></b><br><br>'
                    + '- Du bekommst aus der BK &euro; <b>'+ ausBandenkassa +'</b>.<br>'
                    + '- Du hast <b>'+ flaschen +'</b> Pfandflaschen.<br>'
                    + '- Der Pfandflaschen Preis liegt bei <b>'+ kurs +'</b> Cent.<br>'
                    + '- Gewinn bei Verkauf <b>&euro; '+ pfand +'</b>.<br>'
                    + '- Geld auf deinem Konto <b>&euro; '+ geld +'</b>.<br><br>'
                    + '- Dir fehlen f&uuml;r das '+text+' noch:<br><b>&nbsp;&nbsp;&nbsp;&euro; '+ rest_geld +'</b></div>';
    }

    var table = document.getElementsByClassName('clearcontext')[3];
    
    if (table.innerHTML.indexOf(text) > 0) {
        var newText = '<div class="double">&nbsp;</div><div class="double"><h4>&nbsp;</h4>'
                    + '<b><u>Gratulation</u></b></div>';
    }
    table.innerHTML = table.innerHTML + newText;
}