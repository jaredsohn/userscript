// ==UserScript==
// @name          Gmail Facebook integration
// @namespace     David Mulder - Greats
// @description	  Integrate facbook directly into Gmail buzzlike
// @author        David Mulder - GreatS
// @homepage      https://chrome.google.com/extensions/detail/hbjjmjlajhdcbnkdajndkmkjlkfphipc
// @include       https://mail.google.com/mail/*
// @include       http://mail.google.com/mail/*
// @require		  http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// ==/UserScript==

	//console.log("FB LOG: Extension is loading");

function check_load(){
	if($('#canvas_frame').contents().find('.Alfa2e').size() > 0){
		//console.log("FB LOG: Menu found "+ $('#canvas_frame').contents().find("#facebook_link").size() + " facebook links found");
		if($('#canvas_frame').contents().find("#facebook_link").size() == 0){
			$('#canvas_frame').contents().find('.Alfa2e:eq(1)').after('<tr class="Alfa2e" id="facebook_link"><td class="nL"></td><td><div class="n2 "><div class="nU"><a href="https://mail.google.com/mail/?shva=1#facebook" target="_top" title="Facebook" class="n0" id="fb_link">Facebook</a><img style="position:relative;top:2px;left:2px;" src="http://www.state.gov/images/facebook-icon.png" alt=""></div></div></td></tr>');
			//console.log("FB LOG: Menu should be injected right now, if it's not than we're in real trouble :P , try disabling all extensions, themes, whatever and check whether it still is happening.");
			$('#canvas_frame').contents().find('#fb_link').click(function(){
				$('#canvas_frame').contents().find('.q0CeU > .nH > .l > .l > .k > .diLZtc > .nH > .nH > .nH > .nH:visible').css("display","none");
				$('#canvas_frame').contents().find(".Alfa2e.nZ").removeClass("nZ");
				$('#canvas_frame').contents().find('#facebook_link').addClass("nZ");
				$('#canvas_frame').contents().find('.n3 > .qj').css("top","40px");
				$('#canvas_frame').contents().find('.q0CeU > .nH > .l > .l > .k > .diLZtc > .nH > .nH > .nH').eq(1).append('<div class="nH" id="gFace"><iframe id="FacebookFrame" src="http://chromium.liptovholiday.com/facebook/" style="border:0px; width:100%;height:800px;" /></div>');
				$('#canvas_frame').contents().find("#FacebookFrame").load(function(){
					//console.log($('#canvas_frame').contents().find("#FacebookFrame").contents());
				});			
			});
			$('#canvas_frame').contents().find("a:not('#fb_link'), button, input, span[role=link], .J-K-I-Jz").click(function(){
				$('#canvas_frame').contents().find('#gFace').remove();
				$('#canvas_frame').contents().find('#facebook_link').removeClass("nZ");
				if($('#canvas_frame').contents().find(".q0CeU > .nH > .l > .l > .k > .diLZtc > .nH > .nH > .nH > .nH:visible").size() == 0){
					//console.log("showing first element");
					$('#canvas_frame').contents().find(".q0CeU > .nH > .l > .l > .k > .diLZtc > .nH > .nH > .nH > .nH:eq(0)").css("display","block");	
					setTimeout(check_view, 1000);
				}
			});
		}
	}else{
		//console.log("FB LOG: Menu not loaded yet, rechecking in 1 second.");
		setTimeout(check_load, 1000);
	}
}
function check_view(){
	if($('#canvas_frame').contents().find(".q0CeU > .nH > .l > .l > .k > .diLZtc > .nH > .nH > .nH > .nH:visible").size() == 0){
		//console.log("showing first element");
		$('#canvas_frame').contents().find(".q0CeU > .nH > .l > .l > .k > .diLZtc > .nH > .nH > .nH > .nH:eq(0)").css("display","block");	
		setTimeout(check_view, 1000);
	}
}
$(document).ready(function(){
	//console.log("FB LOG: Document is loading");
	setTimeout(check_load, 1000);
});
	setTimeout(check_load, 5000);
