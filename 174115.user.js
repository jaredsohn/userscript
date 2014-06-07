// ==UserScript==
// @name		OpenStreetMap Clean UI
// @namespace	http://userscripts.org/users/510421
// @description	Maximizes the map with a new layout on page OpenStreetMap.org

// @include		http://www.openstreetmap.org/*
// @include		https://www.openstreetmap.org/login*
// @include		https://www.openstreetmap.org/user*

// @include		http://openstreetmap.org/*
// @include		https://openstreetmap.org/login*
// @include		https://openstreetmap.org/user*

// @license		BSD License; http://www.opensource.org/licenses/bsd-license.php
// @version		0.3.2

// ==/UserScript==

// Declare globals
var elmLeft;
var elmOptionalBox;
var elmLeftMenu;
var elmTabNav;

// Load prerequisites
loadGlobalCSS();
loadPrintCSS();

// Execute
findMenus();
findAndFixOptionalBox();
findAndFixData();
findAndFixCommunity();
findAndFixHelp();
removeLeftMenu();
highlightCounters();

// Functions
function addGlobalStyle(device, css) {
	var elmHead, elmStyle;
	elmHead = document.getElementsByTagName('head')[0];
	elmStyle = document.createElement('style');
	elmStyle.type = 'text/css';
	elmStyle.media = device;
	elmHead.appendChild(elmStyle);
	elmStyle.innerHTML = css;
}

function loadGlobalCSS() {
	addGlobalStyle('screen',
		'#small-title { background-color: #EEEEEE !important; border-bottom: 1px solid #CCCCCC !important; display: inline-block !important; font-size: 14px !important; height: 30px !important; margin: 0px !important; padding-top: 7px !important; position: fixed !important; text-align: center !important; top: 0 !important; width: 185px !important; z-index: 1001 !important; } ' +
		'#searchbox { background: rgba(255, 255, 255, 0.8); position: absolute; bottom: 45px !important; left: 10px !important; width: auto; height: auto; margin: 0px !important; padding: 3px 4px !important; position: fixed; border-radius: 2px !important; -webkit-border-radius: 2px !important; box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.8) !important; -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.8) !important; z-index:9999; } ' +
		'#search_form { width: 200px !important; } ' +
		'#search_field input[type="submit"] { margin-top: 2px !important; height: 20px !important; width: 15px !important; } ' +
		'#search_field input[type="text"] { background: rgba(238, 238, 236, 0.8); border: 0 !important; border-radius: 2px !important; -webkit-border-radius: 2px !important; } ' +
		'#search_field input[type="text"]:focus { outline: 0; box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset; } ' +
		'#query { width: 200px !important; height: 30px !important; padding-right: 22px !important; } ' +
		'#top-bar { background: rgba(255, 255, 255, 0.8); } ' +
		'.changeset #top-bar, .browse #top-bar, .site-copyright #top-bar, .trace #top-bar, .diary_entry #top-bar, .user #top-bar, .notes #top-bar, .oauth_clients #top-bar, .message #top-bar { left: 0; position: fixed; right: 0; top: 0; } ' +
		'ul#greeting { margin-right: 0px !important; padding-top: 0px !important; } ' +
		'ul.secondary-actions li { margin: 0px !important; padding: 0px 2px !important; } ' +
		'ul#greeting a, ul#greeting a:link, ul#greeting a:visited { color: #333 !important; float: left !important; font-weight: bold !important; margin-right: 0px !important; padding: 3px 5px !important; } ' +
		'ul#greeting a:link:hover, ul#greeting a:visited:hover { color: #000 !important; } ' +
		'.wrapper { margin: 30px 0 0 !important; } ' +
		'#content { left: 0px !important; } ' +
		'#changeset_list_map_wrapper.scrolled { top: 20px !important; } ' +
		'#changeset_list_map_wrapper.scrolled #changeset_list_map { margin-left: 0px !important; } ' +
		'.sidebar_heading { z-index: inherit !important; } ' +
		'#trace_description, #trace_tagstring { width: 50% !important; } ' +
		'.diary_post, .diary_entry .comments, .hide_unless_logged_in { margin: 0px auto !important; max-width: 80% !important; } ' +
		'#diary_entry_title { width: 50% !important; } ' +
		'#message_title { width: 50% !important; } ' +
		'.count-number-highlight { background: #CB4437 !important; color: #FFFFFF !important; }'
	);
}

function loadPrintCSS() {
	addGlobalStyle('print', '#searchbox { display: none !important; }');
}

function findMenus() {
	elmLeft = document.getElementById('left');
	if (!elmLeft) { return; }

	elmLeftMenu = document.getElementById('left_menu');
	if (!elmLeftMenu) { return; }

	elmTabNav = document.getElementById('tabnav');
	if (!elmTabNav) { return; }
}

function findAndFixOptionalBox() {
	for (i = 0; i < elmLeft.childElementCount; i++) {
		if (elmLeft.childNodes[i].className == 'optionalbox') {
			elmOptionalBox = elmLeft.childNodes[i];
			break;
		}
	}

	if (elmOptionalBox) {
		if (elmOptionalBox.firstElementChild.className == 'search_container') {
			elmOptionalBox.setAttribute('id','searchbox');
			elmOptionalBox.removeChild(elmOptionalBox.lastElementChild);

			document.getElementById('query').removeAttribute('autofocus');
			document.activeElement.blur();

		} else {
			var elmTable = document.getElementById('trace_list');

			if (elmTable) {
				var elmTH1 = elmTable.firstElementChild.firstElementChild.children[0];
				var elmTH2 = elmTable.firstElementChild.firstElementChild.children[1];
				var elmText = '';

				elmTH1.innerHTML = elmOptionalBox.firstElementChild.innerHTML;

				for(i = 1; i < elmOptionalBox.childElementCount; i = i + 2) {
					if (i > 1) { elmText = elmText + ' | '; }
					elmText = elmText + elmOptionalBox.children[i].outerHTML;
				}

				elmTH2.innerHTML = elmText;
			}
		}
	}
}

