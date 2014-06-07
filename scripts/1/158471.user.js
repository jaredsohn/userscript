// ==UserScript==
// @name        Multi-reddit Ban Tool
// @namespace   http://www.reddit.com
// @version     1.0
// @description Adds the option to ban a user from all subreddits you moderate
// @match       http://www.reddit.com/r/*/about/banned/
// @copyright   2013+, Drew DeVault
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

// Generate elements
var form = document.getElementById('banned');
var checkBox = document.createElement('input');
checkBox.setAttribute('type', 'checkbox');
checkBox.setAttribute('name', 'all_reddits');
checkBox.setAttribute('id', 'all_reddits');
var label = document.createElement('label');
label.setAttribute('for', 'all_reddits');
label.setAttribute('title', 'Use with caution - this is meant mostly for spammers');
label.appendChild(document.createTextNode('Ban on all subreddits you moderate'));

form.appendChild(checkBox);
form.appendChild(label);

// Override default behavior
form.removeAttribute('onsubmit');
form.addEventListener('submit', submitOverride, false);

// Find add button
var button;
for (var i = 0; i < form.childNodes.length; i++) {
    if (form.childNodes[i].className == 'btn') {
        button = form.childNodes[i];
        break;
    }
}

function submitOverride(e) {
    e.preventDefault();
    button.setAttribute('disabled', '');

    var checkbox = document.getElementById('all_reddits');

    // Get subreddit details
    var subredditName = window.location.pathname.toString().split('/')[2];
    $.getJSON('/r/' + subredditName + '/about.json', function(response) {
        var subreddit = response.data;

        // We need their modhash
        $.getJSON('/api/me.json', function(me) {
            var modhash = me.data.modhash;
        
            if (!checkbox.checked) {
                // Just ban them on this subreddit
                $.post('/api/friend', {
                    action: 'add',
                    container: 't5_' + subreddit.id,
                    type: 'banned',
                    name: $("#name").val(),
                    id: '#banned',
                    r: subredditName,
                    uh: modhash,
                    renderstyle: 'html'
                    }, function(data) {
                        document.location.reload(true);
                });
            }
            else {
                // Super-ban this person
                $.getJSON('/reddits/mine/moderator.json', function(moderator) {
                    var bannedIndex = 0;
                    for (var i = 0; i < moderator.data.children.length; i++) {
                        var subreddit = moderator.data.children[i].data;
                        $.post('/api/friend', {
                            action: 'add',
                            container: 't5_' + subreddit.id,
                            type: 'banned',
                            name: $("#name").val(),
                            id: '#banned',
                            r: subreddit.display_name,
                            uh: modhash,
                            renderstyle: 'html'
                            }, function(data) {
                                bannedIndex++;
                                if (bannedIndex == moderator.data.children.length) {
                                    alert('Banned user on all subreddits you moderate.');
                                    document.location.reload(true);
                                }
                        });
                    }
                });
            }
        });
    });
    
    return false;
}