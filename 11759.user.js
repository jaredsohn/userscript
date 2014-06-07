// ==UserScript==
// @name           Minibuffer
// @namespace      http://white.s151.xrea.com/
// @description    Minibuffer
// @include        *
// ==/UserScript==

var VERSION = "2009.12.06";

var Class = function(){return function(){this.initialize.apply(this,arguments)}};

// string key
var Key = new Class();

//  32-40 space pageup pagedown end home left up right down
Key.keyCodeStr = {
	8:  'BAC',
	9:  'TAB',
	10: 'RET',
	13: 'RET',
	27: 'ESC',
	33: 'PageUp',
	34: 'PageDown',
	35: 'End',
	36: 'Home',
	37: 'Left',
	38: 'Up',
	39: 'Right',
	40: 'Down',
	45: 'Insert',
	46: 'Delete',
	112: 'F1',
	113: 'F2',
	114: 'F3',
	115: 'F4',
	116: 'F5',
	117: 'F6',
	118: 'F7',
	119: 'F8',
	120: 'F9',
	121: 'F10',
	122: 'F11',
	123: 'F12'
};
Key.whichStr = {
	32: 'SPC'
};
Key.specialKeys = values(Key.keyCodeStr).concat(values(Key.whichStr));

Key.getKeyIdentifier = function(aEvent){
  // http://www.w3.org/TR/DOM-Level-3-Events/keyset.html
  return ((aEvent.keyCode in this.keyCodeStr) && this.keyCodeStr[aEvent.keyCode]) ||
	        ((aEvent.which in this.whichStr) && this.whichStr[aEvent.which]) ||
	        String.fromCharCode(aEvent.which);
};

Key.prototype = {
  initialize: function(){
	  this.orig_string = arguments[0];
	  this.key = this.orig_string.replace(/[ACMS]-/g,'');
    this.special = !!~Key.specialKeys.indexOf(this.key);
  },
  has: function(modifier){return this.orig_string.indexOf(modifier) > -1},
  equal: function (e, ch){
	  return (this.key == ch &&
	          this.has('C-') == e.ctrlKey &&
	          ((this.special)? this.has('S-') == e.shiftKey : true) &&
	          (e.metaKey || e.altKey) == (this.has('A-') || this.has('M-')))
  }
};

var ShortcutKey = new Class();
ShortcutKey.prototype = {
  initialize: function(){
	  this.hash = {};
	  this.state_available = false;
	  this.prevent_event = true;
	  this.through_input_elements = false;
	  this.parent = null;
	  this.html = null;
	  this.descriptions = [];
  },
  setParent: function(parent){this.parent = parent; return this},
  isAvailable: function(){return this.state_available},
  addCommand: function(opt){
	  var lst  = opt.key.split(' ');
	  var last = lst.last();
	  if(this.id) this.addDescription(opt);
	  var self = this;
	  var idx = 0;
	  var last_idx = lst.length - 1;
	  lst.forEach(function(k){
		  if(idx++ != last_idx){
			  var new_shortcutkey;
			  if(self.hash[k]){
				  new_shortcutkey = self.hash[k][1];
			  }else{
				  new_shortcutkey = new ShortcutKey().setParent(self);
				  new_shortcutkey.prevent_event = self.prevent_event;
				  new_shortcutkey.setParameter(self.target, self.event, function(e){new_shortcutkey.listener(e)}, self.capture);
			  }
			  self.hash[k] = [new Key(k), new_shortcutkey];
			  self = new_shortcutkey;
		  }else{
			  self.hash[k] = [new Key(k), opt.command];
		  }
	  });
  },
  addDescription: function(opt){
	  var getKeyHTML = function(key, description){
		  return $N('div',{},
		            [$N('kbd',{},key),
		             $N('div',{},description)]);
	  };
	  var div = getKeyHTML(opt.key, opt.description);
	  this.html.appendChild(div);
	  this.descriptions.push({key:opt.key, html:div});
  },
  removeCommand: function(key){
	  delete this.hash[key];
  },
  findByEvent: function(e, ch){return values(this.hash).find(function(kf){return kf[0].equal(e, ch) && kf})},
  removeEventListener: function(){
	  this.disable();
	  this.setParameter(null, null, null, null);
  },
  addEventListener: function(target, event, capture){ // (document, 'keypress', true)
	  var self = this;
	  this.setParameter(target, event, function(e){self.listener(e)}, capture);
	  this.enable();
  },
  setParameter: function(target, event, observer, capture){
	  this.target   = target;
	  this.event    = event;
	  this.observer = observer;
	  this.capture  = capture;
  },

// enable/disable temporary
  enable: function(){this.state_available = true;this.target.addEventListener(this.event, this.observer, this.capture);},
  disable: function(){this.state_available = false; this.target.removeEventListener(this.event, this.observer, this.capture)},

  throughEvent: function(){this.prevent_event = false; return this},
  throughInputElements: function(){this.through_input_elements = true; return this},

  getAllKeys: function(){return keys(this.hash)},

  backToRoot: function(){
	  if(!this.parent) return;
	  var tmp = this;
	  while(tmp.parent){
		  tmp.disable();
		  tmp = tmp.parent;
	  }
	  tmp.enable();
  },
  listener: function(aEvent){
	  if(!this.capture &&
	     this.through_input_elements &&
	     /^(?:input|textarea)$/.test(aEvent.target.nodeName.toLowerCase())) return;
	  var ch = Key.getKeyIdentifier(aEvent);
	  var kf = this.findByEvent(aEvent, ch);
	  var preventDefault = this.prevent_event;
//	  log(aEvent.keyCode, aEvent.which, ch,kf, aEvent.shiftKey);
	  if(kf){
		  var fn = kf[1];
		  if(ShortcutKey.prototype.isPrototypeOf(fn)){
			  this.disable();
			  fn.enable();
		  }else{
			  fn(aEvent);
			  this.backToRoot();
		  }
	  }else{
		  this.backToRoot();
		  preventDefault = false;
	  }
	  if(preventDefault) {
		  aEvent.preventDefault();
		  aEvent.stopPropagation();
	  }
  },
  initHelp: function(id){
	  var box = $N('div',{id:'gm_minibuffer_'+id}, [$N('h1',{},'Shortcut Keys')]);
	  this.html = box;
	  this.id = box.id;
	  var id = 'div#' + box.id;
	  var inherit = 'background:inherit; background-image:inherit; background-color:inherit; color:inherit; text-align:inherit; font-size:inherit; font-style:inherit; font-weight:inherit; margin:inherit; opacity:inherit; text-decoration:inherit; border:0px; height:100%; padding:0; margin:inherit; font-family:inherit; vertical-align:inherit; line-height:inherit; font-stretch:inherit; font-variant:inherit; font-size-adjust:inherit; letter-spacing:inherit;';
	  GM_addStyle([id,'{', 'right: 10px;', 'left: 10px;', 'top: 10px;', 'line-height: 100%;', 'vertical-align: baseline;', 'border: 1px dotted #444;', 'font-family: sans-serif;', 'text-decoration: none;', 'font-weight: normal;', 'font-style: normal;', 'font-size: medium;', 'font-stretch: normal;', 'font-variant: normal;', 'font-size-adjust: none;', 'letter-spacing: normal;', 'background: none;', 'text-align: left;', 'position: fixed;', 'margin: 0;', 'padding: 20px;', 'background-color: #000;', 'background-image: none;', 'color: #aaa;', '-moz-border-radius: 10px;border-radius: 10px;', 'opacity:0.8;', 'z-index:1000;', '}\n',
	               id,' div{', inherit, 'opacity:1.0;','text-align:center;','}',
	               id,' > div{', inherit, 'margin: 0px 20px 20px 0px;', 'opacity:1.0;','text-align:center;','}',
	               id,' kbd{', inherit, 'font-size: 120%;','font-weight: bold;', 'color: #B83E3B;', 'text-align: right;', 'width:50%;','float:left;','}\n',
	               id,' kbd + div{', 'margin-left:50%;', 'text-align:left;','}\n',
	               id,' kbd + div:before{', 'content:": ";' ,'}\n',
	               id,' h1{', inherit, 'margin: 20px auto;','background-image: none;', "opacity:1.0;", 'font-weight: bold;', 'font-size: 150%;', 'color:#fff;','padding-left: 20px;', 'text-align: center;', '}\n',
	               ].join(''));
	  return this;
  },
  bindHelp: function(){return (this.hideHelpMessage() || this.showHelpMessage())},
  showHelpMessage: function(){document.body.appendChild(this.html)},
  hideHelpMessage: function(){
	  var help = document.getElementById(this.id);
	  if(!help) return false;
	  document.body.removeChild(this.html);
	  return true;
  },
};

