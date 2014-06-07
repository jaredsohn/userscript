// ==UserScript==
// @name			doubanXDU
// @namespace		doubanXDU
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			v1.1
// @include			http://book.douban.com/subject/*
// @author		        iseansay@gmail.com
// ==/UserScript==









var xidianbook = function(){
         function insertfind(title)
{
	var openLink = "http://innopac.lib.xidian.edu.cn/search/t?SEARCH="+title;
	var htmlStr = "<h2>在西电借这本书 </h2>";
	htmlStr += '<div class="indent"><a href='+openLink+' target="_blank" title="点击前往图书馆搜索">到学校图书馆搜索《'+ title +'》</a></div>';
	$(".aside").prepend(htmlStr);
}


	// get book title
	var title = $('h1 span').text();
	//提前是为了防止出现没有isbn的书
	var isbn = null;
	//title = encodeURI(title);
	// get book isbn
       	$("#info .pl").each(function(i){
		if ($(this).text() == 'ISBN:'){
			isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);
		}})
      
	var url = 'http://bigeagle.me/xdulib/xdulib.php?isbn='+isbn;
	
     $.ajax(
		{
			type : 'GET',
			dataType : 'script',
			url : url,
			success : function() {
                     
				if( json.ok > 0 ) {
				 	var openLink = 'http://innopac.lib.xidian.edu.cn/search/i?SEARCH='+isbn;
						var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
						htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息">前往西电图书馆</a></h4>';

						htmlStr += '<ul class="bs">';
						try
						{
							for (i=0;i<json.ok;i++)
							{
								htmlStr += '<li><span style="float:left">&nbsp;图书编号 : '+json.data[i].i+'</span><span style="float:right">'+json.data[i].s+'</span><br /><span style="clear:both">馆藏地点: '+json.data[i].place+"</span></li>";
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
		}
	);
}
function contentEval( source ) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
 contentEval( xidianbook );