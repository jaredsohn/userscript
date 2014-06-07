// ==UserScript==
// @name           eRep law
// @namespace      ns
// @include        http://www.erepublik.com/en/Russia/law/*
// @include        http://www.erepublik.com/ru/Russia/law/*
// ==/UserScript==

var orgList = ['eRussian Fund', 'eRussian Treasury'];

var langs = [];
langs['en'] = {donate: 'donate', from: 'from the country accounts to', index: 29};
langs['ru'] = {donate: 'перевод', from: 'из государственной казны на счет', index: 33};

l = /erepublik.com\/(\w\w)\//.exec(document.location.href)[1];

if (document.getElementsByTagName('h2')[1].innerHTML.trim().toLowerCase() == langs[l].donate){

	var text = document.getElementsByClassName('largepadded')[1].innerHTML;
	var idx = text.indexOf(langs[l].from) + langs[l].index;

	oname = text.substr(idx).replace(/\?$/,'');
	link = 'http://www.erepublik.com/en/search/?q='+encodeURIComponent(oname);

	text = text.substr(0, idx)+'<a href="'+ link +'"><pre>'+ oname +'</pre></a>';
	console.log(text);
	document.getElementsByClassName('largepadded')[1].innerHTML = text;

	link = document.getElementsByClassName('largepadded')[1].childNodes[1];
	link.firstChild.style.display = 'inline';
        //link.style.textDecoration = 'underline';

	if (orgList.indexOf(oname) != -1){
		link.style.color = 'green';
	}else{
		link.style.color = 'red';
	}

}