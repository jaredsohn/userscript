// ==UserScript==
// @name           LaCN's Suitcase
// @namespace      http://*kingsofchaos.com/*
// @description    Uploading/Downloading Stats and sending Sablogs to LaCN Server.
// @include        http://*kingsofchaos.com/*
// @exclude	   http://www.kingsofchaos.com/confirm.login.php*
// ==/UserScript==

// Author: Bluud
// Maintained by Merv
// Based on scripts by Shane Mackenzie and Lukas Brueckner

var ThisVersion = 99;

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
var LaCN_MOB_url = "http://www.lacnfamily.com/MOB/suitcase";
var Recon_Stats = new Array();
var value = 0;

var CurrentURL = document.URL;
TehURL = CurrentURL.split(".com/");
TehURL = TehURL[1].split(".php");



if (GM_getValue("Armory_Eric","Yes") == "Yes") {
	updateExp();
}

if (GM_getValue("Show_Clock","No") == "Yes") {
	updateClock();
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

function updateClock(){
	var turnsoon = 0;
	var currentTime = new Date ( );
	var currentHours = currentTime.getHours ( );
	var currentMinutes = currentTime.getMinutes ( );
	var currentSeconds = currentTime.getSeconds ( );
	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " ";
	if (((currentMinutes == "05") || (currentMinutes == 35)) && (currentSeconds > 30)) {
		currentTimeString = '<span align="center;" style="font-size: 13pt;">TURN SOON<br \></span>' +currentTimeString;
		turnsoon = 1;
	}

	var clock = document.getElementById("_md_clock");
	if (!clock) {
		if (turnsoon == 0) {
			addCSS(
				"#_md_clock {position:fixed; left:30; right:auto; bottom:auto; top:10; width:auto;background:#000000;}"
			);
		}
		else {
			addCSS(
				"#_md_clock {position:fixed; left:30; right:auto; bottom:auto; top:10; width:auto;background:#FF0000;}"
			);
		}
		var clock = document.createElement("div");
		clock.id = "_md_clock";
		document.body.appendChild(clock);
	}
	else {
		if (turnsoon == 0) {
			addCSS(
				"#_md_clock {position:fixed; left:30; right:auto; bottom:auto; top:10; width:auto;background:#000000;}"
			);
		}
		else {
			addCSS(
				"#_md_clock {position:fixed; left:30; right:auto; bottom:auto; top:10; width:auto;background:#FF0000;}"
			);
		}
	}
	clock.innerHTML = '<span style="font-size: 20pt;">' + currentTimeString + '</span>';
	clock.style.display="";
	setTimeout(updateClock,500);
}

if (!GM_getValue("FamilyCode") || GM_getValue("FamilyCode") == "") {
	first_use();
}

function first_use(){
	var code = prompt("You haven't entered your suitcase pass yet. Please enter the Suitcase Pass you have chosen on forum User CP.","");
	if (code != null) {
		if (code == "") {
			alert("U need to enter something!");
			first_use();
		}
		else {
			GM_setValue("FamilyCode",code);
			var m = "Thanks for setting your Suitcase Pass. Your pass is now " + code +".\n\n";
			m+="If you have changed it, or it doesn't match the one you've set on forum, you can always re-enter it in your Suitcase Settings, which are situated on Command Center right down corner. \n\n";
			m+="We have you enjoy using Suitcase\n\n";
			m+="Suitcase's Coders, \n\nBluud and Merv.";
			alert(m);
			alert("In order for everything to work properly, we suggest you visit your Training and Armory page now.");
		}
	}
}

//------- bill the ripper -------
// floaty gold on teh left side
var gold = findText(document.body.innerHTML, 'Gold:<font color="#250202">', '<');

if (gold != '')
{
  gold = gold.replace(/\n/g, '');
  gold = gold.replace(/\t/g, '');

  gold = gold.replace(/,/g, '');

  gold = gold.replace('M', '000000');

  gold = parseInt(gold);
}
//collapsing tableys
if (document.URL.match('base.php'))
{
expcolTable('Recent Attacks on You');
expcolTable('Notice from Commander');
expcolTable('User Info');
expcolTable('Military Overview');
expcolTable('Military Effectiveness');
expcolTable('Previous Logins');
expcolTable('Officers');
expcolTable('Preferences');
expcolTable('Grow Your Army!');
}
// button thingies for the armory
if (document.URL.match('armory.php') && (GM_getValue("Buttons","Yes") == "Yes"))
  {
    var list = document.body.innerHTML.match(/<td align="right">[\d,]+ Gold<\/td>/g);

    for (i = 0; i < list.length; i++)
    {
      list[i] = list[i].replace('<td align="right">', '');
      list[i] = list[i].replace(' Gold</td>', '');
      list[i] = list[i].replace(/,/g, '');

      list[i] = parseInt(list[i]);
    }

    var elems = document.getElementsByTagName('input');

    var fields = new Array();
    var buttons = new Array();

    for (i = 0; i < elems.length; i++)
    {
      if (elems[i].name.match(/buy_weapon.*/g))
      {
        fields.push(elems[i]);

        var name = elems[i].name.match(/buy_weapon.*/g)[0];
        name = name.replace('buy_weapon[', '');
        name = name.replace(']', '');

        var input = document.createElement('input');
        input.id = '_' + name;
        input.type = 'submit';

        buttons.push(input);

        var cell = document.createElement('td');
        cell.appendChild(input);

        elems[i].parentNode.parentNode.appendChild(cell);
      }
    }

    updateButtons();

    document.addEventListener('click', function(event)
    {
      if (event.target.id.match(/_[\d]+/))
      {
        event.stopPropagation();
        event.preventDefault();

        var name = event.target.id.match(/_[\d]+/)[0];
        name = name.replace('_', '');

        var tmp = document.getElementsByName('buy_weapon[' + name + ']')[0];
        tmp.value = event.target.value;

        updateButtons();
      }
    }, true);

    document.addEventListener('change', function(event)
    {
      if(event.target.name.match(/buy_weapon\[[\d]+\]/))
      {
        event.stopPropagation();
        event.preventDefault();

        updateButtons();
      }
    }, true);
  }

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

 // buttoney things for teh training page
  if (document.URL.match('train.php') && (GM_getValue("Buttons","Yes") == "Yes"))
  {
    var num_untrained = findText(document.body.innerHTML, 'Untrained Soldiers</b></td>\n        <td align="right">', '<');
    num_untrained = num_untrained.replace(/,/g, '');

    num_untrained = parseInt(num_untrained);

    var list = document.body.innerHTML.match(/<td align="right">[\d,]+ Gold<\/td>/g);

    for (i = 0; i < list.length; i++)
    {
      list[i] = list[i].replace('<td align="right">', '');
      list[i] = list[i].replace(' Gold</td>', '');
      list[i] = list[i].replace(/,/g, '');

      list[i] = parseInt(list[i]);
    }

    var elems = document.getElementsByTagName('input');

    var fields = new Array();
    var buttons = new Array();

    for (i = 0; i < elems.length; i++)
    {
      if (elems[i].name.match(/train.*/g))
      {
        fields.push(elems[i]);

        var name = elems[i].name.match(/train.*/g)[0];
        name = name.replace('train[', '');
        name = name.replace(']', '');

        var input = document.createElement('input');
        input.id = '_' + name;
        input.type = 'submit';

        buttons.push(input);

        var cell = document.createElement('td');
        cell.appendChild(input);

        elems[i].parentNode.parentNode.appendChild(cell);
      }
    }

    updateButtons();

    document.addEventListener('click', function(event)
    {
      if (event.target.id.match(/_[\w]+/))
      {
        event.stopPropagation();
        event.preventDefault();

        var name = event.target.id.match(/_[\w]+/)[0];
        name = name.replace('_', '');

        var tmp = document.getElementsByName('train[' + name + ']')[0];
        tmp.value = event.target.value;

        updateButtons();
      }
    }, true);

    document.addEventListener('change', function(event)
    {
      if(event.target.name.match(/train\[[\w]+\]/))
      {
        event.stopPropagation();
        event.preventDefault();

        updateButtons();
      }
    }, true);
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
 // ---------- /bill the ripper ----------------

var logout = document.body.innerHTML;
logout = logout.split('<tr><td><a href="attacklog.php">');
if (logout[1]) {
	edit_left();
}

function edit_left() {
	var q = document.getElementsByTagName('table');
	        var statstable;
	                var i;
	        for(i = 0; i < q.length; i++){

	            if(q[i].innerHTML.match("base.php") && !q[i].innerHTML.match(/\<table/))
	            {
			statstable = q[i];
			break;
	            }
	        }

	        var allianceindex;
	        for (i = 0; i < statstable.rows.length; i++) {

	            if (statstable.rows[i].cells[0].innerHTML.indexOf('attack.php') > 0) {
			allianceindex = i+1;
			break;
	            }
	        }
     var PlaceDown = 0;
	if ( (GM_getValue("ShowWarList")) && (GM_getValue("ShowWarList") == 1) ) {
        PlaceDown = 3;
		statstable.insertRow(allianceindex - 1).innerHTML = '<td id="masslist_nav" style="cursor: pointer;"><img alt="LaCN MASS LIST" border="0" src="http://www.lacnfamily.com/MOB/images/Suitcase_Menu_LaCN_MassList.gif" width="137" height="22"></a></td>';
		document.getElementById("masslist_nav").addEventListener('click', masslist, true);
		statstable.insertRow(allianceindex - 1).innerHTML = '<td id="warlist_nav" style="cursor: pointer;"><img alt="LaCN WAR LIST" border="0" src="http://www.lacnfamily.com/MOB/images/Suitcase_Menu_LaCN_WarList.gif" width="137" height="22"></a></td>';
		document.getElementById("warlist_nav").addEventListener('click', warlist_first, true);
		statstable.insertRow(allianceindex - 1).innerHTML = '<td id="partypage_nav" style="cursor: pointer;"><img alt="LaCN PARTY PAGE" border="0" src="http://www.lacnfamily.com/MOB/images/Suitcase_Menu_LaCN_PartyPage.gif" width="137" height="22"></a></td>';
		document.getElementById("partypage_nav").addEventListener('click', partypage, true);
	}
	if (GM_getValue("my_chain", "") == "LaCN") {
  		statstable.insertRow(allianceindex + 9 + PlaceDown).innerHTML = '<td id="fakesabpage_nav" style="cursor: pointer;"><img src="http://www.lacnfamily.com/MOB/images/Suitcase_Menu_LaCN_FakeSabList.gif" border="0" alt="Show Fake Sab List" style="padding: 0; margin: 0; border: none;"></td>';
  		document.getElementById("fakesabpage_nav").addEventListener('click', ShowFakeSabList, true);
		statstable.insertRow(allianceindex - 1 + PlaceDown).innerHTML = '<td id="contracts_nav" style="cursor: pointer;"><img alt="LaCN Contracts" border="0" src="http://www.lacnfamily.com/MOB/images/Suitcase_Menu_LaCN_Contracts.gif" width="137" height="22"></a></td>';
		document.getElementById("contracts_nav").addEventListener('click', targets, true);
	}
}


function ShowFakeSabList(event) {
    var FakeSabListAllow = GM_getValue("FakeSabListAllow","No");
    var tempURL = LaCN_MOB_url + '/show_fakesab.h9ft.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&Spy=' + GM_getValue("Spy") + '&FakeSabListAllow=' + GM_getValue("FakeSabListAllow");
    cursor_wait("fakesabpage_nav");
    GM_xmlhttpRequest({
        method: 'GET',
        url: tempURL,
        onload: function(responseDetails) {
            var reply = responseDetails.responseText;
            var tempURL = 'http://www.kingsofchaos.com/intel.php';
            GM_xmlhttpRequest({
                method: 'GET',
                url: tempURL,
                onload: function(responseDetails) {
                    var newdoc = "";
                    var filterdoc1 = responseDetails.responseText;
                    filterdoc1 = filterdoc1.split('align="left" class="content">');
                    var filterdoc2 = responseDetails.responseText;
                    filterdoc2 = filterdoc2.split('<font style="font-size: 8pt;">');
                    newdoc += filterdoc1[0];
                    newdoc += 'align="left" class="content">';
                    newdoc += reply;
                    newdoc += '<center>\n<p>\n<p>\n<font style="font-size: 8pt;">';
                    newdoc += filterdoc2[1];
                    document.body.innerHTML = newdoc;
                    edit_left();
                    cursor_ready("fakesabpage_nav");
                    if (document.getElementById("FakeSabListAllow")) document.getElementById("FakeSabListAllow").addEventListener('click', SetFakeSabList, true);
                },
                onerror: function(responseDetails) {
                alert("Request for contact resulted in error code: " + responseDetails.status);
                }
            });
        },
        onerror: function(responseDetails) {
        alert("Request for contact resulted in error code: " + responseDetails.status);
        }
    });
}



function SetFakeSabList(event){
    GM_setValue("FakeSabListAllow","No");
    if (document.getElementById("FakeSabListAllow").checked == true) { GM_setValue("FakeSabListAllow","Yes"); }
    ShowFakeSabList();
}


function targets(event) {
	var tempURL = LaCN_MOB_url + '/show_contracts.t4e6.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&spy=' + GM_getValue("Spy");
	cursor_wait("contracts_nav");
	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,
		onload: function(responseDetails) {
			var reply = responseDetails.responseText;
			var tempURL = 'http://www.kingsofchaos.com/intel.php';
			GM_xmlhttpRequest({
				method: 'GET',
				url: tempURL,
				onload: function(responseDetails) {
					var newdoc = "";
					var filterdoc1 = responseDetails.responseText;
					filterdoc1 = filterdoc1.split('align="left" class="content">');
					var filterdoc2 = responseDetails.responseText;
					filterdoc2 = filterdoc2.split('<font style="font-size: 8pt;">');
					newdoc += filterdoc1[0];
					newdoc += 'align="left" class="content">';

					newdoc += reply;

					newdoc += '<center>\n<p>\n<p>\n<font style="font-size: 8pt;">';
					newdoc += filterdoc2[1];
					document.body.innerHTML = newdoc;
					edit_left();
					cursor_ready("contracts_nav");
					},
				onerror: function(responseDetails) {
				  alert("Request for contact resulted in error code: " + responseDetails.status);
				}
			});

			},
		onerror: function(responseDetails) {
		  alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});
}

function warlist_first(event) {
	warlist_page = 1;
	warlist();
}

function warlist_next(event) {
	warlist_page++;
	warlist();
}

function warlist_previous(event) {
	warlist_page--;
	warlist();
}

function warlist(event) {
	currentTime = new Date ( );
	tijd1 = currentTime.getTime ( );
	var myWidth = window.innerWidth;
	var tempURL = LaCN_MOB_url + '/show_war-list.t23v8h.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&spy=' + GM_getValue("Spy") + '&width=' + myWidth + '&page=' + warlist_page;
	cursor_wait("warlist_nav");
	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,
		onload: function(responseDetails) {
			var reply = responseDetails.responseText;
			var tempURL = 'http://www.kingsofchaos.com/intel.php';
			currentTime = new Date ( );
			tijd2 = currentTime.getTime ( );
			GM_xmlhttpRequest({
				method: 'GET',
				url: tempURL,
				onload: function(responseDetails) {
					var newdoc = "";
					var filterdoc1 = responseDetails.responseText;
					filterdoc1 = filterdoc1.split('align="left" class="content">');
					var filterdoc2 = responseDetails.responseText;
					filterdoc2 = filterdoc2.split('<font style="font-size: 8pt;">');
					newdoc += filterdoc1[0];
					newdoc += 'align="left" class="content">';

					newdoc += reply;

					newdoc += '<center>\n<p>\n<p>\n<font style="font-size: 8pt;">';
					newdoc += filterdoc2[1];
					document.body.innerHTML = newdoc;

					if (document.getElementById("next")) {
						document.getElementById("next").addEventListener('click', warlist_next, true);
					}
					if (document.getElementById("previous")) {
						document.getElementById("previous").addEventListener('click', warlist_previous, true);
					}

					edit_left();

					var currentTime = new Date ( );
					tijd3 = currentTime.getTime ( );
					//alert(tijd2 - tijd1);
					//alert(tijd3 - tijd1);
					cursor_ready("warlist_nav");
					},
				onerror: function(responseDetails) {
				  alert("Request for contact resulted in error code: " + responseDetails.status);
				}
			});

			},
		onerror: function(responseDetails) {
		  alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});
}

