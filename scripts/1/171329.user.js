// ==UserScript==
// @name          B3SystemMailOpener
// @namespace     b3sysmail
// @include       http://*.3gokushi.jp/message/inbox.php*
// @include       http://*.1kibaku.jp/message/inbox.php*
// @include       http://*.bmcaxis.jp/message/inbox.php*

// @date          2010/10/23
// @version       0.1
// ==/UserScript==

var c   = 0;
var url = new Array();

(function(){
	var tableTitle = xpath('//*[@id="gray02Wrapper"]//ul[@id="statMenu"]', document);
	var classRmv = xpath('//*[@id="gray02Wrapper"]//ul[@id="statMenu"]/li[@class="last"]', document);

	classRmv.snapshotItem(0).removeAttribute('class');

	var opnNtc = document.createElement("li");
	opnNtc.innerHTML = "<a href=\"javascript:void(0)\">運営書簡開封</a>";
	var num = tableTitle.snapshotItem(0).childNodes.length;
	tableTitle.snapshotItem(0).insertBefore(opnNtc, tableTitle.snapshotItem(0).childNodes.item(num));
	opnNtc.addEventListener("click", opnNtcF, true);

	var chkSet = document.createElement("li");
	chkSet.className = "last";
	chkSet.innerHTML = "<a href=\"javascript:void(0)\">運営書簡チェック</a>";
	var num = tableTitle.snapshotItem(0).childNodes.length;
	tableTitle.snapshotItem(0).insertBefore(chkSet, tableTitle.snapshotItem(0).childNodes.item(num));
	chkSet.addEventListener("click", chkSetF, true);

})();

//空白除去
function trim(str) {
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$|&nbsp;/g, "");
}
function xpath(query,targetDoc) {return document.evaluate(query, targetDoc, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}

function opnNtcF(){
	var table = xpath('//table[@class="commonTables"]', document);

	var len = table.snapshotItem(0).rows.length;

	window.setTimeout(function(){
		for(var i=2;i<len;i++){
			if( (table.snapshotItem(0).rows[i].className == 'unread') && (table.snapshotItem(0).rows[i].cells[2].getElementsByTagName('span')[0].className == 'notice') ) {
				url[++c] = table.snapshotItem(0).rows[i].cells[1].getElementsByTagName('a')[0].href;
			}
		}
	},0);

	window.setTimeout(function(){
		for(var i=1;i<=c;i++){
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.open("GET",url[i]);
				xmlhttp.send(null);
		}
	},0);

}

function chkSetF(){
	var table = xpath('//table[@class="commonTables"]', document);

	var len = table.snapshotItem(0).rows.length;

	for(var i=2;i<len;i++){
		if(table.snapshotItem(0).rows[i].cells[2].getElementsByTagName('span')[0]){
			table.snapshotItem(0).rows[i].cells[0].getElementsByTagName('input')[0].checked = true;
		}
	}

}

