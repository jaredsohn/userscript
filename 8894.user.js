// ==UserScript==
// @name	Only Fark News/Comments, Toggle Topmenu & Tabs
// @namespace	http://fark3.gedekran.com
// @author	Kristopher
// @description	Removes all content on Fark except News and Comments, and allows the user to toggle the top menu and tabs.
// @include	http://fark.com/*
// @include	http://*.fark.com/*
// ==/UserScript==

(function() {

topmenu = document.getElementById('topMenu');
		topmenu.style["display"] = "none";

bodyTabContainer = document.getElementById('bodyTabContainer');
		bodyTabContainer.style["display"] = "none";


if(document.getElementById('topMenu')) {
	var ls = document.createElement('div');
	ls.id = 'lsHeader';
	ls.title = 'Enable TopMenu';
	ls.setAttribute('style', 'background: #669; width: 100%; height: 10px; position: absolute; top:0; z-index: 5; cursor: pointer; border-bottom:solid #3d3d3d 2px;');
	ls.addEventListener('click', function(event) {



if(!topmenu.style.display) {
		topmenu.style.display = 'none';
		bodyTabContainer.style.display = 'none';
		this.title = 'Enable TopMenu';
		GM_setValue('disableLeft', true);
	} else {
		topmenu.removeAttribute('style');
		bodyTabContainer.removeAttribute('style');
		this.title = 'Disable TopMenu';
		GM_setValue('disableLeft', false);
	}
	}, false);
		document.body.insertBefore(ls, document.body.firstChild);
	}


head = document.getElementsByTagName('head')[0];
	if (head)
	{
		style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML =
			'body { background: #ffffff; margin:0px; padding:0px;}\n' +
			'table { cellpadding:0px: }\n' +
			'#siteContainer { position: absolute; width: 100%; margin: 0px; min-width:0px; padding:0px;}\n' +
			'#bodyContainer, #bodyMainContainer { width: 100%; margin: 0px; min-width:0px;}\n' +
			'#headerTop, #topSearch, #footer, #bodyRightSideContainer, .notifyBigBrother, .ncbar, .comlinkcount { display: none; }\n' +
			'#topMenu { width: 100%;  min-width:0px; margin-top: 12px; border-left: 0px; border-right:0px; border-bottom:solid #3d3d3d 2px;}\n' +
			'#bodyHeadlineContainer { width: 100%; padding: 0px; border:0px; background: #ffffff; margin-top: 8px; }\n' +
			'.mainerr { display: none; }\n' +
			'.mainDate { border-top:solid #3d3d3d 2px; border-bottom:solid #3d3d3d 2px;}\n' +
			'.headlineRow:hover { background:#fff; }\n' +
			'.loginTable { margin:0px; }\n' +
			'#bodyFarkives, #bodyFarkives a { color: #000; }\n' +
			'#commentsArea { width: 100%;}\n' +
			'#commentsArea .ctable, #commentsArea .ctableTF { width: 100%; padding:0 0 0 8px; margin:0px; border:0px; border-top:2px solid #3d3d3d; border-bottom:2px solid #3d3d3d;}\n' +
			'#commentsPostingArea, #commentsPostingArea .commentPostingTable { width: 100%; margin:0px; border: 0px;}\n' +
			'#commentsPostingArea .mainsmall { margin:5px;}\n' +

		head.appendChild(style);
	}
})();