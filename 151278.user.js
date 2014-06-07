// ==UserScript==
// @name       HousePets Comic Simple Nav Tweak
// @version    1.1
// @description  Adds in keyboard navigation for comics using jQuery
// @include      /http://www.housepetscomic.com\/$/
// @include      /^http://www.housepetscomic.com\/\d\d\d\d\/.+$/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  Ziggy Stardust, 2012+, http://twitter.com/yiffyjackyl
// ==/UserScript==
var timeout = false;
setTimeout ( pageReloadTimer, 60000 );

$(document).keyup(function(evt) {
    if(evt.which == 37 || evt.which == 104) //left arrow
        changeLocation($(".navi-prev").attr("href"));
    else if(evt.which == 39 || evt.which == 108) //right arrow
        changeLocation($(".navi-next").attr("href"));
});
function changeLocation(URL) {
    if(URL === undefined)
        return null;
    else {
        if(!timeout)
        	$("#page-wide").load(URL + " #page-wide");
        else {
            timeout = false;
            location.replace(URL);
        }
    }
}
function pageReloadTimer() {
    // Periodically sets a flag to tell the changeLocation function
    // to update the entire page instead of only the #page-wide div
    timeout = true;
}