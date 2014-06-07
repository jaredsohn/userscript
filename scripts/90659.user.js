// ==UserScript==
// @name           Disable Instant Previews
// @namespace      http://blog.varunkumar.me
// @description    GM Script to disable Google Instant Previews
// @include        http://www.google.*/search*
// @include        https://www.google.*/search*
// @include        http://www.google.*
// @include        https://www.google.*
// @exclude        http://www.google.*/accounts/*
// @exclude        https://www.google.*/accounts/*
// @exclude        http://www.google.*/adsense/*
// @exclude        https://www.google.*/adsense/*
// @exclude        http://www.google.*/analytics/*
// @exclude        https://www.google.*/analytics/*
// @exclude        http://www.google.*/alerts/*
// @exclude        https://www.google.*/alerts/*
// @exclude        http://www.google.*/base/*
// @exclude        https://www.google.*/base/*
// @exclude        http://www.google.*/bookmarks/*
// @exclude        https://www.google.*/bookmarks/*
// @exclude        http://www.google.*/books/*
// @exclude        https://www.google.*/books/*
// @exclude        http://www.google.*/buzz*
// @exclude        https://www.google.*/buzz*
// @exclude        http://www.google.*/calendar/*
// @exclude        https://www.google.*/calendar/*
// @exclude        http://www.google.*/contacts/*
// @exclude        https://www.google.*/contacts/*
// @exclude        http://www.google.*/chrome/*
// @exclude        https://www.google.*/chrome/*
// @exclude        http://www.google.*/dashboard/*
// @exclude        https://www.google.*/dashboard/*
// @exclude        http://www.google.*/dictionary/*
// @exclude        https://www.google.*/dictionary/*
// @exclude        http://www.google.*/friendconnect/*
// @exclude        https://www.google.*/friendconnect/*
// @exclude        http://www.google.*/health/*
// @exclude        https://www.google.*/health/*
// @exclude        http://www.google.*/history/*
// @exclude        https://www.google.*/history/*
// @exclude        http://www.google.*/latitude/*
// @exclude        https://www.google.*/latitude/*
// @exclude        http://www.google.*/local/*
// @exclude        https://www.google.*/local/*
// @exclude        http://www.google.*/mail/*
// @exclude        https://www.google.*/mail/*
// @exclude        http://www.google.*/maps/*
// @exclude        https://www.google.*/maps/*
// @exclude        http://www.google.*/music/*
// @exclude        https://www.google.*/music/*
// @exclude        http://www.google.*/news*
// @exclude        https://www.google.*/news*
// @exclude        http://www.google.*/notebook/*
// @exclude        https://www.google.*/notebook/*
// @exclude        http://www.google.*/phone/*
// @exclude        https://www.google.*/phone/*
// @exclude        http://www.google.*/photos/*
// @exclude        https://www.google.*/photos/*
// @exclude        http://www.google.*/picasa/*
// @exclude        https://www.google.*/picasa/*
// @exclude        http://www.google.*/places/*
// @exclude        https://www.google.*/places/*
// @exclude        http://www.google.*/profiles/*
// @exclude        https://www.google.*/profiles/*
// @exclude        http://www.google.*/reader/*
// @exclude        https://www.google.*/reader/*
// @exclude        http://www.google.*/sites/*
// @exclude        https://www.google.*/sites/*
// @exclude        http://www.google.*/squared*
// @exclude        https://www.google.*/squared*
// @exclude        http://www.google.*/subscribedlinks/*
// @exclude        https://www.google.*/subscribedlinks/*
// @exclude        http://www.google.*/talk/*
// @exclude        https://www.google.*/talk/*
// @exclude        http://www.google.*/tasks/*
// @exclude        https://www.google.*/tasks/*
// @exclude        http://www.google.*/translate/*
// @exclude        https://www.google.*/translate/*
// @exclude        http://www.google.*/transliterate/*
// @exclude        https://www.google.*/transliterare/*
// @exclude        http://www.google.*/voice/*
// @exclude        https://www.google.*/voice/*
// @exclude        http://www.google.*/video/*
// @exclude        https://www.google.*/video/*
// @exclude        http://www.google.*/webmasters/*
// @exclude        https://www.google.*/webmasters/*
// @version     1.2
// @author		Varunkumar Nagarajan. http://varunkumar.me
// ==/UserScript==

