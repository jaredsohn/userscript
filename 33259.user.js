// ==UserScript==
// @name           Mixi Echo Popup
// @namespace      http://ohaco.jp/
// @include        http://mixi.jp/recent_echo.pl*
// @version        1.1.1
// ==/UserScript==


(function() {
	var allAnchor = document.getElementsByTagName("a");
	var overlay = document.getElementById('overlay').style;

	for (i = 0; i < allAnchor.length; i++ ) {
		if (allAnchor[i].href.match(/view_echo\.pl\?from=nickname&id=.*&post_time=/)) {
			if (document.addEventListener) {
				allAnchor[i].addEventListener('mouseover', function(){popupDisplay(this);}, true);
			} else if (document.attachEvent) {
				allAnchor[i].attachEvent('onmouseover', function(){popupDisplay(event.srcElement);});
			}
		}
	}

	function popupDisplay(obj) {
		var popup, status, reply, trash, close, httpRequest;
		var url = obj.getAttribute('href').replace("list_echo", "view_echo");

		if (!window.ActiveXObject){
			httpRequest = new XMLHttpRequest();
		} else {
			httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}

		httpRequest.open('GET', url, true);
		httpRequest.send('');
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				var res = httpRequest.responseText;
				var start = res.indexOf('<div class="echoStatus clearfix">');
				var end = res.indexOf('<div class="echoQuestionnaire">');

				if (start != -1) {
					res = res.slice(start,end);
					res = res.replace('echo_member_id_1', 'echo_member_id_100');
					res = res.replace('echo_post_time_1', 'echo_post_time_100');
					res = res.replace('echo_nickname_1', 'echo_nickname_100');
					res = res.replace('echo_body_1', 'echo_body_100');
					res = res.replace('show_echo_reply_layer(event, 1)', 'show_echo_reply_layer(event, 100)');

					popup = document.createElement("div");
					popup.innerHTML = res;
					popup.style.position = 'absolute';
					popup.style.margin = '-118px 0 0 0';
					popup.style.padding = '10px 0';
					popup.style.width = '720px';
					popup.style.height = '88px';
					popup.style.overflow = 'hidden';
					popup.style.zIndex = '1';
					popup.style.background = '#fff';
					popup.style.border = 'solid 1px #999';

					if (document.addEventListener) {
						popup.addEventListener('mouseover', function(){close = false;}, true);
						popup.addEventListener('mouseout', function(){close = true;}, true);
					} else if (document.attachEvent) {
						popup.attachEvent('onmouseover', function(){close = false;});
						popup.attachEvent('onmouseout', function(){close = true;});
					}

					var popupDiv = popup.getElementsByTagName('div');

					for (i = 0; i < popupDiv.length; i++ ) {
						if (popupDiv[i].className == 'status') {
							status = popupDiv[i];
							status.style.marginTop = '0';
							status.style.fontSize = '12px';
							status.getElementsByTagName('span')[0].style.fontSize = '11px';
						}
					}

					var popupAnchor = popup.getElementsByTagName('a');

					for (i = 0; i < popupAnchor.length; i++ ) {
						if (popupAnchor[i].className == 'trash') {
							trash = popupAnchor[i];
							trash.style.display = 'none';
						}
					}

					overlay.display = 'block';

				    if (!document.evaluate) {
				        overlay.filter = 'alpha(opacity=0)';
				    } else { 
				        overlay.opacity = 0;
				    }

					close = true;

					obj.parentNode.insertBefore(popup, obj.parentNode.firstChild);
					if (document.addEventListener) {
						document.addEventListener('click', function(){
							if(close) {
								obj.parentNode.removeChild(popup);
								overlay.display  = 'none';
							}
						}, true);
					} else if (document.attachEvent) {
						document.attachEvent('onclick', function(){
							if (close) {
								obj.parentNode.removeChild(popup);
								overlay.display  = 'none';
							}
						});
					}
				} else {
					alert('\u8A72\u5F53\u3059\u308B\u30A8\u30B3\u30FC\u304C\u3042\u308A\u307E\u305B\u3093\uFF1E\uFF1C');
				}
			}
		}
	}
})();