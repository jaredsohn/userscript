// ==UserScript==
// @name 豆瓣小组讨论-引用工具 0.2
// @namespace http://www.douban.com/people/d3d3
// @description by d3d3
// @include http://www.douban.com/group/topic/*
// ==/UserScript==

function Quote(XPath){
var xpathResult = document.evaluate(
XPath,
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null
)

for (var i=0; i<xpathResult.snapshotLength; i++) {
var Element2Quote = xpathResult.snapshotItem(i);
var newElement;
if (Element2Quote.childNodes.length>2){ //非本人回复的楼层 length==4
newElement = document.createElement("div");
newElement.className = "p1";
newElement.align = "right";
Element2Quote.appendChild(newElement);
//在..td[2]内添加子元素<div>
newElement = document.createElement("span");
newElement.className = "gact";
newElement.style.cssText = "float: right;";
Element2Quote.childNodes[4].appendChild(newElement);
//在..td[2].<div>内添加子元素<span>
newElement = document.createElement("a");
var quotationTime = Element2Quote.childNodes[0].childNodes[0].firstChild.nodeValue;
var quotationAuthor = Element2Quote.childNodes[0].childNodes[0].childNodes[1].textContent;
var quotationBody = Element2Quote.childNodes[1].textContent;
quotationBody = quotationBody.replace(/\n/g,"\\n");
var textAreaValue = " "+quotationAuthor+"于"+quotationTime+"说:“\\n"+quotationBody+"”\\n ";
//获取引用的 时间，作者以及引用的内容
newElement.href="javascript:document.getElementById('last').value+=\'"+textAreaValue+"\';document.getElementById('last').focus();";
//设定href为javascript修改textArea内容并激活它
newElement.textContent="引用";
newElement.className = "j a_confirm_link";
newElement.rel = "nofollow";
newElement.title = "引用此发言";
Element2Quote.childNodes[4].lastChild.appendChild(newElement);
//在..td[2].<div>.<span>内添加子元素<a>
}
}
}

var XPathNode2Quote = '/html/body/div/div/div/div/table/tbody/tr/td[2]/table/tbody/tr/td[2]';
Quote(XPathNode2Quote);