// ==UserScript==
// @name           Soulwell dark
// @description    Soulwell dark
// @include        https://www.soulwell.cz/*
// @include        https://soulwell.cz/*
// @include        http://www.soulwell.cz/*
// @include        http://soulwell.cz/*  
// @exclude        https://www.soulwell.cz/forum*
// @exclude        https://soulwell.cz/forum*
// @exclude        http://www.soulwell.cz/forum*
// @exclude        http://soulwell.cz/forum* 
// @version        0.9.5
// @grant          none
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

addGlobalStyle ('#mainContainer {display: block; position: relative;    width: 1100px;     margin: 0 auto 0 auto;    background-color: #181818 !important;    margin-top: -5px;    box-shadow: 0px 1px 15px #222;    border: 1px solid #888888;    border-top: 0px;    background-color: #181818 !important;    overflow: hidden;}');
addGlobalStyle ('h1, h2, h3, h4, h5, h6 {font-family: Signika, Helvetica, Arial, sans-serif;     text-shadow: 1px 1px 4px #1b1b1b !important;    text-shadow: inset 0 3px 3px #CFCFCF;    color: #CFCFCF;}');
addGlobalStyle ('#online_total a { color: white;}');
addGlobalStyle ('body {color: #D2D2D2;}');
addGlobalStyle ('.chatLine.light {background-color: #343434;}');
addGlobalStyle ('.descriptionChat {  font-family: Signika, Helvetica, Arial, sans-serif;    text-shadow: 1px 1px 4px #888;    text-shadow: inset 0 3px 3px rgba(200, 200, 200, 0.6);    color: rgba(200, 200, 200, 0.8);    font-size: 20px;    font-weight: bold;    float: right;    padding-top: 35px;}');
addGlobalStyle ('.listTable .light {background-color: #343434;}');
addGlobalStyle ('.formTable td {color: #D2D2D2;}');
addGlobalStyle ('.listTable tbody tr:hover {background-color: #434343;}');
addGlobalStyle ('.report{ background-color: rgb(26,26,26);}');
addGlobalStyle ('.auction{ background-color: rgb(26,26,26);}');
addGlobalStyle ('.ui-tabs-panel {color: #D2D2D2;}');
addGlobalStyle ('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {color: rgba(150,150,150, 0.8);}');
addGlobalStyle ('span.filledBar {background-color: rgb(10,9,87);}');
addGlobalStyle ('span.emptyBar {background-color: #181818}');
addGlobalStyle ('.accountTable .light {background-color: #343434;}');
addGlobalStyle ('.accountTable tbody tr.light:hover,.accountTable tbody tr.dark:hover {background-color: #434343;}');
addGlobalStyle ('.accountTable a {color: rgba(150, 150, 150, 0.9);}');
addGlobalStyle ('.accountTable .dark {background-color: rgb(26,26,26);}');
addGlobalStyle ('td.calendar-day:hover {background:#434343;}');
addGlobalStyle ('td.calendar-day.today {background-color: #a1a1a1;}');
addGlobalStyle ('td.calendar-day-head {background: none repeat scroll 0% 0% rgb(26,26,26);}');
addGlobalStyle ('div.day-number {background: none repeat scroll 0% 0% rgb(0,0,0);}');
addGlobalStyle ('td.calendar-day-np {background: none repeat scroll 0% 0% rgb(67,67,67);}');
addGlobalStyle ('.event {background-color: rgb(26,26,26);}');
addGlobalStyle ('#tabMenu a {color: #D2D2D2;}');
addGlobalStyle ('#commits .title {color: #D2D2D2;}');
addGlobalStyle ('#commits li:hover {background: #434343;}');
addGlobalStyle ('#commits .subtext .author {color: #C0C0C0;}');
addGlobalStyle ('table#dungeons tbody td:first-of-type a {color: #D2D2D2;}');
addGlobalStyle ('#eventsShort .head a {color: white;}');
addGlobalStyle ('#galleryTable tr:hover {background-color: #343434;}')
addGlobalStyle ('.chatWrap {border: 1px solid #343434;}')
addGlobalStyle ('a, td a {color: #53C8D6;}')
addGlobalStyle ('#eventsShort p {text-align: center;}')
addGlobalStyle ('.listTable td {border-bottom: 1px solid #343434;}')
addGlobalStyle ('.paginator a {border: 1px solid rgb(240, 240, 240); color: rgb(240, 240, 240);}')