// to use history/alias in Minibuffer, define getter/setter like below
// history is Array of string
//   e.g.  ["foo", "bar"]
// alias is hash of alias:expand
//   e.g.  {"foo":"bar111|bar222", "baz":"qux111|qux222"}
//
// obj.setHistoryGetter(function() {
//     var res = eval(GM_getValue('history', '[]'));
//     return res;
// });
// obj.setHistorySetter(function(new_history) {
//     GM_setValue('history',uneval(new_history));
// });
//

var Minibuffer = new Class();
Minibuffer.prototype = {
  MAX_CANDIDATES: 20,
  KEYBIND: {
	  // move caret
	  'C-a'      : 'bindBeginningOfLine',
	  'Home'     : 'bindBeginningOfLine',
	  'C-e'      : 'bindEndOfLine',
	  'End'      : 'bindEndOfLine',
	  'C-f'      : 'bindForwardChar',
	  'C-b'      : 'bindBackwardChar',
	  'M-b'      : 'bindBackwardWord',
	  'M-f'      : 'bindForwardWord',
	  // delete character
	  'C-d'      : 'bindDeleteForwardChar',
	  'C-h'      : 'bindDeleteBackwardChar',
	  'BAC'      : 'bindDeleteBackwardChar',
	  'C-w'      : 'bindDeleteBackwardWord',
	  'M-h'      : 'bindDeleteBackwardWord',
	  'M-d'      : 'bindDeleteForwardWord',
	  'C-u'      : 'bindDeleteAllStrings',
	  // history
	  'C-r'      : 'bindSearchHistoryBackward',
	  'C-s'      : 'bindSearchHistoryForward',
	  // alias
	  'C-c'      : 'bindRegisterOrUnregisterAlias',
	  'M-c'      : 'bindExpandAlias',
	  // other
	  'ESC'      : 'bindExit',
	  'C-g'      : 'bindExit',
	  'C-['      : 'bindExit',
	  'C-m'      : 'bindDecision',
	  'RET'      : 'bindDecision',
	  'C-n'      : 'bindSelectNext',
	  'Down'     : 'bindSelectNext',
	  'C-p'      : 'bindSelectPrevious',
	  'Up'       : 'bindSelectPrevious',
	  'C-v'      : 'bindScrollNext',
	  'PageDown' : 'bindScrollNext',
	  'M-v'      : 'bindScrollPrev',
	  'PageUp'   : 'bindScrollPrev',
	  'TAB'      : 'bindComplete',
	  'C-i'      : 'bindComplete',
	  'C-/'      : 'bindCompleteAndPipe',
  },
  initialize: function(){
	  this.separator = '|';

	  this.state_available = false;
	  this.candidates = [];

	  this.last_completed_string = '';
	  this.current = -1;

	  this.initHTML(); // html

	  this.shortcutkey = new ShortcutKey();
	  this.shortcutkey.addEventListener(this.html.input, 'keypress', true);
	  var self = this;
	  var chars = "!\"#$%&'()=~|-^_[]{}:;+*@`?\\".split('');

	  for(var i=48; i<58; i++){ // 0-9
		  chars[chars.length] = String.fromCharCode(i);
	  }
	  for(var i=65; i<91; i++){ // A-z
		  chars[chars.length] = String.fromCharCode(i); // == chars.push(String.fromCharCode(i))
		  chars[chars.length] = String.fromCharCode(i+32);
	  }
	  chars.forEach(function(ch){
		  self.shortcutkey.addCommand({
			key: ch,
			command: function(){self.bindInputChar(ch)}
		  });
	  });
	  for(var key in self.KEYBIND){
		  (function(a){
			  self.shortcutkey.addCommand({key:key, command:function(){a.call(self)}});
		  })(self[self.KEYBIND[key]]);
	  }
  },
  isAvailable: function(){return this.state_available},

  initHistoryVariable: function(){
	  if(!this.hasOwnProperty('history')) return;
	  this.history_max = 100;
	  this.history_search_count = -1;
	  this.history_search_regexp = null;
  },
// setter
  setSeparator: function(arg){
	  this.separator = arg;
	  return this;
  },
  setPrompt: function(str){
	  this.html.prompt.innerHTML = str;
	  return this;
  },
  setCandidates: function(lst){
	  this.candidates = lst;
	  return this;
  },
  setHistorySetter: function(fn){this.__defineSetter__('history',fn); return this;},
  setHistoryGetter: function(fn){this.__defineGetter__('history',fn); return this;},
  setAliasSetter: function(fn){this.__defineSetter__('alias',fn); return this;},
  setAliasGetter: function(fn){this.__defineGetter__('alias',fn); return this;},

// html
  initHTML: function(){
	  var INPUT_ID      = 'gm_minibuffer_input_area';
	  var COMPLETION_ID = 'gm_minibuffer_completion';
	  var CONTAINER_ID  = 'gm_minibuffer_container';
	  this.html = {};
	  this.html.completion = $N('ul',{id:COMPLETION_ID});
	  this.html.message = $N('div');
	  this.html.prompt = $N('span',{},"$");
	  this.html.input = $N('input',{id:INPUT_ID});
	  this.html.container = $N('div',{id:CONTAINER_ID, style:"background-color:#000;"},
	                           [this.html.completion,
	                            this.html.message,
	                            this.html.prompt,
	                            this.html.input]);

	  var inherit = 'background:inherit; background-image:inherit; background-color:inherit; color:inherit; text-align:inherit; font-size:inherit; font-style:inherit; font-weight:inherit; margin:inherit; opacity:inherit; text-decoration:inherit; border:0px; height:100%; padding:0; margin:inherit; font-family:inherit; vertical-align:inherit; line-height:inherit; font-stretch:inherit; font-variant:inherit; font-size-adjust:inherit; letter-spacing:inherit;';
	  GM_addStyle(['#', CONTAINER_ID,'{', 'right: 0px;', 'left: 0px;', 'bottom: 0px;', 'line-height: 100%;', 'vertical-align: baseline;', 'border: 1px dotted #444;', 'font-family: sans-serif;', 'text-decoration: none;', 'font-weight: normal;', 'font-style: normal;', 'font-size: medium;', 'font-stretch: normal;', 'font-variant: normal;', 'font-size-adjust: none;', 'letter-spacing: normal;', 'background: none;', 'text-align: left;', 'position: fixed;', 'margin: 0;', 'padding: 20px;', 'background-image: none;', 'color: #aaa;', '-moz-border-radius: 10px 10px 0px 0px;border-radius: 10px 10px 0px 0px;', 'opacity:0.8;', 'z-index:999;', '}\n',
	               '#', CONTAINER_ID, ' > span',INPUT_ID, '{', 'color: #CB6161;','display:inline;','}',
	               '#', CONTAINER_ID, ' > span {', inherit, 'color: #ccc;', 'display:inline;','margin-right: 5px;','}\n',
	               '#', INPUT_ID, '{', inherit, 'width:90%;','}',
	               '#', COMPLETION_ID, '{', inherit, 'margin-bottom: 20px;','border-bottom: 1px dotted #444;' ,'}\n',
	               '#', COMPLETION_ID, ' > span {', inherit, 'color: #ccc;', 'margin: 10px;','display:block;','}\n',
	               '#', COMPLETION_ID, ' > li {', inherit, 'color: #ccc;', 'padding: 2px;','margin-bottom:10px;','margin-left: 10px;','}\n',
	               '#', COMPLETION_ID, ' > li.gm_minibuffer_selected{', inherit, 'color: #CB6161;', 'padding: 2px;','margin-bottom:10px;','margin-left: 10px;','}\n',
	               ].join(''));
  },

  updateComplationList: function(scroll){
	  var c = this.html.completion,
	  i = this.html.input,
	  old_lst = this.candidates,
	  new_lst = [];
	  if(this.hasOwnProperty('alias')) old_lst = old_lst.concat(keys(this.alias)); // alias
	  var input_str = i.value.slice(0,i.selectionStart).match(new RegExp("[^"+this.separator+"]*$"))[0].replace(/^\s+/,'');
	  var test = function(str, l){
		  var regexp = new RegExp(str, str.toLowerCase() == str ? 'i' : '');
		  return l.filter(function(el){return el.match(regexp)});
	  };
	  // all candidates
	  if(input_str == '') new_lst = old_lst;
	  // prefix match
	  if(!new_lst.length) new_lst = test('^' + input_str.replace(/^\^/, '').escapeRegexp(), old_lst);
	  // substring match
	  if(!new_lst.length) new_lst = test(input_str.escapeRegexp(), old_lst);
	  // to check whether list has change by STRING
	  var completed_str = new_lst.join('\n');
	  var len = new_lst.length;
	  if(len && this.last_completed_string != completed_str){
		  c.innerHTML = '';
		  for(var i=0,l=Math.min(new_lst.length, this.MAX_CANDIDATES); i<l; i++){
			  c.appendChild($N('li',{}, new_lst[i]));
		  }
		  if(old_lst.length > this.MAX_CANDIDATES){
			  this.html.message.innerHTML = 'Page 1/' + (Math.floor(new_lst.length / this.MAX_CANDIDATES) +1);
		  }
	  }else if(len == 0){
		  c.innerHTML = '';
	  }
	  this.last_completed_string = completed_str;
	  this.current = -1;
	  this.initHistoryVariable();
  },
  scrollPageNext: function(stop){ // stop at the bottom
	  var c = this.html.completion;
	  var lst = this.last_completed_string.split(/\r?\n|\r/);
	  if(this.MAX_CANDIDATES < lst.length){
		  var txt = c.lastChild.innerHTML;
		  var pos = lst.position(txt) + 1;
		  if(pos == lst.length){
			  if(stop) return false;
			  pos = 0;
		  }
		  var next_candidates = lst.slice(pos, pos + this.MAX_CANDIDATES);
		  c.innerHTML = '';
		  next_candidates.forEach(function(e){
			  c.appendChild($N('li',{}, e));
		  });
		  this.html.message.innerHTML = 'Page ' + (Math.floor(pos / this.MAX_CANDIDATES) +1) + '/' + (Math.floor(lst.length / this.MAX_CANDIDATES)+1);
	  }
	  return true;
  },
  scrollPagePrev: function(stop){ // stop at the top
	  var c = this.html.completion;
	  var lst = this.last_completed_string.split(/\r?\n|\r/);
	  if(this.MAX_CANDIDATES < lst.length){
		  var txt = c.firstChild.innerHTML;
		  var pos = lst.position(txt) - this.MAX_CANDIDATES;
		  if(pos < 0){
			  if(stop) return false;
			  pos = lst.length - (lst.length % this.MAX_CANDIDATES);
		  }
		  var next_candidates = lst.slice(pos, pos + this.MAX_CANDIDATES);
		  c.innerHTML = '';
		  next_candidates.forEach(function(e){
			  c.appendChild($N('li',{}, e));
		  });
		  this.html.message.innerHTML = 'Page '+ (Math.floor(pos / this.MAX_CANDIDATES) +1) + '/' + (Math.floor(lst.length / this.MAX_CANDIDATES)+1);
	  }
	  return true;
  },
  getCompletedString: function(){
	  var lst = this.last_completed_string.split(/\r?\n|\r/);
	  var fn = function(a,b){
		  if(a.length==0) return a;
		  var tmp=0, i=1, len=a.length;
		  while(tmp = b.indexOf(a.slice(0,i)) == 0) if(len == i++) break;
		  return a.slice(0,--i);
	  };
	  // ["ab1", "ab2", "ab3"] => "ab"
	  return lst.reduce(fn);
  },
  deleteAllStrings: function(){
	  this.last_completed_string = '';
	  this.html.input.value = '';
	  this.html.completion.innerHTML = '';
  },
  exit: function(result){
	  this.html.input.blur();
	  this.deleteAllStrings();
	  this.initHistoryVariable();
	  this.current = -1;

	  document.body.removeChild(this.html.container);
	  this.callback(result);
	  this.dispatchEvent("hide_minibuffer");
	  this.state_available = false;
  },
  complete: function(callback){
	  this.initHistoryVariable();// history

	  this.callback = callback;
	  this.keepSelection();
	  document.body.appendChild(this.html.container);
	  this.html.input.focus();
	  this.dispatchEvent("show_minibuffer", null);
	  this.state_available = true;
  },
  selectCandidate: function(newNode, oldNode){ // highlight node
	  var i = this.html.input;
	  if(newNode){
		  i.value = (i.value.match(new RegExp('.*'+this.separator.escapeRegexp()+'\\s*')) || '') + newNode.innerHTML;
		  newNode.setAttribute('class', 'gm_minibuffer_selected');
	  }
	  if(oldNode){
		  oldNode.removeAttribute('class',0);
	  }
  },
  keepSelection: function(arg){
	  this.selection = {};
	  // selected text
	  this.selection.text = getSelectionText();
	  // selected node
	  this.selection.node = getSelectionNode();
  },

// event (hook)

// usage:
//
//	var minibuffer = new Minibuffer();
//	var obj = {
//		'show_minibuffer': function(){alert('show')},
//		'hide_minibuffer': function(){alert('hide')}
//	};
//	minibuffer.addEventListener(obj);

  listeners: [],
  removeEventListener: function(obj){
	  this.listeners = this.listeners.remove(obj);
  },
  addEventListener: function(obj){
	  this.listeners[this.listeners.length] = obj;
  },
  dispatchEvent: function(event_name, data){
	  this.listeners.forEach(function(listener){
		  if(event_name in listener){
			  try{
				  listener[event_name].apply(listener, [data]);
			  }catch(e){ log(e); }
		  }
	  });
  },

// ShortcutKey
  bindSelectNext: function(){
	  var c = this.html.completion;
	  if(!this.last_completed_string) this.updateComplationList();
	  var last = this.current != -1 && c.childNodes[this.current];
	  if(++this.current >= c.childNodes.length){
		  if(this.MAX_CANDIDATES <= this.last_completed_string.split(/\r?\n|\r/).length){
			  this.scrollPageNext();
		  }
		  this.current = 0;
	  }
	  this.selectCandidate(c.childNodes[this.current], last);
  },
  bindSelectPrevious: function(){
	  var c = this.html.completion;
	  if(!this.last_completed_string) this.updateComplationList();
	  var last = this.current != -1 && c.childNodes[this.current];
	  if(--this.current < 0) {
		  if(this.MAX_CANDIDATES <= this.last_completed_string.split(/\r?\n|\r/).length){
			  this.scrollPagePrev();
		  }
		  this.current = c.childNodes.length - 1;
	  }
	  this.selectCandidate(c.childNodes[this.current], last);
  },
  bindScrollNext: function(){
	  var c = this.html.completion;
	  var last_position = this.current;
	  var last = this.current != -1 && c.childNodes[this.current];
	  var res = this.scrollPageNext(true);
	  if(!res) return;
	  this.current = 0;
	  this.selectCandidate(c.childNodes[this.current]);
  },
  bindScrollPrev: function(){
	  var c = this.html.completion;
	  var last_position = this.current;
	  var last = this.current != -1 && c.childNodes[this.current];
	  var res = this.scrollPagePrev(true);
	  if(!res) return;
	  this.current = 0;
	  this.selectCandidate(c.childNodes[this.current]);
  },
  bindComplete: function(){
	  var self = this;
	  var setString = function(str){
		  if(!str) return;
		  var i=self.html.input, b=i.selectionStart, e=i.selectionEnd;
		  // "a | b | c" => "a | b | "
		  var pstr = i.value.slice(0,b).match(new RegExp('.*'+self.separator.escapeRegexp()+'\\s*'));
		  i.value = (pstr ? pstr[0] : '') + str;
		  var l=i.value.length;
		  i.setSelectionRange(l,l);
		  return i.value;
	  };
	  var getUniqueCandidate = function(){
		  var lst = self.last_completed_string.split(/\r?\n|\r/);
		  return lst.length == 1 ? lst[0] : false;
	  };
	  var str = self.getCompletedString();
	  if(!str){
		  this.updateComplationList();
		  str = getUniqueCandidate();
	  }
	  setString(str);
	  return getUniqueCandidate();
  },
  bindDecision: function(){
	  // history
	  if(this.hasOwnProperty('history')){ // ensure to set setter/getter
		  var history = this.history,
		  string = this.html.input.value;
		  history = history.remove(string);// to avoid duplicated
		  history.unshift(string);         //
		  if(history.length > this.history_max) history.pop();
		  this.history = history;
	  }
	  this.exit(this.html.input.value);
  },
  bindExit: function(){
	  this.exit();
  },
// move caret
  bindBeginningOfLine: function(){this.html.input.setSelectionRange(0, 0)},
  bindEndOfLine: function(){var i=this.html.input, l=i.value.length; i.setSelectionRange(l,l)},
  bindForwardChar: function(){var i=this.html.input, p=i.selectionEnd+1; i.setSelectionRange(p,p)},
  bindBackwardChar: function(){var i=this.html.input, p=i.selectionStart-1; i.setSelectionRange(p,p)},
  bindForwardWord: function(){
	  var i=this.html.input, e=i.selectionEnd, t=i.value.slice(e).match(/[a-zA-Z0-9]+|[^a-zA-Z0-9]+/),l=i.value.slice(0,e).length + (!!t ? t[0].length : 1);
	  i.setSelectionRange(l,l);
  },
  bindBackwardWord: function(){
	  var i=this.html.input, l=i.value.slice(0,i.selectionStart).replace(/[a-zA-Z0-9]+$|[^a-zA-Z0-9]+$/,'').length;
	  i.setSelectionRange(l,l);
  },
// delete character
  bindDeleteBackwardChar: function(){
	  var i= this.html.input, b=i.selectionStart, e=i.selectionEnd;
	  if(b==e) b--;
	  i.value = i.value.slice(0,b)+i.value.slice(e);
	  i.setSelectionRange(b,b);
	  this.updateComplationList();
  },
  bindDeleteBackwardWord: function(){
	  var i=this.html.input, b=i.selectionStart, e=i.selectionEnd;
	  var tx = i.value, tr=tx.slice(0,b-1).replace(/[^a-zA-Z0-9]+$/,'').replace(/[a-zA-Z0-9]+$/,''), l=tr.length;
	  i.value = tr+tx.slice(e);
	  i.setSelectionRange(l,l);
	  this.updateComplationList();
  },
  bindDeleteForwardChar: function(){
	  var i=this.html.input, b=i.selectionStart, e=i.selectionEnd;
	  if(b == e) e++;
	  i.value=i.value.slice(0,b)+i.value.slice(e+1);
	  i.setSelectionRange(b,b);
	  if(i.value=='') this.updateComplationList();
  },
  bindDeleteForwardWord: function(){
	  var i=this.html.input, b=i.selectionStart, e=i.selectionEnd;
	  var t=i.value,  m=t.slice(e).match(/[a-zA-Z0-9]+|[^a-zA-Z0-9]+/);
	  i.value = t.slice(0,b)+t.slice(!!m?e+m[0].length:e);
	  i.setSelectionRange(b,b);
	  if(i.value == '') this.updateComplationList();
  },
  bindDeleteAllStrings: function(){
	  this.deleteAllStrings();
	  this.updateComplationList();
  },
// insert
  bindInputChar: function(key){
	  var i=this.html.input, b=i.selectionStart, e=i.selectionEnd, t=i.value;
	  i.value = t.slice(0,b++) + key + t.slice(e);
	  i.setSelectionRange(b,b);
	  this.updateComplationList();
  },
  bindCompleteAndPipe: function(){
	  if(this.separator!='|' ||
	     (this.current<0 && !this.bindComplete())) return;
	  var i=this.html.input, b=i.selectionStart, str=i.value;
	  var trim = function(str){
		  return str.replace(/^\s|\s$/g,'');
	  };
	  i.value = trim(str.slice(0,b)) + ' ' + this.separator + ' ' + trim(str.slice(b));
	  var p = i.selectionEnd + this.separator.length;
	  i.setSelectionRange(p,p);
	  // eliminate highlight
	  var c = this.html.completion;
	  var last = this.current != -1 && c.childNodes[this.current];
	  this.selectCandidate(null, last);

	  this.updateComplationList();
  },
// history
  bindSearchHistoryBackward: function(){
	  if(!this.hasOwnProperty('history')) return;
	  var history = this.history, self = this, i = this.html.input;
	  this.history_search_regexp = this.history_search_regexp || new RegExp('^' + i.value);
	  var count = history.position(function(e, n){
		  return e.match(self.history_search_regexp) && n > self.history_search_count;
	  });
	  if(typeof count != 'number') count = this.history_search_count;
	  if(count > -1) i.value = history[count];
	  this.history_search_count = count;
  },
  bindSearchHistoryForward: function(){
	  if(!this.hasOwnProperty('history') || !this.history_search_regexp) return;
	  var history = this.history, self = this;
	  var count = history.slice(0,this.history_search_count).reverse().position(function(e, i){return e.match(self.history_search_regexp)});
	  if(typeof(count) == 'number') this.html.input.value = history[this.history_search_count -= count+1];
  },
// alias
  bindRegisterOrUnregisterAlias: function(){
	  if(!this.hasOwnProperty('alias')) return;
	  var alias = this.alias;
	  var t = this.html.input.value;
	  if(typeof alias[t] == 'undefined'){
		  // register as alias
		  var a = prompt('input alias of '+t+'');
		  alias[a] = t;
		  this.alias = alias;
	  }else{
		  // unregister from alias
		  delete alias[t];
		  this.alias = alias;
	  }
  },
  bindExpandAlias: function(){
	  var i = this.html.input;
	  var alias = this.alias[i.value];
	  if(alias) i.value = alias;
	  this.updateComplationList();
  }
};

