// Green Local
// version 0.1 BETA!
// Created:			Dec-01-2008
// Last Modified:	Dec-03-2008
// Copyright:		(c) 2008, UCI.edu
// Author:			Norik
// Questions/Ideas:	ndavtian@uci.edu
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			Green Local
// @namespace		http://ics.uci.edu/
// @description		Provide number of local green businesses in a particular zipcode.
// @include http://www.zillow.com/homedetails/*
// ==/UserScript==

// example query call http://www.sustainlane.com/search.do?locationString=91205&category=4&proximity=5


// Global Variables
var	i_leaf = "data:image/gif,GIF89a%10%00%10%00%D5*%00%95%E1%A1*%CCE)%D6H%60%D1q%E5%F8%E8S%CDfE%CBZ%CB%F0%D0*%C4B%F3%FB%F4E%D0%5B)%D4H6%E5X)%DAJm%D7~7%C8N)%DEKD%E7c%7B%D9%89*%CAD_%E6x%CA%F8%D3R%DAj%88%DD%95*%CEF%D8%FA%DE%94%F1%A6z%EE%90_%E2w%F2%FD%F5%BD%EE%C5F%CAZ)%DCJ_%DAt7%D4Sl%E1%81E%D8%5E%D8%F4%DCR%CFfl%E4%82)%E3M%2B%C2B%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%10%00%10%00%00%06y%40%95%F0%00%18%A4%8E%A9%0F%20!T%15%91P%A4%A8%22L%14%A2%D0%06%0A%95%A9%5E%8F%0F%85%22%15%D8%A2%18%1Da)%8A%B0%18%04fM%13%80%25%99%E0%A8H%93%80Mq%0C%20%5BM*%12X%10'%13%82%7B%86%0C%0Ep%83%84P%08%5B%14%01z%83%7CH%18f%0E%1B%90NH%0B%5B%0B%23%1E%9F*_Z(%02!%A7B%17)%08%01%01%06%0F%AEM%07%07%04*%03%B7%9F%BDA%00%3B";
var i_food = "data:image/gif,GIF89a%10%00%10%00%B3%0E%00%CA%EA%F8z%CB%ED%AF%E0%F4%BD%E5%F6%F2%FA%FD6%B0%E4l%C5%EB%87%D0%EF%D8%F0%FAD%B6%E6Q%BB%E7_%C0%E9%94%D5%F1)%AB%E2%FF%FF%FF%00%00%00!%F9%04%01%00%00%0E%00%2C%00%00%00%00%10%00%10%00%00%04WP%ACF%2B-u%05e%95o%89%C3Y%95%B2(F%C38%0C%99%25%CD4%B0n%3C%00C%0B%D0nA8%8E%C9%AEUS8%0E%94a%8D%12L%F2j%CD%C6%8C%08%9D%80%04T%97%23P%C1.%1BOB%D6%CA%24%16%9E1%0B%CF8%B6%20F%0D%02%97%92%98%D3-0%BA%20%02%00%3B";
var i_healthy = "data:image/gif,GIF89a%10%00%10%00%D5%2B%00%E0%ED%E7B%8F%20x%AF%60%93%BF%80%CA%DF%C0%F2%F7%F0%0E%7B%3B%D7%E7%D0%80%B4%9B%B0%D0%C1%60%A1%825%87%10%E5%EF%E0'%9CD%13s%1B%BC%D7%B0%A1%C7%90%C0%DA%CE%90%BD%A85%B0Hk%C8w8%89-%5D%9F%40%AF%CF%A0%40%8Eik%A7P%E2%EE%E3P%97vW%9BkZ%9DhP%970%D0%E3%DAG%97kE%BAU%F0%F6%F3S%B4hN%96TJ%93%5B%22%89I%C7%DE%C3%F3%FB%F4%00h7'%7F%00%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%2B%00%2C%00%00%00%00%10%00%10%00%00%06%83%C0DbE%2C%1A%89%12%04%26%050%12%0EF%40%0AD1(%00%11D%C9%E1%E0%20%12%1F%85%81bj%A4%3A%95%93j%ADZUH%A9%86a3Ii%02%03%F6b%10(%A4%26%18%00!)%11%0F%0B%19k%16*P)%23(%2B%00%0ADlk%02H%22G%2B%94*%96%99E%1E%94%10%9EE%17%94%05%A3D%0Cl%16%A8D%04*%01k%AD%2B%AF%02%0Bm%AD%A5%0F%02*%A7%A8y%07y%04%AD%10%01%2B%AA%0CGA%00%3B";
var i_clothing = "data:image/gif,GIF89a%10%00%10%00%D5%3F%00FFFXXY%84%84%85%11%11%12%22!%23%2B*%2CNNN))*%25%25%26%0E%0E%0F%14%14%15%1A%1A%1B%1D%1C%1E%19%19%1A%1F%1E%20%1E%1D%1F'%26(%F8%F8%F8%40%40A%D8%D8%D8%3A9%3A%1C%1B%1D%7C%7B%7C'%1A%1CHGH%E5%E5%E5%86%86%86%D1%D1%D1%AB%AB%ABdde%CB%CA%CB%24%23%25%92%92%93%1E%1E%1F%1C%17%19SSS%C1%C1%C1%C7%C7%C7%3C13%83%83%84%A1%A1%A2%60_%60jikCCD%82%82%83%20%1F!%B9%B9%B9%BD%BD%BE%5BZ%5C%5C%5C%5C%AF%AF%AF%F1%F0%F1%C8%C8%C9%18%18%19%23%22%24%0F%0F%10%13%13%14%0C%0C%0D%17%17%18%15%15%16%16%16%17%10%10%11%1B%1B%1C%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%10%00%10%00%00%06%C0%C0%9FpH%0A%15%0E%93%A1r%B81%88%1A%3C%CAl9%D4%3Cx%A6%8B%A3%60%93Q9%08%08c%A1%B3%11l%92%E5%CC7P%F4%1C%95%B3%F9%A5D%DDn%8A%DD%CE%C7%E6%7D%2CJ%06%3D%3C%03%03%0F%0C%7B7%1F%14C%119%3C%0B%09%3D%3E%15557%0F%05%19B.9%3B%0B8%3C%3E%3Aoz%05%1EB%2099%147%3B%0C%3A8%10%058%05%20B%16%3D%03%0695%0A%03%096%00%03-%02B%2C%3D%0A%23%8F%0D%3D9%0D08%04%01%B8%09%3A%1F%AF%3A%0D8%3D*%7C'%A97%3E5%92%A3%0A71%03%0B)B4%12%01%14%3E8%3A5%E3%05%3C%3A%D4%8D%02%18%00%00%12%18Vt%40A%23I%10%00%3B";
var i_home = "data:image/gif,GIF89a%10%00%10%00%D58%00%FF%D0%D0%FF%A0%A0o%2F%00%E2%19%10%8Cd%17%CC%C5t%BC%A5%8F%CF%A4%7F%A5E%00%FF%F0%F0%E7%CEG%D8%CC%BF%C5%13%00%EC%1D%10%F940%B1%3C%00%FF%C0%C0%8Cf%3F%82Y%2F%7FbE%9CmEuR0%F5sp%E2%D8%CF%F5%83%80%FF%F3%5D%AB%60%1Fi4%00%FF%60%60%E7%C1C%C3.%00%DC%CD%BF%B3%99%80%ACr%3F%FF%40%40%E7%12%00%C0%AFh%C3%A9%90%9F%90x%E7%B4%3F%AD%85%60%90%2F%00%99a0%ADi%11%E2%09%00%B77%00%F9%24%20%90D%00%AE%96x%C3%8D_%A6%A0%95%D9%CD%C0%FF%FA_%9FJ%00%FF%FF%FFf3%00%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%008%00%2C%00%00%00%00%10%00%10%00%00%06%82%40%9Cp%88%E3%B8%00%C4%A40!%F2%A4%06H%E5%D2%D1%AA%DD%04P)%C0%F1%D0%84%22%12%2C%24%09h%3Cj%07%9Bmqe%05%86%90%06%A2%86%B6%5D%D8W%C6%3B0%9A%D3c%1F%06%067%847z%16(t%8A%1B%85%85%20%1883%8At%8D%85C%92%8A%2B%04%9B%8D%97%93%0A4%A1%9DB%98t'%19%A2%96%A4%93%1D%A14%A3%91%9F%AE%B0%98*%14%24%05%B9%13%15%84%A4%25%2F02%C2%C3%C2%26733A%00%3B";
var i_family = "data:image/gif,GIF89a%10%00%10%00%C4%10%00%A1%C7%90P%970k%A7P%AF%CF%A0x%AF%60%D7%E7%D0%E5%EF%E0%BC%D7%B0%F2%F7%F0B%8F%20%86%B7p5%87%10%5D%9F%40%CA%DF%C0%93%BF%80'%7F%00%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%10%00%2C%00%00%00%00%10%00%10%00%00%05%7D%20%04%15%0D%22%9E%10%D2%14'%F0%3C%8B%81%22%C9%AB%88%CB%FB8%A8%AB%E3%3A%5EK%F7%10%0D%5E%09%D9%09%11x%01%20G%5D%00U%D35%04%C4%87i%94U%E4%88%07%91%EF%B5h%12%13%0A%81C%40%D0%B5%03%0C%1D%96%7C%D0)%12%90%F8%ABQG%2Bt%0B%26q%0E%0F%0Dm%85Y%04y%3B%85M%0B%22zB%83%85%0D%0F%0C%90%2F%92%8C%0D%95%97%8B%3BF%0E%0D%0E%06%05%0C7P%0E%A2%10!%00%3B";
var i_earth = "data:image/gif,GIF89a%10%00%10%00%D5%3E%00%00%3Ct%00%B3%1E%00kQ%00Tc%00%24%85%2FB%CF%00%83%40%00%60Z%00Hk%11%19%B1%BF%BF%E7%95%AA%F9o%81%E7%FF%FF%FF%CD%D8%FF%00%0C%96%AB%B0%E7%11T%86%2Fe%B5%C3%D0%FF%5B%60%C9i%A9%BF%1F%20%ABW%C0%8A%7F%80%CF%3B%C3%5E%AF%AF%E1%05%97%3E%3Bj%C9%11H%8E%17!%B7%03%AF3%05%8BF%11%9CR6%C7P%17a%C4%000%7C%3BR%DB%EF%EF%F9%2Fq%AC%A8%D4%D3%09%97%5E%0B%1D%A2w%92%F95J%D5%C3%D1%FF%B9%C9%FF%07%9FP%15%19%AB%11lu%05%A7A%B9%C8%FF%A9%C5%F0%23%A8m%CF%CF%ED%EC%F0%FF%A5%B9%FF%00%A7'%00%8F8%AF%C1%FF%00%BF%16%00%01%9F%FF%FF%FF%00%00%00!%F9%04%01%00%00%3E%00%2C%00%00%00%00%10%00%10%00%00%06%A9%40%9F%D0w%DB%CDZ%3B%9C%EB6l%EE%0A%90FC%A1%A1%94vM%DF%22%D1%EBY%BA%60%CFb%88%EB%18%08%E0.%E0%60%08%D1%88%92%1C%8F7%E8%22%08%BC%8F%8CW%BB%E1%40s%3C%08%5D%02%3A%3C)%23s(%0C%01%3C9%02%60%00%85%01%2Fs%17%1C9hi%00%3A%03%3A%3A9%3A%19%2C%02%07%0Fi%3D%24%01%86%01%07%22%8Cs%83%91%81t%158%1Bs9%A8%0399%07*%3B7'%B9%A8%0F%3C%06%3D%05L81%3C%3A%A8%3D%00%04%098C%2B%11%C8%D0%09cM8%050%18%0A%0A%266%05%D5YD%3B%0E%3B%EA%13LCA%00%3B";

