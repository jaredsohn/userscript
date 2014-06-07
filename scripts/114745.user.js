// ==UserScript==
// @name           Google Reader Extra
// @namespace      https://userscripts.org/users/315369
// @description	   Hides topbar and searchbar, adds new hotkeys and button
// @include        http://www.google.tld/reader/view/*
// @include        https://www.google.tld/reader/view/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant          GM_openInTab
// @grant          GM_addStyle
// @version        1.3
// ==/UserScript==

/*
  based on
https://userscripts.org/scripts/review/69161
https://userscripts.org/scripts/review/65715
https://userscripts.org/scripts/review/127168
https://userscripts.org/scripts/review/116957
*/

/* 
  Keyboard shortcuts:
    h - navigation (emulates click on "Navigation"-button)*
        [* same as standard hotkey shift+u]
    b - open item in background tab
    i - show all items / show new items
    w - unhide/hide topbar & searchbar
*/

jQuery.noConflict();

(function() {

//----- Extra Buttons -----//

  var orig_button = jQuery('#entries-up');

  var new_button = orig_button.clone();
  // init new button
  new_button.attr('id', 'open-in-background')
            .attr('title', 'Open item')
  // insert new button
  orig_button.after(new_button);
  // create function
  var open_entry = function() {
    var cur = jQuery('#current-entry');
    if (cur.length) {
      GM_openInTab(cur.find('a.entry-title-link').attr('href'));
    }
  };
  // bind click-handler
  new_button.click(open_entry);
  
  GM_addStyle(" \
  #open-in-background .jfk-button-img { opacity: 0 !important; } \
  #open-in-background { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAcCAYAAADr9QYhAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEAAACxABrSO9dQAAAAd0SU1FB9sKHAA3CQ2JrloAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjlAPLDLAAAAr0lEQVRYR+2W0QnAIAxE2zFdwnnctu1JLUGq5vwxSALSn2t4uUTJGUI4zARgrBwzILlDVlxxmF4ntmjT9VSoOVSxlPgFwD8aEGio/JS4BXNVIWCp/JS450xK6UNaClNAyncZjAQBBGIJTA3yM9jUGFBiOTMxxuwCgDq3i8pPiesBBtDgmlP5KbHVd4YtQqVXicRLOmrL9E3yFWL7FYKdNZVeJWJXgVm9w7Scc2daztyYiHEp4NgupgAAAABJRU5ErkJggg==) !important; } \
  #open-in-background:hover { box-shadow:0 1px 1px rgba(0,0,0,.1); background-color:#f8f8f8; background-image:linear-gradient(top,#f8f8f8,#f1f1f1); border:1px solid #c6c6c6; color:#333 !important; } \
  ");
  
  // move item-up-down-buttons to the left
  GM_addStyle(" \
  #viewer-refresh, \
  #viewer-view-options, \
  #mark-all-as-read-split-button, \
  #stream-prefs-menu { float: none !important; } \
  #item-up-down-buttons { float: left !important; } \
  #viewer-refresh { min-width: 35px !important; padding: 0 !important; } \
  #settings-button { min-width: 25px !important; } \
  ");


//----- Extra Hotkeys -----//

  function open_tab(){
    href=jQuery("#current-entry a[class='entry-title-link']").attr("href");
    if(href){
      GM_openInTab(href);
    }
  };

  function nav(){
    doClick('chrome-lhn-menu');
  };

  function doClick(id){
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);	
    var obj = document.getElementById(id); 
    obj.dispatchEvent(evt);
  };


	var re = /\d+/;
	
	function toggleView() {
		var vvo = document.getElementById('viewer-view-options');
		if (vvo.firstChild.textContent.search(re) == -1) {
			doToggle(':8', vvo);
		} else {
			doToggle(':7', vvo);
		}
	}

	function doToggle(id, vvo) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('mousedown',1,1);
		vvo.dispatchEvent(evt);
		evt = document.createEvent('MouseEvents');
		var obj = document.getElementById(id);
		evt.initEvent('mouseover',1,1);
		obj.dispatchEvent(evt);
		evt = document.createEvent('MouseEvents');
		evt.initEvent('mouseup',1,1);
		obj.dispatchEvent(evt);
		obj.dispatchEvent(evt);
		vvo.blur();
	}


  jQuery(document).keydown(function (e) {
    element=e.target;
    if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
    tecla=String.fromCharCode(e.which).toLowerCase();
    if(tecla == "h" ) { nav(); }
    if(tecla == "b" ) { open_tab(); }
    if(tecla == "i" ) { toggleView(); }
  });


 // hide/unhide topbar & searchbar with 'w'-key
 function KeyDownEvent(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     userIsTyping = (element.type == "text" || element.type == "password");
   } else {
     userIsTyping = (elementName == "textarea");
   }
   if (userIsTyping) return true;
   if (String.fromCharCode(event.which) == "W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
     toggle_visibility();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }

function toggle_visibility ()
{
   var is_visible = document.getElementById("gb").style.display != "none";
   document.getElementById('gb').style.display = is_visible?"none":"block";
}

 document.addEventListener("keydown", KeyDownEvent, false);
 toggle_visibility();

})();
