// ==UserScript==
// @name            What.CD: Sort/collapse albums
// @namespace       http://animorc.zapto.org/greasemonkey/scripts
// @description     Make the titles on artist and collage pages sortable and collapsible.
// @updateURL       http://userscripts.org/scripts/source/69448.meta.js
// @include         https://what.cd/torrents.php?*id=*
// @include         https://what.cd/artist.php?*id=*
// @include         https://what.cd/collages.php?*id=*
// @include         https://what.cd/user.php?*action=edit*
// @include         https://ssl.what.cd/torrents.php?*id=*
// @include         https://ssl.what.cd/artist.php?*id=*
// @include         https://ssl.what.cd/collages.php?*id=*
// @include         https://ssl.what.cd/user.php?*action=edit*
// @version         2.7.7.47
// ==/UserScript==

(function() {

var scriptInfo = {
	scriptID: 69448,
	revision: 47,

	findUpdate: function() {
		if( getSetting('find_updates', 1) != 1 || !/(?:firefox|chrome)/.test(navigator.userAgent.toLowerCase()) )
			return false;
		var date = new Date();
		var latestRevision = getSetting('latest_revision', 0);
		if( this.revision >= latestRevision && getSetting('next_update_check', 0) < date.getTime() ) {
			setSetting('next_update_check', date.getTime() + 86400000); // Check for updates every day
			this.getLatestRevision();
		}
		else if( this.revision < latestRevision )
			this.createUpdateLink();
	},

	getLatestRevision: function() {
		var metaURL = 'https://userscripts.org/scripts/source/' + this.scriptID + '.meta.js';
		if( typeof(GM_xmlhttpRequest) == 'function' ) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: metaURL,
				onload: this.parseXhrResponse
			});
		}
		else {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', metaURL);
			xhr.onreadystatechange = function() { this.parseXhrResponse(xhr); };
			xhr.send();
		}
	},

	parseXhrResponse: function(xhr) {
		if( xhr.readyState == 4 && xhr.status == 200 ) {
			var meta = xhr.responseText.split('\n');
			var latestRevision = null;
			var metaVerLength = '// @version'.length;
			for( var i = meta.length - 1; i >= 0; i-- ) {
				if( meta[i].substr(0, metaVerLength) == '// @version' ) {
					var version = meta[i].match(/\/\/ @version\s*(\d+)\.(\d+)\.(\d+)\.(\d+)/) || [false];
					latestRevision = version.pop();
					if( latestRevision )
						setSetting('latest_revision', latestRevision);
					break;
				}
			}
			if( scriptInfo.revision < latestRevision )
				scriptInfo.createUpdateLink();
		}
	},

	createUpdateLink: function() {
		var settingsHeader = document.getElementById('animorc_sortcollapse_settings_label');
		var updateDiv = document.createElement('div');
		var updateLink = document.createElement('a');
		updateLink.href = 'http://userscripts.org/scripts/show/' + scriptInfo.scriptID;
		updateLink.appendChild(document.createTextNode('Updates available!'));
		updateDiv.appendChild(updateLink);
		settingsHeader.appendChild(updateDiv);
	}
}

function getSize(string) {
	var size = string.split(' ');
	var unit = (size[1] == 'GB'
		? 1073741824
		: ( size[1] == 'MB'
			? 1048576
			: (size[1] == 'KB'
				? 1024
				: 1 ) ) );
	return Math.ceil(size[0].replace(',', '') * unit);
}

function hasClass(obj, className) {
	var count = 0;
	var classes = obj.className.split(' ');
	for( var i = classes.length - 1; i >= 0; i-- ) {
		if(classes[i] === className)
			count++;
	}
	return count;
}

function getSetting(key, def) {
	if( typeof(localStorage) == 'object' )
		return localStorage.getItem(key) || def;
	if( typeof(GM_getValue) == 'function' )
		return GM_getValue(key, def);
	return false;
}

function setSetting(key, value) {
	if( typeof(localStorage) == 'object' )
		localStorage.setItem(key, value);
	else if( typeof(GM_setValue) == 'function' )
		GM_setValue(key, value);
}

var toggle = {
	start: 0,
	end: 0,
	last: 0,
	table: null,
	trigger: null,
	hide: null,
	forceHide: null,

	toggle: function(rowid, forceHide) {
		if( rowid )
			this.start = rowid;
		this.forceHide = forceHide || null;
		this.trigger = this.table.rows[this.start].getAttribute('rowtype');
		this.hide = ( this.forceHide || !hasClass(this.table.rows[this.start+1], 'hidden') );
		if( this.end == -3 ) { // Batch hide editions on torrent page
			this.start = 1;
			this.end = this.table.rows.length - 1;
		}
		else if( this.end == -2 ) { // Batch hide editions
			this.end = this.start;
			while( this.table.rows[--this.start].getAttribute('rowtype') != 'group' )
				;
			while( ++this.end < this.table.rows.length && this.table.rows[this.end].getAttribute('rowtype') != 'group' )
				;
			this.end--;
			this.start++;
		}
		else if( this.end == -1 ) { // Batch hide releases
			this.start = 1;
			this.end = this.table.rows.length - 1;
		}
		else if( this.end > 0 ) {
			this.hide = ( !hasClass(this.table.rows[this.end+1], 'hidden') );
			if( this.start > this.end ) {
				var tmp = this.start;
				this.start = this.end;
				this.end = tmp;
			}
		}
		else
			this.end = this.start;
		for( var i = this.start; i <= this.end; )
			i += this.doToggle(this.table.rows[i]);
		this.end = 0;
	},

	doToggle: function(row) {
		var count = 1, keepHidden = false, rowType = row.getAttribute('rowtype');
		if( this.trigger == 'group' && rowType == 'group' )
			row.cells[0].children[0].className = ( this.hide ? 'show_torrents' : 'hide_torrents' );
		else if( this.trigger == 'edition' && rowType == 'edition' ) {
			row.cells[0].children[0].textContent = ( this.hide ? '+' : String.fromCharCode(8722) ) + row.cells[0].children[0].textContent.slice(1);
			keepHidden = ( hasClass(row, 'hidden') != 0 );
		}
		while( (row = row.nextElementSibling) && (rowType = row.getAttribute('rowtype')) && rowType != this.trigger && rowType != 'group' && rowType != 'ungrouped' ) {
			count++;
			if( rowType == 'edition' )
				keepHidden = ( row.cells[0].children[0].textContent.charAt(0) == '+' );
			else if( rowType == 'torrentdetails' && row.getAttribute('hidedetails') == 'true' )
				continue;
			else if( !this.hide && keepHidden )
				continue;
			if( this.hide )
				this.hideObj(row);
			else
				this.showObj(row);
		}
		return count;
	},

	hideObj: function(obj) {
		if( (!this.forceHide && hasClass(obj, 'hidden')) || (this.forceHide && hasClass(obj, 'hidden') >= 2) )
			return;
		var classes = obj.className.split(' ');
		classes.push('hidden');
		obj.className = classes.join(' ');
	},

	showObj: function(obj) {
		var classes = obj.className.split(' ');
		for( var i = classes.length - 1; i >= 0; i-- ) {
			if( classes[i] == 'hidden' ) {
				classes.splice(i, 1);
				obj.className = classes.join(' ');
				break;
			}
		}
	}

};

