// ==UserScript==
// @name			Thumbnail for Dropbox
// @version			1.0
// @author			DianthuDia
// @namespace		http://d.hatena.ne.jp/DianthuDia/
// @description		This script makes thumbnail in Dropbox pages.
// @include			https://www.dropbox.com/home*
// ==/UserScript==
( function() {
	const CONFIG = {
		IMG_REG_EXP	: '/.+\.jpg.*|.+\.png.*|.+\.gif.*|.+\.bmp.*|.+\.svg.*/',
		THUM_SIZE	: '128px'
	};

	function showThum(e) {
		var divTags = Array.prototype.slice.call( document.getElementsByClassName('details-filename') );
		divTags.forEach(function(divTag){
			if( divTag.children.length > 1) { return; }	// already show thumbnail
			
			var imgPath = divTag.childNodes[0].href;
			if (imgPath.search(CONFIG.IMG_REG_EXP) == -1) { return; }	// file isn't img

			var imgTag = document.createElement('img');
			imgTag.src = imgPath;
			imgTag.style.width = CONFIG.THUM_SIZE;
			imgTag.style.height = CONFIG.THUM_SIZE;

			divTag.style.lineHeight = CONFIG.THUM_SIZE;
			
			divTag.appendChild(imgTag);
		});
	}

	function makeThumButton(e) {
		var menu = document.getElementById('right-content');

		var aTag = document.createElement('a');
		aTag.className = 'hotbutton';
		aTag.addEventListener('click', showThum, false);
		aTag.innerHTML = ' \
			<span class="hotbutton-content"> \
				<span><img class="sprite s_page_white_picture link-img" src="/static/images/icons/icon_spacer.gif">Thumnail</span> \
			</span>';
		
		menu.appendChild(aTag);
	}
	
	window.addEventListener('load', makeThumButton, false);
}) ();
