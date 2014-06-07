// ==UserScript==
// @id             WikispacesImprover
// @name           Wikispaces Improver
// @version        1.2.8
// @namespace      RJ
// @author         Rafael Jafferali
// @description    Improves wikispaces wiki in many ways
// @include        http://*.wikispaces.com/*
// @exclude        http://*.wikispaces.com/*/blank.html
// @exclude        http://*.wikispaces.com/user/*
// @exclude        http://*.wikispaces.com/wiki/*
// @exclude        http://www.wikispaces.com/*
// @run-at         document-end
// ==/UserScript==

// SETUP

// Specify the sites name for which you have administrator rights,
// between quotes and separated by a comma
// e.g. "abcdef" for http://abcdef.wikispaces.com/
var AUTOMATIC_BACKUP_SITE_NAMES = ["abcdef", "ghijkl"];

// Specify the number of days between each automatic backup (0 to desactivate function)
var AUTOMATIC_BACKUP_TIME_INTERVAL = 15;


// CONSTANTS

var H12_IMG = "R0lGODlhtgAHAIABAEJeiQAAACH5BAEAAAEALAAAAAC2AAcAAAIzhI+py+0Po5y02ouz3rz7D4bi"
    + "SFrBiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKn0FADs=";

var H34_IMG = "R0lGODlhnQAHAPcBAEJeiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAEALAAAAACdAAcA"
    + "AAhMAAEIHEiwoMGDCBMqXMiwocOHECNKnEixosWLGB0G2Mixo8ePIEOKHEmypMmTKFOqXMmypcuX"
    + "MGPKnEmzps2bOHPq3Mmzp8+fQD0GBAA7";

var H5_IMG = "R0lGODlhtgAGAIABAEJeif///yH5BAEAAAEALAAAAAC2AAYAAAIrhI+py+0Po5y02hey3rz7D4bi"
    + "SJbmiabqyrbuC8fyTNf2jef6zvf+Dwx6CgA7";

var H6_IMG = "R0lGODlhbwABAIAAAEJeiQAAACH5BAAAAAAALAAAAABvAAEAAAIJhI+py+0Po1QFADs=";

var CLOSE_BTN_IMG = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAd"
    + "Hx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3"
    + "Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAOAA4DASIA"
    + "AhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQME/8QAJBAAAQQCAQMFAQAAAAAAAAAAAQIDBBEF"
    + "IQAGIkETFCMxUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/a"
    + "AAwDAQACEQMRAD8AtJjdQZvO5FuFlXUvIdV6Ub3Kmy4kKIpH0mwNmyDW974h0c9k4edlxH8qqa0l"
    + "o/IHVOIKgU7SVC/JH4f7x13FzIU2WYclLRfV3LRpdXdBVWN/h3zViMO89kZEx91ouuJ7ilAFkkbo"
    + "ADxwP//Z";

// CSS DEFINITION

if (navigator.userAgent.match(/Chrome/)) {
    BROWSER = "webkit";
}
else {
    BROWSER = "moz";
}

