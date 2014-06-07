// ==UserScript==
// @name          rapidshare.com to IP
// @version       2
// @date          2009-12-2
// @namespace     http://userscripts.org
// @description   Redirect to IP of rapishare when you visit the webiste
// @copyright     Copyright 2009 saanina (saanina#gmail.com) -- Abdulrahman Alshawaiee
// @include       http://84.235.122.56/*
// @include       http://195.122.131.13/*
// @include       http://62.67.50.100/*
// @include       http://208.48.186.100/*
// @include       http://80.231.128.100/*
// @include       http://82.129.36.100/*
// ==/UserScript==

/**
* it's depend on good idea 
* http://www.swalif.net/%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA/%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9/%D9%87%D9%8A%D8%A6%D8%A9-%D8%A7%D9%84%D8%A7%D8%AA%D8%B5%D8%A7%D9%84%D8%A7%D8%AA-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9-%D8%AA%D8%AD%D8%AC%D8%A8-%D8%B1%D9%88%D8%A7%D8%A8%D8%B7/#comment-23418
*/


/**
* we need more ips here to make this works perfectly ...
*/
var DS = [
'rs299.rapidshare.com',
'rs299gc.rapidshare.com',
'rs299tg2.rapidshare.com',
'rs299cg.rapidshare.com'
];

var IPS = [
'62.67.50.100',
'208.48.186.100',
'80.231.128.100',
'82.129.36.100'
];



 // discuss at: http://phpjs.org/functions/strposs
function strpos (haystack, needle, offset) { var i = (haystack+'').indexOf(needle, (offset ? offset : 0));return i === -1 ? false : i;}

//get the current link
var blk_link = document.location.href.toString();

if(strpos(blk_link, '84.235.122.56') != false)
{
	var re = new RegExp("rapidshare.com([^&]+)", "i");
	var match = blk_link.match(re);
	var rapidlink = unescape(match[0]);

	//replace with IP
	rapidlink = rapidlink.replace("rapidshare.com", "195.122.131.13");
	//let's redirect to the ip link
	location.href = 'http://' + rapidlink;
}
else 
{
	if(document.dlf)
	{
		var form_free = document.dlf;
		alert(c = 0);
		fc();


		//change action 
		for (i=0;i<=DS.length;i++)
		{
			form_free.action = form_free.action.replace(DS[i], IPS[i]);
		}
	}
	else
	{
		var form_free = document.getElementById('ff');

		//change action 
		for (i=0;i<=DS.length;i++)
		{
				form_free.action = form_free.action.replace(DS[i], IPS[i]);
		}
	}
	form_free.submit();
}