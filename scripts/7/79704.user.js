// ==UserScript==
// @name          Kaskus vBulletin Thread Preview
// @namespace     
// @description	  Preview vbuletin thread, without having to open the thread. This plugin uses jquery framework
// @author        Indra Prasetya
// @homepage      http://www.socialenemy.com/
// @include       */forumdisplay.php*
// ==/UserScript==

//////////////[Configuration]//////////////////
var signature = "";
var template = "[COLOR='RoyalBlue'][FONT='Comic Sans MS'][B]{MESSAGE}[/B][/FONT][/COLOR]";
///////////////////////////////////////////////

// add and append jQuery on head
var head_append = document.createElement('script');
// get jquery from google repo, for faster loading, you can point this to your webserver (localhost)
head_append.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
head_append.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(head_append);

// just an image preloading
loading_image = new Image(64,51); 
loading_image.src = "http://socialenemy.com/wp-content/uploads/2010/05/ngacir2.gif";

// check wheter jQuery is already loaded
function load_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(load_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.jQuery; 
		jQuery_start(); 
	}
}
load_wait();

function jQuery_start() 
{
	// jarak preview dari a href
	xOffset = 10;
	yOffset = 180;
	// append icon [+] on all thread link
	$("a[id^='thread_title']").each(function(index)
	{
		var rel_url = $(this).attr("href")
		$(this).before("<span class='preview' style='cursor:pointer;color:red;font-weight:bold;font-family:Comic Sans MS;' rel='" + rel_url + "'>[+]</span>&nbsp;");
	});
	// onclick icon
	$(".preview").toggle(function(e)
	{
		var active_prev = $(this);
		// remove if still opened
		$("#prev_container").remove();
		var thread_url = $(this).attr("rel");
		$("body").append("<p id='prev_container'><img src='http://socialenemy.com/wp-content/uploads/2010/05/ngacir2.gif' style='padding-left:180px;' alt='Loading thread..'/></p>");
		$("#prev_container")		
		.css("position","absolute").css("display","none").css("width", (screen.width - 120) + "px").css("maxHeight", (screen.height - 250) + "px").css("padding","10px").css("overflow","auto")
		.css("top",(e.pageY - xOffset) + "px")
		.css("left",(e.pageX - yOffset) + "px")
		.show();	
		$.ajax({
			url: thread_url,
			cache: true,
			// TODO find a way to send this via mobile
			success: function(html)
			{
				// get the reply url
				var reply_url = $(html).find("td.smallfont:first a").attr("href");
				$("html, body").animate({scrollTop:active_prev.offset().top - 20}, 500);
				// get the first post of the thread
				var content = $(html).find("td[id^='td_post_']:first").html() + "<hr/><div id='reply_area' style='text-align:center;vertical-align:bottom;'><img src='http://socialenemy.com/wp-content/uploads/2010/05/ngacir2.gif' alt='Loading reply form..'/></div><hr><div style='font-size:9px;float:left;'><a href='#' id='cont_close'><strong>[Close]</strong></a> | <a href='" + thread_url + "' title='Go to the thread' target='_blank'>[Go to thread]</a> | <a href='" + reply_url + "' title='Reply to the thread' target='_blank'>[Reply]</a></div><div style='float:right;text-align:right;font-size:9px;'><a href='http://socialenemy.com/2010/01/vbulletin-thread-preview-greasemonkey-script/' title='vBuletin thread preview' target='_blank'>vBulletin Thread Preview v0.4</a></div>";
				$("#prev_container").html(content).css("border","2px solid #000").addClass("alt1");
				$("#cont_close").click(function()
				{
					$("#prev_container").hide(500, function()
					{
						$("html, body").animate({scrollTop:active_prev.offset().top}, 500);
					});					
					return false;
				});
				// get the reply form
				$.ajax({
					url: reply_url,
					cache: true,
					success: function(reply_html)
					{
						// populate the hidden input value
						var action = $(reply_html).find("form[name='vbform']").attr("action");
						var securitytoken = $(reply_html).find("input[name='securitytoken']").val();
						var thread = $(reply_html).find("input[name='t']").val();
						var post = $(reply_html).find("input[name='p']").val();
						var hash = $(reply_html).find("#hash").val();
						var loggedinuser = $(reply_html).find("input[name='loggedinuser']").val();
						if(hash != undefined)
						{
							$("#reply_area").html("<div id='form_reply' style='text-align:center;'><textarea id='message_text' name='message' rows='5' cols='50'></textarea><br/><img width='201' height='61' border='0' src='image.php?type=hv&amp;hash=" + hash + "'><br/><input type='text' id='captcha_hash' size='10' maxlenght='6'/>&nbsp;<button id='submit_reply'>Send Reply</button></div>");
						}
						else
						{
							$("#reply_area").html("<div id='form_reply' style='text-align:center;'><textarea id='message_text' name='message' rows='5' cols='50'></textarea><br/><button id='submit_reply'>Send Reply</button></div>");
						}
						// submit the reply
						$("#submit_reply").click(function(){			
							var app_sign = "\n\n";
							var message = template.replace("{MESSAGE}", $("#message_text").val()) + "\n\n" + signature + app_sign;
							var captcha_hash = $("#captcha_hash").val();
							$(this).text("Sending..").attr("disabled","disabled");
							$.ajax({
								type: "POST",
								url: "newreply.php?do=postreply&t=" + thread,
								data: "iconid=0&rating=5&s=&securitytoken=" + securitytoken + "&do=postreply&t=" + thread + "&p=" + post + "&specifiedpost=0&posthash=&poststarttime=&loggedinuser=" + loggedinuser + "&humanverify[input]=" + captcha_hash + "&humanverify[hash]=" + hash + "&multiquoteempty=&message=" + message,
								success: function(msg)
								{
									$("#form_reply").fadeOut(500, function()
									{
										$(this).fadeIn(500);
										$("#prev_container").remove();
										$("html, body").animate({scrollTop:active_prev.offset().top}, 500);
									});
								},
								error: function(msg)
								{
									// FIXME kadang kaskus return 503 Service Unavailable walaupun reply terpost, jadi aku tetap nampilin pesan sukses
									$("#form_reply").hide(500, function()
									{
										$(this).show(500);
										$("#prev_container").remove();
										$("html, body").animate({scrollTop:active_prev.offset().top}, 500);
									});
								}
							});
							return false;
						});
					},
					error: function(msg)
					{
						$("#reply_area").html("<br>The page you are looking for is temporarily unavailable.");
					}
				});
			}
		});
	},
	function()
	{
		// close the preview
		$("#prev_container").hide(500, function()
		{
			$(this).remove();
		})
	});		
}