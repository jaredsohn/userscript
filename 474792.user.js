// ==UserScript==
// @name Shoe Size Change
// @namespace   http://www.falsopop.com
// @description Changes the shoe sizes from US to cm
// @version 1
// @include http://www.wikifeet.com/*
// ==/UserScript== 

var sizes = [20.8,21.3,21.6,22.2,22.5,23,23.5,23.8,24.1,24.6,25.1,25.4,25.9,26.2,26.7,27.1,27.6,28.1,28.6];

function changeUSSizeToCm()
{
	var shoeSize = parseFloat(document.getElementById("ssize_label").innerHTML);
	if(!isNaN(shoeSize))
	{
		var toArr = (shoeSize*2) - 8;
		var inCm = sizes[toArr];
		document.getElementById("ssize_label").innerHTML = inCm + ' cm <a href="javascript:EditSSize(0,22)" style="font-size:8pt; color:#FFA">edit</a>'
	}
}

changeUSSizeToCm();