// ==UserScript==
// @name          Amazon LCLS Lookup
// @namespace     http://lycolibrary.org/
// @description	  Search LCLS Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(function() {

mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
if (mainmatch){
	var isbn = mainmatch[1];
	var boldsans = document.evaluate(
		"//div[@class='buying']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	)

	//alert("ok, we've looked for the spot at amazon.com to drop content");

	if (boldsans.snapshotLength) {
  		if (isbn)  {
			// search all locations and find the book 
			// Step 1: find the book (do they have it anywhere)
			//alert("and finding the isbn worked: " + isbn);
			var table_content = '';
  			GM_xmlhttpRequest( { 
				method:"POST", 
				url:'http://lyco.sirsi.net/uhtbin/cgisirsi/X/0/0/123?searchdata1=' + isbn + '&srchfield1=GENERAL^SUBJECT^GENERAL^^words or phrase',
				data:'',
    		      	 	onload:function(responseDetails) {
					var content = responseDetails.responseText;
					var arrContent = content.split("\n");
					//alert( " content has " + content.length + ' length');
					//alert( " arrContent has " + arrContent.length + ' length');

					table_content = "<BR>\
<table style='border-collapse:collapse;'>\
							<TR>\
								<TD style='background-color:#FEF76E; padding:8px; font-weight:bold;'>\
Save money, borrow this book from the Lycoming County Library System\
								</td>\
							</tr>\
					";
					
					for (var i=0; i < arrContent.length; i++) {
						if ( arrContent[i].match(/<tr\s+class="bibItemsEntry">/) ) {
							// inside a TR entry right now
							var found=0;
							var rows = '';
							while (i<arrContent.length) {
								if ( arrContent[i].match(/<!-- field 1 -->&nbsp;\s+(.+)/) ) {
									//alert(" line number " + i + " contains a field: " + arrContent[i]);

									// this is the location
									var location = arrContent[i].replace(/.+field 1 -->&nbsp;\s+/,'');
									//this_row = this_row + arrContent[i];

									// this is the status
									i = i + 3; 
									var status = arrContent[i].replace(/.+-->&nbsp;\s+/,'');
									status = status.replace(/<\/td>/,'');
									status = status.replace(/<\/tr>/,'');

									// show bgcolor based on status
									var style = '';
									if ( status.match(/ON SHELF/) ) {
										style = ' style="background-color:#ddffdd"';
									}
									
									//this_row = this_row + arrContent[i];

									var this_row = '<TR' + style + '>';
									this_row = this_row + "<TD>" + location + "</td>";
									this_row = this_row + "<TD" + style + ">" + status + "</td>";
									this_row = this_row + "</tr>";

									rows = rows + this_row;
								}
								i++;
							}
							table_content = table_content + rows;
						}
					}

					table_content = table_content + "<TR style='background-color:#ffffff; padding:8px; font-weight:bold;'><TD colspan=2><a style='color:#000000;' href='http://lyco.sirsi.net/uhtbin/cgisirsi/X/0/0/123?searchdata1=" + isbn + "&srchfield1=GENERAL^SUBJECT^GENERAL^^words or phrase'>Check if this title is available</a></td></tr>";
					table_content = table_content + '</table>';
					boldsans.snapshotItem(0).innerHTML = boldsans.snapshotItem(0).innerHTML + table_content;
					//alert('tabe content = ' + table_content);
      				}			});
		}	
	}
}

})();