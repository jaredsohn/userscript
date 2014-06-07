// ==UserScript==
// @name	  Textarea Drag Resize
// @namespace	  http://userscripts.org/scripts/show/10140
// @description	  Gives every textarea an icon that you can drag to resize the textarea
// @version	  22 Nov 2010
// @include	  *
// @author	  mjk4984@yahoo.com
// @contributor  Glenn Carr
// @contributor  Mindeye
// ==/UserScript==
/*
			"Textarea Drag-Resize"

This GreaseMonkey script puts a little "+"-shaped resizer icon next to
every textarea; clicking and dragging that icon will resize its textarea.

*/
TextArea_Drag = {
	// script version
	scriptVersion : "22 Nov 2010",

	// URLs related to the script
	scriptFileURL: "http://userscripts.org/scripts/source/10140.user.js",
	scriptHomepageURL: "http://userscripts.org/scripts/show/10140",

	// constants
	DEBUG : 0,
	BUTTON_HEIGHT : 12,
	BUTTON_WIDTH : 12,
	
	// preferences
	Drag_increments: null,
	Min_Height: null,
	Min_Width: null,
	Max_Height: null,
	Max_Width: null,
	
	// text area values
	Orig_width: null,
	Orig_height: null,
	Cursor_start_x: null,
	Cursor_start_y: null,
	Dragged_textarea: null,
	
	trace : function(level,msg) { 
		if (this.DEBUG >= level) GM_log(msg);
		return;
	},
	
	run_proxy: function()
	{
		window.removeEventListener("load", TextArea_Drag.run_proxy, false);
		TextArea_Drag.run();
	},

	run : function() {
		if (
			document.documentElement.tagName == "HTML"
			&& document.contentType == "text/html"
			&& document.body    // Basic sanity
		) {
			this.trace(11, "Starting");
			
			// Check to see if we should check for an update script
			this.updateCheck();
		
			// Change cursor for button, make button position relative
			GM_addStyle( '.text_area_grabber_button { cursor:se-resize; position:relative; }' );   
	
			var them = document.getElementsByTagName("textarea");
			var lists = document.getElementsByTagName("select"); 
			if (!(them && them.length)) { 
				this.trace(11, "No textareas."); 
				return; 
			}
			this.inits();
			for(var i = them.length - 1; i >= 0; i--) {
				this.tweak_textarea(them[i]);
			}
			this.trace(5, them.length.toString() + " textareas.");
			
			for(var i = lists.length - 1; i >= 0; i--) {
				var listSize = lists[i].getAttribute("size");
				if ( listSize != null && parseInt( listSize, 10 ) > 1 )
					this.tweak_textarea(lists[i]);
			}
			this.trace(5, lists.length.toString() + " lists."); 
		}
		
		return;
	},

	//	-	-	-	-	-	-	-	-	-

	get_pref : function(prefname, defaulty) {
		var gotten = GM_getValue(prefname, null);
		if(gotten == null) {
			GM_setValue(prefname, defaulty);
			return defaulty;
		} else {
			return gotten;
		}
	},

	inits : function() {
		// Number of pixels that we grow by at a time:
		this.Drag_increments = this.get_pref('drag_increment_size', 5);

		// Constraints (in pixels) on draggable dimensions of textareas:
		this.Min_Height = this.get_pref('min_height',	30);
		this.Min_Width  = this.get_pref('min_width' ,	30);
		this.Max_Height = this.get_pref('max_height', 1400);
		this.Max_Width  = this.get_pref('max_width' , 1400);
  
		return;
	},

	tweak_textarea : function(textarea) {
		var doc = textarea.ownerDocument;
		var parent = textarea.parentNode;

		var button = doc.createElement('img');
		button.setAttribute('src','resource://gre/res/grabber.gif');
		button.setAttribute('height', this.BUTTON_HEIGHT);
		button.setAttribute('width' , this.BUTTON_WIDTH);
		button.setAttribute('alt','grabby');
		button.setAttribute('type', 'text_area_grabber_button');
  
		// Change cursor for button, make button position relative
		button.setAttribute('class', 'text_area_grabber_button');
		
		// insert before textarea
		parent.insertBefore(button, textarea);
		
		// Modify Textarea's border to remove extra space created by adding button
		var marginTop = this.num(getComputedStyle(textarea, "").marginTop);
		textarea.style.marginTop = (marginTop - this.BUTTON_HEIGHT).toString() + "px";
		
		// update button with textarea info
		this.update_button(textarea);
		
		button.title = "Click and drag to change the size";
  
		// watch for textarea style change so we can hiden button if need be.
		textarea.addEventListener('DOMAttrModified', this.text_area_modified, false);
		doc.addEventListener('DOMSubtreeModified', this.doc_modified, false);
  
		// listen for dragging button
		button.addEventListener('mousedown', this.start_dragging, true);

		return;
	},

	doc_modified : function(event) {
		var tagName = event.target.tagName.toLowerCase();
		if (tagName == "div" || tagName == "span") {
			TextArea_Drag.trace(15, "Container modified, check text areas in that container");
			
			var elems = event.target.getElementsByTagName("textarea");
			for (var i=0; i < elems.length; i++) {
				var textarea_style = getComputedStyle(elems[i], "" );
				TextArea_Drag.update_button(elems[i]);
			}

			var elems = event.target.getElementsByTagName("select");
			for (var i=0; i < elems.length; i++) {
				var textarea_style = getComputedStyle(elems[i], "" );
				TextArea_Drag.update_button(elems[i]);
			}
		}
	},
	
	text_area_modified : function(event) {
		// if style or class changes copy computed display/visibility style to button
		if ((event.attrName == "style") || (event.attrName == "class") || (event.attrName == "rows") || (event.attrName == "columns")) {
			//TextArea_Drag.trace(15, "TextArea \"" + (event.target.id?event.target.id:event.target.name) + "'s\" \"" + event.attrName + "\" attribute updated to " + event.newValue);
			// update button for text area
			TextArea_Drag.update_button(event.target);
		}
	},

	// Put the button outside the bottom right corner of the text area or hide it if text area isn't visible
	update_button : function(textarea) {
		// Get text style
		var textarea_style = getComputedStyle(textarea, "" );

		// get button
		var button = textarea.previousSibling;
		
		// unless textarea's display is none, set display to block otherwise set display to none
		if (textarea_style.display != "none" && textarea_style.visibility != "hidden") {
			// Display button
			button.style.display = "block";

			var height = this.num(getComputedStyle(textarea, "" ).height);
			var marginTop = this.num(textarea_style.marginTop);
			var borderTopWidth = this.num(textarea_style.borderTopWidth);
			var paddingTop = this.num(textarea_style.paddingTop);
			button.style.top = (height + marginTop + borderTopWidth + paddingTop).toString() + "px";
			
			// Get current textarea width
			var width = this.num(textarea_style.width);
			var marginLeft = this.num(textarea_style.marginLeft);
			var borderLeftWidth = this.num(textarea_style.borderLeftWidth);
			var paddingLeft = this.num(textarea_style.paddingLeft);
			button.style.left = (width + marginLeft + borderLeftWidth + paddingLeft).toString() + "px";
			
			//this.trace(25, "Button for \"" + textarea.id + "\", left = " + (textarea_width + textarea.offsetLeft).toString() + ", top = " + (textarea_height + textarea.offsetTop).toString());
		}
		else {
			// Hide button
			button.style.display = "none";
		}
	},
	
	start_dragging : function(event) {
		TextArea_Drag.Dragged_textarea = event.target.nextSibling;
		TextArea_Drag.Cursor_start_x = event.clientX;
		TextArea_Drag.Cursor_start_y = event.clientY;
		
		var textarea_style = getComputedStyle(TextArea_Drag.Dragged_textarea, "" );
		TextArea_Drag.Orig_width   = TextArea_Drag.num( textarea_style.width  );
		TextArea_Drag.Orig_height  = TextArea_Drag.num( textarea_style.height );

		TextArea_Drag.trace(4, "Starting dimensions of textarea: w=" + textarea_style.width + " by h=" + textarea_style.height);
		event.target.ownerDocument.addEventListener("mousemove", TextArea_Drag.ev_drag_move, true);
		event.target.ownerDocument.addEventListener("mouseup",   TextArea_Drag.ev_drag_stop, true);

		TextArea_Drag.trace(5,"Starting dragging");
		event.preventDefault();
		return;
	},

	num : function(i) {
		var m;
		if(typeof(i) == "string") {
			m = i.match( /(-)?(\d+)(\.\d+)*px/ );
			// nota bene: yes, the computed style can be fractional, like "123.56px"!!
			if (m) {
				i = parseInt(m[2], 10);
				if (m[1] == "-") i = -i;
			} else {
				this.trace(1, "Weird pseudonumerical value: \"" + i + "\"!");
			}
		} else if(typeof(i) == "number") {
			// just fall thru
		} else {
			this.trace(1, "Weird nonnumerical value: \"" + i + "\"!");
		}
		//this.trace( typeof(i) + ": " + i.toString() );
		return i;
	},

	ev_drag_move : function(event) {
		var
			new_width  = event.clientX - TextArea_Drag.Cursor_start_x + TextArea_Drag.Orig_width ,
			new_height = event.clientY - TextArea_Drag.Cursor_start_y + TextArea_Drag.Orig_height;

		new_width  = TextArea_Drag.px_between(TextArea_Drag.Min_Width, new_width , TextArea_Drag.Max_Width,  TextArea_Drag.Drag_increments);
		new_height = TextArea_Drag.px_between(TextArea_Drag.Min_Height, new_height, TextArea_Drag.Max_Height, TextArea_Drag.Drag_increments);

		//TextArea_Drag.trace(20, "Setting dimensions to h=" + new_height + " w=" + new_width);

		TextArea_Drag.Dragged_textarea.style.width	= new_width;
		TextArea_Drag.Dragged_textarea.style.height = new_height;

		event.preventDefault();
		return;
	},

	ev_drag_stop : function(event) {
		TextArea_Drag.Dragged_textarea = null;
		
		// Stop capturing the mousemove and mouseup events.
		document.removeEventListener("mousemove", TextArea_Drag.ev_drag_move, true);
		document.removeEventListener("mouseup",   TextArea_Drag.ev_drag_stop, true);
		event.preventDefault();
		return;
	},

	px_between : function(min, i, max, incr) {
		if (incr)  i = Math.floor(i/incr) * incr;
			return(
				(
					(i > max) ? max
					:(i < min) ? min
					: i
				).toString() + "px"
			);
	},
	
	DisplayConfigPage :function(e) {
		var w = window.open("", "TextAreaDrag", "width=400,height=250");
		// this is needed in case window opens as a tab
		w.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head></head><body></body></html>');	
		w.document.close();
	
		var h2 = document.createElement("h2");
		w.document.body.appendChild(h2);
		h2.innerHTML = "Text Area Drag Script Config Settings";

		// Increment by value
		var label = document.createTextNode("Pixels to grows/shrink text areas by :");
		w.document.body.appendChild(label);

		var dragSize = document.createElement("input");
		dragSize.setAttribute("type", "text");
		dragSize.setAttribute("value", GM_getValue("drag_increment_size", 5));
		w.document.body.appendChild(dragSize);
	
		var linebreak = document.createElement("br");
		w.document.body.appendChild(linebreak);
		
		// Min height
		label = document.createTextNode("Minimum text area height: ");
		w.document.body.appendChild(label);

		var minHeight = document.createElement("input");
		minHeight.setAttribute("type", "text");
		minHeight.setAttribute("value", GM_getValue("min_height", 30));
		w.document.body.appendChild(minHeight);
	
		linebreak = document.createElement("br");
		w.document.body.appendChild(linebreak);
		
		// Min width
		label = document.createTextNode("Minimum text area width: ");
		w.document.body.appendChild(label);

		var minWidth = document.createElement("input");
		minWidth.setAttribute("type", "text");
		minWidth.setAttribute("value", GM_getValue("min_width", 30));
		w.document.body.appendChild(minWidth);
	
		linebreak = document.createElement("br");
		w.document.body.appendChild(linebreak);
		
		// Max height
		label = document.createTextNode("Maximum text area height: ");
		w.document.body.appendChild(label);

		var maxHeight = document.createElement("input");
		maxHeight.setAttribute("type", "text");
		maxHeight.setAttribute("value", GM_getValue("max_height", 1400));
		w.document.body.appendChild(maxHeight);
	
		linebreak = document.createElement("br");
		w.document.body.appendChild(linebreak);
		
		// Min width
		label = document.createTextNode("Maximum text area width: ");
		w.document.body.appendChild(label);

		var maxWidth = document.createElement("input");
		maxWidth.setAttribute("type", "text");
		maxWidth.setAttribute("value", GM_getValue("max_width", 1400));
		w.document.body.appendChild(maxWidth);
	
		linebreak = document.createElement("br");
		w.document.body.appendChild(linebreak);
		linebreak = document.createElement("br");
		w.document.body.appendChild(linebreak);
		
		var saveButton = document.createElement("input");
		saveButton.setAttribute("type", "button");
		saveButton.setAttribute("value", "Save");
		saveButton.addEventListener("click", function() { 
			GM_setValue("drag_increment_size", dragSize.value);
			GM_setValue("min_height", minHeight.value);
			GM_setValue("min_width", minWidth.value);
			GM_setValue("max_height", maxHeight.value);
			GM_setValue("max_width", maxWidth.value);

			TextArea_Drag.Drag_increments = dragSize.value;
			TextArea_Drag.Min_Height = minHeight.value;
			TextArea_Drag.Min_Width  = minWidth.value;
			TextArea_Drag.Max_Height = maxHeight.value;
			TextArea_Drag.Max_Width  = maxWidth.value;
			
			this.removeEventListener("click", arguments.callee, false);
			w.close();
		}, false);
		w.document.body.appendChild(saveButton);
		
		var cancelButton = document.createElement("input");
		cancelButton.setAttribute("type", "button");
		cancelButton.setAttribute("value", "Cancel");
		cancelButton.addEventListener("click", function(aEvent) { 
			this.removeEventListener("click", arguments.callee, false);
			w.close();
		}, false);
		w.document.body.appendChild(cancelButton);
	},

	// The following functions to check for updates were based off code in the YousableTubeFix GreaseMonkey Script
	// http://userscripts.org/scripts/show/13333
	
	updateCheck: function() {
		this.scriptVersion = new Date(this.scriptVersion).getTime();
		TextArea_Drag.trace(10, "Current version: " + this.scriptVersion);
	
		var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);
		if (isNaN(scriptLastCheck)) scriptLastCheck = 0;

		var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", this.scriptVersion.toString()), 10);
		if (isNaN(scriptLastRemoteVersion)) scriptLastRemoteVersion = this.scriptVersion;
		
		// Checks for script updates
		if (Date.now() - scriptLastCheck >= 86400000) { // 1 day
			// At least a day has passed since the last check. Sends a request to check for a new script version
			GM_setValue("scriptLastCheck", Date.now().toString());
			TextArea_Drag.trace(10, "Checking for updated version");
			this.scriptCheckVersion();
		}
		else {
			// If a new version was previously detected the notice will be shown to the user
			// This is to prevent that the notice will only be shown once a day (when an update check is scheduled)
			if (scriptLastRemoteVersion > this.scriptVersion) {
				TextArea_Drag.trace(10, "Updated version previously found");
				this.scriptShowUpdateMessage(true, scriptLastRemoteVersion);
			}
		}		
	},

	// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
	// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
	scriptShowUpdateMessage: function(scriptShowMessage, scriptNewVersion) {
	
		// Creates a new node with the given attributes and properties (be careful with XPCNativeWrapper limitations)
		function createNode(type, attributes, props) {
			var node = document.createElement(type);
			if (attributes) {
				for (var attr in attributes) {
					node.setAttribute(attr, attributes[attr]);
				}
			}
			if (props) {
				for (var prop in props) {
					if (prop in node) node[prop] = props[prop];
				}
			}
			return node;
		}

		// Adds styles for the script "new version" message and its anchors
		GM_addStyle("#gsscriptTARSVersionMessage {background-color: #C00040; color: white; outline: black solid thin; overflow: auto; " +
			"padding: 5px; position: fixed; z-index: 99; top: 0px; right: 0px; width: 250px; height: 70px; text-align: center !important");
		GM_addStyle("#gsscriptTARSVersionMessage a {margin: 0px 5px} !important");

		
		// Gets the notice box and the script new version date in UTC format
		var messageDiv = document.getElementById("gsscriptTARSVersionMessage");

		// Shows/creates/hides the update notice
		if (!scriptShowMessage) {
			// Hides the notice if it exists
			if (messageDiv) messageDiv.style.display = "none";
		}
		else {
			var scriptNewVersionDate = (new Date(scriptNewVersion)).toUTCString();

			// The notice shouldn't be shown/created if the user has chosen to hide it for this session
			if (unsafeWindow.sessionStorage.gsscriptTADRVersionNoticeHide) return;

			if (messageDiv) {
				// Shows the notice
				messageDiv.style.display = "";
			}
			else {

				// Creates the notice
				messageDiv = createNode("div", {id: "gsscriptTARSVersionMessage", title: "A new Textarea Drag Resize version is available"});
				messageDiv.innerHTML = "A new version of Textarea Drag Resize (" + scriptNewVersionDate + ") is available<br><br>" +
					"<a id='gsscriptTARSVersionMessageInstall' href='" + TextArea_Drag.scriptFileURL + "' title='Install the script update'>Install</a>" +
					"<a href='" + TextArea_Drag.scriptHomepageURL + "' target='_blank' title='Go to Textarea Drag Resize homepage'>Go to web page</a>" +
					"<a id='gsscriptTARSVersionMessageHide' href='javascript:void(null)' title='Hide the notice for this session'>Hide</a>";
				document.body.appendChild(messageDiv);

				// Adds an event listener to the hide notice link
				document.getElementById("gsscriptTARSVersionMessageHide").addEventListener("click", function(evt) {
					unsafeWindow.sessionStorage.gsscriptTADRVersionNoticeHide = "1"; // Sets a sessionStorage variable to prevent the notice to be shown for this session
					TextArea_Drag.scriptShowUpdateMessage();
				}, false);

				// Adds an event listener to the install link to hide the notice
				document.getElementById("gsscriptTARSVersionMessageInstall").addEventListener("click", TextArea_Drag.scriptShowUpdateMessage, false);
			}
		}
	},

	// Checks if there is a new script version according to the version information in the script homepage
	// The version information is in a line in the full description of the script: "<p>#[V:00000000]#</p>" (00000000 is the version number)
	// If the request is successful and there is a new version available, a message to the user is displayed
	scriptCheckVersion: function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: TextArea_Drag.scriptHomepageURL,
			onload: function(evt) {
				if ((evt.readyState == 4) && (evt.status == 200)) {

				// Gets the remote version from the response and makes sure it is a number
					var responseMatch = evt.responseText.match(/<b>Version:<\/b>\n\s*(.*)\n/);
					TextArea_Drag.trace(10, "Response from update check: " + responseMatch[1]);
					var remoteVersion = (responseMatch === null) ? NaN : new Date(responseMatch[1]).getTime();
					TextArea_Drag.trace(10, "Remote version: " + remoteVersion);
					if (isNaN(remoteVersion)) return;

					// Saves the more recent version according to the server and shows the update notice if the server version is newer
					GM_setValue("scriptLastRemoteVersion", remoteVersion.toString());
					if (remoteVersion > TextArea_Drag.scriptVersion) TextArea_Drag.scriptShowUpdateMessage(true, remoteVersion);

				}
				
			}
		});
	}
}

window.addEventListener("load", TextArea_Drag.run_proxy, false);
//TextArea_Drag.run();

GM_registerMenuCommand("Configure Text Area Drag", TextArea_Drag.DisplayConfigPage);