function partypage(event) {
	var myWidth = window.innerWidth;
	var tempURL = LaCN_MOB_url + '/show_party-page.thmseo.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&spy=' + GM_getValue("Spy") + '&sa=' + GM_getValue("SA") + '&width=' + myWidth;
	cursor_wait("partypage_nav");
	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,
		onload: function(responseDetails) {
			var reply = responseDetails.responseText;
			var tempURL = 'http://www.kingsofchaos.com/intel.php';
			GM_xmlhttpRequest({
				method: 'GET',
				url: tempURL,
				onload: function(responseDetails) {
					var newdoc = "";
					var filterdoc1 = responseDetails.responseText;
					filterdoc1 = filterdoc1.split('align="left" class="content">');
					var filterdoc2 = responseDetails.responseText;
					filterdoc2 = filterdoc2.split('<font style="font-size: 8pt;">');
					newdoc += filterdoc1[0];
					newdoc += 'align="left" class="content">';

					newdoc += reply;

					newdoc += '<center>\n<p>\n<p>\n<font style="font-size: 8pt;">';
					newdoc += filterdoc2[1];
					document.body.innerHTML = newdoc;
					edit_left();
					cursor_ready("partypage_nav");
					},
				onerror: function(responseDetails) {
				  alert("Request for contact resulted in error code: " + responseDetails.status);
				}
			});

			},
		onerror: function(responseDetails) {
		  alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});
}

function masslist(event) {
	var myWidth = window.innerWidth;
	var tempURL = LaCN_MOB_url + '/show_farm-list.t438h.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&SA=' + GM_getValue("Sa") + '&width=' + myWidth;
	cursor_wait("masslist_nav");
	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,
		onload: function(responseDetails) {
			var reply = responseDetails.responseText;
			var tempURL = 'http://www.kingsofchaos.com/intel.php';
			GM_xmlhttpRequest({
				method: 'GET',
				url: tempURL,
				onload: function(responseDetails) {
					var newdoc = "";
					var filterdoc1 = responseDetails.responseText;
					filterdoc1 = filterdoc1.split('align="left" class="content">');
					var filterdoc2 = responseDetails.responseText;
					filterdoc2 = filterdoc2.split('<font style="font-size: 8pt;">');
					newdoc += filterdoc1[0];
					newdoc += 'align="left" class="content">';

					newdoc += reply;

					newdoc += '<center>\n<p>\n<p>\n<font style="font-size: 8pt;">';
					newdoc += filterdoc2[1];
					document.body.innerHTML = newdoc;
					edit_left();
                    			cursor_ready("masslist_nav");
					},
				onerror: function(responseDetails) {
				  alert("Request for contact resulted in error code: " + responseDetails.status);
				}
			});

			},
		onerror: function(responseDetails) {
		  alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});
}


function Twittle(event) {
    var spamn = document.getElementById('MySpamXD').value;
    if (spamn.length > 0) {
        var tempURL = LaCN_MOB_url + '/add_news.ff_wrtveon.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&Spam=' + spamn;
        if (confirm("You sure you want to Twittle this ?\n\n\"" + spamn + "\"")) {
            cursor_wait("LaCN_NewsBar");
            GM_xmlhttpRequest({
    			method: 'GET',
    			url: tempURL,
    			onload: function(responseDetails) {
    			var s = responseDetails.responseText;
    			cursor_ready("LaCN_NewsBar");
        		document.getElementById('MySpamXD').value = "Successfully Twittled ! ;)";
        		document.getElementById('MySpamXD').style.color = 'silver';
                window.setTimeout("window.location.reload()", 200);
    			},
    			onerror: function(responseDetails) {
    			 alert("Request for contact resulted in error code: " + responseDetails.status);
    			}
    		});
		}
		else { document.getElementById('MySpamXD').value = ""; }
	}
}


if (TehURL[0] == "train") {
	var stuff = document.body.innerHTML;
	var level = stuff.split("Level ");
	level = Math.floor(level[1].split("<")[0]);
	GM_setValue("Covert_Skill",level);
}

if (TehURL[0] == "recruit") {
	var stuff = document.body.innerHTML;
	morale = stuff.split("Your Army's Morale:");
	if (morale[1]) {
		morale = morale[1].split("\n");
		morale = morale[2].split("\t");
		moraal = Math.floor(morale[1]);
		var gain = Math.floor(moraal - GM_getValue("Morale"));
		if ((gain > 0) && (gain < 11)) {
			if (GM_getValue("Clicks")) GM_setValue("Clicks",eval(GM_getValue("Clicks") + gain));
			else GM_setValue("Clicks",1);

			if (GM_getValue("Clicks") > "100") {
				update_batch();
			}
		}
		GM_setValue("Morale",moraal);
	}
	misclick = stuff.split("Invalid selection...");
	if (misclick[1]) document.getElementsByName("turing")[0].focus();
}

if (TehURL[0] == "battlefield") {
	var firstuser = 'undefined';
	GM_setValue("Previous_Click","Noone Yet");
	document.addEventListener('click', clicked, true);
	var stuff = document.body.innerHTML;
        var firstuser = stuff.split('ref="/stats.php?id=');
	firstuser = firstuser[1].split('"');
	firstuser = firstuser[0];
	sendgold();
}

function start_scanning() {
        var stuff = document.body.innerHTML;

        var tmp = stuff.split('ref="/stats.php?id=');
	tmp = tmp[1].split('"');
	tmp = tmp[0];

	if(firstuser != tmp) {
		firstuser = tmp;
		sendgold();
	}
	else setTimeout(start_scanning, 100);
}

function sendgold() {
	var inf = document.body.innerHTML
	var sta = inf.split('<td><a class="player"');
	var c = 1;
	var golds = "";
	while(sta[c]) {
		name = sta[c].split(">");
		name = name[1].split("<");
		name = name[0];
		tff = sta[c].split('<td align="right">');
		tff = tff[1].split("<");
		tff = tff[0];
		gold = sta[c].split('20px;" align="right">');
		gold = gold[1].split(" Gold");
		gold = gold[0];
		if (gold == '???') gold = '';
		golds += name + ";" + tff + ";" + gold + "|";
		c++;
	}

	var alltables = document.getElementsByTagName('table');
	for (i=0;i<alltables.length;i++) {
		if(alltables[i].rows[0].cells.length>1){
			if(alltables[i].rows[0].cells[1].innerHTML.match("Alliance")) {
				var ms_table = alltables[i];
			}
		}
	}
	rows = ms_table.rows;
	var html = document.body.innerHTML;
	var tempURL = LaCN_MOB_url + '/show_bf_gold.dr32.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&bf=' + golds;
	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,
		onload: function(responseDetails) {
			if (GM_getValue("ReplaceGold","Yes") == "Yes") {
				var lines = responseDetails.responseText
				if (lines == "No Access") alert("You have no Access to use this script. (Make sure you entered your Suitcase Pass in Suitcase Settings in your Command Center right down corner).");
				else {
					lines = lines.split("\n");
					var res = 1;
	   				for (i=1;i<rows.length-1;i++) {
	 					if(html.match(rows[i].cells[2].childNodes[0].innerHTML)){
							var name = rows[i].cells[2].childNodes[0].innerHTML;
							var gold = rows[i].cells[5].innerHTML;
							var donow = gold.split("???");
							if (donow[1]) {
								rows[i].cells[5].innerHTML = lines[res];
								res++;
							}
						}
			        	}
				}
			}
			},
		onerror: function(responseDetails) {
		  alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});
}

