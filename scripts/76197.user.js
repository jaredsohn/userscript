// ==UserScript==
// @name          Google: Hide/Show Left Sidebar Navigation
// @description   Add a toggle button to hide or show the new left-hand nav bar recently added by Google.
// @version        1.1.0
// @require        http://usocheckup.dune.net/76197.js
// @require        http://gmupdater.savanttools.com/76197.js
// @include       http://www.google.*
// ==/UserScript==

// This is the last version that will use usocheckup.dune.net.
// It is the only version that will use both usocheckup.dune.net and gmupdater.savanttools.com at the same time. 

function addLoadEventUnsafe(func) {
	var oldonload = unsafeWindow.onload;
	if (typeof unsafeWindow.onload != 'function') {
		unsafeWindow.onload = func;
	}
	else {
		unsafeWindow.onload = function() {
			oldonload();
			func();
		}
	}
}

function insertSiblingBefore(oldSibling, newSibling) {
	oldSibling.parentNode.insertBefore(newSibling, oldSibling);
}

function insertSiblingAfter(oldSibling, newNode )
{
    oldSibling.parentNode.insertBefore(newNode, oldSibling.nextSibling);
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function getClassMarginLeft(el) {
   if (el.currentStyle)
       return el.currentStyle.marginLeft;
   if (document.defaultView)
       return document.defaultView.getComputedStyle(el, '').getPropertyValue("margin-left");
}

unsafeWindow.toggleLeftNav = function toggleLeftNav() {
	if ( readCookie("leftNav") == "hide" ) {
		createCookie("leftNav", "show", 90);
	} else {
		createCookie("leftNav", "hide", 90);
	}
}
unsafeWindow.toggleRightNav = function toggleRightNav() {
	if ( readCookie("rightNav") == "hide" ) {
		createCookie("rightNav", "show", 90);
	} else {
		createCookie("rightNav", "hide", 90);
	}
}

function controlLeftRightNavs() {
	function changeResultsWidth(maxwidth) {
		var headID = document.getElementsByTagName("head")[0];         
		var cssNode = document.createElement('style');
		cssNode.type = 'text/css';
		cssNode.innerHTML = '.s {max-width: ' + maxwidth + '}';
		headID.appendChild(cssNode);
	}
	
	function showToggle() {	
		var navDiv = document.getElementById("leftnav");
		if (navDiv) {
			var newDiv = document.createElement("div");
			newDiv.id = 'leftNavToggle'
			newDiv.style.position = 'absolute';
			newDiv.style.top = "-20px";
			newDiv.style.left = "10px";
			insertSiblingBefore(navDiv, newDiv);		
		}
	}
	function findCountryDiv() {
		var els = document.getElementsByTagName("li")
		for (var i=0, il=els.length; i<il; i++) {
			if ( els[i].id.indexOf('ctr_country') >= 0 ) {
				return els[i];
			}
		}
	}
	function findLangDiv() {
		var els = document.getElementsByTagName("li")
		for (var i=0, il=els.length; i<il; i++) {
			if ( els[i].id.indexOf('lr_lang_') >= 0 ) {
				return els[i];
			}
		}
	}
	function CreateNewSubFormDiv() {
		var newSubFormDiv = document.getElementById('newSubFormDiv');
		if (! newSubFormDiv) {
			var subFormDiv = document.getElementById('subform_ctrl');
			if (subFormDiv) {
				newSubFormDiv = document.createElement('div');
				newSubFormDiv.id = 'newSubFormDiv';
				newSubFormDiv.style.paddingBottom = '20px';
				subFormDiv.appendChild(newSubFormDiv);
			}
		}
		return newSubFormDiv;
	}
	function showCountryDiv(strHTML) {
		if (strHTML.indexOf("<a") >= 0) {
			var newCountryDiv = document.getElementById("newCountryDiv");
			if (! newCountryDiv) {
				var newSubFormDiv = CreateNewSubFormDiv();
				if (newSubFormDiv) {
					newCountryDiv = document.createElement('span');
					newCountryDiv.id = 'newCountryDiv'
					newCountryDiv.innerHTML = ' ' + strHTML + ' &nbsp; &nbsp; ';
					newSubFormDiv.appendChild(newCountryDiv);
				}
			}
		}
	}
	function showLangDiv(strHTML) {
		if (strHTML.indexOf("<a") >= 0) {
			var newLangDiv = document.getElementById('newLangDiv');
			if (! newLangDiv) {
				var newSubFormDiv = CreateNewSubFormDiv();
				if (newSubFormDiv) {
					newLangDiv = document.createElement('span');
					newLangDiv.id = 'newLangDiv'
					newLangDiv.innerHTML = ' ' + strHTML + ' &nbsp; &nbsp; ';
					newSubFormDiv.appendChild(newLangDiv);		
				}
			}
		}
	}
	function removeCountryDiv(strHTML) {
		var newCountryDiv = document.getElementById("newCountryDiv");
		if (newCountryDiv) newCountryDiv.parentNode.removeChild(newCountryDiv);
	}
	function removeLangDiv(strHTML) {
		var newLangDiv = document.getElementById("newLangDiv");
		if (newLangDiv) newLangDiv.parentNode.removeChild(newLangDiv);
	}

	var navDiv = document.getElementById("leftnav");
	
	if (navDiv) {
		var toggleHtml, langDiv, countryDiv;
		var centerCol = document.getElementById("center_col");
		var newDiv = document.getElementById("leftNavToggle");
		if (! newDiv ) {
			showToggle();
			newDiv = document.getElementById("leftNavToggle");
		}
		if ( readCookie("leftNav") == "hide" ) {
			toggleHtml = '<a href="javascript:toggleLeftNav()">show</a>';
			if ( navDiv.style.display != "none") {
				navDiv.style.display = "none";
				langDiv = findLangDiv();
				if (langDiv) showLangDiv(langDiv.innerHTML);
				countryDiv = findCountryDiv();
				if (countryDiv) showCountryDiv(countryDiv.innerHTML);
			}
			if ( newDiv.innerHTML != toggleHtml ) newDiv.innerHTML = toggleHtml;
			if ( centerCol.style.marginLeft != "0" ) centerCol.style.marginLeft = "0";
			if ( centerCol.style.paddingLeft != "20px" ) {
				centerCol.style.paddingLeft = "20px";
			//changeResultsWidth('48em');
			}
		} else {
			toggleHtml = '<a href="javascript:toggleLeftNav()">hide</a>';
			if ( navDiv.style.display != "") {
				navDiv.style.display = "";
				removeLangDiv();
				removeCountryDiv();
			}
			if ( newDiv.innerHTML != toggleHtml ) newDiv.innerHTML = toggleHtml;
			if ( centerCol.style.marginLeft != "159px" ) centerCol.style.marginLeft = "159px";
			if ( centerCol.style.paddingLeft != "8px" ) {
				centerCol.style.paddingLeft = "8px";
				//changeResultsWidth('42em');
			}
		}
	}
	controlRightNav();
	setTimeout("controlLeftRightNavs()", 100);
}


function controlRightNav() {	
	function showToggle() {	
		var navDiv = document.getElementById("rhscol");
		if (navDiv) {
			var newDiv = document.createElement("div");
			newDiv.id = 'rightNavToggle'
			newDiv.style.position = 'absolute';
			newDiv.style.top = "-20px";
			newDiv.style.right = "10px";
			insertSiblingBefore(navDiv, newDiv);		
		}
	}

	var navDiv = document.getElementById("rhscol");
	
	if (navDiv) {
		var toggleHtml;
		var centerCol = document.getElementById("center_col");
		var newDiv = document.getElementById("rightNavToggle");
		if (! newDiv ) {
			showToggle();
			newDiv = document.getElementById("rightNavToggle");
		}
		if ( readCookie("rightNav") == "hide" ) {
			toggleHtml = '<a href="javascript:toggleRightNav()">show</a>';
			if ( navDiv.style.display != "none") {
				navDiv.style.display = "none";
			}
			if ( newDiv.innerHTML != toggleHtml ) newDiv.innerHTML = toggleHtml;
			if ( centerCol.style.marginRight != "0" ) centerCol.style.marginRight = "0";
		} else {
			toggleHtml = '<a href="javascript:toggleRightNav()">hide</a>';
			if ( navDiv.style.display != "") {
				navDiv.style.display = "block";
			}
			if ( newDiv.innerHTML != toggleHtml ) newDiv.innerHTML = toggleHtml;
			if ( centerCol.style.marginRight != "159px" ) centerCol.style.marginRight = "264px";
		}
	}
}

unsafeWindow.controlLeftRightNavs = controlLeftRightNavs;

addLoadEventUnsafe(controlLeftRightNavs);
