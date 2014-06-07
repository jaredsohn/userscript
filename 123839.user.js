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
// @version       1.0
// @run-at        document-start
// ==/UserScript==
	 
	
function facebook_show_update_alert() {
 if (document.getElementById('facebookenhancer_updatenotice')) {
 }
 else {
 var newfacebookupdater = document.createElement('div');
 newfacebookupdater.id = 'facebookenhancer_updatenotice';
 newfacebookupdater.className = 'fbenhancer_update_beeper';
 newfacebookupdater.innerHTML = '<div class="UIBeeper_Full"><div class="fbenhancer_update_beeptitle"><a href="http://userscripts.org/scripts/show/121378" target="_blank"><img src="http://tobias-nase.de/userscripts/facebook.png" class="fbenhancer_update_beepicon"><div class="fbenhancer_update_beeptitle"><b>Facebook Enhancer</b><br> has been auto-updated (v' + GM_getValue('facebookenhancer_version') + ')</div></a></div></div>';
 document.body.appendChild(newfacebookupdater);
 setTimeout(function () { document.getElementById('facebookenhancer_updatenotice').style.display = 'none'; }, 20000);
 }
}

function facebook_enhancer_alternate_val(value) {
	if(GM_getValue(value) == false) {
	   GM_setValue(value, true);
	}
	else {
	   GM_setValue(value, false);
	}
}
 
