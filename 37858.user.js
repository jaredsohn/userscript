// ==UserScript==
// @name Compact Google Reader
// @description There several parts of the Google Reader interface which I rarely use -- the search box, and most of the items in the top section of the left-hand navigation bar.  This script makes those disappear, and also makes the left-hand navigation bar a little narrower, thus freeing up space for the feed items themselves on the limited space of my EeePC screen. My apologies for the scruffiness -- I wrote this without sharing in mind.
// ==/UserScript==
@-moz-document url-prefix(http://www.google.com/reader/view/) {

}
/* #selectors-box {display:none !important;}  /* Uncomment this if you want to hide the home and starred items altogether; doing so will cause the "add items" to be hidden behind the GR logo. */ 
/* #star-selector {display:none !important;} /* uncomment this if you want to hide the starred items link */
#your-items-tree-container,#friends-tree-container,#friends-settings-link,#broadcast-selector,#trends-selector,#search {display:none !important;}
#quick-add-subs,#add-box,#add-subs {background-image:none !important; padding-left: 0px !important; font-size: 100% !important; margin: 0px !important;}
#nav, #selectors-container, #selectors-box, #add-box, #sub-tree-box {width: 200px !important;}
#sub-tree-container, #sub-tree {width:190px !important;}
#viewer-box, #chrome {width:800px !important;} /* You will need to edit this to suit your specific monitor/resolution */
#chrome {margin-left:225px !important; margin-top:-28px !important; }
.entry-main {margin-left: 5px !important; } 
.entry-title { text-indent: 15px !important;}