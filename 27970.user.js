// ==UserScript==
// @name           Orkut Pending Friend Request Deleter
// @namespace      http://themes-orkut.blogspot.com/
// @description    If due to some scripts or any other reason u have lots of pending friends request, then this is the best script for you!
// @include        http://www.orkut.*/Friends.aspx?show=pendingFriends
// ==/UserScript==


window.addEventListener(
	'load',
	function() {
		var linkpre = "javascript: _editUser(\'";
		var linkpost = "\',\'\',\'\',\'\',true,'f0')" ;	
		var rlink, tlink;
		rlink = document.evaluate("/html/body/div[6]/form[1]/div[3]/table[2]/tbody/tr[1]/td[1]/div[9]/div/span/span[1]/a[@onclick]",
			    document,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);

	   rlink = rlink.snapshotItem(0);
    // do something with thisLink
		rlink = rlink.getAttribute("onclick"); 
		rlink = rlink.split("'");
		rlink = linkpre + rlink[1] + linkpost;
//GM_log(rlink);
 		window.location.href = rlink;
		window.location.href = 'javascript: tk_L(); tk_m("removeFriends", tk_); tk_x().submit();'

//end
	},

	true);


