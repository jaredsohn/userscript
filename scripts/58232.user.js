// ==UserScript==
// @name           Auto perform MH search
// @namespace      hirak99
// @include        http://www.google.com/*
// @include        http://www.google.co.*/*
// @version	       1.01
// ==/UserScript==

var searchesPerDay = 50;

var before = document.getElementById('ssb');
var x = document.createElement('div');
x.style.setProperty('position','absolute','');
x.style.setProperty('top','105px','');
x.style.setProperty('left','20px','');
x.style.setProperty('font-size','8pt','');
x.style.setProperty('color','#C0C0FF','');
before.parentNode.insertBefore(x,before);

function getSearchValue() {
	var url = document.URL.split(/[?&]/);
	for (var i=1; i<url.length; ++i) {
		var eq = url[i].indexOf('=');
		if (eq==-1) continue;
		if (url[i].substr(0,eq) == 'q')
			return url[i].substr(eq+1);
	}
}

function getDays() {
	return Math.floor((new Date())/(1000*60*60*24));
}

var days = getDays();
var lastDays = GM_getValue("MHSB_LastDay",0);
//var numSearches = GM_getValue("MHSB_Searches",0);
var prevSearches;
if (days!=lastDays) prevSearches = [];
else {
	prevSearches = GM_getValue("MHSB_PrevSearches",'');
	prevSearches=(prevSearches=='' ? [] : prevSearches.split('&'));
}

var numSearches = prevSearches.length;

if (numSearches>=searchesPerDay) {
	x.innerHTML = '<p>MH Search: Already searched ' + numSearches + ' times today, stopping.<p>';
	return;
}

var searchValue = getSearchValue();

if (prevSearches.indexOf(searchValue)!=-1) {
	x.innerHTML = '<p>MH Search: Already searched keyword "' + searchValue + '" today. Total '+numSearches+' searches. Stopping.<p>';
	return;
}

prevSearches.push(searchValue);

/*
var src = "http://api.freecause.com/?action=search_pixel&amp;sd=un&amp;username=665721288&amp;tool_id=58819&amp;user_id=11717795&amp;page=1&amp;keywords="+searchValue;
//var src = "http://l.yimg.com/a/i/us/pim/dclient/cg157_18/img/md5/c71168943b90418a6ec06b74ea6517ca_1.gif";
var img = document.createElement('img');
img.setAttribute('src', src);
img.setAttribute('id', 'image_username');
img.setAttribute('name', 'image_username');

x.innerHTML = '<p>MH Search: Image loaded for keyword "'+searchValue+'". Searched '+prevSearches.length+'/'+searchesPerDay+' today.</p>';
x.appendChild(img);
GM_setValue("MHSB_LastDay", days);
GM_setValue("MHSB_PrevSearches",prevSearches.join('&'));

return;
alert('Error: Code should not reach here.');
*/






var location = 'http://search.freecause.com/search?&m=sponsored&toolid=58819&userid=11717795&p='+searchValue;

x.innerHTML = '<p>MH Search: Loading page for keyword "'+searchValue+'"...</p>';

GM_xmlhttpRequest({
  method:"GET",
  url:location,
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    },
  onload:function(details) {
	if (details.status == 200 && details.readyState == 4) {
		var src = "http://api.freecause.com/?action=search_pixel&sd=un&username=665721288&tool_id=58819&user_id=11717795&page=1&keywords="+searchValue;
		//var src = "http://l.yimg.com/a/i/us/pim/dclient/cg157_18/img/md5/c71168943b90418a6ec06b74ea6517ca_1.gif";
		var img = document.createElement('img');
		img.setAttribute('src', src);
		img.setAttribute('id', 'image_username');
		img.setAttribute('name', 'image_username');

		GM_setValue("MHSB_LastDay", days);
		//GM_setValue("MHSB_Searches",++numSearches);
		GM_setValue("MHSB_PrevSearches",prevSearches.join('&'));
//		x.innerHTML = '<p>MH Search: Searched '+prevSearches.length+'/'+searchesPerDay+' time(s) today.</p>';

		x.innerHTML = '<p>MH Search: Searched and loaded pixel for keyword "'+searchValue+'". Searched '+prevSearches.length+'/'+searchesPerDay+' today.</p>';
		x.appendChild(img);

		//document.body.innerHTML = details.responseText;
	}
	else {
		x.innerHTML = '<p>MH Search: Failed.</p>';
	}
	//setTimeout(function() {x.parentNode.removeChild(x);},2000);
  /*
    alert([
      details.status,
      details.statusText,
      details.readyState,
      details.responseHeaders,
      details.responseText
    ].join("\n"))
	*/
  }
});


/*
x=document.createElement('iframe')
document.getElementById('logo')


before = document.getElementById('logo');

before.parentNode.insertBefore(x,before);
*/