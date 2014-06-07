// ==UserScript==
// @name           Lieby's - Colour Theme
// @namespace      http://*kingsofchaos.com/*
// @description    Colour
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// @exclude		   http://*.kingsofchaos.com/index.php*
// @exclude		   http://*.kingsofchaos.com/error.php*
// @exclude        http://www.kingsofchaos.com/stats.php*
// ==/UserScript==

// Author: Casper-TH

if (TehURL[0] == "armory") {
	Save_Autofill();
	var stuff = document.body.innerHTML;

	var getsol = stuff.split("Trained Attack Soldiers");
	var getsol = getsol[1].split('">');

	var Sol_SA = Math.floor(removeComma(getsol[1].split("<")[0])) + Math.floor(removeComma(getsol[2].split("<")[0]));
	var Sol_DA = Math.floor(removeComma(getsol[3].split("<")[0])) + Math.floor(removeComma(getsol[4].split("<")[0]));
	var Sol_UN = Math.floor(removeComma(getsol[5].split("<")[0])) + Math.floor(removeComma(getsol[6].split("<")[0]));
	var Sol_UN_DA = Sol_UN;
	var Spies = Math.floor(removeComma(getsol[8].split("<")[0]));
	var Sentries = Math.floor(removeComma(getsol[10].split("<")[0]));


 	var n = 0;
	var s = '<table style="border-top: 5px solid red; border-left: 5px solid red; border-right: 5px solid darkred; border-bottom: 5px solid darkred;"><tr><th>Attention!</th></tr>';

	var q = document.getElementsByTagName('table');
	var weaponstable;
	var toolstable;
	var statstable;
	var i;
	for(i = 0; i < q.length; i++) {
		if(q[i].innerHTML.match("Current Weapon Inventory")) {
			weaponstable = q[i];
		}
		if(q[i].innerHTML.match("Current Tool Inventory")) {
			toolstable = q[i];
		}
	}
	//alert(weaponstable.innerHTML);

	var allElements, thisElement;
	var htmlHead = document.getElementsByTagName("head")[0].innerHTML;
	var race = htmlHead.split('/images/css/');
	race = race[2].split('/');
	race = race[0].split(".css");
	race = race[0];
	var tech = Math.pow(1.05,GM_getValue("Technology"));
	var off = Math.floor(GM_getValue("Officers")) / 100;

	var da_race_factor = 1;
	var sa_race_factor = 1;
	var spy_race_factor = 1;
	var sentry_race_factor = 1;
	if (race == "Dwarves") da_race_factor = 1.4;
	if (race == "Orcs") da_race_factor = 1.2;
	if (race == "Orcs") sa_race_factor = 1.35;
	if (race == "Humans") spy_race_factor = 1.35;
	if (race == "Elves") spy_race_factor = 1.45;
	if (race == "Undead") sentry_race_factor = 1.35;

	var da = stuff.split("Defensive Action");
	da = da[1].split('right">');
	da = da[1].split('<');
	da = Math.floor(removeComma(da[0])*1);

	var sa = stuff.split("Strike Action");
	sa = sa[1].split('right">');
	sa = sa[1].split('<');
	sa = Math.floor(removeComma(sa[0])*1);

	var fort = stuff.split("Current Fortification");
	fort = fort[1].split('<td>');
	fort = fort[1].split('</td>');
	fort = fort[0].split(' ');
	var da_factor = get_da(fort[0]);

	var siege = stuff.split("Current Siege Technology");
	siege = siege[1].split('<td>');
	siege = siege[1].split('</td>');
	siege = siege[0].split(" ");
	var sa_factor = get_sa(siege[0]);

	var sell = 0;
	var value = 0;
	var cost = 0;
	var strength = 0;
	var amount = 0;
	var atta = 1;
	var spp = 1;
	var wea = 0;
	var too = 0;
	var SAStrength = 0;
	var DAStrength = 0;
	var SpyStrength = 0;
	var SentryStrength = 0;
	for (i = 2; i < weaponstable.rows.length; i++){
		if (weaponstable.rows[i].cells[1]) {
			if(weaponstable.rows[i].cells[1].innerHTML != "Quantity"){
				sellval = weaponstable.rows[i].innerHTML.split("Sell for ")[1];
				sellval = parseInt(removeComma(sellval.split(" Gold")[0]));
				strength = weaponstable.rows[i].innerHTML.split("/ ")[1];
				strength = parseInt(removeComma(strength.split("<")));
				if (weaponstable.rows[i-1].cells[0].innerHTML == "Defense Weapons") wea = 1;
				qty = parseInt(removeComma(weaponstable.rows[i].cells[1].innerHTML));
				if(GM_getValue('sabbed_'+weaponstable.rows[i].cells[0].innerHTML.replace(/ /g,"_"))){
					if(qty < GM_getValue('sabbed_'+weaponstable.rows[i].cells[0].innerHTML.replace(/ /g,"_"))){
						s+= "<tr><td>You have lost " + Math.floor(GM_getValue('sabbed_'+weaponstable.rows[i].cells[0].innerHTML.replace(/ /g,'_'))-qty) + " "+ weaponstable.rows[i].cells[0].innerHTML+"s!</td></tr>";
						log(GM_getValue("sabbed_"+weaponstable.rows[i].cells[0].innerHTML.replace(/ /g,'_')) - qty + " "+ weaponstable.rows[i].cells[0].innerHTML);
						n = 1;
						//alert(weaponstable.rows[i].cells[0].innerHTML);
					}
				}
				GM_setValue('sabbed_'+weaponstable.rows[i].cells[0].innerHTML.replace(/ /g,"_"), qty);
				if (wea == 0) SAStrength += (qty*strength);
				if (wea == 1) DAStrength += (qty*strength);
				sell += (qty*sellval);
				value += (qty*sellval*10/7);
				if ((wea == 0) && (GM_getValue("Armory_Eric","Yes") == "Yes")) weaponstable.rows[i].cells[2].innerHTML = weaponstable.rows[i].cells[2].innerHTML + " <div style=\"color: #905000; font-size: 80%; cursor: help;\" title=\"The strength of 1 weapon\">[" + addCommas(Math.round(strength * tech * off * sa_race_factor * sa_factor * 5)) + "]</div>";
				if ((wea == 1) && (GM_getValue("Armory_Eric","Yes") == "Yes")) weaponstable.rows[i].cells[2].innerHTML = weaponstable.rows[i].cells[2].innerHTML + " <div style=\"color: #905000; font-size: 80%; cursor: help;\" title=\"The strength of 1 weapon\">[" + addCommas(Math.round(strength * tech * off * da_race_factor * da_factor * 5)) + "]</div>";
			}
		}
	}

	for (i = 2; i < toolstable.rows.length; i++){
		if(toolstable.rows[i].cells[1].innerHTML != "Quantity"){
			toolsell = toolstable.rows[i].innerHTML.split("Sell for ")[1];
			toolsell = (parseInt(removeComma(toolsell.split(" Gold")[0])));
			strength = toolstable.rows[i].cells[2].innerHTML;
			strength = parseInt(removeComma(strength));
			qty = parseInt(removeComma(toolstable.rows[i].cells[1].innerHTML));
			if(GM_getValue('sabbed_'+toolstable.rows[i].cells[0].innerHTML.replace(/ /g,"_"))){
				if(qty < GM_getValue('sabbed_'+toolstable.rows[i].cells[0].innerHTML.replace(/ /g,"_"))){
					s+= "<tr><td>You have lost " + Math.floor(GM_getValue('sabbed_'+toolstable.rows[i].cells[0].innerHTML.replace(/ /g,'_'))-qty) + " "+ toolstable.rows[i].cells[0].innerHTML+"s!</td></tr>";
					log(GM_getValue("sabbed_"+toolstable.rows[i].cells[0].innerHTML.replace(/ /g,'_')) - qty + " "+ toolstable.rows[i].cells[0].innerHTML);
					n = 1;
				}
			}
			GM_setValue('sabbed_'+toolstable.rows[i].cells[0].innerHTML.replace(/ /g,"_"), qty);
			//alert('sabbed_'+toolstable.rows[i].cells[0].innerHTML.replace(/ /g,"_"));
			if (toolstable.rows[i-1].cells[0].innerHTML == "Sentry Tools") too = 1;
			if (too == 0) SpyStrength += (qty*strength);
			if (too == 1) SentryStrength += (qty*strength);
			qty = parseInt(removeComma(toolstable.rows[i].cells[1].innerHTML));
			sell += (qty*toolsell);
			value += (qty*toolsell*10/7);
			if ((too == 0) && (GM_getValue("Armory_Eric","Yes") == "Yes")) toolstable.rows[i].cells[2].innerHTML = toolstable.rows[i].cells[2].innerHTML + " <div style=\"color: #905000; font-size: 80%; cursor: help;\" title=\"The strength of 1 weapon\">[" + addCommas(Math.round(strength * tech * off * spy_race_factor * Math.pow(1.60,GM_getValue("Covert_Skill",15)))) + "]</div>";
			if ((too == 1) && (GM_getValue("Armory_Eric","Yes") == "Yes")) toolstable.rows[i].cells[2].innerHTML = toolstable.rows[i].cells[2].innerHTML + " <div style=\"color: #905000; font-size: 80%; cursor: help;\" title=\"The strength of 1 weapon\">[" + addCommas(Math.round(strength * tech * off * sentry_race_factor * Math.pow(1.60,GM_getValue("Covert_Skill",15)))) + "]</div>";

		}
	}

	var green = 0;
	var orange = 0;
	var red = 0;

    // Merv
    function DoColor(color, val) {
        return "<font color='" + color + "'>" + addCommas(val) + "</font>";
    }
	for (i = 0; i < weaponstable.rows.length; i++){
		//alert(weaponstable.rows[i].cells[0].innerHTML);
		if (weaponstable.rows[i].cells[0].innerHTML == "Current Weapon Inventory") weaponstable.rows[i].cells[0].innerHTML = weaponstable.rows[i].cells[0].innerHTML + ' (Total Sell Off Value: ' + addCommas(sell) + ' Gold)';
		if (weaponstable.rows[i].cells[1]) {
			if (i > 0) {
				if(weaponstable.rows[i].cells[0].innerHTML == "Defense Weapons") atta = 0;
				if(weaponstable.rows[i].cells[1].innerHTML != "Quantity"){
					sellval = weaponstable.rows[i].innerHTML.split("Sell for ")[1];
					sellval = parseInt(removeComma(sellval.split(" Gold")[0]));
					cost = sellval*10/7;
					qty = parseInt(removeComma(weaponstable.rows[i].cells[1].innerHTML));
					amount = Math.floor(removeComma(weaponstable.rows[i].cells[1].innerHTML));
					if (GM_getValue("Armory_Eric","Yes") == "Yes")  weaponstable.rows[i].cells[0].innerHTML = "<b>" + weaponstable.rows[i].cells[0].innerHTML + "</b> <span style=\"padding-left: 5px; color: silver; font-size: 80%; cursor: help;\" title=\"How many of these weapons you can loose per sab (5turns)\">(" + addCommas(Math.floor(value / 400 / cost)) + " aat)</span> <div id=\"div_eric_" + i + "\" style=\"padding-left: 5px; color: #FFCC00; font-size: 80%; cursor: help;\" title=\"The Sell Value of all your " + weaponstable.rows[i].cells[0].innerHTML + "s\">Sell: " + addCommas(Math.round(sellval * amount)) + "</div>";
					else weaponstable.rows[i].cells[0].innerHTML = "<b>" + weaponstable.rows[i].cells[0].innerHTML + "</b> <span style=\"padding-left: 5px; color: silver; font-size: 80%; cursor: help;\" title=\"How many of these weapons you can loose per sab (5turns)\">(" + addCommas(Math.floor(value / 400 / cost)) + " aat)</span>";
					if (atta == 1) {
						if (amount <= Sol_SA) {
							green = amount;
							Sol_SA -= amount;
						}
						else {
							if (amount < (Sol_SA + Sol_UN)) {
								green = Sol_SA;
								orange =  amount - Sol_SA;
								Sol_UN -= amount - Sol_SA;
								Sol_SA = 0;
							}
							else {
								green = Sol_SA;
								orange = Sol_UN;
								red = amount - Sol_UN - Sol_SA;
								Sol_UN = 0;
								Sol_SA = 0;
							}
						}
						// Merv
						var show_stuff = new Array();
						var m = 0;
						if ( (green > 0) && (green != removeComma(weaponstable.rows[i].cells[1].innerHTML)) ) { show_stuff[m] = DoColor("green", green); m++; }
						if ( (orange > 0) ) { show_stuff[m] = DoColor("orange", orange); m++; }
						if ( (red > 0) ) { show_stuff[m] = DoColor("red", red); }

						var show_stuff_all  =  (show_stuff.length > 0)  ?  "<div style=\"color: silver; font-size: 80%; cursor: help;\" title=\"Green = Amount of weapons held by Trained soldiers | Orange = Amount of weapons held by Untrained soldiers | Red = Amount of Unheld weapons\">[" + show_stuff.join(", ") + "]</div>"  :  "";
						if (GM_getValue("Armory_Eric","Yes") == "Yes") weaponstable.rows[i].cells[1].innerHTML = weaponstable.rows[i].cells[1].innerHTML + show_stuff_all;
						green = 0;
						orange = 0;
						red = 0;
					}
					else {
						if (amount <= Sol_DA) {
							green = amount;
							Sol_DA -= amount;
						}
						else {
							if (amount < (Sol_DA + Sol_UN_DA)) {
								green = Sol_DA;
								orange =  amount - Sol_DA;
								Sol_UN_DA -= amount - Sol_DA;
								Sol_DA = 0;
							}
							else {
								green = Sol_DA;
								orange = Sol_UN_DA;
								red = amount - Sol_UN_DA - Sol_DA;
								Sol_DA = 0;
								Sol_UN_DA = 0;
							}
						}
						// Merv
						var show_stuff = new Array();
						var m = 0;
						if ( (green > 0) && (green != removeComma(weaponstable.rows[i].cells[1].innerHTML)) ) { show_stuff[m] = DoColor("green", green); m++; }
						if ( (orange > 0) ) { show_stuff[m] = DoColor("orange", orange); m++; }
						if ( (red > 0) ) { show_stuff[m] = DoColor("red", red); }
						var show_stuff_all  =  (show_stuff.length > 0)  ?  "<div style=\"color: silver; font-size: 80%; cursor: help;\" title=\"Green = Amount of weapons held by Trained soldiers | Orange = Amount of weapons held by Untrained soldiers | Red = Amount of Unheld weapons\">[" + show_stuff.join(", ") + "]</div>"  :  "";

						if (GM_getValue("Armory_Eric","Yes") == "Yes") weaponstable.rows[i].cells[1].innerHTML = weaponstable.rows[i].cells[1].innerHTML + show_stuff_all;
						green = 0;
						orange = 0;
						red = 0;
					}
				}
			}
		}
	}
	for (i = 1; i < toolstable.rows.length; i++){
		if(toolstable.rows[i].cells[0].innerHTML == "Sentry Tools") spp = 0;
		if(toolstable.rows[i].cells[1].innerHTML != "Quantity"){
			toolsell = toolstable.rows[i].innerHTML.split("Sell for ")[1];
			toolsell = (parseInt(removeComma(toolsell.split(" Gold")[0])));
			cost = toolsell*10/7;
			qty = parseInt(removeComma(toolstable.rows[i].cells[1].innerHTML));
			amount = Math.floor(removeComma(toolstable.rows[i].cells[1].innerHTML));
			toolstable.rows[i].cells[0].innerHTML = "<b>" + toolstable.rows[i].cells[0].innerHTML + "</b> <span style=\"padding-left: 5px; color: silver; font-size: 80%; cursor: help;\" title=\"How many of these weapons you can loose per sab (5turns)\">(" + addCommas(Math.floor(value / 400 / cost)) + " aat)</span> <div id=\"div_eric_" + i + "\" style=\"padding-left: 5px; color: #FFCC00; font-size: 80%; cursor: help;\" title=\"The Sell Value of all your " + toolstable.rows[i].cells[0].innerHTML + "s\">Sell: " + addCommas(Math.round(toolsell * amount)) + "</div>";
			if (spp == 1) {
				if (amount <= Spies) {
					Spies -= amount;
					green = amount;
				}
				else {
					green = Spies;
					red = amount - Spies;
					Spies = 0;
				}
				// Merv
				var show_stuff = new Array();
				var m = 0;
				if ( (green > 0) && (green != removeComma(toolstable.rows[i].cells[1].innerHTML)) ) { show_stuff[m] = DoColor("green", green); m++; }
				if ( (red > 0) ) { show_stuff[m] = DoColor("red", red); }
				var show_stuff_all  =  (show_stuff.length > 0)  ?  "<div style=\"color: silver; font-size: 80%; cursor: help;\" title=\"Green = Amount of tools held by Spies | Red = Amount of Unheld tools\">[" + show_stuff.join(", ") + "]</div>"  :  "";

				if (GM_getValue("Armory_Eric","Yes") == "Yes") toolstable.rows[i].cells[1].innerHTML = toolstable.rows[i].cells[1].innerHTML + show_stuff_all;
				green = 0;
				red = 0;
			}
			else {
				if (amount <= Sentries) {
					Sentries -= amount;
					green = amount;
				}
				else {
					green = Sentries;
					red = amount - Sentries;
					Sentries = 0;
				}
				// Merv
				var show_stuff = new Array();
				var m = 0;
				if ( (green > 0) && (green != removeComma(toolstable.rows[i].cells[1].innerHTML)) ) { show_stuff[m] = DoColor("green", green); m++; }
				if ( (red > 0) ) { show_stuff[m] = DoColor("red", red); }
				var show_stuff_all  =  (show_stuff.length > 0)  ?  "<div style=\"color: silver; font-size: 80%; cursor: help;\" title=\"Green = Amount of tools held by Spies | Red = Amount of Unheld tools\">[" + show_stuff.join(", ") + "]</div>"  :  "";

				if (GM_getValue("Armory_Eric","Yes") == "Yes") toolstable.rows[i].cells[1].innerHTML = toolstable.rows[i].cells[1].innerHTML + show_stuff_all;
				green = 0;
				red = 0;
			}
		}
	}

 	s += "</table>";

	if (n == 1) {
		var prefs = document.getElementById("_md_prefs");
		if (!prefs) {
			addCSS(
				"#_md_prefs {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
			);
			var prefs = document.createElement("div");
			prefs.id = "_md_prefs";
			document.body.appendChild(prefs);
		}
		prefs.innerHTML = s;
		prefs.style.display="";
	}

	if (GM_getValue("Upgrade","Yes") == "Yes") {
		if (sa_factor != 0) {
			var sa_cost = Math.pow(2,Math.round(Math.log(sa_factor)/Math.log(1.30))) * 40000;
        	}
		else var sa_cost = 40000;

		if (da_factor != 0) {
			var da_cost = Math.pow(2,Math.round(Math.log(da_factor)/Math.log(1.25))) * 40000;
		}
	        else var da_cost = 40000;

		var DA_p = Math.floor(da / tech / off / da_race_factor / da_factor / 5);
		var SA_p = Math.floor(sa / tech / off / sa_race_factor / sa_factor / 5);

		GM_setValue("Tot_SA_Factor",Math.floor(100000 * tech * off * sa_race_factor * sa_factor * 5));
		GM_setValue("Tot_DA_Factor",Math.floor(100000 * tech * off * da_race_factor * da_factor * 5));
		GM_setValue("Tot_Spy_Factor",Math.floor(100000 * tech * off * spy_race_factor * Math.pow(1.60,GM_getValue("Covert_Skill",15))));
		GM_setValue("Tot_Sentry_Factor",Math.floor(100000 * tech * off * sentry_race_factor * Math.pow(1.60,GM_getValue("Covert_Skill",15))));

		GM_setValue("Max_SA","" + Math.floor(SAStrength * tech * off * sa_race_factor * sa_factor * 5));
		GM_setValue("Max_DA","" + Math.floor(DAStrength * tech * off * da_race_factor * da_factor * 5));
		GM_setValue("Max_Spy","" + Math.floor(SpyStrength * tech * off * spy_race_factor * Math.pow(1.60,GM_getValue("Covert_Skill",15))));
		GM_setValue("Max_Sentry","" + Math.floor(SentryStrength * tech * sentry_race_factor * off * Math.pow(1.60,GM_getValue("Covert_Skill",15))));

		var sell_no_sa;
		var sell_no_da;
		var sell_sa = 1;
		var sell_da = 1;
		var type_sa;
		var type_da;

		if (GM_getValue("Armory_1","2") == "1") {
			type_sa = "Blackpowder Missiles";
			strength_sa = 1000;
			sell_no_sa = Math.ceil((sa_cost - gold) / 700000);
			if (sell_no_sa > GM_getValue("sabbed_Blackpowder_Missile")) sell_sa = 0;
		}

		if (GM_getValue("Armory_1","2") == "2") {
			type_sa = "Chariots";
			strength_sa = 600;
			sell_no_sa = Math.ceil((sa_cost - gold) / 315000);
			if (sell_no_sa > GM_getValue("sabbed_Chariot")) sell_sa = 0;
		}
		if (GM_getValue("Armory_1","2") == "3") {
			type_sa = "Knives";
			strength_sa = 1;
			sell_no_sa = Math.ceil((sa_cost - gold) / 700);
			if (sell_no_sa > GM_getValue("sabbed_Knife")) sell_sa = 0;
		}
		if (GM_getValue("Armory_1","2") == "4") {
			type_sa = "Broken Sticks";
			strength_sa = 0;
			sell_no_sa = Math.ceil((sa_cost - gold) / 70);
			if (sell_no_sa > GM_getValue("sabbed_Broken_Stick")) sell_sa = 0;
		}

		if (GM_getValue("Armory_2","2") == "1") {
			type_da = "Invisibility Shields";
			strength_da = 1000;
			sell_no_da = Math.ceil((da_cost - gold) / 700000);
			if (sell_no_da > GM_getValue("sabbed_Invisibility_Shield")) sell_da = 0;
		}
		if (GM_getValue("Armory_2","2") == "2") {
			strength_da = 265;
			type_da = "Dragonskins";
			sell_no_da = Math.ceil((da_cost - gold) / 140000);
			if (sell_no_da > GM_getValue("sabbed_Dragonskin")) sell_da = 0;
		}

		if (sell_no_da < 0) sell_no_da = 0;
		if (sell_no_sa < 0) sell_no_sa = 0;

		var new_DA_p = (DA_p - strength_da * sell_no_da);
		var new_SA_p = (SA_p - strength_sa * sell_no_sa);
		var new_DA = Math.round(new_DA_p * tech * off * da_race_factor * da_factor*1.25 * 5);
		var new_SA = Math.round(new_SA_p * tech * off * sa_race_factor * sa_factor*1.30 * 5);

		var insertion = document.getElementsByTagName('tbody');

		var c = 0;
		var x = 0;
		var y = 0;
		while (insertion[c]) {
			if (insertion[c].innerHTML.split("Military Effectiveness")[1]) x = c;
			if (insertion[c].innerHTML.split("Buy Weapons")[1]) y = c;
			c++;
		}
		insertpoint=insertion[x];
		var lostweaps = insertpoint.insertRow(0);
		var upgradehelper = insertion[y];
		upgradehelper = upgradehelper.insertRow(0);


		var linkerdeel = "";
		linkerdeel += '<td width="25%" valign="top" colspan="3" style="padding-right: 0px; padding-left: 0px;">';
		linkerdeel += '<table  class="table_lines" width="100%" cellspacing="0" cellpadding="6" border="0">';
		linkerdeel += '<tr>';
		linkerdeel += '<th colspan="2">Lost Weapons Log &nbsp; (<a id="CL_weaponlog" style="cursor: pointer;">cl</a>)</th>';
		linkerdeel += '</tr>';
		var i = 1;
		while(GM_getValue("Sabbed_" + i,"") != "") {
			var d = new Date()
			var ds = "" + d.getTime() + "";
			timespan = Math.floor((ds - Math.floor(GM_getValue("Sabbed_Date_" + i,""))) / 1000)
			var time = "";
			if ((timespan > 1209600) && (time == "")) time += Math.floor(timespan / 604800) + ' weeks ago';
			if ((timespan > 604800) && (time == "")) time += '1 week ago';
			if ((timespan > 172800) && (time == "")) time += Math.floor(timespan / 86400) + ' days ago';
			if ((timespan > 86400) && (time == "")) time += '1 day ago';
			if ((timespan > 7200) && (time == "")) time += Math.floor(timespan / 3600) + ' hours ago';
			if ((timespan > 3600) && (time == "")) time += '1 hour ago';
			if ((timespan > 120) && (time == "")) time += Math.floor(timespan / 60) + ' minutes ago';
			if ((timespan > 60) && (time == "")) time += '1 minute ago';
			if ((timespan > 1) && (time == "")) time += timespan + ' seconds ago';
			if (time == "") time += '1 second ago';
			linkerdeel += '<tr>';
			linkerdeel += '<td>' + GM_getValue("Sabbed_" + i) + '</td>';
			linkerdeel += '<td align="right">' + time + '</td>';
			linkerdeel += '</tr>';
			i++;
		}
		linkerdeel += '</table>';

		var rechterdeel = "";
		var e_text = "Armory Suggestions <input type='button' id='expand_op' value='Settings' />";
		rechterdeel += '<td width="25%" valign="top" colspan="5" style="padding-right: 0px; padding-left: 0px;">';
		rechterdeel += '<table  class="table_lines" width="100%" cellspacing="0" cellpadding="6" border="0">';
		rechterdeel += '<tr>';
		rechterdeel += '<th colspan="3">' + e_text + '</th>';
		rechterdeel += '</tr>';


		rechterdeel += '<tr>';
		rechterdeel += '<td colspan="2"><b>Current Siege:</b></td>';
		rechterdeel += '<td align="right">' + siege[0] + ' (x ' + sa_factor + ')</td>';
		rechterdeel += '</tr>';

		var r_tmp = "";
		var r_s = "";

		if (sa_factor > 39) {
			r_tmp += '<tr>';
			r_tmp += '<td style="background-color: gray; cursor: help; padding: 0;" title="The Family congratulates you for your prestige"></td>';
			r_tmp += '<td colspan="2">Nothing left to upgrade...</td>';
			r_tmp += '</tr>';
		}

		if ((sell_sa == 0) && (sa_factor < 39)) {
			r_tmp += '<tr>';
			r_tmp += '<td style="background-color: orange; cursor: help; padding: 0;" title="The Family advices to save for upgrades"></td>';
			r_tmp += '<td>Not enough ' + type_sa + ' to upgrade!</td>';
			r_tmp += '<td align="right">' + addCommas(sell_no_sa) + ' required</td>';
			r_tmp += '</tr>';
		}
		if ((sell_sa != 0) && (sa_factor < 39)) {
			r_s += ' (sell ' + addCommas(sell_no_sa) + ' ' + type_sa + ')';
			if (sa > new_SA) {
				var loss = Math.round((1-new_SA/sa)*100);
				r_tmp += '<tr>';
				r_tmp += '<td style="background-color: red; cursor: help; padding: 0;" title="The Family advices NOT to upgrade"></td>';
				r_tmp += '<td>Current SA: ' + addCommas(sa) + '</td>';
				r_tmp += '<td align="right">New SA: ' + addCommas(new_SA) + ' (<font color="red">-' + loss + '%</font>)</td>';
				r_tmp += '</tr>';
			}
			else {
				var gain = Math.round((new_SA/sa-1)*100);
				r_tmp += '<tr>';
				r_tmp += '<td style="background-color: lime; cursor: help; padding: 0;" title="The Family advices to upgrade"></td>';
				r_tmp += '<td>Current SA: ' + addCommas(sa) + '</td>';
				r_tmp += '<td align="right">New SA: ' + addCommas(new_SA) + ' (<font color="green">+' + gain + '%</font>)</td>';
				r_tmp += '</tr>';
			}
		}


        var MervColors = new Array("lime", "red", "orange", "gray");
        for (var i = 0; i < MervColors.length; i++) {
            if (r_tmp.match("color: " + MervColors[i])) {
                var MervColor = MervColors[i];
                break;
            }
        }

		if (sa_factor < 39) {
			rechterdeel += '<tr>';
			rechterdeel += '<td style="background-color: ' + MervColor + '; width: 4px; padding: 0;"></td>';
			rechterdeel += '<td>Upgrade Cost</td>';
			rechterdeel += '<td align="right">' + addCommas(sa_cost) + r_s +'</td>';
			rechterdeel += '</tr>';
		}

		rechterdeel += r_tmp;

		rechterdeel += '<tr>';
		rechterdeel += '<td colspan="2"><b>Current Fortification:</b></td>';
		rechterdeel += '<td align="right">' + fort[0] + ' (x ' + da_factor + ')</td>';
		rechterdeel += '</tr>';

		var r_tmp = "";
		var r_s = "";

		if (da_factor > 35) {
			r_tmp += '<tr>';
			r_tmp += '<td style="background-color: gray; cursor: help; padding: 0;" title="The Family congratulates you for your prestige"></td>';
			r_tmp += '<td colspan="2">Nothing left to upgrade...</td>';
			r_tmp += '</tr>';
		}

		if ((sell_da == 0) && (da_factor < 35)) {
			r_tmp += '<tr>';
			r_tmp += '<td style="background-color: orange; cursor: help; padding: 0;" title="The Family advices to save for upgrade"></td>';
			r_tmp += '<td>Not enough ' + type_da + ' to upgrade!</td>';
			r_tmp += '<td align="right">' + addCommas(sell_no_da) + ' required</td>';
			r_tmp += '</tr>';
		}
		if ((sell_da != 0) && (da_factor < 35)) {
			r_s += ' (sell ' + addCommas(sell_no_da) + ' ' + type_da + ')';

			if (da > new_DA) {
				var loss = Math.round((1-new_DA/da)*100);
				r_tmp += '<tr>';
				r_tmp += '<td style="background-color: red; cursor: help; padding: 0;" title="The Family advices NOT to upgrade"></td>';
				r_tmp += '<td>Current DA: ' + addCommas(da) + '</td>';
				r_tmp += '<td align="right">New DA: ' + addCommas(new_DA) + ' (<font color="red">-' + loss + '%</font>)</td>';
				r_tmp += '</tr>';
			}
			else {
				var gain = Math.round((new_DA/da-1)*100);
				r_tmp += '<tr>';
				r_tmp += '<td style="background-color: lime; cursor: help; padding: 0;" title="The Family advices to upgrade"></td>';
				r_tmp += '<td>Current DA: ' + addCommas(da) + '</td>';
				r_tmp += '<td align="right">New DA: ' + addCommas(new_DA) + ' (<font color="green">+' + gain + '%</font>)</td>';
				r_tmp += '</tr>';
			}
		}

        var MervColors = new Array("lime", "red", "orange", "gray");
        for (var i = 0; i < MervColors.length; i++) {
            if (r_tmp.match("color: " + MervColors[i])) {
                var MervColor = MervColors[i];
                break;
            }
        }

		if (da_factor < 35) {
			rechterdeel += '<tr>';
			rechterdeel += '<td style="background-color: ' + MervColor + '; width: 4px; padding: 0;"></td>';
			rechterdeel += '<td>Upgrade Cost</td>';
			rechterdeel += '<td align="right">' + addCommas(da_cost) + r_s +'</td>';
			rechterdeel += '</tr>';
		}

		rechterdeel += r_tmp;
		rechterdeel += '</table>';
		rechterdeel += '</td>';

		lostweaps.vAlign="top";
		upgradehelper.vAlign="top";
		lostweaps.innerHTML=linkerdeel;
		upgradehelper.innerHTML=rechterdeel;
		document.getElementById("expand_op").addEventListener('click', ArmorySettings_Big, true);
	}


    if (document.getElementById('CL_weaponlog')) {
        var elmLink = document.getElementById('CL_weaponlog');
    	elmLink.addEventListener("click", ClearLostWeaponLog, true);
    	Edit_Stats();
	}



    // Merv - Buttons
    window.addEventListener('keydown', KeyCheck, true);




}