var Zipcode = ""; // ie. 91205
var proximity = "5"; // 5 for 5miles Radius or 10 for 10miles and so on...
var category = "";
var envLink = "http://www.sustainlane.com/"; 

// creating a wrapper for the injecting elements
var greenLocal = document.createElement("div");
    greenLocal.setAttribute("id", "greenLocal");
	greenLocal.setAttribute("style", "line-height: 14px;margin-top: 5px;");

// get searched zipcode
function getZipcode() {
	String.prototype.trim = function () {
		return this.replace(/^\s*/, "").replace(/\s*$/, "");
	}
// find zipcode from Zillow	
	Zipcode = document.getElementsByClassName("country-name")[0].innerHTML;
	if (Zipcode == null) {
		// cannot find environmental info, add NA
		addEnvInfo();
		return null;
	}
}

// construct query from Category & Zipcode information
// Category -1 = All Categories
// Category 4 = Eat & Drink
// Category 5 = Be Healthy
// Category 7 = Look Good
// Category 6 = Green your Home
// Category 21 = Family Living
// Category 9 = Our Planet

function constructQuery(category) {
	envLink = "http://www.sustainlane.com/search.do?locationString=" + Zipcode + "&category=" + category + "&proximity=" + proximity;
}

// fund place to add environment box
function findPlaceToAdd() {
	el = document.getElementById("search");
	if (el != null) return el;
	
	return null;
}

