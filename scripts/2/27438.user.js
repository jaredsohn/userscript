// ==UserScript==
// @name           Cars Carbon Footprint
// @namespace      http://ics.uci.edu/
// @description    Display Carbon Footprint and Air Pollution Score from fueleconomy
// @include        http://www.cars.com/go/search/detail.jsp;*
// ==/UserScript==

// Product information
var year = "";
var car = "";
var make = "";
var model = "";
var envLink = "http://www.fueleconomy.gov";

// Environment information
var carbonMin = 0;
var carbonMax = 0;
var airMin = 0;
var airMax = 0;
var mpgCityMin = 0;
var mpgCityMax = 0;
var mpgHwyMin = 0;
var mpgHwyMax = 0;

// get product information from e-commerce web page
function getProdInfo() {
	car = document.title;
	
	if (car == null) {
		// cannot find environmental info, add NA
		addEnvInfo();
		return null;
	}

	car = car.split(":")[1];
	year = car.split(" ")[1];
	make = car.split(" ")[2];
	model = car.split(" ")[3];
}

// construct query from product information
function constructQuery() {
	envLink = "http://www.fueleconomy.gov/feg/compx2008f.jsp?year=" 
					+ year + "&make=" + make + "&model=" + model 
					+ "&hiddenField=Findacar&salesArea=ca";
}

// extract environment information
function parseEnvInfo(data) {
	var carData = data.responseText;
	var carData2 = "";
	var a = 0;
	var b = 0;
	var b2 = 0;
	var epaCount = 0;
	var carbonCurrent = 0;
	var airCurrent = 0;
	var mpgCityCurrent = 0;
	var mpgHwyCurrent = 0;

	while (  ((a = carData.indexOf("images/carbonFootprint/footprint")) != -1)  && (epaCount < 10)){
		carData = carData.substring(a+1);
			
		// get carbon
		if (((b = carData.indexOf("<b>")) != -1) && ((b2 = carData.indexOf("</b>")) != -1)) {
			carbonCurrent = eval(carData.substring(b+3, b2));
			if ((carbonMin == 0) || (carbonCurrent < carbonMin)) {
				carbonMin = carbonCurrent;
			}
			if (carbonCurrent > carbonMax) {
				carbonMax = carbonCurrent;
			}
		}
		
		//get air score
		if ((b = carData.indexOf("score =")) != -1) {
			airCurrent = eval(carData.substring(b+7, b+10));
			if ((airMin == 0) || (airCurrent < airMin)) {
				airMin = airCurrent;
			}
			if (airCurrent > airMax) {
				airMax = airCurrent;
			}
		}
		
		//get mpg
		if (((b = carData.indexOf("mpgCompx")) != -1) && ((b2 = carData.indexOf("<br>")) != -1)) {
			mpgCityCurrent = eval(carData.substring(b+10, b2));
			if ((mpgCityMin == 0) || (mpgCityCurrent < mpgCityMin)) {
				mpgCityMin = mpgCityCurrent;
			}
			if (mpgCityCurrent > mpgCityMax) {
				mpgCityMax = mpgCityCurrent;
			}
			
			carData2 = carData.substring(b2+2);
			if (((b = carData2.indexOf("mpgCompx")) != -1) && ((b2 = carData2.indexOf("<br>")) != -1)) {
				mpgHwyCurrent = eval(carData2.substring(b+10, b2));
				if ((mpgHwyMin == 0) || (mpgHwyCurrent < mpgHwyMin)) {
					mpgHwyMin = mpgHwyCurrent;
				}
				if (mpgHwyCurrent > mpgHwyMax) {
					mpgHwyMax = mpgHwyCurrent;
				}
			}
		}
		
		epaCount++;
	}	
}

// fund place to add environment box
function findPlaceToAdd() {
	el = document.getElementById("vehicleListBox");
	if (el != null) return el;
	
	el = document.getElementById("aboutThisVehicleBox");
	if (el != null) return el;

	return null;
}

// add environment 
function addEnvInfo() {
	eLinks = findPlaceToAdd();
	if (eLinks == null) {
		return null;
	}
	
	var divMpg = document.createElement('div');
	divMpg.setAttribute('class','dataPoint');
	divMpg.innerHTML += '<span class="label">*Estimated MPG: </span>';
	divMpg.innerHTML += '<span class="data">';
	if (mpgCityMin == 0) {
		divMpg.innerHTML += 'NA';
	} else if (mpgCityMin == mpgCityMax) {
		divMpg.innerHTML += mpgCityMin;
	} else {
		divMpg.innerHTML += mpgCityMin + ' - ' + mpgCityMax;
	}
	divMpg.innerHTML += ' city, ';
	if (mpgHwyMin == 0) {
		divMpg.innerHTML += 'NA';
	} else if (mpgHwyMin == mpgHwyMax) {
		divMpg.innerHTML += mpgHwyMin;
	} else {
		divMpg.innerHTML += mpgHwyMin + ' - ' + mpgHwyMax;
	}
	divMpg.innerHTML += ' hwy</span>';
	eLinks.appendChild(divMpg);

	var divCo2 = document.createElement('div');
	divCo2.setAttribute('class','dataPoint');
	divCo2.innerHTML += '<span class="label">*Carbon Footprint: </span>';
	if (carbonMin == 0) {
		divCo2.innerHTML += '<span class="data">NA</span>';
	} else if (carbonMin == carbonMax) {
		divCo2.innerHTML += '<span class="data">' + carbonMin +  ' tons/yr of CO<sub>2</sub></span>';
	} else {
		divCo2.innerHTML += '<span class="data">' + carbonMin + ' - ' + carbonMax + ' tons/yr of CO<sub>2</sub></span>';
	}
	eLinks.appendChild(divCo2);
	
	var divAir = document.createElement('div');
	divAir.setAttribute('class','dataPoint');
	divAir.innerHTML += '<span class="label">*Air Pollution Score: </span>';
	if (airMax == 0) {
		divAir.innerHTML += '<span class="data">NA</span>';
	} else if (airMax < 10) {
		divAir.innerHTML += '<a href="' + envLink + '" target="_blank"><img src="http://www.fueleconomy.gov/feg/emissions/sm0' + airMax + 'b.gif" alt="' + airMax + '"></a>';
	} else {
		divAir.innerHTML += '<a href="' + envLink + '" target="_blank"><img src="http://www.fueleconomy.gov/feg/emissions/sm10b.gif" alt="10"></a>';
	}
	eLinks.appendChild(divAir);

	var imginfo = document.createElement('img');
	imginfo.setAttribute('class','alignMid');
	imginfo.setAttribute('border','0');
	imginfo.setAttribute('width','16');
	imginfo.setAttribute('height','16');
	imginfo.src = "http://www.greenscanner.net/images/leaf100-10.jpg";
	
	var a = document.createElement('a');
	a.setAttribute('class','divLink');
	a.setAttribute('href',envLink);
	a.setAttribute('target','_blank');
	a.innerHTML = '<span class="fauxLink">Get&nbsp;Environmental&nbsp;Information</span>';

	var divInfo = document.createElement('div');
	divInfo.appendChild(imginfo);
	divInfo.appendChild(a);
	divInfo.innerHTML += '<br>* - This information is specific to this model, not the actual vehicle for sale.';
	eLinks.appendChild(divInfo);	
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
