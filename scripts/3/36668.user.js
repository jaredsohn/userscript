// ==UserScript==
// @name          HWM_No_Hunt
// @description   HWM mod - No_Hunt
// @include        http://www.heroeswm.ru/map.php*
// ==/UserScript==


// ===================  =================================

// 

var url_cur = location.href ;

var url_map = "heroeswm.ru/map.php" ;

//alert("HWM_No_Hunt");	

var all_td_Elements, this_td_Element;
	all_td_Elements = document.getElementsByTagName('td');
		//alert("found " + all_td_Elements.length + "  TD elements!");

// ==

hideHunt();

//

function hideHunt(){ // 
	if(url_cur.indexOf(url_map) == -1){ return; }
	//
	var mob_str = "army_info.php?name";
	
	var td_len = all_td_Elements.length;
	var my_td;
	var my_td_danger;	
	for (var i = 0; i < td_len; i++) { // find 
		my_td = all_td_Elements[i];
		if(my_td.innerHTML.indexOf(mob_str) != -1 && my_td.innerHTML.indexOf("<td") == -1 ){ 
			my_td.parentNode.parentNode.style.backgroundColor = "#cccccc";
			my_td.parentNode.parentNode.style.display = "none";
			//break;			
		} 	
	}	
	
	
}
