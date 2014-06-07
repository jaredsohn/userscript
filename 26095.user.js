// ==UserScript==
// @name          exi4chan
// @summary       View EXIF data for images posted to 4chan threads.
// @description   Adds an 'EXIF' link to view EXIF metadata for images posted to 4chan.
// @include       http://*.4chan.org/*/res/*.html*
// @include       http://*.4chan.org/*/*.html*
// ==/UserScript==

(function() {  // vim won't indent correctly without this -> )
    
    const EXIF_SITE_URL = 'http://regex.info/exif.cgi?url=';

    function add_exif_links() {
        // Make sure we're on a page we care about. 
        if (!document.getElementById("navtop")) {
            return;
        }

        var in_reply_mode = location.href.search('/res/') == -1 ? false : true;

        var add_link_function = in_reply_mode ? 
            add_to_thread_post : add_to_board_post;

        var spans = xpath_get("//form[@name='delform']//span[@class='filesize']");
        for (var i = 0; i < spans.snapshotLength; i++) {
            span = spans.snapshotItem(i);
            img_url_tag = span.getElementsByTagName('a')[0];
            add_link_function(span, img_url_tag, 
                    create_exif_link(img_url_tag.href));
        } 
    }

    function create_exif_link(url)
    {
        if (typeof this.link == 'undefined') {
            this.link = document.createElement('a');
            this.link.title = 'Display EXIF data for this image';
            this.link.target = '_blank';
            this.link.style.color = 'green';
            this.link.innerHTML = 'EXIF';
        } else {
            this.link = this.link.cloneNode(true);
        }

        this.link.href = EXIF_SITE_URL + url;
        return this.link;
    }

    function add_to_thread_post(span, img_url_tag, exif_link)
    {
        span.insertBefore(exif_link, 
                img_url_tag.nextSibling.nextSibling.nextSibling);
        span.insertBefore(document.createTextNode(', '), exif_link);
    }

    function add_to_board_post(span, img_url_tag, exif_link)
    {
        var img_info = img_url_tag.nextSibling;
        span.replaceChild(document.createTextNode(
                    img_info.textContent.split(')', 1)[0] + ', '), img_info);
        span.appendChild(exif_link);
        span.appendChild(document.createTextNode(')'));
    }

    function xpath_get(query) {
        return document.evaluate(query, document, null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    window.addEventListener("load", function() { add_exif_links(); }, false);
})();
