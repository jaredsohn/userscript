// ==UserScript==
// @name         Douban Subject
// @require       http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         zython
// @include      http://movie.douban.com/subject/*
// @include      http://music.douban.com/subject/*
// @include      http://book.douban.com/subject/*
// @version        0.8.3
// under GPL 3.0 Lisence.
/* @reason
适应豆瓣新版界面
 @end*/
// ==/UserScript==

var thisScript = {
  name: "Douban Subject",
  id: "34574",
  version:"0.8.3"
};
var updater = new Updater(thisScript);
updater.setHoursToCheck(24);
updater.check();
if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery;
}
//get the seleted text in this page
function getSelectedText() {
  if (window.getSelection) {
    // This technique is the most likely to be standardized.
    // getSelection() returns a Selection object, which we do not document.
    return window.getSelection().toString();
  }
  else if (document.getSelection) {
    // This is an older, simpler technique that returns a string
    return document.getSelection();
  }
  else if (document.selection) {
    // This is the IE-specific technique.
    // We do not document the IE selection property or TextRange objects.
    return document.selection.createRange().text;
  }
}

//add css
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function addSearch(type,is)
{
  var keyword = '';
  addGlobalStyle('#myDouban { text-align:left; position: fixed; z-index: 32767; top: 0; left: 0; padding: 0 0 0 20px; min-height: 20px; background: 2px 2px url("chrome://browser/skin/Search-glass.png") no-repeat; }');
  addGlobalStyle('#myDouban:hover { padding: 0; }');
  addGlobalStyle('#myDouban > div { display: none; }');
  addGlobalStyle('#myDouban:hover > div { display: block; padding: 1px 0; background: #f8f8f8; -moz-border-radius: 0 0 0 10px; border: solid #ccc; border-width: 0 1px 1px 0; }');
  addGlobalStyle('#myDouban a { margin: 4px 0; padding: 0 10px;  font-family: "Verdana"; font-size: 12px; line-height: 16px; font-weight: normal; color: #669; text-decoration: underline; background: #f8f8f8; border: 0; }');
  addGlobalStyle('#myDouban a:hover { color: #f66; }');

//create new element
  var myDouban = document.createElement('div');
  myDouban.setAttribute('id', 'myDouban');
  document.body.appendChild(myDouban);

  var mySearch = document.createElement('div');
  mySearch.setAttribute('id', 'mySearch');
  myDouban.appendChild(mySearch);
  mySearch.innerHTML += '<a id="cancel">清空</a><a id="search">搜索</a><br>';
  mySearch.innerHTML += '<input type="checkbox" id="guge"><a href="http://www.google.cn/search?q=">谷歌</a><br>';
  mySearch.innerHTML += '<input type="checkbox" id="weijibaike"><a href="http://zh.wikipedia.org/wiki/">维基百科</a><br>';
  mySearch.innerHTML += '<input type="checkbox" id="douban"><a href="http://www.douban.com/subject_search?search_text=">豆瓣</a><br>';
  mySearch.innerHTML += '<input type="checkbox" id="verycd"><a href="http://www.verycd.com/search/folders/">VeryCD</a><br>';
  mySearch.innerHTML += '<input type="checkbox" id="xunlei"><a href="http://www.gougou.com/search?search=">迅雷</a><br>';
  mySearch.innerHTML += '<input type="checkbox" id="baidu"><a href="http://www.baidu.com/baidu?ie=utf-8&wd=">百度</a><br>';
  mySearch.innerHTML += '<input type="checkbox" id="wikipedia"><a href="http://wwww.wikipedia.org/wiki/">wikipedia</a><br>';
  //var type = $('.now').attr('href');
  var type = window.location.href.split('.')[0].split('//')[1]
  if (type=='movie')
  {
    mySearch.innerHTML += '<b>视频</b><br>';
    mySearch.innerHTML += '<input type="checkbox" id="googlevideo"><a href="http://video.google.cn/videosearch?q=">谷歌</a><br>';
    //mySearch.innerHTML += '<input type="checkbox" id="imdb"><a href="http://www.imdb.com/find?s=all&q=">imdb</a><br>';
    //mySearch.innerHTML += '<a href="" src="http://video.baidu.com/v?ie=utf-8&word=">百度</a>';
    mySearch.innerHTML += '<input type="checkbox" id="tudou"><a href="http://so.tudou.com/psearch/">土豆</a><br>';
    mySearch.innerHTML += '<input type="checkbox" id="youku"><a href="http://so.youku.com/search_video/q_">优酷</a><br>';
    mySearch.innerHTML += '<input type="checkbox" id="funshion"><a href="http://www.funshion.com/search_media/search?word=">风行</a><br>';
    mySearch.innerHTML += '<input type="checkbox" id="youtube"><a href="http://www.youtube.com/results?search_query=">youtube</a><br>';
    mySearch.innerHTML += '<input type="checkbox" id="mtime"><a href="http://www.mtime.com/search/movie?">时光网</a><br>';
    mySearch.innerHTML += '<input type="checkbox" id="shooter"><a href="http://shooter.cn/search/Sub:">射手网</a><br>';
  }
  else if(type=='book')
  {
    var obj = document.getElementById('info');
    var div = obj.getElementsByTagName('div')[0];
    childnode = div.childNodes;
    for (var i=0; i < childnode.length-1; i++)
    {   
    if ( childnode[i].innerHTML == "ISBN:" )
    break;
    }
    i++;
    var isbn = childnode[i].data;
    isbn =isbn.substr(1,14);
    mySearch.innerHTML += '<b>读书</b><br>';
    //mySearch.innerHTML += '<a href="" src="http://www.ifanshu.com/book/#,t=">矮番薯</a>';
    mySearch.innerHTML += '<input type="checkbox" id="sina"><a href="http://douban2gbk.appspot.com/?site=sina&q=">新浪</a><br>';
    mySearch.innerHTML += '<input type="checkbox" id="sohu"><a href="http://douban2gbk.appspot.com/?site=sohu&q=">搜狐</a><br>';
    if (isbn)
    {
        mySearch.innerHTML += '<input type="checkbox" id="google-books"><a href="http://books.google.com/books?vid=ISBN'+isbn+'">google book</a><br>';
    }
    mySearch.innerHTML += '<input type="checkbox" id="gougou-book"><a href="http://book.gougou.com/search?restype=3&search=">迅雷</a><br>';
  }
  else if(type=='music')
  {
    mySearch.innerHTML += '<b>音乐</b><br>';
    mySearch.innerHTML += '<input type="checkbox" id="last.fm"><a href="http://cn.last.fm/search?m=all&q=">last.fm</a><br>';
    mySearch.innerHTML += '<input type="checkbox" id="gougou-music"><a href="http://mp3.gougou.com/search?search=">迅雷音乐</a><br>';
    mySearch.innerHTML += '<input type="checkbox" id="baidu-mp3"><a href="http://mp3.baidu.com/m?word=">百度mp3</a><br>';
  }
  $('#cancel').click(function (){
	$('#mySearch input[type="checkbox"]').attr("checked", false);
	return false;
  });
  $('#search').click(function (){
	keyword = '';
    if (window.getSelection) {
      // This technique is the most likely to be standardized.
      // getSelection() returns a Selection object, which we do not document.
      keyword = window.getSelection().toString();
    }
    else if (document.getSelection) {
      // This is an older, simpler technique that returns a string
      keyword = document.getSelection();
    }
    else if (document.selection) {
      // This is the IE-specific technique.
      // We do not document the IE selection property or TextRange objects.
      keyword = document.selection.createRange().text;
    }
    if (!keyword)
    {
      keyword = title;
    }
	$('#mySearch input[checked]').each(function(){
      window.open($(this).next('a').attr("href")+encodeURI(keyword));
	});
	return false;
  });
  $('#mySearch a').click(function (){
    keyword = '';
    if (window.getSelection) {
      // This technique is the most likely to be standardized.
      // getSelection() returns a Selection object, which we do not document.
      keyword = window.getSelection().toString();
    }
    else if (document.getSelection) {
      // This is an older, simpler technique that returns a string
      keyword = document.getSelection();
    }
    else if (document.selection) {
      // This is the IE-specific technique.
      // We do not document the IE selection property or TextRange objects.
      keyword = document.selection.createRange().text;
    }
    if (!keyword)
    {
      keyword = title;
    }
    if ($(this).attr("href"))
    {
      window.open($(this).attr("href")+encodeURI(keyword));
    }
	return false;
  });
}
var title = $('h1:first').text();
$(function() {
  //海报
  $('#mainpic').append('<p class="gact" align="center"><a href="update_image" rel="nofollow">封面</a></p>');
  //search
  addSearch();
});