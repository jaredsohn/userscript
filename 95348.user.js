
// HJJ Table with Colorful Titile  
// version 0.1 BETA!
// 2009-09-08
// Copyright (c) 2009, Bubble
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "HJJ Table with Colorful Titile", and click Uninstall.
//
//  update history
//  2009-09-08  Version 0.1   
//
//  适用范围：红晋江HJJ论坛目录页
//  功能描述：突出显示最近三天发布的帖子，以便用户可以在海量的帖子中一眼找到最近发布的帖子，特别适用于闲情XQ和优声由色YS这两个水很大的版块~
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          HJJ Table with Colorful Titile  
// @namespace     bubble7733@gmail.com
// @description   To change the title color of new content for the table page from HJJ
// @include       http://bbs.jjwxc.net/board.php?board=*
// @include       http://bbs.jjwxc.com/board.php?board=*
// ==/UserScript==



var allTables, thisTable;
var UseTable;

//获取当前系统时间，并修改成XXXX-XX-XX的格式
var today=new Date();
var intYear=today.getFullYear();
var intMonth=today.getMonth()+1;
if ( intMonth < 10 ) {
  intMonth = "0" + intMonth;
}
var intDay=today.getDate();
if ( intDay < 10 ) {
  intDay = "0" + intDay;
}
var nowDay = intYear + "-" + intMonth + "-" + intDay;
var nowday =  nowDay.replace(/-/g, "/");
s1 = new Date(nowday);

allTables = document.evaluate(
    "//table[6]/tbody/tr/td[4]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var flnum=allTables.snapshotLength; //计算主题帖的个数

//依次处理每一个标题，根据发帖时间，决定是否改变标题颜色
for (var i = 0; i < flnum; i++) {
//for (var i = 1; i < 2; i++) {
    thisTable = allTables.snapshotItem(i);

    //抽取发帖时间，并去除后面的具体时间，仅保留日期
    var postday = td2Number(thisTable);
    postday = postday.replace(/\s.+$/g, "");
//    alert(postday); 

    //计算发帖时间和当前系统时间相差的天数
    var postday = postday.replace(/-/g, "/");
    s2 = new Date(postday);
    var time= s1.getTime() - s2.getTime();
    var days = parseInt(time / (1000 * 60 * 60 * 24));
//    alert("相差天数: " + days);
     
    if ( days < 3 ) {
      //如果是三天之内发布的新帖，则进行后期处理
      var currentTR = thisTable.parentNode;
      currentTR.style.backgroundColor = "#B0E0E6";
    }
}

function td2Number ( a ) {
    //将td单元中的数值取出来
    var s = a.textContent||a.innerText;
    return s;
}
