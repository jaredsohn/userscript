// ==UserScript==
// @name           Select Mint Duplicates
// @namespace      jamespgilbert
// @include        https://wwws.mint.com/transaction.event*
// ==/UserScript==

var ctlrs = document.getElementById("controls-top");
var dbtn = document.createElement("a");
dbtn.className = "button";
dbtn.title = "Select duplicate transactions";
dbtn.innerHTML = "Select Duplicates";
dbtn.addEventListener("click", selDups, false);   
ctlrs.appendChild(dbtn);

function selDups()
{
	var trans = new Array();
	var ttble = document.getElementById("transaction-list-body");
	var trs= ttble.getElementsByTagName("tr");

	for(var t = 0; t < trs.length; t++)
	{
		var dat = "";
		var desc = "";
		var mon = "";
		var tds = trs[t].getElementsByTagName("td");
		var inp = null;
		
		for(var td = 0; td < tds.length; td++)
		{
			if(tds[td].className == "date")
			{
				dat = tds[td].textContent;
			}
			else if(tds[td].className == "description")
			{
				desc = tds[td].textContent;
			}
			else if(tds[td].className == "cat")
			{
				//var cat = tds[td].textContent;
			}
			else if(tds[td].className == "money")
			{
				mon = tds[td].textContent;
			}
			else if(tds[td].className == "checkboxes")
			{
				inp = tds[td].getElementsByTagName("input")[0];
			}
		}
		var key = dat.replace(/ /g, "") + "_" + desc.replace(/ /g, "_").replace("&amp;","_and_") + mon.replace("$", "").replace(".", "").replace(",", "");
		if(trans[key] != mon)
		{
			trans[key] = mon;
		}
		else
		{
			inp.click();
		}
	}
}