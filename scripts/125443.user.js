// ==UserScript==
// @name          Delete Facebook messages
// @namespace     K3
// @description   Selectively delete facebook messages with one click
// @include       http://www.facebook.com/messages/*
// @include       https://www.facebook.com/messages/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

//Code for detecting chrome from http://davidwalsh.name/detecting-google-chrome-javascript
//Code for adding jquery from http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script via http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome

(function () {
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  
	  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		
		script.textContent = "(" + callback.toString() + ")();";
		
		document.body.appendChild(script);
	  }, false);
	  
	  document.body.appendChild(script);
	}

	function main() {
		var myTimer = null;
		
		function setup_modal(overlay_html) {
			var msgdiv = document.createElement("div");
			var maskdiv = document.createElement("div");
			
			function restore_refresh() { 
				$('body').css({'overflow':'auto'}); 
				location.reload(); 
			}

			function delete_msg(tid) {
				var xmlHttp = new XMLHttpRequest();
				var url = "https://www.facebook.com/ajax/messaging/async.php?action=delete&tids=";
				var url_end = "&_a=1";
				
				if(location.href.indexOf("https") == -1) {
					url = url.replace("https","http");
				}
				
				if(xmlHttp !== null) {
					xmlHttp.open("GET",url + tid + url_end,true);
					xmlHttp.send();
				} else {
					alert("Error sending command to server");
				}
			}

			msgdiv.id = "modal";
			msgdiv.className = "window";
			msgdiv.innerHTML = overlay_html;
					
			maskdiv.id = "mask";
					
			$("body").append(msgdiv);
			$("body").append(maskdiv);
			$('body').css({'overflow':'hidden'});
						 
			$('#mask').css({'width':'100%','height':$('#modal').height()*2});
			$('#mask').fadeIn(1000);   
			$('#mask').fadeTo("slow",0.9); 
					
			$('#modal').css('border','1px solid white');
			$('#modal').css('top', 20);
			$('#modal').css('left', $(window).width()/2-$('#modal').width()/2);
			$('#modal').fadeIn(2000);
					
			$('.delete_msg_button').click(function (e) {
				e.preventDefault();
				delete_msg($(this).attr('id'));
				$(this).parent().parent().hide();
			});
					
			$('.window .close').click(function (e) {
				e.preventDefault();
				$('#mask').click();
			});    
			
			$(document).keyup(function(e) {
				if (e.keyCode == 27) { $('#mask').click(); }
			});
					 
			$('#mask').click(function () {
				$(this).hide();
				$('.window').hide();
				restore_refresh();
			});		
		}
		
		function extract_messages() {
			var messages = null;
			var overlay_html = null;
			var i = null;
			var msg = null;
			var tid = null;
			var name = null;
			var snippet = null;
			var pic = null;
			
			messages = document.getElementsByClassName('threadLink');
			overlay_html = "<style>\
								.msg_box {\
									background-color: #ffffff;\
									border: 1px solid red;\
									padding: 15px;\
									margin-bottom: 10px;\
								}\
								.msg_authors {\
									color: #3B5998;\
									font-size: 16px;\
									font-weight: bold;\
									margin-right: 10px;\
								}\
								#mask {\
									position:absolute;\
									z-index:9000;\
									background-color:#000;\
									display:none;\
									top:0;\
									left:0;\
								}\
								.window {\
									position:absolute;\
									width:440px;\
									height:200px;\
									display:none;\
									z-index:9999;\
									padding:20px;\
								}\
								#modal {\
									overflow:auto;\
									display:none;\
									width:70%;\
									height:86%;\
								}\
								.close {\
									font-size: 25px;\
									color: white;\
								}\
							</style>\
							<a class=\"close\">Close</a><br />";
						
			if(messages === null) {
				return null;
			}
			
			for(i in messages) {
				msg = messages[i];
					
				if(msg !== null && msg.href) {
					tid = msg.href.substring(msg.href.indexOf("tid=") + 4);
						
					name = msg.innerHTML.substring(msg.innerHTML.indexOf('class="authors"') + 16);
					name = name.substring(0,name.indexOf("<"));
						
					snippet = msg.innerHTML.substring(msg.innerHTML.indexOf("<div class=\"snippet"));
					snippet = snippet.substring(0,snippet.indexOf("</div>") + 6);
						
					pic = msg.innerHTML.substring(msg.innerHTML.indexOf(">") + 1);
					pic = pic.substring(0,pic.indexOf("<div"));
						
					overlay_html = overlay_html.concat("<div class=\"msg_box\">");
						overlay_html = overlay_html.concat(pic + "<span class=\"msg_authors\">" + name + ": </span><br/>");
						overlay_html = overlay_html.concat("<span class=\"snippet\">" + snippet + "</snippet><br/><br/>");
						overlay_html = overlay_html.concat("<button type=\"button\" class=\"delete_msg_button\" id=" + tid + ">Delete</button>");
					overlay_html = overlay_html.concat("</div>");
					overlay_html = overlay_html.concat("<div style=\"clear:both;\">&nbsp;</div>");
				}
			}
					
			return overlay_html;
		}
		
		function setup_delete_button(toolbar) {
			var search = document.getElementById("MessagingSearch");
			var button = document.createElement("a");
			var toolbar_parent = toolbar.parentNode;

			button.id = "delete_messages_button";
			button.className = "uiToolbarItem uiButton";
			button.innerHTML = "<span class=\"uiButtonText\">Delete Messages</span>";

			toolbar_parent.removeChild(search);
			toolbar_parent.appendChild(button);
			toolbar_parent.appendChild(search);

			$('#delete_messages_button').click(function () {
				var overlay_html = null;
				
				overlay_html = extract_messages();
				
				if(overlay_html === null) {
					alert("Not able to extract messages");
					location.reload();
				} else {
					setup_modal(overlay_html);
				}
			});	
		}

		function repeat_search() {
			var toolbar = null;
			
			toolbar = document.getElementsByClassName('uiToolbarItem uiButton')[0];
			
			if(toolbar !== null) {
				if(toolbar.parentNode.innerHTML.search("Delete Messages") === -1) {
					setup_delete_button(toolbar);
				}
			}
		}
		
		myTimer = window.setInterval(repeat_search,1000);
	}

	if((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) === true) {
		addJQuery(main);
	} else {
		$(window).load(function() {
                      main();
                });
	}
}) ();