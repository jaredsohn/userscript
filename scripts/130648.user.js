// ==UserScript==
// @id             caoyue@v2ex
// @name           V2EX_Reply
// @version        1.1
// @namespace      caoyue
// @author         caoyue
// @description    v2ex reply
// @include        https://www.v2ex.com/t/*
// @include        http://www.v2ex.com/t/*
// @include        https://us.v2ex.com/t/*
// @include        http://us.v2ex.com/t/*
// @run-at         document-end
// ==/UserScript==

// Author: caoyue (http://caoyue.me)
// Created: 2012-04-10
// Version: 1.1
// Updated: 2012-4-11

var REPLY_TYPE = 1;  //TODO:评论显示方式. 1；Tooltip; 2：插入到评论上方；3：点击跳转到父评论
var REPLY_COUNT = 2;  //只显示最靠近的两条评论

document.addEventListener('mouseover',function(e){
	var	link = e.target;
	if(link.nodeName.toLowerCase()=='a'){
		var authorLink = getAuthor(link);
		if (authorLink.innerHTML != undefined) {
			var originID = authorLink.parentNode.parentNode.getElementsByTagName("div")[0].id.split("_")[1];
			var authorName = authorLink.innerHTML;

			var contentArray = getContent(originID,authorName);
			var content = "<strong>" + authorName + ":</strong><br />";

			if (contentArray.length >= 2) {
				for (var i = 0; i < REPLY_COUNT; i ++ ) {
					content = content + "<p style='padding-bottom:5px;border-bottom:1px dashed rgba(20,150,190,0.3);'>" + contentArray[contentArray.length - i - 1] + "</p>";
				}
			}
			else
				content = content + "<p style='padding-bottom:5px;border-bottom:1px dashed rgba(20,150,190,0.3);'>" + contentArray[0] + "</p>";

			var layer = creatDiv(content);

			layer.style.display = 'block';
			layer.style.left = e.pageX - 60 + "px";
			layer.style.top = e.pageY - layer.offsetHeight - 15 + "px";
		}
	}
});

document.addEventListener('mouseout',function(e){
	if (document.getElementById("ReplyToolTip") != null) {
		document.getElementById("ReplyToolTip").style.display = "none";
	}
});


function getAuthor(link){	
	var authorLink = "none";
	var rex = /\/member\//;
	if (rex.test(link) && link.className != "dark") {
		authorLink = link;
	}
	return authorLink;
}

function getContent(originID,authorName){
	var contentArray = new Array(),x;
	var replys = document.getElementById("replies").getElementsByClassName("reply_content");
	for (x in replys) {
		var reply = replys[x];
		if (reply.parentNode != undefined) {
			var replyID = reply.parentNode.getElementsByClassName("fr")[0].id.split("_")[1];
			var replyAuthor = reply.parentNode.getElementsByClassName("dark")[0].innerHTML;	
			if (replyID < originID && replyAuthor == authorName) {
				if (reply.innerHTML != "") {
					contentArray.push(reply.innerHTML);
				}
			}
		}
	}
	return contentArray;
}

function creatDiv(content){
	var layer = document.getElementById("ReplyToolTip");
	if (layer != null) {
		layer.innerHTML = content;
	}
	else{
		layer = document.createElement("div");
		document.body.appendChild(layer);
		layer.setAttribute("id","ReplyToolTip");
		layer.setAttribute("style","color:#333;background-color:#fff;max-width:550px;max-height:500px;padding:6px 10px;position:absolute;font-size: 14px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;border-radius: 3px;-webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);-moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);-o-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);background-color: white;border: 2px solid white;")
		layer.innerHTML = content;
	}
	return layer;
}