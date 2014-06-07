// ==UserScript==
// @name           Xbox Live Fixer
// @namespace      #aVg
// @description    View the full message on Xbox Live
// @include        http://live.xbox.com/en-GB/profile/MessageCenter/ViewMessages.aspx
// @version        0.1.2
// ==/UserScript==
try {
function makeCell() {
	return document.createElement("td");
}
function handle(m) {
	GM_xmlhttpRequest({
		method : "GET",
		url : m.href,
		onload : function(a) {
			var r=m.offsetParent.parentNode;
			r.cells[r.cells.length - 1].textContent = a.responseText.match(/Expires in (\d+)/)[1];
			r.cells[4].textContent = a.responseText.match(/TextPanel"><p>([^<]+)/)[1].replace(/&#(\d+);/g,function(a, b) {return String.fromCharCode(Number(b))});
		}
	});
}

if(true) {
	var table=document.evaluate("//table[@class='XbcProfileTable XbcViewMessagesTable']", document, null, 9, null).singleNodeValue;
	var info = document.createElement("tbody");
	var a = document.createElement("tr");
	info.appendChild(a);
	var headers = ["Expiry (days)","Reply","Delete","Date","Message","Attachment","Message Type","Gamertag","Gamercard"];
	for(var i = headers.length - 1; i>=0; --i) {
		var td = document.createElement("td");
		td.innerHTML = headers[i];
		a.appendChild(td);
	}
	table.insertBefore(info, table.childNodes[1]);
}

var msgs=document.evaluate("//td[@class='XbcGamerTag']/h4/a", document, null, 6, null), msg, i=msgs.snapshotLength;
while(msg=msgs.snapshotItem(--i)) {
	var r=msg.offsetParent.parentNode, del = makeCell(), rep = makeCell();

	r.cells[0].innerHTML = "<a href=\""+"http://live.xbox.com/member/"+msg.textContent+"\">" + r.cells[0].innerHTML + "</a>";


	var date=r.cells[5];
	var dateObj = new Date(date.childNodes[1].nodeValue.replace(/^(\d+)\/(\d+)/, "$2/$1") + " " + date.childNodes[5].nodeValue);
	date.innerHTML = (1 + dateObj.getMonth()) + "/" + dateObj.getDate() + "/" + (dateObj.getFullYear()+"").replace(/\S+(\d{2})$/,"$1") + " " + dateObj.toLocaleTimeString();



	
	var reply = document.createElement("a");
	reply.href="http://live.xbox.com/en-GB/profile/MessageCenter/SendMessage.aspx?gt=" + msg.textContent;
	reply.textContent="Reply";
	
	var deleet = document.createElement("a");
	deleet.href="http://live.xbox.com/en-GB/profile/MessageCenter/RemoveMessage.aspx?mx="+msg.href.match(/mx=(\d+)/)[1]+"&bk=0";
	deleet.textContent = "X";
	
	
	rep.appendChild(reply);
	del.appendChild(deleet);
	
	r.appendChild(del);
	r.appendChild(rep);
	r.appendChild(makeCell());
	handle(msg);
	
}
}catch(e){console.error(e)}