// ==UserScript==
// @name           YouTube Player Size Options + Dark
// @namespace      http://www.dragory.net/
// @description    Adds three options for YouTube's player size: 360p (S), 480p (M) and 720p (L) and dark background!
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://*.youtube.com/watch*
// @include        https://youtube.com/watch*
// @version        1.12+dark
// ==/UserScript==

var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.textContent = '/* <![CDATA[ */\n';
script.textContent += [
	function checkStartupSize() {
		var storedSize = localStorage.getItem('customSizeId');
		var isHtml5 = document.getElementById('video-player');
		if(storedSize != null) {
			switch(storedSize) {
				case '360':
					if(isHtml5) {
						changePlayerSizeCustom(970, 390, 640, 360, false, '360');
					} else {
						changePlayerSizeCustom(970, 390, 640, 390, false, '360');
					}
					break;
				case '480':
					if(isHtml5) {
						changePlayerSizeCustom(853, 510, 853, 480, true, '480');
					} else {
						changePlayerSizeCustom(853, 510, 853, 510, true, '480');
					}
					break;
				case '720':
					if(isHtml5) {
						changePlayerSizeCustom(1280, 750, 1280, 720, true, '720');
					} else {
						changePlayerSizeCustom(1280, 750, 1280, 750, true, '720');
					}
					break;
			}
		}
	}
].join('\n');
script.textContent += [
	function changePlayerSizeCustom(cWidth, cHeight, vWidth, vHeight, wide, sizeId) {
		elem_vid = document.getElementById('watch-video');
		elem_player = document.getElementById('watch-player');
		elem_container = document.getElementById('watch-video-container');
		elem_sidebar = document.getElementById('watch-sidebar')
		elem_extras = document.getElementById('watch-video-extra');
		height_extras = elem_extras.offsetHeight;

		elem_html5_video = document.getElementsByClassName('video-content')[0];
		elem_html5_annot = document.getElementsByClassName('video-annotations')[0];

		elem_vid.setAttribute('style', 'width: '+cWidth+'px !important; height: '+(cHeight+height_extras)+'px !important;');
		elem_player.setAttribute('style', 'background: none repeat scroll 0% 0% transparent; width: '+vWidth+'px !important; height: '+vHeight+'px !important;');

		if(elem_html5_video != null) {
			elem_html5_video.setAttribute('style', 'width: '+vWidth+'px !important; height: '+(vHeight)+'px !important; left: 0px !important; top: 0px !important;');

			if(sizeId != '360') {
				elem_player.setAttribute('style', 'background: none repeat scroll 0% 0% transparent; width: '+cWidth+'px !important; height: '+cHeight+'px !important;');
			}

			// elem_html5_annot.setAttribute('style', 'width: '+vWidth+'px !important; height: '+(vHeight)+'px');
		}

		if(wide) {
			elem_vid.setAttribute('class', 'wide');
			elem_container.setAttribute('style', 'background: #151515 !important;');
			elem_sidebar.setAttribute('style', 'margin-top: 10px !important;');
		} else {
			elem_vid.setAttribute('class', '');
			elem_container.setAttribute('style', 'background: none !important;');
			elem_sidebar.setAttribute('style', 'margin-top: -390px !important;');
		}

		var uAgent = navigator.userAgent;
		if(sizeId == '720' && uAgent.indexOf('Chrome') == -1) {
			qElements = document.getElementsByClassName('yt-uix-button-menu-item');
			if(qElements != null && qElements.length != 0) {
				for(var i=0; i<qElements.length; i++) {
					if(qElements[i].getAttribute('data-value') == '720p') {
						qElements[i].click();
					}	
				}
			}

			/*flashEmbed = document.getElementById('movie_player');
			flashEmbed.setAttribute('flashvars', flashEmbed.getAttribute('flashvars').replace(/\%26quality\%3D[0-9a-z]+\%26/, '%26quality%3D720p'));*/
		}

		localStorage.setItem('customSizeId', sizeId);
	}
].join('\n');
script.textContent += [
	function setCurrentButton(thisElement) {
		var customButtons = document.getElementsByClassName('parentButCustom');
		for(var i=0; i<customButtons.length; i++) {
			customButtons[i].setAttribute('class', 'html5-large-player-button html5-control-right yt-uix-button yt-uix-button-player yt-uix-tooltip yt-uix-button-empty parentButCustom');
		}

		thisElement.setAttribute('class', 'html5-large-player-button html5-control-right yt-uix-button yt-uix-button-player yt-uix-tooltip yt-uix-button-empty parentButCustom parentButCustomSelected');
	}
].join('\n');
script.textContent += "checkStartupSize();\n";
script.textContent += "/* <![CDATA[ */";

