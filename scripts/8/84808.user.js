// ==UserScript==
// @name           Development Domain Reminder
// @namespace      http://aaroncouch.info/grease-monkey-development-domain-notification
// @description    Places an unobtrusive note on screen when using .local or .dev domains as a reminder you are working locally.
// @include        *
// ==/UserScript==

var local = new Array('local', 'green', 'You are working locally.');
var example = new Array('example.com', 'red', 'You are working on the example server');

var sites = [local, example];
var host = location.href;
var hostcheck = location.host.split('.');

for (n = 0; n < sites.length; n++) {
  // Don't want to include live sites, if host starts with www or base url reject
  if (hostcheck[0] != 'www' && hostcheck[0] != sites[n][0]) { 
    if (host.match(sites[n][0])) {
      var msg = sites[n][2];
      var color = sites[n][1]; 
      var style = '#local_alert { color: #FFF; background-color: ' + color + '; border: 1px dotted ' + color + '; position: fixed; z-index: 99999; bottom: 0px; right: 0px; padding: 3px; font-size: 9px; }';
      addGlobalStyle(style);        					
      alert(msg);
    }
  }
}
//functions borrowed from http://userscripts.org/scripts/review/47267
function alert(input) {
  var newPopup = document.createElement('div');
  newPopup.setAttribute('id','local_alert');
  newPopup.innerHTML=input;
  document.body.insertBefore(newPopup, document.body.firstChild);
}
        
function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
