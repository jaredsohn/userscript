// ==UserScript==
// @name           Public Stats Logger
// @namespace      Kings of Chaos
// @include        http://*.kingsofchaos.com/*
// ==/UserScript==

/**********************************************************************************/
/* Original credit goes to Baigo, September and jvc2001 for providing a good base */
/**********************************************************************************/

var public_version = 2.0;

var public_server = "http://vps20347.xlshosting.net/v1.0/";

var public_url = document.location.toString();

var public_username = GM_getValue("public_username", "");
var public_statid = GM_getValue("public_statid", "");
var public_uniqueid = GM_getValue("public_uniqueid", "");

var weaponList = ["Blackpowder Missile", "Invisibility Shield", "Chariot", "Dragonskin", "Nunchaku", "Lookout Tower"];

var gold = GetGold();

AddMenuItems();

document.getElementsByTagName('table')[2].scrollIntoView();

if(public_url.indexOf("/base.php") > 0) {
    BasePHP();
}
else if(public_url.indexOf("/armory.php") > 0) {
    ArmoryPHP();
}
else if(public_url.indexOf("/train.php") > 0) {
    TrainPHP();
}
else if(public_url.indexOf("/mercs.php") > 0) {
    MercsPHP();
}
else if(public_url.indexOf("/stats.php") > 0) {
    StatsPHP();
}
else if(public_url.indexOf("/attack.php") > 0) {
    AttackPHP();
}
else if(public_url.indexOf("/inteldetail.php") > 0) {
    InteldetailPHP();	//recons + sabs
}
else if(public_url.indexOf("/detail.php") > 0) {
    DetailPHP();	//attacklogs
}
else if(public_url.indexOf("/battlefield.php") > 0) {
    BattlefieldPHP();
}
else if(public_url.indexOf("/conquest.php") > 0) {
    ConquestPHP();
}

/*****************************************************************************/
/********************************* PAGES *************************************/
/*****************************************************************************/

function BasePHP() {
    var username = GetText("b>Name</b", "\">", "<");
    var statid = GetText("b>Name</b", "id=", "\"");
    var uniqid = GetText("uniqid=", "\"");
    var officerbonus = GetText("in today (x ",")");

    GM_setValue("public_username", username);
    GM_setValue("public_statid", statid);
    GM_setValue("public_uniqid", uniqid);
    GM_setValue("public_currentOfficerBonus", officerbonus);

    //display message
    GM_xmlhttpRequest({
	method: "GET",
	url: public_server + "message.php",
	onload: function(r) {
	    var myMessage = GetTextIn(r.responseText, "[m]", "[/m]");
	    var customDiv = document.createElement("div");
	    customDiv.innerHTML = myMessage;
	    document.getElementsByClassName("content")[0].insertBefore(customDiv, document.getElementsByClassName('table_lines')[0]);
	}
    });

    var sa = GetText(">Strike Action<", "\">", "<").replace(/,/g, "");
    var da = GetText(">Defensive Action<", "\">", "<").replace(/,/g, "");
    var spy = GetText(">Spy Rating<", "\">", "<").replace(/,/g, "");
    var sentry = GetText(">Sentry Rating<", "\">", "<").replace(/,/g, "");

    // Expand/collapse tables
    ExpandCollapseTable("Grow Your Army");
    ExpandCollapseTable("Notice from Commander");
    ExpandCollapseTable("Recent Attacks on You");
    ExpandCollapseTable("Military Overview");
    ExpandCollapseTable("Military Effectiveness");
    ExpandCollapseTable("Previous Logins");
    ExpandCollapseTable("Preferences");
    ExpandCollapseTable("Officers");

    var cID = getClassIndex('table_lines','Military Effectiveness');
    if(!String(cID).match('undefined')){
    document.getElementsByClassName('table_lines')[cID].innerHTML = document.getElementsByClassName('table_lines')[cID].innerHTML.replace("Military Effectiveness","Military Effectiveness <div id=updateStats> [Update Stats]</div>");
    }

    document.addEventListener('click', function(event) {
	if(event.target.id == 'updateStats'){
	    GM_xmlhttpRequest({
		method: "GET",
		url: public_server + "basic.php?code=selfupdate&whoami=" + public_username + "&whoamid=" + public_statid + "&sa=" + sa + "&da=" + da + "&spy=" + spy  + "&sentry=" + sentry
	    });
	    alert("Stats updated");
	}
    }, true);

    CheckForUpdate();
}

