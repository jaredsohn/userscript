// ==UserScript==
// @name        bitsnoop jquery
// @namespace   bitsnoop jquery
// @include     http://bitsnoop.com/*
// @grant       none
// @require     http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.8.0.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var g='';
//$(".results").after(g);
//alert('test');
	$("#torrents li a").each(function(){ var t=$(this);//alert(t.html());
	t.prev().click(function(e){
	var xx=e.pageX+10;//+
	var yy=e.pageY+40;
	var f=t;//alert(f.text());
	var g='<div id="googlepage" style="left:'+xx+"px;top:"+yy+'px;border: 2px solid #000000;height: 600px;position: absolute;" >';
	g+='<iframe name="20" src="http://images.search.yahoo.com/search/images;_ylt=A2KJkCFOrUBRzRkAQoCLuLkF?p='+f.text()+'&ei=utf-8&fr=sfp-img&fr2=&y=Search" width="1024" height="1500" marginheight="0" marginwidth="0" scrolling="no" align="middle"></iframe>';
	g+="</div>";
	$('body').append(g);
	//$("#googlepage").css({left:yy,top:xx}).html(t.text())
})
t.next().click(function(e){$("#googlepage").remove() })

	
	})