function Save_Autofill() {
	var userprefs=document.getElementsByTagName('input');
	var i = 0;
	while(userprefs[i]) {
		if (userprefs[i].name == 'prefs[attack]') GM_setValue("Auto_SA",userprefs[i].value);
		if (userprefs[i].name == 'prefs[defend]') GM_setValue("Auto_DA",userprefs[i].value);
		if (userprefs[i].name == 'prefs[spy]') GM_setValue("Auto_Spy",userprefs[i].value);
		if (userprefs[i].name == 'prefs[sentry]') GM_setValue("Auto_Sentry",userprefs[i].value);
		i++;
	}
}

function Edit_Stats() {
	if (GM_getValue("Armory_Eric","Yes") == "Yes") {
		var q = document.getElementsByTagName('table');
		var statstable;
		var i;
		for(i = 0; i < q.length; i++) {
			if(q[i].innerHTML.match("Military Effectiveness")) {
				statstable = q[i];
			}
		}
		for (i = 0; i < statstable.rows.length; i++){
			if (statstable.rows[i].cells[1]) {
				if ((statstable.rows[i].cells[0].innerHTML.match("<b>Strike Action</b>")) && (Math.floor(removeComma(statstable.rows[i].cells[1].innerHTML)) < 0.999 * Math.floor(GM_getValue("Max_SA")))) {
					statstable.rows[i].cells[1].innerHTML = "" + statstable.rows[i].cells[1].innerHTML + "<div style=\"color: silver; font-size: 80%; cursor: help;\" title=\"When all your weapons are held\">When held: " + addCommas(Math.floor(GM_getValue("Max_SA"))) + "</div>";
				}
				if ((statstable.rows[i].cells[0].innerHTML.match("<b>Defensive Action</b>")) && (Math.floor(removeComma(statstable.rows[i].cells[1].innerHTML)) < 0.999 * Math.floor(GM_getValue("Max_DA")))) {
					statstable.rows[i].cells[1].innerHTML = "" + statstable.rows[i].cells[1].innerHTML + "<div style=\"color: silver; font-size: 80%; cursor: help;\" title=\"When all your weapons are held\">When held: " + addCommas(Math.floor(GM_getValue("Max_DA"))) + "</div>";
				}
				if ((statstable.rows[i].cells[0].innerHTML.match("<b>Spy Rating</b>")) && (Math.floor(removeComma(statstable.rows[i].cells[1].innerHTML)) < Math.floor(GM_getValue("Max_Spy")))) {
					statstable.rows[i].cells[1].innerHTML = "" + statstable.rows[i].cells[1].innerHTML + "<div style=\"color: silver; font-size: 80%; cursor: help;\" title=\"When all your tools are held\">When held: " + addCommas(Math.floor(GM_getValue("Max_Spy"))) + "</div>";
				}
				if ((statstable.rows[i].cells[0].innerHTML.match("<b>Sentry Rating</b>")) && (Math.floor(removeComma(statstable.rows[i].cells[1].innerHTML)) < Math.floor(GM_getValue("Max_Sentry")))) {
					statstable.rows[i].cells[1].innerHTML = "" + statstable.rows[i].cells[1].innerHTML + "<div style=\"color: silver; font-size: 80%; cursor: help;\" title=\"When all your tools are held\">When held: " + addCommas(Math.floor(GM_getValue("Max_Sentry"))) + "</div>";
				}
			}
		}
	}
}

