// ==UserScript==
// @name LeproParanoid
// @description Changes all links like http://leprosorium.ru/ to https://leprosorium.ru/
// @include https://leprosorium.ru
// @include https://*.leprosorium.ru
// @author werehuman@gmail.com
// @license WTFPL
// @version 0.2
// @date 2011-02-21
// ==/UserScript==

insecure_paths = ["i"];
link_regex = /^http:\/\/([^.]*.)?leprosorium[.]ru\/([^\/]*)(\/.*)?$/;
links = [];
links_ = document.getElementsByTagName("a");
for (var i in links_) {
    links.push(links_[i]);
}
for (var link_id in links) {
    var link = links[link_id];
    for (var pattern in insecure_paths) {
        var m = link.href;
        if (m) {
            m = m.match(link_regex);
            if (m !== null && insecure_paths.indexOf(m[2]) == -1) {
                if (!m[1]) m[1] = "";
                if (!m[3]) m[3] = "";
                link.href = "https://" + m[1] + "leprosorium.ru/" + m[2] + m[3];
                break;
            }
        }
    }
}