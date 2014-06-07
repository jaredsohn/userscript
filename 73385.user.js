// ==UserScript==
// @name           vu_terkapu
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php?m=szovetseg&sub=terkapu
// @include		   http://*.vegzetur.hu/index.php?m=csataleiras&csata=*&tipus=terkapu
// ==/UserScript==


function getByRegexRoot(doc, tag, name){
	items = [];
	elems = doc.getElementsByTagName(tag);
	eval('var nameregex = /'+name+'/;');
	for (i=0; i<elems.length; i++){
		if (elems[i].innerHTML.match(nameregex)) items.push(elems[i]);
	}
	return items;
}

function getFirstByRegex(tag, classname){
	items = getByRegexRoot(document, tag, classname);
	return items[0];
}

function getFirstByRegexRoot(doc, tag, classname){
	items = getByRegexRoot(doc, tag, classname);
	return items[0];
}

if (getFirstByRegex('div','Elk.lt.ttél .* haszn.lhasd a t.rkaput.'))
{
	var obj = getFirstByRegex('span','^Belépés a térkapuba$');
	if (obj)
	{
		location.assign(obj.parentNode.href);
	}
}

var obj = getFirstByRegex('a','Vissza');
if (obj)
{
	var obj2 = getFirstByRegex('div','([0-9]*) t.rkapupont');
	var val = parseInt(obj2.innerHTML.match(/([0-9]*) t.rkapupont/)[1]);
	if (0 != val)
	{
	var udiv = document.createElement('div');
	udiv.className='csataleiras';
	var whref = window.location.href;
	whref = whref.match(/(.*)vegzetur/)[1];
	var osko = document.createElement('a');
	osko.className = 'gomblink2';
	osko.style.setProperty('width','90%',null);
	osko.href = whref+"vegzetur.hu/index.php?m=szovetseg&sub=terkapu&tev=ujrahasznal_osko";
    var oskos = document.createElement('span');
	oskos.appendChild(document.createTextNode('Újrahasználat 1/3 őskőért'));
	osko.appendChild(oskos);
	var csp = document.createElement('a');
	csp.className = 'gomblink2';
	csp.style.setProperty('width','90%',null);
	csp.href = whref+"vegzetur.hu/index.php?m=szovetseg&sub=terkapu&tev=ujrahasznal_cselekvespont";
    var csps = document.createElement('span');
	csps.appendChild(document.createTextNode('Újrahasználat 1 cselekvéspontért'));
	csp.appendChild(csps);
	udiv.appendChild(osko);
	udiv.appendChild(document.createElement('br'));
	udiv.appendChild(csp);
	obj.parentNode.appendChild(udiv);
	}	
}