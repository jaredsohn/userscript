scr_meta=<><![CDATA[
// ==UserScript==
// @name		QL Competition Server Browser
// @version    	10.0.0
// @namespace	http://userscripts.org/scripts/show/55486
// @description An improvement of d8d's & wn's original QL Alternate Server Browser.
// @include		http://*.quakelive.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require		http://tablesorter.com/jquery.tablesorter.min.js
// @require		http://phob.net/cookies.js
// ==/UserScript==
]]></>.toString();

$.fn.hoverIntent=function(f,g){var cfg={sensitivity:5,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode}catch(e){p=this}}if(p==this){return false}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.mouseover(handleHover).mouseout(handleHover)}

var BRWS_REFTIME = 6000; // value is in seconds
var BRWS_REMTIME = 1; // value is in days
var KEY_RES = 'res_status';

var quakelive = unsafeWindow.quakelive;
var module = quakelive.mod_home;

var cmdString = "+set gt_user \"" + quakelive.username + "\" "
			  + "+set gt_pass \"" + quakelive.xaid + "\" "
			  + "+set gt_realm \"" + quakelive.siteConfig.realm + "\" ";
	
if (screen.width<1280) {
	GM_setValue(KEY_RES,"width: 440px;");
}
else {
	GM_setValue(KEY_RES,"width: 620px;");
}

