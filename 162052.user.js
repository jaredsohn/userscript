// ==UserScript==
// @name        torrentz jquery
// @namespace   torrentz jquery
// @include     http://torrentz.eu/*
// @grant       none
// @require     http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.8.0.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var g='';
//$(".results").after(g);
	$(".results dl dd .d").each(function(){ 
	var t=$(this); //t.prepend('<b>click here to load preview</b>').
	t.click(function(e){
	var xx=e.pageX-1100;//+
	var yy=e.pageY+10;
	var f=t.parent().parent().find("a");
	var g='<div id="googlepage" style="left:'+xx+"px;top:"+yy+'px;border: 2px solid #000000;height: 600px;position: absolute;" >';
	g+='<iframe name="20" src="http://images.search.yahoo.com/search/images;_ylt=A2KJkCFOrUBRzRkAQoCLuLkF?p='+f.text()+'&ei=utf-8&fr=sfp-img&fr2=&y=Search" width="1024" height="1500" marginheight="0" marginwidth="0" scrolling="no" align="middle"></iframe>';
	g+="</div>";
	$('body').append(g);
	//$("#googlepage").css({left:yy,top:xx}).html(t.text())
})
t.prev().click(function(e){$("#googlepage").remove() })

	
	})
	
//$("#googlepage").