var body = document.getElementsByTagName('body')[0];
body.appendChild(script);

var isHtml5 = document.getElementById('video-player');
if(isHtml5) {
	var qualityButton = null;

	origButtons = document.getElementsByTagName('button');
	for(var i=0; i<origButtons.length; i++) {
		var thisIndex = origButtons[i].getAttribute('tabindex');
		if(thisIndex == '14' || thisIndex == '13') {
			origButtons[i].setAttribute('style', 'display: none !important;');
		} else if(thisIndex == '10') {
			qualityButton = origButtons[i];
		}
	}

	style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.innerHTML = '.butCustom {background: #6b6b6b -moz-linear-gradient(50% 0%, #909090, #535353); background: #6b6b6b -webkit-gradient(linear,left top,left bottom,from(#909090),to(#535353)); box-shadow: 0px 2px #000000;}\n';
	style.innerHTML += '.parentButCustom {cursor: pointer !important; background: #191919; background: transparent !important;}\n';
	style.innerHTML += '.parentButCustom:focus {outline: none !important;}\n';
	style.innerHTML += '.parentButCustomSelected {background: #0d0d0d !important;}\n';
	style.innerHTML += '.parentButCustom:hover .butCustom {background: #b4b4b4 -moz-linear-gradient(50% 0%, #d3d3d3, #a1a1a1); background: #b4b4b4 -webkit-gradient(linear,left top,left bottom,from(#d3d3d3),to(#a1a1a1));}';
	style.innerHTML += '#butCustomSmall {margin: 3px 8px 0px 8px; height: 8px;}\n';
	style.innerHTML += '#butCustomMedium {margin: 2px 6px 0px 6px; height: 10px;}\n';
	style.innerHTML += '#butCustomLarge {margin: 4px 4px 4px 4px; height: 12px;}';
	body.appendChild(style);

	var but_s = document.createElement('button');
	but_s.setAttribute('class', 'html5-large-player-button html5-control-right yt-uix-button yt-uix-button-player yt-uix-tooltip yt-uix-button-empty parentButCustom');
	but_s.setAttribute('id', 'butCustomParentSmall');
	but_s.setAttribute('aria-label', 'Player size: small');
	but_s.setAttribute('role', 'button');
	but_s.setAttribute('tabindex', '14');
	but_s.setAttribute('type', 'button');
	but_s.setAttribute('title', 'Player size: small');
	but_s.setAttribute('data-tooltip-text', 'Player size: small');
	but_s.setAttribute('onclick', "changePlayerSizeCustom(970, 390, 640, 360, false, '360'); setCurrentButton(this);");
	but_s.setAttribute('style', 'border-left: 1px solid #222222;');
	but_s.innerHTML = '<div id="butCustomSmall" class="butCustom"></div>';

	var but_m = document.createElement('button');
	but_m.setAttribute('class', 'html5-large-player-button html5-control-right yt-uix-button yt-uix-button-player yt-uix-tooltip yt-uix-button-empty parentButCustom');
	but_s.setAttribute('id', 'butCustomParentMedium');
	but_m.setAttribute('aria-label', 'Player size: medium');
	but_m.setAttribute('role', 'button');
	but_m.setAttribute('tabindex', '14');
	but_m.setAttribute('type', 'button');
	but_m.setAttribute('title', 'Player size: medium');
	but_m.setAttribute('data-tooltip-text', 'Player size: medium');
	but_m.setAttribute('onclick', "changePlayerSizeCustom(853, 510, 853, 480, true, '480'); setCurrentButton(this);");
	but_m.setAttribute('style', 'border-left: 1px solid #222222;');
	but_m.innerHTML = '<div id="butCustomMedium" class="butCustom"></div>';

	var but_l = document.createElement('button');
	but_l.setAttribute('class', 'html5-large-player-button html5-control-right yt-uix-button yt-uix-button-player yt-uix-tooltip yt-uix-button-empty parentButCustom');
	but_s.setAttribute('id', 'butCustomParentLarge');
	but_l.setAttribute('aria-label', 'Player size: large');
	but_l.setAttribute('role', 'button');
	but_l.setAttribute('tabindex', '14');
	but_l.setAttribute('type', 'button');
	but_l.setAttribute('title', 'Player size: large');
	but_l.setAttribute('data-tooltip-text', 'Player size: large');
	but_l.setAttribute('onclick', "changePlayerSizeCustom(1280, 750, 1280, 720, true, '720'); setCurrentButton(this);");
	but_l.setAttribute('style', 'border-left: 1px solid #222222;');
	but_l.innerHTML = '<div id="butCustomLarge" class="butCustom"></div>';

	var buttonSpace = document.getElementsByClassName('html5-player-chrome')[0];
	buttonSpace.insertBefore(but_l, qualityButton);
	buttonSpace.insertBefore(but_m, qualityButton);
	buttonSpace.insertBefore(but_s, qualityButton);
} else {
	var but_s = document.createElement('button');
	but_s.setAttribute('role', 'button');
	but_s.setAttribute('id', 'watch-size-s');
	but_s.setAttribute('class', 'yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip');
	but_s.setAttribute('style', 'padding: 4px;');
	but_s.setAttribute('type', 'button');
	but_s.setAttribute('title', 'Player size: small');
	but_s.setAttribute('data-tooltip-text', 'Player size: small');
	but_s.setAttribute('onclick', "changePlayerSizeCustom(970, 390, 640, 390, false, '360');");
	but_s.innerHTML = '<span class="yt-uix-button-content">S</span>';

	var but_m = document.createElement('button');
	but_m.setAttribute('role', 'button');
	but_m.setAttribute('id', 'watch-size-m');
	but_m.setAttribute('class', 'yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip');
	but_m.setAttribute('style', 'padding: 4px;');
	but_m.setAttribute('type', 'button');
	but_m.setAttribute('title', 'Player size: medium');
	but_m.setAttribute('data-tooltip-text', 'Player size: medium');
	but_m.setAttribute('onclick', "changePlayerSizeCustom(853, 510, 853, 510, true, '480');");
	but_m.innerHTML = '<span class="yt-uix-button-content">M</span>';

	var but_l = document.createElement('button');
	but_l.setAttribute('role', 'button');
	but_l.setAttribute('id', 'watch-size-l');
	but_l.setAttribute('class', 'yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip');
	but_l.setAttribute('style', 'padding: 4px;');
	but_l.setAttribute('type', 'button');
	but_l.setAttribute('title', 'Player size: large');
	but_l.setAttribute('data-tooltip-text', 'Player size: large');
	but_l.setAttribute('onclick', "changePlayerSizeCustom(1280, 750, 1280, 750, true, '720');");
	but_l.innerHTML = '<span class="yt-uix-button-content">L</span>';

	var actionSpace = document.getElementById('watch-actions');
	actionSpace.appendChild(but_s);
	actionSpace.appendChild(but_m);
	actionSpace.appendChild(but_l);
}