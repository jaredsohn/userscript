// ==UserScript==
// @name          HWM_Gnome_War_Group
// @description   HWM_Gnome_War_Group
// @include       http://www.heroeswm.ru/gnome_war.php
// ==/UserScript==


var url_cur = location.href ;

//alert("HWM_Gnome_War_Group");	

// ==
var all_li_subnav = document.evaluate("//li[@class='subnav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var my_id = getPlayerId();

var my_clan = "#999999";


markBattleGroups();

function markBattleGroups(){
	var clan_str = "\u041A\u043B\u0430\u043D";
	var members_str = "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438";
	
	var attack_now = "inferno_war_create.php"; // Napast
	
	var all_tbl = document.getElementsByTagName('table');
	var groupTbl_arr = [];
	var my_tbl;
	var my_td;
	var my_groupTbl;
	var my_sectTbl;
	for (var i = 0; i < all_tbl.length; i++) {
		my_tbl = all_tbl[i];
		//
		//if(my_tbl.innerHTML.indexOf('<table')!=-1 && my_tbl.innerHTML.indexOf(attack_now)==-1){ continue; } // has child tables... 
		if(my_tbl.innerHTML.indexOf('<table')!=-1 ){ 
			// has child tables... w/o attack form		
			continue; 
		} 
		if(my_tbl.innerHTML.indexOf(clan_str)!=-1 && my_tbl.innerHTML.indexOf(members_str)!=-1){
			
			my_sectTbl = my_tbl.parentNode.parentNode.parentNode;
			//my_sectTbl.childNodes[1].firstChild.style.background = "#fcc";
			//alert("my_sectTbl: "+my_sectTbl+" ___\n"+ my_sectTbl.innerHTML);
			
			for(var k=0; k<my_sectTbl.childNodes.length; k++){
				my_groupTbl = my_sectTbl.childNodes[k].childNodes[1].childNodes[0];
					//alert("my_groupTbl = "+my_groupTbl);
				groupTbl_arr.push(my_groupTbl);
			
			}
					
		}
		//	
	}
	//alert("found "+groupTbl_arr.length+" group tables...");
	//
	/**/
	var my_tr;
	var my_id_link = "pl_info.php?id="+my_id;
	var enter_str = "inferno_war_join.php";
	//var attack_now = "<b>\u041D\u0430\u043F\u0430\u0441\u0442\u044C</b>"; // Napast
	var attack_now = "inferno_war_create.php"; // Napast
		//alert("my_groupTbl.childNodes.length = "+my_groupTbl.childNodes.length);
	
	for(k=0; k<groupTbl_arr.length; k++){
		my_groupTbl = groupTbl_arr[k];
			//alert("my_groupTbl: \n"+ my_groupTbl.innerHTML);
		//
		if(!my_groupTbl.childNodes[0] || !my_groupTbl.childNodes[0].hasChildNodes() ){continue; } //
		
	
		for(i=0; i<my_groupTbl.childNodes[0].childNodes.length; i++){
			my_tr = my_groupTbl.childNodes[0].childNodes[i];			
			if(my_tr.innerHTML.indexOf(members_str)!=-1){continue; } //
			
			my_td = (my_tr.innerHTML.indexOf(attack_now)!=-1)? my_tr.childNodes[0] : my_tr.childNodes[1];	
			//
			//my_td.style.background = "#fcF";
			
			//if(my_tr.innerHTML.indexOf("#")==-1){
			//if(my_tr.innerHTML.indexOf(my_clan+"<")==-1){
			if(my_tr.innerHTML.indexOf(my_id_link)==-1 && my_tr.innerHTML.indexOf(enter_str)==-1  && my_tr.innerHTML.indexOf(attack_now)==-1 && my_tr.innerHTML.indexOf(my_clan+"<")==-1){
				my_td.style.background = "#fcc";
				my_tr.style.display = "none";
			}
			
		}
	
	}
	//
}




function getPlayerId(){
	// get player ID
	my_li = all_li_subnav.snapshotItem(5);
	prev_elm = my_li.childNodes[1].childNodes[1];
		//alert("Player ID = \n" +prev_elm.innerHTML);
	//
	var ptrn = /<a href="pl_hunter_stat\.php\?id=(.*)">(.*)<\/a>/;
	var player_id = prev_elm.innerHTML.replace(ptrn, "$1")
		//alert("player_id = "+player_id);
	
	return player_id;	
}

// ========= END ==============
