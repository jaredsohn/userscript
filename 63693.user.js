// ==UserScript==
// @name           Reddit Comments By Level
// @namespace      http://www.reddit.com
// @description    Navigate reddit comments by levels with the keyboard
// @include 	    http://*reddit.com*
// @exclude	    http://*reddit.com/prefs*
// @author         Pranav K

// ==/UserScript==

(function() {
	//Specify modifiers at the beginning and separated by + (for instance Ctrl+Shift). I think the command key would behave like the Ctrl key on a Mac
	//Alt key won't work. Separate the modifiers and the actual key with a hyphen '+'. 
	//Use Pascal casing (e.g. PageUp, PageDown) for keys with spaces 
	var CommentKeyMappings = {
		previousComment		: 'Up', 		//Move to the previous visible comment
		nextComment			: 'Down',	 	//Move to the next visible comment
		collapseLevel			: 'Left',	 	//Collapse this level and return to the parent of this comment. Does nothing for top level comments
		expandLevel 			: 'Right',	 	//Expand the responses of this comment and move to the first response. Will also expand collapsed comments 
		upvote 					: 'Ctrl+Up',	 	//Mmmm, orangered
		downvote	 			: 'Ctrl+Down', 	//Down votes comments or un-downvotes previously downvoted comments. Just like clicking the normal downvote arrow
		reply						: 'Ctrl+Right',	//Reply to a comment
		toggleKeyTraversal	: '.'		 	//Restores the page to its former glory and stops following you around. 
	};
	
	var PageKeyMappings = {
		previousPost			: 'Up', 			//Move to the previous post
		nextPost				: 'Down',			//Move to the next post
		previousPage			: 'Q',	//Move to the next page
		nextPage				: 'W',	//Move to the next page
		upvote					: 'Ctrl+Up',		//Toggle the upvote
		downvote				: 'Ctrl+Down',	//Toggle the downvote
		comments				: 'Right',			//Go to the comments page
		gotoPost				: 'L',				//Go to the post (the page link)
		gotoPostAndComments	: 'Ctrl+L',			//Open post in a new window. Also opens the comments page.
		expandPreview		: 'E' 				//Expand the in-reddit view for youtube videos, vimeo etc
	};
	
	var MoreChildrenText = ' ...'; //An alternative that would be nice: <sub style="font-size: 8px">[more...]</sub>
	
	
	var KeyParser = {
		specialKeys: {PageUp: 33, PageDown: 34, End: 35, Home: 36, Left: 37, Up: 38, Right: 39, Down: 40, Insert: 45, Delete: 46,
							';': 186, '=': 187, ',': 188, '-': 189, '.': 190, '/': 191},
		CtrlValue: 9001,
		ShiftValue: 5000,

		parseKeyMap: function(key){
			var tokens = key.split('+');
			var keys, modifiers;
			if(tokens.length == 0)
				return;
			else if(tokens.length == 1){
				keys = tokens[0];
				modifiers = [];
			}else{
				var modifiers = tokens[0].split('+');
				var key = tokens[1];
			}
			
			var keyValue = 0;
			for(var i = 0; i < modifiers.length; i++){
				if(modifiers[i] == 'Ctrl')
					keyValue += this.CtrlValue;
				else if(modifiers[i] == 'Shift')
					keyValue += this.ShiftValue;
			}
			var value = this.specialKeys[key];
			if(value){
				keyValue += value;
			}else
				keyValue += key.toUpperCase().charCodeAt(0);
			return keyValue;
		},
		
		parseKeyEvent: function(keyEvent){
			var keyValue = 0;
			if(keyEvent.ctrlKey || keyEvent.metaKey)
				keyValue += this.CtrlValue;
			if(keyEvent.shiftKey)
				keyValue += this.ShiftValue;
			keyValue += keyEvent.keyCode;
			return keyValue;
		}
	};
	
	var CommentKeyTraverser = function(root){
		var _current;
		var _mappings = {};
		var topLevelComments = [];
		var _enabled;
		var _scroller = new Scroller();
		var _scrollItem;
			
		function _init(){
			_scrollItem = getScrollItem();
			_scroller = new Scroller();

			for(var k in CommentKeyMappings){
				var keys = CommentKeyMappings[k];
				_mappings[KeyParser.parseKeyMap(keys)] = eval("(function(){ return " + k + "})()");
			}
			start();
			document.addEventListener('keydown', keyTraverser, false);
			if(_scrollItem.scrollTop > 0)
				moveTo(getFirstVisible(), false);
			else
				moveTo(root.querySelector('.thing'), false);
		}
		
		function toggleKeyTraversal(){
			if(_enabled){
				stop();
			}else{
				start();
				
				//If the person re-enables, we will try and focus somewhere in the vicinity of where the page was
				var firstVisible = getFirstVisible();
				if(firstVisible){
					while(firstVisible.parentNode.parentNode != root)
						firstVisible = parentThing(firstVisible, root);
					moveTo(firstVisible);
				}
			}
		}
		
		function start(startOption){
			_enabled = true;
			document.addEventListener('scroll', trackScroll, false);
			setupPage();
		}
		
		function stop(){
			_enabled = false;
			document.removeEventListener('scroll', trackScroll, false);
			if(_current)
				removeFocus(_current);

			var elements = root.querySelectorAll('.thing');
			for(var i = 0; i < elements.length; i++){
				var element = elements[i];
				var listItem = element.querySelector('ul.buttons > li.meow');
				if(listItem){
					listItem.parentNode.removeChild(listItem);
					lisItem = null;
				}
					element.parentNode.style.display = "";
			}
			if(_current)
				_scrollItem.scrollTop = _current.offsetTop - 100;
			_current = null;
			_scroller.stopScroll();
		}
		
		function setupPage(){
			var elements = root.querySelectorAll('.thing');
			for(var i = 0; i < elements.length; i++){
				var element = elements[i];
				if(element.parentNode.parentNode != commentArea){
					element.parentNode.style.display = "none";
				}else
					topLevelComments.push(element);
				var listItem = document.createElement('li');
				listItem.className = 'meow';
				var link = document.createElement('a');
				link.href = "javascript:void(0);";
				link.innerHTML = 'here' + ((element.querySelector('.child').childNodes.length > 0) ? MoreChildrenText : '');
				link.addEventListener('click', function(e){
					return function(){
						moveTo(e, false);
					};
				}(element), false);
				listItem.appendChild(link);
				element.querySelector('ul.buttons').appendChild(listItem);
			}
		}
		
		_mappings = {};
		
		function keyTraverser(keyEvent){
			if(keyEvent.altKey || (/^(TEXTAREA)|(SELECT)|(INPUT)$/.test(keyEvent.target.tagName)))
				return;
			var keyValue = KeyParser.parseKeyEvent(keyEvent);
			if(_mappings[keyValue]){
				if(!_enabled && (_mappings[keyValue] !== toggleKeyTraversal))
					return;
				_mappings[keyValue]();
				keyEvent.preventDefault();
			}
		}
		
		function trackScroll(mouseEvent){
			//We want to avoid calculating offsets every time. So we'll simply wait until the scroll stabilizes by checking
			//if the last scrolled offset is the current page scroll offset
			function waitForScroll(offsetY){
				if(offsetY == _scrollItem.scrollTop){
					moveTo(getFirstVisible(), false);
				}else{
					window.setTimeout(function(){ waitForScroll(_scrollItem.scrollTop)}, 200);
				}
			}
			
			if(!visibleOnScreen(_current, {halfScreenCheck: true}))
				window.setTimeout(function(){ waitForScroll(_scrollItem.scrollTop)}, 200);
		}
		
		function getFirstVisible(){
			var scrollTop = _scrollItem.scrollTop;
			var clientHeight = document.documentElement.clientHeight;
			//Is the current element still in view?
			if(visibleOnScreen(_current, {halfScreenCheck: true}))
				return;
			var nearestTopLevels = binarySearch(topLevelComments, scrollTop);
			var left = nearestTopLevels[0], right = nearestTopLevels[1];
			
			try{
				var children = Array.prototype.filter.call(left.querySelectorAll('.thing'), function(e){ return isVisible(e.parentNode) } );
				children.shift(left);
				children.push(right);
				var nearestChildren = binarySearch(children, scrollTop);
				
				return visibleOnScreen(nearestChild[0]) ? nearestChild[0] : nearestChild[1];
			}catch(e){
				//No clue what to do here.
				//In fact no clue how it got here
				return _current;
			}
		}
		
		function expandLevel(){
			var c = _current.querySelector('.child');
			var collapsed = _current.querySelector('.collapsed');
			var moreComments = _current.querySelector('.entry').querySelector('.morecomments');
			if(!!moreComments){
				previousComment();
				click(moreComments.firstChild);
			}
			else if(c && (c.children.length > 0)){
				c.firstChild.style.display = '';
				if(isVisible(collapsed)){
					//Need to figure out how to do immediate descendant selector when you're already there
					//Could be re-written as 'self > .midcol, self > .entry > .noncollapsed'
					show([c, _current.querySelector('.midcol'), _current.querySelector('.noncollapsed')]);
					hide(_current.querySelector('.collapsed'));
				}else
					moveTo(c.firstChild.firstChild);
			}else if(isVisible(collapsed)){
				show([_current.querySelector('.midcol'), _current.querySelector('.noncollapsed')]);
				hide(_current.querySelector('.collapsed'));
			}
		}
		
		function collapseLevel(){
			var p = parentThing(_current, root);
			if(p){
				hide(p.querySelector('.child > .sitetable'));
				moveTo(p);
			}
		}
		
		function previousComment(){
			var prev;
			if(prev = previousThing(_current)){
				moveTo(deepestVisibleChild(prev));
			}else{
				var p = parentThing(_current, root);
				if(p)
					moveTo(p);
			}
		}
		
		function nextComment(){
			var n;
			if(n = childThing(_current)){
				moveTo(n);
			}else if(n = nextThing(_current)){
				moveTo(n);
			}else if(n = nextParentThing(_current)){
				moveTo(n);
			}
		}
		
		function hasVisibleChildren(elm){
			var c = elm.querySelector('.child');
			var cThing = c ? c.querySelector('.thing') : null;
			return (c && cThing && isVisible(cThing));
		}
		
		function upvote(){
			click(_current.querySelector('.arrow.up, .arrow.upmod'));
		}
			
		function downvote(){
			click(_current.querySelector('.arrow.down, .arrow.downmod'));
		}
		
		function reply(){
			var li = _current.querySelector('ul.buttons li');
			while(li){
				//UL -> LI -> A -> nodeText
				var link = li.querySelector('a');
				if(link && link.textContent == 'reply'){
					click(link);
					break;
				}
				li = li.nextSibling;
			}
		}
		
		
		
		function nextParentThing(p){
			do{
				if(p = parentThing(p, root)){
					var n = nextThing(p);
					if(n)
						return n;
				}
			}while(p);
		}
		
		function deepestVisibleChild(el){
			var c = el;
			while(true){
				if(hasVisibleChildren(c)){
					c = previousThing(c.querySelector('.sitetable').lastChild);
				}else
					return c;
			}
		}
		
		function moveTo(elm, doScroll){
			if(!elm)
				return;
			if(_current)
				removeFocus(_current);
			_current = elm;
			focusOn(elm);
			
			if(doScroll !== false){
				_scroller.scrollTo(elm, { 
						scrollBegin: function(){
							document.removeEventListener('scroll', trackScroll, false);
						},
						scrollEnd: function(){
							document.addEventListener('scroll', trackScroll, false);
						}
				});
			}else{
				_scroller.stopScroll();
			}
		}
		
		/** Utility functions **/
		function visibleOnScreen(e, options){
			options = options || {halfScreenCheck: false};
			var scrollTop = _scrollItem.scrollTop;
			var clientHeight = document.documentElement.clientHeight;
			
			var result = e && (e.offsetTop >= scrollTop) && ((e.offsetTop + e.offsetHeight) < (scrollTop + clientHeight));
			if(options.halfScreenCheck){
				return result && e && (e.offsetTop <= (scrollTop + (clientHeight / 2)));
			}
			return result;
		}
		
		
		
		return {
			init: function(){
				_init();
			}
		};
	};
	
	
	var PageKeyTraverser = function(root){
		var _mappings = {};
		var _current;
		
		function _init(){
			_scrollItem = getScrollItem();
			_scroller = new Scroller();

			for(var k in PageKeyMappings){
				var key = PageKeyMappings[k];
				_mappings[KeyParser.parseKeyMap(key)] = eval("(function(){ return " + k + "})()");
			}
			start();
			document.addEventListener('keydown', keyTraverser, false);
			if(_scrollItem.scrollTop > 0)
				moveTo(getFirstVisible(), false);
			else
				moveTo(root.querySelector('.thing'), false);
		}
		
		function toggleKeyTraversal(){
			if(_enabled){
				stop();
			}else{
				start();
				moveTo(getFirstVisible());
			}
		}
		
		function start(startOption){
			_enabled = true;
			document.addEventListener('scroll', trackScroll, false);
			setupPage();
		}
		
		function stop(){
			_enabled = false;
			document.removeEventListener('scroll', trackScroll, false);
			if(_current)
				removeFocus(_current);

			var elements = root.querySelectorAll('.thing');
			for(var i = 0; i < elements.length; i++){
				var element = elements[i];
				var listItem = element.querySelector('ul.buttons > li.meow');
				if(listItem){
					listItem.parentNode.removeChild(listItem);
					lisItem = null;
				}
					element.parentNode.style.display = "";
			}
			if(_current)
				_scrollItem.scrollTop = _current.offsetTop - 100;
			_current = null;
			_scroller.stopScroll();
		}
		
		function setupPage(){
			var elements = root.querySelectorAll('.thing');
			for(var i = 0; i < elements.length; i++){
				var element = elements[i];
				var listItem = document.createElement('li');
				listItem.className = 'meow';
				var link = document.createElement('a');
				link.href = "javascript:void(0);";
				link.innerHTML = 'here';
				link.addEventListener('click', function(e){
					return function(){
						moveTo(e, false);
					};
				}(element), false);
				listItem.appendChild(link);
				element.querySelector('ul.buttons').appendChild(listItem);
			}
		}
		
		function keyTraverser(keyEvent){
			if(keyEvent.altKey)
				return;
			var keyValue = KeyParser.parseKeyEvent(keyEvent);
			if(_mappings[keyValue]){
				if(!_enabled && (_mappings[keyValue] !== toggleKeyTraversal))
					return;
				_mappings[keyValue]();
				keyEvent.preventDefault();
			}
		}
		
		function trackScroll(mouseEvent){
			//We want to avoid calculating offsets every time. So we'll simply wait until the scroll stabilizes by checking
			//if the last scrolled offset is the current page scroll offset
			function waitForScroll(offsetY){
				if(offsetY == _scrollItem.scrollTop){
					moveTo(getFirstVisible(), false);
				}else{
					window.setTimeout(function(){ waitForScroll(_scrollItem.scrollTop)}, 200);
				}
			}
			
			if(!visibleOnScreen(_current, {halfScreenCheck: true}))
				window.setTimeout(function(){ waitForScroll(_scrollItem.scrollTop)}, 200);
		}
		
		function getFirstVisible(){
			var scrollTop = _scrollItem.scrollTop;
			var clientHeight = document.documentElement.clientHeight;
			//Is the current element still in view?
			if(visibleOnScreen(_current, {halfScreenCheck: true}))
				return;
			var nearestTopLevels = binarySearch(root.querySelectorAll('.thing'), scrollTop);
			var left = nearestTopLevels[0], right = nearestTopLevels[1];
			return visibleOnScreen(left) ? left : right;
		}
		
		function moveTo(elm, doScroll){
			if(!elm)
				return;
			if(_current)
				removeFocus(_current);
			_current = elm;
			focusOn(elm);
			
			if(doScroll !== false){
				_scroller.scrollTo(elm, { 
						scrollBegin: function(){
							document.removeEventListener('scroll', trackScroll, false);
						},
						scrollEnd: function(){
							document.addEventListener('scroll', trackScroll, false);
						}
				});
			}else{
				_scroller.stopScroll();
			}
		}
		
		
		/** Utility functions **/
		function visibleOnScreen(e, options){
			options = options || {halfScreenCheck: false};
			var scrollTop = _scrollItem.scrollTop;
			var clientHeight = document.documentElement.clientHeight;
			
			var result = e && (e.offsetTop >= scrollTop) && ((e.offsetTop + e.offsetHeight) < (scrollTop + clientHeight));
			if(options.halfScreenCheck){
				return result && e && (e.offsetTop <= (scrollTop + (clientHeight / 2)));
			}
			return result;
		}
		function previousPost() {
			var item = previousThing(_current);
			if(item){
				moveTo(item);
			}	
		}
		function nextPost(){
			var item = nextThing(_current);
			if(item){
				moveTo(item);
			}
		}
		
		function previousPage(){
			var nextprev = document.querySelector('p.nextprev');
			if(nextprev){
				//The next, prev rels are broken. For instance, the first page next has a rel of "prev".
				var prev = nextprev.querySelector('a[href*="before"]');
				if(prev)
					followLink(prev);
			}
		}
		
		function nextPage(){
			var nextprev = document.querySelector('p.nextprev');
			if(nextprev){
				var next = nextprev.querySelector('a[href*="after"]');
				if(next)
					followLink(next);
			}
		}
			
		function upvote(){
			click(_current.querySelector('.arrow.up, .arrow.upmod'));
		}
			
		function downvote(){
			click(_current.querySelector('.arrow.down, .arrow.downmod'));
		}
		
		function comments() {
			followLink(_current.querySelector('a.comments'));
		}
		
		function gotoPost() {
			followLink(_current.querySelector('a.title'));
		}
	    
		function gotoPostAndComments () {
			followLink(_current.querySelector('a.title'), true);
			comments();
		}
		
		function expandPreview(){
			var expando = _current.querySelector('div.expando-button');
			if(expando){
				click(expando);
				//Might need to scroll the screen around a bit to make sure the expando fits in
				scroller.scrollTo(_current.querySelector('div.expando'));
			}
		}
			
		return {
			init: function(){
				_init();
			}
		};
	}
	
	var Scroller = function(){
		var scrollAmt = 20, scrollSpeed = 5, topOffset = 200;
		var _scrollCallback;
		var _scrollItem = getScrollItem();
		var _onScrollComplete;
		
		function scrollDown(dim){
			var scrollTop = _scrollItem.scrollTop;
			var scrollHeight = _scrollItem.scrollHeight;
			var clientHeight = dim.clientHeight;
			var elmOffset = dim.elmOffset;
			
			if((scrollTop < elmOffset) && (scrollTop + clientHeight) < scrollHeight){
				if((scrollTop + scrollAmt) > elmOffset){
					_scrollItem.scrollTop += elmOffset - scrollTop;
				}else{
					_scrollItem.scrollTop += scrollAmt;
				}
				
				_scrollCallback = setTimeout(function(){ scrollDown(dim) } , scrollSpeed);
			}else{
				stopScroll();
				scrollComplete();
			}
		}
			
		function scrollUp(dim){
			var elmOffset = dim.elmOffset;
			
			if(_scrollItem.scrollTop > elmOffset){
				_scrollItem.scrollTop -= scrollAmt;
				_scrollCallback = setTimeout(function(){ scrollUp(dim) }, scrollSpeed);
			}else{
				stopScroll();
				scrollComplete();
			}
		}
					
		function scrollComplete(){
			if(_onScrollComplete){
				_onScrollComplete();
				_onScrollComplete = null;
			}
		}
		
		function stopScroll(){
			if(!!_scrollCallback){
				clearTimeout(_scrollCallback);
				_scrollCallback = null;
			}
		}
		
		function scrollTo(elm, options){
			options = options || { scrollBegin: function(){} , scrollEnd: function(){} };
			
			stopScroll();
			options.scrollBegin();
			_onScrollComplete = options.scrollEnd;
			
			var scrollTop = _scrollItem.scrollTop;
			var clientHeight = document.documentElement.clientHeight;
			var elmOffset = elm.offsetTop - topOffset;
			
			if(clientHeight <= elm.offsetHeight) 
				elmOffset = elm.offsetTop;
			else if(elmOffset < 0)
				elmOffset = 0;
			
			var dim = {clientHeight: clientHeight, elmOffset: elmOffset};
			
			
			if(Math.abs(scrollTop - elmOffset) > scrollAmt){
				if(scrollTop < elmOffset){
					scrollDown(dim);
				}
				else{
					scrollUp(dim);
				}
			}
		}
		
		return {
			stopScroll: stopScroll, scrollTo: scrollTo
		};
	}
	
	function getScrollItem(){
		//scrollTop is get and set via document.body in Chrome. 
		if(navigator.userAgent.indexOf('Chrome') != -1){
			//Do Chrome things
			return document.body;
		}else{
			return document.documentElement;
		}
	}
	
	function binarySearch(elements, value){
		var left = 0, right = elements.length - 1;
		
		while((right - left) > 1){
			var middle = Math.floor((right + left) / 2);
			var middleElement = elements[middle];
			if(middleElement.offsetTop > value)
				right = middle;
			else if(middleElement.offsetTop < value)
				left = middle;
			else
				break;
		}
		return [elements[left], elements[right]];
	}
	
	function previousThing(elm){
		elm = elm.previousSibling;
		while(elm){
			if(isThing(elm) && isVisible(elm))
				return elm;
			elm = elm.previousSibling;
		}
		return null;
	}
	
	function nextThing(elm){
		elm = elm.nextSibling;
		while(elm){
			if(isThing(elm) && isVisible(elm))
				return elm;
			elm = elm.nextSibling;
		}
		return null;
	}
	
	function parentThing(elm, root){
		while(elm && (elm != root)){
			elm = elm.parentNode;
			if(isThing(elm))
				return elm;
		}
		return null;
	}
	
	function isThing(elm){
		//Hopefully they will never name another item a thing
		//indexOf works much quicker than regex.
		return (elm.className.indexOf('thing') != -1);
	}
		
	function childThing(elm){
		var c = elm.querySelector('.thing');
		while(c){
			if(isVisible(c))
				return c;
			c = nextThing(c);
		}
		return null;
	}
	
	function show(a){
		if(a.length){
			for(var i = 0; i < a.length; i++)
				a[i].style.display = '';
		}else
			a.style.display = '';
	}

	function hide(a){
		if(a.length){
			for(var i = 0; i < a.length; i++)
				a[i].style.display = 'none';
		}else
			a.style.display = 'none';
	}
	
	function isVisible(elm){
		//The offset seems to be a much better way to identify elements that are hidden
		return (elm.offsetTop != 0) && (elm.style.display != 'none');
	}

	function addStyle(elm, style){
		for(var k in style){
			elm.style[k] = style[k];
		}
	}

	function click(el){
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		el.dispatchEvent(evt);
	}
	
	function followLink(link, openInNewWindow){
		if((link.target == '_blank') || openInNewWindow){
			GM_openInTab(link.href);
		}
		(unsafeWindow || window).location.href = link.href;
	}
	
	function focusOn(elm){
		if(elm)
			addStyle(elm.querySelector('.entry'), {'backgroundColor': '#eaeafa', 'border': '1px solid #cacada'});
	}
	
	function removeFocus(elm){
		if(elm)
			addStyle(elm.querySelector('.entry'), {'backgroundColor': '#ffffff', 'border': 'none'});
	}
	
	var commentArea = document.querySelector('div.commentarea');
	var siteList;
	if(commentArea){
		new CommentKeyTraverser(commentArea).init();
	}else if(siteList = document.querySelector('#siteTable > .thing')){
		new PageKeyTraverser(document.getElementById('siteTable')).init();
	}
})();