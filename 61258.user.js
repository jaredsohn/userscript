/*

invisionfreebbcode.user.js -- Invision Free Discussion Forums BBCode fix for Firefox

*/

// ==UserScript==
// @name Invisionfree Forum BB Code fix
// @namespace http://www.snowcrest.net/donnelly/
// @description Invision Free Discussion Forums BBCode fix for Firefox
// @include http*.invisionfree.com*
// @exclude

// @Version 1.0
// @Firefox 2
// @GmVersion 0.6.6
// @Author Ncodes
// @Email snowcrest.net | donnelly
// ==/UserScript==

function NcodeSpoilerTag(id) {
	this.container = null;
	this.warning = null;
	this.id = id;
	this.warningTextNode = null;
	this.contentKeeper = null;
}

NcodeSpoilerTag.CONTAINER_ID_BASE = 'ncode_spoilertag_container_';
NcodeSpoilerTag.WARNING_ID_BASE = 'ncode_spoilertag_warning_';
NcodeSpoilerTag.CONTENTKEEPER_ID_BASE = 'ncode_spoilertag_contentkeeper_';

NcodeSpoilerTag.getNextId = function() {
	id = 1;
	while(document.getElementById(NcodeSpoilerTag.CONTAINER_ID_BASE+id) != null) {
		id++;
	}
	return id;
}

NcodeSpoilerTag.transformDiv = function(img) {
	div = img.previousSibling;
	iterations = 1;
	if(!div.tagName || div.nodeType != 1 || div.tagName != 'DIV') {
		iterations ++;
		if(div.previousSibling) {
			div = div.previousSibling;
		} else {
			alert('Failed to get associated DIV');
			return;
		}
	}
	
	if(div.id && div.id.indexOf(NcodeSpoilerTag.CONTAINER_ID_BASE) == 0) {
		newid = div.id.substr(NcodeSpoilerTag.CONTAINER_ID_BASE.length);
	} else {
		newid = NcodeSpoilerTag.getNextId();
	}
		
	sp = new NcodeSpoilerTag(newid);
	
	div.className = 'ncode_spoilertag_spoiler + tborder';
	div.id = NcodeSpoilerTag.CONTAINER_ID_BASE+newid;
	
	// check if we have to recover from quick edit
	warning = document.getElementById(NcodeSpoilerTag.WARNING_ID_BASE+newid);
	contentkeeper = document.getElementById(NcodeSpoilerTag.CONTENTKEEPER_ID_BASE+newid);
	
	if(warning == null)
		sp.createWarningOn(div);
	else if(contentkeeper != null)
		sp.reclaimWarning(div, warning);
	else
		alert('Unable to recover contents. Refresh this page.');
	
	//alert('transformDiv requested for DIV with contents (id = '+newid+') (it = '+iterations+'):\n'+div.innerHTML);
}

NcodeSpoilerTag.prototype.reclaimWarning = function(target, warning) {
	this.warning = warning;
	this.warningTextNode = warning.firstChild.firstChild.childNodes[1].firstChild;
	this.warning.spoiler = this;
	this.container = target;
	this.contentKeeper = document.getElementById(NcodeSpoilerTag.CONTENTKEEPER_ID_BASE+this.id);
	
	this.hide();
}

NcodeSpoilerTag.prototype.createWarningOn = function(target) {
	this.container = target;
	
	this.contentKeeper = document.createElement('DIV');
	this.contentKeeper.style.display = 'none';
	this.contentKeeper.innerHTML = this.container.innerHTML;
	this.contentKeeper.id = NcodeSpoilerTag.CONTENTKEEPER_ID_BASE+this.id;
	
	this.warning = document.createElement('TABLE');
	mtbody = document.createElement('TBODY');
	mtr = document.createElement('TR');
	mtd1 = document.createElement('TD');
	mtd2 = document.createElement('TD');
	mimg = document.createElement('IMG');
	this.warningTextNode = document.createTextNode('');
	
	mimg.src = 'images/statusicon/wol_error.gif';
	mimg.width = 16;
	mimg.height = 16;
	mimg.alt = '';
	
	this.warning.className = 'ncode_spoilertag_warning';
	this.warning.width = '100%';
	this.warning.spoiler = this;
	this.warning.id = NcodeSpoilerTag.WARNING_ID_BASE+newid;
	
	mtd1.width = 20;
	mtd1.className = 'td1';
	
	mtd2.unselectable = 'on';
	mtd2.className = 'td2';
	
	mtd1.appendChild(mimg);
	mtd2.appendChild(this.warningTextNode);
	
	mtr.appendChild(mtd1);
	mtr.appendChild(mtd2);
	
	mtbody.appendChild(mtr);
	
	this.warning.appendChild(mtbody);
	
	this.hide();
	target.style.display = 'block';
	
	target.parentNode.insertBefore(this.warning, this.container);
	
	target.parentNode.insertBefore(this.contentKeeper, this.warning);
}

NcodeSpoilerTag.prototype.show = function() {
	this.warningTextNode.data = vbphrase['ncode_spoilertag_click_to_hide'];
	this.container.innerHTML = this.contentKeeper.innerHTML;
	this.warning.onclick = function() { return this.spoiler.hide(); }
	return false;
}

NcodeSpoilerTag.prototype.hide = function() {
	this.warningTextNode.data = vbphrase['ncode_spoilertag_click_to_display'];
	this.container.innerHTML = '&nbsp;';
	this.warning.onclick = function() { return this.spoiler.show(); }
	return false;
}