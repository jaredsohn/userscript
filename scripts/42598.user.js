// ==UserScript==
// @name         Remove Junk In Gaia Signatures (Toggle Aquarium)
// @description  Remove Junk In Gaia Signatures allows you to toggle aquariums with one click. Aquariums are removed my default (less lag). Can predict glowing time and what fish will glow (if any)!!!
// @include      http://www.gaiaonline.com/forum/*
// @include      http://www.gaiaonline.com/guilds/viewtopic.php?*
// @include      https://www.gaiaonline.com/forum/*
// @include      https://www.gaiaonline.com/guilds/viewtopic.php?*
// @exclude      http://www.gaiaonline.com/forum/mytopics/*
// @exclude      http://www.gaiaonline.com/forum/myposts/*
// @exclude      http://www.gaiaonline.com/forum/subscription/*
// @exclude      https://www.gaiaonline.com/forum/mytopics/*
// @exclude      https://www.gaiaonline.com/forum/myposts/*
// @exclude      https://www.gaiaonline.com/forum/subscription/*
// @updateURL    https://userscripts.org/scripts/source/42598.meta.js
// @downloadURL  https://userscripts.org/scripts/source/42598.user.js
// @namespace    http://userscripts.org/users/62850
// @version      89
// ==/UserScript==
/*-------------------------------SETTINGS-------------------------------*/
var cl = "off"; // This one is for cars licenses, etc.                                                          ---cl means Cars Licenses
var ad = "off"; // This is for aquariums. (default setting)                                                     ---ad means Aquarium Display
var fb = "on";  // Insert the control in the lower right of the screen                                          ---fb means Fixed Buttons
var ct = "on";  // Checks the tank to see if it is glowing                                                      ---ct means Check Tank
var jg = "off"; // ct (above option) must be set to on for this to work. Jump to active game when one is found. ---jg mean Jump to Glow
/*-------------------------------SETTINGS-------------------------------*/
function $(id){
	return document.getElementById(id);
}
function id2Name(id){
	if(!id){
		return "N/A";
	}
	switch(Number(id)){
		case 17710: return "Ring: Mantis";
		case 17711: return "Ring: Slash";
		case 17712: return "Ring: Dervish";
		case 17713: return "Ring: Bump";
		case 17714: return "Ring: Hack";
		case 17715: return "Ring: Shuriken";
		case 17716: return "Ring: Shark Attack";
		case 17717: return "Ring: Hot Foot";
		case 17718: return "Ring: Hornet Nest";
		case 17719: return "Ring: Heavy Water Balloon";
		case 17720: return "Ring: Solar Rays";
		case 17721: return "Ring: Hunter's Bow";
		case 17722: return "Ring: Duct Tape ";
		case 17723: return "Ring: Quicksand";
		case 17724: return "Ring: Taunt";
		case 17725: return "Ring: Scaredy Cat";
		case 17726: return "Ring: Teflon Spray";
		case 17727: return "Ring: Turtle";
		case 17728: return "Ring: Rock Armor";
		case 17729: return "Ring: Pot Lid";
		case 17730: return "Ring: Improbability Sphere";
		case 17731: return "Ring: Wish";
		case 17732: return "Ring: Bandage";
		case 17733: return "Ring: Diagnose";
		case 17734: return "Ring: Defibrillate";
		case 17735: return "Ring: Meat";
		case 17736: return "Ring: Healing Halo";
		case 17737: return "Ring: Divinity";
		case 17738: return "Ring: Coyote Spirit";
		case 17739: return "Ring: Knife Sharpen";
		case 17740: return "Ring: Keen Aye";
		case 17741: return "Ring: Adrenaline";
		case 17742: return "Ring: Ghost";
		case 17743: return "Ring: Gumshoe";
		case 17744: return "Ring: Iron Will";
		case 17745: return "Ring: My Density";
		case 17747: return "Ring: Guns,Guns,Guns";
		case 17748: return "Ring: Fire Rain";
		case 17749: return "Ring: Fleet Feet";
		case 17866: return "Ring: Fitness";
		case 1167: return "Brown Magical Giftbox";
		case 2242: return "Blue Magical Giftbox";
		case 1141: return "Pink Magical Giftbox";
		case 6960: return "Enchanted Wooden Trunk";
		case 6961: return "Enchanted Golden Trunk";
		case 77022: return "Enki\\'s Catch";
		case 33881: return "Aquarium Hermit Cat";
		case 31851: return "Aquarium Dark Knight Fish";
		default: return id;
	}
}
function seconds2HMS(inputval,x){
	var dd = Math.floor(inputval/(3600*24));
	var hh_remaining = (inputval-(dd*(24*3600)));
	
	var hh = Math.floor(hh_remaining/3600);
	var ss_remaining = (hh_remaining-(hh*3600));
	
	var mm = Math.floor(ss_remaining/60);
	var ss = (ss_remaining-(mm*60));	
	
	if(hh<10){
		hh='0'+hh;
	}
	if(mm<10){
		mm='0'+mm;
	}
	if(ss<10){
		ss='0'+ss;
	}
	if(x==2||dd>0){
		return dd+':'+hh+':'+mm+':'+ss;
	}
	else{
		return hh+':'+mm+':'+ss;
	}
}
function unixTime2HumanTime(unixTimeStamp){
	var time=new Date(unixTimeStamp*1000);
	var M=time.getMonth()+1;
	var d=time.getDate();
	var y=time.getFullYear();
	var h=time.getHours();
	var m=time.getMinutes();
	var s=time.getSeconds();
	if(h<12){
		var u="AM";
	}
	else{
		var u="PM";
	}
	if (M<10){
		M='0'+M;
	}
	if (d<10){
		d='0'+d;
	}
	if (h>12){
		h=h-12;
	}
	if(h==0){
		h=12;
	}
	else if(h<10){
		h='0'+h;
	}
	if(m<10){
		m='0'+m;
	}
	if(s<10){
		s='0'+s;
	}
	return M+'/'+d+'/'+y+' @ '+h+':'+m+':'+s+' '+u;
}
function calcTimePassed(ele){
	var t=Number(ele.getAttribute('seconds'))+1;
	var p=Number(ele.getAttribute('players'));
	ele.setAttribute('seconds',t);
	if(t<0){
		ele.textContent='Will glow in '+seconds2HMS(t*-1,1)+' second'+((t==-1)?'.':'s.');
	}
	else if(t>gameTime){
		ele.textContent='Ended '+seconds2HMS(t-gameTime,1)+' ago, had '+ele.getAttribute('players')+' player'+(p==1?'.':'s.');
		ele.style.color='red';
	}
	else if(p==maxPlayers){
		ele.textContent='Sorry, this game is full.';
		ele.style.color='black';
	}
	else{
		ele.textContent='Glowing has '+seconds2HMS(gameTime-t,1)+' left, has '+p+' player'+((p==1)?'.':'s.');
		ele.style.color='green';
	}
	setTimeout(function(){
		calcTimePassed(ele);
	},999);//assume 1 ms of lag
}
function addCommas(nStr){//http://www.mredkj.com/javascript/nfbasic.html
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function inArray(arr,val){
	if((arr.constructor==Array)===false){
		if(arr.toString().indexOf(',')!=-1){
			arr=arr.split(',');
		}
		else{
			if(arr==val){
				return true;
			}
			else{
				return false;
			}
		}
	}
	for(var i=0;i<arr.length;i++){
		if(arr[i]==val){
			return true;
		}
	}
	return false;
}
function getGlow(tankId,aquVs,ele,source){
	//GM_log(tankId+'  '+aquVs+'  '+ele+'  '+source)
	if(source==1){
		ele.childNodes[0].textContent='Loading...';
		ele.setAttribute('disabled','disabled');
		ele.blur();
	}
	var now =new Date();
	GM_xmlhttpRequest({
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		url: 'http://www.gaiaonline.com/chat/gsi/index.php',
		data: 'm='+escape('[[6500,[1]],[6510,["'+tankId+'",0,1]],[6511,["'+tankId+'",'+source+']]]')+'&v=json&X='+(now.getTime().toString().substring(0, 10)),
		onload: function(r){
			if(source==1){
				try{
					if(typeof JSON != 'undefined'){
						var json=JSON.parse(r.responseText);
					}
					else{
						var json=eval(r.responseText);
					}
					var gaiaT=json[0][2]['gaia_curr_time'];
					var aquaN=json[1][2][tankId]['name'];
					var tapsN=json[1][2][tankId]['tap_count'];
					var viewN=json[1][2][tankId]['view_count'];
					var goldN=json[1][2][tankId]['total_gold_won'];
					if(aquaN=='<undefined string>'||!aquaN){
						aquaN=tankId;
					}
					var userN=json[1][2][tankId]['user_id'];
					try{
						var glowT=json[1][2][tankId]['game_info'][1]["open_time"];
					}
					catch(e){
						var glowT='';
					}
					try{
						var play=json[1][2][tankId]['game_info'][1]["player_count"];
					}
					catch(e){
						var play='';
					}
					var gameCap=0;
					var glowCt=0;
					var fishCt=0;
					var ghost=0;
					var cap=0;
					var tankVal=0;
					var tankLink='';
					var glowDay='';
					var glow='';
					var item='';// Don't even try to read the next line
					var fishHTML='<html><head><!--'+tankId+'--><title>Aquarium Analysis for '+aquaN+'</title><link rel="shortcut icon" href="http://www.gaiaonline.com/favicon.ico"><style type="text/css">html{background-color:#383838;color:white;}a{color:lightblue;}body{margin:0px;}#table1{height:100%;margin-left: auto;margin-right: auto;}#tbody1{vertical-align:middle;text-align:center;}table{margin-right:auto;margin-left:auto;font-size:15px;}tr.fishRow:hover{background-color:#666;}td{text-align:center;}td.False{font-weight:bold;color:red;}td.True{font-weight:bold;color:yellow;}td.fishLink{text-align:left;}#footer .left{text-align:left;float:left;width:49.9%;}#footer .right{text-align:right;float:right;width:49.9%;}#footer .center{text-align:center;width:100%;}#footer .header{width:200px;}.strike{text-decoration:line-through}</style><link rel="stylesheet" type="text/css" href="data:text/css;base64,LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqIENvb2wgREhUTUwgdG9vbHRpcCBzY3JpcHQgSUktIKkgRHluYW1pYyBEcml2ZSBESFRNTCBjb2RlIGxpYnJhcnkgKHd3dy5keW5hbWljZHJpdmUuY29tKQ0KKiBUaGlzIG5vdGljZSBNVVNUIHN0YXkgaW50YWN0IGZvciBsZWdhbCB1c2UNCiogVmlzaXQgRHluYW1pYyBEcml2ZSBhdCBodHRwOi8vd3d3LmR5bmFtaWNkcml2ZS5jb20vIGZvciBmdWxsIHNvdXJjZSBjb2RlDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi8qIG1vZGlmaWVkIGZvcm0gb3JpZ2luYWwgdmVyc2lvbiAqLw0KI2RodG1sdG9vbHRpcHsNCglwb3NpdGlvbjphYnNvbHV0ZTsNCgl3aWR0aDoxNTBweDsNCgltYXgtd2lkdGg6NjUlOw0KCWJvcmRlcjoxcHggc29saWQgYmxhY2s7DQoJcGFkZGluZzoycHg7DQoJYmFja2dyb3VuZC1jb2xvcjpsaWdodHllbGxvdzsNCgl6LWluZGV4OjEwMDsNCgljb2xvcjpibGFjazsNCglmb250LXNpemU6MTJweDsNCglkaXNwbGF5Om5vbmU7DQoJZmlsdGVyOnByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5TaGFkb3coY29sb3I9YmxhY2ssZGlyZWN0aW9uPTEzNSk7DQp9DQojZGh0bWx0b29sdGlwICp7DQoJY29sb3I6YmxhY2s7DQp9DQojZGh0bWx0b29sdGlwLnRsew0KCS1tb3otYm94LXNoYWRvdzozcHggM3B4IDVweCAwcHggYmxhY2s7DQoJLXdlYmtpdC1ib3gtc2hhZG93OjNweCAzcHggNXB4IDBweCBibGFjazsNCn0NCiNkaHRtbHRvb2x0aXAudHJ7DQoJLW1vei1ib3gtc2hhZG93Oi0zcHggM3B4IDVweCAwcHggYmxhY2s7DQoJLXdlYmtpdC1ib3gtc2hhZG93Oi0zcHggM3B4IDVweCAwcHggYmxhY2s7DQp9DQojZGh0bWx0b29sdGlwLmJsew0KCS1tb3otYm94LXNoYWRvdzozcHggLTNweCA1cHggMHB4IGJsYWNrOw0KCS13ZWJraXQtYm94LXNoYWRvdzozcHggLTNweCA1cHggMHB4IGJsYWNrOw0KfQ0KI2RodG1sdG9vbHRpcC5icnsNCgktbW96LWJveC1zaGFkb3c6LTNweCAtM3B4IDVweCAwcHggYmxhY2s7DQoJLXdlYmtpdC1ib3gtc2hhZG93Oi0zcHggLTNweCA1cHggMHB4IGJsYWNrOw0KfQ0KI2RodG1scG9pbnRlcnsNCglwb3NpdGlvbjphYnNvbHV0ZTsNCgl6LWluZGV4OjEwMTsNCglkaXNwbGF5Om5vbmU7DQoJd2lkdGg6MTVweDsNCgloZWlnaHQ6MTVweDsNCn0NCiNkaHRtbHBvaW50ZXIudGx7DQoJYmFja2dyb3VuZC1pbWFnZTp1cmwoJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaER3QVBBS0VDQUFRQ0JQeis1UC8vLy8vLy95SCtFVU55WldGMFpXUWdkMmwwYUNCSFNVMVFBQ0g1QkFFQUFBSUFMQUFBQUFBUEFBOEFBQUlvaEk2WllPckMya01nc0VtRGxhL3FPM2tmdDJnbXFJZ25DWmt1ZXFndko4K1ppNE4xYnV4OEFRQTcnKTsNCn0NCiNkaHRtbHBvaW50ZXIudHJ7DQoJYmFja2dyb3VuZC1pbWFnZTp1cmwoJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaER3QVBBS0VDQUFRQ0JQeis1UC8vLy8vLy95SCtFVU55WldGMFpXUWdkMmwwYUNCSFNVMVFBQ0g1QkFFQUFBSUFMQUFBQUFBUEFBOEFBQUltbEk4SXlRYmIxSXZuQlJqdHBYcTM3aVZnV0FIQmlXS09pYVpTMjJKanZNTHdNdC81WFFBQU93PT0nKTsNCn0NCiNkaHRtbHBvaW50ZXIuYmx7DQoJYmFja2dyb3VuZC1pbWFnZTp1cmwoJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaER3QVBBS0VDQUFRQ0JQeis1UC8vLy8vLy95SCtFVU55WldGMFpXUWdkMmwwYUNCSFNVMVFBQ0g1QkFFQUFBSUFMQUFBQUFBUEFBOEFBQUltUkk1NXdPb3NqRU13emdXRWxpOXIyMzFiS0lLVVYzSkJWWnBzSzczd2lyYWJiT081YlJjQU93PT0nKTsNCn0NCiNkaHRtbHBvaW50ZXIuYnJ7DQoJYmFja2dyb3VuZC1pbWFnZTp1cmwoJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaER3QVBBS0VDQUFRQ0JQeis1UC8vLy8vLy95SCtFVU55WldGMFpXUWdkMmwwYUNCSFNVMVFBQ0g1QkFFQUFBSUFMQUFBQUFBUEFBOEFBQUlwQklLcENHSUxtenN3eVZtWjJMamUvVVFjRnlvZlNWbmpXQVlubTc2d3RxNlBiQnYxcnU4MVVBQUFPdz09Jyk7DQp9DQo="/><script type="text/Javascript" src="data:application/javascript;base64,LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQoqIENvb2wgREhUTUwgdG9vbHRpcCBzY3JpcHQgSUktIKkgRHluYW1pYyBEcml2ZSBESFRNTCBjb2RlIGxpYnJhcnkgKHd3dy5keW5hbWljZHJpdmUuY29tKQ0KKiBUaGlzIG5vdGljZSBNVVNUIHN0YXkgaW50YWN0IGZvciBsZWdhbCB1c2UNCiogVmlzaXQgRHluYW1pYyBEcml2ZSBhdCBodHRwOi8vd3d3LmR5bmFtaWNkcml2ZS5jb20vIGZvciBmdWxsIHNvdXJjZSBjb2RlDQoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8NCi8vIEhhcyBiZWVuIG1vZGlmeWVkIGZyb20gdGhlIG9yaWdpbmFsDQp2YXIgb2Zmc2V0ZnJvbWN1cnNvclg9MTI7IC8vQ3VzdG9taXplIHggb2Zmc2V0IG9mIHRvb2x0aXANCnZhciBvZmZzZXRmcm9tY3Vyc29yWT0xMDsgLy9DdXN0b21pemUgeSBvZmZzZXQgb2YgdG9vbHRpcA0KDQp2YXIgb2Zmc2V0ZGl2ZnJvbXBvaW50ZXJYPTEwOyAvL0N1c3RvbWl6ZSB4IG9mZnNldCBvZiB0b29sdGlwIERJViByZWxhdGl2ZSB0byBwb2ludGVyIGltYWdlDQp2YXIgb2Zmc2V0ZGl2ZnJvbXBvaW50ZXJZPTE0OyAvL0N1c3RvbWl6ZSB5IG9mZnNldCBvZiB0b29sdGlwIERJViByZWxhdGl2ZSB0byBwb2ludGVyIGltYWdlLiBUaXA6IFNldCBpdCB0byAoaGVpZ2h0X29mX3BvaW50ZXJfaW1hZ2UtMSkuDQoNCmRvY3VtZW50LndyaXRlKCc8ZGl2IGlkPSJkaHRtbHRvb2x0aXAiPjwvZGl2PicpOyAvL3dyaXRlIG91dCB0b29sdGlwIERJVg0KZG9jdW1lbnQud3JpdGUoJzxpbWcgaWQ9ImRodG1scG9pbnRlciIgc3JjPSJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFQLy8vLy8vL3lIK0VVTnlaV0YwWldRZ2QybDBhQ0JIU1UxUUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PSIvPicpOyAvL3dyaXRlIG91dCBwb2ludGVyIGltYWdlDQoNCnZhciBpZT1kb2N1bWVudC5hbGw7DQp2YXIgbnM2PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkICYmICFkb2N1bWVudC5hbGw7DQp2YXIgZW5hYmxldGlwPWZhbHNlOw0KaWYgKGllfHxuczYpew0KCXZhciB0aXBvYmo9ZG9jdW1lbnQuYWxsPyBkb2N1bWVudC5hbGxbImRodG1sdG9vbHRpcCJdIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQ/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJkaHRtbHRvb2x0aXAiKSA6ICIiOw0KfQ0KdmFyIHBvaW50ZXJvYmo9ZG9jdW1lbnQuYWxsPyBkb2N1bWVudC5hbGxbImRodG1scG9pbnRlciJdIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQ/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJkaHRtbHBvaW50ZXIiKSA6ICIiOw0KZnVuY3Rpb24gbW91c2VNb3ZlKCl7DQoJdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCJIVE1MRXZlbnRzIik7DQoJZXZ0LmluaXRFdmVudCgibW91c2Vtb3ZlIiwgdHJ1ZSwgdHJ1ZSk7DQoJZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldnQpOw0KCXJldHVybiBmYWxzZTsNCn0NCmZ1bmN0aW9uIGlldHJ1ZWJvZHkoKXsNCglyZXR1cm4gKGRvY3VtZW50LmNvbXBhdE1vZGUgJiYgZG9jdW1lbnQuY29tcGF0TW9kZSE9IkJhY2tDb21wYXQiKT8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogZG9jdW1lbnQuYm9keTsNCn0NCg0KZnVuY3Rpb24gZGRyaXZldGlwKHRoZXRleHQsIHRoZXdpZHRoLCB0aGVjb2xvcil7DQoJaWYgKHRoZXRleHQ9PScnKXsNCgkJcmV0dXJuIGZhbHNlOw0KCX0NCglpZiAobnM2fHxpZSl7DQoJCWlmICh0eXBlb2YgdGhld2lkdGghPSJ1bmRlZmluZWQiKSB0aXBvYmouc3R5bGUud2lkdGg9dGhld2lkdGg7DQoJCWlmICh0eXBlb2YgdGhlY29sb3IhPSJ1bmRlZmluZWQiICYmIHRoZWNvbG9yIT0iIikgdGlwb2JqLnN0eWxlLmJhY2tncm91bmRDb2xvcj10aGVjb2xvcjsNCgkJdGlwb2JqLmlubmVySFRNTD10aGV0ZXh0Ow0KCQllbmFibGV0aXA9dHJ1ZTsNCgkJbW91c2VNb3ZlKCk7DQoJCXJldHVybiBmYWxzZTsNCgl9DQp9DQoNCmZ1bmN0aW9uIHBvc2l0aW9udGlwKGUpew0KCWlmIChlbmFibGV0aXApew0KCQl2YXIgbm9uZGVmYXVsdHBvcz1mYWxzZTsNCgkJdmFyIGN1clg9KG5zNik/ZS5wYWdlWCA6IGV2ZW50LmNsaWVudFgraWV0cnVlYm9keSgpLnNjcm9sbExlZnQ7DQoJCXZhciBjdXJZPShuczYpP2UucGFnZVkgOiBldmVudC5jbGllbnRZK2lldHJ1ZWJvZHkoKS5zY3JvbGxUb3A7DQoJCS8vRmluZCBvdXQgaG93IGNsb3NlIHRoZSBtb3VzZSBpcyB0byB0aGUgY29ybmVyIG9mIHRoZSB3aW5kb3cNCgkJdmFyIHdpbndpZHRoPWllJiYhd2luZG93Lm9wZXJhPyBpZXRydWVib2R5KCkuY2xpZW50V2lkdGggOiB3aW5kb3cuaW5uZXJXaWR0aC0yMDsNCgkJdmFyIHdpbmhlaWdodD1pZSYmIXdpbmRvdy5vcGVyYT8gaWV0cnVlYm9keSgpLmNsaWVudEhlaWdodCA6IHdpbmRvdy5pbm5lckhlaWdodC0yNTsNCg0KCQl2YXIgcmlnaHRlZGdlPWllJiYhd2luZG93Lm9wZXJhPyB3aW53aWR0aC1ldmVudC5jbGllbnRYLW9mZnNldGZyb21jdXJzb3JYIDogd2lud2lkdGgtZS5jbGllbnRYLW9mZnNldGZyb21jdXJzb3JYOw0KCQl2YXIgYm90dG9tZWRnZT1pZSYmIXdpbmRvdy5vcGVyYT8gd2luaGVpZ2h0LWV2ZW50LmNsaWVudFktb2Zmc2V0ZnJvbWN1cnNvclkgOiB3aW5oZWlnaHQtZS5jbGllbnRZLW9mZnNldGZyb21jdXJzb3JZOw0KDQoJCXZhciBsZWZ0ZWRnZT0ob2Zmc2V0ZnJvbWN1cnNvclg8MCk/IG9mZnNldGZyb21jdXJzb3JYKigtMSkgOiAtMTAwMDsNCgkJDQoJCWlmIChyaWdodGVkZ2U+dGlwb2JqLm9mZnNldFdpZHRoKXsNCgkJCWlmKGJvdHRvbWVkZ2U+dGlwb2JqLm9mZnNldEhlaWdodCl7DQoJCQkJdGlwb2JqLnN0eWxlLnRvcD1jdXJZK29mZnNldGZyb21jdXJzb3JZK29mZnNldGRpdmZyb21wb2ludGVyWSsicHgiOw0KCQkJCXRpcG9iai5zdHlsZS5sZWZ0PWN1clgrb2Zmc2V0ZnJvbWN1cnNvclgtb2Zmc2V0ZGl2ZnJvbXBvaW50ZXJYKyJweCI7DQoJCQkJcG9pbnRlcm9iai5zdHlsZS50b3A9Y3VyWStvZmZzZXRmcm9tY3Vyc29yWSsicHgiOw0KCQkJCXBvaW50ZXJvYmouc3R5bGUubGVmdD1jdXJYK29mZnNldGZyb21jdXJzb3JYKyJweCI7DQoJCQkJcG9pbnRlcm9iai5jbGFzc05hbWU9J3RsJzsNCgkJCQl0aXBvYmouY2xhc3NOYW1lPSd0bCc7DQoJCQl9DQoJCQllbHNlew0KCQkJCXRpcG9iai5zdHlsZS50b3A9Y3VyWS10aXBvYmoub2Zmc2V0SGVpZ2h0LW9mZnNldGZyb21jdXJzb3JZLzIrInB4IjsNCgkJCQl0aXBvYmouc3R5bGUubGVmdD1jdXJYK29mZnNldGZyb21jdXJzb3JYLW9mZnNldGRpdmZyb21wb2ludGVyWCsicHgiOw0KCQkJCXBvaW50ZXJvYmouc3R5bGUudG9wPWN1clktb2Zmc2V0ZnJvbWN1cnNvclkvMi0xKyJweCI7DQoJCQkJcG9pbnRlcm9iai5zdHlsZS5sZWZ0PWN1clgrb2Zmc2V0ZnJvbWN1cnNvclgrInB4IjsNCgkJCQlwb2ludGVyb2JqLmNsYXNzTmFtZT0nYmwnOw0KCQkJCXRpcG9iai5jbGFzc05hbWU9J2JsJzsNCgkJCX0NCgkJfQ0KCQllbHNlIGlmIChyaWdodGVkZ2U8dGlwb2JqLm9mZnNldFdpZHRoKXsNCgkJCWlmKGJvdHRvbWVkZ2U+dGlwb2JqLm9mZnNldEhlaWdodCl7DQoJCQkJdGlwb2JqLnN0eWxlLnRvcD1jdXJZK29mZnNldGZyb21jdXJzb3JZK29mZnNldGRpdmZyb21wb2ludGVyWSsicHgiOw0KCQkJCXRpcG9iai5zdHlsZS5sZWZ0PWN1clgtdGlwb2JqLm9mZnNldFdpZHRoK29mZnNldGZyb21jdXJzb3JYKyJweCI7DQoJCQkJcG9pbnRlcm9iai5zdHlsZS50b3A9Y3VyWStvZmZzZXRmcm9tY3Vyc29yWSsicHgiOw0KCQkJCXBvaW50ZXJvYmouc3R5bGUubGVmdD1jdXJYLW9mZnNldGZyb21jdXJzb3JYKjIrInB4IjsNCgkJCQlwb2ludGVyb2JqLmNsYXNzTmFtZT0ndHInOw0KCQkJCXRpcG9iai5jbGFzc05hbWU9J3RyJzsNCgkJCX0NCgkJCWVsc2V7DQoJCQkJdGlwb2JqLnN0eWxlLnRvcD1jdXJZLXRpcG9iai5vZmZzZXRIZWlnaHQtb2Zmc2V0ZnJvbWN1cnNvclkvMisicHgiOw0KCQkJCXRpcG9iai5zdHlsZS5sZWZ0PWN1clgtdGlwb2JqLm9mZnNldFdpZHRoK29mZnNldGZyb21jdXJzb3JYKyJweCI7DQoJCQkJcG9pbnRlcm9iai5zdHlsZS50b3A9Y3VyWS1vZmZzZXRmcm9tY3Vyc29yWS8yLTErInB4IjsNCgkJCQlwb2ludGVyb2JqLnN0eWxlLmxlZnQ9Y3VyWC1vZmZzZXRmcm9tY3Vyc29yWCoyKyJweCI7DQoJCQkJcG9pbnRlcm9iai5jbGFzc05hbWU9J2JyJzsNCgkJCQl0aXBvYmouY2xhc3NOYW1lPSdicic7DQoJCQl9DQoJCX0NCgkJdGlwb2JqLnN0eWxlLmRpc3BsYXk9ImJsb2NrIjsNCgkJcG9pbnRlcm9iai5zdHlsZS5kaXNwbGF5PSJibG9jayI7DQoJfQ0KfQ0KDQpmdW5jdGlvbiBoaWRlZGRyaXZldGlwKCl7DQoJaWYgKG5zNnx8aWUpew0KCQllbmFibGV0aXA9ZmFsc2U7DQoJCXRpcG9iai5zdHlsZS5kaXNwbGF5PSIiOw0KCQlwb2ludGVyb2JqLnN0eWxlLmRpc3BsYXk9IiI7DQoJCXRpcG9iai5zdHlsZS5sZWZ0PSItMTAwMHB4IjsNCgkJdGlwb2JqLnN0eWxlLmJhY2tncm91bmRDb2xvcj0nJzsNCgkJdGlwb2JqLnN0eWxlLndpZHRoPScnOw0KCX0NCn0NCg0KZG9jdW1lbnQub25tb3VzZW1vdmU9cG9zaXRpb250aXA7DQpoaWRlZGRyaXZldGlwKCk7DQo="></script></head><body onload="this.focus()"><table id="table1"><tbody id="tbody1"><tr><td><table border="1"><tbody>';
					if(glowT){
						if(glowT<=gaiaT){
							if(glowT+gameTime>gaiaT){
								if(play<maxPlayers){
									var state=2;//open game
									var glowTime='Are Glowing';	
								}
								else{
									var state=4;//full game
									var glowTime='Were Glowing';
								}
							}
							else{
								var state=3;//game over
								var glowTime='Stopped Glowing';
							}
						}
						else{
							var state=1;//about to glow
							var glowTime='Will Glow Soon';
						}
					}
					else{
						var state=0;// not about to glow
						var glowTime='Will Glow';
					}
					if(userN){
						fishHTML+='<tr><th colspan="8"><a id="gameLink" name="'+tankId+'" onclick="return false;" href="http://www.gaiaonline.com/tank/'+userN+'/?version='+aquVs+'&userEnvironmentId='+tankId+'&gsiUrl=www&isInEdit=false&location=popUp&quality=low&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive='+((glowT&&gaiaT>=glowT&&glowT+gameTime>gaiaT)?'true':'false')+'">'+aquaN+'</a></th></tr>';
					}
					else{
						fishHTML+='<tr><th colspan="8">This tank does not exist. (How did you even open this?)</th></tr>';
					}
					fishHTML+='<tr><td>Fish Species</td><td>Fish Name</td><td>'+glowTime+'</td><td>Gold Cap</td><td>Item Grant</td><td>Date of Birth</td><td>Date of Death</td><td onmouseout="hideddrivetip()" onmouseover="ddrivetip(\'days:hours:minutes:seconds\',\'auto\')">Time Till Death</td></tr>';
					var fish='';
					var ghostGlow=0;
					for(var i in json[2][2]){
						var goldOR='';
						var items='';
						if(json[2][2][i]['in_env']==1){
							fishCt++;
							var fishId=json[2][2][i]['item_id'];
							var fishImg=json[2][2]['item_specifics'][fishId]['thumbfile'];
							var fishDob=json[2][2][i]['inhab_incept'];
							var fishDod=json[2][2][i]['inhab_expires'];
							var fishName=json[2][2][i]['name'];
							var fishSpecies=json[2][2]['item_specifics'][fishId]['name'];
							var fishInfo=json[2][2]['item_specifics'][fishId]['description'].replace(/\<BR\>\<BR\>/g,'<BR>').replace(/\"/g,'&quot;');
							if(!fishName){
								fishName='&#160;';
							}
							if(fishDod<gaiaT){
								ghost++;
							}
							else{
								fish+=fishId+',';
							}
							if(json[2][2][i]['game_specifics']){
								/*if(fishDod<gaiaT){
									ghostGlow++;
								}*/
								glow='True';
								if(json[2][2][i]['game_specifics']['rewards'][0]['type']==1){
									cap=json[2][2][i]['game_specifics']['rewards'][0]['cap'];
									//if(fishDod>gaiaT){
										gameCap+=Number(cap);
									//}
								}
								else{
									cap='&#160;';
								}
								var fishVal=0;
								glowCt++;
								items='Odds:<br/>';
								for(var x=0;x<json[2][2][i]['game_specifics']['rewards'].length;x++){
									if(json[2][2][i]['game_specifics']['rewards'][x]['type']==2){
										items+=json[2][2][i]['game_specifics']['rewards'][x]['chance']+' '+id2Name(json[2][2][i]['game_specifics']['rewards'][x]['item_id'])+' in '+json[2][2][i]['game_specifics']['rewards'][x]['frequency']+' seconds.<br/>&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;This fish can give you '+json[2][2][i]['game_specifics']['rewards'][x]['cap']+' of this item.<br/>';
									}
									else {
										var amt=json[2][2][i]['game_specifics']['rewards'][x]['amount'];
										var fqcy=json[2][2][i]['game_specifics']['rewards'][x]['frequency'];
										var prob=json[2][2][i]['game_specifics']['rewards'][x]['chance'];
										fishVal=fishVal+(((prob*amt)/fqcy)*60);
										if(amt==1){
											goldOR+=prob+' gold coin(s) every '+fqcy+' second(s).<br/>&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;Gold coins are worth '+amt+' gold.<br/>';
										}
										else if(amt==2){
											goldOR+=prob+' green coin(s) every '+fqcy+' second(s).<br/>&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;Green coins are worth '+amt+' gold.<br/>';
										}
										else if(amt==3){
											goldOR+=prob+' blue coin(s) every '+fqcy+' second(s).<br/>&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;Blue coins are worth '+amt+' gold.<br/>';
										}
										else{
											goldOR+=prob+' red coin(s) every '+fqcy+' second(s).<br/>&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;&nbsp;&#32;Red coins are worth '+amt+' gold.<br/>';
										}
									}
								}
								//if(fishDod>gaiaT){
									tankVal+=Number((fishVal<cap)?fishVal:cap);
								//}
								goldOR+='This fish gives '+fishVal+' gold a minute.<br/>';
								if(items.length==10){
									item='False';
									items='';
								}
								else{
									item='True';
								}
							}
							else{
								glow='False';
								item='&#160;';
								cap='&#160;';
							}
							if(fishDod>gaiaT){
								var timeLeft=seconds2HMS(fishDod-gaiaT,2);
							}
							else{
								var timeLeft='Ghost fish';
							}
							fishHTML+='<tr class="fishRow"><td class="fishLink" onmouseover="ddrivetip(\'<img width=30 height=30 style=float:left src=http://s.cdn.gaiaonline.com/images/thumbnails/'+fishImg+' />'+fishInfo.replace(/'/g,"\\'")+'\',\'auto\')" onmouseout="hideddrivetip()"><a href="http://www.gaiaonline.com/marketplace/itemdetail/'+fishId+'">'+fishSpecies+'</a></td><td>'+fishName+'</td><td class="'+glow/*+((timeLeft=='Ghost fish'&&glow=='True')?' strike':'')*/+'">'+glow+'</td><td '/*+((timeLeft=='Ghost fish'&&glow=='True')?'class="strike" ':'')*/+'onmouseout="hideddrivetip()" onmouseover="ddrivetip(\''+goldOR.substr(0,goldOR.length-5)+'\',\'auto\')">'+cap+'</td><td onmouseout="hideddrivetip()" onmouseover="ddrivetip(\''+items.substr(0,items.length-5)+'\',\'auto\')" class="'+item+''/*+((timeLeft=='Ghost fish'&&glow=='True')?' strike':'')*/+'">'+item+'</td><td>'+unixTime2HumanTime(fishDob)+'</td><td>'+unixTime2HumanTime(fishDod)+'</td><td>'+timeLeft+'</td></tr>';
						}
						else{
							//Fish not in aquarium so I dont care about it.
						}
					}
					if (state==2){//during Game
						var game=(glowCt/*-ghostGlow*/)+'/'+fishCt+' fish have been glowing since '+unixTime2HumanTime(glowT)+'. This game has '+play+'/'+maxPlayers+' players. <span onmouseout="hideddrivetip()" onmouseover="ddrivetip(\'Estimated best score<br/>'+tankVal+'/'+Math.round(tankVal*.25)+'\',\'auto\')">The max score for this game is '+gameCap+'/'+Math.round(gameCap*.25)+'.</span>';
					}
					else if(state==4){//full Game
						var game=(glowCt/*-ghostGlow*/)+'/'+fishCt+' fish have been glowing since '+unixTime2HumanTime(glowT)+'. This game is full. <span onmouseout="hideddrivetip()" onmouseover="ddrivetip(\'Estimated best score:<br/>'+tankVal+'/'+Math.round(tankVal*.25)+'\',\'auto\')">The max score for this game was '+gameCap+'/'+Math.round(gameCap*.25)+'.</span>';
					}
					else if(state==3){//post Game
						var game=(glowCt/*-ghostGlow*/)+'/'+fishCt+' fish stopped glowing on '+unixTime2HumanTime(glowT+gameTime)+'. This game had '+play+'/'+maxPlayers+' players. <span onmouseout="hideddrivetip()" onmouseover="ddrivetip(\'Estimated best score:<br/>'+tankVal+'/'+Math.round(tankVal*.25)+'\',\'auto\')">The max score for this game is '+gameCap+'/'+Math.round(gameCap*.25)+'.</span>';
					}
					else if(state==1){//pre Game
						var game=(glowCt/*-ghostGlow*/)+'/'+fishCt+' fish will glowing in '+(glowT-gaiaT)+' seconds. <span onmouseout="hideddrivetip()" onmouseover="ddrivetip(\'Estimated best score:<br/>'+tankVal+'/'+Math.round(tankVal*.25)+'\',\'auto\')">The max score for this game will be '+gameCap+'/'+Math.round(gameCap*.25)+'.</span>';
					}
					else{//between Games
						var game=(glowCt/*-ghostGlow*/)+'/'+fishCt+' fish fish will glow in the next game. <span onmouseout="hideddrivetip()" onmouseover="ddrivetip(\'Estimated best score:<br/>'+tankVal+'/'+Math.round(tankVal*.25)+'\',\'auto\')">The max score for this game will be '+gameCap+'/'+Math.round(gameCap*.25)+'.</span>';
					}
					fishHTML+='<tr><td colspan="8"><table border="0" width="100%"><tbody><tr><td>This tank has made '+addCommas(goldN)+' gold.</td><td>This tank has beed viewed '+addCommas(viewN)+' times.</td><td>This tank has had '+addCommas(tapsN)+' taps.</td></tr></tbody></table></td></tr>'+
					'<tr><td colspan="8">'+game+'</td></tr>'+
					'<tr><td colspan="8">Share these results with this link: <input size="'+(47+tankId.length)+'" readonly="readonly" style="border:none;background-color:inherit;color:inherit;font-family:Courier;" onclick="this.select();" type="text" value="http://awesomolocity.org/gtools/background/glowTime.php?id='+tankId+'"/></td></tr>'+
					'</tbody></table></body></html>';
					var analysis=window.open('data:text/html;charset=utf-8,'+escape(fishHTML));
					if(analysis){
						analysis.addEventListener('load',function(){
								analysis.document.getElementById('gameLink').addEventListener('click',function(){
									$('open_tank_'+this.name).click();
								},false);
						},false);
					}
					else{
						alert('Please enable popups for '+document.domain);
					}
					GM_xmlhttpRequest({//sends glowing tank data to page for use in possible new site feature.
						method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						data: "tankId="+tankId+"&fishCt="+fishCt+"&glowCt="+glowCt+"&playCt="+play+"&glowT="+glowT+"&ghostCt="+ghost+"&ghostGlowCt="+ghostGlow+"&fish="+fish.substr(0,fish.length-1),
						url: 'http://awesomolocity.org/gtools/background/glowRecorder.php',
						onload: function(r){}
					});
				}
				catch(e){//Should not be required but failure is not acceptable.
					alert('An error occured:\n'+e+'\n----------------------------------------\nWill load web based php version.\nThis may have been caused by a connection issue.');
					window.open('http://awesomolocity.org/gtools/glowTime.php?id='+tankId+'&GMT='+(new Date().getTimezoneOffset()/60*-1));
				}
				ele.removeAttribute('disabled');
				ele.childNodes[0].textContent='Analyze This Tank';
			}
			else{
				try{
					if(typeof JSON != 'undefined'){
						var json=JSON.parse(r.responseText);
					}
					else{
						var json=eval(r.responseText);
					}
					var gaiaT=json[0][2]['gaia_curr_time'];
					var userN=json[1][2][tankId]['user_id'];
					var oldTank="/aquariumViewer/FishTankViewer.html";
					var newTank="/tank/"+userN+"/";
					var tankUrl="?version="+aquVs+"&userEnvironmentId="+tankId+"&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=";
					try{
						var glowT=json[1][2][tankId]['game_info'][1]["open_time"];
					}
					catch(e){
						var glowT='';
					}
					try{
						var play=json[1][2][tankId]['game_info'][1]["player_count"];
					}
					catch(e){
						var play='';
					}
					var glowCt=0;
					var fishCt=0;
					var ghost=0;
					var ghostGlow=0;
					var fish='';
					var seeked=false;
					var seeking=new Array(27421,31853,32635,34445,36938,39738,40136,44396,54475,54479,54481,54483,54487);
					for(var i in json[2][2]){
						if(json[2][2][i]['in_env']==1){
							fishCt++;
							if(json[2][2][i]['inhab_expires']<gaiaT){
								ghost++;
							}
							//else{
								fish+=json[2][2][i]['item_id']+',';
							//}
							if(json[2][2][i]['game_specifics']){
								glowCt++;
								if(json[2][2][i]['inhab_expires']<gaiaT){
									ghostGlow++;
								}
								if(inArray(seeking,json[2][2][i]['item_id'])){
									seeked=true;
									GM_log('\nfound '+json[2][2][i]['item_id']+'\nupdate line 456');
								}
							}
						}
					}
					if(seeked){
						//GM_openInTab('http://awesomolocity.org/gtools/background/glowTime.php?id='+tankId+'&GMT=-4');
					}
					if(glowT&&glowCt/*-ghostGlow*/>0){
						ele.setAttribute('seconds',gaiaT-glowT);
						ele.setAttribute('players',play);
						if(glowT<=gaiaT){
							if(glowT+gameTime>gaiaT){
								if(play<maxPlayers){
									ele.textContent='Glowing has '+seconds2HMS((glowT+gameTime)-gaiaT,1)+' left, has '+play+' player'+((play==1)?'.':'s.');
									ele.style.color='green';
									$('open_tank_'+tankId).setAttribute('onclick',"window.open('"+newTank+tankUrl+"true');");
									if(jg=="on"){
										document.location+='#tank_'+tankId;
									}
								}
								else{
									ele.textContent='Sorry, this game is full.';
									$('open_tank_'+tankId).setAttribute('onclick',"window.open((event.ctrlKey?'"+oldTank+"':'"+newTank+"')+'"+tankUrl+"false');");
								}
							}
							else{
								ele.textContent='Ended '+seconds2HMS(gaiaT-(glowT+gameTime),1)+' ago, had '+play+' player'+((play==1)?'.':'s.');
								ele.style.color='red';
								$('open_tank_'+tankId).setAttribute('onclick',"window.open((event.ctrlKey?'"+oldTank+"':'"+newTank+"')+'"+tankUrl+"false');");
							}
						}
						else{
							ele.textContent='Will glow in '+(glowT-gaiaT)+' second'+((glowT-gaiaT==1)?'.':'s.');
							ele.style.color='blue';
							$('open_tank_'+tankId).setAttribute('onclick',"window.open('"+newTank+tankUrl+"true');");
						}
						setTimeout(function(){calcTimePassed($('tank_'+tankId))},995);//assume 5 ms of lag
						GM_xmlhttpRequest({//sends glowing tank data to page for use in possible new site feature.
							method: "POST",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							data: "tankId="+tankId+"&fishCt="+fishCt+"&glowCt="+glowCt+"&playCt="+play+"&glowT="+glowT+"&ghostCt="+ghost+"&ghostGlowCt="+ghostGlow+"&fish="+fish.substr(0,fish.length-1),
							url: 'http://awesomolocity.org/gtools/background/glowRecorder.php',
							onload: function(r){}
						});
					}
					else{
						ele.textContent='This tank is not glowing.';
						$('open_tank_'+tankId).setAttribute('onclick',"window.open('"+newTank+tankUrl+"false');");
					}
				}
				catch(e){
					ele.textContent='Failed to get valid data from gaia';
					GM_log(e);
				}
				if(document.location.href.indexOf('guilds/viewtopic.php')!=-1){
					ele.parentNode.setAttribute('style','position:absolute;width:390px;');
					ele.setAttribute('style',ele.getAttribute('style')+'width: 390px;top:-130px');
				}
				else{
					ele.setAttribute('style',ele.getAttribute('style')+'width:100%;top:80px;');
				}
			}
		},
		onerror: function(r){
			GM_log(r.responseText);
		}
	});
}
function toggleTanks(embed,ele) {
	if(ele.value=='Show Aquariums'){
		for(var i=0,stp=embed.snapshotLength;i<stp;i++){
			embed.snapshotItem(i).parentNode.setAttribute('class','forum-flash-sigs show-Aquarium');
		}
		ele.value='Hide Aquariums';
	}
	else{
		for(var i=0,stp=embed.snapshotLength;i<stp;i++){
			embed.snapshotItem(i).parentNode.setAttribute('class','forum-flash-sigs hidden-Aquarium');
		}
		ele.value='Show Aquariums';
	}
}
function toggleTank(ele){
	if(ele.className.match('hidden-Aquarium')=='hidden-Aquarium'){
		ele.className='forum-flash-sigs show-Aquarium';
	}
	else{
		ele.className='forum-flash-sigs hidden-Aquarium';
	}
}
var gameTime=835;
var maxPlayers=34;
GM_addStyle('\
.aquariumButton{\
	width:130px;\
}\
.extra_sigs > .forum-flash-signature{\
	position:relative;\
}\
object.hidden-Aquarium *,.sims3-wrapper{\
	display:none !important;\
}\
object.forum-flash-sigs *{\
	z-index:2;\
	position:relative;\
}\
.guild-tank{\
	height:180px;\
}\
#tgl-ctrl-pnl{\
	position:fixed;\
	bottom:'+($("meebo")?30:10)+'px;\
	right:10px;\
	background-color:-moz-dialog;\
	border:2px solid #000000;\
	padding:3px;\
	text-align:center;\
	-moz-border-radius:3px;\
	z-index:99999;\
	padding:1px;\
}\
#tgl-ctrl-pnl input{\
	font-size:10px;\
}');
var runonece=false;
function page_init(){
	var divs=true;
	var embed = document.evaluate('.//object[contains(@data,"SignatureView.swf")]', document, null, 6, null);
	if(embed.snapshotLength==0){
		divs=false;
		embed = document.evaluate('.//embed[contains(@src,"SignatureView.swf")]', document, null, 6, null);
	}
	if(divs){
		var gm_div=document.createElement('div');
		gm_div.setAttribute('id','tgl-ctrl-pnl');
		gm_div.innerHTML='<input id="toggleBtn" type="button" value="'+((ad=="off")?'Hide':'Show')+' Aquariums"> <input id="AquaClsBtn" type="button" value="X" title="Close" onclick="document.body.removeChild(this.parentNode)"> <input type="button" value="Crappy Workaround" id="crappyWorkaround"/>';
		document.body.appendChild(gm_div);
		var btn=$('toggleBtn');
		btn.addEventListener('click',function(){toggleTanks(embed,this);this.blur();},false);
		if(!runonece)
			toggleTanks(embed,btn);
		for(var i=0,stp=embed.snapshotLength;i<stp;i++){
			var vars=document.evaluate(".//object[@id='"+embed.snapshotItem(i).parentNode.id+"']/param[@name='flashvars']",document,null,9,null).singleNodeValue.value;
			id=vars.substr(vars.indexOf('userEnvironmentId=')+18);
			if(id.indexOf('&')>-1)
				id=id.substr(0,id.indexOf('&'));
			if(!vs){
				var vs=vars.substr(vars.indexOf('version=')+8,3);
				if(vs.indexOf('&')>-1)
					vs=Number(vs.substr(0,vs.indexOf('&')));
			} 
			var NewE = document.createElement('div');
			NewE.setAttribute('style','text-align:center;');
			NewE.innerHTML='<button class="aquariumButton cta-button-sm gray-button"><span>Toggle This Tank</span></button><button class="aquariumButton cta-button-sm gray-button" alt="'+vs+'" name="'+id+'"><span>Analyze This Tank</span></button><button id="open_tank_'+id+'" class="aquariumButton cta-button-sm gray-button" onclick="window.open(\'/aquariumViewer/FishTankViewer.html?version='+vs+'&userEnvironmentId='+id+'&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version=&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=false\')"><span>Open This Tank</span></button>';
			embed.snapshotItem(i).parentNode.parentNode.insertBefore(NewE,embed.snapshotItem(i).parentNode.nextSibling);
			NewE.childNodes[0].addEventListener('click',function(){toggleTank(this.parentNode.parentNode.getElementsByTagName('object')[0]);this.blur();},false);
			NewE.childNodes[1].addEventListener('click',function(){getGlow(this.name,this.getAttribute('alt'),this,1)},false);
			if(ct=="on"){
				var NewE = document.createElement('div');
				embed.snapshotItem(i).parentNode.parentNode.insertBefore(NewE,embed.snapshotItem(i).parentNode.nextSibling);
				NewE.innerHTML='<div id="tank_'+id+'" style="position:absolute;font-weight:bold;text-align:center;"></div>';
				getGlow(id,vs,NewE.childNodes[0],0);
			}
		}
	}
	else if(embed.snapshotLength>0){
		var gm_div=document.createElement('div');
		gm_div.setAttribute('id','tgl-ctrl-pnl');
		gm_div.innerHTML='<input id="toggleBtn" type="button" value="'+((ad=="off")?'Hide':'Show')+' Aquariums"> <input id="AquaClsBtn" type="button" value="X" title="Close" onclick="document.body.removeChild(this.parentNode)"> <input type="button" value="Crappy Workaround" id="crappyWorkaround"/>';
		document.body.appendChild(gm_div);
		var btn=$('toggleBtn');
		btn.addEventListener('click',function(){toggleTanks(embed,this);this.blur();},false);
		if(!runonece)
			toggleTanks(embed,btn);
		for(var i=0,stp=embed.snapshotLength;i<stp;i++){
			embed.snapshotItem(i).parentNode.parentNode.className='guild-tank';
			var id=embed.snapshotItem(i).getAttribute('flashvars').substr(18);
			if(!vs){
				var vs=embed.snapshotItem(i).getAttribute('src');
				vs=Number(vs.substr(vs.indexOf('version=')+8,3));
			}
			var NewE = document.createElement('tr');
			NewE.setAttribute('style','text-align:center;');
			NewE.innerHTML='<button class="aquariumButton cta-button-sm gray-button"><span>Toggle This Tank</span></button><button class="aquariumButton cta-button-sm gray-button" alt="'+vs+'" name="'+id+'"><span>Analyze This Tank</span></button><button id="open_tank_'+id+'" class="aquariumButton cta-button-sm gray-button" onclick="window.open(\'/aquariumViewer/FishTankViewer.html?version='+vs+'&userEnvironmentId='+id+'&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version=&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=false\')"><span>Open This Tank</span></button>';
			embed.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.appendChild(NewE);
			NewE.childNodes[0].addEventListener('click',function(){toggleTank(this.parentNode.parentNode.getElementsByTagName('object')[0]);this.blur();},false);
			NewE.childNodes[1].addEventListener('click',function(){getGlow(this.name,this.getAttribute('alt'),this,1)},false);
			if(ct=="on"){
				var NewE = document.createElement('tr');
				embed.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.appendChild(NewE);
				NewE.innerHTML='<td id="tank_'+id+'" style="position:absolute;font-weight:bold;text-align:center;"></td>';
				getGlow(id,vs,NewE.childNodes[0],0);
			}
		}
	}
	else{
		var gm_div=document;
	}
	var q=document.getElementsByName('quality');
	var m=document.getElementsByName('wmode');
	for(var i=0,stp=q.length;i<stp;i++){
		q[i].value='low';//has no effect :(
		m[i].value='opaque';//at least this works :)
	}
	if(fb=="off"||!gm_div.previousSibling||runonece){
		gm_div.style.display='none';
	}
	runonece=true;// using this as a dirty trick cause i am feeling lazy
}
page_init();
$('crappyWorkaround').addEventListener('click',page_init,false);
//unsafeWindow.page_init=page_init;