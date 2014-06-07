// ==UserScript==
// @name           Custom Reddit Header Bar
// @namespace      reddit.com
// @description    Replace reddits in the header bar with multis or links
// @author         http://www.reddit.com/user/pranavkm
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==


// ==/UserScript==

(function(){
	var ContextMenu = function(){
		var _items = [];
		var _contextMenu = null;
		var promptOnDelete = true;
		var _srBar;
		
		var _Key = 'RedditContextMenu';
		
		function init(){
			_contextMenu = document.getElementById('sr-header-area');
			if(!_contextMenu)
				return;
			// clear other sr-bars so the user has more space towork with
			var items = _contextMenu.querySelectorAll('ul.flat-list');
			for(var i = items.length - 1; i > 0; i--){
				//I have no clue why I'm removing this
				_contextMenu.removeChild(items[i].previousSibling);
				_contextMenu.removeChild(items[i]);
			}
			_srBar = items[0];
			
			
			//Retrieve items
			retrieveItems();
			messupStyles();
			setupMenu();
			setupCloseHandlers();
			
		}
		
		init();
		
		function setupMenu(){
			setupContextBar();
			setupEditMenu();
		}
		
		function setupContextBar(){
			//Apparently there are two items that are named the same thing. 
			if(!_srBar)
				return;
			while(_srBar.hasChildNodes()) 
				_srBar.removeChild(_srBar.firstChild);
			for(var i = 0; i < _items.length; i++){
				var listItem = createElement('li');
				if(i > 0)
					listItem.appendChild(createElement('span', {className: 'separator', innerHTML: '-'}));
				listItem.appendChild(createElement('a', {href: _items[i].url, innerHTML: _items[i].label}));
				_srBar.appendChild(listItem);
			}
				
		}
		
		function setupEditMenu(){
			var editMenu = document.getElementById('editMenu');
			if(!!editMenu)
				_contextMenu.removeChild(editMenu);
			
			var editMenu = createElement('div', {id: 'editMenu'}, {display: 'none'});
			
			editMenu.appendChild(createElement('a', {href: 'javascript:void(0);', className: 'choice', innerHTML: 'add'}, 
				{fontWeight: 'bold', width: '80%', display: 'block'}, function(){
				editMenu.style.display = 'none';
				addItem();
			}));
			editMenu.appendChild(createElement('hr'));
			
			var showMoveArrows = _items.length > 1;
			
			var linkPanel = createElement('div');
			editMenu.appendChild(linkPanel);
			
			function attrIndex(element, value) {
				var key = "data-idx";
				if(arguments.length == 1){
					return parseInt(element.getAttribute(key));
				}else{
					element.setAttribute(key, value);
					return element;
				}
			}
			
			for(var i = 0; i < _items.length; i++){
				var cItem = createElement('div', {className: 'choice'});
				attrIndex(cItem, i);
				var deleteHandler = function(element){ 
					if(promptOnDelete && !confirm('You sure mate?'))
						return;
					var index = attrIndex(element.parentNode);
					console.log(index);
					removeItem(index); 
					setupMenu();
					editMenu.style.display = 'none';
				}
				
				var editHandler = function(element){ 
					var index = attrIndex(element.parentNode);
					editItem(index);
					editMenu.style.display = 'none'; 
				}
				cItem.appendChild(createElement('a', { className: 'btn', href: 'javascript:void(0);', title: 'remove this item', innerHTML : 'X'}, 
					{cssFloat: 'left', color: '#F00'}, deleteHandler));
				
				cItem.appendChild(createElement('a', { className: 'edit', href: 'javascript: void(0);', title: 'edit this item', innerHTML: _items[i].label}, 
					{cssFloat: 'left', width: '70%', marginLeft: '4px'}, editHandler));
				
				var moveHandler = function(button, direction){
					var index = attrIndex(button.parentNode);
					moveItem(index, direction);
					newIndex = index + direction;
					// Repeat whatever code we had in moveHandler here. 
					if(newIndex < 0){
						// Move first item to last
						linkPanel.appendChild(linkPanel.removeChild(linkPanel.firstChild));
						for(var i = 0; i < linkPanel.childNodes.length; i++){
							attrIndex(linkPanel.childNodes[i], i);
						}
					}else if(newIndex >= _items.length){
						// Move last item to first
						linkPanel.insertBefore(linkPanel.removeChild(linkPanel.lastChild), linkPanel.firstChild);
						for(var i = 0; i < linkPanel.childNodes.length; i++){
							attrIndex(linkPanel.childNodes[i], i);
						}
					}else{
						// push somewhere in the middle
						if(index > newIndex){
							var t = index;
							index = newIndex;
							newIndex = t;
						}
						var earlierChild = linkPanel.childNodes[index];
						var laterChild = linkPanel.childNodes[newIndex];
						laterChild = linkPanel.insertBefore(linkPanel.removeChild(laterChild), earlierChild); 
						attrIndex(earlierChild, newIndex);
						attrIndex(laterChild, index);
					}
					setupContextBar();
				}
				
				if(showMoveArrows) {
					cItem.appendChild(createElement('a', {className: 'btn', href: 'javascript:void(0);', title: 'move down', innerHTML: '&#8681;'}, 
						{cssFloat: 'right'}, function(element){ moveHandler(element, 1); }));
					
					cItem.appendChild(createElement('a', {className: 'btn', href: 'javascript:void(0);', title: 'move up', innerHTML: '&#8679;'}, 
						{cssFloat: 'right'}, function(element){ moveHandler(element, -1); }));
				}
				cItem.appendChild(createElement('div', {}, {clear: 'both'}));
				linkPanel.appendChild(cItem);
			}

			var editLink = document.getElementById('sr-more-link');
			editLink.href = "javascript:void(0)";
			editLink.addEventListener('click', function(){
				editMenu.style.display = (editMenu.style.display == 'block') ? 'none' : 'block';
			}, false);
			_contextMenu.appendChild(editMenu);
			
		}
		
		function setupCloseHandlers(){
			document.body.addEventListener('click', function(evt){
				var editMenu = document.getElementById('editMenu');
				if(!editMenu)
					return;
				if((editMenu.style.display == 'block') && ((evt.pageX < editMenu.offsetLeft) || (evt.pageY > editMenu.offsetHeight))){
					editMenu.style.display = 'none';
				}
			}, false);
		}
		
		function messupStyles(){
			var styleDoc = document.styleSheets[0];
			var screenWidth = document.documentElement.offsetWidth;
			var length = styleDoc.cssRules.length;
			styleDoc.insertRule('#editMenu { width: 200px; maxHeight: 450px; overflow-y: auto; overflow-x: clip; background-color: white;  '
					+ ' border: 1px solid gray; z-index: 100; position: absolute; left: ' + (screenWidth - 210) + 'px; top: 15px}', length++);
			styleDoc.insertRule('#editMenu .choice{ margin: 3px; font-size: 13px }', length++);
			styleDoc.insertRule('#editMenu .choice *{ display: block; }', length++);
			styleDoc.insertRule('#editMenu .choice .edit:hover{ background-color: #F0F0F0}', length++);
			styleDoc.insertRule('#editMenu .btn {width: 8%; text-align: center; border: 1px solid #D00; background-color: #FFFFFF; font-weight: bold;}', length++);
		}
		
		function addItem(){
			var panel = createElement('div', {id: 'add-item-panel'}, {width: '100%', textAlign: 'right'});
			var labelField = createElement('input', {type: 'text', size: 20});
			var l = createElement('label', {innerHTML: 'Label: '}, {textTransform: 'none', fontWeight: 'bold'});
			l.appendChild(labelField);
			
			panel.appendChild(l);
			panel.appendChild(createElement('span', {innerHTML: '&nbsp; &nbsp;'}));
			var urlField = createElement('input', {type: 'text', size: 60});
			l = createElement('label', {innerHTML: 'Url: '}, {textTransform: 'none', fontWeight: 'bold'});
			l.appendChild(urlField);
			panel.appendChild(l);
			panel.appendChild(createElement('input', {value: 'add', type: 'button'}, null, function(){
				//~ Event.slideUp(panel);
				_items.push({label: labelField.value, url: urlField.value});
				_contextMenu.removeChild(panel);
				saveItems();
				setupMenu();
			}));
			panel.appendChild(createElement('input', {value: 'cancel', type: 'button'}, null, function(){
				_contextMenu.removeChild(panel);
			}));
			panel.appendChild(createElement('span', {innerHTML: '&nbsp; &nbsp;'}));
			_contextMenu.appendChild(panel);
			labelField.focus();
		}
		
		function editItem(index){
			//A bit redundant, should be nicer to merge the add/edit two together.
			var item = _items[index];
			var panel = createElement('div', {id: 'add-item-panel'}, {width: '100%', textAlign: 'right'});
			var labelField = createElement('input', {type: 'text', size: 20, value: item.label});
			var l = createElement('label', {innerHTML: 'Label: '}, {textTransform: 'none', fontWeight: 'bold'});
			l.appendChild(labelField);
			
			panel.appendChild(l);
			panel.appendChild(createElement('span', {innerHTML: '&nbsp; &nbsp;'}));
			var urlField = createElement('input', {type: 'text', size: 60, value: item.url});
			l = createElement('label', {innerHTML: 'Url: '}, {textTransform: 'none', fontWeight: 'bold'});
			l.appendChild(urlField);
			panel.appendChild(l);
			panel.appendChild(createElement('input', {value: 'save', type: 'button'}, null, function(){
				_items[index] = {label: labelField.value, url: urlField.value};
				_contextMenu.removeChild(panel);
				saveItems();
				setupMenu();
			}));
			panel.appendChild(createElement('input', {value: 'cancel', type: 'button'}, null, function(){
				_contextMenu.removeChild(panel);
			}));
			_contextMenu.appendChild(panel);
			labelField.focus();
		}
		
		function removeItem(index){
			_items = _items.slice(0, index).concat(_items.slice(index + 1));
			saveItems();
		}
		
		function moveItem(index, moveBy){
			var newIndex = index + moveBy;
			//Edge cases
			if(newIndex < 0){
				// Move first item to last
				_items.push(_items.shift());
			}else if(newIndex >= _items.length){
				// Move last item to first
				_items.unshift(_items.pop());
			}else{
				// push somewhere in the middle
				var t = _items[index];
				_items[index] = _items[newIndex];
				_items[newIndex] = t;
			}
			saveItems();
		}
		
		function retrieveItems(){
			// Chrome injects stuff to the user script making it hard to detect if we are working inside of GM.  
			// The downside is we can't sniff GM_getValue / GM_setValue to identify if we are in chrome. 
			// It might simply make more sense to switch to localStorage but 
			// since we would share the 5 meg space with other userscripts and reddit itself, it seems unconvincing
			if(inGM()) 
				var json = GM_getValue(_Key);
			else
				var json = window.localStorage[_Key];
			if(json)
				_items = JSON.parse(json);
			else
				_items = [];
		}
		
		function saveItems(){
			
			var json = JSON.stringify(_items);
			console.log(json);
			if(inGM()) 
				GM_setValue(_Key, json);
			else
				localStorage[_Key] = json;
		}
		
		function findByLabel(label){
			for(var i = 0; i < items.length; i++)
				if(items[i].label == label)
					return i;
			return -1;
			
		}
	};

	new ContextMenu();
	
	function inGM(){
		return !!(unsafeWindow && GM_getValue && GM_setValue && (window.navigator.userAgent.indexOf("Firefox") != -1));
	}

	function createElement(element, attributes, style, clickHandler){
		var element = document.createElement(element);
		if(!!attributes){
			for(var key in attributes)
				element[key] = attributes[key];
		}
		if(!!style){
			for(var key in style)
				element.style[key] = style[key];
		}
		
		if(!!clickHandler)
			element.addEventListener('click', function(){ clickHandler(element) }, false);
		return element;
	}

})();

