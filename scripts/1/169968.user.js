// ==UserScript==
// @name        Eza's Image Glutton
// @namespace   https://inkbunny.net/ezalias
// @author			Ezalias
// @description Directly loads images from gallery sites, skipping comments and descriptions
// @include     http://www.furaffinity.net/view/*
// @include     https://www.furaffinity.net/view/*
// @include     http://www.furaffinity.net/full/*
// @include     https://www.furaffinity.net/full/*
// @include     https://inkbunny.net/submissionview.php*
// @include     http://gelbooru.com/*s=view*
// @include     http://www.gelbooru.com/*s=view*
// @include     http://danbooru.donmai.us/posts/*
// @include     http://e621.net/post/show*
// @include     https://e621.net/post/show*
// @include     http://e926.net/post/*
// @include     https://e926.net/post/*
// @include     http://*.deviantart.com/art/*
// @include     http://*.tumblr.com/*
// @include     http://*.hentai-foundry.com/pictures/*
// @include     https://www.sofurry.com/view/*
// @include     http://www.sofurry.com/view/*
// @include     https://www.weasyl.com/*
// @include     http://www.y-gallery.net/view/*
// @include     http://rule34.paheal.net/post/view/*
// @include     http://rule34.xxx/index.php?page=post*
// @include     http://derpiboo.ru/*
// @include     https://derpiboo.ru/*
// @include     http://derpibooru.org/*
// @include     https://derpibooru.org/*
// @include     http://rule34hentai.net/post/view/*
// @include     http://*.booru.org/*s=view*
// @include     http://mspabooru.com/*s=view*
// @include     http://safebooru.org/*s=view*
// @include     http://www.majhost.com/cgi-bin/gallery.cgi?i=*
// @include     http://g.e-hentai.org/s/*
// @include     http://nijie.info/view.php?id=*
// @include     http://metabooru.com/*
// @include     http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @version     1.20.3
// ==/UserScript==



// Any single-image submission will redirect to the full-size image. On multi-image submissions, every page except the first will redirect to its full-size image. 
// If you want to read the description, favorite the image, or enjoy a non-image submission incorrectly redirected, you can press "back" and the script will not send you forward again. 

// TO DO: modify_pixiv and possibly modify_tumblr, to make links point to images, instead of struggling with more honest redirects
// for modify_tumblr: test for existence of _1280 etc. links before changing them - they won't 404, but they'll return funky error xml 
//		maybe use fake html for this, it was decently usable (separate script for seperate goals!)
// consider doing away with 'og:' stuff for scrape_tumblr, now that redirects don't fluff up the number of pages you go Back through. consistency and simplicity have their value. 
// for modify_tumblr: for photoset pages (but everywhere, to be safe) make unlinked images link to themselves. I want nice, clean, chronological tabs for multi-image comics. 
// consider redirecting to something like "data:text/html,<img src='http://example.com/image.jpg'>" instead of the plain URL. custom html would allow next/previous browsing on some sites.
// blob: allows binaries, if you can download the image and relay it. no idea how Image Toolbar would handle naming those files. 
// ugh. test without adblock enabled. 
// imgur single-image pages. really, why not? 
// modify_furaffinity to change prev/next/fav links with pre-appended #dnr. 
// flickr? maybe separately. that whole site is a mess. 
// add redditbooru? ugh. they changed to link to reddit pages now. how indirect and clunky. pass. 
// Some guy says Weasyl is redirecting to avatars, but I can't reproduce that - hopefully the '/' fix for grabbing full-size links fixes his issue
// Danbooru "hidden pages" (http://userscripts.org/topics/127898) may not properly handle JPGs resized from PNGs - consider a Pixiv Fixiv style 'file not found' -> png redirect 

// Owyn Tyler has a ridiculously replete script with similar goals called Handy Just Image - http://userscripts.org/scripts/show/166494
// The supported-site list is waaay longer than mine, and/but his goals are more complex. Image Glutton exists only to deliver the image. 
// He's having trouble with back-trapping, though. His solution sounds absurdly complex even compared to mine. Test the script and recommend help if possible. 

// try tacking the redirect code onto pixiv's html - that might count as pixiv being the referrer, which means we can do as we damn well please

