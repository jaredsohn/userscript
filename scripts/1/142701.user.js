// ==UserScript==
// @name           Founders Online [link]
// @author         saiake
// @version        1.03
// @description    Ссылки
// @include        http://founders.icedice.org*
// ==/UserScript==

 // Get the planet link.
var planetLink = document.querySelector('#left li a[href*="?m=planet"]');
// Check to see if the element is even there.
if (planetLink) {
	// Get the planet link's parent.
	var planetLinkParent = planetLink.parentNode;

	// Create the new link.
	var myLink = document.createElement('a');
	// Set where you want it to point to.
	myLink.href = 'http://founders.icedice.org/g.php?m=base'; 
	// Set its text.
	myLink.textContent = 'База';

	// Create the "li" element, and add the link.
	var myLi = document.createElement('li');
	myLi.appendChild(myLink);
	
	// Insert the "li" into the document below the planet link.
	planetLinkParent.parentNode.insertBefore(myLi, planetLinkParent.nextSibling);
}

// Get the planet link.
var planetLink = document.querySelector('#left li a[href*="?m=market"]');
// Check to see if the element is even there.
if (planetLink) {
	// Get the planet link's parent.
	var planetLinkParent = planetLink.parentNode;

	// Create the new link.
	var myLink = document.createElement('a');
	// Set where you want it to point to.
	myLink.href = 'http://founders.icedice.org/g.php?m=market&s=3';
	// Set its text.
	myLink.textContent = 'Ставки';

	// Create the "li" element, and add the link.
	var myLi = document.createElement('li');
	myLi.appendChild(myLink);
	
	// Insert the "li" into the document below the planet link.
	planetLinkParent.parentNode.insertBefore(myLi, planetLinkParent.nextSibling);
}

// Get the planet link.
var planetLink = document.querySelector('#left li a[href*="?m=starmap"]');
// Check to see if the element is even there.
if (planetLink) {
	// Get the planet link's parent.
	var planetLinkParent = planetLink.parentNode;

	// Create the new link.
	var myLink = document.createElement('a');
	// Set where you want it to point to.
	myLink.href = 'http://www.founders.mcdir.ru/map.php'; 
	// Set its text.
	myLink.textContent = 'Карта вселенной';

        myLink.setAttribute('target', '_blank');

	// Create the "li" element, and add the link.
	var myLi = document.createElement('li');
	myLi.appendChild(myLink);
	
	// Insert the "li" into the document below the planet link.
	planetLinkParent.parentNode.insertBefore(myLi, planetLinkParent.nextSibling);
}
