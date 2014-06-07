// ==UserScript==
// @author              Jack R. Tanner
// @name                Google Reader Minimalistic ++
// @namespace       http://userscripts.org/users/58648
// @description      Original scripts by Scott Cowan, Thin Light, Jordi De Groof, and Dossy. Integrates multiple scripts plus additional functionality. Press "W" to toggle the header and "X" to toggle the Share panel.
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// @include             http://www.google.tld/reader/*
// @include             https://www.google.tld/reader/*
// ==/UserScript==

var selectorsBox = null;
var selectorsToggler = null;
var imgExternal= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC";
var entries=document.getElementById("entries");

(function() {

 var ids = ["add-box","search","logo-container","global-info","gbar"];

 function toggle_gr ()
 {
   var length = ids.length;
   var is_visible = document.getElementById(ids[0]).style.display != "none";

   for (var i=0; i<length; i++){
     if(document.getElementById(ids[i]) != null)
		document.getElementById(ids[i]).style.display = is_visible?"none":"block";
   }
   GM_addStyle(".gbh { display:none !important; }");  //Hide dividing line
   GM_addStyle("#viewer-box { padding:0pt; }"); //Hide blue border around news
   if(is_visible){
	var logo = document.getElementById('main');
	logo.style.marginTop = '0';

	var logo = document.getElementById('chrome');
	logo.style.paddingTop = '0';
   }
   else {
	var logo = document.getElementById('main');
	logo.style.marginTop = '0.3em';
	
	var logo = document.getElementById('chrome');
	logo.style.paddingTop = '0.3em';
   }
//   unsafeWindow.AK();
 }

 function GRT_key(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     typing = (element.type == "text" || element.type == "password");
   } else {
     typing = (elementName == "textarea");
   }
   if (typing) return true;
   if (String.fromCharCode(event.which)=="W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
     toggle_gr();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   if (String.fromCharCode(event.which)=="X" && !event.ctrlKey) {
     toggleSelectors();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }

 function toggleSelectors() {
	if (!selectorsBox || !selectorsToggler) {
		return;
	}
	
	if (selectorsBox.style.display == 'none') {
		selectorsToggler.className = '';
		selectorsBox.style.display = '';
	} else {
		selectorsToggler.className = 'down';
		selectorsBox.style.display = 'none';
	}
	if (typeof(unsafeWindow.gG) == 'function') {
		unsafeWindow.gG();
	}
}

function onSidebarToggle() {
	if (document.body.className.indexOf('hide-nav') == -1) {
		// sidebar is to be hidden and the mini toggle icon is to be shown (google's handler gets called afterwards)
		selectorsToggler.style.display = 'none';
	} else {
		selectorsToggler.style.display = 'block';
	}
}

window.addEventListener('load', function(e) {
	// add CSS styles for the toggler
	var style = '#selectors-toggler {display:block;height:7px;background:#FFFFFF url(http://i25.tinypic.com/300cs5d.jpg) no-repeat center center;}'
		+ '#selectors-toggler:hover {background-color:#F3F3F3;}'
		+ '#selectors-toggler.down {height:10px;background:#FFFFFF url(http://i32.tinypic.com/x5r143.jpg) no-repeat center center;}'
		+ '#selectors-toggler.down:hover {background-color:#F3F3F3;}';
	GM_addStyle(style);
	
	// create and insert the selectors toggler
	var navBar = document.getElementById('nav');
	selectorsBox = document.getElementById('selectors-box');
	selectorsToggler = document.createElement('a');
	selectorsToggler.id = 'selectors-toggler';
	selectorsToggler.href = 'javascript:void(0);';
	selectorsToggler.className = 'down';
	navBar.insertBefore(selectorsToggler, document.getElementById('add-box'));
	selectorsBox.style.display = 'none';
	selectorsToggler.addEventListener('click', toggleSelectors, true);
	
	// do something when the navigation sidebar toggler is clicked.
	document.getElementById('nav-toggler').addEventListener('click', onSidebarToggle, true);
}, false);

function nodeInserted(event){	
	if (event.target.tagName=="DIV"){
			if (event.target.className === "entry-actions"){
				// List mode
				var linkbar=event.target;
			} else if (event.target.firstChild && event.target.firstChild.className=="card"){
				// Expanded mode
				var linkbar=event.target.firstChild.firstChild.childNodes[2].childNodes[1].firstChild;
			} else
				return;
			
			var parent= linkbar;
			while (parent.tagName != "TBODY") {
				parent= parent.parentNode;
			}
			
			var link = parent.getElementsByClassName("entry-title-link")[0].getAttribute('href');
			var site = parent.getElementsByClassName("entry-source-title-parent")[0].getElementsByTagName("A")[0].firstChild.nodeValue;
			var title = parent.getElementsByClassName("entry-title-link")[0].firstChild.nodeValue;
			
			var span = document.createElement("span");
			span.className = "original-article link";
			var a_link = document.createElement("a");
			a_link.href = link;
			a_link.title = site + ": " + title;
			a_link.setAttribute('style','text-decoration:none;padding-right:10px;margin-right:10px; background: url(' + imgExternal +') center right no-repeat;');
			a_link.appendChild(document.createTextNode("Original Article"));
			span.appendChild(a_link);
			linkbar.appendChild(span);
	}
}
 
var u = document.createElement('table');
  u.setAttribute('id', 'unsubscribe-button');
  u.setAttribute('class', 'button-container unselectable button-container-tight viewer-buttons');
  u.innerHTML += '<tbody><tr><td class="btl"></td><td class="btr"></td></tr><tr><td class="bbl"></td><td class="bbr"><div class="button-body-container"><span class="button-body unselectable">Unsubscribe</span></div></td></tr></tbody>';
  u.addEventListener('click', function(e) {
    var ce = document.getElementById('current-entry');
    if (!ce) ce = document.getElementById('entries').firstChild;
    var cx = ce.getElementsByTagName('A');
    var m = null, f = null, t = null;
    for (var i = 0; i < cx.length; i++) {
      var o = cx[i].wrappedJSObject;
      if (o.getAttribute('class') && o.getAttribute('class').search(/entry-source-title/) >= 0) {
        f = o.getAttribute('href');
        if (m = f.match(/^\/reader\/view\/(feed\/.*)$/)) {
          f = unescape(m[1]);
        }
        t = o.textContent;
        break;
      }
    }
    if (!f) {
      alert('Could not identify feed to unsubscribe from.');
      return;
    }
    window.setTimeout("TB(['" + f + "'], '" + t.replace(/'/g, "\\'")
       + "', null, false)", 10);
  }, true);

  var r = document.getElementById('viewer-refresh');
  r.parentNode.insertBefore(u, r.nextSibling);
 
var accountname = document.getElementById('email-address');
document.title = document.title + " | " + accountname.innerHTML + " | ";

document.addEventListener("keydown", GRT_key, false);
if(entries)
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);
 toggle_gr();
 toggleSelectors();
 
 })();