// ==UserScript==
// @name           Userscripts : Delete Private Messages
// @namespace      http://gm.wesley.eti.br
// @description    Allows us to mass delete private messages
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.1.3
// @language       en
// @include        /userscripts\.org\/messages(\?|$)/
// @grant          GM_xmlhttpRequest
// @icon           http://gm.wesley.eti.br/icon.php?desc=64611
// @require        /scripts/source/292725.user.js
// @require        /scripts/source/288385.user.js
// @require        /scripts/source/63808.user.js
// @require        /scripts/source/56489.user.js
// @contributor    Mike007 ( http://userscripts.org/topics/125397?page=1#posts-491904 )
// @debug          false
// @uso:author     55607
// @uso:script     64611
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

Notify.execute(function () {
	var ul = xpath(".//ul[li/div[@class = 'message']]")[0];

	if (ul) {
		var messages = xpath("./li//a[contains(@href, '/messages/')]", ul),
		li = document.createElement("li");
		li.setAttribute("class", "read");
		li.innerHTML = '<div style="float:left;width:25px;"><input type="checkbox" style="margin-top:8px;"></div><div class="pagination" style="padding:0;"><a href="#">Delete</a></div>';

		ul.insertBefore(li, ul.firstChild);

		xpath(".//input[1]", li)[0].addEventListener("click", function (e) {
			if (e.ctrlKey) {
				e.target.checked = false;
			}

			var cbs = xpath("./ancestor::ul[1]/li//input[@name = 'delete[]']", e.target);

			for (var ai in cbs) {
				var cb = cbs[ai];
				cb.checked = (e.ctrlKey ? !cb.checked : e.target.checked);	// press and hold ctrl to invert selection
			}
		}, false);

		xpath(".//a[1]", li)[0].addEventListener("click", function (e) {
			var checked = xpath("./ancestor::ul[1]/li//input[@name = 'delete[]']", e.target).filter(function (a) {
				return a.checked;
			});
			
			if (checked.length) {
				if (confirm("Delete these messages permanently?"))
				(function delete_message (checkboxes) {
					HttpRequest.open({
						"method" : "post",
						"url" : "//userscripts.org/messages/" + checkboxes[0].value,
						"onsuccess" : function (params) {
							var row = xpath("./ancestor::li[1]", params.checkboxes.shift())[0];
							row.parentNode.removeChild(row);
							
							if (params.checkboxes.length) {
								setTimeout(delete_message, 100, params.checkboxes);
							} else {
								alert("Messages deleted successfully!");
							}
						},
						"parameters" : {"checkboxes":checkboxes}
					}).send({
						"_method" : "delete",
						"authenticity_token" : unsafeWindow.auth_token
					});
				}(checked));
			} else {
				alert("No messages selected.");
			}

			e.preventDefault();
		}, false);

		for (var ai in messages) {
			var msg = messages[ai];

			if (/(\d+)$/.test(msg.href)) {
				var p = xpath("./ancestor::li[1]", msg)[0],
				d = document.createElement("div");
			
				d.setAttribute("style", "float:left;width:25px");
			
				d.innerHTML = '<input type="checkbox" name="delete[]" value="' + RegExp.$1 + '"/>';
			
				p.insertBefore(d, p.firstChild);
			}
		}
	}
});