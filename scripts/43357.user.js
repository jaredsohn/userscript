// ==UserScript==
// @name           GLB Fantasy Football Score
// @namespace      pbr
// @include        http://goallineblitz.com/game/game.pl?game_id=*
// @exclude        http://goallineblitz.com/game/game.pl?game_id=*mode=pbp
// @version        09.12.14
// ==/UserScript==

/*
 *
 * writen by pabst 3/1/09
 *
 */


window.setTimeout(
    function() {
        fantasyScoreMain();
    }
    , 2000);

function Passing() {
    this.completion = 0;
    this.attempt = 0;
    this.yards = 1;
    this.yardMin = 30;
    this.touchdown = 6;
    this.interception = -3;
    this.hurry = 0;
    this.sack = 0;
    this.sackYards = 0;
    this.sackMin = 0;
}

function Rushing() {
    this.attempt = 0;
    this.yards = 1;
    this.yardMin = 10;
    this.touchdown = 6;
    this.fumble = -1;
    this.fumbleLost = -1;
    this.brtk = 0.25;
    this.tfl = -1;
}

function Receiving() {
    this.reception = 0;
    this.yards = 1;
    this.yardMin = 20;
    this.yac = 0;
    this.yacMin = 0;
    this.touchdown = 6;
    this.fumble = -1;
    this.fumbleLost = -1;
    this.drop = -1;
}

function Kicking() {
    this.fgm = 2;
    this.fga = -1;
    this.fg19 = 2;
    this.fg29 = 2;
    this.fg39 = 2;
    this.fg49 = 3;
    this.fg50 = 4;
    this.xpm = 2;
    this.xpa = -1;
}

function Punting() {
    this.punt = 0;
    this.yards = 1;
    this.yardMin = 40;
}

function Returning() {
    this.kr = 0;
    this.kyards = 1;
    this.kyardMin = 30;
    this.ktouchdown = 6;
    this.pr = 0;
    this.pyards = 1;
    this.pyardMin = 20;
    this.ptouchdown = 6;
}

function Special() {
    this.tk = 1;
    this.mstk = -1;
    this.ffum = 2;
    this.fumr = 2;
    this.td = 6;
    this.pancakes = 0;
    this.pancakeMin = 5;
    this.brtk = 0;
    this.fum = -1;
    this.fuml = -1;
}

function OffensiveLine() {
    this.pancakes = 1;
    this.pancakeMin = 3;
}

function Defense() {
    this.pancakes = 0;
    this.pancakeMin = 3;
    this.tk = 1;
    this.mstk = -1;
    this.sack = 2;
    this.syards = 1;
    this.syardMin = 10;
    this.hry = 1;
    this.tfl = 1;
    this.ffum = 2;
    this.fumr = 2;
    this.pd = 1;
    this.inter = 3;
    this.iyards = 1;
    this.iyardMin = 20;
    this.td = 6;
}

var farr = new Array();
farr.push([1,calculatePassing]);
farr.push([2,calculatePassing]);
farr.push([3,calculateRushing]);
farr.push([4,calculateRushing]);
farr.push([5,calculateReceiving]);
farr.push([6,calculateReceiving]);
farr.push([7,calculateKicking]);
farr.push([8,calculateKicking]);
farr.push([9,calculatePunting]);
farr.push([10,calculatePunting]);
farr.push([11,calculateReturning]);
farr.push([12,calculateReturning]);
farr.push([13,calculateSpecial]);
farr.push([14,calculateSpecial]);
farr.push([15,calculateOffensiveLine]);
farr.push([16,calculateOffensiveLine]);
farr.push([17,calculateDefense]);
farr.push([18,calculateDefense]);

function fantasyScoreMain() {
    var t = document.getElementById("fd-table-1");
    if (t == null) {
        console.log("fd-table-1 doesn't exist, waiting ...");
        setTimeout(function() {
            fantasyScoreMain();
        }, 2000);
        return;
    }
    var totals = [0,0];
    for (var i=0; i<farr.length; i++) {
        farr[i][1](document.getElementById("fd-table-"+farr[i][0]));
    }

    var totals = calculateTotals();
    var divs = document.getElementsByClassName("total");
    divs[1].innerHTML += " ("+totals[0]+")";
    divs[2].innerHTML += " ("+totals[1]+")";
}

