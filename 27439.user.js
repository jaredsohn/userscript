// ==UserScript==
// @name           Cars list carbon footprint
// @namespace      http://ics.uci.edu/
// @description    Display Carbon Footprint and Air Pollution Score from fueleconomy in result list page
// @include        http://www.cars.com/go/search/search_results.jsp*
// ==/UserScript==

function findPlaceToAdd() {
	//el = document.getElementById("resultsMessage");
	//if (el != null) return el;
	//return null;
	el = document.getElementById("lrnLower");
	if (el != null) return el;
	return null;
}
function addEnv(el, year, make, model, carbonMin, carbonMax, airMin, airMax, mpgCityMin, mpgCityMax, mpgHwyMin, mpgHwyMax) {
	//alert("add");
	if (el != null) {
		if (el.parentNode.innerHTML.indexOf("Get Environmental Information") == -1) {
		
			var div = document.createElement('div');
			div.setAttribute('class','sellerName');
			
			if ((mpgCityMin > 0) || (mpgHwyMin > 0)) {
				div.innerHTML += ' <span class="sellerLabel">Estimated MPG</span> <span class="distance">';
				if (mpgCityMin == mpgCityMax) {
					if (mpgCityMin == 0) {
						div.innerHTML += 'NA';
					} else {
						div.innerHTML += '(' + mpgCityMin + ' city, ';
					}
				} else {
					div.innerHTML += '(' + mpgCityMin + ' - ' + mpgCityMax + ' city, ';
				}
				if (mpgHwyMin == mpgHwyMax) {
					if (mpgHwyMin == 0) {
						div.innerHTML += 'NA';
					} else {
						div.innerHTML += mpgHwyMin +  ' hwy)';
					}
				} else {
					div.innerHTML += mpgHwyMin + ' - ' + mpgHwyMax + ' hwy)';
				}
				div.innerHTML += '</span>';
			}
	
			if (carbonMin > 0) {
				div.innerHTML += ' <span class="sellerLabel">Carbon Footprint</span> <span class="distance">';
				if (carbonMin == carbonMax) {
					div.innerHTML += '(' + carbonMin +  ' tons/yr of CO<sub>2</sub>)';
				} else {
					div.innerHTML += '(' + carbonMin + ' - ' + carbonMax + ' tons/yr of CO<sub>2</sub>)';
				}
				div.innerHTML += '</span>';
			}
	
			if (airMin > 0) {
				div.innerHTML += ' <span class="sellerLabel">Air Pollution Score</span> <span class="distance">';
				if (airMin == airMax) {
					div.innerHTML += '(' + airMin +  ')';
				} else {
					div.innerHTML += '(' + airMin + ' - ' + airMax + ')';
				}
				div.innerHTML += '</span>';
			}

			var imgdownload = document.createElement('img');
			imgdownload.setAttribute('class','alignMid');
			imgdownload.setAttribute('border','0');
			imgdownload.setAttribute('width','16');
			imgdownload.setAttribute('height','16');
			imgdownload.src = "http://www.greenscanner.net/images/leaf100-10.jpg";
	
			var carLink2 = "http://www.fueleconomy.gov/feg/compx2008f.jsp?year=" + year + "&make=" + make + "&model=" + model + "&hiddenField=Findacar&salesArea=ca";
	
			var a = document.createElement('a');
			a.setAttribute('href',carLink2);
			a.setAttribute('target','_blank');
			a.innerHTML = "Get Environmental Information";
	
			el.parentNode.insertBefore(div, el.parentNode.childNodes[10]);
			el.parentNode.insertBefore(imgdownload, el);
			el.parentNode.insertBefore(a, el);
			
		}
	}	
}		

var mycars = new Array();
function getCarLink(year, make, model) {
	
	var key = "year=" + year + "&make=" + make + "&model=" + model;
	for (i=0;i<mycars.length;i++) {
		if (mycars[i] == key) {
			// duplicate link
			return null;
		}
	}
	
	mycars[mycars.length] = key;
	
	return "http://www.fueleconomy.gov/feg/compx2008f.jsp?" + key + "&hiddenField=Findacar&salesArea=ca";
}
	
