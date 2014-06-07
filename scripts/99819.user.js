// ==UserScript==
// @name           hi-pda.com 白名单
// @namespace      http://www.hi-pda.com/
// @include        http://www.hi-pda.com/forum/viewthread.php*
// @description    待完善,逻辑混乱,白名单意义不大 hi-pda.com 白名单 在http://userscripts.org/scripts/show/63570 基础上修改
//
// ==/UserScript==

//banMode表示屏敝模式
//参数为1时显示指定警告语
//参数为2时该贴不留痕迹地蒸发
banMode=2;

//bannedUsers指定属于白名单中的用户uid
var bannedUsers = new Array(723,445276);

//banString指定警告语，当banMode参数为1时有效
var banString = "banned!";

banString="<tr><td></td><td></td><td></td><td><span style='background-color:red;color:white;'>" + banString + "</span></td></tr>";
var myTables = document.getElementsByTagName('table');
var singleTable;

for (var i=2;i<myTables.length;i++){
	singleTable = myTables.item(i).innerHTML;
	if (singleTable.indexOf('viewpro.php?uid=')!=-1) {
	var isBan = 0;
	for (var j=0;j<bannedUsers.length;j++) {
	if (singleTable.indexOf('viewpro.php?uid='+bannedUsers[j] )!=-1) { 
		isBan = 0;
		break;
	}
	else{
		isBan = 1;}
	}
	if (isBan==1) {
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
	 }}}
}