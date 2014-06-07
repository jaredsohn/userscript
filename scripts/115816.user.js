// ==UserScript==
// @name         work god damn it
// @namespace      http://*kingsofchaos.com/*
// @description    develop
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// @exclude		   http://*.kingsofchaos.com/index.php*
// @exclude		   http://*.kingsofchaos.com/error.php*
// @exclude        http://www.kingsofchaos.com/stats.php*
// ==/UserScript==



var tijd1 = 0;
var tijd2 = 0;
var tijd3 = 0;

var placed = false;
var str = "error";
var Show_Url = '';
var turing = "";
var oldCell = "";
var tempCell = "";
var infoCell = "";
var reconCell = '';
var info_lines = "";
var attacks = 0;
var recons = 0;
var sabs = 0;
var failed_sabs = 0;
var failed_recons = 0;
var success_recons = 0;
var success_sabs = 0;
var lost_nunches = 0;
var stop_auto = 0;
var total_no_sabbed = 0;
var Recon_Stats = new Array();
var value = 0;

var CurrentURL = document.URL;
TehURL = CurrentURL.split(".com/");
TehURL = TehURL[1].split(".php");



if (GM_getValue("Armory_Eric","Yes") == "Yes") {
	updateExp();
}



function updateExp(){
	var stuff = document.body.innerHTML;
	var test = stuff.split("Experience:");
	var exp = test[1].split('02">');
	exp = exp[1].replace(/ /g,'');
	exp = exp.split('\n');
	exp = Math.floor(removeComma(exp[1]));
	var turns = test[1].split('<font color="#250202">');
	turns = turns[2].split('<');
	turns = Math.floor(removeComma(turns[0]));
	var req_exp = GM_getValue("Exp_Needed",1);
	var fakesabs = Math.floor(turns/5);
	var raids = Math.floor(turns/25);
	var ppls = Math.floor(fakesabs/46);
	var attacks = Math.floor(turns/150);
	var screwy = "You can (fake) sab "+fakesabs+" times ("+ppls+" people); You can raid "+raids+" times; And you can attack "+attacks+" times";

  	var req_left = req_exp;
	var exp_left = exp;
	var level = Math.round(Math.log(req_exp/300)/Math.log(1.15));
	var cur_lev = level;
	while (exp_left > req_left) {
		exp_left -= req_left;
		level++;
		req_left = Math.round(30*Math.pow(1.15,level)) * 10;
	}

	var words = "";
	var GoGoGadgetUpgrade = "";

	if (exp < req_exp) {
		if (turns >= Math.ceil(req_exp - exp)) {
			GoGoGadgetUpgrade = " color: green;";
			words = "You need to (fake)sab " + Math.ceil((req_exp - exp) / 460) + " or attack " + Math.ceil((req_exp - exp) / 150) + " m00ks to have enough experience for your next Technology Upgrade";
		}
		else {
			if (turns >= Math.ceil((req_exp - exp)/2)) {
				GoGoGadgetUpgrade = " color: darkgreen;";
				words = "You need to (fake)sab " + Math.ceil((req_exp - exp) / 460) + " or attack " + Math.ceil((req_exp - exp) / 150) + " m00ks to have enough experience for your next Technology Upgrade (Not enough turns to attack)";
			}
			else {
				words = "You don't have enough exp and turns to (fake)sab " + Math.ceil((req_exp - exp) / 460) + " or attack " + Math.ceil((req_exp - exp) / 150) + " m00ks to get to your next Technology Upgrade";
			}
		}
	}
	else {
        	GoGoGadgetUpgrade = " text-decoration: blink; color: green;";
		words = "Current Tech: Level " + cur_lev + " [x" + (Math.round(Math.pow(1.05,cur_lev)*100)/100) + "] | Enough Exp for level: " + level + " [x" + (Math.round(Math.pow(1.05,level)*100)/100) + "] | Fakesab " + Math.ceil(req_left / 460) + " or attack " + Math.ceil(req_left / 150) + " to get to level " + (level + 1) + " [x" + (Math.round(Math.pow(1.05,level+1)*100)/100) + "]";
	}

	GoGoGadgetUpgrade  =  ( (GM_getValue("ExpInfo")) && (GM_getValue("ExpInfo") == "off") )  ?  ""  :  GoGoGadgetUpgrade;
	words  =  ( (GM_getValue("ExpInfo")) && (GM_getValue("ExpInfo") == "off") )  ?  "Coloring turned off | " + words  :  words;
	var OnOff = GM_getValue("ExpInfo","ON").toUpperCase();
	var text = '<div id="ExpInfo" style="cursor: help;' + GoGoGadgetUpgrade + '" title="UpgradeTech Advisor: ' + words + ' | Click to turn on/off coloring [' + OnOff + ']">Exp:</div>';
	var thescrewy = '<div id="turnInfo" style="cursor: help;" title="Turns advisor: '+screwy+'">Turns:</div>';

	var insertion = document.getElementsByTagName('tbody');
	var c = 0;
	var x = 0;

	while (insertion[c]) {
		if (insertion[c].innerHTML.split("Last Attacked")[1]) x = c;
		c++;
	}

	insertion[x].rows[1].cells[0].innerHTML = text;
	insertion[x].rows[2].cells[0].innerHTML = thescrewy;
	document.getElementById("ExpInfo").addEventListener('click', set_ExpInfo, true);
}

