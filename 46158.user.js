// ==UserScript==
// @name           douban_opac
// @namespace      douban_opac v2.0
// @description    douban book links to XmuLibrary OPAC item
// @include        http://book.douban.com/subject/*
// @include        http://book.douban.com/isbn/*
// @author		   zhx@xmulib.org
// @require http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version v2.3
/* @reason 根据豆瓣新的页面布局做了修改，以正常显示图书馆书目信息 @end*/
// 2008-03-25 Adds links to OPAC in douban right banner menu 
// 2008-12-12 Adds Ajax to Check OPAC get book info.
// 2009-04-08 Adds Book Status 
// 2010-04-01 Adjust for New DOUBAN UI 
// 2010-11-27 Adjust for New DIV 
// ==/UserScript==

var thisScript = {
name: "douban_opac", //脚本名称，请自行修改
id: "46158", //脚本在userscripts.org的id，请自行修改
version:"2.3" // 当前脚本版本号，请自行修改
}
var updater = new Updater(thisScript); // 用thisScript对象创建一个更新器对象
updater.check(); //检查是否有更新
updater.setHoursToCheck(48); //设置更新时间

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

$(document).ready(function(){
	if ((window.location.href).indexOf("book.douban") > 0 ) {
		// get book title
		var title = $('h1').text();
		//title = encodeURI(title);
		// get book isbn
		$("#info  .pl").each(function(i){
			if ($(this).text() == 'ISBN:'){
			  var isbn = $(this)[0].nextSibling.nodeValue;
			  isbn = isbn.substr(1,13);
			  $.getJSON("http://210.34.4.28/api/getLOC.php?callback=?",{isbn:isbn,title:title},function(json){ //get json_data 
					if (json.marc_no != ""){
						var opacLink = "http://210.34.4.28/opac/item.php?marc_no="+json.marc_no;
						var htmlStr = "<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>";
						htmlStr += "<div class=indent><li><a href='"+opacLink+"' target='_blank'>厦门大学图书馆馆藏</a></li>";
						if (json.call_no !="")
						{	
							htmlStr += "<ul class='bs'>";
							try
							{
								for (i=0;i<json.Loc_NAME.length;i++)
								{
									htmlStr += "<li style='font-size:12px'>"+json.call_no+"&nbsp;&nbsp;"+json.Loc_NAME[i];	
									if (json.book_stat[i] == "在馆")
									{
										htmlStr += "&nbsp;&nbsp;<font color='#006600'>"+json.book_stat[i]+"</font></li>";
									}							
									else
										htmlStr += "&nbsp;&nbsp;<font color='red'>"+json.book_stat[i]+"</font></li>";
								} 
							}
							catch (e)
							{
							}
							
							htmlStr += "</ul></div></br>";
							
						}
						$(".aside div:eq(0)").after(htmlStr);
					}
					else if(json.marc_no=="" || json.title !=""){
						var opacLink = "http://210.34.4.28/opac/openlink.php?title="+json.title;
						var htmlStr = "<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>";
						htmlStr += "<div class=indent><li><a href='"+opacLink+"' target='_blank'>厦门大学图书馆馆藏</a></li></div>";
						$("#tablerm div:eq(0)").after(htmlStr);
					}
			  });
			  return false;
			}
		});
	}
});