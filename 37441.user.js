// ==UserScript==
// @name           UserScripts.org ==> Unwatch Topics
// @namespace      #avg
// @description    Easily unwatch topics
// @include        http://userscripts.org/home/posts*
// @version        0.2.1
// ==/UserScript==
var topics=document.evaluate("//p[@class='topic']",document,null,6,null), i=topics.snapshotLength, topic;
while(topic=topics.snapshotItem(--i)) {
	killer=document.createElement("input");
	killer.setAttribute("onclick",
	<><![CDATA[
		$.ajax({type: "POST", url : this.previousSibling.pathname+"/monitorships", data : "_method=delete&authenticity_token=" + encodeURIComponent(auth_token)});
		var others=document.evaluate("//a[@href='"+this.previousSibling.pathname+"']/../../..", document, null, 6, null), i=0, single;
		while(single=others.snapshotItem(i++)) single.parentNode.removeChild(single);
	]]></>.toString()
	);
	
	killer.className = "kill";
	killer.type="button";
	killer.value="X";
	topic.appendChild(killer);
}
GM_addStyle(".kill {float:right;width:20px;height:20px;margin-top:-2px;}");