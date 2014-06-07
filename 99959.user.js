// ==UserScript==
// @name almost
// @author bororor
// ==/UserScript==
/**
* This program is copyright PlayerScripts.com, a division of TinHat Software Ltd.
* We grant you a licence for personal, private and non-commercial use only.
* Please refer to playerscripts.com for further information.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/
// @version     1.0.12.b
javascript: (function () {
if (document.getElementById('blueBar')) {
		//Credits to Christopher(?) for this new fix (and Spockholm)
		// Load the iframe

  //Thanks to spockholm & 'Chris' for the unframe code
  for (var i = 0; i < document.forms.length; i++) {
    if (document.forms[i].action.indexOf('index2.php')!=-1) {
       document.forms[i].target = '';
       document.forms[i].submit();
       return false;
    }
  }
}

/**GLOBAL VARS**/
var PS_MWE_VER = '1.0.12.b';
var a;
var i;
var J;
var T;
var y;
var HL1;
var HL0; 
var HIT;
var FIT;
var url;
var name;
var send;
var city;
var from;
var heal=0;
var jobs=0;
var ices=0;
var FtrN;
var HLBS;
var FLBS;
var Slot;
var kills=0;
var skill;
var Fpage;
var XPRet;
var robsL=0;
var robsW=0;
var BkBtn;
var Slot0;
var Slot1;
var Slot2;
var Slot3;
var Slot4;
var Slot5;
var Slot6;
var Slot7;
var Slot8;
var FLFun;
var HLFun;
var RPcent;
var IceCou;
var xw_sig;
var CurNRG;
var XP2Lvl;
var NRGSpe;
var skills;
var PC2End;
var CurHea;
var AH = 0;
var xw_user;
var fightsL=0;
var fightsW=0;
var content;
var CurCASH;
var Rboards=0;
var m_names;
var Outcome;
var CASHRet;
var CurStam;
var FtrName;
var KillCou;
var FLResult;
var robsWInt=0;
var robsLInt=0;
var Autoheal;
var HLResult;
var opponent;
var bounties=0;
var response;
var OPT = '0';
var L1 = true;
var fightWInt=0;
var fightLInt=0;
var maxHealth;
var L2 = false;
var HLLootGain;
var RobCount;
var HLinterval;
var FLinterval;
var FLLootGain;
var LVItNoDelay;
var currentTime;
var MWE_Log = '';
var innerPageElt; 
var DoAutoHealInt;
var RobXPGain = 0;
var MWE_Log2 = '';
var timestampdate;
var timestamptime;
var IsHeal = false;
var EDebug = false;
var RobBoardWin = 0;
var RobBoardLoss = 0;
var gender = 'their';
var CraftResponseInt;
var StamCostTotal = 0 ;
var LVItNoDelayState = false;
var brags = [];
var page = document.getElementsByTagName('html')[0].innerHTML;
var CurStam = document.getElementById('user_stamina').innerHTML;
var CurHealth = document.getElementById('user_health').innerHTML;
var isiPad = navigator.userAgent.match(/iPad/i) != null;
var OperationButton;
var OperationPerCent;
var OS;
var LastHitId;
var OpponentId;
var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var lastlivelink = 0;
var livelink;
var LiveLinkOption=false;
var LiveLinkFeedInt;
var LiveLinkState;
var Link_Log = '';
var livelinkenc;
var LoggedIn=false;
var LLKey='anonymous';
var LLPass;
var FLToggle = false;
var LiveLinkToggle = false;
/**END GLOBAL VARS**/
var MWEHomeCraftModule = '<div class="clearfix" style="clear: both;">'+
	'<div id="BuildCollectModule" style="width: 450px; height: 42px">'+
	'<div id="BuildCollectModule" class="clearfix empire_module_title"><div style="float: left;"><span>Build Your Empire</span></div>'+
	'<div style="float: right; margin-right: 5px; margin-top: -3px;"><div id="bcm_collectAllButton" style="display: block;">'+
	'<a href="#" onclick="$(\'#bcm_collectAllButton\').css(\'display\',\'none\');do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=module&amp;xw_action=collectAllSecretDrop\', 1, 0); do_ajax(\'bye_view_overlay\',\'remote/html_server.php?xw_controller=module&amp;xw_action=collectAllParts\', 1, 0); return false;" class="sexy_button_new short green" style="text-transform: none;">'+
	'<span><span>Collect All Parts</span></span></a></div>'+
	'<div id="bcm_timer" style="display: none; margin: 6px 0 0; font-weight: bold; color: #FFF; text-transform: none; font-size: 14px;">'+
	'Collect parts in:<span id="bcm_timer_countdown" class="bad"></span></div></div></div></div></div><br>'+
	'<a href="#" style="position:relative;top:40px;right:-260px;" onclick="do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=PropertyV2&amp;xw_action=open_chop_pop&amp;xw_city=1&amp;building_type=11&amp;city_id=1&amp;skip_initial=1&amp;module=empire\', 1, 0); return false;" class="bmod_current_bbutton sexy_button_new sexy_upgrade_new short white">'+
	'<span><span>Upgrade</span></span></a><div class="slide_header_img" style="zoom:105%;">'+
	'<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/property_header_chopshop_01.png" style="position:relative;left:-5px;"><div id="bye_ChopShop_build_timer_cont" class="slide_header_img_timer" style="display: block; position:relative;left:90px;top:-40px;"><a href="#" onclick="do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=PropertyV2&amp;xw_action=open_chop_crafting&amp;building_type=11&amp;module=empire\', 1, 0); return false;" style="text-decoration: underline;">Next build:</a><span id="bye_ChopShop_build_timer" class="bad" style="margin: 0 0 0 5px;">Ready!</span></div>'+
	'<div id="bye_ChopShop_build_upgrade_cont" class="bye_ChopShop_slide_header_img_upgrade" style="display: none; "></div>'+
	'<script>startSlideTimer(\'bye_ChopShop_build_timer\', 62055, \'bye_ChopShop_build_upgrade\');</script></div>'+
	'<a href="#" style="position:relative;top:10px;right:-260px;" onclick="do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=PropertyV2&amp;xw_action=open_chop_pop&amp;xw_city=1&amp;building_type=12&amp;city_id=1&amp;skip_initial=1&amp;module=empire\', 1, 0); return false;" class="bmod_current_bbutton sexy_button_new sexy_upgrade_new short white">'+
	'<span><span>Upgrade</span></span></a><div class="slide_header_img" style="zoom:105%;position:relative; top:-30px">'+
	'<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/property_header_weapons_01.png" style="position:relative;top:0px;"><div id="bye_WeaponsDepot_build_timer_cont" class="slide_header_img_timer" style="display: block; position:relative;left:90px;top:-40px;"><a href="#" onclick="do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=PropertyV2&amp;xw_action=open_chop_crafting&amp;building_type=12&amp;module=empire\', 1, 0); return false;" style="text-decoration: underline;">Next build:</a><span id="bye_WeaponsDepot_build_timer" class="bad" style="margin: 0 0 0 5px;">Ready!</span></div>'+
	'<div id="bye_WeaponsDepot_build_upgrade_cont" class="bye_WeaponsDepot_slide_header_img_upgrade" style="display: none; "></div>'+
	'<script>startSlideTimer(\'bye_WeaponsDepot_build_timer\', 62043, \'bye_WeaponsDepot_build_upgrade\');</script></div>'+
	'<a href="#" style="position:relative;top:-20px;right:-260px;" onclick="do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=PropertyV2&amp;xw_action=open_chop_pop&amp;xw_city=1&amp;building_type=13&amp;city_id=1&amp;skip_initial=1&amp;module=empire\', 1, 0); return false;" class="bmod_current_bbutton sexy_button_new sexy_upgrade_new short white">'+
	'<span><span>Upgrade</span></span></a><div class="slide_header_img" style="zoom:105%;position:relative; top:-60px">'+
	'<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/property_header_armory_01.png" style="position:relative;left:-7px;"><div id="bye_Armory_build_timer_cont" class="slide_header_img_timer" style="display: block; position:relative;left:90px;top:-40px;"><a href="#" onclick="do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=PropertyV2&amp;xw_action=open_chop_crafting&amp;building_type=13&amp;module=empire\', 1, 0); return false;" style="text-decoration: underline;">Next build:</a><span id="bye_Armory_build_timer" class="bad" style="margin: 0 0 0 5px;">Ready!</span></div>'+
	'<div id="bye_Armory_build_upgrade_cont" class="bye_Armory_slide_header_img_upgrade"></div>'+
	'<script>startSlideTimer(\'bye_Armory_build_timer\', 23709, \'bye_Armory_build_upgrade\');</script></div>'+
	'<a href="#" style="position:relative;top:-50px;right:-260px;" onclick="do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=PropertyV2&amp;xw_action=open_chop_pop&amp;xw_city=1&amp;building_type=14&amp;city_id=1&amp;skip_initial=1&amp;module=empire\', 1, 0); return false;" class="bmod_current_bbutton sexy_button_new sexy_upgrade_new short white">'+
	'<span><span>Upgrade</span></span></a><div class="slide_header_img" style="zoom:105%;position:relative; top:-90px">' +
	'<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/property_header_zoo_01.png" style="position:relative;left:5px;"><div id="bye_PrivateZoo_build_timer_cont" class="slide_header_img_timer" style="display: block; position:relative;left:90px;top:-40px;"><a href="#" onclick="do_ajax(\'popup_fodder\',\'remote/html_server.php?xw_controller=PropertyV2&amp;xw_action=open_chop_crafting&amp;building_type=14&amp;module=empire\', 1, 0); return false;" style="text-decoration: underline;">Next build:</a><span id="bye_PrivateZoo_build_timer" class="bad" style="margin: 0 0 0 5px;">Ready!</span></div>'+
	'<div id="bye_PrivateZoo_build_upgrade_cont" class="bye_PrivateZoo_slide_header_img_upgrade"></div>'+
	'<script>startSlideTimer(\'bye_PrivateZoo_build_timer\', 23701, \'bye_PrivateZoo_build_upgrade\');</script>'+
	'</div>';

function MWE_Startup(){
	setTimeout(GetzRewardsInfo, 6500);
	setTimeout(RZ,7250);
	SetTitle();
	LoadMWETB();
	HOME();
	LoadMWETB2();
	LOG();
	GetXW();
	p('750');
	readCookieStuff();
	CheckScreenSize();
	setTimeout(RZ,12000);
}

function CheckScreenSize(){
	if((screen.width) == 1024){
		document.getElementById('verytop').setAttribute('style','zoom:80%');
		document.getElementById('level_bar_container').setAttribute('style','position:relative;top:-10px;');
		document.getElementById('user_level').setAttribute('style','position:relative;top:-10px;right:-20px;');
	}
	if((screen.width) == 800){
		document.getElementById('verytop').setAttribute('style','zoom:62%;');
	}
	if((screen.height) <= 767){
		document.getElementById('PSMWE_div').setAttribute('style','zoom:95%;');
		document.getElementById('PSMWE_div2').setAttribute('style','zoom:95%;');
	}
}

function GetzRewardsInfo(){
	var zRewards = document.getElementById("zbar_points").innerHTML;
	var zPointsPZ = (/&amp;pz=(.+)&amp;loc/.exec(zRewards))[1];
	var zPointsLoc = (/&amp;loc=(.+)&amp;hash/.exec(zRewards))[1];
	var zPointsHash = (/&amp;hash=(.+)" target/.exec(zRewards))[1];
	var zPointsURL = 'http://rewards.zynga.com?gid=43&pz='+zPointsPZ+'&loc='+zPointsLoc+'&hash='+zPointsHash;
	addToLog('Current zRewards status:<br>Level: <b>'+
	document.getElementsByClassName("zbar_ielevel")[0].innerHTML+'</b><br>zPoints: <b>'+
	document.getElementsByClassName("xp_val")[0].innerHTML+
	'</b><br>zCoins: <b><a title="Click me to visit zRewards" target="_blank" href="'+zPointsURL+'">'+
	document.getElementsByClassName("points_val")[0].innerHTML+'</b></a>');
}

function RZ(){
/**Removes the new Zbar 28/1/2011 & gets current Z Rewards status**/
	document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);
}

function MWE_Game_Styling(){
    var BGIMG;
	var MWC = document.getElementById('mw_city_wrapper').getAttribute('class');
	if(MWC == 'mw_city1'){BGIMG = 'http://mwfb.static.zgncdn.com/mwfb/graphics/mafia_wars_928x56_03.jpg';}
	else if(MWC == 'mw_city4'){BGIMG = 'http://mwfb.static.zgncdn.com/mwfb/graphics/mw_bangkok_header_760x56_03.gif';}
	else if(MWC == 'mw_city5'){BGIMG = 'http://mwfb.static.zgncdn.com/mwfb/graphics/vegas_header_760x56_01.gif';}
	else if(MWC == 'mw_city6'){BGIMG = 'http://mwfb.static.zgncdn.com/mwfb/graphics/italy_header_01.jpg';}
	else if(MWC == 'mw_city7'){BGIMG = 'http://mwfb.static.zgncdn.com/mwfb/graphics/brazil_header_01_beta.png';}
	document.getElementById('mw_masthead').setAttribute('style','position:fixed;z-index:100;width:755px');
	if(document.getElementById('MastheadBG')){document.getElementById('MastheadBG').setAttribute('src',BGIMG);}
	else if(!document.getElementById('MastheadBG')){document.getElementById('mw_masthead').innerHTML = '<img id="MastheadBG" src="'+BGIMG+'">'+document.getElementById('mw_masthead').innerHTML;}
	document.getElementById('stats_row').setAttribute('style','position: fixed;top:55px;width:762px;z-index:12;');
	document.getElementById('menubar').setAttribute('style','position: fixed;top:115px;width:762px;background-color:#000000;z-index:12;');
	if(document.getElementById('quest')){document.getElementById('quest').setAttribute('style','position:relative;top:150px;z-index:11');}
	document.getElementById('content_row').setAttribute('style','position:relative;top:150px;');
	if(document.getElementsByClassName('fightres_name')[0] && (screen.width) <=1279){
		document.getElementsByClassName('fightres_name')[0].setAttribute('style','font-size:12px');
		document.getElementsByClassName('fightres_name')[1].setAttribute('style','font-size:12px');
	}
	if(document.getElementById('BuildEventModule')){
		document.getElementById('PropertiesModule').innerHTML = MWEHomeCraftModule;
	}
	if(!document.getElementById('MWE_Combined_ratio')){
		var CurrentEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		var CurrentStamina = parseInt(document.getElementById('user_stamina').innerHTML);
		var CurrentXPNeeded = parseInt(document.getElementById('exp_to_next_level').innerHTML);

		var MWE_Combined_ratio=document.createElement("div");		
			MWE_Combined_ratio.id = 'MWE_Combined_ratio';			
			content=document.getElementById('user_stats');
			content.appendChild(MWE_Combined_ratio);		
			MWE_Combined_ratio.innerHTML = '<span style="position:relative;top:-19px;left:48px;font-size:12px" title="Ratio required to level up from energy & stamina combined.">Combined: '+(CurrentXPNeeded/(CurrentEnergy+CurrentStamina)).toFixed(2)+'</span>';
					
		var MWE_Stamina_ratio=document.createElement("div");		
			MWE_Stamina_ratio.id = 'MWE_Stamina_ratio';			
			content=document.getElementById('stat_stamina_cont');
			content.appendChild(MWE_Stamina_ratio);		
			MWE_Stamina_ratio.innerHTML = '<span style="position:relative;top:-54px;left:66px;font-size:12px" title="Ratio required to level up from stamina alone.">('+(CurrentXPNeeded/CurrentStamina).toFixed(2)+')</span>';
				
		var MWE_Energy_ratio=document.createElement("div");		
			MWE_Energy_ratio.id = 'MWE_Energy_ratio';			
			content=document.getElementById('stat_energy_cont');
			content.appendChild(MWE_Energy_ratio);		
			MWE_Energy_ratio.innerHTML = '<span style="position:relative;top:-54px;left:61px;font-size:12px" title="Ratio required to level up from energy alone.">('+(CurrentXPNeeded/CurrentEnergy).toFixed(2)+')</span>';
	}
	if(document.getElementById('MWE_Combined_ratio')){
		var CurrentEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		var CurrentStamina = parseInt(document.getElementById('user_stamina').innerHTML);
		var CurrentXPNeeded = parseInt(document.getElementById('exp_to_next_level').innerHTML);
		document.getElementById('MWE_Combined_ratio').innerHTML = '<span style="position:relative;top:-19px;left:48px;font-size:12px" title="Ratio required to level up from energy & stamina combined.">Combined: '+(CurrentXPNeeded/(CurrentEnergy+CurrentStamina)).toFixed(2)+'</span>';
		document.getElementById('MWE_Stamina_ratio').innerHTML = '<span style="position:relative;top:-54px;left:66px;font-size:12px" title="Ratio required to level up from stamina alone.">('+(CurrentXPNeeded/CurrentStamina).toFixed(2)+')</span>';
		document.getElementById('MWE_Energy_ratio').innerHTML = '<span style="position:relative;top:-54px;left:61px;font-size:12px" title="Ratio required to level up from energy alone.">('+(CurrentXPNeeded/CurrentEnergy).toFixed(2)+')</span>';
	}
	if(document.getElementById('nav_link_home_unlock').innerHTML){
		var HomeLink = document.getElementById('nav_link_home_unlock').innerHTML;
		city = parseInt((/xw_city=([\d]+)&/.exec(HomeLink))[1]);
	}
}

