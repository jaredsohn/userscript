// ==UserScript==
// @name           Fur Affinity Banner Switcher
// @namespace      http://miffthefox.info/
// @description    Allows you to change the FA banner!
// @include        http://www.furaffinity.net/*
// @include        http://furaffinity.net/*
// @include        http://sfw.furaffinity.net/*
// @include        https://www.furaffinity.net/*
// @include        https://furaffinity.net/*
// @include        https://sfw.furaffinity.net/*
// ==/UserScript==


// BEGIN third-party code!
// copyright 2009, 2010 James Campos
// license cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
// Modified by Miff <http://miffthefox.info>
if (typeof GM_deleteValue == 'undefined') {
    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}
// END third-party code!

function getByClass(name, tag, context){
	if (!context) context = document;
	if (!tag) tag = "*";
	
	var els = context.getElementsByTagName(tag);
	for (var i = 0; i < els.length; i++){
		if (els[i].className == name) return els[i];
	}
	
	return null;
}

function dbg(s, o){
	//console.info("FABS: " + s + " (%o)", o);
}

function setBannerImg(url){
	if (!url) return;
	var h = document.getElementById("fa_header");
	if (h){
		h.setAttribute("style", "background: none transparent; width: auto; height: auto;");
		h.innerHTML = "<img id='_fabs_img' src='" + url.replace(/['"<>&]/g, '') + "'>";
		document.getElementById('_fabs_img').setAttribute("src", url);
		dbg("Set banner.", url);
	} else {
		dbg("Banner not set.");
	}
}

function loadSavedBanner(){
	var bImg = GM_getValue("banner", "");
	if (bImg){
		dbg("Saved banner found.", bImg);
		setBannerImg(bImg);
	} else {
		dbg("Using default bImg.");
	}
}

function clearBannerImg(){
	var h = document.getElementById("fa_header");
	if (h){
		h.setAttribute("style", ";");
		h.innerHTML = "";
		dbg("Banner cleared.", h);
	}
}

function makeBanner(url){
	setBannerImg(url);
	if (confirm("Set banner to " + url + "\nKeep it?")){
		GM_setValue("banner", url);
	} else {
		loadSavedBanner();
	}
}

function openControlPanel(){
	var body = document.getElementsByTagName("body")[0];

	var background = document.createElement("div");
	background.setAttribute("style", "background: black; opacity: 0.5; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; padding: 0px; z-index: 9001");
	body.appendChild(background);
	
	var ui = document.createElement("div");
	ui.setAttribute("style", "background: #ccc; color: #000; border: 2px solid black; position: fixed; top: 25%; left: 25%; width: 50%; height: 50%; z-index: 9002; padding: 1em;");
	body.appendChild(ui);
	
	var html = "<b style='font-size: 180%'>Fur Affinity Banner Switcher!</b><br>by ";
	html += '<a class="iconusername" href="/user/miffthefox"><img align="middle" alt="miffthefox" title="miffthefox"';
	html += 'src="http://a.facdn.net/miffthefox.gif">&nbsp;&nbsp;miffthefox</a><br><br>';
	
	html += '<form method="get" action="" onsubmit="return false">';
	
	html += 'Current banner:<br><input type="text" style="width: 85%" id="_fabs_frm_banner"><br>';
	
	html += '&emsp;<input class="button" type="button" value="Set to above URL" id="_fabs_set">';
	html += '&emsp;<input class="button" type="button" value="Reset to default" id="_fabs_clear">';
	
	html += '<br><br><br><div style="text-align: center"><input class="button" type="button" value="Close" id="_fabs_close_overlay"></div>';
	
	html += '</form>';
	
	ui.innerHTML = html;
	
	document.getElementById("_fabs_set").addEventListener("click", function(){ makeBanner(document.getElementById("_fabs_frm_banner").value); });
	document.getElementById("_fabs_clear").addEventListener("click", function(){
		clearBannerImg();
		if (confirm("Reset to the defualt banner.  Keep it?")){
			GM_setValue("banner", "");
		} else {
			loadSavedBanner();
		}
	}, false);
	document.getElementById("_fabs_close_overlay").addEventListener("click", function(){ body.removeChild(background); body.removeChild(ui); }, false);
	document.getElementById("_fabs_frm_banner").value = GM_getValue("banner", "");
}

loadSavedBanner();

var elSubmissionImg = document.getElementById("submissionImg");
var elSubmissionActions = getByClass("alt1 actions");
if (elSubmissionImg && elSubmissionActions){
	dbg("We are on a submission page.", elSubmissionActions);
	
	elSubmissionActions.innerHTML = elSubmissionActions.innerHTML.replace(/ \| /, " | <b><a id='_fabs_banner' href='#'>Banner</a></b> | ");
	
	var elSubmissionMakeBanner = document.getElementById("_fabs_banner");
	if (elSubmissionMakeBanner){
		var url = elSubmissionImg.getAttribute("src");
		url = url.replace(/(\d+)\.half\./, "$1.");
		elSubmissionMakeBanner.addEventListener("click", function(){ makeBanner(url); return false; }, false);
	} else {
		dbg("No idea where the banner link is");
	}
} else {
	dbg("We are not on a submission page.");
}

var elUserCPMenu = document.getElementById("usercp-menu");
if (elUserCPMenu){
	dbg("We are in the control panel.", elUserCPMenu);
	var elTD = elUserCPMenu.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
	dbg("Found elTD", elTD);
	elTD.innerHTML += "<br><a href='#' id='_fabs_controlpanel'>FA Banner Switcher</a>";
	
	var elTDA = document.getElementById("_fabs_controlpanel");
	elTDA.addEventListener("click", function(){ openControlPanel(); }, false);
} else {
	dbg("We are not in the control panel.");
}