function TBG_Clear() {
	var insertion = document.getElementsByTagName('tbody');

	var c = 0;
	var x = 0;
	while (insertion[c]) {
		if (insertion[c].innerHTML.split("Recent Attacks on You")[1]) x = c;
		c++;
	}
	insertpoint=insertion[x];
	insertpoint.deleteRow(insertpoint.rows.length - 1);
	TBG_Info();
}


function TBG_Info() {
	if (GM_getValue("TBG_An","Yes") == "Yes") {
		var insertion = document.getElementsByTagName('tbody');
		var stuff = document.body.innerHTML;
		var TBG = stuff.split("Projected Income</b></td>");
		TBG = TBG[1].split(">");
		TBG = TBG[1].split(" ");
		TBG = Math.floor(removeComma(TBG[0]));
		var c = 0;
		var x = 0;
		while (insertion[c]) {
			if (insertion[c].innerHTML.split("Recent Attacks on You")[1]) x = c;
			c++;
		}
		insertpoint=insertion[x];
		var TBGTable = insertpoint.insertRow(insertpoint.rows.length);

		var SA_p = 100;
		var DA_p = 100;
		var Spy_p = 100;
		var Sentry_p = 100;

		if (GM_getValue("TBG_1") == 2) {
			SA_p = GM_getValue("Auto_SA",100);
			DA_p = GM_getValue("Auto_DA",100);
			Spy_p = GM_getValue("Auto_Spy",100);
			Sentry_p = GM_getValue("Auto_Sentry",100);
		}

		var time1 = 1;
		var time2 = 24;

		if (GM_getValue("TBG_2") == 2) {
			time1 = 168;
			time2 = 720;
		}

		var rechterdeel = "";
		var e_text = "TBG Analyzer <input type='button' id='expand_tbg' value='Settings' />";
		rechterdeel += '<td width="25%" valign="top" colspan="5" style="padding-right: 0px; padding-left: 0px;">';
		rechterdeel += '<table  class="table_lines" width="100%" cellspacing="0" cellpadding="6" border="0">';
		rechterdeel += '<tr>';
		rechterdeel += '<th colspan="3">' + e_text + '</th>';
		rechterdeel += '</tr>';

		rechterdeel += '<tr>';
		rechterdeel += '<th class="subh" align="left">&nbsp;</th>';
		if (time1 == 1) {
			rechterdeel += '<th class="subh" align="left">1 Hour </th>';
			rechterdeel += '<th class="subh" align="left">1 Day </th>';
		}
		else {
			rechterdeel += '<th class="subh" align="left">1 Week </th>';
			rechterdeel += '<th class="subh" align="left">1 Month </th>';
		}
		rechterdeel += '</tr>';

		rechterdeel += '<tr>';
		rechterdeel += '<td class="subh">Income </td>';
		rechterdeel += '<td class="subh">' + addCommas(TBG * 60 * time1) + ' </td>';
		rechterdeel += '<td class="subh">' + addCommas(TBG * 60 * time2) + ' </td>';
		rechterdeel += '</tr>';

		rechterdeel += '<tr>';
		rechterdeel += '<td class="subh">SA Increase (' + SA_p + '%)</td>';
		rechterdeel += '<td class="subh">' + addCommas(Math.round(SA_p / 100 * TBG * 60 * time1 / 450000 * 600 * GM_getValue("Tot_SA_Factor",0) / 100000)) + ' </td>';
		rechterdeel += '<td class="subh">' + addCommas(Math.round(SA_p / 100 * TBG * 60 * time2 / 450000 * 600 * GM_getValue("Tot_SA_Factor",0) / 100000)) + ' </td>';
		rechterdeel += '</tr>';

		rechterdeel += '<tr>';
		rechterdeel += '<td class="subh">DA Increase (' + DA_p + '%)</td>';
		rechterdeel += '<td class="subh">' + addCommas(Math.round(DA_p / 100 * TBG * 60 * time1 / 200000 * 256 * GM_getValue("Tot_DA_Factor",0) / 100000)) + ' </td>';
		rechterdeel += '<td class="subh">' + addCommas(Math.round(DA_p / 100 * TBG * 60 * time2 / 200000 * 256 * GM_getValue("Tot_DA_Factor",0) / 100000)) + ' </td>';
		rechterdeel += '</tr>';

		rechterdeel += '<tr>';
		rechterdeel += '<td class="subh">Spy Increase (' + Spy_p + '%)</td>';
		rechterdeel += '<td class="subh">' + addCommas(Math.round(Spy_p / 100 * TBG * 60 * time1 / 1000 * GM_getValue("Tot_Spy_Factor",0) / 100000)) + ' </td>';
		rechterdeel += '<td class="subh">' + addCommas(Math.round(Spy_p / 100 * TBG * 60 * time2 / 1000 * GM_getValue("Tot_Spy_Factor",0) / 100000)) + ' </td>';
		rechterdeel += '</tr>';

		rechterdeel += '<tr>';
		rechterdeel += '<td class="subh">Sentry Increase (' + Sentry_p + '%)</td>';
		rechterdeel += '<td class="subh">' + addCommas(Math.round(Sentry_p / 100 * TBG * 60 * time1 / 1000 * GM_getValue("Tot_Sentry_Factor",0) / 100000)) + ' </td>';
		rechterdeel += '<td class="subh">' + addCommas(Math.round(Sentry_p / 100 * TBG * 60 * time2 / 1000 * GM_getValue("Tot_Sentry_Factor",0) / 100000)) + ' </td>';
		rechterdeel += '</tr>';

		rechterdeel += '</table>';

		TBGTable.vAlign="top";
		TBGTable.innerHTML=rechterdeel;
		document.getElementById("expand_tbg").addEventListener('click', TBGSettings_Big, true);
	}
}