var Shell = {
  TT: {
	arg: 'arg',
	control: 'control'
  },
  Parser: {
	buffer: null,
	init: function (buffer) {
		this.buffer = buffer;
	},
	get_token: function (  ) {
		// surround('foo', '[]') => '[foo]'
		// surround('foo', '/')  => '/foo/'
		var surround = function (s, c) {
			var d = (c.length > 1 ? c[1] : c) ;
			return c[0] + s + d;
		};

		var quote_chars = '"' + "'";
		var meta_chars = "|";
		// ((["'])(.+?)(\3))
		var quoted_arg = '(([' + quote_chars + '])(.+?)(\\3))';
		// [^|<>;"'\s]+
		var bare_arg = surround( '^' + meta_chars + quote_chars + '\\s', '[]') + '+';
		var job_controlers = meta_chars;

		var exp = '^\\s*';
		exp += surround( [
			quoted_arg, surround(bare_arg, "()"),
			surround( surround(meta_chars, "[]"), "()" )
			].join("|"), "()" );
		var re = new RegExp(exp);
		if ( re.test(this.buffer) ) {
			// huuum, we need to count parenthesis index from constructed expression....
			// ^\s*(((["'])(.+?)(\3))|([^|<>;"']+)|([|<>;]))
			//4 or 6 or 7
			var token = RegExp.$4 ? {type: Shell.TT.arg, literal: RegExp.$4} :
			RegExp.$6 ? {type: Shell.TT.arg, literal: RegExp.$6} :
			{type: Shell.TT.control, literal: RegExp.$7 };
			this.buffer = RegExp.rightContext;
			return token;
		} else {
			return null;
		}
	},
  },
  Command: {
	commands: [],
	state: null,
	current_command: null,
	init: function () {
		this.commands = [];
		this.state = this.need_command;
	},
	add_token: function (token) {
		this.state.apply(this, [token]);
	},
	need_command: function (token) {
		if ( token.type != Shell.TT.arg ) {
			trace("syntax error", token);
		} else {
			this.current_command = { name: token.literal, args: [] };
			this.state = this.search_for_end;
		}
	},
	search_for_end: function (token) {
		if ( token.type == Shell.TT.control ) {
			this.end();
		} else {
			this.current_command.args.push( token.literal );
		}
	},
	end: function () {
		this.commands.push(this.current_command);
		this.current_command = null;
		this.state = this.need_command;
	}
  },

  buffer: null,
  parse: function (buffer) {
	  this.Parser.init(buffer);
	  this.Command.init();

	  var token;
	  while ( token = this.Parser.get_token() ) {
		  this.Command.add_token ( token );
	  }
	  this.Command.end();

	  return this.Command.commands;
  },
  execute: function (commands) {
	  var obj = null;
	  commands.forEach( function ( command ) {
		  var proc = Bin[command.name];
		  if ( proc ) {
			  obj = proc.apply( this, [command.args, obj] );
		  } else {
			  trace("command not found.", command.name);
		  }
	  } );
	  return stdin;
  }
};

