// ==UserScript==
// @name           KOCtools: The Script
// @namespace      KOCtools
// @version        0.9.2
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @require        http://usocheckup.redirectme.net/96308.js?id=usoCheckup&debug=true
// ==/UserScript==



window.addEventListener ("load", addUpdateButton, false);


var update = (function LocalMain () {
	//alert("Checked Update");
	var params = "version=0.9.2&host=" + window.location.hostname.split('.')[0] + '&' + "servername=" + unsafeWindow.domainName + "&";
	for (var key in unsafeWindow.g_ajaxparams) {
		params = params + key + "=" + unsafeWindow.g_ajaxparams[key] + "&";
	}

    GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://www.koctools.com/queuegm.php?" + params,
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
		if(response.responseText != "1"){
			alert(response.responseText);
		}else{
			alert(unsafeWindow.domainName + " added to queue.")
		}
	  }
	});


	(function($){
	 var _old = $.cheatDetector;
     $.cheatDetector = function (){
     };
	})(unsafeWindow.cm);
 
});


function addUpdateButton() {
	usoCheckup.request(false);	
	var tabBar = unsafeWindow.$('main_engagement_tabs');
	tabBar.innerHTML = tabBar.innerHTML + '<a class = "navTab" id = "updateButton" > <span>Update on KOCtools</span> </a>'
	e = document.getElementById('updateButton');
	e.addEventListener("click", update, false);
}




//"I used to work at LucasArts..."