// ==UserScript==
// @name           Zombies fixer
// @namespace      Dr. Dirty Joe
// @include        http://zl.storm8.com/*
// ==/UserScript==


// fix display issues
// snippet thanks to: zappi
var links = document.getElementsByTagName('link');
for (var i = 0; i < links.length; i++) {
links[i].removeAttribute("media")
}
// end snippet from zappi

document.body.style.background='black';
document.body.style.color='white';
document.body.style.overflowX='hidden';
try
{
	document.getElementsByClassName('profileArea')[0].style.width = '320px';
	document.getElementsByClassName('topBar')[0].style.width = '100%';
	document.getElementsByClassName('topBarBg')[0].style.width = '100%';
	document.getElementById('cashTimerDiv').style.width = '100%';
} catch (e) {}


// undo their asshole-non-safari-hide-everything
        var walkDOM = function walk(node, func) {
        	  func(node);
        	  node = node.firstChild;
        	  while (node) {
        		  walk(node, func);
        		  node = node.nextSibling;
        		}
        };  
        if (!window.devicePixelRatio) {
        	var body = document.getElementsByTagName('*');
        	walkDOM(body[0], function(n) {
            	if (n.style) {
            	 n.style.display = "";
            	}
        	});
        }

// get uri variables
var urlvars = getUrlVars();

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","imhelpermenu");
menu.innerHTML = "[<a href=\"home.php\">Home</a>]";
menu.style.padding = '10px';
document.body.insertBefore(menu, document.body.children[0]);

// widen comments and things
var feed1 = document.getElementsByClassName("newsFeedItem");
for  (var i=0; i<feed1.length; i++)
	feed1[i].style.width = '90%';
var feed2 = document.getElementsByClassName("newsFeedItemMsg");
for  (var i=0; i<feed2.length; i++)
	feed2[i].style.width = '100%';

// shrink the menu
if (document.getElementsByClassName("mainMenuItem").length > 0)
{
	document.getElementsByClassName("section")[0].innerHTML = '';
}

// modify buildings page to show building efficiency
var buildings = document.getElementsByClassName("reTable");
for (var i=0; i<buildings.length; i++)
{
	var cols = buildings[i].getElementsByTagName("td");
	var returns = cols[0].getElementsByClassName("reInfoItem")[0];
	var price = (cols[2].getElementsByClassName("cash")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,''));
	if (price.lastIndexOf('K') > 0)
		price = parseInt(price) * 1000;
	else if (price.lastIndexOf('mil') > 0)
		price = parseFloat(price) * 1000000;
	
	var type = returns.innerHTML.split(":")[0];
	if (type == "Income" || type == "Defense")
	{

		var ratio = document.createElement("div");
		ratio.setAttribute('class','ratio');
		ratio.style.textAlign = 'center';
		if (type == "Income")
		{
			var field = returns.getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,'')
			if (field.lastIndexOf('mil') > 0)
				var nret = parseInt(field) * 1000000;
			else
				var nret = parseInt(field);
		}
		else
			var nret = parseInt(returns.getElementsByClassName("defense")[0].innerHTML.substr(1)) * 500;
		ratio.innerHTML = "Ratio: <b><font color=\"#00ff00\">"+(Math.round(price * 10 / nret)/10)+"</font></b>";
		cols[0].appendChild(ratio);
	}
	
}

// un-ajax the section buttons and fix sell link
var tabs = document.getElementById('sectionTabs');
if (tabs)
    tabs = tabs.getElementsByTagName('a');
else
    tabs = [];
for (var i=0; i<tabs.length; i++)
{
	if (tabs[i].href.substr(0,10) == 'javascript')
	{
		var t = getUrlVars(tabs[i].href.split('\'')[1]);
		tabs[i].href = decodeURIComponent(t['url'])+'?cat='+t['cat']
		console.log(t);
	}
}
var sells = document.getElementsByClassName('equipmentSellAction');
var cat = urlvars['cat'];
for (var i=0; i<sells.length; i++)
{
	try {
	var l = sells[i].getElementsByTagName('a')[0];
	var h = sells[i].parentNode.getElementsByClassName('equipmentBuyAction')[0].getElementsByTagName('a')[0].href.replace('action=buy','action=sell');
	l.href= h;
	} catch (e) {}
}


// condense profile views
try {
var items = document.getElementsByClassName('equipmentItems');
for (var i=0; i<items.length; i++)
{
	var nodes = items[i].childNodes;
	for (var j=0; j<nodes.length; j++)
	{
	    if (nodes[j].style)
	        nodes[j].style.cssFloat = 'left';
	}
}
var buildings = items[i-1].parentNode.nextSibling.nextSibling.childNodes; // have to use 2 nextSiblings because JS interprets the whitespace as a text node o_O
for (var i=2; i<buildings.length; i++)
{
	if (buildings[i].style)
		buildings[i].style.cssFloat = 'left';
}
} catch (e) {}

// misc functions
function getUrlVars(href) {
	var str = href || window.location.href;
	var map = {};
	var parts = str.replace(/[?&]+([^=&#]+)=([^&#]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
}