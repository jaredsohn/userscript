// ==UserScript==
// @name           HWM_Ecostat_ADV
// @description    HWM mod - Ecostat_ADV
// @version    0.1.3
// @include        http://www.heroeswm.ru/map.php*
// @include        http://www.heroeswm.ru/ecostat_details.php*
// @include        http://www.heroeswm.ru/objectworkers.php*
// @include        http://www.heroeswm.ru/mercenary_guild.php*
// ==/UserScript==


var url_cur = location.href ;
var curDate = new Date();
var curHour = curDate.getHours();
var curMin = curDate.getMinutes();
	//alert("curDate = "+curDate+"\n time = "+curHour+":"+curMin);

var isEcostat = (url_cur.indexOf("/ecostat_details.php") != -1);
var isMercenary =  (url_cur.indexOf("/mercenary_guild.php") != -1);
	//alert("isMercenary = "+isMercenary);
	

var times_str = GM_getValue("hwm_ecost_adv_times", "")
//var times_arr = times_str.split("|");
	//alert("times_str = "+times_str);
	

// =========== ID - Location lookup table =====
var id2loc = [];
var o;
	// == create objects with loc info
o = {};
o.abbr = "EmC";
o.name = "Empire Capital";
o.ids = [3,4,5,6,7,8,9,10,11,12,32,34,38];
id2loc.push(o);
//
o = {};
o.abbr = "EsR";
o.name = "East River";
o.ids = [23,24,25,26,33,36,75,87,89];
id2loc.push(o);
//
o = {};
o.abbr = "PoR";
o.name = "Portal's Ruins";
o.ids = [92,93,99,100,102,118,163];
id2loc.push(o);
//
o = {};
o.abbr = "WoD";
o.name = "Wolf's Dale";
o.ids = [43,44,45,46,47,48,74,85,86];
id2loc.push(o);
//
o = {};
o.abbr = "LzL";
o.name = "Lizard's Lowland";
o.ids = [56,57,58,59,60,61,63,64,80,83];
id2loc.push(o);
//
o = {};
o.abbr = "GrW";
o.name = "Green Wood";
o.ids = [67,68,69,70,71,72,76,77,81,88];
id2loc.push(o);
//
o = {};
o.abbr = "SnC";
o.name = "Sunny City";
o.ids = [103,104,105,106,107,115,116];
id2loc.push(o);
//
o = {};
o.abbr = "ShS";
o.name = "Shining Spring";
o.ids = [108,109,110,111,112,113,114,117];
id2loc.push(o);
//
o = {};
o.abbr = "EgN";
o.name = "Eagle's Nest";
o.ids = [94,95,97,98,101,119,120,139,140];
id2loc.push(o);
//
o = {};
o.abbr = "PcC";
o.name = "Peaceful Camp";
o.ids = [49,50,51,52,53,54,55,73,79,82,141];
id2loc.push(o);
//
o = {};
o.abbr = "TgL";
o.name = "Tiger's Lake";
o.ids = [13,14,15,16,27,31,35,39,84];
id2loc.push(o);
//
o = {};
o.abbr = "RgW";
o.name = "Rogue's Wood";
o.ids = [18,19,20,21,22,29,30,37,78,90];
id2loc.push(o);
//
// ===== new 240709 =========
//
o = {};
o.abbr = "MgM";
o.name = "Magma Mines";
o.ids = [121,122,135,142,143,144,145];
id2loc.push(o);
//
o = {};
o.abbr = "BrM";
o.name = "Bear' Mountain";
o.ids = [123,124,125,136,146,147,148,149];
id2loc.push(o);
//
o = {};
o.abbr = "FrT";
o.name = "Fairy Trees";
o.ids = [126,127,134,150,151,152,153];
id2loc.push(o);
//
o = {};
o.abbr = "MfC";
o.name = "Mythril Coast";
o.ids = [128,129,130,137,138,154,155,156,157];
id2loc.push(o);
//
o = {};
o.abbr = "PrC";
o.name = "Port City";
o.ids = [131,132,133,158,159,160,161,162];
id2loc.push(o);


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
	
			GM_setValue("hwm_ecost_adv_times", times_str );
			//GM_setValue("hwm_ecost_adv_times", "" ); // to clear var
			
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
		
		ts = "_"+el.href.split('/object-info.php?')[1]+"_";
			//alert("ts = "+ts);
		if (ids_passed_str.indexOf(ts) != -1){continue;} //workaround for last cell on map page (>>>)
		ids_passed_str += ts;
		//
		target_time = "n/a";		
		my_id = id_regexp.exec(el.href)[1];
			//alert("my_id = "+my_id);
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
			//loc.title = "Wolf's Dale";
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
			//loc.title = "Wolf's Dale";
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
	//var style_str = isMap? 'style="position:absolute; top:600px; right:20px; "' : 'style="position:absolute; top:600px; left:auto; "';
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
