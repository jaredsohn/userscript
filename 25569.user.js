// ==UserScript==
// @name           BBCode Replacer
// @namespace      http://userscripts.org/users/28612
//@version        0.04.00
// @description    Replace BBCode with html tags
// @include        *
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
		case "i":
		case "s":
		case "u":
		case "p":
		case "ol":
		case "ul":
		case "li":
		case "tt":
		case "pre":
		case "sup":
		case "sub":
		case "code":
			return $ce(match[1],match[3]);
		case "left":
		case "right":
		case "center":
			return $ce("p",match[3],{align:match[1]});
		case "color":
			return $ce("span",match[3],{style:"color:"+match[2]});
		case "size":
			return $ce("span",match[3],{style:"font-size:"+match[2]+(/\D/.test(match[2])?"":"px")});
		case "font":
			return $ce("span",match[3],{style:"font-family:"+match[2]});
		case "link":
		case "url":
			return $ce("a",match[3],{href:getUrl(match)});
		case "email":
			return $ce("a",match[3],{href:"mailto:"+getUrl(match)});
		case "image":
		case "img":
			var size1=match[2]?match[2].split("x"):["",""];
			return $ce("img",null,{src:trimUrl(match[3]),alt:match[3],width:size1[0],height:size1[1]});
		case "quote":
			return $ce("blockquote",(match[2]?match[2]+": ":"")+match[3]);
		case "list":
			return $ce(match[2]?"ol":"ul",/[*]/.test(match[3])?match[3].replace("[*]","[li]").replace(/[*]/,"[/li][li]")+"[/li]":match[3],match[2]?{"type":match[2]}:null);
		case "spoiler":
			var span1=$ce("span",null,{title:"Click to hide/show Spoiler","onclick":"var  s1=this.firstChild.style; var s2=this.firstChild.nextSibling.style; var t=s1.display; s1.display=s2.display; s2.display=t;"});
			span1.appendChild($ce("span","Spoiler"));
			span1.appendChild($ce("span",match[3],{style:"display:none"}));
			return span1;
		case "youtube":
			var size1=match[2]?match[2].split("x"):[400,325];
			var obj1=$ce("object",null,{width:size1[0],height:size1[1]});
			obj1.appendChild($ce("param",null,{name:"movie",value:"http://www.youtube.com/v/"+match[3]}));
			obj1.appendChild($ce("embed",null,{src:"http://www.youtube.com/v/"+match[3],type:"application/x-shockwave-flash",width:size1[0],height:size1[1]}));
			return obj1;
		case "gvideo":
			var size1=match[2]?match[2].split("x"):["400px","325px"];
			return $ce("embed",null,{src:"http://video.google.com/googleplayer.swf?docId="+match[3],type:"application/x-shockwave-flash",style:"width:"+size1[0]+";height:"+size1[1]});
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