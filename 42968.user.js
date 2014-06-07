// ==UserScript==
// @name gokorea list image openner
// @namespace http://positrium.org/
// @include http://www.gokorea.jp/trans_bulletin/photo_list.html*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.3
// ==/UserScript==
(function() {
	const NEW_IMG_WIDTH = '200';
	const NEW_IMG_HEIGHT = '200';
	
	var list = x('/html/body/center/table[4]/tbody/tr[3]/td[2]/table[3]/tbody', document);
//	GM_log("[length]" + list.snapshotLength);
	var msg = list.snapshotItem(0).childNodes;
	for (var i in msg) {
		if (i >= 6) {
			var items = msg[i].childNodes;
			var img_node = items[3].childNodes[0];
//			GM_log(img_node.nodeName);
			var attrs = img_node.attributes;
			var width = attrs[0].textContent;
			var height = attrs[1].textContent;
			var border = attrs[2].textContent;
			var src = attrs[3].textContent;
//			GM_log(attrs[3].textContent);
			
			var new_src = src.toString();
			var split = '_thm.jpg';
			var end_pos = new_src.indexOf(split);
			new_src = new_src.substr(0, end_pos)+'.jpg';
//			GM_log(new_src);
			
			var new_img = document.createElement("img");
			new_img.setAttribute('width', NEW_IMG_WIDTH);
			new_img.setAttribute('height', NEW_IMG_HEIGHT);
			new_img.setAttribute('border', border);
			new_img.setAttribute('src', new_src);
			//change_nodes[i].insertBefore(img, change_nodes[i].firstChild);
			img_node.parentNode.insertBefore(new_img, img_node.parentNode.firstChild);
//			for(var s in attrs){
//				GM_log(s +"=" + attrs[s].textContent);
//			}
//			for(var j in items){
//				j = 3;
////				GM_log(j+" = " + items[j].nodeName + " / [" +items[j].textContent + "]");
//				var imgnode = items[j].childNodes[0];
//				GM_log(imgnode.nodeName);
//			}
		}
	}

	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'gokorea list image openner'
				,
				script_url : 'http://userscripts.org/scripts/source/42968.user.js' // required
				,
				current_version : '0.0.3' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/42968' // optional
			});
})();