// ==UserScript==
// @name           Navbar Reincarnate 4 Realz
// @namespace      Navbar Reincarnate 4 Realz
// @description    Warning: Prolonged exposure will most likely cause you to flip blam.
// @include        http://*bungie.net/*
// ==/UserScript==

// WALL AHEAD

var footer = document.getElementsByClassName('fContent').item(0);
var navBar = document.createElement('div');
navBar.id = 'navBar';
navBar.innerHTML = '<div id="topper"><a href="/Community/" style="margin-left: 180px; margin-top: 13px;">Explore our Community</a><a style="margin-left: 250px; margin-top: -100px;" href="/Forums/">Forums</a><a style="margin-left: 360px; margin-top: -100px; width: 80px;" href="/Community/GroupSearch.aspx">Find Group</a><a style="margin-left: 450px; margin-top: -100px; width: 80px;" href="/Forums/topics.aspx?forumID=3">THE 7TH COLUMN Fanclub</a><a style="margin-left: 550px; margin-top: -100px; width: 50px;" href="/Community/content.aspx?link=bungie_affiliates">Links</a></div><div id="middle"><a class="games" href="/Projects/">games</a><a class="stats" href="/Online/">stats</a><a class="comm" href="/Forums/">community</a><a class="inside" href="/Inside/">inside bungie</a><a class="store" href="http://www.bungiestore.com">bungie store</a><a class="circle" href="/">bungie.net</a></div><div id="bottom"><a style="width: 93px;" href="http://www.bungie.net/help/privacy_statement.aspx">privacy statement</a><a style="width: 77px; margin-left: 104px;" href="http://www.bungie.net/help/terms_of_use.aspx">terms of use</a><a style="width: 93px; margin-left: 188px; margin-top: -17px;" href="http://www.bungie.net/help/code_of_conduct.aspx">code of conduct</a><a style="width: 33px; margin-left: 290px; margin-top: -17px;" href="http://www.bungie.net/inside/jobs.aspx">jobs</a><div id="right"><a style="width: 73px; margin-left: 12px;" href="http://www.bungie.net/help/contact_us.aspx">contact us</a><a style="width: 36px; margin-left: 88px;" href="http://www.bungie.net/help/">help</a></div></div>'
footer.parentNode.insertBefore(navBar, footer);GM_addStyle('#navBar { background: url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/nav_sprite2.png) no-repeat 0 -209px; bottom: 0; height: 156px; left: 0; position: fixed; width: 100%; z-index:9999; display: block;} #navBar #middle a { background: url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/nav_sprite2.png) no-repeat; display: block; width: 130px; height: 50px; text-indent: -9999px; overflow: hidden;} #navBar #middle a.games { background-position: 0 -75px; margin-left: 150px; margin-top: 10px; } #navBar #middle a.games:hover { background-position: 8px -133px; } #navBar #middle a.stats { background-position: -124px -75px; margin-left: 254px; margin-top: -50px; width: 120px; } #navBar #middle a.stats:hover { background-position: -116px -133px; } #navBar #middle a.comm { background-position: -231px -75px; margin-left: 347px; margin-top: -51px; width: 100px;} #navBar #middle a.comm:hover { background-position: -222px -133px; } #navBar #middle a.inside { background-position: -328px -75px; margin-top: -51px; margin-left: 430px; width: 100px; } #navBar #middle a.inside:hover { background-position: -328px -133px; } #navBar #middle a.store { background-position: -432px -75px; margin-left: 513px; margin-top: -50px; width: 100px; } #navBar #middle a.store:hover { background-position: -432px -133px; } #navBar #middle a.circle { background: transparent none !important; margin-left: 612px; margin-top: -107px; width: 160px !important; height: 140px !important; } #navBar #middle a#hovered { background: url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/oldbnetcircle.gif) no-repeat !important; } #navBar #middle a#off { background: url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/oldbnetcircle2.gif) no-repeat !important; } #topper { background: url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/nav_sprite2.png) no-repeat 0 0; visibility: hidden; height: 70px; margin-top: -9.5px; } #topper a { text-indent: -9999px; oveflow: hidden; display: block; height: 100px; width: 90px; }  #bottom { margin-top: -26px; margin-left: 153px; } #bottom a { margin-right: 12px; margin-top: -12px; text-indent: -9999px; overflow: hidden; display: block; } #bottom #right { margin-left: 324px; margin-top: -16px; }')
function showComm() {
var community_tab = document.getElementById('topper');
community_tab.style.visibility = 'visible';
}
function sepRemain() {
var ballzlol = document.getElementsByClassName('circle').item(0);
ballzlol.id = 'hovered';
}
function sepOff() {
var ballzlol = document.getElementsByClassName('circle').item(0);
ballzlol.id = 'off';
}
document.getElementsByClassName('comm').item(0).addEventListener("mouseover", showComm, true);document.getElementsByClassName('circle').item(0).addEventListener("mouseover", sepRemain, true);document.getElementsByClassName('circle').item(0).addEventListener("mouseout", sepOff, true);