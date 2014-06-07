// ==UserScript==
// @name           Ikariam 米蟲鑑定器
// @version        0.2.11
// @namespace      WHSK_LCHCHKR
// @description    這是一個用來評估島上捐獻量, 及早發現米蟲的腳本.
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==
// Original script built by Leecher Checker v 1.2.3
// New script built by Joshua Pack
// Branching version with Chinese Translation and code modifications by Whiskers

	var lversion = "0.2.11";
	var updatesite = "http://userscripts.org/scripts/show/35883";


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
number = '' + number;
if (number.length > 3) {
var mod = number.length % 3;
var output = (mod > 0 ? (number.substring(0,mod)) : '');
for (i=0 ; i < Math.floor(number.length / 3); i++) {
if ((mod == 0) && (i == 0))
output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
else
output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
}
return (output);
}
else return number;
}
/**
*	Parses a string of format 123,456 to an int in format 123456
*/

function toInt(string)
{
	var temp,result;
	temp = string.split(',');
	result = '';
	for(var i=0; i < temp.length; i++)
	{
		result += temp[i];
	}
	return parseInt(result);
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
	if (percentage > 110)
		return '#c7fac6';
	if (percentage >= 100)
		return '#faf4c6';
	if (percentage >= 90)
		return '#c6dafa';
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
/**
*	Check to see if you have updated version!
*/
function check_for_update()
{
GM_xmlhttpRequest({
  method:"GET",
  url:updatesite,
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    },
  onload:function(details) {
	var is_it_updated, updatecolor;
	if (details.readyState == 4) {
	var update_version = details.responseText.split('    <code>Version: <b>')[1];
	update_version = update_version.split('</b></code><br />')[0];
	if (update_version != lversion) {
	is_it_updated = "<a href='"+updatesite+"'><b>已有新版本,請更新!</b></a>"; 
	updatecolor = "RED";
	} else {
	is_it_updated = "為目前最新版本"; 
	updatecolor = "GREEN";
	}
	} else {
	is_it_updated = "<a href='"+updatesite+"'>未知 [無法確認版本]</a>"; 
	updatecolor = "GREY";
	}
	var footer_update = document.getElementById('resourceUsers').childNodes[1];
	footer_update.innerHTML += " (<font color='"+updatecolor+"'>米蟲鑑定器 "+is_it_updated+"</font>)";
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
	addGlobalStyle('a.tooltip:hover span{display:inline; position:absolute; background:#ffffff; border:1px solid #cccccc; color:#6c6c6c;}');
	// The id of the body tag contains which page you are on
	var page = document.getElementsByTagName('body')[0].id;

	// Check if you are at a resource deposit
	if ( (page == 'tradegood') || (page == 'resource') )
	{
		var donationList = document.getElementById('resourceUsers').childNodes[3].childNodes[1];//.childNodes[5-offset].childNodes[1];
		var name, playerName, donated, lvl, workers, percentage, param, method, mill_number, milllevel, actionmess;
		sort_all_mills = GM_getValue("sort_all_mills",1);
		// Depending on the type of resource, get the right variables
		if (page == 'resource') 
		{
		mill_number = 25;
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
		}
		else
		{
		mill_number = 20;
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
			workplace[20] = new Array(534,  552058, 2299413);
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
				var breafuios_new;
				// Check which level is used
				for(workers_lvl = 1; workers_lvl < mill_number; workers_lvl++)
				{
					if (workers <= strict * workplace[workers_lvl][0])
						break;
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
			else // ZEN Rule
			{
				// Check which level is used
				for(workers_lvl = 1; workers_lvl < 19; workers_lvl++)
				{
					if (workers <= 1.5 * workplace[workers_lvl][0])
						break;
				}
				if ("&nbsp;" != playerName) {
				percentage = ((donated / (workplace[workers_lvl][2]*param/100))/cities) * 100;
				}
				if (percentage=="Infinity") {percentage = 999;}
				if (percentage>999) {percentage = 999;}
				needed_wood = breafuios_new-donated;
				needed_wood110 = (breafuios_new*1.10)-donated;
			}
			for (j2 = 0; j2 < cities; j2++)
			{
				donationList.rows[j+j2].style.backgroundColor = getLeecherStatus(percentage);
				donationList.rows[j+j2].className = "avatar ";
			}
			if (!percentage) {percentage = 0;}
			newpercent = Math.round(percentage);
			if (sort_all_mills==2) {
			 donationList.rows[j].cells[4].innerHTML="<a class=\"tooltip\" href=\"javascript:void(0)\">"+ordered_towns[j][4]+"<span>每城已經捐獻 "+Comma(Math.round(ordered_towns[j][6]))+" 木頭</span></a>";
			}
			if (sort_all_mills==1) {
			 donationList.rows[j].cells[4].innerHTML="<a class=\"tooltip\" href=\"javascript:void(0)\">"+ordered_towns[j][4]+"<span>每城已經捐獻 "+Comma(Math.round(ordered_towns[j][7]))+" 木頭</span></a>";
			}
			var woodneed100 = "<font color=\"orange\">100% 需要 "+Comma(Math.round(needed_wood))+" 木頭</font><br/>";
			var woodneed110 = "<font color=\"green\">110% 需要 "+Comma(Math.round(needed_wood110))+" 木頭</font>";
			if (needed_wood < 1) {woodneed100 = "";}
			if (needed_wood110 < 1) {
			var over100percent = Math.round(needed_wood110)*-1;
			woodneed110 = "超出 "+Comma(over100percent)+" 木頭";
			}
			donationList.rows[j].cells[4].innerHTML += "<a class=\"tooltip\" href=\"javascript:void(0)\">"+tothree(newpercent)+"%<span>"+woodneed100+""+woodneed110+"</span></a>";
		}
		check_for_update();

	}
	
	// Add options menu
	if (page == 'options')
	{
		var allElements = document.getElementsByTagName('form');

		for (var i = 0; i < allElements.length; i++)
		{
		    var thisElement = allElements[i];
			if (thisElement.elements[0].value == 'Options')
			{
				var breafious_building, sbreafious_building, ZEN_building, breafious_luxury,sbreafious_luxury, ZEN_luxury,debug_mode_on,debug_mode_off,sort_all_mills_on,sort_all_mills_on2,sort_all_mills_off;
				var method_building = GM_getValue('method_building','2');
				var param_building 	= GM_getValue('param_building','10');
				var method_luxury 	= GM_getValue('method_luxury','2');
				var param_luxury 	= GM_getValue('param_luxury','10');
				var debug_mode 	= GM_getValue('debug_mode','0');
				var sort_all_mills 	= GM_getValue('sort_all_mills','1');

				if (method_building == 1)
					breafious_building = "checked='checked'";
				if (method_building == 2)
					sbreafious_building =  "checked='checked'";
				if (method_building == 3)
					ZEN_building =  "checked='checked'";
				if (method_luxury == 1)
					breafious_luxury = "checked='checked'";
				if (method_luxury == 2)
					sbreafious_luxury =  "checked='checked'";
				if (method_luxury == 3)
					ZEN_luxury =  "checked='checked'";
				if (debug_mode == 0)
					debug_mode_off =  "checked='checked'";
				if (debug_mode == 1)
					debug_mode_on =  "checked='checked'";
				if (sort_all_mills == 0)
					sort_all_mills_off =  "checked='checked'";
				if (sort_all_mills == 1)
					sort_all_mills_on =  "checked='checked'";
				if (sort_all_mills == 2)
					sort_all_mills_on2 =  "checked='checked'";
				var div;
				div = document.createElement('div');
				div.innerHTML = 
					"<div id='leecher_checker'>"+
                                            "<h3>米蟲鑑定器 "+lversion+" 設置</h3>"+
						"<table cellpadding='0' cellspacing='0'>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>建築材料</i></td>"+
							"</tr>"+	
							"<tr>"+
					            "<th>方式:</th>"+
								"<td>"+
									"<input id='radio_1'  type='radio' class='radio' name='method_building' value='1' "+breafious_building+"/> Breafious Rule<br />"+
									"<input id='radio_2'  type='radio' class='radio' name='method_building' value='2' "+sbreafious_building+" /> Strict Breafious Rule<br />"+
									//"<input id='radio_3'  type='radio' class='radio' name='method_building' value='3' "+ZEN_building+" /> ZEN"+
								"</td>"+
					        "</tr>"+
							"<tr>"+
					            "<th>參數:</th>"+
					            "<td><input id='text_1' type='textfield' class='textfield' name='param_building' size='10' value="+param_building+" /></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>奢侈資源<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>方式:</th>"+
								"<td>"+
									"<input id='radio_4' type='radio' class='radio' name='method_luxury' value='1' "+breafious_luxury+"/> Breafious Rule<br />"+
									"<input id='radio_5' type='radio' class='radio' name='method_luxury' value='2' "+sbreafious_luxury+" /> Strict Breafious Rule<br />"+
									//"<input id='radio_6'  type='radio' class='radio' name='method_luxury' value='3' "+ZEN_building+" /> ZEN"+
							"</tr>"+
							"<tr>"+
								"<th>參數:</th>"+
								"<td><input id='text_2' type='textfield' class='textfield' name='param_luxury' size='10' value="+param_luxury+" /></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>其他選項<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>排錯模式:</th>"+
								"<td>On<input id='radio_7' type='radio' class='radio' name='debug_mode' value='1' "+debug_mode_on+"/> 關閉<input id='radio_8' type='radio' class='radio' name='debug_mode' value='0' "+debug_mode_off+"/></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>排序方式<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>以每城捐獻量排列:</th>"+
								"<td><input id='radio_9_0' type='radio' class='radio' name='sort_all_mills' value='2' "+sort_all_mills_on2+"/>On(NEW)</td>"+
							"</tr>"+
							"<tr>"+
								"<th>以最多捐獻量排列:</th>"+
								"<td><input id='radio_9' type='radio' class='radio' name='sort_all_mills' value='1' "+sort_all_mills_on+"/>On</td>"+
							"</tr>"+
							"<tr>"+
								"<th>關閉排列功能:</th>"+
								"<td><input id='radio_10' type='radio' class='radio' name='sort_all_mills' value='0' "+sort_all_mills_off+"/>Off</td>"+
							"</tr>"+
				        "</table>"+
				    "</div>";
				
				thisElement.insertBefore(div, document.getElementById('options_debug'));
	            
	            document.getElementById('radio_1').addEventListener('change',function(event){GM_setValue('method_building','1');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_2').addEventListener('change',function(event){GM_setValue('method_building','2');document.getElementById('text_1').value='10';GM_setValue('param_building','10')},true);
				//document.getElementById('radio_3').addEventListener('change',function(event){GM_setValue('method_building','3');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_4').addEventListener('change',function(event){GM_setValue('method_luxury','1');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
	            document.getElementById('radio_5').addEventListener('change',function(event){GM_setValue('method_luxury','2');document.getElementById('text_2').value='10';GM_setValue('param_luxury','10')},true);
				//document.getElementById('radio_6').addEventListener('change',function(event){GM_setValue('method_luxury','3');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
				document.getElementById('radio_7').addEventListener('change',function(event){GM_setValue('debug_mode','1');},true);
				document.getElementById('radio_8').addEventListener('change',function(event){GM_setValue('debug_mode','0');},true);
				document.getElementById('radio_9_0').addEventListener('change',function(event){GM_setValue('sort_all_mills','2');},true);
				document.getElementById('radio_9').addEventListener('change',function(event){GM_setValue('sort_all_mills','1');},true);
				document.getElementById('radio_10').addEventListener('change',function(event){GM_setValue('sort_all_mills','0');},true);
	            document.getElementById('text_1').addEventListener('change',function(event){GM_setValue('param_building',document.getElementById('text_1').value)},true);
	            document.getElementById('text_2').addEventListener('change',function(event){GM_setValue('param_luxury',document.getElementById('text_2').value)},true);
			}
		}
	}

}

catch(er)
				{
				var debug_mode 	= GM_getValue('debug_mode','0');
				if (debug_mode == 1) {
				alert("米蟲鑑定器 v"+lversion+"\n 如果您認為這是一個重大錯誤, 請至TW官方論壇通知Whiskers, 謝謝.\n\n\n" + er)
				}
				}
},
    true);
	