// Add all category information
	
function addGreenLocal() {
	target = findPlaceToAdd();
	if (target == null) return null;

	constructQuery('-1');
	GM_xmlhttpRequest({
		method: "GET", 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		url: envLink, 
		onload: function( data ) {


			var slData = data.responseText;
			var d = 0;
			if ((d = slData.indexOf("<b>")) != -1) {
				slData = slData.substring(d+3);
				if ((d = slData.indexOf("results")) != -1)
					localStore = slData.substring(0, d);
	var leaf = document.createElement('img');
	leaf.src = i_leaf;
	leaf.setAttribute("title", "Green Local Businesses");
	greenLocal.appendChild(leaf);
	greenLocal.innerHTML += ' ' ;
	greenLocal.innerHTML += 'There are ' + localStore + ' green businesses in your searching area. ' ;
	greenLocal.innerHTML += '<a href=' + envLink +' target=_blank>(SL)</a> ' ;
	greenLocal.innerHTML += '<a href=http://lotus.calit2.uci.edu/fest/contribute.html target=_blank>(FEST)</a>' ;
	target.appendChild(greenLocal);

			}
		}

	});
}

// ADD Eat and Drink Category
function addEatDrink() {

	constructQuery('4');
	GM_xmlhttpRequest({
		method: "GET", 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		url: envLink, 
		onload: function( data ) {


			var slData = data.responseText;
			var d = 0;
			if ((d = slData.indexOf("<b>")) != -1) {
				slData = slData.substring(d+3);
				if ((d = slData.indexOf("results")) != -1)
					EatDrink = slData.substring(0, d);
	var food = document.createElement('img');
	food.src = i_food;
	food.setAttribute("title", "Eat & Drink");
	greenLocal.appendChild(food);
	greenLocal.innerHTML += '(<a href=' + envLink +' target=_blank>' + EatDrink.trim() + '</a>) ' ;
	target.appendChild(greenLocal);

			}
		}
	});
}

