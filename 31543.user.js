// ==UserScript==
// @name           Better Pixiv
// @author         livestatic
// @namespace      http://www.livestatic.com/
// @description    Fast full-view and bookmarking from preview pages.
// @version        2009.08.16.1
// @include        http://www.pixiv.net/*
// ==/UserScript==

// ==What's New==
// + Added option to swap thumbnail and zoom icon click actions.
// • When clicking out of loading a zoomed image, the image should stop loading now.
// • Bugfix: Info box will now display ALL applied tags for an image.
// ==/What's New==

//Globals
var a_img_tag;                      // img link tag object
var img_src_medium;                 // URL of medium img source
var img_src_original;               // URL of large img source
var big_height;                     // height of full-size image
var user_id;                        // Pixiv ID number of artist
var marked;                         // user bookmarked?
var img_paths = new Array(0);       // store overlay images' paths
var img_index;                      // location in thumbnail browsing

var jax = new XMLHttpRequest();     // Http request object

const version = "2009.08.16.1";      // version number (for version check)
//////////////////////////////////////////////////

//Graphics
var zoomed_wrapper_bg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAATCAYAAAAkhtu6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlpJREFUeNrsWM1NwzAUdhEDeAAO2YAwAekEtCeOpBPQTgCdADNBy5ETZQKSCfAGDRJ3ukGx4bP08eSEplAook96kuM8vZ/P78dJZ7lcqs7t84VS6lK9U0f9Dj04zhwXjrvY+xG/lqcHak/t6I32t9y/G8fltgCROD53nOLZOr52XEVkh46PHWs83zueOl406PR6xg22j7EuaO+MgAq6NGSuI/YyITNG2SkAXXwGRO74igILSv1+n5zzdOe4F3HAO31Eeyn6AevsRZxXACH0iDEBcUnrXNjLqMeEGCYRmQzPXlfR1CM0gWAReB9rjcA1KQ8gjOBIQYGnpJeBDbIVgmpL3uaA/Aq+JCIGBaD7kE/blEZODvepFLzBOd55GYN3A+wZgb4iPZr2DMl6MF7WAMKg9DgrQ6ZUsBVse/9mBModK2rKiBMKnPtBReif0N4UWTBEKk4iOvkk7mm9EGW2KpVCh6RDWs9q1is3y8UKe6FUsr86PpsyooqcIndzlrkQKd9FOTUBmNTo/E56qsnGtA0QJZ32UIzIhMaXEqN1hDSPBWYJjHOq33xDQHC5TWAviZVtExBTUuQ77yP4KvLeEiBzISdP25Bs0DmpKcGvUiXsvcC/VqURpoWJjEGDLqxoxvOFJ0FmhI5+JmQNyabQZTdU/iPcFRZ0gF0p1MFH1yoKs0h6x6aC/kRGCcDshrKBb6GlsKNpXI/cR5fZX7Pe6si2TNtqw8NA0y10hut36E8f4tr2j66vkkUp5LiF9iJ90P4HIMKNssR3C4/9km+lbz1iR2r3YybQqwADAPgnowuzwvsXAAAAAElFTkSuQmCC";
var tZoomIcon = "data:image/png;base64,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";
var infoBackButtonGraphic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAyCAMAAAB1azunAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBQTFRFSsHrCavk8Pr9e9LxQr/qBqrkt+b3xuz57fn93/T7PLzqNrrpD63l3vT7FK/lGLDm6vj9ruP2E67lJLTn9Pv+5fb8p+H2WMbtnd70UsTs2PL7R8Dr5Pb8mdz0FrDlYMnuUMPsjNjy6ff9ObvpP73qT8Psuef3Zsvu/P7/lNrzKrbo5/f8s+X3A6njBKnjktrz8/v+sOT2DKzk7/r9Y8rukNnzVcXsV8btRcDrPb3q6/j9zO75Lbfo////AKjj////GwE7mQAAAEB0Uk5T////////////////////////////////////////////////////////////////////////////////////AMJ7sUQAAADLSURBVHja7NTHEoIwEAbgoICKIGJBLNh7793k/d9K3eCBJTCj45F/hku+CWw2zBL2jnHzJQ+L5PWoRYrS8yhJg+GUoqE0CqdsON1j+o6UzgMyNDEtD1zUJt4lrbjMTfxCacJlU8DfUlwulo7L2Dpc7ByukNhcHD1QvJsGWcvBc5mtElhNExy5kgDLaIJunHZgxkXQqKO3Txb0sMprKZ8F7R10wRp1waWQK9isvYj/w/9RxHDY018GUcT4YsyaYul/iLGEf1SOYfEpwAADtC8mwPamAwAAAABJRU5ErkJggg==";
var infoNextButtonGraphic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAyCAMAAAB1azunAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBQTFRFSsHrCavk8Pr9e9LxQr/qBqrkt+b3xuz57fn93/T7PLzqNrrpD63l3vT7FK/lGLDm6vj9ruP2E67lJLTn9Pv+5fb8p+H2WMbtnd70UsTs2PL7R8Dr5Pb8mdz0FrDlYMnuUMPsjNjy6ff9ObvpP73qT8Psuef3Zsvu/P7/lNrzKrbo5/f8s+X3A6njBKnjktrz8/v+sOT2DKzk7/r9Y8rukNnzVcXsV8btRcDrPb3q6/j9zO75Lbfo////AKjj////GwE7mQAAAEB0Uk5T////////////////////////////////////////////////////////////////////////////////////AMJ7sUQAAADGSURBVHja7NTHEoIwEAbggICKIGJBLNh77114/7dy2JUDWePBgyf2wCHfBP5kmJ8F4RTusTFhkYWPvs9NSYvIp5MSk58W01hMOTE9EvpI1ugJ01XprpaGdlzRF1oLtLVEv1Xcok0lGsOw0TyVJsw7aO6OhjdcNIfRcykboIxHSK+DlNsWT3oWRK6SGFcTZH8m4ZX3nhM58qWCCWrkohpNkN6Qv95lZw5yY8l/+Bf6Ug6HX4ooqq8BDzM7Kr1gEq9KGRZfAgwAZ/gvJnKMbNEAAAAASUVORK5CYII=";
//////////////////////////////////////////////////

