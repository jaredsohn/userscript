// ==UserScript==
// @id			   www.hhcomic.com-1431b497-4508-4928-b3cb-9223875a0792@scriptish
// @name		   Autopage for hhcomic
// @version		   1.0
// @namespace	   
// @author		   
// @description	   
// @include		   http://www.hhcomic.com/*
// @run-at		   document-end
// @require		   http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js
// ==/UserScript==

var uw = unsafeWindow;
var currpage = parseInt(uw.page);
//var nextpage = parseInt(currpage)+1;
var totalpage = parseInt(uw.datas);
var server = uw.server;
var arrPicListUrl = uw.PicListUrl.split('|');
var datas = uw.arrPicListUrl.length;
var ServerList = uw.ServerList;
var nextPicList = [];
for(i=0;i<datas;i++)
{
    if(i+1 >=currpage)
    {
		nextPicList.push(arrPicListUrl[i]);
    }
}

var i = 0;
var content = $("img[id=ComicPic]:last");
function addnext()
{
	if (i>=nextPicList.length) return;
	var imgurl = ServerList[server-1] + nextPicList[i];
	content = $("<img/>").attr("src",imgurl).attr("id","ComicPic");
	$("img[id=ComicPic]:last").after("<p>Page:"+(currpage+i+1)+"</p>",content);
	++i;
}
function loadOnScroll() {
	if (content.offset().top + content.height() < $(document).scrollTop() + $(window).height()) {
		addnext();
	}
}
$(window).scroll(loadOnScroll);