// copied from FLASH KEY (c) id:brazil
// http://userscripts.org/scripts/show/11996
// slightly modified.
var FlashMessage = new function(){
	GM_addStyle(<><![CDATA[
		#FLASH_MESSAGE{
			position : fixed;
			font-size : 500%;
			z-index : 10000;

			padding : 50px;
			left : 50%;
			top : 50%;
			margin : -1em;

			background-color : #444;
			color : #FFF;
			-moz-border-radius: 0.3em;
			border-radius: 0.3em;
			min-width : 1em;
			text-align : center;
		}
	]]></>)
	var opacity = 0.9;
	var flash = $N('div',{id:'FLASH_MESSAGE'});
	hide(flash);
	document.body.appendChild(flash);
	var canceler;
	this.showFlashMessageWindow = function (string, duration) {
		duration = duration || 400;
		canceler && canceler();
		flash.innerHTML = string;
		flash.style.opacity = opacity;
		show(flash);
		flash.style.marginLeft = (-(flash.offsetWidth/2))+'px';

		canceler = callLater(function(){
			canceler = tween(function(value){
				flash.style.opacity = opacity * (1-value);
			}, 100, 5);
		}, duration);
	};

	// ----[Utility]-------------------------------------------------
	function callLater(callback, interval){
		var timeoutId = setTimeout(callback, interval);
		return function(){
			clearTimeout(timeoutId)
		}
	}
	function tween(callback, span, count){
		count = (count || 20);
		var interval = span / count;
		var value = 0;
		var calls = 0;
		var intervalId = setInterval(function(){
			callback(calls / count);

			if(count == calls){
				canceler();
				return;
			}
			calls++;
		}, interval);
		var canceler = function(){
			clearInterval(intervalId)
			hide(flash)
		}
		return canceler;
	}
	function hide(target){
		target.style.display='none';
	}
	function show(target, style){
		target.style.display=(style || '');
	}
};

