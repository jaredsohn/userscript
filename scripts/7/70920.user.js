// ==UserScript==
// @name           eat.fi to foursquare
// @namespace      maeki.org
// @description    Add a link to add a restaurant to foursquare on eat.fi
// @include        http://eat.fi/*
// @include        http*://foursquare.com/*
// ==/UserScript==

// Adapted by teukkam from:
// Yelp to Foursquare
// version 0.1 09/25/09
// By Ben McMath
//
if(document.domain == "www.eat.fi" || document.domain == "eat.fi")
{
	var name = document.getElementById('restaurant-info').childNodes[1].textContent;
	var InfoNode = document.getElementById("restaurant-contact");
	var address = document.getElementsByClassName('street-address')[0].textContent;
	GM_log(address);
	var city = document.getElementsByClassName('locality')[0].textContent;
	var state = "Finland";
	var zip = "";
	var phone = document.getElementsByClassName('entry-value')[0].textContent;

	var getParams = "?venuename="+encodeURIComponent(name) + "&address=" + encodeURIComponent(address) + "&city=" + encodeURIComponent(city) + "&state=" + encodeURIComponent(state) + "&zip=" + encodeURIComponent(zip) + "&phone="+ encodeURIComponent(phone);

	// add link image to yelp page
	var fsImg = document.createElement("img");
	fsImg.setAttribute("src", "http://foursquare.com/img/press/foursquare_logo.png");
	fsImg.setAttribute("height", "50");
	fsImg.setAttribute("width", "100");
	
	var newLink = document.createElement("a");
	newLink.setAttribute("href", "http://foursquare.com/add_venue" + getParams);
	newLink.setAttribute("target", "_blank");
	newLink.appendChild(fsImg/*document.createTextNode("Add to FourSquare.com")*/);
	
	
	
	InfoNode.appendChild(newLink);
}
else if (document.domain == "foursquare.com" || document.domain == "www.foursquare.com")
{	
	// get form elements
	var addressNode = document.forms[2].getElementsByTagName("input")[2];
	var cityNode = document.forms[2].getElementsByTagName("input")[4];
	var stateNode = document.forms[2].getElementsByTagName("input")[5];
	var zipNode = document.forms[2].getElementsByTagName("input")[6]
	var phoneNode = document.forms[2].getElementsByTagName("input")[7]
	
	// fill in form
	addressNode.value = decodeURIComponent(gup("address"));
	cityNode.value = decodeURIComponent(gup("city"));
	stateNode.value = decodeURIComponent(gup("state"));
	zipNode.value = decodeURIComponent(gup("zip"));
	phoneNode.value = decodeURIComponent(gup("phone"));
}

// get URL parameters like gup("address")
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
