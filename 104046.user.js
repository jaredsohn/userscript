//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            CohumanPanelSize
// @namespace       http://www.cohuman.com/fix/
// @description     Attempt to fix Cohuman panel sizes
// @include         https://*.cohuman.*/*
// ==/UserScript==
	
(function() {

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	function addGlobalScript(code,first) {
		var head, script;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = code;
		head.appendChild(script);
	}

	addGlobalStyle(" \
		p.comment_text { overflow-x:auto; display:inline; white-space: nowrap; border:0px; } \
		div.activity_group p.comment_text { border: 0px; } \
		.panel { width: 550px; } \
		.column { width: 550px; } \
		");
	
	addGlobalScript(' \
		Panel.WIDTH = 550; \
		TaskPanel.WIDTH = 900; \
		var i,p; \
		var lst = new Array(); \
		for( p in workspace.panels ) { \
			lst.push(p); \
		} \
		for( i=lst.length-1; i>=0; --i) { \
			eval("workspace.removePanel(workspace.panels."+lst[i]+")"); \
		} \
		delete lst; \
		');
})();

// END FILE  