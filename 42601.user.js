// ==UserScript==
// @name          HWM_Group_4War
// @description   HWM_Group_4War
// @include       http://www.heroeswm.ru/dragon_quest.php
// ==/UserScript==


var url_cur = location.href ;

//alert("HWM_Group_4War");	

// ==
var all_li_subnav = document.evaluate("//li[@class='subnav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var my_id = getPlayerId();


markBattleGroups();

function markBattleGroups(){
	var leftBefore_str = "\u0414\u043E \u043D\u0430\u043F\u0430\u0434\u0435\u043D\u0438\u0439 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u043C\u0435\u043D\u0435\u0435";
	var clan_str = "\u041A\u043B\u0430\u043D";
	var members_str = "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438";
	
	var all_td = document.getElementsByTagName('td');
	var my_td;
	var my_groupTbl;
	for (var i = 0; i < all_td.length; i++) {
		my_td = all_td[i];
		//
		if(my_td.innerHTML.indexOf('<table')!=-1){ continue; } // has child tables...
		if(my_td.innerHTML.indexOf(clan_str)!=-1 && my_td.nextSibling.innerHTML.indexOf(members_str)!=-1){
			my_groupTbl = my_td.parentNode.parentNode;
			//alert("my_groupTbl: \n"+ my_groupTbl.innerHTML);
						
			break;			
		}
		//	
	}
	//
	var my_tr;
	var my_id_link = "pl_info.php?id="+my_id;
	var enter_str = "inferno_war_join.php?id=";
	var attack_now = "<b>\u041D\u0430\u043F\u0430\u0441\u0442\u044C</b>"; // Napast
	for(i=0; i<my_groupTbl.childNodes.length; i++){
		my_tr = my_groupTbl.childNodes[i];
		my_td = my_tr.childNodes[1];		
		if(my_tr.innerHTML.indexOf(members_str)!=-1){continue; } //
		//
		//if(my_tr.innerHTML.indexOf("#")==-1){
		if(my_tr.innerHTML.indexOf(my_id_link)==-1 && my_tr.innerHTML.indexOf(enter_str)==-1  && my_tr.innerHTML.indexOf(attack_now)==-1){
			//my_td.style.background = "#fcc";
			my_tr.style.display = "none";
		}
		
	}
	


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
