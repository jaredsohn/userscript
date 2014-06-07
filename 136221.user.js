// ==UserScript==
// @name	ladder slasher itemid viewer
// @author	xisi@d2jsp.org
// @description	for boone
// @namespace d2jsp.org
// @include	http://forums.d2jsp.org/user.php?c=*&i=*&p=*
// @version	1
// ==/UserScript==
var userid = 0;	// CHANGE THIS TO YOUR USERID ON D2JSP
function fonload()
{       
	var matches = runtest();
	var divs = document.getElementsByClassName('mpl fL',document);
	var counter = 0;
	var matches = unique(matches);
	for (i=23;i<=divs.length;i++)
	{
		old = divs[i].innerHTML;
		if (old == "No Accessory Charm" || old == "No Weapon" ||
			old == "No Armor" || old == "No Charm")
		{ } else {
			divs[i].innerHTML = old;
			var ourmatch = matches[counter];
			var theirmatch = matches[counter+1];
			var url = window.location.search.substring(1);
			var urlparts = url.split('=');
			var thisuserid = parseInt(urlparts[2]);
			if (thisuserid == userid)
			{
				createHTML(divs[i],ourmatch);
			} else {
				createHTML(divs[i],theirmatch);
			}
			counter++;
		}
	}
}
function unique(a)
{
	var r = new Array();
	o:for(var i = 0, n = a.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==a[i]) continue o;
		}
		if (a[i] >= 10000 && a[i] != userid)
		{
			r[r.length] = a[i];
		}
	}
	return r;
}
function runtest()
{
	fullhtml = document.documentElement.innerHTML;
	matching = /[\d]{4,14}/g;
	exp="<"+"!"+"--"+"([\\s\\S]+?)"+"--"+">";
	rexComment=new RegExp(exp);
	return fullhtml.match(matching);
}
function createHTML(div,id)
{
	div.innerHTML += "<br/><b>ID</b> : ";
	div.innerHTML += "<a href=http://ladderslasher.d2jsp.org/itemHistory.php?i="+id+"&c=0>"+id+"</a>";
};

fonload();