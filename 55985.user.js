// ==UserScript==
// @name           HWM_Mark_For_Player
// @namespace      http://diveintogreasemonkey.org/download/
// @description    HWM_Mark_For_Player
// @version       0.1.1
// @include       http://www.heroeswm.ru/pl_info.php*
// @include       http://www.heroeswm.ru/forum_messages.php*
// @include       http://www.heroeswm.ru/one_to_one.php*
// @include       http://www.heroeswm.ru/group_wars.php*
// @include       http://www.heroeswm.ru/tavern.php*
// @include       http://www.heroeswm.ru/home.php
//
// 
// ==/UserScript==

// ====================== SETTINGS (modify with care :-) =================================
var max_players = 300;
var max_groups = 10;
var max_labels = 5;
//

// ========================================================

var showClearAll = false; // for debug purposes.
//showClearAll = true; // uncomment to enable

//alert("HWM_Mark_For_Player");

// ========================================================
var icons_arr = []; // array of icons
icons_arr.push("i/gold.gif");
icons_arr.push("i/wood.gif");
icons_arr.push("i/ore.gif");
icons_arr.push("i/mercury.gif");
icons_arr.push("i/sulphur.gif");
icons_arr.push("i/crystal.gif");
icons_arr.push("i/gem.gif");
icons_arr.push("i/diamond.gif");
icons_arr.push("i/2mod_ico.gif");
icons_arr.push("i/2repair_ico.gif");
icons_arr.push("i/s_attack.gif");
icons_arr.push("i/s_defence.gif");
icons_arr.push("i/s_power.gif");
icons_arr.push("i/s_knowledge.gif");
icons_arr.push("i/s_morale.gif");
icons_arr.push("i/s_luck.gif");
icons_arr.push("i/s_initiative.gif");
//icons_arr.push("i/ore.gif");
	//alert("icons_arr.length = "+icons_arr.length);

// ========================================================
// Read saved data...
var groups_data = GM_getValue("hwm_m4p_groups", "");
if(groups_data){
	groups_data = groups_data.split("|");
}else{	
	groups_data = [];
	groups_data[0] = "Group #0;1;1;1";
	// temp fill...
	// Group name, icon#, show in battle, show in tavern
}
//alert("groups_data = "+groups_data);

var players_data = GM_getValue("hwm_m4p_players", "");
if(players_data){
	players_data = players_data.split("|");
}else{	
	players_data = [];
	players_data[0] = "160839;LazyGreg;_0_";
}
//alert("players_data = "+players_data);

// ========================================================
var url_cur = location.href ;
//
var url_profile = "heroeswm.ru/pl_info.php";
var url_forum = "heroeswm.ru/forum_messages.php";
var url_btl_group = "heroeswm.ru/group_wars.php";
var url_btl_duel = "heroeswm.ru/one_to_one.php";
var url_tavern = "heroeswm.ru/tavern.php";
var url_home = "heroeswm.ru/home.php";
// ========================================================

// ========================================================

//var all_table = document.getElementsByTagName('table');
var all_tr = document.getElementsByTagName('tr');

if(url_cur.indexOf(url_profile)!=-1){
	var playerName = getPlayerName();
	var player_id = getUrlParam("id");
		//alert("playerName = "+playerName+"\n id = "+player_id);
	var playerObj = getPlayerObj();
	//
	showMarksForProfile();
	var d = document.createElement( 'div' );
	d.id = "mark4prof_div";
	document.body.appendChild( d ) ;
	
	var d1 = document.createElement( 'div' );
	d1.id = "mark4prof_sub_div";
	document.body.appendChild( d1 ) ;
	var d1_open = false;
	var pos_d = {};
	var pos_d1 = {};
	var d1_cur_group = -1;
	
	var mouseX, mouseY, et;
	document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
	//
	et = event.target;
		//alert("et = "+et);
	if( et.id.match("m4p_")){ // only this script's links
		mouseX = event.pageX;
		mouseY = event.pageY;
		//alert("clicked: et.parentNode.innerHTML = "+et.parentNode.innerHTML+"\n et.id = "+et.id);
		doClick(et);
		// 
		// stop link behavior
	    event.stopPropagation();
	    event.preventDefault();		
	}    
	}, true);
	
}

