// ==UserScript==
// @name	Projanmo Forum Repu Filter
// @match	http://forum.projanmo.com/extensions/reputation/*
// @namespace   http://forum.projanmo.com
// @description	Reputation List Filtering System for Projanmo Forum
// @version	1
// @downloadURL https://userscripts.org/scripts/source/169383.user.js
// @updateURL https://userscripts.org/scripts/source/169383.user.js
// ==/UserScript==





repu_table = document.getElementsByTagName("table")[0];

filter_div = document.createElement("div");
filter_div.style.padding = "0 0 15px 0";
filter_div.style.clear = "both";
filter_div.style.textAlign = "center";
filter_div.innerHTML = "<b>Filter Reputations by Member Name:</b>&nbsp;<input type='text' id='input_filter' size='35' /><input type='button' value='Filter' id='filter_btn' /><input type='button' value='Clear' id='filter_clear_btn' /><p style='text-align:center;font-weight:bold;color:green' id='num_repu'></p>";

repu_table.parentNode.insertBefore(filter_div, repu_table);

document.getElementById("input_filter").oninput = function()
{
	var table_to_be_filtered = repu_table;
	var table_rows = table_to_be_filtered.getElementsByTagName("tbody");
	match_found = 0;
	for (r = 0; r < table_rows.length; r++)
	{
		table_rows[r].style.display = "none";
		words_actual = this.value;
		rows_text = table_rows[r].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
		if(rows_text.indexOf(words_actual) >= 0)
		{
			table_rows[r].style.display = "table-row-group";
			match_found++;
		}
	}
	document.getElementById("num_repu").innerHTML = match_found + " Reputations by " + words_actual;
	if(this.value=="") document.getElementById("num_repu").innerHTML = "";
}

document.getElementById("filter_btn").onclick = function()
{

	var table_to_be_filtered = repu_table;
	var table_rows = table_to_be_filtered.getElementsByTagName("tbody");
	match_found = 0;
	for (r = 0; r < table_rows.length; r++)
	{
		table_rows[r].style.display = "none";
		words_actual = document.getElementById("input_filter").value;
		rows_text = table_rows[r].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
		if(rows_text.indexOf(words_actual) >= 0)
		{
			table_rows[r].style.display = "table-row-group";
			match_found++;
		}
	}
	document.getElementById("num_repu").innerHTML = match_found + " Reputations by " + words_actual;
}

document.getElementById("filter_clear_btn").onclick = function()
{
	var table_to_be_filtered = repu_table;
	var table_rows = table_to_be_filtered.getElementsByTagName("tbody");
	for (r = 0; r < table_rows.length; r++)
	{
		table_rows[r].style.display = "table-row-group";
	}
	document.getElementById("input_filter").value = "";
	document.getElementById("num_repu").innerHTML = "";

}