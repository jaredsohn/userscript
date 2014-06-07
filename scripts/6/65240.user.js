// ==UserScript==
// @name           to donate
// @namespace      whatever
// @include        http://www.ejahan.com/profile-*
// ==/UserScript==
location                 = window.location.href;
RegExp.escape = function(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}
var locationcheck        = new RegExp(RegExp.escape("http://www.ejahan.com/profile-")+"([0-9]+)"+RegExp.escape(".html"))
result                   = locationcheck.test(location);
if(result == true){
	var regex            = new RegExp("[0-9]+")
	var m                = regex.exec(location)
	player_id            = m[m.length-1]
	window.location.href = "http://www.ejahan.com/profile-"+player_id+"-donate.html";
}