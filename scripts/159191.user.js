// ==UserScript==
// @name        AnonymousBot for r/fanons
// @namespace   fanons
// @description Allow redditors to post on r/fanons
// @include     http://*.reddit.com/r/fanons*
// @include     http://fanons.reddit.com/*
// @exclude     http://co.reddit.com/r/fanons/*
// @version     0.6
// ==/UserScript==
(function () {
    var doc = document,
        d = doc.getElementById('siteTable'),
        r = doc.createElement("a"),
        r1 = doc.createElement("div"),
        c = doc.createElement("div"),
        t = doc.createElement("textarea"),
        error = doc.createElement("div");
    hasBeenLoad = false,
    input = doc.createElement("input"),
    label = "Submit a post";

    function HTML2TXT(html) {
        var a = doc.createElement("div");
        a.innerHTML = html;
        return a.innerText || a.textContent || a.style.content;
    }

    var h2 = document.getElementsByTagName("h2");
    for (var i = 0, l = h2.length; i < l; i++) {
        elem = h2[i];
        if (elem.innerHTML.toLowerCase().indexOf("how to submit") != -1) {
            while (elem = elem.nextSibling) {
                if (elem.tagName == "UL") {
                    elem.innerHTML = '<li>Go on the <a href="http://www.reddit.com/r/fanons">r/fanons frontpage</a> and click on the link under the reddit logo.</li>';
                    break;
                }
            }
            break;
        }
    }

    if (doc.body.getAttribute("class").indexOf("listing-page") == -1 || !d) {
        return false;
    }
    d.style.padding = "0";
    if (doc.querySelector) {
        doc.querySelector('a[href="#sidebar"] + strong').style.display = "none"; // hide initial instructions
        label = doc.querySelector('.morelink a').innerHTML;
    }

    r.innerHTML = label;
    r1.className = "submit-fanons submit-fanons-v0-6"; // add classes to the link.
    r.href = "#";
    r.addEventListener("click", function () {
        if (hasBeenLoad) {
            c.style.display = (c.style.display == "none") ? "block" : "none";
            return false;
        }
        hasBeenLoad = true;
        c.className = "story-container";
        var h2 = doc.createElement("div"),
            button = doc.createElement("button");
        h2.innerHTML = "Submit your story"; // extra data
        h2.className = "story-h2";
        c.appendChild(h2);
        input.placeholder = "Your title";
        input.className = "story-title";
        c.appendChild(input);
        c.appendChild(doc.createElement("br"));
        t.placeholder = "Your story";
        t.className = "story-text";
        c.appendChild(t);
        error.className = "story-error";
        c.appendChild(error);

        button.innerHTML = "Submit";
        button.addEventListener("click", function () {
            var title = input.value,
                text = t.value;
            if (!title) {
                error.innerHTML = 'You need a title.';
                return false;
            }
            button.disabled = true;
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://anonymousbot.eu01.aws.af.cm/post.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "title=" + encodeURIComponent(title) + "&text=" + encodeURIComponent(text),
                onload: function (a) {
                    try {
                        a = eval("(" + a.responseText + ")");
                    }
                    catch (e) {
                        error.innerHTML = "A fatal error happened. Please try again later.";
                    }
                    if (a.success) {
                        location.href = a.data.url;
                    }
                    else {

                        error.innerHTML = HTML2TXT("Oh no ! An error just happened ! \n[" + a.error + "] : " + (a.details || ""));
                        button.disabled = false;
                    }
                }
            });
        }, false);
        c.appendChild(button);
        r1.parentNode.insertBefore(c, r1.nextSibling);
    }, false);
    r1.appendChild(r);
    d.insertBefore(r1, d.firstChild);
    /* Add classes*/
    doc.body.className += " extended-fanons greasemonkey-fanons greasemonkey-fanons-v0-6";


})();