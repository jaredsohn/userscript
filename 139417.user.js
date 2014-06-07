// ==UserScript==
// @name       GitHub Pull Request Approval Enhancement
// @namespace  jpi
// @version    0.6
// @description  
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match      https://github.etsycorp.com/*/pull/*
// @match      https://*github.com/*/pull/*
// @copyright  2012
// ==/UserScript==

(function($) {
    var comments = {},
        write_bucket = null,
        approval_regex = /(lgtm|approved)/i,
        rejected_regex = /rejected/i,
        clear_regex = /(lgtm\:|approved\:|rejected\:)/i,
        approved_style = {
            'float': 'left',
            'padding': '3px 10px',
            'margin-top': '-2px',
            'margin-right': '8px',
            'font-size': '12px',
            'font-weight': 'bold',
            'color': 'white',
            'background': '#6CC644',
            'border-radius': '3px',
            'text-transform': 'capitalize'
        },
        rejected_style = {
            'float': 'left',
            'padding': '3px 10px',
            'margin-top': '-2px',
            'margin-right': '8px',
            'font-size': '12px',
            'font-weight': 'bold',
            'color': 'white',
            'background': 'red',
            'border-radius': '3px',
            'text-transform': 'capitalize'
        },
        inner_approval_style = {
            'margin-top' : '4px',
            'float' : 'left',
            'height' : '22px',
        },
        approvals = null;

    // Find the post comment form so we can approve/deny easily
    function findWriteBucket() {
        write_bucket = $('form.js-new-comment-form [id^=write_bucket_] textarea');
        $('div.form-actions button.primary').prop('id', 'post-comment');
    }

    // First get a list of all approval comments on the page then parse them
    function parseComments() {
        comments = {};
        $('[id^=issuecomment-]').each(function (index) {
            var div_id = $(this).attr('id'),
                author = $('#' + div_id + ' div.comment-header a.comment-header-author').html(),
                comment_contents = $('#' + div_id + ' .comment-body p').html(),
                approved = comment_contents.search(approval_regex) >= 0,
                rejected = comment_contents.search(rejected_regex) >= 0;
            // TODO: Time

            if (approved || rejected) {
                comment_contents = comment_contents.replace(clear_regex, "");
                comments[div_id] = {
                    comment: comment_contents,
                    user: author,
                    id: div_id,
                    approval: approved
                };
                $(this).parent().parent().parent().hide();
            }
        });
    }

    // Add list of approvals/rejections to top of timeline
    function renderApprovalDiv() {
        $.each(comments, function (index, value) {
            if (value) { 
                if (value.approval) {
                    addApproval(value.comment, value.user, 'approved');
                } else {
                    addApproval(value.comment, value.user, 'rejected');
                }
            }
        });
        $('.inner-approval').css(inner_approval_style);
        addStyles();
        addApproveButtons();
    }

    // Add Styles to all approval/rejection spans
    function addStyles() {
        $('span.approved').css(approved_style);
        $('span.rejected').css(rejected_style);
    }

    // Add an approval to the Approve/Reject div
    function addApproval(comment, user, type) {
        prepareApprovalContainer();
        approvals.append('<div class="inner-approval"><span class="' + type + '">' + type + '</span> <strong>' + user + 
                '</strong> ' + 
                (comment ? 'with this comment: ' + comment + '</div>' : ''));
        approvals.append('<div style="clear: left;" />');
    }

    // Create the container if necessary to show approvals
    function prepareApprovalContainer() {
        if (!approvals) {
            var discussion_timeline = $('div.discussion-timeline');
            discussion_timeline.prepend('<div class="new-comments" style="width: 58%;"><div class="comment starting-comment"><div id="approvals" class="bubble"></div></div></div><br/>');
            approvals = $('#approvals'); 
            approvals.css('background', 'white');
            created_approval_container = true;
        }
    }

    // Redraw approvals
    function redrawApprovals() {
        prepareApprovalContainer();
        approvals.text('');
        parseComments();
        renderApprovalDiv();
        window.scrollTo(0, approvals.offset().top);
    }

    // Add quick approve/reject buttons
    function addApproveButtons() {
        var form_actions = $('div.form-actions button').filter(function (index) { return this.innerText == 'Comment'; }).parent();
        $('form div.form-actions .tip').hide();
        form_actions.append('<button type="submit" class="button primary approveit"><span>Approve</span></button> <button type="submit" class="button primary rejectit"><span>Reject</span></button>');
        $('button.approveit').on('click', function (e) {
            e.preventDefault();
            if (write_bucket.val().search(approval_regex) == -1) {
                var new_comment = 'approved' + (write_bucket.val() ? ': ' : '') + write_bucket.val();
                write_bucket.val(new_comment);
            }
            $('button#post-comment').click();
            setTimeout(redrawApprovals, 1000);
        });

        $('button.rejectit').on('click', function (e) {
            e.preventDefault();
            if (write_bucket.val().search(rejected_regex) == -1) {
                var new_comment = 'rejected' + (write_bucket.val() ? ': ' : '') + write_bucket.val();
                write_bucket.val(new_comment);
            }
            $('button#post-comment').click();
            setTimeout(redrawApprovals, 1000);
        });
    }

    findWriteBucket();
    parseComments();
    renderApprovalDiv();
})(jQuery);


