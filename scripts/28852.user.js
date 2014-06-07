// ==UserScript==
// @name          HWM_Log_2_Table
// @description   HWM mod - converts log to table
// @include       http://www.heroeswm.ru/pl_transfers.php*
// ==/UserScript==


var url_cur = location.href ;

//alert("Advanced Log!");	

var all_td_Elements, this_td_Element;
	all_td_Elements = document.getElementsByTagName('td');
		//alert("found " + all_td_Elements.length + "  TD elements!");

var link2pages = "pl_transfers.php";	


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
			//my_td.innerHTML = "Original ontent replaced";
			//alert("my_td.innerHTML = "+my_td.innerHTML);
			break;
		} 	
	}
}


function makeLogTable(s){
		//alert("makeLogTable,   s = "+s);
		
	var filters_str = "\u0444\u0438\u043B\u044C\u0442\u0440\u044B</a>)</center>";
	var isMyLog = ( s.indexOf(filters_str) != -1);
		//alert("filters_str = "+filters_str);
		//alert("makeLogTable,   isMyLog = "+isMyLog);
	//
	// split to header and content
	var s_parts;
	var header;
	var rec_arr
	if(isMyLog){
		s_parts = s.split("</a></center>");
		header = s_parts[0] + "</a></center>";
		rec_arr = s_parts[1].split("\n");
	}else{	
	s_parts = s.split("</a></center>");
	header = s_parts[0] + "</a></center>" + s_parts[1] + "</a></center>";
	//var header = s_parts[0] + "</a></center>";
		//alert("s_parts.len = "+s_parts.length);
		//alert("header = "+header);
	
	rec_arr = s_parts[2].split("\n");
		//alert("rec_arr.len = "+rec_arr.length);
		//alert("rec_arr[39] = "+rec_arr[39]); // last record
	}
		
	var rec_table = "<table cellpadding=2 border=1 cellspacing=0>";	
	var rec_len = rec_arr.length -1;
	var rec;
	//
	var p_date = /(\d{2}-\d{2}-\d{2}) (\d{1,2}:\d{2}): /; // pattern
	var p_user = /(<a.*pl_info\.php\?id=\d+".*><b>.+<\/b><\/a>)/; // pattern
	
	//var p = /(\d{2}-\d{2}-\d{2} \d{1,2}:\d{2}): (Получено)/; // pattern
	for(var i=0; i<rec_len; i++){
		rec_table += (i%2 != 0)? "<tr bgcolor=#eeeeee>" : "<tr>";
		rec = rec_arr[i];
		rec = rec.split("<BR>").join(""); // trim BR
		rec = rec.split("<br>").join(""); // trim br
		rec = rec.split("&nbsp;&nbsp;").join(""); // trim nbsp
		//		
		//rec = rec.replace(p_date, "$1 $2</td><td>");
		rec = rec.replace(p_date, "$1</td><td>$2</td><td>");
		rec = rec.replace(p_user, "</td><td>$1</td><td>");		
		
		rec_table += "<td>" + rec + "</td></tr>";	
	}
	rec_table += "</table>";
		//alert("rec_table = "+rec_table);
	//return s;
	return header + rec_table;

}



