// ==UserScript==
// @name        Eza's Image Glutton
// @namespace   https://inkbunny.net/ezalias
// @author			Ezalias
// @description Directly loads images from gallery sites, skipping comments and descriptions
// @include     https://inkbunny.net/submissionview.php*
// @version     1.17.6
// ==/UserScript==



// Oops. I accidentally uploaded the latest Eza's Image Glutton script here while juggling tabs. I'll just change the @includes so it only works on Inkbunny.
// If you like this script, please install Image Glutton instead - it works better, it works on more sites, and it's updated intentionally instead of through the author's idiocy. 
// http://userscripts.org/scripts/show/169968



// Any single-image submission will redirect to the full-size image. On multi-image submissions, every page except the first will redirect to its full-size image. 
// If you want to read the description, favorite the image, or enjoy a non-image submission incorrectly redirected, you can press "back" and the script will not send you forward again. 

// todo: modify_pixiv and possibly modify_tumblr, to make links point to images, instead of struggling with more honest redirects
// for modify_tumblr: test for existence of _1280 etc. links before changing them - they won't 404, but they'll return funky error xml 
//		maybe use fake html for this, it was decently usable (separate script for seperate goals!)
// consider doing away with 'og:' stuff for scrape_tumblr, now that redirects don't fluff up the number of pages you go Back through. consistency and simplicity have their value. 
// for modify_tumblr: for photoset pages (but everywhere, to be safe) make unlinked images link to themselves. I want nice, clean, chronological tabs for multi-image comics. 
// consider redirecting to something like "data:text/html,<img src='http://example.com/image.jpg'>" instead of the plain URL. custom html would allow next/previous browsing on some sites.
// ugh. test without adblock enabled. 
// imgur single-image pages. really, why not? 
// modify_furaffinity to change prev/next/fav links with pre-appended #dnr. 



// global variables, for simplicity
var image_url = '';		// location of the full-size image to redirect to
var wait_for_dnr = '';		// some site URLs use "#" liberally, so if this var isn't empty, only "#dnr" will stop a redirect
var html_dump = document.getElementsByTagName('html')[0].innerHTML;		// read full page HTML as string - admittedly overkill, but it's kilobytes, so who really cares?



// detect site, extract image URL, then decide whether or not to redirect
if ( address_bar_contains('e621.net') ) { extract_image_url_after( '>Respond</a>', 'https://' ); }
else if ( address_bar_contains('e926.net') ) { extract_image_url_after( '<li>Size:', 'http' ); }
else if ( address_bar_contains('gelbooru.com') ) { extract_image_url_after( '<h5>Options</h5>', 'http://' ); }
else if ( address_bar_contains('weasyl.com') ) { extract_image_url_after( '<div id="detail-art">', '/static/' ); }		// also redirects to plaintext/HTML on stories, haha
else if ( address_bar_contains('hentai-foundry.com') ) { extract_image_url_after( '<center><img', 'http://' ); }
else if ( address_bar_contains('y-gallery.net') ) { extract_image_url_after( 'a_center container2">', 'http://' ); }
else if ( address_bar_contains('rule34.xxx') ) { extract_image_url_after( '>Edit</a></li>', 'http://' ); }
else if ( address_bar_contains('derpiboo.ru') ) { extract_image_url_after( 'full res">View</a>', '//derpicdn' ); }
else if ( address_bar_contains('derpibooru.org') ) { extract_image_url_after( 'full res">View</a>', '//derpicdn' ); }
	//////////
else if ( address_bar_contains('rule34hentai.net') ) { extract_image_url_after( '<!--JuicyAds END-->', '/_images/' ); wait_for_dnr = 'yes'; }
else if ( address_bar_contains('rule34.paheal.net') ) { extract_image_url_after( 'shm-zoomer', 'http://' ); wait_for_dnr = 'yes'; }
	//////////
else if ( address_bar_contains('sofurry.com') ) {
	image_url = window.location.href.replace('sofurry.com/view/','sofurryfiles.com/std/content?page='); }
else if ( address_bar_contains('danbooru.donmai.us') ) { 
	extract_image_url_after( '% of original (', '/data/' );		// resized images will say "X% of original (view full" or something like that
	if( image_url == '' ) { extract_image_url_after( 'src="/data/', '/data/' ); } }		// if it's not resized, just grab the image being displayed 
