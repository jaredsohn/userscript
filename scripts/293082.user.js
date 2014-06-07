// ==UserScript==
// @name            Add Back Google Discussions
// @version         2.2
// @description     Adds back the Blog and Discussion filters to Google search results
// @include         *://www.google.tld/*
// @copyright       2014+, Josh Bjelovuk
// ==/UserScript==


var url = location.href;
var filterBox = document.getElementById('hdtb_more_mn');

window.addEventListener('hashchange', function() {
    url = location.href;
    if (url.indexOf('q=') > -1)
        waitForMutation();
});

if (url.indexOf('q=') > -1)
    addFilters();

function waitForMutation() {
    url = url.replace(/\?.*#/, '?');
    
    var observer = new MutationObserver(function() {
        filterBox = document.getElementById('hdtb_more_mn');
        addFilters();
        observer.disconnect();
    });
    
    observer.observe(document.getElementById('top_nav'), {childList:true, subtree:true, attributes:true});
}

function addFilters() {    
    if (url.indexOf('tbm=blg') > -1) {
        addCurrentlySelected('Blogs');
        addFilterType('dsc', 'Discussions');
    }
    else {
        addFilterType('blg', 'Blogs');
        if (url.indexOf('tbm=dsc') > -1)
       	    addCurrentlySelected('Discussions');
        else
            addFilterType('dsc', 'Discussions');
    }
}

function addCurrentlySelected(name) {
    var filterList = document.getElementById('hdtb_msb');
    var selectedItem = document.createElement('DIV');
    selectedItem.className = 'hdtb_mitem hdtb_msel';
    selectedItem.textContent = name;
    filterList.insertBefore(selectedItem, filterList.firstChild);
}

function addFilterType(val, name) {
    var filterType = document.createElement('DIV');
    filterType.className = 'hdtb_mitem';
    filterType.innerHTML = '<a class="q qs" href="'+ (url.replace(/&tbm=[^&]*/g,'') + '&tbm=' + val) +'">'+name+'</a>';
    filterBox.appendChild(filterType);
}