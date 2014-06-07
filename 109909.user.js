// ==UserScript==
// @name		eBay quick search link from Google
// @namespace		http://www.smartthing.co.uk/clients/ebaygoogle.user.js
// @description 	Provides an additional link in the menu bar at the top of the Google search page for eBay
// @include 		http://*google.com*
// @include 		http://*google.co.uk*
// @author		The SmartTHING Limited
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(main);

// All your GM code must be inside this function
function main() {
	var patched = false;
	setInterval(function() {
		if (patched) return;
		var searchstr = $('input[name=q]').val();
		if (searchstr != "") {
			$('ol.gbtc li:first').after('<li class="gbt gbz0l"><a id="ebaylink" class="gbzt" href="http://shop.ebay.co.uk/i.html?_nkw=' + 
				encodeURIComponent(searchstr) + '"><span class="gbtb2" style="border-top-color: #4BDD39!important"></span><span class="gbts" style="font-weight:normal;background-color:#87DD7D !important">eBay</span></a></li>');
			patched = true;
		}
	}, 500);
}