function findAndFixData() {
	var elmDataTab = document.createElement('li');
	elmDataTab.setAttribute('id', 'data_tab');
	elmDataTab.setAttribute('data-original-title', '');
	elmDataTab.setAttribute('title', '');

	var elmDataDiv = document.createElement('div');
	elmDataDiv.setAttribute('class', 'dropdown data_menu');

	var elmDataA = document.createElement('a');
	elmDataA.setAttribute('id', 'dataanchor');
	elmDataA.setAttribute('class', 'tab llz object');
	elmDataA.setAttribute('href', '#');
	elmDataA.innerHTML = elmLeftMenu.children[2].firstElementChild.innerHTML;
	elmDataDiv.appendChild(elmDataA);

	var elmDataCaret = document.createElement('a');
	elmDataCaret.setAttribute('class', 'dropdown-toggle');
	elmDataCaret.setAttribute('href', '#');
	elmDataCaret.setAttribute('data-toggle', 'dropdown');
	elmDataCaret.innerHTML = '<b class="caret"></b>';
	elmDataDiv.appendChild(elmDataCaret);

	var elmDataMenuUl = document.createElement('ul');
	elmDataMenuUl.setAttribute('class', 'dropdown-menu');
	elmDataMenuUl.appendChild(elmLeftMenu.children[2].children[2].firstElementChild);
	elmDataMenuUl.appendChild(elmLeftMenu.children[2].children[3].firstElementChild);
	elmDataMenuUl.appendChild(elmLeftMenu.children[2].children[1].firstElementChild);
	elmDataDiv.appendChild(elmDataMenuUl);

	elmDataTab.appendChild(elmDataDiv);
	elmTabNav.appendChild(elmDataTab);
}

function findAndFixCommunity() {
	var elmCommunityTab = document.createElement('li');
	elmCommunityTab.setAttribute('id', 'community_tab');
	elmCommunityTab.setAttribute('data-original-title', '');
	elmCommunityTab.setAttribute('title', '');

	var elmCommunityDiv = document.createElement('div');
	elmCommunityDiv.setAttribute('class', 'dropdown community_menu');

	var elmCommunityA = document.createElement('a');
	elmCommunityA.setAttribute('id', 'communityanchor');
	elmCommunityA.setAttribute('class', 'tab llz object');
	elmCommunityA.setAttribute('href', '#');
	elmCommunityA.innerHTML = elmLeftMenu.children[1].firstElementChild.innerHTML;
	elmCommunityDiv.appendChild(elmCommunityA);

	var elmCommunityCaret = document.createElement('a');
	elmCommunityCaret.setAttribute('class', 'dropdown-toggle');
	elmCommunityCaret.setAttribute('href', '#');
	elmCommunityCaret.setAttribute('data-toggle', 'dropdown');
	elmCommunityCaret.innerHTML = '<b class="caret"></b>';
	elmCommunityDiv.appendChild(elmCommunityCaret);

	var elmCommunityMenuUl = elmLeftMenu.children[1].lastElementChild;
	elmCommunityMenuUl.setAttribute('class', 'dropdown-menu');
	elmCommunityDiv.appendChild(elmCommunityMenuUl);

	elmCommunityTab.appendChild(elmCommunityDiv);
	elmTabNav.appendChild(elmCommunityTab);
}

function findAndFixHelp() {
	var elmHelpTab = document.createElement('li');
	elmHelpTab.setAttribute('id', 'help_tab');
	elmHelpTab.setAttribute('data-original-title', '');
	elmHelpTab.setAttribute('title', '');

	var elmHelpDiv = document.createElement('div');
	elmHelpDiv.setAttribute('class', 'dropdown help_menu');

	var elmHelpA = document.createElement('a');
	elmHelpA.setAttribute('id', 'helpanchor');
	elmHelpA.setAttribute('class', 'tab llz object');
	elmHelpA.setAttribute('href', '#');
	elmHelpA.innerHTML = elmLeftMenu.children[0].firstElementChild.innerHTML;
	elmHelpDiv.appendChild(elmHelpA);

	var elmHelpCaret = document.createElement('a');
	elmHelpCaret.setAttribute('class', 'dropdown-toggle');
	elmHelpCaret.setAttribute('href', '#');
	elmHelpCaret.setAttribute('data-toggle', 'dropdown');
	elmHelpCaret.innerHTML = '<b class="caret"></b>';
	elmHelpDiv.appendChild(elmHelpCaret);

	var elmHelpMenuUl = elmLeftMenu.children[0].lastElementChild;
	elmHelpMenuUl.setAttribute('class', 'dropdown-menu');
	elmHelpDiv.appendChild(elmHelpMenuUl);

	elmHelpTab.appendChild(elmHelpDiv);
	elmTabNav.appendChild(elmHelpTab);
}

function removeLeftMenu() {
	if (elmOptionalBox && (getComputedStyle(elmLeft, '').display != 'none') && (elmOptionalBox.firstElementChild.nodeName != 'H4')) { elmLeft.parentNode.replaceChild(elmOptionalBox, elmLeft); }
	else { elmLeft.parentNode.removeChild(elmLeft); }
}

function highlightCounters() {
	var e = document.getElementsByClassName('count-number');

	for (var i=0; i < e.length; i++) {
		if ((e[i].children.length == 0 && e[i].innerHTML != '0') || (e[i].children.length == 2 && e[i].children[1].innerHTML != '0')) {
			e[i].className = e[i].className + ' count-number-highlight';
		}
	}
}
