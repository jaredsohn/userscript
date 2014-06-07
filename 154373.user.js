/*
Geocaching - Icon Chooser
http://www.lildevil.org/greasemonkey/icon-chooser

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
Version 1.1		Reduce icon flicker when page loads
Version 1.0		Initial Release
*/

// ==UserScript==
// @name          GC Icon Chooser
// @description   Choose icons to replace the default ones on geocaching.com.
// @namespace     http://www.lildevil.org/greasemonkey/
// @version       1.1
// @copyright     2012, Lil Devil
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon          http://www.lildevil.org/greasemonkey/images/IC-icon.png
// @downloadURL   https://userscripts.org/scripts/source/154373.user.js
// @updateURL     http://userscripts.org.nyud.net/scripts/source/154373.meta.js
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @run-at        document-start
// @include       http://www.lildevil.org/greasemonkey/versions*
// @include       http://www.geocaching.com/*
// ==/UserScript==

/*jshint bitwise:true, browser:true, curly:true, eqeqeq:true, evil:true, forin:true, funcscope:true, immed:true, noarg:true, noempty:false, smarttabs:true, strict:false, sub:true, undef:false, unused:false */

(function(){

var SCRIPT_NAME			= 'GC Icon Chooser',
	SCRIPT_VERSION		= '1.1',
	SCRIPT_ABBREV		= SCRIPT_NAME.replace(/[^A-Z]/g, ''),
	RUNNING_AS_EXTENSION= false,
	CURRENT_LANGUAGE	= Determine_Website_Language();

Check_for_Update();
Add_Prototypes();

var sourceBase = 'http://www.geocaching.com/images/',
	targetBase = 'http://www.lildevil.org/GC-images/';
var iconArray = [
				{header:'Log Types'},
				{name:'Found it',							icons:['logtypes/2.png',							'logtypes/2004/icon_smile.gif',		'logtypes/2000/icon_happy.gif']},
				{name:'Attended',							icons:['logtypes/10.png',	'thebruce0/10.png',		'logtypes/2005/icon_attended.gif']},
				{name:'Webcam Photo Taken',					icons:['logtypes/11.png',	'thebruce0/11.png',		'logtypes/2004/icon_camera.gif',	'logtypes/2000/icon_camera.gif']},
				{name:"Didn't find it",						icons:['logtypes/3.png',	'thebruce0/3.png',		'logtypes/2004/icon_sad.gif',		'logtypes/2000/icon_sad.gif']},

				{name:'Enable Listing',						icons:['logtypes/23.png',							'logtypes/2005/icon_enabled.gif']},
				{name:'Temporarily Disable Listing',		icons:['logtypes/22.png',							'logtypes/2005/icon_disabled.gif']},

				{name:'Needs Archived',						icons:['logtypes/7.png',	'thebruce0/7.png',		'logtypes/2004/icon_remove.gif']},
				{name:'Archive',							icons:['logtypes/5.png',	'logtypes/2012/7.png',	'logtypes/2004/traffic_cone.gif']},
				{name:'Unarchive',							icons:['logtypes/12.png',							'logtypes/2004/traffic_cone.gif']},

				{name:'Publish Listing',					icons:['logtypes/24.png',							'logtypes/2005/icon_greenlight.gif']},
				{name:'Retract Listing',					icons:['logtypes/25.png',							'logtypes/2005/icon_redlight.gif']},

				{name:'Needs Maintenance',					icons:['logtypes/45.png',							'logtypes/2006/icon_needsmaint.gif','logtypes/2006/icon_needsmaint2.gif']},
				{name:'Owner Maintenance',					icons:['logtypes/46.png',	'thebruce0/46.png',		'logtypes/2006/icon_maint.gif']},

				{name:'Announcement',						icons:['logtypes/74.png',	'thebruce0/74.png',		'logtypes/2010/icon_announcement.jpg']},
				{name:'Post Reviewer Note (before Publish)',icons:['logtypes/18.png',	'thebruce0/68.png',		'logtypes/2004/big_smile.gif'],		css_prop:'background-size:16px auto !important;' },
				{name:'Post Reviewer Note (after Publish)',	icons:['logtypes/68.png',	'thebruce0/68.png',		'logtypes/2004/big_smile.gif'],		css_prop:'background-size:16px auto !important;' },
				{name:'Submit for Review',					icons:['logtypes/76.png',	'thebruce0/68.png',		'logtypes/2004/big_smile.gif'],		css_prop:'background-size:16px auto !important;' },
				{name:'Update Coordinates',					icons:['logtypes/47.png',	'thebruce0/47.png',		'logtypes/2006/coord_update.gif']},
				{name:'Will Attend',						icons:['logtypes/9.png',	'thebruce0/9.png',		'logtypes/2005/icon_rsvp.gif']},
				{name:'Write Note',							icons:['logtypes/4.png',	'thebruce0/4.png',		'logtypes/2004/icon_note.gif',		'logtypes/2000/icon_note.gif']},

				{pragma:'newcol'},
				{header:'Trackables'},
				{name:'Travel Bug',					icons:['wpttypes/sm/21.gif',				'tb/2011/tb.gif']},
				{name:'TB / Coin',					icons:['icons/16/trackable_inventory.png',	'tb/2011/tb_coin.gif']},
				{name:'Retrieved',					icons:['logtypes/13.png',					'tb/2011/retrieved.gif']},
				{name:'Placed',						icons:['logtypes/14.png',					'tb/2011/placed.gif']},
				{name:'Discovered',					icons:['logtypes/48.png',					'tb/2011/discovered.gif']},
				{name:'Grabbed',					icons:['logtypes/19.png',					'tb/2011/grabbed.gif']},
				{name:'Visited',					icons:['logtypes/75.png',					'tb/2011/visited.jpg']},
				{name:'Mark missing',				icons:['logtypes/16.png',					'tb/2011/missing.png']},

				{header:'Cache Lists'},
				{name:'Favorites',					icons:['icons/icon_fav.png',			'other/icon_fav.png']},
				{name:'My Cache',					icons:['icons/16/placed.png',			'silk/star.png']},
				{name:'Found It!',					icons:['icons/icon_smile.png',			'logtypes/2004/icon_smile.gif',		'logtypes/2000/icon_happy.gif',	'other/found_checkmark.gif']},
				{name:'Needs Maintenance',			icons:['icons/16/maintenance.png',		'logtypes/2006/icon_needsmaint.gif','logtypes/2006/icon_needsmaint2.gif', 'attributes/firstaid-yes.gif'],	css_prop:'background-size:16px auto !important;' },
				{name:'Premium Member Only',		icons:['icons/16/premium_only.png',		'other/prem_only.png']},
				{name:'Send To GPS',				icons:['sendtogps/sendtogps_icon.png',	'other/sendtogps.gif']},

				{pragma:'newcol'},
				{header:'Navigation'},
				{name:'Log your visit',				icons:['icons/16/write_log.png',		'silk/comment_add.png']},
				{name:'Watch Listing',				icons:['icons/16/watch.png',			'other/icon_watchlist.gif'],		css_style:'p.WatchIcon { background:url("%iconpath%") no-repeat transparent 0 1em !important;}'},
				{name:'Remove from Watchlist',		icons:['icons/16/stop_watching.png',	'other/icon_stop_watchlist.gif']},
				{name:'Edit Listing',				icons:['icons/16/edit.png',				'stockholm/16x16/page_white_edit.gif']},
				{name:'Edit Attributes',			icons:['icons/16/edit_attributes.png',	'stockholm/16x16/edit_attribute.gif']},
				{name:'Waypoints',					icons:['icons/16/waypoints.png',		'stockholm/16x16/flag.gif']},
				{name:'Upload Images',				icons:['icons/16/photo.png',			'stockholm/16x16/add_image.gif']},
				{name:'Archive Listing',			icons:['icons/16/archive.png',			'logtypes/2012/7.png',				'logtypes/2004/traffic_cone.gif']},
				{name:'Unarchive Listing',			icons:['icons/16/unarchive.png',		'logtypes/2004/traffic_cone.gif']},
				{name:'Enable Listing',				icons:['icons/16/enable.png',			'logtypes/2005/icon_enabled.gif']},
				{name:'Disable Listing',			icons:['icons/16/disable.png',			'logtypes/2005/icon_disabled.gif']},
				{name:'Ignore Listing',				icons:['icons/16/ignore.png',			'silk/cross.png']},
				{name:'Bookmark Listing',			icons:['icons/16/bookmark_list.png',	'stockholm/16x16/book_open_mark.gif']},
				{name:'View Review Page',			icons:['icons/16/view_review_page.png'],										hide:true},
				{name:'View Archived Logs',			icons:['icons/16/archived_log.png',		'stockholm/16x16/archived_logs.gif'],	hide:true},

				{header:'Users'},
				{name:'Regular',					icons:['icons/reg_user.gif',			'other/reg_user.gif'],			css_prop:'margin-right:0 !important;'},
				{name:'Premium',					icons:['icons/prem_user.gif',			'other/prem_user.gif'],			css_prop:'margin-right:0 !important;'},
				{name:'Charter!',					icons:['icons/ch_user.gif',				'other/ch_user.gif'],			css_prop:'margin-right:0 !important;'},
				{name:'Reviewer',					icons:['icon_reviewer.gif',				'other/icon_reviewer.gif'],		css_prop:'margin-right:0 !important;'},
				{name:'Lackey',						icons:['icon_admin.gif',				'other/icon_admin.gif'],		css_prop:'margin-right:0 !important;'},
				{name:'Edit Profile',				icons:['icons/16/edit_profile.png',		'silk/user_edit.png'],			css_style:'a.EditProfileLink { background:url("%iconpath%") no-repeat transparent 0 0 !important; padding-top:2px; }'},

				{pragma:'newcol'},
				{header:'Other'},
				{name:'Difficulty/Terrain',			icons:['stars/stars',					'stars/orange/stars'],	stars_special_case:true },
				{name:'Driving Directions',			icons:['icons/16/directions.png',		'silk/car.png']},
				{name:'Print',						icons:['icons/16/print.png',			'silk/printer.png']},
				{name:'Help',						icons:['icons/16/help.png',				'silk/help.png']},
				{name:'Personal Cache Note',		icons:['icons/16/user_note.png',		'other/user_note_orange.png',	'silk/note.png'],	css_style:'legend.note, p.ReviewerNote a { background:url("%iconpath%") no-repeat transparent !important;}'},
				{name:'Who favorited',				icons:['icons/16/view_user.png',		'silk/group_go.png']},
				{name:'Map',						icons:['icons/16/view_map.png',			'silk/map.png']},
				{name:'Remove',						icons:['icons/16/delete.png',			'other/icon_trashcan.gif']}

				// when adding additional images, always add at end otherwise previous choices array will not index correctly
			];

 // since we're running at document-start, we can't get the current logged in user,
 // so store and use the previous one
var Login_Name = LD_getValue('Last_Login_Name', ''),
	Last_Login_Name = Login_Name,
	DEBUG = (Login_Name === 'Lil Devil' || Login_Name === 'Hemlock');

 // the advantage to running at document-start, is we can set CSS before the page renders, thus eliminating flicker
window.addEventListener('storage', Set_All_Icons_CSS, false);
Set_All_Icons_CSS();

 // a few global vars for drag and drop support
var dragTarget = null;	// The target object
var dragXoffset = 0;	// How much we've moved the element on the horizontal
var dragYoffset = 0;	// How much we've moved the element on the vertical
GM_registerMenuCommand('Icon Chooser', LD_Open_Options_Window);

 // set an event to fire when the page is actually loaded
window.addEventListener('DOMContentLoaded', function(e) {
	Login_Name = Get_Logged_In_Username();
	DEBUG = (Login_Name === 'Lil Devil' || Login_Name === 'Hemlock');

	if(Last_Login_Name != Login_Name) {
		LD_setValue('Last_Login_Name', Login_Name);
		Set_All_Icons_CSS();
	}

	Set_Icons_Clickable(document);

	// if we're on the cache page, create an observer to watch for more logs getting added to the page
	var logsTable = document.querySelector('#cache_logs_table');
	if (logsTable) {
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type === 'childList') {
					Set_Icons_Clickable(mutation.target);
				}
			});
		});
		observer.observe(logsTable, { childList:true, subtree:true });
	}
}, false);

