// ==UserScript==
// @name		icelinks
// @namespace		http://icewhite.us
// @description		Bookmark the links in page.
// @include			*
// ==/UserScript==


icelinks();

function icelinks() {
	var results = [];
    var parse_url = /^(?:([A-Za-z]+):)(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	
    var links = document.links;
    for (var i = 0; i < links.length; i += 1) {
        var anchor = links[i];
        var url = anchor.href;

        if (parse_url.test(url)) {
            results.push(url);
            anchor.addEventListener('click', function(event) {
                var url = this.href;
                if (confirm(url + '\nAdd this to your favorites?\nOr access directly?')) {
                	unsafeWindow.sidebar.addPanel(this.firstChild.data, url, '');
                	event.preventDefault();
                }
            }, false);
        }
    }
}

