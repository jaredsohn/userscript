// ==UserScript==
// @name        Basecamp To-Do Direct URL
// @namespace   none.com
// @description Basecamp To-Do Direct URL
// @include     https://*.basecamphq.com/projects/*/todo_lists*
// @include     http://*.basecamphq.com/projects/*/todo_lists*
// @version     2
// @grant       none
// ==/UserScript==

var hash = window.location.hash

var todo_id = parseInt(hash.substr(1))
if (!isNaN(todo_id))
    window.location.search = "?time_for="+todo_id
