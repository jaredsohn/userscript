// ==UserScript==
// @name          vBulletin Total Ignore
// @description   Removes posts by users on your ignore list, instead of just replacing them with a message that the post is hidden.
// @description2  Removes the quote portion of posts that include quoted posts from users on your Ignore List or, optionally, it can remove the entire post.
// @description3  **NEW** Now removes Private and Visitor messages from users on your ignore list.
// @include       */showthread.php*
// @include       */showpost.php*
// @include       */private.php*
// @include       */member.php*
// @exclude       
// @version       1.02
// @changes1.01	  Fixed erroneous removal of quoted text but the feature is now limited to ignored users who have posted on the current page in order to ignore their quotes.
// @changes1.02	  Added hiding of Private Messages and Visitor Messages for users on your ignore list.
// @date          2008-05-14
// @creator       HaArD
// @credits       Partial credit to these similar scripts which inspired this one (http://mybroadband.co.za/vb/showthread.php?t=23573 and http://userscripts.org/scripts/show/24465)
// @inspiration   This never would have been done without you Mel.
// ==/UserScript==

(function() 
{

	var allT;
	var plonk = new Array();
	allT  = document.getElementsByTagName('table');
	allTR = document.getElementsByTagName('tr');
	allLI = document.getElementsByTagName('li');

	// Loop to remove ignored posts.
	for (var i = 0; i < allT.length; i++)
	{
		if( allT[i].innerHTML.match(/This message is hidden because <strong>(\w+)<\/strong> is on your <a href=\"profile/) )
		{
			allT[i].style.display="none";
			//Add ignored user to list of ignored users
			plonk[RegExp.$1] = RegExp.$1;
		}
	}

	// Loop to remove ignored private messages.
	for (var i = 0; i < allTR.length; i++)
	{
		if( allTR[i].innerHTML.match(/<strong>(\w+)<\/strong> is on your <a href=\"profile/) )
		{
			if(!allTR[i].innerHTML.match(/tbody/) )
			{
				allTR[i].style.display="none";
				//Add ignored user to list of ignored users
				plonk[RegExp.$1] = RegExp.$1;
			}
		}
	}
		    	
	// Loop to remove ignored visitor messages.
	for (var i = 0; i < allLI.length; i++)
	{
		if( allLI[i].innerHTML.match(/This message is hidden because <strong>(\w+)<\/strong> is on your <a href=\"profile/) )
		{
			allLI[i].style.display="none";
			//Add ignored user to list of ignored users
			plonk[RegExp.$1] = RegExp.$1;
		}
	}

	// Loop to remove quotes from ignored posts/private and visitor messages.
	for (var i = 0; i < allT.length; i++)
	{
		for (var x in plonk)
		{
			if( allT[i].innerHTML.match("Originally Posted by <strong>"+plonk[x]+"</strong>") )
			{
				//**** Uncomment this line to Totally Ignore posts which include quoted text from people on your Ignore List ****
				//allT[i].style.display="none";

				if(!allT[i].innerHTML.match(/table/) )
				{
					var TotallyIgnored = document.createElement("div");
					TotallyIgnored.innerHTML = '<div class="smallfont" style="margin-bottom:2px; font-style:italic">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Totally Ignored.</div>';
					allT[i].parentNode.insertBefore(TotallyIgnored, allT[i]);

					allT[i].style.display="none";
				}
			}
		}
	}

})();