if(url_cur.indexOf(url_forum)!=-1){
	showMarksForForum();
}
if(url_cur.indexOf(url_btl_group)!=-1){
	showMarksForBattle();
}
if(url_cur.indexOf(url_btl_duel)!=-1){
	showMarksForDuel();
}
if(url_cur.indexOf(url_tavern)!=-1){
	showMarksForTavern();
}
if(url_cur.indexOf(url_home)!=-1){
	showMarksForHome();
}

function doClick(et){
	//alert("doClick, et.id = " + et.id);
	if(et.id== "m4p_addGroup"){
			clickAddLabel();
	}else if(et.id== "m4p_delGroup"){
			clickDelLabel();
	}else if(et.id=="m4p_editGroup"){
			clickEditGroup();
	}else if(et.id=="m4p_d_newGroup"){
			click_addNewGroup();
	}else if(et.id=="m4p_d_close"){
			click_close_d();
	}else if(et.id=="m4p_d1_close"){
			click_close_d1();			
			
	}else if(et.id.match("m4p_gnam_") ){
		gRenameGroup(et.id);
	}else if(et.id.match("m4p_gpic_") ){
		gChGroupIcon(et.id);
	}else if(et.id.match("m4p_gbtl_") ){
		gChGroupBtl(et.id);
	}else if(et.id.match("m4p_gtav_") ){
		gChGroupTav(et.id);
	}else if(et.id.match("m4p_gmmb_") ){
		gShowGroupMembers(et.id);
	}else if(et.id.match("m4p_gdel_") ){
		gDeleteGroup(et.id);
	}else if(et.id.match("m4p_g_chIcon_") ){
		gSelectIcon(et.id);
		
	}else if(et.id.match("m4p_p_addGroup_") ){
		p_addGroup(et.id);
	}else if(et.id.match("m4p_p_delGroup_") ){
		p_delGroup(et.id);
		
	}else if(et.id.match("m4p_clearAll") ){
		clearAllRecords();
	}
	
	
	
}


function getPlayerName(){
	var pl_name = "noName";
	// align=absmiddle>LazyGreg&nbsp;&nbsp;[13]&nbsp;<img src='i/r1.gif' 
	var pl_regexp = />([^&>]+)&nbsp;&nbsp;\[\d+\]&nbsp;<img src=/; 
	var body_text = document.body.innerHTML;
	if(body_text.match(pl_regexp)){
		pl_name = pl_regexp.exec(body_text)[1];
	}
	pl_name = encodeURIComponent(pl_name);
	//
	return pl_name;
}
function getPlayerObj(){
	var p = {};
	p.name = playerName;
	p.id = player_id;
	var players_len = players_data.length;
	var tmp_arr ;
	for(var i=0; i<players_len; i++){
		tmp_arr = players_data[i].split(";");
		if(tmp_arr[0]==player_id){
			p.n = i;
			p.data = tmp_arr;
			break;		
		}
	}	
		//alert("getPlayerObj: \n p.name="+p.name+"\n p.id="+p.id+"\n p.n="+p.n+"\n p.data = "+p.data);
	if(!p.data){
		//alert("NEW player!");
		p.n = players_len;
		p.data = [p.id, p.name, "_"];
	}
	//
	return p;
}

