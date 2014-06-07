// ==UserScript==
// @name           Twitter Page by ID
// @namespace      http://www.red-bean.com/decklin/userscripts/
// @description    Replace 'more' button with ID-based pagination
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// I used to use another script (which seems to have been pulled from
// userscripts.org, so I don't know who to credit) to remove the
// Twitter "more" button and restore prev/next-page links. As of May
// 2009, Twitter has broken pagination by page number, even if you add
// the query string yourself. This method of pagination was arguably
// always a bad idea anyway, since page offsets would slip as new
// tweets came in. Pagination by ID, however, still works and is
// stable (URLs offset by ID don't change). It can be used to restore
// real, RESTful (i.e. non-AJAX, doesn't completely break the back
// button) pagination.
//
// Unfortunately, the link currently supplied for the "more" <a>
// element is broken: it uses the ID of the newest tweet on the page,
// and still includes a now-useless page offset. To get the page of
// tweets immediately before those currently shown, we need to set the
// max_id parameter to something less than the *oldest* ID. (For
// brevity in grabbing this, we depend on tweets occuring in
// newest-to-oldest order in the document. We could sort the IDs
// numerically if we really had to.)
//
// Complicating things, the more button has a click event-listener
// installed via jQuery. This listener was an anonymous function in
// the page's context, so short of reaching into unsafeWindow and
// poking at jQuery's data structures, we can't get a ref to it and
// therefore can't call removeEventListener. This means we can't
// update the href and reuse the button as a real link, so the the
// simplest solution is to just replace the whole damn thing. We use
// the same class attribute to recycle the button style.
//
// So far this works for the main (following) timeline and user
// timelines. It does *not* work for favorites or DMs because those
// don't have proper URLs; they depend on AJAX loading. We'll have to
// kludge it by parsing out the hash in the exact same manner as the
// web frontend's JS, which will break every other week. Sigh.

HTMLDocument.prototype.elt = Node.prototype.elt = function(id) {
    return this.getElementById(id);
};
HTMLDocument.prototype.snap = Node.prototype.snap = function(path) {
    return document.evaluate(path, this,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
};

function attach(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f + ")();";
    document.head.appendChild(script);
}

if (document.elt('more').href.match(/max_id=\d+/)) {
    var statuses = document.snap('//li[starts-with(@id, "status_")]');
    var status = statuses.snapshotItem(statuses.snapshotLength - 1);
    var id = status.id.replace('status_', '') - 1;

    document.elt('pagination').innerHTML =
        '<a rel="next" class="more" href="' + window.location.pathname +
        '?max_id=' + id + '">Next »</a>';
}

if (window.location.href.match(/max_id=\d+/)) {
    attach(function() {
        setTimeout(function() { page.timelineRefresher.stop() }, 1000);
    });
}
