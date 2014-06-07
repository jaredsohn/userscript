// ==UserScript==
// @name           ftp : display file size in bytes
// @namespace      http://www.prohardver.hu
// @include        ftp://*
// ==/UserScript==

window.addEventListener(
	"load",
	function()
	{
		var rows = document.getElementsByTagName("tr");
		
		for (var n = 0; n < rows.length; n++)
		{
			var row = rows[n];
			var cells = row.getElementsByTagName("td");
			if (cells.length == 4)
			{
				var cell = cells[1];
				var size = cell.getAttribute("sortable-data");
				if (size == null)
					continue;

				var text = size.substr(0, size.length % 3);
				for (var n1 = size.length % 3; n1 < size.length; n1 += 3)
				{
					if (text != "")
						text += " ";
					
					text += size.substr(n1, 3);
				}
				
				cell.innerHTML = text + " byte" + (size != "0" && size != "1" ? "s" : "");
			}
		}
	}, false);
