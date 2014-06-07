// ==UserScript==                                                                
// @name          Keyboardlib                                      
// @namespace     http://4chan.org/neoquest                                      
// @description   Keyboard dispatch library 
// ==/UserScript==    

var KeyboardDispatcher = function(get, log) {
  this.get = get || GM_getValue;
  this.log = log || function() {};
  this.actions = {};
  this.keyToAction = {};
  this.actionToFunctions = {};
  this.appendValue = function(dict, key, value) {
    if (!dict[key]) {
      dict[key] = [];
    }
    dict[key].push(value);
  };
  this.disableOnKeyDown = false;
};

KeyboardDispatcher.prototype.addAction = function(action, defaultKey, desc) {
  this.actions[action] = {
    type: 'string',
    label: desc || action,
    default: defaultKey
  };
  return this;
};

KeyboardDispatcher.prototype.attachFunction = function(action, func) {
  this.appendValue(this.actionToFunctions, action, func);
  return this;
};

KeyboardDispatcher.prototype.getActions = function() {
  return JSON.parse(JSON.stringify(this.actions));
};

KeyboardDispatcher.prototype.onKeyDown = function(e) {
  if (this.disableOnKeyDown)
    return;
  var key = String.fromCharCode(e.which).toUpperCase();
  log('KEY: ' + key);
  var action = this.keyToAction[key];
  log('ACTION: ' + action);
  if (action) {
    var funcList = this.actionToFunctions[action];
    if (funcList) {
      for (var i = 0; i < funcList.length; i++) {
        if(funcList[i](action, this)) {
          this.disableOnKeyDown = true;
          break;
        }
        this.disableOnKeyDown = false;
      }
    }
  }
};

KeyboardDispatcher.prototype.reload = function() {
  var dict = this.keyToAction;
  for (var i in this.actions) {
    var action = this.actions[i];
    var key = get(i) || action.default;
    for (var j = 0; j < key.length; j++) {
      this.keyToAction[key[j]] = i;
    }
  }
};

KeyboardDispatcher.prototype.start = function() {
  this.reload();
  var self = this;
  var onKeyDown = function(e) {
    self.onKeyDown(e);
  }
  window.addEventListener('keydown', onKeyDown, true);
};

