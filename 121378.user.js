// ==UserScript==
// @name          Facebook Enhancer (No-Timeline)
// @description   Changes the timeline layout of Facebook and enhances Facebook with new functions.
// @author        Tobias Nase
// @namespace     http://tobias-nase.de/
// @homepage      http://tobias-nase.de/
// @icon          http://tobias-nase.de/userscripts/facebook.png
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @version       1.13
// @run-at        document-start
// ==/UserScript==

// Anti global scope pollution
(function () {

// This sets the version number
var fbenhancer_versionnum = 1.13;

if (typeof(GM_info) == 'undefined') {
// HTML 5 Workaround if no Greasemonkey
var stor=window.globalStorage?window.globalStorage:localStorage;
if(!stor)if(!qsel||!checkBy)throw new Error("No Storage Found.Only browsers with HTML 5 Web Storage Support");
function GM_getValue(varname,def){
	var name="GM_API_"+varname;
	if(stor[name]) {
		if (stor.getItem(name) == 'true') {
			return true;
		}
		if (stor.getItem(name) == 'false') {
			return false;
		}
		return stor.getItem(name);
	}
	else {
		return def;
	}
}
function GM_setValue(varname,varval){
	var name="GM_API_"+varname;
	return stor.setItem(name,varval);
}
function GM_deleteValue(varname){
	var name="GM_API_"+varname;
	return stor.removeItem(name);
}
}
	
// Display Facebook information about possible update to new version
function facebook_show_update_alert() {
 if (document.getElementById('facebookenhancer_updatenotice')) {
 }
 else {
 var newfacebookupdater = document.createElement('div');
 newfacebookupdater.id = 'facebookenhancer_updatenotice';
 newfacebookupdater.className = 'fbenhancer_update_beeper';
 newfacebookupdater.innerHTML = '<div class="UIBeeper_Full"><div class="fbenhancer_update_beeptitle"><a href="http://tobias-nase.de/enhancerf" target="_blank"><img src="http://tobias-nase.de/userscripts/facebook.png" class="fbenhancer_update_beepicon"><div class="fbenhancer_update_beeptitle"><b>Facebook Enhancer</b><br> has a new version available (v' + GM_getValue('facebookenhancer_update_version') + ').<br>Click <b>here</b> to install.</div></a></div></div><iframe src="http://tobias-nase.de/enhancerf/download/enhancerf_gm.user.js" name="enhancerf_gmupdate" width="1" height="1" frameborder="0" style="display: none"></iframe>';
 document.body.appendChild(newfacebookupdater);
 }
}

// On/Off function for checkboxes
function facebook_enhancer_alternate_val(value) {
	if(GM_getValue(value) == false) {
	   GM_setValue(value, true);
	}
	else {
	   GM_setValue(value, false);
	}
}

// FB Enhancer settings window 
function facebook_show_enchaner_settings() {
   // Create settings window
   document.body.style.backgroundColor = '#FFFFFF';
   document.getElementById('jewelContainer').style.display = 'none';
   document.getElementById('headNav').style.display = 'none';
   var enhancer_settings_content = '';
   enhancer_settings_content += '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-repeat: no-repeat; background-position: right center; background-image: url(http://tobias-nase.de/userscripts/facebook_enhancer_bg.jpg); padding: 20px 30px 20px 30px; margin-top: 30px; border-radius: 15px; -moz-border-radius: 15px; -o-border-radius: 15px; -webkit-border-radius: 15px; border: 1px #CCCCCC solid; line-height: 30px"><tr><td colspan="2" style="padding-bottom: 10px"><h1>Facebook Enhancer</h1></td></tr><tr><td width="30">';
   // One Col Layout
   enhancer_settings_content += '<input id="fbenchancer_onecol_active" type="checkbox"' + ((GM_getValue('facebookenhancer_onecol_active') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>One column layout</b></td></tr><tr><td>';
   // Hide Ads
   enhancer_settings_content += '<input id="fbenchancer_adshide_active" type="checkbox"' + ((GM_getValue('facebookenhancer_adshide_active') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>Hide page ads</b></td></tr><tr><td>';
   // Hide Inactive
   enhancer_settings_content += '<input id="fbenchancer_friendshide_active" type="checkbox"' + ((GM_getValue('facebookenhancer_friendshide_active') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>Hide inactive friends in chat</b></td></tr><tr><td>';
   // Hide Mobile Friends
   enhancer_settings_content += '<input id="fbenchancer_mobilefriendshide_active" type="checkbox"' + ((GM_getValue('facebookenhancer_friendshide_mobile') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>Hide friends online with mobile phone in chat</b></td></tr><tr><td>';
   // Show Enhancer Icon
   enhancer_settings_content += '<input id="fbenchancer_xicon_active" type="checkbox"' + ((GM_getValue('facebookenhancer_enhanced_icon') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>Show special enhancer favicon</b></td></tr><tr><td>';
   // Autoupdate
   enhancer_settings_content += '<input id="fbenchancer_autoupdate_active" type="checkbox"' + ((GM_getValue('facebookenhancer_autoupdate_active') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>Auto-update</b></td></tr><tr><td colspan="2" style="padding-top: 10px"><label class="submitBtn uiButton uiButtonConfirm"><input type="submit" value="back to facebook" id="enhancer_save_button"></label></td></tr><tr><td colspan="2"><div style="float: left">Please donate, to help developing this script!</div><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="EEPLB4S44CSCQ"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal donate" style="top: 5px; left: 10px; position: relative;"><img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1"></form></td></tr><tr><td colspan="2" style="padding-top: 5px"><div style="background-color: transparent"><div class="clearfix"><div role="contentinfo" class="mrl lfloat"><div class="fsm fwn fcg"><span> Facebook-Enhancer &copy; 2011</span> · <a title="Tobias Nase, Webdeveloper" href="http://tobias-nase.de/" target="_blank">Tobias Nase, Webdeveloper</a></div></div></div></div></td></tr></table>';
   enhancer_settings_content += '';
   document.getElementById('globalContainer').innerHTML = enhancer_settings_content; // before 
   
   // Add alternation events to checkboxes
   document.getElementById('fbenchancer_onecol_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_onecol_active') }, false);
   document.getElementById('fbenchancer_adshide_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_adshide_active') }, false);
   document.getElementById('fbenchancer_friendshide_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_friendshide_active') }, false);
   document.getElementById('fbenchancer_mobilefriendshide_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_friendshide_mobile') }, false);
   document.getElementById('fbenchancer_xicon_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_enhanced_icon') }, false);
   document.getElementById('fbenchancer_autoupdate_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_autoupdate_active') }, false);
   
   // Redirect to FB page
   document.getElementById('enhancer_save_button').addEventListener('click', function () { window.location.href = 'https://www.facebook.com/pages/FB-Enhancer/219301651485955'; }, false);
}

// Add something to the headelement
function facebook_add_headelm(headelm) {
 if (document.getElementsByTagName('head')[0]) {
 document.getElementsByTagName('head')[0].appendChild(headelm);
 }
 else {
 setTimeout(function () { facebook_add_headelm(headelm); }, 100);
 }
}

// Execute enhancer
function facebook_enhance() {
	
// Update check
if (parseFloat(fbenhancer_versionnum) < parseFloat(GM_getValue('facebookenhancer_update_version'))) {
	facebook_show_update_alert();
}

// Init GM vars
if(typeof(GM_getValue('facebookenhancer_onecol_active')) == 'undefined') {
    GM_setValue('facebookenhancer_onecol_active', true);
}
if(typeof(GM_getValue('facebookenhancer_adshide_active')) == 'undefined') {
    GM_setValue('facebookenhancer_adshide_active', true);
}
if(typeof(GM_getValue('facebookenhancer_friendshide_active')) == 'undefined') {
    GM_setValue('facebookenhancer_friendshide_active', true);
}
if(typeof(GM_getValue('facebookenhancer_friendshide_mobile')) == 'undefined') {
    GM_setValue('facebookenhancer_friendshide_mobile', false);
}
if(typeof(GM_getValue('facebookenhancer_enhanced_icon')) == 'undefined') {
    GM_setValue('facebookenhancer_enhanced_icon', true);
}
if(typeof(GM_getValue('facebookenhancer_autoupdate_active')) == 'undefined') {
    GM_setValue('facebookenhancer_autoupdate_active', true);
}

// Add enhancer settings menu
if (document.getElementById('menu_facebook_enchancer')) {
}
else {
var settingselement = document.createElement('li');
settingselement.innerHTML = '<div class="navSubmenu" style="cursor: pointer"><div class="clearfix"><div class="UIImageBlock clearfix lfloat"><img alt="" src="http://tobias-nase.de/userscripts/facebook.png" class="uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoSmall img"><div class="UIImageBlock_Content UIImageBlock_ICON_Content">enhancerF-Settings</div></div></div></div></li>';
settingselement.id = 'menu_facebook_enchancer';
settingselement.addEventListener('click', function (event) { event.preventDefault(); facebook_show_enchaner_settings(); }, false); 
var insertnode = document.getElementById('navAccount').getElementsByTagName('li')[0];
insertnode.parentNode.insertBefore(settingselement, insertnode);
var settingselementseparator = document.createElement('li');
settingselementseparator.className = "menuDivider";
var newinsertnode = document.getElementById('navAccount').getElementsByTagName('li')[1];
newinsertnode.parentNode.insertBefore(settingselementseparator, newinsertnode);
}

// Change Facebook icon to enhanced version
if (GM_getValue('facebookenhancer_enhanced_icon')) {
try {
var documentlinkelms = document.getElementsByTagName("link");
var documentlinkemls_all = documentlinkelms.length - 1;
for (var i=0; i < documentlinkemls_all; i++) {
	if (documentlinkelms[i].rel == "shortcut icon") {
		var removeelm = documentlinkelms[i];
		removeelm.parentNode.removeChild(removeelm);
	}
}
// This is the Facebook Enhancer favicon
var newshortcut = document.createElement('link');
newshortcut.rel = 'shortcut icon';
newshortcut.type = 'image/x-icon';
newshortcut.href = 'data:image/x-icon;base64,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a//Qsp3/0LKd/+jZz//TtqZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAYACAqAAAMWiQAR3k0AHZZMB9kUioqYGU2IndnLSl8YDEebVErI19ZLRBhTRwHSauNeHfu4tv/oGEv/6BhL/+gYS//oGEv/6BhL/+gYS//oGEv/6BhL/+gYS//59jO/9O2pnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAAABzkOABJwNABAWygALUYaAB1TIgAlSiEAH0AZABQqAAAMJAAABwAAAAQAAAAAAAAAAOre1e/StKD/n18t/59fLf+fXy3/n18t/59fLf+fXy3/n18t/59fLf/n2M7/07amcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAABQAAAAUAAAACAAAAAwAAAAIAAAACAAAAAwAAAAQAAAAEAAAABAAAAAUAAAAFsZV/JO7l3vbbw7T/t4dm/55eKf+eXin/nl4p/55eKf+eXin/nl4p/+fYzf/TtqZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAADAAAAAwAAAAMAAAACAAAAAgAAAAIAAAADAAAAAwAAAAMAAAAEAAAABQAAAAUAAAADAAAAAti/rZzq3tXv/////////////////////////////////////9O2pnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Af///wH///8B////AAB//wAAP/8ACA//AIH//gH///wB///5Af//8wDgP+cAwD/PAAAfjwAAHw8AAB4OAAAOCAAAHgAAAB4AAAgeAAAIHgAABj4AAAQ+AAA4fgEA8P4AAPf4AAD/+AAAD/wAAA///4AP//+AD///wA///+AP8=';
facebook_add_headelm(newshortcut);
} catch (e) { }
}

// Change layout of facebook to one column
var timeline_one_column = '';
if (GM_getValue('facebookenhancer_onecol_active')) {
timeline_one_column += '.fbTimelineTwoColumn .timelineUnitContainer { width: inherit; }';
timeline_one_column += '.fbTimelineCapsule .leftColumn, .fbTimelineUnit[data-side="l"] { float: left; }';
timeline_one_column += '.fbTimelineCapsule .rightColumn, .fbTimelineUnit[data-side="r"] { float: left; }';
timeline_one_column += '.fbTimelineUnit[data-side="l"] .spinePointer { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURFODY1MUE2MkZCMTFFMUEzNTQ4MUFDMzg5MEJFMEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURFODY1MUI2MkZCMTFFMUEzNTQ4MUFDMzg5MEJFMEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBREU4NjUxODYyRkIxMUUxQTM1NDgxQUMzODkwQkUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBREU4NjUxOTYyRkIxMUUxQTM1NDgxQUMzODkwQkUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PruGq74AAACcSURBVHjaYvj//z8DNfDh0/f/MzFQAdx5+OY/iGaihkEvXn9hsDFRYGABCbx48/k/uiIJEV5GUgyiyGXoBoEAC4xx6PQDuKCdqQLJBsFdhmwQNj4xBpHsTXwGkWyYirwIo4QoD8ORMw9wG4YeRvjCDJ+BjKDUS07SwOZlspMGVhdSmidvP3j9H5QvQQDsTWplKapkdJCXQTRAgAEA5KbPleclluoAAAAASUVORK5CYII=); left: -18px; top: 28px !important; background-position: 0px 0px !important; }';
timeline_one_column += '.fbTimelineUnit[data-side="r"] .spinePointer { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURFODY1MUE2MkZCMTFFMUEzNTQ4MUFDMzg5MEJFMEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURFODY1MUI2MkZCMTFFMUEzNTQ4MUFDMzg5MEJFMEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBREU4NjUxODYyRkIxMUUxQTM1NDgxQUMzODkwQkUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBREU4NjUxOTYyRkIxMUUxQTM1NDgxQUMzODkwQkUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PruGq74AAACcSURBVHjaYvj//z8DNfDh0/f/MzFQAdx5+OY/iGaihkEvXn9hsDFRYGABCbx48/k/uiIJEV5GUgyiyGXoBoEAC4xx6PQDuKCdqQLJBsFdhmwQNj4xBpHsTXwGkWyYirwIo4QoD8ORMw9wG4YeRvjCDJ+BjKDUS07SwOZlspMGVhdSmidvP3j9H5QvQQDsTWplKapkdJCXQTRAgAEA5KbPleclluoAAAAASUVORK5CYII=); left: -18px; top: 28px !important; background-position: 0px 0px !important; }';
timeline_one_column += '.fbTimelineViewingSelf .leftColumn:hover .spinePointer, .fbTimelineViewingSelf .fbTimelineUnit[data-side="l"]:hover .spinePointer { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTNGNTc5QTA2MkVCMTFFMUE3MjhFMjJGN0QzMkNFOUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTNGNTc5QTE2MkVCMTFFMUE3MjhFMjJGN0QzMkNFOUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFM0Y1Nzk5RTYyRUIxMUUxQTcyOEUyMkY3RDMyQ0U5RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFM0Y1Nzk5RjYyRUIxMUUxQTcyOEUyMkY3RDMyQ0U5RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvcc6x4AAACgSURBVHjaYvj//z8DNcD0JYf+M1HDoD1HbkBcRKnLQAaBXAUCLCCB568/YZgoKcrHSIxBtx+8YsiItgXzmShxEbJBIMACYxw6/QAuaGeqQLJBcJchG4SNT4xBJHsTn0EkG+Zio8GoqiDGMGPpYdyGoYcRvjDDZyAjKJ29ePOZ5KSBzctkJw2sLqRmDgB7k5GRkWIDQV6mSkYHeRlEAwQYAHLtdJy0sFFiAAAAAElFTkSuQmCC) !important; left: -18px; top: 28px !important; background-position: 0px 0px !important; }';
timeline_one_column += '.fbTimelineViewingSelf .rightColumn:hover .spinePointer, .fbTimelineViewingSelf .fbTimelineUnit[data-side="r"]:hover .spinePointer { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTNGNTc5QTA2MkVCMTFFMUE3MjhFMjJGN0QzMkNFOUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTNGNTc5QTE2MkVCMTFFMUE3MjhFMjJGN0QzMkNFOUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFM0Y1Nzk5RTYyRUIxMUUxQTcyOEUyMkY3RDMyQ0U5RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFM0Y1Nzk5RjYyRUIxMUUxQTcyOEUyMkY3RDMyQ0U5RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvcc6x4AAACgSURBVHjaYvj//z8DNcD0JYf+M1HDoD1HbkBcRKnLQAaBXAUCLCCB568/YZgoKcrHSIxBtx+8YsiItgXzmShxEbJBIMACYxw6/QAuaGeqQLJBcJchG4SNT4xBJHsTn0EkG+Zio8GoqiDGMGPpYdyGoYcRvjDDZyAjKJ29ePOZ5KSBzctkJw2sLqRmDgB7k5GRkWIDQV6mSkYHeRlEAwQYAHLtdJy0sFFiAAAAAElFTkSuQmCC) !important; left: -18px; top: 28px !important; background-position: 0px 0px !important; }';
// Center spline pointer
timeline_one_column += '.fbTimelineCapsule .fbTimelineOneColumn .spinePointer { left: -18px; top: 28px; height: 15px; width: 19px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURFODY1MUE2MkZCMTFFMUEzNTQ4MUFDMzg5MEJFMEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURFODY1MUI2MkZCMTFFMUEzNTQ4MUFDMzg5MEJFMEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBREU4NjUxODYyRkIxMUUxQTM1NDgxQUMzODkwQkUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBREU4NjUxOTYyRkIxMUUxQTM1NDgxQUMzODkwQkUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PruGq74AAACcSURBVHjaYvj//z8DNfDh0/f/MzFQAdx5+OY/iGaihkEvXn9hsDFRYGABCbx48/k/uiIJEV5GUgyiyGXoBoEAC4xx6PQDuKCdqQLJBsFdhmwQNj4xBpHsTXwGkWyYirwIo4QoD8ORMw9wG4YeRvjCDJ+BjKDUS07SwOZlspMGVhdSmidvP3j9H5QvQQDsTWplKapkdJCXQTRAgAEA5KbPleclluoAAAAASUVORK5CYII=); background-position: top left; }';
// Center spline pointer hover
timeline_one_column += '.fbTimelineCapsule .fbTimelineOneColumn:hover .spinePointer { left: -18px; top: 28px; height: 15px; width: 19px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTNGNTc5QTA2MkVCMTFFMUE3MjhFMjJGN0QzMkNFOUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTNGNTc5QTE2MkVCMTFFMUE3MjhFMjJGN0QzMkNFOUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFM0Y1Nzk5RTYyRUIxMUUxQTcyOEUyMkY3RDMyQ0U5RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFM0Y1Nzk5RjYyRUIxMUUxQTcyOEUyMkY3RDMyQ0U5RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvcc6x4AAACgSURBVHjaYvj//z8DNcD0JYf+M1HDoD1HbkBcRKnLQAaBXAUCLCCB568/YZgoKcrHSIxBtx+8YsiItgXzmShxEbJBIMACYxw6/QAuaGeqQLJBcJchG4SNT4xBJHsTn0EkG+Zio8GoqiDGMGPpYdyGoYcRvjDDZyAjKJ29ePOZ5KSBzctkJw2sLqRmDgB7k5GRkWIDQV6mSkYHeRlEAwQYAHLtdJy0sFFiAAAAAElFTkSuQmCC); background-position: top left; }';
// Post input
timeline_one_column += '.uiScaledImageContainer .lifeEventPhoto { width: inherit; }';
// No photo width
timeline_one_column += '.fbTimelineTwoColumn .photoUnit .photoWidth1 .photoWrap { width: inherit !important; height: inherit !important; }';
// No photo positioning
timeline_one_column += '.uiScaledImageContainer img { left: 0px !important; max-width: 798px; top: 0px !important; min-height: inherit; }';
// Cover photo change unit
timeline_one_column += '.fbTimelineTwoColumn .coverPhotoChangeUnit { width: inherit; height: inherit; }';
// Cover photo change unit img
timeline_one_column += '.coverPhotoChangeUnit img { position: absolute; max-width: 798px; }';
// External share width
timeline_one_column += '.hasImage .externalShareText { width: 673px; }';
// External share height
timeline_one_column += '.hasImage .externalShareTextWrapper, .hasImage .externalShareText { height: 100px; }';
// External share float
timeline_one_column += '.externalShareImage { float: left; border-right: 0px; left: 10px; }';
// Photo unit margin delete
timeline_one_column += '.profilePicChangeUnit { margin-left: 0px; }';
// Friends container 
timeline_one_column += '.timelineReportContainer .timelineUnitContainer .aboveUnitContent, .timelineReportContainer .timelineUnitContainer .reportUnitTitle { margin: -7px -10px 10px; }';
// Friends container photos 
timeline_one_column += '.friendsAddedUnit { margin: -5px -10px -10px; }';
// Friends and like container title padding
timeline_one_column += '.timelineReportContainer { padding: 3px 0 0 0; }';
// Friends unit width
timeline_one_column += '#pagelet_timeline_friends_unit { width: 801px; }';
// Capsule closing and Report container width
timeline_one_column += '.timelineReportContainer { border: 1px solid #c4cde0; width: 821px; margin: 5px 0px; }';
// Report inner container width
timeline_one_column += '.timelineReportContainer .timelineReportContent .timelineUnitContainer { width: 795px !important; }';
// Happy Birthday container width
timeline_one_column += '#contentArea .aggregateWallPosts:first-child { width: 806px !important; }';
timeline_one_column += '#contentArea .uiScrollableArea[style] { width: 806px !important; }';
timeline_one_column += '.wallPostList { width: 812px; }';
// Facebook account creation width 
timeline_one_column += '.createdAccountUnit { width: 806px; }';
// NavBar top change width
timeline_one_column += '.slimHeader #navAccount .navigation { width: 225px; }';
timeline_one_column += '.externalShareImage:after { content: "."; clear: both; display: block; height: 0; visibility: hidden; }';
timeline_one_column += '.fbTimelineCapsule div.fbTimelineComposerUnit { width: 811px; }';
timeline_one_column += '.fbTimelineSpine { left: 3px; right: inherit; }';
timeline_one_column += '.fbTimelineCapsule { background-position: 12px top; }';
timeline_one_column += '.fbTimelineCapsule .topBorder { display: none; }';
timeline_one_column += '.fbTimelineCapsule .bottomBorder { display: none; }';
timeline_one_column += '.fbTimelineOneColumn, .fbTimelineTwoColumn { margin-left: 28px; }';
timeline_one_column += '.externalShareContent { position: relative; left: 10px; }';
timeline_one_column += '.timelineUnitContainer .uiCommentContainer { width: inherit; margin-left: 0px; margin-bottom: 10px; }';
timeline_one_column += '.fixed_elem { position: relative !important; }';
timeline_one_column += '.fbTimelineScrubber { position: fixed !important; }';
//timeline_one_column += '.uiOverlay { left: 15px !important; right: inherit !important; }';
timeline_one_column += '.uiOverlayArrowRight { background-position: -64px -415px !important; }';
timeline_one_column += '.uiOverlayArrow { left: -8px; right: inherit; background-position: 0px -470px !important; }';
//timeline_one_column += '.timelineLayout { background-color: inherit; }';
timeline_one_column += '.fbTimelineScrubber { background-color: inherit; }';
timeline_one_column += '.hasSlimHeader .fbTimelineStickyHeader .stickyHeaderWrap { display: none; }';
timeline_one_column += '.fbTimelineOneColumn .lifeEventAddPhoto { width: inherit !important; }';
timeline_one_column += '.fbTimelineOneColumn, .fbTimelineTwoColumn { margin-bottom: 0px; }';
timeline_one_column += '.fbTimelineCapsule .timelineUnitContainer { padding: 10px 10px 20px; margin-top: 5px; margin-bottom: 10px; border-left: inherit; border-right: inherit; border: 1px solid #C4CDE0; }';
timeline_one_column += '.timelineTour #toolbarContainer { width: inherit; }';
timeline_one_column += '.timelineLayout #contentArea { width: inherit; }';
timeline_one_column += '.timelineLayout #rightCol { }';
timeline_one_column += '.fbTimelineIndeterminateContent { float: right !important; margin-left: 15px; width: 395px; }';
timeline_one_column += '.coverPhotoChangeUnit { margin-left: 0px; margin-bottom: 5px; }';
timeline_one_column += 'div.photoUnit { margin: 0px; }';
timeline_one_column += 'div.photoUnit { margin: 0px; }';
//timeline_one_column += '.sidebarMode .fixed_elem.fbTimelineSideAds, .sidebarMode .fixed_elem.fbTimelineScrubber { margin-right: 0px; left: 0px; }';
timeline_one_column += '.fbTimelineTimePeriod { background-position: 12px 0px; }';
timeline_one_column += '.fbTimelineContentHeader { text-align: left; }';
timeline_one_column += '.uiCommentContainer { clear: both; }';
timeline_one_column += '.timelineUnitContainer .videoUnit { margin-left: inherit; }';
timeline_one_column += '.externalShareUnitWrapper { margin-top: 25px; clear: both; }';
//timeline_one_column += '.externalShareUnit { width: 410px; float: right; }';
timeline_one_column += '.externalShareUnitWrapper:nth-child(2) { float: left; }';
timeline_one_column += '';
// Bring friends container to left
timeline_one_column += '.fbTimelineIndeterminateContent { float: left !important; }';
// Bring spacing on the left to the friends container 
timeline_one_column += '#pagelet_timeline_ego_box { position: relative; left: 13px; }'; 
timeline_one_column += '.fbTimelineTwoColumn .photoUnit .photoWidth1 .photoWrap { height: inherit; }';
timeline_one_column += '.uiScaledThumb .photo .uiScaledImageContainer { overflow: inherit; }';
}
// Unfix header positioning
var scrollingheader = '';
if (GM_getValue('facebookenhancer_scrollingheader_active')) {
scrollingheader += '';
}
// Hide Facebook ads
var hide_page_ads = '';
if (GM_getValue('facebookenhancer_adshide_active')) {
hide_page_ads += '#pagelet_side_ads { display: none; }';
hide_page_ads += '#pagelet_ego_pane_w { display: none; }';
hide_page_ads += '#pagelet_ego_pane { display: none; }';
hide_page_ads += '#pagelet_side_ads { display: none; }';
}
// Hide inactive friends
var hide_inactive_friends = '';
if (GM_getValue('facebookenhancer_friendshide_active')) {
hide_inactive_friends += '.active { display: block !important; }';
if (!GM_getValue('facebookenhancer_friendshide_mobile')) {
hide_inactive_friends += '.mobile { display: block !important; }';
}
hide_inactive_friends += '.item { display: none; }';
}
var fbenhancer_updater = '';
fbenhancer_updater += '.fbenhancer_update_beeper { top: 30px; left: 15px; position: fixed; width: 230px; z-index: 99; border-radius: 3px 3px 3px 3px; -webkit-border-radius: 3px 3px 3px 3px; -moz-border-radius: 3px 3px 3px 3px; -o-border-radius: 3px 3px 3px 3px; background-color: #E1E6EE; border: 1px solid #99A8C7; margin: 0; padding: 3px; }';
fbenhancer_updater += '.fbenhancer_update_beeptitle { padding: 5px 0; }';
fbenhancer_updater += '.fbenhancer_update_beepicon { float: left; height: 20px; margin: 10px 20px 10px 10px; text-align: center; width: 20px; }';
var css = timeline_one_column + hide_page_ads + hide_inactive_friends + fbenhancer_updater;
var newstyle = document.createElement("style");
newstyle.type = 'text/css';
newstyle.appendChild(document.createTextNode(css));
document.body.appendChild(newstyle);
}

// Only activate if Domain is Facebook
if (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com") {
 if (typeof(GM_getValue('facebookenhancer_autoupdate_active')) == 'undefined') {
	 		GM_setValue('facebookenhancer_autoupdate_active', true);
 }
 // If autoupdate is deactivated do not try to get update
 if (!GM_getValue('facebookenhancer_autoupdate_active')) {
 window.addEventListener('DOMContentLoaded', facebook_enhance, false);
 }
 else {
	 var currentdate = parseInt(+new Date());
	 // Try to update if never updated or last update was before 10800 seconds
	 if ((typeof(GM_getValue('facebookenhancer_lastupdate')) == 'undefined') || (parseInt(GM_getValue('facebookenhancer_lastupdate')) < (currentdate + 10800))) {
		GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://tobias-nase.de/enhancerf/version.xml",
		  onload: function(facebook_script_version_request) {
		  // If update do try to update on load
		  if (facebook_script_version_request.readyState != 4) return;  
		  if (facebook_script_version_request.status != 200) return;
		  var versionnumber = facebook_script_version_request.responseText;
		  // Set new lastupdate date
		  GM_setValue('facebookenhancer_lastupdate', currentdate.toString());
		  GM_setValue('facebookenhancer_update_version', versionnumber);
		  // Add loading event
		  window.addEventListener('DOMContentLoaded', facebook_enhance, false);
		  }
		});
	 }
	 else {
		  // Add loading event
		  if (document.body) {
				facebook_enhance();
		  }
		  else {
		  window.addEventListener('DOMContentLoaded', facebook_enhance, false);
		  }
	 }
 }
}

})();

// End