// ==UserScript==
// @name           LDR - PDF/PPT/TIF viewer with Google Docs
// @namespace      http://profile.livedoor.com/ronekko/
// @description    Livedoor Reader上でPDFのリンクをGoogle docs Viewer経由に置き換える
// @include        http://reader.livedoor.com/reader/
// @include        http://reader.livedoor.com/public/*
// ==/UserScript==
// 参考にしたスクリプト:
// by Koonies (http://d.hatena.ne.jp/Koonies/): http://userscripts.org/scripts/show/59557
// by puppet http://puppet.asablo.jp/blog/2009/10/13/4631429

var replacePdfLinks = function(element){
	var l = element.getElementsByTagName("a");
	var i = l.length;
	while (i--) {
		if (l[i].href.match(/^https*:([^?]+|[^:]+)\.(pdf|ppt|tif|tiff)$/i)) {
			var logo = document.createElement("img");
			logo.src = 'data:image/gif;base64,R0lGODlhEAAQAPUAAP///wAAAN0AAdoEAfgAAN4NBgB1PAF8PtYXFAGBPTZpLO0UEgGHOwCLOypfoxZkugGNOhBmwhiDMyJ/M9smIwCSOgGUN9otKN8uLNQ7OyCYSy52xiebTPA5Ofo5OXt7e1Ofdd1jYmib0HWi0tiGg4ajxna4k/t8eZWnxPCGg4mv15O+otudm+izFO+xI+24Ee+zLN25ab/EuOTIesjIycDO3MfU5MLfycrb6+7OzerXrO7csu3kx+Ls5+zn7Pr5+SH5BAEAAAEALAAAAAAQABAAAAZ4wIBwSCwWP8jkp1h7iHILggAA+NCWQ1xk47sUBtQP4Dq0jVSriUQRppIDjlKPY6k0wkohSsa7aSAMAD9UYUIzLy07JgwJACeEVUIxLjA6IAcGAB6QWERiVAicRp8YIRQYGSydQ2IpJJCRRwAdsLGetYVHSrtGvUVBADs=';
			logo.border = 0;
			var gglpdf = document.createElement("a");
			gglpdf.insertBefore(logo, gglpdf.firstChild);
			var tmp = 'http://docs.google.com/viewer?url=' + l[i].href;
			gglpdf.href = l[i].href;
			gglpdf.target = '_blank';
			l[i].href = tmp;
			l[i].parentNode.insertBefore(gglpdf, l[i].nextSibling);
		}
	}
}

var timer;

unsafeWindow.register_hook('AFTER_PRINTFEED', function(feed) {
	var numItems;
	var rightBody;
	
	if(timer){ clearTimeout(timer); };
	
	numItems = feed.items.length;
	rightBody = document.getElementById('right_body');
	(function(){
		var itemNodes = rightBody.getElementsByClassName('item');
		if(itemNodes.length === numItems){
			timer = undefined;
			replacePdfLinks(rightBody);
		}else{
			timer = setTimeout(arguments.callee, 500);
		}
	})();
});