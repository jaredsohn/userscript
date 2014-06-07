// ==UserScript==
// @name           test
// @author         KJ
// @description    tool
// @credits        Original Script by PS
// ==/UserScript==





/**If the blueBar is found, unframes MW, else removes the horrid white Zbar after 5 seconds**/
if(document.getElementById('blueBar')) {
		window.location.href = document.getElementsByClassName('canvas_iframe_util')[0].src;
	return;
}

else{
	setTimeout('RZ()',5000);
}

function RZ(){
	
/**Used to remove the Z bar, but no longer seems to work**/
/*
	var div = document.getElementsByTagName('div');
	var zbar = div[0].style.backgroundColor == '#fff'.height == '85px'.padding == '0'.margin == '0';
	if(zbar){
		div[0].style.height = '0px';
	}
	if(document.getElementById('snapi_zbar')){
	document.getElementById('snapi_zbar').innerHTML = '';
	}
*/

/**Removes the new Zbar 28/1/2011**/
	var zbar = document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);
}

/**Initially a good idea, subsequently not quite so much**/
/*
function readCookieStuff() {
		try {
			var a = readCookie('PS_MWE');
			if (a == null || (/undefined/.test(a))) {
				alert('No cookie found');
				return;
			}
			a = a.split('|');
			BM1 = a[0];
			BM2 = a[1];
			alert('Cookie found!!!!\nContents:\na[0]: '+a[0]+'\n\na[1]:'+a[1]);
		} catch(err) {}
	}

function readCookie(a) {
	var i, cookie, nameEQ = a + "=",
	cookieArray = document.cookie.split(";");
	for (i = 0; i < cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
		if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length)
	}
	return 
}
*/

/**GLOBAL VARS**/
var a;
var BkBtn;
var City;
var innerPageElt; 
/**END GLOBAL VARS**/


/**This is the content for the left hand frame**/
var MWETB = 
	'<style type="text/css">html { overflow-y: auto !important }'+
	'#FloatBox {display: inline;position:fixed;max-width: 230px;top: 5px;left: 13px;z-index: 100;'+
	'border:1px dotted #666666;background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/empire/bg_dotmatrix_760x1500.gif);background-repeat: repeat;height: 98%;background-color: #0'+
	'00000;margin:0px;min-height: 650px;}'+
	'#QL {position: absolute; top: 55px;left:8px;z-index: 1000;}'+
	'#EH {position: absolute; top: 55px;right: 8px;z-index: 1000;}'+
	'#logo {position: absolute; top: 4px; left: 1px;z-index: 1000;}'+
	'#QBBx {position: relative; bottom: -400px; left: 2px;}'+
	'#QBBtn {position: relative; bottom: -8px; left: 2px;}'+
	'#HltImg {position: relative; top: -3px; left: 1px;}'+
	'#HltTxt {position: relative; top: -4px; left: -1px;}'+
	'#HdrImg {position: absolute; top: -1px; left: -1px;z-index: 100;}'+
	'#travel {position: relative; bottom: 18px; left: -3px;z-index: 100;}'+
	'#traveltxt {position: relative; bottom: 6px; left: 4px;}</style>'+
	'<table id="FloatBox" border=0>'+
	'<td colspan="200"><img id="logo" src="http://www.playerscripts.co.uk/images/mwe_graphics/ps-mwe_003.png">'+
	'<img height="111" width="232" id="HdrImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png">'+
	'<div style="width: 213px;margin: top: 10px;height: 37px;font-size: 14px;" class="clearfix empire_module_title"></div>'+
	'<div style="width: 214px;margin: top: 10px;height: 24px;font-size: 14px;" class="clearfix empire_module_title">'+
	'<a href="#" id="QL" class="sexy_button_new black"><span><span>Quicklinks</span></span></a>'+
	'<a href="#" id="EH" class="sexy_button_new black"><span><span>Enhancers</span></span></a></div><br>'+
	'<div id="travel" style="width: 221px; height: 14px;font-size: 9px;" class="clearfix empire_module_title">'+
	'<div id="traveltxt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="white">Travel to:&nbsp;&nbsp;&nbsp;&nbsp;</font>'+
	'<a onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=1&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">NY</a><strong><em><font color="white">|</font></strong></em>'+
	'<a onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=2&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">Cu</a><strong><em><font color="white">|</font></strong></em>'+
	'<a onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=3&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">Mo</a><strong><em><font color="white">|</font></strong></em>'+
	'<a onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=4&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">Bk</a><strong><em><font color="white">|</font></strong></em>'+
	'<a onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=5&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">LV</a><strong><em><font color="white">|</font></strong></em>'+
	'<a onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=6&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">It</a>'+
	'</div></div>'+
	'<div id="PSMWE_content"></div>'+
	'<div id="QBBx" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 130px;width:218px;"><center>'+
	'<div id="QBBtn"><a href="#" onclick="do_ajax(\'TopField\', \'remote/html_server.php?xw_controller=hospital&xw_action=heal\')" class="sexy_button_new short black">'+
	'<span><span><img id="HltImg" src="http://www.playerscripts.com/images/mwap_graphics/MWAP_RT_STATS/health.gif">'+
	'&nbsp;&nbsp;<font id="HltTxt">QuickHeal&nbsp;&nbsp;&nbsp;&nbsp;</font></span></span></a><br><br>'+
	'<a href="#" class="sexy_button_new"><span><span><div id="QB" class="sexy_new_york_cash">'+
	'QuickBank&nbsp;&nbsp;&nbsp;&nbsp;</div></span></span></a><BR><BR>'+
	'<a href="#" class="sexy_button_new"><span><span><div id="QC" '+
	'onclick="do_ajax(\'\',\'remote/html_server.php?xw_controller=propertyV2&xw_action=collectall\');"'+
	'class="sexy_new_york_cash">QuickCollect</div></span></span></a>'+
	'<br><br><br><br></center></div></div></tr></table>';

