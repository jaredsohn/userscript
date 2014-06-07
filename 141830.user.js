// ==UserScript==
// @name          LWM Clan Filter
// @description   Clan Filter COM
// @include       http://*.lordswm.com/clan_info.php*
// ==/UserScript==


var url_cur = location.href ;

//alert("HWM_Clan_Filter");	


var m_online_str = "i/clans/online.gif";
var m_offline_str = "i/clans/offline.gif";
var m_battle_str = "i/clans/battle.gif";
var m_cards_str = "i/clans/arcomag.gif";

var my_clan_table = getClanTable();
//alert("found clan table! my_clan_table = \n"+ my_clan_table.innerHTML); 
var clanRowsNodes_arr = my_clan_table.childNodes[0].childNodes;
//alert("clan members = "+clanRowsNodes_arr.length);

//alert("my_node = "+clanRowsNodes_arr[0].childNodes[2].childNodes[3]);
//alert("my_node = "+clanRowsNodes_arr[0].childNodes[2].childNodes[5].innerHTML);

// tech: 1-bk,  3-name, 5 fract
// batl: 1-name, 3 fract

var sortTable_div = document.createElement( 'div' );
sortTable_div.innerHTML = "temp text, should not be seen";
my_clan_table.parentNode.insertBefore(sortTable_div, my_clan_table);

// sorting flags
var doSort1 = false;
var doSort2 = false; // status
var doSort_bk = false; //bk
var doSort_fr = false; //fraction
var doSort3 = false; // name
var doSort4 = false; // level
var doSort5 = false; // descr

var isBattleClan = ( my_clan_table.innerHTML.indexOf("clan_info.php")==-1);


addSortTable();

// bk name fract descr Lv
// MC Name Faction Status Lvl