// ADD Be Healthy Category
function addBeHealthy() {

	constructQuery('5');
	GM_xmlhttpRequest({
		method: "GET", 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		url: envLink, 
		onload: function( data ) {


			var slData = data.responseText;
			var d = 0;
			if ((d = slData.indexOf("<b>")) != -1) {
				slData = slData.substring(d+3);
				if ((d = slData.indexOf("results")) != -1)
					BeHealthy = slData.substring(0, d);
	var healthy = document.createElement('img');
	healthy.src = i_healthy;
	healthy.setAttribute("title", "Be Healty");
	greenLocal.appendChild(healthy);
	greenLocal.innerHTML += '(<a href=' + envLink +' target=_blank>' + BeHealthy.trim() + '</a>) ' ;
	target.appendChild(greenLocal);

			}
		}
	});
}

// ADD Look Good Category
function addLookGood() {

	constructQuery('7');
	GM_xmlhttpRequest({
		method: "GET", 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		url: envLink, 
		onload: function( data ) {


			var slData = data.responseText;
			var d = 0;
			if ((d = slData.indexOf("<b>")) != -1) {
				slData = slData.substring(d+3);
				if ((d = slData.indexOf("results")) != -1)
					LookGood = slData.substring(0, d);
	var clothing = document.createElement('img');
	clothing.src = i_clothing;
	clothing.setAttribute("title", "Look Good");
	greenLocal.appendChild(clothing);
	greenLocal.innerHTML += '(<a href=' + envLink +' target=_blank>' + LookGood.trim() + '</a>) ' ;
	target.appendChild(greenLocal);

			}
		}
	});
}


