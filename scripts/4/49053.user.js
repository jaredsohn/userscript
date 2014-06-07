// ==UserScript==
// @name           DW Xpost Reorganiser
// @namespace      http://axisofevil.net/~xtina/
// @description    Reorganises the crosspost section a bit.
// @include        http://www.dreamwidth.org/update.bml*
// ==/UserScript==

var xpost = document.getElementById("xpostdiv");

var item1 = xpost.childNodes[1].childNodes[1]; // The tickybox.
var item2 = xpost.childNodes[1].childNodes[0]; // The label.
var item3 = xpost.childNodes[1].childNodes[2]; // The MA thing.

item2.setAttribute("class", "options"); // It was 'left options', which disrupted the placement.

var newLine = document.createElement("p");

newLine.appendChild(item1);
newLine.appendChild(item2);
newLine.innerHTML += " (" + item3.parentNode.innerHTML + ")";

xpost.replaceChild(newLine, xpost.childNodes[1]);

/* *** */

// Get the accounts table, if any.  I haven't yet tested this for multiple accounts.
var xtable = xpost.childNodes[3];
var xrows = xtable.childNodes[0];

if (xrows) {
	xrows = xrows.childNodes;
	for (var x = 0; x < xrows.length; x += 2) {
		var tmp = xrows[x].childNodes;
		newLine = document.createElement("tr");
		if (!tmp[2].childNodes[0].checked) {

			tmp[2].childNodes[0].setAttribute("disabled", "disabled"); // It still isn't disabled by default.

		}

		tmp[2].innerHTML = "&nbsp;" + tmp[2].innerHTML; // A bit of indentation.
		newLine.appendChild(tmp[2]);
		newLine.appendChild(tmp[0]);
		xrows[x].parentNode.replaceChild(newLine, xrows[x]);
	}
} else {
	var tmp = document.getElementById("prop_xpost_check");
	tmp.setAttribute("disabled", "disabled"); // Why have it even be an option?
}
