// ==UserScript==
// @name          Code tags
// @namespace     Code tags
// @include       http://*bungie.net/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");
for (var i = 0; i<divs.length; i++)
{
	if(divs[i].getAttribute("class") == "postbody")
	{	
		while (divs[i].innerHTML.indexOf("[code]") != -1)
		{	  
			var newstr = "";
			var workingstr;
			var indentNum = 0;
			var codeStart = divs[i].innerHTML.indexOf("[code]");
			var codeEnd = divs[i].innerHTML.indexOf("[/code]");
			if (codeStart != 0)
				newstr = newstr + divs[i].innerHTML.substring(0,codeStart);
			if (codeEnd == -1)
				workingstr = divs[i].innerHTML.substring(codeStart+6,divs[i].innerHTML.length);
			else
				workingstr = divs[i].innerHTML.substring(codeStart+6,codeEnd);
			newstr = newstr + "<span class=\"IBBquotedtable\"style=\"font-family:lucida console\"><b>Code:</b><br/>";
			var lastEndChar = ' ';
			var lines = new Array();
			lines = workingstr.split("<br>");
			var ignore1 = false;
			var ignore2 = false;
			for (var j = 0; j<lines.length; j++)
			{
				var firstChar = true;
				for (var k = 0; k < lines[j].length; k++)
				{
					var thisChar = lines[j].charAt(k);
					if (firstChar && !ignore1 && !ignore2)
					{
						if (thisChar == ' ' || thisChar == '\t' || thisChar == ' ')
							continue;
						if (thisChar == '#')
						{
							newstr = newstr+lines[j].substring(k,lines[j].length);
							break;
						}
						firstChar = false;
						for (var m = 0; m < indentNum; m++)
						{
							if (m == indentNum-1)
							{
								if (thisChar == '}')
									break;
								if (lastEndChar == ')' && thisChar != '{')
									newstr = newstr+"    ";
							}
							newstr = newstr+"    ";
						}
					}
					firstChar = false;
					if (!ignore1 && thisChar == '/' && k < lines[j].length-1 && lines[j].charAt(k+1) == '*')
						ignore2 = true;
					if (!ignore1 && thisChar == '*' && k < lines[j].length-1 && lines[j].charAt(k+1) == '/')
						ignore2 = false;
					if (!ignore2 && thisChar == '\"')
						ignore1 = !ignore1;
					if (!ignore1 && !ignore2)
					{
						if (thisChar == '/' && k < lines[j].length-1 && lines[j].charAt(k+1) == '/')
						{
							newstr = newstr+lines[j].substring(k,lines[j].length);
							break;
						}
						if (thisChar == '\'')
						{
							lastEndChar = '\'';
							newstr = newstr+lines[j].substring(k,k+3);
							k = k+2;
							continue;
						}
						if (thisChar == '{')
							indentNum++;
						if (thisChar == '}')
							indentNum--;
						lastEndChar = thisChar;
						if (thisChar == 'e' && k > 2 && lines[j].charAt(k-3) == 'e'
						    && lines[j].charAt(k-2) == 'l' && lines[j].charAt(k-1) == 's')
							lastEndChar = ')';
					}
					newstr = newstr+thisChar;
				}
				newstr = newstr+"<br/>"
			}
			newstr = newstr+"</span>";
			if (codeEnd != -1)
				newstr = newstr + divs[i].innerHTML.substring(codeEnd+7,divs[i].innerHTML.length);
			divs[i].innerHTML = newstr;	
		}
	}
}