// --------------------------------------------------------------------//// This is a Greasemonkey user script.  To install it, you need// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/// Then restart Firefox and revisit this script.// Under Tools, there will be a new menu item to "Install User Script".// Accept the default configuration and install.//// --------------------------------------------------------------------//
// ==UserScript==
// @name           FAS_image_carousels
// @namespace      http://evanmallory.com/
// @description    Fix fas image carousels for easier navigation
// @include        http://www.courses.fas.harvard.edu/bin/imagebase/carousel*
// ==/UserScript==


function xpath(query) {    return document.evaluate(query, document, null,        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}

next_link_arr = xpath( "//a/img[@src='/templates/toolkit/images/old_slide_carousel/next_icon.gif']" );


// GM_log( next_link_arr.snapshotLength + " links found." );
next_link = next_link_arr.snapshotItem(0).parentNode;

// GM_log( next_link );
// GM_log( "next_link.href = "  + next_link.href );

last_img = xpath( "/html/body/img" ).snapshotItem(0);

var new_img_with_link = document.createElement("div");

var str = "<a href='" + next_link.href + "'><img src='" + last_img.src + "'></a>";

// GM_log( str );

new_img_with_link.innerHTML = str;


last_img.parentNode.replaceChild( new_img_with_link, last_img );

// now remove last five paragraphs and two horizontal rules
for( i = 0; i < 5; i++ ) {
	par = xpath ("/html/body/p[last()]").snapshotItem(0);
	par.parentNode.removeChild( par );
}

for(  i = 0; i < 2; i++ ) {
	hr = xpath ("/html/body/hr[last()]").snapshotItem(0);
	hr.parentNode.removeChild( hr );
}
