// ==UserScript==
// @name        Delete All Tweets
// @namespace   koding.com
// @description deletes all tweets from your Twitter profile
// @include     *twitter.com*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==
var _dat_debug = true;
function gather_tweet_delete_links() {
    return $('li.action-del-container >> b');
}
function conf_delete_when_possible() {
    if (_dat_debug) {
        console.debug('conf_delete_when_possible()');
    }
    if ($('button.delete-action') .length > 0) {
        if (_dat_debug) {
            console.debug('found confirm button');
        }
        $('button.delete-action') .first() .click();
        wait_for_tweet_deleted(delete_a_tweet);
    } else {
        setTimeout(conf_delete_when_possible, 10);
    }
}
function wait_for_tweet_deleted(next_fn) {
    if (_dat_debug) {
        console.debug('wait_for_tweet_deleted');
    }
    if ($('a.account-group') .length <= 3) {
        if (window.location.href.contains('deleting_tweets')) {
            window.location = window.location.href.replace('#', '');
        } else {
            window.location = window.location.href.replace('#', '') + '?deleting_tweets';
        }
        return ;
    }
    if ($('#delete-tweet-dialog') .first() .css('display') != 'none') {
        setTimeout(wait_for_tweet_deleted, 500);
    } else {
        delete_a_tweet();
    }
}
function delete_a_tweet() {
    if (_dat_debug) {
        console.debug('delete_a_tweet()');
    }
    if ($('a.account-group') .length <= 3) {
        if (window.location.href.contains('deleting_tweets')) {
            window.location = window.location.href.replace('#', '');
        } else {
            window.location = window.location.href.replace('#', '') + '?deleting_tweets';
        }
        return ;
    }
    if ($('#retweet-tweet-dialog') .css('display') != 'none') {
        $('button.cancel-action') .first() .click();
        setTimeout(delete_a_tweet, 500);
        return ;
    }
    var del_link = gather_tweet_delete_links() .first();
    if (del_link.parent() .parent() .parent() .children('li.action-rt-container') .css('display') != 'none') {
        var unretweet_link = $(del_link.parent() .parent() .parent() .children('li.action-rt-container') .children('a') [1]) .children('b') .first();
        unretweet_link.click();
        for (i = 0; i < 6; i++) {
            unretweet_link = unretweet_link.parent();
        }
        unretweet_link.remove();
        setTimeout(delete_a_tweet, 500);
    } else {
        del_link.click();
        setTimeout(conf_delete_when_possible, 10);
    }
}
function deletetweets(evt) {
    if (_dat_debug) {
        unsafeWindow.console.debug('deletetweets()');
    }
    evt.defaultPrevented = true;
    if (confirm('All your tweets will be gone forever. This could take a long time. Ok?')) {
        delete_a_tweet();
    }
    return false;
}
function add_deletetweet_button_event() {
    if (_dat_debug) {
        console.debug('add_deletetweet_button_event()');
    }
    if ($('#delete-tweets-btn') .length > 0) {
        setTimeout(function () {
            $('#delete-tweets-btn') .click(deletetweets);
        }, 500);
    } else {
        if (_dat_debug) {
            console.debug('waiting to add event');
        }
        setTimeout(add_deletetweet_button_event, 100);
    }
}
function addui() {
    if (window.location.href.contains('deleting_tweets')) {
        delete_a_tweet();
        return ;
    }
    console.debug('addui()');
    if ($('#delete-tweets-btn') .length > 0) {
        if (_dat_debug) {
            console.debug('removing existing btn');
        }
        $('#delete-tweets-btn') .first() .remove();
        setTimeout(addui, 100);
        return ;
    }
    $('div.default-footer') .prepend('<a class="btn" id="delete-tweets-btn" style="margin: 10px 0px 10px 10px">Delete Tweets</a>');
    add_deletetweet_button_event();
}
addui();