function ArmoryPHP() {
    ExpandCollapseTable("Current Weapon Inventory");
    ExpandCollapseTable("Current Tool Inventory");

    var sa = GetText(">Strike Action<", "\">", "<").replace(/,/g, "");
    var da = GetText(">Defensive Action<", "\">", "<").replace(/,/g, "");
    var spy = GetText(">Spy Rating<", "\">", "<").replace(/,/g, "");
    var sentry = GetText(">Sentry Rating<", "\">", "<").replace(/,/g, "");

    var cID = getClassIndex('table_lines','Military Effectiveness');
    if(!String(cID).match('undefined')){
    document.getElementsByClassName('table_lines')[cID].innerHTML = document.getElementsByClassName('table_lines')[cID].innerHTML.replace("Military Effectiveness","Military Effectiveness <div id=updateStats> [Update Stats]</div>");
    }

    document.addEventListener('click', function(event) {
	if(event.target.id == 'updateStats'){
	    GM_xmlhttpRequest({
		method: "GET",
		url: public_server + "basic.php?code=selfupdate&whoami=" + public_username + "&whoamid=" + public_statid + "&sa=" + sa + "&da=" + da + "&spy=" + spy  + "&sentry=" + sentry
	    });
	    alert("Stats updated");
	}
    }, true);

    var weaponsTable = GetTable("Current Weapon Inventory");
    var toolsTable = GetTable("Current Tool Inventory");
    var buyWeaponsTable = GetTable("Buy Weapons");

    var weapons = [];
    var totalSellValue = 0;
    var totalInvestedValue = 0;

    var totalAttackWeapons = 0;
    var totalDefenseWeapons = 0;
    var totalSpyTools = 0;
    var totalSentryTools = 0;

    for(var i = 0; i < weaponList.length; i++) {
	weapons.push(0);
    }

    var passedDefenseWeapons = 0;
    var idxDefenseWeaponsTh = -1;

    for(var i = 2; i < weaponsTable.rows.length; i++) {
	if(weaponsTable.rows[i].cells.length < 4)
	    continue;

	var wepName = weaponsTable.rows[i].cells[0].innerHTML;
	if(wepName == "Defense Weapons") {
	    passedDefenseWeapons = 1;
	    idxDefenseWeaponsTh = i;
	    continue;
	}

	var wepCount = parseInt(weaponsTable.rows[i].cells[1].innerHTML.replace(/,/g, "") );
	var wepSell = parseInt(GetTextIn(weaponsTable.rows[i].cells[3].innerHTML, "Sell for ", " Gold").replace(/,/g, ""));

	totalSellValue += (wepCount * wepSell);

	var j = GetTableRow(buyWeaponsTable, 0, wepName);
	if(j >= 0) {
	    var wepCost = parseInt(buyWeaponsTable.rows[j].cells[2].innerHTML.replace(/,/g, ""));
	    totalInvestedValue += (wepCount * wepCost);
	}

	var idx= weaponList.indexOf(wepName);
	if(idx >= 0) {
	    weapons[idx] = wepCount;
	}

	if(passedDefenseWeapons == 0) {
	    totalAttackWeapons += wepCount;
	}
	else {
	    totalDefenseWeapons += wepCount;
	}
    }

    var passedSentryTools = 0;
    var idxSentryToolsTh = -1;

    for(var i = 2; i < toolsTable.rows.length; i++) {
	if(toolsTable.rows[i].cells.length < 4)
	    continue;

	var wepName = toolsTable.rows[i].cells[0].innerHTML;
	if(wepName == "Sentry Tools") {
	    passedSentryTools = 1;
	    idxSentryToolsTh = i;
	    continue;
	}

	var wepCount = parseInt(toolsTable.rows[i].cells[1].innerHTML.replace(/,/g, ""));
	var wepSell = parseInt(GetTextIn(toolsTable.rows[i].cells[3].innerHTML, "Sell for ", " Gold").replace(/,/g, ""));

	totalSellValue += (wepCount * wepSell);

	var j = GetTableRow(buyWeaponsTable, 0, wepName);
	if(j >= 0) {
	    var wepCost = parseInt(buyWeaponsTable.rows[j].cells[2].innerHTML.replace(/,/g, ""));
	    totalInvestedValue += (wepCount * wepCost);
	}

	var idx = weaponList.indexOf(wepName);
	if(idx >= 0)
	    weapons[idx] = wepCount;

	if(passedSentryTools == 0) {
	    totalSpyTools += wepCount;
	}
	else {
	    totalSentryTools += wepCount;
	}
    }

    //show aat of weapons
    if(weaponsTable.rows.length > 2) {
	weaponsTable.rows[1].innerHTML = weaponsTable.rows[1].innerHTML.replace("Weapons</th>", "Weapons</th><th class=subh align=right>AAT</th>");
    }

    for(var i = 2; i < weaponsTable.rows.length; i++) {
	if(weaponsTable.rows[i].cells.length < 4)
	    continue;

	var wepName = weaponsTable.rows[i].cells[0].innerHTML;
	if(wepName == "Defense Weapons") {
	    weaponsTable.rows[i].innerHTML = weaponsTable.rows[i].innerHTML.replace("Weapons</th>", "Weapons</th><th class=subh align=right>AAT</th>");
	    continue;
	}

	var wepCount = parseInt(weaponsTable.rows[i].cells[1].innerHTML.replace(/,/g, ""));
	var j = GetTableRow(buyWeaponsTable, 0, wepName);
	var wepCost = parseInt(buyWeaponsTable.rows[j].cells[2].innerHTML.replace(/,/g, ""));

	var aat = parseInt(Math.floor(totalInvestedValue / (wepCost * 400)));

	weaponsTable.rows[i].insertCell(1).innerHTML = AddCommas(Math.min(aat, wepCount).toString());
	weaponsTable.rows[i].cells[1].setAttribute('align', "right");
    }

    //show aat of tools
    if(toolsTable.rows.length > 2) {
	toolsTable.rows[1].innerHTML = toolsTable.rows[1].innerHTML.replace("Tools</th>", "Tools</th><th class=subh align=right>AAT</th>");
    }

    for(var i = 2; i < toolsTable.rows.length; i++) {
	if(toolsTable.rows[i].cells.length < 4)
	    continue;

	var wepName = toolsTable.rows[i].cells[0].innerHTML;
	if(wepName == "Sentry Tools") {
	    toolsTable.rows[i].innerHTML = toolsTable.rows[i].innerHTML.replace("Tools</th>", "Tools</th><th class=subh align=right>AAT</th>");
	    continue;
	}

	var wepCount = parseInt(toolsTable.rows[i].cells[1].innerHTML.replace(/,/g, ""));
        var j = GetTableRow(buyWeaponsTable, 0, wepName);
        var wepCost = parseInt(buyWeaponsTable.rows[j].cells[2].innerHTML.replace(/,/g, ""));

        var aat = parseInt(Math.floor(totalInvestedValue / (wepCost * 400)));

        toolsTable.rows[i].insertCell(1).innerHTML = AddCommas(Math.min(aat, wepCount).toString());
        toolsTable.rows[i].cells[1].setAttribute('align', "right");
    }

    var soldiers = GetSoldiers();

    //show unheld weapons/tools
    if(totalAttackWeapons > 0) {
	var attackSoldiers = soldiers.tas + soldiers.tam + soldiers.us + soldiers.um;
	var unheld = totalAttackWeapons - attackSoldiers;

	if(unheld > 0) {
	    weaponsTable.rows[1].cells[0].innerHTML += " <span style='color:red; border-left: 1px solid white'>&nbsp;Unheld: " + unheld + "</span>";
	}
    }

    if(totalDefenseWeapons > 0) {
	var defenseSoldiers = soldiers.tds + soldiers.tdm + soldiers.us + soldiers.um;
	var unheld = totalDefenseWeapons - defenseSoldiers;

	if(unheld > 0) {
	    weaponsTable.rows[idxDefenseWeaponsTh].cells[0].innerHTML += " <span style='color:red; border-left: 1px solid white'>&nbsp;Unheld: " + unheld + "</span>";
	}
    }

    if(totalSpyTools > 0) {
	var unheld = totalSpyTools - soldiers.spy;

	if(unheld > 0) {
	    toolsTable.rows[1].cells[0].innerHTML += " <span style='color:red; border-left: 1px solid white'>&nbsp;Unheld: " + unheld + "</span>";
	}
    }

    if(totalSentryTools > 0) {
	var unheld = totalSentryTools - soldiers.sentry;

	if(unheld > 0) {
	    toolsTable.rows[idxSentryToolsTh].cells[0].innerHTML += " <span style='color:red; border-left: 1px solid white'>&nbsp;Unheld: " + unheld + "</span>";
	}
    }

    //show the armory value
    toolsTable.insertRow(-1).innerHTML = "<td colspan=5></td>";
    toolsTable.insertRow(-1).innerHTML = "<td colspan=5 align=center style='background-color:#003333; border-bottom:0'><strong>Your sell value: " + AddCommas(totalSellValue.toString()) + " Gold</strong></td>";

    TotalValue = Math.round(totalSellValue / 0.7);

    //check for lost weapons
    var lostLog = [];
    var nowDate = new Date();
    var now = nowDate.getTime();

    var BPM = 0;
    var CH = 0;
    var DS = 0;
    var IS = 0;

    for(var i = 0; i < weaponList.length; i++) {
	if(weaponList[i] == 'Invisibility Shield') { IS = weapons[i]; }
	if(weaponList[i] == 'Dragonskin') { DS = weapons[i]; }
	if(weaponList[i] == 'Blackpowder Missile') { BPM = weapons[i]; }
	if(weaponList[i] == 'Chariot') { CH = weapons[i]; }

	var oldCount = GM_getValue("public_armory_" + weaponList[i].replace(/ /g, "_"), -1);
	var soldCount = GM_getValue("public_armory_" + weaponList[i].replace(/ /g, "_") + "_sold", 0);

	oldCount -= soldCount;

	if(weapons[i] < oldCount) {
	    lostLog.push((oldCount - weapons[i]) + ":" + weaponList[i] + ":" + now);
	}

	GM_setValue("public_armory_" + weaponList[i].replace(/ /g, "_"), weapons[i]);
        GM_setValue("public_armory_" + weaponList[i].replace(/ /g, "_") + "_sold", 0);
    }

    var lostLogGlobal = [];

    for(var i = 0; i < 10; i++) {
	lostLogGlobal.push(GM_getValue("public_lost_wep_log_" + i, "::"));
    }

    var lostLogTop = [];

    for(var i = 0; i < lostLog.length; i++) {
	lostLogGlobal.unshift(lostLog[i]);

        var lostWepDetails = lostLog[i].split(":");
        lostLogTop.push("You are missing " + lostWepDetails[0] + " " + lostWepDetails[1] + (lostWepDetails[0] > 1 ? "s" : ""));
    }

    if(lostLogTop.length > 0) {
	weaponsTable.insertRow(0).innerHTML = "<td colspan=5 style='background-color:red'><strong>" + lostLogTop.join("<br>") + "</strong></td>";

	// Special effect, I made this don't steal! Too late :)
	var bloodDiv = document.createElement('div');
	bloodDiv.setAttribute("style", "position:fixed; left:0; top:0; width:100%; height:100%; background-color:red; opacity:1.0; z-index:1000;");
	bloodDiv.setAttribute("id", "bloodDiv");
	document.body.appendChild(bloodDiv);

	setTimeout(ArmoryPHP_ReduceBloodEffect, 100);
    }

    // When to upgrade (Added By Shane)
    var htmlHead = document.getElementsByTagName("head")[0].innerHTML;
    var myRace = FindText(FindText(htmlHead,'<link href="/images/css/common.css" rel="','css" r'),'/css/','.');
    var saBonus = 1;
    var daBonus = 1;

    var techMulti = GM_getValue("public_currentTech", 1);
    var officerBonus = GM_getValue("public_currentOfficerBonus", 1);

    switch(myRace) {
	case 'Dwarves': { daBonus = 1.4; break }
	case 'Orcs': { daBonus = 1.2; saBonus = 1.35; break }
    }

    var upgradeTable = GetTable("Armory Autofill Preferences");
    upgradeTable.insertRow(-1).innerHTML = "<td colspan=3></td>";
    upgradeTable.insertRow(-1).innerHTML = "<th colspan=3>Upgrade Table</th>";

    var myFort = FindText(FindText(document.body.innerHTML,'Current Fortification','<td align="center">'),'<td>','</td>').split(" (")[0];
    var mySiege = FindText(FindText(document.body.innerHTML,'Current Siege Technology','<td align="center">'),'<td>','</td>').split(" (")[0];

    FortArray = FortList(myFort).split('|');
    SiegeArray = SiegeList(mySiege).split('|');
    // Returns: Multiply | Next Upgrade | Next Price | Next Multiply

    var BPMMsg = '';
    var CHMsg = '';
    var ISMsg = '';
    var DSMsg = '';

    var attackSol = Math.round((soldiers.tas + soldiers.tam - BPM - CH) * 5 * techMulti * officerBonus);
    var defenceSol = Math.round((soldiers.tds + soldiers.tdm - IS - DS) * 5 * techMulti * officerBonus);
    var untrainedSol = Math.round((soldiers.us + soldiers.um) * 4 * techMulti * officerBonus);

    if((!isNaN(BPM)) && (!isNaN(CH))) {
	var currentSA = Math.round((BPM * SiegeArray[0] * 1000 * 5 * saBonus * techMulti * officerBonus) + (CH * SiegeArray[0] * 600 * 5 * saBonus * techMulti * officerBonus));
	var currentSASoldiers = Math.round(attackSol + untrainedSol) * SiegeArray[0] * saBonus;
	var calculatedSA = Math.round(currentSA + currentSASoldiers);

	if(SiegeArray[1] != 'Max') {
	    var sellBPM = Math.round(removeComma(SiegeArray[2]) / 700000);
	    var sellCH = Math.round(removeComma(SiegeArray[2]) / 315000);

	    var newBPM = BPM-sellBPM;	//New amount of BPM after selling for upgrade.
	    var newCH = CH-sellCH;	//New amount of CH after selling for upgrade.

	    var newSA = Math.round((newBPM * SiegeArray[3] * 1000 * 5 * saBonus * techMulti * officerBonus) + (CH * SiegeArray[3] * 600 * 5 * saBonus * techMulti * officerBonus));
	    var newSASoldiers = Math.round(attackSol + untrainedSol) * SiegeArray[3] * saBonus;
	    var newCalculatedSA = Math.round(newSA + newSASoldiers);

	    var newSACH = Math.round((BPM * SiegeArray[3] * 1000 * 5 * saBonus * techMulti * officerBonus) + (newCH * SiegeArray[3] * 600 * 5 * saBonus * techMulti * officerBonus));
	    var newSACHSoldier = Math.round(attackSol + untrainedSol) * SiegeArray[3] * saBonus;
	    var newCalculatedSACH = Math.round(newSACH + newSACHSoldier);

	    if(currentSA < newSA) {
		if(sellBPM < BPM) {
		    BPMMsg += "Sell " + sellBPM + " BPMs and buy " + SiegeArray[1];
		    BPMMsg += "<br>You'll gain " + AddCommas(newSA-currentSA) + " SA...";
		}
		else {
		    BPMMsg += 'Its not profitable to buy ' + SiegeArray[1] + ' yet with BPMs';
		}

		if(currentSA < newSACH) {
		    if(sellCH < CH) {
			CHMsg += "Sell " + sellCH + " Chariots and buy " + SiegeArray[1];
			CHMsg += "<br>You'll gain " + AddCommas(newSACH-currentSA) + " SA...";
		    }
		    else {
			CHMsg += 'Its not profitable to buy ' + SiegeArray[1] + ' yet with Chariots';
		    }
		}
		else {
		    CHMsg += 'Its not profitable to buy ' + SiegeArray[1] + ' yet with Chariots';
		}
	    }
	    else {
		BPMMsg += 'Its not profitable to buy ' + SiegeArray[1] + ' yet with BPMs';
		if(currentSA < newSACH) {
		    if(sellCH < CH) {
			CHMsg += "Sell " + sellCH + " Chariots and buy " + SiegeArray[1];
			CHMsg += "<br>You'll gain " + AddCommas(newSACH-currentSA) + " SA...";
		    }
		}
		else {
		    CHMsg += 'Its not profitable to buy ' + SiegeArray[1] + ' yet with Chariots';
		}
	    }
	}
	else{
	    CHMsg = 'Already got all sa upgrades.';
	    BPMMsg = 'Already got all sa upgrades.';
	}
    }
    else {
	CHMsg = "Couldn't detect your Chariots.";
	BPMMsg = "Couldn't detect your BPMs.";
    }

    if((!isNaN(IS)) && (!isNaN(DS))) {
	var currentDA = Math.round((IS * FortArray[0] * 1000 * 5 * daBonus * techMulti * officerBonus) + (DS * FortArray[0] * 256 * 5 * daBonus * techMulti * officerBonus));
	var currentDASoldiers = Math.round(defenceSol + untrainedSol) * FortArray[0] * daBonus;
	var calculatedDA = Math.round(currentDA + currentDASoldiers);

	if(FortArray[1] != 'Max') {
	    var sellIS = Math.round(removeComma(FortArray[2]) / 700000);
	    var sellDS = Math.round(removeComma(FortArray[2]) / 140000);

	    var newIS = IS-sellIS;		//New amount of IS after selling for upgrade.
	    var newDS = DS-sellDS;		//New amount of DS after selling for upgrade.

	    var newDA = Math.round((newIS * FortArray[3] * 1000 * 5 * daBonus * techMulti * officerBonus) + (DS * FortArray[3] * 256 * 5 * daBonus * techMulti * officerBonus));
	    var newDASoldiers = Math.round(defenceSol + untrainedSol) * FortArray[3] * daBonus;
	    var newCalculatedDA = Math.round(newDA + newDASoldiers);

	    var newDADS = Math.round((IS * FortArray[3] * 1000 * 5 * daBonus * techMulti * officerBonus) + (newDS * FortArray[3] * 256 * 5 * daBonus * techMulti * officerBonus));
	    var newDADSSoldier = Math.round(defenceSol + untrainedSol) * FortArray[3] * daBonus;
	    var newCalculatedDADS = Math.round(newDADS + newDADSSoldier);

	    if(currentDA < newDA) {
		if(newIS < IS) {
		    ISMsg += "Sell " + sellIS + " ISs and buy " + FortArray[1];
		    ISMsg += "<br>You'll gain " + AddCommas(newDA - currentDA)+ " DA...";
		}
		else {
		    ISMsg += 'Its not profitable to buy ' + FortArray[1] + ' yet with ISs';
		}

		if(currentDA < newDADS) {
		    if(sellDS < DS) {
			DSMsg += "Sell " + sellDS + " Dragonskins and buy " + FortArray[1];
			DSMsg += "<br>You'll gain " + AddCommas(newDADS - currentDA)+ " DA...";
		    }
		    else {
			DSMsg += 'Its not profitable to buy ' + FortArray[1] + ' yet with Dragonskins';
		    }
		}
	    }
	    else {
		ISMsg += 'Its not profitable to buy ' + FortArray[1] + ' yet with ISs';
		if(currentDA < newDADS)	{
		    if(sellDS < DS) {
			DSMsg += "Sell " + sellDS + " Dragonskins and buy " + FortArray[1];
			DSMsg += "<br>You'll gain " + AddCommas(newDADS - currentDA)+ " DA...";
		    }
		    else {
			DSMsg = 'Its not profitable to buy ' + FortArray[1] + ' with Dragonskins';
		    }
		}
		else {
		    DSMsg = 'Its not profitable to buy ' + FortArray[1] + ' with Dragonskins';
		}
	    }
	}
	else {
	    ISMsg = 'Already got all sa upgrades.';
	    DSMsg = 'Already got all da upgrades.';
	}
    }
    else {
	upgradeMsgDA = "Couldn't detect your IS [or] DS count";
    }

    upgradeTable.insertRow(-1).innerHTML = "<td align=left>SA Upgrade</td>"
					    + "<td align=left>BPM</td>"
					    + "<td align=left>" + BPMMsg + "</td>";

    upgradeTable.insertRow(-1).innerHTML = "<td align=left>SA Upgrade</td>"
					    + "<td align=left>Chariots</td>"
					    + "<td align=left>" + CHMsg + "</td>";

    upgradeTable.insertRow(-1).innerHTML = "<td align=left>DA Upgrade</td>"
					    + "<td align=left>IS</td>"
					    + "<td align=left>" + ISMsg + "</td>";

    upgradeTable.insertRow(-1).innerHTML = "<td align=left>DA Upgrade</td>"
					    + "<td align=left>Dragonskins</td>"
					    + "<td align=left>" + DSMsg + "</td>";

    upgradeTable.insertRow(-1).innerHTML = "<td colspan=3 align=center><button id=upgradeTest onClick=\"return false;\" style='width:9ex'>Read me</button></td>";

    document.getElementById('upgradeTest').addEventListener('click', function(event) {
	var testUpgrade = "Upgrade Table is in its beta stage, to ensure people don't make mistakes, use this as a guildline\n\n";
	testUpgrade += "Your SA is: " + AddCommas(sa) + "\n";
	testUpgrade += "Our formula calculated your SA to be: " + AddCommas(calculatedSA) + "\n";
	testUpgrade += "If these two values are similar, its safe to trust our upgrade suggestion.\n\n";

	testUpgrade += "Your DA is: " + AddCommas(da) + "\n";
	testUpgrade += "Our formula calculated your DA to be: " + AddCommas(calculatedDA) + "\n";
	testUpgrade += "If these two values are similar, its safe to trust our upgrade suggestion.\n\n";

	testUpgrade += "\n\n If the numbers are highly wrong, please visit Training page and Command Center so we can store your officer bonus and tech bonus.";
	testUpgrade += "\n\n Please note: Our formula only calculates big weapons, it doesn't include small weapons.";
	alert(testUpgrade);
    }, false);

    //lost weapon log
    var lostTable = GetTable("Armory Autofill Preferences");
    lostTable.insertRow(-1).innerHTML = "<td colspan=3></td>";
    lostTable.insertRow(-1).innerHTML = "<th colspan=3>Lost Weapons Log</th>";

    var anyLossLogged = false;

    for(var i = 0; i < 10; i++) {
        GM_setValue("public_lost_wep_log_" + i, lostLogGlobal[i]);

        if(lostLogGlobal[i].length > 2) {
            var lostWepDetails = lostLogGlobal[i].split(":");

            // fix plural
            lostWepDetails[1] += (lostWepDetails[0] > 1 ? "s" : "");

            // compute elapsed time
            var elapsed = now - parseInt(lostWepDetails[2]);
            lostWepDetails[2] = elapsed > 0 ? PrintableTime(elapsed) + " ago" : "NOW!";

            if(elapsed == 0) {
                lostWepDetails[0] = "<strong style='color:red'>" + lostWepDetails[0] + "</strong>";
                lostWepDetails[1] = "<strong style='color:red'>" + lostWepDetails[1] + "</strong>";
                lostWepDetails[2] = "<strong style='color:red'>" + lostWepDetails[2] + "</strong>";
            }

            lostTable.insertRow(-1).innerHTML = "<td align=right>" + lostWepDetails[0] + "</td>"
                                              + "<td align=left>" + lostWepDetails[1] + "</td>"
                                              + "<td align=left>" + lostWepDetails[2] + "</td>";

            anyLossLogged = true;
        }
    }

    if(!anyLossLogged) {
        lostTable.insertRow(-1).innerHTML = "<td colspan=3 align=center>Nothing has been logged yet.</td>";
    }

    // Listen to sell buttons so that sells wont be logged as missing
    var sellButtons = document.getElementsByName('doscrapsell');
    for(var i = 0; i < sellButtons.length; i++) {
        sellButtons[i].addEventListener('click', ArmoryPHP_OnSellButton, false);
    }

    // Add a clear button for the lost weapons log
    lostTable.insertRow(-1).innerHTML = "<td colspan=3 align=center><button id=clearLostLog onClick=\"return false;\" style='width:9ex'>Clear</button></td>";
    document.getElementById('clearLostLog').addEventListener('click', ArmoryPHP_OnClearLostLog, false);

    // Add keyboard shortcut to repair all button
    var repairBut = GetElement('input', "Repair all");
    if(repairBut) {
        repairBut.value = repairBut.value.replace("Repair", "Repair (r)");

        document.addEventListener('keyup',
            function(e) {
                if(e.target.type == "text") return;
                if(e.target.type == "textarea") return;
                if(e.target.type == "select-one") return;

                switch(e.keyCode) {
                    case 82:    // R
                        GetElement('input', "Repair (r)").click();
                        break;
                }
            }, false);
    }

    // Add helper buttons for buying
    buyWeaponsTable.rows[1].cells[3].setAttribute('colspan', 2);

    for(var i = 2; i < buyWeaponsTable.rows.length; i++) {
        if(buyWeaponsTable.rows[i].cells[0].innerHTML.indexOf("Defense Weapons") >= 0) {
            buyWeaponsTable.rows[i].cells[3].setAttribute('colspan', 2);
            continue;
        }

        if(buyWeaponsTable.rows[i].cells[0].innerHTML.indexOf("Spy Tools") >= 0) {
            buyWeaponsTable.rows[i].cells[3].setAttribute('colspan', 2);
            continue;
        }

        if(buyWeaponsTable.rows[i].cells[0].innerHTML.indexOf("Sentry Tools") >= 0) {
            buyWeaponsTable.rows[i].cells[3].setAttribute('colspan', 2);
            continue;
        }

        if(buyWeaponsTable.rows[i].cells[0].innerHTML.indexOf("Buy Tools") >= 0)
	    continue;
        if(buyWeaponsTable.rows[i].cells.length < 4)
	    continue;

        buybutId = GetTextIn(buyWeaponsTable.rows[i].cells[3].innerHTML, "name=\"", "\"");
        buyWeaponsTable.rows[i].insertCell(4).innerHTML = "<button id=" + buybutId + " onClick='return false'>0</button>";
        buyWeaponsTable.rows[i].cells[4].align = "center";
        document.getElementById(buybutId).addEventListener('click', function(){ document.getElementsByName(this.id)[0].value = this.innerHTML; ArmoryPHP_UpdateWeaponButtons(); }, false);
        document.getElementsByName(buybutId)[0].addEventListener('blur', ArmoryPHP_UpdateWeaponButtons, false);
    }

    // Add another buy button and a clear button at top of the weapons
    buyWeaponsTable.insertRow(0).innerHTML = "<td colspan=5></td>";
    buyWeaponsTable.insertRow(0).innerHTML = "<td colspan=5 align=center style='background-color:#222222; border-bottom:1px solid #555555'>"
                                           + "<button id=buybut2 onClick='this.disabled=true; this.innerHTML=\"Buying...\"; document.buyform.buybut.click(); return false;' style='margin-right:-9ex'>Buy Weapons (B)</button>"
                                           + "<button id=clearButtonTop style='float:right; width:9ex' onClick='return false;'>Clear</button></td>";
    document.getElementById('clearButtonTop').addEventListener('click', ArmoryPHP_OnClearBuyButtons, false);

    // Add a clean button to the bottom
    buyWeaponsTable.rows[buyWeaponsTable.rows.length-1].cells[0].innerHTML += "<button id=clearButtonBottom style='float:right; width:9ex' onClick='return false;'>Clear</button>";
    document.getElementsByName('buybut')[0].style.marginRight = "-9ex";
    document.getElementById('clearButtonBottom').addEventListener('click', ArmoryPHP_OnClearBuyButtons, false);
    buyWeaponsTable.rows[buyWeaponsTable.rows.length-1].cells[0].style.backgroundColor = "#222222";

    // Add a buying note on top of the buy table
    buyWeaponsTable.insertRow(1).innerHTML = "<td style='background-color:#222222; border-bottom:0'>Buying:</td>"
                                           + "<td id=BuyingNote colspan=4 style='background-color:#222222; border-bottom:0'>Nothing</td>";

    ArmoryPHP_UpdateWeaponButtons();

    // Add keyboard shortcut for buying
	document.addEventListener('keyup',
	    function(e) {
		if(e.target.type == "text") return;
		if(e.target.type == "textarea") return;
		if(e.target.type == "select-one") return;

		switch(e.keyCode) {
		    case 66:    // B
			document.getElementById('buybut2').click();
			break;
		}
	    }, false);
}