function showMarksForProfile(){
	//alert("showMarksForProfile");
	var stat_th = "<b>\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430</b>"; //<b>Statistika</b>
	var marks_tr = document.createElement( 'tr' );
	var marks_td = document.createElement( 'td' );
	marks_td.setAttribute("colspan", 3);
	marks_td.style.border = "1px #333 solid";
	var marks_icons = makeMarksIcons(player_id, 0);
	marks_td.innerHTML = '<span id="m4p_icons1">' +marks_icons+ '</span>';
	
	//var lnk_addGroup = '&nbsp;<a href="javascript:void(0);" id="m4p_addGroup">[+]_'+playerName+'</a>';
	var lnk_addGroup = '&nbsp;<a href="javascript:void(0);" id="m4p_addGroup">[+]</a>';
	var lnk_delGroup = '&nbsp;<a href="javascript:void(0);" id="m4p_delGroup">[-]</a>';
	var lnk_editGroup = '&nbsp;<a href="javascript:void(0);" id="m4p_editGroup">[\u0413\u0440\u0443\u043F\u043F\u044B]</a>';
	var lnk_clearAll = showClearAll? '&nbsp;<a href="javascript:void(0);" id="m4p_clearAll">[Clear ALL]</a>' :"";
	marks_td.innerHTML += "<b>"+ lnk_addGroup+ lnk_delGroup +lnk_editGroup+ lnk_clearAll +"</b>";
	marks_tr.appendChild(marks_td);
		//alert("marks_td.innerHTML = "+marks_td.innerHTML);
	//
	var my_tr;
	for(var i=0; i<all_tr.length; i++){
		my_tr = all_tr[i];
		if(my_tr.innerHTML.indexOf("<tr")!=-1){ continue; }
		if(my_tr.innerHTML.indexOf(stat_th)!=-1){ 
			//alert("my_tr.innerHTML = "+my_tr.innerHTML);
			my_tr.parentNode.insertBefore(marks_tr, my_tr);
		
		}			
	}		
}

function clickAddLabel(){
		//alert("click AddLabel" );
	//
	if(players_data.length>=max_players && playerObj.data[2]=="_" ){
		var amp_str = "\u0412\u044B \u0443\u0436\u0435 \u043F\u043E\u043C\u0435\u0442\u0438\u043B\u0438 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u0433\u0440\u043E\u043A\u043E\u0432";
		alert(amp_str + " - "+max_players);
		return;
	}
	var tmp_arr;
	var g_label, g_icon_num;
	//var my_title = "<b>Choose Label</b>";
	var my_title = "<b>\u0412\u044B\u0431\u043E\u0440 \u044F\u0440\u043B\u044B\u043A\u0430</b>";
	var my_content = "<tr>";	
	var ts;
	var col_count = 0;
	//	
	for(var i=0; i<groups_data.length;i++){
		ts = "_"+ i +"_";
		if(playerObj.data[2].indexOf(ts)!=-1){continue;} // need to exclude already presented groups...
	col_count++;
	tmp_arr = groups_data[i].split(";");
	g_label = decodeURIComponent( tmp_arr[0] )
	g_icon_num = Number(tmp_arr[1]);	
	my_content += (col_count%4==0 &&i>0)? '</tr><tr>' : '';
	my_content += '<td>';
	my_content += '<a href="javascript:void(0);">';
	my_content += '<img width=16 height=16 src="' +icons_arr[g_icon_num]+ '" border=0 id="m4p_p_addGroup_'+i+'" title="'+g_label+'">';
	my_content += '</a></td>';
	}	
	my_content += '</tr>';
	
	//alert("my_content = "+my_content);		
	
	//var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="javascript:void(0);" id="d_close">[Close]</a></b>';
	var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="javascript:void(0);" id="d_close">[\u0417\u0430\u043A\u0440\u044B\u0442\u044C]</a></b>';
	//
	d.innerHTML = '<div style="border:2px solid #999; background-color:#f5f3ea; width:120; height:150; '+
	'position:absolute; top:'+ (mouseY-20) +'px; left:'+ (mouseX-10) +'px; padding:10px;" >'+my_title+
	'<table border="0" cellpadding="5" >'+my_content+
	'</table>'+close_lnk+
	'</div>';

	d.style.display = "block";
	
	document.getElementById('d_close').addEventListener( "click", function(event) {click_close_d(event);} , false );
	
}

