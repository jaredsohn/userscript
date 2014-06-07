// ==UserScript==
// @name           Paintball 2 Forums: Mark ALL messages as read
// @version        1.0.0
// @namespace      http://sk89q.therisenrealm.com
// @description    Adds the "Mark ALL messages as read" link to the "Recent Unread Topics" page
// @copyright      (c) 2008-2009 sk89q (http://sk89q.therisenrealm.com)
// @include        http://*dplogin.com/forums/index.php?action=unread
// @include        http://*dplogin.com/forums/index.php?action=unread;*
// @include        https://*dplogin.com/forums/index.php?action=unread
// @include        https://*dplogin.com/forums/index.php?action=unread;*
// ==/UserScript==
            
var sessionId = '';    
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    if (links[i].hasAttribute('href')) {
        var m;
        if (m = links[i].getAttribute('href').match(/sesc=([a-z0-9]+)/)) { // Logout link should be before the place we add the link
            sessionId = m[1];
        } else if (sessionId) { // Need the session ID to add the link
            if (m = links[i].getAttribute('href').match(/forums\/index\.php\?action=unread;all/) && !links[i].innerHTML.match(/Click here to try/)) {
                var markPostsReadLink = document.createElement('a');
                markPostsReadLink.appendChild(document.createTextNode('Mark ALL messages as read'));
                markPostsReadLink.setAttribute('href', 'http://dplogin.com/forums/index.php?action=markasread;sa=all;sesc='+sessionId);
                markPostsReadLink.addEventListener('click', function(e) {
                    if (!confirm('Are you sure?!?!1111one')) {
                        if (e.preventDefault) {
                            e.preventDefault()
                        }
                    }
                }, true);
                links[i].parentNode.appendChild(document.createTextNode(' | ')); // Add space
                links[i].parentNode.appendChild(markPostsReadLink);
                break;
            }
        }
    }
}