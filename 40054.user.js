// ==UserScript==
// @name           ToodleDo Folder Categories
// @namespace      http://userscripts.org
// @description    Allows folders to be grouped
// @include        http://www.toodledo.com/views/folder.php*
// ==/UserScript==

//VERSION 1.1

var toodleDoLeftTabs = function() {

	var tabWidth = 200;
	var DEBUG = false;
	var log = function(item) {
		if (DEBUG)
			unsafeWindow.console.log(item);
	};

	var $ = function(id) {
		return document.getElementById(id);
	};

	var addGlobalStyle = function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	}

	var changeTabStyle = function() {
		addGlobalStyle(
			"#tabs { overflow: none; float: left; height: auto; width: " + tabWidth + "px; }"+
			".tab { float: none; }"+
			".tabon { float: none; }"+
			".tab, .tabon { height: 12px; }"+
			".tab a, .tabon a { font-size: 12px; }"+
			"#moretabs { display: none; }"
		);
	};

	var createContainer = function() {
		var container = document.createElement('div');
		container.id = "contentContainer";
		var head = $("head");
		head.parentNode.insertBefore(container, head);
		var width = getContainerWidth();
		addGlobalStyle(
			"#contentContainer { float: left; }" 
		);
		resizeContainer();
	};

	var resizeContainer = function() {
		$("contentContainer").style.width = getContainerWidth()+"px";
	};

	var getContainerWidth = function() {
		var mainWidth = $("main").offsetWidth; 
		var tocWidth = $("toc").offsetWidth;

		var newWidth = mainWidth - tabWidth - 50; 
		return newWidth;
	};

	var moveElements = function() {
		var elements = ['head', 'sharetask', 'filtertask', 'sorttask', 'searchtask', 'toolbar', 'tip', 'colhead', 'tasks'];
		for (i in elements) {
			moveElement(elements[i]);
		}
	};

	var moveElement = function(id) {
		var container = $("contentContainer");
		var element = $(id);
		if (element) 
			container.appendChild($(id));
	};

	var initResizeListener = function() {
		window.addEventListener("resize", function() { resizeContainer() }, false);
	};

	var initTOCListener = function() {
		$("tocc").addEventListener("click", function() {
			setTimeout(resizeContainer, 200);
		}, false);
		$("toco").addEventListener("click", function() {
			setTimeout(resizeContainer, 200);
		}, false);
	};

	window.addEventListener("load", function() { 
		initResizeListener();
		initTOCListener();
		changeTabStyle();
		createContainer();
		moveElements();
	}, false);
};


var toodleDoFolderCategories = function() {
	var DEBUG = false;
	var folderCategories;
	var tabList;

	var log = function(item) {
		if (DEBUG)
			unsafeWindow.console.log(item);
		//console.log(item);
	};

	var $ = function(id) {
		return document.getElementById(id);
	};

	var addGlobalStyle = function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	}

	var addFolderCategories = function() {
		var y = 1;
		var categoriesElement = document.createElement('div');
		var tabContainer = $("tabs");
		tabContainer.insertBefore(categoriesElement, tabContainer.getElementsByTagName("div")[1]);
		for (var key in folderCategories) {
			var groupElement = document.createElement('div');
			var id =  "folderGroup_"+key;
			groupElement.id = id;
			groupElement.className = "folderGroup tab";
			if (cookie.read(id) == "closed")
				groupElement.className += " folderGroupClosed";
			var spanElement = document.createElement("span");
			spanElement.innerHTML = folderCategories[key];
			spanElement.addEventListener("click",function() {
				var parent = this.parentNode;
				if (parent.className.indexOf("folderGroupClosed") == -1) {
					parent.className += " folderGroupClosed";
					cookie.create(parent.id, "closed", 365);
				}
				else {
					parent.className = "folderGroup tab";
					cookie.erase(parent.id);
				}
			}, false);
			groupElement.appendChild(spanElement);
			categoriesElement.appendChild(groupElement);
			moveTabsToGroup(key, groupElement);
			y++;
		}
	};

	var addFolderCategorieStyle = function() {
		addGlobalStyle(
			".folderGroup { height: auto; margin:0; background: 0; }"+
			".folderGroup span { display: block; cursor: pointer; font-size: 13px; padding: 3px 0; }"+
			".folderGroup .tab { border: 0;}"+
			".folderGroup.folderGroupClosed div { display: none; }"+
			".folderGroup .tab a, .folderGroup .tabon a { font-weight: normal; }"
		);
	};

	var moveTabsToGroup = function(key, groupElement) {
		var re = new RegExp(" -?"+key+"$");
		for (var i = 0; i < tabList.length; i++) {
			var tabName = getTabName(tabList[i]);
			var match = re.exec(tabName);
			if (match) {
				setTabName(tabList[i], tabName.replace(re, ""));
				if (match[0].indexOf("-") != -1) {
					log(tabList[i]);
					tabList[i].style.display = "none";
				}
				groupElement.appendChild(tabList[i]);
			}
		}
	};

	var getTabList = function() {
		var tabContainer = $("tabs");
		return tabContainer.getElementsByTagName("div");
	};

	var getTabName = function(tab) {
		if (tab.getElementsByTagName("a").length != 0) {
			var text = tab.getElementsByTagName("a")[0].innerHTML;
			if (text.indexOf("<i>") != -1)
				text = text.substr(0, text.indexOf(" <i>"));
			return text;
		}
		return '';
	};

	var setTabName = function(tab, tabName) {
		if (tab.getElementsByTagName("a").length != 0) {
			var href = tab.getElementsByTagName("a")[0];
			var text = href.innerHTML;
			if (text.indexOf("<i>") != -1) {
				href.innerHTML = text.replace(/(.*?)<i>/, tabName+" <i>");
			}
			else
				href.innerHTML = tabName;
		}
	};

	var getTabFromList = function(name) {
		var list = getTabList();
		for (var i = 0; i < list.length; i++) {
			if (getTabName(list[i]) == name)
				return list[i];
		}
		return false;
	};

	var hideFolders = function() {
		var tabs = getTabList();
		log(tabs);
		for (var i = 0; i < tabs.length; i++) {
			for (var x = 0; x < hiddenFolders.length; x++) {
				if (hiddenFolders[x] == getTabName(tabs[i])) {
					log(getTabName(tabs[i]));
					tabs[i].style.display = "none";
					continue;
				}
			}
		}
	};

	var getCategoryKey = function(folderName) {
		var re = new RegExp("z* (.*) (\\w.*)$");
		match = re.exec(folderName);
		if (match) {
			return [match[2], match[1]];
		} else {
			return '';
		}
	};

	var getFolderCategories = function() {
		var folderCategories = {};
		var toRemove = []
		tabList = getTabList();
		for (var i = 0; i < tabList.length; i++) {
			var name = getTabName(tabList[i]);
			if (name.indexOf('z*') == 0) {
				var key = getCategoryKey(name);
				folderCategories[key[0]] = key[1];
				toRemove.push(tabList[i]);
			}
		}
		for (var i = 0; i < toRemove.length; i++) {
			toRemove[i].parentNode.removeChild(toRemove[i]);
		}
		log(folderCategories);
		return folderCategories;
	};

	var onload = function() {
		folderCategories = getFolderCategories();
		tabList = getTabList();
		addFolderCategorieStyle();
		addFolderCategories();
		//TODO
		//hideFolders();
	};

	window.addEventListener("load", onload, false);
};

var cookie = {
	create: function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},
	read: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	erase: function(name) {
		this.create(name,"",-1);
	}
}

new toodleDoLeftTabs();
new toodleDoFolderCategories();