function clickDelLabel(){
		//alert("click DelLabel " );
	//
	var tmp_arr;
	var g_label, g_icon_num;
	//var my_title = "<b>Choose Label</b>";
	var my_title = "<b>\u0412\u044B\u0431\u043E\u0440 \u044F\u0440\u043B\u044B\u043A\u0430</b>";
	var my_content = "<tr>";	
	var ts;
	var col_count = 0;
	//	
	for(var i=0; i<groups_data.length;i++){
		ts = "_"+ i +"_";
		if(playerObj.data[2].indexOf(ts)==-1){continue;} //
	col_count++;
	tmp_arr = groups_data[i].split(";");
	g_label = decodeURIComponent( tmp_arr[0] )
	g_icon_num = Number(tmp_arr[1]);	
	my_content += (col_count%4==0 &&i>0)? '</tr><tr>' : '';
	my_content += '<td>';
	my_content += '<a href="javascript:void(0);">';
	my_content += '<img width=16 height=16 src="' +icons_arr[g_icon_num]+ '" border=0 id="m4p_p_delGroup_'+i+'" title="'+g_label+'">';
	my_content += '</a></td>';
	}	
	my_content += '</tr>';
	
	//alert("my_content = "+my_content);		
	
	//var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="javascript:void(0);" id="d_close">[Close]</a></b>';
	var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="javascript:void(0);" id="d_close">[\u0417\u0430\u043A\u0440\u044B\u0442\u044C]</a></b>';
	//
	d.innerHTML = '<div style="border:2px solid #999; background-color:#f5f3ea; width:120; height:150; '+
	'position:absolute; top:'+ (mouseY-20) +'px; left:'+ (mouseX-10) +'px; padding:10px;" >'+my_title+
	'<table border="0" cellpadding="5" >'+my_content+
	'</table>'+close_lnk+
	'</div>';

	d.style.display = "block";
	
	document.getElementById('d_close').addEventListener( "click", function(event) {click_close_d(event);} , false );
}

function clickEditGroup(){
		//alert("click EditGroup");
	//
	if(d.style.display != "block"){
		pos_d.x = mouseX-200;
		pos_d.y = mouseY-50;
	}
	//	
	//var my_title = "<b>Current Groups</b>";
	var my_title = "<b>\u0413\u0440\u0443\u043F\u043F\u044B</b>";
	var my_content = "";
	var tmp_arr;
	
	if(!groups_data.length){
		my_content += 'NONE';
		
	}else{
	
	my_content += '<tr><td>Group</td><td>Pic</td><td>Btl</td><td>Tav</td><td>PL</td><td>Del</td></tr>';	
	for(var i=0; i<groups_data.length;i++){
		my_content += '<tr';
		my_content += (i%2==0)? ' bgcolor="#ddd9cd"' : '';
		my_content += '>';
		tmp_arr = groups_data[i].split(";");
		//
		my_content += '<td><a href="javascript:void(0);" id="m4p_gnam_'+i+'">'+decodeURIComponent(tmp_arr[0])+'</a></td>';
		my_content += '<td><a href="javascript:void(0);" ><img width=16 height=16 src="' +icons_arr[Number(tmp_arr[1])]+ '" border=0 id="m4p_gpic_'+i+'"></a></td>';
		my_content += '<td><input type="checkbox" id="m4p_gbtl_'+i+'"';
		my_content += (tmp_arr[2] == "1")? ' checked="checked"' : '';
		my_content += '></td>';
		my_content += '<td><input type="checkbox" id="m4p_gtav_'+i+'"';
		my_content += (tmp_arr[3] == "1")? ' checked="checked"' : '';
		my_content += '></td>';
		
		my_content += '<td><a href="javascript:void(0);" id="m4p_gmmb_'+i+'">@</a></td>';
		my_content += '<td><a href="javascript:void(0);" id="m4p_gdel_'+i+'">[X]</a></td>';
		my_content += '</tr>';
	}	
	
	}
	//alert("my_content = "+my_content);	
	//
	//var newGroup_lnk = '&nbsp;<a href="javascript:void(0);" id="m4p_d_newGroup">[New]</a>';
	var newGroup_lnk = '&nbsp;<a href="javascript:void(0);" id="m4p_d_newGroup">[\u041D\u043E\u0432\u0430\u044F]</a>';
	//var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="m4p_d_close">[Close]</a>';	
	var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="m4p_d_close">[\u0417\u0430\u043A\u0440\u044B\u0442\u044C]</a>';	
	//
	d.innerHTML = '<div style="border:2px solid #999; background-color:#f5f3ea; width:300; height:500; padding:10px;'+
	'position:absolute; top:'+ (pos_d.y) +'px; left:'+ (pos_d.x) +'px;" >'+my_title+
	'<table border="1" cellpadding="5" style="margin:10px 0 10px 0" >'+my_content+
	'</table>'+'<b>'+newGroup_lnk + close_lnk+'</b>'+
	'</div>';
	
	d.style.display = "block";	
		
	recordGroupData();
}

