// Customize Zeal
// Created by Riboflavin
// Version 1.2
// 
// ==UserScript==
// @name           Customize Zeal
// @author         Riboflavin
// @namespace      https://ssl.what.cd/
// @description    Change the background of the zeal stylesheet and more
// @include        http*://*.what.cd/*
// ==/UserScript==

//DO NOT EDIT THIS SECTION
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


//EDIT BELOW

//Change this image link to your desired background
addGlobalStyle(' html,#wrapper {background-image: url(http://whatimg.com/images/lpal2q6flt49sjtq6gf.jpg); background-attachment: fixed;background-repeat: repeat;} ')

//Fixes a FireFox bug in the 'Snatches' column
addGlobalStyle(' table.grouping > tbody > tr.torrent > td:first-child + td + td, table.no_grouping > tbody > tr.torrent > td:first-child + td, table.grouping > tbody > tr.group > td:first-child + td + td, table.grouping > tbody > tr.colhead > td:first-child + td + td, table.no_grouping > tbody > tr.group > td:first-child + td, table.no_grouping > tbody > tr.colhead > td:first-child + td, tr.group_torrent > td:first-child + td + td { text-indent: 0px;} ')

//Uncomment this line if you would like to change the main box opacity (.9 = 90%)
addGlobalStyle(' .box {opacity: .9;} ')

//Uncomment this line to make the Edition Info on the album pages stand out more
addGlobalStyle(' .edition_info {border-bottom: 1px #999 solid;border-top: 1px #999 solid;} ')

//Uncomment this line to add a background for the alert bar to make it easier to read
addGlobalStyle(' .alertbar {background-image: url(https://ssl.what.cd/static/styles/zeal/images/content.png);padding:4px;} ')