// ==UserScript==
// @name        Improved Hacker News
// @namespace   news.ycombinator.com/*
// @description Makes Hacker News a little better.
// @include     https://news.ycombinator.com/*
// @version     1
// @grant       none
// ==/UserScript==
var defaultSettings = {
    highlightSelf: true,
    highlightedUsers: [], // [ { name: 'username', color: 'red' }, ... ]
    ignoreUsers: [], // [ 'username', ... ]
    ignorePosts: [], // [ /regex/, /regex/, ... ] matches title
    hideJobPostings: false,
    headerSearch: true,
    autoLinkDomains: true
};
var settings = defaultSettings;
// Load settings
function saveSettings() {
    window.localStorage.setItem('ImprovedHackerNews.settings', JSON.stringify(settings));
    console.log('saved');
}
if (window.localStorage.getItem('ImprovedHackerNews.settings')) {
    settings = JSON.parse(window.localStorage.getItem('ImprovedHackerNews.settings'));
    for (p in defaultSettings) {
        if (!(p in settings)) {
            settings[p] = defaultSettings[p];
        }
    }
} else {
    saveSettings();
}

var hackerNews, pageStyle;
window.addEventListener('load', function() {
    hackerNews = {
        username: document.querySelector('.pagetop a[href^=user]').textContent
    };
    pageStyle = '';
    loadUIMods();
    loadStyleMods();
    switch (window.location.pathname) {
        case "/news":
        case "/newest":
            loadListingMods();
            break;
        case "/user":
            if (window.location.href.endsWith('?id=' + hackerNews.username)) {
                loadProfileMods();
            }
            break;
        case "/item":
            loadItemMods();
            break;
    }
    var s = document.createElement('style');
    s.innerHTML = pageStyle;
    document.getElementsByTagName('head')[0].appendChild(s);
}, false);

function loadUIMods() {
    var header = document.querySelector('td[bgcolor$=ff6600]');
    var links = header.querySelector('.pagetop');
    header.querySelector('.pagetop a[href=news]').textContent = 'Improved Hacker News';
    if (settings.hideJobPostings) {
        var jobs = header.querySelector('a[href=jobs]');
        jobs.parentElement.removeChild(jobs.nextSibling);
        jobs.parentElement.removeChild(jobs);
    }
    var seperator = document.createElement('span');
    seperator.textContent = ' | ';
    links.appendChild(seperator);
    if (settings.headerSearch) {
    var search = document.createElement('input');
        search.type = 'text';
        search.className = 'search';
        search.placeholder = 'Search';
        search.addEventListener('keydown', searchKeyDown, false);
        links.appendChild(search);
    }
}

function loadStyleMods() {
    if (settings.highlightSelf) {
        highlightUser(hackerNews.username, 'blue');
    }
    for (var i = 0; i < settings.highlightedUsers.length; i++) {
        highlightUser(settings.highlightedUsers[i].name, settings.highlightedUsers[i].color);
    }
    pageStyle += '.search { margin-right: 5px; height: 20px; }';
}

function highlightUser(name, color) {
    pageStyle += 'a[href="user?id=' + name + '"]' +
        '{ color: ' + color + ' !important; }';
}

function searchKeyDown(e) {
    if (e.keyCode == 13) {
        window.location = createSearchString(e.target.value);
    }
}

function createSearchString(terms) {
    return 'https://www.hnsearch.com/search#request/all&q=' +
        escape(terms) + '&start=0';
}

function loadItemMods() {
    var author = document.querySelector('.subtext a[href^="user"]').textContent;
    pageStyle += 'a[href^="user?id=' + author + '"] { color: red !important; }';
    pageStyle += 'a[href^="user?id=' + author + '"]:after { color: grey; content: " [op]"; }';
}

function loadListingMods() {
    if (settings.headerSearch) {
        var _ = document.querySelector('form'); _.parentElement.removeChild(_);
    }
    var removed = 0; // TODO: Consider fetching more links from the next page to fill the gaps
    var list = document.querySelectorAll('tr')[3].querySelectorAll('tr');
    for (var i = 0; i < list.length - 3; i += 3) {
        var link = list[i].querySelectorAll('td')[2].querySelector('a');
        var domain = list[i].querySelectorAll('td')[2].querySelector('span.comhead');
        var domainSearch = document.createElement('a');
        var domainName = domain.textContent.substr(2,
            domain.textContent.length - 4);
        if (settings.autoLinkDomains) {
            domainSearch.href = createSearchString(domainName);
            domainSearch.textContent = domainName;
            domain.innerHTML = ' (' + domainSearch.outerHTML + ')';
        }
        function remove() {
            list[i].parentElement.removeChild(list[i + 2]);
            list[i].parentElement.removeChild(list[i + 1]);
            list[i].parentElement.removeChild(list[i]);
            removed++;
        }
        var author = list[i + 1].querySelector('a[href^=user]');
        if (author == null) { // This is a job posting
            if (settings.hideJobPostings) {
                remove();
            }
            continue;
        }
        if (settings.ignoreUsers.indexOf(author.textContent) != -1) {
            remove();
            continue;
        }
        for (var j = 0; j < settings.ignorePosts.length; j++) {
            if (settings.ignorePosts[j].test(link.textContent)) {
                remove();
                break;
            }
        }
    }
}

function loadProfileMods() {
    var table = document.querySelector('form tbody');
    var about = table.querySelectorAll('tr')[4];
    var hniSettings = document.createElement('tr');
    hniSettings.innerHTML += '<td valign="top">HNI Settings:</td>';
    hniSettings.innerHTML += '<td><span style="float: right"></span><textarea rows="15" cols="30"></textarea></td>';
    table.insertBefore(hniSettings, about);
    var text = hniSettings.querySelector('textarea');
    text.value = JSON.stringify(settings, null, '  ');
    var docs = hniSettings.querySelector('span');
    docs.innerHTML += '<b>highlightSelf</b>: If true, your username is shown in blue<br/>';
    docs.innerHTML += '<b>highlightedUsers</b>: [ { name: "username", color: "#123456" }, ... ]<br/>';
    docs.innerHTML += '<b>ignoreUsers</b>: [ "username", "username", ... ]<br/>';
    docs.innerHTML += '<b>ignorePosts</b>: [ /regex/, /regex/, ... ] matches on title<br/>';
    docs.innerHTML += '<b>hideJobPostings</b>: If true, jobs from YC companies are hidden<br/>';
    docs.innerHTML += '<b>headerSearch</b>: Move the search bar to the page header<br/>';
    docs.innerHTML += '<b>autoLinkDomains</b>: Change domains in listings to search links<br/>';
    
    docs.innerHTML += '<a href="#">Reset to defaults</a>';
    text.addEventListener('keyup', function() {
        try {
            settings = JSON.parse(text.value);
            console.log(settings.highlightSelf);
            saveSettings();
            text.style.border = null;
        } catch (a) {
            text.style.border = '2px solid red';
        }
    }, false);
    docs.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        settings = defaultSettings;
        text.value = JSON.stringify(settings, null, '  ');
    }, false);
}