GM_addStyle(
	".even { background-color:#EFECEC;border:1px;border-color: #EFECEC;}\n"
	+ ".odd { background-color:#fff;border:1px;border-color: #888888;}\n"
	+ ".even:hover, .odd:hover {background-color:#DDDDDD;border:1px;border-color: #888888; border-style: solid solid solid solid;}\n"
	+ "#qlv_postlogin_matches { width: 660px; padding:0px; margin: 3px;}\n"
	+ "#postlogin_dataready .filterbar_expanded { -moz-opacity: 0.8; }\n"
	+ "#reloadlist { float: right;}\n"
	+ "#alt_tools {margin-left: 20px; " + GM_getValue(KEY_RES,"width: 620px;") + "}\n"
	+ "#brws {background-color: #333333; margin-left: 20px; margin-bottom: 20px;color: black; padding: 0px;" + GM_getValue(KEY_RES,"width: 620px;") + "}\n"
	+ "#brws th,.headerSortUp,.headerSortDown {height:25px; color: white; font-size: 12px; background: transparent;}\n"
	+ "#brws th:hover { cursor: pointer;}\n"
	+ "#brws td {height: 23px;border-color:black;border-style:solid;border-width:0px 0;}\n"
	+ "#brws td.skill { text-align:center; }\n"
	+ "#brws td.skill img { height:16px; width:16px; }\n"
	+ ".link_url { background: url(data:image/gif;base64,R0lGODlhEAAQAPf/AAAAAP///4EtNP/29/Kapoddaf/6/f/1/P/4/v/4///7///9//77//r5//b2//7+//z9//v8/vDz9vb6/ff8//n9//X9//j8/fH7/PD///X///b///n///v///z//+j/+vf//fX//Pn//fv//fn7+vb/+vj/+/z//fj9+fT/9fr/+fv/+vz/+/v9+vr/9vn/8/7//f3++f//9Pr68vz89/797v798f/++PXx4v/++/Tq2LCtqP/898m/sfr28f7y5f/58uXXyf/27v/59PXv6q1pON28ptbMxfvx6v/8+lAZAIFpXvvXxlscA2EfBUgYBOSvmM6omUsUAKkzCV05LKsuBFAVAqeHfd/Dusazrf/593AZAFgVAVUTAUIQAX0cAmoYAlccDI0wFVUsIcFrUXhSR/zq5f/18mIUAFsSAFIRAGoVAWYUAbUoBK0lBb8vC2wcCbMyElobDLJYQ4pJOZpZSXJJP8ODc9Ovpo4aAYEXAbIgAn4XAXoWAXUWAXIUAW0VAWYSAWERAYkZApseA7olBKQhBJUcBEoPAtIoBpwfBnEWBGsVBI8dBlESBH0cCK0qDLUrDZ8vFz8WDYIzIc9aP2U+NohcU/fa1OrW0v3z8YgVAHwSAFkOAHYSAW8TAWkSAVUNAVIOAU0NAYMYA3oWBZ0fCG8WBqwjC0sQBVQSB0wTCFEXDGEbD3UnGno5LqxzaZFkXM6akYASAFMKAEMJAV0OArUhCXwVBrwiDKQgC5UeDnMaDLQrFsAwGbg0ImsgFUkcFV0kG4w8MNp2Zrp2a+eyqrKUkI4PAFoJAEoIAJMRAU8JAVYKAlwNBJIXCFINBWAQBlYOBogYCmkSCH0XC4MZDG4XDIMbEE4WD4VUTqd6dZh2cunHw8arqEAFAFMHAXEMAmULAl8LA1YLBUkJBMIgEGURCqkhFnMaEa85LlYcF55HPmovKpxgW5cJALwTB3oMBXEUDVsSDUoPC9i5t0oCADoCAFoMCqlqZ+HAv/7v7/vy8v/9/fz8/P///yH5BAEAAP8ALAAAAAAQABAAAAj+AP8JHKgFkywfDwYqFIhEVqVfvioR05dk4YN6kOb4ehNpTyV1c3woxDPtTiVIhQrdinOHzDCR/4jgkqWOkBs3t1DpInSnjrsAAWDVubOJkFFFhA7lEYOHkRkir2TRiceHjx49fPr8CXdMm6wrwLwBEwQKkFlAbASB47btlTZgPYQlG5dGUN00tuxdubLuCCssZb6FcjRPmDQpo5T1iBWLQRluPb41+2Yny7dy9uzoyHbknzcvmY6NExdLx7lkr8xcGePgnwMqlojUY7cN07BiRLLc6zGQiDBXWST4QCGByDZ7xwIodLAtnKtjOuqcEnBE+cJ/ZvDIwnQlkxaFAQEAOw==); background-repeat:no-repeat;}\n"
	+ ".cond {letter-spacing: -1px;font-family:arial}\n"
	+ ".bold {font-weight:600}\n"
	+ ".cur {cursor:pointer;}\n"
	+ ".left{float: left;}\n"
	+ ".right{float: right;}\n"
	+ ".displayed {display: block;margin-left: auto;margin-right: auto }\n"
	+ ".scale {height:16px; width:16px; margin-left: auto;margin-right: 5px;vertical-align:middle; }\n"
	+ "#config_overlay {visibility: visible; position: absolute; left: 0px; top: 0px; width:100%; height:100%; z-index: 999; background-color:#000000; background-image:url(/images/sf/registration/transparency_v2009073101.0.png); opacity: 0.5;}\n"
	+ ".btn{ margin-right:3px;border:1px solid black;padding:1px}\n"
	+ "</style>"
);


$.tablesorter.addParser({id: 'integer',is: function(s) { return false; },format: function(s) { return $.tablesorter.formatInt(s); },type: 'numeric'});
$.tablesorter.addParser({id: 'players',is: function(s) { return false; }, format: function(s) { var split = s.split("/"); return $.tablesorter.formatInt(split[0]); },type: 'numeric'});

var brwsSort = [5,1];
if ( _cookie( 'brws_index' ) ) {brwsSort = _cookie( 'brws_index' ).split( ",", 2 );}
$('#brws th:eq('+brwsSort[0]+')').addClass( 'sort'+brwsSort[1] );
set_cookie( 'brws_index', brwsSort.join() );

var autoReload = function() {
	$.ajax( {
		type: 		'get',
		url: 		'/home/matches/'+unsafeWindow.Base64.encode(unsafeWindow.JSON.stringify(module.filter)),
		success:	module.ReloadServerList_Success,
		error:		module.ReloadServerList_Error
	});
}


