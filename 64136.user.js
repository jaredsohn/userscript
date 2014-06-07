// ==UserScript==
// @name           QT button on Twitter
// @namespace      QTBT
// @description    Add QT(quote tweet) button on Twitter
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function(){
var permalink = document.evaluate('//div[@id="permalink"]', document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

GM_addStyle("a.QT_Button {display:blodk; float:left; margin-left:8px; line-height:16px; margin-right:1px;}");

if(permalink.singleNodeValue){
	var node = permalink.singleNodeValue.getElementsByTagName("div")[0];
	addQTButton(node);
	
	return;
}

var nodesSnapshot = document.evaluate('//ol[@id="timeline"]/li', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

process(nodesSnapshot);

document.body.addEventListener('DOMNodeInserted', nodeInserted, false);

return;

function nodeInserted(aEvt){
	var target = aEvt.target;
	var tagName = target.tagName;
	if(tagName=="OL"){
		var nodesSnapshot = document.evaluate('//ol[@id="timeline"]/li', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		process(nodesSnapshot);
	}
	else if(tagName=="LI"){
		addQTButton(target);
	}
	else return;
}
function process(nodesSnapshot){
	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
	{
		var node = nodesSnapshot.snapshotItem(i);
		addQTButton(node);
	}
	
	return;
	
}
function addQTButton(node){
	if(!node) return;	
	if(!node.id) return;
	
	var cls = node.getAttribute("class");
	if(!cls) return;
	if(cls.indexOf(" QTAdded ")>-1) return;
	
	(" "+cls+" ").match(/ u-(.*?) /);
	var user = RegExp.$1;
	if(!user) return;

	var id = node.id.replace("status_", "");

	var content = node.getElementsByClassName("entry-content")[0];
	var text = content.innerHTML.replace("\n", "").replace(/<[^>]*>/g,"");


	var a = document.createElement("a");
	a.setAttribute("class", "QT_Button");//color:#1F98C7; 
	a.innerHTML="QT";
	//in_reply_to_status_id パラメータなどは反映されないようなので削除
	a.href='/?status='+" QT @"+user+": "+text.replace(/[!-~]/g ,
		function(whole, p1){ //無名関数定義
			return escape(whole);
		}
	);//+"&in_reply_to_status_id="+id+"&in_reply_to="+user;

	var li = document.createElement("li");
	li.appendChild(a);

	var ul = node.getElementsByClassName("actions-hover")[0];
	ul.appendChild(li);
	
	node.setAttribute("class", node.getAttribute("class")+" QTAdded ");
}
})();
