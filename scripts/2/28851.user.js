// ==UserScript==
// @name          HWM_WarLog_2_Table
// @description   HWM mod - converts War_log to table
// @include       http://www.heroeswm.ru/pl_warlog.php*
// ==/UserScript==


// =================== COLORS =================================

var hunt_color = "#cceecc";  // hunt

var mercenary_color = "#eeeecc"; // mercenary (GN) tasks

var thief_color = "#ccccee"; // thief

var light_color = "#eeeeee"; // just in case :-)

// ====================================================



var url_cur = location.href ;

//alert("Advanced WAR Log!");	

var all_td_Elements, this_td_Element;
	all_td_Elements = document.getElementsByTagName('td');
		//alert("found " + all_td_Elements.length + "  TD elements!");

var link2pages = "pl_warlog.php";	


// ==
makeAdvLog();

function makeAdvLog(){
	var td_len = all_td_Elements.length;
	var my_td;
	for (var i = 0; i < td_len; i++) {
		my_td = all_td_Elements[i];
		if(my_td.innerHTML.indexOf(link2pages) != -1 ){ 
			//my_td.style.backgroundColor = "#cccccc";
			my_td.innerHTML = makeLogTable(my_td.innerHTML);
			//my_td.innerHTML = "Original content replaced";
			break;
		} 	
	}
}


function makeLogTable(s){
	// split to header and content
	var s_parts = s.split("</a></center>");
	var header = s_parts[0] + "</a></center>" + s_parts[1] + "</a></center>";
		//alert("s_parts.len = "+s_parts.length);
		//alert("header = "+header);
	
	var rec_arr = s_parts[2].split("\n");
		//alert("rec_arr.len = "+rec_arr.length);
		//alert("rec_arr[39] = "+rec_arr[39]); // last record
		
	var rec_table = "<table cellpadding=2 border=1 cellspacing=0>";	
	var rec_len = rec_arr.length -1;
	var rec;
	//
	//var p_date = /(\d{2}-\d{2}-\d{2}) (\d{1,2}:\d{2}): /; // pattern
	var p_date = /(<a.*warlog\.php\?warid=\d+">\d{2}-\d{2}-\d{2}) (\d{1,2}:\d{2}<\/a>): /; // pattern
	var p_user = /(<a.*pl_info\.php\?id=\d+".*><b>.+<\/b><\/a>)/; // pattern
	
	//var tr_color = "#eeeeee";
	var tr_color = "";
	
	for(var i=0; i<rec_len; i++){
	//for(var i=0; i<5; i++){			
		rec = rec_arr[i];
		rec = rec.split("<BR>").join(""); // trim BR
		rec = rec.split("<br>").join(""); // trim br
		rec = rec.split("&nbsp;&nbsp;").join(""); // trim nbsp
		//		
		tr_color = "";
		// colored rows for special cases
		if(rec.search(/\(\d+\)/) != -1 ){  // hunt
			//tr_color="#cceecc";
			tr_color=hunt_color;
		} else if(rec.search(/\{\d+\}/) != -1 ){  // GN
			//tr_color="#eeeecc";
			tr_color=mercenary_color;
		}  else if(rec.search(/\u2022/) != -1 ){  // thief
			//tr_color="#ccccff";
			tr_color=thief_color;
		} 
		
		rec = rec.replace(p_date, "$1&nbsp;$2</td><td>");
		rec = rec.replace(p_user, "</td><td>$1_XX</td><td>");		
		//
		rec_table += "<tr bgcolor="+tr_color+">" ;
		rec_table += "<td>" + rec + "</td></tr>\n";	
	}
	rec_table += "</table>";
		//alert("rec_table = "+rec_table);
	//return s;
	return header + rec_table;

}



