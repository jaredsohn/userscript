// ==UserScript==
// @name          Humpy Hank on Your Tumblr Dashboard
// @namespace     http://userscripts.org/scripts/show/101481
// @description   See Humpy Hank on your Tumblr Dashboard!
// @include       http://*tumblr.com/dashboard*
// @exclude       view-source:www.tumblr.com/dashboard*
// @exclude       *tumblr.com/dashboard/*?lite
// @version       1.2
// ==/UserScript==

var hank = document.createElement("div"); 
var new_post_icons = document.getElementById('new_post_icons'); 
var userWidth = document.body.clientWidth;

//calculate dist from browser edge to content edge

userWidth -= 899; //899 px is the width of the Tumblr dashboard
userWidth /= 2; //since the dashboard is centered, dividing by two gives you edge-to-edge dist

//place hank away from content edge
var hankStand = userWidth + 87;

//alert("Distance from edge is " + userWidth + " pixels."); //used for debugging

//define hank as an HTML element and give the HTML code
hank.innerHTML = '<div style="position:absolute; left:' + hankStand + 
    'px; z-index:1; top:84px;">'  +
    '<img src="http://content.wuala.com/contents/kobitate94/Public/userscripts/hank/newdashhank.gif"/>' +
    '</div></a>';

//insert hank before the first element in the body of the page
document.body.insertBefore(hank, document.body.firstChild);

// Code past this point is from http://userscripts.org/scripts/show/38017
// The copyright statement below does not apply

CheckScriptForUpdate = {
 id: '101481',
 days: 2, 

 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();

// Created by Kobi Tate
// http://notmadeofbeef.tumblr.com
// http://twitter.com/notmadeofbeef
// kobitate94@gmail.com

// Copyright 2011 Kobi Tate
// Distributed under GNU GPL
// Terms and conditions available at http://www.gnu.org/licenses/gpl.html