// ==UserScript==
// @name RaverShow
// @description Clears the lightbox from raver
// ==/UserScript==

@name=RaverShow
@description=Clears the lightbox from raver

el1 = document.getElementById('tint');
el2 = document.getElementById('construction');
el3 = document.getElementById('bod');

el1.style.display = 'none';
el2.style.display = 'none';
el3.style.overflow = 'auto';