else if ( address_bar_contains('furaffinity.net') ) {
	if (unsafeWindow.full_url)			// Basically stolen from http://userscripts.org/scripts/review/157574 - but FA's kind enough to define the URL as a var, so why fight the obvious approach? 
		{ image_url = unsafeWindow.full_url; } 		// use full_url variable from live window HTML
}
	//////////
else if ( address_bar_contains('deviantart.com') ) { scrape_deviantart(); }
else if ( address_bar_contains('inkbunny.net') ) { scrape_inkbunny(); }
else if ( address_bar_contains('tumblr.com') ) { scrape_tumblr(); }
else if ( address_bar_contains('.booru.org' ) ) { scrape_booru(); }
else if ( address_bar_contains('mspabooru.com' ) ) { scrape_booru(); }
else if ( address_bar_contains('safebooru.org' ) ) { scrape_booru(); }



// having defined image_url by scraping the page's HTML, modify the current URL to prevent back-traps, then redirect to that full image 
if( image_url !== '' && !address_bar_contains('#') || wait_for_dnr !== '' ) // do nothing if image_url is empty or there's a # symbol (except on sites that need an explicit #dnr) 
{
	if( !address_bar_contains('#dnr') )		// even on sites with #search nonsense, do nothing if #dnr appears in the URL 
	{		// some images don't redirect properly, even if you manually "view image" - so we append ".jpg" to URLs without file extensions, forcing the browser to consider them images
			// even if this doesn't work, the new URL should just 404, which is better than the semi-modal "octet stream" dialog seen otherwise. 
		if( image_url.lastIndexOf( '/' ) > image_url.lastIndexOf( '.' ) ) { image_url = image_url + '.jpg'; }		// if there's not a "." after the last "/" then slap a file extension on there 
		if( image_url[ image_url.length - 1 ] == '.' ) { image_url = image_url + 'jpg'; }		// if the URL ends with a dot, slap a file extension on there 

			// modify current location, so that when the user clicks "back," they aren't immediately sent forward again
		modified_url = window.location.href + '#dnr';	// add do-not-redirect tag to current URL
		history.replaceState( {foo:'bar'}, 'Do-not-redirect version', modified_url);		// modify URL without redirecting. the {foo:'bar'} thing is a state object that I don't care about, but the function needs one.
		window.location.href = image_url;		// redirect to full image
	}
}		// end of main execution






// ----- //			Functions for readability






function extract_image_url_after( string_before_url, url_begins_with ) {		// extract the first quote-delimited string that appears after unique first var and begins with second var
	var image_index = html_dump.indexOf( string_before_url );		// find unique string shortly before URL - varies by site
	if( image_index !== -1 )		// do nothing if string_before_url isn't found
	{
		image_url = html_dump.substring(image_index);		// lose everything before whichever pre-URL string was found
		image_index = image_url.indexOf( url_begins_with );		// find start of relative highres URL - e.g. /data/ or http:
		image_url = image_url.substring(image_index);		// lose everything before URL - image_url now starts with link, delimited by a double-quote (plus entire rest of page HTML)
		var delimiter_index = image_url.indexOf('"');		// to be clear: that's a double-quote inside single-quotes. (even in monospace, it looks like five ambiguous squiggles.) 
		image_url = image_url.substring(0, delimiter_index);		// lose everything past the delimiting double-quote, append to absolute URL
	}
}		// Do not mix up image_url.indexOf and html_dump.indexOf! Mistakes are easy to make and hard to see. 

function html_contains( string_to_search_for ) {		// requisite "does this string appear anywhere?" function for converting extract_image_url_after into more generic extract_url_after
	var image_index = html_dump.indexOf( string_to_search_for );
	if( image_index == -1 ) { return false; }
	return true;		// implicit "else" - not that there's a compiler to whine if this function returns nothing
}

function address_bar_contains( string_to_look_for ) {	// I'm so tired of typing out window.location.etc == -1. It's stupidly verbose and it looks terrible.
	return (window.location.href.indexOf( string_to_look_for ) !== -1);		// this makes code more concise and readable. if( address_bar_contains( 'tld.com' ) ) { do tld stuff; }
}






// ----- //			Functions for individual websites (separated for being especially long)






