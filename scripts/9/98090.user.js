// ==UserScript==
// @name			douban_TJU
// @namespace		        douban_TJU
// @version			v1.0
/* @reason
	init version, based on douvban for hust greasemonkey
@end*/
// @include			http://book.douban.com/subject/*
// @include			http://book.douban.com/isbn/*
// @author			vigardt@gmail.com
// @thankto			zhx@xmulib.org
//
// ==/UserScript==


/*
	插入到图书馆也没查找链接
	因为部分图书没有ISBN
	将可能有重复使用的部分抽离出来
*/

//this file is insert to document tail for request ajax data
//
function insertfind(title)
{
	var openLink = "http://webpac.lib.tongji.edu.cn/opac/openlink.php?historyCount=1&strText="+title+"+&doctype=ALL&strSearchType=title&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&dept=ALL";
	var htmlStr = "<h2>在同济大学借这本书  ·  ·  ·  ·  ·  · </h2>";
	htmlStr += '<div class="indent"><a href='+openLink+' target="_blank" title="点击前往图书馆搜索">到学校图书馆搜索《'+ title +'》</a></div>';
	$(".aside").prepend(htmlStr);
}


$(document).ready(function(){
	// get book title
	var title = $('h1').text();
	//提前是为了防止出现没有isbn的书
	var isbn = null;
	//title = encodeURI(title);
	// get book isbn
	$("#info .pl").each(function(i){
		if ($(this).text() == 'ISBN:'){
			isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);
			console.log(isbn);
			
			url = 'http://210.42.106.193/bookp.php?isbn=' + isbn + '&jsoncallback=?';
			$.getJSON(url, null,
				function(data){
					console.log(data.ok);
					if (data.ok > 0) {
						var openLink = 'http://webpac.lib.tongji.edu.cn/opac/openlink.php?historyCount=1&strText='+isbn'&doctype=ALL&strSearchType=isbn&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&dept=ALL';
						var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
						htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息">前往同济大学图书馆</a></h4>';
						
						htmlStr += '<ul class="bs">';
						try
						{
							for (i=0;i<data.ok;i++)
							{
								htmlStr += '<li><span style="float:left">&nbsp;索 书 号 : '+data.data[i].i+'</span><span style="float:right">'+data.data[i].s+'</span><br /><span style="clear:both">馆藏地点: '+data.data[i].place+"</span></li>";
							} 
						}
						catch (e)
						{
						}
						
						htmlStr += '</ul></div></br>';

						$(".aside").prepend(htmlStr);
					} else {
						insertfind(title);
					}
					
				}
			);
		}
	});
	if(isbn == null) insertfind(title);

});
