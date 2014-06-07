// ==UserScript==
// @name          LION Library Search
// @namespace     http://catalog.lioninc.org
// @description	  Search LION from Amazon.
// @include       http://*.amazon.*
// ==/UserScript==

(function() {

mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
if (mainmatch){
	var isbn = mainmatch[1];
    var flagME = false;
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
			url:'http://catalog.lioninc.org/search/a?searchtype=i&searcharg=' + isbn + '&searchscope=29',
				data:'',
    		      	 	onload:function(responseDetails) {
					var content = responseDetails.responseText;
					var arrContent = content.split("\n");
					//alert( " content has " + content.length + ' length');
                    //alert( " content has " + content + ' length');
					//alert(arrContent);

					table_content = "<BR>\
                    	<div class='buying' stlye='padding-top:5px;'>\
                          <table border='0' cellspacing='0' cellpadding='0' class='moreBuyingChoices' width='215'>\
                          <tr>\
                          <td width='190' class='topLeft'>\
                          <table cellspacing='0' cellpadding='0' width='100%'><tr><td>\
                          <div style='text-align: center;  font-weight: bold; padding-bottom: 5px;'>LION Library Availability</div>\
                          <div id='more-buying-choice-content-div'>\
                          <div class='extendedBuyBox' id='secondaryUsedAndNew'>\
                          <table cellpadding='0' cellspacing='0' border='0' width='100%'>\
					";
					
					for (var i=0; i < arrContent.length; i++) {
                    //alert(arrContent[i])
						if ( arrContent[i].match(/Material/)) {
							// inside a TR entry right now
                            i += 23
                            //alert(arrContent[i] + " " + i)
							var found=0;
							var rows = '';
							//while (i<arrContent.length) {
								//if ( arrContent[i].match(/"Book"/) ) {
									//alert(" line number " + i + " contains a field: " + arrContent[i]);

									// this is the location
								//	var location = arrContent[i].replace(/.+field 1 -->&nbsp;\s+/,'');
									//this_row = this_row + arrContent[i];

									// this is the status
								//	i = i + 3; 
								//	var status = arrContent[i].replace(/.+-->&nbsp;\s+/,'');
								//	status = status.replace(/<\/td>/,'');
								//	status = status.replace(/<\/tr>/,'');

									// show bgcolor based on status
								//	var style = '';
								//	if ( status.match(/ON SHELF/) ) {
									//	style = ' style="background-color:#ddffdd"';
								//	}
									
									//this_row = this_row + arrContent[i];

									var this_row = '<TR>';
									this_row = this_row + "<TD align='center'>" + arrContent[i] + "</td>";
									//this_row = this_row + "<TD align='right'>" + "</td>";
									this_row = this_row + "</tr>";

									rows = rows + this_row;
								//}
								i = arrContent.length;
							//}
                            //if(arrContent[i] != ""){
                            	flagME = true;
                           // }
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
                        table_content = table_content + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' 

align='center' id='SDPBlock'><a href='http://catalog.lioninc.org/X'>Go to The LION Library</a></div></td></tr></table></td><td width='13' 

class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";
					table_content = table_content + '</table>';
					boldsans.snapshotItem(0).innerHTML = boldsans.snapshotItem(0).innerHTML + table_content;
					//alert('tabe content = ' + table_content);
                    }
					else{
					table_content = table_content + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div endedBuyBox' 

align='center' id='SDPBlock'><a href='http://catalog.lioninc.org/search/a?searchtype=i&searcharg=' + isbn + '&searchscope=29' >Go to LION 

Library</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' 

height='12'>&nbsp;</td></tr></table></div>";
					table_content = table_content + '</table>';
					boldsans.snapshotItem(0).innerHTML = boldsans.snapshotItem(0).innerHTML + table_content;
					//alert('tabe content = ' + table_content);
                    }
      				}			});
		}	
	}
}

})();

