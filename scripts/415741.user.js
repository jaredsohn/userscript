// ==UserScript==
// @name       Steam Community home page auto upvote
// @version    0.1
// @description  Automatically upvotes your friends & groups posts, screenshots, etc.
// @match      http://steamcommunity.com/id/*/home
// @copyright  2014+, Asbra.net
// @require    https://raw.github.com/hazzik/livequery/master/dist/jquery.livequery.min.js
// ==/UserScript==

jQuery(document).ready(function() {
    function upvoteAll() {
        jQuery('.btn_grey_grey').each(function(){
            if(jQuery(this).hasClass('active') == false) {
                var id = jQuery(this).attr('id');
                
                if(id && 
                   (id.substr(0, 8) == 'vote_up_' || // Vote up friends status updates, "now owns", screenshots ..
                   id.substr(0, 9) == 'VoteUpBtn' || // Vote up group announcements
                   id.substr(0, 23) == 'RecommendationVoteUpBtn')) { // Vote up friends recommendations
                    jQuery(this).click();
                }
            }
        });
    }
    jQuery('.blotter_day').livequery(function() {
        upvoteAll();
    });
});