// ==UserScript==
// @name           Hide all user details except yours
// @namespace      rarkenin
// @description    Hides any details that may cause vote bias, including usernames that one may recognize. To see vote totals, click on the empty space between the vote buttons.
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://askubuntu.com/*
// @include        http://meta.askubuntu.com/*
// @include        http://*.stackexchange.com/*
// @include        http://meta.*.stackexchange.com/* 
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


     function addOnclickVotes() {
        var spans = document.getElementsByTagName('span');
        for(var i = 0; i < spans.length; i++) {
            var span = spans[i];
            if(('/\vote-count-post\b/').match(span.className)) {
                anchor.onclick = function() {
                    this.style.color='rgb(119, 119, 119)';
                }
            }
        }
    }



addGlobalStyle("span.reputation-score, span.badge1, span.badge2, span.badge3, span.badgecount, div.accept-answer-link, div.user-gravatar32, div.user-details { display: none; }"); //hides undesired user info
addGlobalStyle("span.vote-count-post {color: #F7F7F7; }");
addGlobalStyle("#header span.reputation-score, #header span.badge1, #header span.badge2, #header span.badge3, #header span.badgecount { display: inline; }"); //unhides that info in the header (your own info)
addOnclickVotes();

