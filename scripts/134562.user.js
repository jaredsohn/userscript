// ==UserScript==
// @name		kg_jokes
// @author		un4given (u.menya.vse@zzzae.biz)
// @version		1.2
// @description	Shows random aphorism\joke while waiting game start on klavogonki.ru
// @include		http://klavogonki.ru/g/*
// @include		http://www.klavogonki.ru/g/*
// ==/UserScript==

//----

function joke()
{
	//prevent execution in iframes (FF especially likes this)
	if (window.self != window.top) return;

	//create xmlhttprequest object
	var xhr;

	try {
    	xhr = new ActiveXObject("Msxml2.XMLHTTP");
 	} catch (e) {
	    try {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
	    } catch (E) {
			xhr = false;
		}
	}
	
	if (!xhr && typeof XMLHttpRequest != 'undefined')
	{
		xhr = new XMLHttpRequest();
	}

	//get joke	
	xhr.open("POST", "http://zzzae.biz/ajax-getjoke/", true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('ajax=1&cmd=getJoke&from=' + parseInt(document.location.search.substring(6)));
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState == 4 && xhr.status == 200)
		{
			e = document.getElementById('hiddentext');
			e.style.textAlign = "left";
			e.innerHTML = xhr.responseText;
		}
	}
}

//inject script
var s = document.createElement('script');
s.innerHTML = '(' + joke + ')();';
document.body.appendChild(s);