// 2.0 - general solution - foreach image on page, redirect to the biggest (iff the biggest is significantly larger than the second-biggest, to avoid redirecting to ads or banners on low-res submissions
// 		with this, I could ditch the giant for-each and just add oodles of this-looks-like-a-submission-page @includes at the top 
// 		wait, nevermind. some sites don't show the full image. maybe implement it as a general scrape_biggest_image and use where appropriate. 





// global variables, for simplicity
var image_url = '';		// location of the full-size image to redirect to
var wait_for_dnr = '';		// some site URLs use "#" liberally, so if this var isn't empty, only "#dnr" will stop a redirect
var html_dump = document.getElementsByTagName('html')[0].innerHTML;		// read full page HTML as string - admittedly overkill, but it's kilobytes, so who really cares?



// detect site, extract image URL, then decide whether or not to redirect
if ( address_bar_contains('e621.net') ) { extract_image_url_after( '>Respond</a>', 'https://' ); }
else if ( address_bar_contains('e926.net') ) { extract_image_url_after( '<li>Size:', 'http' ); }
else if ( address_bar_contains('gelbooru.com') ) { extract_image_url_after( '<h5>Options</h5>', 'http://' ); }
else if ( address_bar_contains('weasyl.com') ) { extract_image_url_after( '<div id="detail-art">', '/' ); }		// also redirects to plaintext/HTML on stories, haha
else if ( address_bar_contains('hentai-foundry.com') ) { extract_image_url_after( '<center><img', '//' ); }
else if ( address_bar_contains('y-gallery.net') ) { extract_image_url_after( 'a_center container2">', 'http://' ); }
else if ( address_bar_contains('rule34.xxx') ) { extract_image_url_after( '>Edit</a></li>', 'http://' ); }
else if ( address_bar_contains('derpiboo.ru') ) { extract_image_url_after( 'full res">View</a>', '//derpicdn' ); }
else if ( address_bar_contains('derpibooru.org') ) { extract_image_url_after( 'full res">View</a>', '//derpicdn' ); }
else if ( address_bar_contains('metabooru.com') ) { extract_image_url_after( 'og:image', 'http://' ); }
	//////////
else if ( address_bar_contains('rule34hentai.net') ) { extract_image_url_after( '<!--JuicyAds END-->', '/_images/' ); wait_for_dnr = 'yes'; }
else if ( address_bar_contains('rule34.paheal.net') ) { extract_image_url_after( 'shm-zoomer', 'http://' ); wait_for_dnr = 'yes'; }
else if ( address_bar_contains('majhost.com') ) { image_url = document.getElementsByTagName( "img" )[0].src; }		// first and only <img> tag
	//////////
else if ( address_bar_contains('sofurry.com') ) {
	image_url = window.location.href.replace('sofurry.com/view/','sofurryfiles.com/std/content?page='); }
else if ( address_bar_contains('danbooru.donmai.us') ) { 
	extract_image_url_after( '% of original (', '/data/' );		// resized images will say "X% of original (view full" or something like that
	if( image_url == '' ) {extract_image_url_after( 'twitter:image:src', 'http://' );		// otherwise just grab the preview-sized image (this also works on pages claiming you need Gold to see them)
	image_url = image_url.replace( '/sample/sample-', '/' ); }	 }	// if the preview-sized image is a sample, fix that - this sometimes fails for PNG images with JPG previews
else if ( address_bar_contains('furaffinity.net') ) {
	if (unsafeWindow.full_url)			// Basically stolen from http://userscripts.org/scripts/review/157574 - but FA's kind enough to define the URL as a var, so why fight the obvious approach? 
		{ image_url = unsafeWindow.full_url; } }		// use full_url variable from live window HTML
else if ( address_bar_contains('http://g.e-hentai.org/s/') ) { 
	var image_index = html_dump.indexOf( '</iframe>' );		// jump to end of navigation iframe
	image_index = html_dump.indexOf( 'http://', image_index+1 );		// find next URL (link to next page)
	image_index = html_dump.indexOf( 'http://', image_index+1 );		// find URL after that (image source)
	image_url = html_dump.substring( image_index, html_dump.indexOf( '"', image_index ) ); }		// grab image src, delimited by doublequote 
