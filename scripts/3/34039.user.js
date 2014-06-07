// ==UserScript==
// @name           	iPlayer resizeable HD window
// @description	Adds the ability to resize the iplayer video to the window. Updated for the Summer 2010 BBC changes. A button is added in the favourites section to enable fullscreen.
// @namespace      http://www.crazed.org.uk/
// @include       	http://www.bbc.co.uk/iplayer/*
// @version		2.0
// ==/UserScript==

(function() {
	var playerSpec = {
		aspect: 1.7739872,
		chromeHeight: 34,
		id: '#bbc_emp_embed_emp'
	}

	function calcHeight(width) {
		return parseInt( (width / playerSpec.aspect) + playerSpec.chromeHeight );
	}
	function resizeToWindow(player) {
		var width = document.width;	// window.innerWidth;
		player.width = width;
		player.height = calcHeight(width);	//window.innerHeight;
	}
	// deal with the old pop up console
	function resizeToWindowOld(player) {
		player.width = window.innerWidth;
		player.height = window.innerHeight;
	}
	function resizeToPlayer(player) {
		window.resizeTo( parseInt(player.width) + 6, parseInt(player.height) + playerSpec.chromeHeight);
	}
	function setupPlayer() {
		var iplayer = domLookup(playerSpec.id) ;
		if (iplayer) {
			window.addEventListener('resize', function() {
				if(hasClass(document.body,'fullscreen')) resizeToWindow(iplayer); 
				else if (hasClass(document.body, 'aod')) resizeToWindowOld(iplayer);
			}, true);
		} else {
			// wait for the object to be setup first, and try again
			setTimeout(setupPlayer, 500);
		}
	}
	
	function hasClass(ele,cls) {
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	function addClassName(oElm, strClassName){
		if (!hasClass(oElm, strClassName)) {
			oElm.className = oElm.className + ((oElm.className.length > 0)? " " : "") + strClassName;
		}
	}
	
	function removeClassName(oElm, strClassName){
		var oClassToRemove = new RegExp((strClassName + "\s?"), "i");
		oElm.className = oElm.className.replace(oClassToRemove, "").replace(/^\s?|\s?$/g, "");
	}

	function addStylesheet(stylesheet) {
		var link = window.document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = 'data:text/css,' + stylesheet;
		document.getElementsByTagName("HEAD")[0].appendChild(link);
	}
	
	function xGet(xpath, context) {
		return document.evaluate(xpath, context || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	
	function domLookup(query) {
		return (query[0] == '#') 
			? document.getElementById(query.slice(1))
			: xGet(query);			
	}
	
	function addFavButton(id, label, action) {
		var menu = xGet('id("my-favourites-menu")/div');
		if (menu) {
			menu.innerHTML += '<a href="javascript:return false;" id="'+id+'" class="button"><span>' + label + '</span></a>';
			if (action && document.getElementById(id)) {
				document.getElementById(id).addEventListener('click', action, true);
			}
		}
	}

	function resetToDefault() {
		removeClassName(document.body, 'fullscreen');
		var emp = domLookup(playerSpec.id);
		emp.width = 832;
		emp.height = 503;
	}
	
	// action start

	function init() {
		// skip the category screens etc
		if (!domLookup(playerSpec.id)) return;
		
		addStylesheet('\
			body.aod #emp {width:auto !important; height:auto !important;}\
			body.aod #emp-container {width:auto; height:auto; left:0; top:0; margin-left:0;}\
			body.aod #bip-main {width:auto; height:auto; left:0; top:0;}\
			\
			body.fullscreen #blq-container-inner {padding-top:0;}\
			body.fullscreen #blq-container {padding-bottom:0;}\
			body.fullscreen #blq-main {overflow:hidden;}\
			\
			body.fullscreen #blq-acc,\
			body.fullscreen #blq-mast,\
			body.fullscreen #bip-footer,\
			body.fullscreen #blq-foot,\
			body.fullscreen #drawer-container {display:none;}\
			body.fullscreen #programme-info {display:none;}\
			\
			body.fullscreen #blq-pre-mast, \
			body.fullscreen #blq-container-inner {width:auto;}\
			\
			body.fullscreen #emp-container #emp {width:auto !important; height:auto !important; border-left:0;}\
			body.fullscreen #emp-container {margin:8px 0 0;}\
			\
			#my-favourites-menu .button span {background:url(http://static.bbc.co.uk/iplayer/3.8.0/img/favourites_bar_sprite.png) no-repeat 0 -70px; display:block; line-height:22px; padding:0 5px 0 8px;}\
			#my-favourites-menu .button {background:url(http://static.bbc.co.uk/iplayer/3.8.0/img/favourites_bar_sprite.png) no-repeat 100% -93px; float:left; font-size:0.92em; margin:6px 0 0 8px; padding-right:3px;}\
		');
		
		addFavButton('togglemode', 'Enable/Disable full screen', function(e){
			if (!hasClass(document.body, 'fullscreen')) {
				addClassName(document.body, 'fullscreen');
				resizeToWindow(domLookup(playerSpec.id));
			} else {
				resetToDefault();
			}
		});
		
		setupPlayer();
	}
		
	setTimeout(init, 500);
})();