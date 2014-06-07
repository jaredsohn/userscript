// ==UserScript==
// @name           4Chan BBCode
// @namespace      http://4chan.org/
//@version        1.00
// @description    Replace BBCode with html tags
// @include        http://boards.4chan.org/*
// ==/UserScript==

replaceTextContent(/\[(\w+)=?(.*?)\]([\s\S]*?)\[\/\1\]/gmi,replaceBBCode,document.body,["script","style","textarea"]);

function replaceTextContent(regexp,handler,node,ignoreParentNode)
{
	var snapshots=document.evaluate(".//text()[normalize-space(.)!='']",node,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var num1=0;num1<snapshots.snapshotLength;num1++)
	{
		var node1=snapshots.snapshotItem(num1);
		if (ignoreParentNode && ignoreParentNode.indexOf(node1.parentNode.tagName.toLowerCase())!=-1) continue;
		var node2=node1.parentNode;
		var text1=node1.textContent;
		var flag1=false;
		var match1;
		regexp.lastIndex=0;
		while(match1=regexp.exec(text1))
		{
			var node3=handler(match1);
			if (node3!=null)
			{
				flag1=true;
				text1=RegExp.rightContext
				if (RegExp.leftContext.length) node2.insertBefore($ctn(RegExp.leftContext),node1);
				node2.insertBefore(node3,node1);
				replaceTextContent(regexp,handler,node3,ignoreParentNode);
				regexp.lastIndex=0;
			}
		}
		if (flag1) 
		{
			if (text1.length) node2.insertBefore($ctn(text1),node1);
			node2.removeChild(node1);
		}
	}
}

function replaceBBCode(match)
{
	//GM_log("match: "+match);
	switch(match[1].toLowerCase())
	{
		case "b":
			return $ce("b",match[3]);
		case "i":
			return $ce("i",match[3]);
		case "s":
			return $ce("s",match[3]);
		case "u":
			return $ce("u",match[3]);
		case "color":
			return $ce("span",match[3],{style:"color:"+match[2]});
		case "font":
			return $ce("span",match[3],{style:"font-family:"+match[2]});
		case "url":
			return $ce("a",match[3],{href:getUrl(match)});
		case "email":
			return $ce("a",match[3],{href:"mailto:"+getUrl(match)});
	}
	return null;
}

function $ce(tagName,textContent,attributes)
{
	var element1=document.createElement(tagName);
	element1.textContent=textContent;
	for(var name1 in attributes) element1.setAttribute(name1,attributes[name1]);
	return element1;
}

function $ctn(text) { return document.createTextNode(text); }
function trimUrl(url) { return url.replace(/\s/g,""); }
function getUrl(match) { return trimUrl(match[2]?match[2]:match[3]); }