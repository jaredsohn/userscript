// ==UserScript==
// @name КармаПисчик
// @version 1.1
// @namespace /dev/head
// @description Высвечивание кармы
// @author Зарипов Камиль
// @include http://habrahabr.ru/*
// @include http://habrahabr.ru/*
// @include http://*.habrahabr.ru/*
// @include http://*.habrahabr.ru/*
// ==/UserScript==

	document.domain='habrahabr.ru';
	if (document.getElementsByClassName('msg-meta').length)
		for (i=0; i<=document.getElementsByClassName('msg-meta').length-1; i++) {
			document.getElementsByClassName('msg-meta')[i].addEventListener('mouseover', getKarma, false);
			document.getElementsByClassName('msg-meta')[i].addEventListener('mouseout', removeKarma, false);
		}
	function getKarma (event) {
		object=event.currentTarget.getElementsByClassName('mark')[0];
		var username=event.currentTarget.getElementsByClassName('url')[0].firstChild.nodeValue;
		karmaIframes=document.getElementsByName('karmaIframe');
		if (!karmaIframes.length) {
			karmaIframe=document.createElement('iframe');
			karmaIframe.setAttribute('name', 'karmaIframe');
			karmaIframe.src='http://habrahabr.ru/api/profile/'+username+'/';
			karmaIframe.style.display='none';
			document.body.appendChild(karmaIframe);
		} else {
			karmaIframe.src = 'http://habrahabr.ru/api/profile/'+username+'/';
		}
		showKarma ();
		function showKarma () {
			if (karmaIframes && karmaIframes[0] && karmaIframes[0].contentDocument && karmaIframes[0].contentDocument.getElementsByTagName('karma') && karmaIframes[0].contentDocument.getElementsByTagName('karma')[0] && karmaIframes[0].contentDocument.getElementsByTagName('login')[0].childNodes[0].nodeValue==username) {
				karmaLi=document.createElement('li');
				karmaLi.setAttribute('class', 'karma');
				karmaLi.innerHTML=karmaIframe.contentDocument.getElementsByTagName('karma')[0].childNodes[0].nodeValue;
				karmaValue=karmaLi.innerHTML*1;
				if (karmaValue>=50) karmaLi.style.color='#0c0';
				if (karmaValue<50 && karmaLi.innerHTML>-50) {
					karmaLi.style.color='rgb('+Math.round(204-(karmaValue+50)*2,04)+','+Math.round((karmaValue+50)*2,04)+',0)';
				}
				if (karmaValue==0) karmaLi.style.color='#ccc';
				if (karmaValue<=-50) karmaLi.style.color='#c00';
				karmaLi.style.margin='0 0.2sem 0 0';
				karmaLi.style.cssFloat='left';
				object.parentNode.insertBefore(karmaLi, object);
			} else karmaWait=window.setTimeout(showKarma, 300);
		}
	}
	function removeKarma () {
		clearTimeout (karmaWait)
		for (i=0; i<=document.getElementById('comments').getElementsByClassName('karma').length-1; i++) {
			document.getElementById('comments').getElementsByClassName('karma')[i].parentNode.removeChild(document.getElementById('comments').getElementsByClassName('karma')[i]);
		}
	}
