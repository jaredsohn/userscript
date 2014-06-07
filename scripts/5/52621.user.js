// ==UserScript==
// @name           Noko + email
// @namespace      b5b1e01d2b084aad9a291a2da94d53c3
// @description    Returns to the original thread on 4chan after posting or deleting a post even if an email address is given.
// @include        http://*.4chan.org/*
// ==/UserScript==

var img2post = {"img":"dat", "zip":"bin", "cgi":"nov", "orz":"tmp"};
var post2img = {"dat":"img", "bin":"zip", "nov":"cgi", "tmp":"orz"};

function changeAction(e) {
    var email = document.getElementsByName("email")[0].value;
    if (email == "noko" || email == "sage") {
        var frontpage = "http://" + dom + ".4chan.org" + (location.pathname.match(/\/[^\/]+/)||"") + "/imgboard.html";
        e.target.action += "#returnto=" + encodeURIComponent(frontpage);
    } else if (e.target.name == "delform" && !e.target.elements[0].checked) {
        e.target.action += "#returnto=" + encodeURIComponent(location);
    }
}

var dom = location.host.match(/(.*)\.4chan\.org/)[1];

if (dom in img2post) {

    var f = document.forms;
    for (var i = 0; i < document.forms.length; i++) {
        document.forms[i].addEventListener("submit", changeAction, false);
    }

} else if (dom in post2img) {

    if (/Updating (page|index)/.test(document.body.innerHTML)) {
        var ret = location.href.match(/#returnto=(.*)/);
        var post = document.body.innerHTML.match(/<!-- thread:(\d+),no:(\d+) -->/);
        var url = null;
        if (ret != null) {
            url = decodeURIComponent(ret[1]);
        } else if (post != null) {
            url = "http://" + post2img[dom] + ".4chan.org" + (location.pathname.match(/\/[^\/]+/)||"") + "/res/";
            if (post[1] == "0") {
                url += post[2] + ".html";
            } else {
                url += post[1] + ".html#" + post[2];
            }
        }
        if (url != null) window.location.replace(url);
    }

}
