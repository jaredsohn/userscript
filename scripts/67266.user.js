// ==UserScript==
// @author         F.Ko-Ji
// @name           Twitter official RT to unofficial RT
// @namespace      http://blog.fkoji.com/
// @description    This script converts official RT to unofficial RT format.
// @version        0.1
// @include        http://twitter.com/
// ==/UserScript==

unsafeWindow.__convertOfficialReTweetToUnofficialReTweet = function() {
    var rtNodes = document.getElementsByClassName('share');
    var rtFromUsers = document.getElementsByClassName('timestamp-title');
  
    for (var i = 0; i < rtNodes.length; i++) {
        if (rtNodes[i].className.match(/replaced/)) {
            continue;
        }
        rtNodes[i].className += ' replaced';
  
        // who retweets?
        var fromUser = rtNodes[i].getElementsByClassName('timestamp-title')[0];

        // add RT, @
        var screenName = rtNodes[i].getElementsByClassName('screen-name')[0];
        rtNodes[i].getElementsByClassName('big-retweet-icon')[0].innerHTML = [
            '<strong><a href="/',
            fromUser.textContent,
            '">',
            fromUser.textContent,
            '</a></strong> ORT '
        ].join('');
        rtNodes[i].getElementsByClassName('big-retweet-icon')[0].className = '';
        screenName.textContent = '@' + screenName.textContent;
  
        // change icon
        rtNodes[i].getElementsByClassName('photo')[0].className += ' callback_target_' + fromUser.textContent;
        rtNodes[i].getElementsByClassName('photo')[0].src = '';
        var url = 'http://twitter.com/users/show.json?screen_name=' + fromUser.textContent;
  
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(res) {
                    var json = eval('(' + res.responseText + ')');
                    var target = document.getElementsByClassName('callback_target_' + json.screen_name)[0];
                    target.src = json.profile_image_url;
                    target.className = 'photo fn';
                }
            })
        }, 0);
    }
}
document.body.addEventListener("DOMNodeInserted", function(e) {
    unsafeWindow.__convertOfficialReTweetToUnofficialReTweet();
}, false);
unsafeWindow.__convertOfficialReTweetToUnofficialReTweet();
