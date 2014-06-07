// ==UserScript==
// @name			douban_GDUT
// @namespace		douban_GDUT
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			v1.0
/* @reason
	看广工没有就做了个自己的后台，js是用几位前辈的，不用大改了，大家凑合着用
*   正则还不够强大，在某些书籍上面出现的问题蛮多的，先上线测试下吧，以后再改
@end*/
// @include			http://book.douban.com/subject/*
// @include			http://book.douban.com/isbn/*
// @author			freefcw@gmail.com
// @thankto			zhx@xmulib.org
// 2009-01-04 Adds Ajax to get book info.
//
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_GDUT", //脚本名称，请自行修改
id: "97212", //脚本在userscripts.org的id，请自行修改
version:"1.0" // 当前脚本版本号，请自行修改
}

var updater = new Updater(thisScript); // 用thisScript对象创建一个更新器对象
updater.check(24); //检查是否有更新

/*
	插入到图书馆也没查找链接
	因为部分图书没有ISBN
	将可能有重复使用的部分抽离出来
*/
function insertfind(title,/*optional*/jsonTitle)
{	
	var openLink;
	 if(jsonTitle){
	 	openLink= "http://222.200.98.171:81/searchresult.aspx?anywords="+jsonTitle;
	 }else{
	 	openLink= "http://222.200.98.171:81/searchresult.aspx?anywords="+title;
	 }
	var htmlStr = "<h2>在广工借这本书  ·  ·  ·  ·  ·  · </h2>";
	htmlStr += '<div class="indent"><a href='+openLink+' target="_blank" title="点击前往图书馆搜索">到学校图书馆搜索《'+ title +'》</a></div>';
	$(".aside").prepend(htmlStr);
}
	
$(document).ready(function(){
	// get book title
	var title = $('h1 span').text();
	//提前是为了防止出现没有isbn的书
	var isbn = null;

	//title_uri = encodeURI(title);
        //title_uri=encodeURI(title_uri);
	// get book isbn
	$("#info .pl").each(function(i){
		if ($(this).text() == 'ISBN:'){
			isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);

			setTimeout(function(){GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.zhkzyth.com/GDUT.php?isbn='+isbn+'&title='+title,//在自己的服务器上写了个访问的文件，负责数据的获取和转换
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
				},
				onload: function(res) {
					//GM_log( 'http://210.42.106.193/getbook.php?isbn='+isbn + ' status:'+ res.status);
					
					var json = eval('('+res.responseText+')');
					//这里没有用json的格式转换服务，应该在服务器那边完成相关的一些功能了
					//服务器端完成json格式的数据，发回给客户端就ok了

					if (json.ok > 0 ){			
						var openLink = 'http://222.200.98.171:81/searchresult.aspx?anywords='+json.title;
						var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
						htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息">前往广东工业大学图书馆</a></h4>';

						htmlStr += '<ul class="bs">';
						try
						{
							for (i=0;i<json.ok;i++)
							{
								htmlStr += '<li><span style="float:left">&nbsp;索 书 号 : '+json.data[i].i+'</span><span style="float:right">'+json.data[i].s+'</span><br /><span style="clear:both">馆藏地点: '+json.data[i].place+"</span></li>";
							} 
						}
						catch (e)
						{
						}
						
						htmlStr += '</ul></div></br>';

						$(".aside").prepend(htmlStr);
					}
					else{
						//GM_log('no such book');
						insertfind(title,json.title);
					}
				}
			})},500);
		}
	});
	//如果不存在isbn，跳转的title也无法被编码，再写个请求也无法达到想要的效果，而且实现起来也比较麻烦的样子，以后再改进好了
	if(isbn == null) insertfind(title);
});