function Set_Icons_Clickable(obj) {
	for (var i=0; i<iconArray.length; i++) {
		if (iconArray[i].hasOwnProperty('icons')) {
			var iconList = obj.querySelectorAll('img[src*="' + iconArray[i].icons[0] + '"]:not([LD-iconIndex])');
			// use :not([LD-iconIndex]) so we don't work on images we already worked on
			if (iconList.length > 0) {
//				Debug_Log('iconIndex=', i, '  iconList.length=', iconList.length);
			}
			for (var p=0; p<iconList.length; p++) {
				iconList[p].setAttribute('LD-iconIndex', i);
				iconList[p].addEventListener('click', SwitchIcon, false);
			}
		}
	}
}

function SwitchIcon(e) {
	if (!e) { e = window.event; }

	if (!e.shiftKey) { return; }

	e.cancelBubble = true;
	if (e.stopPropagation) { e.stopPropagation(); }
	if (e.preventDefault)  { e.preventDefault(); }

	var iconIndex = parseInt(this.getAttribute('LD-iconIndex'), 10);
	if (isNaN(iconIndex)) { return; }

	var iconChoices = JSON.parse(LD_getValue('iconChoices', '[]', Login_Name));
	var iconChoice = iconChoices[iconIndex];
	iconChoice++;
	iconChoice %= iconArray[iconIndex].icons.length;
	iconChoices[iconIndex] = iconChoice;

	LD_setValue('iconChoices', JSON.stringify(iconChoices), Login_Name);

	Set_One_Icon_CSS(iconIndex, iconChoice);
}

