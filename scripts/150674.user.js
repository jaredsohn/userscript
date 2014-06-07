// ==UserScript==
// @name           ID Copy/Paste
// @author         Sasquatch
// @version        1.0.0
// @namespace      http://www.mturkforum.com
// @homepage       http://mturkforum.com/showthread.php?4443-Worker-ID-Copy-Paste&p=57029
// @description    Places an unobtrusive button on the page which provides quick access to copy your mTurk worker ID.
// @include        https://www.mturk.com/mturk/dashboard
// @include        https://www.mturk.com/mturk/accept*
// @include        https://www.mturk.com/mturk/preview*
// @include	       http://*.qualtrics.com/*
// @include	       https://*.qualtrics.com/*
// @include        https://*.surveymonkey.com/*
// ==/UserScript==

workerID = GM_getValue("workerID");
if(!workerID || workerID == "") {
	if (window.location.href == "https://www.mturk.com/mturk/dashboard") {
		workerIDNode = document.evaluate("//span[@class='orange_text_right']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (i=0; i<workerIDNode.snapshotLength; i++) {
			nd = workerIDNode.snapshotItem(i);
			idstring = nd.innerHTML;
			workerID = idstring.split(': ')[1];
			GM_setValue("workerID",workerID);
		}
	} else {
		workerID="";
		GM_setValue("workerID","");
	}
} else {
	if (window.location.href != "https://www.mturk.com/mturk/dashboard") {
		idDiv = document.createElement('div');
		idDiv.id = "workerIDDiv";
		idInner = "<div style='position:fixed;top:25px;z-index:10000;right:5px;padding:1px 3px;background:#33CC00;font-size:8px;color:white;'>"+workerID+"</div>";
		idDiv.innerHTML = idInner;
		document.body.insertBefore(idDiv,document.body.firstChild);
	}
}