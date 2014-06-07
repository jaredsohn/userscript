// ==UserScript==
// @name           HDChina
// @namespace      Ledudu
// @description    HDChina中的</a>前移,方便复制文本
// @include        *hdchina.org/browse.php*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version        0.0.3
// @date           2012-11-1
// ==/UserScript==
(function(){
	//修正Href连接，方便复制文本
	function FixHref()
	{
		var Hrefs = $("table .name_ct");

		$.each(Hrefs, function(i, n) {
			var Context = $(n).html()
			Context = Context.replace(/<\/a><\/td>/, "<\/td>");
			Context = Context.replace(/<\/b>/,"</b></a>");
			$(n).html(Context);
		});

	}
	
	FixHref();
}
());