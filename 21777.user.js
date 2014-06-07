// ==UserScript==
// @author         Lokkju, Inc
// @homepage       http://www.lokkju.com/
// @name           SmugMug Browser
// @version        0.02
// @namespace      lokkju.gm.smugmug
// @description    A Browser for SmugMug Galleries
// @include        http://*.smugmug.com/*
// @exclude        http://*.smugmug.com/photos/*
// ==/UserScript==
function smbrowser()
{
	this._baseurl = 'http://www.smugmug.com/gallery/';
	this._current_gallery = 0;
	this._current_gallery = this.getCurrentGallery();
	if(this._current_gallery != 0) {GM_setValue("current_gallery",this._current_gallery);}
	var pnlNav = document.createElement("div");
	pnlNav.setAttribute('id','panel_navigation');
	pnlNav.setAttribute('style','position:absolute;top:1px;right:1px;padding-right:5px;z-index: 5000;height:15px;border:1px solid red;background-color:black;color:white;font-weight:bold;font-size:10px;text-align:center;width:250px;');
	pnlNav.innerHTML = '<span id="panel_prev"><a href="http://www.smugmug.com/gallery/' + (this._current_gallery-1) + '" style="color:white;font-weight:bold;font-size:10px;"><< Previous</a></span>'
								+ ' | '
								+ '<span id="panel_newish">Browse</span>'
								+ ' | '
								+ '<span id="panel_next"><a href="http://www.smugmug.com/gallery/' + (this._current_gallery+1) + '" style="color:white;font-weight:bold;font-size:10px;">Next >></a></span>';
	var pnlSpacer = document.createElement("div");
	pnlSpacer.setAttribute('id','panel_spacer');
	pnlSpacer.innerHTML = '&nbsp;'
	document.body.insertBefore(pnlSpacer, document.body.firstChild);
	document.body.insertBefore(pnlNav, document.body.firstChild);
	var e = this;
	document.getElementById('panel_next').addEventListener("click", function() {e.next();}, true);
	document.getElementById('panel_prev').addEventListener("click", function() {e.prev();}, true);
}
smbrowser.prototype.next = function(evt)
{
	if(this._current_gallery > 0)
	{
		GM_setValue("current_gallery",this._current_gallery+1);
		location.href = this._baseurl + (this._current_gallery+1);
	} else {
		alert('You must start out on a gallery page to be able to browse.  Please enter any gallery page, then click \'Next\' again.');
	}
	if (evt.preventDefault) {evt.preventDefault();}
	return false;
}
smbrowser.prototype.prev = function(evt)
{
	if(this._current_gallery > 0)
	{
		GM_setValue("current_gallery",this._current_gallery-1);
		location.href = this._baseurl + (this._current_gallery-1);
	} else {
		alert('You must start out on a gallery page to be able to browse.  Please enter any gallery page, then click \'Previous\' again.');
	}
	if (evt.preventDefault) {evt.preventDefault();}
	return false;	
}
smbrowser.prototype.getCurrentGallery = function()
{
	var cg = 0;
	/* try to parse the gallery from the url */
	var loc = location.href;
	var res = loc.match('http:\/\/.*?\.smugmug\.com/gallery/([0-9]+)','i');
	if(res != null && res[1] && parseInt(res[1]) > 0)
	{
		return parseInt(res[1]);
	}
	/* try to parse from a settings */
	res = GM_getValue("current_gallery");
	if(res != null && parseInt(res) > 0)
	{
		return parseInt(res);
	}
	/* try to parse from the newest function */
	return 0;
}
var smb = new smbrowser();