// ==UserScript==
// @name !*UPDATE*! Blaues SVZ
// @namespace SaW nO.3 - juliushaertl@gmail.com
// @description !*UPDATE*! Blaues SVZ
// @include http://*schuelervz.net/*
// ==/UserScript==

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}
addGlobalStyle('.pinboard_Navi {border-bottom: 1px solid #0E4463; background-color: #A7CDE3;}
.friendsListLinks {background: #A7CDE3;}
.friendsInfo {border-bottom: 1px solid #0E4463; background-color: #A7CDE3;}
#profileRight h2 a {color:#ccc;}
#profileRight h2 a:hover {color: #ccc;}
.friendsSearchBox {background-color: #A7CDE3; border-bottom: 1px solid #0E4463;}
#FriendsList .pagerCont {background-color: #A7CDE3;}
.friendsWrap {background-color: #A7CDE3;}
.resultsRow {background-color: #A7CDE3;}
#Search_Results #GroupList {background-color: #A7CDE3;} 
#topHeader{ width:628px; height:40px; background-image:url(http://img233.imageshack.us/img233/4373/topbglb4um3.png);background-color:#096EA9 } #content {border-left: 1px solid #096EA9;border-right: 1px solid #096EA9;} #pageHeader { background: #096EA9; color: #fff;border-left: 1px solid #096EA9;border-right: 1px solid #096EA9;border-bottom: 1px solid #096EA9;}h2, .mH {color: #fff;background: #0E4463;border-top: 1px solid #096EA9;border-bottom: 1px solid #096EA9;} a {color: #0E4463;}.linkList li {border-bottom: 1px solid #0E4463;}.linkList a:hover {text-decoration: none;color: #fff;background-color:#0E4463;}ul#tabBar {border-bottom: 1px solid #0E4463;}#tabBar li.selected {background-color: #0E4463;}#tabBar li:hover {background-color:#0E4463; color:#fff;}#tabBar li.selected:hover {background-color: #0E4463;}#tabBar li a {color:#0E4463 !important;}#tabBar li.selected a {color: #fff !important;}input.fieldBtnSubmit,input.fieldBtnCancel {color: #fff;background: #0E4463;}img.m {padding:3px;} #startLeft h2 {border-top:none;border-bottom-color:#0E4463;}.RegBtnContainer .floatL {background-color: #eee;}.threadPageCounter {background-color: #ddd;}.threadWrap {background-color: #ddd;}h3 {color: #0E4463;}.pinboard_Entry p a {color: #0E4463;}#Messages_List th {background-color:#eee;}#pageFooter {background-color:#A7CDE3;}#Kds {border-left: 1px solid #A7CDE3;border-bottom: 1px solid #A7CDE3;}.microblogInfo {background-color:#A7CDE3;border-bottom:1px solid #0E4463;}.friendsSearchBox {background-color: #A7CDE3;border-bottom: 1px solid #0E4463;} .resultsRow {background-color:#A7CDE3;}.pinboard_Navi {border-bottom: 1px solid #0E4463; background-color: #A7CDE3;}.friendsListLinks {background: #A7CDE3;}.friendsInfo {border-bottom: 1px solid #0E4463; background-color: #A7CDE3;}#profileRight h2 a {color:#ccc;}#profileRight h2 a:hover {color: #ccc;}.friendsSearchBox {background-color: #A7CDE3; border-bottom: 1px solid #0E4463;}#FriendsList .pagerCont {background-color: #A7CDE3;}.friendsWrap {background-color: #A7CDE3;}.resultsRow {background-color: #A7CDE3;}#Search_Results #GroupList {background-color: #A7CDE3;} ');

document.images[ 1].src="http://img519.imageshack.us/img519/2888/logojl7nd2.png";