function TrainPHP() {
    soldiers = GetSoldiers();

    // Put helper buttons for training
    AddSoldierButton("Attack Specialist", "assign_attack", TrainPHP_OnAssignSoldier);
    AddSoldierButton("Defense Specialist", "assign_defense", TrainPHP_OnAssignSoldier);
    AddSoldierButton("Spy", "assign_spy", TrainPHP_OnAssignSoldier);
    AddSoldierButton("Sentry", "assign_sentry", TrainPHP_OnAssignSoldier);

    document.getElementsByName('train[attacker]')[0].addEventListener('blur', TrainPHP_UpdateTrainingButtons, false);
    document.getElementsByName('train[defender]')[0].addEventListener('blur', TrainPHP_UpdateTrainingButtons, false);
    document.getElementsByName('train[spy]')[0].addEventListener('blur', TrainPHP_UpdateTrainingButtons, false);
    document.getElementsByName('train[sentry]')[0].addEventListener('blur', TrainPHP_UpdateTrainingButtons, false);

    TrainPHP_UpdateTrainingButtons();

    // Fix the training table spannings
    var t = GetTag('th', "Train Your Troops");
    if(t)
	t.attributes.getNamedItem('colspan').value++;

    t = GetTag('th', "Quantity");
    if(t)
	t.setAttribute('colspan', 2);

    t = GetElement('input', "Train!");
    if(t)
	t.parentNode.attributes.getNamedItem('colspan').value++;

    t = GetTag('td', "Reassign Attack Specialist");
    if(t)
	t.parentNode.innerHTML += "<td>&nbsp;</td>";

    t = GetTag('td', "Reassign Defense Specialist");
    if(t)
	t.parentNode.innerHTML += "<td>&nbsp;</td>";

    // Add a clean button next to the train button
    var input = GetElement('input', "Train!");

    if(input) {
        input.parentNode.innerHTML += "<button style=\"margin-left: 6px\" id=clear_training onClick=\"return false;\">Clear</button>";

        document.getElementById('clear_training').addEventListener('click', TrainPHP_ClearTraining, false);
    }

    // Remove the ! from the Train button (no other spend button has it)
    t = GetElement('input', "Train!");
    if(t)
	t.value = "Train (B)";

    // Hide the list of techs
    var th = GetTag('th', "Technological Development");

    if(th) {
        var table = th.parentNode.parentNode;

        if(table.rows.length > 3) {
            table.rows[2].cells[0].innerHTML += "<span id=toggle_techs style=\"float:right;\"><tt>-</tt></span>";
            table.rows[2].addEventListener('click', TrainPHP_OnToggleTechs, false);
            table.rows[2].style.cursor = 'pointer';

            // By default, hide techs
            TrainPHP_OnToggleTechs();
        }
    }

    var x;
    x = FindText(document.body.innerHTML,'upgrade_tech','strength');
    x = FindText(x, "(x "," ");
    GM_setValue("public_currentTech", x);

    // Get the required exp for the next tech
    var t = GetElement('input', "Research!");
    if(t) {
        var str = t.value.toString();
        var pos = str.indexOf(" ", 11);
        var exp = parseInt( str.substring(11, pos).replace(/,/g, ""), 10 );

        GM_setValue("public_nextTechExp", exp);
    }

    // Add keyboard shortcut for buying
    document.addEventListener('keyup',
	function(e) {
	    if(e.target.type == "text") return;
	    if(e.target.type == "textarea") return;
	    if(e.target.type == "select-one") return;

	    switch(e.keyCode) {
		case 66:    // B
		    t = GetElement('input', "Train");
		    t.click();
		    break;
	    }
	}, false);
}

function MercsPHP() {
    soldiers = GetSoldiers();
    mercs = GetAvailableMercs();

    // Put helper buttons for training
    AddSoldierButton("Attack Specialist", "assign_attack", MercsPHP_OnAssignMerc);
    AddSoldierButton("Defense Specialist", "assign_defense", MercsPHP_OnAssignMerc);
    AddSoldierButton("Untrained", "assign_untrained", MercsPHP_OnAssignMerc);

    document.getElementsByName('mercs[attack]')[0].addEventListener('blur', MercsPHP_UpdateMercButtons, false);
    document.getElementsByName('mercs[defend]')[0].addEventListener('blur', MercsPHP_UpdateMercButtons, false);
    document.getElementsByName('mercs[general]')[0].addEventListener('blur', MercsPHP_UpdateMercButtons, false);

    MercsPHP_UpdateMercButtons();

    // Fix the mercs table spannings and shorten some headers
    var t = GetTag('th', "Buy Mercenaries");
    if(t)
	t.attributes.getNamedItem('colspan').value++;

    t = GetTag('th', "Quantity to Buy");
    if(t)
	t.setAttribute('colspan', 2);

    t = GetElement('input', "Buy");
    if(t)
	t.parentNode.attributes.getNamedItem('colspan').value++;

    t =  GetTag('th', "Quantity Available");
    if(t)
	t.innerHTML = "Available";

    t = GetTag('th', "Quantity to Buy");
    if(t)
	t.innerHTML = "Quantity";

    // Fix a design bug (main container table is not 100% width in mercs.php)
    document.getElementsByTagName("table")[6].setAttribute('width', '100%');

    // Add a clean button next to the buy button
    var input = GetElement('input', "Buy");

    if(input) {
        input.parentNode.innerHTML += "<button style=\"margin-left: 6px\" id=clear_mercs onClick=\"return false;\">Clear</button>";
        document.getElementById('clear_mercs').addEventListener('click', MercsPHP_ClearMercs, false);
    }

    // Add b to Buy button
    t = GetElement('input', "Buy");
    if(t)
	t.value = "Buy (B)";

    // Add keyboard shortcut for buying
    document.addEventListener('keyup',
	function(e) {
	    if(e.target.type == "text") return;
	    if(e.target.type == "textarea") return;
	    if(e.target.type == "select-one") return;

	    switch(e.keyCode) {
		case 66:    // B
		    t = GetElement('input', "Buy");
		    t.click();
		    break;
	    }
	}, false);
}

