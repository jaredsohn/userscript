// ==UserScript==
// @name           eRepublik Enhanced
// @namespace      com.erepublik.userscript.enhanced
// @description    Inject awesome features on eRepublik
// @version        0.0.1
// @include        http://*.erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js
// ==/UserScript==

// ! === VARIABLES ===
var $ 		= jQuery.noConflict();
var UID 	= "com.erepublik.userscript.enhanced.";
var datas	= {
				version:{n:'0.0.1',d:'03/19/11'},
				inventory:{
								_1:{n:'food',v:Array(0,0,0,0,0,0),s:Array(0,0,0,0,0,0),u:Array(0,0,0,0,0,0)},
								_2:{n:'moving_tickets',v:Array(0,0,0,0,0,0),s:Array(0,0,0,0,0,0),u:Array(0,0,0,0,0,0)},
								_3:{n:'house',v:Array(0,0,0,0,0,0),s:Array(0,0,0,0,0,0),u:Array(0,0,0,0,0,0)},
								_4:{n:'hospital',v:Array(0,0,0,0,0,0),s:Array(0,0,0,0,0,0),u:Array(0,0,0,0,0,0)},
								_5:{n:'defense_system',v:Array(0,0,0,0,0,0),s:Array(0,0,0,0,0,0),u:Array(0,0,0,0,0,0)},
								_10:{n:'grain',v:0,s:0},
								_11:{n:'oil',v:0,s:0},
								_13:{n:'stone',v:0,s:0},
								_14:{n:'iron',v:0,s:0},
								_15:{n:'weapons',v:Array(0,0,0,0,0,0),s:Array(0,0,0,0,0,0),u:Array(0,0,0,0,0,0)}
							},
				hit:function(a,b,c,d){return ((((a-1)/20+0.3)*((b/10)+40)*(1+c/100))*d).toFixed(0);},
				ranks:{recruit:1,private_0:2,private_1:3,private_2:4,private_3:5,corporal_0:6,corporal_1:7,corporal_2:8,corporal_3:9,sergeant_0:10,sergeant_1:11,sergeant_2:12,sergeant_3:13,lieutenant_0:14,lieutenant_1:15,lieutenant_2:16,lieutenant_3:17,captain_0:18,captain_1:19,captain_2:20,captain_3:21,major_0:22,major_1:23,major_2:24,major_3:25,commander_0:26,commander_1:27,commander_2:28,commander_3:29,lt_colonel_0:30,lt_colonel_1:31,lt_colonel_2:32,lt_colonel_3:33,colonel_0:34,colonel_1:35,colonel_2:36,colonel_3:37,general_0:38,general_1:39,general_2:40,general_3:41,field_marshal_0:42,field_marshal_1:43,field_marshal_2:44,field_marshal_3:45,supreme_marshal_0:46,supreme_marshal_1:47,supreme_marshal_2:48,supreme_marshal_3:49,national_force_0:50,national_force_1:51,national_force_2:52,national_force_3:53,world_class_force_0:54,world_class_force_1:55,world_class_force_2:56,world_class_force_3:57,legendary_force_0:58,legendary_force_1:59,legendary_force_2:60,legendary_force_3:61,god_of_war:62}
			  };