// ==== group management ===
function click_addNewGroup(){
		//alert("click_addNewGroup" );
	if(d1_open){return;}
	if(groups_data.length>=max_groups){
		var amg_str = "\u0412\u044B \u0443\u0436\u0435 \u0441\u043E\u0437\u0434\u0430\u043B\u0438 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0433\u0440\u0443\u043F\u043F";
		alert(amg_str + " - "+max_groups);
		return;
	}
	var tmp_name = "Group #"+groups_data.length;
	var newName = prompt( '\u041D\u043E\u0432\u043E\u0435 \u0438\u043C\u044F \u0413\u0440\u0443\u043F\u043F\u044B' , tmp_name );
	if(!newName){ return; }
	//
	//alert("newName = "+newName);
	var newGroup_str = encodeURIComponent( newName ) + ";1;0;0" ;
	groups_data.push(newGroup_str);
	
	clickEditGroup();	
}

function gRenameGroup(gid){
	if(d1_open){return;}
		//alert("gRenameGroup, gid = "+gid );
	var n = Number(gid.substr(9) );
		//alert("n = "+n);
	var tmp_name = document.getElementById(gid).innerHTML;
	var newName = prompt( '\u041D\u043E\u0432\u043E\u0435 \u0438\u043C\u044F \u0413\u0440\u0443\u043F\u043F\u044B' , tmp_name );
	if(!newName){ return; }
	//
	var tmp_arr = groups_data[n].split(";");
	tmp_arr[0] = encodeURIComponent( newName );
	groups_data[n] = tmp_arr.join(";");
	
	clickEditGroup();
	
}
function gChGroupIcon(gid){
	if(d1_open){return;}
		//alert("gChGroupIcon, gid = "+gid );
	var n = Number(gid.substr(9) );
		//alert("n = "+n);
	d1_cur_group = n;
	var tmp_arr = groups_data[n].split(";");
	var cur_icon_num = Number(tmp_arr[1]);	
	//var my_title = "<b>Choose new icon</b>";
	var my_title = "<b>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0437\u043D\u0430\u0447\u043E\u043A</b>";
	var my_content = "<tr>";	
	var col_count = 0;
	for(var i=0; i<icons_arr.length;i++){
		my_content += (i%4==0 &&i>0)? '</tr><tr>' : '';
		my_content += '<td';
		my_content += (i==cur_icon_num)? ' bgcolor="#ddd9cd"' : '';
		my_content += '><a href="javascript:void(0);"><img width=16 height=16 src="' +icons_arr[i]+ '" border=0 id="m4p_g_chIcon_'+i+'"></a></td>';
	}	
	my_content += "</tr>";
		//alert("my_content = "+my_content);	
	//var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="m4p_d1_close">[Close]</a>';	
	var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="m4p_d1_close">[\u0417\u0430\u043A\u0440\u044B\u0442\u044C]</a>';	
	//
	d1.innerHTML = '<div style="border:2px solid #999; background-color:#f5f3ea; width:200; height:250; padding:10px;'+
	'position:absolute; top:'+ (pos_d.y+10) +'px; left:'+ (pos_d.x+10) +'px;" >'+my_title+
	'<table border="0" cellpadding="8" style="margin:10px 0 10px 0" >'+my_content+
	'</table>'+'<b>'+ close_lnk+'</b>'+
	'</div>';
	
	d1.style.display = "block";		
	d1_open = true;	
		
}
function gSelectIcon(id){
		//alert("gSelectIcon, id = "+id );
	var n = Number(id.substr(13) );
		//alert("n = "+n);
	var tmp_arr = groups_data[d1_cur_group].split(";");
	tmp_arr[1] = n;
	groups_data[d1_cur_group] = tmp_arr.join(";");	
	clickEditGroup();	
	click_close_d1()
}
function gChGroupBtl(gid){
	if(d1_open){return;}
		//alert("gChGroupBtl, gid = "+gid );
	var n = Number(gid.substr(9) );
		//alert("n = "+n);
	var tmp_arr = groups_data[n].split(";");
	tmp_arr[2] = (tmp_arr[2] == "1")? 0:1;
	groups_data[n] = tmp_arr.join(";");	
	clickEditGroup();
}
function gChGroupTav(gid){
	if(d1_open){return;}
		//alert("gChGroupTav, gid = "+gid );
	var n = Number(gid.substr(9) );
		//alert("n = "+n);
	var tmp_arr = groups_data[n].split(";");
	tmp_arr[3] = (tmp_arr[3] == "1")? 0:1;
	groups_data[n] = tmp_arr.join(";");	
	clickEditGroup();
}
function gShowGroupMembers(gid){
	if(d1_open){return;}
		//alert("gShowGroupMembers, gid = "+gid );
	var n = Number(gid.substr(9) );
		//alert("n = "+n);
	var tmp_arr = groups_data[n].split(";");
	var g_name = decodeURIComponent( tmp_arr[0] );
	var g_str = "_"+n+"_";
	var my_title = "<b>"+ g_name +"</b>";
	var my_content = "";	
	var players_len = players_data.length;	
	var pl_count = 0;
	for(var i=0; i<players_len; i++){
		tmp_arr = players_data[i].split(";");
		if(!tmp_arr[2].match(g_str) ){continue;}
		//
		my_content += '<a href="http://www.heroeswm.ru/pl_info.php?id='+ tmp_arr[0] +'">';
		my_content += decodeURIComponent(tmp_arr[1]) +"</a>, ";
		pl_count++;
	}
	my_title += " ("+pl_count+")";
	
	//var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="m4p_d1_close">[Close]</a>';	
	var close_lnk = '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="m4p_d1_close">[\u0417\u0430\u043A\u0440\u044B\u0442\u044C]</a>';	
	//
	d1.innerHTML = '<div style="border:2px solid #999; background-color:#f5f3ea; width:400; height:250; padding:10px;'+
	'position:absolute; top:'+ (pos_d.y+10) +'px; left:'+ (pos_d.x+10) +'px; overflow:auto;" >'+my_title+
	'<br><br>'+my_content+'<br><br>'+
	'<b>'+ close_lnk+'</b>'+
	'</div>';
	
	d1.style.display = "block";		
	d1_open = true;	
}
function gDeleteGroup(gid){
	if(d1_open){return;}
		//alert("gDeleteGroup, gid = "+gid );
	var n = Number(gid.substr(9) );
	var tmp_arr = groups_data[n].split(";");
	var g_name = decodeURIComponent( tmp_arr[0] );
		//alert("g_name = "+g_name);
	//var deleteGroupAsk = "Are you sure to delete ";
	var deleteGroupAsk = "\u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C ";
	if(!confirm(deleteGroupAsk + "\n" +g_name+"?") ){return;}
	//
		//alert("Deleting: "+g_name);
	// delete from players'
		//alert("players_data = \n"+players_data.join("\n") );
	var g_str = "_"+n+"_";
	var players_len = players_data.length;
	for(var i=0; i<players_len; i++){
		tmp_arr = players_data[i].split(";");
		if(!tmp_arr[2].match(g_str) ){continue;}
		//
		tmp_arr[2] = tmp_arr[2].split(n +"_").join("");
		players_data[i] = tmp_arr.join(";");
	}
		//alert("players_data = \n"+players_data.join("\n") );
	recordPlayerData();
	//
	// delete from groups...
	groups_data.splice(n, 1);
	clickEditGroup();
	recordGroupData();
}
function recordGroupData(){ // record to GM var
	GM_setValue("hwm_m4p_groups", groups_data.join("|"));
}

