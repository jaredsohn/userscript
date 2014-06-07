// ==UserScript==
// @name           dev_hide_critique
// @namespace      dev_hide_critique
// @description    shortens critiques until you click them
// @include        http://*.deviantart.com/*
// @author         dediggefedde
// @version        1.5
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/122330.meta.js
// ==/UserScript==

(function(){
var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
var pdown="data:image/gif;base64,R0lGODlhEAAQAMIHACkwMDI6OjQ9PUFNTFVlY2FycWR2df%2F%2F%2FyH%2BEUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAcALAAAAAAQABAAAAMteLrc%2FjCyIKqtIAOjyPhg%2BHGdKJKlCaKpyS7eCcXhy9CD3cT6PkqwAnBIXCQAADs%3D";
var pup="data:image/gif;base64,R0lGODlhEAAQAMIHACkwMDI6OjQ9PUFNTFVlY2FycWR2df%2F%2F%2FyH%2BEUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAcALAAAAAAQABAAAAMoeLrc%2FnABEhkYg9Zz8%2B6Y9oCYN5alaKGoyrGsSsLiDJtGru%2F75v%2B%2FBAA7";
var critique_text=new Array();

$(document).ready(init);

function init(){
	if(($("#gmi-ResViewSizer_img").length || $("div[collect_rid]").length) && !$("#artist-comments").length){setTimeout(init,500);return;}
	
	$(".ccomment.grf-stream .critique").css({"height":"1.5em","min-height":"1.5em","overflow":"hidden"});
	$(".ccomment.grf-stream .critique_feedback").css("display","none");
	$(".ccomment.grf-stream .ratings").css({"height":"38pt","min-height":"38pt","overflow":"hidden","display":"block"});
	$(".ccomment.grf-stream .gr").css({"min-height":"5em","height":"5em"});
	
	$(".ccomment.grf-stream .critique").each(function(){
		critique_text.push($(this).html());
		$(this).html($(this).html().replace(/<.*?>/g,"").substr(0,100)+"[Read more]");
	});
	$(".ccomment.grf-stream .gr-body").append("<div class='dev_crit_hide'><span>click to see more</span><br><img src="+pdown+" alt='read more!'/></div>");
	$(".ccomment.grf-stream .dev_crit_hide").css({"text-align":"center","cursor":"pointer","color":"#196BA7"});
	
	var i=0;
	$(".ccomment.grf-stream .dev_crit_hide").each(function(){
		$(this).attr("crit_id",i);
		i++;
	});
	$(".ccomment.grf-stream .dev_crit_hide").attr("visible","0")
	$(".ccomment.grf-stream .dev_crit_hide").click(blend);
}
function blend(){
	var i = $(this).attr("crit_id");
	if($(this).attr("visible")=="0"){
		$(this).parent().find(".critique").css({"height":"","min-height":"","overflow":""});
		$(this).parent().find(".critique_feedback").css("display","");
		$(this).parent().find(".ratings").css({"height":"","min-height":"","display":"","overflow":""});
		$(this).parent().find(".gr").css({"min-height":"","height":""});
		$(this).attr("visible","1");
		this.parentNode.getElementsByClassName("critique")[0].innerHTML=critique_text[i];
		
		$(this).parent().find(".critique").html(critique_text[i]);
		$(this).children("img").attr("src",pup);
		$(this).children("span").html("click to see less");
	}else{
		$(this).attr("visible","0");
		$(".ccomment.grf-stream .critique").css({"height":"1.5em","min-height":"1.5em","overflow":"hidden"});
		$(".ccomment.grf-stream .critique_feedback").css("display","none");
		$(".ccomment.grf-stream .ratings").css({"height":"28pt","min-height":"28pt","overflow":"hidden","display":"block"});
		$(".ccomment.grf-stream .gr").css({"min-height":"5em","height":"5em"});
		
		critique_text[i]=$(this).parent().find(".critique").html(); 
		$(this).parent().find(".critique").html($(this).parent().find(".critique").html().replace(/<.*?>/g,"").substr(0,100)+"[Read more]");
		$(this).children("img").attr("src",pdown);
		$(this).children("span").html("click to see more");
	}
}
})();