function StatsPHP() {
    // Get the statid
    var endPos = public_url.indexOf("&");
    var statid = public_url.substring(41, endPos > 0 ? endPos : public_url.length);

    if(!IsNumeric(statid)) {
        CustomPage(statid);
        return;
    }

    //log inactive user
    if(document.body.innerHTML.indexOf("Invalid User ID") > 0) {
	GM_xmlhttpRequest({
	    method: "GET",
	    url: public_server + "basic.php?code=inactive&whoami=" + public_username + "&userid=" + statid,
	    onload: function(r) {
		document.body.innerHTML = document.body.innerHTML.replace("<h3>Error</h3>", "");
		document.body.innerHTML = document.body.innerHTML.replace("Invalid User ID", r.responseText);
	    }
	});
	return;
    }

    // Gather user specific information
    var username = GetText(">Name:<", "<td>", "<").trim();

    var commander = GetText(">Commander:<", "<td>", "</td>");
    if(commander != "None")
	commander = GetText(">Commander:<", "\">", "<");

    var alliance = GetText(">Alliances:", "<b>", "alliances.php?id=", ">", "<");
    if(alliance == "")
	alliance = "None";

    var race = GetText(">Race:", "<td>", "</td>");

    var rank = GetText("b>Rank:", "<td>", "</td>").replace(/,/g, "");

    var tff = GetText(">Army Size:", "<td>", "</td>").replace(/,/g, "");

    var morale = GetText(">Army Morale:", "<td>", "</td>").replace(/,/g, "");

    var treasury = GetText(">Treasury:", "<td>", "</td>").replace(/,/g, "");
    if(treasury == "")
	treasury = "???";

    var fortification = GetText(">Fortifications:", "<td>", "</td>").replace(/,/g, "");

    // Add place holders for additional data, such as treasury, tbg, ...
    var userTable = GetTag('th', "User Stats").parentNode.parentNode;
    var treasuryRow = 0;

    for(i = 0; i < userTable.rows.length; i++) {
        if(userTable.rows[i].innerHTML.indexOf("Army Morale") >= 0) {
            if(treasury == "???") {
                treasuryRow = userTable.insertRow(i+1);

                treasuryRow.insertCell(0).innerHTML = "<b>Treasury:</b>";
                treasuryRow.insertCell(1).innerHTML = "Loading...";
            }

            var tbgRow = userTable.insertRow(i+2);
            tbgRow.insertCell(0).innerHTML = "<b>TBG (1h):</b>";
            tbgRow.insertCell(1).innerHTML = AddCommas( Math.floor(tff * 60 * (race == "Dwarves" ? 1.15 : (race == "Humans" ? 1.3 : 1))).toString() );

            break;
        }
    }

    // Add place holders for user's stats
    var th = GetTag('th', "Recent Battles");

    if(!th)
	th = GetTag('th', "Recent Intelligence");

    if(!th)
	th = GetTag('th', "Officers");

    if(!th)
	return;

    var statsTableHtml = "<table width=100% class=table_lines cellspacing=0 cellpadding=6>"
                       + "<tr><th colspan=3>" + username + "'s Stats</th></tr>"
                       + "<tr><td width=30%><b>Strike Action</b></td><td align=right id=DB_sa width=40%>Loading...</td><td align=right id=DB_saTime>&nbsp;</td></tr>"
                       + "<tr><td><b>Defensive Action</b></td><td align=right id=DB_da>Loading...</td><td align=right id=DB_daTime>&nbsp;</td></tr>"
                       + "<tr><td><b>Spy Rating</b></td><td align=right id=DB_spy>Loading...</td><td align=right id=DB_spyTime>&nbsp;</td></tr>"
                       + "<tr><td><b>Sentry Rating</b></td><td align=right id=DB_sentry>Loading...</td><td align=right id=DB_sentryTime>&nbsp;</td></tr>"
                       + "</table><br /><br />";

    var statsPlace = th.parentNode.parentNode.parentNode.parentNode;
    statsPlace.innerHTML = statsTableHtml + statsPlace.innerHTML;

    // Update the database and get details about this target (fill placeholders)
    GM_xmlhttpRequest({
        method: "GET",
        url: public_server + "basic.php?code=statspage&whoami=" + public_username + "&username=" + username + "&userid=" + statid + "&commander=" + commander + "&race=" + race + "&rank=" + rank + "&tff=" + tff + "&morale=" + morale + "&gold=" + treasury + "&fortification=" + fortification,
        onload: function(r) {
	    document.getElementById('DB_sa').innerHTML = AddCommas(GetTextIn(r.responseText, "[SA]", "[/SA]"));
	    document.getElementById('DB_da').innerHTML = AddCommas(GetTextIn(r.responseText, "[DA]", "[/DA]"));
	    document.getElementById('DB_spy').innerHTML = AddCommas(GetTextIn(r.responseText, "[SPY]", "[/SPY]"));
	    document.getElementById('DB_sentry').innerHTML = AddCommas(GetTextIn(r.responseText, "[SENTRY]", "[/SENTRY]"));

	    document.getElementById('DB_saTime').innerHTML = GetTextIn(r.responseText, "[aSA]", "[/aSA]");
	    document.getElementById('DB_daTime').innerHTML = GetTextIn(r.responseText, "[aDA]", "[/aDA]");
	    document.getElementById('DB_spyTime').innerHTML = GetTextIn(r.responseText, "[aSPY]", "[/aSPY]");
	    document.getElementById('DB_sentryTime').innerHTML = GetTextIn(r.responseText, "[aSENTRY]", "[/aSENTRY]");

	    var DB_gold = AddCommas(GetTextIn(r.responseText, "[GOLD]", "[/GOLD]"));
	    var DB_goldTime = GetTextIn(r.responseText, "[aGOLD]", "[/aGOLD]");

	    // Update treasury
	    if(treasuryRow) {
		treasuryRow.cells[1].innerHTML = DB_gold + "<span style=\"margin-left: 20px;\">( " + DB_goldTime + " )</span>";
	    }
        }
    });

    // Collapse the recent battles and intelligence
    ExpandCollapseTable("Recent Battles");
    ExpandCollapseTable("Recent Intelligence");

    // Remove the ! from make commander button
    var t = GetElement('input', "Make " + username + " my commander!");
    if(t)
	t.value = "Make " + username + " my commander";

    //redesign user table
    var userTable = GetTag('th', "User Stats").parentNode.parentNode;

    // Merge rank and highest rank rows
    var rowId = GetTableRow(userTable, 0, "Rank:");
    if(rowId >= 0) {
        userTable.rows[rowId].cells[1].innerHTML += " &nbsp; ( " + userTable.rows[rowId + 1].cells[1].innerHTML + " )";
        userTable.deleteRow(rowId + 1);
    }

    // Merge buddy status and buddy button rows
    var rowId = GetTableRow(userTable, 0, "Buddy");
    if(rowId >= 0) {
        var buddyStatus = userTable.rows[rowId].cells[1].innerHTML;
        buddyStatus = buddyStatus.substring(0, buddyStatus.indexOf(">") + 1);
        buddyStatus = buddyStatus.replace(">", ">&nbsp;&nbsp;");

        var buddyForm = userTable.rows[rowId + 1].cells[0].innerHTML.replace("Recognize player as", "");
        userTable.rows[rowId].innerHTML = "<td><b>Buddy Status:</b></td><td style='padding-top:20px;'>" + buddyForm.replace("post\">", "post\">" + buddyStatus) + "</td>";

        userTable.deleteRow(rowId + 1);
        userTable.deleteRow(rowId - 1); // remove the empty row
    }

    // Collapse the alliances except the primary
    var rowId = GetTableRow(userTable, 0, "Alliances");
    if(rowId >= 0) {
        var expandedAlliances = userTable.rows[rowId].cells[1].innerHTML;

        var alliances = expandedAlliances.split(",");
        var primaryAlliance = 0;

        for(i = 0; i < alliances.length; i++) {
            if(alliances[i].indexOf("(Primary)") >= 0) {
                primaryAlliance = alliances[i];
                break;
            }
        }

        if(primaryAlliance) {
            userTable.rows[rowId].cells[1].innerHTML = primaryAlliance;

            if(alliances.length > 1) {
                userTable.rows[rowId].cells[1].innerHTML += ", <a style=\"cursor:pointer;\" id=showAlliances>(+)</a>";

                document.getElementById('showAlliances').addEventListener('click',
                    function() {
                        this.parentNode.innerHTML = expandedAlliances;
                    }, false);
            }
        }
    }

    var shortcuts = userTable.insertRow(1).insertCell(0);
    shortcuts.innerHTML = "<table border=0 cellspacing=0 cellpadding=4 width=100%><tr><td width=20% style=\"border:0\"><button id=sAttack style=\"width:100%\" onClick=\"this.innerHTML = 'Attacking...'; this.disabled = true; document.getElementsByName('attackbut')[0].click();\">Attack (a)" + "</button></td>"
                        + "<td width=20% style=\"border:0\"><button id=sRaid style=\"width:100%\" onClick=\"this.innerHTML = 'Raiding...';   this.disabled = true; document.getElementsByName('attackbut')[1].click();\">Raid (p)" + "</button></td>"
                        + "<td width=20% style=\"border:0\"><button id=sRecon style=\"width:100%\" onClick=\"this.innerHTML = 'Reconning...'; this.disabled = true; document.getElementsByName('spyrbut')[0].click();\">Recon (r)" + "</button></td>"
                        + "<td width=20% style=\"border:0\"><button id=sSab style=\"width:100%\" onClick=\"window.location = 'attack.php?id=" + statid + "#sab' \">Sabotage (s)" + "</button></td>"
						+ "<td width=20% style=\"border:0\"><button id=sMessage style=\"width:100%\" onClick=\"window.location = 'writemail.php?to=" + statid + "'\">Message (m)" + "</button></td>"
						+ "</tr></table>";

    shortcuts.setAttribute('colspan', 2);

    document.addEventListener('keydown',
	function(e) {
	    if(e.target.type == "text") return;
	    if(e.target.type == "textarea") return;
	    if(e.target.type == "select-one") return;

	    switch(e.keyCode) {
		case 65:    // A
		    document.getElementById('sAttack').click();
		    break;

		case 80:    // P
		    document.getElementById('sRaid').click();
		    break;

		case 82:    // R
		    document.getElementById('sRecon').click();
		    break;

		case 83:    // S
		    document.getElementById('sSab').click();
		    break;
		case 77:    // m
		    document.getElementById('sMessage').click();
		    break;
	    }
	}, false);

    //add old stats option
    var nameRE = /Officers\<\/th\>/ig;
    var q = document.getElementsByTagName('td');
    var statstable;
    var containerx;

    for(var i = 0; i < q.length; i++) {
	if(q[i].innerHTML.match(nameRE) && q[i].className == '') {
	    containerx = q[i];
	    break;
	}
    }

    statstable = document.createElement('table');
    statstable.className = 'table_lines';
    statstable.width = '100%';
    statstable.cellPadding = '6';
    statstable.cellSpacing = '0';
    containerx.insertBefore(statstable, containerx.childNodes[0]);
    containerx.insertBefore(document.createElement('br'), statstable.nextSibling);
    var row = statstable.insertRow(0);
    row.innerHTML = '<th colspan="3"><div id="OldData">View old stats</th>';
    document.getElementById("OldData").addEventListener('click', OldData, true);
}

function OldData() {
    var stuff = document.body.innerHTML;

    var user = FindText(FindText(stuff,"<td><b>Name:</b></td>","</tr>"),"<td>","</td>");

    ReturnRequest('basic.php?code=olddata&whoami=' + public_username + '&username=' + user,0,function(responseText){
	document.body.innerHTML = document.body.innerHTML + '<a name="PastStats" id="PastStats"></a>' + responseText;
	document.location = document.URL + '#PastStats';
    });
}