// ========= players...
function p_addGroup(gid){
		//alert("p_addGroup, gid = "+gid );
	var group_num = Number(gid.substr(15) );
		//alert("group_num = "+group_num);
	var has_groups = playerObj.data[2].split("_").length;
		//alert("has_groups = "+has_groups);
	if(has_groups>=max_labels+2){
		var amg_str1 = "\u041D\u0430 \u0438\u0433\u0440\u043E\u043A\u0430 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u0432\u0435\u0441\u0438\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E";
		var amg_str2 = "\u044F\u0440\u043B\u044B\u043A\u043E\u0432";
		alert(amg_str1 +" "+max_labels+" "+amg_str2);
		click_close_d();
		return;
	}	
	playerObj.data[2] += group_num +"_";
	players_data[playerObj.n] = playerObj.data.join(";");
	//
	document.getElementById('m4p_icons1').innerHTML = makeMarksIcons(playerObj.id, 0);
	//
	click_close_d();
	//
	recordPlayerData();
}
function p_delGroup(gid){
		//alert("p_delGroup, gid = "+gid );
	var group_num = Number(gid.substr(15) );
		//alert("group_num = "+group_num);
	playerObj.data[2] = playerObj.data[2].split(group_num +"_").join("");
	players_data[playerObj.n] = playerObj.data.join(";");
	//
	document.getElementById('m4p_icons1').innerHTML = makeMarksIcons(playerObj.id, 0);
	//
	click_close_d();
	//
	recordPlayerData();
}
function recordPlayerData(){ // record to GM var	
	GM_setValue("hwm_m4p_players", players_data.join("|"));
}
//
function clearAllRecords(){ // Clear ALL GM vars
		alert("clearAllRecords");
	GM_setValue("hwm_m4p_groups", "");
	GM_setValue("hwm_m4p_players", "");
}
// ================================================================================================
// ==================
function showMarksForForum(){
	//alert("showMarksForForum");
	var pl_info_str = 'pl_info.php?id='; //
	var all_links = document.getElementsByTagName('a');
	var my_link;
	var mk;
	var icons_str;
	var pid; // player ID
	for (var i = 0; i < all_links.length; i++) {
		my_link = all_links[i];
		if(my_link.href.indexOf(pl_info_str)!=-1 && my_link.style.textDecoration=="none" ){
			pid = my_link.href.split(pl_info_str)[1];
			mk = document.createElement( 'span' );
			icons_str = makeMarksIcons(pid, 1);
			mk.innerHTML = icons_str? "<br>"+icons_str : "";
				//alert("my_link.innerHTML = "+my_link.innerHTML);
			my_link.parentNode.insertBefore(mk, my_link.nextSibling);
			
		}
	}
		
}

