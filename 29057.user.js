// ==UserScript==
// @name		Tietokone.fi Popup Ad Remover
// @author		Lauri Ojansivu
// @date		2008-06-24
// @description		Removes annoying popup ad for free magazine issue
// @namespace		(none)
// @include		http://www.tietokone.fi/*
// @include		http://tietokone.fi/*
// ==/UserScript==

// In English: Remove div that makes page background white
// Suomeksi: poistetaan div joka tekee taustan valkoiseksi
var ad = document.getElementById("whitediv");
ad.parentNode.removeChild(ad);

// In English: Remove form for ordering one free issue
// Suomeksi: poistetaan lomake jolla tilataan ilmainen näytenumero
var ad2 = document.getElementById("formdiv");
ad2.parentNode.removeChild(ad2);


