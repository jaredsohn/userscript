// ==UserScript==
// @name           WordPress.org highlight counter
// @namespace      http://efcl.info/
// @description    WordPress.orgのタグ/単語検索のダウンロード数によって色を変える
// @include        http://wordpress.org/extend/plugins/tags/*
// @include        http://wordpress.org/extend/plugins/search*
// ==/UserScript==
/*  TEST URL
    http://wordpress.org/extend/plugins/search.php?q=word
    http://wordpress.org/extend/plugins/tags/widget
*/
GM_addStyle(<><![CDATA[
    .GM_downloads_count_50000{
        background: #cc0000; color: #fff; padding: 1px 3px; -moz-border-radius: 3px;
    }
    .GM_downloads_count_10000{
        background:#ffb0b0; padding: 1px 3px; -moz-border-radius: 3px;
    }
    .GM_downloads_count_5000{
        background:#ffd792; padding: 1px 3px; -moz-border-radius: 3px;
    }
    .GM_downloads_count_2000{
        background:#f9f49d; padding: 1px 3px; -moz-border-radius: 3px;
    }
]]></>);
function hilightCounter(node){
    var downloadsSpan = $X('//span[@class="info-marker"][text()="Downloads"]' ,node);
    for(var i=0,len=downloadsSpan.length;i<len;i++){
        var countTextNode = downloadsSpan[i].nextSibling;
        var downloadCount = parseInt(countTextNode.textContent.replace(",","","g"), "10");// 数値化
        var parDownload = downloadsSpan[i].parentNode;
        var span = document.createElement("span");
        if(downloadCount > 50000){
            span.setAttribute("class" , "GM_downloads_count_50000");
        }else if(downloadCount > 10000){
            span.setAttribute("class" , "GM_downloads_count_10000");
        }else if(downloadCount > 5000){
            span.setAttribute("class" , "GM_downloads_count_5000");
        }else if(downloadCount > 2000){
            span.setAttribute("class" , "GM_downloads_count_2000");
        }else{
            continue;
        }
        span.textContent = countTextNode.textContent;
        parDownload.replaceChild(span , countTextNode);
    }
}

document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
    var node = evt.target;
    //var requestURL = evt.newValue;
    //var parentNode = evt.relatedNode;
    hilightCounter(node);
}, false);
hilightCounter(document);


// $X on XHTML
// @target Freifox3, Chrome3, Safari4, Opera10
// @source http://gist.github.com/184276.txt
function $X (exp, context) {
	context || (context = document);
	var _document  = context.ownerDocument || context,
	documentElement = _document.documentElement,
	isXHTML = documentElement.tagName !== 'HTML' && _document.createElement('p').tagName === 'p',
	defaultPrefix = null;
	if (isXHTML) {
		defaultPrefix = '__default__';
		exp = addDefaultPrefix(exp, defaultPrefix);
	}
	function resolver (prefix) {
		return context.lookupNamespaceURI(prefix === defaultPrefix ? null : prefix) ||
			   documentElement.namespaceURI || "";
	}

	var result = _document.evaluate(exp, context, resolver, XPathResult.ANY_TYPE, null);
	switch (result.resultType) {
		case XPathResult.STRING_TYPE : return result.stringValue;
		case XPathResult.NUMBER_TYPE : return result.numberValue;
		case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
		case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
			// not ensure the order.
			var ret = [], i = null;
			while (i = result.iterateNext()) ret.push(i);
			return ret;
	}
}

