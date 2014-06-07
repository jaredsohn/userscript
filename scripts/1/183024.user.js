// ==UserScript==
// @name          YouTube Comment Replacer
// @author	      rainbowhyphen
// @description   Replaces YouTube comments with Disqus comments!
// @match         http://*.youtube.com/watch?*
// @match         http://youtube.com/watch?*
// @match         https://*.youtube.com/watch?*
// @match         https://youtube.com/watch?
// @version		  0.1.7
// ==/UserScript==

function replaceComments() {
    var yt_comments = document.getElementById('watch-discussion');
    var disqus_thread = document.getElementById('disqus_thread');

    if (disqus_thread == undefined && yt_comments != undefined) {
        // Create the Disqus comments div.
        var container = yt_comments.parentNode;
        var dsq_comments = document.createElement('div');
        dsq_comments.id = 'disqus_thread';
        container.insertBefore(dsq_comments, yt_comments);

        // Add link to show/hide YouTube comments.
        var show_comments_link = document.createElement('a');
        var yt_comments_visible = false;
        show_comments_link.innerText = 'Show YouTube comments.';
        show_comments_link.style.display = 'block';
        show_comments_link.addEventListener('click', function(e) {
            if (yt_comments_visible) {
                show_comments_link.innerText = 'Show YouTube comments.';
                yt_comments.style.display = 'none';
            } else {
                show_comments_link.innerText = 'Hide YouTube comments.';
                yt_comments.style.display = 'block';
            }
            yt_comments_visible = !yt_comments_visible;
            e.preventDefault();
        })
        container.insertBefore(show_comments_link, yt_comments);

        // Hide YouTube comments.
        yt_comments.style.display = 'none';

        // Set up the Disqus comments scripts.
        var disqus_shortname = 'ytcr';

        var dsqvars = document.createElement('script');
        dsqvars.innerHTML = 'var disqus_identifier = "' + location.search.match(/v=([^&]+)/)[1] + '";';

        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';

        // Add the Disqus comments scripts (runs them).
        var ctx = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
        ctx.appendChild(dsqvars);
        ctx.appendChild(dsq);
    }
}

// Make sure the page is really set up.
setInterval(replaceComments, 1000);
