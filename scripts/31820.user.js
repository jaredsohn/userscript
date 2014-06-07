// ==UserScript==
// @name        Tab Completion for Campfire
// @namespace   http://code.cimians.com
// @description If you hit tab in the campfire chat window, it will tab complete on usernames.
// @author      Jesse McPherson, CIM Engineering
// @author      Mat Schaffer, CIM Engineering
// @homepage    http://code.cimians.com
// @include     http*//*.campfirenow.com/room*
// ==/UserScript==

Event.KEY_SPACE = 32;

(function() {
  var self = this;
  var f = $('input');
  
  var getSelection = function() {
    return f.value.substring(f.selectionStart, f.selectionEnd);;
  }
  
  var setName = function(stub, name, doSelect) {
    var ss = f.value.length;
    var stub_pattern = new RegExp(stub+'$','i');  
    f.value = f.value.replace(stub_pattern, name);
    if(!doSelect) ss = f.value.length;
    var se = f.value.length;
    f.setSelectionRange(ss,se);
  }
  
  var clearGlobals = function() {
    delete self.tc_matches;
    delete self.tc_stub;
    delete self.tc_index;
  }
  
  var incrementIndex = function() {
    if(!self.tc_matches) return;
    
    var l = self.tc_matches.length;
    self.tc_index += 1;
    if(self.tc_index >= l) self.tc_index = 0;
    return self.tc_index;
  }
  
  var showNextMatch = function() {
    var name = self.tc_matches[incrementIndex()];
    var selection_pattern = new RegExp(getSelection()+'$');
    f.value = f.value.replace(selection_pattern,'');
    setName(self.tc_stub, name, true);
  }
  
  var handlePress = function(evt) {
    var v = f.value;
    
    if(event.keyCode == Event.KEY_SPACE && self.tc_matches) {
      f.selectionStart = v.length
      clearGlobals();
    } else if (event.keyCode == Event.KEY_TAB) {
      if(self.tc_matches) {
        showNextMatch();
        return false;
      }
      var selection_start = v.length;
      var stub = $A(v.split(" ")).last();
      var stub_pattern = new RegExp('^' + RegExp.escape(stub), 'i');
      var m = (new Campfire.Addresser(window.chat)).participants().grep(stub_pattern);
      if(!m.length) return false;
      var doSel = false;
      
      if(m.length > 1) {
        self.tc_matches = m;
        self.tc_stub = stub;
        self.tc_index = 0;
        doSel = true;
      }
      
      setName(stub, m.first(), doSel);
      f.focus();
      
    } else if(self.tc_matches) {
      clearGlobals()
    }
  }
  
  f.observe('keypress',handlePress);
})();