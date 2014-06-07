//reddit Later
//Version 2.0
//By Jeremy Satterfield
//Released under
//Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License
//http://creativecommons.org/licenses/by-nc-sa/3.0/

//Adds a button to your Digg pages to save a link
//to the Digg in your Instapaper.com account for
//later review without having to digg it.

// ==UserScript==
// @name          reddit Later on Instapaper
// @namespace     http://jsatt.blogspot.com
// @description   Adds a "Read Later" link to quickly post to Instapaper.com.
// @include       http://reddit.com/*
// @include       http://www.reddit.com/*
// ==/UserScript==

//To allow single click saves to instapaper, 
//paste your customized bookmark from instapaper below;
var bookmark = "paste your bookmark here";

//the script will do the rest...
$ = unsafeWindow.jQuery;

if(bookmark.length > 25){
	var ukey=/k=[\w\d]+&u=/.exec(bookmark)[0].replace(/k=/,"").replace(/\&u=/,"");;
}else{
	var ukey='';
}

$(function(){
	$('.entry').each(function(){
		var ttl = $(this).children('p.title').children('a.title').text();
		var url = $(this).children('ul.flat-list').children('li.first').children('a.comments').attr('href');
		$("<a></a>")
			.attr("href","javascript:var%20doc=document,win=window,ws=win.getSelection,ds=doc.getSelection,ss=doc.selection,sel=(ws?ws():(ds)?ds():(ss?ss.createRange().text:0)),bu='http://www.instapaper.com/b',loc=doc.location,en=encodeURIComponent,pu='?v=4&k="+ukey+"&u='+en('"+url+"')%20+'&t='+en('reddit.com: "+ttl.replace(/\'/gi,"\\\'")+"')%20+'&s='+en(sel),url=bu+pu;try{if(!/^(.*\.)?instapaper([^.]*)?$/.test(loc.host))throw(0);iptstbt();}catch(z){op%20=function(){if(!win.open(url,'t','toolbar=0,resizable=0,status=1,width=250,height=150'))loc.href=url;};if(/Firefox/.test(navigator.userAgent))setTimeout(op,0);else%20op();}void(0)")
			.html("read later")
			.addClass("option")
			.addClass("active")
			.appendTo(
				$("<li></li>")
				.addClass("readLater")
				.appendTo(
					$(this).children("ul.flat-list")
				)
			);
	})
})