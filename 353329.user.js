// ==UserScript==
// @name        airbnb cancellation policy enhancement
// @namespace   https://userscripts.org/scripts/show/353329
// @author      Luc Philippe
// @include     http*://www.airbnb.*/*
// @version     3
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
function objectFromString(str) {
	try {
		obj = JSON.parse(str);
		return obj;
	} catch (e) {
		console.error("Parsing error:", e); 
		return null;
	}
}
function stringFromObject(obj) {
	try {
		str = JSON.stringify(obj) ;
		return str;
	} catch (e) {
		console.error("Parsing error:", e); 
		return null;
	}

}
function getChildsByType(elt, strType) {
	var eltRes = new Array();
	for (var i = 0; i < elt.childNodes.length; i++) { 
		var eltChild = elt.childNodes[i];
		var eltChildType = eltChild.nodeName;
		if ( eltChildType == strType) { 
        	eltRes.push(eltChild);
		}
	}
	return eltRes;
}
function getByTagAndClassName(doc, tagName, className) {
	var res = new Array();
	var divs=doc.getElementsByTagName(tagName);
	for (var i = 0; i < divs.length; i++) { 
		var divClass = divs[i].getAttribute("class"); 
		if ( divClass == className) { 
        	res.push(divs[i]);
		}
	}
	return res;
}
function getStrTd(strStyle, strText) {
	if (strStyle) 
		var str = "<td style=\""+strStyle+"\">";
	else
		var str = "<td>";
	str += strText+"</td>";
	return str;
}
function abnbInfo(room) {
	this._room = room;
	this.starRating = -1;
	this.cancellation = "?";
	this.roomType = "?"; 
	this.bedType = "?";
	this.accommodates = -1;
	this.bedrooms = -1;
	this.bathrooms = -1;
	this.beds = -1; 
	this.extraPeople = "?";
	this.securityDeposit = "?";
	this.country = "?";
	this.city = "?";
	this.neighborhood  = "?";
	this.checkIn = "?"; 
	this.checkOut = "?";
	this.minimumStay = "?";
	this.monthlyPrice = "?";
	this.cleaningFee = "?";
	this.petOwner = "";
	this.setValue = function(key,value) {
		switch (key) {
			case "Room type:"			: this.roomType			= value; break;
			case "Bed type:"			: this.bedType			= value; break;
			case "Accommodates:"		: this.accommodates		= parseFloat(value); break;
			case "Bedrooms:"			: this.bedrooms			= parseFloat(value); break;
			case "Bathrooms:"			: this.bathrooms		= parseFloat(value); break;
			case "Beds:"				: this.beds				= parseFloat(value); break;
			case "Extra people:"		: this.extraPeople		= value; break;
			case "Security Deposit:"	: this.securityDeposit	= value; break;
			case "Country:"				: this.country			= value; break;
			case "City:"				: this.city				= value; break;
			case "Neighborhood:"		: this.neighborhood		= value; break;
			case "Check In:"			: this.checkIn			= value; break;
			case "Check Out:"			: this.checkOut			= value; break;
			case "Cancellation:" 	 	: this.cancellation		= value; break;
			case "Minimum Stay:" 		: this.minimumStay		= value; break;
			case "Weekly Price:" 		: this.weeklyPrice		= value; break;
			case "Monthly Price:"		: this.monthlyPrice		= value; break;
			case "Cleaning Fee:"		: this.cleaningFee		= value; break;
			case "Pet Owner:"			: this.petOwner			= value; break;		
			default: console.warn("Unknown key (key="+key+" value="+value+")");
		}
	}
	this.setValuesFromDiv = function(eltsTr) {
		for (var i=0; i<eltsTr.length; i++) {
			var eltTr = eltsTr[i];
			var eltsTd = getChildsByType(eltTr,"TD")
			var eltTdName=eltsTd[0];
			var eltTdValue=eltsTd[1];
			this.setValue(eltTdName.textContent, eltTdValue.textContent);
		}	
	}
	this.setStarRatingFromDiv = function(eltDivRating) {
		var eltsDivChild = getChildsByType(eltDivRating, "DIV");
		var eltsMetaChild = getChildsByType(eltsDivChild[0], "META");
		var str = eltsMetaChild[0].getAttribute("content");
		this.starRating = parseFloat(str);
	}
	this.loadXML = function(xmlPage) { 
		var eltTable = xmlPage.getElementById("description_details");
		var eltTbody = getChildsByType(eltTable,"TBODY")[0]; 
		var eltsTr = getChildsByType(eltTbody,"TR");
		this.setValuesFromDiv(eltsTr);
		var eltsDivRating = getByTagAndClassName(xmlPage, "DIV", "star-rating");
		if (eltsDivRating.length >= 1) { 
			this.setStarRatingFromDiv(eltsDivRating[0]);
		}
		console.log(this);
	}
}
function trtInfoFromPage(eltDiv, info) {
	switch (info.cancellation) {
		case "Super-strict" : eltDiv.setAttribute("style", "background: #F00000"); break;
		case "Strict" 		: eltDiv.setAttribute("style", "background: #6B0D0D"); break;
		case "Moderate" 	: eltDiv.setAttribute("style", "background: #FF7F00"); break;
		case "Flexible" 	: eltDiv.setAttribute("style", "background: #57D53B"); break;
		default: console.warn("Unknown cancellation (value="+info.cancellation+")");
	}
	var str="<div style=\"background: #FFFFFF\">"; 
	str += "<table class=\"table table-bordered table-striped\">"
		str += "<tbody>";
			str += "<tr>";
					var strRating = "";
					if (info.starRating > 0) {
						for (var i=0; i< Math.floor(info.starRating) ; i++) {
							strRating+="<i class=\"icon icon-pink icon-star\">  </i>";
						}
						if ( (info.starRating - Math.floor(info.starRating)) > 0) {
							strRating+="<i class=\"icon icon-pink icon-star-half\">  </i>";
						}
					} 
					str+=getStrTd("width:85px", strRating);
					var strBedroom = "";
					switch (info.bedrooms) {
						case -1 : break;
						case 0 : 
						case 1 : strBedroom += info.bedrooms + " bedroom with "; break;
						default : strBedroom += info.bedrooms + " bedrooms with "; 
					}
					strBedroom += info.beds + " " + info.bedType; 
					str+=getStrTd(null, strBedroom);
			str += "</tr>";
			str += "<tr>";				
				str+=getStrTd(null, info.accommodates + " people");
				str+=getStrTd(null, info.petOwner);
			str += "</tr>"; 
			
		str += "</tbody>";
	str += "</table>";
	str+="</div>";
	eltDiv.innerHTML+=str;
}
function xmlCallbackLoadPageRoom(eltDiv, strRoom,  responseText) {
	var doc = document.implementation.createHTMLDocument(strRoom);
	doc.documentElement.innerHTML = responseText;
	var info = new abnbInfo(strRoom);
	info.loadXML(doc);
	sessionStorage.setItem(strRoom,  stringFromObject(info) );
	trtInfoFromPage(eltDiv, info);
}
function trtPageRoom(eltDiv, strRoom) {
	var info = new abnbInfo(strRoom);
	sessionStorage.setItem(strRoom, stringFromObject(info) );
	var strDataUrl = eltDiv.getAttribute("data-url"); 
	var strAppartUrl = "https://www.airbnb.com/rooms/"+strRoom;
	console.log("GET "+strAppartUrl);
	GM_xmlhttpRequest( 
		{
			method: "GET",
			url: strAppartUrl,
			onload: function(response) {
				try {
						xmlCallbackLoadPageRoom(eltDiv, strRoom, response.responseText);
					} catch (e) {
						console.error("onload("+response+") error:", e); 
					}
			}
		}
	);
}
function getInfoFromPage(eltDiv) {
	var strDataUrl = eltDiv.getAttribute("data-url"); 
	var nStart=strDataUrl.indexOf("?");
	var strRoom = strDataUrl.substr(7,nStart-7);
	var infoTemp=sessionStorage.getItem(strRoom);
	if (!infoTemp ) {
		trtPageRoom(eltDiv,strRoom);
	} else {
		var info = objectFromString(infoTemp);
		if (info.cancellation == "?") 
			return; 
		trtInfoFromPage(eltDiv, info);
	}
}
function filterRoomsColor() {
	var apparts = getByTagAndClassName(document,"li","search-result"); 
	for (i = 0; i < apparts.length; i++) { 
	// for (var i = 0; i <1; i++) { 
		var eltLi = apparts[i];
		var eltDiv = eltLi.firstElementChild;
		var strStyle=eltDiv.getAttribute("style");
		if (strStyle) { 
			continue;
		}
		getInfoFromPage(eltDiv);
	}
}
function OnNodeInserted (event) { 
	try {
		filterRoomsColor();
	} catch (e) {
		console.error("OnNodeInserted("+event+") error:", e); 
	}
}
function addEventRoomInserted() { 
	var apparts = getByTagAndClassName(document,"li","search-result"); 
	var eltDiv = apparts[0].parentNode.parentNode;
	eltDiv.addEventListener ('DOMNodeInserted', OnNodeInserted, false);
}
console.log("START v3");	
if (location.pathname.substring(0, 3)=="/s/") {
	addEventRoomInserted();
}
console.log("END");
})();