function showMarksForBattle(){
	//alert("showMarksForBattle");
	var pl_info_str = 'pl_info.php?id='; //
	var all_links = document.getElementsByTagName('a');
	var my_link;
	var mk;
		var pid; // player ID
	for (var i = 0; i < all_links.length; i++) {
		my_link = all_links[i];
		if(my_link.href.indexOf(pl_info_str)!=-1 && my_link.innerHTML.indexOf("<font color=")!=-1 ){
		//if(my_link.href.indexOf(pl_info_str)!=-1  ){
			//my_link.style.backgroundColor = "#ccf";
			pid = my_link.href.split(pl_info_str)[1];
			mk = document.createElement( 'span' );
			//mk.innerHTML = "$$";
			mk.innerHTML = makeMarksIcons(pid, 2);
			my_link.parentNode.insertBefore(mk, my_link.nextSibling.nextSibling);
			
		}
	}
	
}


function showMarksForDuel(){
	//alert("showMarksForDuel");
	var pl_info_str = 'pl_info.php?id='; //
	var all_links = document.getElementsByTagName('a');
	var my_link;
	var mk;
	var pid; // player ID
	for (var i = 0; i < all_links.length; i++) {
		my_link = all_links[i];
		if(my_link.href.indexOf(pl_info_str)!=-1 && my_link.style.textDecoration=="none" ){
			pid = my_link.href.split(pl_info_str)[1];
			mk = document.createElement( 'span' );
			//mk.innerHTML = "$$";
			mk.innerHTML = makeMarksIcons(pid, 2);
			my_link.parentNode.insertBefore(mk, my_link.nextSibling.nextSibling.nextSibling);
			
		}
	}
	
}

