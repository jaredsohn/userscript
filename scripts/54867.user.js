// ==UserScript==
// @name           	Vejida's Leecher Checker
// @namespace      http://hightekcafe.com/ikariam
// @description    	A script for Ikariam that colors leechers
// @include       	 http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==
// Original script built by Leecher Checker v 1.2.3
// New script built by Joshua Pack
	var lversion = "0.2.26";
	var updatesite = "http://hightekcafe.com/ikariam/update.php";
	var updatesite2 = "http://hightekcafe.com/ikariam/leecher_checker_beta.user.js";
// css

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Comma
function Comma(number) {
  number += '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(number)) {
    number = number.replace(rgx, '$1' + ',' +'$2');
  }
  return number;
}
/**
*	Parses a string of format 123,456 to an int in format 123456
*/

function toInt(string)
{
  return parseInt(string.replace(/\,/g, ''));
}
function toInt2(string)
{
  return parseInt(string.replace(/\./g, ''));
}
/**
*	Depending on how well a person donates, he gets a color:
*	0-90		Leecher, color is red
*	90-100	Sort of leecher, color is blue
*	100-110	Donates enough, color is orange
*	110 - ??	Good donater, coller is green
*/
function getLeecherStatus(percentage)
{
		checker_band_color = GM_getValue("checker_band_color","#CC99FF");
		checker_band = GM_getValue("checker_band",0);
	if (percentage > 110)
		return '#c7fac6';
	if (percentage >= 100)
		return '#faf4c6';
	if (percentage >= 90)
		return '#c6dafa';
	if (percentage >= checker_band && checker_band != 0)
		return checker_band_color;
	if (percentage == undefined) //error value
		return 'black';
	return '#fac6c6';
}
/**
*	Parses a string of format 10 into 010
*/
function tothree(percent)
{
	var result2 = percent;
	if (percent < 10) {
	result2 = "<font color='"+getLeecherStatus(percent)+"'>00</font>"+percent;
	} else if(percent < 100) {
	result2 = "<font color='"+getLeecherStatus(percent)+"'>0</font>"+percent;
	} else {
	result2 = percent;
	}
	return result2;
}
// toggle options
function togglebox(name,table)
{
var getdisplay = document.getElementById(name).style.display;
if (getdisplay == table) {
	document.getElementById(name).style.display="none";
} else {
	document.getElementById(name).style.display=table;
	}
	
}
// options field
function alltheoptions() 
{
var options_menu = document.getElementById('resourceUsers').childNodes[1];
	options_menu.innerHTML += " <a href=\"javascript:togglebox('alloptions');\" title=\"Settings\"><span class=\"textLabel\" id=\"options2\">Options</span></a>";

}
/**
*	Check to see if you have updated version!
*/
function AJAX_write(getwhat)
{
updatesite = updatesite+"?program=leecherchecker&x="+getwhat;

GM_xmlhttpRequest({
  method:"GET",
  url:updatesite,
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    },
  onload:function(details) {
  if (getwhat == "version") {
	var is_it_updated, updatecolor;
	if (details.readyState == 4) {
	var update_version = details.responseText;
	if (update_version != lversion) {
	is_it_updated = "<a href='"+updatesite2+"'><b>Out Of Date</b></a>"; 
	updatecolor = "RED";
	} else {
	is_it_updated = "Up To Date"; 
	updatecolor = "GREEN";
	}
	} else {
	is_it_updated = "<a href='"+updatesite2+"'>Unknown [Could not find update]</a>"; 
	updatecolor = "GRAY";
	}
	//var footer_update = document.getElementById('resourceUsers').childNodes[1];
	var footer_update = document.getElementById('updatecheck');
	footer_update.innerHTML += " (<font color='"+updatecolor+"'>Leecher Checker is "+is_it_updated+"</font>)";
  } else if(getwhat == "note") {
	if (details.readyState == 4) {
	var update_note = details.responseText;
	var footer_update = document.getElementById('updatenote');
	footer_update.innerHTML += update_note;
	}
  }
  }
});
}

