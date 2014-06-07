// ==UserScript==
// @name           Monster Level Calculator (Nag)
// @namespace      http://www.tnt4a.com
// @description    Calculates Level Quantity, Average Bug Power & Card Power for Maze Defense
// @include        http://apps.facebook.com/mazedefense/mymaze.aspx*
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.js
// ==/UserScript==

// By Brian Ballsun-Stanton
// Edited by Mike P Murphy
// Minor Modification by Chris Yap (Updated 17 Aug 2010)
// Correction for Greasemonkey in Firefox 4 by Patrick "Nag" TOURNET (Updated 25 Mar 2011)
// 25/03/2011 Updates:
// - Corrected function preventing script to work with Firefox 4
// - Added Total number of monsters
// 17/08/2010 Updates:
// - Corrected momentum calculation, now in line with Justin Dimmick's Wave Calculator.
// - Added Deadliest Mo which shows highest momentum of bug type and % of wave.
// - Added Deadliest Bug which shows deadliest bug's momentum and % of wave.

outContainer = "<tr><th class=\"detached_label\"><label>Calculated Level Details:</label></th></td><td id='calDet'>&nbsp</td></tr>";
$("#app14618023107_monstersDetails").parent().parent().parent().append(outContainer);

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function calculateDiff() {
    bug = 0;
    momentum = 0;
    mtotal = 0;
    mmax = 0;
    mmaxpc = 0;
    bugmax = 0;
    bmaxmo = 0;
    bmaxpc = 0;
    power = 0;
    mpower = 0;
    bugpower = 0;
    ctotal = 0;

//    mdma = $(".md_monster_array");
//    mdmad = mdma.find("div").text();
//    GM_notification(mdmad);
    
    $(".md_monster_array").each(function(index) {
				var content = $(this).text();

        content = content.split("\n");
        count = content[0].replace(" × ", '') * 1.0;
        hp = content[1] * 1.0;
        speed = content[2] * 1.0;

	      bug = speed*hp;
	      momentum = speed*count*hp;
        mtotal += momentum;
        ctotal += count;

        if (momentum > mmax)
            mmax = momentum;

        if (bug > bugmax) {
            bugmax = bug;
	          bmaxmo = momentum
	      }
    });

    power = mtotal;
    power = power.toFixed(0);
    mmaxpc = mmax/mtotal*100;
    mmaxpc = mmaxpc.toFixed(0);
    mpower = mmax;
    mpower = mpower.toFixed(0);
    bmaxpc = bmaxmo/mtotal*100;
    bmaxpc = bmaxpc.toFixed(0);
    bugpower = bugmax;
    bugpower = bugpower.toFixed(0);

    out = "<table style=\"border-collapse: collapse;\">" + "<tr><td style=\"padding:0px 5px; text-align: right;\"><b>Deadliest Bug</b></td><td style=\"padding:0px 5px; text-align: right;\"><b>" + addCommas(bugpower) + " - " + bmaxpc  + "%" + "</b></td><td style=\"padding:0px 5px;\"></td></tr>" + "<tr><td style=\"padding:0px 5px; text-align: right;\"><b>Deadliest Mo</b></td><td style=\"padding:0px 5px; text-align: right;\"><b>" + addCommas(mpower) + " - " + mmaxpc  + "%" + "</b></td><td style=\"padding:0px 5px;\"></td></tr>" + "<tr><td style=\"padding:0px 5px; text-align: right;\"><font color=\"red\"><b>Nb monsters</b></font></td><td style=\"padding:0px 5px; text-align: right;\"><font color=\"red\"><font color=\"red\"><b>" + ctotal + "</b></font></td><td style=\"padding:0px 5px;\"></td></tr>" + "<tr><td style=\"padding:0px 5px; text-align: right;\"><font color=\"red\"><b>Momentum</b></font></td><td style=\"padding:0px 5px; text-align: right;\"><font color=\"red\"><b>" + addCommas(power) + "</b></font></td><td style=\"padding:0px 5px;\"></td></tr>" + "</table>";
	
    $("#calDet").html(out);
}

calculateDiff();
$("#app14618023107_difficulty").bind("change", calculateDiff);
