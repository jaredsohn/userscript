// ==UserScript==
// @name           Overflow Fixer for Firefox
// @namespace      http://www.quchao.com/entry/overflow-fixer
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description    To fix the wired overflow bug.
// @include        http://bbs.saraba1st.com/viewthread*
// @version        1.0
// ==/UserScript==
// ver 1.0 @ 2009-3-3
//  Initialize release
(function () {
	/*-----------------------------------------------------------------------------
	 * Functions
	 *-------------------------------------------------------------------------- */
	function $X(exp, context) {
		context = context || document;
		doc = context.ownerDocument || context;
		exp = doc.createExpression(exp, function (prefix) {
			return document.createNSResolver(doc).lookupNamespaceURI(prefix) || document.documentElement.namespaceURI;
		});
		result = exp.evaluate(context, 7, null);
		res = [];
		resLen = result.snapshotLength;
		for (i = 0, j = resLen; i < j; ++i) {
			res[res.length] = result.snapshotItem(i);
		}
		return res;
	}

	/*-----------------------------------------------------------------------------
	 * OverflowFixer
	 *-------------------------------------------------------------------------- */
	OverflowFixer = function () {
		return {
			init: function () {
				$X('//div[starts-with(@class,"postmessage")]').forEach(function (node) {
					node.style.overflowX = 'visible';
				});
			}
		};
	}();


	/*-----------------------------------------------------------------------------
	 * Initialization
	 *-------------------------------------------------------------------------- */
	OverflowFixer.init();
})();