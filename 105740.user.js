// ==UserScript==
// @name          PTTViewer
// @namespace     PTTViewer
// @description   更方便地瀏覽PTT BBS網頁板。More convenient to browse Web PTT BBS. 
// @author        tomin
// @include       http://www.ptt.cc/*
// @grant         GM_xmlhttpRequest
// @grant         GM_info
// @updateURL     http://userscripts.org/scripts/source/105740.meta.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version       0.39
// ==/UserScript==

// Fix Greasemonkey 1.0 + jQuery: Broken, with Workaround 
// @see http://wiki.greasespot.net/@grant 
// @see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html
this.$ = this.jQuery = jQuery.noConflict(true);

var $, userscript = {
	ver: "0.39",
	scriptId: '105740',
	scriptHome: "http://userscripts.org/scripts/show/105740" 
};

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    main();
  }, false);
  document.body.appendChild(script);
}
 
// load jQuery and execute the main function
addJQuery();


function main(){
	//if(!document.location.href.match(/http:\/\/www\.ptt\.cc\/.+/i))return;
	//parseURL();	
	//parseShortURL();
	parseLast();
	customize();
	hotboard();
	skipEmptyArticle();	
}
function hotboard(){
	var boards = "";
	$.ajax({
	  url: "http://www.ptt.cc/hotboard.html",
	  dataType: "html",
	  success: function(data){			
		$(data).find("dl tr td:nth-child(2)").each(function(){			
			boards += $(this).html();
		});	
		$("#nav>li:eq(3)").append(boards);
	  }
	});	
}
function reset(){
	$("#tools").show();
	$("#mainContent").css({"position":"", "margin":"","padding-left":"0.12em"} );	
}
function go(e){ 
	location.href = "/bbs/" + $("#board").val() + "/index.html";
	e.preventDefault();
}
function jumpArticle(list, start, move){
	var url = "";
	$.ajax({
	  url: list,
	  beforeSend: function(xhr){
		xhr.overrideMimeType('text/html; charset=big5');
	  },
	  cache: true,
	  success: function(data){
		var count = 0;
		var first = $(data).find("dl tr td a:first").parents("dd");
		var last = $(data).find("dl tr td a:last").parents("dd");
		var current = $(data).find("dl tr td a[href*='"+start+"']").parents("dd");
		if(!start && move === "prev") current = last;
		else if(!start && move === "next") current = first;

		while(true){
			if(move === "prev"){
				if(start){
					current = current.prev();
				}else{
					start = "";
				}
				url = current.find("td:eq(3) a").prop("href");
			}else if(move === "next"){
				if(start){
					current = current.next();
				}else{
					start = "";
				}				
				url = current.find("td:eq(3) a").prop("href");
			}else if(move === "nextInit"){
				if(last.html()===current.html()){
					var nextPage = $("#finds p a:contains('下一篇')");
					nextPage.click(function(){
						var paraPage = location.href.match(/p=(\d+)/);
						if(paraPage){
							var p = parseInt(paraPage[1])+1;
							location.href = "index" + p + ".html";
						}else{
							location.href = "index.html";
						}
						return false;
					});			
				};			
				current = current.next();
				url = current.find("td a").prop("href");
			}else if(move === "prevInit"){
				if(first.html()===current.html()){
					var prevPage = $("#finds p a:contains('前一篇')");
					prevPage.click(function(){
						var paraPage = location.href.match(/p=(\d+)/);
						if(paraPage){
							var p = parseInt(paraPage[1])-1;
							location.href = "index" + p + ".html";
						}else{
							location.href = "index.html";
						}
						return false;
					});			
				};
				current = current.prev();				
				url = current.find("td a").prop("href");
			}
			count++;

			if(url && !url.match(/deleted/)) break;
			
			var MAX_SEARCH = 10;
			if(count > MAX_SEARCH) break;
		}		

		if(!url){
			var pageURL = "";

			if(move === "prev"){
				pageURL = $(data).find("#prodlist a:contains('上一頁')").prop('href');				
				url = jumpArticle(pageURL, null, "prev");	
			}else if(move === "next"){
				pageURL = $(data).find("#prodlist a:contains('下一頁')").prop('href');
				url = jumpArticle(pageURL, null, "next");
			}		
		}

		var paraPage = location.href.match(/p=(\d+)/);
		var nextPage = $("#finds p a:contains('下一篇')");
		var prevPage = $("#finds p a:contains('前一篇')");
		
		if(move === "prev" || move === "prevInit"){
			if(url){
				prevPage.prop("href",function(){
					if(paraPage)
						return url +  "?p=" + paraPage[1];
				});
			}			
			
			if(!url && paraPage) {
				var p = parseInt(paraPage[1])-1;
				prevPage.append("(已經是本頁首篇)");
				prevPage.prop("href", "index" + p + ".html");
			}		
		}
		if(move === "next" || move === "nextInit"){
			if(url){
				nextPage.prop("href",function(){
					if(paraPage)
						return url +  "?p=" + paraPage[1];
				});
			}
			if(!url && paraPage) {
				var p = parseInt(paraPage[1])+1;
				nextPage.append("(已經是本頁最後一篇)");
				nextPage.prop("href", "index" + p + ".html");
			}			
		}
	  }	  
	});
}
function skipEmptyArticle(){
	var start = location.href.replace(/[\s\S]+cc/,"").replace(/\?p=\d+/,"");
	var nextPage = $("#finds a:contains('下一篇')");
	var prevPage = $("#finds a:contains('前一篇')");
	var nextURL = nextPage.prop("href");
	var prevURL = prevPage.prop("href");
	var listPage = location.href.match(/index(\d+)/);
	var homePage = location.href.match(/index\.htm/);
	var paraPage = location.href.match(/p=(\d+)/);
	var postList = $("#finds p a:contains('文章列表')");
	
	if(listPage || homePage){
		var page = "1";
		if(listPage) page = listPage[1];		
		if(homePage) page = $("#prodlist h2").text().match(/(\d+)/)[1];

		$("#prodlist dd a").each(function(){
			var href = $(this).prop("href") + "?p=" + page;
			$(this).prop("href", href);
		});			
	}
	if(paraPage){
		postList.prop("href", "index" + paraPage[1] + ".html")
	}else{
		postList.prop("href", "index.html")
	}
	var list =  postList.prop("href");

	if(nextURL){		
		jumpArticle(list, start, "nextInit");
	}
	if(prevURL){
		jumpArticle(list, start, "prevInit");		
	}
}
function customize(){	
	$("img").css("max-width","40em");
	$("#tools").hide();
	$("#finds h2").hide();
	$("#finds p a:first:contains('精華區')").hide();
	$("table:contains('人氣：') td:nth-child(4)").hide();//hotboard
	$("table tr a[href*=deleted]").parents("tr").hide();
		
	$("td:contains('人氣')").css("width","130");
	$("#nav>li:eq(1)>ul li:first").hide();
	$("#nav>li:eq(1):contains('佈告欄')>ul").append("<li><a href='/bbs/Songs/index.html'> Songs</a></li>");
	$("#nav").prepend("<ul><li>看板:<form name='go' id='go'><input style='width:5em' id='board' type='text' value='joke' /><input type='submit' value='Go' /></form></li></ul>");
	$("#go").bind("submit",function(e){	
		go(e);
	});		
	$("#board").bind("focus",function(){
		$(this).prop("isfocus",true);
	}).bind("blur",function(){
		$(this).prop("isfocus",null);
	})
	$("#nav>li:eq(2)").hide();
	
	var buttons =  "<ul><li><input type='button' id='check' value='檢查是否有新版本' /></li></ul>"
				 + "<ul><li><input type='button' id='visit' value='前往PTTViewer官網' /></li></ul>"
				 + "<ul><li><input type='button' id='reset' value='顯示PTT上方工具列' /></li></ul>";
	$("#nav").append(buttons);
	var check = document.getElementById('check');
	if(check) check.addEventListener('click',checkScriptUpdate,false);
	$("#visit").bind("click",function(){
		location.href = userscript.scriptHome;
	});	
	$("#reset").bind("click", function(){
		reset();
	});		
	$("#mainContent").css({"position":"absolute", "margin":"0", "padding":"0" , "top":"-102px", "left":"225px", "width":"44em", "font-size": "1.4em"} );
	$("pre").css({"margin":"0", "padding":"0"} );
}
function parseShortURL(){
	var pre = $("pre").html();
	if(!pre)return;
	var link = pre.match(/<a href=.+<\/a>/g);

	if( link ){
		$.each( link, function(key, value) { 
			var url = value.match(/[^"]+((ppt\.cc)|(goo\.gl)|(tinyurl\.com)|(0rz\.tw)|(flic\.kr))[^"]+/);
			if(!url)return;

			$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22' + url[0] + '%22&format=json&diagnostics=true&callback=?', function(data) {
				if( !data.query )return;
			    var redirect = data.query.diagnostics.redirect;
			   
			    if( redirect ){
					var realURL = redirect.content;
					if( value.match(/flic\.kr/) ){
						realURL = redirect[0].content;
					}
					if( realURL!= null ){
						$("pre").html( $("pre").html().replace(new RegExp(url[0],""),  realURL) );
						multiMedia();
					}				   
				}else{					
					if( url[0]!=null && url[0].match(/ppt/) ){
						pre = pre.replace(value, '<span style=color:#ccc><a href="' + url[0] + '" target=_blank>' + url[0] + '</a>#</span><br/><img src="' + url[0] + '@.jpg" />');
						$("pre").html( pre );
					}
				}				
			});
		});
	}
}
function parseURL(){
	var _content = $("pre").html();
	if(_content!=null){		
		_content = _content.replace(/(https?:\/\/(?!w+\.youtube\.com)[\w-\.]+(:\d+)?(\/[\w\.\/%\&\=;\-~:@\,(!]*)?(\?\S*)?(#\S*)?)/g,"<a href='$1' target='_blank'>$1</a>");				
		$("pre").html( _content );
		multiMedia();
	}	
}
function multiMedia(){
	var _content = $("pre").html();
	//video or sound
	//_content = _content.replace(/<a href=[^>]+\/\/(\w+\.youtube\.[^\/]+)\/watch\/?\?[^>]*v=([^>"&\']+)[^>]+>[^<]+<\/a>/g, '<iframe width="640" height="400" src="http://$1/v/$2&hl=en&fs=1" frameborder="0" allowfullscreen></iframe>');				
	_content = _content.replace(/<a href=[^>]+\/\/(youtu\.be)\/([^>"&\']+)[^>]+>[^<]+<\/a>/g, '<iframe width="640" height="400" src="http://www.youtube.com/embed/$2" frameborder="0" allowfullscreen></iframe>');		
	_content = _content.replace(/<a href=[^>]+\/\/(\w+\.youtube\.[^\/]+)\/playlist\?p=PL([^>"&\']+)[^>]+>[^<]+<\/a>/g, '<iframe width="640" height="400" src="http://$1/p/$2&hl=en&fs=1" frameborder="0" allowfullscreen></iframe>');			
	_content = _content.replace(/<a href=[^>]+\/\/(vimeo\.com)\/([^>"&\']+)[^>]+>[^<]+<\/a>/g, '<iframe src="http://player.vimeo.com/video/$2?title=0&amp;byline=0&amp;portrait=0" width="640" height="400" frameborder="0"></iframe>');		
	_content = _content.replace(/<a href=[^>]+\/\/(mymedia\.yam\.[^\/]+)\/\w{1}\/([^>"&\']+)[^>]+>[^<]+<\/a>/g, '@$&<br/><object width="450" height="120"><param name="movie" value="http://mymedia.yam.com/*/$2"></param><param name="quality" value="high"></param><param name="wmode" value="transparent"></param><embed src="http://mymedia.yam.com/*/$2" quality="high" type="application/x-shockwave-flash" wmode="transparent" width="450" height="120"></embed></object>');
	_content = _content.replace(/<a href=[^>]+\/\/(\w+\.xiami\.[^\/]+)\/\w+\/([^>"&\']+)[^>]+>[^<]+<\/a>/g, '$&<br/><embed src="http://www.xiami.com/widget/0_$2/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent"></embed>');				
	//photo	
	_content = _content.replace(/<a href=[^>]+\/\/(imgur\.com\/(gallery\/)?([^>"&\']+))[^>]+>[^<]+<\/a>/g, '<span style=color:#ccc>http://$1#</span><br/><img src="http://i.imgur.com/$3.jpg" />');
	_content = _content.replace(/<a href=[^>]+\/\/(?!imageshack)([^>"&\']+)\.(jpg|png|jpeg|gif){1}[^>]+>[^<]+<\/a>/g, '<span style=color:#ccc>@http://$1.$2 </span><br/><img src="http://$1.$2" />');
	_content = _content.replace(/<a href=[^>]+\/\/(?=image\.)([^>"&\']+)[^>]+>[^<]+<\/a>/g, '<span style=color:#ccc>http://$1# </span><br/><img src="http://$1" />');
	$("pre").html( _content );
}
function parseLast(){
	setTimeout(function(){
		var regex = /<a href=[^>]+\/\/(?!w+\.youtube\.com)(?!www\.facebook\.com)([^>]+)>[^<]+<\/a>(?!#)/gi;
		var _content = $("pre").html();
		if( _content.match( regex ) ){
			_content = _content.replace(regex, '$&#<br /><iframe style="border:none" border="0" src="http://$1" width="100%" height="600px"></iframe><br />');
			$("pre").html( _content );
		}
	}, 3000);
}
function checkScriptUpdate(){
	var ver = userscript.ver;
					
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://userscripts.org/scripts/source/'+ userscript.scriptId +'.meta.js',
		onload:function(response){
			if(response.status==200){
				var gver=response.responseText.match(/\/\/ @version\s+([\d.]+)\s/)[1];
				if(ver==gver){
					alert('目前已是最新版本。');
				}
				else if(ver>gver)
					alert('驚! 你的版本比 userscripts.org 的還新!');
				else
				if(confirm('有新版本: v'+gver+'\n您目前為: v'+ver+'\n\n要前往瀏覽新版本嗎? (以分頁開啟)'))
				GM_openInTab(userscript.scriptHome);
			}
			else
			alert('無法確認更新，請稍後再試。');
		}
	});
}
function testKeyCode(e) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    var e = e || window.event;
	var path = location.href.replace(/[\s\S]+cc/g,"");
	var isfocus = $("#board").prop("isfocus");
	
	if(!isfocus){
		if(keycode==37){//Left-Arrow ←	
			var prePost = $("#finds p a:contains('前一篇')").prop("href");
			var prePage = $("#prodlist a:contains('上一頁')").prop("href");
			if(prePost){
				if(path !== prePost)
						location.href = prePost;
				else{
					alert("已經是首篇了");
				}
			}else if(prePage){
				if(path !== prePage)
					location.href = prePage;
			}
		}	
		if(keycode==39){//Right-Arrow →
			var nextPost = $("#finds p a:contains('下一篇')").prop("href");
			var nextPage = $("#prodlist a:contains('下一頁')").prop("href");
			if(nextPost){
				if(path !== nextPost)
						location.href = nextPost;
				else{
					alert("已經是最後一篇了");
				}
			}else if(nextPage){
				if(path !== nextPage)
					location.href = nextPage;
			}
		}
	}
}
window.addEventListener('keydown', testKeyCode, true);