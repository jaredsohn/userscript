// ==UserScript==
// @name Fuck Facebook Questions
// @namespace http://www.choibean.com/
// @description Facebook's Questions feature is bullshit. Fuck it.
// @include http*://www.facebook.com/
// ==/UserScript==
var el = document.getElementById('pagelet_questionsbox');
if (el && el.parentNode) el.parentNode.removeChild(el);