function calculateTotals() {
    var totals = [0,0];
    for (var i=0; i<farr.length; i++) {
        var table = document.getElementById("fd-table-"+(i+1));
        for (var ridx=0; ridx<table.rows.length; ridx++){
            var r = table.rows[ridx];
            var str = r.cells[r.cells.length-1].innerHTML;
            if (isNaN(parseFloat(str)) == false) {
                totals[i%2] += parseFloat(r.cells[r.cells.length-1].innerHTML);
            }
        }
    }
    return totals;
}

function insertColumn(table) {
    var tr = table.rows[0];
    var cell = tr.insertCell(tr.cells.length);
    cell.setAttribute("class","box_score_player_stat");
    cell.innerHTML = "Fantasy";
}

function getMinScore(stat, min, score) {
    var value = 0;
    if (min > 0) {
        value = parseInt(stat/min) * score;
    }
    return value;
}

function calculatePassing(table) {
    var p = new Passing();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var comp = parseFloat(row.cells[2].innerHTML);
            var att = parseFloat(row.cells[3].innerHTML);
            var yards = parseFloat(row.cells[4].innerHTML);
            var hurry = parseFloat(row.cells[7].innerHTML);
            var sack = parseFloat(row.cells[8].innerHTML);
            var sackYards = parseFloat(row.cells[9].innerHTML);
            var inter = parseFloat(row.cells[10].innerHTML);
            var td = parseFloat(row.cells[11].innerHTML);

            var score = comp*p.completion;
            score += att*p.attempt;
            score += getMinScore(yards,p.yardMin, p.yards);
            score += hurry * p.hurry;
            score += sack * p.sack;
            score += getMinScore(sackYards, p.sackMin, p.sackYards);
            score += inter * p.interception;
            score += td * p.touchdown;

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}

function calculateRushing(table) {
    var r = new Rushing();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var att = parseFloat(row.cells[2].innerHTML);
            var yards = parseFloat(row.cells[3].innerHTML);
            var td = parseFloat(row.cells[5].innerHTML);
            var brtk = parseFloat(row.cells[6].innerHTML);
            var tfl = parseFloat(row.cells[7].innerHTML);
            var fum = parseFloat(row.cells[8].innerHTML);
            var fuml = parseFloat(row.cells[9].innerHTML);

            var score = att*r.attempt;
            score += getMinScore(yards,r.yardMin, r.yards);
            score += td * r.touchdown;
            score += brtk * r.brtk;
            score += tfl * r.tfl;
            score += fum * r.fumble;
            score += fuml * r.fumbleLost;

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}

function calculateReceiving(table) {
    var r = new Receiving();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var rec = parseFloat(row.cells[2].innerHTML);
            var yards = parseFloat(row.cells[3].innerHTML);
            var yac = parseFloat(row.cells[5].innerHTML);
            var td = parseFloat(row.cells[6].innerHTML);
            var drop = parseFloat(row.cells[7].innerHTML);
            var fum = parseFloat(row.cells[8].innerHTML);
            var fuml = parseFloat(row.cells[9].innerHTML);

            var score = rec*r.reception;
            score += getMinScore(yards,r.yardMin, r.yards);
            score += getMinScore(yac*rec,r.yacMin, r.yac);
            score += td * r.touchdown;
            score += drop * r.drop;
            score += fum * r.fumble;
            score += fuml * r.fumbleLost;

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}

function calculateKicking(table) {
    var k = new Kicking();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var fgm = parseFloat(row.cells[1].innerHTML);
            var fga = parseFloat(row.cells[2].innerHTML);
            var fg19 = parseFloat(row.cells[3].innerHTML);
            var fg29 = parseFloat(row.cells[4].innerHTML);
            var fg39 = parseFloat(row.cells[5].innerHTML);
            var fg49 = parseFloat(row.cells[6].innerHTML);
            var fg50 = parseFloat(row.cells[7].innerHTML);
            var xpm = parseFloat(row.cells[8].innerHTML);
            var xpa = parseFloat(row.cells[9].innerHTML);

            var score = fgm * k.fgm;
            score += fga * k.fga;
            score += fg19 * k.fg19;
            score += fg29 * k.fg29;
            score += fg39 * k.fg39;
            score += fg49 * k.fg49;
            score += fg50 * k.fg50;
            score += xpm * k.xpm;
            score += xpa * k.xpa;

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}

