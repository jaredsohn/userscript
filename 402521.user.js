// ==UserScript==
// @name           fogbugz-markdown
// @version        1.3
// @namespace      ohnopub.net
// @description    Automatically reinterpret comments as markdown.
// @include        http://*.fogbugz.com/*
// @include        https://*.fogbugz.com/*
// @require https://code.jquery.com/jquery-1.10.2.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.1/marked.min.js
// ==/UserScript==

this.jQuery = jQuery.noConflict(true);
(function (jQuery) {
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
    /* Also http://imgur.com/MzceH02 */
    var stringEscapeForRegExp = function (string){
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    jQuery(document).ready(function () {
        var markedOptions = {
            renderer: new marked.Renderer()
        };

        var markedRendererLink = markedOptions.renderer.link;
        var linkBugRegExp = new RegExp('^([a-z0-9]{1,12}://' + stringEscapeForRegExp(window.location.hostname) + '/)?/?(default\\.asp)?\\?([0-9]+)$');
        markedOptions.renderer.link = function (href, title, text) {
            /* Add back the onmouseover="b1(ix, this);" to each bug link */
            var matches = linkBugRegExp.exec(href);
            if (matches)
                return jQuery('<span/>').append(jQuery('<a/>', {'class': 'markdown-bugref', href: matches[0], onmouseover: 'b1(' + JSON.stringify(matches[3]|0) + ', this);', text: text, title: title})).html();
            return markedRendererLink.apply(this, arguments);
        };

        jQuery('.bugevent.detailed .body, .pseudobugevent.detailed .body').each(function (i, elem) {
            var obj = jQuery(elem);
            /*
             * Detect preformatted (rich text) by text nodes with only
             * whitespace followed by an element containing text nodes
             * (empty or not, e.g. <p></p>).
             */
            var c = obj.contents();
            while (c.length && c[0].data && /^\s*$/.test(c[0].data))
                c.pop();
            /*
             * We have skipped the whitespace text nodes, now to see
             * if the first element is empty or not. Rich text is
             * mostly in <p/> elements and would have <span/>s
             * probably for formatting. Plain text only has <br/> if
             * anything. In plain text, we might thus encounter an
             * empty element *or* a non-empty text node but in rich
             * text that can never happen. Thus, if it’s not a text
             * node and not an empty element, assume it’s preformatted
             * rich text and abort.
             */
            if (c.length && !c[0].data && !jQuery(c[0]).is(':empty'))
                return;

            /*
             * Make buglinks into something that will survive the
             * markdown.
             */
            obj.find('a').each(function (i, elem) {
                var obj = jQuery(elem);
                obj.text('[' + obj.text() + '](' + obj.attr('href') + ')');
            });
            obj.html(marked(obj.text(), markedOptions));
        });

        /* style blockquote */
        jQuery('head').append(
            jQuery('<style/>', {
                text: 'blockquote {margin-left: 0; border-left: 0.25em solid #aaaaaa; border-left-color: rgba(127, 127, 127, 0.5); padding-left: 1.75em;}',
                type: 'text/css'
            }));
    });
})(jQuery);
