// ==UserScript==
// @name       Liberal.ca discussion board update
// @namespace  http://rmacfadyen.rmtrack.com/
// @version    0.1
// @description  Prototype of changes to liberal.ca/
// @match      http://www.liberal.ca/groups/canada/
// @copyright  2012+, Rob MacFadyen
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

// custom styles
var rmt_CommentRank = '.rmt_CommentRank { width: 3.30ex; float: left; margin-top: 15px; color: #c6c6c6; font-family: arial; font-size: large; text-align: right; }';
var rmt_Voting = '.rmt_Voting { line-height: 1.2; width: 4ex; font-weight: bold; font-size: small; float: left; margin-right: 4px; margin-left: 7px; background: transparent; overflow: hidden; }';
var rmt_CommentVoting = '.rmt_CommentVoting { line-height: 1.2; width: 3ex; font-weight: bold; font-size: small; float: left; margin-right: 0px; margin-left: 0px; background: transparent; overflow: hidden; } .rmt_CommentVoting A { display: block; width:1px; } div.activity-comments>ul { padding-left: 0px; } ';
var rmt_CommentAuthor = '.rmt_CommentAuthor { font-weight: bold; }';
var rmt_CommentScore = '.rmt_CommentScore { padding-left: 1.5ex; }';
var rmt_Score = '.rmt_Score { text-align: center; color: #c6c6c6; font-weight: bold; font-size: small; }';
var rmt_Threadines = 'div.activity-comments>ul { background-color: white; } DIV.activity-comments>UL>LI UL { border-left: 1px dotted #DDF; }';
var rmt_CollapseComment = '.rmt_CollapseComment { width: 18px; padding-right: 2px; display: inline-block;} DIV.rmt_CollapseComment>A { font: normal x-small verdana,arial,helvetica,sans-serif; } DIV.rmt_CollapseComment>A:hover { background-color: #555; color: white; }';

var pos = '.pos { margin-left: 0px; padding-right: 0px; } ';
var activity_meta_holder = '.activity-meta-holder { float: none; } div.activity-meta a { font-size: smaller; text-transform:uppercase; text-decoration: underline; margin-right: 2ex;} div.activity-meta SPAN { font-size: smaller; text-transform:uppercase; margin-right: 2ex;} .activity-meta .bpm-inner-text { text-decoration: underline; }';
var bpm_inner_text = ".bpm-inner-text { background-image: none; white-space: nowrap; } ";
var rvl_diminish = ".rvl-diminish { opacity: 1; } .rvl-boost { background-color: white; } .rvl-superboost { background-color: white; } ";
var acomment_options = '.acomment-options { margin-left: 20px; margin-top: -20px; }';
var activity_comments = 'div.activity-comments div.acomment-content { margin-left: 20px; margin-bottom: 0px; } div.activity-comments ul li { padding-top: 0px; padding-bottom: 0px; }';
var bp_primary_action = "a.bp-primary-action, #reply-title small a, A.bpm-report-link { font-size: smaller; text-transform:uppercase; text-decoration: underline; margin-right: 2ex; }";
var ac_reply_avatar = "DIV.ac-reply-avatar { display: none; } div.activity-comments form div.ac-reply-content { margin-left: 0px; padding-left: 0px; } /*div.activity-comments form .ac-textarea { padding: 0px; margin-bottom: 0px; height: 81px; } div.activity-comments form .ac-textarea TEXTAREA { height: 79px; }*/";

$('head').append(
    '<style type="text/css">' + 
    rmt_CommentRank + 
    rmt_Voting + 
    rmt_CommentVoting + 
    rmt_CommentAuthor + 
    rmt_CommentScore + 
    rmt_Score + 
    rmt_Threadines + 
    rmt_CollapseComment + 
    ac_reply_avatar +
    acomment_options + 
    activity_comments + 
    pos + 
    activity_meta_holder + 
    bpm_inner_text + 
    rvl_diminish + 
    bp_primary_action + 
    '</style>');


// hide top level comments
$('#activity-stream>LI>DIV.activity-comments').each(function () {
	$(this).hide();
});

var ArticleCount = 1;