function calculatePunting(table) {
    var p = new Punting();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var punts = parseFloat(row.cells[1].innerHTML);
            var yards = parseFloat(row.cells[2].innerHTML);

            var score = punts * p.punt;
            score += getMinScore(yards,p.yardMin, p.yards);

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}

function calculateReturning(table) {
    var r = new Returning();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var kr = parseFloat(row.cells[1].innerHTML);
            var kyards = parseFloat(row.cells[2].innerHTML);
            var ktd = parseFloat(row.cells[4].innerHTML);
            var pr = parseFloat(row.cells[5].innerHTML);
            var pyards = parseFloat(row.cells[6].innerHTML);
            var ptd = parseFloat(row.cells[8].innerHTML);

            var score = kr*r.kr;
            score += getMinScore(kyards,r.kyardMin, r.kyards);
            score += ktd * r.ktouchdown;
            score += pr*r.pr;
            score += getMinScore(pyards,r.pyardMin, r.pyards);
            score += ptd * r.ptouchdown;

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}

function calculateSpecial(table) {
    var d = new Special();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var tk = parseFloat(row.cells[2].innerHTML);
            var mstk = parseFloat(row.cells[3].innerHTML);
            var ffum = parseFloat(row.cells[4].innerHTML);
            var fumr = parseFloat(row.cells[5].innerHTML);
            var td = parseFloat(row.cells[6].innerHTML);
            var pcake = parseFloat(row.cells[7].innerHTML);
            var brtk = parseFloat(row.cells[8].innerHTML);
            var fum = parseFloat(row.cells[9].innerHTML);
            var fuml = parseFloat(row.cells[10].innerHTML);

            var score = tk * d.tk;
            score += mstk * d.mstk;
            score += ffum * d.ffum;
            score += fumr * d.fumr;
            score += td * d.td;
            score += getMinScore(pcake,d.pancakeMin, d.pancakes);
            score += brtk * d.brtk;
            score += fum * d.fum;
            score += fuml * d.fuml;

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}

function calculateOffensiveLine(table) {
    var o = new OffensiveLine();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var p = parseFloat(row.cells[2].innerHTML);

            var score = getMinScore(p,o.pancakeMin, o.pancakes);

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}

function calculateDefense(table) {
    var d = new Defense();
    insertColumn(table);
    var tr = table.getElementsByTagName("tr");
    for (var i=0; i<tr.length; i++) {
        if (tr[i].getAttribute("class").indexOf("nonalternating_color") == -1) {
            var row = tr[i];

            var tk = parseFloat(row.cells[2].innerHTML);
            var mstk = parseFloat(row.cells[3].innerHTML);
            var sack = parseFloat(row.cells[4].innerHTML);
            var syards = parseFloat(row.cells[5].innerHTML);
            var hry = parseFloat(row.cells[6].innerHTML);
            var tfl = parseFloat(row.cells[7].innerHTML);
            var ffum = parseFloat(row.cells[8].innerHTML);
            var fumr = parseFloat(row.cells[9].innerHTML);
            var pd = parseFloat(row.cells[10].innerHTML);
            var inter = parseFloat(row.cells[11].innerHTML);
            var iyards = parseFloat(row.cells[12].innerHTML);
            var td = parseFloat(row.cells[13].innerHTML);
            var pcake = parseFloat(row.cells[14].innerHTML);

            var score = tk * d.tk;
            score += getMinScore(pcake,d.pancakeMin, d.pancakes);
            score += mstk * d.mstk;
            score += sack * d.sack;
            score += getMinScore(syards,d.syardMin, d.syards);
            score += hry * d.hry;
            score += tfl * d.tfl;
            score += ffum * d.ffum;
            score += fumr * d.fumr;
            score += pd * d.pd;
            score += inter * d.inter;
            score += getMinScore(iyards,d.iyardMin, d.iyards);
            score += td * d.td;

            var cell = tr[i].insertCell(tr[i].cells.length);
            cell.style.textAlign = "right";
            cell.innerHTML = score.toFixed(0);
        }
        else {
            //not a player
        }
    }
}
