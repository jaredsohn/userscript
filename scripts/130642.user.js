// ==UserScript==
// @name           Travian crop stat
// @namespace      http://userscripts.org
// @description    Crop counter
// @author         Vladimir Jossifov
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http*://*.travian.*
// @include        http*://*/*.travian.*
// @include        http*://www.vfthis.net/*/*
// @exclude     http*://*.travian*.*/hilfe.php*
// @exclude     http*://*.travian*.*/log*.php*
// @exclude     http*://*.travian*.*/index.php*
// @exclude     http*://*.travian*.*/anleitung.php*
// @exclude     http*://*.travian*.*/impressum.php*
// @exclude     http*://*.travian*.*/anmelden.php*
// @exclude     http*://*.travian*.*/gutscheine.php*
// @exclude     http*://*.travian*.*/spielregeln.php*
// @exclude     http*://*.travian*.*/links.php*
// @exclude     http*://*.travian*.*/geschichte.php*
// @exclude     http*://*.travian*.*/tutorial.php*
// @exclude     http*://*.travian*.*/manual.php*
// @exclude     http*://*.travian*.*/manual.php*
// @exclude     http*://*.travian*.*/ajax.php*
// @exclude     http*://*.travian*.*/ad/*
// @exclude     http*://*.travian*.*/chat/*
// @exclude     http*://forum.travian*.*
// @exclude     http*://board.travian*.*
// @exclude     http*://shop.travian*.*
// @exclude     http*://*.travian*.*/activate.php*
// @exclude     http*://*.travian*.*/support.php*
// @exclude     http*://help.travian*.*
// @exclude     *.css
// @exclude     *.js

// @version        0.1
// ==/UserScript==


function httpGet(url)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    return xhttp.responseText;
}

function extract(doc, tag, attribute, value)
{
    var i,divs = doc.getElementsByTagName(tag);
    //window.alert(divs.length);
    for (i in divs)
    {
        if(divs[i].hasAttribute(attribute))
        {
            if(value==divs[i].getAttribute(attribute))
            {
                return divs[i];
            }
        }
    }
    return "";
}

function plot()
{
    var n;
    var temp = extract(document, "a", "class", "last");
   
    if(''==temp){return;}
   
    var href = temp.href;
   
    var page = href.substring(0, href.lastIndexOf('=')+1);
    var count = href.substring(href.lastIndexOf('=')+1);
    count = parseInt(count);
   
	var SW = new Array(high);
	var SE = new Array(high);
	var NW = new Array(high);
	var NE = new Array(high);
	for (i=0;i<high;i++)
	{
		SW[i] = 0;
		SE[i] = 0;
		NW[i] = 0;
		NE[i] = 0;
	}
	var prnt2 = "\tNW\tNE\tSW\tSE\n";
	   
    var tbody = document.getElementsByTagName("tbody")[1];
    tbody.innerHTML = '';
	
    var i, text='';
    for (i = 1 ; i <= Math.min(pages,parseInt(count)); i++)
    {
        href = page.concat(i);
        var html = httpGet(href);
        var table = html.substring(html.lastIndexOf('<tbody>')+10, html.lastIndexOf("</tbody>")-10);
        text = text.concat(table);
    }
   
    tbody.innerHTML = text;
	
	var cropper = document.getElementsByTagName("table")[1];
	for (i in cropper.rows)
	{
		if(i==0){continue;}
		var row = cropper.rows[i];
		var x = extract(row, "span", "class", "coordinateX").innerHTML.substring(1);
		var y = extract(row, "span", "class", "coordinateY").innerHTML;
		var dist = extract(row, "td", "class", "dist").innerHTML.replace(/^\s+|\s+$/g,"");
		var type = extract(row, "td", "class", "typ").innerHTML.replace(/^\s+|\s+$/g,"").replace(" cropper","");
		var bonus = extract(row, "td", "class", "oase").innerHTML;
		bonus = bonus.substring(52, 60).replace(/^\s+|\s+$/g,"");
		bonus = bonus.replace("\%","");
		var quad = "";
		if(y[0]=='-'){quad="S";}else{quad="N"}
		if(x[0]=='-'){quad+="W";}else{quad+="E"}
		var distance = parseFloat(dist);
		if (distance > high)
		{
			break;
		}
		if (distance < low)
		{
			continue;
		}
		if (quad=="NE"){NE[parseInt(distance)]++;}
		if (quad=="NW"){NW[parseInt(distance)]++;}
		if (quad=="SE"){SE[parseInt(distance)]++;}
		if (quad=="SW"){SW[parseInt(distance)]++;}
	}
	for (i=0;i<high-1;i++)
	{
		NW[i+1]+=NW[i];
		NE[i+1]+=NE[i];
		SW[i+1]+=SW[i];
		SE[i+1]+=SE[i];
		prnt2 = prnt2.concat(i, "\t", NW[i], "\t", NE[i], "\t", SW[i], "\t", SE[i], "\n");
	}
		prnt2 = prnt2.concat(i, "\t", NW[i], "\t", NE[i], "\t", SW[i], "\t", SE[i], "\n");
	alert(prnt2);
	
    return;
}

try
{
    var path = window.location.href;
    if (/cropfinder.php/.test(path))
    {
		pages = 50 // enough to get dist of 200
		low = 22; // distance - this is grey
		high = 150; // yours to choose
        plot();
    }
}
catch (err)
{
	window.alert(err);
}
