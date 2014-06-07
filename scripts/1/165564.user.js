// ==UserScript==
// @id             iitc-plugin-keys@xelio
// @name           IITC plugin: Keys
// @version        0.1.0.20130413.012757
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://secure.jonatkins.com/iitc/release/plugins/keys.meta.js
// @downloadURL    https://secure.jonatkins.com/iitc/release/plugins/keys.user.js
// @description    [jonatkins-2013-04-13-012757] Store portal keys
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.keys = function() {};

window.plugin.keys.LOCAL_STORAGE_KEY = 'plugin-keys-data';

window.plugin.keys.keys = {};
window.plugin.keys.disabledMessage;
window.plugin.keys.contentHTML;

window.plugin.keys.addToSidebar = function() {
  if(typeof(Storage) === "undefined") {
    $('#portaldetails > .imgpreview').after(plugin.keys.disabledMessage);
    return;
  }

  $('#portaldetails > .imgpreview').after(plugin.keys.contentHTML);
  plugin.keys.updateDisplayCount();
}

window.plugin.keys.updateDisplayCount = function() {
  var guid = window.selectedPortal;
  var count = plugin.keys.keys[guid] || 0;
  $('#keys-count').html(count);
}

window.plugin.keys.addKey = function(addCount) {
  var guid = window.selectedPortal;
  var oldCount = plugin.keys.keys[guid];
  var newCount = Math.max((oldCount || 0) + addCount, 0);
  if(oldCount !== newCount) {
    if(newCount === 0) {
      delete plugin.keys.keys[guid];
    } else {
      plugin.keys.keys[guid] = newCount;
    }
    plugin.keys.storeKeys();
    plugin.keys.updateDisplayCount();
    window.runHooks('pluginKeysUpdateKey', {guid: guid, count: newCount});
  }
}

window.plugin.keys.storeKeys = function() {
  var keysObject = {keys: plugin.keys.keys};
  var keysObjectJSON = JSON.stringify(keysObject);
  localStorage[plugin.keys.LOCAL_STORAGE_KEY] = keysObjectJSON;
}

window.plugin.keys.loadKeys = function() {
  var keysObjectJSON = localStorage[plugin.keys.LOCAL_STORAGE_KEY];
  if(!keysObjectJSON) return;
  var keysObject = JSON.parse(keysObjectJSON);
  plugin.keys.keys = keysObject.keys;
}

window.plugin.keys.setupCSS = function() {
  $("<style>")
    .prop("type", "text/css")
    .html("#keys-content-outer {\n  display: table;\n  width: 100%;\n  height: 26px;\n  text-align: center;\n}\n\n#keys-content-outer > div{\n  display: inline-block;\n  vertical-align: middle;\n  margin: 6px 3px 1px 3px;\n}\n\n#keys-label {\n  padding: 0 4px;\n  cursor: help;\n}\n\n#keys-add {\n}\n\n#keys-count {\n  width: 26px;\n  height: 18px !important;\n  border: 1px solid;\n  text-align: center;\n  cursor: help;\n}\n\n#keys-subtract {\n}\n\n.keys-button {\n  position:relative;\n  width: 16px;\n  height: 16px !important;\n}\n\n.keys-button > div {\n  background-color: rgb(32, 168, 177);\n  position: absolute;\n}\n\n.keys-button-minus {\n  width: 100%;\n  height: 4px;\n  top: 6px;\n}\n\n.keys-button-plus-h {\n  width: 100%;\n  height: 4px;\n  top: 6px;\n}\n\n.keys-button-plus-v {\n  width: 4px;\n  height: 100%;\n  left: 6px;\n}\n\n#keys-help {\n  font-weight: 900;\n  margin: 6px 3px 1px 20px !important;\n  cursor: help;\n}\n")
  .appendTo("head");
}

window.plugin.keys.setupContent = function() {
  plugin.keys.contentHTML = '<div id="keys-content-outer">'
                              + '<div id="keys-label" title="Problem? Point to the question mark!">Key(s):</div>'
                              + '<div id="keys-add" class="keys-button" '
                              + 'onclick="window.plugin.keys.addKey(-1);">'
                               + '<div class="keys-button-minus"></div>'
                              + '</div>'
                              + '<div id="keys-count" title="Problem? Point to the question mark!"></div>'
                              + '<div id="keys-subtract" class="keys-button" '
                              + 'onclick="window.plugin.keys.addKey(1);">'
                                + '<div class="keys-button-plus-v"></div>'
                                + '<div class="keys-button-plus-h"></div>'
                              + '</div>'
                              + '<div id="keys-help" title="You MUST manually input your count of keys!\n'
                              + 'This plugin CANNOT automatically get the keys from Ingress!">?</div>'
                          + '</div>';
  plugin.keys.disabledMessage = '<div id="keys-content-outer" title="Your browser do not support localStorage">Plugin Keys disabled</div>';
}

var setup =  function() {
  if($.inArray('pluginKeysUpdateKey', window.VALID_HOOKS) < 0)
    window.VALID_HOOKS.push('pluginKeysUpdateKey');

  window.plugin.keys.setupCSS();
  window.plugin.keys.setupContent();
  window.plugin.keys.loadKeys();
  window.addHook('portalDetailsUpdated', window.plugin.keys.addToSidebar);
}

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