function TBGSettings_Big(event){
	var tbg = document.getElementById("_md_tbg");
	if (!tbg) {
		addCSS(
			"#_md_tbg {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
		);
		var tbg = document.createElement("div");
		tbg.id = "_md_tbg";
			document.body.appendChild(tbg);
	}
	var s = "<div>";
	s += "<table border='2'>";

	s += "<tr>";
	s += "<th colspan='2'>TBG Analyzer Settings</th>"
	s += "</tr>";

	var option_1 = "";
	var option_2 = "";
	var option_3 = "";
	var option_4 = "";
	if (GM_getValue("TBG_1","1") == 1) option_1 = 'selected="selected"';
	if (GM_getValue("TBG_1","1") == 2) option_2 = 'selected="selected"';

	s += "<tr>";
	s += "<td>Stats Gaining</td>"
	s += "<td><select><option id='TBG1_1'" + option_1 + "value='1'>Normal Spending (100% each)</option><option id='TBG_2'" + option_2 + "value='1'>Armory Autofill Spending</option></select></td>";
	s += "</tr>";

	var option_1 = "";
	var option_2 = "";
	if (GM_getValue("TBG_2","1") == 1) option_1 = 'selected="selected"';
	if (GM_getValue("TBG_2","1") == 2) option_2 = 'selected="selected"';

	s += "<tr>";
	s += "<td>Timespan</td>"
	s += "<td><select><option id='TBG2_1'" + option_1 + "value='1'>1h and 1 day</option><option id='TBG2_2'" + option_2 + "value='1'>1 week and 1 month</option></select></td>";
	s += "</tr>";

	s += "</table>";

	s += "&nbsp;<input type='button' id='min_tbg' value='Save' /><div style='float:left; width: 15%;'></div>";
	tbg.innerHTML = s;

	document.getElementById("min_tbg").addEventListener('click', TBG_Save_Settings, true);
	document.getElementById("min_tbg").addEventListener('click', TBGSettings_Small, true);
	tbg.style.display="";
}

