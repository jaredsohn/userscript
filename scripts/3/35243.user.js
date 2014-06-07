// ==UserScript==

// @name			Super iGoogle - Mod

// @autho			Richard Coombs / edited by JKSinton

// @namespace	

// @description		Extends toggleHeader functionality:  recommended from Mr. Hines http://hinespot.net/node.php?blogid=580 and includes id=nhdrwrapinner to get rid of the annoying links at the bottom of the header!  

// @include		http://google.*/ig*

// @include		http://www.google.*/ig*

// @include             http://www.google.*/webhp*

// ==/UserScript==


var headerHidden = false;	// True if header is hidden, false otherwise
var oldForm;	// Variable to hold duplicate copy of original search form to be used when "toggle header" is clicked
var init = false;	// True if this script has finished initialising, false otherwise

toggleHeader();
hideFooter();
modifyLinkBar();
installMiniForm();
roundTabs();

init = true;

/* 
 * Remove "@gmail.com" from email address in top-right corner
 * and make email address a compose-email link
 * and add "Toggle Header" and "Add Stuff" links to top-right corner
*/
function modifyLinkBar() {
	// Find top-right links (sign out, my account etc) and email address and "classic home" link
	var guser = document.getElementById('guser');
	var toprightlinks;
	if (guser) toprightlinks = guser.firstChild;
	
	if (toprightlinks) {
	var classic = toprightlinks.childNodes[2];	// "Classic home" link

	// Get rid of everything after @ in email address and make email address a hyperlink to compose an email
	var email = toprightlinks.firstChild; 
	var gc = email.innerHTML;
	gc = gc.substring(0, gc.indexOf('@'));
	gc = '<a href="http://mail.google.com/mail/­?view=cm&fs=1&tf=1"><font color="#000000">' + gc + '</font></a>' ;
	email.innerHTML = gc;

	// Create "Toggle Header" button
	var toggleBtn = document.createElement('a');
	toggleBtn.appendChild(document.createTextNode("Toogle"));
	toggleBtn.addEventListener("click", toggleHeader, false);
	toggleBtn.setAttribute("href", '#');
	toprightlinks.insertBefore(toggleBtn, classic);
	toprightlinks.insertBefore(document.createTextNode(" | "), classic);

	// Move the "add stuff" link and a new spacer to top-right bar
	var addstuff = document.getElementById("addstuff");
	var addstufflink = addstuff.lastChild;
	addstufflink.textContent = "Add Stuff";
	toprightlinks.insertBefore(addstufflink, classic);
	toprightlinks.insertBefore(document.createTextNode(" | "), classic);
	}
}

// Function to install the mini-form at the right-end of tab bar
function installMiniForm() {
	// Remove the "select theme" / "add stuff" list item
	var ulist = document.getElementById("gadget-tabs");
	if (ulist) ulist.removeChild(ulist.lastChild);

	// Create new list item to replace addstuff and add the form to it
	var newLi = document.createElement('li');
	newLi.className="tab";
	newLi.id="addstuff";
	
	// Add the mini-form to the list item
	var miniForm = getMiniForm();
	if (miniForm) newLi.appendChild(miniForm);

	// Add the new list item to the unordered list (right-end of tab bar)
	if (ulist) ulist.appendChild(newLi);
	if (ulist) ulist.parentNode.style.paddingTop="5px";
	
	// Focus cursor in text field
	var q = document.getElementById("q");
	if (q) q.focus();	
}

// Function to toggle whether the header is displayed or not
function toggleHeader() {
	// Toggle display state of header div

	var elm = document.getElementById('col1_contents');
	if (elm) elm.style.display = (headerHidden ? '' : 'none');
	
	//var elm = document.getElementById('nhdrwrapsizer');
	var elm = document.getElementById('nhdrwrapinner');
	if (elm) elm.style.display = (headerHidden ? '' : 'none');
	
	var gsea = document.getElementById('gsea');
	if (gsea && init) {
		if (gsea.childNodes.length==1) 
			gsea.removeChild(gsea.firstChild);
		else gsea.appendChild(oldForm);
	}
	
	headerHidden = !headerHidden;
	
	// Focus on search field
	var q = document.getElementById("q");
	if (q) q.focus();	
}

function hideFooter() {
	// Hide footer

	var elm = document.getElementById('footerwrap');

	if(elm) elm.style.display = 'none';

	// Change amount of space at bottom of page

	var elm = document.getElementById('modules');

	if(elm) elm.style.marginBottom = '-2em' ;
}

function roundTabs() {

	var radius = 5;

	var tabs = document.getElementsByTagName('li');

	for(var i=0; i<tabs.length; i++) 

		if(tabs[i].id.match(/tab.*_view/))

			tabs[i].style.MozBorderRadius = radius + 'px ' + radius + 'px 0px 0px' ;
}

// Function to create a new mini search form to be added to the right-end of the tab bar
function getMiniForm() {
	// Get current search form
	var f = document.getElementById('sfrm');
	if (f) oldForm = f.cloneNode(true);
	
	// Move search text field to end of form
	var q = document.getElementById("q");
	if (q) {
		f.appendChild(q);
		q.style.width="200px";
		//q.addEventListener("keyup", function(){oldQ.value = this.value;}, false);
	}

	// Move "Google Search" button to end of form
	var btnG = document.getElementById("btnG");
	if (btnG) var b = btnG.cloneNode(true);
	if (b) {
		f.appendChild(b);
		b.value = "Search";
	}

	// Move "I'm feeling lucky" button to end of form
	var btnl = document.getElementById("btnI");
	if (btnl) var l = btnl.cloneNode(true);
	if (l) {
		f.appendChild(l);
		l.value="Lucky";
	}

	// Remove the table (which contains everything else) from the form
	if (f) f.removeChild(f.firstChild);

	if (f) f.style.verticalAlign="top";
	
	return f;
}
