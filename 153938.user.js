// ==UserScript==
// @name           Twitch / Justin Fullscreen
// @version        1.1
// @author         RomkaNAT, blackca
// @include        http://*twitch.tv/*
// @include        http://*justin.tv/*
// @run-at         document-end
// ==/UserScript==
// Modify: http://userscripts.org/scripts/show/145846

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

	var imgFull = "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACx\
					jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAPFJREFU\
					OE9jYBh0INVtzn5qYIZU9zn/gQaVpLjPSSAHg/SCzAAblO4+X4FQUNXX1zOluM4KSXWbXQfDIItB\
					ekkyCGRRiucsNaCmk2BfQHyynyyDYIaluM0+S7FBIMPS3GZqAF1zkSIXwcIy3WOuFjCMJmN4DRSA\
					SS5zpAgFOro8pkHuc/YC/b03y2u+BCmGYXHRnP0pbnP+prjP3kmKy7AaBI9W9zmbiTUMwyBQ4kJO\
					bKnuc12I8SKKQZRkEWBwdEJSNv5MexwpFR/HpxbD9fH28wVAzgXhNI+5NjCDQGyYOEgNQW+DwwmW\
					l3DRQDXoBgEAoJk++iLKocEAAAAASUVORK5CYII=";
	var imgOff = "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACx\
					jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAbdJREFU\
					OE/Nkz9LA0EQxYOFhYiIWIiFiIhYiIWFhYgpTHZPSWlqNdk9ISCIWJvCTyAqctk9g9hpYWElEoKV\
					SEhhZWElwQ8gFlYS5+1lYy7xDwYLA8NyYea3783ORCL/7ieZLv5FRCTXVQJtCa5X2gnUgmFAazw/\
					/FOrstlsh4jnliRT2zZwMWp/BcJFYiE3RkW3xkXgpNgWyMIEU+W2QcnkaWdmMT8AVYLlEpKrp18r\
					chNev2B6lwordVtcvQquSmlHTYZ6hAamYnqwuekBRJWpsfekQqzO+yMu88bpexNgOh/DIK4L9EcB\
					8i0MdqAEkFRcT6SZmqboA8gA43rOqqw/P/xS0RvJvbTKAA0SlZDMm6GLHijOYAmXIo+c7DRZowm3\
					z8r1BZJqz13F6ca8IQJck7oXsvpM514mut/tMuWEQBiuxmGT3I+RjVEk4Qz6okoGQkEqj9edk54Q\
					6MsVYf6GUYDG8qMpyrsjyAHFFUHPzTjgNc2KfL+0N7XBq6CxmGJjh17SQLAymCea9pYVW47me1GA\
					cB1/tmEdKmgsrCDqc8XUIYG7WkCmTx9ND3bqsyCb0tEZC3kHAOWpTpuP1o4AAAAASUVORK5CYII=";
	var imgStr = "<span class='glyph_only'><img style='vertical-align:middle' src='data:image/png;base64,"+imgFull+"' /></span>";
	var btnStr = "<button class='link_icon' style='background:url(\"data:image/png;base64,"+imgFull+"\") no-repeat center center'></button> <span>Fullscreen</span>";
	
	function waitForSWF() {
		if (0<$("#live_site_player_flash").length || 0<$("#archive_site_player_flash").length) {
			if ($("#live_site_player_flash").attr("width") != undefined || $("#archive_site_player_flash").attr("width") != undefined) {
				job();
			} else {
				window.setTimeout(waitForSWF, 100);
			}
		}
	}
	
	function job()
	{
		if (document.location.hostname.indexOf("justin.tv") != -1)
		{
			// Justin.tv
			$("#action_links").append("<li class='action'><a href='' class='short_under' id='fullsbtn' title='Fullscreen'>"+btnStr+"</a></li>");
			$("#ad_holder").hide();
			$("#chat_lines").css("max-height", "400px");
			$("#chat_lines").css("height", "400px");
			$("#live_site_player_flash").attr("width", "100%");
			$("#live_site_player_flash").attr("height", "100%");

			var oMainWidth = $(".wrapper").width();
			var oPlayerWidth = $("#left_col").width();
			var oPlayerHolderHeight = $("#standard_holder").height();
			var oChatHeight = $("#jtv_chat").height();
			var oChatWidth = $("#right_col").width();

			$("#fullsbtn").click(function (e) {
				if($("#fullsbtn").attr("title") == "Fullscreen")
				{
					$("#fullsbtn").html("<button class='link_icon' style='background:url(\"data:image/png;base64,"+imgOff+"\") no-repeat center center'></button> <span>Normal</span>");
					$("#fullsbtn").attr("title","Normal")
					$("html, body").animate({ scrollTop: $(".wrapper").offset().top-15 }, 500);
					
					$("#banner_custom").hide();
					$("#banner_default").hide();
					$("#info").hide();
					$("#related_channels").hide();
					
					var chatwidth = 380;
					var width = (parseInt($(window).width()));
					var height = parseInt(36/63*(width-chatwidth));
					var widthPlayer = (parseInt($(window).width())-370);
					var heightPlayer = parseInt(36/63*widthPlayer);
					
					//Overlay
					$(".wrapper").animate({'width':width-30},{queue:false});
					//player
					$("#left_col").animate({'width':widthPlayer},{queue:false});
					$("#standard_holder").animate({'width':widthPlayer-10},{queue:false}).animate({'height':heightPlayer-10},{queue:false}); //live
					//Chat
					$("#jtv_chat").animate({'height':heightPlayer},{queue:false});
					$("#chat_lines").removeAttr("style");
					$("#chat_lines").animate({'height':heightPlayer-130},{queue:false});
					$("#right_col").animate({'width':320},{queue:false});
				}
				else
				{
					$("#fullsbtn").html(btnStr);
					$("#fullsbtn").attr("title","Fullscreen")
					
					$("#related_channels").show();
					$("#banner_custom").show();
					$("#banner_default").show();
					$("#info").show();
					
					//Chat
					$("#right_col").animate({'width':oChatWidth},{queue:false});
					$("#chat_lines").animate({'height':oChatHeight-130},{queue:false});
					$("#jtv_chat").animate({'height':oChatHeight},{queue:false});
					//player
					$("#standard_holder").animate({'width':oPlayerWidth-10},{queue:false}).animate({'height':oPlayerHolderHeight},{queue:false}); //live
					$("#left_col").animate({'width':oPlayerWidth},{queue:false});
					//Overlay
					$(".wrapper").animate({'width':oMainWidth},{queue:false});
				}
				e.preventDefault();
			});
		}
		else 
		{
			// Twitch.tv
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
					$("html, body").animate({ scrollTop: $(".main").offset().top-25 }, 500);
					
					$('.beta_notice').hide();
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
					
					$('.beta_notice').show();
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
	}

	var $ = jQuery;
	$(document).ready(function() {
		waitForSWF();
	});
});