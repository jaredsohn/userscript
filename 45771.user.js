// ==UserScript==
// @name           spyReportLand
// @namespace      no
// @description    mmm
// @include        http://www.nukezone.nu/clan.asp?Action=SpyReports&X=*
// ==/UserScript==

if (document.location.href.search('Action=SpyReports&X=') != -1
	&& document.body.innerHTML.search("Spy Satellite Report") == -1)
{
	var playername = null;
	var unparsedland = null;
	var tds = document.getElementsByTagName("td");
	var found = false;
	for ( var i = 0; i < tds.length; i++) {
		var atd = tds[i];
		if (atd.innerHTML == "Spy Plane Report")
		{
console.log('found');
			found = true;
			continue;
		}

		if (atd.innerHTML == "<b>Land:</b>" && found)
		{
			i++;
console.log(tds[i].innerHTML);
			unparsedland = tds[i].innerHTML;
			break;
		}		
	}
	    
	var sillything = unparsedland.indexOf("&");
	var mIndex = unparsedland.indexOf("m");
	var partone = unparsedland.slice(0, sillything);
	var parttwo = unparsedland.substr(mIndex - 4, 3);
console.log(unparsedland);
console.log(sillything );
console.log(mIndex );
console.log(partone );
console.log(parttwo );
	var landstr = partone.concat(parttwo);
	var landint = parseInt(landstr);    

	var currentIndex = unparsedland.indexOf("current:");
	var endIndex = unparsedland.indexOf(")");
	var currentLand = unparsedland.substr(currentIndex + 9, endIndex - currentIndex - 12);
	sillything = currentLand.indexOf("&");
	partone = currentLand.slice(0, sillything);
	parttwo = currentLand.substr(currentLand.length - 3);
	currentLandStr = partone.concat(parttwo);
	var currentLandInt = parseInt(currentLandStr); 

	var tdsp = document.getElementsByTagName("td");
	found = false;

	var bmax = 0;
	var bmin = 0;

	var test1 = 0;
	var test2 = 0;
	for (var iii = 0; iii < tdsp.length; iii++) {
		var std = tdsp[iii];
		if (std.innerHTML == "Spy Plane Report")
		{
			found = true;
			continue;
		}
		if (found)
		{
			if (std.innerHTML.search("<td>") == -1 && std.innerHTML.search("Re-spy") == -1)
			{
				var inner = std.innerHTML;
				var startBrace = inner.indexOf("(");
				var endBrace   = inner.indexOf(")");
				var minusPos   = inner.indexOf("-");
				var plusPos    = inner.indexOf("+");

				if (startBrace == -1 || endBrace == -1)
				{
					continue;
				}

				if (minusPos == -1 && plusPos == -1)
				{
					continue;
				}
				test3 = inner;

				var startStr   = inner.substr(startBrace+1, minusPos - startBrace - 1);
				var endStr     = inner.substr(minusPos+1, endBrace - minusPos - 1);
				startStr = startStr.replace(",","");
				endStr   = endStr.replace(",", "");
				var startInt = parseInt(startStr);
				var endInt   = parseInt(endStr);

				console.log("inner:"+inner + ", startInt:" + startInt + ", endInt:"+ endInt);



				if (endStr == "?")
				{
					endInt = startInt;
				}

				bmin += startInt;
				bmax += endInt;

			}
		}
	}

	bmax *=20;
	bmin *=20;
	
	var land = landint;
	
	var minfreeland = land - bmax;
	var maxfreeland = land - bmin;
	
	var newstuff = document.createElement('p');

//	newstuff.innerHTML = 'Land total:   ' + land +  ' m2, current: ' + currentLandInt + ' m2<br>' + 'Max Used by buildings:   ' + bmax + ' m2<br><br>' +

	newstuff.innerHTML = '<b>Land available:   ' + minfreeland + ' m2    +' + maxfreeland + ' m2</b><br>';
	if (currentLandInt != landint )
	{
		newstuff.innerHTML = newstuff.innerHTML.concat('<b><u><font color="#FF0000>Old spy plane report.</font></u></b><br>');
	}
	
	//newstuff.innerHTML = 'test3:' + test3 + ',test1:' + test1 + ', test2:' + test2;
	var trs = document.getElementsByTagName("table");
	for (var ii = 0; ii < trs.length; ii++) {
  		var tru = trs[ii];
  		if (tru.innerHTML.search('Buildings') != -1 && tru.innerHTML.search("<table>") == -1)
  		    {
  		    	tru.parentNode.insertBefore(newstuff, tru.nextSibling);
  		    }
	}
}