// ==UserScript==
// @name           Green SSL Password Fields
// @namespace      http://khopis.com/scripts
// @description    Colors the passwd field green if secure, red if not
// @include        *
// @icon           http://img402.imageshack.us/img402/3606/securecubegreen.png
// @author         Adam Katz <scriptsATkhopiscom>
// @version        0.4+20130129
// @copyright      2010+ by Adam Katz
// @license        AGPL v3+
// @licstart       The following is the entire license notice for this script.
/* 
 * Copyright (C) 2010-2012  Adam Katz
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.  This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 * Beerware: If you think this is worth it, you are welcome to buy me a beer.
 */ 
// @licend         The above is the entire license notice for this script.
// ==/UserScript==

var ssl_bg   = "#cfb";  // green background for SSL-protected password fields
var plain_bg = "#fcb";  // red background for non-SSL-protected password fields

var rel_ssl = rel_plain = '';
var pw_field = 'input[type="password"]';

function addStyle(content) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(content));
  var head = document.getElementsByTagName("head");
  head && head[0] ? head = head[0] : head = document.body;
  head.appendChild(style);
}

function pwcss(sel, rgb) {
  return sel + pw_field + ' { color:#000; background:' + rgb + '!important }\n';
}

if (location.protocol == "https:") { rel_ssl   = pw_field + ", "; }
else                               { rel_plain = pw_field + ", "; }

addStyle(
  pwcss(rel_ssl   + 'form[action^="https://"] ', ssl_bg) +
  pwcss(rel_plain + 'form[action^="http://"] ', plain_bg)
);

var forms = document.getElementsByTagName("form");

// For each form, on each password field, note the domain it submits to
// (unless it's the same domain as the current page).  TODO: strip subdomains?
for (var f=0, fl=forms.length; f < fl; f++) {
  var target;
  if (!forms[f].action || !forms[f].action.match) {
    // defaults for forms without actions -> assume JavaScript
    target = [ (location.protocol == "https:") , "javascript" ];
  } else {
    target = forms[f].action.match(/^http(s?):..([^\/]+)/i);
  }

  var pws = document.evaluate("//input[@type='password']", forms[f], null,
                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if (!pws || !target || !target[2]) { continue; }

  // Report when domain doesn't match
  var is_secure = " will be sent to <" + target[2] + ">";
  if (location.host == target[2]) { is_secure = ""; }

  if ( target[2].match(/^javascript(?![^:])/) ) {
    is_secure = "UNKNOWN SECURITY, password to be sent via " + target[2];
  } else if (target[1]) {
    is_secure = "SSL secured password" + is_secure;
  } else {
    is_secure = "INSECURE password" + is_secure;
  }

  for (var p=0, pl=pws.snapshotLength; p < pl; p++) {
    var field = pws.snapshotItem(p);

    // target is SSL, same host, and already has a rollover title -> never mind
    if (target[1] && target[2] == location.host && field.title) { continue; }

    // rollover text gets security notice plus previous title on newline
    field.title = is_secure + (field.title ? "\n" + field.title : "")
  }
}
