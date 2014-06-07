// ==UserScript==
// @name           eLive for Firefox
// @namespace      http://www.elive.pro/greasemonkey-scripts
// @description    Add videos to eLive easily!
// @version        0.1.0
// @require        http://sizzlemctwizzle.com/updater.php?id=84059
// @include        http://www.youtube.com/user/*
// @include        http://www.youtube.com/watch?v=*
// @include        http://www.youtube.com/profile?user=*
// ==/UserScript==

/*---------------------------------------------- Utils -----------------------------------------------------*/

var CommonUtils = {
	
	hasClass: function(ele, cls) {
		return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	},
	
	addClass: function(ele, cls) {
		if (!CommonUtils.hasClass(ele,cls)) {
			ele.className += " " + cls;
		}
	},
	 
	removeClass: function(ele, cls) {
		if (CommonUtils.hasClass(ele,cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			ele.className = ele.className.replace(reg,' ');
		}
	},
	
	trim: function(str) {
		return str.replace(/^\s*/, "").replace(/\s*$/, "");
	},
	
	getWebpageType: function() {
		var winLoc = "" + window.location;
		if (winLoc.search(/\/watch\?v=/i) >= 0) {
			return "video";
		}
		if (winLoc.search(/\/user\//i) >= 0 || winLoc.search(/\/profile\?user=/i) > 0) {
			return "user";
		}
		return "";
	},
	
	getVideoId: function() {
		var pageType = CommonUtils.getWebpageType();
		var videoUrl = "";
		if (pageType == "video") {
			videoUrl = "" + window.location;
		} else if (pageType == "user") {
			videoUrl = document.getElementById('playnav-watch-link').href;
		} else {
			return "";
		}
		var searchIndex = videoUrl.search(/\/watch\?v=/i);
		if (searchIndex < 0) {
			return "";
		}
		var videoId = videoUrl.substr(searchIndex + 9, 11);
		if (videoId.length != 11) {
			return "";
		}
		return videoId;
	},
	
	// http://www.youtube.com/user/whitenoisemp3s#p/a/u/0/k0gsduLrfSU
	// http://www.youtube.com/watch?v=k0gsduLrfSU
	getVideoTitle: function() {
		var pageType = CommonUtils.getWebpageType();
		var videoTitle = "";
		if (pageType == "video") {
			videoTitle = document.getElementById('eow-title').innerHTML;
		} else if (pageType == "user") {
			videoTitle = document.getElementById('playnav-curvideo-title').children[0].innerHTML;
		} else {
			return "";
		}
		return CommonUtils.trim(videoTitle);
	},
	
	sendMessage: function() {
		var message =  "url=" + escape(CommonUtils.getVideoId()) + "&title=" + escape(CommonUtils.getVideoTitle());		
		var frames = unsafeWindow.parent.frames;
		for (var i = 0; i < frames.length; i++) {
			frames[i].postMessage(message, "*");
		}
	},
	
	createEliveIFrame: function() {
		var eliveIFrame = document.createElement('iframe');
		eliveIFrame.id = "elive-iframe-id";
		eliveIFrame.name = "elive-iframe-name";
		eliveIFrame.src = 'http://elise.elive.pro/youtubeiframe/YoutubeIFrame.html';
		eliveIFrame.width = "0";
		eliveIFrame.height = "23";
		eliveIFrame.style.border = "none";
		eliveIFrame.style.padding = "0";
		eliveIFrame.style.margin = "0";
		eliveIFrame.innerHTML = '<p>Your browser does not support iframes.</p>';
		return eliveIFrame;
	},
	
	getEliveIFrame: function() {
		return document.getElementById('elive-iframe-id');
	},
	
	createEliveIFrameLoadingDiv: function() {
		var loadingLabel = document.createElement('div');
		loadingLabel.id = "elive-iframe-loading-label";
		loadingLabel.style.position = "absolute";
		loadingLabel.style.font = "12px Arial,Helvetica,sans-serif";
		loadingLabel.innerHTML = "Loading...";
		return loadingLabel;
	},
	
	getEliveIFrameLoadingDiv: function() {
		return document.getElementById('elive-iframe-loading-label');
	}
	
};

/*---------------------------------------------- Generic process -----------------------------------------------------*/

var webpageType = CommonUtils.getWebpageType();
if (webpageType == "video") {
	startVideoWebpageProcess();
} else if (webpageType == "user") {
	startUserWebpageProcess();
}

/*---------------------------------------------- Webpage type "VIDEO" process -----------------------------------------------------*/

function startVideoWebpageProcess() {
	
	///////////
	// UTILS //
	///////////
	
	var VideoWebpageUtils = {	
		getEliveButton: function() {
			return document.getElementById('watch-elive');
		},		
		getActionContainer: function() {
			return document.getElementById('watch-actions-area-container');
		},		
		getActionArea: function() {
			return document.getElementById('watch-actions-area');
		},		
		getElivePanel: function() {
			return document.getElementById('elive-action-panel');
		},		
		getAddLink: function() {
			return document.getElementById('elive-add-link');
		},
		getLastYoutubeButton: function() {
			return document.getElementById('watch-share');
		}
	};
	
	/////////////////////////
	// INSERT ELIVE BUTTON //
	/////////////////////////
	
	var buttonHtml = '<span class="yt-uix-button-content">eLive</span>';
	
	function eliveButtonClickHandler() {
		var eliveButton = VideoWebpageUtils.getEliveButton();
		if (VideoWebpageUtils.getElivePanel() === null) {
			CommonUtils.addClass(eliveButton, "active");
			CommonUtils.removeClass(VideoWebpageUtils.getActionContainer(), "collapsed");
			addElivePanel();
		} else {	
			CommonUtils.removeClass(eliveButton, "active");
			CommonUtils.addClass(VideoWebpageUtils.getActionContainer(), "collapsed");
			VideoWebpageUtils.getActionArea().innerHTML = "Loading...";
		}
	}

	var eliveButton = document.createElement('button');
	eliveButton.className = 'yt-uix-button yt-uix-tooltip';
	eliveButton.title = "Use this video on eLive";
	eliveButton.type = "button";
	eliveButton.id = 'watch-elive';
	eliveButton.innerHTML = buttonHtml;
	eliveButton.style.background = "#CCFFFF";	
	eliveButton.addEventListener("click", eliveButtonClickHandler, false);	
	VideoWebpageUtils.getLastYoutubeButton().parentNode.insertBefore(eliveButton, null);

	/////////////////////////
	// INSERT ELIVE PANEL ///
	/////////////////////////
	
	var actionHtml = '\
	<div id="elive-action-panel" class="close">\
		<img onclick="yt.www.watch.watch5.hide();" class="master-sprite close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif">\
	</div>\
	<div>\
		<div><a id="elive-search-link" href="http://www.elive.pro/tags/youtube/' + CommonUtils.getVideoId() + '"><b>Search this video on eLive</b></a></div>\
		<div><a id="elive-add-link" href="javascript:;"><b>Add this video to your eLive commentary</b></a></div>\
	</div\>';
	
	var added = false;
	
	function eliveAddLinkClickHandler() {
		if (CommonUtils.getEliveIFrame() === null) {
			// Loading label
			if (CommonUtils.getEliveIFrameLoadingDiv() === null) {
				var eliveIFrameLoadingDiv = CommonUtils.createEliveIFrameLoadingDiv();			
				VideoWebpageUtils.getActionArea().insertBefore(eliveIFrameLoadingDiv, null);
			}
			// Iframe			
			var eliveIFrame = CommonUtils.createEliveIFrame();
			eliveIFrame.addEventListener('load', eliveIFrameLoadHandler, false);
			VideoWebpageUtils.getActionArea().insertBefore(eliveIFrame, null);
		}
		CommonUtils.getEliveIFrame().height = "23";
		CommonUtils.sendMessage();
		added = true;
	}
	
	function eliveIFrameLoadHandler() {
		if (added) {
			CommonUtils.getEliveIFrameLoadingDiv().style.display = "none";
			CommonUtils.getEliveIFrame().width = "100%";
			eliveAddLinkClickHandler();
		}
	}
	
	function addElivePanel() {
		VideoWebpageUtils.getActionContainer().style.removeProperty("height");
		VideoWebpageUtils.getActionArea().innerHTML = actionHtml;
		VideoWebpageUtils.getAddLink().addEventListener('click', eliveAddLinkClickHandler, false);
	}
	
}

/*---------------------------------------------- Webpage type "USER" process -----------------------------------------------------*/
	
function startUserWebpageProcess() {
	
	///////////
	// UTILS //
	///////////
	
	var UserWebpageUtils = {
		getTabs: function() {
			var firstTab = document.getElementById('playnav-panel-tab-info');
			return firstTab.parentNode.children;
		},		
		getEliveTab: function() {
			return document.getElementById('playnav-panel-tab-elive');
		},		
		getTabIcon: function(tab) {
			return tab.children[0].children[0].children[0].children[0].children[0];
		},		
		getTabLink: function(tab) {
			return tab.children[0].children[0].children[0].children[0].children[1].children[0];
		},		
		getPanels: function() {
			return document.getElementById('playnav-video-panel-inner').children;
		},		
		getElivePanel: function() {
			return document.getElementById('playnav-panel-elive');
		},
		getEliveAddLink: function() {
			return document.getElementById('elive-add-link');
		},
		getEliveSearchLink: function() {
			return document.getElementById('elive-search-link');
		},		
		getPanelBody: function(panel) {
			return panel.children[0].children[0];
		},
		getLastYoutubePanel: function() {
			return document.getElementById('playnav-panel-flag');
		},
		getLastYoutubeTab: function() {
			return document.getElementById('playnav-panel-tab-flag');
		}
	};
	
	//////////////////////////////////////////////////////
	// ADD MOUSEDOWN LISTENERS TO EXISTING YOUTUBE TABS //
	//////////////////////////////////////////////////////
	
	function youtubePanelMouseDownHandler() {
		UserWebpageUtils.getEliveTab().className = '';
		UserWebpageUtils.getElivePanel().style.display = 'none';
	}

	var tabs = UserWebpageUtils.getTabs();
	
	for (var i = 0; i < tabs.length; i++) {
		UserWebpageUtils.getTabIcon(tabs[i]).addEventListener('mousedown', youtubePanelMouseDownHandler, false);
		UserWebpageUtils.getTabLink(tabs[i]).addEventListener('mousedown', youtubePanelMouseDownHandler, false);
	}
	
	//////////////////////
	// INSERT ELIVE TAB //
	//////////////////////
	
	var tdHtml = '\
	<table class="panel-tabs">\
		<tbody>\
			<tr>\
				<td class="panel-tab-title-cell">\
					<div class="playnav-panel-tab-icon" id="panel-icon-playlists"></div>\
					<div class="playnav-bottom-link" id="elive-bottom-link">\
						<a href="javascript:;" style="color: red">eLive</a>\
					</div>\
					<div class="spacer">&nbsp;</div>\
				</td>\
			</tr>\
			<tr>\
				<td class="panel-tab-indicator-cell inner-box-opacity">\
					<div class="panel-tab-indicator-arrow"></div>\
				</td>\
			</tr>\
		</tbody>\
	</table>';
	
	function eliveTabMouseDownHandler() {
		// REMOVE IFRAME
		var eliveFrame = CommonUtils.getEliveIFrame();
		if (eliveFrame !== null) {
			eliveFrame.parentNode.removeChild(eliveFrame);
		}			
		// SET TABS
		var tabs = UserWebpageUtils.getTabs();
		for(var i = 0; i < tabs.length; i++) {
			CommonUtils.removeClass(tabs[i], 'panel-tab-selected');
		}
		CommonUtils.addClass(UserWebpageUtils.getEliveTab(), 'panel-tab-selected');		
		// SET PANELS
		var panels = UserWebpageUtils.getPanels();
		for (i = 0; i < tabs.length; i++) {
			panels[i].style.display = 'none';
		}
		UserWebpageUtils.getEliveSearchLink().href = "http://www.elive.pro/tags/youtube/" + CommonUtils.getVideoId();
		UserWebpageUtils.getElivePanel().style.display = 'block';
	}
	
	function eliveTabMouseOverHandler() {
		CommonUtils.addClass(UserWebpageUtils.getEliveTab(), 'panel-tab-hovered');
	}
	
	function eliveTabMouseOutHandler() {
		CommonUtils.removeClass(UserWebpageUtils.getEliveTab(), 'panel-tab-hovered');
	}
	
	var eliveTab = document.createElement('td');
	eliveTab.id = 'playnav-panel-tab-elive';
	eliveTab.innerHTML = tdHtml;
	UserWebpageUtils.getLastYoutubeTab().parentNode.insertBefore(eliveTab, null);
	
	UserWebpageUtils.getTabIcon(eliveTab).addEventListener('mousedown', eliveTabMouseDownHandler, false);
	UserWebpageUtils.getTabIcon(eliveTab).addEventListener('mouseover', eliveTabMouseOverHandler, false);
	UserWebpageUtils.getTabIcon(eliveTab).addEventListener('mouseout', eliveTabMouseOutHandler, false);
	UserWebpageUtils.getTabLink(eliveTab).addEventListener('mousedown', eliveTabMouseDownHandler, false);
	UserWebpageUtils.getTabLink(eliveTab).addEventListener('mouseover', eliveTabMouseOverHandler, false);
	UserWebpageUtils.getTabLink(eliveTab).addEventListener('mouseout', eliveTabMouseOutHandler, false);
	
	////////////////////////
	// INSERT ELIVE PANEL //
	////////////////////////
	
	var panelHtml = '\
	<div class="playnav-panel-message">\
		<div class="message-body border-box-sizing">\
			<div><a id="elive-search-link" href="javascript:;"><b>Search this video on eLive</b></a></div>\
			<div><a id="elive-add-link" href="javascript:;"><b>Add this video to your eLive commentary</b></a></div>\
		</div>\
	</div>';
	
	var added = false;
	
	function eliveAddLinkClickHandler() {
		if (CommonUtils.getEliveIFrame() === null) {
			var elivePanel = UserWebpageUtils.getPanelBody(UserWebpageUtils.getElivePanel());
			// Loading label
			if (CommonUtils.getEliveIFrameLoadingDiv() === null) {
				var eliveIFrameLoadingDiv = CommonUtils.createEliveIFrameLoadingDiv();			
				elivePanel.insertBefore(eliveIFrameLoadingDiv, null);
			}
			// Iframe			
			var eliveIFrame = CommonUtils.createEliveIFrame();
			eliveIFrame.addEventListener('load', eliveIFrameLoadHandler, false);
			elivePanel.insertBefore(eliveIFrame, null);
		}
		CommonUtils.getEliveIFrame().height = "23";
		CommonUtils.sendMessage();
		added = true;
	}
	
	function eliveIFrameLoadHandler() {
		if (added) {
			CommonUtils.getEliveIFrameLoadingDiv().style.display = "none";
			CommonUtils.getEliveIFrame().width = "100%";
			eliveAddLinkClickHandler();
		}
	}
	
	var elivePanel = document.createElement('div');
	elivePanel.id = 'playnav-panel-elive';
	elivePanel.setAttribute('class', 'hid');
	elivePanel.style.display = 'none';
	elivePanel.innerHTML = panelHtml;
	UserWebpageUtils.getLastYoutubePanel().parentNode.insertBefore(elivePanel, null);
	
	UserWebpageUtils.getEliveAddLink().addEventListener('click', eliveAddLinkClickHandler, false);
	
}