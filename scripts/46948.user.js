// ==UserScript==
// @name			GWO Calculator
// @author			Erik Vold
// @namespace		gwoCalculator
// @include			https://www.google.com/analytics/siteopt/*
// @version			1.0.3
// @datecreated		2009-04-17
// @lastupdated		2010-05-01
// @description		This will provide a link to the GWO calculator.
// ==/UserScript==


(function(){
	var navContainer = document.getElementById("navcontainer");
	if(!navContainer) return;

	var newMenu = document.createElement('ul');
	newMenu.id="gwoCalculator";
	var newMenuItem = document.createElement('li');

	newMenuItem.innerHTML = '<a title="Website Optimizer Duration Calculator" target="_blank" href="https://www.google.com/analytics/siteopt/siteopt/help/calculator.html"><img src="' +
	"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QBmRXhpZgAASUkqAAgAAAAEABoBBQABAAAAPgAAABsBBQABAAAARgAAACgBAwABAAAAAgAAADEBAgAQAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAAAUGFpbnQuTkVUIHYzLjM2AP/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABEADwMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APsHSb/Qbbx1rHgzxZefEqFJbr9hn4f/AAb8J/svXH/BtXEr6v8AtBfsSfAfxf4Q8EfEPQf+Chbp+1m37SPxv+Oel/tJeKPB/hrxfatc/Erwbp2m638MbPWdFtLy5i4jV/E3hbxronjm5+G3iDWfFvwv1L9kDxb8WLW4+Nmqf8EBvEHjbUPEVn+21+yh8HPhz8S/gHJ/wScnvPi7d/D+1jtP2q/hX8U/GXisyfCyDxfbaV4HfUk8Zwy6WntnhTwD8Rr347fDLXNP+Ffx/wBT8P3H7XH/AAb/AGv23ifQv+CKn7LHxf8AAl34d8L/ALHnjqz8W+K9O/bE8SeKrb4meNfh/wCCr24tNO+KP7auq6ZF8U/+Cd2sXumfC34KaXrfh/4gaxcQfPXw+8A/Ebwz8AtIvPFfwq/aB8FWVl/wTBv9Av8AUPin/wAEVf2Wf+Cd+kaZ4juP+Cxl7rtr4V134pfBTxTrWv8Awf8AiBe+H7i28T6X+xV4atrn4WfEDwJdaf8Ati6zqsPxN8barpkQB8rn7p+ln/6MjpsXUfSP+d1RRQB//9k=" +
	'" border="0" /></a>';
	newMenu.appendChild(newMenuItem);

	navContainer.insertBefore(newMenu, navContainer.childNodes[4]);
})();
