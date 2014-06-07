// ==UserScript==
// @name        Flickr: show histogram
// @namespace   http://lowreal.net/
// @include     http://flickr.com/photos/*
// @include     http://www.flickr.com/photos/*
// ==/UserScript==
//
(function () {

var swf = "http://svn.coderepos.org/share/lang/actionscript/misc/histogram/Histogram.swf";


var infoUl = $X("//li[@class='Stats']/parent::node()")[0];
var li     = h("<li class='Stats'><a class='Plain' href='javascript:void(0)'>Histogram</a></li>").firstChild;
infoUl.appendChild(li);

li.addEventListener("click", function (e) {
	var src = $X("string(//div[@class='photoImgDiv']/img/@src)")
	src = encodeURIComponent(src);

	var embed = ['<embed width="255" height="320" flashvars="url=', src, '" quality="high" name="idswf" id="idswf" src="', swf, '" type="application/x-shockwave-flash"/>'].join("");
	var win   = h(embed);
	with (win.style) {
		position   = "absolute";
		top        = "50%";
		left       = "50%";
		background = '#000';
		padding    = '10px';
		margin     = '10px 0';
	}
	win.addEventListener("click", function () {
		win.parentNode.removeChild(win);
	}, false);
	document.body.appendChild(win);

}, false);

function $X (exp, context, type /* want type */) {
	if (typeof context == "function") {
		type    = context;
		context = null;
	}
	if (!context) context = document;
	var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
		var o = document.createNSResolver(context)(prefix);
		if (o) return o;
		if (prefix == "atom") return "http://purl.org/atom/ns#";
		return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
	});

	switch (type) {
		case String:
			return exp.evaluate(
				context,
				XPathResult.STRING_TYPE,
				null
			).stringValue;
		case Number:
			return exp.evaluate(
				context,
				XPathResult.NUMBER_TYPE,
				null
			).numberValue;
		case Boolean:
			return exp.evaluate(
				context,
				XPathResult.BOOLEAN_TYPE,
				null
			).booleanValue;
		case Array:
			var result = exp.evaluate(
				context,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null
			);
			var ret = [];
			for (var i = 0, len = result.snapshotLength; i < len; i++) {
				ret.push(result.snapshotItem(i));
			}
			return ret;
		case undefined:
			var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
			switch (result.resultType) {
				case XPathResult.STRING_TYPE : return result.stringValue;
				case XPathResult.NUMBER_TYPE : return result.numberValue;
				case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
				case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
					// not ensure the order.
					var ret = [];
					var i = null;
					while (i = result.iterateNext()) {
						ret.push(i);
					}
					return ret;
				}
			}
			return null;
		default:
			throw(TypeError("$X: specified type is not valid type."));
	}
}

function h (s) {
	var d = document.createElement("div");
	d.innerHTML = s;
	return d;
}
})();
