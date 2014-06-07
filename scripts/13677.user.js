// ==UserScript==
// @name bbs2chreader_res_linker
// @namespace http://b.hatena.ne.jp/tcns
// @include http://127.0.0.1:8823/thread/*
// @version 0.2
// ==/UserScript==
//
// ChangeLog
//   2007-11-08 tcns
//     * Fix: url regexp
//   2007-11-11 tcns
//     * Add: new response (resContainer resNew)
//   

/// === Utility v1.0.1 === ///
function $x(exp, context) {
	if (!context) {
		context = document;
	}

	var ret = [];
	var evaluator = new XPathEvaluator();
	var expression = evaluator.createExpression(exp, null);
	var nodes = expression.evaluate(context, XPathResult.ORDERED_NODE_TYPE, null);
	for (var node = nodes.iterateNext(); node; node = nodes.iterateNext()) {
		ret.push(node);
	}

	return ret;
}

// === main === ///
var url = document.location.href.match(/http:\/\/[^.]+\.2ch\.net\/.*\//)[0];
var linked = function () {
	$x('//dl[@class="resContainer"]/dt[@class="resHeader"]/span[@class="resNumber"]').forEach(function (e) {
		e.innerHTML = e.innerHTML.replace(/\d+/, function (e) {
			return '<a style="color:#000;font-weight:normal;" href="'+url+e+'">'+e+'</a>';
		});
	});

	$x('//dl[@class="resContainer resNew"]/dt[@class="resHeader"]/span[@class="resNumber"]').forEach(function (e) {
		e.innerHTML = e.innerHTML.replace(/\d+/, function (e) {
			return '<a style="color:#f63;font-weight:normal;" href="'+url+e+'">'+e+'</a>';
		});
	});
}
linked();
