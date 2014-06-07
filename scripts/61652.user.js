// ==UserScript==
// @name        Link Shrinker
// @namespace   http://fluidapp.com
// @description Abbreviates the text of links in Basecamp, to protect the page layout.
// @include     *
// @author      Graham Ashton <graham@effectif.com>
// ==/UserScript==

(function () {
    if (window.fluid) {
        $$("div.formatted_text_body a").each(function(link) {
            if (link.text.length > 60) {
                if (! link.readAttribute("title")) {
                    link.writeAttribute("title", link.text);
                }
                link.update(link.text.slice(0, 60) + "&hellip;");
            }
        });
        $("edit_body").down("textarea").setStyle({ width: "508px" });
    }
})();
