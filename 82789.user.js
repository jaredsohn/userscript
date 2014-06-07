// ==UserScript==
// @name           ClassicRetweetFor163Weibo
// @namespace      http://www.raymondchen.com/greasemonkey/ClassicRetweetFor163
// @description    Adds the classic Retweet function for 163 weibo
// @version        1.2.4
// @include        http://t.163.com/*
// @include        https://t.163.com/*
// ==/UserScript==


unsafeWindow.addRetweet=function() {
	var entryList=document.evaluate('//li[@id]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0;i<entryList.snapshotLength;i++) {
		var liElement=entryList.snapshotItem(i);
		var id=liElement.getAttribute('id');
		var spanList=liElement.getElementsByTagName("span");
		for (var j=0;j<spanList.length;j++) {
			var spanEle=spanList[j];
			if (spanEle.getAttribute("class")=="fr option") {
				if (spanEle.getAttribute("id")==(id+"_retweet")) {  // already added
					break;
				}
				
				spanEle.setAttribute("id",id+"_retweet");
				spanEle.setAttribute("pure_id",id);
				spanEle.innerHTML='<a onclick="var sendinfoBox=document.getElementById(\'sendinfo_text\');sendinfoBox.value=\'\u8F6C@\'+Status.data[\''+id+'\']._user.name+\' \' +Status.data[\''+id+'\']._text;sendinfoBox.focus();" href="javascript:void(0)" class="aLink" title="\u5F15\u7528\u8BC4\u8BBA\u8FD9\u6761\u5FAE\u535A">\u5F15\u7528\u8BC4\u8BBA</a> | '+spanEle.innerHTML;
			}
		}
	}
	
}
unsafeWindow.oldGetMoreStatuses=unsafeWindow.listPage.getMoreStatuses;
unsafeWindow.listPage.getMoreStatuses=function() {
		unsafeWindow.oldGetMoreStatuses.apply(unsafeWindow.listPage,arguments);
	unsafeWindow.addRetweet();
}
unsafeWindow.setInterval(unsafeWindow.addRetweet,5000);