/**This is the left hand frame & ALL related CSS**/
var MWETB = 
	'<style type="text/css"> html { overflow-y: scroll }'+
	'#FloatBox {overflow-y: auto;overflow-x: hidden;display: inline;position:fixed;max-width: 230px;top: 1%;left: 1%;z-index: 100;'+
	'border:1px dotted #666666;background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/empire/green_glow.png);background-repeat: repeat;'+
	'background-color: #000000;margin:0px;height: 630px;}'+
	'#MastheadBG{position: relative; left:-10px}'+
	'#HO {position: absolute; top: 53px;left: 90px;z-index: 1000;}'+
	'#MWEMiniEPack {position: relative; top:-9px;height:30px;left:163px;width: 32px; margin-right: 5px; margin-bottom: 7px;z-index:100}'+
	'#logo {position: absolute; top: 4px; left: 1px;z-index: 1000;}'+
	'#QBBx {position: relative; bottom: -350px; left: 2px;}'+
	'#QBBtn {position: relative; bottom: -12px; left: 2px;}'+
	'#QHImg {position: relative;left: -8px;}'+
	'#QHTxt {position: relative;left: -4px;}'+
	'#QHNYImg {position: relative;left: 1px;}'+
	'#QHNYTxt {position: relative;left: 5px;}'+
	'#QBTxt {position: relative;left: -7px;}'+
	'#QCTxt {position: relative;left: -2px;}'+
	'#HdrImg {position: absolute; top: -1px; left: -1px;z-index: 100;}'+
	'#travel {position: relative; bottom: 18px; left: -3px;z-index: 100;}'+
	'#traveltxt {position: relative; bottom: 6px; left: 20px;}'+
	'#HOMEdiv {position: absolute; top: 111px; left: -1px}'+
	'#QL {position: relative; top: 8px; left: -11px;z-index: 1000;}'+
	'#CR {position: relative; top: 11px; left: -7px; z-index: 1000;}'+
	'#GI {position: relative; top: 14px; left: -9px; z-index: 1000;}'+
	'#EN {position: relative; top: 16px; left: -5px; z-index: 1000;}'+
	'#ST {position: relative; top: 18px; left: -6px; z-index: 1000;}'+
	'#OP {position: relative; top: 16px; left: -8px; z-index: 1000;}'+
	'#LL {position: relative; top: 18px; left: -6px;z-index: 1000;}'+
	'#MWEWiki {position: relative; top: 20px; left: -6px;z-index: 1000;}'+
	'#QuickLImg {position: relative; top: 17px; left: 16px; z-index: 1001;}'+
	'#CraftImg {position: relative; top: 16px; left: 17px; z-index: 1001;}'+
	'#GiftImg {position: relative; top: 19px; left: 19px; z-index: 1001;}'+
	'#NRGImg {position: relative; top: 21px; left: 16px; z-index: 1001;}'+
	'#StamImg {position: relative; top: 23px; left: 16px; z-index: 1001;}'+
	'#OperImg {position: relative; top: 22px; left: 16px; z-index: 1001;}'+
	'#MWEWikiImg {position: relative; top: 26px; left: 15px; z-index: 1001;}'+
	'#HOMEBx {position: absolute; top: 45px; left: 6px}'+
	'#GIFTdiv {position: absolute; top: 111px; left: -1px}'+
	'#PropertiesGiftHome {position: absolute; top: 55px; left: 35px; z-index: 1000;}'+
	'#GeneralGifts {position: absolute; top: 85px; left: 35px; z-index: 1000;}'+
	'#CityCash {position: absolute; top: 115px; left: 35px; z-index: 1000;}'+
	'#NA2 {position: absolute; top: 145px; left: 35px; z-index: 1000;}'+
	'#NA3 {position: absolute; top: 175px; left: 35px; z-index: 1000;}'+
	'#GIFTBx {position: absolute; top: 45px; left: 6px}'+
	'#energy_div {position: absolute; top: 111px; left: -1px}'+
	'#E_Tools_Bx {position: absolute; top: 45px; left: 6px}'+
	'#NewYorkJobber {position: relative; top: -50px;}'+
	'#ItJ {position: relative; top: -45px; z-index: 1000;}'+
	'#DoBrazilJob {position: relative; top: -40px;}'+
	'#EnergyRefill {position: relative; top:0px;}'+
	'#stamina_div {position: absolute; top: 111px; left: -1px}'+
	'#mweHL {position: absolute; top: 95px; left: 150px; z-index: 1000;}'+
	'#mweHLTxt {position: absolute; top: 100px; left: 25px; z-index: 1000;}'+
	'#mweHLOp {position: absolute; top: 0px; left: 3px; z-index: 1000;}'+
	'#mweFL {position: absolute; top: 55px; left: 150px; z-index: 1000;}'+
	'#mweFLTxt {position: absolute; top: 60px; left: 25px; z-index: 1000;}'+
	'#mweFLOp {position: absolute; top: 0px; left: 3px; z-index: 1000;}'+
	'#StamTabHR {position: relative; top: 124px;z-index: 1000;}'+
	'#GrCl {position: relative; top: 110px;left:8px;z-index: 1000;}'+
	'#GoLinkList {position: relative; top: 120px;z-index: 1000;}'+
	'#StaminaRefill {position: relative; top: 140px;}'+
	'#AutoH {position: absolute; top: 135px; left: 150px; z-index: 1000;}'+
	'#AutoHtxt {position: absolute; top: 140px; left: 25px; z-index: 1000;}'+
	'#AutoHOp {position: absolute; top: 0px; left: 3px; z-index: 1000;}'+
	'#StamOps {position: relative; top: 5px; left: 5px; z-index: 1000;}'+
	'#S_Tools_Bx {position: absolute; top: 45px; left: 6px}'+
	'#QLCont {position: absolute; top: 111px; left: -1px}'+
	'#BLHdr {position: relative; top: 165px; left: 0px}'+
	'#QLBx {position: absolute; top: 42px; left: 6px}'+
	'#BLLnks {position: relative; top: 173px; left: 6px}'+
	'#BLks {position: relative; top: 8px; left: 40px}'+
	'#BLtxt {position: relative; top: 7px;}'+
	'#BLE {position: relative; top: -6px; left: -17px}'+
	'#BLF {position: relative; top: -6px; left: -16px}'+
	'#BLA {position: relative; top: -6px; left: -17.5px}'+
	'#BLM {position: relative; top: -6px; left: -18px}'+
	'#OPC1 {position: relative; top: 55px; z-index: 1000;}'+
	'#OPC2 {position: relative; top: 55px; z-index: 1000;}'+
	'#OPC3 {position: relative; top: 55px; z-index: 1000;}'+
	'#AllOperations {position: relative; top: 100px;}'+
	'#EHCont {position: absolute; top: 111px; left: -1px}'+
	'#EHBx1 {position: relative; top: 6px; left: 6px}'+
	'#EHBx2 {position: relative; top: 8px; left: 6px}'+
	'#CraftTab {position: absolute; top: 111px; left: -1px}'+
	'#QPL {position: relative; top: 6px; left: 6px}'+
	'#SpdBld {position: relative; top: 4px; left: 6px}'+
	'#QBuHdr {position: relative; top: -4px; left: 0px}'+
	'#builds {position: relative; top: 8px; left: -1px}'+
	'#CraftingSpeedUp {position:relative;top:-88px;left:65px;}'+
	'#CrCS {position: relative; top: -5px; left: -10px}'+
	'#CrWD {position: relative; top: -5px; left: -5px}'+
	'#CrAR {position: relative; top: -5px; left: 0px}'+
	'#CrPZ {position: relative; top: -5px; left: 5px}'+
	'#CrPO {position: relative; top: -5px; left: 10px}'+
	'#CrHr {position: relative; top: -10px; left: 1px}'+
	'#WDBlds {position: relative; top: -15px;left: -1px;}'+
	'#CSBlds {position: relative; top: -35px;left: -1px;}'+
	'#ARBlds {position: relative; top: -5px;left: -1px;}'+
	'#PZBlds {position: relative; top: 5px;left: -1px;}'+
	'#POBlds {position: relative; top: 10px;left: -1px;}'+
	'#PGHChop {position: relative; top: 10px;left: 0px;}'+
	'#PGHWeap {position: relative; top: 10px;left: 0px;}'+
	'#PGHArmo {position: relative; top: 10px;left: 0px;}'+
	'#PGHPriv {position: relative; top: 10px;left: 0px;}'+
	'#PGHLasV {position: relative; top: 10px;left: 0px;}'+
	'#PGHItal {position: relative; top: 20px;left: 0px;}'+
	'#GiftHomeButton {position: relative; top: 5px;left: 0px;}'+
	'#GiftHomeLeftArrow {position: relative; top: -6px;left: -12px;}'+
	'#GiftHomeText {position: relative; top: -13px;left: -10px;}'+
	'#GoPageHead {position: relative; top: 350px;left: 95px;}'+
	'#FreeTrialImage {position:relative;top:-35px;left:83px;}'+
	'#LLContainer {position: absolute; top: 65px; left: 6px}'+
	'#LiveLinkControls {position: relative; top: -46px;}'+
	'#LiveLinkControlText {position: relative; top: -15px;left:-3px;}'+
	'#LiveLinkSwitch {position: relative; top: 7px;left:7px;}'+
	'</style>'+
	'<link rel="shortcut icon" href="data:image/gif;base64,AAABAAEAIiMAAAEAIADYEwAAFgAAACgAAAAiAAAARgAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgzJkAYMyZAGDMmQBgzJkAYMyZAGDMmQFgzJkAYMyZAWDMmSFgzJkQYMyZ/2DMmf9gzJn/YMyZ/2DMmf9gzJn/YMyZ/2DMmf9gzJn/YMyZ//j7+AD+/v4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAYMyZAGDMmQBgzJkAYMyZAGDMmQBgzJkBYMyZAWDMmS1gzJn/YMyZ/2DMmf9rxpz/Topo/0BpTP82UDv/Mks1/zJLNf81UDv/g7qb/4HMpv9x0KP/YMyZ/2DMmf////8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAGDMmQBgzJkAYMyZAGDMmQFgzJkAYMyZGGDMmf9gzJn/YMyZ/33Lpf+x1cH/1eTb/zA0Mf8AAAD/AAAA/wAAAP8AAAD/HiMe////////////1eTc/7DUwP98y6T/YMyZ/2DMmf////8A////AP///wD///8A////AP///wD///8AAAAAAAAAAABgzJkAYMyZAGDMmQFgzJkBYMyZDmDMmf9gzJn/WaiB/7DTvv/0+Pb///////////+enqH/AAAA/wAAAP8AAAD/AAAA/0BHQ////////////9vd3v/Kz87/8/j1/6/Tv/9yy6H/YMyZ/////wD///8A////AP///wD///8A////AAAAAAAAAAAAYMyZAGDMmQVgzJkDYMyZLWDMmf9gzJn/SHlb/4+clf+Ag4T//////////////////////ycqKP8AAAD/AAAA/wAAAP9rb3D///////////96hID/ucC+////////////rMu1/1q8iP9gzJn/////AP///wD///8A////AP///wAAAAAAAAAAAGDMmQNgzJkLYMyZE2DMmf9gzJn/P2RJ/wAAAP9wfnT/UlpV/7e6uv////////////////+Jioz/AAAA/wAAAP8AAAD/np6h////////////h5OO/9PY1v///////////6LFq/9Ikj7/VrV+/2DMmf////8A////AP///wD///8AAAAAAAAAAABgzJkCYMyZAmDMmf9gzJn/YLuJ/0BJQf9WX1n/ZGpo/+Xq6f86Qzz/////////////////9vb3/x0gHf8AAAD/AAAA/7Kytf///////////6qzsP/w8fL///////////+JuZX/SJRA/0eQOP9YuYT/YMyZ/////wD///8A////AAAAAAAAAAAAYMyZAWDMmQJgzJn/XMGP/0mTP//q8e3///////b29///////gpCJ/5qmov////////////////92enr/AAAA/wAAAP/Jycv////////////t7/D/////////////////cq9//0mYSP9Hkjv/SJI8/1zBj/9gzJn/////AP///wAAAAAAAAAAAGDMmQJgzJn/YMyZ/02cVf9HkDX/udPA////////////sry4/zxHP//i5OP/////////////////6uvs/xMXFP8AAAD/2dna/////////////////////////////////1qobP9Km03/SJZC/0eQNf9NnFX/YMyZ/////wD///8AAAAAAAAAAABgzJk8YMyZ/1e4gf9GjSz/R5M5/4i4kf////////////////////////////////////////////////9UYlv/AAAA/83Nz/////////////////////////////L49P9No1v/S55S/0mZR/9Hkzn/Ro0s/1e4gf9gzJn/////AAAAAAAAAAAAYMyZ/2DMmf9LmUv/R48w/0iVPv9XoV//+v38////////////////////////////////////////////W2di/wAAAP+xsrT/////////////////3+Pj///////P5tn/TaVe/0ygVf9Km0n/SJU+/0ePL/9LmUv/YMyZ/////wAAAAAAAAAAAGDMmf9bv4v/Rosk/0eRMv9Ilz//S51L/8jf0f///////////////////////////////////////////zU8OP8AAAD/f4eF/87V0/9bamH/LTcv/xsgGv//////p9K3/02mXv9MoVX/S51L/0iXP/9HkTL/Rosk/1u/i/9gzJn/AAAAAAAAAABgzJn/Uqtt/0aNJv9IkjP/SZhA/0udS/9/uYv///////////////////////////////////////////8QExD/AAAA/1FdVv/y9fT/FhwV/yo0LP+rtbD/6/Tw/222gf9Nplv/TKJT/0udS/9JmED/SJIz/0aNJv9Sq23/YMyZ/wAAAAAAAAAAYMyZ/0ybUP9Gjif/SJQ0/0mYPv9KnUn/TaJU/9vq4f////////////////////////////////++vsD/AAAA/wAAAP8pMCr//////73Gwv/e7eX/l8uq/1mwcP9OqWD/TaZb/0yiUv9KnUn/SZg+/0iUNP9Gjif/TJtQ/2DMmf8AAAAAAAAAAGDMmf9Ikjr/Ro8n/0iUNP9JmT7/S55I/0yiUP+DvZH/////////////////////////////////cXd2/wAAAP8AAAD/AwQD/425nf9ltXz/T6xk/0+rYv9OqWD/Tqhd/02lVv9MolD/S55I/0mZPv9IlDT/Ro8n/0iSOv9gzJn/AAAAAAAAAABgzJn/Ro4t/0aOJf9IlDL/SZk8/0qdRf9Mok3/TKRT/9Pm2v///////////////////////////ztEPf8AAAD/AAAA/wAAAP9BcEj/Tqph/06pYP9OqF7/Tqhb/02nWf9MpFP/TKJN/0qdRf9JmTz/SJQy/0aOJf9Gji3/YMyZ/wAAAAAAAAAAYMyZ/0aMJv9GjiL/SJQx/0mZOv9KnUL/TKBJ/0yjUP9Zq2b/a7N6/2u0e/9rtX3/creD/6/Vvf8gJh//Cg0J/wAAAP8AAAD/M080/06oXv9NqFv/TadZ/02nWP9NplT/TKNQ/0ygSf9KnUL/SZk6/0iUMf9GjiL/Rowm/2DMmf8AAAAAAAAAAGDMmf9Hji3/Ro0g/0eTLf9JmDb/Spw//0ugRv9Mokz/TKRQ/02lU/9Nplb/TqdY/06nWP9Np1n/stW9/9ve3v8YHRb/AAAA/yc2Jf9LllP/QnVF/ztgO/9AcUL/TKRQ/0yiTP9LoEb/Spw//0mYNv9Hky3/Ro0g/0eOLf9gzJn/AAAAAAAAAABgzJn/SZQ//0aMH/9Hkin/SJYz/0qbPP9LnkL/S6FH/0yjTP9QpVP/T6ZU/06mVP9NplX/TaZU/7XXwP//////HyUe/wAAAP8AAAD/DBAK/wAAAP8AAAD/HSYb/0yjTP9LoUf/S55C/0mbPP9IljP/R5Ip/0aMH/9JlD//YMyZ/wAAAAAAAAAAYMyZ/02eVv9Fixn/R5El/0iVMP9JmTb/Sp0//0ufQ/9Qo1D/U6dY/1KmVv9QplT/TqRR/02lUf/A3Mn//////x8lHv8AAAD/AAAA/wAAAP8AAAD/BQYE/0iBSf9LoUf/S59D/0qdP/9JmTb/SJUv/0eRJf9Gixb/TZ5W/2DMmf8AAAAAAAAAAGDMmf9TrnH/RYkP/0ePH/9Ikyr/SJg0/0mbOP9Knj7/VaVW/1qpXv9Xp1r/UqZW/1ClUf9OpE//s9S8//////8oMSb/AAAA/wAAAP8AAAD/AAAA/zxZOv9ZqFz/TKBE/0qePv9Jmzj/SJg0/0iTKv9Hjx//RYkP/1Oucf9gzJn/AAAAAAAAAABgzJn/XsaU/0WKF/9GjBz/R5In/0iVLv9JmTb/SZw6/1qmXP9jq2f/YKtl/1qpXv9Vp1j/UqVU/zxPO/9WYlj/Lzkv/wAAAP8AAAD/CAoH/x0iHP9Uh1b/X6li/0yfQv9JnDr/SZk2/0iVLv9HkSf/Rowc/0WKF/9expT/YMyZ/wAAAAAAAAAAYMyZ/2DMmf9NnVP/RooS/0ePH/9Ikyj/SJcx/0maNf9cpVr/ba5x/26vc/9orW3/Yatk/0ZsRP8AAAD/AAAA/wAAAP8AAAD/LjUu/3B6dP8LDQr/VntV/2WrZ/9KnTj/SZo1/0iXL/9Ikyj/R48f/0aKEv9On1f/YMyZ/////wAAAAAAAAAAAGDMmQ5gzJn/W76K/0WJEv9GjBj/R5Ah/0iUKP9IlzH/VaFQ/3Ovdv99tYD/e7WA/3azev8vPC3/AAAA/wAAAP8AAAD/LTMs/z9JQP8FBgT/AAAA/1d3V/9hqGH/SZo0/0iXMf9IlCj/R5Ah/0aMGP9Gihf/XMKP/2DMmf////8AAAAAAAAAAACv5cwAYMyZ/2DMmf9Po17/RYkF/0aNHP9HkSP/SJUq/0iXLf9sqmv/hLeI/4y8kv+NvpP/Y39k/2F9Yv97qH7/gLCE/1RpVP8cIBv/AAAA/xwgGv9xp3T/UZ5H/0iXLf9IlCf/R5Ej/0aNHP9FiQX/UKRh/2DMmf////8A////AAAAAAAAAAAA+f37A/X8+QRgzJn/X8qZ/0mTO/9Fig//Ro0b/0eRIf9IlCb/UZtC/3mwev+QvpT/nMWi/6DHp/+jyqn/ocio/6PKqf+hyKj/nsel/3qYfP+AsIH/YKRc/0iWK/9IlCb/R5Eh/0aNG/9Fig//SZM7/1/Kmf9gzJn/////AP///wAAAAAAAAAAAOP27QD///8Df9atBGDMmf9cwo//Ro4t/0WKCv9GjRj/R5Ae/0eSJP9UnEj/erB6/5K9lv+hx6f/qcuv/6zNsv+rzbH/pMmq/5jBnP+EtYX/YqRe/0iVKP9HkiT/R5Ae/0aNGP9Figr/Ro4t/1zCj/9gzJn/////AP///wD///8AAAAAAAAAAADv+vUA6/nyANfy5QVgzJkZYMyZ/1zCj/9JlD//RYkF/0aLEv9Gjx3/R5Eh/0mTKv9mpGP/fbB9/4q4jP+PvJP/jbqQ/4O0hP9wqW7/U5tG/0iSIv9HkSH/Ro8d/0aLEv9FiQX/SZQ//1zCj/9gzJn/////AP///wD///8A////AAAAAAAAAAAA/v/+APz+/QD///8Af9atAWDMmQBgzJn/X8iW/0ydVP9EiAH/RYoI/0aMEf9Gjhn/R5Ab/0eQHv9Qlz3/VZpI/1KYQ/9Jkyz/R5Ae/0eQG/9Gjhn/RowR/0WKCP9EiAH/TJ1U/1/Ilv9gzJn/////AP///wD///8A////AP///wAAAAAAAAAAAP7//wD+//8A/v/+AOv58gdgzJkqYMyZIGDMmf9gzJn/WLqD/0mUPv9EiAH/RYoK/0aLDP9GjBH/Ro0U/0aOE/9GjhP/Ro0U/0aMEf9Giwz/RYoK/0SIAf9JlD7/WLqD/2DMmf9gzJn/////AP///wD///8A////AP///wD///8AAAAAAAAAAAD///8A////AP///wD///8Ar+XMAGDMmQBgzJkAYMyZ4WDMmf9gzJn/V7iB/0+jXv9IkDL/RIcD/0WIAf9FiQD/RYkA/0WIAf9EhwP/SJAy/0+jXv9XuIH/YMyZ/2DMmf////8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAA+f37AP///wD+//4A////AP3+/gCv5cwBYMyZAGDMmQJgzJkOYMyZ/2DMmf9gzJn/YMyZ/2DMmf9ZvIf/V7iB/1e4gf9ZvIf/YMyZ/2DMmf9gzJn/YMyZ/////wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAP/////AAAAA/////8AAAAD/////wAAAAP/AD//AAAAA/wAB/8AAAAD8AAB/wAAAAPgAAD/AAAAA8AAAH8AAAADgAAAPwAAAAMAAAAfAAAAAwAAAA8AAAACAAAADwAAAAIAAAAHAAAAAAAAAAcAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAcAAAACAAAABwAAAAIAAAAPAAAAAwAAAA8AAAADgAAAHwAAAAPAAAA/AAAAA+AAAH8AAAAD8AAA/wAAAAP4AAP/AAAAA/4AD/8AAAAA=">'+
	'<table id="FloatBox" border=0>'+
	'<td colspan="200"><img id="logo" src="http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwe_graphics/ps-mwe_003.png">'+
	'<img height="111" width="232" id="HdrImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/container_social.png">'+
	'<div style="width: 213px;margin: top: 10px;height: 37px;font-size: 14px;" class="clearfix empire_module_title"></div>'+
	'<div style="width: 214px;margin: top: 10px;height: 24px;font-size: 14px;" class="clearfix empire_module_title">'+
	'<a title="Click to join the PS MWE room on Skype" style="position:relative;top:-10px;left:-25px;z-index:100;" href="skype:?chat&blob=uxqkmXdc7cV1l0xJfg5bR_EcnPw0d64uO08NKhx65HivoLg5oj1-sDdSfIc4SGqbHxN7UJDS69FT"><img src="http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwe_graphics/skype_logo.png" style="border: none;" width="30" height="30"></a>'+
	'<a href="#" id="HO" class="sexy_button_new black"><span><span>HOME</span></span></a>'+
	'<a id="MWEMiniEPack" class="empire_use_epack_btn sexy_mini_energy_pack_brief sexy_button_new short white fl" href="#" onclick="return MiniPackModule.use();"><span><span>&nbsp;</span></span></a>'+
	'</div><br>'+
	'<div id="travel" style="width: 221px; height: 14px;font-size: 9px;background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/grey_bg.gif);" class="clearfix empire_module_title">'+
	'<div id="traveltxt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="white">Travel to:&nbsp;&nbsp;&nbsp;&nbsp;</font>'+
	'<a title="New York" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=1&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">NY</a><strong><em><font color="white">|</font></strong></em>'+
	'<a title="Bangkok" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=4&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">Bk</a><strong><em><font color="white">|</font></strong></em>'+
	'<a title="Las Vegas" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=5&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">LV</a><strong><em><font color="white">|</font></strong></em>'+
	'<a title="Italy" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=6&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">It</a><strong><em><font color="white">|</font></strong></em>'+
	'<a title="Brazil" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&xw_action=travel&destination=7&from=index&nextParams=&menu=travel\', 1, 1, 0, 0)">Br</a>'+
	'</div></div>'+
	'<div id="PSMWE_content"></div>'+
	'<div id="QBBx" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 78px;width:218px;"><center>'+
	'<div id="QBBtn">'+
	'<a style="position:relative;left:-5px;top:-2px;width:85px;" id="QHeal" class="sexy_button_new short black">'+
	'<span class="sexy_health_new"><span>'+
	'<img id="QHImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-health.gif">'+
	'<font id="QHTxt">Heal</font></span></span></a>'+
	'<a style="position:relative;left:4px;top:-2px;width:85px;" id="QHealNY" class="sexy_button_new short black">'+
	'<span class="sexy_health_new"><span>'+
	'<img id="QHNYImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-health.gif">'+
	'<font id="QHNYTxt">Heal NY</font></span></span></a>'+
	'<a style="position:relative;left:-5px;top:3px;width:85px;" class="sexy_button_new" id="QB" ><span><span><div class="sexy_new_york_cash">'+
	'<font id="QBTxt">Bank</font></div></span></span></a>'+
	'<a style="position:relative;left:4px;top:3px;width:85px;" class="sexy_button_new" id="QC"><span><span><div class="sexy_new_york_cash">'+
	'<font id="QCTxt">Collect</font></div></span></span></a>'+
	'</center></div></div>'+
	'<a href="javascript:void(0)"><div id="GoPageHead" title="Click me to scroll the page to the top." style="width:40px;height:18px;background:url(http://mwfb.static.zgncdn.com/mwfb/graphics/v3/button_icons_634x325_05.png) 0px 165px;"></div></a>'+
	'</tr></table>'+
	'<textarea id="CraftItem" style="position:relative;top:-5000px;display:none;">blank</textarea>'+
	'<textarea id="MWE_LiveLink" style="position:relative;top:-10000px;display:none;">blank</textarea>';