else if ( address_bar_contains('nijie.info') ) {
	extract_image_url_after( 'name="twitter:image"', 'http://' );		// some images are behind some sort of barrier, so let's grab the twitter-size image instead...
	image_url = image_url.replace( '/sp/', '/' ); }		// ... and drop the /sp/ to get the full-size URL. 
	//////////
else if ( address_bar_contains('deviantart.com') ) { scrape_deviantart(); wait_for_dnr = 'yes'; }		// some deviantArt URLs have a hash for no damn reason... and wait_for_dnr isn't working? fuck! 
else if ( address_bar_contains('inkbunny.net') ) { scrape_inkbunny(); }
else if ( address_bar_contains('tumblr.com') ) { scrape_tumblr(); }
else if ( address_bar_contains('pixiv.net' ) ) { scrape_pixiv(); }
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

//		window.location.href = image_url;		// redirect to full image
		location.assign("javascript:window.location.href='"+image_url+"';");		// pixiv-friendly redirect to full image: maintains referral, happens within document's scope instead of within greasemonkey's
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

function address_bar_contains( string_to_look_for ) {	// I'm so tired of typing out window.location.etc == -1. It's stupidly verbose and it looks terrible.
	return (window.location.href.indexOf( string_to_look_for ) !== -1);		// this makes code more concise and readable. if( address_bar_contains( 'tld.com' ) ) { do tld stuff; }
}





// ----- //			Functions for individual websites (separated for being especially long)






// I might be able to redirect from failed tumblr pages if I don't rely on getElements or document.body - the script appears to run; it just crashes for those uncaught errors 
// maybe re-download the current URL within JS? 
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
	}		// this might also trigger on images with no _size in the URL, but I think those are all tumblr-feed:entry items anyway. hardly matters. /image/ would still work. 

		// Now that image_url is defined, we can blank it out if we don't want to redirect. Much easier than piling on if( || && || )-style logic. 
	if( address_bar_contains( '_iframe/' ) ) { image_url = ''; }		// Do not redirect from photoset iframe pages, since they trigger their own instance of this script
	if( html_dump.indexOf( 'class="html_photoset"' ) !== -1 ) { image_url = ''; }		// Do not redirect from photosets (because photoset images always are or link to highest-res versions)
	if( html_dump.indexOf( 'content="tumblr-feed:entry"' ) !== -1 ) { image_url = ''; }	// Do not redirect if Open Graph indicates a text-only post (as opposed to tumblr-feed:photo). 
	if( html_dump.indexOf( 'content="tumblr-feed:photoset""' ) !== -1 ) { image_url = ''; }	// Do not redirect if Open Graph indicates a text-only post (as opposed to tumblr-feed:photo). 
}

