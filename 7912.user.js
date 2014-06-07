// ==UserScript==
// @name          iGoogle Max
// @author        Mikel Gómez - http://ikax.net?contact
// @namespace     http://ikax.net
// @description   Hides Search/Footer. Round tabs. etc.
// @include       http://google.*/ig*
// @include       http://www.google.*/ig*
// ==/UserScript==
// googleIGmax.user.js - v0.2-2007.07.19 (1.0-2007.04.13) mikel.gomez
// ---------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hide Personalized Google Search Box", and click Uninstall.
// ---------------------------------------------------------------------

// Hides header background image.
var obj1 = document.getElementById('nhdrwrap') ;
var obj2 = document.getElementById('nhdrwrapinner') ;
var obj3 = document.getElementById('nhdrwrapsizer') ;
var doc3 = document.getElementById('doc3') ;
if(obj1) obj1.style.backgroundImage = 'none';
if(obj2) obj2.style.backgroundImage = 'none';
if(obj1) obj1.style.backgroundColor = 'white';
if(obj3) obj3.style.height          = 'auto';
if(doc3) doc3.style.backgroundColor = 'white';

// Hides "Footer".
var elm = document.getElementById('footerwrap');
if(elm) elm.style.display = 'none';
var elm = document.getElementById('modules');
if(elm) elm.style.marginBottom = '1em' ;
if(elm) elm.style.borderBottom = '1px solid silver' ;

// Compose email address.
var b = document.getElementsByTagName('b') ;
for(var i=0; i<b.length; i++) {
  if(b) {
    var obj = b[i] ;
    var eio = obj.innerHTML.indexOf('@gmail.com') ;
    if (eio>0) {
      var gc = obj.innerHTML ;
      gc = gc.replace(/<[^<>]*>/gi, '');
      gc = gc.replace(/mailto:/, '');
      gc = gc.replace(/@gmail\.com/, '');
      // document.title = gc ; // Uses email address on page title.
      gc = '<a href="http://mail.google.com/mail/­?view=cm&fs=1&tf=1">' + gc + '</a>' ;
      obj.innerHTML = gc ;
      // if(b) b[i].innerHTML = '' ; // Removes email address.
      break;
    }
  }
}

// Black links on header.
blackLinks(document.getElementById('nhdrwrap'));
blackLinks(document.getElementById('gbar'));
blackLinks(document.getElementById('guser'));
function blackLinks(obj) {
  if(obj) {
    var links = obj.getElementsByTagName('a') ;
    for(var i=0; i<links.length; i++)
      // var obj2 = links[i] ;
      links[i].style.color = 'black' ;
  }
}

// Round tabs.
var radius = 5;
var tabs = document.getElementsByTagName('li');
for(var i=0; i<tabs.length; i++) {
  if(tabs[i].id.match(/tab.*_view/))
    tabs[i].style.MozBorderRadius = radius + 'px ' + radius + 'px 0px 0px' ;
}

// Find search box.
var elm = document.getElementById('gsea');
if(elm) {

  // Find signIn/signOut link.
  var links = document.getElementsByTagName('a') ;
  var signlink = '' ;
  for(var i=0; i<links.length; i++) {
    var obj = links[i] ;
    if ((obj.href.indexOf('/logout')>=0) || (obj.href.indexOf('/ServiceLogin')>=0)) {
      signlink = obj ;
      break;
    }
  }
  if (!signlink) return

  // Hides search box.
  elm.style.display = 'none' ;

  // Creates "search" link.
  link = document.createElement('a');
  link.innerHTML = 'Search';
  link.href= 'javascript:void(0)';
  link.style.color = 'red' ;
  signlink.parentNode.insertBefore(link, signlink);
  signlink.parentNode.insertBefore(document.createTextNode(' | '), signlink);
  link.setAttribute("onclick", "if (this.innerHTML=='Search') {document.getElementById('gsea').style.display=''; this.innerHTML='Hide Search';} else {document.getElementById('gsea').style.display='none'; this.innerHTML='Search';}");
}


// Hides "Add Stuff" link.
// var elm = document.getElementById('addstuff');
// if(elm) elm.innerHTML = '&nbsp;' ;

// "tabs" width 100%
// var elm = document.getElementById('tabs');
// if(elm) elm.style.width = '100%';

// Black links on header.
// var obj1 = document.getElementById('nhdrwrap') ;
// if(obj1) {
//   var links = obj1.getElementsByTagName('a') ;
//   for(var i=0; i<links.length; i++) {
//     var obj = links[i] ;
//     obj.style.color = 'black' ;
//   }
// }


