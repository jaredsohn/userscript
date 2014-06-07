// ==UserScript==
// @name           Wikipedia=>Kotobank
// @namespace      www.madin.jp
// @include        http://ja.wikipedia.org/wiki/*
// ==/UserScript==

(function(){

	var XPATH_CONTENT_DIVS			 = '//div[@class="block"]';
	var XPATH_INVISIBLE_ELEMENTS	 = '//*[@class="tree" or @class="adapted" or @class="more"]';

	var reqUrl = location.href.replace('ja.wikipedia.org/wiki/','kotobank.jp/word/');
    var req = {
	    method: 'get',
	    url: reqUrl,
	    onerror: function(){
			//TODO
		},
	    onload: function(response){

        	var hDoc = createHTMLDocumentByString(response.responseText);
			var elements = getElementsByXPath(XPATH_CONTENT_DIVS, hDoc);

			var openerBar = document.createElement('DIV');
			openerBar.innerHTML = ' kotobank.jp から' + elements.length + '件の記事を取得しました。';


			var mark = document.createElement('SPAN');
			mark.innerHTML = '[+]';
			openerBar.insertBefore(mark,openerBar.firstChild);

			var wikiBody = document.getElementById('bodyContent');
			var container = document.createElement('DIV');
			container.style.display = 'none';
			openerBar.addEventListener ('click',getToggleAction(openerBar, mark, container),true);

			for (var elementIndex = 0, elementLength = elements.length; elementIndex < elementLength; elementIndex ++) {

				var element = elements[elementIndex];

				var subs = getElementsByXPath(XPATH_INVISIBLE_ELEMENTS, element);
				for (var subIndex = 0, subLength = subs.length; subIndex < subLength; subIndex ++) {
					subs[subIndex].style.display = 'none';
				}
				var links = element.getElementsByTagName('A');
				for (var linkIndex = 0, linkLength = links.length; linkIndex < linkLength; linkIndex ++) {
					links[linkIndex].href = 'http://kotobank.jp' + links[linkIndex].href;
				}

				with (element.style) {
					border = 'solid 1px #888';
					padding = '4px';
					margin = '2px';
				}

				container.appendChild(element);
			}

			var origLink = document.createElement('A');
			origLink.href = reqUrl;
			origLink.innerHTML = '『'+document.getElementById('firstHeading').innerHTML+'』 (kotobank.jp)';
			container.appendChild(origLink);

			wikiBody.parentNode.insertBefore(openerBar, wikiBody);
			wikiBody.parentNode.insertBefore(container, wikiBody);
        }
    }
    GM_xmlhttpRequest(req);

})();
function getToggleAction (openerBar,mark, container) {
	return function (event) {
		mark.innerHTML = ('none'==container.style.display)?'[-]':'[+]';
		container.style.display = ('none'==container.style.display)?'block':'none';
	};
}
function createHTMLDocumentByString(str) {
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')
    var htmlDoc  = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    try {
        fragment = htmlDoc.adoptNode(fragment)
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true)
    }
    htmlDoc.documentElement.appendChild(fragment)
   return htmlDoc
}
function getElementsByXPath(xpath, node) {
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var nodesSnapshot = doc.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
	}
	return data;
}
   
function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}