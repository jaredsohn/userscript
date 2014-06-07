// ==UserScript==
// @name           OGame Redesign: Flat Coordinates Shortcut List
// @description    Creates a "flat" list of the planet shortcuts in a table for easier selection
// @namespace      Vesselin
// @version        1.06
// @date           2011-10-20
// @include        http://*.ogame.*/game/index.php?page=fleet2*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=fleet2") == -1)
		return;
	var listVertically = true;
	var separateMoons = false;
	const header = "data:image/gif;base64," +
		"R0lGODlhmwIdAOZUABAYHxQeJhAXHgAAABUfKAYHCRMcJBUgKQYKDAwPEhAXHQ0PEw0QFAYJDAEA" +
		"AQwSFxEYHg4RFQoMDxIaIgMEBRMcIwgLDgIDBBQeJxAWHQUJCxMeJgwPExYcIwsOERUbIgoNEBUg" +
		"KBEWHBAYHhQaIRceJRAWHA4TGBAXHAYKDQ8VGwgKDQ0SFhUhKQkMDwgJDAEBAQwQFBAZIA4VGhEY" +
		"HxEZIBUfJw4RFgsPEwwRFQ0RFQQGCA0TFwsOEA8UGgUICg4VGw8WGwECAwECAgoPEwsOEggKDBQf" +
		"JwsPEhIbIhQcIw8VGggMDg0SFwgLDQMFBg0RFg8XHQkLDg8UGQAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5" +
		"BAEAAFQALAAAAACbAh0AAAf/gFSCggOFhoeHg4qLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWm" +
		"p6iphIishY6tsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8y4i7MJ0dLT1NXW19jZ2tvc3d7f" +
		"4OHi4+ALCQvo6erm0QsMA+vq5/Hy7e/05vjp0u7w8fP6pulDB1DdAAbsCtJTaBAhv4EM0x1MODAf" +
		"uYsYM2rcyLGjx2izFM1yQLKkyZMlYcBoxrKly5cwY8qcSbOmzZswVaLceTLkIFkSHggdSrSo0CZE" +
		"VghYyrSp06dQo0qdSrWq1atYs2rdyrUr1hFenYINu3QsWa1myaYNu/as27dw/+PKnUt3BZEmRvMS" +
		"lSBLZKwYEAILHkwYAg0VHJIQWMy4sePHkCNLnky5suXLmDNr3sy5s+fPoEOLHk26tOnTqFOrXv04" +
		"CQcVNArLFhyj76pYHBTo3s27t4AZRWocCUC8uPHjyJMrX868ufPn0KNLn069uvXr2LNr3869u/fv" +
		"4MOLH08e+ZEaRWYI6M2eN4eQtHK3Z/8bCQ0b5fPr38+/v///AAYo4IAEFoidDTQgod587L1Hy22s" +
		"yMegbgIAgQME+Bmo4YYcdujhhyCGKOKIzNkAAQ5ArDehbg62sgqELrjAhBMDSNgeCrqpgIMCBJDo" +
		"449ABinkkEQWGR4BCuCggv9uODL4nhNMxJgIFa5QaUgHHSjxQY0T4oiYCT0aKeaYZJZp5ploekeA" +
		"Ca8p0OR8732gBJZTVnlICXiWwCWDIwQRwxIhpCnooIQWauihG4awRAxBjDDhe3nqaciLVhaCJZ0M" +
		"MIhCFDn4cABxGJAXqnijgleqd6dyl6p2q2LXqnWvUhcrf7NOV6t0t+L6Xa62hserrOP9Wt2oB/iQ" +
		"QxRvsvfOpR3UOQCEH0S7pREWVGvttTlAEYAB3FbA7bfghivuuON6S+656IZrbrrsltvuu+CuCy+7" +
		"8s57br32iotvvt/uy6+//AZsAMD5EmyvwQcLTC7CBSt8r8MPQ7ywxBEbEAD/FDlcq7EFRgwg7ZaT" +
		"WgkhCSSTMMAQFKSs8so6yNBUBnQxBXPMM89Vc1w3v5XzWTuH1XNXP28VdMxQDa2V0VkhnbRcSh9N" +
		"V9NCEw01VzfLoMPKWFMwxAAlmxyynYaIILYINU5g9tloywDA2my37bYCbsct99x018023HbnrXfd" +
		"eO/tt999/y043YEPbvjdhye+duGKA8B444BDfvjjkutNeeV5X4653ZpvzrffMqAt+gTvjU32189W" +
		"OsAUJ7Q+gAeeJ9557IPPTnvkt0Nue+6f8+777r7PDXzwcQ9P/NvHy5683R4M0PoJUzj77CE8sGD9" +
		"644v77nx2vfefePcf4+8//jih0/+4ucrn/7k6yvfvPUs8JCIK6yAYD8I2LdPuP6Ym8//+P9TXwAR" +
		"N0ABFrB2BzRgAZt3P/wh4iexgF0CJee/CQLQggrEoAb3t0H2ddCDHxRc82LxDFhIUHchrFwFU4g+" +
		"FmaQdytkYQxTOEMaVm6ELmIELHpgQxduroY+zF4QzwdEHxbRiCnsASxe0YoahOAAUIyiFAUAwiFu" +
		"z4qxOyIWLahFK3bRi4cTgBTHeIAQ1GCJjYCFEC7Axja68QktoOIW//bFOQrRjnicYB3nuMcECqAF" +
		"T3CjIC8gBDTqsH4SSKQiF8mXHcRxg33MYyTt+MVJUjKPv9vgH3cwAEZ60v+BD0wjKyJAylKakpR8" +
		"+UEc3WKCrgCAaK+kSyzjYoJZwsWWbsElWXTZlVq+hZdeASZXANDKXMZFmK6cCzGVGTNk7rKXb2nB" +
		"Dzp5ympGIIeHRAQDtsnNbm4zAlIYAALISM5yjvGJ5kznBhaTznaqk53ujKcU10kAecozBPS0Zzzz" +
		"qc931rOf5eQnQKWIT3gONIoCPegBFrMBhUaRMRtAp0MZ6lApUrSiDyVAQzGa0YhytKMftahGQyrS" +
		"jQJUohVFwACkEAFvuvQdrGDiAFZgiJe6NAI0RYBOd8rTnvq0pyn4qVB7qoEGNGCoSE0qAop6VKU6" +
		"ladMfepTUxBVqSq1qlaQHSpWs+rTrXJVp1Q16leJKtax7tSoGjDrWdEaVLUiAK1uXWta46pTuNK1" +
		"rg3QQFvvate74nWufv3rWPfq1pm21KbdNARNq5TNGxTiBYj15g1eUIDKWvaymM2sZjfL2c569rOg" +
		"Da1oR0va0pr2tKhNrWpXy9rWuva1sI2tbGdL29qW9gU3iGw3X1AIxzKWCoEAADs=";
	const footer = "data:image/gif;base64," +
		"R0lGODlhmwIdALMIAA0QFAAAAA4RFQoNEAkLDggJDAoMDw4RFgAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAACH5BAEAAAgALAAAAACbAh0AAAT/EEkZArAg6827/2AojmRpnmiqrmzrvnAsz3Rt33iup1Y1" +
		"/ZPKZUcsGo/IpHLJbDqf0OimFwAChRipdsvter/gsHhso1p/WLJ6zW673/B413ym9OT4vH7P7/u3" +
		"dHVpf4SFhoeIiXqBZ4OKj5CRkpOUL4xWjpWam5ydnnmXV3efpKWmp6hGoWijqa6vsLGyGatBrbO4" +
		"ubq7hbV2Q7zBwsPEYL4ImcXKy8zNNbUVyc7T1NXWUxfRmNHA197f4MFUPqLS4efo6Z3jVazcWerx" +
		"8vOI7O127/T6+/xy9u7m+gkcSPDJP1vRDsAryLChQx0BFEa7h2xigYUPM2rcyOPiRIDR5ARwHEmy" +
		"JAcBE7UhnEhApMmXMBkKIJCSHL6UBgTo3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWr" +
		"WLNq3XrUQE2bFb8OGEu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHkwY7lewYQ8r" +
		"Xsy4sePHkCNLnky5suXLmDNr3sy5s+fPoEOLHk26dOVGpj/WWc26tevXsGPLnk27tu3buHPr3s27" +
		"t+/fwIMLH04cdWrEIBcXX868ufPn0KNLn069uvXr1SG3doy9u/fv4MOLH0++vPni3IFEAAA7";
	const body   = "data:image/gif;base64," +
		"R0lGODlhmwIdAJECAA0QFAAAAAAAAAAAACH5BAEAAAIALAAAAACbAh0AAAL/lB0BCu0Po5y02ouz" +
		"3rz7D4biSJbmiabqyrZupyTHfCTLi+f6zvf+DwwKh8TiIxag0WwMo/MJjUqn1Kr1qkIqZ0ys9wsO" +
		"i8fkclS7RcTM7Lb7DY/Ln+h0d47P6/f8vru+dec3SFhoeIg4AqgkmOj4CBkp2ba4tDaJmam5yalT" +
		"yXXZKTpKWmra8FkTesra6vqal6p2A1tre4tLJSvQmOv7CxycstsrbHyMnHy0kJTGu6ocLT39SgxN" +
		"jZ2tLWlNu/0NHt7X3SRufo4+Rp7O3u5+xuz87P1eb3//so6/z98fou8voMCBEAASPIjwnsGEDBua" +
		"W+gwosRpECdavAisIsaNEBxdaewIMiSnjyJLmnS0qAAAOw==";
	function drawCoordsList ()
	{
		var myTable = document.createElement ("table");
		var tableCellSpacing = 2;
		var tableCellHorizontalPadding = 0;
		var tableMargin = 5;
		var cellHorizontalPadding = 2;
		var cellBorderThickness = 2;
		var tableWidth = 667 - tableMargin * 2;
		myTable.width = tableWidth + "px";
		myTable.style.cellSpacing =  tableCellSpacing + "px";
		myTable.style.padding = "0px " + tableCellHorizontalPadding + "px";
		myTable.style.borderCollapse = "collapse";
		myTable.style.marginLeft = tableMargin + "px";
		var slBox = document.getElementById ("slbox");
		var numShortcuts = slBox.options.length - 1;
		var maxText = "";
		for (var i = 1; i < slBox.options.length; i++)
		{
			var theText = slBox.options [i].text;
			if (theText.length > maxText.length)
				maxText = theText;
		}
		var testElement = document.createElement ("span");
		testElement.appendChild (document.createTextNode (maxText));
		document.getElementById ("inhalt").appendChild (testElement);
		var maxWidth = testElement.offsetWidth;
		var numCols;
		if (maxWidth <= 0)
			numCols = 3;
		else
			numCols = Math.floor ((tableWidth - tableCellHorizontalPadding * 2 - tableCellSpacing) /
					      (maxWidth + cellHorizontalPadding * 2 + tableCellSpacing + cellBorderThickness * 2));
			document.getElementById ("inhalt").removeChild (testElement);
		var i, j, myRow;

		function createCell (myRow, width, contents, slBoxIndex, backgroundColor, className)
		{
			var myCell = myRow.insertCell (-1);
			myCell.style.width = width;
			var cellElement = document.createElement ("span");
			var cellContents = "";
			cellElement.style.display = "block";
			cellElement.style.padding = "5px " + cellHorizontalPadding + "px";
			if (contents != "")
			{
				cellContents = contents;
				cellElement.style.color = "white";
				cellElement.style.border = cellBorderThickness + "px solid transparent";
				cellElement.style.cursor = "pointer";
				cellElement.style.cursor = "hand";
				cellElement.style.whiteSpace = "nowrap";
				cellElement.style.backgroundColor = backgroundColor;
				cellElement.className = className;
				cellElement.setAttribute ("onmouseover", "this.style.borderColor = 'white';       return false;");
				cellElement.setAttribute ("onmouseout",  "this.style.borderColor = 'transparent'; return false;");
				cellElement.setAttribute ("onclick",
					"document.getElementById ('slbox').options [" + slBoxIndex + "].selected = true; " +
					"document.getElementById ('continue').focus (); " +
					"shortLinkChange (); " +
					"updateVariables (); " +
					"return false;");
			}
			cellElement.appendChild (document.createTextNode (cellContents));
			myCell.appendChild (cellElement);
			return (myCell);
		}

		if (separateMoons)
		{
			var shortcuts = [];
			for (i = 1; i <= numShortcuts; i++)
			{
				var parts = slBox.options [i].value.split ("#");
				var isMoon = parts [3] == 3;
				var coords = parts [0] + ":" + parts [1] + ":" + parts [2];
				if (parts [3] == 2)
					coords += "#" + parts [3];
				var theElement = slBox.options [i];
				var theText = theElement.text;
				var theClass = theElement.className;
				var theBackground = theElement.style.backgroundColor;
				if (isMoon)
				{
					if (typeof (shortcuts [coords]) == "undefined")
					{
						shortcuts [coords] = [];
						shortcuts [coords] [0] = "";
					}
					shortcuts [coords] [1] = theText;
					shortcuts [coords] [2] = theClass;
					shortcuts [coords] [3] = theBackground;
					shortcuts [coords] [5] = i;
				}
				else
				{
					if (typeof (shortcuts [coords]) == "undefined")
					{
						shortcuts [coords] = [];
						shortcuts [coords] [1] = "";
					}
					shortcuts [coords] [0] = theText;
					shortcuts [coords] [4] = i;
				}
			}
			for (var row in shortcuts)
			{
				myRow = myTable.insertRow (-1);
				for (j = 1; j <= 2; j++)
					if (j == 2)
						createCell (myRow, "50%", shortcuts [row] [j - 1], shortcuts [row] [3 + j], shortcuts [row] [3], shortcuts [row] [2]);
					else
						createCell (myRow, "50%", shortcuts [row] [j - 1], shortcuts [row] [3 + j], "", "");
			}
		}
		else if (listVertically)
		{
			var tableRows = Math.ceil (numShortcuts / numCols);
			for (i = 0; i < tableRows; i++)
			{
				myRow = myTable.insertRow (-1);
				for (j = 0; j < numCols; j++)
				{
					var listIndex = i + j * tableRows + 1;
					if (i + j * tableRows < numShortcuts)
						createCell (myRow, Math.floor (1000 / numCols) / 10 + "%", slBox.options [listIndex].text, listIndex, slBox.options [listIndex].style.backgroundColor, slBox.options [listIndex].className);
					else
						createCell (myRow, Math.floor (1000 / numCols) / 10 + "%", "", listIndex, "", "");
				}
			}
		}
		else
		{
			for (i = 1, j = 1; i <= numShortcuts; i++, j++)
			{
				if (j == 1)
					myRow = myTable.insertRow (-1);
				else if (j >= numCols)
					j = 0;
				createCell (myRow, Math.floor (1000 / numCols) / 10 + "%", slBox.options [i].text, i, slBox.options [i].style.backgroundColor, slBox.options [i].className);
			}
			if (j > 1)
				for (; j < numCols; j++)
					createCell (myRow, Math.floor (1000 / numCols) / 10 + "%", "", 0, "", "");
		}
		var myPanel = document.createElement ("div");
		myPanel.style.width = "667px";
		myPanel.style.marginTop = "3px";
		myPanel.style.marginLeft = "2px";
		var myHeader = document.createElement ("div");
		myHeader.style.background = "url(" + header + ") no-repeat scroll 0 0 transparent";
		myHeader.style.height = "29px";
		myHeader.style.textAlign = "center";
		var myTitle = document.createElement ("h4");
		myTitle.style.color = "#6F9FC8";
		myTitle.style.paddingTop = "9px";
		myTitle.appendChild (document.createTextNode (document.getElementById ("shortlinks tips").textContent));
		myHeader.appendChild (myTitle);
		myPanel.appendChild (myHeader);
		var myBody = document.createElement ("div");
		myBody.style.background = "url(" + body + ") repeat-y scroll 0 0 transparent";
		myBody.style.textAlign = "center";
		myBody.appendChild (myTable);
		myPanel.appendChild (myBody);
		var myFooter = document.createElement ("div");
		myFooter.style.background = "url(" + footer + ") no-repeat scroll 0 0 transparent";
		myFooter.style.height = "29px";
		myPanel.appendChild (myFooter);
		document.getElementById ("inhalt").appendChild (myPanel);
	}
	setTimeout (drawCoordsList, 0);
}
) ();