module.ShowServerListError = function ( msg ) {
	$('#qlv_postlogin_matches').html( 
		'<p class="tc thirtyPxTxt sixtypxv midGrayTxt">Unable to load the server list</p>' +
		'<p class="tc TwentyPxTxt midGrayTxt">' + msg + '</p>' +
		'<p class="tc TwentyPxTxt midGrayTxt"><a href="#" onclick="quakelive.mod_home.ReloadServerList();" style="color:#000">CLICK HERE</a> to try and reload&hellip;</p>'
	);

	module.waitHandle = setTimeout( autoReload, 1 * 1000 );
}

module.ReloadServerList_Success = function ( data ) {
	var json = quakelive.Eval( data );
	if ( !json || !json.servers ) {
		module.ShowServerListError( 'Unable to load server list', ( json && json.error ) || 'Unknown error' );
		return;
	}
	
	if ( json.lfg_message ) {
		quakelive.SendModuleMessage( 'OnLFGMessage', { msg: json.lfg_message } );
	}
	
	// force invalidate any tooltips since matches could be shifted around between loads
	quakelive.HideTooltip();
	if ( json.servers ) {

		module.serverList = json.servers;	// load the new server list
		var hidden_servers = _cookie('hidden_servers');
		var hidden_empty = _cookie('hidden_empty');
		
		// make sure all the server entries are properly initialized

		for ( var serverIndex = 0; serverIndex < module.serverList.length; ++serverIndex ) {

			var server = module.serverList[serverIndex];

			if ( !server.players ) {
				server.players = [];
			}
			
			var matchId = '#match_' + serverIndex;			
			var region, locName, subregName, flagIcon;
			var loc = unsafeWindow.locdb.GetByID(server.location_id);
			
			if ( loc ) {

				region = loc.countryAbbr;
				locName = loc.GetCityState();
				subregName = locName.split(",")[0];
				flagIcon = loc.GetFlagIcon();

			} else {

				locName = 'QUAKE LIVE';
				flagIcon = '/images/flags3cc/usa.gif';

			}
			
			var mapFullName = unsafeWindow.mapdb.getBySysName(server.map.toLowerCase()).name || "Unknown";			
			var servName = server.host_name.split(" ");			
			var gametype = quakelive.GetGameTypeByID( server.game_type );			
			var tierName = 'TIER_' + gametype.name.toUpperCase();
			var skill = unsafeWindow.GetSkillRankInfo( server, quakelive.userinfo[tierName] );
			var playerCountString = server.num_clients + '/' + server.max_clients;
			
			if (hidden_servers.indexOf(locName.toLowerCase()) != -1 && true) {var hidethis = 'display: none; ';}else {var hidethis = '';}

			if (serverIndex < 3) {

				var node = $('<tr style="' + hidethis + '" id="' + matchId + '">'
				+ '<td><img class="displayed" src="' + flagIcon + '" alt="' + region + '" title="' + region + '" /></span></td><td><span>' + locName +  '</span></td>'
				+ '<td>'
				+ '<img alt="Recommended Pick!" class="scale" src="data:image/gif;base64,R0lGODlhEAAQAOZ/APTn/r+QANrUfPbXHP/dNMW4jf7SAv7aJv/2zcG0o/ncWuu1AP/52uvJANvUqf7PAMWcBP/+xv/bBKF0TfTr2//0n9K8ff/ytP//1efcWP7NKv7GAPXmkZ6DDfHNzce+Sf/rYtLMdPjJM8O0la6IAO7jX/LjjuXbhP/09P//qv/ux+7ZDP/xb/vqX6GAIvi7AKSKM//eD5FkPf/VAP/MAMzDmPnvmMWiBriZY7qiAP/lALWPTuzczNKjDf/wZ+XZCejTBpJ9PtuxAPjmXP/s7PHcD//15b+gav/kQey9J+G4H//1+7uhSqqNGP/mOLCWH//z1PPJFcvCs518H//4zebBNO7gtv/wr//4of/op9WuI8i5ms+rq//TMO7DEv/dOqmDQracRe/gpcjBTP/6ufjplMa9lMe4meW6Ca2MLd7EAP/VBdDEAO7ftNnNAJ2FR//zvdXRpPrJAN/TA5dxMJ95ONC5ANu7APXlWv/61PbZV9ytF7+bm7amltWyGP///yH5BAEAAH8ALAAAAAAQABAAAAfugH+CfxgYDFAMDIWDjABxBSNnI1s1DgCMfxQOIScmJhwcJyEOFIwJZgJYFWUVFTYCNVKCeVZjGXggegq7PkMZH20YCAUfJS0gCiwsCiAtJR8FVClhbEADBBpfSBoHAytuTCkVMD9F1xoEXRpOBytzMClZdXYNBjEzBhIbMQYNanRXLoDJUW/DCxovNqx5cCfHDjIo+LjwE+UBDQk6ZizwosQFFyJEPKSBIMQAjQULaMhBc2OKBxSC+rzpoEVEEiUiqnQIkoARDwtPSEDosScAiSYWjGD6IwbHBBkyJhy5sPTPkggREKhQgQBOBEaBAAA7"&/>'
				+ '<span class="bold">' + server.map.toLowerCase() + '</span> - <span class="cond">' + mapFullName + '</span></td>'
				+ '<td>' + ((servName[0] == "pro") ? "pro " : "") + gametype.name.toUpperCase() + '</td>' // FIXME: assumes "pro" will be the first token
				+ '<td class="skill"><img class="displayed" src="' + skill.img + '" /></td>'
				+ '<td><div class="tc">'
				+ '<img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGnSURBVHja7NKxS61gGIDxD5LAAvnGOypOuZgKRk7i3YODOMgnLSIRKCgU6OAsHFAHcfVPcBGC1gYnnZssWtw6Jyk4FMHb0nLne6dLw299pgcBAPob6CfwDwIIIcSy7KFt29dpmm6apoEoip4cxzlxHOfXt5Moip6apoE0TTe2bV+zLHuIEEIIY7wvy/I6z3MAAFiWBYZhgDiOH8IwvAvD8C6O44dhGGBZFgAAyPMcZFleY4z3EcMwZ57nvczzvDEM40aSpE/TNKEoCgiCAIIggKIowDRNkCTp0zCMm3meN57nvTAMc4YwxuskSXZlWV6oqnrAcdxr3/cwTROM4wjjOMI0TdD3PXAc96qq6kFZlhdJkuwwxmtE0/SlZVnbqqquNE275Xn+QxAEOD09/YMgCMDz/IemabdVVV1ZlrWlafoSURR1pCjKfZZl27Ztn7uug7quwXVd8H0ffN8H13Whrmvoug7atn3OsmyrKMo9RVFHCCG0x3HcsSiKj6vV6o0QsiOEvOu6fq7r+u9v54SQd0LIbrVavYmi+Mhx3DFCaO9n5f8i8DUAV5g/LkDKwIIAAAAASUVORK5CYII=" style="no-repeat: scroll 0 0;cursor: pointer;" onClick="qlPrompt({title:\'Link to this match\',body:\'Copy and paste the below URL to link to this match.<br/>\',input:true,inputLabel:\'http://www.quakelive.com/r/home/join/' + server.public_id + '\',inputReadOnly:true,alert:true})"/></div></td>'
				+ '<td><div class="tr">' + playerCountString + '</div></td>'
				+ '<td>&nbsp</td>'
				+ '</tr>'

			);	

			}

			else {

			var node = $('<tr style="' + hidethis + '" id="' + matchId + '">'
				+ '<td><img class="displayed" src="' + flagIcon + '" alt="' + region + '" title="' + region + '" /></span></td><td><span>' + locName +  '</span></td>'
				+ '<td><span class="bold">' + server.map.toLowerCase() + '</span> - <span class="cond">' + mapFullName + '</span></td>'
				+ '<td>' + ((servName[0] == "pro") ? "pro " : "") + gametype.name.toUpperCase() + '</td>' // FIXME: assumes "pro" will be the first token
				+ '<td class="skill"><img class="displayed" src="' + skill.img + '" /></td>'
				+ '<td><div class="tc"><img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGnSURBVHja7NKxS61gGIDxD5LAAvnGOypOuZgKRk7i3YODOMgnLSIRKCgU6OAsHFAHcfVPcBGC1gYnnZssWtw6Jyk4FMHb0nLne6dLw299pgcBAPob6CfwDwIIIcSy7KFt29dpmm6apoEoip4cxzlxHOfXt5Moip6apoE0TTe2bV+zLHuIEEIIY7wvy/I6z3MAAFiWBYZhgDiOH8IwvAvD8C6O44dhGGBZFgAAyPMcZFleY4z3EcMwZ57nvczzvDEM40aSpE/TNKEoCgiCAIIggKIowDRNkCTp0zCMm3meN57nvTAMc4YwxuskSXZlWV6oqnrAcdxr3/cwTROM4wjjOMI0TdD3PXAc96qq6kFZlhdJkuwwxmtE0/SlZVnbqqquNE275Xn+QxAEOD09/YMgCMDz/IemabdVVV1ZlrWlafoSURR1pCjKfZZl27Ztn7uug7quwXVd8H0ffN8H13Whrmvoug7atn3OsmyrKMo9RVFHCCG0x3HcsSiKj6vV6o0QsiOEvOu6fq7r+u9v54SQd0LIbrVavYmi+Mhx3DFCaO9n5f8i8DUAV5g/LkDKwIIAAAAASUVORK5CYII=" style="no-repeat: scroll 0 0;cursor: pointer;" onClick="qlPrompt({title:\'Link to this match\',body:\'Copy and paste the below URL to link to this match.<br/>\',input:true,inputLabel:\'http://www.quakelive.com/r/home/join/' + server.public_id + '\',inputReadOnly:true,alert:true})"/></div></td>'
				+ '<td><div class="tr">' + playerCountString + '</div></td>'
				+ '<td>&nbsp</td>'
				+ '</tr>'
			);

			}
			
			node.each(
				function () {

					var server = module.serverList[serverIndex];	// store a local copy of this
					quakelive.matchtip.BindMatchTooltip( $(this), server.public_id );

				}
			);
	
			server.node = node;

		}

		var serverIndex = 0;

		module.ShowMatches();
		module.StopMatchRefresh();
		module.waitHandle = setTimeout( autoReload, BRWS_REFTIME * 1000 );
	}
};

