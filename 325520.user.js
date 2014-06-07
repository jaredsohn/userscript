// ==UserScript==
// @name       Firework Links
// @namespace  http://joelhough.com/
// @version    0.1
// @description  add firework links to gerrit
// @match      https://gerrit.instructure.com/*
// @copyright  2014+, Joel Hough
// ==/UserScript==

function add_links() {
	var change_num_match = window.location.toString().match(/c\/(\d+)/);
	if (change_num_match) {
        var change_num = change_num_match[1];
        var els = document.querySelectorAll('table.gwt-DisclosurePanel td');
	    var links_added = false;
        for (var i = 0; i < els.length; i++) {
            var e = els[i];
            var match = e.innerHTML.match(/^\w*Patch Set (\d+)\w*$/);
            if (match && !e.className.match(/fireworked/)) {
                e.className += ' fireworked';
                links_added = true;
                var patch_num = match[1];
                var firework_link = 'http://firework.instructure.com/runs/gerrit/' + change_num + '/' + patch_num;
                var a = document.createElement('a');
                a.href = firework_link;
                a.className = 'gwt-Anchor patchSetLink';
                a.appendChild(document.createTextNode('(firework)'));
                e.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.appendChild(a); // Don't judge me
            }
        }
    }
    setTimeout(add_links, 2000);
}

setTimeout(add_links, 2000);