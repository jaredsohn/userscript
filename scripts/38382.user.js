// ==UserScript==
// @name          HWM_Skills_At_Home
// @description   HWM mod - Skills_At_Homepage
// @include        http://www.heroeswm.ru/home.php
// ==/UserScript==

// === v 0.1 ========

//alert("HWM_Skills_At_Home");	

// =========== SETTINGS ============
// set variable below to "yes" to enable scrollbars
var my_skills_scroll = "no";

var iframe_width = 250;
var iframe_height = 330;// need height=330 for 5 skill groups

var scroll_top = 630;
var scroll_left = 630;

// ==================================





var all_li_subnav = document.evaluate("//li[@class='subnav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var my_li;
var prev_elm;
// get player ID
my_li = all_li_subnav.snapshotItem(5);
prev_elm = my_li.childNodes[1].childNodes[1];
	//
var ptrn = /<a href="pl_hunter_stat\.php\?id=(.*)">(.*)<\/a>/;
var player_id = prev_elm.innerHTML.replace(ptrn, "$1")
		//alert("player_id = "+player_id);
//
var my_profile_url = "http://www.heroeswm.ru/pl_info.php?id="+player_id;


addPanel();



function addPanel(){
		//alert("addPanel");
	//	create DIV with iframe
	var d = document.createElement( 'div' );
	//d.style.marginLeft = 150;
	//
	
	d.innerHTML = 
'<iframe width="'+iframe_width+'" height="'+iframe_height+'" name="skills_iframe" id="skills_iframe" '+
'frameBorder="0" frameSpacing="0" marginWidth="0" marginHeight="0" scrolling="'+my_skills_scroll+'" src="'+my_profile_url+'" ></iframe>';

	
	var combat_lvl_str = "\u0411\u043E\u0435\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C";
	var all_td = document.getElementsByTagName('td');
	var td_len = all_td.length;
	var my_td;
	for (var i = 0; i < td_len; i++) {
		my_td = all_td[i];
		if(my_td.innerHTML.indexOf("<td") != -1 ){ continue; } // has child TDs
		if(my_td.innerHTML.indexOf(combat_lvl_str) != -1 ){
			//alert("my_td.innerHTML = "+my_td.innerHTML);
			break;
		}
		
	}
	
	my_td.appendChild( d ) ;
	
	//document.body.appendChild( d ) ;
	
	//
	document.getElementById('skills_iframe').addEventListener( "load", smsIframeLoaded , false );
	
}


function smsIframeLoaded(){
		//alert("smsIframeLoaded");
	var my_iframe = document.getElementById('skills_iframe');
	//
	//my_iframe.contentWindow.scrollTo(630, 630);
	my_iframe.contentWindow.scrollTo(scroll_left, scroll_top);
		
}





//
