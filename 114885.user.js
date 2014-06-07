// ==UserScript==
// @name          Etsy Price Range
// @description   Adds the Minimum/Maximum price dialog to the catagory view on Etsy.com
// @include       http://www.etsy.com/category/*
// @author        Colin Waddell
// @version       0.1
// 
// ==/UserScript==
//
// TODO(ish): • HTML for "Sort By" and other menu's could be added
//              but this could be over-kill for a simple script.
//            • Load the CSS for the search dialogue from Etsy.com

// Returns the current category being viewed as a
// string. Category is derived from the current url.
// Eg: The url http://www.etsy.com/category/art/print/drypoint
//       is returned as art.print.drypoint
function GetCategory() {
	
	// Return everything after the "category/" chunk of the url
	var pathname = location.pathname.slice(10);
	
	// Remove frontslashes (/) and replace with periods (.)
	var categorypath = pathname.replace(/\//gi,'.'); 
	
	return categorypath;
}


// Add some HTML to pop a basic minimum/maximum
// price search to the catrgory you are browsing
function InsertHTML() {
	
	// An update to this code would be to use the actual search box css
	// from the etsy server. The CSS file is held with a version number
	// in the url and it would be necessary to parse this. Can you retrieve
	// stylesheet url from here?
	
	// Instead of using the original CSS it is just shoehorned into the HTML.
	// The dialogue is based up the price range box from the search page.
	var insert = '<div style="background: #FCFCF9;border: 1px solid #E6E6E6;color: #666;margin: 0 0 15px;"> \
					<h3 style="font-size: 1.17em;border-bottom: 1px solid #E6E6E6;color: #111;padding: 8px 10px 7px;background-color: #F4F4F4;"> Price </h3> \
					<form action="http://www.etsy.com/search_results.php" name="price_form" style="border-spacing: 0;border-collapse: collapse;border-style: none;border-width: 0;"> \
						<p style="font-size: 1em;margin: 10px;"> \
							<input type="hidden" name="search_submit" value=""> \
							<input type="hidden" name="search_query" value=""> \
							<input type="hidden" name="search_type" value="catagory"> \
							<input type="hidden" name="category" value="' + GetCategory() + '"> \
							<input type="text" name="min" value="" id="min" style="font-size: 1em;padding: 2px 0 0;width: 44px;margin: 0 4px 0 0;"> \
							<span> to </span> \
							<input type="text" name="max" value="" id="max" style="font-size: 1em;padding: 2px 0 0;width: 44px;margin: 0 4px 0 0;"> \
							<button type="submit" style="padding: 0px 4px;"> GO </button> \
						</p> \
					</form> \
				</div>';

	var elm = document.getElementById('secondary');
	elm.innerHTML += insert;
}





// Main code
InsertHTML();