function AttackPHP() {
    var doc = document.body.innerHTML;

    if(doc.indexOf("Invalid User ID") > 0)
	return;

    var username = GetText("Target:", "\">", "<");
    if(username == "")
	return;

    // Add another sab button and change the original sab button to 'sab' instead of 'send spies'
    var th = GetTag('th', "Sabotage Mission");
    if(th)
	th.parentNode.parentNode.insertRow(1).innerHTML = "<td colspan=2 align=center><input name=spybut0 onclick=\"document.spy.spybut0.value='Sabotaging..'; document.spy.spybut0.disabled=true; document.spy.submit();\" type=submit value=\"Sab!\"></td>";
    document.getElementsByName('spybut')[0].value = "Sab!";

    // Put an additional +1 / +5 button next to the weapon amount in sab form
    document.getElementsByName('numsab')[0].parentNode.innerHTML += "<button style=\"margin-left: 20px;\" onClick=\"document.spy.numsab.value = parseInt(document.spy.numsab.value) + 1; return false;\">+1</button>"
                                                                  + "<button style=\"margin-left: 20px;\" onClick=\"document.spy.numsab.value = parseInt(document.spy.numsab.value) + 5; return false;\">+5</button>";


    // Add place holders for user's stats and move your stats above the personnel table
    var th = GetTag('th', "<span ");
    var statsPlace = th.parentNode.parentNode.parentNode.parentNode;

    var statsTableHtml = "<table width=100% class=table_lines cellspacing=0 cellpadding=6>"
                       + "<tr><th colspan=3>" + username + "'s Stats</th></tr>"
                       + "<tr><td width=30%><b>Strike Action</b></td><td align=right id=DB_sa width=40%>Loading...</td><td align=right id=DB_saTime>&nbsp;</td></tr>"
                       + "<tr><td><b>Defensive Action</b></td><td align=right id=DB_da>Loading...</td><td align=right id=DB_daTime>&nbsp;</td></tr>"
                       + "<tr><td><b>Spy Rating</b></td><td align=right id=DB_spy>Loading...</td><td align=right id=DB_spyTime>&nbsp;</td></tr>"
                       + "<tr><td><b>Sentry Rating</b></td><td align=right id=DB_sentry>Loading...</td><td align=right id=DB_sentryTime>&nbsp;</td></tr>"
                       + "<tr style='background-color:#111100;'><td><b>Recent Gold</b></td><td align=right id=DB_gold>Loading...</td><td align=right id=DB_goldTime>&nbsp;</td></tr>"
                       + "</table><br /><br />";

    var inventoryTableHtml = "<table width=100% class=table_lines border=0 cellspacing=0 cellpadding=6>"
                           + "<tr><th colspan=4>" + username + "'s Inventory</th></tr>"
                           + "<tr><th class=subh width=30%>Weapon</th><th class=subh colspan=2>Quantity</th><th class=subh width=%20>AAT</th></tr>"
                           + "<tr><td>Blackpowder Missile</td><td align=right id=DB_bpm>Loading...</td><td left=right id=DB_bpmTime>&nbsp;</td><td align=center id=DB_bpmAat>Loading...</td>"
                           + "<tr><td>Chariot</td><td align=right id=DB_ch>Loading...</td><td align=left id=DB_chTime>&nbsp;</td><td align=center id=DB_chAat>Loading...</td>"
                           + "<tr><td>Invisibility Shield</td><td align=right id=DB_is>Loading...</td><td align=left id=DB_isTime>&nbsp;</td><td align=center id=DB_isAat>Loading...</td>"
                           + "<tr><td>Dragonskin</td><td align=right id=DB_ds>Loading...</td><td align=left id=DB_dsTime>&nbsp;</td><td align=center id=DB_dsAat>Loading...</td>"
                           + "<tr><td>Nunchaku</td><td align=right id=DB_nun>Loading...</td><td align=left id=DB_nunTime>&nbsp;</td><td align=center id=DB_nunAat>Loading...</td>"
                           + "<tr><td>Lookout Tower</td><td align=right id=DB_lt>Loading...</td><td align=left id=DB_ltTime>&nbsp;</td><td align=center id=DB_ltAat>Loading...</td>"
                           + "</table>";

    // Remove the Personnel table, which is useless
    var personnelTableHtml = GetTag('th', "<span").parentNode.parentNode.innerHTML;
    statsPlace.innerHTML = statsPlace.innerHTML.replace(personnelTableHtml, "<br>");

    statsPlace.innerHTML = statsTableHtml + inventoryTableHtml + statsPlace.innerHTML;

    // Add place holders for the target's inventory and the last sab
    var sabotageTable = GetTag('th', "Sabotage Mission").parentNode.parentNode;

    var lastSabRow = sabotageTable.insertRow(sabotageTable.rows.length - 1);
    lastSabRow.insertCell(0).innerHTML = "Last Sab";
    lastSabRow.cells[0].width = "50%";

    // Show additional information about the target
    GM_xmlhttpRequest({
        method: "GET",
        url: public_server + "basic.php?code=showstats&whoami=" + public_username + "&username=" + username,
        onload: function(r) {
	    document.getElementById('DB_sa').innerHTML = AddCommas(GetTextIn(r.responseText, "[SA]", "[/SA]"));
	    document.getElementById('DB_da').innerHTML = AddCommas(GetTextIn(r.responseText, "[DA]", "[/DA]"));
	    document.getElementById('DB_spy').innerHTML = AddCommas(GetTextIn(r.responseText, "[SPY]", "[/SPY]"));
	    document.getElementById('DB_sentry').innerHTML = AddCommas(GetTextIn(r.responseText, "[SENTRY]", "[/SENTRY]"));

	    document.getElementById('DB_saTime').innerHTML = GetTextIn(r.responseText, "[tSA]", "[/tSA]");
	    document.getElementById('DB_daTime').innerHTML = GetTextIn(r.responseText, "[tDA]", "[/tDA]");
	    document.getElementById('DB_spyTime').innerHTML = GetTextIn(r.responseText, "[tSPY]", "[/tSPY]");
	    document.getElementById('DB_sentryTime').innerHTML = GetTextIn(r.responseText, "[tSENTRY]", "[/tSENTRY]");

	    document.getElementById('DB_gold').innerHTML = AddCommas(GetTextIn(r.responseText, "[GOLD]", "[/GOLD]"));
	    document.getElementById('DB_goldTime').innerHTML = GetTextIn(r.responseText, "[tGOLD]", "[/tGOLD]");

	    //lastSabRow.cells[0].innerHTML += "&nbsp;&nbsp;" + GetTextIn(r.responseText, "[tSAB]", "[/tSAB]");

	    document.getElementById('DB_bpm').innerHTML = GetTextIn(r.responseText, "[BPM]", "[/BPM]");
	    document.getElementById('DB_ch').innerHTML = GetTextIn(r.responseText, "[CH]", "[/CH]");
	    document.getElementById('DB_is').innerHTML = GetTextIn(r.responseText, "[IS]", "[/IS]");
	    document.getElementById('DB_ds').innerHTML = GetTextIn(r.responseText, "[DS]", "[/DS]");
	    document.getElementById('DB_nun').innerHTML = GetTextIn(r.responseText, "[NUN]", "[/NUN]");
	    document.getElementById('DB_lt').innerHTML = GetTextIn(r.responseText, "[LT]", "[/LT]");

	    document.getElementById('DB_bpmAat').innerHTML = GetTextIn(r.responseText, "[bBPM]", "[/bBPM]");
	    document.getElementById('DB_chAat').innerHTML = GetTextIn(r.responseText, "[bCH]", "[/bCH]");
	    document.getElementById('DB_isAat').innerHTML = GetTextIn(r.responseText, "[bBPM]", "[/bBPM]");
	    document.getElementById('DB_dsAat').innerHTML = GetTextIn(r.responseText, "[bDS]", "[/bDS]");
	    document.getElementById('DB_nunAat').innerHTML = GetTextIn(r.responseText, "[bBPM]", "[/bBPM]");
	    document.getElementById('DB_ltAat').innerHTML = GetTextIn(r.responseText, "[bBPM]", "[/bBPM]");
	}
    });

    // Remember sabotage settings for this target
    document.getElementsByTagName('select')[0].value = GM_getValue("public_sab_wep_" + username, 74);
    document.getElementsByName('numsab')[0].value = GM_getValue("public_sab_cnt_" + username, 11);
    document.getElementsByName('numspies')[0].value = GM_getValue("public_sab_spies_" + username, 1);
    document.getElementsByTagName('select')[1].value = 5;

    // Lower aat if cannot get through
    if(document.body.innerHTML.indexOf("you will never be able to get away") > 0) {
        if(document.getElementsByName('numsab')[0].value > 0) {
            document.getElementsByName('numsab')[0].value -= 1;
        }
    }

    // Listen the sab form
    document.getElementsByTagName('form')[2].addEventListener('submit', function() { AttackPHP_OnSubmitSab(username); }, false);

    // Add keyboard shortcuts
    document.getElementsByName('raidbut')[0].value = "Raid (p)";
    document.getElementsByName('attackbut')[0].value = "Attack (a)";
    document.getElementsByName('spyrbut')[0].value = "Recon (r)";
    document.getElementsByName('spybut')[0].value = "Sab (s)";
    document.getElementsByName('spybut0')[0].value = "Sab (s)";

    document.addEventListener('keydown',
	function(e) {
	    if(e.target.type == "text") return;
	    if(e.target.type == "textarea") return;
	    if(e.target.type == "select-one") return;

	    switch(e.keyCode) {
		case 65:    // A
		    document.getElementsByName('attackbut')[0].click();
		    break;
		case 80:    // P
		    document.getElementsByName('raidbut')[0].click();
		    break;
		case 82:    // R
		    document.getElementsByName('spyrbut')[0].click();
		    break;
		case 83:    // S
		    document.getElementsByName('spybut0')[0].click();
		    break;
	    }
	}, false);
}

function InteldetailPHP() {
    var doc = document.body.innerHTML;

    if(doc.indexOf("Your Chief of Intelligence dispatches") >= 0) { //sab
        if(doc.indexOf("armory undetected,") >= 0) {	//sab succeeded
            var reportId = public_url.substring(54, public_url.length);
            var sabbee = GetText("Your spies successfully enter ", "'s");
            var weapon = GetText("attempt to sabotage", "weapons of type ", ".");
            var amount = GetText("and destroy ", " of the ").replace(/,/g, "");

            if(amount == "")
		amount = 0;

            // Place holder for the logging
            var but = GetElement('input', "Attack / Spy Again");
            but.parentNode.innerHTML = but.parentNode.innerHTML + "<span id=logSab style=\"margin-left: 20px;\">Logging your sab...</span>";

            GM_xmlhttpRequest({
                method: "GET",
                url: public_server + "basic.php?code=logsabs&whoami=" + public_username + "&target=" + sabbee + "&weapon=" + weapon + "&amount=" + amount + "&rid=" + reportId,
                onload: function(r) {
		    document.getElementById('logSab').innerHTML = r.responseText;
                }
            });
        }
        else {	//sab failed, go back
            document.getElementsByTagName('form')[0].submit();
        }
    }
    else {  //recon
        if(doc.indexOf("with the information gathered") >= 0) {	//record recon
            var reportId = public_url.substring(54, public_url.length);

	    var username = GetText("your spy sneaks into ", "'s camp");
	    var statid = GetText("name=\"id\" value=\"", "\"");

            var sa = GetText(">Strike Action:<", "\">", "<").replace(/,/g, "");
            var da = GetText(">Defensive Action<", "\">", "<").replace(/,/g, "");
            var spy = GetText(">Spy Rating<", "\">", "<").replace(/,/g, "");
            var sentry = GetText(">Sentry Rating<", "\">", "<").replace(/,/g, "");

            var coverts = GetText(">Covert Operatives:<", "\">", "<").replace(/,/g, "");
	    var siege = GetText(">Siege Technology:<", "\">", "<").replace(/,/g, "");
            var turns = GetText(">Attack Turns:<", "\">", "<").replace(/,/g, "");
	    var up = GetText(">Unit Production:<", "\">", "<").replace(/,/g, "");

            var treasury = GetText(">Treasury<", "\">", "<").replace(/,/g, "").replace(" Gold", "");

            var table = GetTag('th', "Weapons").parentNode.parentNode;

            var BPM = "???";
            var IS = "???";
            var DS = "???";
            var CHR = "???";
            var NUN = "???";
	    var SK = "???";
	    var GH = "???";
            var LT = "???";
	    var GD = "???";

            for(var i = 2; i < table.rows.length; i++) {	//success
                if(table.rows[i].cells.length < 4)
		    continue;

                var wepName = table.rows[i].cells[0].innerHTML;
                var wepType = table.rows[i].cells[1].innerHTML;
                var wepCount = table.rows[i].cells[2].innerHTML.replace(/,/g, "");
                var wepStrength = table.rows[i].cells[3].innerHTML.replace(/,/g, "");
                wepStrength = wepStrength.substring(wepStrength.indexOf("/") + 1, wepStrength.length);

                if(wepCount == "???")
		    continue;

                // Find the weapon directly from its name
                if(wepName == "Blackpowder Missile") {
                    BPM = wepCount;
                }
                else if(wepName == "Invisibility Shield") {
                    IS = wepCount;
                }
                else if(wepName == "Dragonskin") {
                    DS = wepCount;
                }
                else if(wepName == "Chariot") {
                    CHR = wepCount;
                }
                else if(wepName == "Nunchaku") {
                    NUN = wepCount;
                }
                else if(wepName == "Skeleton Key") {
                    SK = wepCount;
                }
		else if(wepName == "Grappling Hook") {
                    GH = wepCount;
                }
		else if(wepName == "Lookout Tower") {
                    LT = wepCount;
                }
		else if(wepName == "Guard Dog") {
                    GD = wepCount;
                }

                // Find the weapon using type + strength
                if(wepType == "Attack" && wepStrength == "1000") {
                    BPM = wepCount;
                }
                else if(wepType == "Attack" && wepStrength == "600") {
                    CHR = wepCount;
                }
                else if(wepType == "Defend" && wepStrength == "1000") {
                    IS = wepCount;
                }
                else if(wepType == "Defend" && wepStrength == "256") {
                    DS = wepCount;
                }
                else if(wepType == "Spy" && wepStrength == "1000") {
                    NUN = wepCount;
                }
		else if(wepType == "Spy" && wepStrength == "600") {
                    SK = wepCount;
                }
		else if(wepType == "Spy" && wepStrength == "250") {
                    GH = wepCount;
                }
                else if(wepType == "Sentry" && wepStrength == "1000") {
                    LT = wepCount;
                }
		else if(wepType == "Sentry" && wepStrength == "250") {
                    GD = wepCount;
                }
            }

            var weapons = "[bpm]" + BPM + "[/bpm][is]" + IS + "[/is][nun]" + NUN + "[/nun][lt]" + LT + "[/lt][ch]" + CHR + "[/ch][ds]" + DS + "[/ds][sk]" + SK + "[/sk][gh]" + GH + "[/gh][gd]" + GD + "[/gd]";

            // Place holder for the logging
            var th = GetTag('th', "Treasury");
            th.parentNode.parentNode.innerHTML += "<tr><td></td></tr><tr><td style='padding-left: 4ex; border-bottom:0'><a href=attack.php?id=" + statid + "><button>Attack / Spy Again (rs)" + "</button></a><span id=logRecon style=\"margin-left: 20px;\">Logging your recon...</span></td></tr>";

            GM_xmlhttpRequest({
                method: "GET",
                url: public_server + "basic.php?code=logrecons&whoami=" + public_username + "&username=" + username + "&sa=" + sa + "&da=" + da +
		    "&spy=" + spy  + "&sentry=" + sentry + "&gold=" + treasury + "&weapons=" + weapons + "&coverts=" + coverts + "&rid=" + reportId +
		    "&siege=" + siege + "&turns=" + turns + "&up=" + up,
                onload: function(r) {
		    document.getElementById('logRecon').innerHTML = r.responseText;
                }
            });
        }
        else {	//failure, go back
            document.getElementsByTagName('form')[0].submit();
        }
    }

    // Add keyboard shortcuts
    document.getElementsByTagName('form')[0].innerHTML = document.getElementsByTagName('form')[0].innerHTML.replace("Attack / Spy Again", "Attack / Spy Again (rs)");

    document.addEventListener('keydown',
	function(e) {
	    if(e.target.type == "text") return;
	    if(e.target.type == "textarea") return;
	    if(e.target.type == "select-one") return;

	    switch(e.keyCode) {
		case 82:    // R
		    document.getElementsByTagName('form')[0].submit();
		    break;
		case 83:    // S
		    document.getElementsByTagName('form')[0].submit();
		    break;
	    }
	}, false);
}

