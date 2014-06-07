// ==UserScript==
// @name          HWM note4war v.1.6
// @version       1.6
// @description   HWM mod - adds an icon when group/clan fight is available
// @include       http://www.heroeswm.ru/*
// @exclude       http://www.heroeswm.ru/warlog.php*
// @exclude       http://www.heroeswm.ru/war.php*
// @exclude       http://www.heroeswm.ru/brd.php
// @exclude       http://www.heroeswm.ru/rightcol.php
// @exclude       http://www.heroeswm.ru/ch_box.php
// @exclude       http://www.heroeswm.ru/chatonline.php*
// @exclude       http://www.heroeswm.ru/hat_line.php*
// @exclude       http://www.heroeswm.ru/chatpost.php*
// @exclude       http://www.heroeswm.ru/chat.php*
// @exclude       http://www.heroeswm.ru/ticker.php*
// @exclude       http://www.heroeswm.ru/object-info.php*
// ==/UserScript==

//������������ ��������� ������ �� ���, v.1.5

var url_cur = location.href ;

var group_war_page = 'http://www.heroeswm.ru/group_wars.php';

var war_icon = '<img align=absmiddle src="i/clans/battle.gif" width=15 height=15 border=0 title="Group Battle" alt="Group Battle">';

var war_icon_td = '<a href="group_wars.php">'+ war_icon +'</a>';

/*
var td_battles0 = '<td valign=middle align=center><div id="breadcrumbs"><ul><li class="subnav"><nobr>&nbsp;<a href="bselect.php" style="text-decoration: none;color: #f5c137;"><b>�����</b></a>&nbsp;</nobr><ul><li><a href="one_to_one.php">�����</a></li><li><a href="group_wars.php">��������� ���</a></li><li><a href="tournaments.php">�������</a></li></ul></li></ul></div></td>';
*/

// == parts with rus letters trimmed
/*
var td_battles = ['<div id="breadcrumbs"><ul><li class="subnav"><nobr>&nbsp;<a href="bselect.php" style="text-decoration: none;color: #f5c137;">', '</a>&nbsp;</nobr><ul><li><a href="one_to_one.php">', '</a></li><li><a href="group_wars.php">', '</a></li><li><a href="tournaments.php">',  '</a></li></ul></li></ul></div>'];
*/
var td_battles = ['bselect.php', 'one_to_one.php', 'group_wars.php', 'tournaments.php'];


var all_td_Elements, this_td_Element;
	all_td_Elements = document.getElementsByTagName('td');
		//alert("found " + all_td_Elements.length + "  TD elements!");

if( url_cur.indexOf(group_war_page) != -1){ // on group_wars page 
	//alert("on group_wars page ");
	lookForGroup();
	//
}


// == show Group Battle icon
showSword();


// == add management panel
addPanel();



// ==================== functions ===========================

