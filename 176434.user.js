// ==UserScript==
// @name       Yunci4 Note Exporter 云词4单词本导出
// @namespace  http://this.is.a.dummy.page/
// @version    0.1
// @description  导出云词4单词本
// @match      http://*.yunci4.com/*
// @copyright  2013 mbbill <mbbill@gmail.com>
// @run-at document-end
// ==/UserScript==

// 使用方法：
//  * 进入单词本界面
//  * 左上角“导入...”附近会增加一个按钮“导出”
//  * 打开console，例如chrome下就是control-shift-j
//  * 点击导出按钮，当前页面所有单词和解释都会通过console.log打出来
//  * 自己复制出来整理吧。

console.log("Yunci4 Note Exporter Enabled");

var importButton = document.getElementById("importwordbtn");
if (importButton) {
    importButton.parentElement.innerHTML+='<a id="exportButton" href="javascript:void(0);">导出</a>'
    document.getElementById("exportButton").addEventListener('click', exportNotes, false);
}

var index;
var namelist;
var idlist;
function exportNotes() {
    index = 0;
    namelist = new Array();
    idlist = new Array();
    var lists = document.getElementsByClassName("browse_a1");
    for (li=0; li<lists.length; li++) {
        namelist[li] = lists[li].getAttribute('title');
        idlist[li] = lists[li].getAttribute('nocid');
    }
    getData();
}

function getData() {
    if ( index >= idlist.length ) {
        return;
    }
    GM_xmlhttpRequest({
    	method: "GET",
  		url: "http://www.yunci4.com/show.php?t=note&id="+idlist[index],
  		onload: function(response) {
            console.log("单词 ====>");
   			console.log(namelist[index]);
            console.log("解释 ====>");
            console.log(response.responseText);
            index++;
            getData();
  		}
	});
}
