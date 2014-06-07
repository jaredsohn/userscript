// ==UserScript==
// @name           world-war fixer
// @namespace      Oliver
// @include        http://wwar.storm8.com/*
// ==/UserScript==


// fix display issues
document.body.style.background='black';
document.body.style.overflowX='hidden';
document.getElementsByClassName('topBar')[0].style.width = '100%';
document.getElementsByClassName('topBarBg')[0].style.width = '100%';
document.getElementById('cashTimerDiv').style.width = '100%';

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","wwhelpermenu");
menu.innerHTML = "[<a href=\"home.php\">home</a>] [<a href=\"missions.php\">missions</a>] [<a href=\"fight.php\">battle</a>] [<a href=\"equipment.php\">units</a>] [<a href=\"group.php\">recruit</a>] -- [<a href=\"investment.php\">buildings</a>] [<a href=\"bank.php\">vault</a>] [<a href=\"hospital.php\">restore</a>] [<a href=\"profile.php\">profile</a>] [<a href=\"favor.php\">president</a>] [<a href=\"loot.php\">loot</a>] [<a href=\"settings.php\">settings</a>]";

menu.style.padding = '10px';
document.body.insertBefore(menu, document.body.children[1]);
var links = document.getElementsByTagName('link');
for (var i = 0; i < links.length; i++) {
links[i].removeAttribute("media")
}
// widen the comments stuff
if (document.getElementsByClassName("commentTable").length > 0)
{
	var comments = document.getElementsByClassName("commentTable")[0];
	comments.style.width = '90%';
	var ctext = document.getElementsByClassName("commentText");
	for (i in ctext)
		ctext[i].style.width = '100%';
	var text = document.getElementsByTagName("textarea")[0];
	text.style.width = '90%';
	text.rows = "5";
}

// and the newsfeed
var feed1 = document.getElementsByClassName("newsFeedItem");
for (i in feed1)
	feed1[i].style.width = '90%';
var feed2 = document.getElementsByClassName("newsFeedItemMsg");
for (i in feed2)
	feed2[i].style.width = '100%';

// shrink the menu
if (document.getElementsByClassName("mainMenuItem").length > 0)
{
	document.getElementsByClassName("section")[0].innerHTML = '';
}


// modify buildings page to show building efficiency
var buildings = document.getElementsByClassName("reTable");
for (var i=0; i<buildings.length  ; i++)
{
	var cols = buildings[i].getElementsByTagName("td");
	var returns = cols[0].getElementsByClassName("reInfoItem")[0];
	var price = (cols[2].getElementsByClassName("cash")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,''));
	if (price.lastIndexOf('K') > 0)
		price = parseInt(price) * 1000;
	else if (price.lastIndexOf('mil') > 0)
		price = parseFloat(price) * 1000000;
else if (price.lastIndexOf('bil') > 0)
price = parseFloat(price) * 1000000000;


	
	var type = returns.innerHTML.split(":")[0];
	if (type == "Income" || type == "Defense")
	{

		var ratio = document.createElement("div");
		ratio.setAttribute('class','ratio');
		ratio.style.textAlign = 'center';
		if (type == "Income")
			var nret = parseInt(returns.getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,''));
		else
			var nret = parseInt(returns.getElementsByClassName("defense")[0].innerHTML.substr(1)) * 500;
		ratio.innerHTML = "Ratio: <b><font color=\"#00ff00\">"+(Math.round(price * 10 / nret)/10)+"</font></b>";
		cols[0].appendChild(ratio);
	}
	
}