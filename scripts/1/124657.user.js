// ==UserScript==
// @name           snuggles
// @namespace      none
// @description    displays all troops in a single page.
// @include        http://ts7.travian.com/build.php?gid=16&filter=*
// @exclude        *page*
// ==/UserScript==

var gaul=[1,2,3,6,7,8,9];
var teuton=[0,2,5,6,7,8,9];
var roman=[2,6,7,8,9];

function setCookie(c_name,value)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + 365);
	var c_value=escape(value) +  "; expires="+exdate.toUTCString();
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
		return unescape(y);
		}
	}
	return '';
}

function extract(doc, tag, attribute, value)
{
	var i,divs = doc.getElementsByTagName(tag);
	//window.alert(divs.length);
	for (i in divs)
	{
		if(divs[i].hasAttribute(attribute))
		{
			if(value==divs[i].getAttribute(attribute))
			{
				return divs[i];
			}
		}
	}
	return "";
}

function dummy()
{
	var a=0;
}

function timeout()
{
	var a = 1000 + Math.round(Math.random()*1000);
	var t=setTimeout("dummy()",a);
	return;
}

function loadPages()
{
	var run = window.confirm('Hey, Bubba (or snuggles, or Sean)!\nWanna parse some pages?');

	if (!run){return;}

	var total = window.prompt('OK then. How much? (please use more than 1)');
	if (total < 2){return;}

	var i = 2;

	for (;i<=total;i++)
	{
		//window.alert("sorry about that - avoiding bot captcha\nyou'll get one for every page :(");
		timeout();
		var href = main+"&page="+i;
		var source = httpGet(href);
		var doc = document.createElement("div");
		doc.innerHTML=source
		var div = extract(doc, "div", "class", "data");
		main_div.appendChild(div);
	}

	window.alert('Enjoy the pages, boss!');
	
	return;
}

function colorTable(tbl)
{
	//check if enemy
	var people = parsePeople();
	var type = "";
	if (tbl.innerHTML.match("Phalanx")){type=gaul;}
	else if (tbl.innerHTML.match("Axeman")){type=teuton;}
	else if (tbl.innerHTML.match("Legionnaire")){type=roman;}
	else {return tbl;}
	
	var tbody=tbl.getElementsByTagName("tbody")[1];
	var tds=tbody.getElementsByTagName("td");
	var i,troops=[];
	for (i in tds)
	{
		troops.push(tds[i].innerHTML);
	}
	var j=0;
	for (;j<type.length;j++)
	{
		if (troops[type[j]]>0)
		{
			tbl.setAttribute("class", "troop_details inAttack");
			break;
		}
	}
	
	return tbl;
}

function parsePeople()
{
	var data = getCookie(cookie);
	var i, ppl=[];
	
	ppl = data.split("\n");
	return ppl;
}

function colorTroops()
{
	if (!(/filter=3/.test(main))){return;}
	
	var i,tables = main_div.getElementsByTagName("table");
	var new_div = document.createElement('div');
	for (i in tables)
	{
		try{var temp = (tables[i]).cloneNode(true);}catch(err){continue;}
		//temp.setAttribute("class", "troop_details inAttack");
		temp = colorTable(temp);
		new_div.appendChild(temp);
	}
	main_div.innerHTML=new_div.innerHTML;
	
	window.alert("Enjoy the colors! Red is for SEND BACK!!!");
	return;
}

function httpGet(url) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, false);
	xhttp.send(null);
	return xhttp.responseText;
}

try
{
	var main = window.location.href;
	var main_div = extract(document, "div", "class", "data");
	var cookie = "alliance";
	
	loadPages();
	colorTroops();
}
catch (err)
{
window.alert(err);
}

return;