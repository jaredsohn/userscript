// ==UserScript==
// @name           get ku6 swf share link
// @include        http://my.ku6.com/my_videos*
// @description    从Ku6获取Flash地址
// @author         congxz6688
// @require        http://code.jquery.com/jquery-latest.min.js
// @version        2012.7.11
// ==/UserScript==

var newDiv = $("<div>").appendTo($('.Sub_b1')[0]);
var newUl = $("<ul>", {class:"Sub_sidebar"}).appendTo(newDiv);
var newLi = $("<li>").appendTo(newUl);
var newAn = $("<a>", {"href":"#",click:gowork}).html("获取Flash链接").appendTo(newLi);

function gowork() {
	var anches=$('.lb_title');
	$('h3').each(function(uu){
		var flvUrl="[flash]"+anches[uu].href.replace("my.ku6","player.ku6").replace("watch?v=","refer/") + "/v.swf[/flash]";
		if($("#myid"+uu).length ==0){
			var newAAS=$("<div>",{html:"Flash: "}).css({"float":"right","color":"green"}).appendTo($(this));
			var newInput=$("<input>",{type:"text",id:"myid"+uu,size:"18",val:flvUrl,"readOnly":"readOnly",click:function(){$(this).select();}}).appendTo(newAAS);
		}
	})
}