// ADD Green Home Category
function addGreenHome() {

	constructQuery('6');
	GM_xmlhttpRequest({
		method: "GET", 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		url: envLink, 
		onload: function( data ) {


			var slData = data.responseText;
			var d = 0;
			if ((d = slData.indexOf("<b>")) != -1) {
				slData = slData.substring(d+3);
				if ((d = slData.indexOf("results")) != -1)
					GreenHome = slData.substring(0, d);
	var home = document.createElement('img');
	home.src = i_home;
	home.setAttribute("title", "Green Your Home");
	greenLocal.appendChild(home);
	greenLocal.innerHTML += '(<a href=' + envLink +' target=_blank>' + GreenHome.trim() + '</a>) ' ;
	target.appendChild(greenLocal);

			}
		}
	});
}

// ADD Family Living Category
function addFamilyLiving() {

	constructQuery('21');
	GM_xmlhttpRequest({
		method: "GET", 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		url: envLink, 
		onload: function( data ) {


			var slData = data.responseText;
			var d = 0;
			if ((d = slData.indexOf("<b>")) != -1) {
				slData = slData.substring(d+3);
				if ((d = slData.indexOf("results")) != -1)
					FamilyLiving = slData.substring(0, d);
	var family = document.createElement('img');
	family.src = i_family;
	family.setAttribute("title", "Family Living");
	greenLocal.appendChild(family);
	greenLocal.innerHTML += '(<a href=' + envLink +' target=_blank>' + FamilyLiving.trim() + '</a>) ' ;
	target.appendChild(greenLocal);

			}
		}
	});
}

// ADD Our Planet Category
function addOurPlanet() {

	constructQuery('9');
	GM_xmlhttpRequest({
		method: "GET", 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
		},
		url: envLink, 
		onload: function( data ) {


			var slData = data.responseText;
			var d = 0;
			if ((d = slData.indexOf("<b>")) != -1) {
				slData = slData.substring(d+3);
				if ((d = slData.indexOf("results")) != -1)
					OurPlanet = slData.substring(0, d);
	var earth = document.createElement('img');
	earth.src = i_earth;
	earth.setAttribute("title", "Our Planet");
	greenLocal.appendChild(earth);
	greenLocal.innerHTML += '(<a href=' + envLink +' target=_blank>' + OurPlanet.trim() + '</a>) ' ;
	target.appendChild(greenLocal);

			}
		}
	});
}

// Call the Add Functions to Run the Script

	getZipcode();
	addEatDrink();
	addBeHealthy();
	addLookGood();
	addGreenHome();
	addFamilyLiving();
	addOurPlanet();
	addGreenLocal();
	
// To Do for next version: 
// Automating the GM_xmlhttpRequest calls
// Wrapping icons and Green local in separate DIV
// Add delay for GM_xmlhttpRequest calls
// Error Handling For different zipcodes Desert zipcodes need wider radius, if no success try wider radius and display the radius size.