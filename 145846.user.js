// ==UserScript==
// @name           Twitch Fullscreen
// @version        1.0
// @author         RomkaNAT
// @namespace      wtf
// @include        http://*twitch.tv/*
// @run-at         document-end
// ==/UserScript==

// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }

  // Create a script node holding this source code.
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function() {

	var imgFull = "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA3UlEQVQ4jc3TMUoDURSF4c8hRcoU\
					FiIWYxMwK0gjWrmAdBJchpazgazAMrgQhTTaWIQUIY1BJFUKS7ux8A1OHppMxhQeuHB4cP93OXD4\
					b9rD/a5AOa6xrMnYx6AAHWO+YSFBD53S2yse8CKA0oq/t/EUdnJfsaTIk4qAQjNc4fmnc7fVDH2M\
					/wqCKS4xKT8WGWU4rAFNRRmd4Q4HdU5MIn+OYZ3L4owSXOB2W1ij5IdW69LBoipoFxU5wc2m0jbR\
					Df4RH+suitUKA0cYBX+Kt+Dfw6xV5rtLv00WL30CimsvuYp4Y9YAAAAASUVORK5CYII=";
	var imgOff = "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABU0lEQVQ4jc3TL0ikYRDH8Y+LLCKy\
					yGFYxKAbjkPMIiJG8YpBbGIzGT2MajCajLYTbFaLQRTFIHKCRUGD/xbTpsNg0TW88+q7sOoiBgcG\
					HuZ5nu/M85tn+G7WhJ2vAlUxh8onGR1YTkE9uPrgQg7j6M3EbrCLSwHqbjD7TxzGnapElm5Ucw0C\
					UjvHFI7rlduo5VGM9SLuspvNDUI6MC/RqCtiD2hDIT2UarSAzjcg/3CGaZTwC7O4xXUwXkDb4cUM\
					JI+VgPShHz8CVMJwwGpAO3jEVqayYhycxiAusIGjSNqJJXW6lsMIVuNQITTZQ1ki8KjkG5ziPw6o\
					FXtN7bj0ev2kT2gNf4pYQabrKWhCMiI3GVBX6HKPMckPzmM9KioE+DcfD20LBuJZk5GoEvFmDEma\
					UW6qc7k9PK1qP9Zl/BWaRCXj2MSfelUseJ2l9/wEM/E8z/M3Uvirmtf1AAAAAElFTkSuQmCC";
	var imgStr = "<span class='glyph_only'><img src='data:image/png;base64,"+imgFull+"' /></span>";
	
	function waitForSWF() {
		if ($("#live_site_player_flash").attr("width") != undefined || $("#archive_site_player_flash").attr("width") != undefined) {
			job();
		} else {
			window.setTimeout(waitForSWF, 100);
		}
	}
	
	function job()
	{
		$("#channel_actions").append("<a href='' class='normal_button' id='fullsbtn' title='Fullscreen'>"+imgStr+"</a>");
		$(".advertisement").hide();
		$("#chat_lines").css("max-height", "578px");
		$("#chat_lines").css("height", "578px");
		$("#live_site_player_flash").attr("width", "100%");
		$("#live_site_player_flash").attr("height", "100%");
		$("#archive_site_player_flash").attr("width", "100%");
		$("#archive_site_player_flash").attr("height", "100%");
		
		var oMainWidth = $(".main").width();
		var oOverlayWidth = $(".c12").width();
		var oOverlayPadding = $(".c12").css("padding");
		var oPlayerWidth = $("#player_column").width();
		var oPlayerHolderHeight = $("#standard_holder").height();
		var oPlayerHolderHeightOff = $(".archive_site_player_container").height();
		//var oPlayerFlashHeight = $("#live_site_player_flash").height();
		var oChatHeight = $("#chat").height();
		var oChatWidth = $("#chat_column").width();
		
		$("#fullsbtn").click(function (e) {
			if($("#fullsbtn").attr("title") == "Fullscreen")
			{
				$("#fullsbtn").html("<span class='glyph_only'><img src='data:image/png;base64,"+imgOff+"' /></span>");
				$("#fullsbtn").attr("title","Normal")
				$('html, body').animate({ scrollTop: $(".main").offset().top-25 }, 500);
				
				$("#header_banner").hide();
				$("#broadcast_meta").hide();
				
				var chatwidth = 380;
				var width = (parseInt($(window).width()));
				var height = parseInt(36/63*(width-chatwidth));
				var widthPlayer = (parseInt($(window).width())-380);
				var heightPlayer = parseInt(36/63*widthPlayer);
				
				//Overlay
				$(".main").animate({'width':width-2},{queue:false});
				$(".c12").animate({'width':width-40},{queue:false});
				$(".c12").css("padding","0");
				//player
				$("#player_column").animate({'width':widthPlayer},{queue:false});
				$("#standard_holder").animate({'width':widthPlayer},{queue:false}).animate({'height':heightPlayer},{queue:false}); //live
				$(".archive_site_player_container").animate({'width':widthPlayer},{queue:false}).animate({'height':heightPlayer},{queue:false}); //offline video
				//$("#live_site_player_flash").animate({'width':widthPlayer},{queue:false}).animate({'height':heightPlayer},{queue:false});
				//Chat
				$("#chat").animate({'height':heightPlayer+100},{queue:false});
				$("#twitch_chat").animate({'height':heightPlayer},{queue:false});
				$("#chat_lines").removeAttr("style");
				$("#chat_lines").animate({'height':heightPlayer-34},{queue:false});
				$("#chat_column").animate({'width':320},{queue:false});
			}
			else
			{
				$("#fullsbtn").html(imgStr);
				$("#fullsbtn").attr("title","Fullscreen")
				
				$("#header_banner").show();
				$("#broadcast_meta").show();
				
				//Chat
				$("#chat_column").animate({'width':oChatWidth},{queue:false});
				$("#chat_lines").animate({'height':oChatHeight-34},{queue:false});
				$("#twitch_chat").animate({'height':oChatHeight},{queue:false});
				$("#chat").animate({'height':oChatHeight},{queue:false});
				//player
				//$("#live_site_player_flash").animate({'width':oPlayerWidth},{queue:false}).animate({'height':oPlayerFlashHeight},{queue:false});
				$("#standard_holder").animate({'width':oPlayerWidth},{queue:false}).animate({'height':oPlayerHolderHeight},{queue:false}); //live
				$(".archive_site_player_container").animate({'width':oPlayerWidth},{queue:false}).animate({'height':oPlayerHolderHeightOff},{queue:false}); //offline video
				$("#player_column").animate({'width':oPlayerWidth},{queue:false});
				//Overlay
				$(".c12").css("padding",oOverlayPadding);
				$(".c12").animate({'width':oOverlayWidth},{queue:false});
				$(".main").animate({'width':oMainWidth},{queue:false});
			}
			e.preventDefault();
		});
	}

	var $ = jQuery;
	$(document).ready(function() {
		waitForSWF();
	});
});