// ==UserScript==
// @name           Hudson Console Link (in View)
// @include        http://*
// ==/UserScript==

    if(unsafeWindow.console) {
        var GM_log = unsafeWindow.console.log;
    }

    function do_console_link_add_job() {
        try {
            var reS = /lastSuccessfulBuild/;
            var reF = /lastFailedBuild/;

            var links = document.body.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                for (var j = 0; j < link.attributes.length; j++) {
                    var el = link.attributes[j];
                    if (reS.test(el.nodeValue) || reF.test(el.nodeValue)) {
                        el.nodeValue += "console";
                    }
                }
            }
        } catch (e) {
          GM_log("Exception in HudsonConsoleLink: " + e);
        }
    }

    var jobs = do_console_link_add_job();