function scrape_deviantart() {		// this doesn't use ditch_html_before because data-super-full-img's appear for random links - we need to avoid grabbing one from the ass-end of small-image pages
	var image_index = html_dump.indexOf( 'class="dev-view-deviation"' ); 		// jump to dev-view-deviation div
	var image_index = html_dump.indexOf( 'http://', image_index+1 ); 		// jump to first src (preview size)
	var image_index = html_dump.indexOf( 'http://', image_index+1 ); 		// jump to second src (full-size, which might also be identical to preview size)
	image_url = html_dump.substring( image_index, html_dump.indexOf( '"', image_index ) ); 		// grab URL, delimited by doublequote
/*		// I think this covers all pages, but I'm not sure. Old code kept here just in case. 
	if( image_url == '' ) {
		image_index = html_dump.indexOf( 'shadow-holder' );		// deviantart provides a ton of full-size image links, so we need to 'fast forward' to this unique string before the correct one
		html_dump = html_dump.substring( image_index, image_index+1500 );		// dump everything before the main display block, and everything significantly after it - 1500 chars should be safely long enough
		extract_image_url_after( 'data-super-full-img', 'http://' );		// for resized images
	}
	if( image_url == '' ) { extract_image_url_after( 'data-super-img', 'http://' ); }		// for smaller images which aren't resized
	if( image_url == '' ) { 		// if it STILL doesn't work, try the other way - god damn, why do some of these sites have different layouts everywhere? 
		var shadow_index = html_dump.indexOf( 'class="shadow"' ); 
		image_index = html_dump.indexOf( 'data-super-full-img', shadow_index ); 
		image_index = html_dump.indexOf( 'http://', image_index ); 
		image_url = html_dump.substring( image_index, html_dump.indexOf( '"', image_index ) ); 
	}
*/
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

function scrape_pixiv() {		// long time coming due to 403-happy servers - changing redirect from window.location.href=url to javascript:window.location.href.=url. made things work. 
	extract_image_url_after( '<a href="member_illust.php?mode=big', 'http://' ); 		// grab preview image after link to big page - finding it is the easy part
	image_url = image_url.replace( '_m.', '.' ); 		// convert URL to full-size

	if( image_url == '') { 		// if there's no 'big' link and thus no image was grabbed, it's probably manga
		image_url = window.location.href.replace( 'mode=medium', 'mode=manga' );		// manga pages deserve their own HTML, so just go to that page 
		// Users: please consider Eza's Pixiv Fixiv, which replaces the default manga HTML with full images and none of that scroll-to-load nonsense. 
	}
}

function scrape_booru() {		// this works on a wide variety of booru-style imageboards. 
	extract_image_url_after( '>Resize image</a>', 'http://' );		// for booru's which have automatic resizing and images which require it
	if( image_url == '' ) {		// otherwise, use the image that's being displayed 
		html_dump = html_dump.substring( html_dump.indexOf( 'id="note-container"' ) );		// we ditch everything before this, but the first 'http' isn't the correct image URL
		extract_image_url_after( '<img', 'http' );		// should grab both http: and https: URLs
	} 
}

function scrape_largest_image() {		// simply find the biggest image being displayed. should make adding new sites easy, if they're not picky like pixiv or auto-resizing like gelbooru. 
	var elements = document.getElementsByTagName("img"); 		// grab all image elements
	for( var x = 0; x < elements.length; x++ ) {
		throw( elements[x].width );		// debug
		// immediate problem: this doesn't seem to get all "img" elements. 
		// secondary problem: getting the dimensions of the few images it does find is a pain in the ass. I keep throwing empty strings. wtf? 
	}
}










/*
Test suite of random URLs from the relevant sites: 
http://www.hentai-foundry.com/pictures/user/Bottlesoldier/133840/Akibabuse
http://www.hentai-foundry.com/pictures/user/Bottlesoldier/214533/Lil-Gwendolyn
https://inkbunny.net/submissionview.php?id=483550
https://inkbunny.net/submissionview.php?id=374519
http://rule34.xxx/index.php?page=post&s=view&id=1399731
http://rule34.xxx/index.php?page=post&s=view&id=1415193
http://equi.booru.org/index.php?page=post&s=view&id=56940
http://furry.booru.org/index.php?page=post&s=view&id=340299
http://derpibooru.org/470074?scope=scpe80a78d33e96a29ea172a0d93e6e90b47c6a431ea
http://mspabooru.com/index.php?page=post&s=view&id=131809
http://mspabooru.com/index.php?page=post&s=view&id=131804
http://shiniez.deviantart.com/art/thanx-for-5-m-alan-in-some-heavy-makeup-XD-413414430
http://danbooru.donmai.us/posts/1250724?tags=dennou_coil
http://danbooru.donmai.us/posts/1162284?tags=dennou_coildata:text/html,<img src='http://example.com/image.jpg'>
http://www.furaffinity.net/view/12077223/
http://gamesbynick.tumblr.com/post/67039820534/the-secrets-out-guys-the-secret-is-out
http://honeyclop.tumblr.com/post/67122645946/stallion-foursome-commission-for-ciderbarrel-d
http://shubbabang.tumblr.com/post/20990300285/new-headcanon-karkat-is-ridiculously-good-at
http://www.furaffinity.net/view/12092394/
https://e621.net/post/show?md5=25385d2349ae11f2057874f0479422ad
http://sandralvv.tumblr.com/post/64933897836/how-did-varrick-get-that-film-cuz-i-want-a-copy
*/
