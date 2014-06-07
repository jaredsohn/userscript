// ==UserScript==
// @name           HaiNeiYouKu
// @namespace      wangyuantao
// @include        http://hainei.com/movie?r*
// @include        http://www.hainei.com/movie?*
// @seealse        HaiNeiDouZi
// ==/UserScript==

(function(){
	function addStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	};
	var REQ_HEADS = {
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
	};
	var YouKuBase = "http://so.youku.com/search_video/q_";
	var YAHOO = unsafeWindow.YAHOO;
	var Dom = YAHOO.util.Dom
	var Event = YAHOO.util.Event;
	var $ = Dom.get;
//

function cutResult(s){
	var begin = s.indexOf("<div class=\"searchResult\"");
	var end = s.indexOf("<div class=\"LPageBar\"");
	if(begin <0 || end < 0)throw "youku page uncuttable, plz update this gm script.";
	s=s.substring(begin,end);
	//cut ulgy head
	begin = s.indexOf("<ul class=\"video pList\">");
	end = s.indexOf("<ul class=\"lists\">");
//	if(begin <0 || end < 0)throw "youku page uncuttable, plz update this gm script.";
	var s1=s.substr(0,begin);
	var s2=s.substr(end);
	s=s1.concat(s2);
	//cut h1
	s=s.replace(/<h1>(.+?)<\/h1>/ig,"$1");
	//cut addto button
	s=s.replace(/<li class=\"playmenu\">.+?<\/li>/ig,"");
	//cut script
	s=s.replace(/onclick=\"toSearchStatClick\(.+?\)\"/ig,"");
	//cut tag
	s=s.replace(/<li class=\"vTag\".*?<\/li>/ig,"");
	//cut author
	s=s.replace(/<li class=\"vUser\".*?<\/li>/ig,"");
	//cut fields
	s=s.replace(/播放.*<\/span>/ig,"");
	s=s.replace(/评论.*<\/span>/ig,"");
	s=s.replace(/收藏.*<\/span>/ig,"");
	

	return s;
}

var placeHolder = unsafeWindow.YAHOO.util.Dom.getFirstChild("movie-show");
var alink = document.createElement("SPAN");
alink.innerHTML = "<a id='youkuSearch' href='#Y'>优酷手气不错</a>"
placeHolder.appendChild(alink);
unsafeWindow.YAHOO.util.Event.on("youkuSearch", "click", function(e){
	var title = document.title.replace("海内 | 电影 - ","");
	var _url = YouKuBase + encodeURIComponent(title);
	setTimeout(function(){
		GM_xmlhttpRequest({
			method:"GET",
			url:_url,
			headers: REQ_HEADS,
			onload:function(details) {
				if(details.status=="200"){
					var s = details.responseText;
					try{
						var s = cutResult(s);
						var layer = document.createElement("DIV");
						layer.className="sect";
						var YoukuHead='<h3>优酷查询结果 <a target="_blank" href="'+_url+'">查看全部</a></h3>';
						
						layer.innerHTML = YoukuHead + s;
						var movieShowDiv = $("movie-show");
						addStyle('.videoImg{float:left; margin-right:10px;} .video{height:100px;}');
						Dom.insertAfter(layer, movieShowDiv);
					}catch(e){
						
					}
				}
			}
		});
		placeHolder.removeChild(alink);
	}, 10);
	
	unsafeWindow.YAHOO.util.Event.preventDefault(e);
});
})();