function Set_All_Icons_CSS(e) {
	if (e && e.key && !e.key.match(/iconChoices/)) { Debug_Log('unrecognized storage event: ', e.key); return; }
	var iconChoices = JSON.parse(LD_getValue('iconChoices', '[]', Login_Name));

	var len = iconChoices.length;
	while (iconChoices.length < iconArray.length) {
		iconChoices.push(0);
	}
	if (iconChoices.length !== len) {
		LD_setValue('iconChoices', JSON.stringify(iconChoices), Login_Name);
	}

	for (var i=0; i<iconChoices.length; i++) {
		Set_One_Icon_CSS(i, iconChoices[i]);
	}
}

function Set_One_Icon_CSS(thisIndex, thisChoice) {
	if (!iconArray[thisIndex] || !iconArray[thisIndex].icons) { return; }	// error probably because the iconArray was re-ordered

	var sourcePath = iconArray[thisIndex].icons[0],
		targetPath = targetBase + iconArray[thisIndex].icons[thisChoice];

	if (thisChoice === 0) {
		LD_removeNode('LD-iconStyle-' + thisIndex);
	} else if (iconArray[thisIndex].stars_special_case) {		// special case for stars

		LD_addStyle('img[src*="' + sourcePath + '1.gif"]   { background-image:url(' + targetPath + '1.gif) !important; }' +
					'img[src*="' + sourcePath + '1_5.gif"] { background-image:url(' + targetPath + '1_5.gif) !important; }' +
					'img[src*="' + sourcePath + '2.gif"]   { background-image:url(' + targetPath + '2.gif) !important; }' +
					'img[src*="' + sourcePath + '2_5.gif"] { background-image:url(' + targetPath + '2_5.gif) !important; }' +
					'img[src*="' + sourcePath + '3.gif"]   { background-image:url(' + targetPath + '3.gif) !important; }' +
					'img[src*="' + sourcePath + '3_5.gif"] { background-image:url(' + targetPath + '3_5.gif) !important; }' +
					'img[src*="' + sourcePath + '4.gif"]   { background-image:url(' + targetPath + '4.gif) !important; }' +
					'img[src*="' + sourcePath + '4_5.gif"] { background-image:url(' + targetPath + '4_5.gif) !important; }' +
					'img[src*="' + sourcePath + '5.gif"]   { background-image:url(' + targetPath + '5.gif) !important; }' +

					'img[src*="' + sourcePath + '"] {' +
						'background-repeat:no-repeat !important; background-color:transparent !important;' +
						'height:0 !important; width:0 !important; overflow: hidden !important;' +
						'padding:0 0 13px 61px !important; border:0 !important; }',
					'LD-iconStyle-' + thisIndex);

	} else {
		LD_addStyle(				'img[src$="' + sourcePath + '"]:not([iconChoice]),' +
					'input[type="image"][src$="' + sourcePath + '"]' +
					(iconArray[thisIndex].hasOwnProperty('css_selector') ? ',' + iconArray[thisIndex].css_selector : '') +
					'{' +
						'background: url(' + targetPath + ') no-repeat transparent !important;' +
						'background-position:center center !important;' +
						'padding:0 0 16px 16px !important; border:0 !important;' +
						'height:0 !important; width:0 !important; overflow: hidden !important;' +
						(iconArray[thisIndex].hasOwnProperty('css_prop') ? iconArray[thisIndex].css_prop : '') +
					'}' +
					(iconArray[thisIndex].hasOwnProperty('css_style') ? iconArray[thisIndex].css_style.replace('%iconpath%', targetPath) : ''),
					'LD-iconStyle-' + thisIndex);
	}
}

