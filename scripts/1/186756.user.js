// ==UserScript==
// @name        LiveLeak Point Details
// @description Point Details page: highlight duplicate comments and add link to show comments inline.
// @namespace   http://userscripts.org/users/543210
// @include     *://www.liveleak.com/point?a=browse*
// @grant       none
// ==/UserScript==

function onFirstDocumentReady() {
    addGlobalStyle('.msg { margin: 0 0 10px 0 !important; } #comment_container > #comments { padding: 0px !important; } #comment_container > #comments > ul > li { padding: 0 !important; margin: 0 !important; border-bottom: none !important; } [id^="comment_replies_"] > #comments { padding: 0 3px !important; } [id^="comment_replies_"] > #comments > ul > li { padding: 10px 0 0 0 !important; margin: 10px 0 0 0 !important; border-bottom: none !important; border-top: 1px solid #D5D2D2 !important; } #comments > ul.pagenav { padding-top: 10px; } #comments > ul.pagenav > li { border-top: none !important; } [id^="lle_comment_content_"] { padding: 6px; }');
}

function onEveryDocumentReady() {
    var hrefs = { };
    $('td > a[href*="comment?a=view_comment&comment_id="]')
        .each(function() {
            if ($(this).data('llescanned')) return;
            
            // Keep timestamp on one line
            $(this).closest('tr').find('td').last().wrapInner('<nobr></nobr>');
            
            // Highlight duplicate comments
            var isDuplicate = !!hrefs[this.href];
            if (!isDuplicate) {
                hrefs[this.href] = true;
            }
            else {
                $(this).closest('tr').css('background-color', '#EEE');
            }
            
            // Add show/hide link
            var commentID = /comment_id=(\d*)/.exec(this.href)[1];
            if (!isDuplicate && commentID) {
                $(this).closest('td')
                    .append(' [<a href="javascript:void(0)" class="lle_toggle_comment_link">show</a>]')
                    .find('a.lle_toggle_comment_link')
                    .data('commentid', commentID)
                    .click(onToggleComment);
            }
            
            $(this).data('llescanned', true);
        });
}

function onToggleComment() {
    var commentID = $(this).data('commentid');
    var contentCellID = 'lle_comment_content_' + commentID;
    var $existingContentCell = $('#' + contentCellID);
    if ($existingContentCell.length && $existingContentCell.is(':visible')) {
        $existingContentCell.hide();
        $(this).text('show');
    }
    else {
        if ($existingContentCell.length) {
            $existingContentCell.show();
        }
        else {
            $(this).closest('td').parent().after('<tr><td id="' + contentCellID + '" colspan="7"></td></tr>');
            $('#' + contentCellID).load('comment?a=view_comment&comment_id=' + commentID + '&ajax=1');
        }
        $(this).text('hide');
    }
}

function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

setTimeout(function() { onFirstDocumentReady(); onEveryDocumentReady(); }, 0);

$(document).ajaxSuccess(function() { setTimeout(onEveryDocumentReady, 0); });