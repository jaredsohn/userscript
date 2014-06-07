// ==UserScript==
// @name        Cross Post Hatena (+ del.icio.us)
// @namespace   http://lowreal.net/
// @include     http://b.hatena.ne.jp/*
// @include     http://b.hatena.ne.jp/add?mode=confirm*
// ==/UserScript==
// 投稿時刻を拾えないため、はてなで[編集]すると、
// del.icio.us であがってしまう。


try {
	// post & edit
	(function () {
		var form = document.getElementById("edit_form");
		if (!form) return;

		form.addEventListener("submit", function (e) {

			var input = {};

			var inputs = form.getElementsByTagName("input");
			for (var i = 0, len = inputs.length; i < len; i++) {
				input[inputs[i].name] = encodeURIComponent(inputs[i].value);
			}


			var notes = input["comment"].replace(/^(%5B.+?%5D)+/i, '');
			var tags  = (input["comment"]
						 .match(/(%5B.+?%5D)/ig) || []).join(" ").replace(/%5B|%5D/ig, '');

			if (!input["url"]) {
				// edit mode
				var url = document.evaluate(
					["//a[../../td[@class='label'] = 'URL']"].join(""),
					document,
					null,
					XPathResult.FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue.href;
				input["url"] = encodeURIComponent(url);
			}

			var url = ["http://del.icio.us/api/posts/add?",
					   "url=", input["url"], "&",
					   "description=", input["title"], "&",
					   "extended=", notes, "&",
					   "tags=", tags
					   ].join("");

			GM_xmlhttpRequest({
				method : "GET",
				url : url,

				onload : function (req) {
					var res = new XML(req.responseText.replace(/^<\?xml.+?\?>/, ''));
					if (res.@code != "done") {
						alert("Error happend on x-posting to del.icio.us\n>" + res.@code);
					} else {
						window.status = "X-Posting to del.icio.us is done.";
					}
				},

				onerror : function (req) {
					alert(req.responseText);
				}
			});


		}, false);
	})();

	// delete
	(function () {
		function del_del(url) {
			GM_xmlhttpRequest({
				method : "GET",
				url : "http://del.icio.us/api/posts/delete?url=" + encodeURIComponent(url),

				onload : function (req) {
					var res = new XML(req.responseText.replace(/^<\?xml.+?\?>/, ''));
					if (res.@code != "done") {
						alert("Error happend on deleting on del.icio.us\n>" + res.@code);
					} else {
						window.status = "X-Posting to del.icio.us is done.";
					}
				},

				onerror : function (req) {
					alert(req.responseText);
				}
			});
		}


		var eids = document.evaluate(
			"//input[@name='eid' and ../../form[@class='delete']]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

		for (var i = 0, len = eids.snapshotLength; i < len; i++) {
			var input = eids.snapshotItem(i);
			(function () {
				var eid = input.value;
				var form = input.parentNode;
				form.addEventListener("submit", function (e) {

					var href = document.evaluate(
						["//a[@name='", eid, "']"].join(""),
						document,
						null,
						XPathResult.FIRST_ORDERED_NODE_TYPE,
						null).singleNodeValue.href;

					del_del(href);

				}, true);
			})();
		}

		var edit_del_form = document.evaluate(
			"//form[@action='./delete']",
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null).singleNodeValue;

		if (edit_del_form) {
			edit_del_form.addEventListener("submit", function (e) {
				
				var url = document.evaluate(
					["//a[../../td[@class='label'] = 'URL']"].join(""),
					document,
					null,
					XPathResult.FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue.href;
				del_del(url)
			}, true);
		}

	})();
} catch (e) { alert("XPOST.error: "+ e) }
