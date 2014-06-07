// ==UserScript==
// @name        Golightly Google Reader Fix
// @version      1.0.0
// @description  Cleaned up and old (better) styling, star left etc
// @author       Fred Golightly
// @include        *google.*/reader*
// ==/UserScript==

.list #current-entry .collapsed {display: none;} /* hide list view top */
.card {box-shadow: 3px 3px 9px #ddd; border-radius: 4px;}  /* entry shadow & corner */
#current-entry .card {border-color: #4d90f0;} /* highlight current entry */
#top-bar {display: none;} /* hide header bar */
#activity-indicator {display: none;} /* hide activity indicator */
#nav {width: 215px;} /* Thinner nav */
::-webkit-scrollbar {width: 10px;} /* Tinner scroll bar */
#logo-section {display: none;} /* hide logo section */
#main {margin-top: -20px;} /* Shift main to top */
#entries {padding: 0 5px 0 3px;} /* Widen entry view */
#chrome {margin: 10px 0 0 0} /* shift main left */
#entries, #title-and-status-holder, #viewer-header {margin-left: 0;}
.entry .entry-actions .item-star,.entry .entry-icons .item-star {opacity: 0;} /* Hide star if unstrarred */
.entry .entry-actions .item-star-active,.entry .entry-icons .item-star-active {opacity: 1;} /* show active star */
.entry .entry-actions .read-state-kept-unread {color: transparent;} /* hide Keep Unread text */
.entry-icons-placeholder {display: block; float: left;} /* Move star to left of title */
.entry .entry-icons {margin-left: 0;} /* Remove star left padding */
#gb {display: none;} /* Hide Google bar. Again */
.item-preview {display:none;} /* Hide preview button */