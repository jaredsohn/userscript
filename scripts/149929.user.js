// ==UserScript==
// @name           Diva Script
// @author         Divante
// @version        1.0.1
// @include        http://www.erepublik.com/en/military/battlefield/*
// @include         http://www.erepublik.com/*/military/campaigns
// @include        http://www.erepublik.com/*
// @include        http://www.erepublik.com/*?viewPost*
// @include        http://www.erepublik.com/en/main/messages-compose/*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        http://json-template.googlecode.com/files/json-template.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

if(document.location.href.match(/http:\/\/www.erepublik.com\/.+\/military\/campaigns/)) {

	function get_counter(li)
	{
		var battleId = li.attr('id').split('-')[1];
		var url = '/en/military/battlefield/'+battleId;
		jQuery.ajax({
			url: url,
			dataType: 'html',
			success: function(data) {
				var counter = data.split(/zoneElapsedTime/)[1].split(/"/)[1];
				li.find('.county').after('<a class="county"><span>'+counter+'</span></a>');
			}
		});
	}
	
	var p;
	if(window.opera || window.navigator.vendor.match(/Google/)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		p = div.onclick();
	}
	else
	{
		p = unsafeWindow;
	}
	var jQuery = p.jQuery;

	jQuery(document).ready(function()
	{
		jQuery('#battle_listing .bod_listing li').each(function() {
			get_counter(jQuery(this));
		});
		jQuery('#battle_listing .country_battles li').each(function() {
			get_counter(jQuery(this));
		});
		jQuery('#battle_listing .allies_battles li').each(function() {
			get_counter(jQuery(this));
		});
		jQuery('#battle_listing .all_battles li').each(function() {
			get_counter(jQuery(this));
		});
	});
}

var extraPost = "";
var aCheck = true;
var new_post_num=0;

function chckBx_changed(id){
aCheck=$('input[id=arOpt_'+id+']').prop("checked");
GM_setValue("aCheck",aCheck);

}
function setEnviroment(){
$('.feed_title').css('float','left');

if($('#new_post_notifier').length < 1){
	$('.wall_error').after('<div style="display:none; background:none repeat scroll 0 0 #C1E4F1;  border: 1px solid #9184D1;border-radius: 3px 3px 3px 3px; clear: both; color: #3C8FA7; float: left;  font-size: 11px;  font-weight: bold;  margin: 5px auto 5px 8px; padding: 6px; text-indent: 3px;    width: 366px;" id="new_post_notifier"></div>');
	$('#new_post_notifier').click(function(){
						    $(this).slideUp('slow'); 
							unsafeWindow.get_citizen_feeds();	
						});
	}
if($('#arOpt_1').length < 1){
	$('.feed_title').after('<div  style="float:right; margin-top:15px;"><div style="float:left; margin-right:5px; color:#737373;">Auto Check</div><div  style="float:left; margin-top: 2px;"> <input id="arOpt_1"  trigger = "chckBx_change" type="checkbox" ></div></div>');	

	aCheck = GM_getValue("aCheck");

	$('input[id=arOpt_1]').change(function(){
	aCheck=$(this).prop("checked");
	GM_setValue("aCheck",aCheck);


	});
	if(aCheck == null){
		$('input[id^=arOpt_]').prop("checked",true);
		aCheck=$('input[id^=arOpt_]').prop("checked");
		GM_setValue("aCheck",aCheck);
		
	}else {
		//alert(aCheck);
		$('input[id^=arOpt_]').prop("checked",aCheck);
		
	}

}


}
$(document).ready(function () {
	setEnviroment();	
	active = $('li[class=active]').attr('id');



setInterval(function(){
	 
			try {
			if($('#show_friends_feed').attr('class')=='active' && aCheck ==true){
				
				setEnviroment();	
				var currentShout =parseInt( $('li[id^=post_]').first().attr('id').split('_')[1]);				
				var nextCurrent = parseInt( $('li[id^=post_]').eq(1).attr('id').split('_')[1]);	
				
				var url = '/en/main/wall-post/older/';
				var params = {
					_token: $('#_token').val(),
					page: 0
				}
				$.post(url, params).success(function(data) {
					
					var tempid= parseInt($(data).attr("id").split("_")[1]);
					uldata= data;
					var a= [];
					var shtsID;
					//var ids = $(":li",data).attr("id");
					var arr = $(data).toArray();								
					
					$(data).each(function(index){
					   if(index %2 == 0){
					        a[index/2] = parseInt(String($(this).attr("id")).split("_")[1]);
					    }
					});
			
					if(nextCurrent>currentShout)currentShout = nextCurrent;//viewPost
					 console.log('current ' + currentShout + 'temp ' +tempid); 
					if(tempid != currentShout){		
						new_post_num = jQuery.inArray(currentShout, a);						
						if(new_post_num==-1)extraPost="10 or more";
						else extraPost=" "+new_post_num;
						$('#new_post_notifier').slideDown('slow').html('<center>'+extraPost+' new post(s)</center>');
					}
				});
			} 
		}catch(e) {;}
	 
	 
	},9000);	
	
	
});


// ------------------Configurable Variables------------------
var refreshTime = 30 //check timer, in seconds
// ------------------Configurable Variables------------------


var Last_Check_Time = GM_getValue("Last_Check_Time", false);
var curtime;
if (!Last_Check_Time) {
	curtime = new Date().getTime();
	curtime = String(curtime);
	GM_setValue("Last_Check_Time", curtime);
	Last_Check_Time = GM_getValue("Last_Check_Time", false);
}

var strtoken = $('.user_health').find('input').eq(0).attr('value');
var strurl = "http://www.erepublik.com/en/main/eat?format=json&_token="+strtoken+"&jsoncallback=?";
var id,id2;
var intWelness,intMaxHealth,intsmallestFood;

id = window.setInterval(checkTimeToken,refreshTime*1000);
id2 = window.setInterval(appendTimer,1000);
var checkTimer = refreshTime;

$('.user_health').after('<div id="auto_recover" style="font-style: normal;color: rgb(102, 102, 102);text-align: center;background-position: 0px -51px;position: relative;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;float: left;width: 153px;margin-bottom: 7px;background-image: url(\'/images/modules/sidebar/boxes.png?1333974834\');padding: 0px;font-family: Arial,Helvetica,sans-serif;font-size: 10px;font-weight: bold;"><em id="checkResetHours"></em><br><em id="FailReason"></em><br><div>');

function appendTimer() {
	checkTimer--;
	$('#checkResetHours').text('Nueva comprobacion en '+checkTimer+'...');
}

function checkTimeToken() {
	Last_Check_Time = GM_getValue("Last_Check_Time", new Date().getTime());
	if ((new Date().getTime() - Last_Check_Time)>refreshTime*1000) {
		curtime = new Date().getTime();
		curtime = String(curtime);
		GM_setValue("Last_Check_Time", curtime);
		updateHealth();
	}
}

function updateHealth() {
	clearInterval(id);
	clearInterval(id2);
	checkTimer = refreshTime;
	$('#checkResetHours').text('Recovering Energy...');
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.erepublik.com/en',
		onload: function(r) {
			var startpos = r.responseText.indexOf('smallestFood = ');
			var startpos = r.responseText.indexOf('"use":',startpos);
			var endpos = r.responseText.indexOf(';',startpos);
			var strsmallestFood = r.responseText.substr(startpos,endpos-startpos);
			intsmallestFood = strsmallestFood.match(/[0-9]{1,}/);
			
			$('.health_bar').html($(r.responseText).find('.health_bar').eq(0).html());
			$('#DailyConsumtionTrigger').html($(r.responseText).find('#DailyConsumtionTrigger').eq(0).html());
			window.setTimeout(checkHealth,1000);
		}
	});
}

