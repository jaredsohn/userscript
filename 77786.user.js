// ==UserScript==
// @name           Taobao Automatic Page Changer
// @namespace      ArShui
// @include        http://*.taobao.com/*
// ==/UserScript==

var bodyContainer = null;
var prev_link = null;
var next_link = null;
var anchors = null;

if (document.getElementById && document.getElementsByTagName) {
	var objs = document.getElementsByTagName("div");
	for each (var obj in objs) {
		//if (obj.hasAttribute && obj.hasAttribute("className")) {
			if (obj.className == "pagination") {
				bodyContainer = obj;
			}
		//}
		
	}
	
	if (bodyContainer) {
		if (bodyContainer.getElementsByTagName) {
			anchors = bodyContainer.getElementsByTagName("a");
			if (anchors && anchors.length > 0) {
				for each (var anchor in anchors) {
					
					//if (anchor.hasAttribute && anchor.hasAttribute("className")) {
						
						if (anchor.className == "page-prev") {
							prev_link = anchor;
						} else if (anchor.className == "page-next"){
							next_link = anchor;
						}
						
					//}
					
				}
				
				status_text = "Executed Successfully - ";
				if (prev_link != null || next_link != null) {
					status_text += " Page Found";
				} else {
					status_text += " Page Not Found";
				}
				
				status_text = +" (Taobao Automatic Page Changer)";
			}
		}
		
		if ((prev_link != null || next_link != null) && window.addEventListener) {
			window.addEventListener('keyup', function (event) {
				if (!event) {
					event = window.event;
				}
				
				var source = event.srcElement || event.target;
				
				if (source.nodeName.search(/input|select/gi) == -1) {
					if (event.keyCode == 37 && prev_link != null) {
						document.location = prev_link.href;
					} else if (event.keyCode == 39 && next_link != null) {
						document.location = next_link.href;
					}
				}
			}, true);
		}

	} 
}
