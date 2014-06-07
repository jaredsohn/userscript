// ==UserScript==
// @name  Custom JPG Dump
// @namespace     http://stylebot.me/styles/1206
// @description   
// @include   http://jpgdump.com/*
// @include   https://jpgdump.com/*
// @include   http://http://jpg.rkive.org/*
// @include   https://http://jpg.rkive.org/*
// @author        Ronin
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'div#nextbutton.button {    visibility: hidden;}#nextlink:before {    content: "Next";    position: fixed;    border-width: 1px;    border-style: solid;    padding: 3px;    padding-right: 10px;    padding-left: 10px;    left: 11.2em;    top: 10.4em;    -webkit-appearance: button;    -moz-appearance: button;    visibility: visible;}div#prevbutton.button {    visibility: hidden;}#prevlink:before {    content: "Previous";    position: fixed;    border-width: 1px;    border-style: solid;    padding: 3px;    padding-right: 10px;    padding-left: 10px;    left: 5.8em;    top: 10.4em;    -webkit-appearance: button;    -moz-appearance: button;    visibility: visible;}#recentactivity {    overflow: auto;    height: 40em;}[href="index.php?tg=dupe"]:link {    font-weight: bold;    text-transform: uppercase;    color: #ff0000;}[href="index.php?tg=delete"]:link {    font-weight: bold;    text-transform: uppercase;    color: #ff0000;}[href="index.php?tg=dupe"]:visited {    font-weight: bold;    text-transform: uppercase;    color: #ff0000;}[href="index.php?tg=delete"]:visited {    font-weight: bold;    text-transform: uppercase;    color: #ff0000;}div.button a:link {    color: black;}div.button a:visited {    color: black;}td div.button {    background-color: transparent;    border-width: 0;}td div.button:hover {    background-color: transparent;}div.button a {    -webkit-appearance: button;    -moz-appearance: button;    padding: 3px;}div.Logo a:before {    position: fixed;    content: "Index";    left: 1.8em;    top: 10.4em;    border-width: 1px;    border-style: solid;    padding: 3px;    padding-right: 10px;    padding-left: 10px;    -webkit-appearance: button;    -moz-appearance: button;}div.Logo a:link {    text-decoration: none;    font-weight: bold;    color: #F60;}div.Logo a:hover {    color: black;}div.sidebar div.button {    margin-left: auto;    width: 9em;}';
document.documentElement.appendChild(styleEl);