window.addEventListener('load',  function() 
{ 
try
{
	// add all css
	//addGlobalStyle('a:hover {background:#ffffff; text-decoration:none;}');
	addGlobalStyle('a.tooltip span {display:none; padding:2px 3px; margin-left:1px; width:150px;}');
	addGlobalStyle('.menubox {display:none; position: absolute; left: -14px; top: 30px; padding:2px 3px; margin-left:1px; width:700px;background:#ffffff; border:1px solid #cccccc; color:#6c6c6c; z-index:99;}');
	addGlobalStyle('a.tooltip:hover span{display:inline; position:absolute; background:#ffffff; border:1px solid #cccccc; color:#6c6c6c;}');
	// The id of the body tag contains which page you are on
	var page = document.getElementsByTagName('body')[0].id;
	var	different_format = GM_getValue("different_format",0);
	// Check if you are at a resource deposit
	if ( (page == 'tradegood') || (page == 'resource') )
	{
		var donationList = document.getElementById('resourceUsers').childNodes[3].childNodes[1];//.childNodes[5-offset].childNodes[1];
		var name, playerName, donated, lvl, workers, percentage, param, method, mill_number, milllevel, actionmess;
		sort_all_mills = GM_getValue("sort_all_mills",1);
		// Depending on the type of resource, get the right variables
		if (page == 'resource') 
		{
		// info from http://ikariam.wikia.com/wiki/Saw_mill
		mill_number = 34;
			method = GM_getValue("method_building",2);
			param = GM_getValue("param_building",10);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 30,      10,      10);
			workplace[2]  = new Array( 38,     394,     394);
			workplace[3]  = new Array( 50,     992,    1386);
			workplace[4]  = new Array( 64,    1732,    3118);
			workplace[5]  = new Array( 80,    2788,    5906);
			workplace[6]  = new Array( 96,    3783,    9689);
			workplace[7]  = new Array(114,    5632,   15321);
			workplace[8]  = new Array(134,    8139,   23460);
			workplace[9]  = new Array(154,   10452,   33912);
			workplace[10] = new Array(174,   13298,   47210);
			workplace[11] = new Array(196,   18478,   65688);
			workplace[12] = new Array(218,   23213,   88901);
			workplace[13] = new Array(240,   29038,  117939);
			workplace[14] = new Array(264,   39494,  157433);
			workplace[15] = new Array(288,   49107,  206540);
			workplace[16] = new Array(314,   66010,  272550);
			workplace[17] = new Array(340,   81766,  354316);
			workplace[18] = new Array(366,  101146,  455462);
			workplace[19] = new Array(394,  134598,  590060);
			workplace[20] = new Array(420,  154304,  744364);
			workplace[21] = new Array(448,  205012,  949376);
			workplace[22] = new Array(478,  270839, 1220215);
			workplace[23] = new Array(506,  311541, 1531756);
			workplace[24] = new Array(536,  411229, 1942985);
			workplace[25] = new Array(566,  506475, 2449460);
			workplace[26] = new Array(598,  665201, 3114661);
			workplace[27] = new Array(628,  767723, 3882384);
			workplace[28] = new Array(660, 1007959, 4890343);
			workplace[29] = new Array(692, 1240496, 6130839);
			workplace[30] = new Array(724, 1526516, 7657355);
			workplace[31] = new Array(758, 1995717, 9653072);
			workplace[32] = new Array(790, 2311042,11964114);
			workplace[33] = new Array(824, 3020994,14985108);
			workplace[34] = new Array(854, 3935195,18920303);
		}
		else
		{
		// info from http://ikariam.wikia.com/wiki/Quarry
		mill_number = 23;
			method = GM_getValue("method_luxury",2);
			param = GM_getValue("param_luxury",10);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 20,      10,      10);
			workplace[2]  = new Array( 32,    1303,    1303);
			workplace[3]  = new Array( 48,    2689,    3992);
			workplace[4]  = new Array( 66,    4373,    8365);
			workplace[5]  = new Array( 88,    7421,   15786);
			workplace[6]  = new Array(110,   10037,   25823);
			workplace[7]  = new Array(132,   13333,   39156);
			workplace[8]  = new Array(158,   20665,   59821);
			workplace[9]  = new Array(184,   26849,   86670);
			workplace[10] = new Array(212,   37305,  123975);
			workplace[11] = new Array(240,   47879,  171854);
			workplace[12] = new Array(270,   65572,  237426);
			workplace[13] = new Array(302,   89127,  326553);
			workplace[14] = new Array(332,  106217,	 432770);
			workplace[15] = new Array(366,  152379,  585149);
			workplace[16] = new Array(400,  193512,  778661);
			workplace[17] = new Array(434,  244886, 1023547);
			workplace[18] = new Array(468,  309618, 1333165);
			workplace[19] = new Array(504,  414190, 1747355);
			workplace[20] = new Array(542,  552058, 2299413);
			workplace[21] = new Array(578,  660106, 2959519);
			workplace[22] = new Array(618,  925396, 3884915);
			workplace[23] = new Array(656, 1108885, 4993800);
			workplace[24] = new Array(696, 1471979, 6465779);
			workplace[25] = new Array(736, 1855942, 8321721);
			workplace[26] = new Array(776, 2339735, 10661456);
			}
		// Find Mills level, only for Strict Breafuios
		offset = 0;
		if (document.getElementById('resUpgrade').childNodes[3].childNodes[5].innerHTML.split('</span>')[1] > 0){offset = 2;} 
		if (method == 2) {	milllevel = document.getElementById('resUpgrade').childNodes[3].childNodes[3+offset].innerHTML.split('</span>')[1];}
		if (sort_all_mills==1) {
		// See who has more then 1 town on island
		var num_towns = new Array();
		var new_var_towns = 0;
		var towns_int2, towns_int;
		var the_minus = 0;
		for (var jj = 1; jj < donationList.rows.length; jj++)
		{
			name = donationList.rows[jj].cells[1].innerHTML;
			playerName = donationList.rows[jj].cells[0].innerHTML;
			donated = donationList.rows[jj].cells[4].innerHTML;
			donated_int = toInt(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			if (different_format == 1) {
			donated_int = toInt2(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			}
			lvl = donationList.rows[jj].cells[2].innerHTML;
			workers = donationList.rows[jj].cells[3].innerHTML;
			actionmess = donationList.rows[jj].cells[5].innerHTML;
			towns = 1;
			if (playerName == "&nbsp;") {the_minus = the_minus+1;}
			// 					    	       			      Player /		 	Num of towns / 	
			if (playerName == "&nbsp;") {
			playerName = towns_int2;
			num_towns[new_var_towns-the_minus]  = new Array(playerName, 	towns+the_minus);
			num_towns[new_var_towns]  = new Array(playerName, 	towns+the_minus);
			} else {
			the_minus = 0;
			num_towns[new_var_towns]  = new Array(playerName, 	towns);
			}
			
			// sorting array
			new_var_towns++;
			towns_int2 = playerName;
		}
		// Order mills
		var go_in_order = new Array();
		var go_in_order_sort = new Array();
		var new_var = 0;
		var donated_int2, donated_int;
		for (var jj = 1; jj < donationList.rows.length; jj++)
		{
			name = donationList.rows[jj].cells[1].innerHTML;
			playerName = donationList.rows[jj].cells[0].innerHTML;
			donated = donationList.rows[jj].cells[4].innerHTML;
			donated_int = toInt(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			if (different_format == 1) {
			donated_int = toInt2(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			}
			lvl = donationList.rows[jj].cells[2].innerHTML;
			workers = donationList.rows[jj].cells[3].innerHTML;
			actionmess = donationList.rows[jj].cells[5].innerHTML;

			if (isNaN(donated_int)) {donated_int = donated_int2;} else {
			donated_int_town = num_towns[new_var][1];
			donated_int23 = donated_int/donated_int_town;
			}
			// 					    	       			Player /		town / 	level/	workers/		donated/		actions/		donated_int
			go_in_order[new_var]  = new Array(playerName,	name,	lvl,	workers,	donated,	actionmess,	donated_int, donated_int23);
			// sorting array
			if (isNaN(donated_int)) {donated_int = donated_int2;}
			go_in_order_sort[new_var]  = donated_int;
			new_var++;
			donated_int2 = donated_int;
		}
		go_in_order_sort = go_in_order_sort.sort(function(a,b){return b - a});
		var new_order = 1;
		var add_town;
		var ordered_towns = new Array();
		for (var jj2 = 0; jj2 < new_var; jj2++)
		{
			for (var jj3 = 0; jj3 < new_var; jj3++)
			{
				playerName = go_in_order[jj3][0];
				name = go_in_order[jj3][1];
				donated = go_in_order[jj3][4];
				donated_int = go_in_order[jj3][6];
				lvl = go_in_order[jj3][2];
				workers = go_in_order[jj3][3];
				actionmess = go_in_order[jj3][5];
				if (go_in_order_sort[jj2]==donated_int) {
				add_town = go_in_order[jj3];
				go_in_order[jj3] = [];
				break;
				}
			}
			ordered_towns[new_order] = add_town;
			new_order++;
		}
		for (var jj4 = 1; jj4 < new_order; jj4++)
		{
		
			donationList.rows[jj4].cells[0].innerHTML=ordered_towns[jj4][0];
			donationList.rows[jj4].cells[1].innerHTML=ordered_towns[jj4][1];
			donationList.rows[jj4].cells[2].innerHTML=ordered_towns[jj4][2];
			donationList.rows[jj4].cells[3].innerHTML=ordered_towns[jj4][3];
			donationList.rows[jj4].cells[4].innerHTML=ordered_towns[jj4][4];
			donationList.rows[jj4].cells[5].innerHTML=ordered_towns[jj4][5];
		
		}
		} else if(sort_all_mills==2){
		// See who has more then 1 town on island
		var num_towns = new Array();
		var new_var_towns = 0;
		var towns_int2, towns_int;
		var the_minus = 0;
		for (var jj = 1; jj < donationList.rows.length; jj++)
		{
			name = donationList.rows[jj].cells[1].innerHTML;
			playerName = donationList.rows[jj].cells[0].innerHTML;
			donated = donationList.rows[jj].cells[4].innerHTML;
			donated_int = toInt(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			if (different_format == 1) {
			donated_int = toInt2(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			}
			lvl = donationList.rows[jj].cells[2].innerHTML;
			workers = donationList.rows[jj].cells[3].innerHTML;
			actionmess = donationList.rows[jj].cells[5].innerHTML;
			towns = 1;
			if (playerName == "&nbsp;") {the_minus = the_minus+1;}
			// 					    	       			      Player /		 	Num of towns / 	
			if (playerName == "&nbsp;") {
			playerName = towns_int2;
			num_towns[new_var_towns-the_minus]  = new Array(playerName, 	towns+the_minus);
			num_towns[new_var_towns]  = new Array(playerName, 	towns+the_minus);
			} else {
			the_minus = 0;
			num_towns[new_var_towns]  = new Array(playerName, 	towns);
			}
			
			// sorting array
			new_var_towns++;
			towns_int2 = playerName;
		}
		// Order mills by towns
		var go_in_order = new Array();
		var go_in_order_sort = new Array();
		var new_var = 0;
		var donated_int2, donated_int;
		for (var jj = 1; jj < donationList.rows.length; jj++)
		{
			name = donationList.rows[jj].cells[1].innerHTML;
			playerName = donationList.rows[jj].cells[0].innerHTML;
			donated = donationList.rows[jj].cells[4].innerHTML;
			donated_int = toInt(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			if (different_format == 1) {
			donated_int = toInt2(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			}
			lvl = donationList.rows[jj].cells[2].innerHTML;
			workers = donationList.rows[jj].cells[3].innerHTML;
			actionmess = donationList.rows[jj].cells[5].innerHTML;
			if (isNaN(donated_int)) {donated_int = donated_int2;} else {
			donated_int_town = num_towns[new_var][1];
			donated_int = donated_int/donated_int_town;
			}
			//alert(donated_int_town+playerName+donated_int);
			// 					    	       			Player /		town / 	level/	workers/		donated/		actions/		donated_int
			go_in_order[new_var]  = new Array(playerName,	name,	lvl,	workers,	donated,	actionmess,	donated_int);
			// sorting array
			if (isNaN(donated_int)) {donated_int = donated_int2;}
			go_in_order_sort[new_var]  = donated_int;
			new_var++;
			donated_int2 = donated_int;
		}
		go_in_order_sort = go_in_order_sort.sort(function(a,b){return b - a});
		var new_order = 1;
		var add_town;
		var ordered_towns = new Array();
		for (var jj2 = 0; jj2 < new_var; jj2++)
		{
			for (var jj3 = 0; jj3 < new_var; jj3++)
			{
				playerName = go_in_order[jj3][0];
				name = go_in_order[jj3][1];
				donated_int = go_in_order[jj3][6];
				donated = go_in_order[jj3][4];
				lvl = go_in_order[jj3][2];
				workers = go_in_order[jj3][3];
				actionmess = go_in_order[jj3][5];
				if (go_in_order_sort[jj2]==donated_int) {
				add_town = go_in_order[jj3];
				go_in_order[jj3] = [];
				break;
				}
			}
			ordered_towns[new_order] = add_town;
			new_order++;
		}
		for (var jj4 = 1; jj4 < new_order; jj4++)
		{
		
			donationList.rows[jj4].cells[0].innerHTML=ordered_towns[jj4][0];
			donationList.rows[jj4].cells[1].innerHTML=ordered_towns[jj4][1];
			donationList.rows[jj4].cells[2].innerHTML=ordered_towns[jj4][2];
			donationList.rows[jj4].cells[3].innerHTML=ordered_towns[jj4][3];
			donationList.rows[jj4].cells[4].innerHTML=ordered_towns[jj4][4];
			donationList.rows[jj4].cells[5].innerHTML=ordered_towns[jj4][5];
		
		}
		}
		// Start Rules and Laws
		for (var j = 1; j < donationList.rows.length; j+=cities)
		{
			// Name | Player name | Donated | Level | Number of workers | Actions
			name = donationList.rows[j].cells[1].innerHTML;
			playerName = donationList.rows[j].cells[0].innerHTML;
			donated = toInt(donationList.rows[j].cells[4].innerHTML.split(' ')[0]);
			if (different_format == 1) {
			donated = toInt2(donationList.rows[j].cells[4].innerHTML.split(' ')[0]);
			}
			lvl = donationList.rows[j].cells[2].innerHTML.split(' ')[1];
			workers = donationList.rows[j].cells[3].innerHTML.split(' ')[0];
			
			// Check how many cities this player has
			var j3 = j;
			var cum_city_lvl = 0;
			var cities = 1;
			j3++;
			while ( (j3 < donationList.rows.length) && ("&nbsp;" == donationList.rows[j3].cells[0].innerHTML) )
			{
				workers2 = donationList.rows[j3].cells[3].innerHTML.split(' ')[0];
				workers = workers*1;
				workers2 = workers2*1;
				cities = cities*1;
				cities = (cities+1);
				j3++;
			}
			var needed_wood;
			if (method == 1 || method == 2) //Breafuios and Strict Breafuios
			{
			var strict = "1";
			if (method == 1) {strict = "1.5";}
				var breafuios_new,workers_100,workers_at_100;
				// Check which level is used
				for(workers_lvl = 1; workers_lvl < mill_number; workers_lvl++)
				{
					if (workers <= strict * workplace[workers_lvl][0])
						break;
				}
				for(workers_100 = 1; workers_100 < mill_number; workers_100++)
				{
				if (donated != 0) {
					if (donated/cities <= strict * workplace[workers_100][2] * param/100) {
					workers_at_100 = workplace[workers_100-1][0];
						break;
						}
					} else {
					workers_at_100 = workplace[1][0];
					}
				}
				if (method == 2) {	if (workers > workplace[milllevel][0]) {workers_lvl = milllevel;}}
				breafuios_new = workplace[workers_lvl][2]*param/100;
				//alert(workplace[workers_lvl][2]+"...."+param);
			var j2 = j;
			j2++;
				while ( (j2 < donationList.rows.length) && ("&nbsp;" == donationList.rows[j2].cells[0].innerHTML) )
				{
					for(workers_lvl2 = 1; workers_lvl2 < mill_number; workers_lvl2++)
					{
					workers2 = donationList.rows[j2].cells[3].innerHTML.split(' ')[0];
						if (workers2 <= strict * workplace[workers_lvl2][0])
							break;
					
					}
				if (method == 2) {		if (workers2 > workplace[milllevel][0]) {workers_lvl2 = milllevel;}}
				breafuios_new = (breafuios_new+(workplace[workers_lvl2][2]*param/100));
					j2++;
				}
				if ("&nbsp;" != playerName) {
				percentage = ((donated / (breafuios_new))) * 100;
				}
				if (percentage=="Infinity") {percentage = 999;}
				if (percentage>999) {percentage = 999;}
				needed_wood = breafuios_new-donated+1;
				needed_wood110 = (breafuios_new*1.10)-donated+1;
			}
			else if (method == 3)  // LQ Method
			{
			
				var breafuios_new,workers_100,workers_at_100;
			var LQrule = 6*lvl*workers;
			var LQrule2;
			var j2 = j;
			j2++;
				while ( (j2 < donationList.rows.length) && ("&nbsp;" == donationList.rows[j2].cells[0].innerHTML) )
				{
					workers2 = donationList.rows[j2].cells[3].innerHTML.split(' ')[0];
					lvl2 = donationList.rows[j2].cells[2].innerHTML.split(' ')[1];
					LQrule2 = 6*lvl2*workers2;
				LQrule = LQrule+(LQrule2);
					j2++;
				}
				if ("&nbsp;" != playerName) {
				percentage = (donated/LQrule) * 100;
				}
				if (percentage=="Infinity") {percentage = 999;}
				if (percentage>999) {percentage = 999;}
				needed_wood = LQrule-donated;
				needed_wood110 = (LQrule*1.10)-donated;
			}
			for (j2 = 0; j2 < cities; j2++)
			{
				donationList.rows[j+j2].style.backgroundColor = getLeecherStatus(percentage);
				donationList.rows[j+j2].className = "avatar ";
			}
			if (!percentage) {percentage = 0;}
			newpercent = Math.round(percentage);
			if (sort_all_mills==2) {
			 donationList.rows[j].cells[4].innerHTML="<a class=\"tooltip\" href=\"javascript:void(0)\">"+ordered_towns[j][4]+"<span>"+Comma(Math.round(ordered_towns[j][6]))+" wood has been donated per town.</span></a>";
			}
			if (sort_all_mills==1) {
			 donationList.rows[j].cells[4].innerHTML="<a class=\"tooltip\" href=\"javascript:void(0)\">"+ordered_towns[j][4]+"<span>"+Comma(Math.round(ordered_towns[j][7]))+" wood has been donated per town.</span></a>";
			}
			var workersneeded = "or "+workers_at_100+" workers";
			if (method == 3) {
			workersneeded = "";
			}
			var woodneed100 = "<font color=\"orange\">100% Needs "+Comma(Math.round(needed_wood))+" "+workersneeded+"</font><br/>";
			var woodneed110 = "<font color=\"green\">110% Needs "+Comma(Math.round(needed_wood110))+"</font>";
			if (needed_wood < 1) {woodneed100 = "";}
			if (needed_wood110 < 1) {
			var over100percent = Math.round(needed_wood110)*-1;
			woodneed110 = Comma(over100percent)+" Wood Over";
			}
			donationList.rows[j].cells[4].innerHTML += "<a class=\"tooltip\" href=\"javascript:void(0)\">"+tothree(newpercent)+"%<span>"+woodneed100+""+woodneed110+"</span></a>";
		}
		alltheoptions();
		document.getElementById('resourceUsers').innerHTML += "<span id=\"alloptions\" class=\"menubox\">This is a test, this is only a test</span>"; 
		//style=\"position: relative;top:500; left:800; z-index:99;\"
		document.getElementById('options2').addEventListener('click',function(event){togglebox('alloptions','inline');},true);
		//$("#alloptions").filter(".tooltip").click( function() { alert("clicked"); } );
		var breafious_building, sbreafious_building, LQ_building, breafious_luxury,sbreafious_luxury, LQ_luxury,debug_mode_on,debug_mode_off,sort_all_mills_on,sort_all_mills_on2,sort_all_mills_off,different_format_0,different_format_1;
				var method_building = GM_getValue('method_building','2');
				var param_building 	= GM_getValue('param_building','10');
				var method_luxury 	= GM_getValue('method_luxury','2');
				var param_luxury 	= GM_getValue('param_luxury','10');
				var debug_mode 	= GM_getValue('debug_mode','0');
				var sort_all_mills 	= GM_getValue('sort_all_mills','1');
				var checker_band 	= GM_getValue('checker_band','0');
				var checker_band_color 	= GM_getValue('checker_band_color','#CC99FF');

				if (method_building == 1)
					breafious_building = "checked='checked'";
				if (method_building == 2)
					sbreafious_building =  "checked='checked'";
				if (method_building == 3)
					LQ_building =  "checked='checked'";
				if (method_luxury == 1)
					breafious_luxury = "checked='checked'";
				if (method_luxury == 2)
					sbreafious_luxury =  "checked='checked'";
				if (method_luxury == 3)
					LQ_luxury =  "checked='checked'";
				if (debug_mode == 0)
					debug_mode_off =  "checked='checked'";
				if (debug_mode == 1)
					debug_mode_on =  "checked='checked'";
				if (different_format == 0)
					different_format_0 =  "checked='checked'";
				if (different_format == 1)
					different_format_1 =  "checked='checked'";
				if (sort_all_mills == 0)
					sort_all_mills_off =  "checked='checked'";
				if (sort_all_mills == 1)
					sort_all_mills_on =  "checked='checked'";
				if (sort_all_mills == 2)
					sort_all_mills_on2 =  "checked='checked'";
					
				document.getElementById("alloptions").innerHTML = 
					"<div id='leecher_checker'>"+
						"<h3 align=\"center\">Vejida's Leecher Checker V "+lversion+" Options<span id=\"updatecheck\"></span></h3>"+
						"<table cellpadding='0' cellspacing='0'>"+
							"<tr style=\"\" id=\"simpleoptions\">"+ 
								"<td align='center' colspan='2'><i>Rules Options</i></td>"+
							"</tr>"+	
							"<tr style=\"\" id=\"simpleoptions2\">"+
					            "<th>Method:</th>"+
								"<td>"+
									"<input id='radio_s1'  type='radio' class='radio' name='method_building2' value='1' "+breafious_building+"/> Breafious Rule<br />"+
									"<input id='radio_s2'  type='radio' class='radio' name='method_building2' value='2' "+sbreafious_building+" /> Strict Breafious Rule<br />"+
									"<input id='radio_s3'  type='radio' class='radio' name='method_building2' value='3' "+LQ_building+" /> LQ Method"+
									"<br /><br /><a href=\"javascript:togglebox('simpleoptions');javascript:togglebox('advancedoptions');\" id=\"changeoptions\">Click here for Advanced Options</a>"+
								"</td>"+
					        "</tr>"+
							"<tr style=\"display:none;\" id=\"advancedoptions\">"+ 
								"<td align='center' colspan='2'><i>Building Material</i></td>"+
							"</tr>"+	
							"<tr style=\"display:none;\" id=\"advancedoptions1\">"+
					            "<th>Method:</th>"+
								"<td>"+
									"<input id='radio_1'  type='radio' class='radio' name='method_building' value='1' "+breafious_building+"/> Breafious Rule<br />"+
									"<input id='radio_2'  type='radio' class='radio' name='method_building' value='2' "+sbreafious_building+" /> Strict Breafious Rule<br />"+
									"<input id='radio_3'  type='radio' class='radio' name='method_building' value='3' "+LQ_building+" /> LQ Method"+
								"</td>"+
					        "</tr>"+
							"<tr style=\"display:none;\" id=\"advancedoptions2\">"+
					            "<th>Param:</th>"+
					            "<td><input id='text_1' type='textfield' class='textfield' name='param_building' size='10' value="+param_building+" /></td>"+
							"</tr>"+
							"<tr style=\"display:none;\" id=\"advancedoptions3\">"+ 
								"<td align='center' colspan='2'><i>Luxury Resource<i></td>"+
							"</tr>"+
							"<tr style=\"display:none;\" id=\"advancedoptions4\">"+
								"<th>Method:</th>"+
								"<td>"+
									"<input id='radio_4' type='radio' class='radio' name='method_luxury' value='1' "+breafious_luxury+"/> Breafious Rule<br />"+
									"<input id='radio_5' type='radio' class='radio' name='method_luxury' value='2' "+sbreafious_luxury+" /> Strict Breafious Rule<br />"+
									"<input id='radio_6'  type='radio' class='radio' name='method_luxury' value='3' "+LQ_luxury+" /> LQ Method"+
							"</tr>"+
							"<tr style=\"display:none;\" id=\"advancedoptions5\">"+
								"<th>Param:</th>"+
								"<td><input id='text_2' type='textfield' class='textfield' name='param_luxury' size='10' value="+param_luxury+" />"+
								"<br /><br /><a href=\"javascript:togglebox('simpleoptions');javascript:togglebox('advancedoptions');\" id=\"changeoptions2\">Click here for Simple Options</a></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Sorting Options<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Sort Mills by Donated Per Town:</th>"+
								"<td><input id='radio_9_0' type='radio' class='radio' name='sort_all_mills' value='2' "+sort_all_mills_on2+"/>On(NEW)</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Sort Mills by Most Donated:</th>"+
								"<td><input id='radio_9' type='radio' class='radio' name='sort_all_mills' value='1' "+sort_all_mills_on+"/>On</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Turn Off Sorting:</th>"+
								"<td><input id='radio_10' type='radio' class='radio' name='sort_all_mills' value='0' "+sort_all_mills_off+"/>Off</td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Band Options<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>New Color Band:</th>"+
								"<td><input id='text_3' type='textfield' class='textfield' name='checker_band' size='10' value="+checker_band+" /> - 90%</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Color of Band:</th>"+
								"<td><input id='text_4' type='textfield' class='textfield' name='checker_band_color' size='10' value="+checker_band_color+" /> <span id='backcolor_band' style=\"vertical-align: middle; display: inline-block;width:19px; height:19px;\"></span> </td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Other Options<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Debug Mode:</th>"+
								"<td>On<input id='debug_leecher' type='radio' class='radio' name='debug_mode222' value='1' "+debug_mode_on+"/> Off<input id='debug_leecher2' type='radio' class='radio' name='debug_mode222' value='0' "+debug_mode_off+"/></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Format:</th>"+
								"<td>1,000.00<input id='radio_format0' type='radio' class='radio' name='different_format' value='0' "+different_format_0+"/> 1.000,00<input id='radio_format1' type='radio' class='radio' name='different_format' value='1' "+different_format_1+"/></td>"+
							"</tr>"+
				        "</table><center><input type=\"button\" value=\"Save Changes\" onClick=\"history.go(0)\"><br /><br /><br />"+
						"<div style=\"width:680px;border:solid 1px #DEDEDE;background:#EFEFEF;color:#222222;padding:4px;text-align:center;\" id=\"updatenote\"></div></center>"+
				    "</div>";
	            document.getElementById('radio_s1').addEventListener('change',function(event){GM_setValue('method_building','1');GM_setValue('param_building','15');GM_setValue('method_luxury','1');GM_setValue('param_luxury','15');document.getElementById('text_1').value='15';document.getElementById('text_2').value='15';document.getElementById('radio_1').checked='true';document.getElementById('radio_4').checked='true';},true);
	            document.getElementById('radio_s2').addEventListener('change',function(event){GM_setValue('method_building','2');GM_setValue('param_building','10');GM_setValue('method_luxury','2');GM_setValue('param_luxury','10');document.getElementById('text_1').value='10';document.getElementById('text_2').value='10';document.getElementById('radio_2').checked='true';document.getElementById('radio_5').checked='true';},true);
				document.getElementById('radio_s3').addEventListener('change',function(event){GM_setValue('method_building','3');GM_setValue('method_luxury','3');document.getElementById('radio_3').checked='true';document.getElementById('radio_6').checked='true';},true);
	            document.getElementById('radio_format0').addEventListener('change',function(event){GM_setValue('different_format',0)},true);
	            document.getElementById('radio_format1').addEventListener('change',function(event){GM_setValue('different_format',1)},true);
	            document.getElementById('radio_1').addEventListener('change',function(event){GM_setValue('method_building','1');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_2').addEventListener('change',function(event){GM_setValue('method_building','2');document.getElementById('text_1').value='10';GM_setValue('param_building','10')},true);
				document.getElementById('radio_3').addEventListener('change',function(event){GM_setValue('method_building','3');},true);
	            document.getElementById('radio_4').addEventListener('change',function(event){GM_setValue('method_luxury','1');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
	            document.getElementById('radio_5').addEventListener('change',function(event){GM_setValue('method_luxury','2');document.getElementById('text_2').value='10';GM_setValue('param_luxury','10')},true);
				document.getElementById('radio_6').addEventListener('change',function(event){GM_setValue('method_luxury','3');},true);
				document.getElementById('debug_leecher').addEventListener('change',function(event){GM_setValue('debug_mode','1');},true);
				document.getElementById('debug_leecher2').addEventListener('change',function(event){GM_setValue('debug_mode','0');},true);
				document.getElementById('radio_9_0').addEventListener('change',function(event){GM_setValue('sort_all_mills','2');},true);
				document.getElementById('radio_9').addEventListener('change',function(event){GM_setValue('sort_all_mills','1');},true);
				document.getElementById('radio_10').addEventListener('change',function(event){GM_setValue('sort_all_mills','0');},true);
	            document.getElementById('text_1').addEventListener('change',function(event){GM_setValue('param_building',document.getElementById('text_1').value)},true);
	            document.getElementById('text_2').addEventListener('change',function(event){GM_setValue('param_luxury',document.getElementById('text_2').value)},true);
	            document.getElementById('text_3').addEventListener('change',function(event){GM_setValue('checker_band',document.getElementById('text_3').value)},true);
				document.getElementById('backcolor_band').style.backgroundColor = checker_band_color;
				document.getElementById('text_4').addEventListener('change',function(event){GM_setValue('checker_band_color',document.getElementById('text_4').value)},true);
				document.getElementById('text_4').addEventListener('change',function(event){document.getElementById('backcolor_band').style.backgroundColor = document.getElementById('text_4').value;},true);
				
		document.getElementById('changeoptions').addEventListener('click',function(event){togglebox('advancedoptions','table-row');togglebox('advancedoptions1','table-row');togglebox('advancedoptions2','table-row');togglebox('advancedoptions3','table-row');togglebox('advancedoptions4','table-row');togglebox('advancedoptions5','table-row');togglebox('simpleoptions','none');togglebox('simpleoptions2','none');},true);
		document.getElementById('changeoptions2').addEventListener('click',function(event){togglebox('advancedoptions','none');togglebox('advancedoptions1','none');togglebox('advancedoptions2','none');togglebox('advancedoptions3','none');togglebox('advancedoptions4','none');togglebox('advancedoptions5','none');togglebox('simpleoptions','table-row');togglebox('simpleoptions2','table-row');},true);
		AJAX_write('version');
		AJAX_write('note');
	}

}
catch(er)
				{
				var debug_mode 	= GM_getValue('debug_mode','0');
				if (debug_mode == 1) {
				alert("Vejida\'s Leecher Checker v"+lversion+"\n If you think this is a critical error, post it in the ikariamlibrary.com forums.\n\n\n" + er)
				}
				}
},
    true);
	


