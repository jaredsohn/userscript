// ==UserScript==
// @name           LWM_Ecostat_ADV
// @description    LWM mod - Ecostat_ADV
// @version    0.1.3
// @include        http://www.lordswm.com/map.php*
// @include        http://www.lordswm.com/ecostat_details.php*
// @include        http://www.lordswm.com/objectworkers.php*
// @include        http://www.lordswm.com/mercenary_guild.php*
// ==/UserScript==


var url_cur = location.href ;
var curDate = new Date();
var curHour = curDate.getHours();
var curMin = curDate.getMinutes();
	//alert("curDate = "+curDate+"\n time = "+curHour+":"+curMin);

var isEcostat = (url_cur.indexOf("/ecostat_details.php") != -1);
var isMercenary =  (url_cur.indexOf("/mercenary_guild.php") != -1);
	//alert("isMercenary = "+isMercenary);
	

var times_str = GM_getValue("lwm_ecost_adv_times", "")
//var times_arr = times_str.split("|");
	//alert("times_str = "+times_str);
	

// =========== ID - Location lookup table =====
var id2loc = [];
var o;
	// == create objects with loc info
o = {};
o.abbr = "GrC";
o.name = "Great Capital";
o.ids = [1,2,3,4,5,6,7,8,33,34,45];
id2loc.push(o);
//
o = {};
o.abbr = "YeL";
o.name = "Yellow Lake";
o.ids = [55,23,24,25,26,39,40];
id2loc.push(o);
//
o = {};
o.abbr = "BmG";
o.name = "Blooming Glade";
o.ids = [10,11,12,14,13,27,30,31];
id2loc.push(o);
//
o = {};
o.abbr = "SlH";
o.name = "Silent Hill";
o.ids = [15,16,17,44,18,19,28,32,35];
id2loc.push(o);
//
o = {};
o.abbr = "EsB";
o.name = "East Bay";
o.ids = [20,41,21,22,29,36,37,38,42,43,54];
id2loc.push(o);
//
o = {};
o.abbr = "MsC";
o.name = "Misty Coast";
o.ids = [50];
id2loc.push(o);
//
o = {};
o.abbr = "RdH";
o.name = "Ridge of Hope";
o.ids = [];
id2loc.push(o);
//


//				
if(url_cur.indexOf("/objectworkers.php") != -1){
	recordWorkTime();
	
}else{
	makeLinks();
	addPanel();
}
//

// =====
function recordWorkTime(){
		//alert("recordWorkTime()");
	//return;
	
	var obj_id = getUrlParam("id");
		//alert("obj_id = "+obj_id);
	
	var all_td = document.getElementsByTagName('td');
		//alert("found " + all_td.length + "  TD elements!");
	var link2pages = "objectworkers.php?";
	//
	// 26-06-08 11:00: (15)
	var wtime_regexp = /(\d+)-(\d+)-(\d+) (\d+):(\d+): \((\d+)\)/ ; // time in protocol
	var vt_regexp;
	var vtR;
	var vt_arr;
	//
	var s_parts;
	var header;
	var line_1;
	var ta;
	var new_time;
	var ts = ""; // for debug
	
	var my_td;
	var s="";
	for (var i = 0; i < all_td.length; i++) {
		my_td = all_td[i];
		if(my_td.innerHTML.indexOf(link2pages) != -1 ){ 
			//my_td.style.backgroundColor = "#cccccc";
			//my_td.innerHTML = "Original content replaced";
			
			s = my_td.innerHTML ;
			// split to header and content
			s_parts = s.split("</a></center>");
			//var header = s_parts[0] + "</a></center>" + s_parts[1] + "</a></center>";
			header = s_parts[0];
				//alert("header = "+header);
			line_1 = s_parts[1].split("<nobr>&nbsp;&nbsp;")[1];	
				//alert("line_1 = "+line_1);
				
			ta = wtime_regexp.exec( line_1 ) ;
				//alert("time = "+ta[4]+":"+ta[5]);
			
			new_time = obj_id+"_"+ta[5] ;
			if(times_str.indexOf("|"+obj_id+"_")==-1){ // very 1st visit
				times_str += "|"+new_time;				
			}else{
				vt_regexp = obj_id+ "_\(\\d\{2\}\)";
				vtR = new RegExp( vt_regexp );
				times_str = times_str.replace(vtR, new_time);
				//ts = times_str.replace(vtR, new_time);
				//ts += times_str.search(vtR);			
			}
	
			GM_setValue("lwm_ecost_adv_times", times_str );
			//GM_setValue("lwm_ecost_adv_times", "" ); // to clear var
			
			break;
		} 	
	}
	
	//alert("ts = "+ts);
	
}


