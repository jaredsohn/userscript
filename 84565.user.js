// ==UserScript==
// @name          Clique Total Ignore
// @description   A special for generic chick at Low Brow Wannabe Elitists. Removes posts by users on your ignore list, instead of just replacing them with a message that the post is hidden.
// @include       http://thereisnoclique.com/snark/showthread.php*
// @include       http://thereisnoclique.com/snark/showpost.php*
// @include       http://thereisnoclique.com/snark/private.php*
// @include       http://thereisnoclique.com/snark/member.php*
// @exclude       
// @version       1.00
// @date          2010-08-26
// @creator       Mitnik {lemming22}
// ==/UserScript==

(function() 
{

	var allT;
	var plonk = new Array();
	allT  = document.getElementsByTagName('table');
	allTR = document.getElementsByTagName('tr');
	allLI = document.getElementsByTagName('li');

	for (var i = 0; i < allT.length; i++)
	{
		if( allT[i].innerHTML.match(/This message is hidden because <strong>(\w+)<\/strong> is on your <a href=\"profile/) )
		{
			allT[i].style.display="none";
			plonk[RegExp.$1] = RegExp.$1;
		}
	}

	for (var i = 0; i < allTR.length; i++)
	{
		if( allTR[i].innerHTML.match(/<strong>(\w+)<\/strong> is on your <a href=\"profile/) )
		{
			if(!allTR[i].innerHTML.match(/tbody/) )
			{
				allTR[i].style.display="none";
				plonk[RegExp.$1] = RegExp.$1;
			}
		}
	}
		    	
	for (var i = 0; i < allLI.length; i++)
	{
		if( allLI[i].innerHTML.match(/This message is hidden because <strong>(\w+)<\/strong> is on your <a href=\"profile/) )
		{
			allLI[i].style.display="none";
			plonk[RegExp.$1] = RegExp.$1;
		}
	}

	for (var i = 0; i < allT.length; i++)
	{
		for (var x in plonk)
		{
			if( allT[i].innerHTML.match("Originally Posted by <strong>"+plonk[x]+"</strong>") )
			{
			
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