window.addEventListener('load', function() {
	llinks = findPlaceToAdd();
	
	var startNum = eval(llinks.childNodes[1].innerHTML.split("-")[0]);
	var endNum = eval(llinks.childNodes[1].innerHTML.split("-")[1]);
	
	var year = "";
	var car = "";
	var make = "";
	var model = "";
	var carLink = "";

	for( var x = 1; x <= (endNum-startNum+1); x++ ) {
		carEl = document.getElementById("nwList" + x);
		if (carEl != null) {
			year = carEl.previousSibling.childNodes[0].innerHTML;
			car = carEl.previousSibling.childNodes[2].innerHTML;
			make = car.split(" ")[0];
			model = car.split(" ")[1];

			//carLink = "http://www.fueleconomy.gov/feg/compx2008f.jsp?year=" + year + "&make=" + make + "&model=" + model + "&hiddenField=Findacar&salesArea=ca";
			carLink = getCarLink(year, make, model);
			//alert(carLink);
			
			if (carLink != null) {
				GM_xmlhttpRequest({
					method: "GET", 
					url: carLink, 
					onload: function( data ) {
						try {
							var carData = data.responseText;
							var carData2 = "";
							var a = 0;
							var b = 0;
							var b2 = 0;
							var epaCount = 0;
							
							var dataYMM = "";
							var dataYear = "";
							var dataMake = "";
							var dataModel = "";
		
							var carbonCurrent = 0;
							var carbonMin = 0;
							var carbonMax = 0;
						
							var airCurrent = 0;
							var airMin = 0;
							var airMax = 0;
							
							var mpgCityCurrent = 0;
							var mpgCityMin = 0;
							var mpgCityMax = 0;
							var mpgHwyCurrent = 0;
							var mpgHwyMin = 0;
							var mpgHwyMax = 0;
							
							//alert('get data');

							if (((b = carData.indexOf("<h4")) != -1) && ((b2 = carData.indexOf("</h4>")) != -1)) {
								//<h4 align="center">2002 Toyota Tundra</h4>
								dataYMM = carData.substring(b+19, b2);
								dataYear = dataYMM.split(" ")[0];
								dataMake = dataYMM.split(" ")[1];
								dataModel = dataYMM.split(" ")[2];
		
								//alert("data = " + dataYear + ":" + dataMake + ":" + dataModel);
								
								while (  ((a = carData.indexOf("images/carbonFootprint/footprint")) != -1)  && (epaCount < 10)){
									carData = carData.substring(a+1);
									
									// get carbon
									if (((b = carData.indexOf("<b>")) != -1) && ((b2 = carData.indexOf("</b>")) != -1)) {
										carbonCurrent = eval(carData.substring(b+3, b2));
										//alert(carbonCurrent);
										if (epaCount == 0) {
											carbonMin = carbonCurrent;
											carbonMax = carbonCurrent;
										} else {
											if (carbonCurrent < carbonMin) {
												carbonMin = carbonCurrent;
											}
											if (carbonCurrent > carbonMax) {
												carbonMax = carbonCurrent;
											}
										}
									}
			
									// get air score
									if ((b = carData.indexOf("score =")) != -1) {
										airCurrent = eval(carData.substring(b+7, b+10));
										if (epaCount == 0) {
											airMin = airCurrent;
											airMax = airCurrent;
										} else {
											if (airCurrent < airMin) {
												airMin = airCurrent;
											}
											if (airCurrent > airMax) {
												airMax = airCurrent;
											}
										}
									}

									//get mpg
									if (((b = carData.indexOf("mpgCompx")) != -1) && ((b2 = carData.indexOf("<br>")) != -1)) {
										mpgCityCurrent = eval(carData.substring(b+10, b2));
										if (epaCount == 0) {
											mpgCityMin = mpgCityCurrent;
											mpgCityMax = mpgCityCurrent;
										} else {
											if (mpgCityCurrent < mpgCityMin) {
												mpgCityMin = mpgCityCurrent;
											}
											if (mpgCityCurrent > mpgCityMax) {
												mpgCityMax = mpgCityCurrent;
											}
										}
										
										carData2 = carData.substring(b2+2);
										if (((b = carData2.indexOf("mpgCompx")) != -1) && ((b2 = carData2.indexOf("<br>")) != -1)) {
											mpgHwyCurrent = eval(carData2.substring(b+10, b2));
											if (epaCount == 0) {
												mpgHwyMin = mpgHwyCurrent;
												mpgHwyMax = mpgHwyCurrent;
											} else {
												if (mpgHwyCurrent < mpgHwyMin) {
													mpgHwyMin = mpgHwyCurrent;
												}
												if (mpgHwyCurrent > mpgHwyMax) {
													mpgHwyMax = mpgHwyCurrent;
												}
											}
										}
									}
									//alert('mpg = ' + mpgHwyMin + ':' + mpgHwyMax);
			
									epaCount += 1;
								}
								//alert('el');
		
								for( var y = 1; y <= (endNum-startNum+1); y++ ) {
									year2 = "";
									model2 = "";
									make2 = "";
									
									carEl2 = document.getElementById("nwList" + y);
									if (carEl != null) {
										year2 = carEl2.previousSibling.childNodes[0].innerHTML;
										car2 = carEl2.previousSibling.childNodes[2].innerHTML;
										make2 = car2.split(" ")[0];
										model2 = car2.split(" ")[1];
									}
									
									//alert (dataYear + ":" + year2);
									if ((dataYear == year2) && (dataMake == make2) && (dataModel == model2)) {
										//alert("match");
										el = document.getElementById("newListing" + y);
										addEnv(el, dataYear, dataMake, dataModel, carbonMin, carbonMax, airMin, airMax, mpgCityMin, mpgCityMax, mpgHwyMin, mpgHwyMax);
									}
								}
								//alert('after el');
							}
						}
						catch( e ) {
							//alert("error");
							GM_log( e );
						}
					}
				});
			}
		}
		
	}
}, true);
