// ==UserScript==
// @name           TV.So-net Genre-Coloring for AutoPagerize
// @namespace      http://tv.so-net.ne.jp/p/saitamanodoruji/
// @description    This script extends tv.so-net's native color-code function to pages inserted by AutoPagerize.
// @include        http://tv.so-net.ne.jp/*chart*
// @version        0.0.2.20110418
// @author         saitamanodoruji
// ==/UserScript==

(function() {
	var genres = {};

	function initGenres(genres) {
		$X("id('genre-color-examles')/li", document).forEach(function(li) {
			var id = /genre-(\d{6})/.exec(li.getAttribute("class"))[1];
			var color = document.defaultView.getComputedStyle(li, null).getPropertyValue("background-color");
			genres[id] = {
				checked : false,
				color : color
			}
		});
		return genres;
	}

	function getChecked(genres) {
		for (var i in genres) genres[i].checked = false;
		if ( document.cookie.match(/gtv\.checkedGenreIDs=\[([0-9,]*)\]/)) {
			RegExp.$1.split(",").forEach(function(id) {
				genres[id].checked = true;
			});
		} else {
			$X("id('chart-footer-genres')/li/label/input", document).forEach(function(n) {
				if ( n.checked ) genres[n.value].checked = true;
			});
		}
		return genres;
	}

	function setColors(genres, evtNode) {
		var re = /cell-genre-(\d{3}0{3})/;
		$X(".//*[contains(concat(' ', @class, ' '), ' cell-schedule ')]", evtNode).forEach(function (n) {
			if ( n.nodeType == 1 && n.getAttribute("class").match(re) && genres[RegExp.$1].checked ) {
				n.style.backgroundColor = genres[RegExp.$1].color;
			} else {
				n.style.backgroundColor = "rgb(245, 245, 245)";
			}
		});
	}

	document.body.addEventListener("AutoPagerize_DOMNodeInserted", function(event) {
		var evtNode = event.target;
		setColors(getChecked(initGenres(genres)), evtNode);
	}, false);

	$X("id('chart-footer-genres')/li/label/input", document).forEach(function(n) {
		n.addEventListener("change", function(event) {
			setColors(getChecked(genres), document);
		}, false);
	});

// simple version of $X
// $X(exp);
// $X(exp, context);
// @source http://gist.github.com/3242.txt
function $X (exp, context) {
	context || (context = document);
	var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
		return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
			context.namespaceURI || document.documentElement.namespaceURI || "";
	});

	var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
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
	return null;
}

})();
