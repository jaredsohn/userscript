// ==UserScript==
// @name           facebook.com - apps remover+
// @version        0.2.7+
// @description    remove all apps stories from homepage and highlights bar
// @namespace      Kub4jz.cz
// @include        http://www.facebook.com/*home.php*
// @include        http://www.facebook.com/*profile.php*
// ==/UserScript==

var els = new Array();

function remove_external_stories() {

    for (var j = els.length-1; j >= 0; j--) {
        var el = document.getElementById(els[j]);
        if (el !== null) {
            el.parentNode.removeChild(el);
        }
    }

    var stories = document.getElementsByClassName("UIIntentionalStory_Body");

    for (i = stories.length-1; i >= 0; i--) {
        var html = stories.item(i).innerHTML;
        if (html.indexOf("facebook.com/apps")   >= 0
         || html.indexOf("quiz.applatform.com") >= 0
         || html.indexOf("apps.facebook.com")   >= 0) {

            var story = stories.item(i).parentNode;

            els.push(story.getAttribute('id'));
            story.parentNode.removeChild(story);
        }
    }

    for (k = stories2.length-1; k >= 0; k--) {
        var html = stories2.item(k).innerHTML;
        if (html.indexOf("facebook.com/apps")   >= 0
         || html.indexOf("quiz.applatform.com") >= 0
         || html.indexOf("apps.facebook.com")   >= 0) {

            var story = stories2.item(k).parentNode;

            els.push(story.getAttribute('id'));
            story.parentNode.removeChild(story);
        }
    }

    setTimeout(remove_external_stories, 1500);
}

function starter() {
    remove_external_stories();
}

window.addEventListener("load", starter, false);