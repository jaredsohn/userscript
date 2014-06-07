// ==UserScript==
// @name           AC Find
// @description    在ACFUN页面上增加按钮，直接下载视频、转换弹幕
// @match          http://www.acfun.tv/v/*
// @author         橙橙
// @version        1.0
// ==/UserScript==

(function(){
    var iSpan = document.createElement("span");
	iSpan.innerHTML = "&nbsp;/&nbsp;&nbsp;<form action='http://kagami.me/acfind/index.php' method='post' target='_blank' style='display:inline;margin:0;'><input type='hidden' name='url' value='"+document.URL+"' ><input type='submit' value='走你>>' style='height:20px;width:50px;border: 1px solid #CCC;background-color: #F7F2F2;font-weight: bold;color: #3F2FF7;'></form>";
    document.getElementById("subtitle-article").appendChild(iSpan);
})();