function moveHandler(e){
	if (!e) { e = window.event; }
	dragTarget.parentNode.style.left = e.clientX - dragXoffset + 'px';
	dragTarget.parentNode.style.top  = e.clientY - dragYoffset + 'px';
	e.preventDefault();
}

function dragEnd(e) {
	document.removeEventListener('mousemove', moveHandler, false);
	document.removeEventListener('mouseup', dragEnd, false);
	dragTarget.style.cursor = '';
	var position = {
				x : parseInt(dragTarget.parentNode.style.left, 10),
				y : parseInt(dragTarget.parentNode.style.top,  10)
			};
	LD_setValue('Options_Position', JSON.stringify(position), Login_Name);
}

function dragStart(e){
	if (!e) { e = window.event; }
	if (e.button > 0) { return; }
	dragTarget = e.target || e.srcElement;
	if (dragTarget.className.match(/(^|\s)dragable(\s|$)/)) {
		dragTarget.style.cursor = 'move';
		dragXoffset = e.clientX - parseInt(dragTarget.parentNode.style.left, 10);
		dragYoffset = e.clientY - parseInt(dragTarget.parentNode.style.top,  10);

		document.addEventListener('mousemove', moveHandler, false);
		document.addEventListener('mouseup', dragEnd, false);
		e.preventDefault();
	}
}

