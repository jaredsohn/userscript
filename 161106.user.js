// ==UserScript==
// @name           Youtube FREE Proxy (utilise Proxfree)
// @description    Plus de problèmes de chargement sur YOUTUBE lorsqu'on est chez FREE
//
// @include        http://www.youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// ==/UserScript==

var my_isp_sucks = true;
var container = "watch7-video"; // "watch7-video" - just video, "content" - video & comments
var pf_server = "fr"; // Europe: nl, fr, uk; US: dc, il, co, wa, tx, ut, ca

var not_avail_warning = document.getElementById("watch7-player-unavailable");
var yt_video_container = document.getElementById(container); 

function reqPage(req_method, req_url, req_data) {
	var message_container = document.getElementById("watch7-player") || document.getElementById("FlowPlayer").parentNode;
	message_container.innerHTML='<span id="watch7-player" style="vertical-align:middle; display:inline-block; font-size:2em; line-height:397px">Chargement en cours</span>';
	GM_xmlhttpRequest({
		method: req_method,
		url: req_url,
		data: req_data,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0',
			'Accept': 'application/xml,text/xml',
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(responseDetails) {
			// HTML to DOM
			var doc = document.implementation.createHTMLDocument("proxfree_page");
			doc.documentElement.innerHTML = responseDetails.responseText;

			// our proxfree player
			var pf_video_container = doc.getElementById(container);
			console.log(pf_video_container);
			doc = null;

			// switch player
			yt_video_container.innerHTML = pf_video_container.innerHTML;

			// we look for quality links
			var quality_links = yt_video_container.getElementsByTagName('a');
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

if(not_avail_warning != null || my_isp_sucks) {
	console.log('Sending Proxfree request');
	if (not_avail_warning)
		not_avail_warning.innerHTML += "<small><br>Chargement en cours...</small>";

	var page = reqPage('POST', 'http://'+pf_server+'.proxfree.com/request.php?do=go', 'get=' + encodeURIComponent(window.location.href));
}
