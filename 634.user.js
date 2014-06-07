// Backpack It! example user script
// version 0.2 BETA!
// 2005-04-22
// Copyright (c) 2005, Dan Webb http://danwebb.net/
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Backpack It!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Backpack It!
// @namespace http://danwebb.net/userscripts/backpack/
// @description Enables addition of web page content to be added as notes to Backpack
// @include *
// ==/UserScript==

function BackpackIt() {
	
	// API URIs
	var URL_GET_PAGES = "{url}/ws/pages/all";
	var URL_ADD_NOTE = "{url}/ws/page/{page}/notes/create";
	var API_HEADERS = {"X-POST_DATA_FORMAT" : "xml"};
	
	// XML and HTML templates
	var genericTemplate = "<html>" +
								 "<head>" + 
								 	"<title>{title}</title>" +
									"<style type='text/css'>" +
									"body {background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size : 80%; padding: 0; margin: 0;}" +
									"h1 {font-size: 120%; text-align : center; background: #EEE; padding: 0.5em; margin: 0}" +
									"div {margin: 1em;}" +									
									"label {display: block; font-weight: bold;}" +
									"input, select {display : block; margin-bottom: 1.5em; width : 100%;}" +
									"#preview {padding: 0.5em; background: #FFF; border: 1px solid black; overflow: hidden;}" +
									"h2 {margin-top: 0}" +
									"#close {text-decoration: none; position: absolute; top: 7px; right: 10px; color: #000;}" +
									"</style>" +
									"<body>" + 
									"<form id='f'>" +
										"{content}" +
									"</form>" +
									"</body>" +
								 "</head>" +
								 "</html>";
	
	var configTemplate = "<h1>Configure Backpack It! <a id='close' href='' title='Close Backpack It!'>X</a></h1>" +
								"<div><label for='url'>Backpack URL: </label> <input type='text' id='url' value='http://yoursite.backpackit.com' />" +
								"<label for='token'>API Token: </label> <input type='text' id='token' value='' />" + 
								"<input type='submit' id='submit' value='Update Configuration' /></div>";
								
	var pageSelectTemplate = "<h1>Add Note to Backpack <a id='close' href='' title='Close Backpack It!'>X</a></h1>" +
									"<div><label for='page'>Select a page</label> <select id='page' disabled='disabled'><option>Fetching Pages...</option></select></div>" +
									"<div id='preview'><h2>{title}</h2><p>{body}</p></div>";
									
	var imagesTemplate = "<h1>Add Images to Backpack <a id='close' href='' title='Close Backpack It!'>X</a></h1>" +
									"<div>Click an image (highlighted in <span style='color: red; font-weight: bold;'>red</span>) to add to your Backpack.</div>";
									
								 
	var allRequestsTemplate = "<request>" +
											"<token>{token}</token>" +
											"{content}" +
									  "</request>";
									  
	var addNoteTemplate = "<note>" +
    							 "<title>{title}</title>" +
    							 "<body>{body}</body>" +
  								 "</note>";
	
	// stored config
	var url = GM_getValue("url", "");
	var token = GM_getValue("token", "");
	
	// replace out tagged text with values
	function replaceTags(str, o) {
		for (var i in o) {
			var rx = new RegExp("{" + i + "}", "g");
			str = str.replace(rx, o[i]);
		}
		return str;
	}
	
	function error(msg) {
		alert("Error " + msg + ".  Please check your url and token settings.");
	}
	
	function openWindow(id, content) {
		var w = document.createElement("iframe");
		document.body.insertBefore(w, document.body.firstChild);
		w.setAttribute("style", "width: 300px; height: 210px; position: fixed; top: 10px; left: 10px; border: 2px solid #000; border-color: #CCC #000 #000 #CCC; z-index: 100;");
		w.id = id;
		w.close = function() {
			this.parentNode.removeChild(this);
		}
		
		var wd = w.contentDocument;
		
		wd.open();
		wd.write(content);
		wd.close();
		
		w.style.height = wd.body.offsetHeight + 25 + "px";
		wd.getElementById("close").onclick = function() {
			w.close();
			return false;
		}
		
		return w;
	}
	
	function buildOptions(xmlDoc, select) {
		var pages = xmlDoc.firstChild.childNodes[1].childNodes;
		
		select.childNodes[0].innerHTML = "Select Page";
		
		for (var i=0; i < pages.length; i++) {
			if (pages[i].nodeName=="page") {
				var id = pages[i].getAttribute("id");
				var title = pages[i].getAttribute("title");
				
				var opt = document.createElement("option");
				var title = document.createTextNode(title);
				opt.setAttribute("value", id);
				opt.appendChild(title);
				select.appendChild(opt);
				
				select.disabled = false;
			}
		}
		
	}
	
	function sendNote(page, title, body) {
		
		GM_xmlhttpRequest({
			method: "POST",
			url: replaceTags(URL_ADD_NOTE, {url: url, page: page}),
			headers: API_HEADERS,
			data: replaceTags(allRequestsTemplate, {token: token, content: replaceTags(addNoteTemplate, {title: title, body: body})}),
			onload: function(response) {
				if (response.status == 200) {
						// got pages - fill select box
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(response.responseText, "application/xml");
						if (xmlDoc.firstChild.getAttribute("success")=="true") {
							alert("Note Added.");
						} else error("adding note");
				} else {
					error("adding note");
				}
			},
			onerror: function() {
				error("adding note");
			}
		});
		
	}
	
	// shows config dialog	
	function showConfig() {
		if (!document.getElementById("BACKPACKITconfig")) {
			var config = openWindow("BACKPACKITconfig", replaceTags(genericTemplate, {title: "Configure Backpack It!", content: configTemplate}));
			var cd = config.contentDocument;
			
			var urlInput = cd.getElementById("url");
			var tokenInput = cd.getElementById("token");
			
			cd.getElementById("f").onsubmit = function() {
				url = urlInput.value;
				token = tokenInput.value;
				
				GM_setValue("url", url);
				GM_setValue("token", token);
				
				alert("Backpack It! configuration updated");
				
				config.close();
				return false;
			}
			
			if (url!="") urlInput.value = url;
			if (token!="") tokenInput.value = token;
		}
	}
	
	function showPageSelect(title, body) {
		if (!document.getElementById("BACKPACKITpageselect")) {
		var content = replaceTags(pageSelectTemplate, {title: title, body: body.replace(/\n/g, "<br />")});
		var addnote = openWindow("BACKPACKITpageselect", replaceTags(genericTemplate, {title: "Select A Backpack page", content: content}));
		
		var ad = addnote.contentDocument;
		
		// get pages, add on change event after the select is filled
		
			GM_xmlhttpRequest({
				method: "POST",
				url: replaceTags(URL_GET_PAGES, {url: url}),
				headers: API_HEADERS,
				data: replaceTags(allRequestsTemplate, {token: token, content: ""}),
				onload: function(response) {
					if (response.status == 200) {
							// got pages - fill select box
							var parser = new DOMParser();
							var xmlDoc = parser.parseFromString(response.responseText, "application/xml");
							if (xmlDoc.firstChild.getAttribute("success")=="true") {
								buildOptions(xmlDoc, ad.getElementById("page"));
								ad.getElementById("page").onchange = function() {
									sendNote(this.options[this.selectedIndex].value, title, body);
									addnote.close();
								}
							} else {
								error("getting page details");
								addnote.close();
							}
					} else {
						error("getting page details");
						addnote.close();
					}
				},
				onerror: function() {
					error("getting page details");
					addnote.close();
				}
			});
		}
	}
	
	function addNote(content) {
	
		var title, body;
		title = document.title;
		body = (content!="")?content + "\n\nFrom: " + location.href:location.href;		
		
		showPageSelect(title, body);
	}
	
	function showClickImages() {
	
		if (!document.getElementById("BACKPACKITimages")) {
			var images = openWindow("BACKPACKITimages", replaceTags(genericTemplate, {content: imagesTemplate}));
			var img = document.getElementsByTagName("img");
			
			images.close = function() {
				this.parentNode.removeChild(this);
				var img = document.getElementsByTagName("img");
			
				for (var i in img) {
					if (img[i].style) {
						img[i].style.border = img[i].origBorder;
						img[i].style.cursor = "";
					}
					if (img[i].origClick) img[i].onclick = img[i].origClick;
				}
			}
		
			
			for (var i in img) {
				if (img[i].style) {
					img[i].origBorder = img[i].style.border;
					img[i].style.border = "3px solid red";
					img[i].style.cursor = "pointer";
				}
				if (img[i].onclick) img[i].origClick = img[i].onclick;
				img[i].onclick = function() {
					addNote("!" + this.src + "!");
					images.close();
					return false;
				}
			}
		}	
	}
	
	function keyDown(e) {	
		if (e.shiftKey&&e.ctrlKey) {
			switch (e.keyCode) {
				case 66: // ctrl+shift+B (show config)
					showConfig();
					break;
					
				case 78: //ctrl+shift+N (add note)
					if (token==""||url=="") {
						alert("You have not yet configured Backpack It! with your backpack URL and Token.  Please before using Backpack It! Press Ctrl+Shift+B to configure.");
						return;
					}
					var s = window.getSelection();
					addNote(s);
					break;
					
				case 80: //ctrl+shift+P (add images as note)
					if (token==""||url=="") {
						alert("You have not yet configured Backpack It! with your backpack URL and Token.  Please before using Backpack It! Press Ctrl+Shift+B to configure.");
						return;
					}
					showClickImages();
					break;
			}
		}
	}
	
	// add menu item for config
	GM_registerMenuCommand("Backpack It! Configure Ctrl+Shift+B", showConfig);
	GM_registerMenuCommand("Backpack It! Add Note Ctrl+Shift+N", function() {addNote(window.getSelection())});
	GM_registerMenuCommand("Backpack It! Add Image as Note Ctrl+Shift+P", showClickImages);
	
	// add handler for keyboard shortcuts
	window.addEventListener("keydown", keyDown, true);
	
}

// check to see if built-in GM functions required are available
if (GM_getValue&&GM_xmlhttpRequest&&GM_registerMenuCommand) BackpackIt(); 
else {
	alert("BackpackIt requires Greasemonkey 0.3 or above.  Please upgrade to use this script.");
}