function LD_Open_Options_Window() {
	var optionsWindow = $('IC_Options');
	if (!optionsWindow) {
		optionsWindow = Create_Options_Window();
	}

	var positionStr = LD_getValue('Options_Position', '{"x":-99,"y":-99}', Login_Name);
	var windowPosition = JSON.parse(positionStr);

	// open window first so subsequent window measurements will work
	optionsWindow.style.display = '';

	// set position to center if any edge is off the the screen
	if ((windowPosition.x < 0) ||
		(windowPosition.y < 0) ||
		(windowPosition.x + optionsWindow.offsetWidth  > window.innerWidth) ||
		(windowPosition.y + optionsWindow.offsetHeight > window.innerHeight) ) {
			windowPosition.x = (window.innerWidth  - optionsWindow.offsetWidth)  / 2;
			windowPosition.y = (window.innerHeight - optionsWindow.offsetHeight) / 2;
	}
	optionsWindow.style.left = windowPosition.x + 'px';
	optionsWindow.style.top  = windowPosition.y + 'px';

	var blackoutDiv = $('IC_Blackout');
	blackoutDiv.style.opacity = 0;
	blackoutDiv.style.display = '';
	var op = 0;
	var si = window.setInterval(function() {
		op += 0.04;
		blackoutDiv.style.opacity = op;
		if (op >= 0.55) {
			window.clearInterval(si);
		}
	}, 40);
}

function LD_Close_Options_Window() {
	LD_removeNode('IC_Options');
	LD_removeNode('IC_Blackout');
}

function Save_Options() {
	var optionsTable = document.querySelector('#IC_Options table');
	var iconChoices = JSON.parse(LD_getValue('iconChoices', '[]', Login_Name));

	for (var i=0; i<iconChoices.length; i++) {
		var selectedIcon = document.querySelector('td.currentChoice[iconIndex="' + i + '"]');
		if (selectedIcon) {
			var choice = parseInt(selectedIcon.getAttribute('iconChoice'), 10);
			iconChoices[i] = choice;
			Set_One_Icon_CSS(i, choice);
		}
	}

	LD_setValue('iconChoices', JSON.stringify(iconChoices), Login_Name);
	LD_Close_Options_Window();
}

function toggleCell(e) {
	// 'this' is the <td> cell clicked on

	var iconIndex  = this.getAttribute('iconIndex');
//	Debug_Log('iconIndex=', iconIndex);
	var iconChoice = this.getAttribute('iconChoice');
//	Debug_Log('iconChoice=', iconChoice);
	var iconGroup  = this.parentNode.querySelectorAll('td[iconIndex="' + iconIndex + '"]');
//	Debug_Log('iconGroup=', iconGroup);

	for (var i=0; i < iconGroup.length; i++) {
		iconGroup[i].className = iconGroup[i].className.replace(/\s*currentChoice/i,'');
		if (iconGroup[i].getAttribute('iconChoice') == iconChoice) {
			iconGroup[i].className += ' currentChoice';
		}
	}
}

function Insert_Cell(rowObj, cellIndex) {
//	Debug_Log('rowObj=', rowObj, 'length=', rowObj.cells.length, 'cellIndex=', cellIndex);
	while (rowObj.cells.length <= cellIndex) {
		var cell = rowObj.insertCell(-1);
	}
	return cell;
}

function Insert_or_Get_Row(tableObj, rowIndex) {
//	Debug_Log('tableObj=', tableObj, 'length=', tableObj.rows.length, 'rowIndex=', rowIndex);
	if (tableObj.rows.length > rowIndex) {
		return tableObj.rows[rowIndex];
	}
	while (tableObj.rows.length <= rowIndex) {
		var row = tableObj.insertRow(-1);
	}

	return row;
}

