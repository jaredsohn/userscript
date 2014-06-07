// NewTab.js
// Copyright (c) 2010-2012, Yus Uf
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "NewTab.js", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @id             66ffbb8e-dc41-4b3d-9a62-2bcc88d07de4
// @name           NewTab.js
// @version        1.0
// @namespace      
// @author         "Yus Uf" <cakyus@gmail.com>
// @description    Enhance your newTab experience
// @include        about:blank
// @run-at         document-start
// ==/UserScript==

if (window.addEventListener) {  
	window.addEventListener('load', newtab, false);
}

function newtab() {
	var style = new newtabStyle;
	// add container
	var div = document.createElement('div');
	div.id = 'container';
	document.body.appendChild(div);	
	newtabLoad();
}

function newtabLoad() {
	// add bookmarks
	for (i=0; i<9; i++) {
		var bookmark = new newtabBookmark;
		bookmark.bookmarkId = 'newtab.bookmark.'+i;
		bookmarkCaption = window.localStorage.getItem('newtab.bookmark.'+i+'.caption');
		if (bookmarkCaption==null || bookmarkCaption=='') {
			bookmarkCaption = 'Bookmark '+(i+1);
		}
		bookmark.caption = bookmarkCaption;
		bookmarkLocation = window.localStorage.getItem('newtab.bookmark.'+i+'.location');
		if (bookmarkLocation==null || bookmarkLocation=='') {
			bookmarkLocation = '#';
		}
		bookmark.href = bookmarkLocation;
		bookmark.show();
	}		
}

function newtabStyle() {
	var css = 'body {text-align: center; margin: 10px auto;}'
		+ ' div#container {margin: 0px auto; width: 90%; text-align: left;}'
		+ ' div.bookmark {background: #ddd; cursor: pointer; width: 25%; height: 23%; margin: 15px; float: left; border-radius: 5px; box-shadow: 3px 3px 5px 6px #ccc; padding: 15px;  position: relative}'
		+ ' div.bookmark:hover {background: #eee;}'
		+ ' div.bookmark .caption {height: 100%}'
		+ ' div.bookmark .toolbar {text-align: right; position: absolute; bottom: 15px; right: 15px}'
		+ ' button {margin-left: 5px}'
		+ '';
	var	head = document.getElementsByTagName('head')[0];
	var	style = document.createElement('style');

	style.type = 'text/css';
	if(style.styleSheet){
		style.styleSheet.cssText = css;
	}else{
		style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);	
}

function newtabGotoLocation(bookmarkId) {
	var bookmarkLocation = window.localStorage.getItem(bookmarkId+'.location');
	if (bookmarkLocation != null && bookmarkLocation != '') {
		document.location.href= bookmarkLocation;
	}
}

function newtabBookmark() {
	
	this.caption = 'Untitled';
	this.href = '#';
	this.bookmarkId = 0;
	
	this.show = function() {
		
		var divContainer = document.createElement('div');		
		divContainer.className = 'bookmark';
		var container = document.getElementById('container');
		container.appendChild(divContainer);
				
		var divCaption = document.createElement('div');
		divCaption.bookmarkId = this.bookmarkId;
		divCaption.innerHTML = this.caption;
		divCaption.className = 'caption';
		divCaption.href = this.href;
		divCaption.addEventListener('click', function() {
			newtabGotoLocation(this.bookmarkId);
		}, false);
		divContainer.appendChild(divCaption);
		
		var divToolbar = document.createElement('div');
		divToolbar.className = 'toolbar';
		divToolbar.href = this.href;
		divToolbar.title = this.href;
		divContainer.appendChild(divToolbar);
		
		var divButtonEdit = document.createElement('button');
		divButtonEdit.bookmarkId = this.bookmarkId;
		divButtonEdit.href = this.href;
		divButtonEdit.className = 'button';
		divButtonEdit.innerHTML = 'edit';
		divButtonEdit.type = 'button';
		divButtonEdit.addEventListener('click', function() {
			var bookmarkLocation = prompt('Location');
			var bookmarkCaption = prompt('Caption');
			if (	bookmarkLocation != null 
				&&	bookmarkLocation != ''
				&&	bookmarkCaption != null
				&&	bookmarkCaption != ''
				) {
				window.localStorage.setItem(this.bookmarkId+'.location', bookmarkLocation);
				window.localStorage.setItem(this.bookmarkId+'.caption', bookmarkCaption);
				window.location.reload();
			}
		}, true);
		divToolbar.appendChild(divButtonEdit);
		
		var divButtonClear = document.createElement('button');
		divButtonClear.bookmarkId = this.bookmarkId;
		divButtonClear.className = 'button';
		divButtonClear.innerHTML = 'clear';
		divButtonClear.type = 'button';
		divButtonClear.addEventListener('click', function() {
			window.localStorage.setItem(this.bookmarkId+'.location', '');
			window.localStorage.setItem(this.bookmarkId+'.caption', '');
			window.location.reload();
		}, true);
		divToolbar.appendChild(divButtonClear);
		
		return divContainer;
	}
}
