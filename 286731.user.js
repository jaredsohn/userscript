// ==UserScript==
// @name FutureLearn Most Liked Comments
// @namespace FMLC
// @description Automatically loads most liked comments on all course pages.
// @version 01.14.14.1900
// @include https://www.futurelearn.com/courses/*/steps/*/progress
// @exclude https://www.futurelearn.com/courses/*/steps/*/progress?filter=most_liked#comments
// @author drhouse
// ==/UserScript==

var theurl = document.URL;
window.location.href = (theurl + "?filter=most_liked#comments");