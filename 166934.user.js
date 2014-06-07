// ==UserScript==
// @name       Bear Nuts Comic Simple Nav Tweak
// @version    0.7
// @description  Adds in keyboard navigation for comics using jQuery
// @include      /(http://)?www.bearnutscomic.com\/?$/
// @include      /^(http://)?www.bearnutscomic.com\/\d\d\d\d\/.+$/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  Ziggy Stardust, 2012+, http://twitter.com/yiffyjackyl
// ==/UserScript==

$(document).keyup(function(evt) {
    //$("#column .post .comicdate .nav")
    if(evt.which == 37 || evt.which == 104) { //left arrow
        //changeLocation($(".navi-prev").attr("href"))
        changeLocation($("#column .post .comicdate .nav")[0].children[0].href);
    }
    else if(evt.which == 39 || evt.which == 108) { //right arrow
        changeLocation($("#column .post .comicdate .nav")[0].children[1].href);
        //changeLocation($(".navi-next").attr("href"));
    }
});
function changeLocation(URL) {
    if(URL === undefined)
        return null;
    else
        $("#column-wrapper").load(URL + " #column-wrapper");
}
function readObject(obj) {
    var x = ""
    for(var key in obj) {
        x += key + " : " + obj[key] + "\n";
    }
    alert(x);
}