function scrape_tumblr() {
	// Tumblr's goals are basically like Inkbunny's:
	//		- On a generic post or /image/ page with a single image: redirect to that image in the highest resolution available
	//		- On a multi-image post: do nothing, since photosets already are or link to their highest-resolution versions
	if( address_bar_contains('/image/') ) { 		// on centered-image pages
		extract_image_url_after( 'id="content-image"', 'http://' );		// get conveniently-labeled id="image" image
	}		// The above will handle /post/ to /image/ URL conversions in a sort of double-redirect, letting Tumblr do the hard work of finding the highest-res version of an image
	else if( address_bar_contains( '/post/' ) ) {		// on generic Tumblr posts
		image_url = window.location.href.replace( '/post/', '/image/' );  
		var comment_check_index = image_url.lastIndexOf( '/' );		// if the /post/ contained text, it gets appended after the post/image number and screws up the URL...
		if( image_url.substring( comment_check_index - 6, comment_check_index ) !== '/image' ) {		// ... so if the last '/' isn't the latter in '/image/' then we dump everything after that '/'...
			image_url = image_url.substring( 0, comment_check_index );		// ... by taking the substring up to the index of that final '/'.
		}
			// If the theme is kind enough to use proper Open Graph tags, let's use those instead for a single redirect:
		var post_image_url = image_url;		// store the double-redirect URL just in case
		extract_image_url_after( 'property="og:image"', 'http' );
		if( image_url.indexOf( '_1280.' ) == -1 ) { image_url = post_image_url; }		// if the Open Graph isn't _1280 (and thus might be misdefined at low-res), just double-redirect instead  
	}		// this might also trigger on images with no _size in the URL, but I think those are wall tumblr-feed:entry items anyway. hardly matters. /image/ would still work. 

		// Now that image_url is defined, we can blank it out if we don't want to redirect. Much easier than piling on if( || && || )-style logic. 
	if( address_bar_contains( '_iframe/' ) ) { image_url = ''; }		// Do not redirect from photoset iframe pages, since they trigger their own instance of this script
	if( html_dump.indexOf( 'class="html_photoset"' ) !== -1 ) { image_url = ''; }		// Do not redirect from photosets (because photoset images always are or link to highest-res versions)
	if( html_dump.indexOf( 'content="tumblr-feed:entry"' ) !== -1 ) { image_url = ''; }	// Do not redirect ig Open Graph indicates a text-only post (as opposed to tumblr-feed:photo). 
}

function scrape_deviantart() {		// this doesn't use ditch_html_before because data-super-full-img's appear for random links - we need to avoid grabbing one from the ass-end of small-image pages
	var image_index = html_dump.indexOf( 'shadow-holder' );		// deviantart provides a ton of full-size image links, so we need to 'fast forward' to this unique string before the correct one
	html_dump = html_dump.substring( image_index, image_index+1500 );		// dump everything before the main display block, and everything significantly after it - 1500 chars should be safely long enough
	extract_image_url_after( 'data-super-full-img', 'http://' );		// for resized images
	if( image_url == '' ) { extract_image_url_after( 'data-super-img', 'http://' ); }		// for smaller images which aren't resized
}

function scrape_inkbunny() {
	var image_index = html_dump.indexOf( 'https://inkbunny.net///files/screen/' );		// look for screen-size image URL
	if( image_index !== -1 )		// if that URL is found
	{
		image_url = html_dump.substring( image_index );		// dump everything before URL
		var delimiter_index = image_url.indexOf( '"' );		// find delimiter (that's a double-quote inside single-quotes)
		image_url = image_url.substring( 0, delimiter_index );		// dump everything after delimiter
		image_url = image_url.replace( '/screen/', '/full/' );		// turn screen URL into full URL - we don't care if /screen/ is already full-size, because /full/ will kindly redirect anyway
	}

	// if this page is the first image in a multi-image submission, do not redirect
	if ( html_dump.indexOf('show custom thumbnails') !== -1 && !address_bar_contains('&page=') ) {		// if 'show custom thumbnails' is found in HTML, but a page number is absent from the URL
		image_url = '';		// the page won't redirect if this string is empty
	}
}

function scrape_booru() {		// this works on a wide variety of booru-style imageboards. 
	extract_image_url_after( '>Resize image</a>', 'http://' );		// for booru's which have automatic resizing and images which require it
	if( image_url == '' ) {		// otherwise, use the image that's being displayed 
		html_dump = html_dump.substring( html_dump.indexOf( 'id="note-container"' ) );		// we ditch everything before this, but the first 'http' isn't the correct image URL
		extract_image_url_after( '<img', 'http' );		// should grab both http: and https: URLs
	} 
}