var Status = new Class();
Status.id = 'gm_minibuffer_flash_status';
Status.hash = {};
Status.prototype = {
  initialize: function(){
	  this.initContainer();
	  var [name,status,time_limit] = arguments;
	  var hash = this.getHash();
	  var del = function(){
		  delete hash[name];
	  }
	  if(typeof status != "string"){
		  if(hash[name]){
			  this.fadeout(hash[name]);
			  del();
		  }
	  }else{
		  var img = $N('img',{src:"data:image/gif;base64,R0lGODlhEAAQAOMIAAAAABoaGjMzM0xMTGZmZoCAgJmZmbKysv///////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgAIACwAAAAAEAAQAAAESBDJiQCgmFqbZwjVhhwH9n3hSJbeSa1sm5GUIHSTYSC2jeu63q0D3PlwCB1lMMgUChgmk/J8LqUIAgFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UKgmFqbpxDV9gAA9n3hSJbeSa1sm5HUMHTTcTy2jeu63q0D3PlwDx2FQMgYDBgmk/J8LqWPQuFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YSgmFqb5xjV9gQB9n3hSJbeSa1sm5EUQXQTADy2jeu63q0D3PlwDx2lUMgcDhgmk/J8LqUPg+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+cagmFqbJyHV9ggC9n3hSJbeSa1sm5FUUXRTEDy2jeu63q0D3PlwDx3FYMgAABgmk/J8LqWPw+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+QihmFqbZynV9gwD9n3hSJbeSa1sm5GUYXSTIDy2jeu63q0D3PlwDx3lcMgEAhgmk/J8LqUPAOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UqhmFqbpzHV9hAE9n3hSJbeSa1sm5HUcXTTMDy2jeu63q0D3PlwDx0FAMgIBBgmk/J8LqWPQOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YyhmFqb5znV9hQF9n3hSJbeSa1sm5EUAHQTQTy2jeu63q0D3PlwDx0lEMgMBhgmk/J8LqUPgeBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+c6hmFqbJwDV9hgG9n3hSJbeSa1sm5FUEHRTUTy2jeu63q0D3PlwDx1FIMgQCBgmk/J8LqWPweBRhV6z2q0VF94iJ9pOBAA7"});
		  var lst = typeof time_limit == 'number' ? [status]: [img ,status];
		  var div = $N('div', {}, lst);
		  if(hash[name]){
			  this.replace(div, hash[name]);
		  }else{
			  this.add(div);
		  }
		  hash[name] = div;
		  if(typeof time_limit == 'number'){
			  this.fadeout.later(time_limit).call(this, hash[name]);
			  del.later(time_limit)();
		  }
	  }
  },
  initContainer: function(){
	  if(!document.getElementById(Status.id)){
		  GM_addStyle(<><![CDATA[
			  #gm_minibuffer_flash_status{
				position : fixed;
				font-size: 150%;
				z-index : 10000;
				right : 20px;
				bottom : 0px;
				opacity: 0.9;
				background-color : #000;
				padding: 10px;
				color : #FFF;
				-moz-border-radius: 0.3em;
				border-radius: 0.3em;
			  }
			  #gm_minibuffer_flash_status img {
				  margin-right: 10px;
			  }
			  ]]></>);
		  var container = $N('div',{id:Status.id, style:'display:block;'});
		  document.body.appendChild(container);
	  }
  },
  getHash: function(){return Status.hash},
  add: function(node){
	  var container = document.getElementById(Status.id);
	  if(container){
		  container.appendChild(node);
	  }
	  if(container.style.display == 'none'){
		  container.style.display = 'block';
	  }
  },
  fadeout: function(node){
	  var setOpacity = function(node, opacity){
		  node.style.opacity = opacity;
	  }
	  var max = 15;
	  var base = 1000;
	  for(var i=0; i<max; i++){
		  setOpacity.later(i/max*base)(node, 1-i/max);
	  }
	  this.remove.later(base*1.2)(node);
  },
  remove: function(node){
	  var container = document.getElementById(Status.id);
	  container.removeChild(node);
	  if(!container.hasChildNodes()){
		  container.style.display = 'none';
	  }
  },
  replace: function(new_node, old_node){
	  var container = document.getElementById(Status.id);
	  container.replaceChild(new_node, old_node);
  }
};

