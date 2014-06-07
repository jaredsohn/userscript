// ==UserScript==
// @name           Rapidshare/Megaupload/Torrent en Partigi
// @namespace      http://victorpimentel.com
// @description    Añade enlaces a Rapidshare/Megaupload/Torrent a las películas de Partigi
// @include        http://*.partigi.com/peliculas/*
// @include        http://*.partigi.com/movies/*
// @author         Victor Pimentel <victor.pimentel@gmail.com>
// @copyright      2009 by Victor Pimentel
// @license        Public Domain
// @version        1.0
// @lastupdated    2009-10-07
// ==/UserScript==

// Wrap everything in an anonymous function because this script doesn't run
// in a wrapper when used in GreaseKit or other contexts other than Firefox
(function(){

// MODE:  site to download the film: rapidshare, megaupload, torrent, etc
var mode = 'rapidshare';

/////////////////////////////////////////////////////////

// UTILITIES:  to ensure Cross-browser compatibility

// Shortcut for getElementById
function $(id) {
  return typeof id == 'string' ? document.getElementById(id) : id;
}

// Shortcut for createElement
function $E(name, attributes, content) {
  if (typeof attributes == 'string') {
    content = attributes;
    attributes = null;
  }
  var node = document.createElement(name);
  if (attributes) for (var attr in attributes) node.setAttribute(attr, attributes[attr]);
  if (content) node.innerHTML = content;
  return node;
}

// Greasemonkey functions that can be implemented
if (typeof GM_getValue == 'function') {
  var getValue = GM_getValue;
  var setValue = GM_setValue;
  GM_registerMenuCommand('Cambiar el método de descarga en Partigi', chooseDS);
} else {
  var setValue = function (name, value) {
    document.cookie = [
      name, '=', escape(value), ';expires=',
      (new Date(new Date().getTime() + 365 * 1000 * 60 * 60 * 24)).toGMTString()
      ].join('');
  };
  var getValue = function (name, defaultValue) {
    var r = new RegExp(name + '=([^;]*)'), m;
    if (m = document.cookie.match(r)) {
      var dirty = unescape(m[1]);
      if (dirty == "true") {
        return true;
      } else if (dirty == "false") {
        return false
      } else {
        return dirty;
      }
    }
    return defaultValue;
  }
}

// Function to change the download method
function chooseDS() {
  var reply = prompt("¿Qué tipo de descarga prefieres?\n\n" +
    "Simplemente pon el nombre de la web o método de descarga.\n\n" +
    "Por ejemplo: rapidshare, megaupload, torrent, etc...", mode);
  setValue('mode', reply);
  location.reload();
}

/////////////////////////////////////////////////////////

// MAIN:  actual code to execute

// Continue only if there's a Video Player
var save_buttons = document.getElementsByClassName('save_this');

if (save_buttons) {

  // Get the user preferences
  mode = getValue('mode', mode);

  // Get the title
  var title = document.getElementsByTagName('h1')[0].textContent;

  // Build the target link
  var target = 'http://www.google.com/search?q=' + mode + '+' + title.replace(' ','+','g');

  // Build the element link
  var link = $E('a', {'href':target, 'class':'save_item', 'style':'background:green;color:white'}, 'Descargar');

  // Build the container
  var button = $E('div', {'class':'save_this'});

  // Add the link
  button.appendChild(link);

  // Add the button
  save_buttons[0].parentElement.appendChild(button);

}

})()