var sortTable = {
	status: new Object(),

	sort: function(tableid, mode) {
		this.status.current = {
			index: mode.index,
			order: ( this.status[tableid] && this.status[tableid].index === mode.index ? -this.status[tableid].order : mode.deforder ),
			secondary: modes[mode.secondary]
		};
		this.status[tableid] = {
			index: mode.index,
			order: this.status.current.order
		};
		tables[tableid].titles.sort(this.init);
		this.build(tableid);
	},

	init: function(a, b, secondary) {
		var index, order, ret;
		index = ( secondary ) ? sortTable.status.current.secondary.index : sortTable.status.current.index;
		order = sortTable.status.current.order;
		var asub = a[index];
		var bsub = b[index];
		if( typeof(asub) == 'number' && typeof(bsub) == 'number' )
			ret = order * (asub - bsub);
		else
			ret = sortTable.func(asub, bsub, order);
		if( ret == 0 && !secondary )
			return sortTable.init(a, b, 1);
		return ret;
	},

	func: function(a, b, order) { // order: 1 = ascending, -1 = descending
		var posNumA, posNumB, posStrA, posStrB;
		while( true ) {
			// Both a and b start with numbers => Lowest number gives the lowest value
			if( a.charAt(0) <= '9' && a.charAt(0) >= '0' &&  b.charAt(0) <= '9' && b.charAt(0) >= '0' ) {
				ret = parseInt(a, 10) - parseInt(b, 10);
				if( ret )
					return order * ret;
				// No more letters in a or b => Shortest string has lowest value
				if( (posStrA = a.search(/\D/)) == -1 || (posStrB = b.search(/\D/)) == -1 )
					return ( posStrA ) ? -order : order;
				a = a.substr(posStrA);
				b = b.substr(posStrB);
			}
			else {
				// If none of a or b contain a digit, or one of them starts with a number, compare string values.
				if( (posNumA = a.search(/\d/)) == -1 || (posNumB = b.search(/\d/)) == -1 || !posNumA || !posNumB )
					return ( a < b ) ? -order : ( a > b ) ? order : 0;
				var asub = a.substr(0, posNumA);
				var bsub = b.substr(0, posNumB);
				if( asub == bsub ) {
					a = a.substr(posNumA);
					b = b.substr(posNumB);
				}
				else
					return ( asub < bsub ) ? -order : order;
			}
		}
	},

	build: function(tableid) {
		var table = tables[tableid];
		var newTable = document.createElement('tbody');
		newTable.appendChild(table.header);
		for( var i = 0; i < table.titles.length; i++ ) {
			var torrents = table.titles[i][0];
			for( var j = 0; j < torrents.length; j++ )
				newTable.appendChild(torrents[j]);
		}
		table.table.replaceChild(newTable, table.table.tBodies[0]);
	}
};

var titleTypes = ['Album', 'Soundtrack', 'EP', 'Anthology', 'Compilation', 'DJ Mix', 'Single', 'Live album', 'Remix', 'Bootleg', 'Interview', 'Mixtape', 'Unknown', 'Guest appearance', 'Remixed by', 'Composition', 'Produced by', 'Collages'];

