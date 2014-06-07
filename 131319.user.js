// ==UserScript==
// @name           Ex.Ua Alive Indicator
// @version        1.1
// @auther         mailto:NazarenkoAl@gmail.com
// @namespace      EUAI
// @license        GNU GPL v2.0
// @description    Цветовой индикатор, показывающий доступность файлов по ссылке
// @include        http*://www.ex.ua/*
// @match          http://www.ex.ua/*
// @match          http://ex.ua/*
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAHwSURBVFjD7ZRPaxRBEMV/tVnHU76RF/EgSA6Kgh6EqIhBwn4AQVBE8BoIHoQQJARiQERFBAkhhPg1vGpgZ3Zigswssbs8TM9fd81MPAX69WV6ul+9qlc1Ax4eHh4eZwDyVdtcuyD5U3m/fPc3yls95eS1X5M6ZIyi7E1NbU8zXsg3epY2q4orkpBisexOlNjVjDMkZF76GTniF8dTC7aN/Zx8VEsA7OjFhlE7mkcc8UBAthXgB7f/4egkvNfzBABcqjC3XU0RMQsC5BZ1jA5cldQZtVUYteXMCYlceMoedMe1QuKL5lamWEJCHhYZ9wwGcyoBuC4JCQbDZwW4LAnfCVmsGCKfFGDIXfdUYq6Vb280cL3I7i/roMZzFRjA1NZ+m+jALek5xgcFGDTSqlhUF2hvmi047yZ8F+47sMARw8pBqz8I8FZtbXejUUHfAGCA+e6zyqZm/JiAgHPApt6s9+D0Ywobbu5HxNyTlDEWy0at+P8Y03XNuBERjwTuS0KKwbBekXAVzHYOv1bJ/rEzZaGoYq2QkNetunmn0Z+cdcBPntTOXmrWi5zT6nc9bMituuxjDhrhYbGoYlVbC9SLXCnCxzydMHkDGTuJFQVZ0tGJBlmeF4Fe6RGHABzzYupgP9PfQJ+Zzr318PDwOJP4A2/tS62XtPRFAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEwLTAxLTAyVDE3OjAxOjQyKzAwOjAwNlBpNwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0wMS0wMlQxNzowMTo0MiswMDowMEcN0YsAAAAASUVORK5CYII=
// ==/UserScript==

(function(){
var SUPPORTED_TABLE_CLASSES = ["include_0", "panel"]
var BASIC_REQUEST_HEADER = {
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	'Accept': 'application/atom+xml,application/xml,text/xml'
	};
var OUT_START     = "<div style='width: 100%; clear: both'>"
var OUT_AVAIL     = "<div style='background-color: #00C000; width: 10px; height: 10px; float: left; margin-left: 1px; margin-right: 1px'></div>"
var OUT_UNAVAIL   = "<div style='background-color: #C00000; width: 10px; height: 10px; float: left; margin-left: 1px; margin-right: 1px'></div>"
var OUT_AVAIL_S   = "<div style='background-color: #00C000; width: 6px; height: 6px; float: left; position: relative; margin: 2px'></div>"
var OUT_UNAVAIL_S = "<div style='background-color: #C00000; width: 6px; height: 6px; float: left; position: relative; margin: 2px'></div>"
var OUT_END       = "</div>"
var LARGE_LIMIT = 524288000; //500 MB
var DISP_LIMIT = 0;

function create_cell_onlad(cell)
{
	return function(resp_details)
	{
		if (resp_details.status != 200)
			return;

		// Find table with 'list' class
		var istart = resp_details.responseText.search(/<table\s[^\>]*class\s*=\s*[\'\"]*list[\'\"]*/im);
		if (istart == -1)
			return;
		var sstr = resp_details.responseText.slice(istart);
		var iend = sstr.search(/<\/table>/im);
		if (iend == -1)
			return;
		sstr = sstr.slice(0, iend);

		var out_indicator = OUT_START;
		var rows = sstr.split(/<\/tr>/im)
		var show_indicator = false;
		for (var i = 1; i < rows.length - 1; ++i)
		{
			var avail = (rows[i].search(/<a\s*href\s*=\s*[\'\"]\/get\//im) != -1);

			var disp = false;
			var large = false;
			var matches = rows[i].match(/<b>([0-9,]+)<\/b>/im);
			if (matches != null && matches.length > 1)
			{
				var size = parseInt(matches[1].replace(/,+/g, ""), 10)
				if (size > DISP_LIMIT)
				{
					show_indicator = true;
					large = size > LARGE_LIMIT;
					out_indicator += avail ? (large ? OUT_AVAIL : OUT_AVAIL_S) : (large ? OUT_UNAVAIL : OUT_UNAVAIL_S);
				}
			}
		}
		out_indicator += OUT_END;

		if (show_indicator)
		{
			var newp = document.createElement("p");
			newp.innerHTML = out_indicator;
			cell.appendChild(newp)
		}
	}
}

function process_cell(cell)
{
	var atags = cell.getElementsByTagName("a");
	if (atags != null && atags.length != 0)
	{
		var atag = atags[0];
		if (atag.hasAttribute("href"))
		{
			var url = atag.getAttribute("href");
			if (url.charAt(0) == "/")
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					headers: BASIC_REQUEST_HEADER,
					onload: create_cell_onlad(cell) 
				});
		}
	}
}

function process_table(table)
{
	var all_cells = table.getElementsByTagName("td");
	for (var i in all_cells)
		process_cell(all_cells[i]);
}

function on_doc_loaded()
{
	var all_tables = document.getElementsByTagName("table");
	for (var i in all_tables)
		for (var j in SUPPORTED_TABLE_CLASSES)
			if (all_tables[i].className == SUPPORTED_TABLE_CLASSES[j])
			{
				process_table(all_tables[i]);
				break;
			}
}
on_doc_loaded();

})();