var Command = new Class();
Command.prototype = {
  initialize: function(){
	  this.command = {};
  },
  get selection(){
	  return this.minibuffer.isAvailable() ?
		  this.minibuffer.selection :
		{
		  node: getSelectionNode(),
		  text: getSelectionText()
		}
  },

  /* argument of addCommand
   * name:        "string",
   * command:     function(stdin){ return stdout; },
   *
   * todo:
   * // description: "string",
   * // argument:    function(){ return ["option1", "option2"]; },
   */
  addCommand: function(hash){
	  // to keep compatibility
	  if(typeof hash.name == 'undefined'){
		  for(var name in hash){
			  this.command[name] = hash[name];
		  }
		  return;
	  }

//	  var description = hash['description'];
//	  var argument = hash['argument'];
	  this.command[hash['name']] = hash['command'];
  },
  addShortcutkey: function(opt){
	  this.shortcutkey.addCommand(opt);
  },
  attachEvent: function(){
	  var self = this;
	  var fn = function(){
		  self.shortcutkey.disable();
		  self.minibuffer.setCandidates(keys(self.command));
		  self.minibuffer.complete(function(a){self.callback(a)});
	  }
	  this.addShortcutkey({ key:'M-x', description:'Open Minibuffer', command:fn});
	  this.addShortcutkey({ key:':', description:'Open Minibuffer', command:fn});
	  this.addShortcutkey({
		key:'?',
		description: 'Toggle help',
		command: function(){self.shortcutkey.bindHelp.call(self.shortcutkey)},
	  });
  },
  hoge: function(){
	  var self = this;
	  var s = new ShortcutKey();
	  s.throughEvent();
	  s.addEventListener(document, 'keypress', false);
	  s.addCommand({key: 'Up Up Down Down Left Right Left Right b a', command:function(){FlashMessage.showFlashMessageWindow.eachLater(1000).apply(this,atob("NSA0IDMgMiAxIEJPTUIhISE=").split(' ').map(function(e){return [e,800]}))}});
	  s.addCommand({key: 'Up x Down b l y r a', command: function(){var tmp='';FlashMessage.showFlashMessageWindow.eachLater(500).apply(this,'\u30ab \u30ab \u30ed \u30c3 \u30c8 \u30fb \u30fb \u30fb'.split(' ').map(function(e){return [tmp+=e, 500]}))}});
	  s.addCommand({key: 'Down r Up l y b x a', command: function(){
		  var h=self.minibuffer.html.container;
		  var f=function(){return Math.floor(Math.random()*256).toString(16)};
		  var c='#'+f()+f()+f();
		  FlashMessage.showFlashMessageWindow(c,1000);
		  h.style.backgroundColor=c;
	  }});
  },
  detachEvent: function(){
	  this.shortcutkey.removeCommand('M-x');
  },
  execute: function(commandline, stdin){
	  if(!commandline) return;
	  var alias = this.alias_getter()[commandline];
	  var commands = Shell.parse(alias ? alias : commandline);
	  var self = this;
	  if(typeof stdin == 'undefined') stdin = [];
	  var ret = commands.forEach(function(command){
		  var fn = self.command[command.name];
		  if(!fn) return null;
		  var cmd = {
			func: fn,
			args: command.args,
			name: command.name
		  };
		  stdin = cmd.func(stdin);
	  });
	  return stdin;
  },
  callback: function(commandline){
	  this.shortcutkey.enable();
	  if(!commandline) return;
	  this.execute(commandline);
  },
  setup: function(){
	  // setup minibuffer
	  var define_setter = function(type){return function(arg){ GM_setValue(type, uneval(arg))}};
	  this.alias_getter = function(){return eval(GM_getValue('alias', '({})'))};
	  this.minibuffer = new Minibuffer()
		  .setHistoryGetter(function(){return eval(GM_getValue('history', '[]'))})
		  .setAliasGetter(this.alias_getter)
		  .setHistorySetter(define_setter('history'))
		  .setAliasSetter(define_setter('alias'));
	  // setup shortcut key
	  this.shortcutkey = new ShortcutKey()
		  .initHelp('command')
		  .throughInputElements();
	  this.shortcutkey.addEventListener(document, 'keypress', false);
	  this.attachEvent();
	  this.hoge();
  },
};

function $N(name, attr, childs) {
	var ret = document.createElement(name);
	for (var k in attr) if (attr.hasOwnProperty(k)) {
		var v = attr[k];
		if (k == "class") ret.className = v;
		else ret.setAttribute(k, v);
	}
	switch(typeof childs){
	  case "string":
		ret.appendChild(document.createTextNode(childs));
		break;
	  case "object":
		for (var i=0, len=childs.length; i<len; i++) {
			var child = childs[i];
			if (typeof child == "string") {
				ret.appendChild(document.createTextNode(child));
			} else {
				ret.appendChild(child);
			}
		}
	}
	return ret;
}

// via http://github.com/hatena/hatena-bookmark-xul/blob/master/chrome/content/common/05-HTMLDocumentCreator.js
function createDocumentFromString(source){
    var doc = document.implementation.createHTMLDocument ?
        document.implementation.createHTMLDocument('hogehoge') :
        document.implementation.createDocument(null, 'html', null);
    var range = document.createRange();
    range.selectNodeContents(document.documentElement);
    var fragment = range.createContextualFragment(source);
    var headChildNames = {title: true, meta: true, link: true, script: true, style: true, /*object: true,*/ base: true/*, isindex: true,*/};
    var child, head = doc.getElementsByTagName('head')[0] || doc.createElement('head'),
        body = doc.getElementsByTagName('body')[0] || doc.createElement('body');
    while ((child = fragment.firstChild)) {
        if (
            (child.nodeType === doc.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) ||
            (child.nodeType === doc.TEXT_NODE &&/\S/.test(child.nodeValue))
        )
            break;
        head.appendChild(child);
    }
    body.appendChild(fragment);
    doc.documentElement.appendChild(head);
    doc.documentElement.appendChild(body);
    return doc;
}



// $X on XHTML
// @target Freifox3, Chrome3, Safari4, Opera10
// @source http://gist.github.com/184276.txt
function $X (exp, context) {
    context || (context = document);
    var _document = context.ownerDocument || context,
        documentElement = _document.documentElement,
        isXHTML = documentElement.tagName !== 'HTML' && _document.createElement('p').tagName === 'p',
        defaultPrefix = null;
    if (isXHTML) {
        defaultPrefix = '__default__';
        exp = addDefaultPrefix(exp, defaultPrefix);
    }
    function resolver (prefix) {
        return context.lookupNamespaceURI(prefix === defaultPrefix ? null : prefix) ||
            documentElement.namespaceURI || "";
    }

    var result = _document.evaluate(exp, context, resolver, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            // not ensure the order.
            var ret = [], i = null;
            while (i = result.iterateNext()) ret.push(i);
            return ret;
    }
}
// XPath 式中の接頭辞のない名前テストに接頭辞 prefix を追加する
// e.g. '//body[@class = "foo"]/p' -> '//prefix:body[@class = "foo"]/prefix:p'
// http://nanto.asablo.jp/blog/2008/12/11/4003371
function addDefaultPrefix(xpath, prefix) {
    var tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+-])|([@$])/g;
    var TERM = 1, OPERATOR = 2, MODIFIER = 3;
    var tokenType = OPERATOR;
    prefix += ':';
    function replacer(token, identifier, suffix, term, operator, modifier) {
        if (suffix) {
            tokenType =
                (suffix == ':' || (suffix == '::' && (identifier == 'attribute' || identifier == 'namespace')))
                ? MODIFIER : OPERATOR;
        } else if (identifier) {
            if (tokenType == OPERATOR && identifier != '*')
                token = prefix + token;
            tokenType = (tokenType == TERM) ? OPERATOR : TERM;
        } else {
            tokenType = term ? TERM : operator ? OPERATOR : MODIFIER;
        }
        return token;
    }
    return xpath.replace(tokenPattern, replacer);
}

