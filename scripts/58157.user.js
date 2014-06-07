// Album Art Editions for what.cd
// Version 0.1 BETA
// 2009-09-21
// Programmed by Alan MacGregor
// ==UserScript==
// @name          Album Art Editions for what.cd
// @description   Adds Album art to specific editions
// @include       http://what.cd/torrents.php?id=*
// ==/UserScript==

var tmp = document.body.innerHTML;
var split1 = tmp.split("\n");
var output = "";
var rowcount = 0;
var header_line = 0;
var artwork = "";

for(i=0; i < split1.length; i++)
	{
		if(split1[i].indexOf("group_torrent")>-1)
			{
				if(split1[i].indexOf("font-weight")>-1) //item
					{
						rowcount++;
					}
				else //title
					{
						output = output + (rowcount + 1) + "|" + artwork + "|" + (i + 5)  + "|";
						rowcount = 0;
					}
			}
		else
			{
				if(split1[i].indexOf("<strong>Torrents</strong>")>-1)
					{
						header_line = i;
					}
				else
					{
						if(split1[i].indexOf("edition-album-art")>-1)
							{
								artwork = split1[i].split('_blank">');
								artwork = artwork[1].split("</a>");
								artwork = artwork[0];
								
							}
					}
			}
	}
output = output + (rowcount + 1) + "|" + artwork;
//alert(output);

lines = output.split("|");
//alert(lines);
lines_count = 2;
newpage = "";
for(i=0; i < split1.length; i++)
	{
				if(i==header_line)
			{
				newpage = newpage + ('<td width="20%"></td><td width="70%"><strong>Torrents</strong></td>\n');
			}
		else
			{
				if(i == lines[lines_count])
					{
						newpage = newpage + ('<td rowspan="' + lines[lines_count +1] + '" valign="top"><img src="' + lines[lines_count +2] + '" width="100"></td><td>\n');
						lines_count = lines_count +3
					}
				else
					{
						if(i == lines[lines_count] -6)
							{
								newpage = newpage + "<tr><td></td></tr></tr>\n";
							}
						else
							{
								newpage = newpage + split1[i] + "\n";
							}
					}					
		}
	}
document.body.innerHTML = newpage;