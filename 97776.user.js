// ==UserScript==
// @name           Forward Message For Erepublik
// @namespace      forwardmessageforerep
// @description    Forward Message For Erepublik
// @include        http://www.erepublik.com/*/main/messages-inbox
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==
var $ = jQuery.noConflict();

function main(){
	if($('div.msg_buttons').length > 0){
		if(typeof $('div.msg_buttons').attr('fme') == "undefined"){
			var entete= "FWD: "+($('div.msg_title_container h3').text());
			var message= "Forward conversation \""+($('div.msg_title_container h3').text())+"\" :\n";
			$('div.message_item_container').each(function(){
				if(!$(this).hasClass('form')){
					message+=": -----------------------------------------------------------------\n";
					message+=": From "+($(this).find('div.nameholder').text().replace(/[\t]/g,' ').replace(/[\n\r]/g,'').replace(/\s+/g,' ').replace(/^\s+/g,'').replace(/\s+$/g,''))+"\n";
					message+=": \n";
					message+=": "+( $(this).find('div.msg_body').html().replace(/[\t\n\r]/g,'').replace(/<br>/g,"\n: ") )+"\n";
					message+=": \n";
				}
			});
			$('#FME_entete').attr('value',entete);
			$('#FME_message').html(message);
			$('div.msg_buttons form').before('<a href="javascript:;" id="FME_Forward" class="fluid_blue_light_medium"><span>Forward</span></a>');
			$('div.msg_buttons').attr('fme','overloaded');
			
			$('a#FME_Forward').click(function(){
				$.ajax({
					url: '/en/main/messages-compose/0',
					success: function(data) {
						$('.message_ajax_container').slideUp('slow').html(data).slideDown('slow');
						$('#citizen_subject').attr('value', ($('#FME_entete').attr('value')) );
						$('#citizen_message').html($('#FME_message').html());
					}
				});
			});	
		}
	}
	setTimeout(main,1000);
}

jQuery(document).ready(function() {
	$('body').append('<input id="FME_entete" type="hidden" value=""/>');
	$('body').append('<textarea id="FME_message" style="display:none;"></textarea>');
	main();
});