// Usage:: with (D()) { your code }
// JSDefeered 0.2.1 (c) Copyright (c) 2007 cho45 ( www.lowreal.net )
// See http://coderepos.org/share/wiki/JSDeferred
function D () {
function Deferred () { return (this instanceof Deferred) ? this.init(this) : new Deferred() }
Deferred.prototype = {
	init : function () {
		this._next    = null;
		this.callback = {
			ok: function (x) { return x },
			ng: function (x) { throw  x }
		};
		return this;
	},

	next  : function (fun) { return this._post("ok", fun) },
	error : function (fun) { return this._post("ng", fun) },
	call  : function (val) { return this._fire("ok", val) },
	fail  : function (err) { return this._fire("ng", err) },

	cancel : function () {
		(this.canceller || function () {})();
		return this.init();
	},

	_post : function (okng, fun) {
		this._next =  new Deferred();
		this._next.callback[okng] = fun;
		return this._next;
	},

	_fire : function (okng, value) {
		var self = this, next = "ok";
		try {
			value = self.callback[okng].call(self, value);
		} catch (e) {
			next  = "ng";
			value = e;
		}
		if (value instanceof Deferred) {
			value._next = self._next;
		} else {
			if (self._next) self._next._fire(next, value);
		}
		return this;
	}
};

Deferred.parallel = function (dl) {
	var ret = new Deferred(), values = {}, num = 0;
	for (var i in dl) if (dl.hasOwnProperty(i)) {
		(function (d, i) {
			d.next(function (v) {
				values[i] = v;
				if (--num <= 0) {
					if (dl instanceof Array) {
						values.length = dl.length;
						values = Array.prototype.slice.call(values, 0);
					}
					ret.call(values);
				}
			}).error(function (e) {
				ret.fail(e);
			});
			num++;
		})(dl[i], i);
	}
	if (!num) Deferred.next(function () { ret.call() });
	ret.canceller = function () {
		for (var i in dl) if (dl.hasOwnProperty(i)) {
			dl[i].cancel();
		}
	};
	return ret;
};

Deferred.wait = function (n) {
	var d = new Deferred(), t = new Date();
	var id = setTimeout(function () {
		clearTimeout(id);
		d.call((new Date).getTime() - t.getTime());
	}, n * 1000)
	d.canceller   = function () { try { clearTimeout(id) } catch (e) {} };
	return d;
};

Deferred.next = function (fun) {
	var d = new Deferred();
	var id = setTimeout(function () { clearTimeout(id); d.call() }, 0);
	if (fun) d.callback.ok = fun;
	d.canceller   = function () { try { clearTimeout(id) } catch (e) {} };
	return d;
};

Deferred.call = function (f, args) {
	args = Array.prototype.slice.call(arguments);
	f    = args.shift();
	return Deferred.next(function () {
		return f.apply(this, args);
	});
};

Deferred.loop = function (n, fun) {
	var o = {
		begin : n.begin || 0,
		end   : n.end   || (n - 1),
		step  : n.step  || 1,
		last  : false,
		prev  : null
	};
	var ret, step = o.step;
	return Deferred.next(function () {
		function _loop (i) {
			if (i <= o.end) {
				if ((i + step) > o.end) {
					o.last = true;
					o.step = o.end - i + 1;
				}
				o.prev = ret;
				ret = fun.call(this, i, o);
				if (ret instanceof Deferred) {
					return ret.next(function (r) {
						ret = r;
						return Deferred.call(_loop, i + step);
					});
				} else {
					return Deferred.call(_loop, i + step);
				}
			} else {
				return ret;
			}
		}
		return Deferred.call(_loop, o.begin);
	});
};

Deferred.register = function (name, fun) {
	this.prototype[name] = function () {
		return this.next(Deferred.wrap(fun).apply(null, arguments));
	};
};

Deferred.wrap = function (dfun) {
	return function () {
		var a = arguments;
		return function () {
			return dfun.apply(null, a);
		};
	};
};

Deferred.register("loop", Deferred.loop);
Deferred.register("wait", Deferred.wait);

Deferred.define = function (obj, list) {
	if (!list) list = ["parallel", "wait", "next", "call", "loop"];
	if (!obj)  obj  = (function () { return this })();
	list.forEach(function (i) {
		obj[i] = Deferred[i];
	});
	return Deferred;
};



function xhttp (opts) {
	var d = Deferred();
	if (opts.onload)  d = d.next(opts.onload);
	if (opts.onerror) d = d.error(opts.onerror);
	opts.onload = function (res) {
		d.call(res);
	};
	opts.onerror = function (res) {
		d.fail(res);
	};
	GM_xmlhttpRequest(opts);
	return d;
}
xhttp.get  = function (url)       { return xhttp({method:"get",  url:url}) };
xhttp.post = function (url, data) { return xhttp({method:"post", url:url, data:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}) };


function http (opts) {
	var d = Deferred();
	var req = new XMLHttpRequest();
	req.open(opts.method, opts.url, true);
	if (opts.headers) {
		for (var k in opts.headers) if (opts.headers.hasOwnProperty(k)) {
			req.setRequestHeader(k, opts.headers[k]);
		}
	}
	req.onreadystatechange = function () {
		if (req.readyState == 4) d.call(req);
	};
	req.send(opts.data || null);
	d.xhr = req;
	return d;
}
http.get  = function (url)       { return http({method:"get",  url:url}) };
http.post = function (url, data) { return http({method:"post", url:url, data:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}) };

Deferred.Deferred = Deferred;
Deferred.http     = http;
Deferred.xhttp    = xhttp;
return Deferred;
}// End of JSDeferred

function keys(hash){
	var tmp = [];
	for(var key in hash)tmp.push(key);
	return tmp;
}
function values(hash){
	var tmp = [];
	for(var key in hash)tmp.push(hash[key]);
	return tmp;
}
var getSelectionText = function(){
	return String(window.getSelection()).split(/\r?\n|\r/).remove("");
};
var getSelectionNode = function(){
	var s=window.getSelection(), res=[], len=s.rangeCount;
	for(var i=0; i<len; i++){
		var ret = document.createElement('root');
		ret.appendChild(s.getRangeAt(i).cloneContents());
		res[res.length] = ret;
	}
	return res;
};

String.prototype.escapeRegexp = function(){
	return this.replace(/^(?=[?*])/, '.').replace(/(?=[|+])/g, '\\').replace(/\([^)]*$/, '').replace(/\[[^\]]*$/, '');
};
Array.prototype.position = function(obj){
	var test = (typeof(obj) == 'function') ? obj : function(a){return a == obj};
	for(var i=0;i<this.length; i++) if(test(this[i], i)) return i;
	return false;
};
Array.prototype.last = function(){
	return this[this.length-1];
};
Array.prototype.find = function(obj){
	var i = this.position(obj);
	return typeof(i) == 'number' ? this[i] : false;
};
Array.prototype.remove = function(obj){
	var test = (typeof(obj) == 'function') ? obj : function(a){return a == obj};
	return this.filter(function(e){return !test(e)})
};
Array.prototype.reduce = function(fn ,initial){
	var len = this.length;
	if(typeof fn != "function" || (len == 0 && arguments.length == 1)) throw new TypeError();
	var i = 0;
	if(arguments.length >= arguments.callee.length){
		var rv = arguments[1];
	}else{
		do{
			if(i in this){
				rv = this[i++];
				break;
			}
			if(++i >= len)throw new TypeError();
		}while (true);
	}
	for (;i<len;i++) if(i in this) rv=fn.call(null, rv, this[i], i, this);
	return rv;
};
Function.prototype.later = function(ms){
	var self = this;
	return function(){
		var args = arguments;
		var thisObject = this;
		var res = {
			arg: args,
			complete: false,
			cancel: function(){clearTimeout(PID);},
			notify: function(){clearTimeout(PID);later_func()}
		};
		var later_func = function(){
			self.apply(thisObject,args);
			res.complete = true;
		};
		var PID = setTimeout(later_func,ms);
		return res;
	};
};
// usage:
//   var lst = (function(e){console.log(e)}).eachLater(500)([1],[2],[3],[4],[5],[6],[7]);
//   (function(){lst.forEach(function(e){e.complete || e.cancel()})}).later(2000)();
Function.prototype.eachLater = function(ms){
	var self = this;
	return function(){
		var tmp=0, lst=[];
		for(var i=0;i<arguments.length; i++) lst[lst.length] = self.later(tmp+=ms).apply(this,arguments[i]);
		return lst;
	}
};

