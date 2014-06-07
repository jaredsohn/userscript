// ==UserScript==
// @name            Extended YouTube Sidebar
// @version         1.0.1
// @author          KazutoTV
// @description     You will see more options in the sidebar
// @include	    *.youtube.com/*
// @updateVersion   0
// ==/UserScript==


var username = document.getElementById('yt-masthead-user-displayname').innerText;
var newMenu = '';

newMenu += '<a href="/user/'+ username +'" class="guide-item  narrow-item" data-channel-id="UCcMTfKgGf_7_3HC2hhEjrMw" data-upsell="guide"><span class="display-name">'+ username +'</span></a>';
newMenu += '<li style="list-style-type:none"><a class="guide-item " href="/my_videos" data-channel-id="watch_later">Uploads</a></li>';
newMenu += '<li style="list-style-type:none"><a class="guide-item " href="/my_favorites" data-channel-id="watch_later">Favorites</a></li>';
newMenu += '<li style="list-style-type:none"><a class="guide-item " href="/feed/watch_later" data-channel-id="watch_later">Watch later</a></li>';
newMenu += '<li style="list-style-type:none"><a class="guide-item " href="/feed/history" data-channel-id="history">History</a></li>';
newMenu += '<li style="list-style-type:none"><a class="guide-item " href="/channel/UCcMTfKgGf_7_3HC2hhEjrMw/videos?view=1" data-channel-id="playlists">Playlists</a></li>';
newMenu += '<li style="list-style-type:none"><a class="guide-item" href="/inbox" data-channel-id="messages">Messages</a></li>';
newMenu += '<li style="list-style-type:none"><a class="guide-item" href="/analytics" data-channel-id="messages">Analytics</a></li>';
newMenu += '<li style="list-style-type:none"><a class="guide-item" href="http://socialblade.com/youtube/user/'+ username +'" target="_blank">Social Blade</a></li>';

document.getElementById('gh-personal').innerHTML = newMenu;