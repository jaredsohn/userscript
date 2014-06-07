// ==UserScript==
// @name           Wordpress.com-Anti-GlobalTags
// @namespace      Wordpress.com
// @description    Wordpress.com-Tag- und Kategorie-Links auf Blog umbiegen
// @include        *
// ==/UserScript==


// Check if it is a WordPress.com-Blog
var is_wpcom = "";
var metas = document.getElementsByTagName("meta");
for (var i = 0; i < metas.length ; i++)  { 
	var wpcom = document.getElementsByTagName("meta")[i];
	if (wpcom.name=="generator") { is_wpcom=wpcom.content }; 
}

// If it is a WordPress.com-Blog start the changes
if (is_wpcom=="WordPress.com") { // start of if-then-block 

// Which language is the blog?
var html = document.getElementsByTagName('html')[0];
if (html.lang) var language = html.lang;

// Get all tag links
var allTagLinks, thisTagLink; 
allTagLinks = document.evaluate( 
    "//a[@rel='tag']", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null); 
    
// Change all tag links
for (var i = 0; i < allTagLinks.snapshotLength; i++) {     
    thisTagLink = allTagLinks.snapshotItem(i); 
    var Blogadress = window.location.host; 
    // do something with thisTagLink
    thisTagLink.href = thisTagLink.href.replace(language + ".wordpress.com", Blogadress);
    // Ende
} 

// Get all category links
var allCatTagLinks, thisCatTagLink; 
allCatTagLinks = document.evaluate( 
    "//a[@rel='category tag']", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null); 
    
// Change all category links
for (var i = 0; i < allCatTagLinks.snapshotLength; i++) {     
    thisCatTagLink = allCatTagLinks.snapshotItem(i); 
    var Blogadress = window.location.host; 
    // do something with thisTagLink
    thisCatTagLink.href = thisCatTagLink.href.replace(language + ".wordpress.com/tag", Blogadress + "/category");
    // Ende
} 

} // end of if-then-block 