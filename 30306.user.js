// ==UserScript==
// @name           Neopets : Set SW to 'Identical'
// @namespace      http://userscripts.org/users/59662
// @description    Sets the 'Search Items' dropdown to 'identical'
// @include        http://www.neopets.com/market.phtml?type=wizard*
// @include        http://www.neopets.com/portal/supershopwiz.phtml
// ==/UserScript==

setTimeout(function()
{
    if (location.href.indexOf("portal") == -1)
    {
        document.title = "Shop Wizard";
    }
	var lists = document.getElementsByTagName("select");
	for(var i = 0; i < lists.length; i++)
    {
		if(lists[i].name == "criteria")
        {
            lists[i].options[1].selected = true;
            return true;
        }
    }
},0);