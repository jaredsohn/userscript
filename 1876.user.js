// GreaseMonkey user script to enhance Squirrelmail
// Version 1.08, 2005-10-15
//
// Copyright (c) 2005, Ruud H.G. van Tol
//   Dr.Ruud <rvtol+greasemonkey@isolution.nl>
// Released under the GPL license
//   <URL:http://www.gnu.org/copyleft/gpl.html>
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Mozilla/Firefox and revisit this script.
//
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Squirrelmail Accessibility Enhancements (by Dr.Ruud)
// @namespace    http://isolution.xs4all.nl
// @description  Alt-R = mark Read, Alt-U = mark Unread, Alt-D = Delete, Alt-T = Toggle all, etc.
// @include      https://webmail.xs4all.nl/src/right_main.php
// @include      https://webmail.xs4all.nl/src/right_main.php?*
// @include      https://dovemail.xs4all.nl/src/right_main.php
// @include      https://dovemail.xs4all.nl/src/right_main.php?*
// ==/UserScript==

(function() {
  var doc = document, elm, frm, i, lang, n = document.forms.length, s;
  var gKeys = 'h'  /* fill with lowercase letters of acceskeys that you don't want assigned */;

////
/// change some button faces and give them access keys
//
  for (i=0; i<n; i++) {
    elm = doc.forms[i].elements;
    if (elm['markUnread']) {

      lang = ('Unread' == elm['markUnread'].value) ? 'en' : 'nl';

      switch (lang) {
      case 'nl':
        insertLabel(doc, elm['moveButton'], 'e', 'V' + accessCase('erplaats'));
        insertLabel(doc, elm['attache'],    'd', accessCase('Doorsturen'));
        insertLabel(doc, elm['markRead'],   'l', 'Ge' + accessCase('lezen'));
        insertLabel(doc, elm['markUnread'], 'z', 'Ongele' + accessCase('zen'));
        insertLabel(doc, elm['delete'],     'w', 'Ver' + accessCase('wijder'));
        break;
      default:
        insertLabel(doc, elm['moveButton'], 'm', accessCase('Move'));
        insertLabel(doc, elm['attache'],    'o', 'F' + accessCase('orward'));
        insertLabel(doc, elm['markRead'],   'r', accessCase('Read'));
        insertLabel(doc, elm['markUnread'], 'u', accessCase('Unread'));
        insertLabel(doc, elm['delete'],     'd', accessCase('Delete'));
      }
      frm = doc.forms[i];
      break /* form found, so get out of here */;
    }
  }

// v.1.06:  var allAs = frm.getElementsByTagName('a'), e;
  var allAs = doc.getElementsByTagName('a'), e;
  n = allAs.length;

////
/// give specific anchors an access key
//
  for (i=0; i<n; i++) {
    e = allAs[i];

    if (String(e.href).match(/^javascript:void[(]0[)]$/)
    &&  String(e.onclick).match(/CheckAll/)) {

      switch (lang) {
      case 'nl':
        setKey(e, 's', 'Selectie wisselen');
        break;
      default:
        setKey(e, 't', 'Toggle all');
      }

    } else if (String(e.href).match(/^javascript:void[(]0[)]$/)
    &&  String(e.onclick).match(/comp_in_new[(]/)) {

      switch (lang) {
      case 'nl':
        setKey(e, 'n', 'Nieuw bericht');
        break;
      default:
        setKey(e, 'c', 'Compose');
      }

    } else if (String(e.href).match(/startMessage=\d+&/)
           &&  String(s = e.innerHTML).match(/(^[A-Z])|(^\d+$)/)) {
      setKey(e, s.substring(0, 1).toLowerCase(), s);
    }
  }

/* debug: activate next line by doubling the / at the start of this line
  window.alert('gKeys=' + gKeys + '='); /**/

/////-------------------------------------------
////
/// accessCase a string (to show the accessKey)
//
  function accessCase(s /*, f = 1, n = 94 */) {
    var argv = arguments;
    var argc = argv.length;
    var f = (argc>1) ? argv[1] :  1;  //format:   1=(c)   2=&#xU;   3=U
    var n = (argc>2) ? argv[2] : 94;  //default:  'X'

    var c = s.substring(0, 1);

    if (f > 1) {
      if (c.match(/[0-9]/)) {
                // 1: 2460!, 2474!, 2488!, 24F5?, 2673?, 2680?, 2776!, 2780!, 278A!
                // 0: 1D7CE, 1D7D8, 1D7E2, 1D7EC, 1D7F6, E0030
        n = parseInt('2460', 16) + parseInt(c) - 1;
      } else if (c.match(/[A-Za-z]/)) {
                // A: 249C?, 24B6!!, 24D0?, E0041?, E0061?
        n = parseInt('24B6', 16) + parseInt(c, 36) - 10;
      }
    }

    switch (f) {
      case 1: c = '(' + c + ')'               ; break;
      case 2: c = '&#x' + n.toString(16) + ';'; break;
      case 3: c = String.fromCharCode(n)      ; break;
    }
    return c + s.substring(1);
  }

/////--------------------------------------------
////
/// insertLabel: add a Label with an accessKey to an INPUT
//
  function insertLabel(doc, elm, key, txt) {
    if (-1 == gKeys.indexOf(key)) {
      if (!elm.id) elm.id = elm.name;

      var newLabel = doc.createElement('label');
      newLabel.setAttribute('for', elm.id);
      newLabel.accessKey = key;
      newLabel.innerHTML = '&nbsp;';

      elm.parentNode.insertBefore(newLabel, elm);
      elm.value = txt;
    }
    gKeys += key;
  }

/////--------------------------------------------
////
/// setKey: set an accessKey of an ANCHOR
//
  function setKey(elm, key, txt) {
    if (-1 == gKeys.indexOf(key)) {
      elm.accessKey = key;
      elm.innerHTML = accessCase(txt, 2);
    } else if (elm.innerHTML !== txt) {
      elm.innerHTML = txt;
    }
    gKeys += key;
  }

//---------------------------------------------
})();
