// ==UserScript==

// @name          Score stars on Google Reader

// @description   Allows to score from 1-5 starred items
// @author        X4lldux
// @version       0.2

// @include       http://*google.tld/reader/view*

// @include       https://*google.tld/reader/view*

// ==/UserScript==

var activeStar = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
	'bWFnZVJlYWR5ccllPAAAAGBQTFRFXFu65dsFl5AkycAhfoHmLi1b7uQJX2HhbGeOvsPwTk2t8+gH'+
	'ko6WvrYErbHt29NSc24wnZdeUk+HdHGvys/yFhWdmp7qLS7S//sWVFBTjZHo/vgvGRnGQUPW/vUP'+
	'////og4vjQAAACB0Uk5T/////////////////////////////////////////wBcXBvtAAAAmUlE'+
	'QVR42lTP2RKCMAwF0LR0AWRVuyft//+lhcqg9yWZ83AzgXJGoG5LgTbchH9gIT3FL+jJ73SBjTG6'+
	'1XcoYrQViADglXzuRxiRCmCfanzOPiUVsIDF0OUzag4m1o43mVMeXLqhXaHeHxDcdZZ2z5hSHL8w'+
	'uJXxwFlnbAMxss04s81BN9DyaLcoJTVYHC11Gwjj/e2djwADAOwCF+1QCTaiAAAAAElFTkSuQmCC';

var inactiveStar = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0'+
	'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIiSURBVHjaYvz//z8DNsDIyMgBpED4B1DN'+
	'DwYcACCAGPEYoAekpID4GxAfAar7h00dQABhNQBquwOS0Amgug/YDAAIICYY49u3b3AMBGogYu3a'+
	'tQKqqqogphySHAoACCAGqAuYoP7lUFNTE+bg4ADZbvvs2bN/e/fuPQNkewCxAEwNSD1IHwgDBBAL'+
	'1LmmQMytrKzMY2FhoWhnZ8cmLS39hJ+fn1FKSkqEnZ2d6efPn5YwO4H4K1DfaVDgAgQQI9Rky9jY'+
	'WOnS0tIgYWFhMyCfVUAAJMzAB8QvgGA3MzOz5J07d3a6uLicAopxwcIFIIBYQNEExE9//Pih+vHj'+
	'R22gzSAvIPtSAghigfL/gBo4gfwrQPwMqo8BIIBgYcDBzc1t4Obmlrp8+fKDnz59+vn169f/SPiu'+
	'v79/FDQsQNHLAQsDgABigDGAihg4OTllgOEQ+ujRo1NA/l8g/gfSDDRwG9BV9qCARdYMwgABxITs'+
	'1u/fvws9fPjwFdAgjn///jG+f//+FZAWAAaY48yZMz2gLkZJlQABBDcJGpV2O3bs2A6Mvj9bt259'+
	'q6WlFZ6Xl1dw8+bNh9evX78K9QKKCwACCNkAUMh5AA34BUxAX+Tl5d2BfGmQoba2tgkrVqw4CksP'+
	'yAYABBA8KQOdCXKBNTD6BD58+PAQyL4F9P8PYOByQFMmKF+Aon0ncr4ACCCUvIArByKJM6DnCYAA'+
	'wpkbiQUAAQYAomop3wXyJg8AAAAASUVORK5CYII=';

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
};