function Create_Options_Window() {
	LD_addStyle('#IC_Options {  position:fixed; background-color:#F5F5F5; z-index:1000;' +
								'border:5px ridge #448E35;' +
								'box-shadow:20px 20px 10px rgba(0,0,0,0.5); }' +
				'#IC_Options .title { font-weight:bold; padding:0.5em 1em; border-bottom:1px solid #448E35;' +
									'background-color:#C6E3C0; color:black; white-space:nowrap; text-align:center; }' +
				'#IC_Options label  { font-weight:normal; white-space:nowrap; }' +
				'#IC_Options table  { border-spacing:2px; border-collapse:separate; }' +
				'#IC_Options td.sectionHeader { text-align:right; white-space:nowrap; font-weight:bold; }' +
				'#IC_Options td.iconName      { text-align:right; white-space:nowrap; padding:0 6px; line-height:1; }' +
				'#IC_Options td.iconImg       { background-repeat:no-repeat; background-color:transparent;' +
												'background-position:center center;' +
												'padding:0; border:0;' +
												'height:22px; width:26px; overflow: hidden;' +
											'}' +
				'#IC_Options td.currentChoice { outline:thin solid #448E35; }' +
				'#IC_Blackout {   position:fixed; background-color:black; z-index:998;' +
								' left:0; top:0; width:100%; height:100%; opacity:0; }',
				'IC_Options_css');

	var iconChoices = JSON.parse(LD_getValue('iconChoices', '[]', Login_Name));
	var optionsWindow = newElement('div', { id : 'IC_Options' });

	optionsWindow.appendChild(newElement('div', {	'class'		: 'title dragable',
													onmousedown : dragStart },
									newElement('Icon Chooser')));
	var optionsDiv = newElement('div', { style	: 'margin:1em;'});
	var iconTable = newElement('table', { style : 'margin:0 auto 1em;' } );

	var row = 0,
		colSectionStart = 0,
		maxIcons = 0;

	for (var i=0; i<iconArray.length; i++) {

		var thisRowObj, thisCellObj;

		if (iconArray[i].pragma === 'newcol') {
			// start at the top of the next column
			row = 0;
			colSectionStart += maxIcons + 1;

		} else if (iconArray[i].hide) {
			continue;

		} else if (iconArray[i].header) {
			// apply a header
			if (row !== 0) { row++; }	// add a blank line above the header
			thisRowObj = Insert_or_Get_Row(iconTable, row);
			thisCellObj = Insert_Cell(thisRowObj, colSectionStart);
			thisCellObj.appendChild(newElement(iconArray[i].header) );
			thisCellObj.className = 'sectionHeader';

			row++;

		} else {
			thisRowObj  = Insert_or_Get_Row(iconTable, row);
			thisCellObj = Insert_Cell(thisRowObj, colSectionStart);
			thisCellObj.appendChild(newElement(iconArray[i].name));
			thisCellObj.className = 'iconName';

			for (iconChoice=0; iconChoice<iconArray[i].icons.length; iconChoice++) {
				thisCellObj = Insert_Cell(thisRowObj, colSectionStart + iconChoice + 1);
				thisCellObj.setAttribute('iconIndex', i);
				thisCellObj.setAttribute('iconChoice', iconChoice);
				thisCellObj.className = 'iconImg';
				if (iconArray[i].hasOwnProperty('css_prop')) {
					thisCellObj.setAttribute('style', iconArray[i].css_prop);
				}

				var backImg = 'url(' + ((iconChoice === 0) ? sourceBase : targetBase) + iconArray[i].icons[iconChoice];
				if (iconArray[i].stars_special_case) { backImg += '5.gif'; }

				if ((iconChoices[0] === 0) && (iconChoice === 0)) {
					// if first time opening this window, and this is a geocaching.com image, then force reload of the image
					backImg += '?reload=' + new Date().getTime().toString();
				}

				backImg += ')';
				thisCellObj.style.backgroundImage = backImg;

				thisCellObj.addEventListener('click', toggleCell, false);

				if (iconChoice === iconChoices[i]) {
					thisCellObj.className += ' currentChoice';
				}
			}
			maxIcons = Math.max(maxIcons, iconArray[i].icons.length);
			row++;
		}
	}

	iconChoices[0] = 1;		// set flag
	LD_setValue('iconChoices', JSON.stringify(iconChoices), Login_Name);

	optionsDiv.appendChild(iconTable);
	optionsDiv.appendChild(newElement('p', { style : 'text-align:center; margin:0;' },
									newElement('button', { onclick	: Save_Options }, newElement('Save')),
									newElement('button', { onclick	: LD_Close_Options_Window,
															style	: 'margin-left:5em;' }, newElement('Cancel')) ));
	optionsWindow.appendChild(optionsDiv);
	document.body.appendChild(optionsWindow);

	var blackoutDiv = newElement('div', { id : 'IC_Blackout' });
	document.body.appendChild(blackoutDiv);

	return optionsWindow;
}

function Add_Prototypes() {
	String.prototype.repeat = function(len) {
		return Array(len + 1).join(this);
	};

	String.prototype.zeroPad = function(len) {
		return '0'.repeat(len - this.length) + this;
	};

	Number.prototype.zeroPad = function(len) {
		return this.toString().zeroPad(len);
	};
}

