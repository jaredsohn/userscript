// Yelp to Foursquare
// version 0.1 09/25/09
// By Ben McMath
//
// ==UserScript==
// @name           Yelp to Foursquare
// @namespace      http://userscripts.org/
// @description    Add Yelp items to foursquare
// @include        http://*.yelp.com/biz/*
// @include        http://foursquare.com/add_venue*
// ==/UserScript==
if(document.domain == "www.yelp.com" || document.domain == "yelp.com")
{
	var name = document.getElementById("bizInfoHeader").children[0].textContent;

	var InfoNode = document.getElementById("bizInfoContent");
	var address = InfoNode.children[1].children[0].textContent;
	var city = InfoNode.children[1].children[2].textContent;
	var state = InfoNode.children[1].children[3].textContent;
	var zip = InfoNode.children[1].children[4].textContent;
	var phone = document.getElementById("bizPhone").textContent;

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
	var addressNode = document.forms[1].getElementsByTagName("input")[2];
	var cityNode = document.forms[1].getElementsByTagName("input")[4];
	var stateNode = document.forms[1].getElementsByTagName("input")[5];
	var zipNode = document.forms[1].getElementsByTagName("input")[6]
	var phoneNode = document.forms[1].getElementsByTagName("input")[7]
	
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