function showMarksForTavern(){
	//alert("showMarksForTavern");
	var pl_info_str = 'pl_info.php?id='; //
	var all_links = document.getElementsByTagName('a');
	var my_link;
	var mk;
	var pid; // player ID
	for (var i = 0; i < all_links.length; i++) {
		my_link = all_links[i];
		if(my_link.href.indexOf(pl_info_str)!=-1 && my_link.style.textDecoration=="none" ){
			pid = my_link.href.split(pl_info_str)[1];
			mk = document.createElement( 'span' );
			//mk.innerHTML = "$$";
			mk.innerHTML = makeMarksIcons(pid, 3);
			my_link.parentNode.insertBefore(mk, my_link.nextSibling.nextSibling.nextSibling);
			
		}
	}
	
}

function showMarksForHome(){
	//alert("showMarksForHome");
	var pl_info_str = 'pl_info.php?id='; //
	var all_links = document.getElementsByTagName('a');
	var my_link;
	var mk;
	var pid; // player ID
	for (var i = 0; i < all_links.length; i++) {
		my_link = all_links[i];
		if(my_link.href.indexOf(pl_info_str)!=-1 && my_link.parentNode.parentNode.parentNode.innerHTML.indexOf("friends.php")!=-1 && my_link.innerHTML.indexOf("<b>")!=-1 ){
			pid = my_link.href.split(pl_info_str)[1];
				//alert("pid = "+pid);
			mk = document.createElement( 'span' );
			//mk.innerHTML = "$$";
			mk.innerHTML = makeMarksIcons(pid, 1);
			my_link.parentNode.insertBefore(mk, my_link.nextSibling);
			
		}
	}
	
}

function makeMarksIcons(pid, page){ // pid is player ID, page - num code for page according to groups_data array
	//alert("makeMarksIcons, pid = "+pid);
	var groups_len = groups_data.length;
	var players_len = players_data.length;
	var len;
	var n, tn, ts;
	var tmp_arr_pl ;
	var tmp_arr_gr ;
	var g4p_arr;
	var icon_str = "";
	for(var i=0; i<players_len; i++){
		tmp_arr_pl = players_data[i].split(";");
		if(tmp_arr_pl[0]!=pid){continue;}
		//
		g4p_arr = tmp_arr_pl[2].split("_")
			//alert("g4p_arr = "+g4p_arr);
		len = g4p_arr.length;
		for(var j=1; j<len-1; j++){
			n = Number(g4p_arr[j]);
			tmp_arr_gr = groups_data[n].split(";");
			if(page>1 && !Number(tmp_arr_gr[page]) ){continue;} // skip group not showing at this page (tavern, battle or duel)
			ts = decodeURIComponent(tmp_arr_gr[0]);
			tn = tmp_arr_gr[1];
			icon_str += '<img width=16 height=16 src="' +icons_arr[tn]+ '" border=0 title="'+ts+'" alt="">';
			
		}
	}
	/*	
	for(var i=0; i<3; i++){
		icon_str += '<img width=16 height=16 src="' +icons_arr[i]+ '" border=0 title="some title here '+i+'" alt="">';
	}	
	*/	
	icon_str = icon_str? "[" +icon_str+"]" : "";
	//alert("icon_str = "+icon_str);
	
	return icon_str;
}


function click_close_d(){
	if(d1_open){return;}
	d.style.display = "none";	
}
function click_close_d1(){
	d1.style.display = "none";	
	d1_open = false;	
}




function getUrlParam( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}






// ========================================================