/**This is the quicklinks for the left hand frame**/
var QLCnt=
	'<div>'+
	'<style type="text/css">#QLCont {position: absolute; top: 111px; left: -1px}'+
	'#BLHdr {position: absolute; top: 111px; left: -1px}'+
	'#QLBx {position: absolute; top: 43px; left: 6px}'+
	'#BLLnks {position: absolute; top: 158px; left: 6px}</style>'+
	'<div id="QLCont">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>Quicklinks</b><br></div>'+
	'<div id="QLBx" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 55px;width:218px;">'+
	'&nbsp;<a title="Click to visit the fight club page." onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=marketplace&xw_action=view&category=8\', 1, 0)">Fight Club</a>'+
	'<br>&nbsp;<a title="Click to visit trader Goh\'s pawn shop." onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=marketplace&xw_action=view&category=12\', 1, 0)">Trader Goh\'s Pawn Shop</a>'+
	'<br>&nbsp;<a title="Click to visit the loyaly program page." onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=marketplace&xw_action=view&category=10\', 1, 0)">Loyalty Program</a>'+	
	'</div>'+
	'<br><br><div id="BLHdr" style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>Bonus Links</b></div>'+
	'<div id="BLLnks" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 73px;width:218px;">'+
	'&nbsp;<a target="_blank" title="2 RP - 100 XP - Stam Refill - Crappy Loot" href="http://www.facebook.com/topic.php?uid=131902633521767&topic=407">E-Mail Bonus</a>'+
	'<br>&nbsp;<a target="_blank" title="Potentially 3 free slot spins" href="http://apps.facebook.com/inthemafia/track.php?next_controller=index&next_action=view&zy_track=feed&sendkey=a&ztrack_category=win_slot&next_params={%22playslots%22:%221%22,%22fromminifeed%22:%221%22,%22wins%22:%222%22,%22user_id%22:%22p|0%22}">Free Slots</a>'+
	'<br>&nbsp;<a target="_blank" title="150 XP - V$" href="http://m.mafiawars.com/mobileweb">Atlantic City Bonus</a>'+
	'<br>&nbsp;<a target="_blank" title="200 Energy - 200 Stamina - 25% Energy refill" href="http://toolbar.zynga.com/click.php?to=mwgamestatsplaynow\">MiniPack</a>'+
	'<br><br><div style="font-size: 12px;"><i><center><u>ALL</u> bonus links open in a new <br>window / tab<center></i></div>'+
	'</div>'+
	'</div>'+
	'</div>';
	