var CSS_STYLE = 
	// HEADING 1
	"#content_view > h1, body#tinymce > h1"
	+ "{font-family: arial; font-size: 2em; color: #223D67; line-height: 2em; "
	+ "background: url(data:image/gif;base64," + H12_IMG + ") repeat-x scroll 0 100% transparent; "
	+ "counter-increment: ch1; counter-reset: ch2;}"
	+ "#content_view > h1:before, body#tinymce > h1:before {content: counter(ch1)'. ';}"
	// HEADING 2
	+ "#content_view > h2, body#tinymce > h2"
	+ "{font-family: arial; font-size: 1.833em; color: #223D67; line-height: 2.181em; "
	+ "background: url(data:image/gif;base64," + H12_IMG + ") repeat-x scroll 0 100% transparent; "
	+ "margin: 0 0 0 0.5cm; counter-increment: ch2; counter-reset: ch3;} "
	+ "#content_view > h2:before, body#tinymce > h2:before {content: counter(ch1)'.'counter(ch2)' ';}"
	// HEADING 3
	+ "#content_view > h3, body#tinymce > h3"
	+ "{font-family: arial; font-size: 1.5em; color: #223D67; line-height: 2.666em; "
	+ "background: url(data:image/gif;base64," + H34_IMG + ") repeat-x scroll 0 100% transparent; "
	+ "margin: 0 0 0 1cm; counter-increment: ch3; counter-reset: ch4;}"
	+ "#content_view > h3:before, body#tinymce > h3:before {content: counter(ch1)'.'counter(ch2)'.'counter(ch3)' ';}"
	// HEADING 4
	+ "#content_view > h4, body#tinymce > h4"
	+ "{font-family: arial; font-size: 1.333em; color: #223D67; line-height: 3em; "
	+ "background: url(data:image/gif;base64," + H34_IMG + ") repeat-x scroll 0 100% transparent; "
	+ "margin: 0 0 0 1.5cm; counter-increment: ch4; counter-reset: ch5;}"
	+ "#content_view > h4:before, body#tinymce > h4:before {content: counter(ch4, upper-roman)'. ';}"
	// HEADING 5
	+ "#content_view > h5, body#tinymce > h5"
	+ "{font-family: arial; font-size: 1.166em; color: #223D67; line-height: 2.5em; "
	+ "background: url(data:image/gif;base64," + H5_IMG + ") repeat-x scroll 0 100% transparent; "
	+ "margin: 0 0 0 2cm; counter-increment: ch5; counter-reset: ch6;}"
	+ "#content_view > h5:before, body#tinymce > h5:before {content: counter(ch5, upper-latin)'. ';}"
	// HEADING 6
	+ "#content_view > h6, body#tinymce > h6"
	+ "{font-family: arial; font-size: 1em; color: #223D67; line-height: 2em; "
	+ "background: url(data:image/gif;base64," + H6_IMG + ") repeat-x scroll 0 100% transparent; "
	+ "margin: 0 0 0 2.5cm; counter-increment: ch6;}"
	+ "#content_view > h6:before, body#tinymce > h6:before {content: counter(ch6)') ';}"
	// BULLET POINTS
	+ "ul li {margin-top: 0.5em;}"
	// EDIT BOX
	+ "#rightcolumn {max-width: 2000px;}"
	// TABLE OF CONTENT - View Mode
	+ "#content_view > #toc {height: " + (window.innerHeight - 15) + "px; overflow: auto; "
	+ "position: fixed; top: 0px; width: 250px; left: 211px;}"
	+ "#leftcolumn {position: fixed ! important; overflow: auto; height: " + (window.innerHeight - 15) + "px;}"
	+ ".contentBox {width: " + (window.innerWidth - 540) + "px;}" 
	// TABLE OF CONTENT - Edit Mode
	+ "#rightcolumn > #toc {height: " + (window.innerHeight - 165) + "px ! important; overflow: auto; "
	+ "position: fixed; top: 100px; width: 250px; left: 220px; z-index: 11;"
	+ "background: none repeat scroll 0 0 #F3F3F3; border: 1px solid #DCDCDC;"
	+ "border-radius: 6px 6px 6px 6px; margin: 0 0 10px 10px; padding: 6px;}"
	+ "#rightcolumn > #toc > h1 {font-size: 1em;}" 
	// TABLE OF CONTENT - Both Modes - Style and Numbering
	+ "#toc a:link, #toc a:visited {color: #000000; text-decoration: none} #toc a:hover {text-decoration: underline}"
	+ "#toc h1 {counter-reset: ch1;}"
	+ "#toc div {position: relative; left: -1em;}"
	+ "#toc div[style='margin-left: 1em;'] {counter-increment: ch1; counter-reset: ch2; color: blue}"
	+ "#toc div[style='margin-left: 1em;']:before {content: counter(ch1)'. '; color: blue;}"
	+ "#toc div[style='margin-left: 2em;'] {counter-increment: ch2; counter-reset: ch3; color: red}"
	+ "#toc div[style='margin-left: 2em;']:before {content: counter(ch1)'.'counter(ch2)' '; color: red;}"
	+ "#toc div[style='margin-left: 3em;'] {counter-increment: ch3; counter-reset: ch4;}"
	+ "#toc div[style='margin-left: 3em;']:before {content: counter(ch1)'.'counter(ch2)'.'counter(ch3)' '; color: green;}"
	+ "#toc div[style='margin-left: 4em;'] {counter-increment: ch4; counter-reset: ch5;}"
	+ "#toc div[style='margin-left: 4em;']:before {content: counter(ch4, upper-roman)'. ';}"
	+ "#toc div[style='margin-left: 5em;'] {counter-increment: ch5; counter-reset: ch6;}"
	+ "#toc div[style='margin-left: 5em;']:before {content: counter(ch5, upper-latin)'. ';}"
	+ "#toc div[style='margin-left: 6em;'] {counter-increment: ch6;}"
	+ "#toc div[style='margin-left: 6em;']:before {content: counter(ch6)') ';}"
	// NOTIFICATION ANIMATION
	+ "@-" + BROWSER + "-keyframes notifyAnim { from {color: #EEEEEE;} to {color: red;} }"
	+ ".WikiInternalHeaderNavMenu span#SaveNotif {-" + BROWSER + "-animation-name: notifyAnim; "
    + "-" + BROWSER + "-animation-duration: 1s; -" + BROWSER + "-animation-direction: alternate; "
    + "-" + BROWSER + "-moz-animation-iteration-count: infinite;}"; 