function lookForGroup(){
	//alert("lookForGroup");	
	var all_tr_Elements, this_tr_Element;
	all_tr_Elements = document.getElementsByTagName('tr');
		//alert("found " + all_tr_Elements.length + "  TR elements!");
	var bCount = 0;	
	//	
	var bFound = 0; // 1 - found battle, 0 - not
	//
	//var foundColor = "#ccccff";
	var foundColor = "#ddffdd";
	//
	//var clan_str = 'clan_info.php?id=711';
	//var clan_str = '6-6 vs 6-6';
	var clan_str = GM_getValue("hwm_watch_clan_str", "none");
	var clans = clan_str.split(",");
		//alert("clans: \n"+clans.join("\n"));
	//
	var lev_str = GM_getValue("hwm_watch_lev_str", "none");
	var levels = lev_str.split(",");	
		//alert("levels: \n"+levels.join("\n"));
	//	
	if(clan_str=="none" && 	lev_str=="none"){ // nothing watched
		//alert("nothing watched");
		GM_setValue("hwm_have_group_btl", 0);
		return;
	}
	//
	var hideOtherLevels = GM_getValue("hwm_watch_hideotherlev", 0);
	//
	// ####	Records are checked against clan AND level requirements. ####
	var tn, ts;
	var my_tr, my_td;
	var fnd;
	var len;
	var clan_ok = false;
	var level_ok = false;
	var is_hunt = false;
	var tr_len = all_tr_Elements.length;
	for (var i = 0; i < tr_len; i++) {
		clan_ok = false;
		level_ok = false;
		is_hunt = false;
		//fnd = 0;
		my_tr = all_tr_Elements[i];		
		if(my_tr.innerHTML.indexOf("<tr>") != -1 ){ continue; } // has child TRs
		if(my_tr.childNodes.length != 7 ){ continue; } // not in battles table
		if(my_tr.innerHTML.indexOf("vs") == -1 ){ continue; } // table header
		if(my_tr.innerHTML.indexOf("1-1") != -1 ){ // hunt
			is_hunt = true;
			//continue; 
		} 
		//
		// = step 1: look for clan
		if(clan_str != "none"){
			len = clans.length;
			for (var z = 0; z < len; z++) {
				ts = "clan_info.php?id=" + clans[z];
				my_td = my_tr.childNodes[1]; // 2nd cell with clan, if any
					//alert("my_td = "+my_td);
				if(my_td.innerHTML.indexOf(ts) != -1 ) {			
					//this_td_Element.style.backgroundColor = foundColor;
					//fnd = 1;
					clan_ok = true;
					//bFound = 1;	
					break;
				}	
			}		
			//
			if(!clan_ok){ continue; } // clan NOT found - not interested in levels...
		}
		//
		// = step 2: check levels in the row where clan was found
		my_td = my_tr.childNodes[2]; // levels TD
		len = levels.length;
		for (var z = 0; z < len; z++) {
			//fnd = 0;
			ts = levels[z];
			if(my_td.innerHTML.indexOf(ts) != -1 ) {			
				//my_td.style.backgroundColor = foundColor;
				//fnd = 1; 
				//bFound = 1;	
				level_ok = true;
				//alert("ts = "+ts +"\n my_td = " + my_td.innerHTML);
				break;
			}	
		}	
		//
                // check for "enter" string
		var b_enter_lnk = 'group_join.php?wrid=';
		if( my_tr.innerHTML.indexOf(b_enter_lnk) !=-1 ){
			level_ok = true;
		}
		//
		if( ((clan_ok && level_ok) || (clan_ok && lev_str == "none") || (clan_str == "none" && level_ok)) && !is_hunt ){
			// == colorize the row
			len = my_tr.childNodes.length;
			for ( z = 0; z < len; z++) {
				my_td = my_tr.childNodes[z]; 		
				my_td.style.backgroundColor = foundColor;				
			}	
			//
			// == show sword icon
			bFound = 1;	
			
		//}else if( hideOtherLevels && (!is_hunt || !level_ok) ){ // hide row from view
		}else if( hideOtherLevels &&  !level_ok ){ // hide row from view
			my_tr.style.display = "none";
			
		}
	}
	//
	if(bFound){
		GM_setValue("hwm_have_group_btl", 1);
		
	}else{
		GM_setValue("hwm_have_group_btl", 0);
	}
	//		
}



function showSword(){
	var bFound = GM_getValue("hwm_have_group_btl", 0);;
		//alert("showSword, bFound = " + bFound);  
	if(!bFound){
		return;
	}
	//
	// == find battles TD
	var btd;
	var btd_t;
	var sword_td;
	for (var i = 0; i < all_td_Elements.length; i++) {
		btd = all_td_Elements[i];
		btd_t = btd.innerHTML;		
		if(btd_t.indexOf(td_battles[0])!=-1 && btd_t.indexOf(td_battles[1])!=-1 && btd_t.indexOf(td_battles[2])!=-1 && btd_t.indexOf(td_battles[3])!=-1 && btd.innerHTML.indexOf("td") == -1 ) {
				//alert("found battles TD!!!");
			//
			sword_td = document.createElement('td');
			btd.parentNode.insertBefore(sword_td, btd.nextSibling);
			sword_td.innerHTML = war_icon_td;
			
		}	
	}
	//
	// setTimeout( function() { showSword() } , 10000 )
	
}


