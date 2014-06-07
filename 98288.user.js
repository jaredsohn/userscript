// ==UserScript==
// @name           Message_Self
// @namespace      JimboMonkey1234
// @description    Because everytime I see you, I message myself.
// @include        http*://*bungie.net/*Forums/posts.aspx*
// ==/UserScript==

for (var i=1;i<=25;i++) {
	//add padding
	i = String(i);
	if (i.length == 1) i = "0"+i;
	
	//head_node is contains the username link, groups link, etc
	var head_id, msg_id, head_node, msg_node;
	head_id = 'ctl00_mainContent_postRepeater1_ctl'+ i +'_ctl00_postControl_skin_author_header';
	msg_id = 'ctl00_mainContent_postRepeater1_ctl'+ i +'_ctl00_postControl_skin_showMsgButton';
	
	head_node = document.getElementById(head_id);
	msg_node = document.getElementById(msg_id);
	
	//if this is the logged in user's post
	//OR user is not logged in
	//in either case, let there be message links
	if(head_node != null && msg_node == null) {
		var group_id, group_node, group_link, msg_url, str;
		
		//get the URL from the "group" link
		group_id = 'ctl00_mainContent_postRepeater1_ctl'+ i +'_ctl00_postControl_skin_groupMembershipLink';
		group_node = document.getElementById(group_id);
		group_link = group_node.getAttribute("href");
		
		//modify the URL for messaging and attach to head_node
		msg_url = group_link.replace("Chapters","PostMsg");
		str = '<li class="author_header_links" id="ctl00_mainContent_postRepeater1_ctl'+ i +'_ctl00_postControl_skin_showMsgButton"><a href="'+msg_url+'" id="ctl00_mainContent_postRepeater1_ctl'+ i +'_ctl00_postControl_skin_msgUser">message user</a></li>';
		head_node.innerHTML += "\t"+str+"\n\t\t\t";
	}
}