function TBG_Save_Settings(event) {
	var userprefs=document.getElementsByTagName('option');
	var i = 0;
	GM_setValue("TBG_1","2");
	GM_setValue("TBG_2","2");
	while(userprefs[i]) {
		if ((userprefs[i].id == 'TBG1_1') && (userprefs[i].selected)) GM_setValue("TBG_1","1");
		if ((userprefs[i].id == 'TBG2_1') && (userprefs[i].selected)) GM_setValue("TBG_2","1");
		i++;
	}
}

function TBGSettings_Small(event){
	var tbg = document.getElementById("_md_tbg");
	if (!tbg) {
		addCSS(
			"#_md_tbg {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
		);
		var tbg = document.createElement("div");
		tbg.id = "_md_tbg";
			document.body.appendChild(tbg);
	}
	var s = "";
	tbg.innerHTML = s;
	document.getElementById("expand_tbg").addEventListener('click', TBGSettings_Big, true);
	tbg.style.display="";
	ShowSettings_Small();
	TBG_Clear();
}

function ArmorySettings_Big(event){
	var armor = document.getElementById("_md_armor");
	if (!armor) {
		addCSS(
			"#_md_armor {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
		);
		var armor = document.createElement("div");
		armor.id = "_md_armor";
			document.body.appendChild(armor);
	}
	var s = "<div>";
	s += "<table border='2'>";

	s += "<tr>";
	s += "<th colspan='2'>Armory Upgrade Settings</th>"
	s += "</tr>";

	var option_1 = "";
	var option_2 = "";
	var option_3 = "";
	var option_4 = "";
	if (GM_getValue("Armory_1","2") == 1) option_1 = 'selected="selected"';
	if (GM_getValue("Armory_1","2") == 2) option_2 = 'selected="selected"';
	if (GM_getValue("Armory_1","2") == 3) option_3 = 'selected="selected"';
	if (GM_getValue("Armory_1","2") == 4) option_4 = 'selected="selected"';

	s += "<tr>";
	s += "<td>SA Weapons to sell</td>"
	s += "<td><select><option id='Armory1_1'" + option_1 + "value='1'>Blackpowder Missiles</option><option id='Armory1_2'" + option_2 + "value='1'>Chariots</option><option id='Armory1_3'" + option_3 + "value='3'>Knives</option><option id='Armory1_4'" + option_4 + "value='4'>Broken Sticks</option></select></td>";
	s += "</tr>";

	var option_1 = "";
	var option_2 = "";
	if (GM_getValue("Armory_2","2") == 1) option_1 = 'selected="selected"';
	if (GM_getValue("Armory_2","2") == 2) option_2 = 'selected="selected"';

	s += "<tr>";
	s += "<td>DA Weapons to sell</td>"
	s += "<td><select><option id='Armory2_1'" + option_1 + "value='1'>Invisibility Shields</option><option id='Armory2_2'" + option_2 + "value='1'>Dragonskins</option></select></td>";
	s += "</tr>";

	s += "</table>";

	s += "&nbsp;<input type='button' id='min_arm' value='Save' /><div style='float:left; width: 15%;'></div>";
	armor.innerHTML = s;

	document.getElementById("min_arm").addEventListener('click', Armory_Save_Settings, true);
	document.getElementById("min_arm").addEventListener('click', ArmorySettings_Small, true);
	armor.style.display="";
}

