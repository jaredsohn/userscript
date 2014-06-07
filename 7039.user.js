// ==UserScript==
// @name             retrieves YouTube(using AmebaVision tags)
// @namespace        http://www.moaikids.net/
// @include          http://vision.ameba.jp/watch.do*
// @include          http://vision.ameba.jp//watch.do*
// @version          1.00
// ==/UserScript==

const YOUTUBE_URL = 'http://www.youtube.com/results?search_query='

function main() {
	var tagElement = $X("//dl[@class='tag']//a//text()");
	if(tagElement.length <= 0){
		return;
	}
	
	var movieDetailElement = document.getElementById('movieDetail');
	if(!movieDetailElement){
		return ;
	}
	var informationElement = null;
	for(var i = 0 ; i < movieDetailElement.childNodes.length ; i++){
		if(movieDetailElement.childNodes[i].className != 'contents'){
			continue;
		}
		var contentsElement = movieDetailElement.childNodes[i];
		for(var j = 0 ; j < contentsElement.childNodes.length ; j++){
			if(contentsElement.childNodes[j].className == 'information'){
				informationElement = contentsElement.childNodes[j];
				break;
			}
		}
	}
	if(!informationElement){
		return;
	}

	var youtubeTagDlElement = document.createElement('dl');
	youtubeTagDlElement.className = 'youtubeTag';
	var youtubeTagAnchor = '<dt>tag for YouTube:</dt><dd>';
	for(var i = 0 ; i < tagElement.length ; i++){
		var tagName = tagElement[i].nodeValue;
		youtubeTagAnchor += '<a href="' + YOUTUBE_URL + encodeURIComponent(tagName) + '" target="_blank">' + tagName + '</a>&nbsp;';
	}
	youtubeTagAnchor += '</dd>';
	youtubeTagDlElement.innerHTML = youtubeTagAnchor;

	informationElement.appendChild(youtubeTagDlElement);

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

