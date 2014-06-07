// ==UserScript==
// @name           EZTV Show Marker
// @namespace      eztv show marker
// @description    Mark your favourite shows
// @include        http://eztv.it/*
// ==/UserScript==

/*    write some words (or whole name) of your favourite series
separated by commas please keep in mind that CASE SENSITIVE IS ON
As the name of the shows beginning with "THE" word are listed in different
order in showlist and countdown, the matching pattern is now more flexible.
E.G.: series = "Big Bang";
	(Home) Mad Men S12E34 - A Big Bang <-- WILL MATCH
	(Home) The Big Bang Theory S12E34 - Schorenderg's cat <-- WILL MATCH
E.G.: series = "The Big Bang";
	(Home) The Big Bang Theory S12E34 - Schorenderg's cat <-- WILL MATCH
	(Showlist) Big Bang Theory, The <-- WILL NOT MATCH
	
So, AVOID USING "THE"   */

function createCookie(name,value,days){
	if(days){
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";//domain=eztv.it;
}

function readCookie(name){
	var nameEQ = name+"=";
	var ca = document.cookie.split(';');
	for(var i=0;i<ca.length;i++){
		var c = ca[i];
		while (c.charAt(0)==' ')
			c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag=="*" && elm.all)?elm.all:elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0;i<length;i++){
		current = elements[i];
		if(testClass.test(current.className))
			returnElements.push(current);
	}
	return returnElements;
}

if(window.location.host=='eztv.it'){
	//---------------------cookie
	var userSeries = readCookie('infoSeries');
	var userSeriesB = readCookie('infoAux');
	if(userSeries!=null){
		var list = userSeries;
	}
	else{
		var list = prompt('Which are your favourite shows? (Keywords separated by commas)',userSeriesB);
		createCookie('infoSeries',list,365);
		createCookie('infoAux',list,365);
	}
		
	var header = document.getElementById('header_logo');
	//label
	var txt = document.createTextNode('My favourite TV Shows: '+list);
	header.parentNode.insertBefore(txt,header);
	
	//input
	if(window.location.pathname.length==1){
		var btnDel = document.createElement('input');
		btnDel.setAttribute('type','submit');
		btnDel.setAttribute('value','Reset shows');
		btnDel.setAttribute('onclick','document.cookie="infoSeries=; expires=Thu, 01-Jan-70 00:00:01 GMT;";window.location.reload();');
		header.parentNode.insertBefore(btnDel,header);
	}
	//----------------
	
	//------------------mark shows
	var aux = list.split(',');
	var pattern = (aux.join('|')); /*old pattern*/ //var pattern = ('^('+aux.join('|')+')');
	var parents = 0;
	if(window.location.pathname.match('showlist')!=null || window.location.pathname.match('countdown')!=null){
		parents = 2;
		var ep_array = getElementsByClassName('thread_link');
	}
	else if(window.location.pathname.length==1 || window.location.pathname.match('page')!=null){ //home
		parents = 3;
		var ep_array = getElementsByClassName('epinfo');
	}
	
	if(parents>0){
		var regExp = new RegExp(pattern);
		for(var i=0;i<ep_array.length;i++){
			if(regExp.exec(ep_array[i].innerHTML)){
				ep_array[i].style.color = '#029';
				ep_array[i].style.fontSize = '1.4em';
				if(parents==2)
					ep_array[i].parentNode.parentNode.style.backgroundColor = '#fff';
				else
					ep_array[i].parentNode.parentNode.parentNode.style.backgroundColor = '#fff';
			}
			else
				ep_array[i].style.color = '#999';
		}
	}
}//.user.js