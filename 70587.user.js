// ==UserScript==
// @name           Nordnet summera insättningshistorik
// @namespace      se.nordnet.insattningshistorik
// @description    Summerar insättningshistoriken på Nordnet.se
// @include        https://www.nordnet.se/mux/web/depa/overforingar/insattningar.html
// @include        https://nordnet.se/mux/web/depa/overforingar/insattningar.html
// @version				 1.0
// ==/UserScript==
(function ()
{
	function summarizeHistory()
	{
	  try
	  {
			var history = document.getElementById("sidebar_overforingshistorik");
			var tbody = history.getElementsByTagName("tbody")[0];
			var trs = tbody.getElementsByTagName("tr");
			var tr;
			var tds;
			var td;
			var sum = 0;
			var i;
			for (i = 0; i < trs.length; i += 1)
			{
			  tds = trs[i].getElementsByTagName("td");
			  td = tds[3];
			  sum += 1 * (td.firstChild.nodeValue.replace(" ", "").replace(",", "\."));
			}
			tbody.innerHTML += "<tr style=\"border-top:1px solid black\"><td></td><td></td><td></td><td style=\"border-top: 1px solid black; font-weight:bold\">" + sum + "</td><td></td></tr>";
			
			delete unsafeWindow.Banner;
	  }
	  catch (error)
	  {
	    alert("summarizeHistory error " + error);
	  }
	};

	function onHistoryClick()
	{
		unsafeWindow.Banner = {};
		unsafeWindow.Banner.visaDoljHuvuderbjudande = function ()
		{
		  setTimeout(summarizeHistory, 1000);
		};
		unsafeWindow.Banner.visaDoljAllaErbjudanden = function ()
		{
		};
	}

	try
	{
	  document.getElementById("sideBarOverforingshistorik").addEventListener("click", onHistoryClick, false);
	}
	catch (error)
	{
		alert(error);
  }
})();