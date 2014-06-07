// ==UserScript==
// @name           Wikileaks secure links
// @description    Fixes links to Wikileaks to use the secure HTTPS interface.
// @include        *
// ==/UserScript==

GM_addStyle("#bodyContent a[href ^=\"https://secure.wikileaks.org/\"] { background: none; padding-right: 0; }");  // hide padlock

var re = /^http:\/\/(?:([a-z0-9\\-]+)\.)?(wikileaks)\.org(\/w(?:iki)?\/.*|\/?)$/i;

var exclude = /^http:\/\/((download|upload|secure|bugzilla|www|wikileaks[a-z0-9\\-]*)\.)?wikimedia\.org(\/|$)/i;

var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; i++) {
    var m = re.exec(links[i].href);
    if (!m || !m.length || exclude.test(links[i].href)) continue;

    if (!m[1]) m[1] = "www";
    if (m[3].length <= 1) m[3] = "/wiki/";

    m[1] = m[1].toLowerCase();
    m[2] = m[2].toLowerCase();

    links[i].href = "https://secure.wikileaks.org/" + m[3];
}