// ==UserScript==
// @name             AmebaVision Full Screen Player
// @namespace        http://www.moaikids.net/
// @include          http://vision.ameba.jp/watch.do*
// @version          1.00
// ==/UserScript==
var DOMAIN = 'http://vision.ameba.jp';

var HEIGHT = screen.availHeight * 0.8;
var WIDTH = (HEIGHT / 3) * 4;
function main() {
	var object = $X("//object[@id='aa']")[0];
	var player = $X("//object[@id='aa']/embed")[0];

	var src = player.src.replace('mcs.swf','mcf.swf');

	var body = document.getElementById('watch');
	
	object.width = WIDTH;
	object.height = HEIGHT;
	object.innerHTML = '';
	object.innerHTML = '<param name="allowScriptAccess" value="always"><param name="movie" value="' + src + '"><embed src="' + src + '" quality="high" bgcolor="#ffffff" name="FlashMovie" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="middle" height="' + HEIGHT + '" width="' + WIDTH + '">';

	body.innerHTML = object.innerHTML;
}

/**
 * XPath utility logic
 * special thanks this site -> http://lowreal.net/
 * @Reference URI http://lowreal.net/logs/2006/03/16/1
 * @Tags xpath js
 */
$X = function (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
            result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len ; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        }
    }
    return null;
}


main();




