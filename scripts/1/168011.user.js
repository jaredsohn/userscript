// ==UserScript==
// @name       Making Moodle Work Again
// @namespace  https://stedle.com
// @version    0.2
// @description  This changes how Moodle looks so that it isn't so messy.
// @match      http://lms.ecpionline.com/*
// @copyright  2012+, Garron Haun
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

GM_addStyle("h3.sectionname { text-align: left; font-weight: bold; text-transform: none; border-bottom: none; color: #000000;}");
GM_addStyle(".instancename { color: #000000;}");
GM_addStyle(".unread a { background-color: rgb(255, 255, 0); color: #000000 ! important;}");
GM_addStyle(".path-course-view .course-content li.section{ border:1px solid #000000;}");
GM_addStyle(".forumheaderlist td, th{ border: 1px solid black ! important;}");
GM_addStyle(".forumheaderlist td{padding: .1em ! important;}");