function clicked(event) {

	x = event.target;
	y = x.toString();


	var startscan = y.split("&search=&se");
	if (startscan[1]) start_scanning();

	y = y.split("=");
	var ignore = 'no';
	if (y[1]) ignore = y[1].split('&');
	if (y[1] && ignore[1]) ignore = 'yes';

	if ((y[1]) && (ignore != 'yes')) {
		var stuff = document.body.innerHTML;

		var name = stuff.split("/stats.php?id=" + y[1]);
		name = name[1].split(">");
		name = name[1].split("<");
		Username = name[0];

		if (GM_getValue("Previous_Click",0) == Username) {
			GM_setValue("Previous_Click",0);
			var prefs = document.getElementById("_md_prefs");
			if (prefs) {
				prefs.innerHTML = "";
				prefs.style.display="";
			}
		}
		else {
			GM_setValue("Previous_Click",Username);

			if (GM_getValue("ShowStats") == "Yes")
			tempURL = LaCN_MOB_url + '/show_recon.42gcq4.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + Username;
			ShowHtml(tempURL);
		}
	}
}

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



function log(s) {
	var d = new Date()
	var ds = "" + d.getTime() + "";
	GM_setValue("Sabbed_5",GM_getValue("Sabbed_4",""));
	GM_setValue("Sabbed_4",GM_getValue("Sabbed_3",""));
	GM_setValue("Sabbed_3",GM_getValue("Sabbed_2",""));
	GM_setValue("Sabbed_2",GM_getValue("Sabbed_1",""));
	GM_setValue("Sabbed_1",s);

	GM_setValue("Sabbed_Date_5",GM_getValue("Sabbed_Date_4",""));
	GM_setValue("Sabbed_Date_4",GM_getValue("Sabbed_Date_3",""));
	GM_setValue("Sabbed_Date_3",GM_getValue("Sabbed_Date_2",""));
	GM_setValue("Sabbed_Date_2",GM_getValue("Sabbed_Date_1",""));
	GM_setValue("Sabbed_Date_1",ds);
}

if (TehURL[0] == "buddylist") {
	var q = document.getElementsByTagName('table');
	var buddytable
	var i;
	for(i = 0; i < q.length; i++) {
		if ((q[i].innerHTML.match("addbuddy.php")) && (!q[i].innerHTML.match("armory.php"))) {
			buddytable = q[i];
			break;
		}

	}

	var newCell = buddytable.rows[0].insertCell(4);
	var t_cell = "";
	t_cell += '<table class="table_lines" border="0" cellpadding="6" cellspacing="6" width="100%">';
	t_cell += '<tbody><tr>';
	t_cell += '<th colspan="1">GodFathers</th>';
	t_cell += '</tr>';
	t_cell += '<tr>';
	t_cell += '<td align="left" valign="middle">';
	t_cell += '<input type="submit" id="Bluud_LaCN" onClick="alert_(id)" value="x" style="font-size: 9pt; padding: none;">';
	t_cell += '&nbsp; <a href="stats.php?id=4300504">			 	Bluud_LaCN';
	t_cell += '</a></td>';
	t_cell += '</tr>';
	t_cell += '<tr>';
	t_cell += '<td align="left" valign="middle">';
	t_cell += '<input type="submit" id="Merv" onClick="alert_(id)" value="x" style="font-size: 9pt; padding: none;">';
	t_cell += '&nbsp; <a href="stats.php?id=2324402">			 	Merv';
	t_cell += '</a></td>';
	t_cell += '</tr>';
	t_cell += '</tbody></table>';
	newCell.vAlign="top";
	newCell.innerHTML = t_cell;

	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("script");
	style.type = "text/javascript";
	style.innerHTML = "function alert_(s) {alert('Error: '+s+' can not be deleted.')}";
	head.appendChild(style);
}