var HOMECnt =
	'<div id="HOMEdiv">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>HOME</b></div>'+
	'<div id="HOMEBx" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 310px;width:218px;">'+
	'<center><BR>'+
	'<img id="QuickLImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_sheet_25x24_01.png"><a href="#" id="QL" class="sexy_button_new black" style="width: 130px;"><span><span>&nbsp;&nbsp;QUICKLINKS</span></span></a>'+
	'<br><img id="CraftImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png"><a href="#" id="CR" class="sexy_button_new black" style="width: 130px;"><span><span>&nbsp;&nbsp;CRAFTING</span></span></a>'+
	'<br><img id="GiftImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_sendgift_22x16_01.gif"><a href="#" id="GI" class="sexy_button_new black" style="width: 130px;"><span><span>&nbsp;&nbsp;GIFTING</span></span></a>'+
	'<br><img id="NRGImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-energy.gif"><a href="#" id="EN" class="sexy_button_new black" style="width: 130px;"><span><span>&nbsp;&nbsp;ENERGY</span></span></a>'+
	'<br><img id="StamImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png"><a href="#" id="ST" class="sexy_button_new black" style="width: 130px;"><span><span>&nbsp;&nbsp;STAMINA</span></span></a>'+
	'<br><img id="OperImg" height="20" width="20" src="http://mwfb.static.zgncdn.com/mwfb/graphics/map_based_jobs/expert_view/icon_megaphone.png"><a href="#" id="OP" class="sexy_button_new black" style="width: 130px;"><span><span>&nbsp;&nbsp;OPERATIONS</span></span></a>'+
	'<br><img id="StamImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png"><a id="LL" class="sexy_button_new black" style="width: 130px;"><span><span>&nbsp;&nbsp;LIVELINKS</span></span></a>'+
	'<br><img id="MWEWikiImg" src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-help.gif"><a href="http://www.playerscripts.com/pswiki/index.php?title=PS_MWE" target="_blank" id="MWEWiki" class="sexy_button_new black" style="width: 130px;"><span><span>&nbsp;&nbsp;PS MWE WIKI</span></span></a>'+
	'</center>'+
	'</div>';
	
var LLCnt = 
	'<div id="HOMEdiv">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>LiveLinks</b></div><img id="FreeTrialImage" height="32" width="32" src="http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwe_graphics/freetrial_32.png"><a id="ST" class="sexy_button_new black" style="position:relative;top:-49px;left:95px;width: 90px;"><span><span>STAMINA</span></span></a>'+
	'<div id="LiveLinkControls" style="width: 221px; height: 14px;font-size: 9px;background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/grey_bg.gif);" class="clearfix empire_module_title">'+
	'<div id="LiveLinkControlText"><font color="white"></font>'+
	'<a title="Click me to empty the LiveLinks log." id="ClearLiveLinks">Clear Links</a><strong><em><font color="white">&nbsp;&nbsp;|&nbsp;&nbsp;</strong></em>Visit : </font>'+
	'<a title="Click to visit the fightlist." onclick="do_ajax(\'mw_city_wrapper\', \'remote/html_server.php?xw_controller=fight&xw_action=view\')">Fightlist</a><strong><em><font color="white">&nbsp;/&nbsp;</font></strong></em>'+
	'<a title="Click to visit your rivals list." onclick="do_ajax(\'mw_city_wrapper\', \'remote/html_server.php?xw_controller=fight&xw_action=view&tab=1\')">Rivals</a>'+
	'<a id="LiveLinkSwitchA" href="javascript:void(0);" title="LIVELINKS ARE CURRENTLY OFF"><img id="LiveLinkSwitch" src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/button_mini_ause.png"></a></div></div>'+
	'<div id="LLContainer" style="overflow-y: auto;height: 290px;width:218px;border:1px dotted;background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);">'+
	'</div>';

	

	

	


	

	


	


	
/**This is the enhancers for the left hand frame**/
var EHCnt=
	'<div>'+
	'<div id="EHCont">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>Fighting</b><br></div>'+
	'<div id="EHBx1" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 72px;width:218px;">'+
	'</div><br>'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>General Purpose</b><br></div>'+
	'<div id="EHBx2" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 72px;width:218px;">'+
	'</div></div>'+
	'</div>';

	


}
	
	
	
/**This is the right hand frame and ALL related CSS**/
var MWETB2 = 
	'<style type="text/css">html { overflow-y: auto !important }'+
	'#FloatBox2 {overflow-y: auto;overflow-x: hidden;display: inline;position:fixed;max-width: 230px;top: 1%;right: 1%;z-index: 100;border:'+
	'1px dotted #666666;background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/empire/green_glow.png);background-repeat: repeat;background-color: #000000;margin:0px;min-height: 630px;}'+
	'#FacebookButtonLarge {position:relative;top;15px;background: #111 url(http://static.ak.fbcdn.net/rsrc.php/v1/zD/r/B4K_BWwP7P5.png) repeat  0px -70px;border: 1px solid #999;border-bottom-color: #888;box-shadow: 0 1px 0 rgba(0, 0, 0, .1);-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .1);cursor: pointer;display: -moz-inline-box;display: inline-block;font-size: 11px;font-weight: bold;line-height: normal !important;padding: 2px 6px;padding-top: 2px;padding-right: 6px;padding-bottom: 2px;padding-left: 6px;text-align: center;text-decoration: none;vertical-align: top;white-space: nowrap;color:white;position:relative;top;5px;}'+ 
	'#LOG {position: absolute; top: 55px;left: 35px;z-index: 1000;}'+
	'#LOG2 {position: absolute; top: 55px;right: 35px;z-index: 1000;}'+
	'#LogOp {position: relative; bottom: 18px; left: -4px;z-index: 1000;}'+
	'#LogOptxt {position: relative; bottom: 6px; left: 25px;z-index: 1000;}'+
	'#logo {position: absolute; top: 0px; left: -3px;z-index: 1000;}'+
	'#HdrImg2 {position: absolute; top: -1px; left: -1px;z-index: 100;}'+
	'#StBx {position: absolute; top: 483px; left: 5px;}'+
	'#FightsWon {position: relative; top: 0px;left: 0px;z-index: 1000;}'+
	'#FightsLost {position: relative; top: 0px;right: 0px;z-index: 1000;}'+
	'#Bounties {position: relative; bottom: 0px; left: 0px;z-index: 1000;}'+
	'#FPcent {position: relative; bottom: 0px; left: 0px;z-index: 1000;}'+
	'#RobsWon {position: relative; top: 0px; left: 0px;z-index: 1000;}'+
	'#RobsLost {position: relative; top: 0px; left: 0px;z-index: 100;}'+
	'#RobBoards {position: relative; top: 0px; left: 0px;z-index: 100;}'+
	'#RPcent {position: relative; top: 0px;left: 0px;z-index: 1000;}'+
	'#Ices {position: relative; top: 0px;right: 0px;z-index: 1000;}'+
	'#Kills {position: relative; bottom: 0px; left: 0px;z-index: 1000;}'+
	'#PS_MWE_LOG_CONTAINER {position: absolute; top: 111px; left: -1px}'+
	'#PS_MWE_LOG {overflow-y: scroll;position: absolute; top: 45px; left: 6px}'+
	'#timestamp {font-size:11px;font-weight:600;color:#C0C0C0;}'+
	'#PS_MWE_LOG2_CONTAINER {position: absolute; top: 111px; left: -1px}'+
	'#PS_MWE_LOG2 {overflow-y: scroll;position: absolute; top: 45px; left: 6px}'+
	'</style>'+
	'<table id="FloatBox2" border=0>'+
	'<td colspan="200"><a href="http://www.playerscripts.com" target="_blank"><img id="logo" src="http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwe_graphics/ps-logo.png"></a>'+
	'<img height="111" width="232" id="HdrImg2" src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/container_social.png">'+
	'<div style="width: 213px;margin: top: 10px;height: 37px;font-size: 14px;" class="clearfix empire_module_title"></div>'+
	'<div style="width: 214px;margin: top: 10px;height: 24px;font-size: 14px;" class="clearfix empire_module_title">'+
	'<a href="#" id="LOG" class="sexy_button_new black"><span><span>LOG</span></span></a>'+
	'<a href="#" id="LOG2" class="sexy_button_new black"><span><span>LOOT LOG</span></span></a></div><br>'+
	'<div id="LogOp" style="width: 222px; height: 14px;font-size: 9px;background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/grey_bg.gif);" class="clearfix empire_module_title">'+
	'<div id="LogOptxt"><font color="white">&nbsp;&nbsp;Clear&nbsp;:&nbsp;&nbsp;&nbsp;</font><span id="ClrLg"><a>Log</a></span><strong><em><b><font color="white"> / </font></b></strong></em>'+
	'<span id="ClearStats"><a> Stats</a></span><strong><em><b><font color="white">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</font></b></strong></em><span id="ClearSettings"><a>Reset</a></span>'+
	'</div></div>'+
	'<div id="PSMWE_content2"></div>'+
	'<div id="StBx" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 74px;width:218px;">'+
	'Jobs Completed: <span id="JobsComp" class="good">0</span><br>'+
	'Fights W/L: <span id="FightsWon" class="good">0</span>/<span id="FightsLost" class="bad">0</span>'+
	'&nbsp;(&nbsp;<span id="Bounties" class="good" title="Bounties Collected.">0</span>&nbsp;)&nbsp;<span title="Fighting win percentage" class="uses" id="FPcent">0</span>%<br>'+
	'Robs W/L: <span id="RobsWon" class="good">0</span>/<span id="RobsLost" class="bad">0</span>&nbsp;(&nbsp;<span title="Boards cleared." class="good" id="RobBoards">0</span>&nbsp;)&nbsp;<span title="Robbing win percentage" class="uses" id="RPcent">0</span>%<br>'+
	'MWE Heals: <span id="Heals" class="good">0</span>&nbsp;Ices: <span id="Ices" class="good">0</span>&nbsp;Kills: <span id="Kills" class="good">0</span><br>'+
	'</div>'+
	'</tr></table>';
	