function addSortTable(){
	//var link_sort1 = '<a href="javascript:void(0);" id="clanTblSort1" style="background:'+(doSort1?"#6c6":"none")+';">[#]</a>';
	var link_sort1 = '#';
	var link_sort2 = '<a href="javascript:void(0);" id="clanTblSort2" style="background:'+(doSort2?"#6c6":"none")+';">On</a>';
	var link_sort_bk = '<a href="javascript:void(0);" id="clanTblSort_bk" style="background:'+(doSort_bk?"#6c6":"none")+';">[MC]</a>&nbsp;&nbsp;';
	link_sort_bk = isBattleClan? "" : link_sort_bk;
	var link_sort3 = '<a href="javascript:void(0);" id="clanTblSort3" style="background:'+(doSort3?"#6c6":"none")+';">[Nick]</a>';
	var link_sort_fr = '&nbsp;&nbsp;<a href="javascript:void(0);" id="clanTblSort_fr" style="background:'+(doSort_fr?"#6c6":"none")+';">[Faction]</a>';
	var link_sort4 = '<a href="javascript:void(0);" id="clanTblSort4" style="background:'+(doSort4?"#6c6":"none")+';">CL</a>';
	var link_sort5 = '<a href="javascript:void(0);" id="clanTblSort5" style="background:'+(doSort5?"#6c6":"none")+';">[Status]</a>';

	var sortHeaders = '<tr>'+
	'<td class=wblight width=30><b>'+ link_sort1 +'</b></td>'+
	'<td class=wblight width=15><b>'+ link_sort2 +'</b></td>'+
	'<td class=wblight width=150><b>'+ link_sort_bk+ link_sort3 +link_sort_fr +'</b></td>'+
	'<td class=wblight width=10><b>'+ link_sort4 +'</b></td>'+
	'<td class=wblight><b>'+ link_sort5 +'</b></td>'+
	'</tr>';
	
	var sortedRows = getSortedRows();
	
	sortTable_div.innerHTML = '<table class=wb width="80%" cellpadding=3 align=center>'+ sortHeaders +sortedRows+ '</table>';
	
	//sortTable_div.innerHTML += "<hr width='50%'>";
		
	// add listeners
	//document.getElementById('clanTblSort1').addEventListener( "click", clanTblSort1 , false );
	document.getElementById('clanTblSort2').addEventListener( "click", clanTblSort2 , false );
	if(!isBattleClan){
	document.getElementById('clanTblSort_bk').addEventListener( "click", clanTblSort_bk , false );
	}
	document.getElementById('clanTblSort_fr').addEventListener( "click", clanTblSort_fr , false );
	document.getElementById('clanTblSort3').addEventListener( "click", clanTblSort3 , false );
	document.getElementById('clanTblSort4').addEventListener( "click", clanTblSort4 , false );
	document.getElementById('clanTblSort5').addEventListener( "click", clanTblSort5 , false );
	//
	//
	if(!doSort1 && !doSort2 && !doSort3 && !doSort_bk && !doSort_fr && !doSort4 & !doSort5){  // NO filters
		my_clan_table.style.display = "";
	}else{
		// hide default table
		my_clan_table.style.display = "none";
	}
}
//
//
function  getSortedRows(){ 
	//var rows_str = clanRows_arr[0].innerHTML ;
	var rows_str = "" ;
	if(!doSort1 && !doSort2 && !doSort3 && !doSort_bk && !doSort_fr && !doSort4 & !doSort5){ return rows_str; } // NO filters
	//
	var clanRowsStr_arr = [];
	for(var i=0; i<clanRowsNodes_arr.length; i++){
		clanRowsStr_arr.push( [i, clanRowsNodes_arr[i].innerHTML] );
	}
	//	
	//clanRowsStr_arr.reverse();	
	clanRowsStr_arr.sort(mySort4Clan);	
	//
	for(i=0; i<clanRowsStr_arr.length; i++){
		rows_str += "<tr>" +clanRowsStr_arr[i][1] +"</tr>";
	}
	
	return rows_str;
}
//
function  mySort4Clan(a,b){ 
	var ax, bx;
	var tn;
	var res = 0;
	// sort according to priority... from less to max
	// 1st - sort by num...
	ax = Number(clanRowsNodes_arr[a[0]].childNodes[0].innerHTML);
	bx = Number(clanRowsNodes_arr[b[0]].childNodes[0].innerHTML);
	res = (ax<bx)? -1 :(ax>bx)? 1 : 0;
	//
	if(doSort5){ //descr
		ax = clanRowsNodes_arr[a[0]].childNodes[4].innerHTML;
		bx = clanRowsNodes_arr[b[0]].childNodes[4].innerHTML;
		if(ax=="&nbsp;&nbsp;" && bx!="&nbsp;&nbsp;"){
			res = 1;
		}else if(ax!="&nbsp;&nbsp;" && bx=="&nbsp;&nbsp;"){
			res = -1;
		}else{
		res = (ax<bx)? -1 :(ax>bx)? 1 : res; 	
		}
	}
	//
	if(doSort_bk && !isBattleClan){ //BK
		ax = clanRowsNodes_arr[a[0]].childNodes[2].childNodes[1].innerHTML;
		bx = clanRowsNodes_arr[b[0]].childNodes[2].childNodes[1].innerHTML;
		res = (ax<bx)? -1 :(ax>bx)? 1 : res; 	
	}
	//
	if(doSort_fr ){ // fract
		tn = isBattleClan? 3: 5;
		if(isBattleClan || clanRowsNodes_arr[a[0]].childNodes[2].innerHTML.indexOf("clan_info.php")!=-1){
		ax = clanRowsNodes_arr[a[0]].childNodes[2].childNodes[tn].title;
		}else{
		ax = clanRowsNodes_arr[a[0]].childNodes[2].childNodes[3].title;
		}
		if(isBattleClan || clanRowsNodes_arr[b[0]].childNodes[2].innerHTML.indexOf("clan_info.php")!=-1){
		bx = clanRowsNodes_arr[b[0]].childNodes[2].childNodes[tn].title;
		}else{
		bx = clanRowsNodes_arr[b[0]].childNodes[2].childNodes[3].title;
		}
		res = (ax<bx)? -1 :(ax>bx)? 1 : res; 	
	}
	//
	if(doSort3 ){ //name
		tn = isBattleClan? 1: 3;
		if(isBattleClan || clanRowsNodes_arr[a[0]].childNodes[2].innerHTML.indexOf("clan_info.php")!=-1){
		ax = clanRowsNodes_arr[a[0]].childNodes[2].childNodes[tn].innerHTML.toLowerCase();
		}else{
		ax = clanRowsNodes_arr[a[0]].childNodes[2].childNodes[1].innerHTML.toLowerCase();
		}
		if(isBattleClan || clanRowsNodes_arr[b[0]].childNodes[2].innerHTML.indexOf("clan_info.php")!=-1){
		bx = clanRowsNodes_arr[b[0]].childNodes[2].childNodes[tn].innerHTML.toLowerCase();
		}else{
		bx = clanRowsNodes_arr[b[0]].childNodes[2].childNodes[1].innerHTML.toLowerCase();
		}
		res = (ax<bx)? -1 :(ax>bx)? 1 : res; 	
	}
	//
	if(doSort4){ //level descending
		ax = Number(clanRowsNodes_arr[a[0]].childNodes[3].innerHTML);
		bx = Number(clanRowsNodes_arr[b[0]].childNodes[3].innerHTML);
		res = (ax<bx)? 1 :(ax>bx)? -1 : res; 	
	}
	//
	if(doSort2){ //status
		ax = clanRowsNodes_arr[a[0]].childNodes[1].innerHTML;
		bx = clanRowsNodes_arr[b[0]].childNodes[1].innerHTML;
		if(ax.indexOf("i/clans/offline.gif")==-1 && bx.indexOf("i/clans/offline.gif")!=-1 ){
			res = -1;
		}else if(ax.indexOf("i/clans/offline.gif")!=-1 && bx.indexOf("i/clans/offline.gif")==-1 ){
			res = 1;
		}else { res = (ax<bx)? -1 :(ax>bx)? 1 : res; }	
	}
	//
	//
	return res;
}
//
// listeners
function  clanTblSort1(){ doSort1 = !doSort1;	addSortTable();	}
function  clanTblSort2(){ doSort2 = !doSort2;	addSortTable();	}
function  clanTblSort_bk(){ doSort_bk = !doSort_bk;	addSortTable();	}
function  clanTblSort_fr(){ doSort_fr = !doSort_fr;	addSortTable();	}
function  clanTblSort3(){ doSort3 = !doSort3;	addSortTable();	}
function  clanTblSort4(){ doSort4 = !doSort4;	addSortTable();	}
function  clanTblSort5(){ doSort5 = !doSort5;	addSortTable();	}
//
//
function getClanTable(){	
	var all_tbl = document.getElementsByTagName('table');
	var my_tbl;
	for (var i = 0; i < all_tbl.length; i++) {
		my_tbl = all_tbl[i];
		//
		if(my_tbl.innerHTML.indexOf('<table')!=-1 ){ continue; } // has child tables... 
		//
		var has_online_gif = (my_tbl.innerHTML.indexOf(m_online_str)!=-1 );
		var has_offline_gif = (my_tbl.innerHTML.indexOf(m_offline_str)!=-1 );
		var has_battle_gif = (my_tbl.innerHTML.indexOf(m_battle_str)!=-1 );
		var has_cards_gif = (my_tbl.innerHTML.indexOf(m_cards_str)!=-1 );
		//
		if(has_online_gif || has_offline_gif || has_battle_gif || has_cards_gif){ 						
			return my_tbl;			
		} 		
	}
}


// ========= END ==============
