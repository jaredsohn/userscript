// ==UserScript==
// @name           amazon.cn Automatic page changer
// @namespace      ArShui
// @include        http://www.amazon.cn/*
// ==/UserScript==

var bodyContainer = null;
var prev_link = null;
var next_link = null;
var anchors = null;



if (document.getElementById && document.getElementsByTagName) {
	bodyContainer = document.getElementById("pagn");
	
	
	if (bodyContainer) {
		if (bodyContainer.getElementsByTagName) {
			anchors = bodyContainer.getElementsByTagName("a");
			if (anchors && anchors.length > 0) {
				for each (var anchor in anchors) {
					
					if (anchor.hasAttribute && anchor.hasAttribute("id")) {
						
						if (anchor.id == "pagnPrevLink") {
							prev_link = anchor;
						} else if (anchor.id == "pagnNextLink"){
							next_link = anchor;
						}
						
					}
					
				}
				
				status_text = "Executed Successfully - ";
				if (prev_link != null || next_link != null) {
					status_text += " Page Found";
				} else {
					status_text += " Page Not Found";
				}
				
				status_text = +" (amazon.cn Automatic page changer)";
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
