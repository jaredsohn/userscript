// ==UserScript==
// @name			Google Reader Minimal + Yahoo! Today
// @namespace		http://skoshy.com
// @version			1.5.5
// @description		Toggles Google Reader's header and embeds Yahoo! Today into the sidebar
// @include			http*//www.google.com/reader/*
// @include			http*//google.com/reader/*
// @include			http*//my.yahoo.com/*
// ==/UserScript==

var currentVersion = '1.5.5';
var scriptId = '89969';

function addStyles(rules, id) {
	var node = document.createElement("style");
	node.setAttribute("type", "text/css");
	node.innerHTML = rules;
	if (id) node.setAttribute("id", id);

	document.getElementsByTagName("head")[0].appendChild(node);
}

function addBaseTarget() {
	var node = document.createElement("base");
	node.setAttribute("target", "_blank");

	document.getElementsByTagName("head")[0].appendChild(node);
}

function checkVersion() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
		onload: function(response) {
			var newVersion = response.responseText.match(/[\/]*[\t ]@version[\t ]*[\d\w\.]*/)[0].match(/[\d]+[\d\.\w]+/);
			if (newVersion != currentVersion) {alert('New version available! Please visit http://userscripts.org/scripts/show/' + scriptId + ' to download it!');}
		}
	});
}

if (window.location.hostname.indexOf('google.com') != -1) {
	checkVersion();
	
	var headerToggled = false;
	var yahooToggled = false;
	
	function headerComponents(display, mainTop) {
		document.getElementById('gb').style.display = display;
		document.getElementById('search').style.display = display;
		document.getElementById('lhn-add-subscription-section').style.display = display;
		document.getElementById('main').style.top = mainTop;
	}
	
	// define a handler
	function toggleHeader(e) {
		// make sure someone isn't typing something into a textarea
		if (document.activeElement.localName != 'textarea') {
			if (e.keyCode == 87) {
				if (headerToggled) {headerToggled = false; headerComponents('none', '0');}
				else {headerToggled = true; headerComponents('', '');}
			} else if (e.keyCode == 89) {
				yahooToggle();
			}
		}
	}
	
	function createYahoo() {
		var node = document.createElement('div');
		node.id = 'yahooTr';
		node.innerHTML = '<iframe id="yahooIframe" src="http://my.yahoo.com" style="width: 100%; height: 100%; overflow-x: hidden; overflow-y: hidden;"></iframe>';
		node.style.display = 'none';
		node.style.width = '100%';
		node.style.height = '297px';
		return document.getElementById('nav').insertBefore(node, document.getElementById('lhn-subscriptions'));
	}
	
	function createSidebar() {
		var node = document.createElement('div');
		node.id = 'yahooTrs';
		node.innerHTML = '<iframe id="yahooIframe" src="http://my.yahoo.com" style="width: 100%; height: 100%; overflow-x: hidden; overflow-y: hidden;"></iframe>';
		node.style.display = 'none';
		node.style.width = '100%';
		node.style.height = '280px';
		
		// inserts node after 'main' node
		document.getElementById('main').parentNode.insertBefore(node, document.getElementById('main').nextSibling);
	}

	function yahooToggle(toggle) {
		if (yahooToggled) {
			yahooToggled = false;
			yahooNode.style.display = 'none';
		} else {
			yahooToggled = true;
			yahooNode.style.display = '';
		}
	}

	function changeNavDimensions(width) {
		document.getElementById('nav').style.width = width;
		document.getElementById('chrome').style.marginLeft = width;
	}

	headerComponents('none', '0');

	changeNavDimensions('300px');
	
	
	
	var yahooNode = createYahoo();
	yahooToggle();
	
	// register the handler 
	document.addEventListener('keydown', toggleHeader, false);

} else if (window.location.hostname.indexOf('my.yahoo.com') != -1 && document.referrer.indexOf('google.com/reader') != -1) {
	var todayID = document.getElementsByClassName('type_coketoday')[0].parentNode.id;
	
	addStyles('#hd, #trough-td, .mod, .spacer, .type_coketoday .mdhd, #info--'+todayID+', #remove--'+todayID+', #share--'+todayID+' {display: none !important;} .yui-b {padding: 0 !important;} #main-layout {margin: 0 !important;} #'+todayID+' {display: block !important;} .mod, #maximized-app-body {border: none !important;} .x3-large {font-size: 115% !important; letter-spacing: -0.01em !important} .type_coketoday .sthd {padding-left: 0 !important; text-align: center;} .type_coketoday .x-narrow .stimg img {height: auto !important; width: 100% !important;} #'+todayID+'-story {float: left !important; width: 64% !important;} .type_coketoday .footer {height: 280px !important; clear: none !important; float: right !important; width: 35% !important;} .type_coketoday .car ol li {clear: both !important; float: none !important; display: block !important;} #opt_'+todayID+' {display: block !important; visibility: visible !important; background-color: transparent !important; border: 0 !important; margin-top: 300px !important; width: 0px !important; margin-left: -125px !important;} .mod .opt-menu li {margin-left: -125px !important; width: 82px !important;} #hd_'+todayID+' {margin-top: -30px !important;} .mod a.alt-text-color, .mod .alt-text-color {color: #999 !important;} td[scope="col"] {width: 100px !important;} body {overflow-x: hidden !important; overflow-y: hidden !important;} .type_coketoday .x-narrow .playvideo {width: 100% !important;} #'+todayID+'-stdesc a {padding-left: 8px; text-indent: -8px; display: block; margin: 5px 0 5px 0;} .mod .type_coketoday .bullet {margin-left: 3px; padding-left: 15px; display: block;}', 'grht');
	
	var checkForRefresh = setInterval(function() {
		if (document.getElementById('refresh--'+todayID) != undefined) {
			document.getElementById('refresh--'+todayID).addEventListener("click", resetClickHandler, false);
			resetClickHandler();
			clearInterval(checkForRefresh);
		}
	}, 500);
	
	addBaseTarget();
	
	function resetClickHandler() {
		var interval = setInterval(function() {
			var count = 0;
			if (document.getElementById('refresh--'+todayID) != undefined) {
				document.getElementById('refresh--'+todayID).setAttribute('target', '_self');
				if (document.getElementById(todayID+'-pr') != undefined) {
					document.getElementById(todayID+'-pr').setAttribute('target', '_self');
					if (document.getElementById(todayID+'-nx') != undefined) {
						document.getElementById(todayID+'-nx').setAttribute('target', '_self');
						clearInterval(interval);
					}
				}
			}
		}, 500);
	}
}
