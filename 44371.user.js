// ==UserScript==
// @name                NukeLand
// @namespace           noes
// @description         frib ftw
// @include             http://*nukezone.nu/*
// ==/UserScript==

if (document.body.innerHTML.search("This is all information you can see without any use of special units. You can see more information about this user by using spy satellites or spies.") != -1)
{
	var playername = null;
	   var tds = document.getElementsByTagName("td");
	    for ( var i = 0; i < tds.length; i++) {
			var atd = tds[i];
			if (atd.innerHTML == "<b>Land:</b>")
			{
				i++;
				var unparsedland = tds[i].innerHTML;
			}		
			if (atd.innerHTML == "<b>Province Name:</b>")
			{
				i++;
				playername = tds[i].innerHTML;
			}
		}
	    
	    var sillything = unparsedland.indexOf("&");
	    var partone = unparsedland.slice(0, sillything);
	    var parttwo = unparsedland.substr(unparsedland.length - 6, 3);
	    var landstr = partone.concat(parttwo);
	    var landint = parseInt(landstr);    
	    GM_setValue("NZ_Land", landint);
	    GM_setValue("NZ_Player", playername);
}

if (document.body.innerHTML.search("Your spy got into the enemy base and sent back this information.") != -1 || document.body.innerHTML.search("Your spies got into the enemy base and sent back this information.") != -1)
{
	var playeri = GM_getValue("NZ_Player");
	var idi = playeri.slice(playeri.indexOf("#") + 1, playeri.indexOf(")"));
	
	var newstuffi = document.createElement('p');
	newstuffi.innerHTML = 'player:   ' + playeri + '<br>';
	newstuffi.innerHTML = newstuffi.innerHTML.concat('<br>http://www.nukezone.nu/clan.asp?Action=SpyReports&X=' + idi + '<br>');
	newstuffi.innerHTML = newstuffi.innerHTML.concat('<br><a href=http://www.nukezone.nu/show.asp?Action=Players&X=' + idi + '>Province info</a>');
	newstuffi.innerHTML = newstuffi.innerHTML.concat('<br><a href=http://www.nukezone.nu/clan.asp?Action=SpyReports&X=' + idi + '>Spy report</a>');
	newstuffi.innerHTML = newstuffi.innerHTML.concat('<br><a href=http://www.nukezone.nu/attack.asp?X=' + idi + '><b>Attack</b></a>');
	
	var trsi = document.getElementsByTagName("table");
	for (var iiii = 0; iiii < trsi.length; iiii++) {
  		var trui = trsi[iiii];
  		if (trui.innerHTML.search('Soldiers') != -1 && trui.innerHTML.search("<table>") == -1)
  		    {
  		    	trui.parentNode.insertBefore(newstuffi, trui.nextSibling);
  		    }
	}
}

if (document.body.innerHTML.search("Your spy plane got into the enemy base and sent back this information.") != -1)
{
	var few = 0;
	var several = 0;
	var pack = 0;
	var lots = 0;
	var many = 0;
	var crowd = 0;
	var legion = 0;
	var slegion = 0;
	
	var tdsp = document.getElementsByTagName("td");
	for (var iii = 0; iii < tdsp.length; iii++) {
		var std = tdsp[iii];
		if (std.innerHTML.search("(0-49)") != -1 && std.innerHTML.search("<td>") == -1)
		{
			few++;
		}
		if (std.innerHTML.search("(50-124)") != -1 && std.innerHTML.search("<td>") == -1)
		{
			several++;
		}
		if (std.innerHTML.search("(125-249)") != -1 && std.innerHTML.search("<td>") == -1)
		{
			pack++;
		}
		if (std.innerHTML.search("(250-499)") != -1 && std.innerHTML.search("<td>") == -1)
		{
			lots++;
		}
		if (std.innerHTML.search("(500-999)") != -1 && std.innerHTML.search("<td>") == -1)
		{
			many++;
		}
		if (std.innerHTML.search("(1,000-2,499)") != -1 && std.innerHTML.search("<td>") == -1)
		{
			crowd++;
		}
		if (std.innerHTML.search("(2,500-4,999)") != -1 && std.innerHTML.search("<td>") == -1)
		{
			legion++;
		}
		if (std.innerHTML.search("(5,000+)") != -1 && std.innerHTML.search("<td>") == -1)
		{
			slegion++;
		}
	}
	
	var bmax = few*49+several*124+pack*249+lots*499+many*999+crowd*2499+legion*4999+slegion*7499;
	var bmin = several*50+pack*125+lots*250+many*500+crowd*1000+legion*2500+slegion*5000;
	var bmaxwithoutfew = bmax - few*49;
	
	bmax *=20;
	bmin *=20;
	bmaxwithoutfew *= 20;
	
	var land = GM_getValue("NZ_Land");
	
	var minfreeland = land - bmax;
	var maxfreeland = land - bmin;
	var minfreelandfew = land - bmaxwithoutfew;
	
	var player = GM_getValue("NZ_Player");
	var id = player.slice(player.indexOf("#") + 1, player.indexOf(")"));

	var newstuff = document.createElement('p');
	newstuff.innerHTML = 'player:   ' + player + '<br>' + 'Land total:   ' + land +  ' m2<br>' + 'Used by buildings:   ' + bmaxwithoutfew + ' m2<br><br>' + '<b>Minimum land available:   ' + minfreelandfew + ' m2</b><br>';
	if (minfreelandfew <= 0)
	{
		newstuff.innerHTML = newstuff.innerHTML.concat('<b><u>Not a good target.</u></b><br>');
	}
	newstuff.innerHTML = newstuff.innerHTML.concat('<br>http://www.nukezone.nu/clan.asp?Action=SpyReports&X=' + id + '<br>');
	newstuff.innerHTML = newstuff.innerHTML.concat('<br><a href=http://www.nukezone.nu/show.asp?Action=Players&X=' + id + '>Province info</a>');
	newstuff.innerHTML = newstuff.innerHTML.concat('<br><a href=http://www.nukezone.nu/clan.asp?Action=SpyReports&X=' + id + '>Spy report</a>');
	newstuff.innerHTML = newstuff.innerHTML.concat('<br><a href=http://www.nukezone.nu/attack.asp?X=' + id + '><b>Attack</b></a>');
	
	var trs = document.getElementsByTagName("table");
	for (var ii = 0; ii < trs.length; ii++) {
  		var tru = trs[ii];
  		if (tru.innerHTML.search('System') != -1 && tru.innerHTML.search("<table>") == -1)
  		    {
  		    	tru.parentNode.insertBefore(newstuff, tru.nextSibling);
  		    }
	}
}