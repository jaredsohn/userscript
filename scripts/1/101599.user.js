// ==UserScript==
// @name           eZ Debug Box
// @namespace      EzDebugBox
// @author         Valentin Faïsse
// @version        1.2.1
// @description    Displays eZ Publish debug in a lightbox, allows you to filter debug output by level and adds an HTML inspector
// @include        http*
// @grant	   GM_addStyle
// @downloadURL	   https://userscripts.org/scripts/source/101599.user.js
// @updateURL	   https://userscripts.org/scripts/source/101599.meta.js
// ==/UserScript==
if (document.getElementById('debug')) {

	var addStyle = "#debug { z-index:99; }";
	addStyle += ".ezdebugbox-highlight { border : 2px blue solid; }";
	addStyle += ".ezdebugbox-hide { display:none; }";
	addStyle += ".ezdebugbox-path { z-index:99; font-size:13px; position:fixed; top:0; left:0; opacity:1; background-color:grey; padding:5px 7px; color:white !important; }";
	addStyle += "#debug.ezdebugbox { background-color:white; z-index:99; height:80%; width:80%; overflow:scroll; position:fixed; top:0; margin:5% auto auto 10%; border:2px solid black; padding:10px;}";
	addStyle += ".ezdebugbox-button { position:fixed; right:0; z-index:99; top:0; background-color:rgba(95, 95, 95, 0.7); }";
        addStyle += ".ezdebugbox-button a { color:white; font-size:10px; font-weight:bold; font-family:verdana; display:inline-block; line-height:25px; padding:0 1em; text-decoration:none; }";
	addStyle += ".ezdebugbox-button .ezdebugbox-warning { color:orange; }";
	addStyle += ".ezdebugbox-button .ezdebugbox-error { color:#FF4F4F; }";
	addStyle += ".ezdebugbox-button .ezdebugbox-button-inspect { text-decoration:none; font-style:italic; margin-left:2px; }";
	addStyle += ".ezdebugbox-button .ezdebugbox-button-inspect.active { background-color:rgba(182, 182, 182, 0.7); }";
	addStyle += '.ezdebughighlighter { background-color: grey; position: absolute; z-index: 1000000; }';
    	addStyle += '.ezdebughighlighter_label { background-color: grey; border-radius: 2px; color: #fff; font: bold 12px/12px Helvetica, sans-serif; padding: 4px 6px; position: absolute; text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25); z-index: 1000001; }';
	GM_addStyle(addStyle);
		
	// Debug Box
	var debug = document.getElementById('debug');
	debug.classList.add('ezdebugbox-hide');
	debug.classList.add('ezdebugbox');
	
	// Helpers	
	var addEvent = function(elem,_type,_delegate) {  
		elem.addEventListener (_type, _delegate, false);  
	}
	
	var removeEvent = function (element, _type, _delegate) {
		element.removeEventListener(_type, _delegate, false);
	}
	
	var setStyles = function (element, properties) {
		for(var name in properties) {
			element.style.setProperty(name, properties[name], 'important');
		}
	}
	
	// DOM Inspector
	var Inspector = function () {
		var pub = {};
		var self = {
			opts: {namespace: 'ezdebughighlighter', stopOnClick: true},
			active: false,
			elements: {}
		};
		
		self.elements.top = document.createElement('div');
		self.elements.bottom = document.createElement('div');
		self.elements.left = document.createElement('div');
		self.elements.right = document.createElement('div');
		
		for(var i in self.elements) {
			self.elements[i].classList.add(self.opts.namespace);
		}
		
		self.elements.label = document.createElement('div');
		self.elements.label.classList.add(self.opts.namespace + '_label');

		function updateOutlinePosition(e) {
			if (e.target.className.indexOf(self.opts.namespace) !== -1) return;
			pub.element = e.target;

			var b = 2;
			var scroll_top = window.scrollY;
			var pos = pub.element.getBoundingClientRect();
			var top = pos.top + scroll_top;

			var label_text = getPathFromElement(pub.element, false);
			if (label_text) {
				label_text = '..' + label_text.substring(label_text.lastIndexOf('/'));
			}
			
			self.elements.label.textContent = label_text;
			setStyles(self.elements.label, { top: Math.max(0, top - 20 - b, scroll_top) + 'px', left: Math.max(0, pos.left - b) + 'px' });
			setStyles(self.elements.top, { top: Math.max(0, top - b) + 'px', left: pos.left - b + 'px', width: pos.width + b + 'px', height: b + 'px' });
			setStyles(self.elements.bottom, { top: top + pos.height + 'px', left: pos.left - b + 'px', width: pos.width + b + 'px', height: b + 'px' });
			setStyles(self.elements.left, { top: top - b + 'px', left: Math.max(0, pos.left - b) + 'px', width: b + 'px', height: pos.height + b + 'px' });
			setStyles(self.elements.right, { top: top - b + 'px', left: pos.left + pos.width + 'px', width: b + 'px', height: pos.height + (b * 2) + 'px' });
		}

		pub.start = function () {
			if (self.active !== true) {
				self.active = true;
				for(var i in self.elements) {
					document.body.appendChild(self.elements[i]);
				}
				addEvent(document.body, 'mousemove', updateOutlinePosition);
			}
		};

		pub.stop = function () {
			self.active = false;
			removeEvent(document.body, 'mousemove', updateOutlinePosition);
			for(var i in self.elements) {
				if (self.elements[i].ownerDocument) {
					document.body.removeChild(self.elements[i]);
				}
			}
		};

		return pub;
	};
			
	// Button click event
	var debugBoxVisible = false;
	var openDebugBox = function (event) {
		if (debugBoxVisible == false) {
			debug.classList.remove('ezdebugbox-hide');
			debug.style.setProperty('display', 'block');
			debug.focus();
		} else {
			debug.classList.add('ezdebugbox-hide');
			debug.style.setProperty('display', 'none');
		}
		
		debugBoxVisible = !debugBoxVisible;
		if (event) event.preventDefault();
	}

	// shortcut Alt + F12
	var lastKeyCode = false;
	var onKeyPress = function (e) {
		var keyCode = (window.event) ? event.keyCode : e.keyCode;
		// 18 = Alt, 123 = F12
		if (lastKeyCode == 18 && keyCode == 123) openDebugBox(e);
		lastKeyCode = keyCode;
	}
	addEvent(document, 'keydown', onKeyPress);
			
	// Extract debug info
	var count = 0, debugTextValue = 'Debug', cssClass = false;
	if (document.getElementById('ezdebug-first-error')) {
		cssClass = 'ezdebugbox-error';
		var spans = [], span = false;
		var iterator = document.evaluate('//td[contains(@class,"debugheader")]//span[contains(text(), "Error")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
		while(span = iterator.iterateNext()) count++;
		debugTextValue = 'Error (' + count + ')';
	} else if (document.getElementById('ezdebug-first-warning')) {
		cssClass = 'ezdebugbox-warning';
		var spans = [], span = false;
		var iterator = document.evaluate('//td[contains(@class,"debugheader")]//span[contains(text(), "Warning")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
		while(span = iterator.iterateNext()) count++;
		debugTextValue = 'Warning (' + count + ')';
	}
		
	// Info part of button
	var infoButton = document.createElement('a');
	infoButton.classList.add('ezdebugbox-button-info');
	infoButton.setAttribute('href', '#');
	infoButton.classList.add(cssClass);
	addEvent(infoButton, 'click', openDebugBox);
	infoButton.appendChild(document.createTextNode(debugTextValue));
	
	// Inspect part debug button
	var inspectButtonActive = false;
	var inspectButton = document.createElement('a');
	inspectButton.setAttribute('href', '#');
	inspectButton.classList.add('ezdebugbox-button-inspect');
	inspectButton.appendChild(document.createTextNode('i'));
	
	var inspector = new Inspector();
	
	var inspectButtonClick = function (event) {
		inspectButtonActive = !inspectButtonActive;
		
		if (!inspectButtonActive) {
			blur();
			inspector.stop();
		} else {
			var snapshot = document.evaluate('//comment()[contains(., "including template")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (snapshot.snapshotLength == 0) {
				inspectButtonActive = false;
				alert('[TemplateSettings] / Debug in site.ini must be enabled');
				return false;
			}
			inspector.start();
		}
		
		inspectButton.classList.toggle('active');
		if (event) event.stopPropagation();
		
		return false;
	}
	
	addEvent(inspectButton, 'click', inspectButtonClick);
	
	// Debug button
	var debugButton = document.createElement('p');
	debugButton.classList.add('ezdebugbox-button');
	debugButton.appendChild(infoButton);
	debugButton.appendChild(inspectButton);
   	document.body.appendChild(debugButton);
	
	// Path info container
	var debugPathElement = document.createElement('p');
	debugPathElement.classList.add('ezdebugbox-path');
	debugPathElement.classList.add('ezdebugbox-hide');
	document.body.appendChild(debugPathElement);
	
	// Hide path info and highlighter
	var blur = function () {
		debugPathElement.classList.add('ezdebugbox-hide');
		var elements = document.getElementsByClassName('ezdebugbox-highlight');
		for (var i=0; i < elements.length; i++) {
			elements[i].classList.remove('ezdebugbox-highlight');
		}
	}
	
	// Return path of element
	var getPathFromElement = function (element, recursive) {
		var item = false, comment = false, stopComment = 0;
		snapshot = document.evaluate('./preceding::comment()[contains(., "including template")]', element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=snapshot.snapshotLength - 1; i >= 0; i--) {
			item = snapshot.snapshotItem(i);
			if (item.data.lastIndexOf('STOP') != -1) {
				stopComment = stopComment + 1;
			} else if (item.data.lastIndexOf('START') != -1) {
				if (stopComment == 0) {
					comment = item;
					break;
				} else {
					stopComment = stopComment - 1;
				}
			}
		}
		
		if (comment) {
			var startCommentPrefix = ' START: including template: ';
			var startDesignPosition = comment.data.lastIndexOf('(');
			
			var path = comment.data.substring(startCommentPrefix.length);
			path = path.substring(0, path.lastIndexOf('('));
			if (recursive == true) {
				path = [path];
				
				var parentPath = getPathFromElement(comment.parentNode, true);
				if (parentPath) {
					for(var i in parentPath) {
						path.push(parentPath[i]);
					}
				}
			}
			
			return path;
		}
		
		return false;
	}

	// Highlighter
	var hoverClick = function (event) {
		blur();
		if (!inspectButtonActive) return false;

		while ( debugPathElement.hasChildNodes() ) {
			debugPathElement.removeChild( debugPathElement.childNodes[0] );
		}

		var path = getPathFromElement(event.target, true);
		if (path) {
			for(var i = path.length - 1; i >= 0; i--) {
				debugPathElement.appendChild(document.createTextNode(path[i]));
				debugPathElement.appendChild(document.createElement('br'));
			}
			debugPathElement.classList.remove('ezdebugbox-hide');
		}
	}
	
	var bodyClick = function (event) {
		if (inspectButtonActive) {
			inspectButtonClick(event);
		}
	}
	
	// Attach event
	addEvent(document.body, 'click', bodyClick);
	addEvent(document.body, 'mouseover', hoverClick);
	addEvent(debugButton, 'mouseover', function (event) { event.stopPropagation(); blur(); });
	addEvent(debugButton, 'mousemove', function (e) { e.stopPropagation(); blur(); });
	addEvent(debug, 'mouseover', function (event) { event.stopPropagation(); blur(); });
	
	// eZ-Filter-Debug
	// https://github.com/Open-Wide/eZ-Filter-Debug
	(function (debug_element) {
		// Add the debug stylesheet
		var is_debug_stylesheet_loaded = false;
		for (i = 0; i < document.styleSheets.length; i++) {
			if (document.styleSheets[i].href) {
				if (document.styleSheets[i].href.replace(/^.*[\/\\]/g, '') == 'debug.css') {
					is_debug_stylesheet_loaded = true;
				}
			}
		}
		if (!is_debug_stylesheet_loaded) {
			var e = document.createElement('link');
			e.setAttribute('type', 'text/css');
			e.setAttribute('media', 'screen');
			e.setAttribute('rel', 'stylesheet');
			e.setAttribute('href', '/design/standard/stylesheets/debug.css');
			document.body.appendChild(e);
		}

		// Function that add a class name to identify the different type of debug content
		var get_marker_from_span_content = function (span_content) {
			return 'debug_filter_' + span_content.toLowerCase();
		}

		// Function that add a class name to identify the different type of debug content
		var add_debug_filter_marker = function (element, marker) {
			if (element !== null) {
				var filter_className = 'debug_filter_item';
				var index_of = -1;
				if (element.className) {
					index_of = element.className.indexOf(filter_className);
				}
				if (index_of == -1) {
					element.className += ' ' + filter_className + ' ' + marker;
				}
			}
		}

		// Re factor the debug table
		if (debug_element !== null) {
			var table_element = debug_element.getElementsByTagName('table');
			if (table_element.length > 0) {
				table_element = table_element[0];
				table_element.style.width = '100%';
				var table2_element = table_element.getElementsByTagName('table');
				if (table2_element.length > 0) {
					table_element = table2_element[0];
				}
				var debug_filters = {};
				var tr_elements = table_element.getElementsByTagName('tr');
				if (tr_elements.length > 0) {

					// Add marker on the rows
					var td_elements, span_elements, span_content, tr_filter_custom_className, index_of;
					for (var i = 0; i < tr_elements.length; i++) {
						td_elements = tr_elements[i].getElementsByClassName('debugheader');
						if (td_elements.length > 0) {
							span_elements = td_elements[0].getElementsByTagName('span');
							if (span_elements.length > 0) {
								span_content = span_elements[0].innerHTML;
								span_content = span_content.substr(0, span_content.length - 1);
								var marker = get_marker_from_span_content(span_content);
								add_debug_filter_marker(tr_elements[i++], marker);
								add_debug_filter_marker(tr_elements[i], marker);
								if (!debug_filters.hasOwnProperty(span_content)) {
									debug_filters[span_content] = {
										marker: marker,
										count: 1
									};
								} else {
									debug_filters[span_content].count++;
								}
							}
						}
					}

					// Add a header to filter the debug informations
					var ths = table_element.getElementsByTagName('th')
					if (ths.length == 0) {
						var tr = document.createElement('tr');
						tr_elements[0].parentNode.insertBefore(tr, tr_elements[0]);
						var th = document.createElement('th');
						th.style.padding = '5px 5px 15px';
						th.setAttribute('colspan', 2);
						th.innerHTML = 'Filtered display : ';
						tr.appendChild(th);
						var select = document.createElement('select');
						select.setAttribute('id', 'debug_filter');
						var option = document.createElement('option');
						option.innerHTML = 'All';
						option.setAttribute('value', 'debug_filter_item');
						select.appendChild(option);
						addEvent(select, 'change', function (event) {
							var select = event.target;
							var debug_filter_items = document.getElementsByClassName('debug_filter_item');
							if (debug_filter_items.length > 0) {
								for (var i = 0; i < debug_filter_items.length; i++) {
									if (debug_filter_items[i].className.indexOf(select.value) == -1) {
										debug_filter_items[i].style.display = 'none';
									} else {
										debug_filter_items[i].style.display = '';
									}
								}
							}
						});
						th.appendChild(select);
						for (var i in debug_filters) {
							if (debug_filters.hasOwnProperty(i)) {
								var option = document.createElement('option');
								option.innerHTML = i + ' (' + debug_filters[i].count + ')';
								option.setAttribute('value', debug_filters[i].marker);
								select.appendChild(option);
							}
						}
					}
				}
			}
		}
	})(debug);
}
