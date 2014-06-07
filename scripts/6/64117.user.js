// ==UserScript==
// @name           Google Reader - Submit to HN
// @namespace      http://fitzgeraldnick.com
// @include        https://www.google.com/reader/*
// @include        http://www.google.com/reader/*
// @include        https://reader.google.com/*
// @include        http://reader.google.com/*
// ==/UserScript==

(function () {
    // Attach jQuery to the page and then we can get started!
    var jq = document.createElement("script");
    jq.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
    jq.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(jq);

    var hn = {

        main: function ($) {
            // Attach the submit links for the first time.
            hn.attach_links($("div#view-container div.entry-actions"));

            // Switching which feed you are looking at create new entry
            // elements which don't have submission links yet. The best
            // way to add submission links to these is to use setTimeouts
            // to check every now and then.
            setTimeout(this.update, 10);
        },

        update: function () {
            var $ = unsafeWindow.jQuery;
            var entries = $("div#viewer-container div#entries div.entry");

            // Find all the entries without submission links at the bottom.
            var without_links = entries.find("div.entry-actions").filter(function (index) {
                    return $(this).find("span.submit-to-hn").length === 0;
                });

            hn.attach_links(without_links);

            // Wait a little bit before checking for entries without links again.
            setTimeout(arguments.callee, 200);
        },

        attach_links: function(elements) {
            var $ = unsafeWindow.jQuery;

            // Attach Hacker News links to the bottom of each entry.
            var hn_link = $("<span class=\"submit-to-hn link\">Hacker News</span>");
            elements.append(hn_link);

            // Assigning the click function to ``hn_link`` and then
            // appending it doesn't work, we must attach the event after
            // the links have been created.
            elements.find("span.submit-to-hn").click(function (event) {
                    var title_link = $(this).parent().parent().parent().find("h2 a.entry-title-link");
                    var url = encodeURIComponent(title_link.attr("href"));
                    var title = encodeURIComponent(title_link.text());

                    // Open the submission page with url and title filled
                    // in already.
                    window.open(["http://news.ycombinator.com/submitlink?u=",
                                 url,
                                 "&t=",
                                 title].join(""),
				"_blank");
                });
        },

	init: function () {
            // Wait for jQuery to load before beginning.
            if (typeof unsafeWindow.jQuery === "undefined") {
                setTimeout(arguments.callee, 10);
            } else {
		unsafeWindow.jQuery.noConflict();
                hn.main(unsafeWindow.jQuery);
            }
        },
    };

    hn.init();
}());
