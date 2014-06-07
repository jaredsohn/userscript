// ==UserScript==
// @name          PokeCommunity Thread Preview
// @namespace     
// @description	  Preview every PokeCommunity thread without leaving the page!
// @author        
// @homepage      
// @include       */forumdisplay.php*
// ==/UserScript==

//////////////[Edit signature here]//////////////////
var signature = "[RIGHT][URL='http://userscripts.org/scripts/show/62356'][IMG]http://img.kaskus.us/images/kaskusmobile_hp.gif[/IMG][/URL][/RIGHT]";
/////////////////////////////////////////////////////

//add and append jQuery on head
var head_append = document.createElement('script');
// get jquery from google repo, for faster load, you can point this to your webserver (localhost)
head_append.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
head_append.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(head_append);

//check if jQuery loaded
function load_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(load_wait,100); }
	else { $ = unsafeWindow.jQuery; jQuery_start(); }
}
load_wait();

function jQuery_start() {
	// jarak preview dari a href
	xOffset = 10;
	yOffset = 10;
	// append icon [+] di semua link thread
	$("a[id^='thread_title']").each(function(index){
		var rel_url = $(this).attr("href")
		$(this).before("<span class='preview' style='cursor:pointer;color:red;' rel='" + rel_url + "'>[+]</span>&nbsp;");
	});
	// onclick icon
	$(".preview").toggle(function(e){
		var active_prev = $(this);
		// remove if still poened
		$("#prev_container").remove();
		var thread_url = $(this).attr("rel");
		$("body").append("<p id='prev_container'><img src='http://www.kaskus.us/images/smilies/bolakbalik.gif' alt='Loading..'/></p>");
		$("#prev_container")		
		.css("position","absolute").css("display","none").css("width","725px").css("padding","5px")
		.css("top",(e.pageY - xOffset) + "px")
		.css("left",(e.pageX + yOffset) + "px")
		.show();	
		$.ajax({
			url: thread_url,
			cache: true,
			// TODO maybe send request as mobile user, for a faster load?
			// beforeSend:function(xhr){
			// 	 xhr.setRequestHeader("User-Agent","Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16")
			// },
			success: function(html){
				// get the reply url
				var reply_url = $(html).find("td.smallfont:first a").attr("href");				
				// get the first post of the thread
				var content = $(html).find("td[id^='td_post_']:first").html() + "<hr><div id='reply_area' style='text-align:center;'><img src='http://www.kaskus.us/images/smilies/bolakbalik.gif' alt='Loading..'/></div><hr><div style='font-size:9px;float:left;'><a href='#' id='cont_close'>[Close]</a> | <a href='" + thread_url + "' title='Go to the thread' target='_blank'>[Go to thread]</a> | <a href='" + reply_url + "' title='Reply to the thread' target='_blank'>[Reply]</a></div><div style='float:right;text-align:right;font-size:9px;'>PokeCommunity Thread Preview by <a href='http://www.pokecommunity.com/member.php?u=68961' target='_blank'>yomamathecableguy</a></div>";
				$("#prev_container").html(content).css("backgroundColor","#F5F5FF").css("border","2px solid #000");
				$("#cont_close").click(function(){
					$("#prev_container").hide(500, function(){
						$("html, body").animate({scrollTop:active_prev.offset().top}, 500);
					});					
					return false;
				});
				// get the reply form
				$.ajax({
					url: reply_url,
					cache: true,
					success: function(reply_html){
						// populate the hidden input value
						var action = $(reply_html).find("form[name='vbform']").attr("action");
						var securitytoken = $(reply_html).find("input[name='securitytoken']").val();
						var thread = $(reply_html).find("input[name='t']").val();
						var post = $(reply_html).find("input[name='p']").val();
						var loggedinuser = $(reply_html).find("input[name='loggedinuser']").val();						
						$("#reply_area").html("<div id='form_reply' style='text-align:center;'><textarea id='message_text' name='message' rows='5' cols='50'></textarea><br><button id='submit_reply'>Reply</button></div>");
						// submit the reply
						// FIXME kayaknya ada yang bikin macet
						$("#submit_reply").click(function(){
							var message = $("#message_text").val() + "\n\n" + signature;
							$(this).text("Tungguin..").attr("disabled","disabled");
							$.ajax({
								type: "POST",
								url: "newreply.php?do=postreply&t=" + thread,
								data: "iconid=0&s=&securitytoken=" + securitytoken + "&do=postreply&t=" + thread + "&p=" + post + "&specifiedpost=0&posthash=&poststarttime=&loggedinuser=" + loggedinuser + "&multiquoteempty=&message=" + message,
								success: function(msg){
									$("#form_reply").fadeOut(500, function(){
										$(this).html("Reply sent!").fadeIn(500);
										$("#prev_container").remove();
										$("html, body").animate({scrollTop:active_prev.offset().top}, 500);
									});
								},
								error: function(msg){
									// FIXME kadang kaskus return 503 Service Unavailable walaupun reply terpost, jadi aku tetap nampilin pesan sukses
									$("#form_reply").hide(500, function(){
										$(this).html("Reply sent!").show(500);
										$("#prev_container").remove();
										$("html, body").animate({scrollTop:active_prev.offset().top}, 500);
									});
									// pesan error
									//$("#form_reply").append("<br>Kaskus bilang: The page you are looking for is temporarily unavailable.");
									//$("#submit_reply").text("Kirim").removeAttr("disabled");
								}
							});
							return false;
						});
					},
					error: function(msg){
						$("#reply_area").html("<br>Kaskus bilang: The page you are looking for is temporarily unavailable.");
					}
				});
			}
		});
	},
	function(){
		// close the preview
		$("#prev_container").hide(500, function(){
			$(this).remove();
		})
	});		
}