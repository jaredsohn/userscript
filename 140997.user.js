// ==UserScript==
// @name           Auto refresh shout wall
// @namespace      www.erepublik.com
// @description    refresh shout wall auto
// @version        0.2.2
// @include        http://www.erepublik.com/*
// @include        http://www.erepublik.com/*?viewPost*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// @profile        http://www.erepublik.com/en/citizen/profile/4289506
// @grant       GM_getValue
// @grant       GM_setValue

// ==/UserScript==

//------------------------------------------------------------------------------

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




	