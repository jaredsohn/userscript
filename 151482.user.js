// ==UserScript==
// @name       Koding DeKlutter
// @author     GRIFFnDOOR
// @namespace  Koding
// @version    11.1.2012
// @description  Removes new member and follower notifications from the news feed
// @match      *koding.com*
// @copyright  2012+, Griffin Howlett
// ==/UserScript==
var maiden = document.createElement('style');
  maiden.type = "text/css";
  maiden.innerHTML = ".system-message{ display:none!important; }";
document.getElementsByTagName('head')[0].appendChild(maiden);