/**This is the enhancers for the left hand frame**/
var EHCnt=
	'<div>'+
	'<style type="text/css">#EHCont {position: absolute; top: 111px; left: -1px}'+
	'#EHBx1 {position: relative; top: 6px; left: 6px}'+
	'#EHBx2 {position: relative; top: 8px; left: 6px}'+
	'#EHBx3 {position: relative; top: 8px; left: 6px}'+
	'</style>'+
	'<div id="EHCont">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>Fighting</b><br></div>'+
	'<div id="EHBx1" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 72px;width:218px;">'+
	'&nbsp;<a id="IceOpp" title="">Ice Opponent</a>'+
	'<br>&nbsp;<a onclick="" title="">2</a>'+
	'<br>&nbsp;<a onclick="" title="">3</a>'+
	'<br>&nbsp;<a onclick="" title="">4</a>'+
	'</div><br>'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>Robbing</b><br></div>'+
	'<div id="EHBx2" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 72px;width:218px;">'+
	'&nbsp;<a onclick="" title="">A</a>'+
	'<br>&nbsp;<a onclick="" title="">B</a>'+
	'<br>&nbsp;<a onclick="" title="">C</a>'+
	'<br>&nbsp;<a onclick="" title="">D</a>'+
	'</div><br>'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>General Purpose</b><br></div>'+
	'<div id="EHBx3" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 72px;width:218px;">'+
	'&nbsp;Skill Spender:&nbsp;&nbsp;<a id="SSX">Allocate X SP</a>'+
	'<br>&nbsp;<a onclick="" title="">B2</a>'+
	'<br>&nbsp;<a onclick="" title="">C3</a>'+
	'<br>&nbsp;<a onclick="" title="">D4</a>'+
	'</div></div>'+
	'</div>';
	
/**This is the content for the right hand frame**/
var MWETB2 = 
	'<style type="text/css">html { overflow-y: auto !important }'+
	'#FloatBox2 {display: inline;position:fixed;max-width: 230px;top: 5px;left: 1018px;z-index: 100;border:'+
	'1px dotted #666666;background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/empire/bg_dotmatrix_760x1500.gif);background-repeat: repeat;height: 98%;background-color: #000000;margin:0px;min-height: 650px;}'+
	'#LOG {position: absolute; top: 55px;left: 50px;z-index: 1000;}'+
	'#BMBAY {position: absolute; top: 55px;right: 50px;z-index: 1000;}'+
	'#LogOp {position: relative; bottom: 18px; left: -4px;z-index: 1000;}'+
	'#LogOptxt {position: relative; bottom: 6px; left: 6px;z-index: 1000;}'+
	'#logo {position: absolute; top: 4px; left: 1px;z-index: 1000;}'+
	'#HdrImg2 {position: absolute; top: -1px; left: -1px;z-index: 100;}'+
	'#StBx {position: absolute; top: 587px; left: 5px;}'+
	'#StHr {position: absolute; top: 545px; left: -1px;}</style>'+
	'<table id="FloatBox2" border=0>'+
	'<td colspan="200"><img id="logo" src="http://www.playerscripts.co.uk/images/mwe_graphics/ps-mwe_003.png">'+
	'<img height="111" width="232" id="HdrImg2" src="http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png">'+
	'<div style="width: 213px;margin: top: 10px;height: 37px;font-size: 14px;" class="clearfix empire_module_title"></div>'+
	'<div style="width: 214px;margin: top: 10px;height: 24px;font-size: 14px;" class="clearfix empire_module_title">'+
	'<a href="#" id="LOG" class="sexy_button_new black"><span><span>Log</span></span></a>'+
	'<a href="#" id="BMBAY" class="sexy_button_new black"><span><span>????</span></span></a></div><br>'+
	'<div id="LogOp" style="width: 222px; height: 14px;font-size: 9px;" class="clearfix empire_module_title">'+
	'<div id="LogOptxt">&nbsp;Clear Log<strong><em><font color="white"> - </font></strong></em>'+
	'Clear Stats<strong><em><font color="white"> - </font></strong></em>Clear Yard'+
	'</div></div>'+
	'<div id="PSMWE_content2"></div>'+
	'<div id="StHr" style="width: 222px;margin: top: 10px;height: 25px;font-size: 14px;" class="clearfix empire_module_title">Stats</div>'+
	'<div id="StBx" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 78px;width:218px;"><table border="1">'+
	'<td align="left">Fights</td><td align="center">Robs</td><td align="right">Hits</td>'+
	'<tr><td>Won</td></tr>'+
	
	'</table></div>'+
	'</tr></table>';
	
/**This is the log for the right hand frame**/
var Log =
	'<style type="text/css">#log {position: absolute; top: 111px; left: -1px}'+
	'#LgBx {position: absolute; top: 45px; left: 6px}</style>'+
	'<div id="log">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>Log</b></div>'+
	'<div id="LgBx" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 380px;width:218px;">This will be where the log entries appear</div>'+
	'</div>';
	