if (TehURL[0] == "writemail") {

	var stuff = document.body.innerHTML;


	var invalid = stuff.split("Invalid To User");
	if (invalid[1]) {
    	var CurrentURL = document.URL;
    	var id = CurrentURL.split("to=");
        var stats = "";
        if (id[1]) {
    		id = id[1].split('#');
    		id = id[0].split('&');
    		id = id[0];
    		stats = id;
    	}

		var tempURL = LaCN_MOB_url + "/add_invalid.rh0w.php?kocname=" + GM_getValue('kocUserName') + "&unique_id=" + GM_getValue('UniqueID') + "&FamilyCode=" + GM_getValue('FamilyCode') + "&statsid=" + stats + "&invalid=1";
        GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,
			onload: function(responseDetails) {
			var s = responseDetails.responseText;
			},
			onerror: function(responseDetails) {
			 alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
    }




	else {
    nick = stuff.split("<b>To:</b> ");
	nick = nick[1].split("</th>");
	nick = nick[0];

	var d = new Date()
	var ds = "" + d.getTime() + "";

	document.addEventListener('click', function(event) {
		if(event.target.name == "send"){
			var message = document.getElementsByTagName('textarea')[0].value;
			var q = document.getElementsByTagName('input');
			for (var j=0; j < q.length; j++)
			{
				if (q[j].type == 'text'){
					if(q[j].name == 'subject')
						subject = q[j].value;
			    }
			 }
			GM_setValue('KoC_Subject_Msg_' + nick, subject);
			GM_setValue('KoC_Message_Msg_' + nick, message);
			GM_setValue('KoC_Message_Time_' + nick, ds);
		}},true);

	error = stuff.split("<h3>Error</h3");

	if ((error[1]) && (GM_getValue("Current_sending") == "Yes")) {
	}
	else {

	nick = stuff.split("<b>To:</b> ");
	nick = nick[1].split("</th>");
	nick = nick[0];

	function current_1(event) {
		var q = document.getElementsByTagName('input');
		for (var j=0; j < q.length; j++)
		{
			if (q[j].type == 'text'){
				if(q[j].name == 'subject')
					subject = q[j].value;
					subject = subject.replace(nick,"$nick");
		    }
		 }
		GM_setValue("Subject_1",subject);

		var textarea = document.getElementsByTagName('textarea');
		textarea = textarea[0];
		message = textarea.value
		message = message.replace(nick,"$nick");
		GM_setValue("Message_1",message);
		auto_1(true);

		alert("Your #1 auto-fill in message is:\n\n" + subject + "\n\n" + message);
	}

	function current_2(event) {
		var q = document.getElementsByTagName('input');
		for (var j=0; j < q.length; j++)
		{
			if (q[j].type == 'text'){
				if(q[j].name == 'subject')
					subject = q[j].value;
					subject = subject.replace(nick,"$nick");
		    }
		 }
		GM_setValue("Subject_2",subject);

		var textarea = document.getElementsByTagName('textarea');
		textarea = textarea[0];
		message = textarea.value
		message = message.replace(nick,"$nick");
		GM_setValue("Message_2",message);
		auto_2(true);

		alert("Your #2 auto-fill in message is:\n\n" + subject + "\n\n" + message);
	}

	function current_3(event) {
		var q = document.getElementsByTagName('input');
		for (var j=0; j < q.length; j++)
		{
			if (q[j].type == 'text'){
				if(q[j].name == 'subject')
					subject = q[j].value;
					subject = subject.replace(nick,"$nick");
		    }
		 }
		GM_setValue("Subject_3",subject);

		var textarea = document.getElementsByTagName('textarea');
		textarea = textarea[0];
		message = textarea.value
		message = message.replace(nick,"$nick");
		GM_setValue("Message_3",message);
		auto_3(true);

		alert("Your #3 auto-fill in message is:\n\n" + subject + "\n\n" + message);
	}

	function auto_1(event) {
		GM_setValue("Auto_Fill","1");

		var q = document.getElementsByTagName('input');

		for (var j=0; j < q.length; j++)
		{
			if (q[j].type == 'text'){
				if(q[j].name == 'subject')
					q[j].value = GM_getValue("Subject_1", "None").replace("$nick",nick);
		    }
		 }
		var textarea = document.getElementsByTagName('textarea');
		textarea = textarea[0];
		textarea.value = GM_getValue("Message_1", "None").replace("$nick",nick);

	}

	function auto_2(event) {
		GM_setValue("Auto_Fill","2");

		var q = document.getElementsByTagName('input');

		for (var j=0; j < q.length; j++)
		{
			if (q[j].type == 'text'){
				if(q[j].name == 'subject')
					q[j].value = GM_getValue("Subject_2", "None").replace("$nick",nick);
		    }
		 }
		var textarea = document.getElementsByTagName('textarea');
		textarea = textarea[0];
		textarea.value = GM_getValue("Message_2", "None").replace("$nick",nick);

	}

	function auto_3(event) {
		GM_setValue("Auto_Fill","3");

		var q = document.getElementsByTagName('input');

		for (var j=0; j < q.length; j++)
		{
			if (q[j].type == 'text'){
				if(q[j].name == 'subject')
					q[j].value = GM_getValue("Subject_3", "None").replace("$nick",nick);
		    }
		 }
		var textarea = document.getElementsByTagName('textarea');
		textarea = textarea[0];
		textarea.value = GM_getValue("Message_3", "None").replace("$nick",nick);

	}

	function auto_no(event) {
		GM_setValue("Auto_Fill","No");

		var q = document.getElementsByTagName('input');

		for (var j=0; j < q.length; j++)
		{
			if (q[j].type == 'text'){
				if(q[j].name == 'subject')
					q[j].value = "";
		    }
		 }
		var textarea = document.getElementsByTagName('textarea');
		textarea = textarea[0];
		textarea.value = "";

	}

	function auto_info(event) {
		alert("Info about the auto-fill in for messages: \n\nIf you select \"1\",\"2\" or \"3\" for the Auto-Fill your subject and message will be auto-filled in when loading this page with the corresponding message. If you select \"No\", nothing will happen.\n\nHow to change the subject and message that needs to be auto-filled in?\n\nSimply clicking on \"1\", \"2\" or \"3\" in the \"Set to current\" section will change your auto-fill in info to the text you currently have typed in your browser in the subject and message fields.\n\nWhen using the word \"$nick\" in your message, it will be replaced with the nick of the person your are sending the message to!\n\nContact Bluud on mIRC for more info.");
	}

	var prefs = document.getElementById("_md_prefs");
	addCSS(
		"#_md_prefs {position:fixed; left:auto; right:0; bottom:0; top:auto; width:170px;  color:#ffffff; font: 11px Verdana; border-top:1px #000000 solid; background:#000000;}",
		"#_md_prefs div { text-align: left;padding:5px 0 0.4em 0; width:100%; margin: auto;}",
		"#_md_prefs input[type=submit] {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}",
		"#_md_prefs input[disabled]{background: #CCC;}",
		"#_md_prefs input[type=text] { width: 50px; }"
	);
		var prefs = document.createElement("div")
	prefs.id = "_md_prefs";
	var s = "<div>";

	s += "<br><br>Auto-Fill?<br>";
	s += "<input type='button' id='auto_1' value='1' />";
	s += "&nbsp;<input type='button' id='auto_2' value='2' />";
	s += "&nbsp;<input type='button' id='auto_3' value='3' />";
	s += "&nbsp;<input type='button' id='auto_no' value='No' />";
	s += "&nbsp;<input type='button' id='auto_info' value='?' />";
	s += "<br><br>Set to current<br>";
	s += "<input type='button' id='current_1' value='1' />";
	s += "&nbsp;<input type='button' id='current_2' value='2' />";
	s += "&nbsp;<input type='button' id='current_3' value='3' />";
	s += "</div>";

	prefs.innerHTML = s;
	document.body.appendChild(prefs);

	document.getElementById("current_1").addEventListener('click', current_1, true);
	document.getElementById("current_2").addEventListener('click', current_2, true);
	document.getElementById("current_3").addEventListener('click', current_3, true);
	document.getElementById("auto_1").addEventListener('click', auto_1, true);
	document.getElementById("auto_2").addEventListener('click', auto_2, true);
	document.getElementById("auto_3").addEventListener('click', auto_3, true);
	document.getElementById("auto_no").addEventListener('click', auto_no, true);
	document.getElementById("auto_info").addEventListener('click', auto_info, true);
	prefs.style.display="";

	var Subject = document.URL.split("&topic=");
	if (Subject[1]) {
		Subject = Subject[1];
		var Sub_ = Subject.split("&message=")
		if (Sub_) Subject = Sub_[0];
	}
	else Subject = "";

	var Message = document.URL.split("&message=");
	if (Message[1]) {
		Message = Message[1];
		var Mes_ = Message.split("&topic=")
		if (Mes_) Message = Mes_[0];
	}
	else Message = "";

	if ((Subject != "") || (Message != "")) {
		var q = document.getElementsByTagName('input');
		n = GM_getValue("Auto_Fill");
		for (var j=0; j < q.length; j++)
		{
			if (q[j].type == 'text'){
				if(q[j].name == 'subject')
					q[j].value = Subject.replace(/\$/g," ").replace(/\[\]/g,"\n").replace(/\;\;/g,"'");
		    }
		 }
		var textarea = document.getElementsByTagName('textarea');
		textarea = textarea[0];
		textarea.value = Message.replace(/\$/g," ").replace(/\[\]/g,"\n").replace(/\;\;/g,"'");
		document.getElementsByName("turing")[0].focus();
	}

	else {

		if (GM_getValue("Auto_Fill", "No") != "No"){

			var q = document.getElementsByTagName('input');
			n = GM_getValue("Auto_Fill");

			for (var j=0; j < q.length; j++)
			{
				if (q[j].type == 'text'){
					if(q[j].name == 'subject')
						q[j].value = GM_getValue("Subject_" + n, "None").replace("$nick",nick);
			    }
			 }
			var textarea = document.getElementsByTagName('textarea');
			textarea = textarea[0];
			textarea.value = GM_getValue("Message_" + n, "None").replace("$nick",nick);
			document.getElementsByName("turing")[0].focus();
		}
	}
	}
    }
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

		attackURL = LaCN_MOB_url + '/add_attack.ff_dhfgrh9.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&koc_report_id=' + stats_id + '&target=' + target + '&gold=' + gold + '&damage=' + damage + '&counterdamage=' + counterdamage + '&lost=' + losses + '&killed=' + kills;
		if (gold == "0") attackURL = attackURL + '&defended'
		ShowHtml(attackURL);


		if (GM_getValue("Instant_BF","Yes") == "Yes") {
            // Merv Show short version of this crap...
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



    // Merv - Buttons
    window.addEventListener('keydown', KeyCheck, true);
    document.body.innerHTML = document.body.innerHTML + "<span style='color: yellow; padding-left: 30%'>Type A to go to the Armory page...</span>";




}

if (TehURL[0] == "inteldetail") {

	var stuff = document.body.innerHTML;
	user = stuff.split("Under the cover of night, your spy sneaks into ");

	if (!user[1]) {

		user = stuff.split("Your spies attempt to break into ");
		spycaught = stuff.split("Your spies are spotted inside");
		sabbingdots = stuff.split("weapons of type .");

		if ((!user[1] && !spycaught[1]) || sabbingdots[1]) {

			user = stuff.split("weapons of type .");
			if (!user[1]) {
				if (GM_getValue("SendSabs","Yes") == "Yes") {
					sab()
				}
				else {
					var gm_button=document.createElement('div');
					gm_button.setAttribute('id','gm-button');
					gm_button.setAttribute('style','position:fixed;bottom:10px;right:10px;background-color:#000000;border:2px solid #777777;padding:5px;text-align:center;');
					var gm_paragraph=document.createElement('p');
					gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
					var gm_span_1=document.createElement('span');
					gm_span_1.setAttribute('id','gm-span-1');
					gm_span_1.setAttribute('style','cursor:pointer;');
					var gm_span_1_text=document.createTextNode('Sab-uploading Disabled');
					document.getElementsByTagName('body')[0].appendChild(gm_button);
					gm_button.appendChild(gm_paragraph);
					gm_paragraph.appendChild(gm_span_1);
					gm_span_1.appendChild(gm_span_1_text);
				}
			}
			else {
				var gm_button=document.createElement('div');
				gm_button.setAttribute('id','gm-button');
				gm_button.setAttribute('style','position:fixed;bottom:10px;right:10px;background-color:#000000;border:2px solid #FF0000;padding:5px;text-align:center;');
				var gm_paragraph=document.createElement('p');
				gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
				var gm_span_1=document.createElement('span');
				gm_span_1.setAttribute('id','gm-span-1');
				gm_span_1.setAttribute('style','cursor:pointer;');
				var gm_span_1_text=document.createTextNode('Attention: Sabbing dots!');
				document.getElementsByTagName('body')[0].appendChild(gm_button);
				gm_button.appendChild(gm_paragraph);
				gm_paragraph.appendChild(gm_span_1);
				gm_span_1.appendChild(gm_span_1_text);
			}
		}
		else {
			var id = stuff.split('name="id" value="');
			id = id[1].split('"');
			id = id[0];
			var newURL = "http://www.kingsofchaos.com/attack.php?id=" + id;
			if (GM_getValue("Reload","Yes") == "Yes") window.location.href=newURL
		}
	}
	else {
		recon()
	}



    // Merv - Buttons
    window.addEventListener('keydown', KeyCheck, true);



}

function new_header() {
	if (GM_getValue("Show_Helper","Yes") == "Yes") {
		var q = document.getElementsByTagName('table');
		var sabtable;
		var i;
		for(i = 0; i < q.length; i++) {
			if (((q[i].innerHTML.match("Attack Mission")) || (q[i].innerHTML.match("User Stats"))) && (!q[i].innerHTML.match("menu_cell"))) {
				sabtable = q[i];
				break;
			}
		}
		var t_cell = "";
		t_cell += '<table class="table_lines" border="0" cellpadding="6" cellspacing="0" width="100%">';
		t_cell += '<tbody><tr>';
		t_cell += '<th colspan="1" valign="top">Suitcase Helper</th>';
		t_cell += '</tr>';
		t_cell += '<tr>';
		t_cell += '<td align="center" valign="top">';
		t_cell += 'KoC mods have dissalowed this feature ;)';
		t_cell += '</td>';
		t_cell += '</tr>';
		t_cell += '</tbody></table>';
		t_cell = ''; ///// Merv
		tempCell = t_cell;
		oldCell = sabtable.rows[0].cells[0].innerHTML;
		sabtable.rows[0].cells[0].innerHTML = tempCell + infoCell + oldCell;

		//document.getElementById("Mass").addEventListener('click', mass_validate, true);
		//document.getElementById("m_Recon2").addEventListener('click', m_Recon2, true);
		//document.getElementById("m_Sab").addEventListener('click', m_Sab1, true);
	}
}

if (TehURL[0] == "stats") {
	// Merv - using quick access buttons ^_^
	window.addEventListener('keydown', KeyCheck, true);

	var todo = document.body.innerHTML;
	var invalid = todo.split("Invalid User ID");
	if (invalid[1]) {
    	var CurrentURL = document.URL;
    	var id = CurrentURL.split("id=");
        var stats = "";
        if (id[1]) {
    		id = id[1].split('#');
    		id = id[0];
    		stats = id;
    	}

		var tempURL = LaCN_MOB_url + "/add_invalid.rh0w.php?kocname=" + GM_getValue('kocUserName') + "&unique_id=" + GM_getValue('UniqueID') + "&FamilyCode=" + GM_getValue('FamilyCode') + "&statsid=" + stats + "&invalid=1";
        GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,
			onload: function(responseDetails) {
			var s = responseDetails.responseText;
			},
			onerror: function(responseDetails) {
			 alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
    }
  	stats_header();
  	stats();
}

function stats_header() {
	if (GM_getValue("Show_Helper","Yes") == "Yes") {
		var q = document.getElementsByTagName('table');
		var sabtable;
		var i;
		for(i = 0; i < q.length; i++) {
			if (((q[i].innerHTML.match("Attack Mission")) || (q[i].innerHTML.match("User Stats"))) && (!q[i].innerHTML.match("menu_cell"))) {
				sabtable = q[i];
				break;
			}
		}
		var t_cell = "";
		t_cell += '<table class="table_lines" border="0" cellpadding="6" cellspacing="0" width="100%">';
		t_cell += '<tbody><tr>';
		t_cell += '<th colspan="1" valign="top">Suitcase Helper</th>';
		t_cell += '</tr>';
		t_cell += '<tr>';
		t_cell += '<td align="center" valign="top">';
		t_cell += 'KoC mods have dissalowed this feature ;)';
		t_cell += '</td>';
		t_cell += '</tr>';
		t_cell += '</tbody></table>';
		t_cell = ''; ///// Merv
		tempCell = t_cell;
		oldCell = sabtable.rows[0].cells[0].innerHTML;
		sabtable.rows[0].cells[0].innerHTML = tempCell + oldCell;
	}
}

function my_chain() {
	GM_setValue("check_chain",GM_getValue("check_chain",0) + 1);
	if ((GM_getValue("check_chain") > 10) || (!GM_getValue("check_chain")) || (!GM_getValue("my_chain"))) {
		var tempURL = LaCN_MOB_url + '/show_clan.ff_j902t.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode");
		GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,
			onload: function(responseDetails) {
				var response = responseDetails.responseText
				GM_setValue("my_chain",response);
				GM_setValue("check_chain",1);
				},
			onerror: function(responseDetails) {
			  alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
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
	
		hitstring = hitstring.replace(/(<([^>]+)>)/ig,"");
	
		var tempURL = LaCN_MOB_url + '/add_recon_member.ff_hxw.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + GM_getValue("kocUserName") + '&sa=' + Sa + '&da=' + Da + '&spy=' + Spy + '&sentry=' + Sen + weapons + '&hits=' + hitstring;
		GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,
			onload: function(responseDetails) {
				},
			onerror: function(responseDetails) {
			  alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
	
		update_batch();
	
		var getuid = document.body.innerHTML;
		unique = getuid.split("http://www.kingsofchaos.com/recruit.php?uniqid=");
		unique = unique[1].split("\"");
		uniqueid = unique[0];
		GM_setValue("UniqueID",uniqueid);
	
		tempURL = LaCN_MOB_url + '/version.r32h.php?'
		GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,
	
			onload: function(responseDetails) {
	
			var response = responseDetails.responseText;
			version = response;
			downloadURL = 'http://www.lacnfamily.com/suitcase';
			if (version != ThisVersion) {
				prompt("You are running version " + ThisVersion + ", please look for version " + version + " here; (if the link does not work, make sure you are logged into our forum, and/or try the same link without the www)", downloadURL);
				window.location.href=downloadURL
			}
	
			},
			onerror: function(responseDetails) {
			 alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
	
		tempURL = LaCN_MOB_url + '/show_war.fwr3no.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + GM_getValue("kocUserName");
		GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,
			onload: function(responseDetails) {
	    		var response = responseDetails.responseText;
	    		GM_setValue("ShowWarList",response);
			},
			onerror: function(responseDetails) {
			  alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
	

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

if (TehURL[0] == "attack") {
	// Merv - using quick access buttons ^_^
	window.addEventListener('keydown', KeyCheck, true);

    // Compliments from Eric_Cartman (LaCN)
    // if(GM_getValue("_at_pref_name")=="Hammer of Thor"){' selected="selected"'}
    dw='<option label="Hammer of Thor" value="25">Hammer of Thor</option><option label="Battle Axe" value="29">Battle Axe</option><option label="Mace" value="17">Mace</option><option label="Warhammer" value="21">Warhammer</option><option label="Hatchet" value="9">Hatchet</option><option label="Gauntlets" value="48">Gauntlets</option><option label="Pike" value="13">Pike</option>';
    el='<option label="Elven Cloak" value="47">Elven Cloak</option><option label="Steel Bow" value="20">Steel Bow</option><option label="Short Bow" value="8">Short Bow</option><option label="Crossbow" value="12">Crossbow</option><option label="Longbow" value="16">Longbow</option><option label="Flaming Arrow" value="28">Flaming Arrow</option><option label="Steed" value="24">Steed</option>';
    or='<option label="Club" value="14">Club</option><option label="Heavy Shield" value="49">Heavy Shield</option><option label="Warg" value="26">Warg</option><option label="Dragon" value="30">Dragon</option><option label="Warblade" value="22">Warblade</option><option label="Sling" value="10">Sling</option><option label="Spear" value="18">Spear</option>';
    hu='<option label="Staff" value="7">Staff</option><option label="Broadsword" value="19">Broadsword</option><option label="Long Sword" value="11">Long Sword</option><option label="Excalibur" value="27">Excalibur</option><option label="Steed"value="23">Steed</option><option label="Lance" value="15">Lance</option><option label="Mithril" value="46">Mithril</option>';
    un='<option label="Scimitar" value="5">Scimitar</option><option label="Mist Veil" value="50">Mist Veil</option><option label="Dragon Claw" value="6">Dragon Claw</option>';

    var alltables = document.getElementsByTagName('table');
    race = "";
    for (i=0;i<alltables.length;i++) {
    	if(alltables[i].rows[0].cells.length==1){
    		if(alltables[i].rows[0].cells[0].innerHTML.match("Sabotage Mission")){
    			value = alltables[i].rows[1].cells[1].innerHTML;
    			if( value.match("Pike"))
    				race = "Dwarves";
    			else if(value.match("Crossbow") )
    				race ="Elves";
    			else if(value.match("Spear"))
    				race ="Orcs";
    			else if(value.match("Lance"))
    				race ="Humans";
    			else if(value.match("Scimitar"))
    				race ="Undead";
    		}
    	}
    }
    toAdd = "";
    if (race == "Dwarves") toAdd=el+or+hu+un;
    if (race == "Orcs") toAdd=dw+el+hu+un;
    if (race == "Humans") toAdd=dw+el+or+un;
    if (race == "Elves") toAdd=dw+or+hu+un;
    if (race == "Undead") toAdd=dw+or+hu+el;

    for (i=0;i<alltables.length;i++) {
    	if(alltables[i].rows[0].cells.length==1){
    		if(alltables[i].rows[0].cells[0].innerHTML.match("Sabotage Mission")){
    			value = alltables[i].rows[1].cells[1].innerHTML;
    			value =  	 value.replace("</select>","");
    			value = value + toAdd+"</select>";
    			alltables[i].rows[1].cells[1].innerHTML= value;
    		}
    	}
    }

	var CurrentURL = document.URL;
	var id = CurrentURL.split("id=");
	if (id[1]) {
		id = id[1].split('#');
		id = id[0];
		stats = id;
	}
	var todo = document.body.innerHTML;
	var invalid = todo.split("Invalid User ID");
	if (invalid[1]) {
		var tempURL = LaCN_MOB_url + "/add_invalid.rh0w.php?kocname=" + GM_getValue("kocUserName") + "&unique_id=" + GM_getValue("UniqueID") + "&FamilyCode=" + GM_getValue("FamilyCode") + "&statsid=" + stats + "&invalid=1";
		GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,
			onload: function(responseDetails) {
			var s = responseDetails.responseText;
			},
			onerror: function(responseDetails) {
			 alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
	}
	else {
		turing = todo.split('turing" value="');
		turing = turing[1].split('"');
		turing = turing[0];
		new_header();
		var too = todo.split("Your officers inform you");
		if (too[1]) {
			var newno = Math.ceil(GM_getValue("_attack_pref_numberOfWeapons") - Math.ceil(GM_getValue("_attack_pref_numberOfWeapons") / 100));
			GM_setValue("_attack_pref_numberOfWeapons",newno);
		}

		var stuff = document.body.innerHTML;
		nick = stuff.split("<td>Target:</td>");
		nick = nick[1].split(">");
		nick = nick[2].split("<");
		Username = nick[0];


        // Merv - maxed out
        var maxed_out = todo.split("Your opponent has already suffered heavy losses today");
        if (maxed_out[1]){
			var tempURL = LaCN_MOB_url + '/add_maxed_out.ff_t3eogvm.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + Username + '&maxed=1&haha=';
			GM_xmlhttpRequest({
				method: 'GET',
				url: tempURL,
				onload: function(responseDetails) {
					},
				onerror: function(responseDetails) {
					 alert("Request for contact resulted in error code: " + responseDetails.status);
				}
			});
        }



        // Merv - Raid / Recon button choise
        var InfoHuh = "Select this when you want to use the R button on your keyboard to ";
        function SetUseRButton(){
            var ButVal = document.getElementById("But1").value;
            GM_setValue("UseRButton", ButVal);
            document.getElementById("But2").checked = false;
        }

        function ReSetUseRButton(){
            var ButVal = document.getElementById("But2").value;
            GM_setValue("UseRButton", "recon");
            document.getElementById("But1").checked = false;
        }

        if (GM_getValue("UseRButton", "recon") != Username) { GM_setValue("UseRButton", "recon"); }
        var But1 = '<input id="But1" type="radio" title="'+InfoHuh+'RAID this m00k!!" value="'+Username+'"';
        var But2 = '<input id="But2" type="radio" title="'+InfoHuh+'recon"';
        if (GM_getValue("UseRButton", "recon") == Username) {
            But1 += ' checked> ';
            But2 += '>';
        }
        else {
            But1 += '>';
            But2 += ' checked> ';
        }
        document.body.innerHTML = document.body.innerHTML.replace('<input name="raidbut"', But1 + '<input name="raidbut"');
        document.body.innerHTML = document.body.innerHTML.replace('<input name="spyrbut"', But2 + '<input name="spyrbut"');

        var But1Link = document.getElementById('But1');
        var But2Link = document.getElementById('But2');
    	But1Link.addEventListener("click", SetUseRButton, true);
    	But2Link.addEventListener("click", ReSetUseRButton, true);



		var r =	 Math.random(1000,9999);
		var ak  =  (GM_getValue("UseArrowButtons"))  ?  GM_getValue("UseArrowButtons")  :  "on";
		var sabURL = LaCN_MOB_url + '/show_lastsab.ff_y5df4gb.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + Username + "&" + r + "&v=" + ThisVersion + "&ak=" + ak;

		ShowHtml(sabURL);
		enter_sabs();

	}
}

function set_UseArrowButtons(event) {
    var Mooi  =  ( (GM_getValue("UseArrowButtons")) && (GM_getValue("UseArrowButtons") == "off") )  ?  "on"  :  "off";
    GM_setValue("UseArrowButtons", Mooi);
    window.setTimeout("window.location.reload()", 200);
}

function enter_sabs() {
	var q = document.getElementsByTagName('input');
	var o = document.getElementsByTagName('option');

	for (var j=0; j < q.length; j++)
	{
		if (q[j].type == 'text'){
			if(q[j].name == 'numspies') {q[j].value = GM_getValue("_attack_pref_numberOfSpies", 1);}
			if(q[j].name == 'numsab') {q[j].value = GM_getValue("_attack_pref_numberOfWeapons", 1);}
	    }
	 }

	for (var i = 0; i < o.length; i++)
	{
		var numsab = GM_getValue("_at_pref_numsab", 0);
		if((o[i].value == numsab) && (o[i].label.length != "0")) {
			o[i].selected = true;
		}
	}

	for (var i = 0; i < o.length; i++)
	{
		var numsab = GM_getValue("_attack_pref_sabTurns", 1);
		if((o[i].value == numsab) && (o[i].label.length == "0")) {
			o[i].selected = true;
		}
	}
}


function stats(){

	var stuff = document.body.innerHTML;
	stats = TehURL[1].split("=");
	stats = stats[1];
	StatsID = stats;

  	turing = stuff.split('turing" value="');
  	turing = turing[1].split('"');
  	turing = turing[0];

	var name = stuff.split("td><b>Name:</b></td>");
	name = name[1].split("							");
	name = name[1].split("\n");
	newName = name[0].replace(/(<([^>]+)>)/ig,"");
	Username = newName.replace(/[\s]/g,"");
	GM_setValue("Detailed_Info",Username);

	var gold = stuff.split("<td><b>Treasury:</b></td>");
	if (gold[1]){
		gold = gold[1].split(">");
		gold = gold[1].split("<");
		gold = gold[0];
	}
	else gold = "None";

	tff = stuff.split("<td><b>Army Size:</b></td>");
	tff = tff[1].split("</td>");
	tff = tff[0].split("<td>");
	UsersSize = tff[1].split(",");

	race = stuff.split("<td><b>Race:</b></td>");
	race = race[1].split("</td>");
	race = race[0].split("<td>");
	UsersRace = race[1].split(",");

	rank = stuff.split("<td><b>Rank:</b></td>");
	rank = rank[1].split("</td>");
	rank = rank[0].split("<td>");
	UsersRank = rank[1].split(",");

	if (gold == "None") {
		var tempURL = LaCN_MOB_url + '/add_recon.ff_f5jy8.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + Username + '&statslink=' + StatsID + '&TFF=' + UsersSize + '&Race=' + UsersRace;
		var intelURL = LaCN_MOB_url + '/show_recon.42gcq4.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + Username;
	}
	else {
		var tempURL = LaCN_MOB_url + '/add_recon.ff_f5jy8.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + Username + '&statslink=' + StatsID + '&TFF=' + UsersSize + '&Race=' + UsersRace + '&Gold=' + gold;
		var intelURL = LaCN_MOB_url + '/show_recon.42gcq4.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + Username + '&Gold=' + gold;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,

			onload: function(responseDetails) {
		},
		onerror: function(responseDetails) {
		 alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});

	if (GM_getValue("ShowStats") == "Yes") {
		ShowHtml(intelURL);
	}

	if ((GM_getValue('KoC_Message_Time_' + Username)) && (GM_getValue("Message","Yes") == "Yes")) {
		var q = document.getElementsByTagName('table');
		var messagetable;
		var i;
		for(i = 0; i < q.length; i++) {
			if ((q[i].innerHTML.match("User Stats")) &&(!q[i].innerHTML.match("Command Center"))) {
				messagetable = q[i];
				break;
			}
		}

		var d = new Date()
		var ds = "" + d.getTime() + "";
		timespan = Math.floor((ds - Math.floor(GM_getValue('KoC_Message_Time_' + Username))) / 1000);
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

		var message_html = "";
		message_html += '<table class="table_lines" width="100%" cellspacing="0" cellpadding="6" border="0">';
		message_html += '<tr>';
		message_html += '<th>Last sent message (' + time + ')</th>';
		message_html += '</tr>';
		message_html += '<tr>';
		message_html += '<th class="subh" align="left">' + GM_getValue('KoC_Subject_Msg_' + Username, "") + '</th>';
		message_html += '</tr>';
		message_html += '<tr>';
		message_html += '<td>' + GM_getValue('KoC_Message_Msg_' + Username, "") + '</td>';
		message_html += '</tr>';
		message_html += '</table>';

		messagetable.rows[0].cells[1].innerHTML = message_html + messagetable.rows[0].cells[1].innerHTML;
	}
}

var Sab_Amount_String = "";

function ShowHtml(tempURL){
	//alert(tempURL);
	Show_Url = tempURL;
	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,
		onload: function(responseDetails) {
			var s = responseDetails.responseText;
			var error = s.split("o acces");
			var no_acc = s.split("o Acces")
			if (!error[1] && !no_acc[1]) {
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
				if (document.getElementById("Detailed_Stats")) document.getElementById("Detailed_Stats").addEventListener('click', Detailed_Stats, true);
				if (document.getElementById("Neutral_Stats_Detail")) document.getElementById("Neutral_Stats_Detail").addEventListener('click', Neutral_Stats_Detail, true);
				if (TehURL[0] == "attack") document.addEventListener('click', sabbing_now, true);
				if (document.getElementById("Sab_Amounts")) {
					Sab_Amount_String = s;
					document.getElementById("Sab_Amounts").addEventListener('click', Sab_Amounts, true);
				}
                // Merv - more fun ^_^
				if (document.getElementById("Sab_Amounts_1000")) {
                    Sab_Amount_String = s;
					document.getElementById("Sab_Amounts_1000").addEventListener('click', Sab_Amounts_1000, true);
				}
 				if (document.getElementById("Sab_Amounts_450")) {
                    Sab_Amount_String = s;
					document.getElementById("Sab_Amounts_450").addEventListener('click', Sab_Amounts_450, true);
				}
 				if (document.getElementById("Sab_Amounts_200")) {
                    Sab_Amount_String = s;
					document.getElementById("Sab_Amounts_200").addEventListener('click', Sab_Amounts_200, true);
				}
        		// Merv - turn arrow keys on/off
                if (document.getElementById("ArrowButtons")) {
                    document.getElementById("ArrowButtons").addEventListener('click', set_UseArrowButtons, true);
                }
                // end
				prefs.style.display="";
			}
			else alert("You have no Access to use this script. (Make sure you entered your Suitcase Pass in Suitcase Settings in your Command Center right down corner).");
		},
		onerror: function(responseDetails) {
		 alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});
}

// Merv - More fun continuing... ^_^
function Sab_Amounts_all(event) {
// This function is to combine all extra aat buttons in 1 button. (maybe in future, but already needed for rigth arrow key)
    var weaponamount = "";
    var weapontype = "";
	if (GM_getValue("_at_pref_name") == "Lookout Tower") {
        weapontype = "Nunchaku";
    	weaponamount = Sab_Amount_String.split('weaponamount_1000" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else if (GM_getValue("_at_pref_name") == "Nunchaku") {
        weapontype = "Invisibility Shield";
    	weaponamount = Sab_Amount_String.split('weaponamount_1000" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else if (GM_getValue("_at_pref_name") == "Invisibility Shield") {
        weapontype = "Blackpowder Missile";
    	weaponamount = Sab_Amount_String.split('weaponamount_1000" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else if (GM_getValue("_at_pref_name") == "Blackpowder Missile") {
        weapontype = "Chariot";
    	weaponamount = Sab_Amount_String.split('weaponamount_450" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else if (GM_getValue("_at_pref_name") == "Chariot") {
        weapontype = "Dragonskin";
    	weaponamount = Sab_Amount_String.split('weaponamount_200" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else {
        weapontype = "Lookout Tower";
    	weaponamount = Sab_Amount_String.split('weaponamount_1000" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	GM_setValue("_at_pref_name",weapontype);

    Sab_Amounts(event,weaponamount,weapontype);
}

function Sab_Amounts_all_reverse(event) {
// same as above but needed for rigth left key)
    var weaponamount = "";
    var weapontype = "";
	if (GM_getValue("_at_pref_name") == "Dragonskin") {
        weapontype = "Chariot";
    	weaponamount = Sab_Amount_String.split('weaponamount_450" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else if (GM_getValue("_at_pref_name") == "Nunchaku") {
        weapontype = "Lookout Tower";
    	weaponamount = Sab_Amount_String.split('weaponamount_1000" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else if (GM_getValue("_at_pref_name") == "Invisibility Shield") {
        weapontype = "Nunchaku";
    	weaponamount = Sab_Amount_String.split('weaponamount_1000" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else if (GM_getValue("_at_pref_name") == "Blackpowder Missile") {
        weapontype = "Invisibility Shield";
    	weaponamount = Sab_Amount_String.split('weaponamount_1000" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else if (GM_getValue("_at_pref_name") == "Chariot") {
        weapontype = "Blackpowder Missile";
    	weaponamount = Sab_Amount_String.split('weaponamount_1000" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	else {
        weapontype = "Dragonskin";
    	weaponamount = Sab_Amount_String.split('weaponamount_200" value"');
    	weaponamount = weaponamount[1].split('"');
    	weaponamount = weaponamount[0];
    }
	GM_setValue("_at_pref_name",weapontype);

    Sab_Amounts(event,weaponamount,weapontype);
}

function Sab_Amounts_1000(event) {
	var weaponamount_1000 = Sab_Amount_String.split('weaponamount_1000" value"');
	weaponamount_1000 = weaponamount_1000[1].split('"');
	weaponamount_1000 = weaponamount_1000[0];

	var weapontype = "";
	if (GM_getValue("_at_pref_name") == "Lookout Tower") { weapontype = "Nunchaku"; }
	else if (GM_getValue("_at_pref_name") == "Nunchaku") { weapontype = "Invisibility Shield"; }
	else if (GM_getValue("_at_pref_name") == "Invisibility Shield") { weapontype = "Blackpowder Missile"; }
	else { weapontype = "Lookout Tower"; }
	GM_setValue("_at_pref_name",weapontype);

    Sab_Amounts(event,weaponamount_1000,weapontype);
}

function Sab_Amounts_450(event) {
	var weaponamount_450 = Sab_Amount_String.split('weaponamount_450" value"');
	weaponamount_450 = weaponamount_450[1].split('"');
	weaponamount_450 = weaponamount_450[0];
	var weapontype = "Chariot";
    Sab_Amounts(event,weaponamount_450,weapontype);
}

function Sab_Amounts_200(event) {
	var weaponamount_200 = Sab_Amount_String.split('weaponamount_200" value"');
	weaponamount_200 = weaponamount_200[1].split('"');
	weaponamount_200 = weaponamount_200[0];
	var weapontype = "Dragonskin";
    Sab_Amounts(event,weaponamount_200,weapontype);
}

function Sab_Amounts(event,aat,weapon) {

	var weapontype = Sab_Amount_String.split('weapontype" value"');
	weapontype = weapontype[1].split('"');
    weapontype[0] = typeof(weapon) != 'undefined' ? weapon : weapontype[0];

	var weaponamount = Sab_Amount_String.split('weaponamount" value"');
	weaponamount = weaponamount[1].split('"');
    weaponamount[0] = typeof(aat) != 'undefined' ? aat : weaponamount[0];

	var turns = Sab_Amount_String.split('turns" value"');
	turns = turns[1].split('"');

	var spies = Sab_Amount_String.split('spies" value"');
	spies = spies[1].split('"');

	var weaponid = getid(weapontype[0]);

	var userprefs=document.getElementsByTagName('input');
	for (var j=0; j < userprefs.length; j++) {
		if (userprefs[j].name.match("numsab") != null) {
			userprefs[j].value = weaponamount[0];
		}
		if ((userprefs[j].name.match("numspies") != null)) {
			userprefs[j].value = spies[0];
		}
        }
	var o=document.getElementsByTagName('option');
	for (var i = 0; i < o.length; i++) {
		if ((o[i].value == weaponid) && (o[i].label)) o[i].selected = true;
		if ((o[i].value == turns[0]) && (!o[i].label)) o[i].selected = true;
	}
	var o=document.getElementsByTagName('option');
}


function sabbing_now(event){
	var userprefs=document.getElementsByTagName('input');
	for (var j=0; j < userprefs.length; j++) {
		if (userprefs[j].name.match("numsab") != null) {
			GM_setValue("_attack_pref_numberOfWeapons", userprefs[j].value);
		}
		if ((userprefs[j].name.match("numspies") != null)) {
			GM_setValue("_attack_pref_numberOfSpies", userprefs[j].value);
		}
        }
	var o=document.getElementsByTagName('option');

	for (var i = 0; i < o.length; i++) {
		if ((o[i].selected == true) && (o[i].value > 6)) {
			GM_setValue("_at_pref_numsab", o[i].value);
			GM_setValue("_at_pref_name", o[i].label);
		}
		if ((o[i].selected == true) && (o[i].value < 6)) GM_setValue("_attack_pref_sabTurns", o[i].value);
	}
}

function Detailed_Stats(event){
	var URL = LaCN_MOB_url + '/show_recon.42gcq4.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&target=' + Username + '&detailed';
    ShowHtml(URL);
}

function Neutral_Stats_Detail(event){
	Show_Url += '&detailed';
	ShowHtml(Show_Url);
}


function sab(){

	var stuff = document.body.innerHTML;
	user = stuff.split("Under the cover of night, your spy sneaks into ");

	sab = TehURL[1].split("=");
	sabID = sab[1].split(",");
	//This will be used to check if an sablog is already sent to server:

	user = stuff.split("Your spies successfully enter ");
	Username = user[1].split("'s armory ");
	Username = Username[0];

	amount_attempted = stuff.split("to attempt to sabotage ");
	Amount_Attempted = amount_attempted[1].split(" of ");
	Amount_Attempted = Amount_Attempted[0]

	amount = stuff.split("and destroy ");
	if (amount[1]) {
		Amount = amount[1].split(" of the");
		Amount = Amount[0];
	}
	else {Amount = "0";}

	spies = stuff.split("Your Chief of Intelligence dispatches ");
	spies = spies[1].split(" spies");
	Spies = spies[0];

	weapon = stuff.split("weapons of type ");
	weapon = weapon[1].split(".");
	Weapon = weapon[0].replace(" ","_");

	if (Amount_Attempted != Amount) {
		if (Amount != "0"){
			//Upload to server that there are no more weapons of that kind (later)
			var gm_button=document.createElement('div');
			gm_button.setAttribute('id','gm-button');
			gm_button.setAttribute('style','position:fixed;bottom:37px;right:10px;background-color:#000000;border:2px solid #FF0000;padding:5px;text-align:center;');
			var gm_paragraph=document.createElement('p');
			gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
			var gm_span_1=document.createElement('span');
			gm_span_1.setAttribute('id','gm-span-1');
			gm_span_1.setAttribute('style','cursor:pointer;');
			var gm_span_1_text=document.createTextNode('Error: No more ' + weapon[0]);
			document.getElementsByTagName('body')[0].appendChild(gm_button);
			gm_button.appendChild(gm_paragraph);
			gm_paragraph.appendChild(gm_span_1);
			gm_span_1.appendChild(gm_span_1_text);
		}
		else {
			//Upload to server that there are no more weapons of that kind (later)
			var gm_button=document.createElement('div');
			gm_button.setAttribute('id','gm-button');
			gm_button.setAttribute('style','position:fixed;bottom:10px;right:10px;background-color:#000000;border:2px solid #FF0000;padding:5px;text-align:center;');
			var gm_paragraph=document.createElement('p');
			gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
			var gm_span_1=document.createElement('span');
			gm_span_1.setAttribute('id','gm-span-1');
			gm_span_1.setAttribute('style','cursor:pointer;');
			var gm_span_1_text=document.createTextNode('Error: No more ' + weapon[0]);
			document.getElementsByTagName('body')[0].appendChild(gm_button);
			gm_button.appendChild(gm_paragraph);
			gm_paragraph.appendChild(gm_span_1);
			gm_span_1.appendChild(gm_span_1_text);
		}
	}

	var tempURL = LaCN_MOB_url + '/add_sab_gnvgwn29.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&koc_report_id=' + sabID + '&target=' + Username + '&weapon=' + Weapon + '&amount=' + Amount + '&spies=' + Spies + '&turns=' + GM_getValue("_attack_pref_sabTurns");
	if ((Amount != "0") && (GM_getValue("SendSabs","Yes") == "Yes")){
		ShowHtml(tempURL);
	}
}


function recon(){

	var stuff = document.body.innerHTML;
	var failed = stuff.split("but sees that many sentries patrol its walls")

	if (failed[1]) {
		var id = stuff.split('name="id" value="');
		id = id[1].split('"');
		id = id[0];
		var newURL = "http://www.kingsofchaos.com/attack.php?id=" + id;
		if (GM_getValue("Reload","Yes") == "Yes") window.location.href=newURL
	}

	else {

		gold = stuff.split(" Gold</td>");
		gold = gold[0].split('<td align="center">');
		gold = gold[1]

		user = stuff.split("Under the cover of night, your spy sneaks into ");
		user = user[1].split("'s camp.");
		Username = user[0].split(".<p>");

		sa = stuff.split("Strike Action");
		sa = sa[1].split(">");
		Strike = sa[2].split("<");
		Strike = Strike[0];

		da = stuff.split("Defensive Action");
		da = da[1].split(">");
		Defence = da[2].split("<");
		Defence = Defence[0];

		spy = stuff.split("Spy Rating");
		spy = spy[1].split(">");
		spy = spy[2].split("<");
		TheSpy = spy[0];

		sentry= stuff.split("Sentry Rating");
		sentry = sentry[1].split(">");
		sentry = sentry[2].split("<");
		TheSentry = sentry[0];

		coverts = stuff.split("Covert Operatives");
		coverts = coverts[1].split(">");
		coverts = coverts[2].split("<");
		NumberOfCoverts = coverts[0];

        // Merv - Attack turns
        AttackTurns = stuff.split("Attack Turns");
    	AttackTurns = AttackTurns[1].split(">");
    	AttackTurns = AttackTurns[2].split("<");
    	NumberOfAttackTurns = AttackTurns[0];

		stats = stuff.split('name="id" value="');
		stats = stats[1].split('"');
		StatsID2 = stats[0];

		intel = TehURL[1].split("=");
		intelID = intel[1].split(",");

		weapons = stuff.split(">Strength</th>");
		weapons = weapons[1].split("</table>");
        // Merv - annoying FF adds code, lolmao
        weapons = weapons[0].replace("</tbody>", "");

		weapons = weapons.split("</tr>");

		var weaponstring = "";
		var counter = 1;
		while(weapons[counter]) {
			temp = weapons[counter].split("<td");
			if ((temp[1]) && (temp[4])) {
				tempweapon = temp[1].split("</td>");
				tempweapon = tempweapon[0].split(">");
				tempweapon = tempweapon[1].replace(" ","_");

				if (tempweapon == "???") {
                    var damage = "";
                    var strength = temp[4].split("</td>");
					strength = strength[0].split("/");
                    // Merv - DA repairs
                    damaged = strength[0].split(">");
                    damaged = damaged[1];
                    strength = strength[1].split(">");
					strength = strength[0];

					var type = temp[2].split(">");
					type = type[1].split("<");
					type = type[0];

					if (type == "Sentry") type = "Sen";
					if (type == "Defend") type = "DA";
					if (type == "Attack") type = "SA";

					if ((strength != "???") && (type != "???")) tempweapon = 'weapons_' + type + '_' + strength;

                    // Merv - DA repairs
                    if ( (tempweapon == "weapons_DA_1000") && (damaged != "???") ) {
                        weaponstring += "&weapons_DA_1000_damage=" + damaged;
                    }
                    if ( (tempweapon == "weapons_DA_256") && (damaged != "???") ) {
                        weaponstring += "&weapons_DA_256_damage=" + damaged;
                    }
				}

                // Merv - DA repairs
                var damaged = temp[4].split("</td>");
                var damaged = damaged[0].split("/");
                var damaged = damaged[0].split(">");
                var damaged = damaged[1];

                if ( (tempweapon == "Invisibility_Shield") && (damaged != "???") ) {
                    weaponstring += "&weapons_DA_1000_damage=" + damaged;
                }
                if ( (tempweapon == "Dragonskin") && (damaged != "???") ) {
                    weaponstring += "&weapons_DA_256_damage=" + damaged;
                }

				if (temp[3]) tempamount = temp[3].split("</td>");
				if (temp[3]) tempamount = tempamount[0].split(">");
				if (temp[3]) tempamount = tempamount[1];

				if (temp[3]) if ((tempamount != "???") && (tempweapon != "???")) {weaponstring += "&" + tempweapon + "=" + tempamount;}
			}
			counter += 1;
		}
        // Merv - add amount of weapons (rows)
        counter = counter - 2;
		var tempURL = LaCN_MOB_url + '/add_recon.ff_f5jy8.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&koc_report_id=' + intelID + '&target=' + Username + '&Gold=' + gold + '&AmountDiffWeapons=' + counter;

		if(Strike!="???") {
			tempURL += '&sa=' + Strike;
		}
		if(Defence!="???") {
			tempURL += '&da=' + Defence;
		}
		if(TheSpy!="???") {
			tempURL += '&spy=' + TheSpy;
		}
		if(TheSentry!="???") {
			tempURL += '&sentry=' + TheSentry;
		}
		if(NumberOfCoverts!="???") {
			tempURL += '&CovertOps=' + NumberOfCoverts;
		}
        // Merv - Coverts
		if(NumberOfAttackTurns != "???") {
			tempURL += '&AttackTurns=' + NumberOfAttackTurns;
		}
		tempURL += '&statslink=' + StatsID2 + weaponstring;
		GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,
			onload: function(responseDetails) {
				},
			onerror: function(responseDetails) {
			  alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
	}
}

function addCSS(){
	var head = document.getElementsByTagName("head")[0];
	if(!head) return; // D'oh!
		var style = document.createElement("style");
	style.type = "text/css";
	var s = "";
	foreach(arguments, function(style){s+=style+"\n";});
	style.innerHTML = s;
	head.appendChild(style);
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

function Show_Welcome() {
	var tempURL = LaCN_MOB_url + '/message.mf3f.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode");
	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,
		onload: function(responseDetails) {
			var s = responseDetails.responseText;
			var welcome = document.getElementById("_md_welcome");
			addCSS(
				"#_md_welcome {position:fixed; left:auto; right:0; bottom:auto; top:22px; width:auto;background:#000000;}"
			);
			var welcome = document.createElement("div");
			welcome.id = "_md_welcome";
			welcome.innerHTML = s;
			document.body.appendChild(welcome);
			welcome.style.display="";
		},
		onerror: function(responseDetails) {
		 alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});
}

function Write_This(tempURL,style_box,style_text) {

	GM_xmlhttpRequest({
		method: 'GET',
		url: tempURL,

		onload: function(responseDetails) {
		var response = responseDetails.responseText
		response = response.split("\n");

		var gm_span = new Array();
		var gm_span_text = new Array();
		var gm_button=document.createElement('div');
		gm_button.setAttribute('id','gm-button');
		gm_button.setAttribute('style',style_box);
		var gm_paragraph=document.createElement('div');
		gm_paragraph.setAttribute('style',style_text);
		document.getElementsByTagName('body')[0].appendChild(gm_button);
		gm_button.appendChild(gm_paragraph);

		var sc = 0;
		while (sc < response.length) {
			gm_span[sc]=document.createElement('div');
			gm_span_text[sc]=document.createTextNode(response[sc]);
			gm_paragraph.appendChild(gm_span[sc]);
			gm_span[sc].appendChild(gm_span_text[sc]);
			sc++;
		}

		},
		onerror: function(responseDetails) {
		 alert("Request for contact resulted in error code: " + responseDetails.status);
		}
	});
}


function update_batch() {
	if (GM_getValue("Clicks") != "0") {
		tempURL = LaCN_MOB_url + '/add_clicks.ff_gjyt6f.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '&clicks=' + GM_getValue("Clicks");
		GM_xmlhttpRequest({
			method: 'GET',
			url: tempURL,

			onload: function(responseDetails) {

			var response = responseDetails.responseText
			if (response) total_clicks = response.split("Total clicks: ");
			if (total_clicks[1]) total_clicks = total_clicks[1].split(" ");
			if (total_clicks) GM_setValue("Total_Clicks",total_clicks[0]);
			if (total_clicks) GM_setValue("Clicks",0);
			},
			onerror: function(responseDetails) {
			 alert("Request for contact resulted in error code: " + responseDetails.status);
			}
		});
	}
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

if (TehURL[0] == "mercs") {
	MercsSettings_Small();
	var stuff = document.body.innerHTML;
	var pers = stuff.split('<td align="right">');
	var attack_sol = pers[1].split('</td>');
	attack_sol = Math.floor(removeComma(attack_sol[0]));
	var attack_mercs = pers[2].split('</td>');
	attack_mercs = Math.floor(removeComma(attack_mercs[0]));
	var def_sol = pers[3].split('</td>');
	def_sol = Math.floor(removeComma(def_sol[0]));
	var def_mercs = pers[4].split('</td>');
	def_mercs = Math.floor(removeComma(def_mercs[0]));
	var un_sol = pers[5].split('</td>');
	un_sol  = Math.floor(removeComma(un_sol[0]));
	var un_mercs = pers[6].split('</td>');
	un_mercs  = Math.floor(removeComma(un_mercs[0]));

	var max_25 = Math.floor((attack_sol + def_sol + un_sol) / 3 - attack_mercs - def_mercs - un_mercs);

	var gold = findText(document.body.innerHTML, 'Gold:<font color="#250202">', '<');
	if (gold != '') {
		gold = gold.replace(/\n/g, '');
		gold = gold.replace(/\t/g, '');
		gold = gold.replace(/,/g, '');
		gold = gold.replace('M', '000000');
		gold = parseInt(gold);
	}
	var mercs = stuff.split('<td align="right">');

	var mercs_1 = mercs[10].split('</td>');
	if (mercs_1[0] == 'None') mercs_1 = 0;
	else mercs_1 = Math.floor(removeComma(mercs_1[0]));

	var mercs_2 = mercs[12].split('</td>');
	if (mercs_2[0] == 'None') mercs_2 = 0;
	else mercs_2 = Math.floor(removeComma(mercs_2[0]));

	var mercs_3 = mercs[14].split('</td>');
	if (mercs_3[0] == 'None') mercs_3 = 0;
	else mercs_3 = Math.floor(removeComma(mercs_3[0]));

	if (GM_getValue("Mercs_1","4") == "1") {
		var min = max_25;
		if (mercs_1 < max_25) min = mercs_1;
		if (Math.floor(gold / 4500) < min) min =  Math.floor(gold / 4500);
		gold = Math.floor(gold - min * 4500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[0].value = min;
	}
	if (GM_getValue("Mercs_1","4") == "2") {
		var min = max_25;
		if (mercs_2 < max_25) min = mercs_2;
		if (Math.floor(gold / 4500) < min) min =  Math.floor(gold / 4500);
		gold = Math.floor(gold - min * 4500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[1].value = min;
	}
	if (GM_getValue("Mercs_1","4") == "3") {
		var min = max_25;
		if (mercs_3 < max_25) min = mercs_3;
		if (Math.floor(gold / 3500) < min) min =  Math.floor(gold / 3500);
		gold = Math.floor(gold - min * 3500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[2].value = min;
	}

	if (GM_getValue("Mercs_2","4") == "1") {
		var min = max_25;
		if (mercs_1 < max_25) min = mercs_1;
		if (Math.floor(gold / 4500) < min) min =  Math.floor(gold / 4500);
		gold = Math.floor(gold - min * 4500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[0].value = min;
	}
	if (GM_getValue("Mercs_2","4") == "2") {
		var min = max_25;
		if (mercs_2 < max_25) min = mercs_2;
		if (Math.floor(gold / 4500) < min) min =  Math.floor(gold / 4500);
		gold = Math.floor(gold - min * 4500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[1].value = min;
	}
	if (GM_getValue("Mercs_2","4") == "3") {
		var min = max_25;
		if (mercs_3 < max_25) min = mercs_3;
		if (Math.floor(gold / 3500) < min) min =  Math.floor(gold / 3500);
		gold = Math.floor(gold - min * 3500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[2].value = min;
	}

	if (GM_getValue("Mercs_3","4") == "1") {
		var min = max_25;
		if (mercs_1 < max_25) min = mercs_1;
		if (Math.floor(gold / 4500) < min) min =  Math.floor(gold / 4500);
		gold = Math.floor(gold - min * 4500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[0].value = min;
	}
	if (GM_getValue("Mercs_3","4") == "2") {
		var min = max_25;
		if (mercs_2 < max_25) min = mercs_2;
		if (Math.floor(gold / 4500) < min) min =  Math.floor(gold / 4500);
		gold = Math.floor(gold - min * 4500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[1].value = min;
	}
	if (GM_getValue("Mercs_3","4") == "3") {
		var min = max_25;
		if (mercs_3 < max_25) min = mercs_3;
		if (Math.floor(gold / 3500) < min) min =  Math.floor(gold / 3500);
		gold = Math.floor(gold - min * 3500);
		var userprefs=document.getElementsByTagName('input');
		userprefs[2].value = min;
	}

}


function MercsSettings_Small(event){
	var mercs = document.getElementById("_md_mercs");
	if (!mercs) {
		addCSS(
			"#_md_mercs {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
		);
		var mercs = document.createElement("div");
		mercs.id = "_md_mercs";
			document.body.appendChild(mercs);
	}
	var s = "<div>";
	s += "&nbsp;<input type='button' id='expand_mercs' value='Mercs Settings' /><div style='float:left; width: 15%;'></div>";
	mercs.innerHTML = s;
	document.getElementById("expand_mercs").addEventListener('click', MercsSettings_Big, true);
	mercs.style.display="";
}

function MercsSettings_Big(event){
	var mercs = document.getElementById("_md_mercs");
	if (!mercs) {
		addCSS(
			"#_md_mercs {position:fixed; left:auto; right:10; bottom:10; top:auto; width:auto;background:#000000;}"
		);
		var mercs = document.createElement("div");
		mercs.id = "_md_mercs";
			document.body.appendChild(mercs);
	}
	var s = "<div>";
	s += "<table border='2'>";

	s += "<tr>";
	s += "<th colspan='2'>Mercs Settings</th>"
	s += "</tr>";

	var option_1 = "";
	var option_2 = "";
	var option_3 = "";
	var option_4 = "";
	if (GM_getValue("Mercs_1","4") == 1) option_1 = 'selected="selected"';
	if (GM_getValue("Mercs_1","4") == 2) option_2 = 'selected="selected"';
	if (GM_getValue("Mercs_1","4") == 3) option_3 = 'selected="selected"';
	if (GM_getValue("Mercs_1","4") == 4) option_4 = 'selected="selected"';

	s += "<tr>";
	s += "<td>First Autofill </td>"
	s += "<td><select><option id='Mercs1_1'" + option_1 + "value='1'>Attack Mercenaries</option><option id='Mercs1_2'" + option_2 + "value='1'>Defence Mercenaries</option><option id='Mercs1_3'" + option_3 + "value='3'>Untrained Mercenaries</option><option id='Mercs1_4'" + option_4 + "value='4'>None</option></select></td>";
	s += "</tr>";

	var option_1 = "";
	var option_2 = "";
	var option_3 = "";
	var option_4 = "";
	if (GM_getValue("Mercs_2","4") == 1) option_1 = 'selected="selected"';
	if (GM_getValue("Mercs_2","4") == 2) option_2 = 'selected="selected"';
	if (GM_getValue("Mercs_2","4") == 3) option_3 = 'selected="selected"';
	if (GM_getValue("Mercs_2","4") == 4) option_4 = 'selected="selected"';

	s += "<tr>";
	s += "<td>Second Autofill </td>"
	s += "<td><select><option id='Mercs2_1'" + option_1 + "value='1'>Attack Mercenaries</option><option id='Mercs2_2'" + option_2 + "value='1'>Defence Mercenaries</option><option id='Mercs2_3'" + option_3 + "value='3'>Untrained Mercenaries</option><option id='Mercs2_4'" + option_4 + "value='4'>None</option></select></td>";
	s += "</tr>";

	var option_1 = "";
	var option_2 = "";
	var option_3 = "";
	var option_4 = "";
	if (GM_getValue("Mercs_3","4") == 1) option_1 = 'selected="selected"';
	if (GM_getValue("Mercs_3","4") == 2) option_2 = 'selected="selected"';
	if (GM_getValue("Mercs_3","4") == 3) option_3 = 'selected="selected"';
	if (GM_getValue("Mercs_3","4") == 4) option_4 = 'selected="selected"';

	s += "<tr>";
	s += "<td>Third Autofill </td>"
	s += "<td><select><option id='Mercs3_1'" + option_1 + "value='1'>Attack Mercenaries</option><option id='Mercs3_2'" + option_2 + "value='1'>Defence Mercenaries</option><option id='Mercs3_3'" + option_3 + "value='3'>Untrained Mercenaries</option><option id='Mercs3_4'" + option_4 + "value='4'>None</option></select></td>";
	s += "</tr>";

	s += "</table>";

	s += "&nbsp;<input type='button' id='help_mercs' value='Help' /><div style='float:left; width: 15%;'></div>";
	s += "&nbsp;<input type='button' id='expand_mercs' value='Save' /><div style='float:left; width: 15%;'></div>";
	mercs.innerHTML = s;
	document.getElementById("help_mercs").addEventListener('click', Mercs_Help, true);
	document.getElementById("expand_mercs").addEventListener('click', Mercs_Save_Settings, true);
	document.getElementById("expand_mercs").addEventListener('click', MercsSettings_Small, true);
	mercs.style.display="";

}

function Mercs_Help(event){
	var s = "Merc Settings \n\n";
	s += "These settings are preferences on how you want Suitcase to auto-fill the amount of mercenaries to buy. If you want it to fill in SA Mercs only, then you select for first autofill: 'Attack Mercenaries' and 'None' for the others. The Untrained and Defence mercenaries are similar. \n\n";
	s += "The second and third autofill are for people who want ontop of Attack Mercenaries (for example) also untrained mercenaries (if they have enough gold ofcourse). For those people, simply select 'Untrained Mercenaries' as second autofill option. Then Suitcase will fill in as much Attack Mercenaries as possible, and with the remainder of your gold it will fill in for Untrained Mercs.";
	alert(s);
}

function Mercs_Save_Settings(event) {
	var userprefs=document.getElementsByTagName('option');
	var i = 0;
	GM_setValue("Mercs_1","4");
	GM_setValue("Mercs_2","4");
	GM_setValue("Mercs_3","4");
	while(userprefs[i]) {
		if ((userprefs[i].id == 'Mercs1_1') && (userprefs[i].selected)) GM_setValue("Mercs_1","1");
		if ((userprefs[i].id == 'Mercs1_2') && (userprefs[i].selected)) GM_setValue("Mercs_1","2");
		if ((userprefs[i].id == 'Mercs1_3') && (userprefs[i].selected)) GM_setValue("Mercs_1","3");
		if ((userprefs[i].id == 'Mercs2_1') && (userprefs[i].selected)) GM_setValue("Mercs_2","1");
		if ((userprefs[i].id == 'Mercs2_2') && (userprefs[i].selected)) GM_setValue("Mercs_2","2");
		if ((userprefs[i].id == 'Mercs2_3') && (userprefs[i].selected)) GM_setValue("Mercs_2","3");
		if ((userprefs[i].id == 'Mercs3_1') && (userprefs[i].selected)) GM_setValue("Mercs_3","1");
		if ((userprefs[i].id == 'Mercs3_2') && (userprefs[i].selected)) GM_setValue("Mercs_3","2");
		if ((userprefs[i].id == 'Mercs3_3') && (userprefs[i].selected)) GM_setValue("Mercs_3","3");
		i++;
	}
}

function post(url, data) {
	GM_xmlhttpRequest({
		method: "POST",
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:encodeURI(data),
	});
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

// Merv - using quick access buttons ^_^
function KeyCheck(e)
{

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


            // ### SAB part ### \\
            //  arrow up
            else if ( (e.keyCode==38)  &&  ( (!GM_getValue("UseArrowButtons")) || (GM_getValue("UseArrowButtons") == "on") ) ) {
                upkeydown=true;
                Sab_Amounts();
        	}
            // c (from "C"opy this shit)
            else if (e.keyCode==67) {
                upkeydown=true;
                Sab_Amounts();
        	}
            //  arrow right
            else if (e.keyCode==39) {
                upkeydown=true;
                Sab_Amounts_all();
        	}
            //  arrow left
            else if (e.keyCode==37) {
                upkeydown=true;
                Sab_Amounts_all_reverse();
        	}
            // arrow down
            else if ( (e.keyCode==40)  &&  ( (!GM_getValue("UseArrowButtons")) || (GM_getValue("UseArrowButtons") == "on") ) ) {
                upkeydown=true;
                sabbing_now();
                document.getElementsByTagName('form')[2].submit();
            }
            else if (e.keyCode==83) {
                upkeydown=true;
                sabbing_now();
                document.getElementsByTagName('form')[2].submit();
        	}
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

function cursor_wait(button) {
    document.body.style.cursor = 'wait';
    document.getElementById(button).style.cursor = 'wait';
}
function cursor_ready(button) {
    document.body.style.cursor = 'default';
    document.getElementById(button).style.cursor = 'pointer';
}

function in_array (needle, haystack, argStrict) {
    var key = '', strict = !!argStrict;
    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }
     return false;
}


// Twittle !! ^_^
var NotShowPages = new Array("attack", "inteldetail", "recruit", "error", "battlefield");
if ( (!in_array(TehURL[0], NotShowPages)) && (GM_getValue("LaCN_NewsBar", "Yes") == "Yes") ) {
    function TwittleHuh() {
        var TwittleHuh = "Twittle is the Family's short message bar ;)\nIt displays your messages in BLUE to everyone.\n(keep it clean and PG13 though)\nYou can use  /me  and  /slap  ;P\nLinks to KoC and forum will automatically be shortened and made clickable.\n\nMessages in GREEN represent official news from the Family.\nMessages in RED represent VERY IMPORTANT NEWS from the Family. \n(like war announcements)\n\nNow supports Personal messaging:\nWhen you mention someones name and add a @ in front of this name, the member keeps receiving a highlighted version of your message, untill (s)he clicks on it to hide it.\n(these messages are not private, and everyone can see them)\n\nEnjoy Twittle !!";
        alert(TwittleHuh);
    }
    // Make Enter-key submit a Twittle
    function EnterTwittle(e) {
        if (e.keyCode == 13) {
            upkeydown=true;
            Twittle();
        }
        else {
            upkeydown=true;
        }
    }
    var LaCN_NewsBar = document.createElement("div");
    LaCN_NewsBar.id = "LaCN_NewsBar";
    LaCN_NewsBar.innerHTML = '<iframe id="NewsBarFrame" scrolling="no" frameborder="0" width="650" height="22" src="http://www.lacnfamily.com/MOB/suitcase/LaCN_Suitcase_NewsBar.php?kocname=' + GM_getValue("kocUserName") + '&unique_id=' + GM_getValue("UniqueID") + '&FamilyCode=' + GM_getValue("FamilyCode") + '" ALLOWTRANSPARENCY onmouseover="LaCN_NewsTypeBar.style.visibility=\'\';"></iframe>'
    LaCN_NewsBar.innerHTML += '<div id="LaCN_NewsTypeBar" style="visibility: hidden; text-align: right;"><input type="button" id="TwittleHuh" value="?" style="font-size: 8pt; background-color: #0070DF; padding-left: 0; padding-right: 0; border: none;" /><input type="text" id="MySpamXD" size="75" maxlength="100" style="text-align: center; color: yellow; font-size: 8pt;" title="You can use /me and /slap ;P   Links to KoC and forum will be automatically made clickable ;)" /><input type="button" id="Twittle" value="Twittle!" style="font-size: 8pt; background-color: #0070DF;" /></div>';
    addCSS("#LaCN_NewsBar {position: absolute; right: 0; top: 0;}");
    document.documentElement.appendChild(LaCN_NewsBar);
    if ( (document.getElementById("Twittle")) ) document.getElementById("Twittle").addEventListener('click', Twittle, true);
    if ( (document.getElementById("MySpamXD")) ) document.getElementById("MySpamXD").addEventListener('keydown', EnterTwittle, true);
    if ( (document.getElementById("TwittleHuh")) ) document.getElementById("TwittleHuh").addEventListener('click', TwittleHuh, true);
}
