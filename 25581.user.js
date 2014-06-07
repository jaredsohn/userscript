// ==UserScript==
// @name          Madigan Library Lookup
// @namespace     http://www.pct.edu/library
// @description	  Search Madigan Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(function() {

mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
if (mainmatch){
	var isbn = mainmatch[1];
	var urlSearch 
	urlSearch = "http://proteus.pct.edu/uhtbin/cgisirsi/X/0/0/123?searchdata1=" 
	urlSearch += isbn 
	urlSearch += "&srchfield1=GENERAL^SUBJECT^GENERAL^^words or phrase"
	var urlCat = "http://proteus.pct.edu/uhtbin/cgisirsi/X/0/0/60/502/X"
	var library = "Madigan Library"
	var loading = "<img src='http://www.pct.edu/library/images/misc/loading.gif'>"
    var flagME = false;
	var boldsans = document.evaluate(
		"//div[@class='buying']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	)
	var originalDIV = boldsans.snapshotItem(0).innerHTML;


	//alert("ok, we've looked for the spot at amazon.com to drop content");

	if (boldsans.snapshotLength) {
  		if (isbn)  {
			// search all locations and find the book 
			// Step 1: find the book (do they ahve it anywhere)
			var table_content = '';

			table_content = "<BR>\
                   	<div class='buying' stlye='padding-top:5px;'>\
                    <table border='0' cellspacing='0' cellpadding='0' class='moreBuyingChoices' width='215'>\
                    <tr>\
                    <td width='190' class='topLeft'>\
                    <table cellspacing='0' cellpadding='0' width='100%'><tr><td>\
                    <div style='text-align: center;  font-weight: bold; padding-bottom: 5px;'>" + library + " Availability</div>\
                    <div id='more-buying-choice-content-div'>\
                    <div class='extendedBuyBox' id='secondaryUsedAndNew'>\
                    <table cellpadding='0' cellspacing='0' border='0' width='100%'>\
					";
					
			var this_row = '<TR>';
			this_row = this_row + "<TD align='center'>" + loading + "</td>";
			//this_row = this_row + "<TD align='right'>" + "</td>";
			this_row = this_row + "</tr>";
			var rows = this_row;
			var table_content2 = table_content + rows;
			table_content2 = table_content2 + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='"+ urlCat + "'>Goto The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";	
			
			boldsans.snapshotItem(0).innerHTML = originalDIV + table_content2
			rows = ''
			this_row = ''
			
  			GM_xmlhttpRequest( { 
				method:"POST", 
				url:urlSearch,
				data:'',
    		      	 	onload:function(responseDetails) {
					var content = responseDetails.responseText;
					var arrContent = content.split("\n");
					
					for (var i=0; i < arrContent.length; i++) {
						if ( arrContent[i].match(/Material/)) {
							// inside a TR entry right now
                            i += 23
							var found=0;
							var rows = '';
									var this_row = '<TR>';
									this_row = this_row + "<TD align='center'>" + arrContent[i] + "</td>";
									//this_row = this_row + "<TD align='right'>" + "</td>";
									this_row = this_row + "</tr>";

									rows = rows + this_row;
								i = arrContent.length;
                            	flagME = true;
							table_content = table_content + rows;
						}
					}
                    if(!flagME){
                    	var this_row = '<TR>';
						this_row = this_row + "<TD align='center'>Title Not Available</td>";
						//this_row = this_row + "<TD align='right'>" + "</td>";
						this_row = this_row + "</tr>";
                        rows = this_row;
                        table_content = table_content + rows;
                        table_content = table_content + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='"+ urlCat + "'>Goto The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";
					table_content = table_content + '</table>';
					boldsans.snapshotItem(0).innerHTML = originalDIV + table_content;
                    }
					else{
					table_content = table_content + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='" + urlSearch + "'>Goto The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";
					table_content = table_content + '</table>';
					boldsans.snapshotItem(0).innerHTML = originalDIV + table_content;
                    }
      				}			});
		}	
	}
}

})();

