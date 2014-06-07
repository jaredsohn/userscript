// ==UserScript==
// @name           FTP(From the Pavilion) - Spare Rating Calculator
// @namespace      www.fromthepavilion.org
// @description    Displays spare ratings on player pages
// @include        http://www.fromthepavilion.org/player.htm?playerId=*
// @include        http://fromthepavilion.org/player.htm?playerId=*
// @include        http://www.fromthepavilion.org/seniors.htm?teamId=*
// @include        http://www.fromthepavilion.org/youths.htm?teamId=*
// @include        http://fromthepavilion.org/seniors.htm?teamId=*
// @include        http://fromthepavilion.org/youths.htm?teamId=*
// @grant          none
// ==/UserScript==

function doSum() {
    var sum = 0;
    for (i = 10; i < 17; i++)    {
        var element = document.getElementById('middle').getElementsByTagName(
            "td")[i].innerHTML.split('resources/images/bar')[1].split('.gif')[0] * 1
        if (element == 0)
            element = 0.5
        sum += element
    }    element = document.getElementById('middle').getElementsByTagName(
                   "p")[0].innerHTML
    element = element.split(' ')[5].replace(/\,/g,'') * 1
    spareRat = element - sum * 1000
    avg = Math.round(spareRat / 70)
    return 'Spare Ratings: ' + spareRat + ' Average Sub-Level: ' + avg/100
}

function player() {
    var Spare = document.createElement('div');
    Spare.innerHTML = doSum();
    var elmStats = document.getElementById('stats')
    elmStats.parentNode.insertBefore(Spare, elmStats);
}

function team() {
    var element = document.getElementById("showSub");
    element.parentNode.removeChild(element);
    var tbl = document.getElementById('squad'),i;
    createCell(tbl.rows[0].insertCell(tbl.rows[0].cells.length), "Sub", 'col');
    for (i = 1; i < tbl.rows.length; i++){
        sum = 0;
        for (j=4;j<=10;j++){
            a = a2n(tbl.rows[i].cells[j].lastChild.data);
            if(a==0){
            a = a2n(tbl.rows[i].cells[j].lastChild.innerHTML);
            }
            sum += a;
        }
        var Rat = tbl.rows[i].cells[16].firstChild.data.replace(/\,/g,'') * 1;
        avg = Math.round((Rat-sum*1000)/70);
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), avg/100, 'col');
    }
}

function createCell(cell, text, style) {
    var div = document.createElement('div');
    var txt = document.createTextNode(text);
    div.appendChild(txt);
    cell.appendChild(div);
}


function a2n(a) {
    switch (a){
        case 'atrocious':     return (0.5);
        case 'atroc':         return (0.5);
        case 'dreadful':      return (1);
        case 'dread':         return (1);
        case 'poor':          return (2);
        case 'ordinary':      return (3);
        case 'ordin':         return (3);
        case 'average':       return (4);
        case 'avg':           return (4);
        case 'reasonable':    return (5);
        case 'reas':          return (5);
        case 'capable':       return (6);
        case 'capab':         return (6);
        case 'reliable':      return (7);
        case 'reli':          return (7);
        case 'accomplished':  return (8);
        case 'accom':         return (8);
        case 'expert':        return (9);
        case 'exprt':         return (9);
        case 'outstanding':   return (10);
        case 'outs':          return (10);
        case 'spectacular':   return (11);
        case 'spect':         return (11);
        case 'exceptional':   return (12);
        case 'excep':         return (12);
        case 'world class':   return (13);
        case 'wclas':         return (13);
        case 'elite':         return (14);
        case 'legendary':     return (15);
        case 'legen':         return (15);
        default:              return (0);
    }
}


function teama() {
    var element = document.createElement('div');
    element.innerHTML = '<button id="showSub" type="button" title="Will disable sorting until page is refreshed">Show Sub-Levels</button>';
    var elmStats = document.getElementById('squad')
    elmStats.appendChild(element);
    document.getElementById ("showSub").addEventListener ("click", team);
}

var title = document.title;
if (title.match("From the Pavilion - Squad")) {
    teama();
} else {
    player();
}
