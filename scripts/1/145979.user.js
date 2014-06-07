// ==UserScript==
// @name           Twitter Lists Box
// @namespace      http://odyniec.net/
// @description    Adds a box with your lists to Twitter homepage to let you access them more easily
// @version        0.2.1
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @grant          none
// ==/UserScript==

(function () {

var done = false;
    
function displayLists(lists) {
    if (!lists) return;
    
    // Find the dashboard profile card
    var profileCard = document.querySelector('.DashboardProfileCard.module');
    
    // Do nothing if there's no profile card
    if (!profileCard)
        return;
    
    // Create a new module for the list of lists
    var listsModule = document.createElement('div');

    // Build the HTML structure
    listsModule.className = 'module lists';
    listsModule.innerHTML =
        '<div class="flex-module">' +
            '<div class="flex-module-header">' +
                '<h3>Lists</h3>' +
            '</div>' +
            '<div class="flex-module-inner">' +
                '<ul class="list-of-lists" />' +
            '</div>' +
        '</div>';

    // Get the list to append items to
    var ul = listsModule.querySelector('ul.list-of-lists'); 
    
    // Put the lists module below the profile card
    profileCard.parentNode.insertBefore(listsModule, profileCard.nextSibling);

    // Add the lists in alphabetical order
    Object.keys(lists).sort().every(function (name) {
        var li = document.createElement('li');
        ul.appendChild(li);
        li.outerHTML = '<li><a href="' + lists[name] + '">' + name +
            '</a></li>';
        // Keep going
        return true;
    });
}

// What's my name again?
var userScreenName =
    document.querySelector('.current-user[data-name="profile"] [data-user-id]')
        .getAttribute('data-screen-name');

var xhr = new XMLHttpRequest();
xhr.open("GET", 'https://twitter.com/' + userScreenName + '/lists');
// What do we want? A DOM document!
xhr.responseType = "document";
// When do we want it? In up to 5 seconds!
xhr.timeout = 5000;

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.responseXML) {
        var listItems = xhr.responseXML
            .querySelectorAll('.js-list .js-list-link');
        var lists = {};

        if (listItems.length) {
            // Map list names to URLs
            for (var i = 0; i < listItems.length; i++)
                lists[listItems[i].textContent.trim()] =
                    listItems[i].getAttribute('href');
            
            // Save lists in localStorage
            localStorage.setItem('lists', JSON.stringify(lists));
        }
    
        displayLists(lists);
        done = true;
    }
};

// Some of the times the request fails (and it seems to occur quite often in
// Firefox), if that happens we show the lists saved in localStorage
function displaySavedLists() {
    if (!done) {
        var listsJson = localStorage.getItem('lists');
        
        if (listsJson)
            displayLists(JSON.parse(listsJson));
    }
    done = true;
}

xhr.onerror = displaySavedLists; 
setTimeout(displaySavedLists, 5100);

// Go request, go!
xhr.send();

})();
