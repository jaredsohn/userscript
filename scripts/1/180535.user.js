// ==UserScript==
// @name           vkmin
// @description    Vk interface vkmin.hider
// @version        1.3
// @match          https://vk.com/*
// ==/UserScript==
//
window.onkeydown = function(e){

	var stuff_ids = [
		"page_header",
		"side_bar",
		"im_nav_wrap",
		"im_user_holder",
		"im_peer_holders",
		"im_send_wrap",
		"im_resizer_wrap",
	];

	if(e.keyIdentifier == "Insert") {
		var id;
		var element;
		for(id in stuff_ids) {
			element = document.getElementById(stuff_ids[id]);
			if(element)
				vkmin.toggle(element);
			//else console.log("can't toggle: " + stuff_ids[id]);
		}
		//now fix annoying empty space waste on the left
		element = document.getElementById("page_body");
		element.style.float = element.style.float=="left" ? "right" : "left";

		return false;
	}
	else {
		return true;
	}
};
vkmin = {}

vkmin.getRealDisplay = function(elem) {
	if (elem.currentStyle) {
		return elem.currentStyle.display
	} else if (window.getComputedStyle) {
		var computedStyle = window.getComputedStyle(elem, null )

		return computedStyle.getPropertyValue('display')
	}
}

vkmin.hide = function(el) {
	if (!el.getAttribute('displayOld')) {
		el.setAttribute("displayOld", el.style.display)
	}

	el.style.display = "none"
}

vkmin.displayCache = {}

vkmin.isHidden = function(el) {
	var width = el.offsetWidth, height = el.offsetHeight,
		tr = el.nodeName.toLowerCase() === "tr"

	return width === 0 && height === 0 && !tr ?
		true : width > 0 && height > 0 && !tr ? false :	vkmin.getRealDisplay(el)
}

vkmin.toggle = function(el) {
	vkmin.isHidden(el) ? vkmin.show(el) : vkmin.hide(el)
}


vkmin.show = function(el) {

	if (vkmin.getRealDisplay(el) != 'none') return

	var old = el.getAttribute("displayOld");
	el.style.display = old || "";

	if ( vkmin.getRealDisplay(el) === "none" ) {
		var nodeName = el.nodeName, body = document.body, display

		if ( vkmin.displayCache[nodeName] ) {
			display = vkmin.displayCache[nodeName]
		} else {
			var testElem = document.createElement(nodeName)
			body.appendChild(testElem)
			display = vkmin.getRealDisplay(testElem)

			if (display === "none" ) {
				display = "block"
			}

			body.removeChild(testElem)
			vkmin.displayCache[nodeName] = display
		}

		el.setAttribute('displayOld', display)
		el.style.display = display
	}
}