function addPanel(){
		//alert("addPanel");
	//return;
	var hideOtherLevels = GM_getValue("hwm_watch_hideotherlev", 0);
	var ch_hideOthersHtml = hideOtherLevels?  'checked="checked"' : '';
	
	
	var d = document.createElement( 'div' );
	//
	d.innerHTML = 
'<table width="418" border="0" align="center" cellpadding="0" cellspacing="0" style="position:absolute; top:30px; left:auto; " background="none">'+
'<tr><td width="394" background="none"></td><td width="24"><div id="battle_panel_icon" style="background-color:#eee; width:24px; height:24px; margin:0 0 0 auto; " ><a href="javascript:void(0);" id="bpanel_show" ><img src="i/s_attack.gif" border="0" width="24" height="24" title="Show/Hide panel" /></a></div></td>'+
'</tr><tr>'+
//'<td><div id="battle_panel" style="background-color:#ddd9cd; width:394px; height:220px; display:block;">'+
'<td><div id="battle_panel" style="background-color:#ddd9cd; width:394px; height:225px; display:none;">'+
'<form name="f_bpanel" id="f_bpanel">'+
'<table width="390" border="0" align="center" cellpadding="5" cellspacing="0">'+
'<tr class=wblight valign="top"><td class=wblight colspan="3" align="center"><b>Watch Group Battles</b></td></tr>'+
'<tr class=wblight valign="top"><td  align=right class=wb width="50%"><b>Clan IDs:</b><br>(separated by comma - ",")</td><td class=wblight colspan="2"><input type="text" size="35"  name="clan" id="clan"></td></tr>'+
'<tr class=wblight><td  align=right class=wb ><b>Levels:</b></td>'+
'<td class=wblight>min:&nbsp;<select name="lev_min"  >'+
'<option value="0" >---</option>'+
'<option value="2" >2</option>'+
'<option value="3" >3</option>'+
'<option value="4" >4</option>'+
'<option value="5" >5</option>'+
'<option value="6" >6</option>'+
'<option value="7" >7</option>'+
'<option value="8" >8</option>'+
'<option value="9" >9</option>'+
'<option value="10" >10</option>'+
'<option value="11" >11</option>'+
'<option value="12" >12</option>'+
'<option value="13" >13</option>'+
'<option value="14" >14</option>'+
'</select></td>'+
'<td class=wblight>max:&nbsp;<select name="lev_max"  >'+
'<option value="0" >---</option>'+
'<option value="3" >3</option>'+
'<option value="4" >4</option>'+
'<option value="5" >5</option>'+
'<option value="6" >6</option>'+
'<option value="7" >7</option>'+
'<option value="8" >8</option>'+
'<option value="9" >9</option>'+
'<option value="10" >10</option>'+
'<option value="11" >11</option>'+
'<option value="12" >12</option>'+
'<option value="13" >13</option>'+
'<option value="14" >14</option>'+
'</select></td>'+
'</tr>'+
'<tr class=wblight><td  align="center" class=wb >&nbsp;</td>'+
'<td class=wblight colspan="2" align="right" ><input type=button id="bpanel_start" value="Start watching" class=wbtn ></td></tr>'+
'<tr class=wblight><td  align="right" class=wb ><b>Currently watching:</b></td>'+
'<td class=wblight colspan="2">'+
'<span id="cur_watch">Clans: '+GM_getValue("hwm_watch_clan_str", "none")+'<br>Levels: '+GM_getValue("hwm_watch_levels", "none")+'</span></td></tr>'+
'<tr class=wblight><td  align="left" class=wb ><input type=button id="bpanel_stop" value="Stop watching" class=wbtn ></td>'+
'<td class=wblight colspan="2" align="center">&nbsp;<input type=checkbox name="bpanel_hideother" id="bpanel_hideother" '+
ch_hideOthersHtml+
//'checked="checked"'+
' style="font-size:9px;">&nbsp;Hide Other Levels</td></tr>'+
'</table>'+
'</form>'+
'</div></td><td></td>'+
'</tr></table>' ;
	
	document.body.appendChild( d ) ;

	//
	document.getElementById('bpanel_show').addEventListener( "click", clickShowPanel , false );
	document.getElementById('bpanel_start').addEventListener( "click", clickStartWatch , false );
	document.getElementById('bpanel_stop').addEventListener( "click", clickStopWatch , false );
	//
}


