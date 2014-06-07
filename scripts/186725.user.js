﻿// ==UserScript==
// @name           HotKey Next Page++
// @namespace      liu8563525@163.com
// @author         liu8563525
// @version        1.0.2
// @grant          none
// @description    HotKey Next Page的个人加强版，按左右键翻页，可以自己针对网站定制xpath规则
// @include        http://*
// @include        https://*
// @exclude        http://*taobao.com/*

// ==/UserScript==

const nextStrs = [
					'下一页',
					'下页',
					'下一节',
					'下一章',
					'下一篇',
					'后一章',
					'后一篇',
                                        '后页>',
                                        '下一页>',
					'>',
					'?',
					'next',
					'next page',
					'old',
					'older',
					'earlier',
					'下頁',
					'下一頁',
					'后一页',
					'后一頁',
					'翻下页',
					'翻下頁',
					'后页',
					'后頁',
					'下翻',
					'下一个',
					'下一张',
					'下一幅'
];

const lastStrs = [
					'上一页',
					'上页',
					'上一节',
					'上一章',
					'上一篇',
					'前一章',
					'前一篇',
                                        '<前页',
					'?',
					'previous',
					'prev',
					'previous page',
					'new',
					'newer',
					'later',
					'上頁',
					'上一頁',
					'前一页',
					'前一頁',
					'翻上页',
					'翻上頁',
					'前页',
					'前頁',
					'上翻',
					'上一个',
					'上一张',
					'上一幅'
];

const GeneralXpaths = [
	["//a[(text()='","')]"],
	["//input[@type='button' and @value='","']"]
];

//编辑下面的数组来自定义规则
const SpecialXpaths = [
	{
		//匹配的url
		urls : [
			"http://www.google.com"
		],
		//上一页节点的xpath
		last : "//a[@id='pnprev']",
		//下一页节点的xpath
		next : "//a[@id='pnnext']"
	}
];
const LEFT = 37;
const RIGHT = 39;

function checkKey(e){
	if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey )
        return ;
	if(checkTextArea(e.target))
		return ;
	var node;
	if(e.keyCode == LEFT && (node = getNode(LEFT))){
		click(node);
	}
	if(e.keyCode == RIGHT && (node = getNode(RIGHT))){
		click(node);
	}
}

function checkTextArea(node){
	var name = node.localName.toLowerCase();
	if (name == 'textarea' || name == 'input' || name == 'select')
		return true;
	if(name == 'div' && node.id.toLowerCase().indexOf('textarea')!=-1)
		return true;
	return false;
}

function click(node){
	if(node.onclick)
		node.onclick();
	if(node.click)
		node.click();
	if(node.href)
		location.href = node.href;
}
function xpath(query) {
	return unsafeWindow.document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getNode(keyCode){
	var node = getNodeByGeneralXpath(keyCode)
	if (!node)
		node = getNodeBySpecialXpath(keyCode);
	return node;
}
function getNodeByGeneralXpath(keyCode){
	var strs;
	if(keyCode == LEFT)
		strs = lastStrs;
	else if(keyCode == RIGHT)
		strs = nextStrs;
	else
		return null;
	var x = GeneralXpaths;
	for (var i in x){
		for (var j in strs){
			var query = x[i][0]+strs[j]+x[i][1];
			var nodes = xpath(query);
			if(nodes.snapshotLength > 0)
				return nodes.snapshotItem(0);
		}
	}
	return null;
}
function getNodeBySpecialXpath(keyCode){
	var s = SpecialXpaths;
	for (var i in s){
		if(checkXpathUrl(s[i].urls)){
			if (keyCode == LEFT){
				return xpath(s[i].last).snapshotItem(0);
			}
			else if(keyCode == RIGHT){
				return xpath(s[i].next).snapshotItem(0);
			}
		}
	}
	return null;
}
function checkXpathUrl(urls){
	for(var i in urls)
		if(location.href.indexOf(urls[i]) == 0)
			return true;
	return false;
}
if (top.location != self.location)
	return;
unsafeWindow.document.addEventListener('keydown', checkKey, false);