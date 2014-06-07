// ==UserScript==
// @name        Capture Web Page for userChrome.js
// @include     main
// @include     chrome://browser/content/browser.xul
// ==/UserScript==

/*
网页截图 - Griever - http://d.hatena.ne.jp/Griever/20081222/1229958279
を勝手にuserChrome.js化
*/

//ページ全体をキャプチャ
(function(){

	var captureMenu = document.createElement("menuitem");
	captureMenu.setAttribute("label","\u622A\u53D6\u6574\u4E2A\u9875\u9762");
	captureMenu.addEventListener("command",function(){
	    var win = window.content;
	    var w = win.document.width;
	    var h = win.document.height;
	
		var pos = document.getElementById('status-bar');
		var scrollbox = document.createElement('scrollbox');
		scrollbox.width = '1';
		scrollbox.height = '1';
		pos.appendChild(scrollbox);
	
	    var canvas = win.document.createElement('canvas');
	    canvas.style.display = 'inline';
	    canvas.width = w;
	    canvas.height = h;
	    scrollbox.appendChild(canvas);
	
	    var ctx = canvas.getContext("2d");
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.save();
	    ctx.scale(1.0, 1.0);
	    ctx.drawWindow(win, 0, 0, w, h, "rgb(255,255,255)");
	    ctx.restore();
	
	    var url = canvas.toDataURL("image/png");
		const IO_SERVICE = Components.classes['@mozilla.org/network/io-service;1']
                   .getService(Components.interfaces.nsIIOService);
		url = IO_SERVICE.newURI(url, null, null);

		var fp = Components.classes['@mozilla.org/filepicker;1']
		          .createInstance(Components.interfaces.nsIFilePicker);
		fp.init(window, "Save Screenshot As", fp.modeSave);
		fp.appendFilters(fp.filterImages);
		fp.defaultExtension = "png";
		fp.defaultString = win.document.title + ".png";
		if ( fp.show() == fp.returnCancel || !fp.file ) return;

		var wbp = Components.classes['@mozilla.org/embedding/browser/nsWebBrowserPersist;1']
         	 .createInstance(Components.interfaces.nsIWebBrowserPersist);
		wbp.saveURI(url, null, null, null, null, fp.file);

	    pos.removeChild(scrollbox);
	},false);

	document.getElementById("menu_ToolsPopup").insertBefore(
		captureMenu,
		document.getElementById("sanitizeSeparator"));
})();
