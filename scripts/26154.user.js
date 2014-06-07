// ==UserScript==
// @name		Download esnips Mp3 Songs & Videos
// @author		Rewritten by Phanboy - Original by Umakanthan Chandran
// @namespace		http://www.tc.umn.edu/~phanx068/
// @description		Download mp3 songs and videos from esnips.com - modified to make it integrate seamlessly within esnips.  Download link now shows up on ALL pages & now SEARCH results!
// @include		http://*esnips.com/*
// ==/UserScript==
////////////////// DO NOT EDIT BELOW //////////////////
var source_location = "http://userscripts.org/scripts/show/16714";
var current_version = "2.3.0";
var latest_version = " ";
var gm_updateparam = "phanboy_esnips_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");
function popBox(el) {
	var a = document.createElement('a');
	a.setAttribute('class','image-link');
	a.setAttribute('id','share');
	a.setAttribute('href','javascript:void(0)');
	a.setAttribute('style','font-size:10px');
	a.innerHTML = 'Feedback';
	a.addEventListener('click',function () { window.open("http://www.tc.umn.edu/~phanx068/home/popup.php","Phanboy","width=320,height=500,toolbar=no,scrollbars=yes,status=no,resizable=no"); },false);
	el.appendChild(a);
}
function GetNewVersion(el) {
	var a = document.createElement('a');
	a.setAttribute('class','image-link');
	a.setAttribute('id','flag');
	a.setAttribute('href',source_location);	
	a.setAttribute('target','_blank');
	a.innerHTML = 'New version!';
	a.addEventListener('click',function () { var today = new Date(); GM_setValue(gm_updateparam, String(today)); },false);
	el.appendChild(a);
}
function CheckForUpdate() {   
	var today = new Date();
	var one_min = 60 * 1000;
	if (lastupdatecheck != "never") {
		var t = today.getTime();
		var luc = new Date(lastupdatecheck).getTime();
		var interval = ((t - luc)/one_min);
		if (interval >= 10)
			checkVersion();
	}
	else {
		checkVersion();
	}
}
function checkVersion() {
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: source_location,
    		headers: {
			'User-agent': 'Mozilla/4.0',
			'Accept': 'text/html',
    		},
   		onload: function(e) {
			var page = document.createElement("body");
			page.innerHTML += e.responseText;
			var content = page.getElementsByTagName("div");
			var latest_version = content[4].innerHTML;
			if(current_version != latest_version && latest_version != "undefined")
			{
				findPlace("div", "options", "options", GetNewVersion);
			}
			else if (current_version == latest_version) {
				var today = new Date();
				GM_setValue(gm_updateparam, String(today));
			}
		}
  	});
}
function addLink(el, t){
	var url = el.getElementsByTagName("a")[0].href.split("/")[4];
	var ninfo = document.createElement("div");
	el.appendChild(document.createElement("br"));
	ninfo.setAttribute('class', 'options');
	insertLink(ninfo, url, t);
	el.appendChild(ninfo);
	return true;
}
function findPlace(tag, class, class2, func) {
	var TF = new Array();
	var fx = func;
	var els = document.getElementsByTagName(tag);
	var o = 0;
	for (i = 0; i < els.length; i++) {
		var el = els[i];
		if (el.getAttribute('class') == class || el.getAttribute('class') == class2) {
			TF[o++] = fx(el, el.getAttribute('class'));
		}
	}
if (TF == undefined)
	return false;
	else
	return TF;
}
function include_css(css_file) {
	var css = document.createElement('link');
	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('type', 'text/css');
	css.setAttribute('href', css_file);
	document.getElementsByTagName('head')[0].appendChild(css);
}
function addDL(el, t) {
    var pattern = new RegExp('\\bM[A-Z,3]* W[a-z]*\\b');
	if (pattern.test(document.body.innerHTML) && t == "info-block options")
		var t = "audioThumb";
	var url = document.getElementById("share").href.split("/")[5];
	var oDL = document.getElementById("download");
	if (oDL != null) return false;
	insertLink(el, url, t);
	inel = el.getElementsByTagName("div");
	el.appendChild(inel[0]);
	return false;
}
function insertLink(n, link, t) {
	var a = document.createElement('a');
	a.setAttribute('class','image-link');
	a.setAttribute('id','download');
	a.setAttribute('href','javascript:void(0)');
	if (t != "audioThumb")
	a.setAttribute('href','http://www.esnips.com/nsdoc/' + link);
	else
	a.addEventListener('click',function () { GM_openInTab('http://www.esnips.com/nsdoc/' + link + '/ts_id/' + new Date().getTime() + '/ns_flash/file1.mp3') },false);
	a.innerHTML = 'Download';
	n.appendChild(document.createElement('br'));
	n.appendChild(a);
}
function getEl(el) {
	return el;
}
include_css("http://www.esnips.com/viewdocument/style15.css");
if (findPlace("div", "info-block options", "info-block options", addDL) == false)
	findPlace("div", "fileThumb", "audioThumb", addLink);
findPlace("div", "options", "options", popBox);
CheckForUpdate();