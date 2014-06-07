// ==UserScript==
// @name           PROV images slideshow browser 
// @namespace      http://wraggelabs.com/prov_images_media_rss
// @description    Extracts details from a PROV image results page and feeds them to the CoolIris javascript browser.
// @version        0.1
// @date           2010-03-14
// @creator        Tim Sherratt
// @include        http://proarchives.imagineering.com.au/index_search_results.asp
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

if ($('img[src^="http://www.prov.vic.gov.au/images/"]').length > 0) {
	
	//Extract the necessary details from the page - urls for the thumbnail, large image, info page and the caption.
	var images = [];
	$('img[src^="http://www.prov.vic.gov.au/images/"]').each( function(index) {
		var img = {};
		thumbnail = $(this).attr('src');
		img.thumbnail = thumbnail;
		img.image = thumbnail.replace('/t/', '/f/');
		img.link = $(this).closest('a').attr('href');
		img.title = $(this).closest('tr').children().eq(1).text().replace("'", "");
		images[index] = img;
	});

	//Take the image details and write them to a Media RSS file
	XML.prettyPrinting = false;
	var ns = "http://search.yahoo.com/mrss", atom = "http://www.w3.org/2005/Atom";
	var rss = <rss version="2.0" xmlns:media={ ns } xmlns:atom={ atom }/>;
	for each (var image in images)
	rss.channel.item += <item>
	  <title>{ image.title }</title>
	  <link>{ image.link }</link>
	  <media:thumbnail xmlns:media={ ns } url={ image.thumbnail }/>
	  <media:content xmlns:media={ ns } url={ image.image }/>
	</item>;
	var rss_data = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>' + rss.toXMLString();

	//Add PicLens script to page
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://lite.piclens.com/current/piclens.js';
	head = document.getElementsByTagName('head')[0];
	head.appendChild(script);

	//Make a button to call up the browser with the RSS feed we've created
	var coolLink = document.createElement('button');
	coolLink.setAttribute('onclick','PicLensLite.start({feedData:\'' + rss_data + '\'}); return false;');
	coolLink.innerHTML = "<img src='http://lite.piclens.com/images/PicLensButton.png' alt=''/> Browse as slideshow";
	$('table:eq(5)').before(coolLink);
}




