// ==UserScript==
// @name          Google's All Favicons
// @description   Use you favorite Google favicon 
// @version       1.0
// @author        rasdol (based on MkFly script)
// @namespace     http://blog.laptev.info
// @include       http://*.google.com.ua/*
// @include       https://*.google.com.ua/*
// @include       http://google.com.ua/*
// @include       https://google.com.ua/*
// @include       http://*.google.tld/*
// @include       http://google.tld/*
// @include       https://*.google.tld/*
// @include       https://google.tld/*
// @exclude       http://desktop.google.tld/*
// @exclude       http://docs.google.tld/*
// @exclude       http://google.tld/notebook/*
// @exclude       http://groups.google.tld/*
// @exclude       http://mail.google.tld/*
// @exclude       http://pack.google.tld/*
// @exclude       http://pages.google.tld/*
// @exclude       http://picasaweb.google.tld/*
// @exclude       http://toolbar.google.tld/*
// @exclude       http://sites.google.tld/*
// @exclude       http://spreadsheets.google.tld/*
// @exclude       http://webaccelerator.google.tld/*
// @exclude       http://www.google.tld/calendar/*
// @exclude       http://www.google.tld/notebook/*
// @exclude       http://www.google.tld/reader/*
// @exclude       https://docs.google.tld/*
// @exclude       https://sites.google.tld/*
// @exclude       https://spreadsheets.google.tld/*
// @exclude       https://pages.google.tld/*
// @exclude       https://groups.google.tld/*
// @exclude       https://mail.google.tld/*
// @exclude       https://www.google.tld/calendar/*
// @exclude       https://www.google.tld/health/*
// @exclude       https://www.google.tld/reader/*
// ==/UserScript==


// Select the icon you want to use  in greasemonkey menu, they changing in cyclic ordering

var EDITION;   
EDITION = 1
EDITION = ( readCookie('GED')) ? readCookie('GED') : 0;

