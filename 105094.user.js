// ==UserScript==
// @name           SixtReservations
// @namespace      xanth
// @description    Hide cancelled reservations
// @include        https://www.sixt.de/php/customerservice
// @include        https://www.sixt.de/mysixt
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

window.displayCancelledResAndHist = function(visible)
{
	var reservations = getElementsByClass("img-state", document.body, "img");
	for (r = 0; r < reservations.length; ++r)
	{
		reservation = reservations[r];
		if(reservation.src.indexOf("inactive") >= 0)
		{
			reservation.parentNode.parentNode.style.display = visible ? 'table-row' : 'none';
		}
	}

	var button = document.getElementById("VFT");
	button.innerHTML = visible ? "Stornierte Reservierungen verstecken..." : "Stornierte Reservierungen anzeigen...";
}

try
{
        var visible = false; //hide on first click
        var buttonLink = document.createElement("div");
        buttonLink.className = "button_wrapper clearfix";
        buttonLink.id="SX-csov-options";
        buttonLink.innerHTML = "<p><a class=\"BtSubmitRed\"><span id=\"VFT\">Stornierte Reservierungen verstecken...</span></a></p>";
        buttonLink.addEventListener("click", function() {window.displayCancelledResAndHist(visible);visible=!visible;}, false);
        var el = document.getElementById('SX-csov-cardlist');
        if(el)
        	el.parentNode.insertBefore(buttonLink, el.previousSibling);
} catch (e) {
	alert("An error occurred: " + e);
}