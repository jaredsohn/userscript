// ==UserScript==
// @name          Scandinavian Airlines Corrector
// @namespace     http://www.stud.ntnu.no/~aase/
// @include       https://*.scandinavian.net*
// @include       http://*sasbraathens.no*/Requirements.aspx*
// @include       http://*sas.se*/Requirements.aspx*
// @include       http://*sas.dk*/Requirements.aspx*
// @description	  Makes the Scandinavian Airlines webpages usable in Firefox as well as providing some extra features to make booking tickets easier for "experts" (Updated 18-APR 2006)
// ==/UserScript==


(function() {
	// Add a link to the old booking engine if we are on the new one
	var results = document.location.href.match(/^http:\/\/(www.)?sas(braathens)?.(no|se|dk)\//);
	if (results)
	{
		var market = results[3].toUpperCase();
		
		var linkdiv = document.createElement("div");
		linkdiv.style.cssText = "position: absolute; top: 0; right: 0; padding: 10px;";
		linkdiv.innerHTML = "<a href=\"" + "https://ibp2.scandinavian.net/ibp/planandbook/searchAvailView.aspx?MKT=" + 
			market + "\">Switch to classic engine</a>";
		document.body.appendChild(linkdiv);
		// Uncomment this line to redirect to old booking engine immediately
		//window.location = "https://ibp2.scandinavian.net/ibp/planandbook/searchAvailView.aspx?MKT=" + market;
		// Stop parsing of Greasmonkey script as it does not apply to the new booking engine
		return;
	}
	
	
	
	// Set cookie to allow javascript
	if (document.cookie.indexOf('ec_javascript=True') == -1)
	{
		document.cookie = 'ec_javascript=True;domain=scandinavian.net;path=/;';
		document.location.reload();
	}

	// Fix layout bugs
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; ++i) {
		divs[i].style.height = '';
		divs[i].style.width = '';
	}
	
	// Display fare code for selected fare
	var span = document.getElementById("FRCLink");
	if (span) 
	{
		var oc = span.getAttribute("onclick");
		if (oc)
		{
			var ms = oc.match(/&FareBasis=([A-Z0-9]{4,6})/);
			var links = span.getElementsByTagName("a");
			if (ms && links) 
			{
				links[0].innerHTML += " (" + ms[1][0] + ")";
				links[0].title = "Fare basis: " + ms[1];
			}
		}
	}
	
	// Display fare codes in price drop down
	var prices = document.getElementById("PriceList");
	if (prices)
	{
		var priceNodes = prices.childNodes;
		var fareCode;
		for (var i = 0; i < priceNodes.length; ++i)
		{
			farecode = priceNodes[i].getAttribute("value");
			if (farecode)
			{
				priceNodes[i].innerHTML += " - " + farecode[0];
			}
		}
	}
	
	// Replace missing texts on Norwegian site
	var spans = document.getElementsByTagName("span");
	var currentSpan, currentNode;
	for (var i = 0; i < spans.length; ++i)
	{
		currentSpan = spans[i];
		for (var j = 0; j < currentSpan.childNodes.length; ++j)
		{
			currentNode = currentSpan.childNodes[j];
			if (currentNode.nodeType == 3) // TEXT_NODE
			{
				if (currentNode.nodeValue.match(/Not found:\ G189830/))
					currentNode.nodeValue = "Lowest price";
				else if (currentNode.nodeValue.match(/Not found:\ G189834/))
					currentNode.nodeValue = "Flexible ticket";
			}
		}
	}
	
	// Enable saving of passwords for login form
	var pwd = document.getElementsByName("pwd");
	if (pwd && pwd[0])
	{
		pwd[0].setAttribute("autocomplete", "on");
	}
		
	
	// Enable booking form (may be disabled if we're in no/se market)
	var frmSearch = document.getElementById('frmSearchAvail');
	if (frmSearch)
	{
		// Enable all drop downs
		var fields = frmSearch.getElementsByTagName("select");
		for (var i = 0; i < fields.length; ++i) {
			fields[i].style.background = "white";
			fields[i].disabled = false;				
		}

		// Complete enabling of form after methods have loaded
		enableBookingForm = function() {
			this.blnDisplayDisabledBook = false;
			this.PageReorganize();
		}
		window.setTimeout(enableBookingForm, 100);	
	}
	



	// Fix broken functions pertaining to EB Award bookings
	fixEBAward = function() {
		if (this.ddlToCountry_onchange && this.ddlFromCountry_onchange && this.FillDropDown)
		{
			this.ddlToCountry_onchange = function() {
				var ddlToCountry = document.getElementById("ddlToCountry");
				var ddlToCity = document.getElementById("ddlToCity");
				var tempArray;
				tempArray = this.objDropDownValue[ddlToCountry.options[ddlToCountry.selectedIndex].value];
				this.FillDropDown(ddlToCity, tempArray);
			};
	
			this.ddlFromCountry_onchange = function() {
				var ddlFromCountry = document.getElementById("ddlFromCountry");
				var ddlFromCity = document.getElementById("ddlFromCity");
				var tempArray;
				tempArray = this.objDropDownValue[ddlFromCountry.options[ddlFromCountry.selectedIndex].value];
				this.FillDropDown(ddlFromCity, tempArray);
			};
	
			this.FillDropDown = function(vobjDropDown, varrData) {
				vobjDropDown.innerHTML = '';
				for (var i=0; i<varrData.length; i=i+3)
				{
					var oOption = document.createElement('OPTION');
					vobjDropDown.options.add(oOption);
					oOption.text = varrData[i];
					oOption.value = varrData[i+1];
					if (varrData[i+2] == 1)
					{
						oOption.selected = true;
					}
				}
			};
		}
	};
	
	// Wait a few milliseconds to allow functions to be created
	window.setTimeout(fixEBAward, 10);
	
	
	// Enable alternate dep/arr input method
	switchInputMethod = function() {
		document.getElementById("switchInputMethodLabel").className = "hide";
		
		// Replace dropdowns with text input fields
		var tr = document.getElementsByName("DepartureCountry")[0].parentNode.parentNode;
		tr.className = 'hide';
		
		var sel = document.getElementsByName("txDepartureCityAirport")[0];
		var inp = document.createElement("input");
		inp.name = "txDepartureCityAirport";
		sel.parentNode.replaceChild(inp, sel);
		inp.focus();
		
		sel = document.getElementsByName("txArrivalCityAirport")[0];
		inp = document.createElement("input");
		inp.name = "txArrivalCityAirport";
		sel.parentNode.replaceChild(inp, sel);
		
		inp = document.getElementsByTagName("input");
		for (i=0; i<inp.length; ++i) {
			if (inp[i].getAttribute("type") != "submit")
				inp[i].style.background = "white";
			inp[i].disabled = false;
		}
		sel = document.getElementsByTagName("select");
		for (i=0; i<sel.length; ++i) {
			sel[i].disabled = false;
			sel[i].style.background = "white";
		}
	};

	// Enable alternate dep/arr input method
	var tripTypeTable = document.getElementById("TripType");
	if (tripTypeTable) {
		var td = tripTypeTable.parentNode;
		td.setAttribute("colspan", 2);
		
		// Create checkbox
		var a = document.createElement("input");
		a.setAttribute("type", "checkbox");
		a.addEventListener("click", switchInputMethod, false);
		
		// Create label
		var label = document.createElement("label");
		label.id = "switchInputMethodLabel";
		label.setAttribute("title", "Click to enable direct input of departure and arrival points");		
		label.innerHTML = "Direct input";
		label.appendChild(a);
		
		// Append everything
		var mytd = document.createElement("td");
		//mytd.appendChild(a);
		mytd.appendChild(label);
		td.parentNode.appendChild(mytd);
	}
})();
