// ==UserScript==
// @name           FollowRecommendations
// @namespace      http://example.org/ff
// @description    Adds follow recommendations from other users to sidebar
// @include        http://twitter.com*
// ==/UserScript==

var $ = null;
var stream = null;
var whoToFollow = null;
var newComponent = '<div class="component"><div class="user-rec-inner"><h2 class="user-rec-component"><a href="#" class="title-link">Follow Recommendations</a></h2><h3>Suggestions for you · <a id="followRefresh" href="#">refresh</a></h3><ul id="followRecommendations" class="recommended-followers user-rec-component"><li>test</li></ul></div><hr class="component-spacer"></div>';
var newItem = '<li data-user-id="##userId##" class="user-small-list-item"><a data-user-id="##userId##" class="user-profile-link user-thumb" href="/#!/##userName##"><img alt="##userName##" src="##imageUrl##"></a><a title="Hide" href="#" class="dismiss">×</a><div class="user-name-info"><a data-user-id="##userId##" href="/#!/##userName##" class="user-profile-link user-screen-name">##userName##</a><span data-user-id="##userId##" class="user-follow-state">· <a data-user-id="##userId##" class="user-follow-link follow-action" href="#">Follow</a></span><span class="user-full-name">##fullName##</span></div></li>';
function init() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(init, 1000); return; }
    $ = unsafeWindow.jQuery;
    $('#top-bar .active-links').css('width', '190px');
    $('#global-nav ul').append('<li id="global-nav-recommendations"><a href="#">Add Recommendations</a></li>');
    $('#global-nav-recommendations').click(function() { addRecommendations(); return false; });
    window.setTimeout(addRecommendations, 3000);
}
function addRecommendations() {
    $('#page-container .dashboard .component .promo').parent().parent().remove();
    if ($('#followRecommendations').length == 0) {
        $('#page-container .dashboard .component:last').before(newComponent);
        $('#followRefresh').click(function() { refreshFollowRecommendations(); return false; });
    }
    stream = $('#page-container .stream');
    whoToFollow = $('#followRecommendations');
    refreshFollowRecommendations();
}
function appendUser(screenName) {
    $.ajax({
        url: 'http://api.twitter.com/1/users/show.json',
        data: {screen_name: screenName},
        dataType: "jsonp",
        success: function(data) {
            var newItemReplaced = newItem;
            newItemReplaced = newItemReplaced.replace(/##userId##/gi, data.id);
            newItemReplaced = newItemReplaced.replace(/##userName##/gi, data.screen_name);
            newItemReplaced = newItemReplaced.replace(/##fullName##/gi, data.name);
            newItemReplaced = newItemReplaced.replace(/##imageUrl##/gi, data.profile_image_url);
            var item = $(newItemReplaced);
            item.find('a.dismiss').click(function() { $(this).parent().remove(); return false; })
            whoToFollow.append(item);
        }
    });
}
function refreshFollowRecommendations() {
    whoToFollow.html('');
    $('.stream-item', stream).each(function() {
        var item = $(this);
        var userName = $('.tweet-user-name', item);
        var tweetText = $('.tweet-text', item);
        var mentions = $('.twitter-atreply', tweetText);
        var containsHashtag = $('.twitter-hashtag[title="#ff"],.twitter-hashtag[title="#FF"],.twitter-hashtag[title="#FollowFriday"],.twitter-hashtag[title="#followfriday"]', tweetText).length;        
        if ((containsHashtag && mentions.length)) {
            mentions.each(function() { appendUser($(this).text()); });
        }
    });
}
init();