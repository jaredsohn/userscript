/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           FetLife Video Sharer
// @version        0.1.2
// @namespace      com.maybemaimed.fetlife
// @updateURL      https://userscripts.org/scripts/source/162865.user.js
// @description    Lets you share videos on FetLife with anyone for free.
// @include        https://fetlife.com/*
// @grant          GM_addStyle
// @grant          GM_log
// ==/UserScript==

FL_VIDSHARE = {};
FL_VIDSHARE.CONFIG = {
    'debug': false, // switch to true to debug.
};

// Utility debugging function.
FL_VIDSHARE.log = function (msg) {
    if (!FL_VIDSHARE.CONFIG.debug) { return; }
    GM_log('FETLIFE VIDEO SHARER: ' + msg);
};

// Initializations.
var uw = (unsafeWindow) ? unsafeWindow : window ; // Help with Chrome compatibility?
GM_addStyle('\
');
FL_VIDSHARE.init = function () {
    FL_VIDSHARE.main();
};
window.addEventListener('DOMContentLoaded', FL_VIDSHARE.init);

// This is the main() function, executed on page load.
FL_VIDSHARE.main = function () {
    // Scan page for any FetLife video links.
    var vid_links = [];
    for (var i = 0; i < document.links.length; i++) {
        if (document.links[i].getAttribute('href').match(/videocdn\.fetlife\.com\/videos\/\S+\/encoded\.mp4$/)) {
            vid_links.push(document.links[i]);
        }
    }
    // For any found, add a "share this video" link.
    for (var i = 0; i < vid_links.length; i++) {
        var id = 'fetlife-video-sharer-link-' + i;
        FL_VIDSHARE.injectDialog(id, vid_links[i].getAttribute('href'));
        var trigger_el = document.createElement('a');
        trigger_el.setAttribute('class', 'opens-modal');
        trigger_el.setAttribute('data-opens-modal', id);
        trigger_el.setAttribute('data-opens-modal', id);
        trigger_el.innerHTML = '(share this video)';
        var before = vid_links[i];
        before.parentNode.insertBefore(trigger_el, before.nextSibling);
    }
    var sv = document.getElementById('video');
    if (sv) {
        // Grab the direct video link.
        var m = sv.innerHTML.match(/videocdn\.fetlife\.com\/videos\/\S+\/encoded\.mp4/);
        if (m) {
            FL_VIDSHARE.log('Found match in #video element.');
            FL_VIDSHARE.injectDialog('fetlife-video-sharer-share-this-video', 'https://' + m[0]);
            var trigger_el = document.createElement('a');
            trigger_el.setAttribute('class', 'opens-modal');
            trigger_el.setAttribute('data-opens-modal', 'fetlife-video-sharer-share-this-video');
            trigger_el.setAttribute('data-opens-modal', 'fetlife-video-sharer-share-this-video');
            trigger_el.setAttribute('href', '#');
            trigger_el.innerHTML = '<strong><big>Share this video!</big></strong>';
            var li = document.createElement('li');
            li.appendChild(trigger_el);
            document.querySelector('li.duration').parentNode.appendChild(li);
        }
    }
};

FL_VIDSHARE.injectDialog = function (id, vid_url) {
    var id = id || 'fetlife-video-sharer-link-0';
    // Inject dialog box HTML. FetLife currently uses Rails 3, so mimic that.
    // See, for instance, Rails Behaviors: http://josh.github.com/rails-behaviors/
    var dialog = document.createElement('div');
    dialog.setAttribute('style', 'display: none; position: absolute; overflow: hidden; z-index: 1000; outline: 0px none;');
    dialog.setAttribute('class', 'ui-dialog ui-widget ui-widget-content ui-corner-all');
    dialog.setAttribute('tabindex', '-1');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-labelledby', 'ui-dialog-title-' + id);
    var html_string = '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" unselectable="on" style="-moz-user-select: none;">';
    html_string += '<span class="ui-dialog-title" id="ui-dialog-title-' + id + '" unselectable="on" style="-moz-user-select: none;">Share this video!</span>';
    html_string += '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button" unselectable="on" style="-moz-user-select: none;">';
    html_string += '<span class="ui-icon ui-icon-closethick" unselectable="on" style="-moz-user-select: none;">close</span>';
    html_string += '</a>';
    html_string += '</div>';
    html_string += '<div data-modal-title="Share this video!" data-modal-height="280" data-modal-auto-open="false" class="modal ui-dialog-content ui-widget-content" id="' + id + '">';
    html_string += '<p>The <em style="font-size:larger;">free, direct link</em> to this video is:</p>';
    html_string += '<p><a href="' + vid_url + '">' + vid_url + '</a></p>';
    html_string += '<p>How would you like to help others get their perv on?</p>';
    html_string += '<p id="' + id + '-actions" class="ac">';
    html_string += '<a rel="nofollow" href="https://twitter.com/intent/tweet/?text=' + encodeURIComponent(vid_url) + '" target="_blank">Tweet link to video</a>';
    html_string += '<span class="i s q">&nbsp;-or-&nbsp;</span>';
    html_string += '<a rel="nofollow" href="mailto:?subject=' + encodeURIComponent('Check out this hot video!') + '&body=' + encodeURIComponent(vid_url) + '" target="_blank">Send link to video in email</a>';
//    html_string += '<span class="i s q">&nbsp;-or-&nbsp;</span>';
//    html_string += '<a rel="nofollow" href="https://fetlife.com/conversations/new?with=" target="_blank">Send link to video in FetLife Conversation</a>';
    html_string += '<span class="i s q">&nbsp;-or-&nbsp;</span>';
    html_string += '<a data-closes-modal="' + id + '" class="close tdn q" href="#">Cancel</a>';
    html_string += '</p>';
    html_string += '</div>';
    dialog.innerHTML = html_string;
    document.body.appendChild(dialog);
};
