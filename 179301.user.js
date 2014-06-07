// ==UserScript==
// @name           Youtube auto proxy player (uses Proxfree) ** Might work without "Referer Control"
// @description    When you receive the "is not available in your country" message on Youtube, this script automatically loads a player from a proxy. *** Possible fix for Use Referer Control and block nl.proxfree.com
// @version        20131122-Arne
// @include        http://www.youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// @grant          GM_xmlhttpRequest
// @grant          GM_setValue
// ==/UserScript==

GM_setValue('noReferer', 'on');
GM_setValue('noUseragent', 'on');

var my_isp_sucks = false; // change to "true" to enable proxy for every video
var pf_server = "nl"; // Europe: nl, fr, uk; US: dc, il, co, wa, tx, ut, ca

var yt_container_id = "player"; // "watch7-video" - just video, "content" - video & comments
var pf_container_id = "player"; // "watch7-video" - just video, "content" - video & comments
var links_container = "watch7-headline"; // "watch7-headline"
var not_avail_warning = document.getElementById("unavailable-message");
var yt_video_container = document.getElementById(yt_container_id);
var yt_links_container = document.getElementById(links_container);

function reqPage(req_method, req_url, req_data) {
	yt_video_container.innerHTML='<span style="vertical-align:middle; display:inline-block; font-size:2em; line-height:397px">Please wait a few seconds while the proxy player loads...</span>';
	GM_xmlhttpRequest({
		method: req_method,
		url: req_url,
		data: req_data,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0',
			'Accept': 'application/xml,text/xml',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function(responseDetails) {
			// HTML to DOM
			var doc = document.implementation.createHTMLDocument("proxfree_page");
			doc.documentElement.innerHTML = responseDetails.responseText;
			//console.dirxml(doc); // viewing source of proxfree_page

			// our proxfree player and quality links
			var pf_video_container = doc.getElementById(pf_container_id);
			var pf_links_container = doc.getElementById(links_container);
			doc = null;
			//console.log(pf_video_container);
			//console.log(pf_links_container);
			//console.dirxml(pf_video_container); // viewing player source of proxfree_page
			//console.dirxml(pf_links_container); // viewing source

			// switch player and links
			yt_video_container.innerHTML = pf_video_container.innerHTML;
			yt_links_container.innerHTML = pf_links_container.innerHTML;

			// we look for quality links
			var quality_links = yt_links_container.getElementsByTagName('a');
			// and change their href to match with proxfree domain
			for(var i=0; i<quality_links.length; i++){
				quality_links[i].href = quality_links[i].href.replace('www.youtube', pf_server + '.proxfree');
				// we add an event for requesting player when we click on another quality
				quality_links[i].addEventListener('click', function(e) {
					e.preventDefault();
					reqPage('GET', this.href, '');
				}, false);
			}

			// repair images
			var images = yt_video_container.getElementsByTagName('img');
			for(var i=0; i<images.length; i++){
				images[i].src = images[i].src.replace('www.youtube', pf_server + '.proxfree');
			}
		}
	});

}
//console.log(not_avail_warning);
//if (/Unfortunately, this video is not available in Germany because it may contain music for which GEMA has not granted the respective music rights./i.test (document.body.innerHTML) )
//{
//    alert ("Found it!");
//}
if(/Unfortunately, this video is not available in Germany because it may contain music for which GEMA has not granted the respective music rights./i.test (document.body.innerHTML) || my_isp_sucks) {
	console.log('Sending Proxfree request');
	if (not_avail_warning)
		not_avail_warning.innerHTML += "<small><br>Please wait a few seconds while the proxy player loads...</small>";

	var page = reqPage('POST', 'http://'+pf_server+'.proxfree.com/request.php?do=go', 'get=' + encodeURIComponent(window.location.href));
}