if ( EDITION != 3 ) 
{
var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');

if (EDITION == 1) icon.setAttribute('href', 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8A//3/AP39/wD6/f8A+P3/AP/8/wD9/P8A+vz/AP/7/wD/+v8A/vr/APz6/wD4+v8A+/n/APP5/wD/+P8A+vj/AO/4/wDm+P8A2fj/AP/3/wD/9v8A9vb/AP/1/wD69f8A9PT/AO30/wD/8/8A//L/APnx/wD28P8A///+APj//gD2//4A9P/+AOP//gD//f4A6f/9AP///AD2//wA8//8APf9/AD///sA/v/7AOD/+wD/+vsA9/X7APr/+gDv/voA///5AP/9+QD/+/kA+e35AP//+ADm//gA4f/4AP/9+AD0+/gA///3APv/9wDz//cA8f/3AO3/9wD/8fcA//32AP369gDr+vYA8f/1AOv/9QD/+/UA///0APP/9ADq//QA///zAP/18wD///IA/fzyAP//8QD///AA9//wAPjw8AD//+8A8//vAP//7gD9/+4A9v/uAP/u7gD//+0A9v/tAP7/6wD/+eoA///pAP//6AD2/+gA//nnAP/45wD38eYA/fblAP/25AD29uQA7N/hAPzm4AD/690AEhjdAAAa3AAaJdsA//LXAC8g1gANH9YA+dnTAP/n0gDh5dIADyjSABkk0gAdH9EABxDRAP/l0AAAJs4AGRTOAPPczQAAKs0AIi7MAA4UywD56soA8tPKANTSygD/18kA6NLHAAAjxwDj28QA/s7CAP/1wQDw3r8A/9e8APrSrwDCtqoAzamjANmPiQDQj4YA35mBAOmefgDHj3wA1qR6AO+sbwDpmm8A2IVlAKmEYgCvaFoAvHNXAEq2VgA5s1UAPbhQAFWtTwBStU0ARbNNAEGxTQA7tEwAObZIAEq5RwDKdEYAULhDANtuQgBEtTwA1ls3ALhgMQCxNzEA2FsvAEC3LQB0MCkAiyYoANZTJwDLWyYAtjMlALE6JACZNSMAuW4iANlgIgDoWCEAylwgAMUuIAD3Vh8A52gdALRCHQCxWhwAsEkcALU4HACMOBwA0V4bAMYyGgCPJRoA218ZAJM7FwC/PxYA0msVAM9jFQD2XBUAqioVAIAfFQDhYRQAujMTAMUxEwCgLBMAnxIPAMsqDgCkFgsA6GMHALE2BAC9JQAAliIAAFYTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AsbGxsbGxsbGxsbGxsbGxd7IrMg8PDw8PDw8PUBQeJXjQYE9PcKPM2NfP2sWhcg+BzTE7dLjbmG03YWaV4JYye8MPbsLZlEouKRRCg9SXMoW/U53enGRAFzCRtNO7mTiAyliw30gRTg9VbJCKfYs0j9VmuscfLTFbIy8SOhA0Inq5Y77GNBMYIxQUJzM2Vxx2wEmfyCYWMRldXCg5MU0aicRUms58SUVeRkwjPBRSNIfBMkSgvWkyPxVHFIaMSx1/0S9nkq7WdWo1a43Jt2UqgtJERGJ5m6K8y92znpNWIYS1UQ89Mmg5cXNaX0EkGyyI3KSsp6mvpaqosaatq7axsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=');
if (EDITION == 2) icon.setAttribute('href', 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1tbUFHBwcFQAAABoAAAAaAAAAFgAAAA8AAAAWBAAAGwIAABoAAAAXAAAAGQAAABkAAAAaAAAAGg0NDRiOjo4JJiYmDwAAABQAAAATAAAADQwCAR1YFRB4nCsqua0yLMSbLCyxYxoYfBgFAiwDAQAUAAAAEgAAABMAAAAUBwcHEhQUFA0AAAAOAAAACxMEARayLy/F7T9C/640K7FuJR1pZiMgYpczMZqeLSzBIAcFPQEBABAAAAANAAAADgAAAA4XFxcJAAAACgAAAABbKSNY/1ZO/3MdHY8AAAAAAAAAAAAAAAAAAAAAjzc2lHwdG7oDAAAVAAAACAAAAAoAAAAKFxcXBgAAAAcAAAAAVj43Tfx6df87BQFmAQIAAgAAAAQAAAAEAAAAAI0vJomvLCftCwEAHQAAAAQAAAAHAAAABxEREQQAAAAEAAAAAwYEAAi4bVm0uT8/4UwOC1wnBgMlFAQAEF4YGmnwQ0X8niQfxQEAAAgAAAADAAAABAAAAAQzMzMCHh4eAh8fHwMAAAAAKSglBJVbWGfQX16qxktJsLItKNTqP0X/5DxE8VklJTsAAAAAHx8fAh8fHwIfHx8C7+/vBO3t7QTt7e0E7e3tBOrr6wIAAAAAAAAAALWHgkH+VFD/xjI226J1dDYAAAAA7e7uBO3t7QTt7e0E7e3tBP///wn///8K////Cv///wv///8Eybi3HHw1LHeySkjC/nd2/34iIZ1rbGkJ8fHxCv///wr///8K////Cv///wr///8R////E////xP///8P9OTiHtFGSNHPKS//15KSeP7k4Evgb3DOXh4cjouJiCD9/f4R////E////xP///8T////Gf///xv///8b////Dvu3rnbrNCn/o1NTk9/r6wn///8C/9fXaqskJf9kTUxX7e/vGP///xr///8b////G////yH///8k////JP///xb/0MyT00JA/5Byblv7//8d////Fv7Ix3XUNjH/hFhVee/z8x3///8j////JP///yT///8o////Lf///yz///8j//DmZNphWv+Oa2ll4urpJPHy8iLwcWDF0zEn+7edm1f///8m////LP///yz///8s////MP///zX///80////M////y77u7KoxlhZyrV/f3XSc3Oy7z83/7w5NtymioZg5OHgOf///zP///80////Nf///yv///89////Ov///zr///84////M//T0m/3oaGk/bS0uv24ubPujouw2oqIoO3j40r///83////PP///zP///8K////Mf///z7///89////Pf///z3///80////Mf///zH///8x////Mf///zX///88////Pv///zf///8SAAAAAAAAAAAAAAAAI8AAACBAAAAAAAAAEAgAAAYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');

head.appendChild(icon);     
}

//GM_registerMenuCommand( "Hello, world! (again)", hello2, "e", "shift alt", "w" );
GM_registerMenuCommand( "Change Icon", PReg );


function PReg()
{
if ( EDITION == 1 ) {EDITION = 2} else { if ( EDITION == 2 ) {EDITION = 3} else { if ( EDITION == 3 ) {EDITION = 1} } };
UpdateCookie();
location.reload();
}



function UpdateCookie()
{
var strcookie, strvalue;
strcookie = 'GED';
strvalue = EDITION.toString();
createCookie(strcookie, strvalue, 365);
}


function createCookie(strName, strValue, iDays)
{
	if (iDays)
	{
		var dtDate = new Date();
		dtDate.setTime(dtDate.getTime()+(iDays * 24 * 60 * 60 * 1000));
		var strExpires = '; expires=' + dtDate.toGMTString();
	}
	else
		var strExpires = '';

	document.cookie = strName + '=' + strValue + strExpires + '; path=/';

}

function readCookie(strName)
{
	var nameEQ = strName + '=';
	var arCookies = document.cookie.split(';');
	for(var iCounter=0; iCounter<arCookies.length; iCounter++)
	{
		var strCookie = arCookies[iCounter];
		while (strCookie.charAt(0)==' ')
			strCookie = strCookie.substring(1, strCookie.length);
		if (strCookie.indexOf(nameEQ) == 0)
			return strCookie.substring(nameEQ.length, strCookie.length);
	}
	return null;
}