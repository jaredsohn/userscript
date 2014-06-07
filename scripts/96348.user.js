// ==UserScript==
// @name Gawker normal scrolling sidebar
// @version 1.1
// @description Makes the right sidebar scroll with content on lifehacker and io9.
// @match http://lifehacker.com/*
// @match http://io9.com/*
// ==/UserScript==

GM_addStyle(" \
#rightcontainer .cn_pager.lower { \
    position: fixed; \
    bottom: -1px; \
} \
 \
#rightcontainer { \
    position: relative; \
    top: -47px; \
} \
 \
#rightcontainer .rightbar_list { \
    /* disables independent mousewheel scrolling of topics on the right */ \
    position: inherit; \
} \
.bottomchrome { \
    border-left: 1px solid #BBB; \
    margin-left: -1px; \
} \
#rightbar_scroller { \
    height: auto !important; \
    overflow-y: auto !important; \
} ");

// cannot access functions defined in the page from
// this script in chrome... so we put the code into
// the page
var s = document.createElement("script");
s.innerHTML = "jQuery('page').unmousewheel(); jQuery('#rightbar_scroller').unbind('scroll'); jQuery.ui.RightBarWidget.prototype.checkListLength = function() {}";
document.body.appendChild(s);
