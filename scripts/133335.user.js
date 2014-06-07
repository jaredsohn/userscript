// ==UserScript==
// @name    Subscribe To Forum HackForums.net
// @namespace  spafic/subtoforum
// @description  Subscribe to entire forums on HackForums.net
// @include  *hackforums.net/forumdisplay.php*
// @version  1.1
// ==/UserScript==

var links = document.getElementsByTagName('a');
for ( i = 0; i < links.length; i++ ) {
	var element = links[i];
	if( element.href.indexOf( "my_post_key" ) != -1 ) {
		var postkey = element.href.split(/my_post_key\=/);
		postkey = postkey[1];
	}
}

var links2 = document.getElementsByTagName("link");
for(i=0;i<links2.length; i++ ) {
	var element= links2[i];
	if(element.href.indexOf("fid") != -1) {
		var fid = element.href.split(/fid\=/);
		fid = fid[1];
	}
}

var pre_work_area = document.getElementsByClassName("quick_keys")[0];
var work_area = pre_work_area.getElementsByClassName("float_right")[0];

var myDiv = document.createElement("div");

var Sub2Forum = document.createElement("a");
Sub2Forum.setAttribute("style","cursor:pointer");
Sub2Forum.setAttribute("class","bitButton");
Sub2Forum.setAttribute("rel","nofollow");
Sub2Forum.setAttribute("title","Subscribe to this forum");
Sub2Forum.innerHTML = "Subscribe To Forum";
Sub2Forum.setAttribute("id","sub2forum");
Sub2Forum.setAttribute("href","http://hackforums.net/usercp2.php?action=addsubscription&type=forum&fid=" + fid + "&my_post_key=" + postkey);

Space = document.createElement("a");
Space.innerHTML = "  ";

SubManage = document.createElement("a");
SubManage.setAttribute("style","cursor:pointer");
SubManage.setAttribute("class","bitButton");
SubManage.setAttribute("rel","nofollow");
SubManage.setAttribute("title","Manage subscriptions");
SubManage.innerHTML = "Manage Subscriptions";
SubManage.setAttribute("id","submanage");
SubManage.setAttribute("href","http://www.hackforums.net/usercp.php?action=forumsubscriptions");

myDiv.appendChild(Sub2Forum);
myDiv.appendChild(Space);
myDiv.appendChild(SubManage);

work_area.innerHTML = work_area.innerHTML + "&nbsp;" + myDiv.innerHTML;