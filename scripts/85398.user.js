// ==UserScript==
// @name           Content Global Reader
// @description    Library, to use with @require, to read globals from the content scope.
// ==/UserScript==

var read_content_global;
(function() {
var callbacks = [];
var callback_counter = 0;

function dispatch_global(id, name, value) {
  var msg_data = {
      'type': 'read_content_global',
      'callback_id': id,
      'name': name,
      'data': value,
      };
  var msg = JSON.stringify(msg_data);
  window.postMessage(msg, '*');
}
location.href = 'javascript:'+dispatch_global.toString();

function receive_global(event) {
  try {
    var result = JSON.parse(event.data);
    if ('read_content_global' != result.type) return;
    if (!callbacks[result.callback_id]) return;
    callbacks[result.callback_id](result.name, result.data);
    del(callbacks[result.callback_id]);
  } catch (e) {
    // No-op.
  }
}
window.addEventListener('message', receive_global, false);

read_content_global = function(name, callback) {
  var id = (callback_counter++);
  callbacks[id] = callback;

  location.href = 'javascript:dispatch_global('
      + id + ', "'
      + name.replace(/\"/g, '\\"') + '", '
      + name 
      + ');void(0);';
}
})();
