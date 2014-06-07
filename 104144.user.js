// ==UserScript==
// @name           douban_opac_scut
// @namespace      douban_opac v2.0
// @description    douban book links to scutLibrary OPAC item
// @include        http://book.douban.com/subject/*
// @include        http://book.douban.com/isbn/*
// @author	   socekin@gmail.com
// @thanks         zhx@xmulib.org
// @require http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version v1.2
/* @reason 根据豆瓣新的页面布局做了修改，以正常显示图书馆书目信息 @end*/

// ==/UserScript==

var thisScript = {
name: "douban_opac_scut", //脚本名称，请自行修改
id: "104144", //脚本在userscripts.org的id，请自行修改
version:"1.0" // 当前脚本版本号，请自行修改
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
			 					
						var opacLink1 = "http://202.38.232.10/ipac20/ipac.jsp?index=ALTITLE&term="+title;
						var opacLink2 = "http://202.38.232.10/ipac20/ipac.jsp?index=ISSBNEX&term="+isbn;
						var htmlStr = "<div id=buyinfo class=gray_ad><h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>";
						htmlStr += "&gt; <a href='"+opacLink2+"' target='_blank'>SCUT图书馆馆藏(准确)</a>";
						htmlStr += "<br/>&gt; <a href='"+opacLink1+"' target='_blank'>SCUT图书馆馆藏(模糊)</a></div>";

						$(".aside div:eq(0)").after(htmlStr);
								
			}
		});
	}
});