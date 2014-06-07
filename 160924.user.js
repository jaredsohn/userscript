// ==UserScript==
// @name        Add To Remote uTorrent
// @namespace   eph
// @description Add torrent via web UI
// @include     *
// @grant       GM_xmlhttpRequest
// @version     1.3
// ==/UserScript==


WEBUI_URL = "http://{user}:{pass}@{host}:{port}/gui/";
MENU_TEXT = "Add to remote uTorrent";
DONE_TEXT = "Torrent added!";
FAIL_TEXT = "Failed to add torrent.";

var atru_menu = null;
var atru_menuitem = null;

document.addEventListener("contextmenu", function(e) {
	var n = e.target;
	if (n.contextMenu && n.contextMenu !== atru_menu) return;
	while (n) {
		if (n.nodeType == 1 && n.tagName == "A" && n.href) (function (n) {
			var u = n.href;
			
			if (!/^magnet:|.*?\.torrent\b|^http:\/\/\w+\.nyaa\.se\/\?page=download&tid=\d+$/i.test(u)) return;
			
			if (!atru_menu) {
				
				atru_menu = document.createElement("menu");
				atru_menu.id = "atru_menu";
				atru_menu.type = "context";
				document.body.appendChild(atru_menu);
				
				atru_menuitem = document.createElement("menuitem");
				atru_menuitem.label = MENU_TEXT;
				atru_menuitem.icon = WEBUI_URL + "images/ut_small.png";
				atru_menu.appendChild(atru_menuitem);
			}
			
			atru_menuitem.onclick = function () {
				GM_xmlhttpRequest({
					method: "GET",
					url: WEBUI_URL + "token.html",
					onload: function(xhr) {
						a = /^.*>([^<>]+)<.*$/.exec(xhr.responseText);
						if (a) {
							GM_xmlhttpRequest({
								method: "GET",
								url: WEBUI_URL + "?token=" + encodeURIComponent(a[1]) + "&action=add-url&s=" + encodeURIComponent(u),
								onload: function(xhr) { if (DONE_TEXT) alert(DONE_TEXT); },
								onerror: function(xhr) { if (FAIL_TEXT) alert(FAIL_TEXT); },
							});
						} else if (FAIL_TEXT) alert(FAIL_TEXT);
					},
					onerror: function(xhr) { if (FAIL_TEXT) alert(FAIL_TEXT); }
				});
			};
			n.setAttribute("contextmenu", "atru_menu");
		})(n);
		n = n.parentNode;
	}
}, false);
