// ==UserScript==
// @name           Amazon Product Env
// @namespace      http://ics.uci.edu/
// @description    Display environmental information from epeat.net
// @include        http://www.amazon.com/*
// ==/UserScript==

// Product information
var brandId = "0";
var model = "";
var envLink = "";

// Environment information
var epeatRate = "";
var epeatOptional = "";

// get product information from e-commerce web page
function getProdInfo() {
	product = document.title.split(': ')[1];
	if (product == null) {
		// cannot find product information
		return null;
	}
	model = product.split(' ')[1];
	
	// find manufacture
	var tmpTxt = document.body.innerHTML;
	var b = tmpTxt.indexOf("Other products by");
	if (b < 0) return null;
	tmpTxt = tmpTxt.substring(b+1);
	b = tmpTxt.indexOf(">");
	if (b < 0) return null;
	tmpTxt = tmpTxt.substring(b+1);
	b = tmpTxt.indexOf("<");
	if (b < 0) return null;
	tmpTxt = tmpTxt.substring(0, b);
	
	if (tmpTxt == "Apple") {
		brandId = "32";
	} else if (tmpTxt == "Dell") {
		brandId = "28";
	} else if (tmpTxt == "Fujitsu") {
		brandId = "54";

	// Fujitsu-Siemens use second value
	} else if (tmpTxt == "Fujitsu-Siemens") {
		brandId = "69";
		model = product.split(' ')[2];


	} else if (tmpTxt == "Hewlett-Packard") {
		brandId = "24";

	// Lenovo
	} else if (tmpTxt == "Lenovo") {
		brandId = "37";
		// Lenovo ThinkVision use second value
		if (model == "ThinkVision") {
			model = model + '+' + product.split(' ')[2];
		}

	// LG
	} else if (tmpTxt == "LG") {
		brandId = "56";
		// LG Flatron use second value
		if (model == "Flatron") {
			model = product.split(' ')[2];
		} else {
			// LG others model (remove BN, BF)
			if ((b = model.indexOf("BN")) != -1) {
				model = model.substring(0, b);
			}
			if ((b = model.indexOf("BF")) != -1) {
				model = model.substring(0, b);
			}
		}

	} else if (tmpTxt == "NEC") {
		brandId = "64";

	// Panasonic use first value
	} else if (tmpTxt == "Panasonic") {
		brandId = "40";
		model = product.split(' ')[0];
		
	} else if (tmpTxt == "Philips") {
		brandId = "51";

	// Samsung SyncMaster use second value
	} else if (tmpTxt == "Samsung") {
		brandId = "55";
		if (model == "SyncMaster") {
			model = product.split(' ')[2];
		}

	} else if (tmpTxt == "Sony") {
		brandId = "35";

	} else if (tmpTxt == "Toshiba") {
		brandId = "45";
	} else if (tmpTxt == "ViewSonic") {
		brandId = "53";
		
	}
}

// construct query from product information
function constructQuery() {
	if (brandId == "0") return null;
	
	envLink  = 'http://www.epeat.net/SearchResults.aspx?ProductType=0&model=' 
					+ model + '&modelsearchtype=2&manufacturer=' + brandId;
}

// extract environment information
function parseEnvInfo(data) {
	epeatData = data.responseText;

	epeatRate = "";
	if ((b = epeatData.indexOf("lblRating")) != -1) {
		epeatData = epeatData.substring(b+27);
		if ((b = epeatData.indexOf("<")) != -1) {
			epeatRate = epeatData.substring(0, b);
		}
	}
	
	epeatOptional = "";
	if ((b = epeatData.indexOf("lblPoints")) != -1) {
		epeatData = epeatData.substring(b+12);
		if ((b = epeatData.indexOf("<")) != -1) {
			epeatOptional = epeatData.substring(0, b);
		}
	}	
}

// fund place to add environment box
function findPlaceToAdd() {
	el = document.getElementById("priceBlock");
	if (el != null) return el;
	
	el = document.getElementById("primaryUsedAndNew");
	if (el != null) return el;
	
	el = document.getElementById("promoGrid");
	if (el != null) return el;
	
	return null;
}



// add environment 
function addEnvInfo() {
	eLinks = findPlaceToAdd();
	if (eLinks == null) return null;
					
	var imgrate = document.createElement('img');
	imgrate.setAttribute('class','alignMid');
	imgrate.setAttribute('border','0');
	imgrate.src = 'http://www.epeat.net/Images/EPEAT-' + epeatRate + '_type-Only.jpg';

	var a = document.createElement('a');
	a.setAttribute('href',envLink);
	a.setAttribute('target','_blank');
	a.appendChild(imgrate);

	var a2 = document.createElement('a');
	a2.setAttribute('href',envLink);
	a2.setAttribute('class', 'tiny');
	a2.setAttribute('target','_blank');
	a2.innerHTML += 'More environmental';

	var div = document.createElement('div');
	div.innerHTML += '<br>';
	div.innerHTML += '<span class="priceBlockLabel">Environmental criteria :</span>';
	if (epeatRate == "")
		div.innerHTML += "NA";
	else 
		div.appendChild(a);
	div.innerHTML += '<br>';
	div.innerHTML += '<span class="priceBlockLabel">Optional Point :</span> ';
	if (epeatRate == "")
		div.innerHTML += 'NA';
	else 
		div.innerHTML += epeatOptional;
	div.innerHTML += ' ';
	div.appendChild(a2);

	eLinks.appendChild(div);
}


window.addEventListener('load', function() {
	getProdInfo();
	constructQuery();
	GM_xmlhttpRequest({
		method: "GET", 
		url: envLink, 
		onload: function( data ) {
			try {
				parseEnvInfo(data);
				addEnvInfo();
			} catch( e ) {
				GM_log( e );
			}
		}
	});
}, true);
