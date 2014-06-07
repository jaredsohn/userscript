// ==UserScript==
// @name           Google Pirateer v1.1 Preview
// @description    Search for free music, movies, and software with Google.
// @include        http://www.google.com/webhp*
// @include        http://www.google.com/
// @include        http://www.google.com/ig*
// @include        http://www.google.com/search*
// ==/UserScript==

form = document.forms[0];
var activelink;
var sbutton;
var txtInput;
gbar = document.getElementById('gbar');
a = gbar.getElementsByTagName('a');

for (i=0; i<a.length; i++) {
	if (a[i].innerHTML.substring(0, 11) == '<u>more</u>' && a[i].className != "l") {
		ele = document.getElementsByTagName('*');
		for (j=0; j<ele.length; j++) {
			if (ele[j].innerHTML == 'Web') {
				newb = document.createElement('b');
				newb.appendChild(document.createTextNode('Web'));
				newb.setAttribute("id","web");
				newb.setAttribute('class','gb1')
				span = document.createElement('span');
				span.appendChild(newb);
				parent = ele[j].parentNode;
				parent.insertBefore(span,ele[j]);
		
				activelink = document.getElementById('web');
				parent = activelink.parentNode;
				parent.parentNode.removeChild(parent.nextSibling); // Workaround for poor DOM support by google
				
				break;
			}
		}
		
		insertbefore = a[i].parentNode;
		music = addGoogleLink('Music', 'freemusic', insertbefore);
		movies = addGoogleLink('Movies', 'freemovies', insertbefore);
		software = addGoogleLink('Software', 'freesoftware', insertbefore);
		books = addGoogleLink('Books', 'freebooks', insertbefore);
		
		music.addEventListener("click", function(event) { changeSearch(this); event.preventDefault(); }, false);
		movies.addEventListener("click", function(event) { changeSearch(this); event.preventDefault(); }, false);
		software.addEventListener("click", function(event) { changeSearch(this); event.preventDefault(); }, false);
		books.addEventListener("click", function(event) { changeSearch(this); event.preventDefault(); }, false);
		
		for (j=0; j<form.elements.length; j++) {
			if (form.elements[j].type == 'text') {
				txtInput = form.elements[j];
			}
			
			if (form.elements[j].value == 'Google Search' || form.elements[j].value == 'Search') {
				sbutton = form.elements[j];
				sbutton.value = "Google Search";
				break;
			}
		}
		
		form.addEventListener("submit", function(event) {
			switch (activelink.id) {
				case 'freemusic' :
					txtInput.value = 'intitle:index.of -inurl:(html|php|asp|htm|cgi) "last modified" +(wma|mp3|ogg|acc|flac|aac|m4a)"' + txtInput.value + '"';
					break;
				case 'freemovies' :
					txtInput.value = 'intitle:index.of -inurl:(html|php|asp|htm|cgi) "last modified" +avi "' + txtInput.value + '"';
					break;
				case 'freebooks' :
					txtInput.value = 'intitle:index.of -inurl:(html|php|asp|htm|cgi) "last modified" +pdf "' + txtInput.value + '"';
					break;
				case 'freesoftware' :
					txtInput.value = 'intitle:index.of -inurl:(html|php|asp|htm|cgi) "last modified" +(rar|iso) "' + txtInput.value + '"';
					break;
			}
			return true;
		}, false);
		
		break;
	}
}

function addGoogleLink(text, id, node) {
	span = document.createElement('span');
	a = document.createElement('a');
	a.setAttribute('href','#' + id);
	a.appendChild(document.createTextNode(text));
	a.setAttribute('id',id);
	span.appendChild(a);
	span.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0'));
	node.parentNode.insertBefore(span, node);
	
	return document.getElementById(id);
}

function changeSearch(ele) {
	if (txtInput.value.substring(0,16) == 'intitle:index.of') {
		txtInput.value = '';
	}
		
	text = ele.firstChild.data;
	b = document.createElement('b');
	b.setAttribute('id',ele.id);
	b.appendChild(document.createTextNode(text));
	if (b.innerHTML === 'Web') b.setAttribute('class','gb1');
	parent = ele.parentNode;
	parent.removeChild(ele);
	parent.insertBefore(b, parent.childNodes[0]);
	
	if (activelink != null) {
		text = activelink.firstChild.data;
		a = document.createElement('a');
		a.addEventListener("click", function(event) { changeSearch(this); event.preventDefault(); }, false);
		a.setAttribute('id',activelink.id);
		a.setAttribute('href','#' + activelink.id);
		a.appendChild(document.createTextNode(text));
		if (a.innerHTML === 'Web') a.setAttribute('class','gb1');
		parent = activelink.parentNode;
		parent.removeChild(activelink);
		parent.insertBefore(a, parent.childNodes[0]);
	}
	
	activelink = document.getElementById(ele.id);
	
	sbutton.value = (activelink.innerHTML == 'Web') ? "Google Search" : activelink.innerHTML + " Search";
	
	return false;
}