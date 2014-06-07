// ==UserScript==
// @name        Eza's Pixiv Fixiv
// @namespace   https://inkbunny.net/ezalias
// @description Loads Pixiv "manga" pages without having to scroll down and wait
// @include     http://www.pixiv.net/member_illust.php?mode=manga&illust_id=*
// @version     1.2
// ==/UserScript==



// On manga pages, load all images without having to manually scroll to each one. 
// Possible addition: change the thumbnail view to let middle-click open the "big" pages one by one.
// What I'm trying to say here is that Pixiv is horrible for usability. It's openly hostile to its users' time and enjoyment. 

// I might just scrape the page HTML for all the _p# image URLs and then swap in my own minimal HTML. 
// Ideally Pixiv still thinks this means its own page is requesting the images and doesn't throw one of its many 403s. 

// Todo: click to scroll, button for vertically scaling images, button for toggling high/medium image resolution, possibly thumbnail-scaled previews of all images at the top of the page. 
//		All a matter of fancying up the replacement HTML. (Slow in coming because nein sprechen HTML.) 

// image resizing: if images full-size, foreach( '<img' ) { replace with '<img size=whatever' } - then the reverse when images are resized
// 		heheh, use pixiv's own shrink/embiggen icons 
// thumbnails: do new_html = thumbnail_code + new_html + img_code - no, wait, shit; that would make the thumbnails in reverse order. 
//		do thumbnail_code += thumbnail_img, then finally new_html = thumbnail_code = new_html
// click-to-scroll: instead of just <img>, add <a href=pX_anchor><img></a><pX_anchor>
//		don't forget to link thumbnails as well. 
// remember: each replacement will completely obliterate the HTML and probably restart this script, but it's atomic, not by parts. 

// pixiv trusts anything from their own pages. I might be able to redirect from those stupid landing pages to main images etc. with a 100%,0% frame setup. 

// can I just 'touch' all the pages and force them to load within pixiv's own source? I mean, I'm essentially recreating their page now. 
// I could also just regex document.body.innerHTML for big images. I think the 'small' mode scales them instead of loading some smaller file. 
// <script>pixiv.context.images[1] = 'http://i2.pixiv.net/img108/img/ukaban/29548141_p1.jpg';pixiv.context.thumbnailImages[1] = 'http://i2.pixiv.net/img108/img/ukaban/mobile/29548141_128x128_p1.jpg';</script></div><div class="item-container"><script>pixiv.context.pages[1] = [2];</script><a href="/member_illust.php?mode=manga_big&amp;illust_id=29548141&amp;page=1" target="_blank" class="full-size-container ui-tooltip" data-tooltip="オリジナルサイズを表示"><i class="_icon sprites-full-size"></i></a><img src="http://source.pixiv.net/www/images/common/transparent.gif" class="image ui-scroll-view" data-filter="manga-image" data-src="http://i2.pixiv.net/img108/img/ukaban/29548141_p1.jpg" data-index="1">




// Global variables, for simplicity
var html_dump = document.getElementsByTagName('html')[0].innerHTML;		// read full page HTML as string - admittedly overkill, but it's kilobytes, so who really cares? (Could be a reference if it matters.) 

// manga-page source is full of instances like "pixiv.context.images[0] = 'http://i1.pixiv.net/img67/img/kzrw/39760142_p0.jpg'". scrape them all. 
// even just using clumsy Image Glutton tactics, I can repeatedly find pixiv.context.images / http and then dump everything before that - repeatedly adding <img>s to the new html. 

var new_html = "";		// this will be what we eventually replace the page's HTML with. 
var thumbnail_html = "";		// this will be prefaced onto new_html - it's kept separate so we can add to it in-order instead of in reverse order 

var total_pages = 0;
while( html_dump.indexOf( "pixiv.context.images[" ) !== -1 ) {		// while there's at least one page still defined
	html_dump = html_dump.substring( html_dump.indexOf( "pixiv.context.images[" ) );		// ditch everything before the definition declaration
	html_dump = html_dump.substring( html_dump.indexOf( "http:" ) );		// ditch everything before the page being defined
	var page_url = html_dump.substring( 0, html_dump.indexOf( "'" ) );		// copy the URL itself - from the beginning (http) until before the next single-quote

	page_url = page_url.replace( "_p", "_big_p" );		// modify image URL to get the highest-resolution version 

	var page_number = page_url.substring( page_url.lastIndexOf( '_p' ) + 2, page_url.lastIndexOf( '.' ) ); 

	thumbnail_html = thumbnail_html + "<a href='#" + page_number + "'>";		// link thumbnail to the relevant page anchor
	thumbnail_html = thumbnail_html + "<img id='thumb' src='" + page_url + "' height='100' width='auto'></a> ";		// display thumbnail at fixed height - browser should maintain aspect ratio. 

	new_html = new_html + "<a id = '" + page_number + "'>";		// first, page anchor for #links from previous page and from thumbnails 
	new_html = new_html + "<a href='#" + (1.0 + parseInt(page_number)) + "'>";		// second, link this page to the next page (whether or not it exists) (parse it as a number, JS, for fuck's sake)
	new_html = new_html + "<img id='p"+page_number+"' src='" + page_url + "'></a><br><br><br>";		// append the image (and a double linebreak) to the bespoke HTML we'll replace everything with

	total_pages = total_pages + 1;
}
new_html = new_html + "<a id = '" + (1.0 + parseInt(page_number)) + "'></a>";

//var resize_script_html = "<button onclick='"+resize_script_js+"'>Click me</button>"

/*
var img = document.getElementById(imgId);
var w = img.width, h = img.height;
w /= 2; h /= 2;
img.width = w; img.height = h;
*/

//var image_resize_js = 'alert("alart");';
//var image_resize_js = 'for(var n=0;n<'+total_pages+';n++){var img = document.getElementById( "p"+n );img.height = 800;}';
//var image_resize_js = 'var scaled;if(scaled>0){for(var n=0;n<'+total_pages+';n++){var img = document.getElementById( "p"+n );img.height = 800;}scaled=0;}else{for(var n=0;n<'+total_pages+';n++){var img = document.getElementById( "p"+n );img.height = "";}scaled=1;}';

// inline_javascript = "<script>scaled=1;</script><button onclick='" + image_resize_js + "'>Scale pages</button>"
//new_html = thumbnail_html + "<center><br><br>"+inline_javascript+"<br><br>" + new_html;		// thumbnails first, then main images
new_html = thumbnail_html + "<center><br><br><br>" + new_html;		// thumbnails first, then main images

document.body.innerHTML = new_html;		// replace the HTML body with new_html, which should now contain a long list of <img>s that load in a sensible manner 






























// http://www.pixiv.net/member_illust.php?mode=medium&illust_id=22091558
