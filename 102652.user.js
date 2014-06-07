// ==UserScript==
// @name           RamInterpreter
// @namespace      RamSchatter
// @description    Schat de troepen van de verdediger als je alles verliest door middel van de muurlevels die naar beneden zijn gehaald door rammen.
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==

function RamInterpreterMain(){
    var ths = document.getElementsByTagName('th');
    var rams = false;
    for (i = 0; i < ths.length; i++) {
        var th = ths[i];
        if (th.innerHTML == 'Schade door rammen:') {
            rams = true;
            break;
        }
    }
    if (th == false)
        return false;
    var bs = th.parentNode.getElementsByTagName('td')[0].getElementsByTagName('b');
    var from = parseInt(bs[0].innerHTML);
    var to = parseInt(bs[1].innerHTML);

    offPoints = calcOffPoints();
    rams      = offPoints[2];
    ramPoints = offPoints[1];
    offPoints = offPoints[0];
    tmp       = Math.pow((from - to) * (8 * Math.pow(1.09, from)) / ramPoints, 1/1.5);
    def       = Math.round(offPoints * tmp);
    alert(tmp + "\n" + offPoints + "\n" + def / 50);
    
    bla = document.getElementById("attack_info_att");
    itable = document.createElement("table");
    itable.id ="ramInterpreter";
    itable.style.border = "1px solid rgb(222, 211, 185)";
    itable.innerHTML = "<tr>Ramschatting: ~" + def + " verdedigingspunten<br>Dat is gelijk aan ongeveer:<br>" + (def / 50) + " zwaardvechters of boogschutters<br>" + (def / 15) + " speervechters<br>" + (def / 40) + " lichte cavalerie<br>" + (def / 200) + " zware cavalerie<br></tr>";
    bla.parentNode.appendChild(itable);
}

function calcOffPoints () {
    table = "";
    qu = document.getElementsByTagName('td');
    ths = document.getElementsByTagName('th');
    var the = false;
    for (i = 0; i < ths.length && the == false; i++)
        if (ths[i].innerHTML == 'Aanvaller:') {
            table = ths[i].parentNode;
            for (j = 0; j < qu.length && the == false; j++)
                if (qu[j].innerHTML == 'Aantal:')
                    the = qu[j].parentNode;
        }
    if (the == false)
        return the;
    bla = the.getElementsByTagName('td');
    losses = [];
    for (i = 0; i < bla.length; i++)
        if (i != 0)
            losses[i - 1] = parseInt(bla[i].innerHTML);
    Sp = losses[0] * 10;
    Sw = losses[1] * 25;
    Ax = losses[2] * 40;
    if (losses.length == 12) {
        Ar = losses[3] * 15;
        Lc = losses[5] * 130;
        Ma = losses[6] * 120;
        Hc = losses[7] * 150;
        Ra = losses[8] * 2;
        Ca = losses[9] * 2;
        Pa = losses[10] * 150;
        No = losses[11] * 30;
        total = Sp + Sw + Ax + Ar + Lc + Ma + Hc + Ra + Ca + Pa + No;
        Rams = losses[8];
    } else if (losses.length == 9) {
        Lc = losses[4] * 130;
        Hc = losses[5] * 150;
        Ra = losses[6] * 2;
        Ca = losses[7] * 2;
        No = losses[8] * 30;
        total = Sp + Sw + Ax + Lc + Hc + Ra + Ca + No;
        Rams = losses[6];
    } else if (losses.length == 10) {
        Lc = losses[4] * 130;
        Hc = losses[5] * 150;
        Ra = losses[6] * 2;
        Ca = losses[7] * 2;
        Pa = losses[8] * 150;
        No = losses[9] * 30;
        total = Sp + Sw + Ax + Lc + Hc + Ra + Ca + Pa + No;
        Rams = losses[6];
    } else if (losses.length == 11) {
        Ar = losses[3] * 15;
        Lc = losses[5] * 130;
        Ma = losses[6] * 120;
        Hc = losses[7] * 150;
        Ra = losses[8] * 2;
        Ca = losses[9] * 2;
        No = losses[10] * 30;
        total = Sp + Sw + Ax + Ar + Lc + Ma + Hc + Ra + Ca + No;
        Rams = losses[8];
    }
    return [total,Rams,Ra];
}
RamInterpreterMain();