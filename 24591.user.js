// ==UserScript==
// @name           XRV 750 details for Sprocket Optimiser 2
// @namespace      bodar.com
// @include        http://www.sprocketspecialists.com/SprocketOptimizer2.aspx
// ==/UserScript==

function create(html) {
    var temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.firstChild;
}

function insertAfter(referenceElement, newElement) {
    var nextSibling = referenceElement.nextSibling;
    var parent = referenceElement.parentNode;
    parent.insertBefore(newElement, nextSibling);
}


var button = create("<input type='button' value='Set XRV 750'/>");
var target = document.getElementById("btnUpdateShipping");
insertAfter(target, button);


button.addEventListener("click", function () {
	document.getElementById("FrontTeethDropDown").value = 16;
	document.getElementById("RearTeethDropDown").value = 45;
	document.getElementById("ChainPitchDropDown").value = 525;
	document.getElementById("lblCSToAxleDistance").value = 29;
	document.getElementById("txtMinRPM").value = 2000;
	document.getElementById("txtMaxRPM").value = 8100;
	document.getElementById("txtPowerRPM").value = 7000;
	document.getElementById("txtWheelRimSize").value = 17;
	document.getElementById("txtTireWidth").value = 6;
	document.getElementById("txtPrimaryDriveRatio").value = 1.763;
	document.getElementById("txtFirstGearRatio").value = 3.083;
	document.getElementById("txtSecondGearRatio").value = 2.062;
	document.getElementById("txtThirdGearRatio").value = 1.550;
	document.getElementById("txtFourthGearRatio").value = 1.272;
	document.getElementById("txtFifthGearRatio").value = 1.083;
}, false);
