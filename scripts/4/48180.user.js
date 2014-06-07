// ==UserScript==
// @name           LA Inst-a-buy
// @namespace      Legendarena
// @description    Pay for items in LA directly from your bank account
// @include        http://legendarena.com/blacksmith.php
// ==/UserScript==

var a,b,xmlhttp;

function withdraw(value,url) {

		
	
GM_xmlhttpRequest({
                    method: "POST",
                	headers: {'User-Agent':'Mozilla/4.0 (compatible) <a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a>',
                			  'Accept':'application/atom+xml,application/xml,text/xml',
                			  'Content-Type':'application/x-www-form-urlencoded'},
                    url: "http://legendarena.com/clan.php?action=withdraw",
                	data: "howmuch="+value,
                    onload: function(r) {
                        window.location = url;
                    }
                });

}

function bg(urll)
{

	xmlhttp=new XMLHttpRequest()
	xmlhttp.open("GET",urll,false);
	xmlhttp.send(null);
						
	window.location=location.href;

}

function withdrawbg(value,url) {

	
GM_xmlhttpRequest({
                    method: "POST",
                	headers: {'User-Agent':'Mozilla/4.0 (compatible) <a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a>',
                			  'Accept':'application/atom+xml,application/xml,text/xml',
                			  'Content-Type':'application/x-www-form-urlencoded'},
                    url: "http://legendarena.com/clan.php?action=withdraw",
                	data: "howmuch="+value,
                    onload: function(r) {
                        bg(url);
                    }
                });

}

function blacksmith(targ)
{
	if (targ.innerHTML.match('Buy'))
	{	
	withdraw (targ.parentNode.previousSibling.innerHTML, targ);
	}
	else {window.location = targ}	
}

function fishing(targ)
{
	if (targ.innerHTML.match('redits'))
	{
	a=targ.innerHTML.indexOf("-")+2;
	b=targ.innerHTML.indexOf("C")-1;
	withdraw(targ.innerHTML.substring(a,b),targ)
	}
	else {window.location = targ}	
}

function mining(targ)
{
	if (targ.innerHTML.match('redits'))
	{
		a=targ.innerHTML.indexOf("-")+2;
		b=targ.innerHTML.indexOf("c")-1;
		if (targ.innerHTML.match('Upgrade')) {	b=targ.innerHTML.indexOf("C")-1;}
		withdrawbg(targ.innerHTML.substring(a,b),targ)
	}
	else {window.location = targ}
	
}



document.addEventListener('click', function(event) {

    event.stopPropagation();
    event.preventDefault();
	
	switch (location.href)
	{
	case "http://legendarena.com/blacksmith.php":
		blacksmith(event.target);
		break;
	case "http://legendarena.com/fishing.php":
		fishing(event.target);
		break;
	case "http://legendarena.com/fishing.php?action=buyworkers":
		fishing(event.target);
		break;
		case "http://legendarena.com/excavationoffice.php":
		mining(event.target);
		break;
	default:
		document.write("I'm looking forward to this weekend!");
}
	
	


	
	
}, true);

