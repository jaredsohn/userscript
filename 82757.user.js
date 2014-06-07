// ==UserScript==
// @name           Redfin Tax Appraisal
// @namespace      org.mrbb
// @include        http://*.redfin.com/*/home/*
// ==/UserScript==

try {

var j;
var kcrDiv$;

function main() {

	// Wait for jQuery
	if ( unsafeWindow.jQuery === undefined) {
		window.setTimeout(main, 250);
		return;
	}
	j = unsafeWindow.jQuery;
		
	parcelNumber = j.trim(j("table.property-details td.property_detail_label:contains('APN:')").next().html());
	GM_log("parcel number = " + parcelNumber);
	fetchKingCountyRecords(parcelNumber);
}


function fetchKingCountyRecords(parcelNumber) {
	var kcrDiv = document.createElement('div');
	var placeHolderSpan = document.createElement('span');
	kcrDiv.appendChild(placeHolderSpan);
	j(placeHolderSpan).text("KCR content...");
	
	kcrDiv$ = j(kcrDiv);

	kcrDiv$.attr("id", "kingCountyRecords");
	
	var url = "http://info.kingcounty.gov/Assessor/eRealProperty/Detail.aspx?ParcelNbr=" + parcelNumber;

	GM_log("Loading KCR tax info from : " + url);

	 GM_xmlhttpRequest({
	 	method: 'GET',
 		url: url,
 		onload: parseKingCountyRecordsPage
 	});


}
function parseKingCountyRecordsPage(r) {

	// Wrap the HTML page in XHTML
    var dt = document.implementation.createDocumentType("html", 
       "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
          
    var doc = document.implementation.createDocument('', '', dt);
    var documentElement =  document.createElement('html');
    documentElement.innerHTML = r.responseText;
    doc.appendChild(documentElement);
    
    var currTaxRow = 
    	j(doc)
    	.find("table#kingcounty_gov_cphContent_GridViewTaxRoll")
     	.find("tr")
     	.first().next() // this year
     	.find("td");
     	
    var prevTaxRow = 
    	j(doc)
    	.find("table#kingcounty_gov_cphContent_GridViewTaxRoll")
     	.find("tr")
     	.first().next().next() // last year
     	.find("td");
     	
    var taxRows = [currTaxRow, prevTaxRow];
    
    for (var i = 0; i < taxRows.length; i++) {
    	var taxRow = taxRows[i];
	    var taxYear = taxRow
	       .first().next().next()
	       .text();
     	
	    var taxValue = taxRow
   		  	.first().next().next().next().next().next()
   		  	.next().next().next().next().next().next()
     		.text();
    	
   	 	GM_log("Year Paid: " + taxYear);
   	 	GM_log("value: " + taxValue);

		var taxTR = j(document.createElement("tr"));
		var taxTDLeft = j(document.createElement("td"));
		var taxTDRight = j(document.createElement("td"));
		
		taxTDLeft.addClass("property_detail_label");
		taxTDLeft.addClass("left_column");
		taxTDRight.addClass("property_detail_value");
		taxTDRight.addClass("right_column");
	
		taxTDLeft.text(taxYear + " TAXED VALUE:");
		taxTDRight.html('<a href="http://info.kingcounty.gov/Assessor/eRealProperty/Detail.aspx?ParcelNbr=' + parcelNumber + '">'
			+ taxValue + '</a>');
		taxTR.append(taxTDLeft);
		taxTR.append(taxTDRight);	    
	    
	    j("table#property_basic_details").append(taxTR);
	    	    
		// Property Tax:
		j("div#public_data table#historical_data_tbl").append(taxTR);

		// Home Value Estimates
		var historicalTaxTR = j(document.createElement("tr"));
		var historicalTaxTDLabel = j(document.createElement("td"));
		var historicalTaxTDMin = j(document.createElement("td"));
		var historicalTaxTDEstimate = j(document.createElement("td"));
		var historicalTaxTDMax = j(document.createElement("td"));

		historicalTaxTDLabel.addClass("label");
		historicalTaxTDLabel.addClass("left_column");
	
		historicalTaxTDLabel.html('<a href="http://info.kingcounty.gov/Assessor/eRealProperty/Detail.aspx?ParcelNbr=' + parcelNumber + '">'
			+ 'King County Assessor ' + taxYear + '</a>');
		historicalTaxTDEstimate.html('<a href="http://info.kingcounty.gov/Assessor/eRealProperty/Detail.aspx?ParcelNbr=' + parcelNumber + '">'
			+ taxValue + '</a>');
		historicalTaxTR.append(historicalTaxTDLabel);
		historicalTaxTR.append(historicalTaxTDMin);	    
		historicalTaxTR.append(historicalTaxTDEstimate);	    
		historicalTaxTR.append(historicalTaxTDMax);	    
	  
	  
	    j("div#historical_data_external table#historical_data_tbl").append(historicalTaxTR);


	    GM_log(taxTR.html());
    }
    
}


function setup() {   
	GM_log("Setup");
	var s = document.createElement('script');
	s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
	document.body.appendChild(s);
}
	
	// This script only works for WA state listings, until we find more assessor data sources
	if (window.location.pathname.search(/^\/[A-Z]{2}\//) == 0) {

	setup();
	main();
}

}  catch (e) {
 GM_log(e);
}