function Armory_Save_Settings(event) {
	var userprefs=document.getElementsByTagName('option');
	var i = 0;
	GM_setValue("Armory_1","4");
	GM_setValue("Armory_2","2");
	while(userprefs[i]) {
		if ((userprefs[i].id == 'Armory1_1') && (userprefs[i].selected)) GM_setValue("Armory_1","1");
		if ((userprefs[i].id == 'Armory1_2') && (userprefs[i].selected)) GM_setValue("Armory_1","2");
		if ((userprefs[i].id == 'Armory1_3') && (userprefs[i].selected)) GM_setValue("Armory_1","3");
		if ((userprefs[i].id == 'Armory2_1') && (userprefs[i].selected)) GM_setValue("Armory_2","1");

		i++;
	}
}

function ArmorySettings_Small(event){
	var armor = document.getElementById("_md_armor");
	if (!armor) {
		addCSS(
			"#_md_armor {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
		);
		var armor = document.createElement("div");
		armor.id = "_md_armor";
			document.body.appendChild(armor);
	}
	var s = "";
	armor.innerHTML = s;
	document.getElementById("expand_op").addEventListener('click', ArmorySettings_Big, true);
	var elmLink = document.getElementById('CL_weaponlog');
	elmLink.addEventListener("click", ClearLostWeaponLog, true);
	armor.style.display="";
	window.location.href="http://www.kingsofchaos.com/armory.php";
}