//main
(function() {
	if(GM_getValue("GMBPupdates") == "1" || typeof(GM_getValue("GMBPupdates")) == "undefined"){
		updater();
	};
	initSettings();
	
	(window.location.href.match(/(bookmark|member)(_illust)*\.php\?(id=|mode=medium)/) ? getId() : 0);
	(window.location.href.match(/(bookmark|member)(_illust)*\.php\?(id=|mode=medium)/) ? isBookmarked() : marked = 1);
	(window.location.href.match(/illust\.php\?(mode=medium|id=)/) ? insertId() : 0);
	
	buildImageOverlay();
	buildInfoBox();
	
	(marked ? 0 : buildBookmarker());
	
	if(window.location.href.match(/illust\.php\?mode=medium/)){
		intel();
		buildPrevRep();
		if(GM_getValue("GMBPpreZoom") == true){
		    zoomer(img_src_original);
		    GM_setValue("GMBPpreZoom", false);
		}
	} else {
		setupThumbs();
		if(GM_getValue("GMBPpreZoom") == true){
	        img_index = (document.referrer.match(/p=(\d+)$/) != null && document.referrer.match(/p=(\d+)$/)[1] > window.location.href.match(/p=(\d+)$/)[1] ? img_paths.length - 1 : 0);
		    zoomer(img_paths[img_index]);
		    GM_setValue("GMBPpreZoom", false);
		}
	}
		
	if(GM_getValue("GMBPtrans") == true){
	    document.addEventListener("load", translate, true);
	}
	
})();
//////////////////////////////////////////////////

//Set up menu items and settings
function initSettings(){
	if(typeof(GM_getValue("GMBPdirectbehavior")) == "undefined"){GM_setValue("GMBPdirectbehavior", true)};
	if(typeof(GM_getValue("GMBPdarkShader")) == "undefined"){GM_setValue("GMBPdarkShader", false)};
	if(typeof(GM_getValue("GMBPinfoBox")) == "undefined"){GM_setValue("GMBPinfoBox", true)};
	if(typeof(GM_getValue("GMBPtrans")) == "undefined"){GM_setValue("GMBPtrans", false)};
	if(typeof(GM_getValue("GMBPpinInfo")) == "undefined"){GM_setValue("GMBPpinInfo", false)};
	if(typeof(GM_getValue("GMBPtZoomerSwap")) == "undefined"){GM_setValue("GMBPtZoomerSwap", false)};
	if(typeof(GM_getValue("GMBPpreZoom")) == "undefined"){GM_setValue("GMBPpreZoom", false)};
	if(typeof(GM_getValue("GMBPlockFit")) == "undefined"){
	    GM_setValue("GMBPlockFit", false);
	    GM_setValue("GMBPfitState", false);
	};
	
	GM_registerMenuCommand("BP: Settings...", config);
	GM_registerMenuCommand("BP: Check for update", function(){
		updater(true);
	});
}
//////////////////////////////////////////////////

//toggle saved setting
function sToggler(setting, setTo){
	if(setting == "GMBPinfoBox"){
		document.getElementById("bpInfoBox").innerHTML = "";
	}
	GM_setValue(setting, setTo);
	if(setting == "GMBPdarkShader"){
		document.getElementById("shader").style.background = "#" + (GM_getValue("GMBPdarkShader") == true ? "000" : "fff");
	}
}
//////////////////////////////////////////////////

