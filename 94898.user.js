// ==UserScript==
// @name           Rage Faces!
// @namespace      rage_faces
// @description    Adapted from FireFox version of Reddit Rage Faces, adapted from the Chrome Version - https://github.com/maranas/Reddit-Rage-Faces
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// ==/UserScript==
// Load jQuery when it becomes available

function GM_wait() {  
  jq = navigator.appVersion.search("Safari") != -1 ? jQuery : unsafeWindow.jQuery;
  if(typeof jq == 'undefined'){
    window.setTimeout(GM_wait,100);
  } else {
    $ = jq;
    init();
  }
}

GM_wait();

function init() {
    $.get("http://www.reddit.com/r/fffffffuuuuuuuuuuuu/stylesheet.css",
        function(data) {
            var styles = [];
            var pos = 0, end = 0, i = 0;
            while ((pos = data.indexOf("a[href=", end)) != -1) {
                end = data.indexOf("}", pos) + 1;
                styles[i++] = data.slice(pos, end);
            }
            $('head').append("<style type=\"text/css\" title=\"applied_subreddit_stylesheet\">" +
                styles.join("\n") + "</style>");
        }
    );
}