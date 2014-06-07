// ==UserScript==
// @name           join the site list of linezing's statistics
// @namespace  http://www.junstyle.com.cn
// @include        http://tongji.linezing.com/mystat.html*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// Author：		junstyle
// Blog：		http://www.junstyle.com.cn

window._$=jQuery;

window.get_middleStr = function(sourceStr, startStr, endStr){
	var middleStr = sourceStr;
	if( middleStr.indexOf( startStr ) > -1 )
	{
		middleStr = middleStr.substring( middleStr.indexOf( startStr ) + startStr.length );
		if( middleStr.indexOf( endStr ) > -1 )
			middleStr = middleStr.substring( 0, middleStr.indexOf( endStr ) );
	}
	if( middleStr == sourceStr )
		return "";
	else
		return middleStr;
};

_$("#container").nextAll().filter("a").remove();
_$("#footer").remove();
_$(".tjtb div.p").css("text-align", "center").find("a:not(:last)").each(function(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://tongji.linezing.com/mystat.html?page="+_$(this).text(),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var html = responseDetails.responseText;
			var tj=window.get_middleStr(html, '<div class="tjtb">\r\n\t\t<ul>', '</ul>');
			_$(".tjtb ul").append( tj );
			_$(".tjtb ul a").attr("target", "_blank");
		}
	});
});
_$("head").append('<link rel="icon" href="http://tongji.linezing.com/images/lzlogo1.gif" /><meta http-equiv="refresh" CONTENT="180; url='+document.URL+'">');