function makeLinks(){
	var a_all = document.getElementsByTagName( 'a' ) ;
	var el;
	var sa;
	var loc;
	var loc_data;
	var ts = "";
	var ids_passed_str = "";
	var my_row;
	var rn = 0;
	var row_count = 0;
	//
	var vt_regexp;
	var vtR;
	var vt_arr = [];
	var id_regexp = /object-info.php\?id=(\d+)/ ;
	var my_id;
	var t_min;
	var target_hr;
	var target_time ;
	//
	for (var i=0; i < a_all.length; i++){
		el = a_all[i];
		if (el.href.indexOf('/object-info.php?') ==-1){continue;}
		
		ts = "_"+el.href.split('/object-info.php?')[1] + "_";
			//alert("ts = "+ts);
		if (ids_passed_str.indexOf(ts) != -1){continue;} //workaround for last cell on map page (>>>)
		ids_passed_str += ts;
		//
		target_time = "n/a";		
		my_id = id_regexp.exec(el.href)[1];
		if(times_str.indexOf("|"+my_id+"_")!=-1){ 
				//alert("my_id = "+my_id);
			vt_regexp = my_id+ "_\(\\d\{2\}\)";
			vtR = new RegExp( vt_regexp );
			vt_arr = vtR.exec(times_str);
			//t_min = vt_arr.length? vtR.exec(times_str)[1] : "00"; // ?
			t_min = vt_arr.length? vt_arr[1] : "00"; // ?
				//alert("t_min = "+t_min);
			target_hr = (t_min > curMin)? curHour : curHour+1;
			target_hr = (target_hr==24)? "00" : target_hr;
			target_time = target_hr +":"+ t_min;
		}
		//
		sa = document.createElement( 'a' );
		sa.href = el.href.replace("object-info", "objectworkers");
		sa.target = "obj_w_iframe";
		//sa.innerHTML = '&nbsp;&nbsp;&nbsp;<b>[#]</b>';
		sa.style.fontSize = "11px";
		//sa.innerHTML = '&nbsp;&nbsp;<b>[00:00]</b>';	
		sa.innerHTML = "&nbsp;&nbsp;<b>[" +target_time+ "]</b>";	
		if(!isMercenary){
			el.parentNode.insertBefore(sa, el.nextSibling);
		}
		//
		
		if(isEcostat ){ // add location only in ecostat page
			loc_data = getLocData(my_id);
			loc = document.createElement( 'a' );
			loc.href = "javascript:void(0);";
			loc.title = loc_data.name;
			//loc.title = "Hint here X";
			//loc.innerHTML = "&nbsp;&nbsp;&nbsp;XXX";	
			loc.innerHTML = "&nbsp;&nbsp;&nbsp;" +loc_data.abbr;	
			el.parentNode.insertBefore(loc, sa.nextSibling);
		}
		if(isMercenary ){ // add location only in Mercenary Guild page
			loc_data = getLocData(my_id);
			loc = document.createElement( 'a' );
			loc.href = "javascript:void(0);";
			loc.title = loc_data.name;
			//loc.title = "Hint here X";
			//loc.innerHTML = "&nbsp;&nbsp;&nbsp;XXX";	
			loc.innerHTML = "&nbsp;&nbsp;&nbsp;<b>[ " +loc_data.abbr+ "] </b>";	
			el.parentNode.insertBefore(loc, el.nextSibling);
		}
		
		if(row_count%2 && isEcostat){
			my_row = el.parentNode.parentNode;
			for(rn=0; rn<my_row.childNodes.length; rn++){
				my_row.childNodes[rn].style.backgroundColor = "#fff";
			}
			//el.parentNode.style.backgroundColor = "#eee";
		}		
		row_count++;
		
	}
		//alert("ids_passed_str = "+ids_passed_str);
}


function getLocData( n ){
	var loc_data = {};
	loc_data.abbr = "n/a";
	loc_data.name = "New Loc?";
	//
	var o; 
	var ids_str;
	for(var i=0; i<id2loc.length; i++){
		o = id2loc[i];
		ids_str = "_" +o.ids.join("_")+ "_";
		if(ids_str.indexOf("_"+n+"_") != -1){
			loc_data = o;		
		}	
	}
	//
	return loc_data;
	//
}


function addPanel(){
		//alert("addPanel");
	var d = document.createElement( 'div' );
	//
	var isMap = (url_cur.indexOf("/map.php") != -1);
	var style_str = isMap? 'style="margin:20px 0 0 100px; "' : 'style="position:absolute; top:600px; left:auto; "';
	d.innerHTML = 
'<table width="500" border="0" align="left" cellpadding="0" cellspacing="0" '+style_str+' background="">'+
'<tr><td>'+

'<iframe width="100%" height="80" name="obj_w_iframe" id="obj_w_iframe" '+
'frameBorder="0" frameSpacing="0" marginWidth="0" marginHeight="0" src="" ></iframe>'+

'</td></tr></table>' ;
	
	document.body.appendChild( d ) ;
	
	//
	document.getElementById('obj_w_iframe').addEventListener( "load", objIframeLoaded , false );
	
}


function objIframeLoaded(){
		//alert("objIframeLoaded");
	var my_iframe = document.getElementById('obj_w_iframe');
	//
	my_iframe.contentWindow.scrollTo(0, 180);
		
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

// =========================
