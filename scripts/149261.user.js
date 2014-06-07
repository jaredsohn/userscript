// ==UserScript==
// @name            @updateURL & @downloadURL Test
// @namespace       http://userscripts.org
// @description     @updateURL & @downloadURL Test
// @version         0.3
// @updateURL       https://userscripts.org/scripts/source/149261.meta.js
// @downloadURL     https://userscripts.org/scripts/source/149261.user.js
// @include        *

// ==/UserScript==

//test 03
var CheckForUpdates = function (name, version, id) {
    var today = new Date();
    today = today.getDate();
    var lastupdate = GM_getValue('lastupdate', 1000);
    var dif = today - lastupdate;
    var updatedays = 0; //how many days between update checks (set to 0 to check every time you visit userscripts.org)
    var uurl = 'https://userscripts.org/scripts/source/' + id + '.meta.js';

    this.init = function () {
      if (dif >= updatedays || dif <= -updatedays) {
        GM_setValue('lastupdate', today);
        this.check();
      }
    }

    this.check = function () {
      GM_xmlhttpRequest({
        method: "GET",
        url: uurl,
        onreadystatechange: this.doupdate
      });
    }

    this.doupdate = function (o) {
      if (o.readyState == 4) {
        checkver = o.responseText.substr(0, 300);
        checkver = checkver.split('@version')[1];
        checkver = parseInt(checkver.replace(/\./g, '')) + 100;
        thisver = parseInt(version.replace(/\./g, '')) + 100;
        if (checkver > thisver) {
          if (confirm('Update ' + name + '?')) {
            window.location = 'http://userscripts.org/scripts/source/' + id + '.user.js';
          }
        }

      }
    }

    this.init();
  }

wloc = '' + window.location;
pattern = /4shared/;
result = wloc.match(pattern);
if (result) //check for updates
CheckForUpdates('AutoUpdateTest', '0.3', 149261); //CheckForUpdates(scriptname,scriptversion,scriptnumber);