//Checks for script updates
function updater(force) {
	var dater = new Date();
	if(typeof(GM_getValue("GMBPupdates")) == "undefined"){
		GM_setValue("GMBPupdates", confirm("Would you like the Greasemonkey script \"Better Pixiv\" to check for updates automatically?"));
		GM_setValue("GMBPlastUpdate", dater.valueOf().toString());
		updater();
	} else if((dater - GM_getValue("GMBPlastUpdate").valueOf()) > 86400000 || force == true){
		GM_xmlhttpRequest({
			method: 'GET',
			headers: {'Cache-Control' : 'max-age=0, must-revalidate' },
			url: 'http://userscripts.org/scripts/review/31543?format=txt',
			onload: function(responseDetails) {
				GM_setValue("GMBPlastUpdate", dater.valueOf().toString());
				if(responseDetails.status == 200){ 
					var remoteVer = responseDetails.responseText.match(/@version\s*\d{4}\.\d{2}\.\d{2}[\.\d*]*/).toString().substr(8).replace(/^\s*|\s*$/g,'');
					var newStuff = responseDetails.responseText.match(/\/\/ ==What's New==\n(\/\/.*\n)*\/\/ ==\/What's New==\n/ )[0].replace(/\/\/ /g, "").replace(/\=\=(\/)*What's New\=\=\n/g, "");
					var updateNote = "Better Pixiv " + remoteVer + " is available!\nHere's what's new...\n\n" + newStuff + "\nLoad the userscripts.org page in a new tab?";
					if(version != remoteVer && confirm(updateNote)){
						window.open("http://userscripts.org/scripts/show/31543");
					}
				} else {
					alert("There was an error retrieving version info for Better Pixiv. :(");
				}
			}
		});
	}
}
//////////////////////////////////////////////////

//Configure Options
function config(){
    var config_div = document.createElement("div");
    config_div.id = "BP_config";
    config_div.innerHTML = '<form name="GMBPconfigForm" id="GMBPconfigForm">' +
    '<label class="GMBP" style="display:block;font-weight:bold;">Shader Color: </label><input type="radio" style="margin-bottom:5px;" name="GMBPshaderColor" id="GMBPshaderColor" value="light" ' + (GM_getValue("GMBPdarkShader") ? '' : 'checked="checked"') + '/> Light <input type="radio" name="GMBPshaderColor" value="dark" ' + (GM_getValue("GMBPdarkShader") ? 'checked="checked"' : '') + '/> Dark<br />' +
    '<label class="GMBP" style="display:block;font-weight:bold;">Middle click opens in: </label><input type="radio" style="margin-bottom:10px;" name="GMBPdirectBehavior" id="GMBPdirectBehavior" value="new" ' + (GM_getValue("GMBPdirectbehavior") ? 'checked="checked"' : '') + '/> New Tab <input type="radio" name="GMBPdirectBehavior" value="same" ' + (GM_getValue("GMBPdirectbehavior") ? '' : 'checked="checked"') + '/> Same Tab' +
    '<br />' +
    '<input type="checkbox" name="GMBPinfoBox" id="GMBPinfoBox" value="true" ' + (GM_getValue("GMBPinfoBox") ? 'checked="checked"' : '') + '/> Show info box<br />' +
    '<input type="checkbox" name="GMBPpinInfo" id="GMBPpinInfo" value="true" ' + (GM_getValue("GMBPpinInfo") ? 'checked="checked"' : '') + '/> Always place info box at the top<br />' +
    '<input type="checkbox" name="GMBPupdates" id="GMBPupdates" value="true" ' + (GM_getValue("GMBPupdates") ? 'checked="checked"' : '') + '/> Automatically check for updates<br />' +
    '<input type="checkbox" name="GMBPlockFit" id="GMBPlockFit" value="true" ' + (GM_getValue("GMBPlockFit") ? 'checked="checked"' : '') + '/> Lock "fit to window" mode<br />' +
    '<input type="checkbox" name="GMBPtZoomerSwap" id="GMBPtZoomerSwap" value="true" ' + (GM_getValue("GMBPtZoomerSwap") ? 'checked="checked"' : '') + '/> Swap zoom icon and thumbnail click actions (requires page refresh)<br />' +
    '<input type="checkbox" name="GMBPtrans" id="GMBPtrans" value="true" ' + (GM_getValue("GMBPtrans") ? 'checked="checked"' : '') + '/> Translator (experimental)<br />' +
    '<br style="clear:both;" />' +
    '<input type="button" style="margin-left:5px;float:right;" id="GMBPsaveConfigButton" value="Save" /> ' +
    '<input type="button" style="float:right" onclick="if(document.getElementById(\'zoomed_submission_image\').style.display != \'block\'){document.getElementById(\'shader\').style.display = \'none\'};document.body.removeChild(document.getElementById(\'BP_config\'));" value="Cancel" />' +
    '</form>';
    config_div.style.opacity = "0";
    document.body.appendChild(config_div);
    document.getElementById("shader").style.display = "block";
    with(config_div.style){
        background = "#fff";
        padding = "20px";
        width = "500px";
        position = "absolute";
        top = window.pageYOffset + (window.innerHeight / 2) - (config_div.clientHeight / 2) + "px";
        left = (window.innerWidth / 2) - 260 + "px";
        opacity = "1";
        zIndex = "10003";
		MozBorderRadius = "10px";
    }
    document.getElementById("GMBPsaveConfigButton").addEventListener("click", saveConfig, false);
}
/////////////////////////////////////////////////

//Save Configuration
function saveConfig(){
    if(document.getElementById("GMBPshaderColor").checked){
        GM_setValue("GMBPdarkShader", false);
        document.getElementById("shader").style.backgroundColor = "#fff";
    } else {
        GM_setValue("GMBPdarkShader", true);
        document.getElementById("shader").style.backgroundColor = "#000";
    }
    if(document.getElementById("GMBPdirectBehavior").checked){
        GM_setValue("GMBPdirectbehavior", true);
    } else {
        GM_setValue("GMBPdirectbehavior", false);
    }
    if(document.getElementById("GMBPinfoBox").checked){
        GM_setValue("GMBPinfoBox", true);
    }else{
        GM_setValue("GMBPinfoBox", false);
    }
    if(document.getElementById("GMBPpinInfo").checked){
        GM_setValue("GMBPpinInfo", true);
    }else{
        GM_setValue("GMBPpinInfo", false);
    }
    if(document.getElementById("GMBPupdates").checked){
        GM_setValue("GMBPupdates", true);
    }else{
        GM_setValue("GMBPupdates", false);
    }
    if(document.getElementById("GMBPlockFit").checked){
        GM_setValue("GMBPlockFit", true);
    }else{
        GM_setValue("GMBPlockFit", false);
        GM_setValue("GMBPfitState", false);
    }
    if(document.getElementById("GMBPtrans").checked){
        GM_setValue("GMBPtrans", true);
        translate();
    }else{
        GM_setValue("GMBPtrans", false);
    }
    if(document.getElementById("GMBPtZoomerSwap").checked && GM_getValue("GMBPtZoomerSwap") == false){
        GM_setValue("GMBPtZoomerSwap", true);
        window.location.reload(true);
    }else if (document.getElementById("GMBPtZoomerSwap").checked == false && GM_getValue("GMBPtZoomerSwap") == true){
        GM_setValue("GMBPtZoomerSwap", false);
        window.location.reload(true);
    }
    
    document.getElementById("GMBPsaveConfigButton").removeEventListener("click", saveConfig, false);
    if(document.getElementById("zoomed_submission_image").style.display != "block"){
        document.getElementById("shader").style.display = "none";
    }
    document.body.removeChild(document.getElementById('BP_config'));
}
/////////////////////////////////////////////////

//fetch user ID
function getId(){
	var profile_div = document.getElementById("profile");
	forEachTag(profile_div, "a",
		function(tag) {
			if(tag.pathname == "/member.php"){ //fix this!!!
				user_id = tag.search.substr(4);
			}
		}
	);
}
//////////////////////////////////////////////////

//check if user is bookmarked
function isBookmarked(){
	var profile_div = document.getElementById("profile");
	marked = 1;
	forEachTag(profile_div.nextSibling.nextSibling, "ul",
		function(tag) {
			if(tag.className == "profile_bt"){
				marked = 0;
			}
		}
	);
}
//////////////////////////////////////////////////

//grab the image paths and link tag from submission page
function intel() {
	if(window.location.href.match(/illust\.php\?mode=medium/) != null){
		var content_div = document.getElementById("content2");
		forEachTag(content_div, "a",
			function(tag) {
				if((tag.firstChild && tag.firstChild.src) ? tag.firstChild.src.substr(-6, 3) == "_m." : false){
					a_img_tag = tag;
					img_src_medium = tag.firstChild.src;
					img_src_original = img_src_medium.replace(/_m\.(jpg|gif|jpeg|png)$/, ".$1");
				}
			}
		);
	}
}
//////////////////////////////////////////////////

// insert user ID number
function insertId() {
	var idInsert;
	var iHtml;
	if(window.location.href.match(/illust\.php\?mode=medium/) != null){
		idInsert = document.getElementById("bookmark_btn").previousSibling.previousSibling;
		iHtml = "ユーザーID #" + user_id + "<span style=\"padding: 0pt 10px;\">|</span>" + idInsert.innerHTML;
	} else {
		idInsert = document.getElementById("content2").childNodes[3];
		iHtml = idInsert.innerHTML + "&nbsp;&nbsp;&nbsp;ユーザーID: " + user_id;
	}
	
	idInsert.innerHTML = iHtml;
}
//////////////////////////////////////////////////

//Setup thumbnails
function setupThumbs(){	
	forEachTag(document.body, "img",
	function(tag){
		if(tag.src.match(/_s\.(jpg|gif|jpeg|png)/) && !tag.src.match(/\/profile\//)){
			var iSrc = tag.src.replace(/_s\.(jpg|gif|jpeg|png)$/, ".$1");
			var tZoom = document.createElement("img"); 
			tZoom.src = tZoomIcon;
			
			img_paths.push(iSrc.toString());
			
			if(window.location.href.match(/ranking.*\.php/)){
				tZoom.style.position = "relative";
				tZoom.style.verticalAlign = "top";
				tZoom.style.margin = "0px 0px 0px -33px";
				tZoom.style.width = "35px";
				tZoom.style.height = "35px";
			} else {
				tZoom.style.position = "absolute";
				tZoom.style.top = "1px";
			    tZoom.style.right = ((tag.parentNode.parentNode.clientWidth - tag.clientWidth) / 2) + "px";
				tZoom.style.width = "35px";
				tZoom.style.height = "35px";
			}
			tZoom.style.borderWidth = "0px";
			tZoom.style.padding = "0px";
			tZoom.style.cursor = "pointer";
			tZoom.style.display = "none";
			tag.parentNode.parentNode.style.position = "relative";
			
			tag.parentNode.parentNode.insertBefore(tZoom, tag.parentNode.nextSibling);
			
			tag.parentNode.parentNode.addEventListener("mouseover", function() {
			    if(!window.location.href.match(/ranking.*\.php/)){
			        tZoom.style.right = ((tag.parentNode.parentNode.clientWidth - tag.clientWidth) / 2) + "px";
			    }
			    tZoom.style.display = "inline";
			}, false);
			
			tag.parentNode.parentNode.addEventListener("mouseout", function() {
			    tZoom.style.display = "none";
			}, false);
			
			if(GM_getValue("GMBPtZoomerSwap") == true){
			    tag.addEventListener('mousedown',
			    function(event){
			        event.stopPropagation();
			        event.preventDefault();
			        if(event.button == 0){
    				    img_index = img_paths.indexOf(iSrc);
    					zoomer(iSrc);
    				} else if(event.button == 1){
    					if(GM_getValue("GMBPdirectbehavior")){
    						window.open(iSrc);
    					} else {
    						window.location = iSrc;
    					}
    				}
			    },true);
			    
			    tZoom.addEventListener('mousedown', 
    			function(event){
    				if(event.button == 0){
    				    window.location.href = tag.parentNode.href;
    				} else if(event.button == 1){
   						GM_openInTab(tag.parentNode.href);
    				}
    			}, false);
			} else {
    			tZoom.addEventListener('mousedown', 
    			function(event){
    				if(event.button == 0){
    				    img_index = img_paths.indexOf(iSrc);
    					zoomer(iSrc);
    				} else if(event.button == 1){
    					if(GM_getValue("GMBPdirectbehavior")){
    						window.open(iSrc);
    					} else {
    						window.location = iSrc;
    					}
    				}
    			}, false);
			}
		}
	});
}
//////////////////////////////////////////////////

//Build preview image replacement
function buildPrevRep(){
	var prevRep = document.createElement("img");
	with(prevRep) {
		src = img_src_medium;
		id = "submission_image";
		style.cursor = "pointer";
		style.background = "#fff";
	}
	
	//attach eventListener to button
	prevRep.addEventListener('click', function(){zoomer(img_src_original)}, false);
	prevRep.addEventListener('mousedown', function(event){
		if(event.button == 1){
			if(GM_getValue("GMBPdirectbehavior")){
				GM_openInTab(img_src_original);
			} else {
				window.location = img_src_original;
			}
		}
	}, false)

	//replace link with buttton
	a_img_tag.parentNode.replaceChild(prevRep, a_img_tag);
}
//////////////////////////////////////////////////

//Click event for zooming
function zoomer(iPath) {
	var main_div = document.getElementById("pixiv");
	var shader = document.getElementById("shader");
	var zoomed_wrapper = document.getElementById("zoomed_submission_image_wrapper");
	var zoomed = document.getElementById("zoomed_submission_image");
	var infoBox = document.getElementById("bpInfoBox");
	var rightNow = new Date().toUTCString();
	var nOff;
	
	zoomed_wrapper.style.backgroundImage = "url(\"" + zoomed_wrapper_bg + "\")";
	zoomed_wrapper.style.backgroundPosition = ((window.innerWidth / 2) - 16) + "px " + ((window.pageYOffset + (window.innerHeight / 2)) - 8) + "px";

	if(shader.style.display == "none"){
		document.body.style.overflowX = "hidden";

		shader.style.display = "block";
		zoomed_wrapper.style.display = "block";
		zoomed_wrapper.addEventListener("click", keyListener, false);

		if(!window.location.href.match(/illust\.php\?mode=medium/) && GM_getValue("GMBPinfoBox") == true){			
			infoBox.innerHTML = "";
			jax.open("GET", "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + iPath.match(/.*\/(\d*)\.(jpg|gif|jpeg|png)$/)[1], true);
			jax.setRequestHeader('If-Modified-Since', rightNow);
			jax.setRequestHeader('Cache-Control', 'max-age=3600, must-revalidate');
			jax.send(null);
		}

        zoomed.style.marginLeft = "10000px";
        infoBox.style.left = "10000px";

		zoomed.src = iPath;
		document.addEventListener("keyup", keyListener, true);

		zoomed.addEventListener("load", function(e){			
			big_height = zoomed.offsetHeight;
							
			if(big_height < window.innerHeight){
				nOff = window.pageYOffset + ((window.innerHeight / 2) - (big_height / 2));
			} else {	
				nOff = (window.pageYOffset);
			}
			
			if((nOff + big_height) > document.body.clientHeight && big_height < document.body.clientHeight){
				nOff = nOff - ((nOff + big_height) - document.body.clientHeight);
				window.scroll(0,nOff);
			}
			
			zoomed.style.marginTop = nOff + "px";
			zoomed.style.display = "block";
			zoomed.style.marginLeft = "auto";
			zoomed_wrapper.style.backgroundImage = "none";
			document.body.style.overflowX = "visible";
			
			zoomed.addEventListener('mousedown', tabPush, false);
			
			if(GM_getValue("GMBPfitState") == true && GM_getValue("GMBPlockFit") == true){
                fitter();
            }
			
            if(jax.readyState == 4){
                var toParse = jax.responseText.toString();
				var infoId = toParse.match(/member\.php\?id=(\d*)/)[1];
				var infoDate = toParse.match(/(\d{4}年\d{2}月\d{2}日) \d{2}:\d{2}/)[1];
				var infoTags = toParse.match(/(<span style="color:#999;">\*<\/span>)?<a href="tags.php\?tag=[^"]+">[^<]+<\/a>\n*/g).toString().replace(/>,</g, ">&nbsp;&nbsp;<");
				var markFlag = (toParse.match(/<li><a href="bookmark_add\.php\?id=\d*&type=user/) ? false : true);
								
				var infoBackButton = (img_index > 0 || document.body.innerHTML.match(/<a href=['"]?[^>'"]+['"]?>&lt;&lt;前の\d+件<\/a>/) ? "<input style=\"margin-right:5px;\" id=\"BPzPButton\" type=\"image\" src=\"" + infoBackButtonGraphic + "\" \\> " : "");
				var infoNextButton = (img_index < img_paths.length - 1 || document.body.innerHTML.match(/<a href=['"]?[^>'"]+['"]?>次の\d+件&gt;&gt;<\/a>/) ? " <input style=\"margin-left:5px;\" id=\"BPzNButton\" type=\"image\" src=\"" + infoNextButtonGraphic + "\" \\>" : "");
				infoBox.innerHTML = "<table><tr><td>" + infoBackButton + "</td><td>" + (markFlag == true ? "<span style=\"color:#258FB8;font-size:120%;font-weight:bold;\">✓</span>" : "") + "<a href=\"member.php?id=" + infoId + "\">プロフィールを見る</a> <span style=\"padding: 0pt 10px;\">|</span> ユーザーID#" + infoId + " <span style=\"padding: 0pt 10px;\">|</span> <a href=\"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + iPath.match(/.*\/(\d*)\.(jpg|gif|jpeg|png)$/)[1] + "\">" + infoDate + "</a><br /><div style=\"border-top:1px solid #ddd;\">" + infoTags + "</div>" + "</td><td>" + infoNextButton + "</td></tr></table>";
                
                if(document.getElementById("BPzNButton") && img_index < img_paths.length - 1){
				    document.getElementById("BPzNButton").addEventListener("click", zNext, false);
				} else if(document.body.innerHTML.match(/<a href=['"]?[^>'"]+['"]?>次の\d+件&gt;&gt;<\/a>/)) {
				    document.getElementById("BPzNButton").addEventListener("click", function(){
				        GM_setValue("GMBPpreZoom", true);
	                    window.location.href = document.body.innerHTML.match(/<a href=['"]?([^>'"]+)['"]?>次の\d+件&gt;&gt;<\/a>/)[1].replace(/&amp;/g,"&");
				    }, false);
				}
				
				if(document.getElementById("BPzPButton") && img_index > 0){
				    document.getElementById("BPzPButton").addEventListener("click", zPrevious, false);
				} else if(document.body.innerHTML.match(/<a href=['"]?[^>'"]+['"]?>&lt;&lt;前の\d+件<\/a>/)){
				    document.getElementById("BPzPButton").addEventListener("click", function(){
				        GM_setValue("GMBPpreZoom", true);
	                    window.location.href = document.body.innerHTML.match(/<a href=['"]?([^>'"]+)['"]?>&lt;&lt;前の\d+件<\/a>/)[1].replace(/&amp;/g,"&");
				    }, false);
				}

				infoBox.style.maxWidth = (zoomed.clientWidth - 30) + "px";
				infoBox.style.textAlign = "center";
				infoBox.style.display = "block";
				infoBox.style.top = (nOff + (window.innerHeight > big_height && !GM_getValue("GMBPpinInfo") ? big_height - 35 - infoBox.clientHeight : 35)) + "px";
				infoBox.style.left = (window.innerWidth > zoomed.offsetWidth ? (document.body.clientWidth / 2) - (infoBox.clientWidth / 2) : 35) + "px";
				infoBox.addEventListener('mouseover', focusInfoBox, false);
                
            	zoomed.addEventListener('mousemove', showInfoBox, false);
                zoomed.addEventListener('mouseover', showInfoBox, false);
	            zoomed.addEventListener('mouseout', fadeInfoBox, false);
	            
			} else {
				jax.onreadystatechange = function(){
                    if(jax.readyState == 4  && jax.status == 200){
                        var toParse = jax.responseText.toString();
	    				var infoId = toParse.match(/member\.php\?id=(\d*)/)[1];
	    				var infoDate = toParse.match(/(\d{4}年\d{2}月\d{2}日) \d{2}:\d{2}/)[1];
	    				var infoTags = toParse.match(/(<span style="color:#999;">\*<\/span>)?<a href="tags.php\?tag=[^"]+">[^<]+<\/a>\n*/g).toString().replace(/>,</g, ">&nbsp;&nbsp;<");
	    				var markFlag = (toParse.match(/<li><a href="bookmark_add\.php\?id=\d*&type=user/) ? false : true);
									    					    				
	    				var infoBackButton = (img_index > 0 ? "<input style=\"margin-right:5px;\" id=\"BPzPButton\" type=\"image\" src=\"" + infoBackButtonGraphic + "\" \\> " : "");
	    				var infoNextButton = (img_index < img_paths.length - 1 ? " <input style=\"margin-left:5px;\" id=\"BPzNButton\" type=\"image\" src=\"" + infoNextButtonGraphic + "\" \\>" : "");
	    				infoBox.innerHTML = "<table><tr><td>" + infoBackButton + "</td><td>" + (markFlag == true ? "<span style=\"color:#258FB8;font-size:120%;font-weight:bold;\">✓</span>" : "") + "<a href=\"member.php?id=" + infoId + "\">プロフィールを見る</a> <span style=\"padding: 0pt 10px;\">|</span> ユーザーID#" + infoId + " <span style=\"padding: 0pt 10px;\">|</span> <a href=\"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + iPath.match(/.*\/(\d*)\.(jpg|gif|jpeg|png)$/)[1] + "\">" + infoDate + "</a><br /><div style=\"border-top:1px solid #ddd;\">" + infoTags + "</div>" + "</td><td>" + infoNextButton + "</td></tr></table>";
	    				
	    				if(document.getElementById("BPzNButton")){
	    				    document.getElementById("BPzNButton").addEventListener("click", zNext, false);   
	    				}
	    				if(document.getElementById("BPzPButton")){
	    				    document.getElementById("BPzPButton").addEventListener("click", zPrevious, false);
	    				}
	    				
    					infoBox.style.maxWidth = (zoomed.clientWidth - 30) + "px";
    					infoBox.style.textAlign = "center";
    					infoBox.style.display = "block";
    					infoBox.style.top = (nOff + (window.innerHeight > big_height && !GM_getValue("GMBPpinInfo") ? big_height - 35 - infoBox.clientHeight : 35)) + "px";
    					infoBox.style.left = (window.innerWidth > zoomed.offsetWidth ? (document.body.clientWidth / 2) - (infoBox.clientWidth / 2) : 35) + "px";
    					infoBox.addEventListener('mouseover', focusInfoBox, false);
    
                    	zoomed.addEventListener('mousemove', showInfoBox, false);
                    	zoomed.addEventListener('mouseover', showInfoBox, false);
                    	zoomed.addEventListener('mouseout', fadeInfoBox, false);
             
    					jax.onreadystatechange = null;
					}
				};
			}
			
		}, true);
		
	} else {
		document.body.style.overflowX = "auto";
		shader.style.display = "none";
		zoomed.style.display ="none";
		zoomed.src = null;
		zoomed_wrapper.style.display = "none";
		infoBox.style.display = "none";
		infoBox.style.opacity = "0";
        infoBox.style.left = "10000px";

		zoomed_wrapper.removeEventListener("click", keyListener, false);
		document.removeEventListener("keyup", keyListener, true);
		infoBox.removeEventListener('mouseover', focusInfoBox, false);
    	rebuildZoomed();
	}
}
//////////////////////////////////////////////////

//InfoBox opacity controls
function positionInfoBox(){
    var zoomed = document.getElementById("zoomed_submission_image");
	var infoBox = document.getElementById("bpInfoBox");
	infoBox.style.maxWidth = (zoomed.clientWidth - 30) + "px";
	var big_height = zoomed.offsetHeight;
	infoBox.style.top = (parseInt(zoomed.style.marginTop) + (window.innerHeight > big_height && !GM_getValue("GMBPpinInfo") ? big_height - 35 - infoBox.clientHeight : 35)) + "px";
    infoBox.style.left = (window.innerWidth > zoomed.offsetWidth ? (document.body.clientWidth / 2) - (infoBox.clientWidth / 2) : 35) + "px";
}
function focusInfoBox(){
    positionInfoBox();
    document.getElementById("bpInfoBox").style.opacity = "1";
}
function showInfoBox(){
    positionInfoBox();
	document.getElementById("bpInfoBox").style.opacity = ".75";
}
function fadeInfoBox(){
    document.getElementById("bpInfoBox").style.opacity = "0";
}
//////////////////////////////////////////////////

//Zoom next thumbnail
function zNext(){
    zoomer();
    img_index++;
    zoomer(img_paths[img_index]);
}
//////////////////////////////////////////////////

//Zoom previous thumbnail
function zPrevious(){
    zoomer();
    img_index--;
    zoomer(img_paths[img_index]);
}
//////////////////////////////////////////////////

//Event listener for keyboard commands
function keyListener(e){
	if(e.type == "keyup" && e.which == 27 || e.type == "click" && e.target == document.getElementById("zoomed_submission_image_wrapper")){
		e.stopPropagation();
    	e.preventDefault();
		jax.abort();
		zoomer();
		document.getElementById("zoomed_submission_image").src = "";
	} else if (e.which == 90 || e.which == 66){
	    fitter();
	} else if (e.which == 77){
	    (img_paths[0] ? GM_openInTab(img_paths[img_index]) : GM_openInTab(img_src_original));
	}
	
	if(window.location.href.match(/illust\.php\?mode=medium/)){
	    var backForwardLinks = document.getElementById("content2").childNodes[3]
	    if(e.which == 188 && backForwardLinks.childNodes[1].innerHTML.match(/«/)){
	        GM_setValue("GMBPpreZoom", true);
	        window.location = backForwardLinks.childNodes[1].href.replace(/&amp;/, "&");
	    } else if (e.which == 190 && !backForwardLinks.childNodes[2]){
            if(backForwardLinks.childNodes[1].innerHTML.match(/»/)){
                GM_setValue("GMBPpreZoom", true); 
                window.location = backForwardLinks.childNodes[1].href.replace(/&amp;/, "&");
            }
        } else if (e.which == 190 && backForwardLinks.childNodes[3].innerHTML.match(/»/)){
            GM_setValue("GMBPpreZoom", true); 
            window.location = backForwardLinks.childNodes[3].href.replace(/&amp;/, "&");
        }
	} else {
	    if(e.which == 188 && img_index > 0){
	        jax.abort();
	        zoomer();
	        img_index--;
	        zoomer(img_paths[img_index]);
	    } else if (e.which == 190 && img_index < img_paths.length - 1){
	        jax.abort();
	        zoomer();
	        img_index++;
	        zoomer(img_paths[img_index]);
	    } else if (e.which == 190 && img_index == img_paths.length - 1){
	        if(document.body.innerHTML.match(/<a href=['"]?[^>'"]+['"]?>次の\d+件&gt;&gt;<\/a>/)){
	            jax.abort();
	            zoomer();
	            GM_setValue("GMBPpreZoom", true);
	            window.location.href = document.body.innerHTML.match(/<a href=['"]?([^>'"]+)['"]?>次の\d+件&gt;&gt;<\/a>/)[1].replace(/&amp;/g,"&");
	        }
	    } else if(e.which == 188 && img_index == 0){
	        if(document.body.innerHTML.match(/<a href=['"]?[^>'"]+['"]?>&lt;&lt;前の\d+件<\/a>/)){
	            jax.abort();
	            zoomer();
	            GM_setValue("GMBPpreZoom", true); 
	            window.location.href = document.body.innerHTML.match(/<a href=['"]?([^>'"]+)['"]?>&lt;&lt;前の\d+件<\/a>/)[1].replace(/&amp;/g,"&");
	        }
	    }else if (e.which == 78){
	        GM_openInTab("http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + img_paths[img_index].match(/.*\/(\d*)\.(jpg|gif|jpeg|png)$/)[1]);
	    }
	}
}
//////////////////////////////////////////////////

//Toggle "fit to window" mode
function fitter(){
    var zoomed = document.getElementById("zoomed_submission_image");
        
    if(zoomed.style.maxWidth == ''){
        zoomed.style.maxWidth = zoomed.clientWidth + 'px';
        zoomed.style.maxHeight = zoomed.clientHeight + 'px';
        zoomed.style.width = zoomed.clientWidth + 'px';
        zoomed.style.height = zoomed.clientHeight + 'px';
    }
    
    if(((zoomed.clientWidth + 85) > window.innerWidth) && (zoomed.clientWidth + 60) - window.innerWidth >= (zoomed.clientHeight + 60) - window.innerHeight){
        zoomed.style.width = window.innerWidth - 85 + "px";
        zoomed.style.height = 'auto';
        GM_setValue("GMBPfitState", true);
    } else if(((zoomed.clientHeight + 62) > window.innerHeight) && (zoomed.clientWidth + 60) - window.innerWidth <= (zoomed.clientHeight + 60) - window.innerHeight) {
        zoomed.style.height = window.innerHeight - 62 + "px";
        zoomed.style.width = 'auto';
        GM_setValue("GMBPfitState", true);
    } else {
        if(zoomed.style.width != zoomed.style.maxWidth){
            GM_setValue("GMBPfitState", false);
        }
        zoomed.style.width = zoomed.style.maxWidth;
        zoomed.style.height = zoomed.style.maxHeight;
    }
    positionInfoBox();
}
//////////////////////////////////////////////////

//Pushes image to tab
function tabPush(event){
	if(event.button == 1){
		if(GM_getValue("GMBPdirectbehavior")){
			GM_openInTab(this.src);
		} else {
			window.location = this.src;
		}
	}
}
//////////////////////////////////////////////////

//Build infoBox
function buildInfoBox(){
	var infoBox = document.createElement("div");
	infoBox.id = "bpInfoBox";
	with(infoBox.style){
		position = "absolute";
		zIndex = "10001";
		opacity = "0";
		color = "#666";
		background = "#fff";
		display = "none";
		fontFamily = '"ＭＳ Ｐゴシック",Osaka,"ヒラギノ角ゴ Pro W3"';
		fontSize = "12px";
		lineHeight = "18px";
		padding = "5px 5px";
		MozBorderRadius = "10px";
	}
	document.body.appendChild(infoBox);
}
//////////////////////////////////////////////////

//Build image overlay
function buildImageOverlay(){
	//Build the shader
	var shader = document.createElement("div");
	shader.id = "shader";
	with(shader.style){
		display = "none";
		position = "fixed";
		top = "0px";
		left = "0px";
		width = window.innerWidth + "px";
		height = document.body.clientHeight + "px";
		zIndex = "9998";
		background = "#" + (GM_getValue("GMBPdarkShader") == true ? "000" : "fff");
		opacity = "0.7";
		padding = "0px";
	}
	document.body.appendChild(shader);
	window.addEventListener('resize', shaderResizer, false);
	
	//Build the zoomed image
	var zoomed_wrapper = document.createElement("div");
	zoomed_wrapper.id = "zoomed_submission_image_wrapper";
	with(zoomed_wrapper.style){
		position = "absolute";
		top = "0px";
		left = "0px";
		background = "transparent url(\"" + zoomed_wrapper_bg + "\") center center no-repeat";
		minHeight = window.innerHeight + "px";
		height = document.body.clientHeight + "px";
		width = document.body.clientWidth + "px";
		zIndex = "9999";
		textAlign = "center";
		display = "none";
	}
	document.body.appendChild(zoomed_wrapper);
		
	var zoomed = document.createElement("img");
	with(zoomed) {
		id = "zoomed_submission_image";
		style.cursor = "pointer";
		style.border = "30px solid #fff";
		style.MozBorderRadius = "20px";
		style.margin = "0px auto";
	}
	zoomed_wrapper.appendChild(zoomed);
	zoomed.addEventListener('click', zoomer, false);	
}
//////////////////////////////////////////////////

//Rebuilds zoomed
function rebuildZoomed(){
	var zoomed = document.getElementById("zoomed_submission_image");
	var zoomed_wrapper = document.getElementById("zoomed_submission_image_wrapper");
	zoomed.parentNode.removeChild(zoomed);
	
	zoomed = document.createElement("img");
	with(zoomed) {
		id = "zoomed_submission_image";
		style.cursor = "pointer";
		style.border = "30px solid #fff";
		style.MozBorderRadius = "20px";
		style.margin = "0px auto";
	}
	zoomed_wrapper.appendChild(zoomed);
	zoomed.addEventListener('click', zoomer, false);
}
//////////////////////////////////////////////////

//Resize shader on window resize
function shaderResizer(){
	var shader = document.getElementById("shader");
	var zoomed_wrapper = document.getElementById("zoomed_submission_image_wrapper");
	var zoomed = document.getElementById("zoomed_submission_image");
	var infoBox = document.getElementById("bpInfoBox");
	
	shader.style.height = window.innerHeight + "px";
	shader.style.width = window.innerWidth + "px";
	zoomed_wrapper.style.width = document.body.clientWidth + "px";
	zoomed_wrapper.style.minHeight = shader.style.height;
	
	zoomed_wrapper.style.backgroundPosition = ((window.innerWidth / 2) - 16) + "px " + ((window.pageYOffset + (window.innerHeight / 2)) - 8) + "px";
	
	if(big_height < window.innerHeight){
		var nOff = window.pageYOffset + ((window.innerHeight / 2) - (big_height / 2));
	} else {	
		var nOff = (window.pageYOffset);
	}
	
	if((nOff + big_height) > document.body.clientHeight && big_height < document.body.clientHeight){
		nOff = nOff - ((nOff + big_height) - document.body.clientHeight);
	}
	
	infoBox.style.top = (nOff + (window.innerHeight > big_height ? big_height - 35 - infoBox.clientHeight : 35)) + "px";
	infoBox.style.left = (window.innerWidth > zoomed.offsetWidth ? (document.body.clientWidth / 2) - (infoBox.clientWidth / 2) : 35) + "px";

	zoomed.style.marginTop = nOff + "px";
}
//////////////////////////////////////////////////

//Build bookmarker
function buildBookmarker(){
	var marker = document.getElementById("leftcolumn").childNodes[3].childNodes[1].childNodes[1];
	var markerPri = marker.cloneNode(true);
		
	marker.id = "bMarker";
	marker.innerHTML = "<a href=\"javascript:void(0)\">" + (GM_getValue("GMBPtrans") ? "Bookmark User (Public)" : "お気に入りに追加 (公開)") + "</a>";
	marker.firstChild.addEventListener('click', bMark, false);
		
	markerPri.id = "bMarkerPri";
	markerPri.innerHTML = "<a href=\"javascript:void(0)\">" + (GM_getValue("GMBPtrans") ? "Bookmark User (Private)" : "お気に入りに追加 (非公開)") + "</a>";
	markerPri.firstChild.addEventListener('click', bMark, false);
	marker.parentNode.insertBefore(markerPri, marker.nextSibling);
}
//////////////////////////////////////////////////

//Click event for bookmarking
function bMark() {
	var profile_bt = document.getElementById("bMarker").parentNode.parentNode;
	var private = (this.parentNode.id == "bMarker"? 0 : 1);
	var actButton = this;
	
	actButton.innerHTML = "&middot;&middot;&middot;";

	jax.onreadystatechange = function() {
		if (jax.readyState == 4) {
			actButton.innerHTML = (GM_getValue("GMBPtrans") ? "出来た" : "Done");
			setTimeout(function() {profile_bt.parentNode.removeChild(profile_bt);}, 2000);
		}
	};
	jax.open('POST', 'http://www.pixiv.net/bookmark_add.php', true);
	jax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	jax.send('mode=add&id=' + user_id + '&type=user&restrict=' + private);
}
//////////////////////////////////////////////////

//Parses page tags
function forEachTag(root, tagName, func) {
	if(root == null){return};
    var tags = root.getElementsByTagName(tagName);
    for (var i = 0; i < tags.length; i++) {
        func(tags[i]);
    }
}
//////////////////////////////////////////////////

//Translates navigation and menu items to English
function translate(){
    document.removeEventListener("load", translate, true);
    
    var topElement = (window.location.href.match(/illust\.php\?mode=medium/) ? document.getElementById("header").childNodes[1] : document.getElementById("header").childNodes[1]);
    var navigationElement = (window.location.href.match(/((member(_illust)?|response)\.php|bookmark\.php\?id=)/) ? getElementsByClassName("navigation_on")[0] : getElementsByClassName("navigation")[0]);
    var leftColumnElement = document.getElementById("leftcolumn");
    var newInnerHTML;
    
    var searchStrings = new Array("ポイント残高：", "ホーム", "ヘルプ", "ユーザー検索", "ログアウトします。よろしいですか？", ">ログアウト</a>")
    var placeStrings = new Array("Points：", "Home", "Help", "User Search", "Are you sure you want to log out?", ">Log Out</a>")
    newInnerHTML = topElement.innerHTML;
    for(var i in searchStrings){
        newInnerHTML = newInnerHTML.replace(new RegExp(searchStrings[i], 'g'), placeStrings[i]);
    }
    topElement.innerHTML = newInnerHTML;
    
    searchStrings = ["ホーム", "設定変更", "ブックマーク管理", "イラストの管理", "イラストの投稿", "ランダム", "人気のタグ", "マイピクに追加", "お気に入りに追加", "メッセージを送る", "メッセージ", "ブックマークを見る", "イラストを見る", "トップ", "タグ", "タイトル・キャプション", "ウェブ", "　検　索　"];
    placeStrings = ["Home", "Settings", "Manage Bookmarks", "Manage Illust.", "Add Illustration", "Random", "Popular Tags", "Add to MyPic", "Bookmark User", "Send Message", "Messages", "View Bookmarks", "Illustrations", "Top", "Tags", "Title • Caption", "Web", "&nbsp;&nbsp;Search&nbsp;&nbsp;"];
    for(var i in searchStrings){
        navigationElement.innerHTML = navigationElement.innerHTML.replace(new RegExp(searchStrings[i], 'g'), placeStrings[i]);
    }
    
    if(leftColumnElement != null){
        searchStrings = ["マイピクに追加", "お気に入りに追加 (非公開)", "お気に入りに追加 (公開)", "プロフィールを見る", "掲示板を見る"];
        placeStrings = ["Add to MyPic", "Bookmark User (Private)", "Bookmark User (Public)", "View Profile", "Message Board"];
        for(var i in searchStrings){
            leftColumnElement.innerHTML = leftColumnElement.innerHTML.replace(new RegExp(searchStrings[i], 'g'), placeStrings[i]);
        }
    }
    
    forEachTag(document, "a", function(tag){
        if(tag.innerHTML.match(/もっと見る/)){
            tag.innerHTML = "view more";
        }
    });
}
/////////////////////////////////////////////////

//Gather elements by class name (src: http://snipplr.com/view/1696/get-elements-by-class-name/)
function getElementsByClassName(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];
        var a = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var els = node.getElementsByTagName("*");
        for(var i=0,j=els.length; i<j; i++)
            if(re.test(els[i].className))a.push(els[i]);
        return a;
}
/////////////////////////////////////////////////