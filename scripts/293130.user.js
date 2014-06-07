// ==UserScript==
// @name        hackerrank download solutions
// @namespace   scturtle
// @include     https://www.hackerrank.com/*
// @version     0.3
// @grant       none
// ==/UserScript==
var url = document.location.toString();
function hr() {
    var challenge_name = /challenges\/([\w\-]*)+/.exec(url) [1];
    if (url.contains('/contests/'))
    var contest_name = /contests\/([\w\-]*)+/.exec(url) [1];
     else
    var contest_name = 'master';
    if ($('.leaderboard-list-view') .length == 0) {
        setTimeout(hr, 1000);
        return ;
    }
    $('.leaderboard-list-view') .each(function () {
        var a = $(this) .children('div') .children(':nth-child(2)') .children('p') .children('a');
        var user = a.html() .trim();
        if (a.parent() .children() .length != 1) return ;
        a.after('<a href="/rest/contests/' + contest_name + '/challenges/' + challenge_name + '/hackers/' + user
        + '/download_solution" data-analytics="Download Solution" target="_blank"><i class="icon-download"></i></a>');
    });
    //alert("done");
}
function scriptBody() {
    if (!url.contains('leaderboard')) return ;
    setTimeout(hr, 1000);
}
scriptBody()
document.querySelector('html') .addEventListener('DOMNodeInserted', function (ev) {
    var new_url = document.location.toString();
    if (url == new_url) return ;
    url = new_url;
    scriptBody();
});
