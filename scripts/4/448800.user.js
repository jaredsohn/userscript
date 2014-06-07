// ==UserScript==
// @name       Auto-Play Anthem on Wikipedia country articles
// @namespace  http://smileybarry.com
// @version    0.2
// @description  Automatically play the anthem of a country (if available) when opening its Wikipedia article normally (no section link). (Kind-of like in Civilization)
// @match      http*://en.wikipedia.org/wiki/*
// @copyright  2014 Smiley Barry
//
// Use GM_config:
//
// @require            https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_deleteValue
// @grant              GM_log
// ==/UserScript==

// Consts
var ANTHEM_SELECTOR = ".anthem";
var ARTICLES_STORE_KEY = "Articles";
var USER_OPTIONS_SELECTOR = "#p-personal > ul";

var USER_OPTIONS_PLAY_ONCE = 'once';

function createUserOption(caption, click_event_handler) {
    var listEntry = document.createElement("li");
    var link = document.createElement("a");
    
    link.textContent = caption;
    link.href = "javascript:void(0);";
    link.onclick = click_event_handler;
    listEntry.appendChild(link);
	return listEntry;
}

function addUserOption(user_option) {
    var userOptions = $(USER_OPTIONS_SELECTOR);
    userOptions.prepend(user_option);
}

function getPastArticles() {
    var items = GM_getValue(ARTICLES_STORE_KEY);
    if (items == undefined) {
        // First time? Data cleared?
        items = []
        GM_setValue(ARTICLES_STORE_KEY, items);
    }
    
    return items;
}

function isArticleVisited(name) {
    var articles = getPastArticles();
    if (articles.indexOf(name) == -1) {
        return false;
    } else {
        return true;
    }
}

function addToPastArticles(article_name) {
    var articles = getPastArticles();
    if (!isArticleVisited(article_name)) {
        articles.push(article_name);
    }
    
    GM_setValue(ARTICLES_STORE_KEY, articles);
}

function clearPastArticles() {
    GM_deleteValue(ARTICLES_STORE_KEY);
    // Now re-init by calling "get".
    getPastArticles();
}

function getArticleName(url) {
    if (url == undefined) {
        // Use the local path.
        url = location.pathname;
    }
    var lastSlash = url.lastIndexOf("/");
    
    var name = url.substring(lastSlash + 1);
    
    return name;
}

function playAnthem() {
    $(ANTHEM_SELECTOR + " * .ui-icon-play").click();
}

function setupConfig() {
    GM_config.init(
        {
          'id': 'AutoplayAnthemConfig',
          'title': 'Autoplay Anthem Settings',
          'fields':
          {
            'once':
            {
              'label':   'Play only on first visit',
              'type':    'checkbox',
              'default': true
            },
            'clear':
    	    {
              'label': 'Clear Past Articles List',
              'section': ['Clear Past Articles List', 
"This script locally saves a list of articles with anthems that were \
played in the past, so it wouldn't autoplay anthems on those articles \
again. Clear the list to hear them again."],
              'type': 'button',
              'click': function() {
                  clearPastArticles();
              }
            },
          },
        }
    );
    
    var settings = createUserOption("Auto-play anthems", function(e) { GM_config.open(); });
    addUserOption(settings);
}

$(document).ready(function() {
    // Set up the configuration panel & link to it.
    setupConfig();
    
    // More than one anthem is confusing and shouldn't be handled.
    var hasAnthem = $(ANTHEM_SELECTOR).length == 1;
    // Don't annoy the user.
    var alreadyPlayed = isArticleVisited(getArticleName());
    var playOnce = GM_config.get(USER_OPTIONS_PLAY_ONCE);
    if (!playOnce) {
        // Ignore "alreadyPlayed", the user wants it to be played every time.
        alreadyPlayed = false;
    }
    
    if (location.hash == "") {
        // If this is a full link (not a section link), do it.
        if ((hasAnthem) && (!alreadyPlayed)) {
            playAnthem();
            if (playOnce) {
                // Don't add to history, we don't need it anyway.
            	addToPastArticles(getArticleName());
            };
        }
    }
    
});