function set_ExpInfo() {
    var Mooi  =  ( (GM_getValue("ExpInfo")) && (GM_getValue("ExpInfo") == "off") )  ?  "on"  :  "off";
    GM_setValue("ExpInfo", Mooi);
    window.setTimeout("window.location.reload()", 200);
}



//------- Casper -------


 if (document.URL.match('base.php')) {
    var off = document.body.innerHTML.split('officers logged in today (x ');
    off = off[1].split(")");
    off = parseFloat(off[0]);
    GM_setValue("Officers",parseInt(off * 100));
  }


  if (document.URL.match('train.php')) {
    var tech = document.body.innerHTML.split('<td colspan="2">');
    tech = tech[1].split("<");
    if (tech[0] == "You have no technology") {
      GM_setValue("Technology",0);
    }
    else {
      tech = tech[0].split("(x ");
      tech = tech[1].split(" ");
      tech = parseFloat(tech[0]);
      tech = Math.round(Math.log(tech)/Math.log(1.05));
      GM_setValue("Technology",tech);
    }
    var exp = document.body.innerHTML.split('! (');
    exp = exp[1].split(' ');
    exp = Math.floor(removeComma(exp[0]));
    GM_setValue("Exp_Needed",exp);
  }

  //functions!!!!!!!!!!!!!!!!!!!!!!!!!! must keep
  function findText(str, str1, str2)
{
  var pos1 = str.indexOf(str1);
  if (pos1 == -1) return '';

  pos1 += str1.length;

  var pos2 = str.indexOf(str2, pos1);
  if (pos2 == -1) return '';

  return str.substring(pos1, pos2);
}
  function updateButtons()
{
  var new_gold = 0;

  for (i = 0; i < fields.length; i++)
  {
    new_gold += parseInt(fields[i].value) * list[i];
  }

  new_gold = gold - new_gold;

  var new_untrained = 0;

  for (i = 0; i < fields.length; i++)
  {
    new_untrained += parseInt(fields[i].value);
  }

  new_untrained = num_untrained - new_untrained;

  for (i = 0; i < buttons.length; i++)
  {
    if (document.URL.match('armory.php'))
    {
      buttons[i].value = Math.floor(new_gold / list[i]);
    }
    else if (document.URL.match('train.php'))
    {
      if (list[i] > 0)
      {
        buttons[i].value = new_untrained >= Math.floor(new_gold / list[i]) ? Math.floor(new_gold / list[i]) : new_untrained;
      }
      else
      {
        buttons[i].value = 0;
      }
    }
  }
}
function expcolTable(text)
{
  var elems = document.getElementsByTagName('table');

  for (i = 0; i < elems.length; i++)
  {
    if (elems[i].rows[0].cells[0].innerHTML.match(text))
    {
      var table = elems[i];
    }
  }

  table.rows[0].style.cursor = 'pointer';
  if (table.rows[0].innerHTML.match("Recent Attacks on You") && (GM_getValue("Collapse_Attacks","No") == "Yes")) hidetable();
  if (table.rows[0].innerHTML.match("Notice from Commander") && (GM_getValue("Collapse_Notice","No") == "Yes")) hidetable();
  if (table.rows[0].innerHTML.match("User Info") && (GM_getValue("Collapse_Info","No") == "Yes")) hidetable();
  if (table.rows[0].innerHTML.match("Military Overview") && (GM_getValue("Collapse_Overview","No") == "Yes")) hidetable();
  if (table.rows[0].innerHTML.match("Military Effectiveness") && (GM_getValue("Collapse_Effectiveness","No") == "Yes")) hidetable();
  if (table.rows[0].innerHTML.match("Previous Logins") && (GM_getValue("Collapse_Logins","No") == "Yes")) hidetable();
  if (table.rows[0].innerHTML.match("Preferences") && (GM_getValue("Collapse_Preferences","No") == "Yes")) hidetable();
  if (table.rows[0].innerHTML.match("Officers") && (GM_getValue("Collapse_Officers","No") == "Yes")) hidetable();
  if (table.rows[0].innerHTML.match("Grow Your Army!") && (GM_getValue("Collapse_Grow","No") == "Yes")) hidetable();

  function hidetable() {
    for (i = 1; i < table.rows.length; i++)
    {
      table.rows[i].style.display = table.rows[i].style.display != 'none' ? 'none' : '';
    }
  }


  table.rows[0].addEventListener('click', function(event)
  {
    if (text == "Recent Attacks on You") {
	if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Attacks","Yes");
	else GM_setValue("Collapse_Attacks","No");
    }
    if (text == "Notice from Commander") {
      if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Notice","Yes");
      else GM_setValue("Collapse_Notice","No");
    }
    if (text == "User Info") {
      if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Info","Yes");
      else GM_setValue("Collapse_Info","No");
    }
    if (text == "Military Overview") {
      if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Overview","Yes");
      else GM_setValue("Collapse_Overview","No");
    }
    if (text == "Military Effectiveness") {
      if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Effectiveness","Yes");
      else GM_setValue("Collapse_Effectiveness","No");
    }
    if (text == "Previous Logins") {
      if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Logins","Yes");
      else GM_setValue("Collapse_Logins","No");
    }
    if (text == "Preferences") {
      if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Preferences","Yes");
      else GM_setValue("Collapse_Preferences","No");
    }
    if (text == "Officers") {
      if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Officers","Yes");
      else GM_setValue("Collapse_Officers","No");
    }
    if (text == "Grow Your Army!") {
      if (table.rows[1].style.display != 'none') GM_setValue("Collapse_Grow","Yes");
      else GM_setValue("Collapse_Grow","No");
    }
    event.stopPropagation();
    event.preventDefault();

    for (i = 1; i < table.rows.length; i++)
    {
      table.rows[i].style.display = table.rows[i].style.display != 'none' ? 'none' : '';
    }
  }, true);
}
 // ---------- Casper ----------------


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
			if ((too == 0) && (GM_getValue("Armory_Eric","Yes") == "Yes")) toolstable.rows[i].cells[2].innerHTML = toolstable.rows[i].cells[2].innerHTML + " <div style=\"color: #905000; font-size: 80%; cursor: help;\" title=\"The strength of 1 weapon\">[" + addCommas(Math.round(strength * 1.257 * tech * spy_race_factor * Math.pow(1.60,GM_getValue("Covert_Skill",15)))) + "]</div>";
			if ((too == 1) && (GM_getValue("Armory_Eric","Yes") == "Yes")) toolstable.rows[i].cells[2].innerHTML = toolstable.rows[i].cells[2].innerHTML + " <div style=\"color: #905000; font-size: 80%; cursor: help;\" title=\"The strength of 1 weapon\">[" + addCommas(Math.round(strength * 1.257 * tech * sentry_race_factor * Math.pow(1.60,GM_getValue("Covert_Skill",15)))) + "]</div>";

		}
	}

	var green = 0;
	var orange = 0;
	var red = 0;

    // Casper
    function DoColor(color, val) {
        return "<font color='" + color + "'>" + addCommas(val) + "</font>";
    }
	for (i = 0; i < weaponstable.rows.length; i++){
		//alert(weaponstable.rows[i].cells[0].innerHTML);
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
						// Casper
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
						// Casper
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
				// Casper
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
				// Casper
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


        var CasperColors = new Array("lime", "red", "orange", "gray");
        for (var i = 0; i < CasperColors.length; i++) {
            if (r_tmp.match("color: " + CasperColors[i])) {
                var CasperColor = CasperColors[i];
                break;
            }
        }

		if (sa_factor < 39) {
			rechterdeel += '<tr>';
			rechterdeel += '<td style="background-color: ' + CasperColor + '; width: 4px; padding: 0;"></td>';
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

        var CasperColors = new Array("lime", "red", "orange", "gray");
        for (var i = 0; i < CasperColors.length; i++) {
            if (r_tmp.match("color: " + CasperColors[i])) {
                var CasperColor = CasperColors[i];
                break;
            }
        }

		if (da_factor < 35) {
			rechterdeel += '<tr>';
			rechterdeel += '<td style="background-color: ' + CasperColor + '; width: 4px; padding: 0;"></td>';
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


 // Casper - Buttons
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








   if (TehURL[0] == "detail") {

	var stuff = document.body.innerHTML;
	test_attack = stuff.split("of your soldiers are trained attack specialists");

	if (test_attack[1]) {

		target = stuff.split("casualties!");
		target = target[1].split("\'");
		target = target[0].split("\n");
		target = target[2];

		damage2 = stuff.split("inflict ");
		damage = damage2[1].split(">");
		damage = damage[1].split("<");
		damage = damage[0];
		counterdamage = damage2[2].split(">");
		counterdamage = counterdamage[1].split("<");
		counterdamage = counterdamage[0];

		kills = stuff.split("The enemy sustains");
		kills = kills[1].split("<");
		kills = kills[1].split(">");
		kills = kills[1];

		losses = stuff.split("Your army sustains");
		losses = losses[1].split("<");
		losses = losses[1].split(">");
		losses = losses[1];

		stats_id = document.URL;
		stats_id = stats_id.split("=");
		stats_id = stats_id[1]

		gold = stuff.split("You stole ");
		if (gold[1]) {
			gold = gold[1].split(">");
			gold = gold[1].split("<");
			gold = gold[0].split(".");
			gold = gold[0];
		}
		else gold = "0";

		


		if (GM_getValue("Instant_BF","Yes") == "Yes") {
           // Casper Show short version of this crap...
            var WhatToShow = document.body.innerHTML.split("Both sides");
            WhatToShow = WhatToShow[1].split('</td>');
            WhatToShow = '<p align="center">Both sides' + WhatToShow[0];

			var script = document.body.appendChild(document.createElement('script'));

			script.type = 'text/javascript';

			script.textContent =
                '$(function () {' +
                '  $("table.battle tr:last td > *").show();' +
                '});';

			var table = document.getElementsByClassName('battle')[0];

			table.className = table.className + '2';
			var dummyTable = document.body.appendChild(document.createElement('table'));

			dummyTable.className = 'battle';
            dummyTable.style.display = 'none';

			dummyTable.style.height = document.body.scrollTop;
            window.addEventListener(
                'scroll',
                function () {
                  dummyTable.style.height = document.body.scrollTop;
                },
                false);

            document.body.innerHTML = document.body.innerHTML.replace('<font style="font-size: 8pt;">', WhatToShow + '<br /><br /><br /><font style="font-size: 8pt;">');

        }

	}
	//else: you have been attacked


    // Casper - Buttons
    window.addEventListener('keydown', KeyCheck, true);



}







function foreach(stuff, f){
	for(var i=0; i < stuff.length; i++)
	{
		var stop_iter = f(stuff[i]);
		if (stop_iter) return;
	}
}

function addCommas(nStr)
{
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





function removeComma(num) {
	var num = "" + num + "";
	return num.replace(/,/g, "");
}


function getid(weap){
	var cb = 0;
	if (weap == "Broken Stick") cb = 69;
	if (weap == "Knife") cb = 3;
	if (weap == "Hatchet") cb = 9;
	if (weap == "Pike") cb = 13;
	if (weap == "Mace") cb = 17;
	if (weap == "Warhammer") cb = 21;
	if (weap == "Hammer Of Thor") cb = 25;
	if (weap == "Battle Axe") cb = 29;
	if (weap == "Chariot") cb = 72;
	if (weap == "Blackpowder Missile") cb = 70;
	if (weap == "Helmet") cb = 34;
	if (weap == "Shield") cb = 38;
	if (weap == "Chainmail") cb = 41;
	if (weap == "Plate Armor") cb = 45;
	if (weap == "Gauntlets") cb = 48;
	if (weap == "Dragonskin") cb = 51;
	if (weap == "Invisibility Shield") cb = 71;
	if (weap == "Rope") cb = 58;
	if (weap == "Dirk") cb = 63;
	if (weap == "Cloak") cb = 65;
	if (weap == "Grappling Hook") cb = 67;
	if (weap == "Skeleton Key") cb = 73;
	if (weap == "Nunchaku") cb = 75;
	if (weap == "Big Candle") cb = 62;
	if (weap == "Horn") cb = 64;
	if (weap == "Tripwire") cb = 66;
	if (weap == "Guard Dog") cb = 68;
	if (weap == "Lookout Tower") cb = 74;
	if (weap == "Scrimitar") cb = 5;
	if (weap == "Dragon Claw") cb = 6;
	if (weap == "Mist Veil") cb = 50;
	if (weap == "Staff") cb = 7;
	if (weap == "Long Sword") cb = 11;
	if (weap == "Lance") cb = 15;
	if (weap == "Broadsword") cb = 19;
	if (weap == "Steed") cb = 23;
	if (weap == "Excalibur") cb = 27;
	if (weap == "Mithril") cb = 46;
	if (weap == "Sling") cb = 10;
	if (weap == "Club") cb = 14;
	if (weap == "Spear") cb = 18;
	if (weap == "Warblade") cb = 22;
	if (weap == "Warg") cb = 26;
	if (weap == "Dragon") cb = 30;
	if (weap == "Heavy Shield") cb = 49;
	if (weap == "Short Bow") cb = 8;
	if (weap == "Crossbow") cb = 12;
	if (weap == "Longbow") cb = 16;
	if (weap == "Steel Bow") cb = 20;
	if (weap == "Steed") cb = 24;
	if (weap == "Flaming Arrow") cb = 28;
	if (weap == "Elven Cloak") cb = 47;
	return cb;
}

function get_da(fort){
	var cb = 0;
	if (fort == "Camp") cb = 0;
	if (fort == "Stockade") cb = 1;
	if (fort == "Rabid") cb = 2;
	if (fort == "Walled") cb = 3;
	if (fort == "Towers") cb = 4;
	if (fort == "Battlements") cb = 5;
	if (fort == "Portcullis") cb = 6;
	if (fort == "Boiling") cb = 7;
	if (fort == "Trenches") cb = 8;
	if (fort == "Moat") cb = 9;
	if (fort == "Drawbridge") cb = 10;
	if (fort == "Fortress") cb = 11;
	if (fort == "Stronghold") cb = 12;
	if (fort == "Palace") cb = 13;
	if (fort == "Keep") cb = 14;
	if (fort == "Citadel") cb = 15;
	if (fort == "Hand") cb = 16;
	cb = Math.pow(1.25,cb);
	cb = Math.floor(cb*1000)/1000;
	return cb;
}

function get_sa(siege){
	var cb = 0;
	if (siege == "None") cb = 0;
	if (siege == "Flaming") cb = 1;
	if (siege == "Ballistas") cb = 2;
	if (siege == "Battering") cb = 3;
	if (siege == "Ladders") cb = 4;
	if (siege == "Trojan") cb = 5;
	if (siege == "Catapults") cb = 6;
	if (siege == "War") cb = 7;
	if (siege == "Siege") cb = 8;
	if (siege == "Trebuchets") cb = 9;
	if (siege == "Black") cb = 10;
	if (siege == "Sappers") cb = 11;
	if (siege == "Dynamite") cb = 12;
	if (siege == "Greek") cb = 13;
	if (siege == "Cannons") cb = 14;
	cb = Math.pow(1.3,cb);
	cb = Math.floor(cb*1000)/1000;
	return cb;
}
// Casper - using quick access buttons O_o
function KeyCheck(e)
{

            }


            
    if ( (!e.target) || (e.target.id != "MySpamXD") ) {

        if (TehURL[0] == "attack") {
            // ### RAID & RECON part ### \\
            // Well.. this sucks... both often used actions start with the same letter "R"
            // Solution: let user choose, but auto-reset back to Recon, to avoid harmful mistakes..
            if (e.keyCode==82) {
                if (GM_getValue("UseRButton", "recon") == "recon") {
                    upkeydown=true;
                    //alert(document.getElementsByTagName('input')[10].name);
                    document.getElementsByTagName('input')[10].style.borderColor="#0066FF";
                    document.getElementsByTagName('input')[10].click();
                }
                else {
                    upkeydown=true;
                    //alert(document.getElementsByTagName('input')[3].name);
                    document.getElementsByTagName('input')[3].style.borderColor="#0066FF";
                    document.getElementsByTagName('input')[3].value="RAIDING...";
                    document.getElementsByTagName('input')[3].click();
                }
            }

            // Attack part
            else if (e.keyCode==65) {   // attack
                upkeydown=true;
                document.getElementsByTagName('input')[4].style.borderColor="#0066FF";
                document.getElementsByTagName('input')[4].value="Press SPACE 2 Attack";
                document.getElementsByTagName('input')[4].focus();
        }


        // ### Stats page part ### \\
        else if (TehURL[0] == "stats") {
            if (e.keyCode==82) {    // recon
                upkeydown=true;
                document.getElementsByTagName('input')[14].style.borderColor="#0066FF";
                document.getElementsByTagName('input')[14].value="Reconning...";
                document.getElementsByTagName('input')[14].click();
            }
            else if (e.keyCode==65) {   // attack
               upkeydown=true;
                document.getElementsByTagName('input')[4].style.borderColor="#0066FF";
                document.getElementsByTagName('input')[4].value="Press SPACE 2 Attack";
                document.getElementsByTagName('input')[4].focus();
            }
        }


        else if (TehURL[0] == "inteldetail") {
            // arrow left
            if (e.keyCode==37) {
                upkeydown=true;
                var stuff = document.body.innerHTML;
                var id = stuff.split('name="id" value="');
                id = id[1].split('"');
                id = id[0];
                var newURL = "http://www.kingsofchaos.com/attack.php?id=" + id;
                if (GM_getValue("Reload","Yes") == "Yes") window.location.href=newURL
        	}
    	}


        else if (TehURL[0] == "detail") {
            if (e.keyCode==65) {   // Go to Armory page
                upkeydown=true;
                window.location.href="http://www.kingsofchaos.com/armory.php";
            }
    	}


        else if (TehURL[0] == "armory") {
            if (e.keyCode==66) {    // Buy weapons
                upkeydown=true;
                var oi = document.forms.length - 3;
                document.forms[oi].submit();
        	}
            else if (e.keyCode==82) {   // Repair
                upkeydown=true;
                var elems = document.getElementsByTagName('input');
                for (i = 0; i < elems.length; i++) {
                    if (elems[i].name.match("repair_all_weapons")) {
                        document.getElementsByTagName('input')[i].style.borderColor="#0066FF";
                        document.getElementsByTagName('input')[i].value="Repairing...";
                        document.getElementsByTagName('input')[i].click();
                        break;
                    }
                }

        	}
    	}
    }

}

