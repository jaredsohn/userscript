// ==UserScript==
// @name          Flickr/Shutterfly Integrator
// @description	  Adds the ability to order prints of a photo via Shutterfly.com
// @namespace     http://quasistoic.org/scripts/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// @version		1.0

// By Danny Dawson
// Modified by Jason Rhyley (jason AT rhyley DOT org)
// ==/UserScript==

(function() {

	//if a photo page
	if (document.getElementById("button_bar")) {
	
	pid = location.pathname.split('/')[3];
	
	if (document.getElementById("title_div" + pid)) 
		ptitle = document.getElementById("title_div" + pid).innerHTML;
	else ptitle = 'Flickr - photo sharing!';
	
	pOwnerName = location.pathname.split('/')[2];
	(pOwnerName.indexOf('@') != -1) ? pOwnerName = '' : pOwnerName = ', by ' + pOwnerName;
	
	/** XHConn - Simple XMLHTTP Interface - bfults@gmail.com - 2005-04-08        **
	 ** Code licensed under Creative Commons Attribution-ShareAlike License      **
	 ** http://creativecommons.org/licenses/by-sa/2.0/                           **/
	function XHConn()
	{
	  var xmlhttp, bComplete = false;
	  xmlhttp = new XMLHttpRequest();
	  this.connect = function(sURL, sMethod, sVars, fnDone)
	  {
	    if (!xmlhttp) return false;
	    bComplete = false;
	    sMethod = sMethod.toUpperCase();

	    try {
	      if (sMethod == "GET")
	      {
		xmlhttp.open(sMethod, sURL+"?"+sVars, true);
		sVars = "";
	      }
	      else
	      {
		xmlhttp.open(sMethod, sURL, true);
		xmlhttp.setRequestHeader("Method", "POST "+sURL+" HTTP/1.1");
		xmlhttp.setRequestHeader("Content-Type",
		  "application/x-www-form-urlencoded");
	      }
	      xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && !bComplete)
		{
		  bComplete = true;
		  fnDone(xmlhttp);
		}};
	      xmlhttp.send(sVars);
	    }
	    catch(z) { return false; }
	    return true;
	  };
	  return this;
	}

	var myConn = new XHConn();
	var fnWhenDone = function (responseDetails) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText, "text/xml");
		var entries = dom.getElementsByTagName('size');
		sizes = new Object();
		for (i=0;i<entries.length;i++) {
			label = entries[i].getAttribute('label');
			eval ("sizes." + label +" = new Object();");
			eval ("sizes." + label +".w = entries[i].getAttribute('width'); ");
			eval ("sizes." + label +".h = entries[i].getAttribute('height'); ");
			eval ("sizes." + label +".src = entries[i].getAttribute('source'); ");
		}
		if (!sizes.Original && sizes.Large) sizes.Original = sizes.Large;
		window.newBody = '<form name="sflyc4p" action="http://www.shutterfly.com/c4p/UpdateCart.jsp" method="post">' +
			'<br><input id="order" type="submit" value="Order Print"> ' +
			'<button onclick="document.body.innerHTML = oldBody">Cancel</button><br><br>' +
			'<img src="' + sizes.Original.src + '"><br><br>' +
			ptitle + pOwnerName +
			'<input type="hidden" name="addim" value="1">' +
			'<input type="hidden" name="protocol" value="SFP,100">' +
			'<input type="hidden" name="pid" value="C4PP">' +
			'<input type="hidden" name="psid" value="GALL">' +
			'<input type="hidden" name="imnum" value="1">' +
			'<input type="hidden" name="imraw-1" value="' + sizes.Original.src + '">' +
			'<input type="hidden" name="imrawheight-1" value="' + sizes.Original.h + '">' +
			'<input type="hidden" name="imrawwidth-1" value="' + sizes.Original.w + '">' +
			'<input type="hidden" name="imthumb-1" value="' + sizes.Thumbnail.src + '">' +
			'<input type="hidden" name="imbkprnta-1" value="' + ptitle + pOwnerName + '">' +
			'<input type="hidden" name="returl" value="' + location.href + '">' +
			'</form>';
	};

	args = 'method=flickr.photos.getSizes&photo_id=' + pid + '&api_key=' + global_magisterLudi;
	myConn.connect("/services/rest/", "GET", args, fnWhenDone);

	window.doShut = function() {
		oldBody = document.body.innerHTML;
		document.body.innerHTML = newBody;
	}
	
	var containerC = document.createElement("li");
	containerC.setAttribute("class","Stats");
	containerC.innerHTML = '<a href="javascript:doShut()" style="text-decoration:none">Order Prints</a>';

	addlInfo = document.getElementsByTagName("ul")[0];	// This could break so easily, but luckily list elements aren't allowed in comments
	addlInfo.appendChild(containerC);
	
	}//close if a photo page

})();