// FUNCTIONS

// Taken from http://wiki.greasespot.net/Content_Script_Injection
function InjectScript(source) {
    
    // Check for function input.
    if ('function' == typeof source) {
        // Execute this function with no arguments, by adding parentheses.
        // One set around the function, required for valid syntax, and a
        // second empty set calls the surrounded function.
        source = '(' + source + ')();'
            }
    
    // Create a script node holding this  source code.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    
    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.body.appendChild(script);
    document.body.removeChild(script);
    
}

function waitForEditor() {
	if (document.getElementById("wsMainEditor_ifr")) {
		document.removeEventListener("DOMNodeInserted", waitForEditor, false);
		document.getElementById("wsMainEditor_ifr").addEventListener("load", processIFrame, false);
	}
}

function insertTOC() {
    
	var d = document.getElementById("wsMainEditor_ifr").contentDocument;
    
	// Increase display margin for the text
	d.head.querySelector("style").innerHTML += "body#tinymce {padding-left: 275px}";
    
	// Move the TOC from the view mode
	var toc = document.getElementById("toc").parentNode.removeChild(document.getElementById("toc"));
	document.getElementById("rightcolumn").appendChild(toc);
    
	// Attach anchors to the headings in edit mode (copy them from the view mode)
	var orgHeadings = document.querySelectorAll("#content_view > h1, #content_view > h2, "
                                                + "#content_view > h3, #content_view > h4, #content_view > h5, #content_view > h6");
	var destHeadings = d.querySelectorAll("h1, h2, h3, h4, h5, h6");
	for (var i=0; i<orgHeadings.length; i++) {
		if (!(destHeadings[i].querySelector("a"))) { // if anchor does not already exist
			destHeadings[i].appendChild(orgHeadings[i].firstChild);
			if (destHeadings[i].querySelector("a").name.match(/[\s\-']/)) {
				destHeadings[i].querySelector("a").name =
					destHeadings[i].querySelector("a").name.replace(/[\s\-']/g, "");
			}
		}
	}
	
	// Restore TOC links normal behaviour when clicking on them
	document.getElementById("toc").addEventListener("click", function(e) {
		
		function findPosY(obj) {
			var curtop = 0;
			if(obj.offsetParent) while(1) {
          		curtop += obj.offsetTop;
          		if(!obj.offsetParent) break;
          		obj = obj.offsetParent;
        	}
    		else if(obj.y) curtop += obj.y;
    		return curtop;
		}
		
		var t = document.getElementById("wsMainEditor_ifr").contentDocument.querySelector
			("a[name='" + decodeURIComponent(e.target.href.split("#")[1]).replace(/[\s\-']/g, "")
             + "']");
		
		window.scrollTo(0, findPosY(t) + 10);
		
	}, true)
        
        // When saving the page, delete the added anchors
        document.getElementById("wsMainEditor_wssave_action").addEventListener
            ("click", function() { 
                // Remove anchors
                var destHeadings = d.querySelectorAll("h1, h2, h3, h4, h5, h6");
                for (var i=0; i<destHeadings.length; i++) {
                    if (destHeadings[i].querySelector("a")) { // if anchor does not already exist
                        destHeadings[i].removeChild(destHeadings[i].querySelector("a"));
                    }
                    if (destHeadings[i].querySelector("img.WikiAnchor")) { // if anchor does not already exist
                        destHeadings[i].removeChild(destHeadings[i].querySelector("img.WikiAnchor"));
                    }			
                }
            }, true);
    
	// Adds a close button to the TOC
	var a = document.createElement("a");
	a.innerHTML = "<img src='data:image/jpeg;base64," + CLOSE_BTN_IMG + "' "
		+ "style='cursor: pointer; float: right;'>";
	document.querySelector("#rightcolumn > #toc > h1").appendChild(a);
	a.addEventListener("click", function() {
		document.querySelector("#rightcolumn > #toc").style.display = "none";
		document.getElementById("wsMainEditor_ifr").contentDocument.body.style.paddingLeft = "0px";
	}, true);
    
}

function processIFrame() {
    
	// Remove Edit button
	document.querySelector(".WikiInternalHeaderNavMenu").removeChild
		(document.getElementById("btnEdit"));
    
	// Insert CSS
	var d = document.getElementById("wsMainEditor_ifr").contentDocument;
	var s = d.createElement('STYLE');
	s.type = 'text/css';
	s.innerHTML = CSS_STYLE;
	d.head.appendChild(s);
    
	// Increase the size of the edit box
	document.querySelector(".contentBox").style.paddingLeft = "0px";
	document.querySelector(".contentBox").style.width = "100%";
	document.getElementById("foot").style.display = "none";
    
	// Inform the user when saving is pending
	document.getElementById("wsMainEditor_wssave_action").addEventListener
		("click", function() { 
			// Hide toolbar
			document.getElementById("wsMainEditor_external").style.zIndex = "0";
			// Inform the user that saving is in progress
			var sp = document.createElement("span");
			sp.id = "SaveNotif";
			sp.className = "WikiInternalHeaderNavMenuArea";
			sp.textContent = "Saving...";
			document.querySelector(".WikiInternalHeaderNavMenu").insertBefore
				(sp, document.querySelector(".WikiInternalHeaderNavMenu").firstChild);
		}, true);
    
	
	// Insert table of content
	if (document.getElementById("toc")) {
		window.setTimeout(insertTOC, 1000);		
	}
	
	// Add custom style "Small Caps"
	InjectScript(function(){tinyMCE.activeEditor.formatter.register
		("small_caps", {inline : "span", styles : {fontVariant : "small-caps"}});});

	// Add some hotkeys
	d.addEventListener("keydown", function(e) {
		// Esc cancels dialog box
        if (e.which == 27) {
            // Text Styles dialog box
            if (document.getElementById("styleCancel")) {
                document.getElementById("styleCancel").click();
            }
            // Link dialog box
            if (document.getElementById("cancelLink")) {
                document.getElementById("cancelLink").click();
            }
            // File dialog box
            if (document.getElementById("imageCloseButton")) {
                document.getElementById("imageCloseButton").click();
            }
            // Widget dialog box
            if (document.getElementById("widgetCloseButton")) {
                document.getElementById("widgetCloseButton").click();
            }
            // Table dialog box
            if (document.getElementById("tableCloseButton")) {
                document.getElementById("tableCloseButton").click();
            }
        }
        // Only test hotkeys if Ctrl is pressed
		else if (e.ctrlKey || e.metaKey) {
			// Ctrl + Shift + Space - Insert link
            if ((e.which == 32) && e.shiftKey && e.ctrlKey) { 
				document.getElementById("wsMainEditor_wslink").click();
			}           
            // Ctrl + Alt + 1 to 6 - Headings 1 to 6
			else if (((e.which == 49) || (e.which == 97)) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.execCommand("FormatBlock", false, "h1");});
				e.preventDefault();
			}
			else if (((e.which == 50) || (e.which == 98)) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.execCommand("FormatBlock", false, "h2");});
				e.preventDefault();
			}
			else if (((e.which == 51) || (e.which == 99)) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.execCommand("FormatBlock", false, "h3");});
				e.preventDefault();
			}
			else if (((e.which == 52) || (e.which == 100)) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.execCommand("FormatBlock", false, "h4");});
				e.preventDefault();
			}
			else if (((e.which == 53) || (e.which == 101)) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.execCommand("FormatBlock", false, "h5");});
				e.preventDefault();
			}
			else if (((e.which == 54) || (e.which == 102)) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.execCommand("FormatBlock", false, "h6");});
				e.preventDefault();
			}
			// Ctrl + Alt + K - Small caps
			else if ((e.which == 75) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.activeEditor.formatter.apply("small_caps");});
			}
			// Ctrl + Alt + N - Normal style
			else if ((e.which == 78) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.execCommand("FormatBlock", false, "p");});
			}
			// Ctrl + Alt + R - Removes all formatting to the current block
			else if ((e.which == 82) && e.altKey && e.ctrlKey) { 
				InjectScript(function(){tinyMCE.execCommand("removeFormat");});
			}
			// Ctrl + Alt + U - Bullets
			else if ((e.which == 85) && e.altKey && e.ctrlKey) { 
				document.getElementById("wsMainEditor_insertunorderedlist").click();
			}
			// Ctrl + V or Cmd + V - Paste
			else if ((e.which == 86) && (e.ctrlKey || e.metaKey)) { 
                // Prevent scrolling
                var y = document.body.scrollTop;
                document.body.style.overflow = "hidden";
                window.setTimeout(function(){
                    window.scroll(0, y);
                    document.body.style.overflow = "";
                }, 100);
			}
            
		}
	}, false);
	
}

