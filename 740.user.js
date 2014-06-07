// ==UserScript==
// @name          Pure Google
// @description	  Cleans Google's interface of extraneous links and text.
// @namespace     http://justinsomnia.org/
// @include       http://google.*/
// @include       http://www.google.*/
// ==/UserScript==

(function() {
	// get all the tables used to layout the interface (tsk tsk tsk)
	tables = document.getElementsByTagName("table");
	
	// check if google logo is spliced in the first table
	// which occurs in most of the international logos
	// length greater than 1 is a fix for xhosa and bork bork bork
	// which both have a single pixel image in the table at the top
	if (tables[0].getElementsByTagName("img").length > 1)
	{
		table_to_delete = 1;
	}
	else
	{
		table_to_delete = 0;
	}

	// remove google "search type" links
	tables[table_to_delete].setAttribute("style", "display:none;");
	
	// remove table cells on either side of search box
	search_table = tables[table_to_delete + 1];
	search_table_cells = search_table.getElementsByTagName("td");
	search_table_cells[0].setAttribute("style", "display:none;");
	search_table_cells[2].setAttribute("style", "display:none;");
	
	// some sites have extra rows which contain radio buttons
	// to limit search to country or the whole web
	seach_table_rows = search_table.getElementsByTagName("tr");
	for (var i = 1; i < seach_table_rows.length; i++)
	{
		seach_table_rows[i].setAttribute("style", "display:none;");
	}

	// remove buttons
	inputs = document.getElementsByTagName("input");
    inputs[2].setAttribute("style", "display:none;");
    inputs[3].setAttribute("style", "display:none;");
	
	// remove boilerplate copyright (hmm... legality?)
	paragraphs = document.getElementsByTagName("p");
	for (var i = 0; i < paragraphs.length; i++)
	{
		paragraphs[i].setAttribute("style", "display:none;");
	}

	// remove misc business related links stored in font tags (tsk tsk tsk)
	fonts = document.getElementsByTagName("font");
	for (var i = 0; i < fonts.length; i++)
	{
		// some language names are integrated into the table that splices
		// the google logo. sometimes the language name is an image,
		// other times it's a font tag. this if-statement prevents hiding
		// font tags nested in table cells
		if (fonts[i].parentNode.nodeName != "TD" && fonts[i].parentNode.nodeName != "td")
		{
			fonts[i].setAttribute("style", "display:none;");
		}
	}

	// for whatever reason, the Korean interface has some links in a span
	// thankfully this doesn't break any other pages
	spans = document.getElementsByTagName("span");
	for (var i = 0; i < spans.length; i++)
	{
		spans[i].setAttribute("style", "display:none;");
	}

})();