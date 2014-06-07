// ==UserScript==
// @name		Embedder
// @namespace		http://userscripts.org/users/Devon
// @description		Embed content inline next to links on a page.
// @icon		data:image/x-icon;base64,R0lGODlhEAAQAPEAAAAAACsAdWgAqAAAACH5BAnIAAMAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgIBAIBAKBQCAQDAaDwWAgEAQCgUAgEBAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMCAgICAgICAgICAwMDAwMDAgIBAQEBAQEBAQMDAwMDAwICAwMDAwMDAwMDAwMDAwMCAgMDAwMDAwMDAwMDAwMDAgICAgICAgICAgMDAwMDAwEBAQEBAQEBAQIMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgIBAKBQDAYDAaDwWAwGAgCgUAgMDAwMDAwMDAwMCAgMDAwMDAwMDAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwICAgICAgMDAwMDAwMDAwMCAQEBAQEDAwMDAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMCAgICAgIDAwMDAwMDAwMDAgEBAQEBAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBgLBYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAQEDAwMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMBAQMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGAsFgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBoHAYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAQEDAwMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMCAgMDAwMDAwMDAwMDAwMDAQEDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGgcBgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBgLBYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGAsFgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBoHAYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGgcBgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBgLBYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGAsFgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQABACwAAAAAEAAQAIAAAAAAAAAC50wSEREREUIIIYQQAgAAABAEQRAEQRAEAQAAQBAEQRAEQRAEQQAAQRAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIECAAAEKAAAh+QQJBQABACwAAAAAEAAQAIAAAAAAAAAC50wSEQEREUIIIYQQQggAhBAEQRAEQRAEQQAAQBAEQRAEQRAEQRAAABAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIECAAAEKAAAh+QQJyAABACwAAAAAEAAQAIAAAAAAAAAC50wSEREBEUIIIYQQQggBgBAEQRAEQRAEQQAAQBAEQRAEQRAEQQAAQBAIBAKBQCAQCAQCAQAgEAgEAoFAIBAIBAKBACAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIECAAAEKAAAh+QQJBQABACwAAAAAEAAQAIAAAAAAAAAC50wSEQEREUIIIYQQQggAhBAEQRAEQRAEQQAAQBAEQRAEQRAEQRAAABAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIECAAAEKAAAh+QQJBQABACwAAAAAEAAQAIAAAAAAAAAC50wSEREREUIIIYQQAgAAABAEQRAEQRAEAQAAQBAEQRAEQRAEQQAAQRAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIECAAAEKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGAsFgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGgcBgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBgLBYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGAsFgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBoHAYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGgcBgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBgLBYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGAsFgMBgMBoPBYDAYDAaBwGAwGAwGg8FgMBgMBoHAYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAQEDAwMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMCAgMDAwMDAwMDAwMDAwMDAQEDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBgLBYDAYDAaDwWAwGAwGgcBgMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwEBAwMDAwMDAwMDAwMDAwMBAQMDAwMDAwMDAwMDAwMDAQEDAwMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMBAQMDAwYMCAAQMKAAAh+QQJBQADACwAAAAAEAAQAAAC59w2MzMzM8YYY4wxBgAAADAMwzAMwzAMAwAAwDAMwzAMwzAMwwAAwzAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgIBAKBQDAYDAaDwWAwGAgCgUAgMDAwMDAwMDAwMCAgMDAwMDAwMDAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwICAgICAgMDAwMDAwMDAwMCAQEBAQEDAwMDAwMDAwMDAgIDAwMDAwMDAwMDAwMDAwICAwMDAwMDAwMDAwMDAwMCAgICAgIDAwMDAwMDAwMDAgEBAQEBAwYMCAAQMKAAA7
// @version		20121012
// @downloadURL		http://userscripts.org/scripts/source/147382.user.js
// @include		*
// @copyright		2012+, Devon Hess
// @license		GPLv3+; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function() {