function clickShowPanel(){
	//alert("clickShowPanel");
	var battle_panel = document.getElementById('battle_panel');
	//
	if(battle_panel.style.display != "none"){
		battle_panel.style.display = "none";
	}else if(battle_panel.style.display == "none"){
		battle_panel.style.display = "block";
	}
}

function clickStartWatch(){
		//alert("clickStartWatch");
	//var my_form = document.f_bpanel;
	var my_form = document.getElementById('f_bpanel');
		//alert("my_form = "+my_form+",   "+my_form.length+" elements");
	var clan_str = my_form[0].value
	clan_str = clan_str.replace(/\ /g, ""); // trim all spaces;
	clan_str = clan_str? clan_str : "none";
	GM_setValue("hwm_watch_clan_str", clan_str);
		//alert("clan_str = "+clan_str);
	//
	var lev_min = my_form[1].options[ my_form[1].options.selectedIndex ].value;	
	var lev_max = my_form[2].options[ my_form[2].options.selectedIndex ].value;	
	lev_min = Number(lev_min);
	lev_max = Number(lev_max);
	lev_max = (lev_max >= lev_min)? lev_max : lev_min;
	GM_setValue("hwm_watch_levels", lev_min+"-"+lev_max);
		//alert("clan_str = "+clan_str+"\n lev_min = "+lev_min+"\n lev_max = "+lev_max);
	//
	//  build string of possible levels...
	var lev_str = lev_min+"-"+lev_max;
	if(lev_max != lev_min){
		lev_str = "";
		for(var a=lev_min; a<=lev_max; a++){
			for(var b=a; b<=lev_max; b++){
				lev_str += a +"-"+ b + ",";
			}
		}
		//
		//lev_str = lev_str.substring(0, lev_str.lemgth-1);
		lev_str = lev_str.substring(0, lev_str.length-1);
	}
	//
	if(lev_str == "0-0"){
		lev_str = "none";
		GM_setValue("hwm_watch_levels", lev_str);
	}
	GM_setValue("hwm_watch_lev_str", lev_str);
	//
		//alert("lev_str = "+lev_str);
	//
	var ch_hideOthers = my_form[5].checked;
		//alert("ch_hideOthers = "+ch_hideOthers);
	GM_setValue("hwm_watch_hideotherlev", ch_hideOthers);
	//	
	
	showCurWatch();	
	
}

function clickStopWatch(){
	var my_form = document.getElementById('f_bpanel');
	my_form[5].checked = false;
	GM_setValue("hwm_watch_hideotherlev", false);
	//
	GM_setValue("hwm_watch_clan_str", "none");
	GM_setValue("hwm_watch_lev_str", "none");
	GM_setValue("hwm_watch_levels", "none");
	//	
	showCurWatch();
}

function showCurWatch(){
	var cur_watch = document.getElementById('cur_watch');
	cur_watch.innerHTML = 'Clans: '+GM_getValue("hwm_watch_clan_str", "none")+'<br>Levels: '+GM_getValue("hwm_watch_levels", "none");
	
}



