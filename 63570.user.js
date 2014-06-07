// ==UserScript==
// @name           hipda-banUser
// @namespace      hi-pda
// @include        http://www.hi-pda.com/forum/*
// ==/UserScript==

//banMode表示屏敝模式
//参数为1时显示指定警告语
//参数为2时该贴不留痕迹地蒸发
banMode=2;

//bannedUsers指定要屏敝的用户uid
var bannedUsers = new Array(000001,000002);

//banString指定警告语，当banMode参数为1时有效
var banString = "banned!";


banString="<tr><td></td><td></td><td></td><td><span style='background-color:red;color:white;'>" + banString + "</span></td></tr>";
var myTables = document.getElementsByTagName('table');
var singleTable;

for (var i=2;i<myTables.length;i++){
	singleTable = myTables.item(i).innerHTML;
	for (var j=0;j<bannedUsers.length;j++) {
	if (singleTable.indexOf('uid='+bannedUsers[j] )!=-1) {
	  switch (banMode) {
	    case 1:
		myTables.item(i).innerHTML=banString;
		break;
	    case 2:
	      if (location.href.indexOf('viewthread.php')!=-1) {
		myTables.item(i).parentNode.style.display="none";
              } else {
                myTables.item(i).style.display="none";}
		break;
	  }
}}
}
