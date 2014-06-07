// ==UserScript==
// @name        RebuildPlenty
// @namespace   gfritzsche.userscripts
// @description Rebuild a plenty
// @author      Georg Fritzsche
// @license     MPL
// @include     https://secure.pub.build.mozilla.org/buildapi/self-serve/*
// @include     https://tbpl.mozilla.org/*
// @version     4
// @grant       none
// ==/UserScript==

if (('contextMenu' in document.body) && ('HTMLMenuItemElement' in window)) 
{

var tbpl = window.location.host == 'tbpl.mozilla.org';
var rebuildAction = null;

var menu = '<menu type="context" id="userscript-rebuild-plenty-menu">\
            <menuitem label="Rebuild plenty ...">dummy</menuitem>\
            </menu>';
var menuDiv = document.createElement('div');
document.body.appendChild(menuDiv);
menuDiv.innerHTML = menu;
var menuItem = document.querySelector('#userscript-rebuild-plenty-menu menuitem');

document.body.addEventListener('contextmenu', function(evt) {
  var t = evt.target;
  rebuildAction = null;
  
  if (tbpl && t.localName == 'img' && t.title == 'Retrigger Job') {
      rebuildAction = function(count) { 
        for (var i=0; i<count; ++i) { t.click(); } 
      };
  } else if (tbpl && t.localName == 'a' && t.hasAttribute('resultid') &&
             t.className.split(' ')[0] == 'machineResult' && t.className.split(' ')[1] != 'pending') {
      rebuildAction = function(count) {
        for (var i=0; i<count; ++i) { 
          UserInterface._rebuildButtonClick(this, t.getAttribute('resultid').split('-').pop()); 
        } 
      };
  } else if (!tbpl && t.localName == 'input' && t.type == 'submit' && t.value == 'rebuild') {
      var buildid = t.parentNode.build_id.value;
      var action  = t.parentNode.action;
      rebuildAction = function(count) { rebuildSelfServe(count, buildid, action); };
  }

  if (rebuildAction) {
    document.body.setAttribute('contextmenu', 'userscript-rebuild-plenty-menu');
  } else {
    document.body.removeAttribute('contextmenu');
  }
}, false);

function rebuildSelfServe(count, buildid, action) {  
  console.log('RebuildPlenty: buildid='+buildid+', action='+action);

  for (i=0; i<count; ++i) {
    var form = new FormData(); 
    form.append('_method', 'POST'); 
    form.append('build_id', buildid);
    var req = new XMLHttpRequest(); 
    req.open('POST', action); 
    req.send(form);
  }
}

menuItem.addEventListener('click', function(event) {
  var count = parseInt(window.prompt('Rebuild count?', '1'));
  if (count == NaN || count < 1 || count > 50) {
    console.log('RebuildPlenty: err... nope.');
    return;
  }

  rebuildAction(count);
}, false);

}