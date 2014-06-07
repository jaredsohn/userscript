*/
//
// ==UserScript==
// @name           AH
// @namespace      http://userscripts.org/users/162344
// @description    AH
// @include        http://facebook.mafiawars.com/*
// @include        http://facebook.mafiawars.com/mwfb/*
// ==/UserScript==


// javascript:/*Author:Pete%20LundriganThanks%20to%20Josh%20Miller%20for%20the%20help%20with%20the%20Xpath%20for%20the%20Auto-Heal%20NotifierName:Pistol%20Pete%20Quick%20Healer.*/javascript:(function(){if(document.getElementsByClassName(%27canvas_iframe_util%27)[0]){window.location.href=document.getElementsByClassName(%27canvas_iframe_util%27)[0].src;}else%20if(document.getElementById(%27app10979261223_iframe_canvas%27)){window.location.href=document.getElementById(%27app10979261223_iframe_canvas%27).src;}else{var%20last_i=0,autohealelt,timer;function%20xpathFirst(p,%20c)%20{return%20document.evaluate(p,%20c%20||%20document,%20null,%20XPathResult.ANY_UNORDERED_NODE_TYPE,%20null).singleNodeValue;}function%20jxpath(query,node){return%20document.evaluate(query,(node===undefined?document:node),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}var%20clock_healthelt%20=%20document.getElementById(%27clock_health%27);var%20healelt%20=%20xpathFirst(%27.//a[contains(.,%20%22Hospital%22)]%27,%20clock_healthelt);var%20healthelt=jxpath(%27//span[text()=%22Health%22]%27);var%20healurl%20=%20healelt.href.replace(%22xw_action=view%22,%22xw_action=heal%22);healthelt.snapshotItem(0).innerHTML%20=%20%27<span%20id=autoheal><a%20href=%22#%22>Auto-Heal</a></span>%27;function%20clearautoheal()%20{document.getElementById(%27autoheal%27).innerHTML=%20%27Health%27;clearInterval(timer);}if%20(autohealelt%20=%20document.getElementById(%22autoheal%22)){autohealelt.onclick=clearautoheal;}timer%20=%20setInterval(function()%20{usr_health%20=%20document.getElementById(%27user_health%27);max_health%20=%20document.getElementById(%27user_max_health%27);cur_health%20=%20parseInt(usr_health.innerHTML);maxHealth%20=%20parseInt(max_health.innerHTML);var%20healththreshold%20=%20maxHealth%20-(maxHealth*.25);if%20(cur_health%20<%20healththreshold)%20{do_ajax(%27inner_page%27,%20healurl.replace(%22http://mwfb.zynga.com/mwfb%22,%22%22),%201,%201);}},%202000);}}())
/*
	Author:
	Pete Lundrigan
	Thanks to Josh Miller for the help with the Xpath for the Auto-Heal Notifier
	
	Name:
	Pistol Pete Quick Healer v.1.01
	
	Changes:
		2010-04-22 Added Reload from page to page. window.setInterval
*/

