// ==UserScript==
// @id             tracker.czech-server.com
// @name           TreZzoR keep anonymous
// @version        1.0
// @include        http://tracker.czech-server.com/comment.php?*
// @run-at         document-end
// ==/UserScript==

var x = document.getElementsByName("anonymnyprisp");
for (i = 0; i < x.length; ++i) {
	if (x[i].getAttribute("value") == "1") {
		x[i].checked = true;
	}
}
