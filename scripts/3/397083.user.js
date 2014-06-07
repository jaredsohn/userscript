// ==UserScript==
// @id             iitc-plugin-block-player-message@breezewish
// @name           Block player messages
// @category       Misc
// @version        0.0.1.20140223.220000
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      http://userscripts.org/scripts/source/397083.meta.js
// @downloadURL    http://userscripts.org/scripts/source/397083.user.js
// @description    [local-2014-02-22-161121] Make it clean! Block specific players' message in public or faction.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};




// PLUGIN START ////////////////////////////////////////////////////////
var LOCALSTORAGE_PREFIX = 'iitc-block-player-msg-';
var LOCALSTORAGE_BLOCKED = LOCALSTORAGE_PREFIX + 'blocked';

window.BLOCK_PLAYER_MSG_OPACITY = 0.16;

// use own namespace for plugin
window.plugin.blockPlayerMsg = function() {};

window.plugin.blockPlayerMsg.blockedPlayers = JSON.parse(localStorage.getItem(LOCALSTORAGE_BLOCKED)) || ['luobotix'];

window.plugin.blockPlayerMsg.escapeHTML = function(string) {
  var entityMap = {
    '&':  '&amp;',
    '<':  '&lt;',
    '>':  '&gt;',
    '"':  '&quot;',
    '\'': '&#39;',
    '/':  '&#x2F;'
  };
  return String(string).replace(/[&<>"'\/]/g, function(s) {
    return entityMap[s];
  });
}

window.plugin.blockPlayerMsg.isApplied = function(chatItem) {
  var $dom = $(chatItem[2]);
  return ($dom.attr('block-applied') === 'applied');
}

window.plugin.blockPlayerMsg.isInBlockList = function(_player) {
  var player = _player.toLowerCase();
  for(var i = window.plugin.blockPlayerMsg.blockedPlayers.length - 1; i >= 0; --i) {
    if(window.plugin.blockPlayerMsg.blockedPlayers[i].toLowerCase() == player) {
      return true;
    }
  }
  return false;
}

window.plugin.blockPlayerMsg.applySingle = function(_chatItem) {
  var chatItem = _chatItem.slice(0);
  
  var $dom = $(chatItem[2]);
  $dom.attr('block-applied', 'applied');
  $dom.attr('onclick', 'this.style.opacity=1');
  $dom.css('opacity', BLOCK_PLAYER_MSG_OPACITY);

  chatItem[2] = $dom.prop('outerHTML');
  return chatItem;
}

window.plugin.blockPlayerMsg.restoreSingle = function(_chatItem) {
  var chatItem = _chatItem.slice(0);
  
  var $dom = $(chatItem[2]);
  $dom.removeAttr('block-applied');
  $dom.removeAttr('style');

  chatItem[2] = $dom.prop('outerHTML');
  return chatItem;
}

window.plugin.blockPlayerMsg.applyMultiple = function(chatData) {
  for(var id in chatData) {
    var chatItem = chatData[id];
    if(window.plugin.blockPlayerMsg.isInBlockList(chatItem[3]) && !window.plugin.blockPlayerMsg.isApplied(chatItem)) {
      chatData[id] = window.plugin.blockPlayerMsg.applySingle(chatItem);
    }
  }
}

window.plugin.blockPlayerMsg.restoreMultiple = function(chatData) {
  for(var id in chatData) {
    var chatItem = chatData[id];
    if(window.plugin.blockPlayerMsg.isApplied(chatItem)) {
      chatData[id] = window.plugin.blockPlayerMsg.restoreSingle(chatItem);
    }
  }
}

window.plugin.blockPlayerMsg.applyAll = function(render) {
  window.plugin.blockPlayerMsg.applyMultiple(chat._faction.data);
  window.plugin.blockPlayerMsg.applyMultiple(chat._public.data);
  if(render === true) {
    window.chat.renderFaction(false);
    window.chat.renderPublic(false);
  }
}

window.plugin.blockPlayerMsg.restoreAll = function(render) {
  window.plugin.blockPlayerMsg.restoreMultiple(chat._faction.data);
  window.plugin.blockPlayerMsg.restoreMultiple(chat._public.data);
  if(render === true) {
    window.chat.renderFaction(false);
    window.chat.renderPublic(false);
  }
}

window.plugin.blockPlayerMsg.reApply = function(render) {
  window.plugin.blockPlayerMsg.restoreAll();
  window.plugin.blockPlayerMsg.applyAll(render);
}

window.plugin.blockPlayerMsg.updateBlockedList = function(data) {
  window.plugin.blockPlayerMsg.blockedPlayers = [];
  data.split('\n').forEach(function(_player) {
    var player = _player.trim();
    if(player.length > 0) {
      window.plugin.blockPlayerMsg.blockedPlayers.push(player);
    }
  });
  localStorage.setItem(LOCALSTORAGE_BLOCKED, JSON.stringify(window.plugin.blockPlayerMsg.blockedPlayers));
  window.plugin.blockPlayerMsg.reApply(true);
}

window.plugin.blockPlayerMsg.handleData = function(data) {
  window.plugin.blockPlayerMsg.applyMultiple(data.processed);
}

window.plugin.blockPlayerMsg.showDialog = function() {
  dialog({
    html: 'Format: One player name per line (case insensitive)<br>Note: Remember to click <strong>UPDATE</strong> if you made any modifications.<br><textarea>' + window.plugin.blockPlayerMsg.escapeHTML(window.plugin.blockPlayerMsg.blockedPlayers.join('\n')) + '</textarea>',
    title: 'Edit blocked players',
    id: 'block-player-msg',
    dialogClass: 'ui-dialog-block-player-msg',
    width: 350,
    buttons: {
      'UPDATE!': function() {
        window.plugin.blockPlayerMsg.updateBlockedList($('.ui-dialog-block-player-msg textarea').val());
        $(this).dialog('close');
      },
    }
  });
}

window.plugin.blockPlayerMsg.setup = function() {
  $('#toolbox').append(' <a onclick="window.plugin.blockPlayerMsg.showDialog()" title="Edit blocked player list">Block Player</a>');
  addHook('publicChatDataAvailable', window.plugin.blockPlayerMsg.handleData);
  addHook('factionChatDataAvailable', window.plugin.blockPlayerMsg.handleData);

  $('head').append(
    '<style>' +
    '.ui-dialog-block-player-msg textarea { width:96%; height:200px; resize:vertical; }' +
    '</style>'
  );
}

var setup = plugin.blockPlayerMsg.setup;

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


