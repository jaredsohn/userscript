/* ScanHDPricePerGB - 0.2
Created 15/09/2006, Last Changed 18/09/2006
Copyright 2006, Released under the GPL http://www.gnu.org/copyleft/gpl.html
Created by Thomas Stewart <thomas@stewarts.org.uk>

This is a Greasemonkey user script, see http://greasemonkey.mozdev.org/

This scripts adds an extra column to the hard drive secion of the scan.co.uk
website. The price per Gb is added in this extra column.

http://www.scan.co.uk/Products/Products.asp?CatID=16

TODO:
fix pound signs
fix category table header, adjust to fill the the right
fix category table footer, adjust to fill the the right
fix category table header, add name for col
fix gap between ý/Gb and the X-I-BUY
check math
fix display to pad with 0's, eg 0.2 displayed at 0.200
improve Gb detecting, LN12881 uses '+ 500Gb'    perhaps use '^[0-9]+ '
improve Gb detecting, LN15470 uses '250G'       same
improve Gb detecting, LN8064  uses '40Gb'       same
get all hard drive categorys included, "Hard Drives - 1.8" is not

*/

// ==UserScript==
// @name          ScanHDPricePerGB
// @namespace     http://www.stewarts.org.uk/stuff
// @description	  Adds the price per GB to each hard drives on scan.co.uk
// @include       http://www.scan.co.uk/Products/Products.asp*
// ==/UserScript==

/* with a reference to a row containing a part, insert an extra column that
   contains the price per Gb*/
function addppcol(part) {
        /* pull the description field from the row, fortunatly this is easily */
        /* identified because it has a spesific class */
	var desc = document.evaluate("TD/A[@class='plstDesc']", part,
		null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        /* pull the price field from the row, unfortuantly this can only be hard */
        /* coding it to the 8th column */
	var price = document.evaluate("TD[8]", part,
		null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        /* only continue if we have one result for both the description and */
        /* price, ie make sure the above dodgy xpath worked */
	if((desc.snapshotLength == 1) && (price.snapshotLength == 1)) {
                /* get the text and find where it says Gb, then assume that */
                /* the 4th char before the occurance of Gb is the start of the */
                /* size, then assume that the size is only 3 digits */
		desc = desc.snapshotItem(0).innerHTML;
                size = desc.substring(desc.indexOf('Gb') - 4, 3); 

                /* get the price and assume that the first char is allways a ý */
		price = price.snapshotItem(0).innerHTML;
                price = price.substring(1);

                /* hard drive marketers are bastards, convert to real GB */
                size = (size * 1000 * 1000 * 1000) / 1024 / 1024 / 1024;

                /* calculate the price per Gig and round to 3 decimal places */
                ppg = price / size;
                dp = 3;
                ppg = Math.round(ppg * Math.pow(10,dp)) / Math.pow(10,dp);

                /* find find the place to insert the new col */
		var ppgcol = document.evaluate("TD[8]", part, 
			null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		ppgcol=ppgcol.snapshotItem(0);

                /* create a spacer col to seperate the price and the ppg */
		//<td rowspan="2" width="5"/>
		var tdspacer=document.createElement('td');
		tdspacer.setAttribute('rowspan','2');
		tdspacer.setAttribute('width','5');

                /* create the actual ppg col with the same style as the price */
		//<td rowspan="2" class="plstD" align="right" 
		//	nowrap="nowrap">ý67.63</td>
		var tdppg= document.createElement('td');
		tdppg.setAttribute('rowspan','2');
		tdppg.setAttribute('class','plstD');
		tdppg.setAttribute('align','right');
		tdppg.setAttribute('nowrap','nowrap');
		tdppg.innerHTML= ppg + " ý/Gb";
		
                /* add both the spacer and ppg to the table row */
		ppgcol.parentNode.insertBefore(tdppg, ppgcol.nextSibling);
		ppgcol.parentNode.insertBefore(tdspacer, ppgcol.nextSibling);
	}
}

/* Check we are in the "Hard Drives Int" section */
if (window.location.href.indexOf('CatID=16') > 0) {

	/* Get a list of the Categorys in the section */
        var category = document.evaluate("//FORM[2]//TD[@class='plstTitle']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	/* Loop over all the categorys found */
        for (var i = 0; i < category.snapshotLength; i++) {
                var categorytext = new String(
				category.snapshotItem(i).innerHTML);
		/* If the category has "Gb" in the title, that it is one */
		/* that had actual hd's in */
                if (categorytext.indexOf('Gb') != -1) {
			/* Each category is in a table, including the title   */
			/* and parts. The above xpath expression means        */
			/* we end up inside the table. So we need to back out */
			/* a good bit to the whole table that covers one      */
			/* category, and then notch along till we get to the  */
			/* start of the table of parts                        */
                        var categorytable = category.snapshotItem(i).
				parentNode.parentNode.parentNode.
				nextSibling.nextSibling.nextSibling

			/* search this category table, find a list of all the */
			/* parts in it, the assumption is that each part row  */
			/* has a checkbox in on the left col */
			var parts = document.evaluate(
				"TBODY/TR/TD[1]/INPUT[@type='checkbox']",
				categorytable, null, 
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for (j = 0; j < parts.snapshotLength; j++) {
				/* Again this xpath leaves us in the middle */
				/* of the table, so we need to back out to  */
				/* the start of the row */
				var part = parts.snapshotItem(j).
					parentNode.parentNode;
                                /* add the ppg to this row */
				addppcol(part);
			}
                }
        }
}




