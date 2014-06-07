// ==UserScript==
// @name          HWM_Pers_Hunt_Records
// @description   HWM mod - Pers_Hunt_Records
// @version 0.55
// @include        http://www.heroeswm.ru/map.php*
// @include       http://www.heroeswm.ru/pl_hunter_stat.php*
// ==/UserScript==

// ===================  =================================

// === v 0.55 ========

var url_cur = location.href ;

var url_map = "heroeswm.ru/map.php" ;
var url_hrec = "heroeswm.ru/pl_hunter_stat.php" ;

//alert("HWM_Pers_Hunt_Records");	

var all_td_Elements, this_td_Element;
	all_td_Elements = document.getElementsByTagName('td');
var all_tables = document.getElementsByTagName('table');
		//alert("found " + all_td_Elements.length + "  TD elements!");

// ==
checkRecords();

showRecord();
//

function checkRecords(){ // read records table and write to GM vars
	if(url_cur.indexOf(url_hrec) == -1){ return; }
	//
		//alert("checkRecords");
	
	var mob_str = "army_info.php?name";
	var mob_count = 0;
	var mob_list = "";
	var ts = "";
	
	var trs;
	for (var k = 0; k < all_tables.length; k++)
	{
		if (all_tables[k].className == "wb")
		{
			trs = all_tables[k].childNodes[0].childNodes;
			break;
		}
	}
	for (var i = 1; i < trs.length; i++)
	{
		ts = trs[i].childNodes[0].childNodes[1].href.split("=")[1] + "=";
		ts += trs[i].childNodes[2].childNodes[1].childNodes[0].innerHTML;
		mob_list += ts + "\n";
		mob_count++;
	}
	mob_list = mob_list.substring(0, mob_list.length-1);
	//mob_list += "xx";
	//alert("mob_count = "+mob_count+"\n mob_list = \n"+mob_list);
	
	GM_setValue("hwm_my_hunt_rec", mob_list);
}

function showRecord(){ // show pers record in title of  "light signal"
	if(url_cur.indexOf(url_map) == -1){ return; }
	//
	var mob_list = GM_getValue("hwm_my_hunt_rec", "none");
		//alert("mob_list = \n"+mob_list);
	var mob_arr = mob_list.split("\n");
		//alert("mob_arr.len = " + mob_arr.length);
		
	var mob_str = "army_info.php?name";
	var cur_mob = "XXX";
	//&nbsp;Вы услышали крик <a href='army_info.php?name=spectre'>Призраки</a> (76 шт.), обернувшись Вы видите - они охраняют  107 золота 
	//var mob_pattern = /&nbsp;(.*)<a href="army_info\.php\?name=(.*)">(.*)<\/a>(.*)/;
	var td_len = all_td_Elements.length;
	var my_td;
	var my_td_danger;	
	
	for (var k = 0; k < all_tables.length; k++)
	{
		if (all_tables[k].className == "wbwhite")
		{
			var link = all_tables[k].childNodes[0].childNodes[0].childNodes[1].childNodes[1];
			var my_td_danger = all_tables[k].childNodes[0].childNodes[0].childNodes[2];
			cur_mob = link.href.split("=")[1];
			
			if(!my_td_danger){ return; } //no hunt...
	
			//alert("cur_mob = "+cur_mob);
			var s = "";
			var pers_rec = "xx";
			var mn = "mn";
			var has_rec = false;
			for (var i = 0; i < mob_arr.length; i++) { // find record
				s = mob_arr[i];
				mn = s.split("=")[0];
				pers_rec = s.split("=")[1];
				//if(s.indexOf(cur_mob) != -1){ // wrong result for orc vs enforcer
				if(mn == cur_mob){
					has_rec = true;
					//alert("your record: \n"+ s);
					//pers_rec = s.split("=")[1];			
					break;			
				}
			}
			pers_rec = has_rec? pers_rec : "0";
			//alert("pers_rec = "+pers_rec+",  i="+i+",  mn = "+mn);
			
			var img = my_td_danger.childNodes[0].childNodes[0];
			
			// Lichniy record:
			var pers_rec_str = "\u041B\u0438\u0447\u043D\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434: ";
			img.title = img.title + " " + pers_rec_str + pers_rec;
			img.alt = img.alt + " " + pers_rec_str + pers_rec;

		}
	}
}