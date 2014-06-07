// ==UserScript==
// @name       Search developer.opentext.com with Google
// @namespace  mailto:fprantl@opentext.com
// @version    0.1
// @description  Replaces the built-in search at developer.opentext.com by the
//               Google Custom Search searching this domain only.  The URL points
//               to my CSE but it can be modified.
// @match      *://developer.opentext.com/*
// @copyright  (c) 2014 OpenText GmbH
// ==/UserScript==

if (typeof $ !== undefined) {
    $(function () {
        var originalForm = $('form[action="/awd/search"]'),
            parent = originalForm.parent();
        if (originalForm) {
            console.log("Replacing the AppWorks search with the Google custom search...");
            $("<gcse:search></gcse:search>").insertAfter(originalForm);
            originalForm.remove();
            (function() {
                var cx = '006791522399351765273:14trghalcz4';
                var gcse = document.createElement('script');
                gcse.type = 'text/javascript';
                gcse.async = true;
                gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
                    '//www.google.com/cse/cse.js?cx=' + cx;
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(gcse, s);
            })();
            $("style").html(
                "div#___gcse_0 {\n" +
                "  display: inline-block;\n" +
                "  width: 25em  !important;\n" +
                "  float: right  !important;\n" +
                "}\n" +
                "div.gsc-control-cse {\n" +
				"  padding: 0 !important;\n" +
				"}\n"
            ).appendTo("head");
        }
    });
}