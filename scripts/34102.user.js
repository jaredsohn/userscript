// ==UserScript==
// @name           ToodleDo Quick Links
// @namespace      http://userscripts.org
// @description    Add quick links next to folders
// @include        http://www.toodledo.com/views/*
// ==/UserScript==


var toodleDoQuickLinks = (function() {

	var _tasksElement;

	var getTasksElement = function() {
		GM_log(_tasksElement);
		if (!_tasksElement) {
			_tasksElement = document.getElementById("tasks");
			GM_log(_tasksElement);
		}
		return _tasksElement;
	};

	var addQuickLinks = function() {
		removeListener();
		setTimeout(function() {
			addFolderQuickLinks();
			addListener();
		}, 1000);

	}

	var addFolderQuickLinks = function() {
		var folderColumns = getTasksElement().getElementsByClassName("col1");
		for(var i = 0; i < folderColumns.length; i++) {
			var folderColumn = folderColumns[i];
			var span = folderColumn.firstChild;

			var folderId = span.getAttribute("old");

			if (folderId && folderColumn.innerHTML.indexOf("tdQuickLink") == -1)
				folderColumn.innerHTML += '&nbsp;<a class="tdQuickLink" href="folder.php?i='+folderId+'" style="text-decoration: none">&raquo;</a>';
		}
	}
	
	var onLoad = function() {
		addListener();
		addQuickLinks();
	}

	var unLoad = function() {
		removeListener();
	}

	var addListener = function() {
		getTasksElement().addEventListener("DOMNodeInserted", addQuickLinks, false);
	}

	var removeListener = function() {
		getTasksElement().removeEventListener("DOMNodeInserted", addQuickLinks, false);
	}

	return {
		init: function() {
			window.addEventListener("load", onLoad, false);
			window.addEventListener("unload", unLoad, false);
		}
	}
}());

toodleDoQuickLinks.init();
