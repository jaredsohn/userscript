// ==UserScript==
// @name        Flickr Show Licenses
// @description Overlay photos licenses
// @namespace   http://lowreal.net/
// @include     http://www.flickr.com/*
// @exclude     http://www.flickr.com/creativecommons/*
// ==/UserScript==


(function () {

	const API_KEY = "13b98c6e595d688ce25febb790f85bc5";
	//Gremio:just y/n
// 	const LICENSES = [
// 		"\xa9",
// 		"by-nc-sa",
// 		"by-nc",
// 		"by-nc-nd",
// 		"by",
// 		"by-sa",
// 		"by-nd"
// 		];
	const LICENSES = [
		"\xa9",
		"",
		"",
		"",
		"",
		"",
		""
		];


	var reqNum = 0;
	$X("//a[starts-with(@href, '/photos/') and img]").forEach(function (i, v) {
		  //Gremio:onload       i.addEventListener("mouseover", function () {
			if (i.showedP) return;
			//Gremio:groups			var m = i.href.match(RegExp("/photos/([^/]+)/(\\d+)/$"));
			var m = i.href.match(RegExp("/photos/([^/]+)/(\\d+)/"));
			if (!m) return;
			i.showedP = true;
			window.status = "Loading license...";
			reqNum++;
			GM_xmlhttpRequest({
				method : "GET",
				url : ["http://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=",
					   API_KEY,
					   "&photo_id=",
					   m[2]].join(""),

				headers : {
					"Accept":"text/xml,application/xml,application/rdf+xml",
				},

				onload : function (req) {
					var rsp = new XML(req.responseText.replace(/^<\?xml.+?\?>/, ''));
					var l = $N("span", {}, LICENSES[Number(rsp.photo.@license)]);
					with (l.style) {
						position = "absolute";
						bottom = "0";
						left = "0";
						background = "#000";
						color = "#fff";
						opacity = "0.8";
						padding = "0 0.5em";
					}
					i.style.position = "relative";
					i.appendChild(l);
					reqNum--;
					if (reqNum == 0) {
						window.status = "Loading license... Done.";
					}
				},

				onerror : function (req) {
				}
				//Gremio:onload			});
		}, true);
	});


	/* template functions  */
	function $N(name, attr, childs) {
		var ret = document.createElement(name);
		for (k in attr) {
			if (!attr.hasOwnProperty(k)) continue;
			v = attr[k];
			if (k == "class") {
				ret.className = v;
			} else {
				ret.setAttribute(k, v);
			}
		}
		switch (typeof childs) {
			case "string": {
				ret.appendChild(document.createTextNode(childs));
				break;
			}
			case "object": {
				for (var i = 0, len = childs.length; i < len; i++) {
					var child = childs[i];
					if (typeof child == "string") {
						ret.appendChild(document.createTextNode(child));
					} else {
						ret.appendChild(child);
					}
				}
				break;
			}
		}
		return ret;
	}

	function $X(exp, context) {
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

})();