// change format of posts
$('#activity-stream>LI').each(function () {

    // build the new topic rank, vote count, and voting block
    console.log($('.rvl-score', $(this)).length);
    var Score = $('.rvl-score', $(this)).first().html();
    var Voting =
        $(
            "<span class='rmt_CommentRank'>" + ArticleCount + "</span>" +
            "<div class='rmt_Voting rvl-vote'>" +
                "<div class='rmt_Score'>" + 
            		(Score !== undefined ? Score : '?') +
            	"</div>" +
            "</div>"
        );
        
    // move the existing vote up/dn buttons into the new voting block
    var UpVote = $('DIV.activity-meta A.pos', $(this));
    var DnVote = $('DIV.activity-meta A.neg', $(this));
    $('.rmt_Score', Voting).before(UpVote);
    $('.rmt_Score', Voting).after(DnVote);
    
    // show the new voting block just before the avatar
    $('DIV.activity-avatar', $(this)).before(Voting);
    
    // remove a bit of left overs that are no longer necesary
    $('DIV.activity-meta DIV.rvl-item.rvl-vote DIV.rvl-note').hide();
    $('DIV.activity-meta DIV.rvl-item.rvl-vote B.rvl-score').hide();
    $('DIV.activity-meta A.acomment-reply').next('SPAN').hide();
    
    // change the flag inappropriate to text
    $('DIV.activity-meta-holder A.bpm-report-link', $(this)).empty().html('Report');
    
    // add a show comments    
    var ThisTopic = $(this);
    var NumComments = $('DIV.activity-comments LI', ThisTopic).length;
    if (NumComments !== 0) {
        $('DIV.activity-meta A.acomment-reply', ThisTopic).before(
            $('<a href="#">' + NumComments + ' Comments</a>')
                .click(function(e) { 
                    e.preventDefault();
                    var Visible = $('DIV.activity-comments', ThisTopic).is(":visible");
                    $(this).text(Visible ? 'Show ' + NumComments + ' Comments' : 'Hide Comments');
                    if (!Visible && $(this).data('CommentsFixed') !== true) {
                        $('DIV.activity-comments LI:not(.show-all)', ThisTopic).each(function() { 
                        	var ThisComment = $(this);
                            
                            // fishout the vote links and vote count
                            var UpVote = $('DIV.acomment-options:first A.pos', ThisComment);
                            var DnVote = $('DIV.acomment-options:first A.neg', ThisComment);
                            var Score = $('DIV.rvl-item B.rvl-score', ThisComment).html();
                            
                            // add a reformated vote box
                            $('DIV.acomment-avatar:first', ThisComment)
                            	.before(
                                	$("<div class='rmt_CommentVoting rvl-vote' />")
                            			.append(UpVote)
                            			.append(DnVote)
                            	)
                            ;
                            
                            // Add a class to the comment author and add the score back
                            $('DIV.acomment-meta>A:first', ThisComment)
                            	.addClass('rmt_CommentAuthor')
                            	.before(
                                    $('<div class="rmt_CollapseComment" />')
                                    	.append(
                                            $('<a href="#">[-]</a>')
                                                .click(function (e) { 
                                                    e.preventDefault();
                                                    $('DIV.acomment-content:first', $(this).closest('LI')).toggle();
                                                    $('DIV.acomment-options:first', $(this).closest('LI')).toggle();
                                                    $('DIV.rmt_CommentVoting:first', $(this).closest('LI')).toggle();
                                                    $('FORM.ac-form', $(this).closest('LI')).hide();
                                                    $('UL', $(this).closest('LI')).toggle();
                                                    if ($(this).text() == '[-]') {
                                                        $(this).closest('DIV.acomment-meta').css({ 'padding-left': '20px' });
                                                        $(this).text('[+]');
                                                    }
                                                    else {
                                                        $(this).closest('DIV.acomment-meta').css({ 'padding-left': '0px' });
                                                        $(this).text('[-]');
                                                    }
                                                })
                                              )
                                            
                                )
                            	.after('<span class="rmt_CommentScore">' + Score + ' points</span>')
                            ;
                            
                            // Remove the "dots" between links
                            $('A.acomment-reply', ThisComment).next('SPAN').remove();
                            $('A.acomment-reply', ThisComment).next('SPAN').remove();
                            
                            // remove the score
                            $('.rvl-score', ThisComment).parent().hide();
                            
                            // hide the avatars
                            $("DIV.acomment-avatar", ThisComment).hide();
                        });
                        
                        $(this).data('CommentsFixed', true);
                    }
                    $('DIV.activity-comments', ThisTopic).toggle();
                })
        );
    }
    else {
        $('DIV.activity-meta A.acomment-reply', ThisTopic).before(
            $('<span>0 Comments</span>')
        );
    }
    
    // on to the next topic
    ArticleCount += 1;
});

// change the comment links classes so we can intercept their clicks
$('A.acomment-reply').each(function() { 
	$(this)
    	.removeClass('acomment-reply')
    	.click(function (e) { e.preventDefault(); ShowCommentForm($(this)); })
    ;
});

function ShowCommentForm(target) {
    var id = target.attr('id');
    var ids = id.split('-');
    var a_id = ids[2]
    var c_id = target.attr('href').substr(10, target.attr('href').length);
    var form = $('#ac-form-' + a_id);
    form.css('display', 'none');
    form.removeClass('root');
    $('.ac-form').hide();
    form.find('input[name=parent_id]').val((c_id) ? c_id : a_id);
    form.children('div').each(function() {
        if ($(this).hasClass('error'))
            $(this).hide();
    });
    if (ids[1] != 'comment') {
        // reply to an existing comment
        target.closest('DIV.acomment-options').after(form);
        console.log('here');
    } else {
        // top level
        $('li#activity-' + a_id + ' div.activity-comments').before(form);
    }
    if (form.parent().hasClass('activity-comments'))
        form.addClass('root');
    form.slideDown(200);
    //$.scrollTo(form, 500, {offset: -100,easing: 'easeOutQuad'});
    $('#ac-form-' + ids[2] + ' textarea').focus();
    return false;
}
