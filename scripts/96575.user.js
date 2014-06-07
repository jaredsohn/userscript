// ==UserScript==

// @name           BlackBoard Discussion Fix

// @namespace      cocomonk22

// @description    Fixes overlapping areas in the discussion board. Change @include to point to the appropriate address.

// @include        http://bb.hpu.edu/webapps/discussionboard/do/message?action=list_messages&*
// ==/UserScript==

function fixtree() {
document.getElementById("tree").style.overflow='auto';
}

window.addEventListener ('mousemove', fixtree, false);