//Options (Currently rethinking this implementation, may change soon)

var iframe = false; //Use <iframe> in favor of <embed>
var html5 = false; //Use HTML5 in favor of Flash

//Check browser

	if (/.*chrome.*/i.test(navigator.userAgent)&&html5) {
		html5 = true;
	} else {
		html5 = false;
	}

//Set up all the regex codes

	var audiofile = /.+\/[^\\\/<>:\|\*\?\"]+\.(?:mp3|wav)$/i;
	var facebooklink = /.*facebook\.com\/pages\/.*/i;
	var facebookurl = /.*facebook\.com.*/i;
	var imagefile = /.+\/[^\\\/<>:\|\*\?\"]+\.(?:bmp|gif|jpe?g|png)$/i;
	var googleurl = /.*google\.com.*/i;
	var googlemapslink = /.*maps.google.com\/maps.*/i;
	var newgroundslink = /.*newgrounds\.com\/audio\/listen\/(\d{3})(\d*)/i;
	var newgroundsurl = /.*newgrounds\.com\/audio\/.*/i;
	var ocremixlink = /.*ocremix.org\/remix\/.*/i;
	var photobucketlink = /(.*)\.photobucket.com\/albums\/(.*)\/\?action=view¤t=(.*)/i;
	var tumblrlink = /http:\/\/[^=]*\.tumblr\.com\//i;
	var tumblrurl = /.*\.tumblr\.com.*/i;
	var twitterlink = /.*twitter\.com\/([^\/]*)$/i;
	var twitterurl = /.*twitter\.com.*/i;
	var videofile = /.+\/[^\\\/<>:\|\*\?\"]+\.(?:mp4|ogg|webm)$/i;
	var viddlerlink = /.*viddler\.com\/v\/((?:\d|\w)+)/i;
	var vimeolink = /^http:\/\/vimeo\.com\/(\d+)/i;
	var vimeourl = /.*vimeo\.com.*/i;
	var yahoomapslink = /.*maps.yahoo.com\/(.*)/i;
	var youtubelink = /.*youtube\.com\/watch\?.*v=((?:\w|-)+).*?(?:(?:&|#)t=(\d*h?\d*m?\d*s?))?.*/i;
	var youtubeshortlink = /.*youtu\.be\/((?:\w|-)+).*?(?:(?:\?|&|#)t=(\d*h?\d*m?\d*s?))?.*/i;
	var youtubeuserlink = /.*\.?youtube\.com\/user\/([^\/\?]*)\/?/i;	
	var youtubeurl = /.*youtube\.com.*/i;

//Check all links and determine the site that should be used

	for (i=0; i<document.links.length; i++){
		if (document.links[i].href.match(audiofile)) {
			selectSite("Audio",document.links[i]);
		}
		if (document.links[i].href.match(facebooklink)&&!facebookurl.test(window.location)) {
			selectSite("Facebook",document.links[i]);
		}
		if (document.links[i].href.match(googlemapslink)&&!googleurl.test(window.location)) {
			selectSite("Google Maps",document.links[i]);
		}
		if (document.links[i].href.match(imagefile)) {
			selectSite("Image",document.links[i]);
		}
		if (document.links[i].href.match(newgroundslink)&&!newgroundsurl.test(window.location)) {
			getSpecial("Newgrounds",document.links[i]);
		}
		if (document.links[i].href.match(ocremixlink)) {
			getSpecial("OverClocked ReMix",document.links[i]);
		}
		if (document.links[i].href.match(photobucketlink)) {
			selectSite("Photobucket",document.links[i]);
		}
		if (document.links[i].href.match(tumblrlink)&&!tumblrurl.test(window.location)) {
			if (document.links[i].href.replace(/http:\/\/(.*)?\.tumblr\.com\/.*/i,"$1") !== "www") {
				selectSite("Tumblr",document.links[i],document.links[i].href.replace(/http:\/\/(.*)?\.tumblr\.com\/.*/i,"$1"));
			}
		}
		if (document.links[i].href.match(twitterlink)&&!twitterurl.test(window.location)) {
			selectSite("Twitter",document.links[i]);
		}
		if (document.links[i].href.match(videofile)) {
			selectSite("Video",document.links[i]);
		}
		if (document.links[i].href.match(viddlerlink)) {
			selectSite("Viddler",document.links[i]);
		}
		if (document.links[i].href.match(vimeolink)&&!vimeourl.test(window.location)) {
			selectSite("Vimeo",document.links[i]);
		}
		if (document.links[i].href.match(yahoomapslink)) {
			selectSite("Yahoo! Maps",document.links[i]);
		}
		if (document.links[i].href.match(youtubelink)&&!youtubeurl.test(window.location)) {
			selectSite("YouTube",document.links[i]);
		}
		if (document.links[i].href.match(youtubeshortlink)) {
			selectSite("YouTu.be",document.links[i]);
		}
		if (document.links[i].href.match(youtubeuserlink)&&!youtubeurl.test(window.location)) {
			selectSite("YouTube User",document.links[i]);
		}
	}

//Create special cases

	function getSpecial(site,link) {
		GM_xmlhttpRequest({
			method: "GET",
			url: link.href,
			onload: function (response) {
				responseXML = null;
				if (!response.responseXML) {
					responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
				}
				if (site=="Newgrounds") {
					elem = new Array();
					elem[0] = responseXML.getElementsByClassName("authorlinks")[0].getElementsByTagName("li")[0].getElementsByTagName("em")[0].innerHTML.replace(/Author (.*)/,"$1");
					elem[1] = responseXML.getElementsByClassName("nodimming two3")[0].getElementsByTagName("div")[0].getElementsByTagName("h2")[0].innerHTML;
					selectSite(site,link,elem);
				}
				if (site=="OverClocked ReMix") {
					elem = new Array();
					elem[0] = responseXML.getElementById("panel-download").getElementsByTagName("ul")[1].getElementsByTagName("li")[3].getElementsByTagName("a")[0].getAttribute("href");
					elem[1] = responseXML.getElementsByTagName("h1")[0].innerHTML.replace(/<span xmlns="http:\/\/www.w3.org\/1999\/xhtml" style="color:#cdcdcd;">ReMix: <\/span><a xmlns="http:\/\/www.w3.org\/1999\/xhtml" href=".*">.*<\/a> '(.*)' /,"$1");
					elem[2] = responseXML.getElementById("panel-main").getElementsByTagName("div")[8].getElementsByTagName("li")[1].innerHTML.replace(/<strong xmlns="http:\/\/www.w3.org\/1999\/xhtml">.*<\/strong>: (.*)/,"$1").split("href=\"").join("href=\"http://ocremix.org");
					selectSite(site,link,elem);
				}
			}
		});
	}

//Embed the link

	function selectSite(site,link,special) {
		if (typeof embi == "undefined") {
			embi = 1;
		} else {
			embi ++;
		}
		if (iframe) {
			embed = "iframe";
		} else {
			embed = "embed";
		}
		space = new Array();
		if (link.parentNode.getBoundingClientRect().right-link.parentNode.getBoundingClientRect().left > window.innerWidth-link.parentNode.getBoundingClientRect().left) {
			space[0] = document.body.offsetWidth-link.parentNode.getBoundingClientRect().left;
		} else {
			space[0] = link.parentNode.getBoundingClientRect().right-link.parentNode.getBoundingClientRect().left;
		}
		//Audio min space
		if (space[0] > 300) {
			space[1] = space[0]
		} else {
			space[1] = 300;
		}
		//Facebook min space
		if (space[0] > 292) {
			space[2] = space[0]
		} else {
			space[2] = 292;
		}
		//Video min space
		if (space[0] > 320) {
			space[3] = space[0]
		} else {
			space[3] = 320;
		}
		//Video max space
		if (space[3] > 640) {
			space[3] = 640;
		}
		span = document.createElement("span");
		toggle = document.createElement("toggle");
		toggle.title = "Embed "+embi+" "+link.href;
		toggle.innerHTML = " ◂";
		toggle.style.cursor = "pointer";
		toggle.style.border = "none";
		span.innerHTML = "<br />";
		if (site == "Audio") {
			if (html5) {
				span.innerHTML += '<style>audio {width: '+space[1]+';}</style><audio controls="controls" src="'+link.href+'">HTML5 audio not supported.</audio>';
			} else {
				span.innerHTML += '<'+embed+' src="http://reader.googleusercontent.com/reader/ui/3523697345-audio-player.swf?audioUrl='+link.href+'" width="'+space[1]+'" height="27" frameborder="0"></'+embed+'>';
			}
		}
		if (site == "Facebook") {
			span.innerHTML += '<iframe width="'+space[2]+'" height="385" frameborder="0" src="https://www.facebook.com/plugins/likebox.php?href='+link.href+'&show_faces=false&stream=true&header=false"></iframe>';
		}
		if (site == "Google Maps") {
			span.innerHTML += '<'+embed+' width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+link.href+'&output=embed"></'+embed+'>';
		}
		if (site == "Image") {
			span.innerHTML += '<img src="'+link.href+'">';
		}
		if (site == "Newgrounds") {
			if (html5) {
				span.innerHTML += '<style>audio {width: '+space[1]+';}</style><audio controls="controls" src="http://www.newgrounds.com/audio/download/'+link.href.replace(newgroundslink,"$1$2")+'">HTML5 audio not supported.</audio>';
			} else {
				span.innerHTML += '<'+embed+' src="http://reader.googleusercontent.com/reader/ui/3523697345-audio-player.swf?audioUrl=http://www.newgrounds.com/audio/download/'+link.href.replace(newgroundslink,"$1$2")+'" width="'+space[1]+'" height="27" frameborder="0"></'+embed+'>';
			}
			span.innerHTML += '<br /><img src="'+link.href.replace(newgroundslink,"http://aicon.ngfiles.com/$1/$1$2_small.png")+'"> '+special[0]+' - <a href="http://www.newgrounds.com/audio/download/'+link.href.replace(newgroundslink,"$1$2")+'">'+special[1]+'</a>';
		}
		if (site == "OverClocked ReMix") {
			if (html5) {
				span.innerHTML += '<style>audio {width: '+space[1]+';}</style><audio controls="controls" src="'+special[0]+'">HTML5 audio not supported.</audio>';
			} else {
				span.innerHTML += '<'+embed+' src="http://reader.googleusercontent.com/reader/ui/3523697345-audio-player.swf?audioUrl='+special[0]+'" width="'+space[1]+'" height="27" frameborder="0"></'+embed+'>';
			}
			span.innerHTML += '<br/>'+special[2]+' - <a href="'+special[0]+'" download>'+special[1]+'</a>';
		}
		if (site == "Photobucket") {
			span.innerHTML += '<img src="'+link.href.replace(photobucketlink,"$1.photobucket.com/albums/$2/$3")+'">';
		}
		if (site == "Tumblr") {
			span.innerHTML += special+' <'+embed+' src="http://www.tumblr.com/dashboard/iframe?src=http%3A%2F%2F'+special+'.tumblr.com%2F" width="193" height="25" scrolling="no" frameborder="0"</'+embed+'>';   
		}
		if (site == "Twitter") {
			span.innerHTML += '<embed src="https://platform.twitter.com/widgets/follow_button.html?screen_name='+link.href.replace(twitterlink,"$1")+'" height="20" frameborder="0"></embed>';
		}
		if (site == "Video") {
			span.innerHTML += '<video width="'+space[3]+'" height="'+space[3]/(16/9)+'" controls="controls"><source src="'+link.href+'">HTML5 video not supported.</video>';
		}
		if (site == "Viddler") {
			span.innerHTML += '<'+embed+' src="http://www.viddler.com/embed/'+link.href.replace(viddlerlink,"$1")+'/?f=1&autoplay=0&player=full&loop=false&nologo=false&hd=false" width="'+space[3]+'" height="'+space[3]/(16/9)+'" frameborder="0" mozallowfullscreen="true" webkitallowfullscreen="true"></'+embed+'>';
		}
		if (site == "Vimeo") {
			span.innerHTML += '<'+embed+' src="http://player.vimeo.com/video/'+link.href.replace(vimeolink,"$1")+'" width="'+space[3]+'" height="'+space[3]/(16/9)+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></'+embed+'>';
		}
		if (site == "Yahoo! Maps") {
			span.innerHTML += '<'+embed+' width="425" height="350" frameborder="0" scrolling="no" src="'+link.href.replace(yahoomapslink,"http://maps.yahoo.com/embed$1")+'"></'+embed+'>';
		}
		if (site == "YouTube") {
			if (iframe) {
				span.innerHTML += '<iframe width="'+space[3]+'" height="'+space[3]/(16/9)+'" src="http://www.youtube.com/embed/'+link.href.replace(youtubelink,"$1")+'?rel=0#t='+link.href.replace(youtubelink,"$2")+'" frameborder="0" allowfullscreen></iframe>';
			} else {
				span.innerHTML += '<object width="'+space[3]+'" height="'+space[3]/(16/9)+'"><param name="movie" value="http://www.youtube.com/v/'+link.href.replace(youtubelink,"$1")+'?rel=0&start='+link.href.replace(youtubelink,"$2")+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+link.href.replace(youtubelink,"$1")+'?rel=0&start='+link.href.replace(youtubelink,"$2")+'" type="application/x-shockwave-flash" width="'+space[3]+'" height="'+space[3]/(16/9)+'" allowscriptaccess="always" allowfullscreen="true"></embed></object>';
			}
		}
		if (site == "YouTu.be") {
			if (iframe) {
				span.innerHTML += '<iframe width="'+space[3]+'" height="'+space[3]/(16/9)+'" src="http://www.youtube.com/embed/'+link.href.replace(youtubeshortlink,"$1")+'?rel=0#t='+link.href.replace(youtubeshortlink,"$2")+'" frameborder="0" allowfullscreen></iframe>';
			} else {
				span.innerHTML += '<object width="'+space[3]+'" height="'+space[3]/(16/9)+'"><param name="movie" value="http://www.youtube.com/v/'+link.href.replace(youtubeshortlink,"$1")+'?rel=0&start='+link.href.replace(youtubeshortlink,"$2")+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+link.href.replace(youtubeshortlink,"$1")+'?rel=0&start='+link.href.replace(youtubeshortlink,"$2")+'" type="application/x-shockwave-flash" width="'+space[3]+'" height="'+space[3]/(16/9)+'" allowscriptaccess="always" allowfullscreen="true"></embed></object>';
			}
		}
		if (site == "YouTube User") {
			span.innerHTML += '<iframe src="http://www.youtube.com/subscribe_widget?p='+link.href.replace(youtubeuserlink,"$1")+'" height="104" scrolling="no" frameBorder="0"></iframe>';
		}
		span.innerHTML += "<br />";
		span.style.display = "none";
		span.id = toggle.title;
		toggle.addEventListener("click", togglePlayer, true);
		link.parentNode.insertBefore(span, link.nextSibling);
		link.parentNode.insertBefore(toggle, link.nextSibling);   
	}

//Set what happens when the arrow is clicked

	function togglePlayer(event) {
		if (document.getElementById(this.title).style.display == "none") {
			document.getElementById(this.title).style.display = "inline";
			this.innerHTML = " ▾";
		}
		else {
			document.getElementById(this.title).style.display = "none";
			this.innerHTML = " ◂";			
		}
	}
})();