// ! === SYSTEM ===
var Url={pages:location.href.split('/'),domains:(location.href.split('/'))[2].split('.'),protocol:(location.href.split('/'))[0],encode:function(b){return escape(this._0(b))},decode:function(b){return this._1(unescape(b))},_0:function(b){b=b.replace(/\r\n/g,"\n");var c="";for(var d=0;d<b.length;d++){var a=b.charCodeAt(d);if(a<128){c+=String.fromCharCode(a)}else if((a>127)&&(a<2048)){c+=String.fromCharCode((a>>6)|192);c+=String.fromCharCode((a&63)|128)}else{c+=String.fromCharCode((a>>12)|224);c+=String.fromCharCode(((a>>6)&63)|128);c+=String.fromCharCode((a&63)|128)}}return c},_1:function(b){var c="";var d=0;var a=c1=c2=0;while(d<b.length){a=b.charCodeAt(d);if(a<128){c+=String.fromCharCode(a);d++}else if((a>191)&&(a<224)){c2=b.charCodeAt(d+1);c+=String.fromCharCode(((a&31)<<6)|(c2&63));d+=2}else{c2=b.charCodeAt(d+1);c3=b.charCodeAt(d+2);c+=String.fromCharCode(((a&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}return c}}


// ! === COMPATIBILITY ===
function UF_log(a){if(Browser.isOpera){/*opera.postError(a)*/}if(Browser.isChrome)console.log(a);if(Browser.isFirefox){if(typeof a == 'string')GM_log(a);else console.log(a)}}
function UF_addStyle(a){if(typeof GM_addStyle=='function')GM_addStyle(a);else{var b=document;var c=b.getElementsByTagName('head')[0];var d=c||b.documentElement;var e=b.createElement('style');e.type('text/css');e.appendChild(b.createTextNode(a));if(c)d.appendChild(e);else d.insertBefore(e,d.firstChild)}}
function UF_setValue(a,b){if(typeof GM_setValue=='function')GM_setValue(a,b);else{var c=window.localStorage;if(typeof c=='object'){switch(typeof(b)){case'string':c.setItem(UID+a,'S]'+b);break;case'number':if(value.toString().indexOf('.')<0){c.setItem(UID+a,'N]'+b)}break;case'boolean':c.setItem(UID+a,'B]'+b);break;}}else{document.cookie=UID+escape(a)+"="+escape(b)+";expires="+(new Date((new Date()).getTime()+(31536000000))).toGMTString()+";path=/";}}}
function UF_getValue(a,b){if(typeof GM_getValue=='function')return GM_getValue(a,b);else{var c=window.localStorage;if(typeof c=='object'){var d=c.getItem(UID+name);if(d==null){return b;}else{switch(d.substr(0,2)){case'S]':return d.substr(2);case'N]':return parseInt(d.substr(2));case'B]':return d.substr(2)=='true';}}return d;}else{var f=b;var g=document.cookie.split("; ");for(var x=0;x<g.length;x++){var h=g[x].split("=");if(h[0]==UID+escape(a)){try{var i=unescape(h[1]);}catch(e){f=b;}f=i;}}return f;}}}
if(typeof unsafeWindow == 'undefined') unsafeWindow = window;

// ! === FUNCTIONS COLLECTIONS ===
function MainSite(){
	this.TomorrowHealth = function (){
		if(typeof $('#wellnessBar').attr('EA_TH') == "undefined")
		{var interface = new Interfaces();
		interface.TomorrowHealth();}
		var HouseGain = 0;
		
		if(datas.inventory._3.v[1] > 0 && datas.inventory._3.s[1] < datas.inventory._3.v[1]) HouseGain = 50;
		if(datas.inventory._3.v[2] > 0 && datas.inventory._3.s[2] < datas.inventory._3.v[2]) HouseGain = 50;
		if(datas.inventory._3.v[3] > 0 && datas.inventory._3.s[3] < datas.inventory._3.v[3]) HouseGain = 50;
		if(datas.inventory._3.v[4] > 0 && datas.inventory._3.s[4] < datas.inventory._3.v[4]) HouseGain = 50;
		if(datas.inventory._3.v[5] > 0 && datas.inventory._3.s[5] < datas.inventory._3.v[5]) HouseGain = 50;
		
		var CurrentHealth = parseInt($('#wellnessBar span').html());
		var coef = 0;
		
		if(CurrentHealth <= 10) coef = HouseGain-1;
		else if(CurrentHealth <= 50) coef = HouseGain-2;
		else if(CurrentHealth <= 80) coef = HouseGain-3;
		else coef = HouseGain-4;
		
		GM_log(datas.inventory._3.u);
		$('#EA_TomorrowHealth span').html( (CurrentHealth+coef<0)?0:((CurrentHealth+coef>100)?100:CurrentHealth+coef) );
		$('#EA_TomorrowHealth img').attr('src',(HouseGain==0?'':'http://www.erepublik.com/images/icons/industry/3/q'+HouseGain/10+'.png'));
		if(HouseGain==0)
			$('#EA_TomorrowHealth_info').html('You have no House available.');
		else{
			$('#EA_TomorrowHealth_info').html('You have a q'+HouseGain/10+' House available.<br/>Durability '+datas.inventory._3.u[HouseGain/10]+' day(s)');
		}
		
		$('#EA_TomorrowHealth').hover(
			function(e){
				$('#TomorrowHealthTooltip').css('display','block');
			},
			function(e){
				$('#TomorrowHealthTooltip').css('display','none');
			}
		).mousemove(function(e){
				$('#TomorrowHealthTooltip').css({top:e.pageY+25,left:e.pageX-10});
		});
	}
	this.MilitaryInfluenceCalculate = function (){
		if(typeof $('.citizen_content').attr('EA_MIC') == "undefined")
		{var interface = new Interfaces();
		interface.MilitaryInfluenceCalculate();}
		
		var rank=0;
		var strength=0;
		$('.citizen_military').each(function(index, value){
			if(index==0){
				strength = parseFloat($(this).find('h4').text().replace(',',''));
			}
			if(index==1){
				rank = eval('datas.ranks.'+($(this).find('img').attr('src').split('/')[$(this).find('img').attr('src').split('/').length-1].split('.')[0]));
				$(this).css('margin-bottom','2px');
			}
		});
		
		$('#EA_slider_rank').attr('value',rank);
		$('#EA_slider_strength').attr('value',strength);
		
		for(i=0;i<=5;i++) $('#EA_sI_'+i).html(datas.hit(rank,strength,i*20,1));
		for(i=0;i<=5;i++) $('#EA_sINE_'+i).html(datas.hit(rank,strength,i*20,1.1));
		for(i=0;i<=5;i++) $('#EA_I_'+i).html(15*datas.hit(rank,strength,i*20,1));
		for(i=0;i<=5;i++) $('#EA_INE_'+i).html(15*datas.hit(rank,strength,i*20,1.1));
		
		$('#EA_Slider').slider({
			min: 1,
			max: 400,
			step: 1,
			value: 15,
			slide: function(event, ui) {
				document.getElementById('EA_slider_fights').innerHTML = ui.value;
				
				if(ui.value > 35){
					$('#EA_slider_fill').css('width','0%');
					var counters  = '<span title="For One & Two Shot killers, cost of 1/2 WP per kill.">'+((ui.value-35)*0.5)+'G</span> / ';
						counters += '<span title="For more than 2 Shots killers, cost of 1 WP & 1 ID per kill.">'+((ui.value-35)*1.5)+'G</span> ';
					$('#EA_slider_golds').html(counters);
				}else{
					$('#EA_slider_fill').css('width',(96-(96*ui.value)/35)+'%');
					$('#EA_slider_golds').html('0G');
				}
				
				rank = parseInt($('#EA_slider_rank').attr('value'));
				strength = parseInt($('#EA_slider_strength').attr('value'));
				for(i=0;i<=5;i++) $('#EA_I_'+i).html(ui.value*datas.hit(rank,strength,i*20,1));
				for(i=0;i<=5;i++) $('#EA_INE_'+i).html(ui.value*datas.hit(rank,strength,i*20,1.1));
			}
		});
	}
}

// ! === INTERFACE COLLECTION ===
function Interfaces(){
	this.TomorrowHealth = function (){
	
		$('li#wellnessBar').after('<li id="EA_TomorrowHealth" class="nomargin"><img width="25px" src=""><span>43</span></li>');
		$('div#sidebar').append('<div style="display:none;width:250px;"class="simple_yellow" id="TomorrowHealthTooltip"><img alt="" class="tip" src="http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png"><span id="EA_TomorrowHealth_info"></span></div>');
		$('li#wellnessBar').attr('EA_TH','true');
	}
	this.MilitaryInfluenceCalculate = function (){
		UF_addStyle('.ui-widget {font-family: Trebuchet MS,Tahoma,Verdana,Arial,sans-serif;font-size: 1.1em;}');
		UF_addStyle('.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button {font-family: Trebuchet MS,Tahoma,Verdana,Arial,sans-serif;font-size: 1em;}');
		UF_addStyle('.ui-widget-content {background: url("http://jqueryui.com/themeroller/images/?new=eeeeee&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|100") repeat-x scroll 50% top #EEEEEE;border: 1px solid #DDDDDD;color: #333333;}');
		UF_addStyle('.ui-widget-content a {color: #333333;}');
		UF_addStyle('.ui-widget-header {background: url("http://jqueryui.com/themeroller/images/?new=f6a828&w=500&h=100&f=png&q=100&fltr[]=over|textures/12_gloss_wave.png|0|0|35") repeat-x scroll 50% 50% #F6A828;border: 1px solid #E78F08;color: #FFFFFF;font-weight: bold;}');
		UF_addStyle('.ui-widget-header a {color: #FFFFFF;}');
		UF_addStyle('.ui-state-default, .ui-widget-content .ui-state-default {background: url("http://jqueryui.com/themeroller/images/?new=f6f6f6&w=1&h=400&f=png&q=100&fltr[]=over|textures/02_glass.png|0|0|100") repeat-x scroll 50% 50% #F6F6F6;border: 1px solid #CCCCCC;color: #1C94C4;font-weight: bold;outline: medium none;}');
		UF_addStyle('.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited {color: #1C94C4;outline: medium none;text-decoration: none;}');
		UF_addStyle('.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus {background: url("http://jqueryui.com/themeroller/images/?new=fdf5ce&w=1&h=400&f=png&q=100&fltr[]=over|textures/02_glass.png|0|0|100") repeat-x scroll 50% 50% #FDF5CE;border: 1px solid #FBCB09;color: #C77405;font-weight: bold;outline: medium none;}');
		UF_addStyle('.ui-state-hover a, .ui-state-hover a:hover {color: #C77405;outline: medium none;text-decoration: none;}');
		UF_addStyle('.ui-state-active, .ui-widget-content .ui-state-active {background: url("http://jqueryui.com/themeroller/images/?new=ffffff&w=1&h=400&f=png&q=100&fltr[]=over|textures/02_glass.png|0|0|65") repeat-x scroll 50% 50% #FFFFFF;border: 1px solid #FBD850;color: #EB8F00;font-weight: bold;outline: medium none;}');
		UF_addStyle('.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited {color: #EB8F00;outline: medium none;text-decoration: none;}');
		UF_addStyle('.ui-state-highlight, .ui-widget-content .ui-state-highlight {background: url("http://jqueryui.com/themeroller/images/?new=ffe45c&w=1&h=100&f=png&q=100&fltr[]=over|textures/03_highlight_soft.png|0|0|75") repeat-x scroll 50% top #FFE45C;border: 1px solid #FED22F;color: #363636;}');
		UF_addStyle('.ui-state-highlight a, .ui-widget-content .ui-state-highlight a {color: #363636;}');
		UF_addStyle('.ui-state-error, .ui-widget-content .ui-state-error {background: url("http://jqueryui.com/themeroller/images/?new=b81900&w=40&h=40&f=png&q=100&fltr[]=over|textures/08_diagonals_thick.png|0|0|18") repeat scroll 50% 50% #B81900;border: 1px solid #CD0A0A;color: #FFFFFF;}');
		UF_addStyle('.ui-state-error a, .ui-widget-content .ui-state-error a {color: #FFFFFF;}');
		UF_addStyle('.ui-state-error-text, .ui-widget-content .ui-state-error-text {color: #FFFFFF;}');
		UF_addStyle('.ui-state-disabled, .ui-widget-content .ui-state-disabled {background-image: none;opacity: 0.35;}');
		UF_addStyle('.ui-priority-primary, .ui-widget-content .ui-priority-primary {font-weight: bold;}');
		UF_addStyle('.ui-priority-secondary, .ui-widget-content .ui-priority-secondary {font-weight: normal;opacity: 0.7;}');
		UF_addStyle('.ui-icon {background-image: url("http://jqueryui.com/themeroller/images/?new=222222&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png");height: 16px;width: 16px;}');
		UF_addStyle('.ui-widget-content .ui-icon {background-image: url("http://jqueryui.com/themeroller/images/?new=222222&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png");}');
		UF_addStyle('.ui-widget-header .ui-icon {background-image: url("http://jqueryui.com/themeroller/images/?new=ffffff&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png");}');
		UF_addStyle('.ui-state-default .ui-icon {background-image: url("http://jqueryui.com/themeroller/images/?new=ef8c08&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png");}');
		UF_addStyle('.ui-state-hover .ui-icon, .ui-state-focus .ui-icon {background-image: url("http://jqueryui.com/themeroller/images/?new=ef8c08&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png");}');
		UF_addStyle('.ui-state-active .ui-icon {background-image: url("http://jqueryui.com/themeroller/images/?new=ef8c08&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png");}');
		UF_addStyle('.ui-state-highlight .ui-icon {background-image: url("http://jqueryui.com/themeroller/images/?new=228ef1&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png");}');
		UF_addStyle('.ui-state-error .ui-icon, .ui-state-error-text .ui-icon {background-image: url("http://jqueryui.com/themeroller/images/?new=ffd27a&w=256&h=240&f=png&fltr[]=rcd|256&fltr[]=mask|icons/icons.png");}');
		UF_addStyle('.ui-icon-carat-1-n {background-position: 0 0;}');
		UF_addStyle('.ui-icon-carat-1-ne {background-position: -16px 0;}');
		UF_addStyle('.ui-icon-carat-1-e {background-position: -32px 0;}');
		UF_addStyle('.ui-icon-carat-1-se {background-position: -48px 0;}');
		UF_addStyle('.ui-icon-carat-1-s {background-position: -64px 0;}');
		UF_addStyle('.ui-icon-carat-1-sw {background-position: -80px 0;}');
		UF_addStyle('.ui-icon-carat-1-w {background-position: -96px 0;}');
		UF_addStyle('.ui-icon-carat-1-nw {background-position: -112px 0;}');
		UF_addStyle('.ui-icon-carat-2-n-s {background-position: -128px 0;}');
		UF_addStyle('.ui-icon-carat-2-e-w {background-position: -144px 0;}');
		UF_addStyle('.ui-icon-triangle-1-n {background-position: 0 -16px;}');
		UF_addStyle('.ui-icon-triangle-1-ne {background-position: -16px -16px;}');
		UF_addStyle('.ui-icon-triangle-1-e {background-position: -32px -16px;}');
		UF_addStyle('.ui-icon-triangle-1-se {background-position: -48px -16px;}');
		UF_addStyle('.ui-icon-triangle-1-s {background-position: -64px -16px;}');
		UF_addStyle('.ui-icon-triangle-1-sw {background-position: -80px -16px;}');
		UF_addStyle('.ui-icon-triangle-1-w {background-position: -96px -16px;}');
		UF_addStyle('.ui-icon-triangle-1-nw {background-position: -112px -16px;}');
		UF_addStyle('.ui-icon-triangle-2-n-s {background-position: -128px -16px;}');
		UF_addStyle('.ui-icon-triangle-2-e-w {background-position: -144px -16px;}');
		UF_addStyle('.ui-icon-arrow-1-n {background-position: 0 -32px;}');
		UF_addStyle('.ui-icon-arrow-1-ne {background-position: -16px -32px;}');
		UF_addStyle('.ui-icon-arrow-1-e {background-position: -32px -32px;}');
		UF_addStyle('.ui-icon-arrow-1-se {background-position: -48px -32px;}');
		UF_addStyle('.ui-icon-arrow-1-s {background-position: -64px -32px;}');
		UF_addStyle('.ui-icon-arrow-1-sw {background-position: -80px -32px;}');
		UF_addStyle('.ui-icon-arrow-1-w {background-position: -96px -32px;}');
		UF_addStyle('.ui-icon-arrow-1-nw {background-position: -112px -32px;}');
		UF_addStyle('.ui-icon-arrow-2-n-s {background-position: -128px -32px;}');
		UF_addStyle('.ui-icon-arrow-2-ne-sw {background-position: -144px -32px;}');
		UF_addStyle('.ui-icon-arrow-2-e-w {background-position: -160px -32px;}');
		UF_addStyle('.ui-icon-arrow-2-se-nw {background-position: -176px -32px;}');
		UF_addStyle('.ui-icon-arrowstop-1-n {background-position: -192px -32px;}');
		UF_addStyle('.ui-icon-arrowstop-1-e {background-position: -208px -32px;}');
		UF_addStyle('.ui-icon-arrowstop-1-s {background-position: -224px -32px;}');
		UF_addStyle('.ui-icon-arrowstop-1-w {background-position: -240px -32px;}');
		UF_addStyle('.ui-icon-arrowthick-1-n {background-position: 0 -48px;}');
		UF_addStyle('.ui-icon-arrowthick-1-ne {background-position: -16px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-1-e {background-position: -32px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-1-se {background-position: -48px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-1-s {background-position: -64px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-1-sw {background-position: -80px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-1-w {background-position: -96px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-1-nw {background-position: -112px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-2-n-s {background-position: -128px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-2-ne-sw {background-position: -144px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-2-e-w {background-position: -160px -48px;}');
		UF_addStyle('.ui-icon-arrowthick-2-se-nw {background-position: -176px -48px;}');
		UF_addStyle('.ui-icon-arrowthickstop-1-n {background-position: -192px -48px;}');
		UF_addStyle('.ui-icon-arrowthickstop-1-e {background-position: -208px -48px;}');
		UF_addStyle('.ui-icon-arrowthickstop-1-s {background-position: -224px -48px;}');
		UF_addStyle('.ui-icon-arrowthickstop-1-w {background-position: -240px -48px;}');
		UF_addStyle('.ui-icon-arrowreturnthick-1-w {background-position: 0 -64px;}');
		UF_addStyle('.ui-icon-arrowreturnthick-1-n {background-position: -16px -64px;}');
		UF_addStyle('.ui-icon-arrowreturnthick-1-e {background-position: -32px -64px;}');
		UF_addStyle('.ui-icon-arrowreturnthick-1-s {background-position: -48px -64px;}');
		UF_addStyle('.ui-icon-arrowreturn-1-w {background-position: -64px -64px;}');
		UF_addStyle('.ui-icon-arrowreturn-1-n {background-position: -80px -64px;}');
		UF_addStyle('.ui-icon-arrowreturn-1-e {background-position: -96px -64px;}');
		UF_addStyle('.ui-icon-arrowreturn-1-s {background-position: -112px -64px;}');
		UF_addStyle('.ui-icon-arrowrefresh-1-w {background-position: -128px -64px;}');
		UF_addStyle('.ui-icon-arrowrefresh-1-n {background-position: -144px -64px;}');
		UF_addStyle('.ui-icon-arrowrefresh-1-e {background-position: -160px -64px;}');
		UF_addStyle('.ui-icon-arrowrefresh-1-s {background-position: -176px -64px;}');
		UF_addStyle('.ui-icon-arrow-4 {background-position: 0 -80px;}');
		UF_addStyle('.ui-icon-arrow-4-diag {background-position: -16px -80px;}');
		UF_addStyle('.ui-icon-extlink {background-position: -32px -80px;}');
		UF_addStyle('.ui-icon-newwin {background-position: -48px -80px;}');
		UF_addStyle('.ui-icon-refresh {background-position: -64px -80px;}');
		UF_addStyle('.ui-icon-shuffle {background-position: -80px -80px;}');
		UF_addStyle('.ui-icon-transfer-e-w {background-position: -96px -80px;}');
		UF_addStyle('.ui-icon-transferthick-e-w {background-position: -112px -80px;}');
		UF_addStyle('.ui-icon-folder-collapsed {background-position: 0 -96px;}');
		UF_addStyle('.ui-icon-folder-open {background-position: -16px -96px;}');
		UF_addStyle('.ui-icon-document {background-position: -32px -96px;}');
		UF_addStyle('.ui-icon-document-b {background-position: -48px -96px;}');
		UF_addStyle('.ui-icon-note {background-position: -64px -96px;}');
		UF_addStyle('.ui-icon-mail-closed {background-position: -80px -96px;}');
		UF_addStyle('.ui-icon-mail-open {background-position: -96px -96px;}');
		UF_addStyle('.ui-icon-suitcase {background-position: -112px -96px;}');
		UF_addStyle('.ui-icon-comment {background-position: -128px -96px;}');
		UF_addStyle('.ui-icon-person {background-position: -144px -96px;}');
		UF_addStyle('.ui-icon-print {background-position: -160px -96px;}');
		UF_addStyle('.ui-icon-trash {background-position: -176px -96px;}');
		UF_addStyle('.ui-icon-locked {background-position: -192px -96px;}');
		UF_addStyle('.ui-icon-unlocked {background-position: -208px -96px;}');
		UF_addStyle('.ui-icon-bookmark {background-position: -224px -96px;}');
		UF_addStyle('.ui-icon-tag {background-position: -240px -96px;}');
		UF_addStyle('.ui-icon-home {background-position: 0 -112px;}');
		UF_addStyle('.ui-icon-flag {background-position: -16px -112px;}');
		UF_addStyle('.ui-icon-calendar {background-position: -32px -112px;}');
		UF_addStyle('.ui-icon-cart {background-position: -48px -112px;}');
		UF_addStyle('.ui-icon-pencil {background-position: -64px -112px;}');
		UF_addStyle('.ui-icon-clock {background-position: -80px -112px;}');
		UF_addStyle('.ui-icon-disk {background-position: -96px -112px;}');
		UF_addStyle('.ui-icon-calculator {background-position: -112px -112px;}');
		UF_addStyle('.ui-icon-zoomin {background-position: -128px -112px;}');
		UF_addStyle('.ui-icon-zoomout {background-position: -144px -112px;}');
		UF_addStyle('.ui-icon-search {background-position: -160px -112px;}');
		UF_addStyle('.ui-icon-wrench {background-position: -176px -112px;}');
		UF_addStyle('.ui-icon-gear {background-position: -192px -112px;}');
		UF_addStyle('.ui-icon-heart {background-position: -208px -112px;}');
		UF_addStyle('.ui-icon-star {background-position: -224px -112px;}');
		UF_addStyle('.ui-icon-link {background-position: -240px -112px;}');
		UF_addStyle('.ui-icon-cancel {background-position: 0 -128px;}');
		UF_addStyle('.ui-icon-plus {background-position: -16px -128px;}');
		UF_addStyle('.ui-icon-plusthick {background-position: -32px -128px;}');
		UF_addStyle('.ui-icon-minus {background-position: -48px -128px;}');
		UF_addStyle('.ui-icon-minusthick {background-position: -64px -128px;}');
		UF_addStyle('.ui-icon-close {background-position: -80px -128px;}');
		UF_addStyle('.ui-icon-closethick {background-position: -96px -128px;}');
		UF_addStyle('.ui-icon-key {background-position: -112px -128px;}');
		UF_addStyle('.ui-icon-lightbulb {background-position: -128px -128px;}');
		UF_addStyle('.ui-icon-scissors {background-position: -144px -128px;}');
		UF_addStyle('.ui-icon-clipboard {background-position: -160px -128px;}');
		UF_addStyle('.ui-icon-copy {background-position: -176px -128px;}');
		UF_addStyle('.ui-icon-contact {background-position: -192px -128px;}');
		UF_addStyle('.ui-icon-image {background-position: -208px -128px;}');
		UF_addStyle('.ui-icon-video {background-position: -224px -128px;}');
		UF_addStyle('.ui-icon-script {background-position: -240px -128px;}');
		UF_addStyle('.ui-icon-alert {background-position: 0 -144px;}');
		UF_addStyle('.ui-icon-info {background-position: -16px -144px;}');
		UF_addStyle('.ui-icon-notice {background-position: -32px -144px;}');
		UF_addStyle('.ui-icon-help {background-position: -48px -144px;}');
		UF_addStyle('.ui-icon-check {background-position: -64px -144px;}');
		UF_addStyle('.ui-icon-bullet {background-position: -80px -144px;}');
		UF_addStyle('.ui-icon-radio-off {background-position: -96px -144px;}');
		UF_addStyle('.ui-icon-radio-on {background-position: -112px -144px;}');
		UF_addStyle('.ui-icon-pin-w {background-position: -128px -144px;}');
		UF_addStyle('.ui-icon-pin-s {background-position: -144px -144px;}');
		UF_addStyle('.ui-icon-play {background-position: 0 -160px;}');
		UF_addStyle('.ui-icon-pause {background-position: -16px -160px;}');
		UF_addStyle('.ui-icon-seek-next {background-position: -32px -160px;}');
		UF_addStyle('.ui-icon-seek-prev {background-position: -48px -160px;}');
		UF_addStyle('.ui-icon-seek-end {background-position: -64px -160px;}');
		UF_addStyle('.ui-icon-seek-first {background-position: -80px -160px;}');
		UF_addStyle('.ui-icon-stop {background-position: -96px -160px;}');
		UF_addStyle('.ui-icon-eject {background-position: -112px -160px;}');
		UF_addStyle('.ui-icon-volume-off {background-position: -128px -160px;}');
		UF_addStyle('.ui-icon-volume-on {background-position: -144px -160px;}');
		UF_addStyle('.ui-icon-power {background-position: 0 -176px;}');
		UF_addStyle('.ui-icon-signal-diag {background-position: -16px -176px;}');
		UF_addStyle('.ui-icon-signal {background-position: -32px -176px;}');
		UF_addStyle('.ui-icon-battery-0 {background-position: -48px -176px;}');
		UF_addStyle('.ui-icon-battery-1 {background-position: -64px -176px;}');
		UF_addStyle('.ui-icon-battery-2 {background-position: -80px -176px;}');
		UF_addStyle('.ui-icon-battery-3 {background-position: -96px -176px;}');
		UF_addStyle('.ui-icon-circle-plus {background-position: 0 -192px;}');
		UF_addStyle('.ui-icon-circle-minus {background-position: -16px -192px;}');
		UF_addStyle('.ui-icon-circle-close {background-position: -32px -192px;}');
		UF_addStyle('.ui-icon-circle-triangle-e {background-position: -48px -192px;}');
		UF_addStyle('.ui-icon-circle-triangle-s {background-position: -64px -192px;}');
		UF_addStyle('.ui-icon-circle-triangle-w {background-position: -80px -192px;}');
		UF_addStyle('.ui-icon-circle-triangle-n {background-position: -96px -192px;}');
		UF_addStyle('.ui-icon-circle-arrow-e {background-position: -112px -192px;}');
		UF_addStyle('.ui-icon-circle-arrow-s {background-position: -128px -192px;}');
		UF_addStyle('.ui-icon-circle-arrow-w {background-position: -144px -192px;}');
		UF_addStyle('.ui-icon-circle-arrow-n {background-position: -160px -192px;}');
		UF_addStyle('.ui-icon-circle-zoomin {background-position: -176px -192px;}');
		UF_addStyle('.ui-icon-circle-zoomout {background-position: -192px -192px;}');
		UF_addStyle('.ui-icon-circle-check {background-position: -208px -192px;}');
		UF_addStyle('.ui-icon-circlesmall-plus {background-position: 0 -208px;}');
		UF_addStyle('.ui-icon-circlesmall-minus {background-position: -16px -208px;}');
		UF_addStyle('.ui-icon-circlesmall-close {background-position: -32px -208px;}');
		UF_addStyle('.ui-icon-squaresmall-plus {background-position: -48px -208px;}');
		UF_addStyle('.ui-icon-squaresmall-minus {background-position: -64px -208px;}');
		UF_addStyle('.ui-icon-squaresmall-close {background-position: -80px -208px;}');
		UF_addStyle('.ui-icon-grip-dotted-vertical {background-position: 0 -224px;}');
		UF_addStyle('.ui-icon-grip-dotted-horizontal {background-position: -16px -224px;}');
		UF_addStyle('.ui-icon-grip-solid-vertical {background-position: -32px -224px;}');
		UF_addStyle('.ui-icon-grip-solid-horizontal {background-position: -48px -224px;}');
		UF_addStyle('.ui-icon-gripsmall-diagonal-se {background-position: -64px -224px;}');
		UF_addStyle('.ui-icon-grip-diagonal-se {background-position: -80px -224px;}');
		UF_addStyle('.ui-corner-tl {border-top-left-radius: 4px;}');
		UF_addStyle('.ui-corner-tr {border-top-right-radius: 4px;}');
		UF_addStyle('.ui-corner-bl {border-bottom-left-radius: 4px;}');
		UF_addStyle('.ui-corner-br {border-bottom-right-radius: 4px;}');
		UF_addStyle('.ui-corner-top {border-top-left-radius: 4px;border-top-right-radius: 4px;}');
		UF_addStyle('.ui-corner-bottom {border-bottom-left-radius: 4px;border-bottom-right-radius: 4px;}');
		UF_addStyle('.ui-corner-right {border-bottom-right-radius: 4px;border-top-right-radius: 4px;}');
		UF_addStyle('.ui-corner-left {border-bottom-left-radius: 4px;border-top-left-radius: 4px;}');
		UF_addStyle('.ui-corner-all {border-radius: 4px 4px 4px 4px;}');
		UF_addStyle('.ui-widget-overlay {background: url("http://jqueryui.com/themeroller/images/?new=666666&w=40&h=40&f=png&q=100&fltr[]=over|textures/08_diagonals_thick.png|0|0|20") repeat scroll 50% 50% #666666;opacity: 0.5;}');
		UF_addStyle('.ui-widget-shadow {background: url("http://jqueryui.com/themeroller/images/?new=000000&w=40&h=100&f=png&q=100&fltr[]=over|textures/01_flat.png|0|0|10") repeat-x scroll 50% 50% #000000;border-radius: 5px 5px 5px 5px;margin: -5px 0 0 -5px;opacity: 0.2;padding: 5px;}');
		UF_addStyle('.ui-slider {position: relative;text-align: left;}');
		UF_addStyle('.ui-slider .ui-slider-handle {cursor: default;height: 1.2em;position: absolute;width: 1.2em;z-index: 2;}');
		UF_addStyle('.ui-slider .ui-slider-range {background-position: 0 0;border: 0 none;display: block;font-size: 0.7em;position: absolute;z-index: 1;}');
		UF_addStyle('.ui-slider-horizontal {height: 0.8em;}');
		UF_addStyle('.ui-slider-horizontal .ui-slider-handle {margin-left: -0.6em;top: -0.3em;}');
		UF_addStyle('.ui-slider-horizontal .ui-slider-range {height: 100%;top: 0;}');
		UF_addStyle('.ui-slider-horizontal .ui-slider-range-min {left: 0;}');
		UF_addStyle('.ui-slider-horizontal .ui-slider-range-max {right: 0;}');
		UF_addStyle('.ui-slider-horizontal .ui-slider-range-max {right: 0;}');
		UF_addStyle('.life .fill .mids, .life .fill .rights, .life .fill .lefts {background-position: right -35px !important}');
		
		var mask    = '<div style="margin-bottom:2px;" class="citizen_military"><strong title="Title">Label</strong>Values</div>';
		var submask = '<h4 style="margin-left:25px">Value</h4>';
		var armas   = '<h4 style="margin-left:20px"><img width="24" height="24" src="http://www.erepublik.com/images/icons/industry/15/qCalidad_90x90.png" title="QCalidad" alt="QCalidad">Value</h4>';

		var final  = '';
			final += submask.replace(/Value/g,'<span id="EA_sI_0"></span>');
			final += armas.replace(/Calidad/g,'1').replace(/Value/g,'<span id="EA_sI_1"></span>');
			final += armas.replace(/Calidad/g,'2').replace(/Value/g,'<span id="EA_sI_2"></span>');
			final += armas.replace(/Calidad/g,'3').replace(/Value/g,'<span id="EA_sI_3"></span>');
			final += armas.replace(/Calidad/g,'4').replace(/Value/g,'<span id="EA_sI_4"></span>');
			final += armas.replace(/Calidad/g,'5').replace(/Value/g,'<span id="EA_sI_5"></span>');
			final  = mask.replace(/Values/g,final).replace(/Label/g,'Influence').replace(/Title/g,'Influence made by the citizen without weapon, then with each quality of weapons.');
		$('div.citizen_content').append('<div class="clear"></div>');
		$('div.citizen_content').append(final);
		
		    final  = '';
			final += submask.replace(/Value/g,'<span id="EA_sINE_0"></span>').replace(/25px/g,'6px');
			final += armas.replace(/Calidad/g,'1').replace(/Value/g,'<span id="EA_sINE_1"></span>');
			final += armas.replace(/Calidad/g,'2').replace(/Value/g,'<span id="EA_sINE_2"></span>');
			final += armas.replace(/Calidad/g,'3').replace(/Value/g,'<span id="EA_sINE_3"></span>');
			final += armas.replace(/Calidad/g,'4').replace(/Value/g,'<span id="EA_sINE_4"></span>');
			final += armas.replace(/Calidad/g,'5').replace(/Value/g,'<span id="EA_sINE_5"></span>');
			final  = mask.replace(/Values/g,final).replace(/Label/g,'NE Influence').replace(/Title/g,'Influence with Natural Enemy, made by the citizen without weapon, then with each quality of weapons.').replace(/2px/g,'20px');;
		$('div.citizen_content').append('<div class="clear"></div>');
		$('div.citizen_content').append(final);
		
		var final  = '';
			final += '<h4 style="margin-left:25px;width:250px;padding-top:15px;" title="Select the slider and use key arrows for change the number of fights."><div id="EA_Slider"></div></h4>';
			final += '<div style="margin-top:5px" class="stat">';
			final += ' <small><span id="EA_slider_fights">15</span> fights</small>';
			final += '  <table width="100%" border="0" class="barholder"><tbody><tr><td>';
			final += '   <div class="bar damage life ">';
			final += '    <div class="border"><span class="lefts"></span><span class="mids" style="width:96%;"></span><span class="rights"></span></div>';
			final += '    <div class="fill"><span class="lefts"></span><span class="mids" style="width:50%;" id="EA_slider_fill"></span><span class="rights"></span></div>';
			final += '   </div>';
			final += '  </td></tr></tbody></table>';
			final += ' <small><strong id="EA_slider_golds">0G</strong></small>';
			final += '</div>';
			final  = mask.replace(/Values/g,final).replace(/Label/g,'Fights').replace(/Title/g,'Total Influence made by the citizen without weapon, then with each quality of weapons.');
		$('div.citizen_content').append('<div class="clear"></div>');	
		$('div.citizen_content').append(final);
		
		var final  = '';
			final += submask.replace(/Value/g,'<span id="EA_I_0"></span>').replace(/25px/g,'15px');
			final += armas.replace(/Calidad/g,'1').replace(/Value/g,'<span id="EA_I_1"></span>').replace(/20px/g,'15px');
			final += armas.replace(/Calidad/g,'2').replace(/Value/g,'<span id="EA_I_2"></span>').replace(/20px/g,'15px');
			final += armas.replace(/Calidad/g,'3').replace(/Value/g,'<span id="EA_I_3"></span>').replace(/20px/g,'15px');
			final += armas.replace(/Calidad/g,'4').replace(/Value/g,'<span id="EA_I_4"></span>').replace(/20px/g,'15px');
			final += armas.replace(/Calidad/g,'5').replace(/Value/g,'<span id="EA_I_5"></span>').replace(/20px/g,'15px');
			final  = mask.replace(/Values/g,final).replace(/Label/g,'').replace(/Title/g,'Total Influence made by the citizen without weapon, then with each quality of weapons.');
		$('div.citizen_content').append('<div class="clear"></div>');	
		$('div.citizen_content').append(final);
		
		var final  = '';
			final += submask.replace(/Value/g,'<span id="EA_INE_0"></span>').replace(/25px/g,'15px');
			final += armas.replace(/Calidad/g,'1').replace(/Value/g,'<span id="EA_INE_1"></span>').replace(/20px/g,'15px');
			final += armas.replace(/Calidad/g,'2').replace(/Value/g,'<span id="EA_INE_2"></span>').replace(/20px/g,'15px');
			final += armas.replace(/Calidad/g,'3').replace(/Value/g,'<span id="EA_INE_3"></span>').replace(/20px/g,'15px');
			final += armas.replace(/Calidad/g,'4').replace(/Value/g,'<span id="EA_INE_4"></span>').replace(/20px/g,'15px');
			final += armas.replace(/Calidad/g,'5').replace(/Value/g,'<span id="EA_INE_5"></span>').replace(/20px/g,'15px');
			final  = mask.replace(/Values/g,final).replace(/Label/g,'').replace(/Title/g,'Total Influence with a Natural Enemy made by the citizen without weapon, then with each quality of weapons.');
		$('div.citizen_content').append('<div class="clear"></div>');	
		$('div.citizen_content').append(final);
		
		$('div.citizen_content').append('<input type="hidden" value="" id="EA_slider_rank"><input type="hidden" value="" id="EA_slider_strength">');
		
		$('div.citizen_content').attr('EA_MIC','true');
	}
}

// ! === FUNCTIONS ===
function GetInventory(){
	// Creating loader
	$('body').after('<noneofyourbusiness><div id="EA_loader" style="display:none;" disabled="disabled"></div></noneofyourbusiness>');
    
    // Retrieve inventory and inject it on page
    var cnt = $.ajax({url: 'http://www.erepublik.com/'+Url.pages[3]+'/economy/inventory',async: false}).responseText;
    	cnt = cnt.replace(/<meta/gi,'<out oldtype="meta"').replace(/<\/meta/gi,'</out');
    	cnt = cnt.replace(/<link/gi,'<out oldtype="link"').replace(/<\/link/gi,'</out');
    	cnt = cnt.replace(/<script/gi,'<out oldtype="script"').replace(/<\/script/gi,'</out');
    $('#EA_loader').html(cnt);
    
    var a = 0;
    var b = 0;

	// Retrieve Used Items
    	a = cnt.indexOf('itemPartials');
    	b = cnt.substr(a+15).indexOf(';');
    var itemPartials = cnt.substr(a+15,b);
    	itemPartials = itemPartials.substr(1,itemPartials.length-2).replace(/\}\,\"/g,'}-"').split('-');
    
    for(var i in itemPartials){
    	a = itemPartials[i].indexOf(':');
    	
    	industry = itemPartials[i].substr(1,a-2);
    	subItems = itemPartials[i].substr(a+2,itemPartials[i].length-(a+3)).split(',');
    	
    	switch(industry){
    		case '1':
	        	for(var j in subItems){
	        		subItems[j] = subItems[j].replace(/"/g,'').split(':');
	        		datas.inventory._1.u[subItems[j][0]] = subItems[j][1];
	        	}
    		break;
    		case '2':
	        	for(var j in subItems){
	        		subItems[j] = subItems[j].replace(/"/g,'').split(':');
	        		datas.inventory._2.u[subItems[j][0]] = subItems[j][1];
	        	}
    		break;
    		case '3':
	        	for(var j in subItems){
	        		subItems[j] = subItems[j].replace(/"/g,'').split(':');
	        		datas.inventory._3.u[subItems[j][0]] = subItems[j][1];
	        	}
    		break;
    		case '4':
	        	for(var j in subItems){
	        		subItems[j] = subItems[j].replace(/"/g,'').split(':');
	        		datas.inventory._4.u[subItems[j][0]] = subItems[j][1];
	        	}
    		break;
    		case '5':
	        	for(var j in subItems){
	        		subItems[j] = subItems[j].replace(/"/g,'').split(':');
	        		datas.inventory._5.u[subItems[j][0]] = subItems[j][1];
	        	}
    		break;
    		case '15':
	        	for(var j in subItems){
	        		subItems[j] = subItems[j].replace(/"/g,'').split(':');
	        		datas.inventory._15.u[subItems[j][0]] = subItems[j][1];
	        	}
    		break;
    		default: break;
    	}
    }
    
    // Retrieve All Inventory Items
    	a = cnt.indexOf('itemAmounts');
    	b = cnt.substr(a+15).indexOf(';');
    var itemAmounts = cnt.substr(a+15,b-1);
    	itemAmounts = itemAmounts.replace(/\]\,\[/g,']-[').split('-');
    
    for(var i in itemAmounts){itemAmounts[i] = itemAmounts[i].replace(/[\[\]]/g,'').split(',');}
    
    datas.inventory._10.v = parseInt(itemAmounts[10][1]);
    datas.inventory._11.v = parseInt(itemAmounts[11][1]);
    datas.inventory._13.v = parseInt(itemAmounts[13][1]);
    datas.inventory._14.v = parseInt(itemAmounts[14][1]);
    datas.inventory._1.v = itemAmounts[1];
    datas.inventory._2.v = itemAmounts[2];
    datas.inventory._3.v = itemAmounts[3];
    datas.inventory._4.v = itemAmounts[4];
    datas.inventory._5.v = itemAmounts[5];
    datas.inventory._15.v = itemAmounts[15];
    
    // Retrieve OnSell Items
    $('noneofyourbusiness div#inventory_overview div#sell_offers table tbody tr').each(function(i,v){
    	if($(this).hasClass('buy_market_license')){}else{
    			a = $(this).find('td img.offer_image').attr('src').indexOf('industry');
    			b = $(this).find('td img.offer_image').attr('src').substr(a+9).indexOf('/');	
    		industry = parseInt($(this).find('td img.offer_image').attr('src').substr(a+9,b));
    		quality = parseInt($(this).find('td img.offer_image').attr('src').substr(a+11+b,1));
    		amount = parseInt($(this).find('strong.offer_amount').html());
    		
	    	switch(industry){
	    		case '1': datas.inventory._1.s[quality] = amount; break;
	    		case '2': datas.inventory._2.s[quality] = amount; break;
	    		case '3': datas.inventory._3.s[quality] = amount; break;
	    		case '4': datas.inventory._4.s[quality] = amount; break;
	    		case '5': datas.inventory._5.s[quality] = amount; break;
	    		case '10': datas.inventory._10.s = amount; break;
	    		case '11': datas.inventory._11.s = amount; break;
	    		case '13': datas.inventory._13.s = amount; break;
	    		case '14': datas.inventory._14.s = amount; break;
	    		case '15': datas.inventory._15.s[quality] = amount; break;
	    		default: break;
	    	}
    	}
    });
}

// ! === CORE ===
function main(){
	$('div#content').before('<div style="display:block;float:left;padding: 0 25px 0 0;width:691px;"><div class="sholder" style="margin-top:0px;margin-bottom:15px;padding-top:6px;padding-bottom:6px;">eRepublik Enhanced Beta Program &nbsp;<span style="float:right;"><small>version '+datas.version.n+' updated on '+datas.version.d+' </small>&nbsp;-&nbsp; <a href="http://getsatisfaction.com/erepublik_enhanced">Give us Ideas and feedback !</a></span></div></div>')
	//= MS ========================================
	if( Url.domains[0] == "www" )
	{
		var functions = new MainSite();
		
		//= All Citizen page ==
		if( $('.citizen_attributes').length > 0 )
		{
			GetInventory();
			functions.TomorrowHealth();
		}
		
		//= Citizen profile ==
		if( Url.pages[4] == 'citizen' && Url.pages[5] == 'profile' )
		{
			functions.MilitaryInfluenceCalculate();
		}
	}
	
	//= ES ========================================
	if( Url.domains[0] == "economy" )
	{
		var functions = new MainSite();
		
		//= All Citizen page ==
		if( $('.citizen_attributes').length > 0 )
		{
			GetInventory();
			functions.TomorrowHealth();
		}
	}
}

// ! === LAUNCHER ===
jQuery(document).ready(function() {
	//UF_log(url);
	//interface();
	//settings();
	main();
	//window.setTimeout(UF_getUpdate, 1000);
});