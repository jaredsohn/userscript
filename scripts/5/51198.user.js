// ==UserScript==
// @name          Flightforum.ch / Bye-bye, Fly!
// @description   Removes posts, quoted posts, etc. by ignored users
// @include       *flightforum.ch/forum/showthread.php*
// @include       *flightforum.ch/forum/showpost.php*
// @include       *flightforum.ch/forum/private.php*
// @include       *flightforum.ch/forum/member.php*
// @exclude       
// @version       1.02
// @date          2009-10-03
// @creator       mds
// @credits       Inspired by and based on various similar scripts available at Userscripts.org (http://userscripts.org/),
// @credits       in particular 'vBulletin Total Ignore' by HaArd (http://userscripts.org/scripts/show/26567)
// ==/UserScript==

(function() 
{

	var allT;
	var plonk = new Array();
	allT  = document.getElementsByTagName('table');
	allTR = document.getElementsByTagName('tr');
	allLI = document.getElementsByTagName('li');

	// Loop to remove ignored posts
	for (var i = 0; i < allT.length; i++)
	{
		if( allT[i].innerHTML.match(/Diese Nachricht ist versteckt, da sich <strong>(.*?)<\/strong> auf Ihrer <a href=\"profile/) )
		
		{
			allT[i].style.display="none";
			// Add ignored user to list of ignored users
			plonk[RegExp.$1] = RegExp.$1;
		}
	}

	// Loop to remove ignored private messages
	for (var i = 0; i < allTR.length; i++)
	{
		if( allTR[i].innerHTML.match(/<strong>(.*?)<\/strong> auf Ihrer <a href=\"profile/) )
		{
			if(!allTR[i].innerHTML.match(/tbody/) )
			{
				allTR[i].style.display="none";
				// Add ignored user to list of ignored users
				plonk[RegExp.$1] = RegExp.$1;
			}
		}
	}
		    	
	// Loop to remove ignored visitor messages
	for (var i = 0; i < allLI.length; i++)
	{
		if( allLI[i].innerHTML.match(/Diese Nachricht ist versteckt, da sich <strong>(.*?)<\/strong> auf Ihrer <a href=\"profile/) )
		{
			allLI[i].style.display="none";
			// Add ignored user to list of ignored users
			plonk[RegExp.$1] = RegExp.$1;
		}
	}

	// Loop to remove quotes from ignored posts/private and visitor messages
	for (var i = 0; i < allT.length; i++)
	{
		for (var x in plonk)
		{
			if( allT[i].innerHTML.match("Zitat von <strong>"+plonk[x]+"</strong>") )
			{
				// allT[i].style.display="none";
				if(!allT[i].innerHTML.match(/table/) )
				{
					var TotallyIgnored = document.createElement("div");
					TotallyIgnored.innerHTML = '<blockquote><small>[Benutzer ignoriert/ausgeblendet.]</small></blockquote>';
					allT[i].parentNode.insertBefore(TotallyIgnored, allT[i]);
					allT[i].style.display="none";
				}
			}
		}
	}

})

();