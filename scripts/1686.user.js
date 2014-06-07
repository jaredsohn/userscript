// ==UserScript==
// @name            Linkapedia
// @namespace       http://orthanc.co.nz
// @description     Linkapedia keeps a list of links for a given domain. This is intended for sites like Wikipedia, Uncyclopedia and Foldoc where reading a single entry links to a lot of related material. Followed links can be automatically stored by Linkapedia to be viewed later. This provides a little extra functinoality over just bookmarking the page. Namely, it's automatic, there are no duplicates, and it is possible to just grab a random page to read.
// @include         http://en.wikipedia.org/wiki/*
// @include         http://uncyclopedia.org/wiki/*
// @include         http://foldoc.doc.ic.ac.uk/foldoc/*
// ==/UserScript==
//
// Licence:
// This script is released under the GNU General Public Licence (Version 2).
//
// Avaliable here: http://www.fsf.org/licensing/licenses/gpl.txt
//


(function() {
	// The name to save the pages map under (cookie or GM_setValue)
	const pagesMapName = 'linkapedia-pages';
	// The name to save the configuration under (cookie or GM_setValue)
	const configMapName = 'linkapedia-config';

	// The key of the autoAdd flag in the configuration map
	const configAutoAdd = 'autoAdd';
	// The key of the top position in the configuration map
	const configPosTop = 'posTop';
	// The key of the left position in the configuration map
	const configPosLeft = 'posLeft';

	// The margin to apply to (almost) all elements
	const margin = '5px 5px 5px 5px';

	// The configuration map
	var config = getConfig();
	// A map of pages keyed by url, valued by title
	var pages = getPages();

	// The page <select>
	var pageSelect;
	// The button for adding or removing a page
	var addRemoveButton;
	// The checkbox for turning on and off auto add
	var autoAddCheckbox
	
	// Add the Controls to the page
	addControls();
	// If auto save is on, save the current page
	if (config[configAutoAdd]) {
		addCurrentPage();
	}

	/*
	 * Add the floating controls panel to the current page.
	 */
	function addControls() {
		var controlDiv = createDragableDiv('linkapedia-controls', 'Linkapedia Controls', config[configPosTop], config[configPosLeft]);
		document.body.insertBefore(controlDiv, document.body.firstChild);

		var mainDiv = getMainDiv(controlDiv);
		
		// Create and add the page select drop down
		pageSelect = document.createElement('SELECT');
		mainDiv.appendChild(pageSelect);
		pageSelect.onchange = changePage;
		pageSelect.style.margin = margin;
		rebuildPageSelect();

		mainDiv.appendChild(document.createElement('BR'));

		// Create and add the add / remove button
		addRemoveButton = document.createElement('BUTTON');
		mainDiv.appendChild(addRemoveButton);
		addRemoveButton.style.margin = margin;
		if (pages[document.location]) {
			addRemoveButton.appendChild(document.createTextNode("Remove"));
			addRemoveButton.onclick = removeCurrentPage;
		} else {
			addRemoveButton.appendChild(document.createTextNode("Add"));
			addRemoveButton.onclick = addCurrentPage;
		}

		// Create and add the remove and random button
		var removeAndRandomButton = document.createElement('BUTTON');
		mainDiv.appendChild(removeAndRandomButton);
		removeAndRandomButton.style.margin = margin;
		removeAndRandomButton.appendChild(document.createTextNode("Remove & Random Page"));
		removeAndRandomButton.onclick = removeAndRandomPage;

		// Create and add the random button
		var randomButton = document.createElement('BUTTON');
		mainDiv.appendChild(randomButton);
		randomButton.style.margin = margin;
		randomButton.appendChild(document.createTextNode("Random Page"));
		randomButton.onclick = randomPage;

		mainDiv.appendChild(document.createElement('BR'));

		// Create and add the auto add checkbox label
		var autoAddLabel = document.createElement('B');
		mainDiv.appendChild(autoAddLabel);
		autoAddLabel.style.margin = margin;
		autoAddLabel.style.fontSize = '10pt';
		autoAddLabel.appendChild(document.createTextNode('Auto Add New Pages: '));

		// Create and add the auto add checkbox
		autoAddCheckbox = document.createElement('input');
		mainDiv.appendChild(autoAddCheckbox);
		autoAddCheckbox.setAttribute('type', 'checkbox');
		autoAddCheckbox.onclick = updateAutoAdd;
		updateAutoAddCheckbox();
	}

	/*
	 * Create a div with a dragable title bar (such as the controls panel).
	 * 
	 * @param id the id of the outer div to be used for the drag callbacks
	 * @param the title to put in the title bar
	 * @param top the top position of the outer div
	 * @param left the left position of the outer div
	 * @return the dragable div
	 */
	function createDragableDiv(id, title, top, left) {
		// Create the outter div
		var outerDiv = document.createElement('DIV');
		outerDiv.setAttribute('id', id);
		if (top) {
			outerDiv.style.top = top;
		}
		if (left) {
			outerDiv.style.left = left;
		}
		outerDiv.style.backgroundColor = '#6699FF';
		outerDiv.style.opacity = .7
		outerDiv.style.borderColor = 'black';
		outerDiv.style.borderStyle = 'solid';
		outerDiv.style.borderWidth = '3px';
		outerDiv.style.position = 'fixed';
		outerDiv.style.zIndex = 100;
		outerDiv.style.margin = margin;

		// Create the content div
		var mainDiv = document.createElement('DIV');
		
		// Create the title bar div with the drag callbacks
		var handleDiv = document.createElement('DIV');
		outerDiv.appendChild(handleDiv);
		handleDiv.appendChild(document.createTextNode(title));
		handleDiv.setAttribute('title', 'Click and Drag to move panel. Double click to minimize / restore');
		handleDiv.onmousedown = (function(event) {dragStart(event, id);});
		handleDiv.onmouseup = (function(event) {dragStopAndSave(event, id);});
		// Hide the content div on double click of the header
		handleDiv.ondblclick = (function(event) {
			if (mainDiv.style.display == 'none') {
				mainDiv.style.display = 'block';
			} else {
				mainDiv.style.display = 'none';
			}
			// Hack to force a refresh of the layout
			// Otherwise the div stays big till clicked on
			var pos = parseInt(outerDiv.style.left);
			outerDiv.style.left = (pos - 1) + 'px';
			outerDiv.style.left = (pos + 1) + 'px';
		});
		handleDiv.style.backgroundColor = '#000000';
		handleDiv.style.color = '#FFFFFF';
		handleDiv.style.fontWeight = 'bold';
		handleDiv.style.fontSize = '9pt';
		handleDiv.style.textAlign = 'center';
		handleDiv.style.padding = '5px 5px 5px 5px';
		handleDiv.style.marginBottom = '5px';

		outerDiv.appendChild(mainDiv);
		return outerDiv;
	}

	/*
	 * Get the main div (i.e. the one to add content to)
	 * from a draggable div.
	 *
	 * @param outerDiv the draggable div
	 * @return the main div
	 */
	function getMainDiv(outerDiv) {
		return outerDiv.childNodes[1];
	}

	/*
	 * Refill the options of the page select to match the current
	 * values in the pages map.
	 */
	function rebuildPageSelect() {
		for (var node = pageSelect.firstChild; node; node = pageSelect.firstChild) {
			pageSelect.removeChild(node);
		}
		addSelectOption(pageSelect, '', 'NO', '-- Go To Page --');
		var sortedPages = getSortedTitleKeyedPages();
		var locationStr = '' + document.location;
		for (pageTitle in sortedPages) {
			addSelectOption(pageSelect, sortedPages[pageTitle], locationStr, pageTitle);
		}
	}

	/*
	 * Update the checked status of the auto add checkbox to match the config.
	 */
	function updateAutoAddCheckbox() {
		autoAddCheckbox.checked = config[configAutoAdd];
	}

	/*
	 * Add an option to the select.
	 *
	 * @param select the select element to add the option to
	 * @param value the value of the option
	 * @param selectedValue the currently selected value, if equal to value, then the option will be selected
	 * @param name the display name of the option
	 */
	function addSelectOption(select, value, selectedValue, name) {
		var option = document.createElement('OPTION');
		select.appendChild(option);
		option.setAttribute('value', value);
		option.appendChild(document.createTextNode(name));
		// Setting the select attribute through the DOM doesn't seem to work
		if (value == selectedValue) {
			select.options[select.options.length-1].selected = true;
		}
	}

	/*
	 * Creates a map with the same information as the pages map but
	 * it is keyed and sorted by title.
	 */
	function getSortedTitleKeyedPages() {
		// Produce a title keyed map
		var titleKeyed = new Array();
		var titles = new Array();
		for (key in pages) {
			var title = pages[key];
			// Generate a unique title if there are two URLs with the same title.
			while (titleKeyed[title]) {
				title = title + '1';
			}
			titleKeyed[title] = key;
			titles[titles.length] = title;
		}
	
		// Create another map sorted by title
		titles.sort();
		var sortedPages = new Array();
		for (var i = 0; i < titles.length; i++) {
			sortedPages[titles[i]] = titleKeyed[titles[i]];
		}
		return sortedPages;
	}

	/*
	 * Event call back for the selection being changed on the page select.
	 * A call to this function will load the page who's URI is the value
	 * of the event target.
	 *
	 * @param event the on change event
	 */
	function changePage(event) {
		if (event.target.value) {
			document.location = event.target.value;
		}
	}

	/*
	 * Add the current page to the link list if it doesn't alredy exist.
	 */
	function addCurrentPage() {
		addPage(document.location, document.title);

		var label = addRemoveButton.firstChild;
		if (label) {
			addRemoveButton.removeChild(label);
		}
		addRemoveButton.appendChild(document.createTextNode("Remove"));
		addRemoveButton.onclick = removeCurrentPage;
	}

	/*
	 * Add a page to the link list if it's not already present.
	 *
	 * @param url the URL of the page to add
	 * @param title the title of the page to add
	 */
	function addPage(url, title) {
		pages = getPages();
		pages[url] = title;
		savePages();
		rebuildPageSelect();
	}

	/*
	 * Add the current page frp, the link list if it's present.
	 */
	function removeCurrentPage() {
		removePage(document.location);

		var label = addRemoveButton.firstChild;
		if (label) {
			addRemoveButton.removeChild(label);
		}
		addRemoveButton.appendChild(document.createTextNode("Add"));
		addRemoveButton.onclick = addCurrentPage;
	};

	/*
	 * Remove a page from the link list if it's present.
	 *
	 * @param url the URL of the page to remove
	 */
	function removePage(url) {
		pages = getPages();
		delete pages[url];
		savePages();
		rebuildPageSelect();
	}

	/*
	 * Event call back for the Remove and Random button.
	 * A call to this function will remove the current page from the
	 * link list and go to a random page.
	 *
	 * @param event the on click event
	 */
	function removeAndRandomPage(event) {
		removeCurrentPage();
		randomPage(event);
	}

	/*
	 * Event call back for the Random button.
	 * A call to this function will go to a random page from the
	 * link list.
	 *
	 * @param event the on click event
	 */
	function randomPage(event) {
		var size = 0;
		for (url in pages) {
			size++;
		}
		var index = Math.floor(size * Math.random());
		var i = 0;
		for (url in pages) {
			if (i == index) {
				document.location = url;
				return;
			}
			i++;
		}
		alert('No more pages in queue.');
	}

	/*
	 * Event call back for the Auto Add check box.
	 * This just saves the changed config.
	 *
	 * @param event the on click event
	 */
	function updateAutoAdd(event) {
		if (event.target.checked) {
			config[configAutoAdd] = 'true'
		} else {
			delete config[configAutoAdd];
		}
		saveConfig();
	}

	/*
	 * Event callback for the on mouse up event of the drag handle.
	 * This is just a wrapper around dragStop to save the new position
	 * to the configuration.
	 *
	 * @param event the mouse up event
	 * @param id the id of the element to get the position of, if unspecified
	 *		the target of the event will be used
	 */
	function dragStopAndSave(event, id) {
		dragStop(event);
		var target;
		if (id) {
			target = document.getElementById(id);
		} else {
			target = event.target;
		}
		// Reload the config incase the autoSave has changed
		// on another page. Positioning is considered more
		// transient so it is not reloaded when auto save
		// is changed to prevend random jumping
		config = getConfig();
		updateAutoAddCheckbox();
		if (target.style.top && target.style.left) {
			config[configPosTop] = target.style.top
			config[configPosLeft] = target.style.left
			saveConfig();
		}
	}

	/*
	 * Persist the pages map.
	 */
	function savePages() {
		saveMapVariable(pagesMapName, pages);
	}

	/*
	 * Load the persistent pages map.
	 *
	 * @return the pages map
	 */
	function getPages() {
		return getMapVariable(pagesMapName);
	}

	/*
	 * Persist the config map.
	 */
	function saveConfig() {
		saveMapVariable(configMapName, config);
	}

	/*
	 * Load the persistent config map.
	 *
	 * @return the config map
	 */
	function getConfig() {
		return getMapVariable(configMapName);
	}
	
	/*
	 * Load a persistent map from a string.
	 *
	 * @param varName the name of the map to load
	 * @return the map
	 */
	function getMapVariable(varName) {
		var values = new Array();
		var valuesStr = decodeURIComponent(getValue(varName));
		if (valuesStr) {
			var pairs = valuesStr.split('&');
			for(var i = 0; i < pairs.length; i++) {
				var pair = pairs[i].split('=');
				var key = decodeURIComponent(pair[0]);
				var value = decodeURIComponent(pair[1]);
				values[key] = value;
			}
		}
		return values;
	}

	/*
	 * Persist a map to a string
	 *
	 * @param varName the name of the map
	 * @param map the map to save
	 */
	function saveMapVariable(varName, map) {
		var values = new Array();
		var pairs = new Array();
		var i = 0;
		for (key in map) {
			var value = map[key];
			pairs[i] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
			i++;
		}
		var joinedPairs = pairs.join('&');
		var valuesStr = encodeURIComponent(joinedPairs);
		setValue(varName, valuesStr);
	}

	/*
	 * Get a domain specific value. This uses GM_getValue if avaliable
	 * prefixing the key with the domain. Otherwise the value is got
	 * from a cookie named key.
	 *
	 * @param key the name of the value to get
	 * @return the value
	 */
	function getValue(key) {
		if (GM_getValue) {
			return GM_getValue(getDomain() + key, '');
		} else {
			getCookie(key);
		}
	}

	/*
	 * Set a domain specific value. This uses GM_setValue if avaliable
	 * prefixing the key with the domain. Otherwise the value is set on
	 * a cookie named key.
	 *
	 * @param key the name of the value to set
	 * @param value the value to set
	 */
	function setValue(key, value) {
		if (GM_setValue) {
			GM_setValue(getDomain() + key, value);
		} else {
			setCookie(key, value);
		}
	}

	/*
	 * Trims the protocol and path off the url of the current page
	 * to get the domain for prefixing parameters set using GM_setValue.
	 *
	 * @return the domain of the current page
	 */
	function getDomain() {
		var locationString = '' + document.location;
		return locationString.split('/')[2];
	}

	/*
	 * Get the value of a cookie.
	 * 
	 * @param cookieName the name of the cookie to get
	 * @return the value of the cookie
	 */
	function getCookie(cookieName) {
		var cookies = document.cookie.split('; ');
		for (var i = 0; i < cookies.length; i++) {
			var oneCookie = cookies[i].split('=');
			if (oneCookie[0] == cookieName) {
				return oneCookie[1];
			}
		}
	}

	/*
	 * Set the value of a cookie.
	 * 
	 * @param cookieName the name of the cookie to set
	 * @param the value of the cookie
	 */
	function setCookie(cookieName, value) {
		var date = new Date();
		var days = 365;
		date.setTime(date.getTime() + (days*24*60*60*1000));
		var expires = '; expires=' + date.toGMTString();
		document.cookie = cookieName + '=' + value + expires + '; path=/';
	}









	/*
	 * Drag and drop support for the controls panel.
	 * from: http://www.brainjar.com/dhtml/drag/
	 * with IE support removed
	 *  
	 * As stated at http://www.brainjar.com/terms.asp
	 * This code is GPL so it's OK to use as this entire
	 * script is released under GPL
	 */
	var dragObj = new Object();
	dragObj.zIndex = 999;

	function dragStart(event, id) {
		var el;
		var x, y;

		if (id) {
			dragObj.elNode = document.getElementById(id);
		} else {
			dragObj.elNode = event.target;
		}

		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;

		// Save starting positions of cursor and element.

		dragObj.cursorStartX = x;
		dragObj.cursorStartY = y;
		dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
		dragObj.elStartTop  = parseInt(dragObj.elNode.style.top,  10);

		if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
		if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;

		// Update element's z-index.

		dragObj.elNode.style.zIndex = ++dragObj.zIndex;

		// Capture mousemove and mouseup events on the page.

		document.addEventListener("mousemove", dragGo,   true);
		document.addEventListener("mouseup",   dragStop, true);
		event.preventDefault();
	}

	function dragGo(event) {
		var x, y;

		// Get cursor position with respect to the page.
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;

		// Move drag element by the same amount the cursor has moved.

		dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
		dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
		event.preventDefault();
	}

	function dragStop(event) {
		// Stop capturing mousemove and mouseup events.
		document.removeEventListener("mousemove", dragGo,   true);
		document.removeEventListener("mouseup",   dragStop, true);
	}
})();

