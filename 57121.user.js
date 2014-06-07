// ==UserScript==
// @name         ScriptLoader
// @version      0.1
// @date         2006-12-15
// @description  Runtime javascript loader utility
// @author       Jot Dutta
// @namespace 	 http://www.joydutta.com
// ==/UserScript==
/*
	Copyright 2007  Joy Dutta

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

(function (){

  // script loader class
  function ScriptLoader() {
    var _eltScript = null;

    // dynamically add a script which fetches JSON data wrapped in a function which gets invoked
    this.loadSingleUseJSONScript = function(url) {
      if(_eltScript) { // remove old script as it is just a fn call and no more necessary
	_eltScript.parentNode.removeChild(_eltScript);
	_eltScript = null; // for GC
      }
      _eltScript = this.loadScript(url, true);
    };
    
    this.loadScript = function(url, nocache) {
      if(!url) { return null; }
      var el = document.createElement("script");
      el.setAttribute("type", "text/javascript");
      if(nocache) {
        if( url.indexOf('?') > -1) { url += '&'; }
        else { url += '?'; }
        url += 'rand=' + Math.random(); // to make it unique to get rid of any caching issues
      }
      el.setAttribute("src", url);
      document.getElementsByTagName('head')[0].appendChild(el);
      return el;
    };
  }

  var _sl = new ScriptLoader();
  var uw = unsafeWindow;

  // should not depend on other cross browser js libs
  if(document.addEventListener) { //code for Moz 
    document.addEventListener("keydown", keyCapt, false); 
  } 
  /*
  else { 
    document.attachEvent("onkeydown", keyCapt); //code for IE -- no need to bother since only FF can have userscripts
  } 
  */
  function keyCapt(ev) { 
    /*
    if(typeof uw.event != "undefined") { 
      ev = uw.event; //code for IE 
    } 
    */
    if(ev.keyCode === 119) {  // F8
      var url = prompt("URL to load: ");
      if(uw.console) { uw.console.log("url to load: " + url); }
      if(url && url !== '') {
        _sl.loadScript(url, false);
      }
    }
  }
})();