/**This is the unknown content for the right hand frame**/
var bmbay =
	'<style type="text/css">#BMBayC {position: absolute; top: 111px; left: -1px}'+
	'#BMBayBx {position: absolute; top: 45px; left: 6px}'+
	'#BMHR {position: relative; top: 348px; left: 0px;}</style>'+
	'<div id="BMBayC">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>????</b></div>'+
	'<div id="BMBayBx" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 380px;width:218px;">'+
	'<hr size="1" width="217" id="BMHR">'+
	'</div>'+
	
	
	
	
	
	
	'</div>';
	
/**This is where the script initializes the menus, populates the vacant 
DIVs with content and then checks for the bookmarklet storage cookie**/	

LoadMWETB();
QL();
LoadMWETB2();
LOG();
/*readCookieStuff()*/

/**This loads the left hand pane**/
function LoadMWETB(){
		var PSMWE_div=document.createElement("div");
			PSMWE_div.id = 'PSMWE_div';			
			var content=document.getElementById('final_wrapper');
			content.appendChild(PSMWE_div);
			PSMWE_div.innerHTML = MWETB;
      document.getElementById('QL').addEventListener('click', QL, false);
      document.getElementById('EH').addEventListener('click', EH, false);
	  document.getElementById('QB').addEventListener('click', QuikBank, false);    
}

/**This loads the right hand pane**/
function LoadMWETB2(){
		var PSMWE_div2=document.createElement("div");
			PSMWE_div2.id = 'PSMWE_div2';			
			var content=document.getElementById('final_wrapper');
			content.appendChild(PSMWE_div2);
			PSMWE_div2.innerHTML = MWETB2; 
			document.getElementById('LOG').addEventListener('click', LOG, false);
			document.getElementById('BMBAY').addEventListener('click', BMBay, false);
}

/**This is currently obsolete, should still work though**/
function CloseMWETB() {
		var close=document.getElementById("final_wrapper").removeChild(document.getElementById("PSMWE_div"));
}

function xpathFirst(p, c) {
		var xP = document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
	
/**This empties the PSMWE_content DIV in left hand pane and replaces it with the quicklink content**/
function QL(){
		var content = document.getElementById("PSMWE_content");
		content.innerHTML = QLCnt;    
}
	
/**This empties the PSMWE_content DIV in left hand pane and replaces it with the enhancer content**/	
function EH(){ 
		var content = document.getElementById("PSMWE_content");
		content.innerHTML = EHCnt;
		document.getElementById('IceOpp').addEventListener('click', IceOpp, false);
		document.getElementById('SSX').addEventListener('click', SPAll, false);
}

/**This empties the PSMWE_content2 DIV in right hand pane and replaces it with the log content**/
function LOG(){
		var content = document.getElementById("PSMWE_content2");
		content.innerHTML = Log;    
}

/**This empties the PSMWE_content2 DIV in right hand pane and replaces it with the unknown content**/
function BMBay(){
		var content = document.getElementById("PSMWE_content2");
		content.innerHTML = bmbay;    
}

/**This function checks the current city**/
function CurCity(){
	
	City = document.getElementById("buyframe_link_cover_anim").getAttribute("onclick");
	City = (/.+xw_city=([\d]+)/.exec(City))[1];
		return City;
}			

/**This function will eventually check the current city, 
and then build the appropriate link to deposit all cash**/
function QuikBank(){
	City='0';
	CurCity();
	
	if(City==5){
	
		alert('You are in Las Vegas');
	
	}
	
	else if(City==1||2||3||4||6){
	
		alert('You are in city: '+City);
	
	}

}
	
/**This function will allocate skillpoints at some point**/
function SPAll(){
	var skills=prompt('How many skills should I allocate?');
	var skill=prompt('Should I allocate the '+skills+' skill points to:\n\n[A]ttack\n[D]efence'+
	'\n[E]nergy\n[S]tamina\n[H]ealth');
	switch(skill){
		case 'A':
		skill = 'attack';
		break;
		case 'D':
		skill = 'defence';
		break;
		case 'E':
		skill = 'energy';
		break;
		case 'S':
		skill = 'stamina';
		break;
		case 'H':
		skill = 'health';
		break;
		case 'a':
		skill = 'attack';
		break;
		case 'd':
		skill = 'defence';
		break;
		case 'e':
		skill = 'energy';
		break;
		case 's':
		skill = 'stamina';
		break;
		case 'h':
		skill = 'health';
		break;
		default:
		alert('You did not select a valid skill to assign your skill points to, \nplease try again.');
	}
	
}