// ==UserScript==
// @name        KU Course Title Fixer
// @namespace   http://rasmuswriedtlarsen.com
// @description Fix page title for showing courses on kurser.ku.dk (so bookmarking it gets easier)
// @match       http://kurser.ku.dk/course/*
// @match       https://kurser.ku.dk/course/*
// @version     1.0.0
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==

document.title = $("h1.CourseTitle").html().split("&nbsp;")[1].split(" <span")[0]