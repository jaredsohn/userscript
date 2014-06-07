// ==UserScript==
// @name          Google+ Dense Theme
// @namespace     http://gplus.to/helixblue
// @description   Unofficial theme that increases content density in Google+ 
// @match         https://plus.google.com/*
// @include       https://plus.google.com/*
// @version       1.1.7
// ==/UserScript==
//

//The following function is from Dive into Greasemonkey
function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    head.appendChild(style);
}


addStyle(
// Less spacing in grey top bar (default margin: 13px 0 0 10px;)
'.a-U-A { padding: 7px 0 0 10px }' +
// Change grey bar to be shorter
'.a-U-T { height: 47px; }' +

// Adjustments to Left Bar (make smaller)
'.a-p-la-T { width: 150px; padding: 0 8px 0 0; }' +

// Lower the amount of spacing between streams
'.a-la-h-ga { height: 20px; line-height: 20px; }' +

// CONTENT PANE -----------------------------------------------------
// I hope your monitor can handle 1100px. If we set it to 100%, we lose
// the ability to automatically center, which some people seem to like.
'.a-A { width: 1100px; margin-left: auto; margin-right: auto;}' +

// Center content (stream) should take up more space (default width: 574px;)
'.a-p-M-T-hk-xc, .a-p-M-T-gi-xc { width: 750px; }' +

// Recenter the "Find People" box and toolbar icons
'.a-U-bg-T { margin-left: 230px; }' +

// Move stream name to right (normal margin: 16px 21px 0 21px;)
'.a-p-M-T-gi-xc .a-f-tr { margin: 8px 21px 0 21px; float: right; }' +

// Remove redundant "View their posts in Incoming" link
'.a-Hc-px a { display: none; }' +
'.a-Hc-px { padding-top: 2px; }' +

// Increase stream boxes to 100%
'.a-f-p { width: 100%; padding-right: 0px; }' +

// STREAM BOXES -------------------------------------------- //
// less padding in box (16px, 21px)
'.a-b-f-i { padding-right: 22px; padding-top: 10px; padding-bottom: 0; padding-left: 19px; }' +

// Content padding (margin-left: 60px; margin-right: 44px;)
'.a-f-i-p { margin-left: 50px; margin-right: 8px; }' +

// Condense Post name, time, circle
'a-f-i-p-U { line-height: 1; }' +

// Move sharing buttons to top-right
'.a-f-i-bg { color: #fff; float: right; position: absolute; right: 0; top: -19px; font-size: x-small; margin-right: 1em; letter-spacing: -1px;}' +
'.a-f-i-bg .d-h { letter-spacing: 0; }' +

// Turn off dashed line that used to go above the sharing buttons
'.a-f-i-Xb { border-top: 0; }' +

// Bring options menu left slighty
'.a-f-i-Ia-D-h { margin-right: -16px; }' +

// make the +1 button into plain text
'.eswd { background: 0; margin-top: -3px;}' +
'.eswd:before { content: "+1"; color: #3366CC; font-family: arial,sans-serif; font-size: x-small; }' +

// Hide vote details for now
'.a-f-i-sb-sk-oa { display: none; }' +

// Move vote number to appear under avatar, hide "You have +1d this"
'.a-f-i-ha {float: left; left: -60px; position: absolute; top: -22px; width: 44px; text-align: right; font-size: 0px;}' +
// Make the vote score white with a dark red glow
'.a-b-f-i-ha-pe { color: #fff; text-shadow: -1px 0 #b00, 0 1px #b00, 1px 0 #b00, 0 -1px #b00; font-size: 16px;}' +

// Turn off borders around + number
'.a-f-i-Hg-Uf { border-bottom: 0 none; border-top: 0 none; padding: 0; }' +

// Turn off redundant comment box
'.a-f-i-W-O { display: none; }' +

// Decrease the padding for the XX older comments... dialog
'.a-f-i-WXPuNd { padding: 1px 1px 1px 7px; margin-top: 4px; border-bottom: 0;}' +

// Remove extraneous line underneath comments
'.a-f-i-W { border-top: 1px solid #f0f0f0; border-bottom: 0; }' +

// Make comments slightly grey, and older comments slightly greyer
'.a-f-i-Xb { background-color: #fbfbfb; }' +
'.a-f-i-WXPuNd { background-color: #f5f5f5; }' +

// Add a bigger margin after a set of comments.
'.a-b-f-i-Xb-oa { margin-bottom: 8px; }' +

// Move the shares list under the avatar
'.a-f-i-Hg { left: -60px; font-size: x-small; position: absolute; top: 2.9em; color: white; }' +
'.a-f-i-Hg .a-b-f-i-je-oa-Vb { display: none }' +

// Make link thumbnails very tiny
'.ea-S-Xj-pa { max-height: 32px; }' +
'.ea-S-Xj-pa img { max-height: 32px; }' +

// Smaller link quotations
'.ea-S-Xj-Cc { line-height: 1.0; font-size: x-small; padding-bottom: 0px; }' +

// Make the time appear at the end of the comment
'.a-f-i-W-Lh-z div { display: inline; }' +
'.a-f-i-W-bg { display: inline-block; padding-left: 1em; }' +

// Fix it so that "Expand this comment" goes on its own line
'.a-b-f-i-fcjmu { display: block; }' +

// Decrease margin to the left of a comment
'.a-f-i-W-Lh-z { margin-left: 26px; }' +

// Fix to make sure comments can fit the user thumbnails (until we can make them smaller)
'.a-f-i-W { padding-top: 2px; padding: 2px; margin-left: 0px; }' +

// Less spacing in entries 
'.a-f-i-p-qb { padding-bottom: 6px; }' +

// smaller images
'.ea-S-rg-pa { display: inline; height: 0; }' +
'.ea-S-rg-pa img { max-height: 125px; }' +

// less padding under image
'.ea-S-A { margin-bottom: 0; }' +
'.a-b-f-S-oa { font-size: x-small; line-height: 1em; }' + 

// Remove strange grey line underneath hangout
'.a-f-i-ie-p { border-bottom: 0; margin-bottom: 0px; }' +

// Give a bit more room when posting a comment
'.a-f-i-Pb-W-t { margin-bottom: 7px; }' +

// force a proper bottom margin below photos
'.a-f-i-q { margin-bottom: 9px; }' +
'.a-f-i-W-Zb-z.a-f-i-q, .a-f-i-W-Zb-z.a-f-i-q-di { height: 18px; width: 18px; margin-left: -25px; }' +

// Better looking titles in the incoming page
'.a-f-i-Jf-Om { margin-bottom: 9px; margin-left: -69px; margin-right: -30px; padding: 4px; padding-left: 1em; padding-right: 1em; margin-top: -10px; }' +

// Better looking mutes
'.a-b-f-i-kb {background-color: #EBEFF9; padding: 2px; text-align: center; margin-top: -10px; margin-left: -19px; margin-right: -22px; }'
);


//'.alt-button { float: right; position: absolute; top: 7px; right: 26px;' +

