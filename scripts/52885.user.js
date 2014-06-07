// ==UserScript==
// @name           Dell Force ftp to http
// @namespace      #aVg
// @include        http://support.dell.com/support/downloads/*
// @version        0.2.1
// ==/UserScript==
function fix(A) {
	GM_xmlhttpRequest({
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded"
		},
		url : "http://www.webconfs.com/redirect-check.php",
		method : "POST",
		data : "submit=sumbit&url=" + encodeURIComponent(A.href),
		onload : function(B) {
			if(B.responseText.match(/Found redirect to <b>([^<]+)/))
				A.href = RegExp.$1.replace("ftp","http");
		}
	});
}
var dls = document.evaluate("//a[starts-with(@href, 'javascript:downloadslink(')]", document, null, 6, null), dl, i=dls.snapshotLength;
while(dl=dls.snapshotItem(--i)) {
	if(dl.offsetHeight == 0)
		continue;
	dl.href = dl.href.match(/'([^']+)/)[1];
	if(dl.href.match(/ftp:\/\/([^']+)/))
		dl.href = "http://"+RegExp.$1;
	else
		fix(dl);
}