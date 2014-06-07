// ==UserScript==
// @name           ID Copy/Paste
// @author         Sasquatch
// @version        1.0.2
// @namespace      http://www.mturkforum.com
// @homepage       http://mturkforum.com/showthread.php?4443-Worker-ID-Copy-Paste&p=57029
// @description    Places an unobtrusive button on the page which provides quick access to copy your mTurk worker ID. Edited by Tjololo12: Hover highlight for easy copy-paste, does not show on mturk pages
// @include        https://www.mturk.com/mturk/dashboard
// @include	       http://*.qualtrics.com/*
// @include	       https://*.qualtrics.com/*
// @include            http://*surveygizmo.com/*
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
    if (!/https?:\/\/www.mturk.com\/mturk\/*/.test(window.location.href)) {
		idDiv = document.createElement('div');
		idDiv.id = "workerIDDiv";
 		idInner = "<input type='text' onmouseover='javascript:this.focus();this.select() ;' onmouseout='javascript:this.blur();' value='" + workerID + "' style='position:fixed;border:none;top:25px;z-index:10000;right:5px;padding:1px 3px;background:#33CC00;font-size:10px;color:white;' readonly/>";
		idDiv.innerHTML = idInner;
		document.body.insertBefore(idDiv,document.body.firstChild);
	}
}