// ==UserScript==
// @name          Yahoo Mail Preview
// @namespace     http://www.devdive.com/
// @include       http://*.mail.yahoo.com/*
// @description	  Lets you preview Yahoo! email messages from Inbox
//                or a folder instead of having to click on them.
// ==/UserScript==

var a;
var msg_num=0;
var msg_header = " ";

var preview = document.createElement("div");
preview.id = "m_preview";
preview.style.display="none";
preview.style.position = "absolute";
preview.style.background = "#fff";
preview.style.border="1px solid #000";
preview.style.padding="4px 4px";
var w = screen.availWidth/2;
preview.style.overflow="auto";
preview.style.zIndex="999";
preview.addEventListener('click',function() {
	this.style.display="none";
},true);

document.body.appendChild(preview);

link_to_msgs = document.evaluate(
    "//a[contains(@id, 'folderviewmsg')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var msgs = new Array(link_to_msgs.snapshotLength);
var msg_id = new Array(link_to_msgs.snapshotLength);

for(var i=0;i<link_to_msgs.snapshotLength;i++) {	
	a=link_to_msgs.snapshotItem(i);	
	//alert(a.href);
	var prv_link = document.createElement('a');	
	prv_link.setAttribute('title', 'Click to see message preview');
	prv_link.setAttribute('href','javascript:void(0);');
	prv_link.setAttribute('onmouseover','window.defaultStatus=this.name;return true');
	prv_link.textContent = "\u00bb";	
	prv_link.id = a.href;
	prv_link.addEventListener('click',function(event) {
		var msg_prev = getMessage(this.id);
		preview.style.display="block";
		preview.style.left=(event.pageX-4)+"px";
		preview.style.top=(event.pageY-4)+"px";
		preview.innerHTML = msg_prev;		
	},true);	
	var t = document.createTextNode(" ");
	a.parentNode.insertBefore(t,a);
	a.parentNode.insertBefore(prv_link,t);	
	GM_xmlhttpRequest({
	method: 'GET',
	url: a.href,
	onload: function(responseDetails) {
		var msg_code = responseDetails.responseText;			
		var mid=msg_code.match(/Mid=.*&inc/);
		mid+='';
		mid=mid.replace(/Mid=((.)*)&inc/,"$1");		
		msg_id[msg_num]=mid+'';
		msgs[msg_num]=msg_code.match(/<div id=\"message\"(.|\n)*END TOC -->/g);		
		msg_num++;
		}
	});
}


function getMessage(href) {
	for(i=0;i<msg_id.length;i++) {
		var m = msg_id[i]+'';
		if(href.match(m)) {			
			return msgs[i];
		}
	}
	return "";
}