function ClearLostWeaponLog() {
    if (confirm("Would you like to clear your Lost Weapons List ?")) {
        var i = 1;
        var delvar1 = "";
        var delvar2 = "";
        while (i <= 5) {
            delvar1 = "Sabbed_" + i;
            delvar2 = "Sabbed_Date_" + i;
            GM_deleteValue(delvar1);
            GM_deleteValue(delvar2);
            i++;
        }
        window.location.href="http://www.kingsofchaos.com/armory.php";
    }
}
if (TehURL[0] == "base") {
	
	var b_nick = 0;
	var b_unid = 0;

	var userNamePart = document.title.slice(18).split("'");
	var userName = userNamePart[0];
	if (userNamePart[0]) GM_setValue("kocUserName",userName);

	var getuid = document.body.innerHTML;
	unique = getuid.split("http://www.kingsofchaos.com/recruit.php?uniqid=");
	unique = unique[1].split("\"");
	uniqueid = unique[0];
	if (unique[0]) GM_setValue("UniqueID",uniqueid);

	if (!GM_getValue("kocUserName")) {
		alert("I have problems reading your koc name. I will refresh and try again.");
		b_nick = 1;
		window.location.reload();
	}
	if (!GM_getValue("UniqueID")) {
		alert("I have problems reading you recruit link. I will refresh and try again.");
		b_unid = 1;
		window.location.reload();
	}

	if ((b_nick == 0) && (b_unid == 0)) {

		Edit_Stats();
		TBG_Info();
		my_chain();
		var stuff = document.body.innerHTML;
		var sta = stuff.split(">Military Effectiveness<");
		sta = sta[1].split('<td align="right">');
		Sa = sta[1].split("<");
		Sa = Sa[0];
		Sa = removeComma(Sa);
		GM_setValue("Sa",Sa);
		Da = sta[3].split("<");
		Da = Da[0];
		Spy = sta[5].split("<");
		Spy = Spy[0];
		Spy = removeComma(Spy);
		GM_setValue("Spy",Spy);
		Sen = sta[7].split("<");
		Sen = Sen[0];
	
		var weapons = "";
		weapons += "&Blackpowder_Missile=" + GM_getValue("sabbed_Blackpowder_Missile",0);
		weapons += "&Invisibility_Shield=" + GM_getValue("sabbed_Invisibility_Shield",0);
		weapons += "&Nunchaku=" + GM_getValue("sabbed_Nunchaku",0);
		weapons += "&Chariot=" + GM_getValue("sabbed_Chariot",0);
		weapons += "&Dragonskin=" + GM_getValue("sabbed_Dragonskin",0);
		weapons += "&Lookout_Tower=" + GM_getValue("sabbed_Lookout_Tower",0);
	
		var hits = stuff.split(">Recent Attacks on You<");
		var thit = "";
		var hitstring = "";
		hits = hits[1].split("<tr><td>");
	
		var c = 1;
		while (c < 6) {
			if (hits[c]) {
				thit = hits[c].split(" Gold stolen</td>");
				if (thit[1]) {
					thit = thit[0].split("</td><td>");
					thit = thit.join("|");
					hitstring += thit + ';';
				}
			}
			c++;
		}

		if (GM_getValue("settings_size") == "Big") ShowSettings();
		else ShowSettings_Small();
		Show_Welcome();
	}
}
	
