// ==UserScript==
// @name          Tibia Forum Ignore
// @namespace     http://www.erig.net/
// @description   Allows you to ignore player(s) on the Tibia Forums
// @include       http://forum.tibia.com/forum/*
// @version       0.1
// @author        Erig (http://www.erig.net/)
// ==/UserScript==

// --------------------------------------------------------------------
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

/*
    var find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
    var result5 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (result5.snapshotLength == 0) {
        tab = 3;
        find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
        result5 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    for (var c = 0; c < result5.snapshotLength; c++) {
        player = result5.snapshotItem(c);
        player = player.textContent;
        player = player.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
        players[player] = player;
    }
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getIgnoredPlayers() {
   var ignored = [];

   var cnt = GM_getValue('count', -1);

   if (cnt < 0) return ignored;

   for (var c = 0; c < cnt; c++) {
      if (GM_getValue('player'+c, '') == '')
          break;

      ignored.push(GM_getValue('player'+c));
   }

   return ignored;
}

window.ignored = [];

function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}

function putIgnoredPlayers(ignored) {
   var reallength = 0;

   for (var c = 0; c < ignored.length; c++) {
       if (ignored[c] !== undefined)
           reallength++;
   }

alert('Saving ' + reallength + ' players. Please refresh the page.');
   window.setTimeout(GM_setValue, 0, 'count', reallength);

   var realc = 0;

   for (var c = 0; c < ignored.length; c++) {
      if (ignored[c] !== undefined) {
          window.setTimeout(GM_setValue, 0, 'player'+realc, ignored[c]);
          realc++;
      }
   }
}

(function() {
    window.ignored = getIgnoredPlayers();

    var xpath_threadstarter = '//table/tbody/tr/td[4]/a/text()';
    var xpath_lastpost = '//table/tbody/tr/td[7]/font/a/text()';
    var xpath_post = '//table/tbody/tr/td[1]/div/b/a/text()';
    var xpath_reply = '//table/tbody/tr/td[1]/a/text()';

    var result = document.evaluate(xpath_threadstarter, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var msg = '';

    if (result.snapshotLength) {
        for (var c = 0; c < result.snapshotLength; c++) {
            var a_player = result.snapshotItem(c);
            var player = a_player.textContent.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
            msg += player + "\n";

            if (player in oc(window.ignored)) {
                a_player.parentNode.parentNode.parentNode.style.display = 'none';
            }
        }
    }

    var result = document.evaluate(xpath_lastpost, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var msg = '';

    if (result.snapshotLength) {
        for (var c = 0; c < result.snapshotLength; c++) {
            var a_player = result.snapshotItem(c);
            var player = a_player.textContent.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
            msg += player + "\n";

            if (player in oc(window.ignored)) {
                a_player.parentNode.parentNode.innerHTML = 'by &lt;IGNORED&gt;';
            }
        }
    }

    var result = document.evaluate(xpath_post, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var msg = '';

    if (result.snapshotLength) {
        for (var c = 0; c < result.snapshotLength; c++) {
            var a_player = result.snapshotItem(c);
            var player = a_player.textContent.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
            msg += player + "\n";

            if (player in oc(window.ignored)) {
                a_player.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                a_player.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
            }
        }
    }

    var result = document.evaluate(xpath_reply, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var msg = '';

    if (result.snapshotLength) {
        for (var c = 0; c < result.snapshotLength; c++) {
            var a_player = result.snapshotItem(c);
            var player = a_player.textContent.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
            msg += player + "\n";

            if (player in oc(window.ignored)) {
                a_player.parentNode.parentNode.parentNode.style.display = 'none';
            }
        }
    }

    addGlobalStyle(
  '#erig_forumignorebox { position: absolute; top: 10px; left: 10px; margin: 0; height: 1em; width: 1em; border: solid 1px black; background-color: #fff; overflow: scroll; }'
+ '#erig_forumignorebox_inner { border-top: solid 1px black; padding-top: 1em; }'
+ '#erig_forumignorebox a {'
+ '  font-family: Verdana, Arial, Times New Roman, sans-serif;'
+ '  font-weight: bold;'
+ '  color: #004294;'
+ '  font-size: 0.8em;'
+ '  text-decoration: none;'
+ '}'
);

    erig_forumignorebox_toggle = function() {
        var a = document.getElementById('erig_forumignorebox_a');
        var inner = document.getElementById('erig_forumignorebox_inner');

        if (inner.style.display == '') {
            a.innerHTML = '+';
            inner.style.display = 'none';
            inner.parentNode.style.width = '1em';
            inner.parentNode.style.height = '1em';
        }
        else {
            a.innerHTML = '&mdash;';
            inner.style.display = '';
            inner.parentNode.style.width = '200px';
            inner.parentNode.style.height = '300px';
        }

        return false;
    }
    unsafeWindow.erig_forumignorebox_toggle = erig_forumignorebox_toggle;

    erig_forumignorebox_add = function() {
        var player = prompt('Please enter the name of the player you wish to ignore:');

        if (player) {
            window.ignored.push(player);
            putIgnoredPlayers(window.ignored);
        }

        return false;
    }
    unsafeWindow.erig_forumignorebox_add = erig_forumignorebox_add;

    erig_forumignorebox_del = function(c) {
        window.ignored[c] = undefined;
        putIgnoredPlayers(window.ignored);

        return false;
    }
    unsafeWindow.erig_forumignorebox_del = erig_forumignorebox_del;


    var box = document.createElement('div');
    box.innerHTML = '<div><a id="erig_forumignorebox_a" href="#" onclick="return erig_forumignorebox_toggle()">+</a></div><div id="erig_forumignorebox_inner" style="display: none">';

    for (var c = 0; c < window.ignored.length; c++) {
        box.innerHTML += window.ignored[c] + ' <a href="#" onclick="return erig_forumignorebox_del(' + c + ')">[del]</a><br />';
    }

    box.innerHTML += '<br /><a href="#" onclick="return erig_forumignorebox_add()">[add]</a></div>';
    box.id = 'erig_forumignorebox';

    document.body.appendChild(box);

//    alert(msg);

    
})();
