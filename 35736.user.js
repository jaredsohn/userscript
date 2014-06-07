// ==UserScript==
// @name          Shattered Kingdoms Forum Tweaks
// @namespace     http://www.shatteredkingdoms.org/forums
// @description   Fixes for various forum annoyances
// @include       http://www.shatteredkingdoms.org/forums/*
// ==/UserScript==

// Force code tags to wrap
GM_addStyle('.code { white-space: normal !important; }')

// Hide posts by username
var SKForums = function() {
	var blockedUsers = ['List', 'QQers', 'here'];

	if (!Array.prototype.contains)
		Array.prototype.contains = function(o) {
			for (var i = 0; i < this.length; i++)
				if (this[i] === o) return true;
			return false;
		};

	function createQQDiv(node) {
		var row = node.parentNode.parentNode;
		var name = node.textContent;
		row.innerHTML = '<td class="catHead" height="28" colspan="2">' + name + ' QQed more.</td>';
	}

	function deleteNextRow(node) {
		var row = node.parentNode.parentNode;
		var next_row = row.nextSibling.nextSibling;
		row.parentNode.removeChild(next_row);
	}

	function createFilter(path) {
		var page = path.split('/')[2];
		if (page == 'viewtopic.php')
			return function(node) {
				deleteNextRow(node);
				createQQDiv(node);
			};
		else if (page == 'posting.php')
			return function(node) {
				createQQDiv(node);
			};
		else
			return function(node) { };
	}

	function getNameList() {
		var xpathQuery = "//table[@class='forumline']//span[@class='name']";
		return document.evaluate(xpathQuery, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	return {
		PostFilter : function(path) {
			this.filter = createFilter(path);

			this.process = function() {
				var names = getNameList();
				for (var i = 0; i < names.snapshotLength; i++) {
					var node = names.snapshotItem(i);
					if (blockedUsers.contains(node.textContent)) this.filter(node);
				}
			}
		}
	};
}();

var filter = new SKForums.PostFilter(document.location.pathname);
filter.process();