function getAbsolutePosition(element) {
	var r = { x: element.offsetLeft, y: element.offsetTop };
	if (element.offsetParent) {
		var tmp = getAbsolutePosition(element.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
};

var ScoreTable = function () {
	var scoreTable = null;
	var currDefNStars = 3;
	var onStarClick = function(e, n){};
	var onClearClick = function(e){};

	addGlobalStyle(".c>ul {list-style-type: none; display: table;} .c>ul>li {display: table-cell;}");
	addGlobalStyle(".starOn  {height:15px; width:15px; cursor:pointer; background: transparent url($ActiveStar$) no-repeat;}".replace("$ActiveStar$", activeStar, "g"));
	addGlobalStyle(".starOff {height:15px; width:15px; cursor:pointer; background: transparent url($InactiveStar$) no-repeat;}".replace("$InactiveStar$", inactiveStar, "g"));
	
	function create(star) {
		var table=document.createElement('table');
		table.id = "stars-container-template";
		table.className = "round-box tags-container-box tags-container";
		table.border = "0";
		table.cellSpacing="0";
		table.cellPadding="0";
	
		table.style.width = "89px";
		table.style.height = "12px";
		table.style.display = "none";

		table.innerHTML = '<tbody><tr><td class="s tl"/><td class="s"/><td class="s tr"/></tr><tr><td class="s"/><td class="c"><ul id="starList" style="margin-left: 0px;">'+
		'<li><div id="clearStars" style="height: 15px; width: 6px; cursor:pointer; background: transparent"/> </li>'+
		'<li><div id="star1" class="starOff" /></li> <li><div id="star2" class="starOff" /></li> <li><div id="star3" class="starOff" /></li> <li><div id="star4" class="starOff" /></li> <li><div id="star5" class="starOff" /><li>'+
		'</ul></td><td class="s"/></tr><tr><td class="s bl"/><td class="s"/><td class="s br"/></tr></tbody></table>'
		document.getElementById("entries").appendChild(table);


		var e=document.getElementById("clearStars");
		e.addEventListener("mouseover", function(e) {
			setStarsNumber(0);
		}, true);
		e.addEventListener("mouseout", function(ev) {
			setStarsNumber(currDefNStars);
		}, true);
		e.addEventListener("click", function(ev) {
			ScoreTable.onClearClick(ev);
		}, true);
		
		var i;
		for(i=1; i<6; i++) {
			e=document.getElementById("star"+i);
			e.setAttribute("nStar", i);			
			e.addEventListener("mouseover", function(ev) {
				var n = ev.target.getAttribute("nStar");
				setStarsNumber(n);
			}, true);
			e.addEventListener("mouseout", function(ev) {
				setStarsNumber(currDefNStars);
			}, true);
			e.addEventListener("click", function(ev) {
				var n = ev.target.getAttribute("nStar");
				ScoreTable.onStarClick(ev, n);
			}, true);
		}
	
		return table;
	};
	
	function moveToStar(star) {
		var starPos = getAbsolutePosition(star);
		var entriesPos = getAbsolutePosition(document.getElementById('entries'));
		var pos = {x: starPos.x-entriesPos.x, y:starPos.y-entriesPos.y };
		scoreTable.style.left=pos.x+19+"px";
		scoreTable.style.top=pos.y-6+"px";
	};

	function show() {
		scoreTable.style.display = null;
	};

	function hide(e) {
		if(e && e.target.className.indexOf("item-star-active")>=0)
			return;
		scoreTable.style.display = "none";
		document.body.removeEventListener('click', hide, true);

		scoreTable.parentNode.removeChild(scoreTable);
	};
	
	function isVisible() {
		if(scoreTable == null || scoreTable.style.display == "none")
			return false;
		return true;
	};

	function activateTable(star, nStars) {
		scoreTable=create(star);

		moveToStar(star);
		document.body.addEventListener('click', hide, true);
		currDefNStars = nStars;
		setStarsNumber(nStars);
		show();
	};
	
	
	function setStarsNumber(n) {
		var i;
		for(i=1; i<=n; i++) {
			var el = document.getElementById("star"+i);
			el.className="starOn";
		}
		for(; i<6; i++) {
			var el = document.getElementById("star"+i);
			el.className="starOff";
		}
	};
	
	
	ScoreTable = {
		scoreTable: scoreTable,
		activateTable: activateTable,
		show: show,
		hide: hide,
		isVisible: isVisible,
		onStarClick: onStarClick,
		onClearClick: onClearClick,
	};
}

var starNavMenuAvaible = false;
function StarNavMenu () {
	// run only once!
	if(starNavMenuAvaible == true)
		return;
	starNavMenuAvaible = true;

	var starSelector = document.getElementById("star-selector");
	var title = starSelector.firstChild.textContent;

	addGlobalStyle('#selectors-box #star-tree-container {margin-left:3px; padding:0pt; }');
	addGlobalStyle('#star-tree {overflow:visible; width:243px; }');
	addGlobalStyle('#star-tree .toggle-d-0 {left:-14px; top:0pt; }');
	addGlobalStyle('#star-tree-item-0-icon {display:none; }');
	addGlobalStyle('#star-tree #star-tree-item-0-name {font-size:105%; }');
	addGlobalStyle('#star-tree-item-0-main ul {clear:both; overflow-x:hidden; overflow-y:auto; position:relative; }');
	addGlobalStyle('#star-tree-item-0-main .name .icon {margin-right: -5px; margin-bottom: -3px; background: transparent; }');

	var newStar = document.createElement("li");
	newStar.className = "selector scroll-tree-container";
	newStar.id = "star-tree-container";
	var newStarsHtml = ''+
'       <ul class="scroll-tree" id="star-tree">'+
'               <li id="star-tree-item-0-main" class="folder unselectable expanded">'+
'                       <div class="toggle toggle-d-0" /></div>'+
'                       <a id="star-item-0-link" class="link" href="/reader/view/user/-/state/com.google/starred">'+
'                               <span id="star-tree-item-0-name" class="name name-d-0" style="text-decoration: none;">'+
'                                       <span id="star-tree-item-0-name-text" style="text-decoration: underline;" class="name-text name-text-d-0">X4_STARRED_NAME</span>'+
'                                       <span class="icon-container">'+
'                                               <img width="16" style="display: inline; margin-left: -4px;" height="16" src="$ActiveStar$" class="selector-icon selector-icon-selected" alt=""/>'+
'                                       </span>'+
'                               </span>'+
'                       </a>'+
''+
'                       <ul>'+
'                               <li id="star-tree-item-1-main" class="star unselectable expanded">'+
'                                       <a id="star-tree-item-1-link" href="/reader/view/user/-/label/★" class="link">'+
'                                               <span title="★" id="star-tree-item-1-name" class="name name-d-1">'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <span class="name-text name-text-d-1 hidden">★</span>'+
'                                                       <span id="star-tree-item-1-unread-count" class="unread-count unread-count-d-1" />'+
'                                               </span>'+
'                                       </a>'+
'                               </li>'+
'                               <li id="star-tree-item-2-main" class="star unselectable expanded">'+
'                                       <a id="star-tree-item-2-link" href="/reader/view/user/-/label/★★" class="link">'+
'                                               <span title="★★" id="star-tree-item-2-name" class="name name-d-1">'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <span class="name-text name-text-d-1 hidden">★★</span>'+
'                                                       <span id="star-tree-item-2-unread-count" class="unread-count unread-count-d-1" />'+
'                                               </span>'+
'                                       </a>'+
'                               </li>'+
'                               <li id="star-tree-item-3-main" class="star unselectable expanded">'+
'                                       <a id="star-tree-item-3-link" href="/reader/view/user/-/label/★★★" class="link">'+
'                                               <span title="★★★" id="star-tree-item-3-name" class="name name-d-1">'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <span class="name-text name-text-d-1 hidden">★★★</span>'+
'                                                       <span id="star-tree-item-3-unread-count" class="unread-count unread-count-d-1" />'+
'                                               </span>'+
'                                       </a>'+
'                               </li>'+
'                               <li id="star-tree-item-4-main" class="star unselectable expanded">'+
'                                       <a id="star-tree-item-4-link" href="/reader/view/user/-/label/★★★★" class="link">'+
'                                               <span title="★★★★" id="star-tree-item-4-name" class="name name-d-1">'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$InactiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <span class="name-text name-text-d-1 hidden">★★★★</span>'+
'                                                       <span id="star-tree-item-4-unread-count" class="unread-count unread-count-d-1" />'+
'                                               </span>'+
'                                       </a>'+
'                               </li>'+
'                               <li id="star-tree-item-5-main" class="star unselectable expanded">'+
'                                       <a id="star-tree-item-5-link" href="/reader/view/user/-/label/★★★★★" class="link">'+
'                                               <span title="★★★★★" id="star-tree-item-5-name" class="name name-d-1">'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <img src="$ActiveStar$" width="15" height="15" class="icon icon-d-1"/>'+
'                                                       <span class="name-text name-text-d-1 hidden">★★★★★</span>'+
'                                                       <span id="star-tree-item-5-unread-count" class="unread-count unread-count-d-1" />'+
'                                               </span>'+
'                                       </a>'+
'                               </li>'+
'                       </ul>'+
'               </li>'+
'       </ul>';
	newStar.innerHTML=newStarsHtml.replace("$ActiveStar$", activeStar, "g").replace("$InactiveStar$", inactiveStar, "g");

	starSelector.parentNode.replaceChild(newStar, starSelector);

	// set last expand/collapse state
	var starTreeExpanded = GM_getValue('starTreeExpanded', null);
	if(starTreeExpanded == null)
		starTreeExpanded = true;
	var el = document.getElementById("star-tree-item-0-main");
	if(starTreeExpanded == false)
		el.className=el.className.replace("expanded", "collapsed");

	// setting old title to the new star tree
	el = document.getElementById("star-tree-item-0-name-text");
	el.textContent = title;
	
	// making new star tree collapsable
	el = document.getElementById("star-tree-item-0-main").childNodes[1];
	el.addEventListener('click', function() {
		var starTreeExpanded = GM_getValue('starTreeExpanded', null);
		if(starTreeExpanded == null || starTreeExpanded == true)
			starTreeExpanded = false;
		else
			starTreeExpanded = true;

	    GM_setValue('starTreeExpanded', starTreeExpanded);


		var el = document.getElementById("star-tree-item-0-main");
		if(starTreeExpanded == false)
			el.className=el.className.replace("expanded", "collapsed");
		else
			el.className=el.className.replace("collapsed", "expanded");	
	}, true);
}


String.prototype.trim = function() {
	var str = this.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}


var StarScorer = function() {
	var items = null,
		currentItem = null
		currentStar = null,
		isClearClicked = false;

	var skrypt=document.createElement('script');
	skrypt.type="text/javascript";
	skrypt.innerHTML = ''+
'var X4_OnLoad = function() {};'+
'       function newOpen(method, url, async, user, password) {'+
'               if(url.indexOf("/reader/api/0/stream/contents")>=0 || url.indexOf("/reader/api/0/stream/items/contents")>=0) {'+
'                       this.addEventListener("load", X4_OnLoad, false);'+
'               }'+
''+
'               return this.X4_originalOpen(method, url, async, user, password);'+
'       };'+
''+
'       var XHR = window.XMLHttpRequest;'+
'       XHR.prototype.X4_originalOpen = XHR.prototype.open;'+
'       XHR.prototype.open = newOpen;';

	var head = document.getElementsByTagName("head");
	head[0].appendChild(skrypt);


	unsafeWindow.X4_OnLoad = addNewItems;

	// wait for entries to be fully loaded
	var timer = window.setInterval(function() {
		StarNavMenu();
		
		var entries = document.getElementById("entries");
		if(entries.className == "list" || entries.className == "cards" || entries.className == "search") {
			entries.addEventListener("DOMAttrModified", viewChanged, true);

			ScoreTable();
			ScoreTable.onStarClick = onScoreClick;
			ScoreTable.onClearClick = onClearClick;
					
			window.clearInterval(timer);
		}
	}, 100);

	function viewChanged(e) {
		var entries = e.target;
		if(e.target.id == "entries" && e.attrName.trim()=="class") {
			var newClass = e.newValue;
			if(newClass.indexOf("cards")>=0 || newClass.indexOf("list")>=0 || newClass.indexOf("search")>=0) {
				entries.removeEventListener("DOMAttrModified", viewChanged, true);
				findNewStars();
				entries.addEventListener("DOMAttrModified", viewChanged, true);
			}
		}
	}

	function addNewItems() {
		var resp = eval('(' + this.responseText + ')');
		if(items)
			items.items=items.items.concat(resp.items);
		else
			items=resp;
		
		findNewStars();
	};
	
	function findNewStars() {
		var stars = document.evaluate("//div[contains(@class, 'star link') and not(contains(@class, 'owned'))]", document, null, 6, null);
		var star, i=0;
		while (star = stars.snapshotItem(i++)) {
			star.className += " owned";
			star.parentNode.addEventListener("click", onStarClicked, true);
		}
	}

	function checkScore(item) {
		var labelStars=/.*\/label\/(★{1,5})$/;
		
		for(var i=0; i<item.categories.length; i++) {
			var score = labelStars.exec(item.categories[i]);
			if(score) {
				return score[1].length;
			}
		}
		
		return 0;
	};

	function createTagsRemoveUri() {
		var l5s=/.*\/label\/★★★★★$/;
		var l4s=/.*\/label\/★★★★$/;
		var l3s=/.*\/label\/★★★$/;
		var l2s=/.*\/label\/★★$/;
		var l1s=/.*\/label\/★$/;
		
		var tags="";
		for(var i = currentItem.categories.length-1; i >=0 ; i--) {
			if (l5s.test(currentItem.categories[i]) || l4s.test(currentItem.categories[i]) || l3s.test(currentItem.categories[i]) || l2s.test(currentItem.categories[i]) ||l1s.test(currentItem.categories[i])) {
				var tag = currentItem.categories.splice(i, 1)[0];
				tags+="&r="+escape(tag.replace("★", "â", "g"));
			}
		}

		return tags;
	}
	
	function removeScore() {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '../api/0/edit-tag?client=scroll', true);
		var params = "T="+escape(unsafeWindow._COMMAND_TOKEN);
		params+="&ac=edit-tags&async=true";
		params+="&s="+escape(currentItem.origin.streamId);
		params+="&i="+escape(currentItem.id);

		var rTags = createTagsRemoveUri();
		if(rTags.length>0) {
			params+=rTags;
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Connection", "keep-alive");
			xhr.send(params);
		}
	};
	
	function setScore(n) {
		var tag = "user/"+unsafeWindow._USER_ID+"/label/";
		for(var i=0; i<n; i++)
			tag+='★';

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '../api/0/edit-tag?client=scroll', true);
		var params = "s="+escape(currentItem.origin.streamId);
		params+="&i="+escape(currentItem.id);
		params+="&ac=edit-tags";
		params+="&async=true";
		params+="&a="+escape(tag.replace('★', 'â', "ig"));
		params+=createTagsRemoveUri();
		params+="&T="+escape(unsafeWindow._COMMAND_TOKEN);

		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("Connection", "keep-alive");
		xhr.send(params);

		currentItem.categories.push(tag);

	};
	
	function onScoreClick(e, n) {
		setScore(n);
	};
	
	function onClearClick(e) {
		removeScore();		
		isClearClicked = true;
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		currentStar.dispatchEvent(evt);
	};


	function onStarClicked(e) {	
		if(isClearClicked) {
			isClearClicked = false;
			return;
		}

		// clicked on the star to unstar and clear rating
		if(e.target.className.indexOf("item-star-active")>=0 && ScoreTable.isVisible()) {
			currentStar = null;
			removeScore();
			ScoreTable.hide();

		}  else {
			currentStar = e.target;
			// check do we just show the ScoraTable and prevent unstarring item
			if(currentStar.className.indexOf("item-star-active")>=0 && !ScoreTable.isVisible()) {
				e.stopPropagation();
			}
			
			var entries=document.getElementById("entries");
			var kids=entries.childNodes;
			var currentStarEntry;
			if(entries.className.indexOf("cards")>=0)
				currentStarEntry=currentStar.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			else // list view or search
				currentStarEntry=currentStar.parentNode.parentNode.parentNode;
			
			for(var i=0; i<kids.length; i++) {
				if(kids[i]==currentStarEntry) {
					currentItem = items.items[i];

					var n=checkScore(currentItem);
					if(n==0) {
						setScore(3);
						ScoreTable.activateTable(this, 3); // the default score
					} else {
						ScoreTable.activateTable(this, n);
					}

					break;
				}
			}
		}
	};
}


window.addEventListener('load', StarScorer, true);