function log(){console.log.apply(console, Array.slice(arguments));}

//// register command
if(document.body){
	var command = new Command();
	window.Minibuffer = {
	  getMinibuffer  : function(){return new Minibuffer()}
	, getShortcutKey : function(){return new ShortcutKey()}

	,  addShortcutkey : function(a){command.addShortcutkey(a)}
	,  addCommand     : function(a){command.addCommand(a)}

	,  execute        : function(a, stdin){return command.execute(a, stdin)}
	,  message        : FlashMessage.showFlashMessageWindow
	,  status         : function(name, status, timelimit){new Status(name, status,timelimit)}

	,  $X             : $X
	,  $N             : $N
	,  D              : D
        ,  createDocumentFromString : createDocumentFromString
	};

	window.Minibuffer.addCommand({
	  name: 'Minibuffer::Exit',
	  command : command.detachEvent,
	});

	// nothing => list of current URL
	window.Minibuffer.addCommand({
		name: 'location',
		command: function(){return [location.href]},
	});

	// nothing => list of string (divided by \n)
	window.Minibuffer.addCommand({
		name: 'selected-text',
		command: function(){return command.selection.text},
	});

	// nothing => list of selected node
	window.Minibuffer.addCommand({
		name: 'selected-node',
		command: function(){return command.selection.node}
	});

	// node list => list of string
	window.Minibuffer.addCommand({
		name: 'innerHTML',
		command: function(stdin){return stdin.map(function(a){return a.innerHTML})}
	});

	// list of node or nothing => list of node
	// args: 'tag'
	window.Minibuffer.addCommand({
		name: 'filter-by-tag-name',
		command: function(stdin){
			var tag = this.args.shift();
			if(stdin.length == 0) stdin.push(document);
			var res = [];
			for(var i=0,k=stdin.length; i<k; i++){
				var lst = stdin[i].getElementsByTagName(tag);
				for(var j=0,l=lst.length; j<l; j++){
					res.push(lst[j]);
				}
			}
			return res;
		}
	});

	// list of URL or nothing => list of URL
	// args: count
	window.Minibuffer.addCommand({
		name: "upper-directory",
		command: function(stdin){
			var urls  = stdin.length ? stdin : [location.href];
			var count = this.args.shift() || 1;
			var rep   = new RegExp('[^/]+/?$');
			var host  = new RegExp('[a-z]+://[^/]+/');
			return urls.map(function(url){
				for(var i=0; i<count; i++){
					var newurl = url.replace(rep, '');
					if(newurl.match(host)) url = newurl;
				}
				return url;
			});
		}
	});

	// object => object
	window.Minibuffer.addCommand({
		name: 'echo',
		command: function(obj){
			log(obj);
			return obj;
		}
	});

	// list of node or nothing => list of node
	// args: 'XPath'
	window.Minibuffer.addCommand({
		name: 'xpath',
		command: function(stdin) {
			var exp = this.args.shift();
			if(stdin.length == 0) stdin.push(document);
			var res = [];
			for(var i=0,l=stdin.length; i<l; i++){
				var lst = window.Minibuffer.$X(exp, stdin[i]);
				for(var j=0,l=lst.length; j<l; j++){
					res.push(lst[j]);
				}
			}
			return res;
		}
	});

	// list of node or list of string => list of node or list of string
	// args: 'regexp' 'attribute' 'flag'
	window.Minibuffer.addCommand({
		name: 'grep',
		command: function (stdin) {
			var regexp = this.args.shift();
			var attr = this.args.shift();
			var flag = this.args.shift();
			var re = new RegExp(regexp, typeof(flag) != 'undefined' ? flag : regexp.toLowerCase() == regexp ? 'i':'');
			return stdin.filter(function(obj) {
				if(typeof(obj) == 'string'){
					return obj.match(re);
				}else if(obj.nodeType == 3){
					return obj.nodeValue.match(re);
				}else if(obj.nodeType == 1 && attr && obj.getAttribute(attr)){
					return obj.getAttribute(attr).match(re);
				}else if(obj.nodeType == 1 && obj.text){
					return obj.text.match(re);
				}
			});
		}
	});

	// list of anchor node or list of URL
	// args: 'target'
	window.Minibuffer.addCommand({
		name: 'open',
		command: function(stdin){
			var target = this.args.shift();
			if(target == 'top' || target == 'blank') target = '_' + target;
			stdin.forEach(function(url){
				if(target){
					window.open(url, target);
				}else{
					GM_openInTab(url);
				}
			});
			return stdin;
		}
	});

	// list => reversed list
	window.Minibuffer.addCommand({
		name: 'reverse',
		command: function(stdin){
			return stdin.reverse();
		}
	});

	// list of URL => list of URL
	window.Minibuffer.addCommand({
		name: 'web-archive',
		command: function(stdin){
			return stdin.map(function(url){return 'http://web.archive.org/web/*/' + url})
		}
	});

	// list of URL => list of URL
	window.Minibuffer.addCommand({
		name: 'google-cache',
		command: function(stdin){
			return stdin.map(function(url){return 'http://www.google.com/search?q=cache:' + url})
		}
	});

	// list of URL => list of URL
	window.Minibuffer.addCommand({
		name: 'web-gyotaku',
		command: function(stdin){
			return stdin.map(function(url){return 'http://megalodon.jp/?url=' + url})
		}
	});

	// list => list
	window.Minibuffer.addCommand({
		name: 'scrollto-top',
		command: function(stdin){
			window.scrollTo(0,0);
			return stdin;
		}
	});
	// list => list
	window.Minibuffer.addCommand({
		name: 'scrollto-bottom',
		command: function(stdin){
			window.scrollTo(0, window.scrollMaxY);
			return stdin;
		}
	});

//	// tako3
//	window.Minibuffer.addCommand({
//		name: 'tako3',
//		command: function(stdin){
//			return stdin.map(function(url){return "http://tako3.com/" + url})
//		}
//	});

	// setup
	command.setup();

	// shortcut key sample

//	window.Minibuffer.addShortcutkey({
//	  key: 'C-o',
//	  description: 'Open Google cache',
//	  command: function(){
//			window.Minibuffer.execute('pinned-or-current-link | google-cache | open | clear-pin');
//		}
//	});
//	// vi like
//	window.Minibuffer.addShortcutkey({
//	  key: 'g g',
//	  description: 'scroll to top',
//	  command: function(){window.Minibuffer.execute('scrollto-top')}
//	});
//	window.Minibuffer.addShortcutkey({
//	  key: 'G',
//	  description: 'scroll to bottom',
//	  command: function(){window.Minibuffer.execute('scrollto-bottom')}
//	});
	var ev = document.createEvent('Events');
	ev.initEvent('GM_MinibufferLoaded', false, true);
	window.dispatchEvent(ev);
}