function DetailPHP() {
    if(public_url.indexOf("suspense=1") >= 0) {    //remove suspense
        var th = GetTag('th', "Battle Report");
        var content = th.parentNode.parentNode.parentNode.parentNode;

        var scriptSource = GetTextIn(content.innerHTML, "<script", "</script>");

        if(scriptSource != "") {
            var content2 = content.innerHTML.replace(scriptSource, ">");

            content2 = content2.replace("table_lines battle", "table_lines");
            content2 = content2.replace("display: none", "");

            content.innerHTML = content2;
        }
    }

    // Scroll down to the useful part
    var but = GetElement('input', "Attack / Spy Again");
    but.scrollIntoView();

    // Log the attack
    var attackType = GetText("your soldiers are trained ", " specialists");

    if(attackType != "attack")
        return;

    var reportId = public_url.indexOf("suspense") >= 0 ? GetTextIn(public_url, "_id=", "&suspense") : public_url.substring(49, public_url.length);
    var treasury = 0;
    var opponent = GetText("casualties!", "<p>", "'s forces").trim();
    var result = document.body.innerHTML.indexOf("You <font ") > 0 ? "Successful" : "Defended";

    if(document.body.innerHTML.indexOf("You stole") >= 0) {
        treasury = parseInt(GetText("You stole", ">", "<").replace(/,/g, ""));

        // Add a shortcut to armory
        but.parentNode.innerHTML += "<a href=armory.php><button>Armory (B)" + "</button></a>";
        but = GetElement('input', "Attack / Spy Again");
    }

    // Add a placeholder for the result of the logging
    but.parentNode.innerHTML = but.parentNode.innerHTML.replace("Attack / Spy Again", "Attack / Spy Again (ap)");

    GM_xmlhttpRequest({
	method: "GET",
	url: public_server + "basic.php?code=logattacks&whoami=" + public_username + "&target=" + opponent + "&type=" + result + "&gold=" + treasury + "&rid=" + reportId,
	onload: function(r) {
	    document.getElementById('logAttack').innerHTML = r.responseText;
	}
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown',
	function(e) {
	    if(e.target.type == "text") return;
	    if(e.target.type == "textarea") return;
	    if(e.target.type == "select-one") return;

	    switch(e.keyCode) {
		case 65:    // A
		case 80:    // P
		    document.getElementsByTagName('form')[0].submit();
		    break;
		case 66:	// B
		    //go to armory
		    window.location.href = 'http://www.kingsofchaos.com/armory.php';
		    break;
	    }
	}, false);
}

function BattlefieldPHP() {
    // Disable ajax navigation on battlefield
    GetContentTD().innerHTML = GetContentTD().innerHTML;

    // Find the bf table
    var tables = document.getElementsByClassName("table_lines battlefield");
    if(tables.length == 0)
	return;

    bfTable = tables[0];

    // Dont let the alliance column dominate
    bfTable.rows[0].cells[1].width = "15%";

    // Log bf gold
    var logList = "";

    // Add an option to sort gold
    bfTable.rows[0].cells[4].innerHTML = "<input type=checkbox style='verticle-align:middle' id=SortTreasury " + (GM_getValue("public_sortTreasury", 1) == 1 ? "checked" : "") + "><label for=SortTreasury>Sort Treasury</label>";
    document.getElementById('SortTreasury').addEventListener('click', function(){ GM_setValue("public_sortTreasury", this.checked ? 1 : 0); window.location = window.location; }, false);

    if(GM_getValue("public_sortTreasury", 1) == 1) {
        var bf_gold = [];
        var bf_ids = [];
        var bf_rank = [];
        var bf_ids0 = [];   //unsorted original row ids
        var bf_html = [];

        // Sort the treasury
        for(var i = 0; i < bfTable.rows.length; i++) {
            if(bfTable.rows[i].cells.length < 7)
                continue;

            // remove the user's own row bg color
            bfTable.rows[i].setAttribute('bgColor', null);

            var gold_i = parseInt(bfTable.rows[i].cells[5].innerHTML.replace(/,/g, "").replace(" Gold", ""), 10);

            if(isNaN(gold_i))
                gold_i = -1;

            bf_gold.push(gold_i);
            bf_ids.push(i);
            bf_ids0.push(i);
            bf_html[i] = bfTable.rows[i].innerHTML.toString();
            bf_rank.push(parseInt(bfTable.rows[i].cells[6].innerHTML.replace(/,/g, "")));
        }

        // actual sorting is on integers
        for(var i = 0; i < bf_gold.length; i++) {
            for(var j = i + 1; j < bf_gold.length; j++) {
                var swap = 0;

                if(bf_gold[j] > bf_gold[i]){
                    swap = 1;
                }
                else if(bf_rank[j] < bf_rank[i]) {
                    swap = 1;
                }

                if(swap) {
                    var tmp = bf_gold[i];
                    bf_gold[i] = bf_gold[j];
                    bf_gold[j] = tmp;

                    tmp = bf_ids[i];
                    bf_ids[i] = bf_ids[j];
                    bf_ids[j] = tmp;

                    tmp = bf_rank[i];
                    bf_rank[i] = bf_rank[j];
                    bf_rank[j] = tmp;
                }
            }
        }

        // replace the rows using the sorted row ids
        for(var i = 0; i < bf_gold.length; i++) {
            bfTable.rows[bf_ids0[i]].innerHTML = bf_html[bf_ids[i]];
        }

	for(var i = 0; i < bfTable.rows.length; i++) {
	    if(bfTable.rows[i].cells.length != 7)
		continue;

	    var usernameInner = bfTable.rows[i].cells[2].innerHTML;
	    var username = GetTextIn(usernameInner, ">", "<");
	    var statid = GetTextIn(usernameInner, "id=", "\"");

	    var tff = bfTable.rows[i].cells[3].innerHTML.replace(/,/g, "");
	    var treasury = bfTable.rows[i].cells[5].innerHTML.replace(/,/g, "").replace(" Gold", "");
	    var rank = bfTable.rows[i].cells[6].innerHTML.replace(/,/g, "");

	    var alliance = bfTable.rows[i].cells[1].innerHTML;
	    alliance2 = GetTextIn(alliance, '>', '</a>');

	    alliance2 = 'None'; //temp

	    logList += "[user]" + username + "[/user]" + "[gold]" + treasury + "[/gold]" + "[tff]" + tff + "[/tff]" + "[userid]" + statid + "[/userid]" + "[alliance]" + alliance2 + "[/alliance]" + "[rank]" + rank + "[/rank]";

	    // Also make username links open in new tab
	    bfTable.rows[i].cells[2].innerHTML = bfTable.rows[i].cells[2].innerHTML.replace("href=", "target=_blank href=");
	}

	GM_xmlhttpRequest({
	    method: "GET",
	    url: public_server + "basic.php?code=logbattlefield&whoami=" + public_username + "&list=" + logList,
	    onload: function(r) {
		    for(var i = 0; i < bfTable.rows.length; i++) {
			    if(bfTable.rows[i].cells[5].innerHTML == "??? Gold")
				bfTable.rows[i].cells[5].innerHTML =  GetTextIn(r.responseText, "[aGOLD" + (i-1) + "]", "[/aGOLD" + (i-1) + "]") + " &nbsp <span style='color:yellow'>" + AddCommas(GetTextIn(r.responseText, "[GOLD" + (i-1) + "]", "[/GOLD" + (i-1) + "]")) + "</span> Gold";
		    }
	    }
	});
    }
    else {
	for(var i = 0; i < bfTable.rows.length; i++) {
		if(bfTable.rows[i].cells.length != 7)
		    continue;

		var usernameInner = bfTable.rows[i].cells[2].innerHTML;
		var username = GetTextIn(usernameInner, ">", "<");
		var statid = GetTextIn(usernameInner, "id=", "\"");

		var tff = bfTable.rows[i].cells[3].innerHTML.replace(/,/g, "");
		var treasury = bfTable.rows[i].cells[5].innerHTML.replace(/,/g, "").replace(" Gold", "");
		var rank = bfTable.rows[i].cells[6].innerHTML.replace(/,/g, "");

		var alliance = bfTable.rows[i].cells[1].innerHTML;
		alliance2 = GetTextIn(alliance, '>', '</a>');

		alliance2 = 'None'; //temp

		logList += "[user]" + username + "[/user]" + "[gold]" + treasury + "[/gold]" + "[tff]" + tff + "[/tff]" + "[userid]" + statid + "[/userid]" + "[alliance]" + alliance2 + "[/alliance]" + "[rank]" + rank + "[/rank]";

		// Also make username links open in new tab
		bfTable.rows[i].cells[2].innerHTML = bfTable.rows[i].cells[2].innerHTML.replace("href=", "target=_blank href=");
	}

	GM_xmlhttpRequest({
	    method: "GET",
	    url: public_server + "basic.php?code=logbattlefield&whoami=" + public_username + "&list=" + logList,
	    onload: function(r) {
		for(var i = 0; i < bfTable.rows.length; i++) {
		    if(bfTable.rows[i].cells[5].innerHTML == "??? Gold")
			{bfTable.rows[i].cells[5].innerHTML = GetTextIn(r.responseText, "[aGOLD" + (i-1) + "]", "[/aGOLD" + (i-1) + "]") + " &nbsp <span style='color:yellow'>" + AddCommas(GetTextIn(r.responseText, "[GOLD" + (i-1) + "]", "[/GOLD" + (i-1) + "]")) + "</span> Gold";}
		}
	    }
	});
    }

    // Left and right arrow keys navigates through the bf
    document.addEventListener('keyup',
	function(e) {
	    if(e.target.type == "text") return;
	    if(e.target.type == "textarea") return;
	    if(e.target.type == "select-one") return;

	    switch(e.keyCode) {
		case 37:    // left
		    var backLink = GetTag('a', "&lt;&lt; Back");
		    if(backLink)
			window.location = backLink.getAttribute('href');
		    break;
		case 39:    // right
		    var nextLink = GetTag('a', "Next &gt;&gt;");
		    if(nextLink)
			window.location = nextLink.getAttribute('href');
		    break;
	    }
	}, false);
}

function ConquestPHP() {
    // Add keyboard shortcuts to conquests
    var ConqNames = ["Wolves", "Halflings", "Gnomes", "Ogres", "Goblins", "Wraiths", "Giants", "Wizards"];
    var ConqKeys =  ['W',      'H',         'N',      'O',     'L',       'R',       'G',      'Z'];

    var conqTable = GetTable("Go on a Conquest");
    if(!conqTable)
	return;

    for(var i = 2; i < conqTable.rows.length; i++) {
        if(conqTable.rows[i].cells.length != 3)
	    continue;

        var conqName = conqTable.rows[i].cells[0].innerHTML.split("(")[0].trim();

        var idx = ConqNames.indexOf(conqName);
        if(idx < 0)
	    continue;

        conqTable.rows[i].cells[0].innerHTML = "(" + ConqKeys[idx].toLowerCase() + ") " + conqTable.rows[i].cells[0].innerHTML;
    }

    document.addEventListener('keydown',
        function(e) {
            if(e.target.type == "text") return;
            if(e.target.type == "textarea") return;
            if(e.target.type == "select-one") return;

            for(var i = 0; i < ConqKeys.length; i++) {
                if(e.keyCode == ConqKeys[i].charCodeAt(0)) {
                    GetElement('input', "Go on a conquest against " + ConqNames[i]).click();
                    break;
                }
            }
        }, false);
}

/*****************************************************************************/
/********************************* FUNCTION **********************************/
/*****************************************************************************/

function CheckForUpdate() {
    ReturnRequest("version.php", 0, function(responseText) {
	var currentVersion = GetTextIn(responseText, "[ver]", "[/ver]");
	if(currentVersion != public_version && responseText.search("[ver]") != -1) {
	    alert("You are running an old version of Public Stats Logger.")
	    GM_openInTab(public_server + "script/public_stats_logger.user.js");
	}
    });
}

function ReturnRequest(url,msg, cb) {
    GM_xmlhttpRequest({
	method: "GET",
	url: public_server + url,
	onload: function(responseDetails) {
	    cb(responseDetails.responseText);
	}
    });
}

function PrintableTime(elapsedMs) {
    var secs = elapsedMs / 1000;

    var months = parseInt( Math.floor(secs / 2592000) );
    secs -= months * 2592000;

    var days = parseInt( Math.floor(secs / 86400) );
    secs -= days * 86400;

    var hours = parseInt( Math.floor(secs / 3600) );
    secs -= hours * 3600;

    var minutes = parseInt( Math.floor(secs / 60) );
    secs -= minutes * 3600;

    secs = parseInt( Math.floor(secs) );

    var str = "";

    if(months > 0)
	str += (months + " month" + (months > 1 ? "s " : " "));

    if(days > 0)
	str += (days + " day" + (days > 1 ? "s " : " "));

    if(hours > 0)
	str += (hours + " hour" + (hours > 1 ? "s " : " "));

    if(minutes > 0)
	str += (minutes + " minute" + (minutes > 1 ? "s " : " "));

    if(secs > 0)
	str += (secs + " second" + (secs > 1 ? "s " : " "));

    return str.trim();
}

function GetText() {
    var doc = document.body.innerHTML;
    var pos = 0;

    for(var i = 0; i < (arguments.length - 1); i++) {
	pos = doc.indexOf(arguments[i], pos);
	if(pos < 0)
	    return "";
	pos += arguments[i].length;
    }

    var pos2 = doc.indexOf(arguments[arguments.length - 1], pos);
    if(pos2 < 0)
	return "";

    return doc.substring(pos, pos2);
}

function GetTextIn() {
    var pos = 0;

    for(var i = 1; i < (arguments.length - 1); i++) {
	pos = arguments[0].indexOf(arguments[i], pos);
	if(pos < 0)
	    return "";

	pos += arguments[i].length;
    }

    var pos2 = arguments[0].indexOf(arguments[arguments.length - 1], pos);

    if(pos2 < 0)
	return "";

    return arguments[0].substring(pos, pos2);
}

function FindText(str, str1, str2) {
    var pos1 = str.indexOf(str1);
    if (pos1 == -1)
	return "";

    pos1 += str1.length;

    var pos2 = str.indexOf(str2, pos1);
    if (pos2 == -1)
	return "";

    return str.substring(pos1, pos2);
}

function ExpandCollapseTable(header, collapse) {
    var th = GetTag("th", header);

    if(!th)
	return;

    th.innerHTML += "<span id=toggle_" + header.replace(/ /g, "_") + " style=\"float:right\"><tt>-</tt></span>";

    var table = th.parentNode.parentNode;

    table.rows[0].addEventListener('click', function(){OnExpColTable(header);}, false);
    table.rows[0].style.cursor = "pointer";

    //set the initial state
    if(collapse == undefined) {
	collapse = GM_getValue("public_expcol_" + header.replace(/ /g, "_"), 1) == 0;    // 1: expanded, 0: collapsed
    }

    if(collapse) {
	OnExpColTable(header);
    }
}

function OnExpColTable(header) {
    var th = GetTag("th", header);

    if(!th)
	return;

    var table = th.parentNode.parentNode;

    if(table.rows.length < 2)
	return;

    var display = (table.rows[1].style.display == "none" ? "" : "none");

    for(i = 1; i < table.rows.length; i++) {
	table.rows[i].style.display = display;
    }

    document.getElementById('toggle_' + header.replace(/ /g, "_")).innerHTML = "<tt>" + (display == "none" ? "+" : "-") + "</tt>";

    GM_setValue("public_expcol_" + header.replace(/ /g, "_"), display == "none" ? 0 : 1);
}

function GetTag(tag, inner) {
    var tagList = document.getElementsByTagName(tag);

    for(i =0; i < tagList.length; i++) {
	if(tagList[i].innerHTML.indexOf(inner) == 0)
	    return tagList[i];
    }

    return 0;
}

function GetTable(thInner) {
    var th = GetTag("th", thInner);

    if(!th)
	return 0;

    return th.parentNode.parentNode;
}

function GetTableRow(table, cellId, inner) {
    for(var i = 0; i < table.rows.length; i++) {
	if(table.rows[i].cells[cellId].innerHTML.indexOf(inner) >= 0)
	    return i;
    }

    return -1;
}

function GetContentTD() {
    var tables = document.getElementsByClassName("content");

    if(tables.length == 0)
	return 0;

    return tables[0];
}

function GetElement(elem, val) {
    var elemList = document.getElementsByTagName(elem);

    for(var i = 0; i < elemList.length; i++) {
	if(elemList[i].value.toString().indexOf(val) == 0)
	    return elemList[i];
    }

    return 0;
}

function AddCommas(sValue) {
    sValue = String(sValue);
    var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');

    while(sRegExp.test(sValue)) {
	sValue = sValue.replace(sRegExp, "$1,$2");
    }

    return sValue;
}

function GetSoldiers() {
    var tas = GetSoldier("Trained Attack Soldiers");
    var tam = GetSoldier("Trained Attack Mercenaries");
    var tds = GetSoldier("Trained Defense Soldiers");
    var tdm = GetSoldier("Trained Defense Mercenaries");
    var us  = GetSoldier("Untrained Soldiers");
    var um  = GetSoldier("Untrained Mercenaries");
    var spy = GetSoldier("Spies");
    var sentry = GetSoldier("Sentries");
    var tff = GetSoldier("Total Fighting Force");

    return {'tas' : tas, 'tam' : tam, 'tds' : tds, 'tdm' : tdm, 'us' : us, 'um' : um, 'spy' : spy, 'sentry' : sentry, 'tff' : tff};
}

function GetSoldier(type) {
    var soldierText = GetText(type, "right\">", "<");
    if(soldierText == "")
	return 0;

    return parseInt(soldierText.replace(/,/g, ""));
}

function AddSoldierButton(soldierName, buttonId, callback) {
    var td = GetTag('td', soldierName);

    if(td) {
        td.parentNode.innerHTML += "<td><button id=" + buttonId + " onClick=\"return false;\">0</button></td>";
        document.getElementById(buttonId).addEventListener('click', callback, false);
    }
}

function GetAvailableMerc(type) {
    var mercText = GetText('>' + type + '<', "right\">", "right\">", "<");
    if(mercText == "None" || mercText == "")
	return 0;

    return parseInt( mercText.replace(/,/g, "") );
}

function GetAvailableMercs() {
    var am = GetAvailableMerc("Attack Specialist");
    var dm = GetAvailableMerc("Defense Specialist");
    var um = GetAvailableMerc("Untrained");

    return {'am' : am, 'dm' : dm, 'um' : um};
}

function GetGold() {
    var goldText = GetText("Gold:", ">", "<");
    if(goldText == "")
	return 0;

    return parseInt( goldText.trim().replace(/,/g, "").replace('M', '000000') );
}

function removeComma(num) {
    return num.replace(/,/g, "");
}

function IsNumeric(sText) {
    var ValidChars = "0123456789.";
    var IsNumber = true;
    var Char;

    for (var i = 0; i < sText.length && IsNumber == true; i++) {
	Char = sText.charAt(i);
	if (ValidChars.indexOf(Char) == -1) {
	    IsNumber = false;
	}
    }

    return IsNumber;
}

function getClassIndex(classid,text) {
    var x = document.getElementsByClassName(classid);
    for(i=0;i<x.length;i++) {
	if(document.getElementsByClassName(classid)[i].innerHTML.match(text))
	    return i;
    }
}

function AddMenuItems(){
    var table = GetTag('td', "<img src=\"/images/menubar/age").parentNode.parentNode;
    table.insertRow(3).insertCell(0).innerHTML = "<a href=\"http://www.kingsofchaos.com/stats.php?id=targetlist\"><img alt=\"Target List\" src=\"http://vps20347.xlshosting.net/v1.0/img/menubar_targets.gif\"></a>";
}

//Returns: Multiply | Next Upgrade | Next Price | Next Multiply
function SiegeList(m) {
    switch(m) {
	case 'None': { return '1|Flaming Arrows|40,000|1.3'; break }
	case 'Flaming Arrows': { return '1.3|Ballistas|80,000|1.69'; break }
	case 'Ballistas': { return '1.69|Battering Ram|160,000|2.197'; break }
	case 'Battering Ram': { return '2.197|Ladders|320,000|2.85'; break }
	case 'Ladders': { return '2.85|Trojan Horse|640,000|3.71'; break }
	case 'Trojan Horse': { return '3.71|Catapults|1,280,000|4.82'; break }
	case 'Catapults': { return '4.82|War Elephants|2,560,000|6.27'; break }
	case 'War Elephants': { return '6.27|Siege Towers|5,120,000|8.15'; break }
	case 'Siege Towers': { return '8.15|Trebuchets|10,240,000|10.60'; break }
	case 'Trebuchets': { return '10.60|Black Powder|20,480,000|13.78'; break }
	case 'Black Powder': { return '13.78|Sappers|40,960,000|17.92'; break }
	case 'Sappers': { return '17.92|Dynamite|81,920,000|23.29'; break }
	case 'Dynamite': { return '23.29|Greek Fire|163,840,000|30.28'; break }
	case 'Greek Fire': { return '30.28|Cannons|327,680,000|39.37'; break }
	case 'Cannons': { return '39.37|Max|Max|Max'; break }
	default: { return 'Max|Max|Max|Max'; break }
    }
}

//Returns: Multiply | Next Upgrade | Next Price | Next Multiply
function FortList(m) {
    switch(m) {
	case 'Camp': { return '1|Stockade|40,000|1.25'; break }
	case 'Stockade': { return '1.25|Rabid Pitbulls|80,000|1.563'; break }
	case 'Rabid Pitbulls': { return '1.563|Walled Town|160,000|1.953'; break }
	case 'Walled Town': { return '1.953|Towers|320,000|2.441'; break }
	case 'Towers': { return '2.441|Battlements|640,000|3.052'; break }
	case 'Battlements': { return '3.052|Portcullis|1,280,000|3.815'; break }
	case 'Portcullis': { return '3.815|Boiling Oil|2,560,000|4.768'; break }
	case 'Boiling Oil': { return '4.768|Trenches|5,120,000|5.960'; break }
	case 'Trenches': { return '5.960|Moat|10,240,000|7.451'; break }
	case 'Moat': { return '7.451|Drawbridge|20,480,000|9.313'; break }
	case 'Drawbridge': { return '9.313|Fortress|40,960,000|11.642'; break }
	case 'Fortress': { return '11.642|Stronghold|81,920,000|14.552'; break }
	case 'Stronghold': { return '14.552|Palace|163,840,000|18.190'; break }
	case 'Palace': { return '18.190|Keep|327,680,000|22.737'; break }
	case 'Keep': { return '22.737|Citadel|655,360,000|28.422'; break }
	case 'Citadel': { return '28.422|Hand of God|1,310,720,000|35.527'; break }
	case 'Hand of God': { return '35.527|Max|Max|Max'; break }
	default: { return 'Max|Max|Max|Max'; break }
    }
}

/*************************** armory.php Functions *****************************/

function ArmoryPHP_OnClearLostLog() {
    var cf = confirm("Are you sure you want to clear the log?");
    if(!cf) return;

    for(var i = 0; i < 10; i++) {
        GM_setValue("public_lost_wep_log_" + i, "::");
    }

    window.location = "armory.php";
}

function ArmoryPHP_ReduceBloodEffect() {
    var bloodDiv = document.getElementById('bloodDiv');

    bloodDiv.style.opacity -= 0.1;

    if(bloodDiv.style.opacity > 0) {
        setTimeout(ArmoryPHP_ReduceBloodEffect, 100);
    }
    else {
        bloodDiv.style.display = 'none';
    }
}

function ArmoryPHP_UpdateWeaponButtons() {
    var totalGoldNeed = 0;
    var buyTable = GetTable("Buy Weapons");

    for(var i = 2; i < buyTable.rows.length; i++) {
        if(buyTable.rows[i].cells.length < 5)
	    continue;

        var buybutId = GetTextIn(buyTable.rows[i].cells[3].innerHTML, "name=\"", "\"");
        var wepCost = parseInt(buyTable.rows[i].cells[2].innerHTML.replace(/,/g, ""));
        var wepCount = parseInt(document.getElementsByName(buybutId)[0].value, 10);

        if(isNaN(wepCount) || wepCount < 0) {
            wepCount = 0;
            document.getElementsByName(buybutId)[0].value = 0;
        }

        totalGoldNeed += (wepCost * wepCount);
    }

    if(totalGoldNeed > gold) {
        if(this.name.length > 0) {
            this.value = 0;
            ArmoryPHP_UpdateWeaponButtons();
            return;
        }
    }

    // Update the buttons with the left amount and compose the buying note
    var leftGold = gold - totalGoldNeed;
    var buyingNote = [];

    for(var i = 2; i < buyTable.rows.length; i++) {
        if(buyTable.rows[i].cells.length < 5)
	    continue;

        var buybutId = GetTextIn(buyTable.rows[i].cells[3].innerHTML, "name=\"", "\"");
        var wepCost = parseInt(buyTable.rows[i].cells[2].innerHTML.replace(/,/g, ""));
        var wepCount = parseInt(document.getElementsByName(buybutId)[0].value, 10);

        document.getElementById(buybutId).innerHTML = wepCount + Math.floor(leftGold / wepCost);

        // buying note
        var wepName = buyTable.rows[i].cells[0].innerHTML;

        if(weaponList.indexOf(wepName) >= 0 && wepCount > 0) {
            buyingNote.push(wepCount + " " + wepName + (wepCount > 1 ? "s" : ""));
        }
    }

    // Update the buying note
    document.getElementById('BuyingNote').innerHTML = (buyingNote.length == 0 ? "Nothing" : buyingNote.join("<br />"));
}

function ArmoryPHP_OnClearBuyButtons() {
    var buyTable = GetTable("Buy Weapons");

    for(var i = 2; i < buyTable.rows.length; i++) {
        if(buyTable.rows[i].cells.length < 5)
	    continue;

        var buybutId = GetTextIn(buyTable.rows[i].cells[3].innerHTML, "name=\"", "\"");
        document.getElementsByName(buybutId)[0].value = 0;
    }

    ArmoryPHP_UpdateWeaponButtons();
}

function ArmoryPHP_OnSellButton() {
    var wepId = GetTextIn(this.parentNode.parentNode.innerHTML, "scrapsell[", "]");

    var wepBuyBut = document.getElementById("buy_weapon[" + wepId + "]");
    if(!wepBuyBut)
	return;

    var wepName = wepBuyBut.parentNode.parentNode.cells[0].innerHTML;
    if(weaponList.indexOf(wepName) < 0)
	return;

    var wepSellCount = parseInt( document.getElementsByName('scrapsell[' + wepId + ']')[0].value, 10 );
    if(wepSellCount < 0)
	return;

    GM_setValue("public_armory_" + wepName.replace(/ /g, "_") + "_sold", wepSellCount);
}

/*************************** train.php Functions *****************************/

function TrainPHP_OnAssignSoldier() {
    switch(this.id) {
        case 'assign_attack':
            document.getElementsByName('train[attacker]')[0].value = document.getElementById(this.id).innerHTML;
            break;

        case 'assign_defense':
            document.getElementsByName('train[defender]')[0].value = document.getElementById(this.id).innerHTML;
            break;

        case 'assign_spy':
            document.getElementsByName('train[spy]')[0].value = document.getElementById(this.id).innerHTML;
            break;

        case 'assign_sentry':
            document.getElementsByName('train[sentry]')[0].value = document.getElementById(this.id).innerHTML;
            break;
    }

    TrainPHP_UpdateTrainingButtons();
}

function TrainPHP_UpdateTrainingButtons() {
    var tattack = 1 * document.getElementsByName('train[attacker]')[0].value;
    var tdefense = 1 * document.getElementsByName('train[defender]')[0].value;
    var tspy = 1 * document.getElementsByName('train[spy]')[0].value;
    var tsentry = 1 * document.getElementsByName('train[sentry]')[0].value;

    if(tattack < 0 || isNaN(tattack))
	tattack = 0;

    if(tdefense < 0 || isNaN(tdefense))
	tdefense = 0;

    if(tspy < 0 || isNaN(tspy))
	tspy = 0;

    if(tsentry < 0 || isNaN(tsentry))
	tsentry = 0;

    var remainingSoldiers = soldiers.us - (tattack + tdefense + tspy + tsentry);

    if(remainingSoldiers < 0) {
        tattack = tdefense = tspy = tsentry = 0;
        remainingSoldiers = soldiers.us;
    }

    var remainingGold = gold - (tattack + tdefense) * 2000 - (tspy + tsentry) * 3500;
    if(remainingGold <= 0)
	remainingGold = 0;

    var remain2 = Math.min( Math.floor(remainingGold / 2000), remainingSoldiers );
    var remain3 = Math.min( Math.floor(remainingGold / 3500), remainingSoldiers );

    document.getElementById('assign_attack').innerHTML = remain2 ? tattack + remain2 : 0;
    document.getElementById('assign_defense').innerHTML = remain2 ? tdefense + remain2 : 0;
    document.getElementById('assign_spy').innerHTML = remain3 ? tspy + remain3 : 0;
    document.getElementById('assign_sentry').innerHTML = remain3 ? tsentry + remain3 : 0;

    document.getElementsByName('train[attacker]')[0].value = tattack;
    document.getElementsByName('train[defender]')[0].value = tdefense;
    document.getElementsByName('train[spy]')[0].value = tspy;
    document.getElementsByName('train[sentry]')[0].value = tsentry;
}

function TrainPHP_ClearTraining() {
    document.getElementsByName('train[attacker]')[0].value = 0;
    document.getElementsByName('train[defender]')[0].value = 0;
    document.getElementsByName('train[spy]')[0].value = 0;
    document.getElementsByName('train[sentry]')[0].value = 0;
    document.getElementsByName('train[unattacker]')[0].value = 0;
    document.getElementsByName('train[undefender]')[0].value = 0;

    TrainPHP_UpdateTrainingButtons();
}

function TrainPHP_OnToggleTechs() {
    var stateSpan = document.getElementById('toggle_techs');
    var state = stateSpan.innerHTML.indexOf("+") >= 0;
    var table = GetTag('th', "Technological Development").parentNode.parentNode;

    for(i = 3; i < table.rows.length; i++) {
        table.rows[i].style.display = state ? '' : 'none';
    }

    stateSpan.innerHTML = stateSpan.innerHTML.replace(state ? '+' : '-', state ? '-' : '+');
}

/*************************** mercs.php Functions *****************************/

function MercsPHP_OnAssignMerc() {
    switch(this.id) {
        case 'assign_attack':
            document.getElementsByName('mercs[attack]')[0].value = document.getElementById(this.id).innerHTML;
            break;

        case 'assign_defense':
            document.getElementsByName('mercs[defend]')[0].value = document.getElementById(this.id).innerHTML;
            break;

        case 'assign_untrained':
            document.getElementsByName('mercs[general]')[0].value = document.getElementById(this.id).innerHTML;
            break;
    }

    MercsPHP_UpdateMercButtons();
}

function MercsPHP_UpdateMercButtons() {
    var mattack = 1 * document.getElementsByName('mercs[attack]')[0].value;
    var mdefense = 1 * document.getElementsByName('mercs[defend]')[0].value;
    var muntrained = 1 * document.getElementsByName('mercs[general]')[0].value;

    if(mattack < 0 || isNaN(mattack))
	mattack = 0;

    if(mdefense < 0 || isNaN(mdefense))
	mdefense = 0;

    if(muntrained < 0 || isNaN(muntrained))
	muntrained = 0;

    var mercLimit = Math.floor((soldiers.tas + soldiers.tds + soldiers.us) / 3) - (soldiers.tam + soldiers.tdm + soldiers.um);

    if(mercLimit <= 0) {
        //you cannot but any more mercs
        var t = GetTag('h3', "Mercenaries");
        if(t && t.innerHTML.indexOf("You have ") < 0) {
            t.innerHTML += "<font color=red style=\"float: right; margin-right: 2ex;\">Warning: You have at least 25% mercs!</font>";
        }
    }

    mercLimit -= (mattack + mdefense + muntrained);

    if(mercLimit < 0) {
        mattack = mdefense = muntrained = 0;
        mercLimit = Math.floor((soldiers.tas + soldiers.tds + soldiers.us) / 3) - (soldiers.tam + soldiers.tdm + soldiers.um);

        if(mercLimit <= 0)
            mercLimit = 0;
    }

    var remainingGold = gold - (mattack + mdefense) * 4500 - muntrained * 3500;
    if(remainingGold <= 0)
	remainingGold = 0;

    var maxAttack = Math.min( Math.min( Math.floor(remainingGold / 4500), mercLimit ), mercs.am);
    var maxDefense = Math.min( Math.min( Math.floor(remainingGold / 4500), mercLimit ), mercs.dm);
    var maxUntrained = Math.min( Math.min( Math.floor(remainingGold / 3500), mercLimit ), mercs.um);

    document.getElementById('assign_attack').innerHTML = maxAttack ? mattack + maxAttack : 0;
    document.getElementById('assign_defense').innerHTML = maxDefense ? mdefense + maxDefense : 0;
    document.getElementById('assign_untrained').innerHTML = maxUntrained ? muntrained + maxUntrained : 0;

    document.getElementsByName('mercs[attack]')[0].value = mattack;
    document.getElementsByName('mercs[defend]')[0].value = mdefense;
    document.getElementsByName('mercs[general]')[0].value = muntrained;
}

function MercsPHP_ClearMercs() {
    document.getElementsByName('mercs[attack]')[0].value = 0;
    document.getElementsByName('mercs[defend]')[0].value = 0;
    document.getElementsByName('mercs[general]')[0].value = 0;

    MercsPHP_UpdateMercButtons();
}

/*************************** attack.php Functions *****************************/

function AttackPHP_OnSubmitSab(targetname) {
    // Remember sabotage settings for this target
    GM_setValue("public_sab_wep_" + targetname, document.getElementsByTagName('select')[0].value);
    GM_setValue("public_sab_cnt_" + targetname, document.getElementsByName('numsab')[0].value);
    GM_setValue("public_sab_spies_" + targetname, document.getElementsByName('numspies')[0].value);
}

/*************************** Custom page *****************************/

function CustomPage(page) {
    // Find the content holder
    var td = GetContentTD();
    if(td) {
        td.innerHTML = "<h3>Loading...</h3>Please wait...";

        GM_xmlhttpRequest({
            method: "GET",
            url: public_server + "basic.php?code=" + page + "&whoami=" + public_username,
            onload: function(r) {
                if(r.responseText.indexOf("[START]") >= 0) {
		    td.innerHTML = GetTextIn(r.responseText, "[START]", "[END]");

		    if(td.innerHTML == "")
			td.innerHTML = "<h3>Not available</h3>";
		}
		else {
		    td.innerHTML = "<h3>Not available</h3>";
		}
            }
        });
    }
}