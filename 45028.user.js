// ==UserScript==
// @name           Freescreencast Extra Functionality
// @namespace      http://userscripts.org/users/75950
// @description    Freescreencast sort by date or time
// @include        http://freescreencast.com/screencasts
// @version        1.0.7
// ==/UserScript==

var listelem = Array();
var elem = Array();
var listelements = Array();
var dates = Array();
var newelem;
var anzahl;
var seitenzahl;
var currpage;
var ResultCount;

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function DoRequest() {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://freescreencast.com/screencasts?page='+currpage,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/html',
	    },
	    onload: function(responseDetails) {
	    	newelem=document.createElement('div');
	        newelem.innerHTML=responseDetails.responseText;
	        newelem=newelem.getElementsByClassName('scList')[0].getElementsByTagName('li');
	        insertNodes(newelem);
	    }
	});
}

function insertNodes(nodesdom) {
	listelem = document.getElementsByClassName('scList')[0].getElementsByTagName('li');
	firstelem = listelem[0];
	
	for(i=0; i<nodesdom.length; i++) {
		newli=document.createElement('li');
		newli.innerHTML = nodesdom[i].innerHTML;
		document.getElementsByClassName('scList')[0].insertBefore(newli,firstelem);
	}
	currpage++;
	if(currpage<=seitenzahl) {
	  	ResultCount=document.getElementById('resultCount');
	  	ResultCount.innerHTML='Loading.... page '+currpage+' of '+seitenzahl;
	  	DoRequest();
	} else {
	  	ResultCount=document.getElementById('resultCount');
	  	ResultCount.innerHTML='Sorting...';
		window.setTimeout(SortThemByDate, 1000);
	}  	
}

function SortThemByDate() {
	dates=Array();
	listelements=Array();
  	ResultCount=document.getElementById('resultCount');
  	listelem = document.getElementsByClassName('scList')[0].getElementsByTagName('li');
  	for(i=0; i<listelem.length; i++) {
  		listelements.push(trim(listelem[i].innerHTML));
  	}
  	elem = document.getElementsByClassName('scCreated');
  	for(i=0; i<elem.length; i++) {
  		var aContent = elem[i].innerHTML;
  		if(aContent.indexOf('/')!=-1) {
	  		dates.push(trim(aContent.substring(aContent.indexOf('/')-2)));
	  		dates[i]='20'+dates[i].substring(6,8)+'-'+dates[i].substring(0,2)+'-'+dates[i].substring(3,5);
	  	} else {
	  		dates.push(aContent.substring(aContent.indexOf('-')-4));
	  	}
  	}
  	for(i=0; i<dates.length-1; i++) {
  		for(j=i+1; j<dates.length; j++) {
  			if(dates[i]<dates[j]) {
  				// Tauschen
  				helpme = dates[i];
  				dates[i]=dates[j];
  				dates[j]=helpme;
  				helpme = listelements[i];
  				listelements[i]=listelements[j];
  				listelements[j]=helpme;
  			}
  		}
  	}
  	for(i=0; i<dates.length; i++) {
  		listelem[i].innerHTML=listelements[i];
  	}
  	elem = document.getElementsByClassName('scCreated');
  	for(i=0; i<elem.length; i++) {
  		elem[i].innerHTML = 'created: '+dates[i];
  	}
  	ResultCount.innerHTML='<a href="#" id="Sortlink">Sort by time</a> / Results: 1 - '+anzahl+' of '+anzahl+' sorted by date descending';
  	document.getElementById('pagination').innerHTML='';
  	document.getElementById('Sortlink').addEventListener(
  		'click', function (event) {
		  	ResultCount.innerHTML='Sorting...';
  			window.setTimeout(SortThemByTime, 1000);
  			event.preventDefault();
  		}, false);
}

function SortThemByTime() {
	dates=Array();
	listelements=Array();
  	ResultCount=document.getElementById('resultCount');
  	listelem = document.getElementsByClassName('scList')[0].getElementsByTagName('li');
  	for(i=0; i<listelem.length; i++) {
  		listelements.push(trim(listelem[i].innerHTML));
  	}
  	elem = document.getElementsByClassName('scLength');
  	for(i=0; i<elem.length; i++) {
  		var aContent = elem[i].innerHTML;
  		dates.push(trim(aContent.substring(aContent.indexOf(':')+2)));
  		if(dates[i].substring(dates[i].length-1)=='s') dates[i]='00:'+dates[i].substring(0,2);
  		if(dates[i].length<5) dates[i]='0'+dates[i];
  	}
  	for(i=0; i<dates.length-1; i++) {
  		for(j=i+1; j<dates.length; j++) {
  			if(dates[i]<dates[j]) {
  				// Tauschen
  				helpme = dates[i];
  				dates[i]=dates[j];
  				dates[j]=helpme;
  				helpme = listelements[i];
  				listelements[i]=listelements[j];
  				listelements[j]=helpme;
  			}
  		}
  	}
  	for(i=0; i<dates.length; i++) {
  		listelem[i].innerHTML=listelements[i];
  	}
  	elem = document.getElementsByClassName('scLength');
  	for(i=0; i<elem.length; i++) {
  		elem[i].innerHTML = 'time: '+dates[i];
  	}
  	ResultCount.innerHTML='<a href="#" id="Sortlink">Sort by date</a> / Results: 1 - '+anzahl+' of '+anzahl+' sorted by time descending';
  	document.getElementById('pagination').innerHTML='';
  	document.getElementById('Sortlink').addEventListener(
  		'click', function (event) {
		  	ResultCount.innerHTML='Sorting...';
  			window.setTimeout(SortThemByDate, 1000);
  			event.preventDefault();
  		}, false);
}

window.addEventListener(
  'load',
  function () {
  	ResultCount=document.getElementById('resultCount');
  	anzahl = ResultCount.innerHTML.substring(19);
  	seitenzahl = Math.floor(anzahl / 20);
  	if(anzahl % 20 != 0) seitenzahl++;
  	currpage=2;
  	ResultCount.innerHTML='Loading.... page '+currpage+' of '+seitenzahl;
  	DoRequest();
  },
true);
