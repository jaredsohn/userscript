// ==UserScript==
// @name           Specify Brightkite only me post
// @namespace      http://tyarinko.cocolog-nifty.com/
// @include        http://brightkite.com/*
// ==/UserScript==

function specify_brightkite_only_me(){
	var nodes_item = document.evaluate("//div[@id='stream']/div[count(.//div[@class='mod_by_specify_bk_only_me'])=0]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0;i < nodes_item.snapshotLength;i++){
		var node_item = nodes_item.snapshotItem(i);
		var nodes_img = document.evaluate(".//div[@class='privacy']/img", node_item, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes_status = document.evaluate(".//p[@class='status']", node_item, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var node_img = nodes_img.snapshotItem(0);
		var node_status  = nodes_status.snapshotItem(0);
		var elm_mod_flag = document.createElement("div");
		elm_mod_flag.setAttribute("class","mod_by_specify_bk_only_me");
		node_item.appendChild(elm_mod_flag);
		if(node_img.getAttribute("title").indexOf("Only you can") != -1){
			node_status.innerHTML = "<b><font color='red'>Only you</font></b>" + node_status.innerHTML;
		}else if(node_img.getAttribute("title").indexOf("Everybody can") != -1){
			node_status.innerHTML = "<b>Everybody</b>" + node_status.innerHTML;
		}else if(node_img.getAttribute("title").indexOf("Only friends") != -1){
			node_status.innerHTML = "<b>Friends</b>" + node_status.innerHTML;
		}
	}
}


specify_brightkite_only_me_timer_id = setInterval(specify_brightkite_only_me,3000);
