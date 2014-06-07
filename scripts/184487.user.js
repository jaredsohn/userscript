// ==UserScript==
// @name       NCBI Taxonomy nucleotide record count barchart
// @namespace  http://pythonforbiologists.com/
// @version    0.1
// @description  replace nucleotide record counts in NCBI taxonomy with bars, see http://pythonforbiologists.com/index.php/adding-features-ncbi-taxonomy/
// @match      http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi*
// @copyright  2012+, You
// ==/UserScript==

// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js

// get list of nucleotide counts
var nuc_counts = $('[title="Nucleotide"]');

// calcaulate maximum nucleotide count
max_nuc_count = Math.max.apply(Math, $.map(nuc_counts, function(x,i){return parseInt(x.text.replace(/,/g,""))}))

// for each count element...
for (var i=0; i<nuc_counts.length; i++){
    var count_element = nuc_counts[i];
    
    // remove the commas from the number and turn it into an integer
    var count = parseInt(count_element.text.replace(/,/g,""));
    
    // use jquery to create a new anchor element which will link to the nucleotide records
    anchor = $('<a></a>')
    	.attr('href', count_element.href)	// use the original count as a tooltip
    	.attr('title', count_element.text); // grap the nucleotide search url from the original element
    
    // use jquery to create a new div element which will be the bar representing the nucleotide record count
    bar = $('<div>&nbsp;</div>')	// the div needs to contain a non-breaking space; if it is completely empty then it will not be displayed
    	.css('margin-bottom', 2)	// add a tiny space at the bottom so that there's a little gap between bars
    	.css('display', 'inline-block')	// force the div to display as an inline element so that it can share a line with the taxon name
    	.css('background-color', 'RoyalBlue') // pick a nice colour for the bar
    	.css('width', (count * 500) / max_nuc_count);	// calculate the width for the bar, scaled to the max
    
    // put the bar inside the anchor so that you can click on
    anchor.append(bar);	
    
    // replace the original count element with the new anchor/bar
    $(count_element).replaceWith(anchor);
}