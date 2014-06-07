// ==UserScript==
// @name          Tibia House Linker
//@namespace     http://www.ursoskull.ar.gd
// @description   link para casa em pagina do character
// @include       http://www.tibia.com/community/?subtopic=character*
// @version       1.0
// @author         Leandro Baldissera (http://www.fototibia.com/souldark)
// ==/UserScript==
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//
// This user script is compatible with Opera (no Greasemonkey needed).
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tibia House Linker", and click Uninstall.
//
// --------------------------------------------------------------------

(function() {
  var trs = document.getElementsByTagName('tr');
  var re = new RegExp('^(.+) \\((.+?)\\) (.+?)$');
  var fc;
  var world = '';
  var house = '';
  var city = '';
  var request;
  var house_code = null;
  
  httprecv = function() {
    if (request.readyState != 4) return;
    var text = request.responseText;
    var m;
    var h;
    house_code = null;
    text = text.replace(/\r|\n/g, '');
    house = house.replace(/(\xa0|&nbsp;| )/g, '&#160;');
    var regex = new RegExp('<TR(.*?)</FORM>', 'gi');
    var regex2 = new RegExp('<TD.*?>(.*?)</', 'i');
    var regex3 = new RegExp('<form(.*?)$', 'i');
    while((m = regex.exec(text)) != null) {
      h = regex2.exec(m[1]);
      h[1] = h[1].replace(/<NOBR>/gi, '');
      if (h[1] == house) {
        m = regex3.exec(m[1]);
        house_code = m[0];
        house_code = house_code.replace(/<td>|<tr>|<\/td>|<\/tr>/gi, '');
        break;
      }
    }
//    if (house_code != null) { fc.nextSibling.innerHTML = fc.nextSibling.innerHTML + "<p>" + house_code + "</FORM></p>"; }
    if (house_code != null) { fc.nextSibling.innerHTML = house_code + " " + fc.nextSibling.innerHTML + "</FORM>"; }
  }

  getworldtownhouses = function() {
    request = new XMLHttpRequest();
    request.onreadystatechange = httprecv;
    var params = "world=" + world + "&town=" + city + "&state=&order=&type=houses";
    var url = 'http://www.tibia.com/community/?subtopic=houses';
    request.open('POST', url);
    //Send the proper header information along with the request
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
    return false;
  }

  for (var i = 0; i < trs.length; i++) {
    if (trs[i].firstChild) {
      fc = trs[i].firstChild;

      if (fc.innerHTML == 'World:') {
        world = fc.nextSibling.textContent;
        fc.nextSibling.innerHTML = '<a href="/community/?subtopic=whoisonline&amp;world=' + world + '">' + world + '</a>';
      }
      if (fc.innerHTML == 'House:' && world) {
        var txt = fc.nextSibling.textContent;
        var matches = re.exec(txt);
        if (matches.length) {
          house = matches[1];
          city = matches[2];
          getworldtownhouses();
          break;
        }
      }
    }
  }
})();