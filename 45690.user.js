// ==UserScript==
// @name         Series Number for douban
// @require       http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @include      http://www.douban.com/*/top250*
// @include      http://www.douban.com/*/tag/*
// @include      http://www.douban.com/subject_search*
// @include      http://www.douban.com/movie/tv*
// @include      http://www.douban.com/*/recommended*
// @include      http://www.douban.com/*/mine*status=*
// @include      http://www.douban.com/*/chart*
// @include      http://www.douban.com/*/list/*?tag=*
// @version      0.5.2
// @description  去除豆列的编号
// under GPL 3.0 Lisence.
// ==/UserScript==
/*
  author:  zython
  contact: http://www.douban.com/people/zython/
  date:    2008-9-26
  updated: 2009-4-2
*/
//自动更新
var thisScript = {
  name: "Series Number for douban",
  id: "45690",
  version:"0.5.2"
};
var updater = new Updater(thisScript);
updater.setHoursToCheck(24);
updater.check();

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery;
}
function QueryString(item){
	var sValue=location.search.match(new RegExp("[\?\&]"+item+"=([^\&]*)(\&?)","i"));
	return sValue?sValue[1]:sValue;
} 
$(function() {
	start = Number(QueryString('start'));
    $('div.pl2 a').each(function(i){
        $(this).before((i + 1 + start)+". ");
    }); 
    $('li.nlst a').each(function(i){
        $(this).before((i + 1 + start)+". ");
    }); 
});