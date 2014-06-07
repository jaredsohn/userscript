// ==UserScript==
// @name		Meta Checker
// @namespace	http://twitter.com/t32k
// @description	Display title element, meta elements(descripton, keywords), and count characters.
// @version		1.4.7
// @author		Koji Ishimoto
// @include		http://*
// @include 		https://*
// @exclude		http://*.google.tld/*
// @icon        		https://github.com/t32k/Meta-Checker/raw/master/icon.png
// ==/UserScript==
(function(){
	// Avoid execute on each iframes.
	if (window == window.parent) {
	  makeFrame(gotFrame);
	}
	function gotFrame(iframe, win, doc) {
		var style, ttl, ttl_str, desc, desc_str, key, key_str,
				noDef, noDef_str, noSet, noSet_str;
		
		addCSS(<><![CDATA[
			body {margin: 0; color:fff; font-size: 13px;}
			th,td {font-size:13px; vertical-align: top;}
			#display_panel #body {
				position: relative;
				height: 100%;
				border-top: 1px #ccc solid;
				background: rgba(30, 30, 30, 0.95);
			}
			#display_panel #body > div {
				border-top: 1px #333 solid;
			}
			#display_panel #body > span {
				position: absolute;
				top: 1px; right: 1px;
				z-index: 1;
				display: block;
				width: 70px;
				height: 73px;
				background: -moz-linear-gradient(80% 0 180deg, #333, transparent);
			}
			#display_panel table {
				margin: 0 12px;
			}
			#display_panel th {
				padding: 0 0.5em 0 0;
				color: #aaa;
				font-weight: normal;
				text-align: right;
				white-space: nowrap;
			}
			#display_panel td div {
				overflow: hidden;
				height: 1.4em;
			}
			#display_panel .count {
				text-align: right;
			}
			#display_panel .nodef {
				color: #c00;
			}
			#display_panel .noset {
				color: #ffd700;
			}
			#display_panel #toggle {
				z-index: 2;
				cursor: pointer;
				position: absolute;
				top: 5px; right: 5px;
				width: 1.5em;
				border-width: 1px;
				border-style: solid;
				padding:0;
				border-color: #ccc #999 #999 #ccc;
				-moz-border-radius:3px;
				border-radius:3px;
				background: -moz-linear-gradient(0% 0% 270deg,#fff, #ccc);
			}
			input[type="button"]::-moz-focus-inner {
			    border: 1px dotted transparent;
			}
		]]></>);
		
		// Check meta information.
		noDef = "<span class='nodef'>Not defined :-...</span>";
		noDef_str = "<span class='nodef'>0</span>";
		noSet = "<span class='noset'>Not set :-(</span>";
		noSet_str = "<span class='noset'>0</span>";
		if (!$qS("title")) {
		  ttl = noDef;
		  ttl_str = noDef_str;
		} else if ($qS("title").firstChild) {
		  ttl = $qS("title").firstChild.nodeValue;
		  ttl_str = ttl.replace(/ /g, "").length;
		} else {
		  ttl = noSet;
		  ttl_str = noSet_str;
		}
		if (!$qS("meta[name$='escription']")) {
		  desc = noDef;
		  desc_str = noDef_str;
		} else if ($qS("meta[name$='escription']").getAttribute("content")) {
		  desc = $qS("meta[name$='escription']").getAttribute("content");
		  desc_str = desc.replace(/ /g, "").length;
		} else {
		  desc = noSet;
		  desc_str = noSet_str;
		}
		if (!$qS("meta[name$='eywords']")) {
		  key = noDef;
		  key_str = noDef_str;
		} else if ($qS("meta[name$='eywords']").getAttribute("content")) {
		  key = $qS("meta[name$='eywords']").getAttribute("content");
		  key_str = key.split(",").length;
		} else {
		  key = noSet;
		  key_str = noSet_str;
		}
		
		// Make panel template.
		doc.body.innerHTML =
		"<div id='display_panel'><input type='button' id='toggle' value='+'><div id='body'><span></span><div>" +
		"<table><tr><th>Title.</th><td class='count'>" + ttl_str + "</td><td><div>" + ttl +
		"</div></td></tr><tr><th>Desc.</th><td class='count'>" + desc_str + "</td><td><div>" + desc +
		"</div></td></tr><tr><th>Key.</th><td class='count'>" + key_str + "</td><td><div>" + key +
		"</div></td></tr></table></div></div></div>";
		
		// Check show/hide settings.
		if (GM_getValue('metaCheckerSetting')) {
		  hideDisplayPanel();
		} else {
		  showDisplayPanel();
		}
		
		doc.getElementById('toggle').addEventListener('click', toggleDisplayPanel, false);
		function toggleDisplayPanel() {
		  hideDisplayPanel();
		  if (GM_getValue('metaCheckerSetting')) {
		    GM_deleteValue('metaCheckerSetting');
		    showDisplayPanel();
		  } else {
		    GM_setValue('metaCheckerSetting', 'flag');
		  }
		}
		function showDisplayPanel() {
		  iframe.style.width = '30px';
		  iframe.style.height = '30px';
		  doc.getElementById('body').style.display = 'none';
		  doc.getElementById('toggle').value = "+";
		}
		function hideDisplayPanel() {
		  iframe.style.width = '100%';
		  iframe.style.height = '75px';
		  doc.getElementById('body').style.display = 'block';
		  doc.getElementById('toggle').value = "-";
		}
		// The function were written by Amachang.
		function addCSS(css) {
		  if (!style) {
		    var head = doc.querySelector('head');
		    if (!head) {
		      return;
		    }
		    style = doc.createElement('style');
		    style.type = 'text/css';
		    head.appendChild(style);
		  }
		  style.appendChild(doc.createTextNode(css));
		}
	}
	
	// Shortcut .querySelector()
	function $qS(tag) {return document.querySelector(tag);}
	
	// Creates a new iframe and attaches it to the DOM, waits for it to load, tests
	// that we did not hit https://bugzilla.mozilla.org/show_bug.cgi?id=295813 nor
	// https://bugzilla.mozilla.org/show_bug.cgi?id=388714 (and retries otherwise),
	// to finally call the provided done callback, passing the iframe, its window
	// and document. (The optional name parameter, if provided, will be used to name
	// the iframe in window.frames, or be created as "pane-1" onwards, otherwise.)
	/*
	    var cacllback = function(iframe, win, doc){

	    }
	    makeFrame(cacllback);
	    makeFrame(cacllback , "frameName");
	    makeFrame(cacllback , "frameName" , true);// debug mode
	*/
	function makeFrame(callback /*(iframeTag, window, document)*/ , name, debug) {
	  function testInvasion() {
	    iframe.removeEventListener("load", done, true);
	    var message = ((new Date) - load.start) + "ms passed, ";
	    try { // probe for security violation error, in case mozilla struck a bug
	      var url = unsafeWindow.frames[framename].location.href;
	      message += url == "about:blank" ? "but we got the right document." : "and we incorrectly loaded " + url;
	      if (debug) console.log(message);
	      done();
	    } catch (e) {
	      if (console && console.error && console.trace) {
	        console.error(e);
	        console.trace();
	      }
	      if (debug) console.log(message + "and our iframe was invaded. Trying again!");
	      document.body.removeChild(iframe);
	      makeFrame(callback, name);
	    }
	  }

	  function done() {
	    clearTimeout(load.timeout);
	    if (debug) console.log("IFrame %x load event after %d ms", framename, (new Date) - load.start);
	    var win = unsafeWindow.frames[framename];
	    var doc = iframe.contentWindow.document;
	    var esframeName = "'" + framename + "'";
	    callback(iframe, win, doc);
	  }
	  var iframe = document.createElement("iframe");
	  var framename = iframe.name = typeof name != "undefined" ? name : ("pane" + (makeFrame.id = (makeFrame.id || 0) - 1));
	  iframe.setAttribute("style", "overflow:hidden; z-index:2000; position:fixed; top:auto; right:0; bottom:0; left:auto; width:100%; height:75px; margin:0; padding:0; border:0; background:transparent;");
	  iframe.src = "about:blank";
	  iframe.addEventListener("load", done, true);
	  var frames = makeFrame.data || {};
	  var load = frames[framename] || {
	    start: new Date,
	    sleepFor: 400
	  };
	  load.timeout = setTimeout(testInvasion, load.sleepFor);
	  load.sleepFor *= 1.5;
	  frames[framename] = load;
	  makeFrame.data = frames;
	  document.body.appendChild(iframe);
	}
})();