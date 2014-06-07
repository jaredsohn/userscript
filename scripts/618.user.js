// ==UserScript==
// @name          Lakeland Library Coop Inventory Lookup
// @namespace     http://brianandmegan.com/stuff
// @description	  Search West Michigan's Lakeland Library Coop Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(function() {

mainmatch = window._content.location.href.match(/\/(\d{9}[\d|X])\//);
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
			// Step 1: find the book (do they ahve it anywhere)
			//alert("and finding the isbn worked: " + isbn);
			var table_content = '';
  			GM_xmlhttpRequest( { 
				method:"POST", 
				url:'http://lakenet.llcoop.org/search/a?a&searchtype=i&searcharg=' + isbn + '&searchscope=1',
				data:'',
    		      	 	onload:function(responseDetails) {
					var content = responseDetails.responseText;
					var arrContent = content.split("\n");
					//alert( " content has " + content.length + ' length');
					//alert( " arrContent has " + arrContent.length + ' length');

					table_content = "<BR>\
						<table style='border: 1px solid black; border-collapse: collapse;'>\
							<TR>\
								<TD colspan=2 style='background-color:#ccccff; padding:8px; font-weight:bold;'>\
									Lakeland Library Cooperative Inventory Lookup:\
								</td>\
							</tr>\
							<TR>\
								<TD style='background-color:#ddddff; padding:4px; font-weight:bold;'>Location</td>\
								<TD style='background-color:#ddddff; padding:4px; font-weight:bold;'>Status</td>\
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

					table_content = table_content + "<TR style='background-color:#ddddff; padding:4px; font-weight:bold;'><TD colspan=2><a style='color:#000000;' href='http://lakenet.llcoop.org/search/a?a&searchtype=i&searcharg=" + isbn + "&searchscope=1'>Click here to visit LakeNET</a></td></tr.";
					table_content = table_content + '</table>';
					boldsans.snapshotItem(0).innerHTML = boldsans.snapshotItem(0).innerHTML + table_content;
					//alert('tabe content = ' + table_content);
      				}	
			});
		}	
	}
}

})();
