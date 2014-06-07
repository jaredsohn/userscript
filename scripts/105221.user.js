// ==UserScript==
// @name           metafilter_goodlistnr
// @namespace      http://userscripts.org/users/memebake
// @description    GoodListnr integration into MetaFilter sidebar
// @include        http://www.metafilter.com/
// ==/UserScript==

// based on http://userscripts.org/scripts/show/105149
// by ThomasColliers - many thanks
// Thanks to Plutor for GreaseMonkey help

// Content Scope 
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ everything2.toString() +')();'));
script.setAttribute("type", "application/javascript");
(document.body || document.head || document.documentElement).appendChild(script);

function everything2() {


// SETTINGS
var goodlistnr_url = "http://87.106.106.142/Room/mefi";
var goodlistnr_feed = "http://87.106.106.142/Feed/ActivityRss/FeedMefi";
var update_interval = 10;


function mefilistnr_init() {
    var cache = "..";
    var update = true;
    
    // show counter
    $('#menufooter').prepend('<p id="goodlistnr_sidebar" class="sidebartext"><a title="Go To GoodListnr" href="'+goodlistnr_url+'" target="_blank">GoodListnr&nbsp;&nbsp;(<span id="goodlistnr_count">'+cache+'</span>)</a></p>');
    // update roomcount if outdated
    if(update) getRoomCount();
}

function getRoomCount(){
    $.ajax({
        url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=' + encodeURIComponent(goodlistnr_feed),
        dataType: 'json',
        success: function(data) {
            roomCountLoaded(data.responseData.feed);
        }
    });
}
function roomCountLoaded(feed){
    var val = '?';
    if(feed.entries && feed.entries.length > 0) val = parseInt(feed.entries[0].title);
    $('#goodlistnr_sidebar #goodlistnr_count').html(val);
}

var self = this;
$(function(){
	mefilistnr_init();
});

}