function checkHealth() {
	$('#FailReason').text('');
	var intCurrentHealth = parseInt($('#current_health').text().split('/')[0]);
	var intMaxHealth = parseInt($('#current_health').text().split('/')[1]);
	
	var strButtonText = $('#foodText').text();
	//Recover Energy
	//Energy Bar
	
	
	if (intCurrentHealth < intMaxHealth) {
		if (strButtonText=='Recover Energy') {
			if ($('#DailyConsumtionTrigger').hasClass('energy')) {
				$('#DailyConsumtionTrigger').removeClass('energy');
			}
			if ((intMaxHealth-intCurrentHealth)>intsmallestFood) {
				GM_xmlhttpRequest({
					method: "GET",
					url: strurl,
					onload: function(r) {
						id = window.setInterval(checkTimeToken,refreshTime*1000);
						id2 = window.setInterval(appendTimer,1000);
					}
				});
			} else {
				$('#FailReason').text('Food needed...');
				id = window.setInterval(checkTimeToken,refreshTime*1000);
				id2 = window.setInterval(appendTimer,1000);
			}
		} else {
			if (!$('#DailyConsumtionTrigger').hasClass('energy')) {
				$('#DailyConsumtionTrigger').addClass('energy');
			}
			$('#FailReason').text('Testo Bottone <> Recover Energy');
			id = window.setInterval(checkTimeToken,refreshTime*1000);
			id2 = window.setInterval(appendTimer,1000);
		}
	} else {
		$('#FailReason').text('');
		id = window.setInterval(checkTimeToken,refreshTime*1000);
		id2 = window.setInterval(appendTimer,1000);
	}
}