(function(){

if(document.getElementsByClassName('canvas_iframe_util')[0]){
	//if(confirm('You need to unframe the page. Do you want me to do it for you?\nYou still may need to run UnFrameMW or ScrollMW to add scrollability!')){
		window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
	//}
}
else if(document.getElementById('app10979261223_iframe_canvas')){
	//if(confirm('You need to unframe the page. Do you want me to do it for you?\nYou still may need to run UnFrameMW or ScrollMW to add scrollability!')){
		window.location.href=document.getElementById('app10979261223_iframe_canvas').src;
	//}
}
else{
function checkhealth(){
function getMWURL() {
		str = document.location;
		str = str.toString();
		beg = str.substring(0,str.indexOf('?')+1);
		str = str.substring(str.indexOf('?')+1);
		str = str.split('&');
		mid = '';
		for(var i=0;i<str.length;i++){
			if(str[i].indexOf('sf_xw_')==0){ mid=mid+str[i]+'&'; }
		}
		return beg+mid;
	}
var last_i=0,autohealelt,timer;

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
function jxpath(query,node){return document.evaluate(query,(node===undefined?document:node),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}



var MWURL = getMWURL();
	var sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(MWURL);
var clock_healthelt = document.getElementById('clock_health');
var healelt = xpathFirst('.//a[contains(., "Hospital")]', clock_healthelt);
var userid = /user_id=([0-9]+)/.exec(MWURL)[1];
//Get Health Title Element
var healthelt=jxpath('//span[text()="Health"]');
//Get Heath URL
var hospital_url = healelt.href
var healurl = healelt.href.replace("xw_action=view","xw_action=heal");
function stats_ratios(s) {
		var expnow = parseInt(/user_experience.*?(\d+)/.exec(s)[1]);
		document.getElementById('user_experience').innerHTML = expnow;
		//var expnext = document.getElementById('exp_for_next_level').innerHTML;
		var expnext = parseInt(/exp_for_next_level.*?(\d+)/.exec(s)[1]);
		//var energy = document.getElementById('user_energy').innerHTML;
		var energy = parseInt(/user_energy.*?(\d+)/.exec(s)[1]);
		//document.getElementById('user_energy').innerHTML = energy;
		//var stamina = document.getElementById('user_stamina').innerHTML;
		var stamina = parseInt(/user_stamina.*?(\d+)/.exec(s)[1]);
		//document.getElementById('user_stamina').innerHTML = stamina;
		expneed = eval(expnext-expnow);
		ratiolvl=eval(expneed/energy);
		ratiolvl2=eval(expneed/stamina);
		ratiolvl3=eval(expneed/(parseInt(energy)+parseInt(stamina)));
		var d = 0;
		(Math.abs(ratiolvl)<10)?(d=2):(d=0);
		(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
		(Math.abs(ratiolvl3)<10)?(d3=2):(d3=0);
		if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
		if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
		if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
		document.getElementById('user_stats').getElementsByClassName('stat_title')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br>(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">) (<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
	}
function request() {
			var preurl = 'http://facebook.mafiawars.com/mwfb/remote/';
			var url ='html_server.php?xw_controller=friendladder&xw_action=initial_load&xw_city=1';
			var m='';
			cb = userid+unix_timestamp();
			ts = unix_timestamp();
			var params = { 
				'ajax': 1, 
				'liteload': 1, 
				'sf_xw_user_id': userid,
				'sf_xw_sig': local_xw_sig,
				'cb': cb,
				'xw_client_id': 8
			};
			$.ajax({
				type: "POST",
				url: preurl+url,
				data: params,
				success: function (msg){
					m = /user_health\":(\d+),\"user_max_health\":(\d+)/.exec(msg);	
					document.getElementById('user_health').innerHTML=m[1];
					document.getElementById('user_max_health').innerHTML=m[2];
					stats_ratios(msg);
				},
				error: function(msg){
					m = /user_health\":(\d+),\"user_max_health\":(\d+)/.exec(msg);	
					document.getElementById('user_health').innerHTML=m[1];
					document.getElementById('user_max_health').innerHTML=m[2];
					stats_ratios(msg);
                }
			});
			
	}

  	request();


	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))
	}
		function timestamp() {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?"0"+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?"0"+CurM:CurM);
		return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
	}	
function clearautoheal() {
	document.getElementById('autoheal').parentNode.innerHTML= 'Health';
	//clearInterval(timer);
	window.clearInterval(pp_timer);
}
if (autohealelt = document.getElementById("autoheal")){
	autohealelt.onclick=clearautoheal;
}
else
{
//replace Health title with Auto-heal On
healthelt.snapshotItem(0).innerHTML = '<span id=autoheal><a href="#">Auto-Heal</a></span>';}
	//timer =	setInterval(function() {
	//do_ajax('inner_page', hospital_url.replace("http://facebook.mafiawars.com/mwfb",""), 1, 0);
	usr_health = document.getElementById('user_health');
  	max_health = document.getElementById('user_max_health');
  	cur_health = parseInt(usr_health.innerHTML);
  	maxHealth = parseInt(max_health.innerHTML);
  	var healththreshold = maxHealth -(maxHealth*.180);
  	if (cur_health < healththreshold) {
  		//do_ajax('inner_page', healurl.replace("http://facebook.mafiawars.com/mwfb",""), 1, 1);
  		do_ajax('inner_page', hospital_url.replace("http://facebook.mafiawars.com/mwfb",""), 1, 0)
  		setTimeout(function(){do_ajax('', healurl.replace("http://facebook.mafiawars.com/mwfb",""), 1, 0, null, hospital_onload);},3000) 
  	}
	
	//}, 2000);
}
pp_timer = window.setInterval(checkhealth, 1000);
}

}())
