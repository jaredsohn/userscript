// ==UserScript==
// @name	MozaKin Image Download Helper
// @namespace	Couplan
// @include	http://img*.mozakin.com/imx_imglink.php
// @grant	none
// @version	2
// ==/UserScript==

// Firefox about:config
// SET dom.event.contextmenu.enabled TO false

// prototype number format
Number.prototype.fillZero = function(n)(new Array(n).join('0')+this).substr(-n);

// make associative array from query string
function getParameter(str){
	var dec = decodeURIComponent;
	var par = new Array, itm;
	if(typeof(str) == "undefined") return par;
	if(str.indexOf("?", 0) > -1) str = str.split("?")[1];
	str = str.split("&");
	for(var i = 0; str.length > i; i++){
		itm = str[i].split("=");
		if(itm[0] != ""){
			par[itm[0]] = typeof(itm[1]) == "undefined" ? true : dec(itm[1]);
		}
	}
	return par;
}

// get query from imx_imagelink.php
var query = getParameter(document.referrer);

// wait for startup() done in img.js
setTimeout(function(){
	// erase table
	var table = document.body.querySelector("body > table");
	if(table)	table.style.display = "none";

	// make new image to download
	var img_url = "./img.php?pic=" + pic;
	var img = document.createElement("img");

	// waiting for image loaded
	img.onload = function(){
		// make image's name "[thread number]_[res number]"
		var name = document.createElement("input");
		name.type = "text";
		name.value = query['tno'] + "_" + Number(query['res']).fillZero(3);
		name.style.cssText = "position:absolute;left:4px;top:4px;font-size:22px;padding:4px;background-color:black;color:white;border:none;padding:0";
		document.body.appendChild(name);
		// focus and select for easy copy
		name.focus();
		name.select();
	};
	img.setAttribute("src",img_url);
	img.style.cssText = "position:absolute;left:4px;top:40px";

	document.body.appendChild(img);
},1000);
