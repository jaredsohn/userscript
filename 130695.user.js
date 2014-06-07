// ==UserScript==
// @author			Jack_mustang
// @version			3.6
// @name			ExtendYouPorn
// @description		Remove ads and makes the video better to be viewed. Stops autoplay keeping buffering. Auto-center video.
// @date			2014 April 22
// @include			*youporn.com/*
// @run-at			document-start
// @grant			none
// @icon			http://public.bay.livefilestore.com/y1pSshvmSZkkqpfd9b6gp07U8-OpJIkZfKToFxXLn2M98janqOErccktUHWxF8gqQ6LdW5SrmzSRZONoPbE_YCaJw/ExtendYouPornIcon.png
// ==/UserScript==
var ExtendYP = function ExtendYouPorn(){
	addStyle()

	window.addEventListener('DOMContentLoaded', function(){
		// Remove ads functions
		function removeQuery(query) {
			var ifr = document.querySelectorAll(query)
			if(ifr.length > 0)
				for(var i=0; i < ifr.length; i++)
					ifr[i].parentNode.removeChild(ifr[i])
		}
		// Advertisements
		removeQuery(".advertisement")
		// Remove right banners in video page
		removeQuery(".adSpace")
		// Remove footer ad in video page
		removeQuery(".advertisement_watchFooter")
		// Remove video bottom ad
		removeQuery(".ad-bottom")
		// Remove iframes because they are ads
		removeQuery("iframe")

		// Set tooltips for the titles
		var titles = document.getElementsByClassName('videoTitle')
		if(titles.length > 0)
			for(i=0; i < titles.length; i++)
				titles[i].setAttribute('title', titles[i].innerHTML)

		/* Video page */
		if(document.getElementById('videoContainer')) {
			// Change player
			var player = document.querySelector('#videoContainer').parentNode.innerHTML
			player = player.replace(/autoplay=true/g,"autoplay=false&autoload=true")
			player = player.replace(/disablePauseroll=false/g,"disablePauseroll=true")
			player = player.replace(/disable_sharebar=false/g,"disable_sharebar=true")
			player = player.replace(/&pauseroll_url=http:\/\/ads(.*).php/g,"")
			document.querySelector('#videoContainer').parentNode.innerHTML = player

			// Scroll video to middle of page
			function scrollthere() {
				var player = document.getElementById('videoContainer'),
					vh = player.offsetHeight,
					vd = (player.parentNode.offsetTop == 0)? ((document.querySelector('#studioCanvas'))? document.querySelector('.grid_8.alpha').offsetTop : document.querySelector('.watchWrapper').offsetTop+document.querySelector('#videoCanvas').offsetTop ) : player.parentNode.offsetTop,
					fh = window.innerHeight;
					sc = vd-((fh-vh)/2)
				scrollTo(0, sc)
				console.info("top: "+vd+", height: "+vh+", scrolled: "+sc+", window: "+fh)
			}
			// Inject this function to page
			var script = document.createElement("script")
			script.setAttribute("type", "text/javascript")
			script.innerHTML = scrollthere.toString() + "scrollthere();"
			script.id = "EYP-scrollVid"
			document.body.appendChild(script)

			// Include button in right corner to center video on screen
			var node = document.createElement("div")
			node.setAttribute("style","position: fixed; bottom: 0; right: 0; cursor: pointer; border-top-left-radius: 10px; color: #fff; text-shadow: 1px 1px 1px #292929; font-weight: 700; background: url('http://cdn1.static.youporn.phncdn.com/cb/bundles/manwinyoupornwebfront/images/sprite-watch-bg.png?v=1358797378') 0px -42px repeat-x transparent; text-align: center; font-size: 1.2em; padding: 7px;z-index: 999999;")
			node.setAttribute("onclick", "scrollthere();")
			node.innerHTML = "Center video"
			node.id = "EYP-scroll"
			document.body.appendChild(node)
		}
	},false)

	function addStyle() {
		// While <head> is not loaded we keep trying
		if (!document.querySelector("head"))
			return setTimeout(addStyle, 50)

		// We create an object and start including its content to include in DOM at the end
		var eypcss =
		// Hide ads while we can't remove them
		".advertisement, .adSpace, .advertisement_watchFooter, .ad-bottom {\n\
			display: none !important;\n\
		}\n" +
		// Fix ::selection
		"::selection {\n\
			background: #FFACC0;\n\
			color: #fff;\n\
		}\n\
		::moz-selection {\n\
			background: #FFACC0;\n\
			color: #fff;\n\
		}\n" +
		// Videos Being Watched Right Now in one line
		".videoList.count-6 ul .videoBox.grid_3.videoBox_4, .videoList.count-4 ul .videoBox.grid_3.videoBox_4 {\n\
			clear: none !important;\n\
		}\n\
		.videoList.vbwn ul {\n\
			margin: 0 !important;\n\
			width: 100% !important;\n\
		}\n\
		.videoBox_6 {\n\
			display: none !important;\n\
		}\n\
		@media only screen and (max-width:1279px) {\n\
			[data-current-action='browse'] .vbwn.videoList.count-6 ul .videoBox.grid_3.videoBox_4, [data-current-action='browse'] .vbwn.videoList.count-4 ul .videoBox.grid_3.videoBox_4, [data-current-action='browse'] .vbwn.videoList.count-6 ul .videoBox.grid_3.videoBox_5, [data-current-action='browse'] .vbwn.videoList.count-4 ul .videoBox.grid_3.videoBox_5, [data-current-action='category'] .vbwn.videoList.count-6 ul .videoBox.grid_3.videoBox_4, [data-current-action='external'] .vbwn.videoList.count-6 ul .videoBox.grid_3.videoBox_4, [data-current-action='porntags'] .vbwn.videoList.count-6 ul .videoBox.grid_3.videoBox_4, [data-current-action='category'] .vbwn.videoList.count-4 ul .videoBox.grid_3.videoBox_4, [data-current-action='external'] .vbwn.videoList.count-4 ul .videoBox.grid_3.videoBox_4, [data-current-action='porntags'] .vbwn.videoList.count-4 ul .videoBox.grid_3.videoBox_4, [data-current-action='category'] .vbwn.videoList.count-6 ul .videoBox.grid_3.videoBox_5, [data-current-action='external'] .vbwn.videoList.count-6 ul .videoBox.grid_3.videoBox_5, [data-current-action='porntags'] .vbwn.videoList.count-6 ul .videoBox.grid_3.videoBox_5, [data-current-action='category'] .vbwn.videoList.count-4 ul .videoBox.grid_3.videoBox_5, [data-current-action='external'] .vbwn.videoList.count-4 ul .videoBox.grid_3.videoBox_5, [data-current-action='porntags'] .vbwn.videoList.count-4 ul .videoBox.grid_3.videoBox_5 {\n\
				display: inline-block !important;\n\
			}\n\
			[data-current-action='browse'] .vbwn.videoList.count-6 ul .videoBox.grid_3, [data-current-action='browse'] .vbwn.videoList.count-4 ul .videoBox.grid_3, [data-current-action='category'] .vbwn.videoList.count-6 ul .videoBox.grid_3, [data-current-action='external'] .vbwn.videoList.count-6 ul .videoBox.grid_3, [data-current-action='porntags'] .vbwn.videoList.count-6 ul .videoBox.grid_3, [data-current-action='category'] .vbwn.videoList.count-4 ul .videoBox.grid_3, [data-current-action='external'] .vbwn.videoList.count-4 ul .videoBox.grid_3, [data-current-action='porntags'] .vbwn.videoList.count-4 ul .videoBox.grid_3 {\n\
				margin: 0 1% 1% 0 !important;\n\
			}\n\
		}\n\
		@media only screen and (max-width:9999px) {\n\
			[data-current-action='browse'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='browse'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='browse'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='browse'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='browse'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='browse'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='browse'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='category'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='external'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='recommended'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='favorites'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='search'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='advancedsearchrun'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='porntags'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='category'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='external'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='recommended'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='favorites'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='search'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='advancedsearchrun'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='porntags'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='category'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='external'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='recommended'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='favorites'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='search'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='advancedsearchrun'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='porntags'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='category'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='external'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='porntags'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='category'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='external'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='porntags'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='category'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='external'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='porntags'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='category'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='external'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='porntags'] .videoList.count-4 ul .videoBox.grid_3 {\n\ 	margin: 0 1% 1% 0 !important;\n\
				width: 23.7% !important;\n\
			}\n\
		}\n\
		@media only screen and (min-width:1700px) {\n\
			[data-current-action='browse'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='browse'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='browse'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='browse'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='browse'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='category'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='external'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='recommended'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='favorites'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='search'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='advancedsearchrun'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='porntags'] .vbwn.videoList ul li.videoBox.grid_3, [data-current-action='category'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='external'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='recommended'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='favorites'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='search'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='advancedsearchrun'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='porntags'] .videoList ul li.videoBox.grid_3.videoBox_3, [data-current-action='category'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='external'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='recommended'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='favorites'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='search'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='advancedsearchrun'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='porntags'] .videoList ul li.videoBox.grid_3.videoBox_6, [data-current-action='category'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='external'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='porntags'] .videoList.count-6 ul .videoBox.grid_3, [data-current-action='category'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='external'] .videoList.count-4 ul .videoBox.grid_3, [data-current-action='porntags'] .videoList.count-4 ul .videoBox.grid_3 {\n\
				margin: 0 .9% 1% 0 !important;\n\
				width: 18.1% !important;\n\
			}\n\
		}\n\
		[data-current-action='dashboard'] .videoList ul li.videoBox.grid_3 {\n\
			margin: 0 1% 1% 0 !important;\n\
			width: 18% !important;\n\
		}\n" +
		// Video titles bigger, 2 lines
		".videoList ul li.videoBox.grid_3 .wrapping-video-box > a.videoTitle {\n\
			height: 2.9em !important;\n\
		}\n" +
		// Thumbnails in thumbs tab in video pages
		"#tab-thumbnails ul li {\n\
			height: auto !important;\n\
			width: 20% !important;\n\
		}\n" +
		/* Video page */
		// Enlarge video
		"#content, #videoCanvas {\n\
			position: static !important;\n\
		}\n\
		#videoWrapper {\n\
			display: block !important;\n\
		}\n\
		.container_15 .grid_10 {\n\
			width: 100% !important;\n\
		}\n\
		.container_15 #videoWrapper {\n\
			width: 90% !important;\n\
			max-width: 100% !important;\n\
			margin: auto !important;\n\
		}\n\
		#videoContainer {\n\
			min-height: 60em !important;\n\
		}\n\
		#categorizeSideBnt, #pornstarSideBnt {\n\
			border-radius: 12px !important;\n\
		}\n" +
		// User pages - Dashboard
		".wrapTitle.grid_9 {\n\
			width: 100% !important;\n\
		}\n" +
		// Fix last element non-clickable on festive skins
		"#watchBottom {\n\
			position: relative;\n\
			z-index: 1;\n\
		}\n" +
		// Reccomended Videos
		"#watchBottom .folderContent .videoList {\n\
			min-height: 0 !important;\n\
		}\n" +
		/* Channel pages */
		"#channelCanvas object {\n\
			width: 100% !important;\n\
			max-width: 100% !important;\n\
		}\n\
		#channelCanvas .grid_5.omega {\n\
			float: right !important;\n\
			top: -840px;\n\
			height: 0;\n\
			position: relative;\n\
		}\n\
		#channelCanvas .videoList {\n\
			width: 67% !important;\n\
			display: inline-block !important;\n\
		}\n" +
		/* Studio Page */
		"#studioCanvas .grid_8 {\n\
			width: 100% !important;\n\
		}\n\
		#studioCanvas #videoWrapper {\n\
			height: auto !important;\n\
		}\n\
		.desktop .videoList ul li.videoBox.grid_3:nth-child(4n) {\n\
			margin-right: 1%;\n\
		}\n\
		.desktop .videoList ul li.videoBox.grid_3:nth-child(5n) {\n\
			margin-right: 0;\n\
		}\n"

		// Inject created CSS
		var eypnode = document.createElement("style")
			eypnode.type = "text/css"
			eypnode.id = "EYP-style"
			eypnode.appendChild(document.createTextNode(eypcss))
		document.head.appendChild(eypnode)
	}
}();