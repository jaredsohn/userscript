// ==UserScript==
// @name        Hummingbird+
// @namespace   dev.epic300.net
// @description Stuff for hummingbird
// @include     http://hummingbird.me/*
// @version     1.0.1
// ==/UserScript==
var url = window.location.href;

var backgroundC = "#1E1E1E";
var header = "#494949";
var elementsC = "#494949";
var menusC = "#353535";
var activeOption = "#212121";
var text1 = "#FFF";
var text2 = "#CCCCCC";
var text3 = "#FD864B"
var logo = document.getElementsByTagName("img")[0];


var toggleLi = document.createElement('li');
toggleLi.innerHTML = "<a id='toggleTheme' style='cursor:pointer; padding: 0 ;'>Switch Theme</a>";
document.getElementsByClassName("right")[0].appendChild(toggleLi);

//var settingsMenu = window.document.createElement('li');
//settingsMenu.setAttribute( "class", "has-dropdown");
//settingsMenu.setAttribute("style", "cursor:pointer;");
//settingsMenu.innerHTML = "<a>Change Theme</a><ul class='dropdown'><li><a id='default'>Defualt</a></li><li><a id='dark'>Dark</a></li></ul>";

var style = document.createElement('style');
style.setAttribute("ID", "colourScheme");
style.innerHTML = "";
document.getElementsByTagName("head")[0].appendChild(style);


toggleLi.addEventListener('click', function() {

    var styleE = document.getElementById('colourScheme');
    if (styleE.innerHTML === "") {
        logo.src = "https://dl.dropboxusercontent.com/u/6879851/hummingbird/hummingbird.png";
        localStorage['HummingbirdColourScheme'] = 'dark';
        styleE.innerHTML = "body{background:" + backgroundC + ";}.contain-to-grid, .top-bar, .top-bar-section li, .top-bar-section li a:not(.button){background:" + header + "!important; color:white;}";
        if (url == "http://hummingbird.me/") {
            styleE.innerHTML = "body{background:" + backgroundC + "; color:" + text2 + ";} h1, h2, h3, h4, h5, h6{color:" + text1 + "} .feed{background:" + elementsC + ";} .option-bar{background:" + menusC + ";} .option-bar .options ul li.active{background:" + activeOption + ";} .option-bar .options ul li{border-left:none ;} .home-content .trending-block{background:" + elementsC + ";} .home-content .forum-block {background:" + elementsC + ";} .home-content .side-advert{background:" + elementsC + ";} .contain-to-grid, .top-bar, .top-bar-section li, .top-bar-section li a:not(.button){background:" + header + "!important; color:white;} .feed .feed-list li.feed-item .feed-wrapper .anime-feed-genres a, .home-content .forum-block ul .topic-row .forum-title a {color:" + text2 + ";} google_image_div{background:white;}";
        } else if (url.substring(0, 32) == "http://hummingbird.me/community/") {
            styleE.innerHTML = "body{background:" + backgroundC + "; color:" + text2 + ";}.contain-to-grid, .top-bar, .top-bar-section li, .top-bar-section li a:not(.button){background:" + header + "!important; color:white;}.community .forum-container header, .community .forum-container .discussions { background:" + elementsC + ";} .community .forum-sidebar ul li span {background:" + menusC + "} .community a{color:" + text2 + "}.redactor_box{color:black;}";
        } else if (url.substring(0, 28) == "http://hummingbird.me/users/") {
            styleE.innerHTML = "body{background:" + backgroundC + "; color:" + text2 + ";} .contain-to-grid, .top-bar, .top-bar-section li, .top-bar-section li a:not(.button){background:" + header + "!important; color:white;}.feed{background:" + elementsC + ";} .user-watchlist .main-content .library-status-header, .option-bar{background:" + menusC + ";} .option-bar .options ul li.active{background:" + activeOption + ";} .feed .feed-list li.feed-item .feed-wrapper .anime-feed-genres a {color:" + text2 + ";} .option-bar .options ul li {border:none;} .user-watchlist .main-content .fake-table-row tr td, .user-watchlist .main-content .fake-table-row th{background:" + elementsC + ";}.user-watchlist .main-content .fake-table-row a {color:" + text1 + ";}";
        }
    } else {
        localStorage['HummingbirdColourScheme'] = 'default';
        logo.src = "/assets/logo-7fa49766482ae0a23327839f4d321c4a.jpg";
        styleE.innerHTML = "";
    }
}, false);

if (localStorage['HummingbirdColourScheme'] == "dark") {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    toggleLi.dispatchEvent(evt);
}