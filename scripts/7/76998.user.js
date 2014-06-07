// Sensible Watchlist
// alphabetizes and allows collapsing / expanding of the watch list on Sensible Erection
// version 1.4vFH
// 2007-07-11
// Copyright (c) 2010, steele.ero, f00m@nB@r, Rojo^, fedhax
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// CHANGELOG:
//   2010-05-17 
//     f00m@nB@r: modify to work on main page; fork from original script
//                http://userscripts.org/scripts/show/10145 and change @name
//	 2007-07-11
//	   f00m@nB@r: efficiency improvements in loops to find WL head,
//				  and WL items with new comments
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sensible Erection comment mods", and click Uninstall.
//
// ==UserScript==
// @name		  Sensible Watchlist
// @description	  alphabetizes and allows collapsing / expanding of the watch list on Sensible Erection
// @include		  http://*.sensibleerection.com/*
// @include		  http://sensibleerection.com/*
// @namespace	  com.sensibleerection.watchlist
// @version		  1.4vFH
// @author		  steele.ero; f00m@nB@r; Rojo^; fedhax
// ==/UserScript==

(function () {
	var gSEWatchListVersion = '1.4vFH';

	var xp = "//*";
	var bodyChildren = document.evaluate(xp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var leftColChildren, wlHeading, wl, lbNewComments, lRegex, wlTest;
	var gFHSigns = [];
	var gOtherSigns = [];

	function fblog(what) {
		what = what || 'Error displaying '+arguments[0];
		if (console && console.log) console.log(what);
	};

	function show_watchlist() {
		if (settings.fh_symbols())
			wlHeading.innerHTML = gFHSigns[0][1];
		else
			wlHeading.innerHTML = gOtherSigns[0][1];

		wl.style.display = 'block';
		wl_set_cookie(false);
	};

	function hide_watchlist() {
		if (settings.fh_symbols())
			wlHeading.innerHTML = gFHSigns[1][1];
		else
			wlHeading.innerHTML = gOtherSigns[1][1];

		wl.style.display = 'none';
		wl_set_cookie(true);
	};

	function toggle_watchlist() {
		if (wl && wl.style)
			(wl.style.display == 'none') ? show_watchlist() : hide_watchlist();
	};

	function wl_read_cookie() {
		return GM_getValue( 'SE_ShowWatchlist', true );
	};

	function wl_set_cookie(recipe) {
		GM_setValue( 'SE_ShowWatchlist', recipe );
	};

	// Completely stolen from Rojo^'s Sensible Facial GM script
	// He deserves the credit completely and totally for this Config object
	function Config() {
		var options = [];
		// format: greasemonkey_var_name, label for settings dialogue, default_value
		options.push(['autoopen','Enable Auto-Open/Close',true]);
		options.push(['fh_symbols','Use Fedhax Open/Close Symbols',false]);
		options.push(['autorefresh','Enable Auto-Refresh Page On Settings Change',true]);
		
		function makePrototype(gmVar,defVal) {
			Config.prototype[gmVar] = function() {
				return (arguments.length == 0) ? GM_getValue(gmVar,defVal) : function() { GM_setValue(gmVar,arguments[0] || defVal); return true; };
			}		
		}
		
		for (var i=0; i<options.length; i++) {
			makePrototype(options[i][0],options[i][2]);
		}
		
		this.showConfig = function() {
			// display box, then center it later after it has dimensions.
			var w = window.innerWidth;
			var h = window.innerHeight;
			var sl = document.body.scrollLeft;
			var st = document.body.scrollTop;
			var boxSt = document.createElement('style');
			boxSt.innerHTML = '#configBox { padding: 5px; white-space: nowrap; opacity: 1.0; z-index: 901; '
				+'background-color: #eec; border: 2px outset; display: inline; position: absolute; line-height: 1.5em; font-size: 0.9em; }'
				+'#configTitle { padding: 1px 5px; background-color: #038; color: #fff; font-weight: bold; line-height: 1em; }'
				+'#overlay { width: '+ (w - 20) +'px; height: '+h+'px; background-color: #eee; opacity: 0.67; z-index: 900; '
				+'position: absolute; left: '+sl+'px; top: '+st+'px; }'
			document.body.appendChild(boxSt);
			var overlay = document.createElement('div');
			overlay.setAttribute('id','overlay');
			var box = document.createElement('div');
			box.setAttribute('id','configBox');
			var boxTitle = document.createElement('div');
			boxTitle.setAttribute('id','configTitle');
			boxTitle.innerHTML = 'Sensible Watchlist '+gSEWatchListVersion+' configuration';
			box.appendChild(boxTitle);
			var boxText = document.createElement('div');
			boxText.style.whiteSpace = 'normal';
			boxText.style.padding = '10px 0px';
			boxText.innerHTML = 'Changes take effect on next page load.';
			box.appendChild(boxText);
			
			// args: greasemonkey variable name, label for checkbox
			function addToBox(gmVar,label,defVal) {
				var bool = typeof(defVal) == 'boolean';
				var cb = document.createElement('input');
				cb.setAttribute('type',(bool) ? 'checkbox' : 'text');
				if (!bool) {
					cb.maxLength = 7;
					cb.style.width = '70px';
				}
				cb.style.display = 'inline';
				cb.style.marginRight = '8px';
				cb.setAttribute('gmVar',gmVar);
				if (bool) cb.checked = GM_getValue(gmVar,defVal);
				else cb.value = GM_getValue(gmVar,defVal);
				var txt = document.createTextNode(label);
				var br = document.createElement('br');
				box.appendChild(cb);
				box.appendChild(txt);
				box.appendChild(br);
			}
			
			// Checkboxes!
			for (var i=0; i<options.length; i++) {
				addToBox(options[i][0],options[i][1],options[i][2]);
			}
			
			var Buttons = document.createElement('div');
			Buttons.style.textAlign = 'right';
			var OKbutton = document.createElement('button');
			var CANCELbutton = document.createElement('button');
			OKbutton.innerHTML = 'OK';
			CANCELbutton.innerHTML = 'CANCEL';
			Buttons.appendChild(OKbutton);
			Buttons.appendChild(CANCELbutton);
			box.appendChild(Buttons);
			document.body.appendChild(box);
			document.body.appendChild(overlay);

			// center dialog
			box.style.left = Math.floor(sl + (w / 2 - box.offsetWidth / 2)) + 'px';
			box.style.top = Math.floor(st + (h / 2 - box.offsetHeight / 2)) + 'px';

			OKbutton.addEventListener('click',function() {
				var cfgItems = box.getElementsByTagName('input');
				for (var i=0; i<cfgItems.length; i++) {
					var gmVal = (cfgItems[i].type == 'text') ? (cfgItems[i].value || options[i][2]) : cfgItems[i].checked;
					GM_setValue(cfgItems[i].getAttribute('gmVar'),gmVal)
					fblog('set '+cfgItems[i].getAttribute('gmVar')+'='+gmVal);
				}
				document.body.removeChild(overlay);
				document.body.removeChild(box);
				document.body.removeChild(boxSt);
				if (GM_getValue('autorefresh',null)) {
					location.reload();
				}
			},false);

			CANCELbutton.addEventListener('click',function() {
				document.body.removeChild(overlay);
				document.body.removeChild(box);
				document.body.removeChild(boxSt);
			},false);

		}
	};

	var settings = new Config();

	GM_registerMenuCommand('Sensible WatchlistvFH Settings...', settings.showConfig);
	// End of Rojo^'s "stolen" code

	function quickSort(arrTable, intColumn, sp, zg) {
		var k = arrTable[Math.round((sp + zg) / 2)][intColumn];
		var i = sp;
		var j = zg;
		while (j > i) {
			while (arrTable[i][intColumn] < k) {
				++i;
			}
			while (k < arrTable[j][intColumn]) {
				j = j - 1;
			}
			if (i <= j) {
				var d = arrTable[i];
				arrTable[i] = arrTable[j];
				arrTable[j] = d;
				++i;
				j = j - 1;
			}
		}
		if (sp < j) {
			quickSort(arrTable, intColumn, sp, j);
		}
		if (i < zg) {
			quickSort(arrTable, intColumn, i, zg);
		}
	};

	function sortWL() {
		var entries = wl.innerHTML.split('\n');
		var wlEntries = [];
		for (var i=0; i<entries.length; i++) {
			var x = wlEntries.length;
			wlEntries[x] = [];
			wlEntries[x][0] = entries[i];
			wlEntries[x][1] = entries[i].replace(/<[^>]*>/g,'').toLowerCase();
		}
		quickSort(wlEntries,1,0,wlEntries.length - 1);
		entries = [];
		for (var i=0; i<wlEntries.length; i++) {
			entries.push(wlEntries[i][0]);
		}
		wl.innerHTML = entries.join('\n');
	};


	// MAIN
	lRegex = new RegExp("\W?\s?new");
	lbNewComments = false;

	// HTML Codes to signal that the list is opened or closed
	// Made it the entire HTML string to make it easier to edit in a single place
	gFHSigns.push(['Open', '<a title="Click to hide">&or;&nbsp;Entry Watch List</a>']);
	gFHSigns.push(['Close', '<a title="Click to show">&there4;&nbsp;Entry Watch List</a>']);

	gOtherSigns.push(['Open', '<a title="Click to hide">&#9660;&nbsp;Entry Watch List</a>']);
	gOtherSigns.push(['Close', '<a title="Click to show">&#9654;&nbsp;Entry Watch List</a>']);

	for (var i = 0, el; el = bodyChildren.snapshotItem(i); i++) {
		if (el.className == 'left_col') {
			leftColChildren = el.childNodes;
			if (leftColChildren.length > 0) {
				for (var j = 0, fm; fm = leftColChildren[j]; j++) {
					if (fm.innerHTML == 'Entry Watch List') {
						// watch list heading found
						wlHeading = fm;
						wl = leftColChildren[j+3];	// the watch list itself

						if (settings.fh_symbols() )
							wlHeading.innerHTML = gFHSigns[0][1];
						else
							wlHeading.innerHTML = gOtherSigns[0][1];

						wlHeading.style.color = 'blue';
						wlHeading.style.textDecoration = 'underline';
					} 
					else if (fm.className == 'entry_details_text' && fm.nodeName == 'DIV') {
						// watchlist item found
						wlTest = fm.childNodes;
						for (var k = 0, gn; gn = wlTest[k]; k++) {
							if (lRegex.test(gn.innerHTML)) {
								// Replace &middot; with 'o'
								wlTest[k-8].innerHTML = 'o';

								if( !lbNewComments ){
									lbNewComments = true;
								}
							}
						}
					}
				}
			}
		}
	}

	if (wlHeading && wlHeading.style) {
		wlHeading.style.cursor = 'pointer';
		wlHeading.addEventListener('click', toggle_watchlist, false);
		sortWL();

		//wl_read_cookie() stores the boolean value if the list is to be hidden
		if ( settings.autoopen() && lbNewComments == true )
			show_watchlist();
		else if ( settings.autoopen() && !lbNewComments )
			hide_watchlist();
		else
			(wl_read_cookie() == 1) ? hide_watchlist() : show_watchlist();
	}
})();