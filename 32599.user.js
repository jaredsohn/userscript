// ==UserScript==
// @name           Resize Player Boxes
// @namespace      pbr
// @description    Resizes the player boxes on the home page.
// @include        http://goallineblitz.com/game/home.pl
// @version        08.12.26
// ==/UserScript==

var lead = 35;

window.setTimeout( 
	function() {
		resize();
	}, 
	2000
);

function getElementHeight(element) {
    var height = 0;
    if (element.childNodes.length > 0) {
        for each (var c in element.childNodes) {
            height += getElementHeight(c);
        }
   }
    else {
        if (element.offsetHeight != null) {
            height += element.offsetHeight;
        }
        else if (element.style != null) {
            height += element.style.pixelHeight;
        }
        else {
            height += 0;
        }
    }
    return height;    
}

function resize() {
	var boxes = document.getElementsByClassName("player_content");
    var height = -1;
	for each (var b in boxes) {
        //right side
        s = 0;
        for (var c=2; c<b.childNodes.length; c++) {
            var child = b.childNodes[c];
            if (child.offsetHeight == null) continue;
            s += child.offsetHeight;
        }
        if (s > height) {
            height = s;
        }
    }

    height += lead;

	var boxes = new Array();
	var b1 = document.getElementsByClassName("player_box");
	var b2 = document.getElementsByClassName("player_box_vet");
	for (var i=0; i<b1.length; i++) {
		boxes.push(b1[i]);
	}
	for (var i=0; i<b2.length; i++) {
		boxes.push(b2[i]);
	}
	
	for each (var b in boxes) {
		var newStyle = "height: "+height+"px;";
		var style = b.getAttribute("style");
		if (style != null) {
			newStyle += style;
		}
		b.setAttribute("style",newStyle);
	}
}
