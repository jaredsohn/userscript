// ==UserScript==
// @name           Google Music Auto
// @namespace      http://pto2k.blogspot.com
// @description    Download 'em all
// @include        http://www.google.cn/music/*
// ==/UserScript==

function xpathOne (query) {
	try{queryResult = document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return queryResult.snapshotItem(0);}catch(e){logToConsole(e)}
}
function xpath(query) {
	try{return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}catch(e){logToConsole(e)}
}
function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}


downloadLinks = xpath("//img[@alt='下载']//ancestor::td[@class='Icon BottomBorder']")

var time = 0

for ( i = 0; i < downloadLinks.snapshotLength; i++ ) {
		text = downloadLinks.snapshotItem(i).innerHTML
		id1start = text.indexOf('top100.cn%2F')+12;
		id1end = text.indexOf('%2Fhtml%2Fdownload.html%3Fid%3D')
		id2start = id1end+31
		id2end = id2start+17
		logToConsole(id1=text.substring(id1start,id1end));
		logToConsole(id2=text.substring(id2start,id2end));
		//downloadUrl = "http://g.top100.cn/"+id1+"/html/download.html?id="+id2
		downloadUrl = "http://www.google.cn/music/top100/musicdownload?id="+id2
		logToConsole(downloadUrl)
		time = time + 1000
		getRealLink(downloadUrl,time)

}

function getRealLink(url,delay){
	setTimeout(function(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(responseDetails) {
				text = responseDetails.responseText
				//logToConsole(text)
				fileId = text.substring(text.indexOf('music/top100/url')+19,text.indexOf('"><img src="http://www.gstatic.cn/top100/images/download_icon.png"'))
				//logToConsole(fileId)
				fileId=fileId.replace(/%3A/g,":")
				fileId=fileId.replace(/%2F/g,"/")
				fileId=fileId.replace(/%2520/g," ")
				fileId=fileId.replace(/%2527/g,"'")
				fileId=fileId.replace(/&amp;/g,"&")
				logToConsole(fileId)
				fileId=fileId.substring(0,fileId.indexOf('mp3')+3)
				logToConsole(fileId)
				downloadFile(fileId)
			},
		});
	},delay)
}
function downloadFile(url){
	GM_openInTab(url)
}