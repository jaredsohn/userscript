// ==UserScript==
// @id             kafanjump@ywzhaiqi@gmail.com
// @name           卡饭论坛楼层跳转简易版
// @version        1.0
// @namespace      
// @author         ywzhaiqi@gmail.com
// @description    
// @include        http://bbs.kafan.cn/forum.php?mod=viewthread*
// @include        http://bbs.kafan.cn/thread-*-*-*.html
// @run-at         document-end
// ==/UserScript==

/*
热键说明(无视大小写)：
"A-q" 代表 alt + q 键
"C-q" 代表 ctrl + q 键
"S-q" 代表 shift + q 键
*/
var hotkey = GM_getValue("hotkey") || "A-q";

GM_registerMenuCommand("更改快捷键", function(){
	hotkey = prompt('现在快捷键为: ' + hotkey +
'\n请输入您要改的快捷键(无视大小写)：\n\
  1. "a-q" 代表 alt + q 键\n\
  2. "c-q" 代表 ctrl + q 键\n\
  3. "s-q" 代表 shift + q 键');
	if(!hotkey) return;
	GM_setValue("hotkey", hotkey);
	window.location.reload();
});

var m = new RegExp("tid=(\\d+)|thread-(\\d+)").exec(document.location);
var threadId = m[1] || m[2];

var formElement = { 'input':true, 'button':true, 'select':true, 'textarea':true };
window.addEventListener('keypress',
	function(e) {
    	if (e.metaKey ||
        	formElement[e.target.tagName.toLowerCase()] || e.target.isContentEditable || document.designMode ==="on") {
         	return; }

        var key;
        if(e.shiftKey){
        	key = 'S-';
        }else if(e.ctrlKey){
        	key = 'C-';
        }else if(e.altKey){
        	key = 'A-';
        }else{
        	key = "";
        }
     	key = key + String.fromCharCode(e.charCode);
     	if (key.toLowerCase() == hotkey.toLowerCase()) {
         	run();
         	e.preventDefault();
         	e.stopPropagation();
     	}
}, false);

function run(){
	var gotoStr = prompt("请输入要去的楼层，用,分隔？");
	if(!gotoStr) return;

	var jumpNums = gotoStr.replace(/，/g, ',').split(",");
	var baseUrl = "http://bbs.kafan.cn/forum.php?mod=redirect&ptid=" + threadId + "&authorid=0&postno=";

	jumpNums.forEach(function(num){
		GM_openInTab(baseUrl + num);
	});
}
