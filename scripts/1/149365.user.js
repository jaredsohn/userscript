// ==UserScript==
// @name       Shalen tchat
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://shalenity.com*
// @match      http://www.shalenity.com*
// @copyright  2012+, You
// ==/UserScript==
GM_xmlhttpRequest({
    synchronous: true,
    method: "GET",
    url: "http://netuxi.tk/tchat.php",
    onload: function (response) {
        var msg = prompt(response.responseText);
        if (msg != null) {
            GM_xmlhttpRequest({
                synchronous: true,
                method: "POST",
                url: "http://netuxi.tk/tchat.php?envoyer",
                data: "msg=" + msg + "&pseudo=abc222",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: function () {
                    GM_xmlhttpRequest({
                        synchronous: true,
                        method: "GET",
                        url: "http://netuxi.tk/tchat.php",
                        onload: function (response) {
                            var msg = prompt(response.responseText);
                            if (msg != null) {
                                GM_xmlhttpRequest({
                                    synchronous: true,
                                    method: "POST",
                                    url: "http://netuxi.tk/tchat.php?envoyer",
                                    data: "msg=" + msg + "&pseudo=abc222",
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    onload: function (response) {
                                        GM_xmlhttpRequest({
                                            synchronous: true,
                                            method: "GET",
                                            url: "http://netuxi.tk/tchat.php",
                                            onload: function (response) {
                                                var msg = prompt(response.responseText);
                                                if (msg != null) {
                                                    GM_xmlhttpRequest({
                                                        synchronous: true,
                                                        method: "POST",
                                                        url: "http://netuxi.tk/tchat.php?envoyer",
                                                        data: "msg=" + msg + "&pseudo=abc222",
                                                        headers: {
                                                            "Content-Type": "application/x-www-form-urlencoded"
                                                        },
                                                        onload: function (response) {
                                                            GM_xmlhttpRequest({
                                                                synchronous: true,
                                                                method: "GET",
                                                                url: "http://netuxi.tk/tchat.php",
                                                                onload: function (response) {
                                                                    var msg = prompt(response.responseText);
                                                                    if (msg != null ) {
                                                                        GM_xmlhttpRequest({
                                                                            synchronous: true,
                                                                            method: "POST",
                                                                            url: "http://netuxi.tk/tchat.php?envoyer",
                                                                            data: "msg=" + msg + "&pseudo=abc222",
                                                                            headers: {
                                                                                "Content-Type": "application/x-www-form-urlencoded"
                                                                            },
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    }
});