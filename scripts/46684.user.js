scr_meta=<><![CDATA[
// ==UserScript==
// @name          Dominic Deegan
// @description   Displays Only The Comic
// @include       http://www.dominic-deegan.com/*#
// @include       http://dominic-deegan.com/*#
// ==/UserScript==
]]></>.toString();


/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.A
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown
	
			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}

			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var firstLink='', previousLink='', nextLink='', lastLink='';

result=xpath("//a/img[@alt='First']");
if(result.snapshotLength)
	firstLink="<a href=\""+result.snapshotItem(0).parentNode.href+"\">First</a>";

result=xpath("//a/img[@alt='Previous']")
if(result.snapshotLength){
	previousLink="<a href=\""+result.snapshotItem(0).parentNode.href+"\">Previous</a>";
	previousLocation=result.snapshotItem(0).parentNode.href+"#";
}

result=xpath("//a/img[@alt='Next']")
if(result.snapshotLength){
	nextLink="<a href=\""+result.snapshotItem(0).parentNode.href+"\">Next</a>";
	nextLocation=result.snapshotItem(0).parentNode.href+"#";
}
	
result=xpath("//a/img[@alt='Last']")
if(result.snapshotLength)
	lastLink="<a href=\""+result.snapshotItem(0).parentNode.href+"\">Last</a>";

shortcut.add("right",function() {
	document.location=nextLocation;
},{
	'type':'keydown',
	'propagate':true,
	'target':document
});	

shortcut.add("left",function() {
	document.location=previousLocation;
},{
	'type':'keydown',
	'propagate':true,
	'target':document
});


   
var comicSrc=xpath("//div[@class='comic']/img").snapshotItem(0).src;

document.body.innerHTML="<table width='920' align='center'><tr><td colspan='4' align='center'><a href='http://dominic-deegan.com/'><img border='0' src='"+comicSrc+"' align='center'></a></td></tr><tr><td align='center' width='25%'>"+firstLink+"&nbsp;</td><td align='center' width='25%'>"+previousLink+"&nbsp;</td><td align='center' width='25%'>"+nextLink+"&nbsp;</td><td align='center' width='25%'>"+lastLink+"&nbsp;</td></tr></table>";
document.title="Dominic Deegan";
document.close();

CheckScriptForUpdate = {
           id: '46684', // Script id on Userscripts.org
           days: 1, // Days to wait between update checks
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
           version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
           time: new Date().getTime() | 0,
           call: function(response) {
              GM_xmlhttpRequest({
                method: 'GET',
          	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
          	  headers: {
          	  'User-agent': window.navigator.userAgent,
          	    'Accept': 'application/atom+xml,application/xml,text/xml',
          	    },
          	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
                });
            },
           compare: function(xpr,response) {
              this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
              this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
              if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
                GM_setValue('updated', this.time);
                GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
              } else if ( (this.xversion) && (this.xversion != this.version) ) {
                if(confirm('Do you want to turn off auto updating for this script?')) {
          	GM_setValue('updated', 'off');
          	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
          	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
                } else {
          	GM_setValue('updated', this.time);
                }
              } else {
                if(response) alert('No updates available for '+this.name);
                GM_setValue('updated', this.time);
              }
            },
           check: function() {
          if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
          if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
                this.call();
              } else if (GM_getValue('updated', 0) == 'off') {
                GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
              } else {
                GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
              }
              }
          };
          if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();