function ShowSettings_Small(event){
	var settings = document.getElementById("_md_settings");
	if (!settings) {
	addCSS(
			"#_md_settings {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
		);
		var settings = document.createElement("div");
		settings.id = "_md_settings";
			document.body.appendChild(settings);
	}
	var s = "<div>";
	s += "&nbsp;<input type='button' id='expand' value='Suitcase Settings' /><div style='float:left; width: 15%;'></div>";
	settings.innerHTML = s;
	document.getElementById("expand").addEventListener('click', ShowSettings_Big, true);
	settings.style.display="";
}

function ShowSettings_Big(event) {
	var settings = document.getElementById("_md_settings");
	if (!settings) {
		addCSS(
			"#_md_settings {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
		);
		var settings = document.createElement("div");
		settings.id = "_md_settings";
			document.body.appendChild(settings);
	}
	var s = "<div>";

	s += "<table border='2'>";

	s += "<tr>";
	s += "<th colspan='2'>Suitcase Settings</th>"
	s += "</tr>";

	var option_yes = "";
	var option_no = "";
	if (GM_getValue("ShowStats","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("ShowStats","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Show Stats? </td>"
	s += "<td><select><option id='Stats_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("SendSabs","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("SendSabs","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Send Sabs? </td>"
	s += "<td><select><option id='Sabs_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("ReplaceGold","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("ReplaceGold","Yes") == "No") option_no = 'selected="selected"';

	s += "<td>Replace Gold? </td>"
	s += "<td><select><option id='Gold_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("Reload","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("Reload","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Reload Sab/Recon? </td>"
	s += "<td><select><option id='Reload_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("Buttons","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("Buttons","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Show extra Buttons? </td>"
	s += "<td><select><option id='Buttons_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("Upgrade","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("Upgrade","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Show Armory Help? </td>"
	s += "<td><select><option id='Upgrade_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("Message","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("Message","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Show Last Message? </td>"
	s += "<td><select><option id='Message_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("Show_Clock","No") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("Show_Clock","No") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Show Clock? </td>"
	s += "<td><select><option id='Show_Clock_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	/* Suitcase Helper disabled so no need for button
	option_yes = "";
	option_no = "";
	if (GM_getValue("Show_Helper","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("Show_Helper","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Show Helper? </td>"
	s += "<td><select><option id='Show_Helper_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";
	*/

	option_yes = "";
	option_no = "";
	if (GM_getValue("Instant_BF","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("Instant_BF","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Instant Attack Summary? </td>"
	s += "<td><select><option id='Instant_BF_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("TBG_An","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("TBG_An","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>TBG Analyzer? </td>"
	s += "<td><select><option id='TBG_An_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("Armory_Eric","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("Armory_Eric","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Erics Weapons Editor </td>"
	s += "<td><select><option id='Armory_Eric_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";

	option_yes = "";
	option_no = "";
	if (GM_getValue("LaCN_NewsBar","Yes") == "Yes") option_yes = 'selected="selected"';
	if (GM_getValue("LaCN_NewsBar","Yes") == "No") option_no = 'selected="selected"';

	s += "<tr>";
	s += "<td>Show NewsBar</td>"
	s += "<td><select><option id='LaCN_NewsBar_Yes'" + option_yes + "value='Yes'>Yes</option><option " + option_no + " value='No'>No</option></select></td>";
	s += "</tr>";


	s += "<tr>";
	s += "<td>Suitcase Pass </td>"
	s += "<input type='password' size='8' name='pass' value='" + GM_getValue("FamilyCode") + "' />";
	s += "</tr>";

	s += "</table>";

	s += "&nbsp;<input type='button' id='expand' value='Save' /><div style='float:left; width: 15%;'></div>";
	settings.innerHTML = s;
	document.getElementById("expand").addEventListener('click', Save_Settings, true);
	document.getElementById("expand").addEventListener('click', ShowSettings_Small, true);
	settings.style.display="";
}

function Save_Settings(event) {
	var userprefs=document.getElementsByTagName('option');
	var i = 0;
	GM_setValue("ShowStats","No");
	GM_setValue("SendSabs","No");
	GM_setValue("ReplaceGold","No");
	GM_setValue("Reload","No");
	GM_setValue("Buttons","No");
	GM_setValue("Upgrade","No");
	GM_setValue("Message","No");
	GM_setValue("Show_Clock","No");
	GM_setValue("Show_Helper","No");
	GM_setValue("Instant_BF","No");
	GM_setValue("TBG_An","No");
	GM_setValue("Armory_Eric","No");
	GM_setValue("LaCN_NewsBar","No");

	while(userprefs[i]) {
		if ((userprefs[i].id == 'Show_Helper_Yes') && (userprefs[i].selected)) GM_setValue("Show_Helper","Yes");
		if ((userprefs[i].id == 'Show_Clock_Yes') && (userprefs[i].selected)) GM_setValue("Show_Clock","Yes");
		if ((userprefs[i].id == 'Stats_Yes') && (userprefs[i].selected)) GM_setValue("ShowStats","Yes");
		if ((userprefs[i].id == 'Sabs_Yes') && (userprefs[i].selected)) GM_setValue("SendSabs","Yes");
		if ((userprefs[i].id == 'Gold_Yes') && (userprefs[i].selected)) GM_setValue("ReplaceGold","Yes");
		if ((userprefs[i].id == 'Reload_Yes') && (userprefs[i].selected)) GM_setValue("Reload","Yes");
		if ((userprefs[i].id == 'Buttons_Yes') && (userprefs[i].selected)) GM_setValue("Buttons","Yes");
		if ((userprefs[i].id == 'Upgrade_Yes') && (userprefs[i].selected)) GM_setValue("Upgrade","Yes");
		if ((userprefs[i].id == 'Message_Yes') && (userprefs[i].selected)) GM_setValue("Message","Yes");
		if ((userprefs[i].id == 'Instant_BF_Yes') && (userprefs[i].selected)) GM_setValue("Instant_BF","Yes");
		if ((userprefs[i].id == 'TBG_An_Yes') && (userprefs[i].selected)) GM_setValue("TBG_An","Yes");
		if ((userprefs[i].id == 'Armory_Eric_Yes') && (userprefs[i].selected)) GM_setValue("Armory_Eric","Yes");
		if ((userprefs[i].id == 'LaCN_NewsBar_Yes') && (userprefs[i].selected)) GM_setValue("LaCN_NewsBar","Yes");
		i++;
	}
	userprefs=document.getElementsByTagName('input');
	var i = 0;
	while(userprefs[i]) {
		if (userprefs[i].name == 'pass') GM_setValue("FamilyCode",userprefs[i].value);
		i++
	}
}