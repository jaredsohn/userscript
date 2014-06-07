// ==UserScript==
// @author			Jack_mustang
// @version			4.2
// @name			ExtendRedTube
// @description		Remove ads, makes the video better to be viewed and add video download links.
// @date			2014 April 14
// @include			*redtube.com/*
// @include			*redtube.org/*
// @include			*redtube.cz/*
// @include			*redtube.es/*
// @include			*redtube.fr/*
// @include			*redtube.it/*
// @include			*redtube.kr/*
// @include			*redtube.pl/*
// @include			*redtube.si/*
// @run-at			document-start
// @grant			none
// @icon			http://public.bay.livefilestore.com/y1pSshvmSZkkqp0NsmeCM6Sk8SQOC3rcOl29uZRUd_YsrSd4aMGNBmYYChRlRnZu9ht5pDhWoVglIGo11ITBXNW4Q/ExtendRedTubeIcon.png
// ==/UserScript==

var ExtendRT = function ExtendRedTube() {
	//Inject blocker and CSS
	addStuff()

	window.addEventListener('DOMContentLoaded', function() {
		// Remove ads functions
		function removeQuery(query) {
			var ifr = document.querySelectorAll(query)
			if(ifr.length > 0)
				for(var i=0; i < ifr.length; i++)
					ifr[i].parentNode.removeChild(ifr[i])
		}

		// Remove header ad
		removeQuery('#as_134')
		// Remove footer ad
		removeQuery('#as_131')
		// Remove right ad
		removeQuery('.sb')
		// Remove iframe ads
		removeQuery("iframe")

		if(document.getElementById('redtube_flv_player')) {
			// Scroll video to middle of page
			function scrollthere() {
				var vid = document.getElementById('redtube_flv_player').parentNode,
					vh = vid.offsetHeight,
					vd = vid.offsetTop,
					fh = window.innerHeight,
					sc = vd-((fh-vh)/2)
				// alert("vh: "+vh+"\nvd: "+vd+"\nfh: "+fh+"\nsc: "+sc)
				scrollTo(0, sc)
			}// Now inject this function
			var script = document.createElement("script")
			script.setAttribute("type","text/javascript")
			script.innerHTML = scrollthere.toString() + "scrollthere();"
			script.id = ("ERT-scrollVid")
			document.body.appendChild(script)

			// Include button in right corner to center video on screen;
			var node = document.createElement("div")
			node.setAttribute("style", "position:fixed; bottom:0; right:0; top:auto!important; height:15px; width:80px; cursor:pointer")
			node.setAttribute("class", "videoRating")
			node.setAttribute("onclick", "scrollthere();")
			node.innerHTML = "Center video"
			document.body.appendChild(node)

			// Download videos
			function convertLink(link) {
				// Function to convert links to make them functional
				link = link.replace(/%3A/ig, ':')
				link = link.replace(/%2F/ig, '/')
				link = link.replace(/%3F/ig, '?')
				return link
			}

			var player = document.getElementById('redtube_flv_player').innerHTML
			player = player.replace(/&amp;/ig, '&')
			var mp4Start = player.indexOf('&mp4_url='),
				flvStart = player.indexOf('&flv_h264_url='),
				flvEnd = player.indexOf("&start_type=h264"),
				mp4Link = player.slice(mp4Start+9, flvStart),
				flvLink = player.slice(flvStart+14, flvEnd)

			// Add the download button tab
			var dwntab = document.getElementsByClassName("pornstarDirVideo")
			dwntab[0].setAttribute("href", "javascript:;")
			dwntab[0].setAttribute("rel", "tagger_download")
			dwntab[0].innerHTML = "Download"

			// Include the download div with links
			var dwntag = document.createElement("div")
			dwntag.setAttribute("id", "tagger_download")
			dwntag.setAttribute("style", "overflow: hidden;display: none")
			dwntag.innerHTML = '<p>Copy the video title, the file name from links below are lame!<br/>The file location have a time limit, if the file seems to not exist, reload the page!</p><table id="downOptions"><tr><td><h2><a style="color: #A0A0A0;" href="'+convertLink(mp4Link)+'">MP4 Format</a></h2></td></tr><tr><td><h2><a style="color: #A0A0A0;" href="'+convertLink(flvLink)+'">FLV Format</a></h2></td></tr></table>'
			var tagcom = document.getElementById("tabsContentHolder")
			tagcom.appendChild(dwntag)

			// Include thumbnail button tab
			var thumbtab = document.createElement("li")
			thumbtab.innerHTML = "<a style='cursor:pointer' onclick='$(\"div[id^=tagger_]\").css({\"display\": \"none\"});$(\"#tabsParent>ul li\").attr(\"class\",\"\");$(\"#tabsParent>ul li:last-child\").attr(\"class\",\"activeTab\");$(\"#tabsContentHolder\").attr(\"style\",\"display:none\");$(\"#tagger_thumbs\").attr(\"style\",\"\");$(\"#tabsContentHolder\").slideDown(\"slow\");'>Thumbnails</a>"
			var tabs = document.getElementsByClassName("tabsElements")
			tabs[0].appendChild(thumbtab)

			// Add, check thumbs exist, change location if needed and include div
			function changeServer(num) {
				var s = '0',
					table = '',
					source,
					nums = num + 1,
					vidId = location.pathname
				vidId = vidId.slice(1)
				vidId2 = vidId.slice(0, vidId.length -3)
				while(vidId.length < 7)
					vidId = '0' + vidId
				while(vidId2.length < 7)
					vidId2 = '0' + vidId2
				switch(num) {
					case 0:
						source = 'img03'
						break
					case 1:
						source = 'thumbs.lsw'
						break
					case 2:
						source = 'img01'
						break
					case 3:
						source = 'img02'
						break
					case 4:
						source = 'img04'
						break
				}
				for(i=1; i<17; i++) {
					if(i == 10)
						s = ''
					table = table + '<td><img class="te" '
					if(i == 1 && num < 4)
						table = table + 'onerror="changeServer('+ nums +');"'
					table = table + 'src="http://'+ source +'.redtubefiles.com/_thumbs/'+ vidId2 +'/'+ vidId +'/'+ vidId +'_0'+ s + i +'m.jpg" /></td>'
					if(i == 4 || i == 8 || i == 12)
						table = table + '</tr><tr>'
				}
				if(num == 0) {
					var node = document.createElement('div')
					node.setAttribute('id', 'tagger_thumbs')
					node.setAttribute('style', 'overflow:hidden;display:none')
				} else
					var node = document.getElementById('tagger_thumbs')
				node.innerHTML = '<table><tr>'+ table +'</tr></table>'
				if(num == 0)
					document.getElementById('tabsContentHolder').appendChild(node)
			}// Now inject this function
			var thumbscript = document.createElement("script")
			thumbscript.setAttribute("type", "text/javascript")
			thumbscript.innerHTML = changeServer.toString() + "changeServer(0);"
			document.body.appendChild(thumbscript)
		}

	},false)

	function addStuff() {
		// While <head> is not loaded we keep trying
		if (!document.querySelector("head"))
			return setTimeout(addStuff, 50)

		// Block popups and let middle mouse click on thumbs open link
		function popupBlocker (event) {
			window.g367CB268B1094004A3689751E7AC568F = "ERT-Blocker"
		}
		var popblock = document.createElement("script")
		popblock.setAttribute("type", "text/javascript")
		popblock.id = "ERT-popupBlock"
		popblock.innerHTML = 'window.addEventListener("DOMContentLoaded", function blockPop() {\n'+
			'var name = document.querySelectorAll(".te")\n'+
			'if(name.length > 0)\n'+
				'for(var i=0; i < name.length; i++)\n'+
					'$("#"+name[i].id).off("click")\n'+
		'}, false)\n'+
		'window.addEventListener("DOMNodeInserted", '+ popupBlocker.toString() +', false)'
		var targ = document.head
		targ.appendChild(popblock)

		// We create an object and start including its content to include in DOM at the end.
		var ertcss =
		// Hide ads while we can't remove them
		"#as_131, #as_134, body .sb {\n\
			display: none !important\n\
		}\n" +
		// Prevent background ad
		"body {\n\
			background-color: #000 !important\n\
		}\n" +
		// Make thumbs have 5 in every row
		".videoThumbs.three-in-row {\n\
			margin-bottom: -228px\n\
		}\n\
		.videoThumbs.three-in-row + .videoThumbs.five-in-row li:first-of-type{\n\
			margin-left: 190px !important\n\
		}\n\
		.videoThumbs > li {\n\
			clear: none !important;\n\
			margin: 0 9px 20px 0 !important\n\
		}\n\
		ul.videoThumbs {\n\
			width: auto !important\n\
		}\n" +

		/* PornStars page */
		"ul.pornStarsThumbs.four-in-row {\n\
			width: 100% !important\n\
		}\n\
		.pornStarsThumbs.four-in-row > li {\n\
			clear: none !important;\n\
			margin: 0 8px 20px 0 !important\n\
		}\n\
		.pornStarsThumbs.four-in-row > li:last-child {\n\
			margin-right: 0 !important;\n\
		}\n" +

		/* Video Page */
		// Enlarge player
		".video-wrap, .watch, .videoPlayer, #redtubeplayer {\n\
			width: 100% !important\n\
		}\n\
		.videoPlayer, #redtube_flv_player, #redtubeplayer {\n\
			height: 547.3px !important;\n\
		}\n\
		.video-wrap h1.videoTitle {\n\
			width: 800px !important\n\
		}\n\
		#html5_vid video {\n\
			margin: 0 !important;\n\
			height: 468px !important;\n\
			width: 956px !important\n\
		}\n" +
		/* Image galleries list */
		".albumThumbs.three-in-row {\n\
			width: 100% !important\n\
		}\n\
		.albumThumbs.three-in-row li:nth-of-type(4) {\n\
			clear: none !important;\n\
			margin-left: 31px !important\n\
		}\n" +

		/* Other random pages */
		// API
		"#wrapper {\n\
			background: #FFF !important\n\
		}\n"

		// Inject created CSS
		var ertnode = document.createElement("style")
			ertnode.type = "text/css"
			ertnode.id = "ERT-style"
			ertnode.appendChild(document.createTextNode(ertcss))
		targ.appendChild(ertnode)
	}
}();