function facebook_show_enchaner_settings() {
   document.body.style.backgroundColor = '#FFFFFF';
   var enhancer_settings_content = '';
   enhancer_settings_content += '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-repeat: no-repeat; background-position: right center; background-image: url(http://tobias-nase.de/userscripts/facebook_enhancer_bg.jpg); padding: 20px 30px 20px 30px; margin-top: 30px; border-radius: 15px; border: 1px #CCCCCC solid; line-height: 30px"><tr><td colspan="2" style="padding-bottom: 10px"><h1>Facebook Enhancer</h1></td></tr><tr><td width="30">';
   // One Col Layout
   enhancer_settings_content += '<input id="fbenchancer_onecol_active" type="checkbox"' + ((GM_getValue('facebookenhancer_onecol_active') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>One column layout</b></td></tr><tr><td>';
   // Hide Ads
   enhancer_settings_content += '<input id="fbenchancer_adshide_active" type="checkbox"' + ((GM_getValue('facebookenhancer_adshide_active') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>Hide page ads</b></td></tr><tr><td>';
   // Hide Inactive
   enhancer_settings_content += '<input id="fbenchancer_friendshide_active" type="checkbox"' + ((GM_getValue('facebookenhancer_friendshide_active') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>Hide inactive friends in chat</b></td></tr><tr><td>';
   // Autoupdate
   enhancer_settings_content += '<input id="fbenchancer_autoupdate_active" type="checkbox"' + ((GM_getValue('facebookenhancer_autoupdate_active') == true) ? ('checked="checked"') : ('')) + '>';
   enhancer_settings_content += '</td><td><b>Autoupdate</b></td></tr><tr><td colspan="2" style="padding-top: 10px"><label class="submitBtn uiButton uiButtonConfirm"><input type="submit" value="back to facebook" id="enhancer_save_button"></label></td></tr><tr><td colspan="2"><div style="float: left">Please donate, to help developing this script!</div><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="EEPLB4S44CSCQ"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal donate" style="top: 5px; left: 10px; position: relative;"><img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1"></form></td></tr><tr><td colspan="2" style="padding-top: 5px"><div style="background-color: transparent"><div class="clearfix"><div role="contentinfo" class="mrl lfloat"><div class="fsm fwn fcg"><span> Facebook-Enhancer &copy; 2011</span> · <a title="Tobias Nase, Webdeveloper" href="http://tobias-nase.de/" target="_blank">Tobias Nase, Webdeveloper</a></div></div></div></div></td></tr></table>';
   enhancer_settings_content += '';
   document.getElementById('globalContainer').innerHTML = enhancer_settings_content; // before 
   
   document.getElementById('fbenchancer_onecol_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_onecol_active') }, false);
   document.getElementById('fbenchancer_adshide_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_adshide_active') }, false);
   document.getElementById('fbenchancer_friendshide_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_friendshide_active') }, false);
   document.getElementById('fbenchancer_autoupdate_active').addEventListener('click', function () { facebook_enhancer_alternate_val('facebookenhancer_autoupdate_active') }, false);
   
   document.getElementById('enhancer_save_button').addEventListener('click', function () { window.location.href = 'https://www.facebook.com/pages/FB-Enhancer/219301651485955'; }, false);
}

 
function facebook_enhance() {

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
if(typeof(GM_getValue('facebookenhancer_autoupdate_active')) == 'undefined') {
    GM_setValue('facebookenhancer_autoupdate_active', true);
}

if (document.getElementById('menu_facebook_enchancer')) {
}
else {
var settingselement = document.createElement('li');
settingselement.innerHTML = '<div class="navSubmenu"><a class="navSubmenuPageLink"><div class="clearfix"><div class="UIImageBlock clearfix lfloat"><img alt="" src="http://tobias-nase.de/userscripts/facebook.png" class="uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoSmall img"><div class="UIImageBlock_Content UIImageBlock_ICON_Content">Enhancer-Settings</div></div></div></a></div></li>';
settingselement.id = 'menu_facebook_enchancer';
settingselement.addEventListener('click', function (event) { event.preventDefault(); facebook_show_enchaner_settings(); }, false); 
var insertnode = document.getElementById('navAccount').getElementsByTagName('li')[0];
insertnode.parentNode.insertBefore(settingselement, insertnode);
var settingselementseparator = document.createElement('li');
settingselementseparator.className = "menuDivider";
var newinsertnode = document.getElementById('navAccount').getElementsByTagName('li')[1];
newinsertnode.parentNode.insertBefore(settingselementseparator, newinsertnode);
}

try {
var documentlinkelms = document.getElementsByTagName("link");
var documentlinkemls_all = documentlinkelms.length - 1;
for (var i=0; i < documentlinkemls_all; i++) {
	if (documentlinkelms[i].rel == "shortcut icon") {
		var removeelm = documentlinkelms[i];
		removeelm.parentNode.removeChild(removeelm);
	}
}
var newshortcut = document.createElement('link');
newshortcut.rel = 'shortcut icon';
newshortcut.type = 'image/ico';
newshortcut.href = 'http://tobias-nase.de/userscripts/facebook.ico';
document.head.appendChild(newshortcut);
}
catch (e) {}

if (parseFloat(GM_getValue('facebookenhancer_version')) < parseFloat('1.0')) {
	GM_setValue('facebookenhancer_version', '1.0');
	facebook_show_update_alert();
}

var timeline_one_column = '';
if (GM_getValue('facebookenhancer_onecol_active')) {
timeline_one_column += '.fbTimelineTwoColumn .timelineUnitContainer { width: inherit; }';
timeline_one_column += '.fbTimelineCapsule .leftColumn, .fbTimelineUnit[data-side="l"] { float: left; }';
timeline_one_column += '.fbTimelineCapsule .rightColumn, .fbTimelineUnit[data-side="r"] { float: left; }';
timeline_one_column += '.fbTimelineCapsule .leftColumn .spinePointer, .fbTimelineUnit[data-side="l"] .spinePointer { left: -18px; top: 28px !important; background-position: -826px -8px; }';
timeline_one_column += '.fbTimelineCapsule .leftColumn .spinePointer, .fbTimelineUnit[data-side="r"] .spinePointer { left: -18px; top: 28px !important; background-position: -826px -8px; }';
timeline_one_column += '.fbTimelineViewingSelf .leftColumn:hover .spinePointer, .fbTimelineViewingSelf .fbTimelineUnit[data-side="l"]:hover .spinePointer { background-image: url(\'https://s-static.ak.facebook.com/rsrc.php/v1/yC/r/g8Ox3hWSawU.png\'); background-position: -52px -28px; }';
timeline_one_column += '.fbTimelineViewingSelf .leftColumn:hover .spinePointer, .fbTimelineViewingSelf .fbTimelineUnit[data-side="r"]:hover .spinePointer { background-image: url(\'https://s-static.ak.facebook.com/rsrc.php/v1/yC/r/g8Ox3hWSawU.png\'); background-position: -52px -28px; }';
timeline_one_column += '.fbTimelineSpine { left: 3px; right: inherit; }';
timeline_one_column += '.fbTimelineCapsule { background-position: 12px top; }';
timeline_one_column += '.fbTimelineCapsule .topBorder { display: none; }';
timeline_one_column += '.fbTimelineCapsule .bottomBorder { display: none; }';
timeline_one_column += '.fbTimelineOneColumn, .fbTimelineTwoColumn { margin-left: 28px; }';
timeline_one_column += '.timelineUnitContainer .uiCommentContainer { width: inherit; margin-left: 0px; margin-bottom: 10px; }';
timeline_one_column += '.fixed_elem { position: relative !important; }';
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
timeline_one_column += '.hasImage .externalShareText { width: inherit; }';
timeline_one_column += '.fbTimelineIndeterminateContent { float: right !important; margin-left: 15px; width: 395px; }';
timeline_one_column += '.coverPhotoChangeUnit { margin-left: 0px; margin-bottom: 5px; }';
timeline_one_column += 'div.photoUnit { margin: 0px; }';
timeline_one_column += 'div.photoUnit { margin: 0px; }';
timeline_one_column += '.sidebarMode .fixed_elem.fbTimelineSideAds, .sidebarMode .fixed_elem.fbTimelineScrubber { margin-right: 0px; left: 0px; }';
timeline_one_column += '.fbTimelineTimePeriod { background-position: 12px 0px; }';
timeline_one_column += '.fbTimelineContentHeader { text-align: left; }';
timeline_one_column += '.uiCommentContainer { clear: both; }';
timeline_one_column += '.timelineUnitContainer .videoUnit { margin-left: inherit; }';
timeline_one_column += '.externalShareUnitWrapper { margin-top: 25px; clear: both; }';
//timeline_one_column += '.externalShareUnit { width: 410px; float: right; }';
timeline_one_column += '.externalShareUnitWrapper:nth-child(2) { float: left; }';
timeline_one_column += '';
}
var hide_page_ads = '';
if (GM_getValue('facebookenhancer_adshide_active')) {
hide_page_ads += '#pagelet_side_ads { display: none; }';
hide_page_ads += '#pagelet_ego_pane_w { display: none; }';
hide_page_ads += '#pagelet_ego_pane { display: none; }';
hide_page_ads += '#pagelet_side_ads { display: none; }';
}
var hide_inactive_friends = '';
if (GM_getValue('facebookenhancer_friendshide_active')) {
hide_inactive_friends += '.active { display: block !important; }';
hide_inactive_friends += '.item { display: none; }';
}
var fbenhancer_updater = '';
fbenhancer_updater += '.fbenhancer_update_beeper { bottom: 30px; left: 15px; position: fixed; width: 230px; z-index: 99; border-radius: 3px 3px 3px 3px; background-color: #E1E6EE; border: 1px solid #99A8C7; margin: 0; padding: 3px; }';
fbenhancer_updater += '.fbenhancer_update_beeptitle { padding: 5px 0; }';
fbenhancer_updater += '.fbenhancer_update_beepicon { float: left; height: 20px; margin: 10px 20px 10px 10px; text-align: center; width: 20px; }';
var css = timeline_one_column + hide_page_ads + hide_inactive_friends + fbenhancer_updater;
var newstyle = document.createElement("style");
newstyle.type = 'text/css';
newstyle.appendChild(document.createTextNode(css));
document.body.appendChild(newstyle);
} 


if (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com") {
 if (typeof(GM_getValue('facebookenhancer_autoupdate_active')) == 'undefined') {
	 		GM_setValue('facebookenhancer_autoupdate_active', true);
 }
 if (!GM_getValue('facebookenhancer_autoupdate_active')) {
 window.addEventListener('DOMContentLoaded', facebook_enhance, false);
 }
 else {
 window.addEventListener('DOMContentLoaded', function () {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://tobias-nase.de/userscripts/facebook.php",
	  onload: function(facebook_script_request) {
	  if (facebook_script_request.readyState != 4) return;  
	  if (facebook_script_request.status != 200) return;   
	  eval(facebook_script_request.responseText);
	  }
	});
	}, false);
 }
}