function Debug_Log() {
	if (DEBUG) {
		var now = new Date();
		var args = Array.slice(arguments);
		args.unshift(now.toLocaleTimeString().slice(0, -3) + '.' + now.getMilliseconds().zeroPad(3) + ': ');
		console.debug.apply(this, args);
	}
}

function Get_Logged_In_Username() {
	// check for new style login block
	var loginNameLink = document.querySelector('a.SignedInProfileLink, a.CommonUsername');
	if (loginNameLink) {
		return loginNameLink.textContent.trim();
	}

	// check for old style login block
	var loginLogoutLink =  document.querySelector('#ctl00_LoginUrl, #ctl00_ContentLogin_uxLoginStatus_uxLoginURL');
	if (loginLogoutLink) {
		loginNameLink = loginLogoutLink.parentNode.getElementsByTagName('a')[0];

		// if logged in, loginNameLink will be the link to the username
		// if not logged in, loginNameLink will be the same as loginLogoutLink
		if (loginLogoutLink != loginNameLink) {
			return loginNameLink.textContent.trim();
		}
	}
	return '';
}

function LD_addStyle(css, theID) {
//	Debug_Log(css);
	var styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	styleSheet.appendChild(document.createTextNode(css));
	if (theID) {
		LD_removeNode(theID);	// no duplicate IDs
		styleSheet.id = theID;
	}
	document.getElementsByTagName('head')[0].appendChild(styleSheet);
}

function LD_removeNode(node) {
	if (typeof node === 'string') {
		node = document.getElementById(node);
	}
	if (node) {
		node.parentNode.removeChild(node);
	}
}

function newElement() {
	if(arguments.length === 1) {
		return document.createTextNode(arguments[0]);
	} else {
		var newNode = document.createElement(arguments[0]),
			newProperties = arguments[1],
			prop, i;
		for (prop in newProperties) {
			if ((prop.indexOf('on') === 0) && (typeof newProperties[prop] === 'function')) {
				newNode.addEventListener(prop.substring(2), newProperties[prop], false);
			} else if (',innerHTML,outerHTML,textContent'.indexOf(','+prop) !== -1) {
				newNode[prop] = newProperties[prop];
			} else if ((',checked,disabled,selected'.indexOf(','+prop) !== -1) && !newProperties[prop]) {
				// value is false, which most browsers do not support, so don't set the property at all
			} else if (/\&/.test(newProperties[prop])) {
				newNode.setAttribute(prop, newProperties[prop].parseHTMLentities());
			} else {
				newNode.setAttribute(prop, newProperties[prop]);
			}
		}
		for(i=2; i<arguments.length; i++) {
			newNode.appendChild(arguments[i]);
		}
		return newNode;
	}
}

function $() {
	return document.getElementById(arguments[0]);
}

function Determine_Website_Language() {
	var selectedLanguage = document.querySelector('.selected-language');
	if (!selectedLanguage) { return 'en'; }

	switch (selectedLanguage.textContent.trim().slice(0, -1)) {
		case 'English'			: return 'en';	// English
		case 'Deutsch'			: return 'de';	// German
		case 'Français'			: return 'fr';	// French
		case 'Português'		: return 'pt';	// Portuguese
		case 'Ceština'			: return 'cs';	// Czech
		case 'Svenska'			: return 'sv';	// Swedish
		case 'Español'			: return 'es';	// Spanish
		case 'Italiano'			: return 'it';	// Italian
		case 'Nederlands'		: return 'nl';	// Dutch
		case 'Català'			: return 'ca';	// Catalan
		case 'Polski'			: return 'pl';	// Polish
		case 'Eesti'			: return 'et';	// Estonian
		case 'Norsk, Bokmål'	: return 'nb';	// Norwegian
		case '한국어'				: return 'ko';	// Korean
		case 'Magyar'			: return 'hu';	// Hungarian
		case 'Română'			: return 'ro';	// Romanian
		default					: return 'en';	// unknown
	}
}

function isNullOrUndefined(value) {
	return (value === null || typeof value === 'undefined');
	// this check is convenient because GM_getValue returns undefined if val doesn't exist, whereas localStorage.getItem returns null
}

function LD_addScript(source) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');

	if ((typeof source === 'string') && (source.substring(0,4) === 'http')) {
		script.src = source;
	} else {
		script.appendChild(document.createTextNode(source.toString()));
	}
	document.getElementsByTagName('head')[0].appendChild(script);
}