// == MAIN ==

// Insert CSS style in the document
GM_addStyle(CSS_STYLE);
if (document.getElementById("toc")) {
	document.querySelector(".contentBox").style.paddingLeft = "270px";
} 

// Show full list of pages if available
// Commented because due to a new bug, clicking on a item remains without effect
/* 
window.setTimeout(function() {
	if (document.querySelector("a.WikispacesNavbarSeeMore")) {
		document.querySelector("a.WikispacesNavbarSeeMore").click();
	}
}, 1000); */

// Create a button "Edit" in the toolbar (always visible)
if (document.querySelector(".WikiInternalHeaderNavMenu")) {
	var sp = document.createElement("span");
	sp.className = "WikiInternalHeaderNavMenuArea";
	sp.id = "btnEdit";
	sp.style.cursor = "pointer";
	sp.innerHTML = "<a>Edit</a>";
	document.querySelector(".WikiInternalHeaderNavMenu").insertBefore(sp, document.querySelector(".WikiInternalHeaderNavMenu").firstChild);
	sp.addEventListener("click", function(){
        document.querySelector(".editButton").click();
	}, true);
}

// Wait for switching to edit mode
document.addEventListener("DOMNodeInserted", waitForEditor, false);

// Automatic backup routine
var sitename = window.location.href.match(/[^\/]+(?=\.wikispaces\.com)/).toString();
if (AUTOMATIC_BACKUP_TIME_INTERVAL && (AUTOMATIC_BACKUP_SITE_NAMES.indexOf(sitename) >= 0)) { 
	if ((window.location.href.match(/export/)) && window.location.href.match(/autobackup/)) {
		document.querySelector("button[name=create]").click();
	}
	else {	
		var today = new Date();
		var lastBackupDate = new Date(GM_getValue("Backup_" + sitename, (new Date(0)).toString()));
		if ((today - lastBackupDate) >= (86400000 * AUTOMATIC_BACKUP_TIME_INTERVAL)) {
			GM_setValue("Backup_" + sitename, today.toString());
			GM_openInTab("http://" + sitename + ".wikispaces.com/export/list?autobackup", true);
		}
	}
}