/**This is the log for the right hand frame**/
var Log =
	'<div id="PS_MWE_LOG_CONTAINER">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>Log</b></div>'+
	'<div id="PS_MWE_LOG" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 315px;width:218px;font-size: 12px;">'+
	'</div>'+
	'</div>';
	
/**This is the loot logging content for the right hand frame**/
var Log2 =
	'<div id="PS_MWE_LOG2_CONTAINER">'+
	'<div style="width: 222px; height: 25px;font-size: 14px;" class="clearfix empire_module_title"><b>Loot Log</b></div>'+
	'<div id="PS_MWE_LOG2" style="background-image: url(http://mwfb.static.zgncdn.com/mwfb/graphics/popup_template/new_ny_slice2.png);border:1px dotted;height: 315px;width:218px;font-size: 12px;">'+
	'</div>'+
	'</div>';


/**This loads the left hand pane**/
function LoadMWETB(){
	var PSMWE_div=document.createElement("div");
		PSMWE_div.id = 'PSMWE_div';			
		content=document.getElementById('final_wrapper');
		content.appendChild(PSMWE_div);
		PSMWE_div.innerHTML = MWETB;
			document.getElementById('HO').addEventListener('click', HOME, false);
			document.getElementById('QHealNY').addEventListener('click', QHealNY, false);
			document.getElementById('QHeal').addEventListener('click', QHeal, false);
			document.getElementById('QB').addEventListener('click', QuikBank, false);
			document.getElementById('QC').addEventListener('click', QCollect, false);
			document.getElementById('GoPageHead').addEventListener('click', GoPageHead, false);		
}
/**This loads the right hand pane**/
function LoadMWETB2(){
	var PSMWE_div2=document.createElement("div");
		PSMWE_div2.id = 'PSMWE_div2';			
		content=document.getElementById('final_wrapper');
		content.appendChild(PSMWE_div2);
		PSMWE_div2.innerHTML = MWETB2; 
			document.getElementById('LOG').addEventListener('click', LOG, false);
			document.getElementById('LOG2').addEventListener('click', LOG2, false);
			document.getElementById('ClrLg').addEventListener('click', ClrLg, false);
			document.getElementById('ClearStats').addEventListener('click', ClearStats, false);
			document.getElementById('ClearSettings').addEventListener('click', ClearSettings, false);
}
/**This is currently obsolete, should still work though**/
function CloseMWE() {
		document.getElementById("final_wrapper").removeChild(document.getElementById("PSMWE_div"));
		document.getElementById("final_wrapper").removeChild(document.getElementById("PSMWE_div2"));
}
function xpathFirst(p, c) {
		var xP = document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
/**This empties the PSMWE_content DIV in left hand pane and replaces it with the quicklink content**/
function QL(){
	content = document.getElementById("PSMWE_content");
	content.innerHTML = QLCnt;    
	document.getElementById('QuBaRem').addEventListener('click', RemMB_HPC, false);	
	document.getElementById('GetMiniPack').addEventListener('click', GetMiniPack, false);					
}
/**This empties the PSMWE_content DIV in left hand pane and replaces it with the home content**/
function HOME(){
	content = document.getElementById("PSMWE_content");
	content.innerHTML = HOMECnt; 
	document.getElementById('QL').addEventListener('click', QL, false);
	/*document.getElementById('EH').addEventListener('click', EH, false);*/
	document.getElementById('CR').addEventListener('click', CR, false);
	document.getElementById('GI').addEventListener('click', GI, false);
	document.getElementById('EN').addEventListener('click', EN, false);
	document.getElementById('ST').addEventListener('click', ST, false);
	document.getElementById('OP').addEventListener('click', OP, false);
	document.getElementById('LL').addEventListener('click', LLLoginPopUp, false);
   /* if(LiveLinkState == true){clearInterval(LiveLinkFeedInt);LiveLinkState = false;}*/
	if(LVItNoDelayState == true){clearInterval(LVItNoDelay);LVItNoDelayState = false}
	clearInterval(CraftResponseInt);
}
function LL(){
	content = document.getElementById("PSMWE_content");
	content.innerHTML = LLCnt;
	document.getElementById('ClearLiveLinks').addEventListener('click', ClearLiveLinks, false);
	document.getElementById('LiveLinkSwitch').addEventListener('click', LiveLinkSwitch, false);
	document.getElementById('ST').addEventListener('click', ST, false);
	document.getElementById("LLContainer").innerHTML = Link_Log;
	/*doLogin();*/
	if(LiveLinkOption == true){
		if(!LiveLinkToggle){LiveLinkToggle = true;LiveLinkFeedInt = setInterval(liveLinkFeed, 5000);}
		document.getElementById("LiveLinkSwitch").setAttribute('src','http://mwfb.static.zgncdn.com/mwfb/graphics/empire/button_mini_pause.png');
		document.getElementById("LiveLinkSwitchA").setAttribute('title','LIVELINKS ON');
	}
	else{
		clearInterval(LiveLinkFeedInt);
		document.getElementById("LiveLinkSwitch").setAttribute('src','http://mwfb.static.zgncdn.com/mwfb/graphics/empire/button_mini_play.png');
		document.getElementById("LiveLinkSwitchA").setAttribute('title','LIVELINKS OFF'); 
	}
	if(document.getElementById('LLLoginA')){
		document.getElementById('LLLoginA').addEventListener('click', HOME, false)
	}


		
/**This empties the PSMWE_content DIV in left hand pane and replaces it with the stamina content,
refers to the relevant vars to determine the correct colours for buttons, as well as the text displayed**/
function ST(){
	content = document.getElementById("PSMWE_content");
	content.innerHTML = STCnt;    
		document.getElementById('mweHL').addEventListener('click', HLListener, false);
		document.getElementById('mweFL').addEventListener('click', FLListener, false);
		document.getElementById('GrCl').addEventListener('click', GetRobs, false);
		document.getElementById('AutoH').addEventListener('click', AutoHeal, false);
		
		if(Autoheal == true){
			document.getElementById("AutoH").setAttribute("class", "sexy_button_new short green");
			document.getElementById("AutoH").innerHTML = '<span id="AutoHOp"><span>(on)</span></span>';
		}
		if(Autoheal == false){
			document.getElementById("AutoH").setAttribute("class", "sexy_button_new short red");
			document.getElementById("AutoH").innerHTML = '<span id="AutoHOp"><span>(off)</span></span>';
		}
		if(FLFun == true){
			document.getElementById("mweFL").setAttribute("class", "sexy_button_new short green");
			document.getElementById("mweFL").innerHTML = '<span id="mweFLOp"><span>(on)</span></span>';
		}
		if(FLFun == false){
			document.getElementById("mweFL").setAttribute("class", "sexy_button_new short red");
			document.getElementById("mweFL").innerHTML = '<span id="mweFLOp"><span>(off)</span></span>';
		}
		if(HLFun == true){
			document.getElementById("mweHL").setAttribute("class", "sexy_button_new short green");
			document.getElementById("mweHL").innerHTML = '<span id="mweHLOp"><span>(on)</span></span>';
		}
		if(HLFun == false){
			document.getElementById("mweHL").setAttribute("class", "sexy_button_new short red");
			document.getElementById("mweHL").innerHTML = '<span id="mweHLOp"><span>(off)</span></span>';
		}
		else{return;}
}	
/**This empties the PSMWE_content DIV in left hand pane and replaces it with the energy tools content**/
function EN(){
	content = document.getElementById("PSMWE_content");
	content.innerHTML = ENCnt;
	/**NewYork job tabs**/
		document.getElementById('NewYork1').addEventListener('click', NewYork1, false);
		document.getElementById('NewYork2').addEventListener('click', NewYork2, false);
		document.getElementById('NewYork3').addEventListener('click', NewYork3, false);
		document.getElementById('NewYork4').addEventListener('click', NewYork4, false);
		document.getElementById('NewYork5').addEventListener('click', NewYork5, false);
		document.getElementById('NewYork6').addEventListener('click', NewYork6, false);
		document.getElementById('NewYork7').addEventListener('click', NewYork7, false);
		document.getElementById('NewYork8').addEventListener('click', NewYork8, false);
		document.getElementById('NewYork9').addEventListener('click', NewYork9, false);
	/**Bangkok job tabs**/	
		document.getElementById('BangkokE1').addEventListener('click', BangkokE1, false);
		document.getElementById('BangkokE2').addEventListener('click', BangkokE2, false);
		document.getElementById('BangkokE3').addEventListener('click', BangkokE3, false);
		document.getElementById('BangkokE4').addEventListener('click', BangkokE4, false);
		document.getElementById('BangkokE5a').addEventListener('click', BangkokE5a, false);
		document.getElementById('BangkokE5b').addEventListener('click', BangkokE5b, false);
		document.getElementById('BangkokE6').addEventListener('click', BangkokE6, false);
		document.getElementById('BangkokE7').addEventListener('click', BangkokE7, false);
	/**LasVegas job tabs**/	
		document.getElementById('LasVegasD1').addEventListener('click', LasVegasD1, false);
		document.getElementById('LasVegasD2').addEventListener('click', LasVegasD2, false);
		document.getElementById('LasVegasD3').addEventListener('click', LasVegasD3, false);
		document.getElementById('LasVegasD4').addEventListener('click', LasVegasD4, false);
		document.getElementById('LasVegasD5').addEventListener('click', LasVegasD5, false);
		document.getElementById('LasVegasD6').addEventListener('click', LasVegasD6, false);
		document.getElementById('LasVegasD7').addEventListener('click', LasVegasD7, false);
		document.getElementById('LasVegasD8').addEventListener('click', LasVegasD8, false);
	/**Italy job tabs**/	
		document.getElementById('ItalyR1').addEventListener('click', ItalyR1, false);
		document.getElementById('ItalyR2').addEventListener('click', ItalyR2, false);
		document.getElementById('ItalyR3').addEventListener('click', ItalyR3, false);
		document.getElementById('ItalyR4').addEventListener('click', ItalyR4, false);
		document.getElementById('ItalyR5').addEventListener('click', ItalyR5, false);
		document.getElementById('ItalyR6').addEventListener('click', ItalyR6, false);
		document.getElementById('ItalyR7').addEventListener('click', ItalyR7, false);
		document.getElementById('ItalyR8').addEventListener('click', ItalyR8, false);
	/**Brazil job tabs**/	
		document.getElementById('BrazilD1').addEventListener('click', BrazilD1, false);
		document.getElementById('BrazilD2').addEventListener('click', BrazilD2, false);
		document.getElementById('BrazilD3').addEventListener('click', BrazilD3, false);
		document.getElementById('BrazilD4').addEventListener('click', BrazilD4, false);
		document.getElementById('BrazilD5').addEventListener('click', BrazilD5, false);
				  
	document.getElementById('ItJ').addEventListener('click', ItJ, false);
	document.getElementById('DoBrazilJob').addEventListener('click', DoBrazilJob, false);
	LVItNoDelayState = true;
	VItNoDelay = setInterval(ClearLVItJobDelay, 500);
	document.getElementById('NewYorkJobber').addEventListener('click', NewYorkJobber, false);
}		
/**This empties the PSMWE_content DIV in left hand pane and replaces it with the enhancer content**/	
function EH(){ 
	content = document.getElementById("PSMWE_content");
	content.innerHTML = EHCnt;
}
/**This empties the PSMWE_content DIV in left hand pane and replaces it with the operation content**/	
function OP(){ 
	content = document.getElementById("PSMWE_content");
	content.innerHTML = OPCnt;
	document.getElementById('OPC1').addEventListener('click', Operation1, false);
	document.getElementById('OPC2').addEventListener('click', Operation2, false);
	document.getElementById('OPC3').addEventListener('click', Operation3, false);
	document.getElementById('AllOperations').addEventListener('click', AllOperations, false);
}
/**This empties the PSMWE_content2 DIV in right hand pane and replaces it with the log content**/
function LOG(){
	L1 = true; 
	L2 = false;
	content = document.getElementById("PSMWE_content2");
	content.innerHTML = Log;  
	document.getElementById("PS_MWE_LOG").innerHTML = MWE_Log;
}
/**This empties the PSMWE_content2 DIV in right hand pane and replaces it with the unknown content**/
function LOG2(){
    L1 = false;
    L2 = true;
	content = document.getElementById("PSMWE_content2");
	content.innerHTML = Log2;    
	document.getElementById("PS_MWE_LOG2").innerHTML = MWE_Log2;
}
	
/**This quickbanks in the current city, and the XHR function will log the results**/
function QuikBank(){
	url = 'html_server.php?xw_controller=bank&xw_action=deposit_all&xw_city='+city+'&amount=1000000000';
	send = 'ajax=1&liteload=1&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig;
	from = 'QBank';
	XHR(url, send, from);
}
/**This is the start of the Italy LV Jobber, it checks the current job, and region, and then passes
the information onto XHR() which actually performs the job**/
function ItJ(){
    try{
		J = document.evaluate('//div[@class="job_info"][@style[contains(string(),"255, 255, 255")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		J = J.snapshotItem(0).id;
		J = (/job([\d]+)/.exec(J))[1];		
		T = document.evaluate('//li[@class[contains(string(),"tab_on")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		T = T.snapshotItem(0).id;
		T = (/tab_([\d]+)/.exec(T))[1];
	}
	catch(e){T = 8;}
    if((/undefined/.test(J))){addToLog('Oh no!<b>PS MWE</b> did not a job to repeat, please perform the job that you wish to perform and then click <b>Old City Jobber</b> again.');return;}
	url = 'html_server.php?xw_controller=map&xw_action=dojob&xw_city=6&job='+J+'&tab='+T+'&click_origin=sidepanel_button&opponent_id=undefined&job_sig=undefined&xw_client_id=8';	
	send = 'ajax=1&liteload=1&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig+'&skip_req_frame=1';
	from = 'ItJob';
	XHR(url, send, from);			
}
/**Grabs the users RL name, P|ID and current xw_sig**/
function GetXW(){
		xw_user = (/p\|([\d]+)/.exec(page))[1];
		xw_sig = (/local_xw_sig = '([\da-f]+)/.exec(page))[1];
		name = (/\'name\': \'(.+?)\b /.exec(page))[1];
		debug(name+'<br>'+xw_user+'<br>'+xw_sig);

}

/**Is used for 5 functions, QHeal, QHealNY, QuiKBank, QuikCollect & ItJ
XHR is passed information regarding the originating function, and then acts accordingly.**/
function XHR(url, send, from){
var client = new XMLHttpRequest();
client.open("POST", url, true);
client.setRequestHeader("X-Requested-With","XMLHttpRequest");
client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
client.send(send);
client.onreadystatechange = function() {
	if(this.readyState == 4) {
		response=client.responseText;
		if((/user_cash_nyc":"([$\d,]+)"/.test(response))){
			var CurHlt = parseInt((/user_health":([\d]+),/.exec(response))[1]);
			var UserMaxHealth = parseInt((/user_max_health":([\d]+),/.exec(response))[1]);
			var PercentComplete = (/percent_complete":([\d]+),"/.exec(response))[1];
			document.getElementById('user_health').innerHTML = CurHlt;         
			document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
			document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok":"([B$\d,]+)"/.exec(response))[1];
			document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy":"([L$\d,]+)"/.exec(response))[1];
			document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
			document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
     		document.getElementById("level_bar").setAttribute('style','overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: '+ PercentComplete + '%;');
			document.getElementById('user_stamina').innerHTML = (/"user_stamina":([\d]+),"user_max_stamina/.exec(response))[1];	
		}
		else if((/user_cash_nyc'\] = "([$\d,]+)/.test(response))){
			var CurHlt = parseInt((/user_health'\] = parseInt\("([\d]+)/.exec(response))[1]);
			var UserMaxHealth = parseInt((/user_max_health'\] = parseInt\("([\d]+)/.exec(response))[1]);
			var PercentComplete = (/percent_complete'\] = "([\d]+)/.exec(response))[1];
			document.getElementById('user_health').innerHTML = CurHlt;         
			document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc'\] = "([$\d,]+)/.exec(response))[1];
			document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok'\] = "([B$\d,]+)/.exec(response))[1];
			document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy'\] = "([L$\d,]+)/.exec(response))[1];
			document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas'\] = "([V$\d,]+)/.exec(response))[1];
			document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil'\] = "([BRL$\d,]+)/.exec(response))[1];
     		document.getElementById("level_bar").setAttribute('style','overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: '+ PercentComplete + '%;');
			document.getElementById('user_stamina').innerHTML = (/user_stamina'\] = parseInt\("([\d]+)/.exec(response))[1];	
		}
		try {
			if(from == 'QCollect'){	
				if((/"success_message\\":\\"(.+)\\".\\"CASH/.test(response))){
					var CollectedCash = (/"CASH\\":\\"(.+)\\"\}/.exec(response))[1];
					var CollectedEnergy = (/, (.+) energy/.exec(response))[1];
					var CollectedStamina = (/energy and (.+) stamina/.exec(response))[1];
					if(CollectedEnergy == '%ENERGY%'){CollectedEnergy = 0}
					if(CollectedStamina == '%STAMINA%'){CollectedStamina = 0}
					addToLog('You collected <span id="timestamp">'+CollectedCash+'</span>, <span id="timestamp">'+CollectedEnergy+'</span> energy & <span id="timestamp">'+CollectedStamina+'</span> stamina.');
				}
				else if((/"success_message":"(.+)"."CASH/.test(response))){
					var BrazilCollectMsg = (/"success_message":"(.+)"."CASH/.exec(response))[1];	
					addToLog('<span id="timestamp">'+BrazilCollectMsg+'</span>');
				}
				/*if((/You have collected BRL\$([\d,]+), %ENERGY% energy and %STAMINA% stamina from your properties./.test(response))){
					var ClctAmt = (/You have collected (.+), %ENERGY% energy and %STAMINA% stamina from your properties./.exec(response))[1];	
					addToLog('<span id="timestamp">'+ClctAmt+'</span> was collected from your properties.');
				}*/
				else if((/You have collected/.test(response))){
					var ClctAmt = (/You have collected (.+) from your properties./.exec(response))[1];	
					addToLog('<span id="timestamp">'+ClctAmt+'</span> was collected from your properties.');
				}
				else{addToLog('You have no properties to be collected!')}
			}
			if(from == 'QBank'){
				if((/You need to deposit at least/.test(response))){
					addToLog('You do not have enough cash to deposit!');
									
				}
			
				else if((/was deposited in your account/.test(response))){
					var BnkAmt = (/bank_balance":"(.+)","user_cash"/.exec(response))[1];	
					var MnyBnkd = (/money\\\">(.+)<\\\/span><\\\/span/.exec(response))[1];
					addToLog('<span id="timestamp">'+MnyBnkd+'</span> was deposited into your account, bringing your current balance to <span id="timestamp">'+BnkAmt+'</span>');		
				}
			}
			else if(from == 'QHeal'){
				if((/hospital_success":1/.test(response))){
					if((/The doctor healed/.test(response))){
						var Healed = (/([\d]+) health/.exec(response))[1];
						var HealCst = (/span> for (.+).<\\\/span/.exec(response))[1];
						addToLog('The doctor healed <span id="timestamp">'+Healed+'</span> health for <span id="timestamp">'+HealCst+'</span>');
						HealCount();
					}
					else if((/You are already at full health/.test(response))){
						addToLog('You are already at full health!');
						AH=0;
					}
					else if((/You cannot heal so fast/.test(response))){
						addToLog('You cannot heal so fast!<br>You were attacking: '+opponent+'<br><i><span id="timestamp">Retrying in 5 seconds . . .</span></i>');
					}
				}
			}
			else if(from == 'ItJob'){
				if((/job_results/.test(response))){
					if((/success\\":0/.test(response))){
						var ItemNdd = (/missing_items\\":\[\{\\"name\\":\\"([\w ]+)\\",\\"travel_link\\":\{\\"link/.exec(response))[1];
						var JobName = (/job_name\\":\\"(.+)\\"}],\\"new_needed_items/.exec(response))[1];
						var TrvlLnk = (/'inner_page','remote\\\\\\\/(.+)',1,1,0,0\);\\"\},\\"amount/.exec(response))[1];
							
						try{addToLog('You ran out of '+ItemNdd+'\'s to perform the job, <a href="#" onclick="do_ajax(\'mw_city_wrapper\',\'remote/'+TrvlLnk+'\')">'+JobName+'</a> drops these.');}
						catch(e){alert(e.toString())}
					}
					else if((/success\\":1/.test(response))) {
						object = eval("("+response+")");
						objectdata = eval("("+object.data.replace(/\\"/g,'')+")");
						ItJParse();			
					}
			    }
			}
		}			
		catch(e){	
			debug(e.toString());
			debug('<span class="bad">Oh-noes! It looks like something has gone horribly wrong!</span>');	
		}
	}
}
}
	
/**Parses results from XHR, originally from ItJ, and logs the outcome, and updates stats.**/	
function ItJParse(){
			CurNRG = parseInt(objectdata.job_results.energy_remaining) || 0;
			document.getElementById('user_energy').innerHTML = CurNRG;
			CurCASH = parseInt(objectdata.job_results.cash) || 0;
			document.getElementsByClassName('cur_cash').innerHTML = CurCASH;
			XP2Lvl = parseInt(objectdata.job_results.exp_remaining) || 0;
			document.getElementById('exp_to_next_level').innerHTML = XP2Lvl;	
			J = parseInt(objectdata.job_results.job_id) || 0;	
			T = parseInt(objectdata.job_results.district_id) || 0;
			Outcome = objectdata.job_results.outcome;
			XPRet = parseInt(objectdata.job_results.exp_gained) || 0;
			NRGSpe = parseInt(objectdata.job_results.energy_consumed) || 0;
			CASHRet = parseInt(objectdata.job_results.cash_gained) || 0;
			PC2End = parseInt(objectdata.job_results.job_mastery_percentage) || 0;
			addToLog(Outcome+ '! Gaining: <span class="good">'+XPRet+'XP</span> and <span class="good">L$'+CASHRet+'</span>. '+PC2End+'% Complete');
			Job();
			if( PC2End < 100 && CurNRG > NRGSpe){ItJ();}
			else if(PC2End == 100){addToLog('Job No.: '+J+' is mastered!');}		
			else if(CurNRG < NRGSpe){addToLog('Job No.: '+J+' costs '+NRGSpe+' energy, but you only have <span class="bad">'+CurNRG+'</span> energy left, halting It LV Jobber');}
}	
		
/**Adds the passed message to the main log, after appending the current date and time**/
function addToLog(msg){
				LogMsgDate();
if(L2 == true){MWE_Log = '<span id="timestamp">'+timestampdate+' '+timestamptime+'</span><br>'+ msg + '<br><hr>' + MWE_Log;}		
else if(L1 == true){MWE_Log = document.getElementById("PS_MWE_LOG").innerHTML = '<span id="timestamp">'+timestampdate+' '+timestamptime+'</span><br><font color="white">'+ msg + '</font><br><hr>' + MWE_Log;}
                       for (i = 0; i < brags.length; i++) {
						   document.getElementById('ice_post' + i).onclick = pubIce;
					    }		
}

/**Cookies and milk gubbins**/
function writeCookieStuff() {
		var a = Autoheal +'|'+ FLFun +'|'+ HLFun +'|'+ FLBS +'|'+ HLBS;
		createCookie('PS_MWE', a);
}

function createCookie(a, b) {
	var c = new Date();
	c.setDate(c.getDate() + 120);
	document.cookie = a + "=" + b + ";expires=" + c.toGMTString() + "; path=/"
}
/**Attempts to read the cookie, if successful, it adds 'Welcome back!PS MWE stats loaded!' to the log, otherwise, it informs
the user that they must be new, and then saves a default cookie. **/
function readCookieStuff() {
	try {
		var a = readCookie('PS_MWE');
		if (a == null || (/undefined/.test(a))) {
			addToLog('Hey '+name+', welcome to PS MWE beta!<br>Take a look around, and don\'t forget to check out the <a target="_blank" href="http://www.playerscripts.com/pswiki/index.php?title=PS_MWE">PS MWE Wiki article</a> for any help.');
			Autoheal = false;FLFun = false;HLFun = false;FLBS = false;HLBS = false;
			writeCookieStuff();
			return;
		}
		addToLog('<i>Welcome back!</i><br>PS MWE stats loaded!\n');
		a = a.split('|');
		Autoheal = a[0];
		FLFun = a[1];
		HLFun = a[2];
		FLBS = a[3];
		HLBS = a[4];
		if(Autoheal == 'true'){
			Autoheal = true;
			if(isiPad){
				DoAutoHealInt = setInterval(DoAutoHeal, 5250);
			}
			else{
				DoAutoHealInt = setInterval(DoAutoHeal, 4750);
			}
		}
		else{Autoheal = false;}
		if(FLFun == 'true'){
			FLFun = true;
		}
		else{FLFun = false;}
		if(HLFun == 'true'){
			HLFun = true;
			if(isiPad){
				HLinterval = setInterval(HLWin, 1250);
			}
			else{
				HLinterval = setInterval(HLWin, 500);
			}
		}
		else{HLFun = false;}
		if(FLBS == 'true'){FLBS = true}
		else{FLBS = false}
		if(HLBS == 'true'){HLBS = true}
		else{HLBS = false}
		if(Autoheal == true || FLFun == true || HLFun == true){setTimeout(ST,650);}
	} 
	catch(e) {alert(e.toString());}
}

function readCookie(a) {
	var i, cookie, nameEQ = a + "=",
	cookieArray = document.cookie.split(";");
	for (i = 0; i < cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
		if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length);
	}
	return null;
}

/**Clears the content of PS_MWE_Log div, and the PS_MWE_Log var**/
function ClrLg(){
	document.getElementById("PS_MWE_LOG").innerHTML = '';
	MWE_Log = '';
	debug('Log cleared');
}

/**Is called once a job has been succesfully completed by PS MWE, then adds 1 to 
the total jobs completed, updates the stat, and saves the new cookie**/
function Job(){
	jobs++;
	document.getElementById("JobsComp").innerHTML = jobs;
	writeCookieStuff();	
}

function ClearStats() {
		jobs = 0;fightsW = 0; fightsL = 0;robsW = 0;robsL = 0;heal = 0;bounties = 0;ices = 0; kills = 0;Rboards = 0;
		document.getElementById("JobsComp").innerHTML = jobs;
		document.getElementById("FightsWon").innerHTML = fightsW;
		document.getElementById("FightsLost").innerHTML = fightsL;
		document.getElementById("RobsWon").innerHTML = robsW;
		document.getElementById("RobsLost").innerHTML = robsL;
		document.getElementById("Heals").innerHTML = heal;
		document.getElementById("Bounties").innerHTML = bounties;
		document.getElementById("Ices").innerHTML = ices;
		document.getElementById("Kills").innerHTML = kills;
		document.getElementById("RobBoards").innerHTML = Rboards;
		document.getElementById("RPcent").innerHTML = '0';
		document.getElementById("FPcent").innerHTML = '0';
}
function ClearSettings(){
	HOME();
	Autoheal = false;
	FLFun = false;
	HLFun = false;
	FLBS = false;
	HLBS = false;
	LiveLinkOption = false;
	LVItNoDelayState = false;
	try{clearInterval(HLinterval)}catch(e){}
	try{clearInterval(FLinterval)}catch(e){}
	try{clearInterval(DoAutoHealInt)}catch(e){}
	try{clearInterval(LiveLinkFeedInt)}catch(e){}
	try{clearInterval(LVItNoDelay)}catch(e){}
	a = 'false|false|false|false|false';
	createCookie('PS_MWE', a);
	debug('Cookie crumbled!');
}
/**This adds messages to the debug log, IF debug is turned on**/
function debug(msg){
	if(EDebug == true){
		addToLog('<span style="font-color:#ffffff">DEBUG:</span> <span class="bad">' + msg + '</span>');
	}
	if(EDebug == false){
	return;
	}
}
/**Attempts to heal in NY without needing to travel, it seems to try healing lots & lots,
so i added var AH to throttle healing to the declared tries.**/
function QHealNY(){
	url = 'html_server.php?xw_controller=hospital&xw_action=heal&xcity=1';
	send = 'ajax=1&liteload=1&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig;
	from = 'QHeal';
	XHR(url, send, from);
}
function QHealNYRetry(){
	addToLog('You cannot heal so fast!<br><i><span id="timestamp">Retrying in 5 seconds . . .</span></i>');
	AH=0;
	var CurHea = parseInt(document.getElementById('user_health').innerHTML);
	var maxHealth = parseInt(document.getElementById('user_max_health').innerHTML);
	if(CurHea == maxHealth){return;}
	else{QHealNY()}
}
/**Attempts to heal in the current sity, passed to XHR, wheere the results are parsed and logged**/
function QHeal(){
	url = 'html_server.php?xw_controller=hospital&xw_action=heal&xw_city='+city;
	send = 'ajax=1&liteload=1&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig;
	from = 'QHeal';
	XHR(url, send, from);
}
/**Is called after a successful heal, adds +1 to the total MWE heal count, and resets AH to be used next time**/
function HealCount(){
	heal++;
	AH = 0;
	document.getElementById("Heals").innerHTML = heal;
}
/**Simple switch to enable and disable debug**/
function EnableDebug(){
	if(EDebug == false){EDebug = true;addToLog('Debugging enabled');return;}
	if(EDebug == true){EDebug = false;addToLog('Debugging disabled');return;}
}
/**Attempts to collect from every property in the current city**/
function QCollect(){
	url = 'html_server.php?xw_controller=propertyV2&xw_action=collectall&xw_city='+city;
	send = 'ajax=1&liteload=0&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig;
	from = 'QCollect';
	XHR(url, send, from);
}
/**This switches Autoheal between true & false when the button is clicked**/
function AutoHeal(){
	if(Autoheal == true){Autoheal = false;writeCookieStuff();
		document.getElementById("AutoH").setAttribute("class", "sexy_button_new short red");
		document.getElementById("AutoH").innerHTML = '<span id="AutoHOp"><span>(off)</span></span>';
		clearInterval(DoAutoHealInt);
	}
	else if(Autoheal == false){Autoheal = true;writeCookieStuff();AH=0;
		document.getElementById("AutoH").setAttribute("class", "sexy_button_new short green");
		document.getElementById("AutoH").innerHTML = '<span id="AutoHOp"><span>(on)</span></span>';
		if(isiPad){
			DoAutoHealInt = setInterval(DoAutoHeal, 5250);
		}
		else{
			DoAutoHealInt = setInterval(DoAutoHeal, 4750);
		}
	}	
}
function DoAutoHeal(){
	if(Autoheal == true){
		var url = "html_server.php?xw_controller=survey&xw_action=show_nps_survey&xw_client_id=8";
		var maxHealth = parseInt(document.getElementById('user_max_health').innerHTML);
		var healat = 40;
		var HealthPCent = parseInt(maxHealth * .15);
		if(HealthPCent > 40) {healat = HealthPCent}
		if(parseInt(document.getElementById('user_health').innerHTML) < healat){QHealNY();}
		var client = new XMLHttpRequest();
		client.open("POST", url, true);
		client.setRequestHeader("X-Requested-With","XMLHttpRequest");
		client.setRequestHeader("Accept","*/*");
		client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		client.send("ajax=1&liteload=1&sf_xw_user_id=p%7C"+xw_user+"&sf_xw_sig="+xw_sig+"&skip_req_frame=1");
		client.onreadystatechange = function() {
			if(this.readyState == 4) {
				response=client.responseText;
				document.getElementById('user_health').innerHTML = (/user_health":([\d]+)."/.exec(response))[1];
				maxHealth = parseInt(document.getElementById('user_max_health').innerHTML);
				healat = 40;
				HealthPCent = parseInt(maxHealth * .15);
				if(HealthPCent > 40) {healat = HealthPCent}
				if(parseInt(document.getElementById('user_health').innerHTML) < healat){QHealNY();}
			}
		}
	}
	else if(Autoheal == false){return;}
}
/**This will set an interval for HLWin to be called, which checks the page for a valid target.
If HLListener is already enabled, it clears the interval**/
function HLListener(){
	if(HLBS == false){HLBS  = true;HLFun = true;writeCookieStuff();
		document.getElementById("mweHL").setAttribute("class", "sexy_button_new short green");
		document.getElementById("mweHL").innerHTML = '<span id="mweHLOp"><span>(on)</span></span>';
		if(isiPad){
		   HLinterval = setInterval(HLWin, 1250);
		}else{
		   HLinterval = setInterval(HLWin, 500);
		}
	}
	else if(HLBS == true){HLBS  = false;HLFun = false;writeCookieStuff();
		document.getElementById("mweHL").setAttribute("class", "sexy_button_new short red");
		document.getElementById("mweHL").innerHTML = '<span id="mweHLOp"><span>(off)</span></span>';
		clearInterval(HLinterval);
	}
}
/**This will set an interval for FLWin to be called, which checks the page for a valid target.
If FLListener is already enabled, it clears the interval**/
function FLListener(){
	if(FLFun == false){
		FLFun = true;
		FLBS  = true;
		writeCookieStuff();
		ST();
	}
	else if(FLFun == true){
		FLFun = false;
		FLBS  = false;
		writeCookieStuff();
		ST();
		if(FLToggle){
			FLToggle = false;
			clearInterval(FLinterval);
		}
	}	
}
/**Checks the page for results from a hitlist attack, if won, will grab the onclick attribute of the attack again button
and then hit it every 750ms**/
function HLWin(){
	HL0 = document.evaluate( "//a[@class='sexy_button_new short red sexy_attack_new'][contains(string(),'Attack Again')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    if(HL0.snapshotLength == 0){ return;}
	HL0 = HL0.snapshotItem(0).href;
	var HLResult = document.getElementById('content_row').innerHTML;
	OpponentId = (/target_pid=([\d]+)/.exec(HL0))[1];
	if(OpponentId != LastHitId){
		LastHitId = OpponentId;
		if((/message_body">You <strong>LOST<\/strong> the fight/.test(HLResult))){
			fight('l'); 
			return;	
		}
		if((/You knocked out/.test(HLResult))){	
			opponent = (/You knocked out (.+) and earned/.exec(HLResult))[1];
			addToLog('You knocked '+opponent+' off of the hitlist!');
			fight('b');
			fight('k');
		}
		if(/message_body">You <strong>WON<\/strong> the fight/.test(HLResult)){
			fight('w');	
			if((/You (found|gained) (\d)(.+)!/.test(HLResult))){
				HLResult = document.getElementById('content_row').innerHTML;
				HLLootGain = (/You (found|gained) (\d)(.+)!/.exec(HLResult))[3];
				addToLog2(HLLootGain+'!</br>');
			}		
		}
	}
	if((/message_body">You <strong>LOST<\/strong> the fight/.test(HLResult))){
			return;	
		}
	if(CurStam == '0'){
		addToLog('<span class="bad">Not enough stamina to continue.</span>');
		HLListener();
		return;}
	HL0 = (/xw_controller=hitlist&xw_action=attack([&\w\d=]+)/.exec(HL0))[0];
	HIT = 'html_server.php?'+HL0;
	send = 'ajax=1&liteload=1&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig;
	url = HIT;
	from = 'HLWin';
	XHRb(url, send, from);
}
/**Checks the current page, to see if you won your last attack, if not, it will keep looking. If you won, AND your stamina 
is above 0, it will copy the onclick attribute of the power attack button, and hit it every 750ms, it will also parse the page
for ices + kills, and also loot gained, adds a +1 to fights won on the initial check, and +5 on the resulting attacks.**/
function FLWin(){
debugger;
	if(document.getElementById('btn_powerattack') && (/>You Won!</.test(document.getElementsByTagName('html')[0].innerHTML))){
		var PA = document.getElementById('btn_powerattack');
		var p = /inner_page',\W'remote\W(.+)', 1, 1, 0, 0/;
		if((p.test(PA))){url = (p.exec(PA))[1]}
		else{url = PA.href}
		send = 'ajax=1&liteload=1&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig;
		from = 'FLWin';
		XHRb(url, send, from);
	}
}
/**this is the xmlhhtp request function for FLWin & HLWin it parses the results and updates the page with them
also checks for Autoheal state, and acts accordingly**/
function XHRb(url, send, from){
var client = new XMLHttpRequest();
client.open("POST", url, true);
client.setRequestHeader("X-Requested-With","XMLHttpRequest");
client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
client.send(send);
	client.onreadystatechange = function() {
		if(this.readyState == 4) {
			response=client.responseText;
			document.getElementById("inner_page").innerHTML = response;
			CurStam = (/user_fields\['user_stamina'\] = parseInt\("([\d]+)/.exec(response))[1];
			document.getElementById("exp_to_next_level").innerHTML = (/user_fields\['exp_to_next_level'\] = parseInt\("([\d]+)/.exec(response))[1];
			document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc'\] = "([$\d,]+)"/.exec(response))[1];
			document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok'\] = "([B$\d,]+)"/.exec(response))[1];
			document.getElementById("user_cash_italy").innerHTML = (/'user_cash_italy'\] = "([L$\d,]+)"/.exec(response))[1];
			document.getElementById("user_cash_vegas").innerHTML = (/'user_cash_vegas'\] = "([V$\d,]+)"/.exec(response))[1];
			document.getElementById("user_cash_brazil").innerHTML = (/'user_cash_brazil'\] = "([BRL$\d,]+)"/.exec(response))[1];
			document.getElementById('user_stamina').innerHTML = CurStam;
			document.getElementById('user_health').innerHTML = (/user_health'\] = parseInt\("([\d]+)/.exec(document.getElementsByTagName('html')[0].innerHTML))[1];
			if(from == 'HLWin'){
				if((/LOST/.test(response))){
					fight('l');
					return;
				}
				if((/You <strong>WON<\/strong> the fight, taking <strong>([\d]+) damage<\/strong> and dealing <strong> ([\d]+) damage<\/strong> to your enemy./.test(response))){
					fight('w');
					if((/You (found|gained)/.test(response))){
						HLResult = document.getElementById('content_row').innerHTML;
						HLLootGain = (/You (found|gained) (\d)(.+)!/.exec(HLResult))[3];
						addToLog2(HLLootGain+'!</br>');
					}	
				}
				if((/You knocked out/.test(response))){
					opponent = (/You knocked out (.+) and earned/.exec(response))[1];
					addToLog('You knocked '+opponent+' off of the hitlist!');
					fight('b');
					fight('k');
					fight('w');
				}
				else if((/someone else took out (.+) before you got the chance/.test(response))){
					opponent = (/someone else took out (.+) before you got the chance/.exec(response))[1];
						addToLog('The bounty for '+opponent+' has alrady been claimed.');
				}
			}
			else if(from == 'FLWin'){
			Fpage = document.getElementsByClassName('fightres_opponent')[0].innerHTML;
				document.getElementById("inner_page").innerHTML = response;
				opponent = (/fightres_name">(.+)</.exec(document.getElementsByClassName('fightres_opponent')[0].innerHTML))[1];
			   parseFight(response);
		    }
		}
	}
}
/**Alters the current fight stats, and saves cookie, relating to what fight() was passed**/
function fight(rEsult){
	if(rEsult=='w'){fightsW = parseInt(fightsW)+1;document.getElementById("FightsWon").innerHTML = fightsW;}
	else if(rEsult=='l'){fightsL++;document.getElementById("FightsLost").innerHTML = fightsL;}
	else if(rEsult=='b'){bounties++;document.getElementById("Bounties").innerHTML= bounties;}
	else if(rEsult=='i'){ices++;document.getElementById("Ices").innerHTML = ices;}
	else if(rEsult=='k'){kills++;document.getElementById("Kills").innerHTML = kills;}
	else if(rEsult=='pa'){fightsW = parseInt(fightsW) + 5;document.getElementById("FightsWon").innerHTML = fightsW;}
	else if(rEsult == 1||2||3||4||5){fightsW = parseInt(fightsW) + parseInt(rEsult);document.getElementById("FightsWon").innerHTML = fightsW;}
	var fightWInt = parseFloat(fightsW);var fightLInt = parseFloat(fightsL);
	document.getElementById("FPcent").innerHTML = (fightWInt/(fightWInt+fightLInt)*100).toFixed(2);
}
/**pause function courtesy of www.sean.co.uk**/
/**Simply pauses the script for X milliseconds**/
function p(millis){
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); } 
	while(curDate-date < millis);
} 
/**Sets the page title**/
function SetTitle(){
	document.title = 'PS MWE v'+PS_MWE_VER;
}
/**This adds items to the loot log**/
function addToLog2(msg){
	LogMsgDate();
	if(L2 == true){
	   var shortmsg = (/(.+)!/.exec(msg))[1];
	    if(MWE_Log2.search(shortmsg) != -1){
	      var re = new RegExp('(\\d+) x '+shortmsg);
	      var lootcount = re.exec(MWE_Log2)[1];
	      lootcount++;
		  MWE_Log2 = document.getElementById("PS_MWE_LOG2").innerHTML = MWE_Log2.replace(re,lootcount + ' x '+shortmsg);
	    } 
		else{
	       MWE_Log2 = document.getElementById("PS_MWE_LOG2").innerHTML ='1 x '+ msg + MWE_Log2;
		}
    }
	else if(L1 == true){
	    if(MWE_Log2.search(msg) != -1){
	      var re = new RegExp('(\\d+) x '+msg);
	      var lootcount = re.exec(MWE_Log2)[1];
	      lootcount++;
		  MWE_Log2 =  MWE_Log2.replace(re,lootcount + ' x '+msg);
	    } 
		else{
	       MWE_Log2 ='1 x '+ msg + MWE_Log2;
		}
	}
}
/**Removes the missions bar**/
function RemMB_HPC(){
	document.getElementById('quest').innerHTML='';
}
/**Timestamp & Datestamp function courtesy of PS MWAP**/
function LogMsgDate(){
	currentTime = new Date();
	m_names = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	timestampdate = m_names[currentTime.getMonth()] + ' ' + currentTime.getDate();
	timestamptime = (currentTime.getHours() < 10 ? 0 : '') + currentTime.getHours() + ':' +
					(currentTime.getMinutes() < 10 ? 0 : '') + currentTime.getMinutes() + ':' +
					(currentTime.getSeconds() < 10 ? 0 : '') + currentTime.getSeconds() + ' ';
}
/**Looks at the robbing page, grabs the specific info for each of the 9 robbing slots, and passes them to PreRob**/
function GetRobs(){
	var RegExp = /Stamina Used">([\d]+)/;
	StamCostTotal=0;
	InnerPage = document.getElementById('inner_page').innerHTML;
	if((RegExp.test(InnerPage))){
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_0').innerHTML))[1]);
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_1').innerHTML))[1]);
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_2').innerHTML))[1]);
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_3').innerHTML))[1]);
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_4').innerHTML))[1]);
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_5').innerHTML))[1]);
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_6').innerHTML))[1]);
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_7').innerHTML))[1]);
		StamCostTotal = StamCostTotal + parseInt((RegExp.exec(document.getElementById('rob_slot_8').innerHTML))[1]);
	}
	RobBtn = document.evaluate( "//a[@class='sexy_button_new short red'][contains(string(),'Rob')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );	
	var RobRegEx = /xw_controller=robbing&xw_action=rob([&\w\d\=]+)/;
	Slot0 = (RobRegEx.exec(RobBtn.snapshotItem(0).onclick))[0];
	Slot0 = 'html_server.php?'+Slot0;
	Slot1 = (RobRegEx.exec(RobBtn.snapshotItem(1).onclick))[0];
	Slot1 = 'html_server.php?'+Slot1;
	Slot2 = (RobRegEx.exec(RobBtn.snapshotItem(2).onclick))[0];
	Slot2 = 'html_server.php?'+Slot2;
	Slot3 = (RobRegEx.exec(RobBtn.snapshotItem(3).onclick))[0];
	Slot3 = 'html_server.php?'+Slot3;
	Slot4 = (RobRegEx.exec(RobBtn.snapshotItem(4).onclick))[0];
	Slot4 = 'html_server.php?'+Slot4;
	Slot5 = (RobRegEx.exec(RobBtn.snapshotItem(5).onclick))[0];
	Slot5 = 'html_server.php?'+Slot5;
	Slot6 = (RobRegEx.exec(RobBtn.snapshotItem(6).onclick))[0];
	Slot6 = 'html_server.php?'+Slot6;
	Slot7 = (RobRegEx.exec(RobBtn.snapshotItem(7).onclick))[0];
	Slot7 = 'html_server.php?'+Slot7;
	Slot8 = (RobRegEx.exec(RobBtn.snapshotItem(8).onclick))[0];
	Slot8 = 'html_server.php?'+Slot8;
	PreRob(Slot0, Slot1, Slot2, Slot3, Slot4, Slot5, Slot6, Slot7, Slot8);
}
/**This function used to give little waits between each rob, but the pause call in XHRrob now does this**/
function PreRob(Slot0, Slot1, Slot2, Slot3, Slot4, Slot5, Slot6, Slot7, Slot8){
	RobCount = 0;
	send = 'ajax=1&liteload=1&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig;
	XHRrob(Slot0, send, "0");
	XHRrob(Slot1, send, "1");
	XHRrob(Slot2, send, "2");
	XHRrob(Slot3, send, "3");
	XHRrob(Slot4, send, "4");
	XHRrob(Slot5, send, "5");
	XHRrob(Slot6, send, "6");
	XHRrob(Slot7, send, "7");
	XHRrob(Slot8, send, "8");
}

/**This performs the robs, and parses the results, determines ifthe robs should be retried, or if the board can be 'refreshed'**/
function XHRrob(url, send, slot){
	var client = new XMLHttpRequest();
	client.open("POST", url, true);
	client.setRequestHeader("X-Requested-With","XMLHttpRequest");
	client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	client.send(send);
	client.onreadystatechange = function() {
		if(this.readyState == 4) {
			response = client.responseText;
			if((/user_cash_nyc":"/.test(response))){
				RobCount++;
				var PercentComplete = (/percent_complete":([\d]+),"/.exec(response))[1];
				var XPGain = (/">([\d]+) Experience/.exec(response))[1];
				RobXPGain = parseInt(XPGain) + RobXPGain;
				RefCost = (/"refresh_cost":([\d]),"call/.exec(response))[1];
				CurStam = (/"user_stamina":([\d]+),"user_max_stamina/.exec(response))[1];
				Slot = (/slot_id".([\d])."mastery/.exec(response))[1];							
				document.getElementById("level_bar").setAttribute('style','overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: '+ PercentComplete + '%;');
				document.getElementById("exp_to_next_level").innerHTML = (/exp_to_next_level":([\d]+),/.exec(response))[1];
				document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok":"([B$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy":"([L$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
				document.getElementById('user_stamina').innerHTML = CurStam;		
				if((/SUCCESS!/.test(response))){
					robs('w');
					RobBoardWin = RobBoardWin + 1;
				}
				if((/FAILED/.test(response))){
					robs('l');
					RobBoardLoss = RobBoardLoss + 1;
				}
				if(RobBoardWin + RobBoardLoss == 9){
					robs('b');
					RefBrd();
					return
				}
				else if(RobCount == 9 && RobBoardWin + RobBoardLoss != 9){GetRobs()}
			}		
		}
	}
}
/**This 'refreshes' the board, and then populates the page with the new targets**/
function RefBrd(){
	window.location.href = 'javascript:(function(){do_ajax(\'mw_city_wrapper\',\'remote/html_server.php?xw_controller=robbing&xw_action=refresh\');}())'
	p('1000');
	var RobBoardResults = '<span class="good">' + RobBoardWin + '</span>-<span class="bad">' + RobBoardLoss + '</span>';
	var RobReturnRatio = (RobXPGain/StamCostTotal).toFixed(2);
		addToLog('Cleared the board '+RobBoardResults+', returning a ratio of <span class="good">'+RobReturnRatio+'</span>!');
		Slot = 0;
		RobXPGain = 0;
		RobBoardWin = 0;
		RobBoardLoss = 0;
		StamCostTotal = 0;
		RobBoardResults = 0;
}
/**This alters the rob stats, with whatever it is passed**/
function robs(result){
	if(result=='w'){robsW++;document.getElementById("RobsWon").innerHTML = robsW;}
	if(result=='l'){robsL++;document.getElementById("RobsLost").innerHTML = robsL;}
	if(result=='b'){Rboards++;document.getElementById("RobBoards").innerHTML = Rboards;}
	var robsWInt = parseFloat(robsW);var robsLInt = parseFloat(robsL);
	document.getElementById("RPcent").innerHTML = (robsWInt/(robsWInt+robsLInt)*100).toFixed(2);
}
/**This updates the users xw_sig so the session never goes stale**/
function UpdateXWSig(){
	var url = "http://facebook.mafiawars.com/mwfb/";
	var page = "sf_updater.php";
	var client = new XMLHttpRequest();
	client.open("POST", url+page, true);
	client.setRequestHeader("X-Requested-With","XMLHttpRequest");
	client.setRequestHeader("Accept","*/*");
	client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	client.send("ajax=1&liteload=1&sf_xw_user_id=p%7C"+xw_user+"&sf_xw_sig="+xw_sig+"&skip_req_frame=1");
	client.onreadystatechange = function() {
		if(this.readyState == 4) {
			response=client.responseText;
				xw_sig = (/local_xw_sig = '([0-9a-f]+)/.exec(response))[1];
		}
	}
}
function uid(player){
    player = decodeID(/user=(.+?)\"/.exec(player)[1]);
    player = player.replace('p|','');
    return player;
}

function decodeID (strID) {
// Unescape and clean up the ID first (for %3D string, non-base 64 strings etc)
	strID = unescape (strID);
	if (isNaN(strID)) {
		strID = decode64(strID);
	}
	return strID;
}

// Function to decode strings from Base64
function decode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
		alert('Bad decode');
	}
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}

		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";

	} 
	while (i < input.length);

	return output;
}
function encode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} 
		else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);

	return output;
}
/**Rough job function for NY/Moscow/Bangkok, repeats the performed job and updates the page, and log with results**/
//function OldCityJ(){
//	try{
//		if((/Do This Job Again!/.test(document.getElementById('inner_page').innerHTML))){
//			var RepJob = document.evaluate( "//a[@class='sexy_button_new short orange sexy_energy_new'][contains(string(),'Do This Job Again!')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//			RepJob = (/xw_controller=job&xw_action=dojob([&\w\d\=]+)/.exec(RepJob.snapshotItem(0).onclick))[0];
//		}
//		else if((/Do This Job Again/.test(document.getElementById('inner_page').innerHTML))){
//			var RepJob = document.evaluate( "//a[@class='sexy_button_new short orange sexy_energy_new'][contains(string(),'Do This Job Again')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//			RepJob = (/xw_controller=story&xw_action=dojob([&\w\d\=]+)/.exec(RepJob.snapshotItem(0).onclick))[0];
//		}
//	}
//	catch(e){debug(e.toString())}
//	url = 'html_server.php?' + RepJob;
//	var client = new XMLHttpRequest();
//	client.open("POST", url, true);
//	client.setRequestHeader("X-Requested-With","XMLHttpRequest");
//	//client.setRequestHeader("Accept","*/*");
//	client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//	client.send("ajax=1&liteload=1&sf_xw_user_id=p%7C"+xw_user+"&sf_xw_sig="+xw_sig+"&skip_req_frame=1");
//	client.onreadystatechange = function() {
//		if(this.readyState == 4) {
//			response=client.responseText;
//			document.getElementById("inner_page").innerHTML = response;
//			var JobMstry;
//			if((/margin-bottom:10px;">Job Mastery/.test(response))){JobMstry = (/margin-bottom:10px;">Job Mastery ([\d]+)/.exec(response))[1];JobMstry = parseInt(JobMstry);}
//			var JobName = (/job_outcome">"(.+)": Completed/.exec(response))[1];
//			var CurNRG = (/user_energy'\] = parseInt\("([\d]+)/.exec(response))[1];
//			var XPRet = (/message_experience">([\d]+) Experience/.exec(response))[1];
//			var ReqNRG = (/message_energy">([\d]+) Energy/.exec(response))[1];ReqNRG = parseInt(ReqNRG);
//			var CashGain = (/money">([RCLVB$\d,]+)/.exec(response))[1];
//			var LvlPcnt = (/user_info\['percent_complete'\] = "([\d]+)"/.exec(response))[1];		
//			document.getElementById("user_energy").innerHTML = CurNRG;
//			document.getElementById("level_bar").setAttribute('style','overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: '+LvlPcnt+'%;');
//			document.getElementsByClassName("cur_cash").innerHTML = (/user_cash'\] = parseInt\("([\d]+)/.exec(response))[1];
//			document.getElementById("exp_to_next_level").innerHTML = (/exp_to_next_level'\] = parseInt\("([\d]+)/.exec(response))[1];
//			document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc'\] = "([$\d,]+)"/.exec(response))[1];
//			document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok'\] = "([B$\d,]+)"/.exec(response))[1];
//			document.getElementById("user_cash_italy").innerHTML = (/'user_cash_italy'\] = "([L$\d,]+)"/.exec(response))[1];
//			document.getElementById("user_cash_vegas").innerHTML = (/'user_cash_vegas'\] = "([V$\d,]+)"/.exec(response))[1];		
//			var LootGain = '';
//			if((/message_item">(.+)<\/dd>/.test(response))){LootGain = ' & '+(/message_item">(.+)<\/dd><\/dl><dl style="width:140px/.exec(response))[1];}
//			if(JobMstry == undefined){JobMstry = 100;}
//			addToLog('Performed: "'+JobName+'" Gaining: <span class="good">'+XPRet+'</span> XP & <span class="good">'+CashGain+'</span>'+LootGain+'.<br>'+JobMstry+'% mastered.');
//			Job();
//			if(JobMstry == 100){return;}
//			else if(CurNRG < ReqNRG){var MssngNRG = parseInt(ReqNRG) - parseInt(CurNRG);addToLog('You are '+MssngNRG+' energy short of being able to perform this job again, halting Old City Jobber');}
//			else if(JobMstry < 100 && CurNRG > ReqNRG){OldCityJ();}
//		}
//	}
//}

/**Operation Code**/
var MasterOperation = function(){
	try{
		if(parseInt((/<p>([\d]+)% mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[OS].innerHTML))[1]) == 100){
			addToLog('Operation '+parseInt(OS+1)+' complete!');
			return
		}
		if(parseInt((/<p>([\d]+)% mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[OS].innerHTML))[1]) <= 99){
			OperationPerCent = parseInt((/<p>([\d]+)% mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[OS].innerHTML))[1]);
			GetOperationParams();
			window.location = OperationButton;
			setTimeout(MasterOperation, 2500)
		}
	}
	catch(e){
		if(parseInt((/<p>([\d]+)% Mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[OS].innerHTML))[1]) == 100){
			addToLog('Operation '+parseInt(OS+1)+' complete!');
			return
		}
		if(parseInt((/<p>([\d]+)% Mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[OS].innerHTML))[1]) <= 99){
			OperationPerCent = parseInt((/<p>([\d]+)% Mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[OS].innerHTML))[1]);
			GetOperationParams();
			window.location = OperationButton;
			setTimeout(MasterOperation, 2500)
		}	
	}
}

function Operation1(){
	OS = 0;
	MasterOperation()
}

function Operation2(){
	OS = 1;
	MasterOperation()
}

function Operation3(){
	OS = 2;
	MasterOperation()
}
function GetOperationParams(){
	OperationButton = document.evaluate( "//a[@class='sexy_button_new do_job sexy_energy_new medium orange'][contains(string(),'Do Job')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	OperationButton = OperationButton.snapshotItem(OS).onclick;
	OperationButton = (/doTask(.+)/.exec(OperationButton))[1];
	OperationButton = 'javascript:(function(){SocialMissionController.doTask'+OperationButton+'})()';
}
function AllOperations(){
	if((/<p>([\d]+)% Mastered<\/p>/.test(document.getElementsByClassName('socialMission')[0].innerHTML))){	
		if(parseInt((/<p>([\d]+)% Mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[0].innerHTML))[1]) != 100){
			OS = 0;
			MasterOperation();
		}
	}	
	else if((/<p>([\d]+)% mastered<\/p>/.test(document.getElementsByClassName('socialMission')[0].innerHTML))){
		if(parseInt((/<p>([\d]+)% mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[0].innerHTML))[1]) != 100){
			OS = 0;
			MasterOperation();
		}
	}
	if((/<p>([\d]+)% Mastered<\/p>/.test(document.getElementsByClassName('socialMission')[1].innerHTML))){
		if(parseInt((/<p>([\d]+)% Mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[1].innerHTML))[1]) != 100){
			OS = 1;
			MasterOperation();
		}
	}	
	else if((/<p>([\d]+)% mastered<\/p>/.test(document.getElementsByClassName('socialMission')[1].innerHTML))){	
		if(parseInt((/<p>([\d]+)% mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[1].innerHTML))[1]) <= 99){
			OS = 1;
			MasterOperation();
		}
	}	
	if((/<p>([\d]+)% Mastered<\/p>/.test(document.getElementsByClassName('socialMission')[2].innerHTML))){	
		if(parseInt((/<p>([\d]+)% Mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[2].innerHTML))[1]) <= 99){
			OS = 2;
			MasterOperation();
		}
	}
	else if((/<p>([\d]+)% mastered<\/p>/.test(document.getElementsByClassName('socialMission')[2].innerHTML))){
		if(parseInt((/<p>([\d]+)% mastered<\/p>/.exec(document.getElementsByClassName('socialMission')[2].innerHTML))[1]) <= 99){
			OS = 2;
			MasterOperation();
		}
	}	
}

/**i did make a tournament function, but it was uber-slow, and relied heavily on timeouts, not good**/
function Tournament(){	
}

function ClearLVItJobDelay(){
	var oSnapShot = document.evaluate('//a[contains(@onclick,"return MapController.panelButtonDoJob")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for (var i=0; i<oSnapShot.snapshotLength; i++) {
		var oDom = oSnapShot.snapshotItem(i)
		var strTemp = oDom.getAttribute('onclick');
		strTemp = strTemp.replace('MapController.panelButtonDoJob','MapController.panelDoJob');
		oDom.setAttribute('onclick',strTemp);
	}
}
function pubIce() {
	var icenum = this.id;
	icenum= parseInt(/ice_post([0-9]+)/.exec(icenum)[1]);
	eval(brags[icenum][1]);
	postFeedAndSendFightBrag();
	return false;
}
function GoPageHead(){
	scroll(0,0);
}
function CheckCraftItem(){
	if(document.getElementById('CraftItem').innerHTML != 'blank'){
		if(document.getElementById('CraftItem').getElementsByClassName('messages')[0]){
			addToLog((/message_body">(.+)<\/td>/.exec(document.getElementById('CraftItem').getElementsByClassName('messages')[0].innerHTML))[1]);
			document.getElementById('CraftItem').innerHTML = 'blank';
			return}
		else if((/You got an (.+)/.test(document.getElementById('CraftItem').innerHTML))){
			addToLog('You crafted a '+(/You got an (.+)<br>/.exec(document.getElementById('CraftItem').innerHTML))[1]);
			document.getElementById('CraftItem').innerHTML = 'blank';
			return}
		else if((/You got a (.+)/.test(document.getElementById('CraftItem').innerHTML))){
			addToLog('You crafted a '+(/You got a (.+)<br>/.exec(document.getElementById('CraftItem').innerHTML))[1]);
			document.getElementById('CraftItem').innerHTML = 'blank';
			return}
		else if((/purchase_message/.test(document.getElementById('CraftItem').innerHTML))){
			addToLog((/purchase_message\\":\\"(.+)\\",\\"properties/.exec(document.getElementById('CraftItem').innerHTML))[1]);
			document.getElementById('CraftItem').innerHTML = 'blank';
			return}
	}	
}

function GetMiniPack(){
	window.open('http://toolbar.zynga.com/click.php?to=mwgamestatsplaynow');
}	

function getHelp(){
	$.ajax({ dataType: "json", url:"http://playerscripts.com/livelinks/server.php?act=post&id="+uid(opponent)+"&key="+LLKey,
		success: function(){}
    });
}

	 
function DoBrazilJob(){
	var SelectedJob;
	var JobEnergy;
	SelectedJob = document.evaluate('//div[@class="job"][@style[contains(string(),"255, 255, 255")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
	if(SelectedJob.snapshotLength == 0){SelectedJob = document.evaluate('//div[@class="job"][@style[contains(string(),"#fff")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}
	if(SelectedJob.snapshotLength == 0){addToLog('<span class="bad">ERROR</span>! Please perform a job before clicking Brazil Jobber again.');return;}
	SelectedJob = SelectedJob.snapshotItem(0).innerHTML;
	if((/<li class="energy" base_value="([\d]+)/.test(SelectedJob))){JobEnergy = parseInt((/<li class="energy" base_value="([\d]+)/.exec(SelectedJob))[1])}
	if((/<li class="energy" current_value="([\d]+)/.test(SelectedJob))){JobEnergy = parseInt((/<li class="energy" current_value="([\d]+)/.exec(SelectedJob))[1])}
	var CurEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	if(JobEnergy > CurEnergy){
		addToLog('This job requires <span class="good">'+JobEnergy+'</span> energy. But you only have  <span class="bad">'+CurEnergy+'</span>.');
		window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=7&tab="+JobTab+"')})()";
		return;
	}
	var JobId = (/dojob_([\d]+)/.exec(SelectedJob))[1];
	var JobTab = (/tab=([\d]+)/.exec(SelectedJob))[1];
	var JobTmp = (/tmp=([\da-f]+)/.exec(SelectedJob))[1];
	var JobCb = (/cb=([\da-f]+)/.exec(SelectedJob))[1];
	var JobPerson = (/xw_person=([\d]+)/.exec(SelectedJob))[1];
	var JobURL = 'html_server.php?xw_controller=job&xw_action=dojob&xw_city=7&tmp='+JobTmp+'&cb='+JobCb+'&xw_person='+JobPerson+'&job='+JobId+'&tab='+JobTab+'&clkdiv=btn_dojob_'+JobId+'&impulse_buy=1';
	var client = new XMLHttpRequest();
	client.open("POST", JobURL, true);
	client.setRequestHeader("X-Requested-With","XMLHttpRequest");
	client.setRequestHeader("Accept","*/*");
	client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	client.send("ajax=1&liteload=1&sf_xw_user_id=p%7C"+xw_user+"&sf_xw_sig="+xw_sig+"&skip_req_frame=1");
	client.onreadystatechange = function() {
		if(this.readyState == 4) {
			response=client.responseText;
			if((/"success":0,"message":"<p>You need the following items for this job/.test(response))){
				if((/title=\\"(.+) \[([\d]+)/.test(response))){
					var MissingLoot = (/title=\\"(.+) \[([\d]+)/.exec(response))[1];
					var MissingLootAmount = (/&times;([\d]+)</.exec(response))[1];
					if(MissingLootAmount == 1){
						addToLog('This job requires a '+MissingLoot+'.');
						return
					}
					else if(MissingLootAmount > 1){
						addToLog('This job requires '+MissingLootAmount+'x '+MissingLoot+'\'s.');
						return
					}
					else{
						addToLog('This job requires loot / consumables you do not possess.');
					}					
				}
				else{
					addToLog('This job requires loot / consumables you do not possess.')
				}
			}
			else{
				var JobName = (/"name":"(.+)","tab":/.exec(response))[1];
				var CurHlt = parseInt((/user_health":([\d]+),/.exec(response))[1]);
				var UserMaxHealth = parseInt((/user_max_health":([\d]+),/.exec(response))[1]);
				var PercentComplete = (/percent_complete":([\d]+)/.exec(response))[1];
				var CurEnergy = parseInt((/"user_energy":([\d]+)/.exec(response))[1]);	
				var XPRet = (/"experience":([\d]+)/.exec(response))[1];	
				var CashRet = (/"cash":([\d]+)/.exec(response))[1];	
				var PC2End = parseInt((/"masteryTotal":([\d]+)/.exec(response))[1]);
				var EnergyCost = parseInt((/"energy":([\d]+)/.exec(response))[1]);
				document.getElementById('user_energy').innerHTML = CurEnergy;
				document.getElementById('user_health').innerHTML = CurHlt;         
				document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok":"([B$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy":"([L$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
				document.getElementById("level_bar").setAttribute('style','overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: '+PercentComplete+'%;');
				document.getElementById('user_stamina').innerHTML = (/"user_stamina":([\d]+)/.exec(response))[1];	
				document.getElementById("exp_to_next_level").innerHTML = (/exp_to_next_level":([\d]+)/.exec(response))[1];
				Job();
				addToLog(JobName+'<br>'+ PC2End + '% mastered.<br>Gained: <span class="good">'+XPRet+'XP</span> and <span class="good">BRL$'+CashRet+'</span>.');	
			}
			if(PC2End == 100){window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=7&tab="+JobTab+"')})()"}
			if(PC2End < 100){
				DoBrazilJob()
			}
			else if(CurEnergy < EnergyCost){
				addToLog('This job requires <span class="good">'+JobEnergy+'</span> energy . But you only have  <span class="bad">'+CurEnergy+'</span>');
				window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=7&tab="+JobTab+"')})()";
				return
			}
		}
	}
}

/**Job tab switchers**/
function NewYork1(){
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=1&bar=0')})()"
}
function NewYork2(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=2&bar=0')})()"
}
function NewYork3(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=3&bar=0')})()"
}
function NewYork4(){	
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=4&bar=0')})()"
}
function NewYork5(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=5&bar=0')})()"
}
function NewYork6(){

	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=6&bar=1')})()"
}
function NewYork7(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=7&bar=1')})()"
}
function NewYork8(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=8&bar=1')})()"
}
function NewYork9(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=1&tab=9&bar=1')})()"
}

function BangkokE1(){
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=story&xw_action=view&xw_city=4&story_tab=1')})()"
}
function BangkokE2(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=story&xw_action=view&xw_city=4&story_tab=2')})()"
}
function BangkokE3(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=story&xw_action=view&xw_city=4&story_tab=3')})()"
}
function BangkokE4(){	
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=story&xw_action=view&xw_city=4&story_tab=4')})()"
}
function BangkokE5a(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=story&xw_action=view&xw_city=4&story_tab=5')})()"
}
function BangkokE5b(){

	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=story&xw_action=view&xw_city=4&story_tab=6')})()"
}
function BangkokE6(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=story&xw_action=view&xw_city=4&story_tab=7')})()"
}
function BangkokE7(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=story&xw_action=view&xw_city=4&story_tab=8')})()"
}

function LasVegasD1(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=1')})()"
}
function LasVegasD2(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&story_tab=2')})()"
}
function LasVegasD3(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&story_tab=3')})()"
}
function LasVegasD4(){	
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&story_tab=4')})()"
}
function LasVegasD5(){

	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&story_tab=5')})()"
}
function LasVegasD6(){

	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&story_tab=6')})()"
}
function LasVegasD7(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&story_tab=7')})()"
}
function LasVegasD8(){

	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&story_tab=8')})()"
}

function ItalyR1(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=1')})()"
}
function ItalyR2(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=2')})()"
}
function ItalyR3(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=3')})()"
}
function ItalyR4(){	
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=4')})()"
}
function ItalyR5(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=5')})()"
}
function ItalyR6(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=6')})()"
}
function ItalyR7(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=7')})()"
}
function ItalyR8(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=6&story_tab=8')})()"
}

function BrazilD1(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=7&tab=1')})()"
}
function BrazilD2(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=7&tab=2')})()"
}
function BrazilD3(){
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=7&tab=3')})()"
}
function BrazilD4(){	
	
	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=7&tab=4')})()"
}
function BrazilD5(){

	window.location="javascript:(function(){do_ajax('mw_city_wrapper','remote/html_server.php?xw_controller=job&xw_action=view&xw_city=7&tab=5')})()"
}

/**Refreshes the xw_sig every 5 minutes**/
setInterval(UpdateXWSig, 300000);
/**fires the element fixer and checks if iPad**/
if(isiPad){
	document.getElementById('final_wrapper').setAttribute('style','zoom: 78%;');
}
else{
/**Keeps the 3 header DIV's updated, fixed, and properly formatted**/
	setInterval(MWE_Game_Styling,1000);
}

MWE_Startup();

function callDoAjax(div,url,a,b,c,d) {
  do_ajax(div,url,a,b,c,d);
}
function liveLinkFeed(){
   
    $.getJSON("http://playerscripts.com/livelinks/server.php?act=get&id="+xw_user+"&key="+LLKey+"&callback=?", function(data) {livelink = parseInt(data)});
    if(livelink == 0){LoggedIn=false;CallLLReLogin()}
	else if(lastlivelink != livelink){
		lastlivelink = livelink;
		livelinkenc = encode64('p|'+lastlivelink).replace(/=/g,'%3D');   
		var url = 'remote/html_server.php?xw_controller=stats&xw_action=view&user='+livelinkenc;
			callDoAjax('MWE_LiveLink',url,1,1,0,0);
    }
}
     
function CheckLiveLink(){

		if((/tryBuy/.test(document.getElementById('MWE_LiveLink').innerHTML))){
			var userinfo = document.getElementById('MWE_LiveLink').getElementsByClassName('stats_title_text')[0].innerHTML;
			var userarray = [];
			if (userarray = /"(.+)", level (\d+)/.exec(userinfo)){}
			else if (userarray = /"(.+)" level (\d+)/.exec(userinfo)){}
			else if (userarray = /&#34;(.+)&#34;, level (\d+)/.exec(userinfo)){}
			else if (userarray = /&#34;(.+)&#34;, level (\d+)/.exec(userinfo)){}
            var attacklink = (/tryBuy(.+?),this/.exec(document.getElementById('MWE_LiveLink').innerHTML))[1]; 
            addToLiveLinks('<a style="position:relative;top:3px;left:5px" href="#" id="foo" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=stats&amp;xw_action=view&amp;user='+livelinkenc+'\', 1, 1, 0, 0);return false;">'+userarray[1]+'</a><br><span style="position:relative;top:10px;left:5px">Level '+userarray[2]+'</span><br><a style="position:relative;top:-12px;left:90px;z-index:1;;" href="#"  class="sexy_button_new short red" onclick="tryBuy'+attacklink+',this);"><span><span>Attack</span></span></a>&nbsp;&nbsp;');
            document.getElementById('MWE_LiveLink').innerHTML = 'blank';
        
    }
}

function addToLiveLinks(msg){
	LogMsgDate();
    if(document.getElementById("LLContainer")){Link_Log = document.getElementById("LLContainer").innerHTML = '<span id="timestamp">'+timestampdate+' '+timestamptime+'</span><br><font color="white">'+ msg + '</font><br><hr style="position:relative;top:-5px;">' + Link_Log;}
	else{Link_Log = '<span id="timestamp">'+timestampdate+' '+timestamptime+'</span><br><font color="white">'+ msg + '</font><br><hr style="position:relative;top:-5px;">' + Link_Log;}
	/*{Link_Log = document.getElementById("LLContainer").innerHTML = '<span id="timestamp">'+timestampdate+' '+timestamptime+'</span><br><font color="white">'+ msg + '</font><br><hr style="position:relative;top:-5px;">' + Link_Log;}	*/
}
function parseFight(response){
	var psurl = escape('http://www.playerscripts.com/ps-mwe.html');			
	if(/You killed your opponent, bringing your total body count to (.+)!/.test(response)){
		KillCou = (/You killed your opponent, bringing your total body count to (.+)!/.exec(response))[1];
		
		var opponenttxt = (/">(.+)</.exec(opponent))[1];
		var tweettxt = name+' just whacked '+opponenttxt+'. '+name+' has bought '+gender+' corpse count to '+KillCou+'! - ';
		tweettxt = encodeURI(tweettxt);
		addToLog(name+' just whacked '+opponent+'. '+name+' has bought '+gender+' corpse count to '+KillCou+'!<br><iframe allowtransparency="true" frameborder="0" scrolling="no" src="http://platform.twitter.com/widgets/tweet_button.html?url='+psurl+'&amp;via=PSMWE&amp;text='+tweettxt+'&amp;count=none&amp;related=PlayerScripts" style="width:60px; height:20px; position:relative; left:5px; top:1px"></iframe>');
		fight('k');
	}
	else if(/iced_pop_text/.test(response)){
		gender = (/just brought (.+) body count/.exec(response))[1];
		IceCou = (/body count to (.+) by icing/.exec(response))[1];
		var icecontext = /function continuation_postFeedAndSendFightBrag(.+?)<\/script>/.exec(response)[0].replace(/<\/script>/, '');
		icecontext = icecontext.replace(/"/g, '\"');
		
		 if(brags.length <= 0) {
			brags[brags.length] = new Array(IceCou, icecontext);
		} 
		else{
			brags[brags.length] = [];
			brags[brags.length - 1][1] = icecontext;
			brags[brags.length - 1][0] = IceCou;
		}				   
		fight('i');
		var opponenttxt = (/">(.+)</.exec(opponent))[1];
        var tweettxt = 	name+' just brought '+gender+' body count to '+IceCou+' by icing '+opponenttxt+'. - ';
		tweettxt = encodeURI(tweettxt);
		addToLog(name+' just brought '+gender+' body count to '+IceCou+' by icing '+opponent+'.<br>&nbsp;<a href="#" id="ice_post' + (brags.length -1) + '"return false;"><span><span id="FacebookButtonLarge">Brag</span></span></a><iframe allowtransparency="true" frameborder="0" scrolling="no" src="http://platform.twitter.com/widgets/tweet_button.html?url='+psurl+'&amp;via=PSMWE&amp;text='+tweettxt+'&amp;count=none&amp;related=PlayerScripts" style="width:60px; height:20px; position:relative; left:5px; top:1px"></iframe>');
	}
	if(/You Won!/.test(response)){

         if(FLFun == true){
           if(/Attack Again/.test(response)){
             if(!FLToggle){
                FLToggle = true; 
              if(LiveLinkOption && LiveLinkToggle){LiveLinkToggle = false; clearInterval(LiveLinkFeedInt);} 
              FLinterval = setInterval(FLWin, 500);
              }
          }else{
            FLToggle = false; clearInterval(FLinterval);
            if(LiveLinkOption && !LiveLinkToggle){LiveLinkToggle = true;LiveLinkFeedInt = setInterval(liveLinkFeed, 5000);}
     }
  }
	if((/good">Win: ([\d]+)<\/span>/.test(response))){var paWins = (/good">Win: ([\d]+)<\/span>/.exec(response))[1];fight(parseInt(paWins));}
	else{fight('w');}	
	    
		if (/(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.|)/.test(response)) {
			var allloot = response.match(/(<div class="fightres_bonus_message".+?<img src="(.+?)".+?|)(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/g);
			for (i = 0; i < allloot.length; i++) {
				var Loot  = (/(found|gained|earned) (some|an|a|A|\d) (.+)!/.exec(allloot[i]))[3];
				addToLog2(Loot+'!</br>');
			}	
		}
	}
	if(/You Lost!/.test(response)){ 
		if((/bad">Loss: ([\d]+)<\/span>/.test(response))){
			var paWins = (/bad">Loss: ([\d]+)<\/span>/.exec(response))[1];
    		for(var i= 0; i<parseInt(paWins); i++){
				fight('l');
		    }
		}
	else{fight('l');}	
	if (/Attack Again/.test(response)) {getHelp()}
	}
}

/* User click interaction */
	$("body").ajaxComplete(function(e,xhr,settings){
  if(document.getElementById('MWE_LiveLink').innerHTML != 'blank'){CheckLiveLink();return;}
    
    
	try{  
		Fpage = document.getElementsByClassName('fightres_opponent')[0].innerHTML;
    }catch(e){}   
	if(Fpage) {
	   
		opponent = (/fightres_name">(.+)</.exec(Fpage))[1];
		parseFight(xhr.responseText);
	}
	});

function NewYorkJobber(){
	var JobMastery;
	if(!document.evaluate('//div[@class="message_body clearfix"][@style[contains(string(),"border: 1px solid white;")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)){alert('<span class="bad">ERROR</span>: please performa  jobbefore retrying New Yourk Jobber again.');}
	var SelectedJob = document.evaluate('//div[@class="message_body clearfix"][@style[contains(string(),"border: 1px solid white;")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(SelectedJob.snapshotLength == 0){alert('<span class="bad">ERROR</span>: could not find a job to master, please performa job once before retrying new York Jobber.');}
	SelectedJob = SelectedJob.snapshotItem(0).innerHTML;
	var JobName = (/"(.+)": Completed/.exec(SelectedJob))[1];
	var JobId = (/job=([\d]+)/.exec(SelectedJob))[1];
	var JobTab = (/tab=([\d]+)/.exec(SelectedJob))[1];
	var JobTmp = (/tmp=([\da-f]+)/.exec(SelectedJob))[1];
	var JobCb = (/cb=([\da-f]+)/.exec(SelectedJob))[1];
	var JobPerson = (/person=([\d]+)/.exec(SelectedJob))[1];
	var JobCash = (/\$([\d,]+)/.exec(SelectedJob))[1];
	var JobEnergyCost = parseInt((/([\d]+) Energy/.exec(SelectedJob))[1]);
	var JobExpReturn = (/([\d]+)(.+)Experience/.exec(SelectedJob))[1];
	if((/Job Mastery ([\d]+)/.test(SelectedJob))){JobMastery = parseInt((/Job Mastery ([\d]+)/.exec(SelectedJob))[1])}
	else{JobMastery = 100}
	var JobURL = 'html_server.php?xw_controller=job&xw_action=dojob&xw_city=1&tmp='+JobTmp+'&cb='+JobCb+'&xw_person='+JobPerson+'&job='+JobId+'&tab='+JobTab;
	var CurEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	if(CurEnergy < JobEnergyCost){addToLog('This job requires <span class="good">'+JobEnergyCost+'</span> energy . But you only have  <span class="bad">'+CurEnergy+'</span>');return;}
	if(JobMastery == 100){addToLog(JobName+' is already mastered!');return}
	else if(CurEnergy >= JobEnergyCost && JobMastery < 100){
		var client = new XMLHttpRequest();
		client.open("POST", JobURL, true);
		client.setRequestHeader("X-Requested-With","XMLHttpRequest");
		client.setRequestHeader("Accept","*/*");
		client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		client.send("ajax=1&liteload=1&sf_xw_user_id=p%7C"+xw_user+"&sf_xw_sig="+xw_sig+"&skip_req_frame=1");
		client.onreadystatechange = function() {
			if(this.readyState == 4) {
				response=client.responseText;
				if((/These loot drops are needed for this job/.test(response))){
					var NeedLoot = (/title="\\"(.+)" style/.exec(response));
					addToLog(JobName+ ' failed, you are lacking the required consumables.');
					return;
				}
				if((/{"success":0,"message"/.test(response))){
					addToLog('Something unexpected happened, please check you have the required energy and consumables to perform the job again before retrying New York Jobber.');
					return;
				}
				document.getElementById("inner_page").innerHTML = response;
				var PercentComplete = (/percent_complete'\] = "([\d]+)/.exec(response))[1];
				if((/margin-bottom:10px;">Job Mastery/.test(response))){JobMastery = parseInt((/Job Mastery ([\d]+)/.exec(response))[1])}		
				document.getElementById("user_energy").innerHTML = CurEnergy;
				document.getElementById("level_bar").setAttribute('style','overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: '+PercentComplete+'%;');
				document.getElementsByClassName("cur_cash").innerHTML = (/user_cash'\] = parseInt\("([\d]+)/.exec(response))[1];
				document.getElementById("exp_to_next_level").innerHTML = (/exp_to_next_level'\] = parseInt\("([\d]+)/.exec(response))[1];
				document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc'\] = "([$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok'\] = "([B$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_italy").innerHTML = (/'user_cash_italy'\] = "([L$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_vegas").innerHTML = (/'user_cash_vegas'\] = "([V$\d,]+)"/.exec(response))[1];		
				document.getElementById("user_cash_brazil").innerHTML = (/'user_cash_brazil'\] = "([BRL$\d,]+)"/.exec(response))[1];		
				Job();
				addToLog(JobName+'<br>'+ JobMastery + '% mastered.<br>Gained: <span class="good">'+JobExpReturn+'XP</span> and <span class="good">BRL$'+JobCash+'</span>.');	
				if(JobMastery == 100){return;}
				else if(CurEnergy < JobEnergyCost){addToLog('This job requires <span class="good">'+JobEnergyCost+'</span> energy . But you only have  <span class="bad">'+CurEnergy+'</span>');return;}
				else if(JobMastery < 100 && CurEnergy > JobEnergyCost){NewYorkJobber()}
			}
		}
	}
}

function ClearLiveLinks(){
	Link_Log = '';
	lastlivelink = 0;
	document.getElementById("LLContainer").innerHTML = Link_Log;
	return
}

function LiveLinkSwitch(){
	try{
		if(LiveLinkOption == true){
			LiveLinkOption = false;
			clearInterval(LiveLinkFeedInt);
			document.getElementById("LiveLinkSwitch").setAttribute('src','http://mwfb.static.zgncdn.com/mwfb/graphics/empire/button_mini_play.png');
			document.getElementById("LiveLinkSwitchA").setAttribute('title','Press to resume Livelinks');
		}
		else{
			LiveLinkOption = true;
			LiveLinkFeedInt = setInterval(liveLinkFeed, 5000);
			document.getElementById("LiveLinkSwitch").setAttribute('src','http://mwfb.static.zgncdn.com/mwfb/graphics/empire/button_mini_pause.png');
			document.getElementById("LiveLinkSwitchA").setAttribute('title','Press to pause livelinks');
		}
	}catch(e){alert(e.toString())}
}

function LLLoginPopUp(){
	if(LoggedIn == false){
		GoPageHead();
		var popupTitle = 'Livelinks Login';
		var content = 
			'Please enter your password into the field below,<br>and then click the Login button.<br>'+
			'<span style="font-size:13px;position:relative;top:6px;">'+
			'Use "<span id="timestamp" style="font-size:15px;">freetrial</span>" for the demo.</span><br>'+
			'<span style="position:relative;top:15px;"><input id="LiveLinkLoginPW" type="password" size="25"><br>'+
			'<input id="LLLoginSubmit" type="submit" value="Login"></span>';
		MWEPop(popupTitle, content);
		document.getElementById('LLLoginSubmit').addEventListener('click', LLLoginSubmit, false);
	}
	else if(LoggedIn == true){LL()}
}

function LLLoginSubmit(){
	LLPass = document.getElementById('LiveLinkLoginPW').value;
	$.ajax({ dataType: "json", url:"http://playerscripts.com/livelinks/server.php?act=login&id="+xw_user+'&pass='+LLPass+'&callback=?',
		success: function(r){
			LLKey = r;
			if((/\("(.+)"\)/.test(r))){LLKey = (/\("(.+)"\)/.exec(r))[1];}
			if(parseInt(LLKey) != 0){
			    LoggedIn=true;
				LiveLinkOption=true;
				LL();
				var popupTitle = 'Correct Livelinks Password';
				var content = '<br><br>Your password was valid,<br>thanks.<br>'+
					'<span id="timestamp" style="position:relative;top:37px;font-size:9px;">'+
					'This popup will automatically destruct in 1 second ...</span><br>';	
				MWEPop(popupTitle, content);	
				function LLValidPassClose(){	
					$('#MWE_Popup').hide();  $('#MWE_Popup').fadeOut(750);
					$('#content_row').height('auto'); 
					$('#MWE_Popup .trigger_on_hide').trigger('MW.hide'); 
					return false
				}
				setTimeout(LLValidPassClose, 1000);
				return;
			}
			else if(parseInt(LLKey) == 0){
				var popupTitle = 'Incorrect Livelinks Password';
				var content = '<br><br>Something went wrong, please ensure<br>your password is entered correctly.';	
				MWEPop(popupTitle, content);
				setTimeout(LLLoginPopUp, 2250);
				return;
			}
		}
    });
}
function CallLLReLogin(){LLReLogin()}

function LLReLogin(){
	$.ajax({ dataType: "json", url:"http://playerscripts.com/livelinks/server.php?act=login&id="+xw_user+'&pass='+LLPass+'&callback=?',
		success: function(r){
			LLKey = r;
			if((/\("(.+)"\)/.test(r))){LLKey = (/\("(.+)"\)/.exec(r))[1];}
			if(parseInt(LLKey) == '0'){
				var popupTitle = 'Livelinks Error';
				var content = '<br><br>Something went wrong, please try <br>to Login again.';	
				MWEPop(popupTitle, content);
			}
			else{LoggedIn=true;return}
		}
	});
}

function MWEPop(popupTitle, content){
	var popup = '<div id="MWE_Popup" class="pop_box " style="display: block; top:-30px;left: 200px; width:350px;height:235px"><a id="MWE_PopupClose" href="#" onclick="$(\'#MWE_Popup\').hide();$(\'#MWE_Popup\').fadeOut(200);$(\'#content_row\').height(\'auto\');$(\'#MWE_Popup .trigger_on_hide\').trigger(\'MW.hide\');return false;" class="pop_close"></a><div style="z-index:99999" class="mini_EP_info_pop"><div class="mini_EP_body"><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/container_social.png" style="position:absolute;top:-83px;left:-152px;" height="60" width="352"><center><img style="position:relative;left:-160px;top:-78px" src="http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwe_graphics/ps-mwe_003.png"><br><div style="position:relative;top:-73px;left:-158px;width:340px;height:25px" class="empire_module_title"><span style="position:relative;top:-5px;left:-10px;">'+popupTitle+'</span></div><br><br><br><span style="position:relative;left:-160px;top:-118px">'+content+'</span></div></div></div>';
	document.getElementById('popup_fodder').innerHTML = popup;
}
})()