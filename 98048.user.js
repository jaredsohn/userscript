// ==UserScript==
// @name           Anno Spolszczenie
// @description    Spolszczenie
// @include        http://www.anno1777.com/*
//@include        http://anno1777.com/*
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',


//////////////////// Strona główna - Logowanie//////////////////

//Logowanie
'User' : 'Użytkownik',
'Password' : 'Hasło',
'active players' : 'graczy',
'today' : 'dzisiaj',
'i forgot my' : 'zapomniałem',


///////////Zdania//////////////////////

//Pierwsze
'First social game in which you can change virtual currency into' : 'Pierwsza gra, w której możesz zamienic wirtualna walute',
'real money' : 'prawdziwe pieniądze',

//Drugie
'Setting up an account takes 2 minutes.' : 'Rejestracja trwa 2 minuty.',

//Trzecie
'You can be a' : 'Możesz być',
'company owner, politician or a military' : 'przezesem firmy, politykiem, wojskowym',
'mastermind' : '',

//Czwarte
'There are over' : 'Jest ponad',
'20 kinds' : '20 rodzajów',
'of companies from' : 'firm m.in.',
'restaurants' : 'restauracje,',
'to' : '',
'banks' : 'banki,',
'lotteries' : 'oraz loterie',

//Piąte
'You can' : 'Możesz',
'make money' : 'zarabiać',
'your magazine regardless of the topics you approach' : 'prowadząc czasopismo',

//Szóste
'buy and sell everything, including' : 'kupować i sprzedawać wszystko, nawet',
'other players.' : 'innych graczy',

//Siódme
'Invite your friends and' : 'Zaproś przyjacioł i',
'earn taxes' : 'zarabiaj podatki',
'for life from them' : 'dożywotnio od nich',

//Ósme
'It takes about' : 'Zajmuje około',
'one hour' : 'godzinę',

 'easy' : 'proste',



////////////////////////////////////////


/////////////////Kraje/////////////////
'ROMANIA' : 'RUMUNIA',
'POLAND' : 'POLSKA',
'SPAIN' : 'HISZPANIA',
'PORTUGAL' : 'PORTUGALIA',



////////////////////////////////////

///////////////Inne////////////////////
'Last Payments' : 'Ostatnie wypłaty',
'Local Press' : 'Lokalna prasa',
'Written by' : 'Napisane przez',



/////////////STRONA GŁÓWNA///////////////





//Footer
'Copyright 2009-2010 ANNO1777 Labs. All rights reserved.' : 'Copyright 2009-2010 ANNO1777 Labs. All rights reserved. // tłumaczenie Thadel',






///////////////////////////////////////////////////////
};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
var ok = true;
var badTags = new Array('pre','blockquote','code','input','button','textarea');
for each(var badTag in badTags) if(tag==badTag) ok=false;
return ok;
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
regexs.push(new RegExp(word.prepareRegex().replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}

var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0; x<regexs.length; x++) text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
}