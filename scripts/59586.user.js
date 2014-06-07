// ==UserScript==
// @name           FeedBurner resizer
// @description    Resize FeedBurner...
// @include        *feedburner.google.com/fb*
// ==/UserScript==
// This script resizes FeedBurner to 960px and corrects the size of some elements.
//

GM_addStyle(<><![CDATA[
#pageHolder {width:960px !important; border:0 !important; padding-bottom:35px !important}

#thingActions, #tabs {width:960px !important;}

.formAction {width:100% !important}

/* Home */
#feedList, #feedList table {width:730px !important}
#personalFeed {width:775px !important; ;}
#productNews {left: 780px !important}

/* Analize */
#statsHolder {background:#fff !important;border:0 !important}
#statsHolder, #feed-subscribers, .service {width:755px !important;}


/* Optimize */
.previewContainer {width:710px !important}

/* Publicize */
#widgetHTML {width:600px !important}

/* Monetize*/
/*... Nothing yet*/

/* Troubleshootize */
#feedmedic {width:736px !important}

]]></>);