var KEY_TOPADS = 'topads';
var KEY_QUICKSTATS = 'quickstats';
var KEY_SPONSOR2 = 'spon_vert';
var KEY_SPONSOR3 = 'spon_content';

window.setTimeout(function() {var KEY_TOPADS = 'topads';topads1 = GM_getValue(KEY_TOPADS, true);}, 0);
window.setTimeout(function() {var KEY_QUICKSTATS = 'quickstats';quickstats1 = GM_getValue(KEY_QUICKSTATS, true);}, 0);	
window.setTimeout(function() {var KEY_SPONSOR2 = 'spon_vert';spon_vert1 = GM_getValue(KEY_SPONSOR2, true);}, 0);
window.setTimeout(function() {var KEY_SPONSOR3 = 'spon_content';spon_content1 = GM_getValue(KEY_SPONSOR3, true);}, 0);
			
function serverConfig()
{
	
	var nodeControlPanel = document.createElement("div");

	nodeControlPanel.innerHTML =
		 '<div id="config_overlay"></div>'
		+'<div id="msd_content2" style="position:absolute; opacity:1; background: transparent; z-index:1000; top:250px; left:50%; width:350px; margin-left:-175px; color: black; display:block; background-color:white; border:solid 15px #000000; padding:10px">'
		+'<div><h2>Show the following:</h2></div>'
		+'<div style="margin: 22px 0pt 0pt 10px;" class="fl">'
		+'<div><input id="input_topads" type="checkbox"' + (topads1 ? "checked" : "") +'">Top Ads</input></div>'
		+'<div><input id="input_quickstats" type="checkbox"' + (quickstats1 ? "checked" : "") +'">Quick Stats</input></div>'
		+'<div><input id="input_spon_vert" type="checkbox"' + (spon_vert1 ? "checked" : "") +'">Featured Sponsor</input></div>'
		+'<div><input id="input_spon_content" type="checkbox"' + (spon_content1 ? "checked" : "") +'">News Feed</input></div>'
		+'<br/>'
		+'<div><input type="button" value="OK" id="button_ok" class="btn"><input type="button" value="Cancel" id="button_cancel" class="btn"></div>'
		+'</div>'
		+'</div>';
	
	document.body.insertBefore(nodeControlPanel, document.body.firstChild);
	
	document.getElementById('input_topads').addEventListener( 'click', function() { GM_setValue(KEY_TOPADS, this.checked); }, true);
	document.getElementById('input_quickstats').addEventListener( 'click', function() { GM_setValue(KEY_QUICKSTATS, this.checked); }, true);
	document.getElementById('input_spon_vert').addEventListener( 'click', function() { GM_setValue(KEY_SPONSOR2, this.checked); }, true);
	document.getElementById('input_spon_content').addEventListener( 'click', function() { GM_setValue(KEY_SPONSOR3, this.checked); }, true);
	document.getElementById('button_ok').addEventListener( 'click', function() {document.getElementById("msd_content2").style.display="none";document.getElementById("config_overlay").style.visibility="hidden";window.location.reload();}, true);
	document.getElementById('button_cancel').addEventListener( 'click', function() {document.getElementById("msd_content2").style.display="none";document.getElementById("config_overlay").style.visibility="hidden";}, true);
	
	return false;

};
	
