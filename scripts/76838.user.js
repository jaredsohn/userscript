// ==UserScript==
// @name           anachb.at - don't waste space
// @namespace      http://mereandor.soup.io
// @description    removes some items to save space for the main map
// @include        http://anachb.at*
// @include        http://www.anachb.at*
// @exclude        http://anachb.at/ueber-its
// @exclude        http://www.anachb.at/ueber-its
// ==/UserScript==

function removeElement(elem) {
	elem.parentNode.removeChild(elem);
}

function $(id) {
	return document.getElementById(id);
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

mdv = new function() {
	this.its = unsafeWindow.mdv.its;
	this.mdv = unsafeWindow.mdv;
	
	this.updateSize = function() {
		this.its.setMapHeight();
		this.its.setRightColDim();
		this.its.setLeftColHeight(this.its.getAvailDimensions().height);
	}
	
	this.init = function() {
		this.its.containerPadding = 0;
		this.its.heightNavHeader = $('portal-top').offsetHeight;
		
		this.its.setLeftColHeightOld = this.its.setLeftColHeight;
		this.its.setLeftColHeight = function(avHeight) {
			this.setLeftColHeightOld(avHeight+this.heightNavHeaderOld-80);
		}
		
		this.its.setMapHeightOld = this.its.setMapHeight;
		this.its.setMapHeight = function() {
			this.heightNavHeaderOld = this.heightNavHeader;
			this.heightNavHeader = document.getElementById('portal-top').offsetHeight;
			this.setMapHeightOld();
		}
	}
	
} ();

fullscreen = new function(mdv) {
	this.mdv = mdv;
	this.activate = function() {
		$('its-outer-left').style.display = 'none';
		$('portal-top').style.display = 'none';
		$('its-outer-right').style.left = '0px';
		this.mdv.its.widthLeftColumn = 0;
		this.mdv.updateSize();
	}
	this.deactivate = function() {
		$('its-outer-left').style.display = '';
		$('portal-top').style.display = '';
		$('its-outer-right').style.left = '350px';
		this.mdv.its.widthLeftColumn = 350;
		this.mdv.updateSize();
	}
	
	this.toggle = function() {
		if (this.mdv.its.widthLeftColumn > 10) {
			this.activate();
		} else {
			this.deactivate();
		}
	};
	
	this.addButton = function() {
		s = document.createElement('div');
		s.innerHTML = '<input type="button" value="Vollbild" class="submitButton activeButton" />';
		c = $('mapButtonContainer').childNodes[1];
		s.firstChild.addEventListener("click", function() { fullscreen.toggle(); }, true);
		c.insertBefore(s.firstChild, c.firstChild);
	}
	
	this.init = function() {
		this.mdv.init();
		this.deactivate();
	}
} (mdv);

window.addEventListener('load', function() { fullscreen.init(); }, true);

(function() {
	removeElement($('its-site-funcs'));
	removeElement($('changeMapButtons').nextSibling.nextSibling);
	fullscreen.addButton();
	addGlobalStyle('\
		#its-right-outer-top { height:35px; margin-right:0px; }\
		#its-outer-right { left:350px; }\
		body { margin:0px !important; } \
		.documentContent { padding-top: 0 !important; }\
	');
})();