if( window.location.pathname.indexOf('user.php') != -1 ) { // User settings
	var styleEl = document.createElement('style');
	styleEl.appendChild(document.createTextNode(
		'#animorc_sortcollapse_settings section { margin: 5px 0px; }\n'+
		'#animorc_sortcollapse_settings .subsection { margin-left: 20px; }\n'+
		'#animorc_sortcollapse_settings .subsection .subsetting { margin-left: 20px; }\n'+
		'#animorc_sortcollapse_settings .settings_header { font-size: 120%; }\n'+
		'#animorc_sortcollapse_settings .settings_group { padding: 5px 0px; }\n'+
		'#animorc_sortcollapse_settings .settings_list { list-style-type: none; column-width: 110px; -moz-column-width: 110px; -webkit-column-width: 110px; }\n'+
		'#animorc_sortcollapse_settings .settings_list li { white-space: nowrap; padding: 1px; }\n'+
		'#animorc_sortcollapse_settings .settings_textinput { padding: 0px; }'));
	// Add profile settings
	document.getElementsByTagName('head')[0].appendChild(styleEl);
	var formTable = document.getElementById('userform').getElementsByTagName('table')[0].tBodies[0];
	var newRow = formTable.insertRow(8);
	var newCell = newRow.insertCell(-1);
	newCell.id = 'animorc_sortcollapse_settings_label';
	newCell.className = 'label';
	var el = document.createElement('strong');
	el.appendChild(document.createTextNode('Sort/collapse albums'));
	newCell.appendChild(el);
	newCell = newRow.insertCell(-1);
	var settingsDiv = document.createElement('div');
	settingsDiv.id = 'animorc_sortcollapse_settings';

	// Release types
	var settingsSection = document.createElement('section');
	var settingsSectionHeader = document.createElement('div');
	settingsSectionHeader.className = 'settings_header';
	settingsSectionHeader.appendChild(document.createTextNode('Collapse settings'));
	settingsSection.appendChild(settingsSectionHeader);
	var settingsSubDiv = document.createElement('div');
	settingsSubDiv.className = 'subsection';
	var settingsGroup = document.createElement('ul');
	settingsGroup.className = 'settings_group settings_list';
	var confItem, type;
	for( var i = 0; i < titleTypes.length; i++ ) {
		confItem = document.createElement('li');
		type = titleTypes[i].toLowerCase().replace(' ', '_');
		el = document.createElement('input');
		el.type = 'checkbox';
		el.id = 'animorc_collapse_'+type;
		el.setAttribute('titletype', type);
		el.addEventListener('click',
			function(e) {
				if( e.ctrlKey ) {
					for( var i = 0; i < titleTypes.length; i++ ) {
						var type = titleTypes[i].toLowerCase().replace(' ', '_');
						setSetting('collapse_'+type, this.checked ? 1 : 0);
						document.getElementById('animorc_collapse_'+type).checked = this.checked;
					}
				}
				else
					setSetting('collapse_'+this.getAttribute('titletype'), ( this.checked ? 1 : 0 ));
			}, true);
		el.checked = ( getSetting('collapse_'+type, 0) == 1 );
		confItem.appendChild(el);
		el = document.createElement('label');
		el.htmlFor = 'animorc_collapse_'+type;
		el.appendChild(document.createTextNode(' '+titleTypes[i]));
		confItem.appendChild(el);
		settingsGroup.appendChild(confItem);
	}
	settingsSubDiv.appendChild(settingsGroup);
	settingsSection.appendChild(settingsSubDiv);

	// Threshold
	settingsSubDiv = document.createElement('div');
	settingsSubDiv.className = 'subsection';
	confItem = document.createElement('div');
	confItem.className = 'settings_group';
	confItem.appendChild(document.createTextNode('Only collapse groups with more than '));
	el = document.createElement('input');
	el.type = 'text';
	el.className = 'settings_textinput';
	el.style.width = '40px';
	el.value = getSetting('threshold', 0);
	el.addEventListener('keyup', function() { setSetting('threshold', Math.abs(Number(this.value))); }, true);
	confItem.appendChild(el);
	confItem.appendChild(document.createTextNode(' items.'));
	settingsSubDiv.appendChild(confItem);

	// Editions
	confItem = document.createElement('div');
	confItem.className = 'settings_group';
	el = document.createElement('input');
	el.type = 'checkbox';
	el.id = 'animorc_collapse_editions';
	el.addEventListener('click', function() { setSetting('collapse_editions', ( this.checked ? 1 : 0 )); }, true);
	el.checked = ( getSetting('collapse_editions', 0) == 1 );
	confItem.appendChild(el);
	el = document.createElement('label');
	el.htmlFor = 'animorc_collapse_editions';
	el.appendChild(document.createTextNode(' Collapse editions in groups with more than '));
	confItem.appendChild(el);
	el = document.createElement('input');
	el.type = 'text';
	el.className = 'settings_textinput';
	el.style.width = '40px';
	el.value = getSetting('edition_threshold', 0);
	el.addEventListener('keyup', function() { setSetting('edition_threshold', Math.abs(Number(this.value))); }, true);
	confItem.appendChild(el);
	confItem.appendChild(document.createTextNode(' editions.'));
	settingsSubDiv.appendChild(confItem);
	settingsSection.appendChild(settingsSubDiv);
	settingsDiv.appendChild(settingsSection);

	// Artist sort options
	settingsSection = document.createElement('section');
	settingsSectionHeader = document.createElement('div');
	settingsSectionHeader.className = 'settings_header';
	settingsSectionHeader.appendChild(document.createTextNode('Sort settings'));
	settingsSection.appendChild(settingsSectionHeader);
	settingsSubDiv = document.createElement('div');
	settingsSubDiv.className = 'subsection';

	var artistSortColumn = getSetting('default_sort_index_artist', 'year');
	var artistSortOrder = getSetting('default_sort_order_artist', -1);
	var settingsGroup = document.createElement('div');
	settingsGroup.className = 'settings_group';
	confItem = document.createElement('div');
	confItem.appendChild(document.createTextNode('Sort torrents in artist sections by '));
	var sortOptions = {
		year: 'Year',
		title: 'Title',
		snatches: 'Snatches',
		peers: 'Peers',
		seeders: 'Seeders',
		leechers: 'Leechers',
		size: 'Size'
	};
	var elSelect = document.createElement('select');
	elSelect.id = 'animorc_sortcollapse_index_artist';
	elSelect.className = 'settings_select';
	for( mode in sortOptions ) {
		var elOption = document.createElement('option');
		elOption.value = mode;
		elOption.appendChild(document.createTextNode(sortOptions[mode]));
		elOption.selected = ( artistSortColumn == mode );
		elSelect.appendChild(elOption);
	}
	elSelect.addEventListener('change', function() { setSetting('default_sort_index_artist', this.value); }, true);
	confItem.appendChild(elSelect);
	settingsGroup.appendChild(confItem);
	confItem = document.createElement('div');
	confItem.className = 'subsetting';
	confItem.appendChild(document.createTextNode(' in '));
	el = document.createElement('a');
	el.id = 'animorc_sortcollapse_order_artist_asc';
	el.href = 'javascript:void(0);';
	if( artistSortOrder == 1 )
		el.style.fontWeight = 'bold';
	el.appendChild(document.createTextNode('ascending'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_order_artist', 1);
			this.style.fontWeight = 'bold';
			this.nextElementSibling.style.fontWeight = '';
		}, true);
	confItem.appendChild(el);
	confItem.appendChild(document.createTextNode('/'));
	el = document.createElement('a');
	el.id = 'animorc_sortcollapse_order_artist_desc';
	el.href = 'javascript:void(0);';
	if( artistSortOrder == -1 )
		el.style.fontWeight = 'bold';
	el.appendChild(document.createTextNode('descending'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_order_artist', -1);
			this.style.fontWeight = 'bold';
			this.previousElementSibling.style.fontWeight = '';
		}, true);
	confItem.appendChild(el);
	confItem.appendChild(document.createTextNode(' order. '));
	el = document.createElement('a');
	el.href = 'javascript:void(0);';
	el.appendChild(document.createTextNode('Reset to default'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_index_artist', 'year');
			setSetting('default_sort_order_artist', -1);
			document.getElementById('animorc_sortcollapse_order_artist_desc').style.fontWeight = 'bold';
			document.getElementById('animorc_sortcollapse_order_artist_asc').style.fontWeight = '';
			document.getElementById('animorc_sortcollapse_index_artist').value = 'year';
		}, true);
	confItem.appendChild(el);
	settingsGroup.appendChild(confItem)
	settingsSubDiv.appendChild(settingsGroup);

	// Release sort options
	var releaseSortColumn = getSetting('default_sort_index_release', 'year');
	var releaseSortOrder = getSetting('default_sort_order_release', 1);
	settingsGroup = document.createElement('div');
	settingsGroup.className = 'settings_group';
	confItem = document.createElement('div');
	confItem.appendChild(document.createTextNode('Sort torrents in release sections by '));
	sortOptions = {
		year: 'Year',
		title: 'Edition title',
		medium: 'Medium',
		snatches: 'Snatches',
		peers: 'Peers',
		seeders: 'Seeders',
		leechers: 'Leechers',
		size: 'Size'
	};
	elSelect = document.createElement('select');
	elSelect.id = 'animorc_sortcollapse_index_release';
	elSelect.className = 'settings_select';
	for( mode in sortOptions ) {
		var elOption = document.createElement('option');
		elOption.value = mode;
		elOption.appendChild(document.createTextNode(sortOptions[mode]));
		elOption.selected = ( releaseSortColumn == mode );
		elSelect.appendChild(elOption);
	}
	elSelect.addEventListener('change', function() { setSetting('default_sort_index_release', this.value); }, true);
	confItem.appendChild(elSelect);
	settingsGroup.appendChild(confItem);
	confItem = document.createElement('div');
	confItem.className = 'subsetting';
	confItem.appendChild(document.createTextNode(' in '));
	el = document.createElement('a');
	el.id = 'animorc_sortcollapse_order_release_asc';
	el.href = 'javascript:void(0);';
	if( releaseSortOrder == 1 )
		el.style.fontWeight = 'bold';
	el.appendChild(document.createTextNode('ascending'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_order_release', 1);
			this.style.fontWeight = 'bold';
			this.nextElementSibling.style.fontWeight = '';
		}, true);
	confItem.appendChild(el);
	confItem.appendChild(document.createTextNode('/'));
	el = document.createElement('a');
	el.id = 'animorc_sortcollapse_order_release_desc';
	el.href = 'javascript:void(0);';
	if( releaseSortOrder == -1 )
		el.style.fontWeight = 'bold';
	el.appendChild(document.createTextNode('descending'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_order_release', -1);
			this.style.fontWeight = 'bold';
			this.previousElementSibling.style.fontWeight = '';
		}, true);
	confItem.appendChild(el);
	confItem.appendChild(document.createTextNode(' order. '));
	el = document.createElement('a');
	el.href = 'javascript:void(0);';
	el.appendChild(document.createTextNode('Reset to default'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_index_release', 'year');
			setSetting('default_sort_order_release', 1);
			document.getElementById('animorc_sortcollapse_order_release_desc').style.fontWeight = '';
			document.getElementById('animorc_sortcollapse_order_release_asc').style.fontWeight = 'bold';
			document.getElementById('animorc_sortcollapse_index_release').value = 'year';
		}, true);
	confItem.appendChild(el);
	settingsGroup.appendChild(confItem)
	settingsSubDiv.appendChild(settingsGroup);

	// Collage sort options
	var collageSortColumn = getSetting('default_sort_index_collage', 'num');
	var collageSortOrder = getSetting('default_sort_order_collage', 1);
	settingsGroup = document.createElement('div');
	settingsGroup.className = 'settings_group';
	confItem = document.createElement('div');
	confItem.appendChild(document.createTextNode('Sort torrents in collages by '));
	sortOptions = {
		num: 'Number',
		artist: 'Artist name',
		year: 'Year',
		title: 'Title',
		snatches: 'Snatches',
		peers: 'Peers',
		seeders: 'Seeders',
		leechers: 'Leechers',
		size: 'Size'
	};
	elSelect = document.createElement('select');
	elSelect.className = 'settings_select';
	elSelect.id = 'animorc_sortcollapse_index_collage';
	for( mode in sortOptions ) {
		var elOption = document.createElement('option');
		elOption.value = mode;
		elOption.appendChild(document.createTextNode(sortOptions[mode]));
		elOption.selected = ( collageSortColumn == mode );
		elSelect.appendChild(elOption);
	}
	elSelect.addEventListener('change', function() { setSetting('default_sort_index_collage', this.value); }, true);
	confItem.appendChild(elSelect);
	settingsGroup.appendChild(confItem);
	confItem = document.createElement('div');
	confItem.className = 'subsetting';
	confItem.appendChild(document.createTextNode(' in '));
	el = document.createElement('a');
	el.id = 'animorc_sortcollapse_order_collage_asc';
	el.href = 'javascript:void(0);';
	if( collageSortOrder == 1 )
		el.style.fontWeight = 'bold';
	el.appendChild(document.createTextNode('ascending'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_order_collage', 1);
			this.style.fontWeight = 'bold';
			this.nextElementSibling.style.fontWeight = '';
		}, true);
	confItem.appendChild(el);
	confItem.appendChild(document.createTextNode('/'));
	el = document.createElement('a');
	el.id = 'animorc_sortcollapse_order_collage_desc';
	el.href = 'javascript:void(0);';
	if( collageSortOrder == -1 )
		el.style.fontWeight = 'bold';
	el.appendChild(document.createTextNode('descending'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_order_collage', -1);
			this.style.fontWeight = 'bold';
			this.previousElementSibling.style.fontWeight = '';
		}, true);
	confItem.appendChild(el);
	confItem.appendChild(document.createTextNode(' order. '));
	el = document.createElement('a');
	el.href = 'javascript:void(0);';
	el.appendChild(document.createTextNode('Reset to default'));
	el.addEventListener('click',
		function() {
			setSetting('default_sort_index_collage', 'num');
			setSetting('default_sort_order_collage', 1);
			document.getElementById('animorc_sortcollapse_order_collage_desc').style.fontWeight = '';
			document.getElementById('animorc_sortcollapse_order_collage_asc').style.fontWeight = 'bold';
			document.getElementById('animorc_sortcollapse_index_collage').value = 'num';
		}, true);
	confItem.appendChild(el);
	settingsGroup.appendChild(confItem);
	settingsSubDiv.appendChild(settingsGroup);

	settingsSection.appendChild(settingsSubDiv);
	settingsDiv.appendChild(settingsSection);
	newCell.appendChild(settingsDiv);

	var updateAvailable = scriptInfo.findUpdate();
}

