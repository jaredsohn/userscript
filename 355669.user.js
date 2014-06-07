// ==UserScript==
// @name       Chess by message mygames dynamic update
// @namespace  https://bcoffield.me/
// @version    1.0
// @description Dynamically updates the mygames page.
// @match      http://www.chessbymessage.com/
// @copyright  2014+, Brien Coffield
// ==/UserScript==


(function () {
    function loadScript(url, callback) {
        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function init() {
        originalTitle = window.document.title;
        getUpdates();
        setInterval(getUpdates, 30 * 1000);
    }

    function getUpdates() {
        $.get(location.href, function (data, textStatus, jqXHR) {
            var updates = $.parseHTML(data);
            for (var i = 0; i < updates.length; i++) {
                var update = updates[i];
                if (update.id === "pageContainer") {
                    var newHtml = $(update).find("#contentLeft").html();
                    $("#contentLeft").html(newHtml);
                    break;
                }
            }
            var yourMoveCount = $("td.ToMove:contains('Your Move')").length;
            if (yourMoveCount === 0) {
                window.document.title = originalTitle;
            } else {
                window.document.title = "(" + yourMoveCount + ") " + originalTitle;
            }
        });
    }

    loadScript("http://code.jquery.com/jquery-1.10.1.min.js", init);

})();