function fixContent()
{

	GM_log('fixContent');
	GM_addStyle( '.filterbar_notice { display: none !important; } ');

	if( GM_getValue( KEY_TOPADS, true)){GM_addStyle( '#qlv_topFadeAds { display: block; } ');}else{GM_addStyle( '#qlv_topFadeAds { display: none !important; } ');}
	if( GM_getValue( KEY_QUICKSTATS, true)){GM_addStyle( '.quickstats_offlinegame { display: block; } ');}else{GM_addStyle( '.quickstats_offlinegame { display: none !important; }');}
	if( GM_getValue( KEY_SPONSOR2, true)){GM_addStyle( '.spon_media { display: block; } ');GM_addStyle( '#spon_vert { display: block; } ');}else{GM_addStyle( '.spon_media { display: none !important; } ');GM_addStyle( '#spon_vert { display: none !important; } ');}
	if( GM_getValue( KEY_SPONSOR3, true)){GM_addStyle( '#post_spon_content { display: block; } ');}else{GM_addStyle( '#post_spon_content { display: none !important; } ');}
}

	window.addEventListener( 'load', fixContent, true);

module.ShowMatches = function () {
	var list = module.serverList;

	function demoplay() {
		unsafeWindow.qlPrompt({title:"Demo",body:"Enter the demo name and press OK.<br/>",input:true,inputLabel:"",ok:function(){var demo=$('#modal-input > input').val();quakelive.mod_home.ReloadServerList();$('#prompt').remove();$('.jqmOverlay').remove();if (demo) {unsafeWindow.LaunchGame(cmdString + "+exec demo.cfg +demo " + demo);}}});
		return false;
	};

	function hideservers() {
		unsafeWindow.qlPrompt({title:"Filter Servers",body:"Type your servers that you want to hide (eg. Stockholm, Warsaw).<br/>",inputLabel:_cookie('hidden_servers'),input:true,ok:function(){var serverlist =$('#modal-input > input').val();set_cookie('hidden_servers', serverlist.toLowerCase());quakelive.mod_home.ReloadServerList();$('#prompt').remove();$('.jqmOverlay').remove()}        });
		return false;
	};

	unsafeWindow.demoplay = demoplay;
	unsafeWindow.hideservers = hideservers;
	unsafeWindow.serverConfig = serverConfig;

	function demoplay() 
	{
		unsafeWindow.qlPrompt({title:"Demo",body:"Enter the demo name and press OK.<br/>",input:true,inputLabel:"",ok:function(){var demo=$('#modal-input > input').val();quakelive.mod_home.ReloadServerList();$('#prompt').remove();$('.jqmOverlay').remove();if (demo) {unsafeWindow.LaunchGame(cmdString + "+exec demo.cfg +demo " + demo);}}});
	
		return false;

	};

	function hideservers() 
	{

		unsafeWindow.qlPrompt({title:"Filter Servers",body:"Type your servers that you want to hide (eg. Stockholm, Warsaw).<br/>",inputLabel:_cookie('hidden_servers'),input:true,ok:function(){var serverlist =$('#modal-input > input').val();set_cookie('hidden_servers', serverlist.toLowerCase());quakelive.mod_home.ReloadServerList();$('#prompt').remove();$('.jqmOverlay').remove()}        });

		return false;

	};
	
	if ($('.postlogin_nav ul li:last').text() != 'Refresh')
	{
		$('.postlogin_nav ul li:last').after("<li class='' onclick=\"demoplay();\">Play Demo</li>"

		+ "<li class='' onclick=\"hideservers();\">Hide/Unhide Servers</li>"

		+ "<li class='' onclick=\"serverConfig();\">Hide/Unhide Panels</li>"

		+ "<li class='' onclick=\"quakelive.mod_home.ReloadServerList();\">Refresh</li>");
	}

	$('#brws tbody').empty();
	$('#reloadlist').val('Refresh').removeAttr('disabled').blur();
	
	
	$('#qlv_postlogin_matches').html("<div id='alt_tools' class='cl'>"
		+ "</div><br>"
		+ "<table id='brws'>"
		+ "<thead><tr><th width='30'>&nbsp</th><th width='100'>Location</th><th>Map</th><th>Mode</th>"
		+ "<th><div class='tc'>S</div></th><th><div class='tc'>URL</div></th><th><div class='tr'>#</div></th><th width='10'>&nbsp</th></tr></thead>"
		+ "<tbody></tbody></table>"
	);

	$('#brws th:eq('+brwsSort[0]+')').addClass('sort'+brwsSort[1]);
	$('#brws th:eq('+brwsSort[0]+')').addClass('sort'+brwsSort[1]);
	$('#brws th').click(function() {

	var val = $(this).html();
	var index = 0, fin = $('#brws th').length - 1;
		
	$('#brws th').each(function() {
	
		if ( $(this).html() === val ) { fin = index; return true; }
		$(this).removeClass('sort0 sort1');
		index++;
		
	});

	var head = $('#brws th:eq('+fin+')');
	
	if ( $(head).hasClass('sort0') ) {
	
		$(head).removeClass('sort0').addClass('sort1');
			
	} else if ( $(head).hasClass('sort1') ) {
			
		$(head).removeClass('sort1').addClass('sort0');
			
	} else {
			
		$(head).addClass('sort0');
			
	}
		
	brwsSort[0] = fin;
	brwsSort[1] = ($(head).hasClass('sort1')) ? 1 : 0;
	set_cookie( 'brws_index', brwsSort.join() );

	});

	
	for ( var matchIndex in list ) {
		
		var server = list[matchIndex];

		if ( server.node.parentNode ) {
			
		server.node.remove();
		
		}

		$('#brws tbody').append( server.node );
		matchIndex++;
		
	}

	module.refreshCount++;
		
	$("#brws:has(tbody tr)").tablesorter({sortList: [[brwsSort[0],brwsSort[1]],[6,1]], headers: {6: {sorter: 'players'}}, widgets: ['zebra']});
	$("#brws").show();
};

function _cookie(name, f)
{
  var cookie_place = document.cookie.indexOf(name + '=');

  if(cookie_place != -1)
  {
	return document.cookie.substr(cookie_place + name.length + 1).split('; ')[0];
  }
  else
  {
	if(f) return false;
	else return '';
  }
}

function set_cookie(name, val, del)
{
  if(del) del = 'Thu, 01-Jan-1970 00:00:01 GMT';
  else del = 'Mon, 22 Aug 2087 03:14:15 GMT';

  document.cookie = name + '=' + val + '; expires=' + del + '; path=/';
}

function copy(text) {
  if (window.clipboardData) {
	window.clipboardData.setData("Text",text);
  }
}
aaus_38017={i:'55486',d:1,n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match("the page you requested doesn't exist")||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')aaus_38017.ch();