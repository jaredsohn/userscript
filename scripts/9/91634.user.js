// ==UserScript== 
// @name	Modifiye Divxplanet 
// @namespace	DivxplanetM
// @description	Anasayfa favori diziler arasinda istediginiz dizileri gosterir.
// @include	http://divxplanet.com/*
// @include	divxplanet.com/*
// ==/UserScript== 

/*
Kopirayt mopirayt yok. 4 dakikada yazdigimiz script'in hakkinin pesinden kosacak degiliz.
*/

	var row = document.getElementsByClassName('yavan')[6].parentNode.children[1].children[0].insertRow(0)
	var cell1 = row.insertCell(0)
	var a = document.createElement('a')
	a.setAttribute('href','/sub/m/18443/Lie-to-Me.html')
	a.setAttribute('title','Lie To Me')
	a.innerHTML = '"Lie To Me" (cok kereler indirilmis)'
	cell1.appendChild(a);