else if( window.location.search.indexOf('action=') == -1 ) {
	var colors = new Object();
	var tables = new Object();
	var modes = {
		length: 0,
		create: function(deforder, secondary) {
			var obj = new Object();
			obj.index = ++this.length; // Index in titles array
			obj.deforder = deforder || -1; // 1 = asc, -1 = desc
			obj.secondary = secondary || 'year'; // Secondary sort column
			return obj;
		}
	};

	if( window.location.pathname.indexOf('artist.php') != -1 ) { // Artist
		modes.title = modes.create(1);
		modes.year = modes.create(-1, 'groupID');
		modes.groupID = modes.create();
		modes.peers = modes.create();
		modes.stats = {
			size: modes.create(),
			snatches: modes.create(),
			seeders: modes.create(),
			leechers: modes.create()
		};
		var sortColumn = getSetting('default_sort_index_artist', 'year');
		var sortOrder = getSetting('default_sort_order_artist', -1);
		var mode = modes[sortColumn] || modes.stats[sortColumn] || modes.year;
		var sortMode = {
			index: mode.index,
			deforder: sortOrder == 1 ? 1 : -1,
			secondary: mode.secondary
		};
		var discogTables = document.getElementsByClassName('torrent_table');
		var hiddenDiscogs = hasClass(discogTables[0].rows[1], 'hidden'); // Is "Discography View" set to "Closed by default"?
		var threshold = Number(getSetting('threshold', 0));
		var editionThreshold = Number(getSetting('edition_threshold', 0));

		var infoIndex = toggleIndex = null;
		for( var i = 1, rows = discogTables[0].rows.length; i < rows && (infoIndex === null || toggleIndex === null); i++ ) {
			var row = discogTables[0].rows[1];
			for( var j = 0, cells = row.cells.length; j < cells; j++ ) {
				var cell = row.cells[j];
				if( infoIndex === null && (hasClass(cell, 'big_info') || cell.getElementsByClassName('tags').length > 0) ) {
					infoIndex = j;
					continue;
				}
				if( toggleIndex === null && cell.children[0].id.substr(0, 8) == 'showimg_' ) {
					toggleIndex = j;
					continue;
				}
			}
		}
		var hideEditions = ( getSetting('collapse_editions', 0) == 1 );
		for( var i = 0; i < discogTables.length; i++ ) {
			var table = discogTables[i];
			if( table.getAttribute('tableid') == i )
				continue;
			table.setAttribute('tableid', i);
			toggle.table = table;
			var type = table.id.substr('torrents_'.length);
			var hideGroups = ( getSetting('collapse_'+type, 0) == 1 );

			table.rows[0].cells[toggleIndex].style.width = '28px';
			table.rows[0].cells[infoIndex].appendChild(document.createTextNode(' - Sort by: '));

			newLink = document.createElement('a');
			newLink.href = 'javascript:void(0);';
			newLink.setAttribute('tableid', i);
			newLink.appendChild(document.createTextNode('Title'));
			newLink.addEventListener('click', function() { sortTable.sort(this.getAttribute('tableid'), modes.title); }, false);
			table.rows[0].cells[infoIndex].appendChild(newLink);
			table.rows[0].cells[infoIndex].appendChild(document.createTextNode(' | '));

			newLink = document.createElement('a');
			newLink.href = 'javascript:void(0);';
			newLink.setAttribute('tableid', i);
			newLink.appendChild(document.createTextNode('Year'));
			newLink.addEventListener('click', function() { sortTable.sort(this.getAttribute('tableid'), modes.year); }, false);
			table.rows[0].cells[infoIndex].appendChild(newLink);
			table.rows[0].cells[infoIndex].appendChild(document.createTextNode(' | '));

			newLink = document.createElement('a');
			newLink.href = 'javascript:void(0);';
			newLink.setAttribute('tableid', i);
			newLink.appendChild(document.createTextNode('Peers'));
			newLink.addEventListener('click', function() { sortTable.sort(this.getAttribute('tableid'), modes.peers); }, false);
			table.rows[0].cells[infoIndex].appendChild(newLink);

			var cellIndex = infoIndex + 1;
			for( var j in modes.stats ) {
				newLink = document.createElement('a');
				newLink.href = 'javascript:void(0);';
				newLink.setAttribute('tableid', i);
				newLink.innerHTML = table.rows[0].cells[cellIndex].innerHTML;
				newLink.setAttribute('sort_index', j);
				newLink.addEventListener('click', function() { sortTable.sort(this.getAttribute('tableid'), modes.stats[this.getAttribute('sort_index')]); }, false);
				table.rows[0].deleteCell(cellIndex);
				var newCell = table.rows[0].insertCell(cellIndex);
				newCell.appendChild(newLink);
				cellIndex++;
			}

			var titles = new Array();
			for( var j = 1; j < table.rows.length; j++ ) {
				var row = table.rows[j];
				row.setAttribute('rowtype', 'group');
				var toggleDiv = row.cells[toggleIndex].children[0];
				var toggleRelease = document.createElement('a');
				toggleRelease.href = 'javascript:void(0);';
				toggleRelease.className = 'show_torrents_link';
				toggleRelease.setAttribute('tableid', i);
				toggleRelease.addEventListener('click',
					function(e) {
						var rowid = this.parentNode.parentNode.parentNode.rowIndex;
						if( e.shiftKey && toggle.last && toggle.table.getAttribute('tableid') == this.getAttribute('tableid') ) {
							toggle.start = toggle.last;
							toggle.end = rowid;
						}
						else {
							toggle.start = rowid;
							if( e.ctrlKey )
								toggle.end = -1;
						}
						toggle.table = this.parentNode.parentNode.offsetParent;
						toggle.toggle();
						toggle.last = rowid;
						e.preventDefault();
					}, false);
				toggleDiv.replaceChild(toggleRelease, toggleDiv.children[0]);
				if( row.className == row.nextSibling.className ) // Empty group
					continue;
				var groupInfoCont = row.cells[infoIndex].getElementsByClassName('group_info')[0] || row.cells[infoIndex];
				var groupLink = groupInfoCont.children[0].children[0];
				var year = Number(groupInfoCont.children[0].innerHTML.substr(0, 4));
				var groupID = Number(groupLink.href.match(/\?id=(\d+)/)[1]);
				var name = groupLink.innerHTML.replace(/^\s+/, '');
				if(isNaN(year))
					year = 0;
				var snatches = 0, size = 0, seeders = 0, leechers = 0;
				var torrents = [row];
				var torrentCount = 0, editionCount = 0;
				var hideGroup = hideGroups;
				var hideEdition = hideEditions;
				var snatchedGroup = hasClass(row, 'snatched_group');
				for( var k = j + 1; k < table.rows.length && editionCount <= editionThreshold; k++ ) {
					var row = table.rows[k];
					if( hasClass(row, 'group') )
						break;
					if( hasClass(row, 'edition') )
						editionCount++;
				}
				for( var k = j + 1; k < table.rows.length; k++ ) {
					row = table.rows[k];
					if( hasClass(row, 'group') )
						break;
					torrents.push(row);
					if( hasClass(row, 'edition') ) { // Edition
						// Only add multiple levels of hide if the entire discography tables are collapsed by default
						if( hideEdition && !hiddenDiscogs && hasClass(row, 'hidden') )
							hideEdition = false;
						row.setAttribute('rowtype', 'edition');
						var toggleEdition = document.createElement('a');
						toggleEdition.href = 'javascript:void(0);';
						toggleEdition.setAttribute('tableid', i);
						toggleEdition.addEventListener('click',
							function(e) {
								var rowid = this.parentNode.parentNode.rowIndex;
								if( e.shiftKey && toggle.last && toggle.table.getAttribute('tableid') == this.getAttribute('tableid') ) {
									toggle.start = toggle.last;
									toggle.end = rowid;
								}
								else {
									toggle.start = rowid;
									if( e.ctrlKey )
										toggle.end = -2;
								}
								toggle.table = this.parentNode.offsetParent;
								toggle.toggle();
								toggle.last = rowid;
								e.preventDefault();
							}, false);
						// Mark editions as hidden by changing '-' to '+' instead of adding a second level of hide
						if( (hideGroups || hasClass(row, 'hidden')) && hideEditions && editionCount > editionThreshold )
							row.cells[0].children[0].textContent = '+' + row.cells[0].children[0].textContent.slice(1);
						toggleEdition.appendChild(document.createTextNode(row.cells[0].textContent));
						var colorType = snatchedGroup ? 'edlinkSnatched' : 'edlink';
						if( colors[colorType] == null )
							colors[colorType] = getComputedStyle(row.cells[0].firstChild, null).color;
						toggleEdition.style.color = colors[colorType];
						toggleEdition.style.fontWeight = 'bold';
						row.cells[0].replaceChild(toggleEdition, row.cells[0].firstChild);
					}
					else { // Torrent
						if( hideGroup && !hiddenDiscogs && hasClass(row, 'hidden') )
							hideGroup = false;
						row.setAttribute('rowtype', 'torrent');
						torrentCount++;
						size = Math.max(size, getSize(row.cells[1].firstChild.nodeValue));
						snatches += !row.cells[2].firstChild ? 0 : Number(row.cells[2].firstChild.nodeValue.replace(/\D/g, ''));
						seeders += !row.cells[3].firstChild ? 0 : Number(row.cells[3].firstChild.nodeValue.replace(/\D/g, ''));
						leechers += !row.cells[4].firstChild ? 0 : Number(row.cells[4].firstChild.nodeValue.replace(/\D/g, ''));
					}
				}
				if( hideGroup && torrents.length > 1 && (!threshold || torrentCount > threshold) )
					toggle.toggle(j, true);
				else if( hideEdition && torrentCount > 0 && editionCount > editionThreshold ) {
					// Simulate Ctrl-click on the first edition link
					toggle.start = j+1;
					toggle.end = -2;
					toggle.toggle(false, true);
				}
				titles.push([torrents, name.toLowerCase(), year, groupID, (seeders+leechers), size, snatches, seeders, leechers]);
				j = k - 1;
			}
			tables[i] = {
				header: table.rows[0],
				titles: titles,
				table: table,
			};
			if( sortColumn != 'year' || sortOrder != -1 )
				sortTable.sort(i, sortMode);
			else {
				sortTable.status[i] = {
					index: modes[sortColumn].index,
					order: sortOrder
				};
			}
		}
	}

	else if( window.location.pathname.indexOf('torrents.php') != -1 ) { // Torrents
		modes.title = modes.create(1, 'medium');
		modes.medium = modes.create(1);
		modes.year = modes.create(-1, 'medium');
		modes.minID = modes.create(1);
		modes.maxID = modes.create();
		modes.peers = modes.create();
		modes.stats = {
			size: modes.create(),
			snatches: modes.create(),
			seeders: modes.create(),
			leechers: modes.create()
		};
		var sortColumn = getSetting('default_sort_index_release', 'year');
		var sortOrder = getSetting('default_sort_order_release', 1);
		var mode = modes[sortColumn] || modes.stats[sortColumn] || modes.year;
		var sortMode = {
			index: mode.index,
			deforder: sortOrder == 1 ? 1 : -1,
			secondary: mode.secondary
		};

		var hideEditions = ( getSetting('collapse_editions', 0) == 1);
		var editionThreshold = Number(getSetting('edition_threshold', 0));
		var table = document.getElementsByClassName('torrent_table')[0];
		var editionLinks = table.getElementsByClassName('edition_info');

		if( editionLinks.length ) {
			toggle.table = table;

			table.rows[0].cells[0].appendChild(document.createTextNode(' - Sort by: '));

			newLink = document.createElement('a');
			newLink.href = 'javascript:void(0);';
			newLink.appendChild(document.createTextNode('Edition title'));
			newLink.addEventListener('click', function() { sortTable.sort(0, modes.title); }, false);
			table.rows[0].cells[0].appendChild(newLink);
			table.rows[0].cells[0].appendChild(document.createTextNode(' | '));

			newLink = document.createElement('a');
			newLink.href = 'javascript:void(0);';
			newLink.appendChild(document.createTextNode('Year'));
			newLink.addEventListener('click', function() { sortTable.sort(0, modes.year); }, false);
			table.rows[0].cells[0].appendChild(newLink);
			table.rows[0].cells[0].appendChild(document.createTextNode(' | '));

			newLink = document.createElement('a');
			newLink.href = 'javascript:void(0);';
			newLink.appendChild(document.createTextNode('Medium'));
			newLink.addEventListener('click', function() { sortTable.sort(0, modes.medium); }, false);
			table.rows[0].cells[0].appendChild(newLink);
			table.rows[0].cells[0].appendChild(document.createTextNode(' | '));

			newLink = document.createElement('a');
			newLink.href = 'javascript:void(0);';
			newLink.appendChild(document.createTextNode('Peers'));
			newLink.addEventListener('click', function() { sortTable.sort(0, modes.peers); }, false);
			table.rows[0].cells[0].appendChild(newLink);

			var cellIndex = 1;
			for( var j in modes.stats ) {
				newLink = document.createElement('a');
				newLink.href = 'javascript:void(0);';
				newLink.innerHTML = table.rows[0].cells[cellIndex].innerHTML;
				newLink.setAttribute('sort_index', j);
				newLink.addEventListener('click', function() { sortTable.sort(0, modes.stats[this.getAttribute('sort_index')]); }, false);
				table.rows[0].deleteCell(cellIndex);
				var newCell = table.rows[0].insertCell(cellIndex);
				newCell.appendChild(newLink);
				cellIndex++;
			}

			var editionCount = editionLinks.length;
			var snatchedGroup = hasClass(table, 'snatched');
			var editions = new Array();
			for( var j = 1; j < table.rows.length; j++ ) {
				var row = table.rows[j];
				var torrents = [row];
				row.setAttribute('rowtype', 'edition');
				var toggleEdition = document.createElement('a');
				toggleEdition.href = 'javascript:void(0);';
				toggleEdition.addEventListener('click',
					function(e) {
						var rowid = this.parentNode.parentNode.rowIndex;
						if( e.shiftKey && toggle.last ) {
							toggle.start = toggle.last;
							toggle.end = rowid;
						}
						else {
							toggle.start = rowid;
							if( e.ctrlKey )
								toggle.end = -3;
						}
						toggle.toggle();
						toggle.last = rowid;
						e.preventDefault();
					}, false);
				toggleEdition.appendChild(document.createTextNode(row.cells[0].textContent));
				var colorType = snatchedGroup ? 'edlinkSnatched' : 'edlink';
				if( colors[colorType] == null )
					colors[colorType] = getComputedStyle(row.cells[0].firstChild, null).color;
				toggleEdition.style.color = colors[colorType];
				toggleEdition.style.fontWeight = 'bold';
				row.cells[0].replaceChild(toggleEdition, row.cells[0].firstChild);
				if( row.className == row.nextSibling.className ) // Empty group
					continue;
				var editionInfo = toggleEdition.textContent.split(' / ');
				var year, title, medium;
				if( editionInfo.length == 1 ) // Edition info only has the release year (+ XXXX - medium)
					medium = editionInfo[0].substr(9);
				else
					medium = editionInfo.pop();
				var yearMatch = editionInfo[0].match(/^. (\d{4}) - /);
				if( yearMatch ) {
					year = Number(yearMatch[1]);
					title = editionInfo.join(' ').substr(9);
				}
				else {
					year = 0;
					title = editionInfo.join(' ').substr(2);
				}
				var snatches = 0, size = 0, seeders = 0, leechers = 0, minTorrentID = Infinity, maxTorrentID = 0;
				var isExpanded = false;
				for( var k = j + 1; k < table.rows.length; k++ ) {
					row = table.rows[k];
					if( hasClass(row, 'edition') ) // Edition
						break;
					torrents.push(row);
					if( hasClass(row, 'torrentdetails') ) { // Torrent details
						var thisIsExpanded = hasClass(row, 'hidden') == 0;
						if( thisIsExpanded )
							isExpanded = true;
						row.setAttribute('rowtype', 'torrentdetails');
						row.setAttribute('hidedetails', !thisIsExpanded);
					}
					else { // Torrent
						row.setAttribute('rowtype', 'torrent');
						torrentID = row.id.substr('torrent'.length);
						size = Math.max(size, getSize(row.cells[1].firstChild.nodeValue));
						minTorrentID = Math.min(minTorrentID, torrentID);
						maxTorrentID = Math.max(maxTorrentID, torrentID);
						snatches += !row.cells[2].firstChild ? 0 : Number(row.cells[2].firstChild.nodeValue.replace(/\D/g, ''));
						seeders += !row.cells[3].firstChild ? 0 : Number(row.cells[3].firstChild.nodeValue.replace(/\D/g, ''));
						leechers += !row.cells[4].firstChild ? 0 : Number(row.cells[4].firstChild.nodeValue.replace(/\D/g, ''));
						var toggleDetails = row.cells[0].children[1];
						toggleDetails.addEventListener('click',
							function() {
								var row = this.parentNode.parentNode.nextElementSibling;
								row.setAttribute('hidedetails', row.getAttribute('hidedetails') == 'false');
							}, false);
					}
				}
				if( hideEditions && !isExpanded && editionCount > editionThreshold )
					toggle.toggle(j, true);
				j = k - 1;
				editions.push([torrents, title.toLowerCase(), medium.toLowerCase(), year, minTorrentID, maxTorrentID, (seeders+leechers), size, snatches, seeders, leechers]);
			}
			tables[0] = {
				header: table.rows[0],
				titles: editions,
				table: table
			};
			if( sortColumn != 'year' || sortOrder != -1 )
				sortTable.sort(0, sortMode);
			else {
				sortTable.status[0] = {
					index: modes[sortColumn].index,
					order: sortOrder
				};
			}
		}
	}

	else if( window.location.pathname.indexOf('collages.php') != -1 ) { // Collages
		modes.num = modes.create(1),
		modes.artist = modes.create(1, 'title'),
		modes.title = modes.create(1, 'artist'),
		modes.year = modes.create(-1, 'groupID');
		modes.groupID = modes.create();
		modes.peers = modes.create();
		modes.stats = {
			size: modes.create(),
			snatches: modes.create(),
			seeders: modes.create(),
			leechers: modes.create()
		};
		var sortColumn = getSetting('default_sort_index_collage', 'num');
		var sortOrder = getSetting('default_sort_order_collage', 1);
		var mode = modes[sortColumn] || modes.stats[sortColumn] || modes.num;
		var sortMode = {
			index: mode.index,
			deforder: sortOrder == 1 ? 1 : -1,
			secondary: mode.secondary
		};
		var table = document.getElementById('discog_table');
		toggle.table = table;
		var hideGroups = ( getSetting('collapse_collages', 0) == 1 );
		var hideEditions = ( getSetting('collapse_editions', 0) == 1 );
		var threshold = Number(getSetting('threshold', 0));
		var editionThreshold = Number(getSetting('edition_threshold', 0));
		table.rows[0].cells[2].appendChild(document.createTextNode(' - Sort by: '));

		var newLink = document.createElement('a');
		newLink.href = 'javascript:void(0);';
		newLink.appendChild(document.createTextNode('#'));
		newLink.addEventListener('click', function() { sortTable.sort(0, modes.num); }, false);
		table.rows[0].cells[2].appendChild(newLink);
		table.rows[0].cells[2].appendChild(document.createTextNode(' | '));

		newLink = document.createElement('a');
		newLink.href = 'javascript:void(0);';
		newLink.appendChild(document.createTextNode('Artist'));
		newLink.addEventListener('click', function() { sortTable.sort(0, modes.artist); }, false);
		table.rows[0].cells[2].appendChild(newLink);
		table.rows[0].cells[2].appendChild(document.createTextNode(' | '));

		newLink = document.createElement('a');
		newLink.href = 'javascript:void(0);';
		newLink.appendChild(document.createTextNode('Title'));
		newLink.addEventListener('click', function() { sortTable.sort(0, modes.title); }, false);
		table.rows[0].cells[2].appendChild(newLink);
		table.rows[0].cells[2].appendChild(document.createTextNode(' | '));

		newLink = document.createElement('a');
		newLink.href = 'javascript:void(0);';
		newLink.appendChild(document.createTextNode('Year'));
		newLink.addEventListener('click', function() { sortTable.sort(0, modes.year); }, false);
		table.rows[0].cells[2].appendChild(newLink);
		table.rows[0].cells[2].appendChild(document.createTextNode(' | '));

		newLink = document.createElement('a');
		newLink.href = 'javascript:void(0);';
		newLink.appendChild(document.createTextNode('Peers'));
		newLink.addEventListener('click', function() { sortTable.sort(0, modes.peers); }, false);
		table.rows[0].cells[2].appendChild(newLink);

		var cellIndex = 3;
		for( var j in modes.stats ) {
			newLink = document.createElement('a');
			newLink.href = 'javascript:void(0);';
			newLink.innerHTML = table.rows[0].cells[cellIndex].innerHTML;
			newLink.setAttribute('sort_index', j);
			newLink.addEventListener('click', function() { sortTable.sort(0, modes.stats[this.getAttribute('sort_index')]); }, false);
			table.rows[0].deleteCell(cellIndex);
			var newCell = table.rows[0].insertCell(cellIndex);
			newCell.appendChild(newLink);
			cellIndex++;
		}

		var titles = new Array();
		for( var j = 1; j < table.rows.length; j++ ) {
			var row = table.rows[j];
			if( hasClass(row, 'torrent') ) { // Ungrouped torrents require special attention
				row.setAttribute('rowtype', 'ungrouped');
				var curCellIndex = 2;
				var curCell = row.cells[curCellIndex].children[1];
				var num = titles.length+1;
				var artists = '', groupLink;
				var anchors = curCell.getElementsByTagName('a');
				for( var k = 0, l = anchors.length - 1; k <= l; k++ ) {
					if( anchors[k].pathname == '/torrents.php' ) {
						groupLink = anchors[k];
						break;
					}
				}
				var name = groupLink.innerHTML.replace(/^\s+/, '');
				var groupID = Number(groupLink.href.match(/\?id=(\d+)/)[1]);
				var year = 0;
				var size = getSize(row.cells[curCellIndex+1].firstChild.nodeValue);
				var snatches = Number(row.cells[curCellIndex+2].firstChild.nodeValue);
				var seeders = Number(row.cells[curCellIndex+3].firstChild.nodeValue);
				var leechers = Number(row.cells[curCellIndex+4].firstChild.nodeValue);
				var torrents = [row];
			}
			else { // Torrent group
				row.setAttribute('rowtype', 'group');
				var torrentCount = 0, editionCount = 0;
				var origLink = table.rows[j].cells[0].getElementsByTagName('a')[0];
				var toggleRelease = document.createElement('a');
				toggleRelease.href = 'javascript:void(0);';
				toggleRelease.className = 'show_torrents_link';
				toggleRelease.addEventListener('click',
					function(e) {
						var rowid = this.parentNode.parentNode.parentNode.rowIndex;
						if( e.shiftKey && toggle.last ) {
							toggle.start = toggle.last;
							toggle.end = rowid;
						}
						else {
							toggle.start = rowid;
							if( e.ctrlKey )
								toggle.end = -1;
						}
						toggle.toggle();
						toggle.last = rowid;
						e.preventDefault();
					}, false);
				origLink.parentNode.replaceChild(toggleRelease, origLink);

				var curCell = row.cells[2].children[0];
				var num = Number(curCell.innerHTML.match(/^\d+/)[0]);
				var artists = new Array(), groupLink;
				if(curCell.children.length == 1)
					groupLink = curCell.children[0];
				else {
					var anchors = curCell.getElementsByTagName('a');
					for( var k = 0, l = anchors.length - 1; k <= l; k++ ) {
						if( anchors[k].pathname == '/artist.php' )
							artists.push(anchors[k].innerHTML);
						else if( anchors[k].pathname == '/torrents.php' )
							groupLink = anchors[k];
					}
				}
				artists = artists.join(' ');
				var name = groupLink.innerHTML;
				var groupID = Number(groupLink.href.match(/\?id=(\d+)/)[1]);
				var year = Number(groupLink.nextSibling.nodeValue.substr(2, 4));
				if(isNaN(year))
					year = 0;
				var size = 0, snatches = 0, seeders = 0, leechers = 0;
				var torrents = [row];
				var hideGroup = hideGroups;
				var hideEdition = hideEditions;
				var snatchedGroup = hasClass(row, 'snatched_group');
				// Count editions
				for( var k = j + 1; k < table.rows.length && editionCount <= editionThreshold; k++ ) {
					var row = table.rows[k];
					if( hasClass(row, 'group') )
						break;
					if( hasClass(row, 'edition') )
						editionCount++;
				}
				for( var k = j + 1; k < table.rows.length; k++ ) {
					row = table.rows[k];
					if( hasClass(row, 'group') || hasClass(row, 'torrent') )
						break;
					torrents.push(row);
					if( hasClass(row, 'edition') ) { // Edition
						if( hideEdition && hasClass(row, 'hidden') )
							hideEdition = false;
						row.setAttribute('rowtype', 'edition');
						var toggleEdition = document.createElement('a');
						toggleEdition.href = 'javascript:void(0);';
						toggleEdition.addEventListener('click',
							function(e) {
								var rowid = this.parentNode.parentNode.rowIndex;
								if( e.shiftKey && toggle.last ) {
									toggle.start = toggle.last;
									toggle.end = rowid;
								}
								else {
									toggle.start = rowid;
									if( e.ctrlKey )
										toggle.end = -2;
								}
								toggle.toggle();
								toggle.last = rowid;
								e.preventDefault();
							}, false);
						// Mark editions as hidden by changing '-' to '+' instead of adding a second level of hide
						if( (hideGroups || hasClass(row, 'hidden')) && hideEditions && editionCount > editionThreshold)
							row.cells[0].children[0].textContent = '+' + row.cells[0].children[0].textContent.slice(1);
						toggleEdition.appendChild(document.createTextNode(row.cells[0].textContent));
						var colorType = snatchedGroup ? 'edlinkSnatched' : 'edlink';
						if( colors[colorType] == null )
							colors[colorType] = getComputedStyle(row.cells[0].firstChild, null).color;
						toggleEdition.style.color = colors[colorType];
						toggleEdition.style.fontWeight = 'bold';
						row.cells[0].replaceChild(toggleEdition, row.cells[0].firstChild);
					}
					else { // Torrent
						if( hideGroup && hasClass(row, 'hidden') )
							hideGroup = false;
						row.setAttribute('rowtype', 'torrent');
						torrentCount++;
						size = Math.max(size, getSize(row.cells[1].firstChild.nodeValue));
						snatches += !row.cells[2].firstChild ? 0 : Number(row.cells[2].firstChild.nodeValue.replace(/\D/g, ''));
						seeders += !row.cells[3].firstChild ? 0 : Number(row.cells[3].firstChild.nodeValue.replace(/\D/g, ''));
						leechers += !row.cells[4].firstChild ? 0 : Number(row.cells[4].firstChild.nodeValue.replace(/\D/g, ''));
					}
				}
				if( hideGroup && torrents.length > 1 && (!threshold || torrentCount > threshold) )
					toggle.toggle(j);
				else if( hideEdition && torrentCount > 0 && editionCount > editionThreshold ) {
					// Simulate Ctrl-click on the first edition link
					toggle.start = j+1;
					toggle.end = -2;
					toggle.toggle(false, true);
				}
				j = k - 1;
			}
			titles.push([torrents, num, artists.toLowerCase(), name.toLowerCase(), year, groupID, (seeders+leechers), size, snatches, seeders, leechers]);
		}
		tables[0] = {
			header: table.rows[0],
			titles: titles,
			table: table
		};
		if( sortColumn != 'num' || sortOrder != 1 )
			sortTable.sort(0, sortMode);
		else {
			sortTable.status[0] = {
				index: modes[sortColumn].index,
				order: sortOrder
			};
		}
	}
}

})();