//================Chrome Compatibility====================
// This is needed for remembering the switch
if (typeof GM_deleteValue == 'undefined') {
	if(typeof unsafeWindow == 'undefined') { 
		unsafeWindow = window; 
	}
	
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}
//========================================================

GM_wait();

function GM_wait() {
	// Wait for the preview canvas to initialize
	var vspb = document.getElementById("vspb");
    var search = document.getElementById("search");
	if (vspb == null || search == null)
		window.setTimeout(GM_wait, 1000);
	else
		GM_init();
}

function GM_init() {
	
	// Adding a event listener for the inplace search results to work fine
	var search = document.getElementById("search");
	if (search != null) {
        // Adding button to enable / disable previews
        if (document.getElementById('btnPreviewSwitch') == null) {
            var button = document.createElement("a");
            button.innerHTML=GM_getValue("btnPreviewSwitch", "Enable Instant Previews");
            button.setAttribute("id", "btnPreviewSwitch");
            button.setAttribute("href", "javascript:void(0);");
            button.setAttribute("style", "position: absolute; top: 35px; right: 10px; z-index: 101");
            button.addEventListener("click", togglePreview, false);
            document.body.appendChild(button);
        }
    
		search.addEventListener("DOMSubtreeModified", togglePreview, false);
        search.addEventListener("DOMNodeInserted", togglePreview, false);
        search.addEventListener("DOMNodeRemovedFromDocument", function() { window.setTimeout(GM_wait, 5 * 1000);}, false);
        
	}
    
    var botstuff = document.getElementById("vspb");
	if (botstuff != null) {
		botstuff.addEventListener("DOMSubtreeModified", togglePreview, false);
	}
	
	// Disable it by default
	togglePreview(null);
}

function togglePreview(event) {
	var button = document.getElementById("btnPreviewSwitch");
	if (button == null)
		return;
	
	if (event != null && event.type == "click") {
		// Label needs to be changed only when user triggers it
		if (button.innerHTML == "Disable Instant Previews")
			button.innerHTML = "Enable Instant Previews";
		else
			button.innerHTML = "Disable Instant Previews";
		GM_setValue("btnPreviewSwitch", button.innerHTML);
	}
	
	if (button.innerHTML == "Enable Instant Previews") {
		// Removing the preview box
		var vspb = document.getElementById("vspb");
		if (vspb != null) {
			vspb.style.display = "none";
		}

		// Removing the preview icon
		var vspib = getElementByClass("vspib", document.body);
		for (var i = 0; vspib && i < vspib.length; i++) {
			if (vspib[i] != null) // too much defensive??
				vspib[i].style.display = "none";
		}
                
        /* var css = ".vspib, .vspi {display: none;} #vspb {display: none;}";
        GM_addStyle(css); */
	} else {
		// Showing the preview box
		var vspb = document.getElementById("vspb");
		if (vspb != null) {
			vspb.style.display = "block";
		}

		// Showing the preview icon
		var vspib = getElementByClass("vspib", document.body);
		for (var i = 0; vspib && i < vspib.length; i++) {
			if (vspib[i] != null) // too much defensive??
				vspib[i].style.display = "inline";
		}
        
        /* var css = ".vspib {display: inline} .vspi {display: none;} #vspb {display: block;}";
        GM_addStyle(css); */
	}
}

function getElementByClass(theClass, ref) {
	var allHTMLTags = ref.getElementsByTagName("*");

	var matches = [];
	for (var i = 0; i < allHTMLTags.length; i++) {
		if (allHTMLTags[i].className != null && allHTMLTags[i].className.indexOf(theClass) != -1)
			matches.push(allHTMLTags[i]);
	}
	return matches;
}