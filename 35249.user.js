// ==UserScript==
// @name           ToodleDo Tabs on Left
// @namespace      http://userscripts.org
// @description    Moves Tabs to left column
// @include        http://www.toodledo.com/views/folder.php*
// ==/UserScript==


var toodleDoLeftTabs = function() {

	var tabWidth = 200;

	var log = function(item) {
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
		style.innerHTML = css;
		head.appendChild(style);
	}

	var changeTabStyle = function() {
		addGlobalStyle(
			"#tabs { overflow: none; float: left; height: auto; width: " + tabWidth + "px; }"+
			".tab { float: none; }"+
			".tabon { float: none; }"+
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
			"#contentContainer { float: left; overflow: hidden; }" 
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

	return {
		execute: function() {
			initResizeListener();
			initTOCListener();
			changeTabStyle();
			createContainer();
			moveElements();
		}
	}
}();

toodleDoLeftTabs.execute();