function LD_getValue(key, defaultVal, username) {
	if (!isNullOrUndefined(username)) {
		if (URL_Encode(username) !== '') {	// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + URL_Encode(username);
		} else {
			return defaultVal;
		}
	}
	var val = localStorage.getItem(SCRIPT_ABBREV + '_' + key);
	return isNullOrUndefined(val) ? defaultVal : val;
}

function LD_setValue(key, val, username) {
	if (!isNullOrUndefined(username)) {
		if (URL_Encode(username) !== '') {	// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + URL_Encode(username);
		} else {
			return;
		}
	}
	localStorage.setItem(SCRIPT_ABBREV + '_' + key, val);
}

function URL_Decode(str) {
	str += '';
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

function URL_Encode(str) {
	str = str.replace(/^\s+/,'');		// remove leading spaces
	str = str.replace(/\s+$/,'');		// remove trailing spaces
	str = str.replace(/\s+/g,' ');		// replace interior spaces with single space
	return encodeURIComponent(str).replace(/%20/g, '+');
}

function Check_for_Update() {
	// show current version number on http://www.lildevil.org/greasemonkey/versions
	var versObj = document.getElementById(SCRIPT_ABBREV + '_installed');
	if (versObj) {
		versObj.innerHTML = SCRIPT_VERSION;
		return;
	}

	var referer = document.location.toString().replace(/\?.*$/, ''), // strip query string
		checkURL = 'http://www.lildevil.org/greasemonkey/version-check.php?script=' +
					URL_Encode(SCRIPT_NAME) + '&version=' + SCRIPT_VERSION +
					'&lang=' + CURRENT_LANGUAGE +
					'&referer=' + encodeURIComponent(referer);

	var Check_Update_Response = function(JSONstring) {
		if (RUNNING_AS_EXTENSION) { return; }
			// The extension mechanism does the update checking for us, so don't report
			// anything here. This abort is after the query is sent so I can track
			// feature usage and browser popularity.

		if (!JSONstring) {
			console.log(SCRIPT_NAME, 'Updater: No response');
			return;
		}
		var scriptData = {};
		try {
			scriptData = JSON.parse(JSONstring);
		} catch (err) {
			// compatibility with older browsers (FF3.0, IE7)
			// this is very specialized to work with this known well-formatted JSON string
			// comprised of one non-nested object containing strings only
			var m, re = new RegExp('[{,]"(\\w+)":"(.*?)"', 'g');
			while ((m = re.exec(JSONstring))) {
				scriptData[m[1]] = m[2];
			}
		}
		if (scriptData.days) {
			LD_setValue('Update_Days', scriptData.days);
		} else {
			console.log(SCRIPT_NAME, 'Updater: Unable to parse response');
		}
		if (scriptData.message && scriptData.link) {
			if (window.confirm(URL_Decode(scriptData.message))) {
				scriptData.link = URL_Decode(scriptData.link);
				if (typeof PRO_openInTab !== 'undefined') {
					PRO_openInTab(scriptData.link, 1);
				} else {
					var newWin = window.open(scriptData.link, '_blank');
					if (!newWin || !newWin.top) {
						// popup blocked - open in same window instead
						window.location.href = scriptData.link;
					}
				}
			}
		}
	};
	var Request_PostMessage = function() {
		// If we got an error trying to send xmlhttpRequest,
		// it is probably because this browser doesn't support cross-domain requests
		// so we'll do it another way
		window.addEventListener('message', Check_PostMessage_Response, false);
		LD_addScript(checkURL + '&wrapper=pm');
	};
	var Check_PostMessage_Response = function(message) {
		window.removeEventListener('message', Check_PostMessage_Response, false);
		Check_Update_Response(message.data);
	};

	// avoid a flood of dialogs such as when opening a browser with multiple tabs open
	var now = new Date().getTime();
	var DOSpreventionTime = 2 * 60 * 1000;	// two minutes
	var lastStart = LD_getValue('Update_Start', 0);
	LD_setValue('Update_Start', now.toString());
	if (lastStart && (now - lastStart) < DOSpreventionTime) { return; }

	// time to check yet?
	var oneDay = 24 * 60 * 60 * 1000;
	var lastChecked = LD_getValue('Update_Last', 0);
	var checkDays = parseFloat(LD_getValue('Update_Days', 1));
	if (lastChecked && (now - lastChecked) < (oneDay * (checkDays || 1)) ) { return; }

	try {
		GM_xmlhttpRequest({
			method : 'GET',
			url : checkURL,
			headers : {
				'Referer' : referer,
				'User-Agent' : navigator.userAgent
			},
			onload: function(result) {
				Check_Update_Response(result.responseText);
			},
			onerror: Request_PostMessage
		});
	} catch (err) {
		Request_PostMessage();
	}
	LD_setValue('Update_Last', now.toString());
}
})();
