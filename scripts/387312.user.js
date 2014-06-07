// ==UserScript==
// @name          HJJ Table with Colorful Titile  
// @author        bubble7733, modified by xyau
// @namespace     xyauhideto@gmail.com
// @description   To change the title color of new content for the table page from HJJ
// @create        2009/9/8
// @lastmodified  2014/2/15
// @version       0.2
// @downloadURL   https://userscripts.org/scripts/source/387312.user.js
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
    "//table[4]/tbody/tr/td[4]",//根据新版面修改 by xyau
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var flnum=allTables.snapshotLength; //计算主题帖的个数

function td2Number ( a ) {
    //将td单元中的数值取出来
    var s = a.textContent||a.innerText;
    return s;
}

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