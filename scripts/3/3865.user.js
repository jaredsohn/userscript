/*

Google cache unclutter
Version 0.3.1
(C) 2005 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

MORE FUN WITH A BOOKMARKLET! Get the Google cached version of a page with:

javascript:var loc;try{loc=unescape(/^chrome:\/\/global\/content\/netError\.xhtml\?.*?u=(.*?)&/.exec(location)[1])}catch(e){loc=location.href}; /https?/.test(loc.split(':')[0]) ? location='http://www.google.com/search?q=cache:' + escape(((loc.indexOf('?') == -1 || confirm('Send query string?\n\n' + loc.split('?')[1].split('#')[0])) ? loc.split('#')[0] : loc.split('?')[0]).split('#')[0]) + (loc.indexOf('#')!=-1?'#'+loc.split('#')[1]:'') : alert('Google only caches http and https URIs.')

*/

// ==UserScript==
// @name          Google cache unclutter
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description	  Remove the info pane from Google cache pages
// @include       http://*.104/search?q=cache:*
// ==/UserScript==

if(document.baseURI != window.location) {
  var clutterElements = [document.getElementsByTagName('table')[0], document.getElementsByTagName('hr')[0]];

  function toggleClutter() {
    var c, element;
    for(c = 0; element = clutterElements[c]; c++) {
      element.style.display = element.style.display == 'none' ? '' : 'none';
    }
  }

  toggleClutter();

  var toggleButton = document.createElement('a');
  toggleButton.appendChild(document.createTextNode('gc'));
  toggleButton.setAttribute('style', 'background: white; color: blue; font: 10px/100% verdana, sans-serif; padding: 1px; position: absolute; right: 0; top: 0; z-index: 9999999;');
  toggleButton.setAttribute('href', 'javascript:;');
  toggleButton.addEventListener('click', toggleClutter, false);
  document.body.appendChild(toggleButton);

  GM_registerMenuCommand('Toggle Google cache clutter', toggleClutter);
}