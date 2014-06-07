// ==UserScript==
// @name           mx_detatch_comment
// @namespace      http://example.com/
// @description    detatch comment on mixi
// @include        http://mixi.jp/view_diary.pl*
// ==/UserScript==

(function() {
	var detatch_users = new Array
	//detatch >> http://mixi.jp/show_friend.pl?id=1 and http://mixi.jp/show_friend.pl?id=635462
	//detatch_users = [635462,1]
	
	detatch_users = [0];
	
	var elements = document.getElementById("diaryComment").getElementsByTagName("span");
	var i;
	var iid;
	var valueArray = new Array;
	var valueId;
	
	for (i=0;i<elements.length;i++){
		target = elements[i];
		if (target.getElementsByTagName("a").length == 1) {
			target = target.getElementsByTagName("a")[0];
			valueId = target.getAttribute("href").substr(18);
			for (iid=0;iid<detatch_users.length;iid++){
				if( valueId==detatch_users[iid] ) {
					visible = target.parentNode.parentNode.parentNode.parentNode;
					visible.setAttribute("style","display:none")
				}
			}
		}
	}
})();