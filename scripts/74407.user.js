// ==UserScript==
// @name           TravianAttackInfo - Snow_Angel
// @namespace      Travian
// @author         Snow_Angel
// @include        http://*.travian.*/build.php?*gid=16*
// @include        http://*.travian.*/build.php?id=39&k
// ==/UserScript==

var theads = document.getElementById("build").getElementsByTagName("table");
for(var i = 0; i < theads.length; i++){
	var attackData = theads[i].innerHTML;
	var coordBegin = attackData.indexOf("karte.php?d=") + 12;
	var coordEnd = attackData.indexOf("&",coordBegin);
	var coordZText = attackData.substring(coordBegin,coordEnd);
	var coordsO;
	var coordsA;
	var coord
	
	var attackURL = attackData.substring(attackData.indexOf("karte.php?d="),attackData.indexOf('"',coordBegin));
	if(coordZText.length >= 4 && coordZText.length <= 8){
		coordsA = getCoords(coordZText);
		var attackerA = theads[i].getElementsByTagName("a")[0].childNodes[0];		
		attackerA.nodeValue = attackerA.nodeValue + "(" + coordsA[0] + "|" + coordsA[1] + ")";
	} else {
		continue;
	}
	
	
	coordBegin = attackData.indexOf("karte.php?d=",coordEnd) + 12;
	coordEnd = attackData.indexOf("&",coordBegin);
	coordZText = attackData.substring(coordBegin,coordEnd);	
	if(coordZText.length >= 4 && coordZText.length <= 8){
		coordsO = getCoords(coordZText);
		var ownA = theads[i].getElementsByTagName("a")[1].childNodes[0];		
		ownA.nodeValue = ownA.nodeValue + "(" + coordsO[0] + "|" + coordsO[1] + ")";
	} else {
		continue;
	}
		
	var arriveStart = attackData.indexOf('id="timer');
	arriveStart = attackData.indexOf(">",arriveStart);
	var arriveEnd = attackData.indexOf("<",arriveStart);
	
	var arrive = attackData.substring(arriveStart + 1,arriveEnd);
	var arriveString = "";
	
	if(arrive.length >= 5){
		var arriveDate = new Date();
		var arriveTime = arriveDate.getTime();
		arriveParts = arrive.split(":");
		arriveTime += parseInt(arriveParts[0],10) * 60 * 60 * 1000;
		arriveTime += parseInt(arriveParts[1],10) * 60 * 1000;
		arriveTime += parseInt(arriveParts[2],10) * 1000;
		arriveDate.setTime(arriveTime);
		
		arriveString = date2String(arriveDate);
	}
	
		
	var tBodies = theads[i].getElementsByTagName("tbody");
	
	var newTr = document.createElement("tr");
	var newTd = document.createElement("td");
	newTd.setAttribute("colspan","11");
	newTd.setAttribute("id","newTd" + i);
	
	var dist = getDistance(coordsA,coordsO);
	
	var tdText = document.createTextNode("Distance: " + dist + ", ");
	var ttc = document.createElement("a");
	var ttcURL = "http://zsombor.focitipp.com/travian/travian_calculator.html?toursqr=&datetype=date_end";
		
	ttcURL += "&x1=" + coordsA[0];
	ttcURL += "&y1=" + coordsA[1];
	ttcURL += "&x2=" + coordsO[0];
	ttcURL += "&y2=" + coordsO[1];
	ttcURL += "&datevalue=" + arriveString;
	ttc.setAttribute("href",ttcURL);
	ttc.setAttribute("target","_blank");
	
	var ttcText = document.createTextNode("  Check time  ");
	ttc.appendChild(ttcText);
	
	var showButton = document.createElement("input");
	showButton.setAttribute("type","button");
	showButton.setAttribute("value","Info");
	showButton.setAttribute("id","newBtn" + i);
	showButton.setAttribute("name",attackURL);
	
	showButton.addEventListener('click', function(ev){ getDetails(this);}, false);
	
	newTd.appendChild(tdText);
	newTd.appendChild(ttc);
	newTd.appendChild(showButton);
	newTr.appendChild(newTd);
	
	tBodies[tBodies.length - 1].appendChild(newTr);
	
}

function getDetails(data){
	var tdId = data.id.substring(6);
	var url = "http://" + document.location.hostname + "/" + data.name;
	url = url.replace('amp;','');
	post(url, tdId)
}

function post(url, tdId) {
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		onload: function(responseDetails) {					
					var text = responseDetails.responseText;
					var vilInfoStart = text.indexOf('village_info');
					var clanStart = text.indexOf('allianz.php',vilInfoStart);
					clanStart = text.indexOf('>',clanStart);
					var clanEnd = text.indexOf('<',clanStart);
					var clan = text.substring(clanStart + 1,clanEnd);
					
					var userStart = text.indexOf('spieler.php',vilInfoStart);
					userStart = text.indexOf('>',userStart);
					var userEnd = text.indexOf('<',userStart);
					var user = text.substring(userStart + 1,userEnd);
					
					var newTd = document.getElementById("newTd" + tdId);
					newTd.innerHTML = newTd.innerHTML + " Player: " + user + ", ally: " + clan;
				}
	});
}

function getCoords(coordText){
	var coordZ = parseInt(coordText,10);
	var coordX = (coordZ % 801) - 401;
	var coordY = 400 - ((coordZ - (coordZ % 801)) / 801);
	var coords = new Array(coordX,coordY);
	return coords;
}

function getDistance(coordsA, coordsB){
	var dx = axisDistance(coordsA[0],coordsB[0]);
	var dy = axisDistance(coordsA[1],coordsB[1]);
	var d = "" + Math.sqrt(dx*dx + dy*dy);
	return d.substring(0,d.indexOf(".") + 2);
}

function axisDistance(a,b){
	var d = Math.abs(a-b);
	if (d<=400){
		return d;
	}
		
	return Math.abs(d-(2*400+1));
}

function date2String(targetDate){
	var dateString = targetDate.getFullYear()+
	digit2digits(targetDate.getMonth() + 1) +
	digit2digits(targetDate.getDate());
	dateString += digit2digits(targetDate.getHours()) +
	digit2digits(targetDate.getMinutes()) + 
	digit2digits(targetDate.getSeconds());
	return dateString;
}


function digit2digits(d){
	var s = "" + d;
	if(s.length > 1){
		return s;
	}
	return "0" + d;
}