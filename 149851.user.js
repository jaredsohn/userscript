// ==UserScript==
// @name          HWM_L2T
// @description   HWM mod converts log to table
// @include       http://www.heroeswm.ru/pl_transfers.php*
// @include       http://www.heroeswm.ru/sklad_log.php*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==


var url_cur = location.href ;
 
//alert("Advanced Log!");	
var header="";
if(url_cur.indexOf('&filter=')>-1){
var filter_content=document.getElementsByTagName('form')[0].parentNode.innerHTML;
	filter_content=filter_content.replace('"GET"></form><td>','"GET">').replace('"GET"></form><td>','"GET">').replace('</td><td','</form></td><td').replace('</td><form','</td><td><form').replace('<form','<td><form');
document.getElementsByTagName('form')[0].parentNode.innerHTML=filter_content;

}


var all_td_Elements, this_td_Element;
	all_td_Elements = document.getElementsByTagName('td');
		//alert("found " + all_td_Elements.length + "  TD elements!");

var link2pages = "pl_transfers.php";	
var is_page_exist=0;

// ==
makeAdvLog();

function makeAdvLog(){
	var td_len = all_td_Elements.length;
	var my_td;
   	// split to header and content
	var alla=document.getElementsByTagName('a');
	for(var i=0;i<alla.length;i++)
		{
		if(alla[i].href.indexOf('&page=')>-1)
			{
            is_page_exist=1;
			var tt=alla[i].parentNode;
			var delimit=document.createElement('span');
			//delimit.style.display="none";
			delimit.innerHTML='HereWeWillCut';
            tt.parentNode.insertBefore(delimit,tt.nextSibling);
			
			break;
			}
		}
	
    if(is_page_exist){
	
        var all_span_Elements = document.getElementsByTagName('span');
        var span_len=all_span_Elements.length;
        var my_span;
        for (var i = span_len-1; i>=0; i--) {
		
		    my_span = all_span_Elements[i];
            if(my_span.innerHTML.search('HereWeWillCut') != -1 ){ 
        		//my_td.style.backgroundColor = "#cccccc";
                my_span.parentNode.innerHTML = makeLogTable(my_span.parentNode);
                //my_td.innerHTML = "Original ontent replaced";
                break;
            } 	
        }
    }  else if(false){
    
    }
}


function makeLogTable(s){

    //if(s.innerHTML.indexOf('HereWeWillCut')>-1){alert('HereWeWillCut')}
	s_parts=s.innerHTML.split('HereWeWillCut');//.
	
	header =s_parts[0]+'<BR><BR>';
	
	
	
	
	//alert('s_parts.length='+s_parts.length);
	var rec_arr = s_parts[1].split("\n");
		//alert("rec_arr.len = "+rec_arr.length);
		//alert("rec_arr[39] = "+rec_arr[39]); // last record
		
	var rec_table = "<table cellpadding=2 border=1 cellspacing=0>";	
	var rec_len = rec_arr.length -1;
	var rec;
	//
	var p_date = /(\d{2}-\d{2}-\d{2}) (\d{1,2}:\d{2}): /; // pattern
	var p_user = /(<a.*pl_info\.php\?id=\d+".*><b>.+<\/b><\/a>)/; // pattern
    var p_obj = /( <b>.+<\/b>)/; // pattern
	
	
	for(var i=0; i<rec_len; i++){
        rec = rec_arr[i];
        
        if(location.href.indexOf('pl_transfers.php?id=2987176')>-1){
          if(rec_arr[i].search(/\u0431\u0440\u0438\u043B\u043B\u0438\u0430\u043D\u0442\u043E\u0432/)!=-1)
            {rec_table +="<tr style='display: none'>";}
        } else {
            rec_table +=  "<tr>";}
		
        
        
		rec = rec.split("<BR>").join(""); // trim BR
		rec = rec.split("<br>").join(""); // trim br
		rec = rec.split("&nbsp;&nbsp;").join(""); // trim nbsp
		//		
		rec = rec.replace(p_date, "$1</td><td>$2</td><td>");
		rec = rec.replace(p_user, "</td><td>$1</td><td>");	
		rec = rec.replace(p_obj, "</td><td>$1</td><td>"); 		
		
		rec_table += "<td width='65'>" + rec + "</td></tr>";	
	}
	rec_table += "</table>";
		//alert("rec_table = "+rec_table);
	//return s;
	return header + rec_table;

}