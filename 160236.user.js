
// ==UserScript==
// @name            linkdecrypter
// @namespace       http://userscripts.org/users/tommy
// @description     decrypter adf.ly, adfocus, linkbucks links into actual links on the fly/current website that u are visiting
// @include         *
// @version         1.0
// @grant           GM_xmlhttpRequest
// @run-at          document-start
// ==/UserScript==

addEventListener("DOMContentLoaded", function () {
    if (window.opera) {
        return;
    }
    try {
        var links = document.links;
        for (var i = 0; i < links.length; ++i)(function (i) {
            if (/(adf.ly|u.bb|j.gs)\/([\w\d]{3,5})|adfoc.us\/([^\/]+)|.*.linkbucks.com/i.test(document.links[i])) {
                document.links[i].style.display = "none"; //hide the link when decrypting
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "http://www.dead.altervista.org/bypasser/process.php",
                    data: "url=" + document.links[i],
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Referer": "http://www.dead.altervista.org/service.php"
                    },
                    onload: function (response) {
                        if (/href\s*=\s*["']([^'"]+)["']/i.exec(response.responseText)) {
                            document.links[i].href = RegExp.$1;
                        }
                        document.links[i].style.display = ""; // show the link after done...
                    }
                });
            }
        })(i)
    } catch (e) {
        console.log(e);
    }
}, false);