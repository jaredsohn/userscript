// ==UserScript==
// @name           AutoReplaceText
// @namespace      http://stupiduglysoftware.googlepages.com/home
// @description    <$key> -> lookup key and replace <$key> with value; <#key:value> -> save preset key:value.  Press enter or space to perform action.  Try <$foo> ENTER
// @include        *
// ==/UserScript==
//***********Cursor Position Stuff*************************//
//* Thanks to http://snipplr.com/view/5144/getset-cursor-in-html-textarea/ *//
function doGetCaretPosition (ctrl) {
	var CaretPos = 0;
	// IE Support
	if (document.selection) {

		ctrl.focus ();
		var Sel = document.selection.createRange ();

		Sel.moveStart ('character', -ctrl.value.length);

		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;

	return (CaretPos);

}


function setCaretPosition(ctrl, pos) {
	if(ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}
//*********************************************************//

//******************Presets********************************//
//Using GreaseMonkey get/setValue()
//
function PresetsMap() {
	this.initialize();
}

PresetsMap.prototype = {
	initialize : function() {
		this.set("foo", "Hello World!");
	},
	set : function(key, value) {
		if(!key)
			return false;
		
		if(!this.get(key) || !value) {
			GM_setValue(key.toGMKey(), value);
			return true;
		}
		return false;
	},
	get : function(key) {
		return GM_getValue(key.toGMKey());
	}
};
//**********************************************************//

function AutoReplaceText(textArea)
{
	this.ta = typeof textArea == 'string'
	          ? document.getElementById(textArea)
	          : textArea;
	
	this.replacePattern = /<\$(.*?)>/g;
	this.savePattern = /<#(.*?):(.*?)>/g;
	
	this.listen();
}

AutoReplaceText.prototype = {
	listen : function() {
		var self = this;
		self.ta.addEventListener('keypress', function(e) {
			if(self.isActionKey(e)) {
				self.SaveAutoText();
				self.ReplaceAutoText();
			}
		}, true);
	},
	isActionKey : function(e) {
		var key = window.event ? e.keyCode : e.which;
		return (key==32 || key==13);
	},
	ReplaceAutoText : function() {
		this._doAutoText(this.replacePattern, this._lookUpReplace);
	},
	SaveAutoText : function() {
		this._doAutoText(this.savePattern, this._saveNotify);
	},
	_doAutoText : function(pattern, doWithMatch) {
		this.value = this.ta.value;
		this.curPos = doGetCaretPosition(this.ta);

		var matches = this.value.match(pattern);
		for(x in matches)
			doWithMatch(this, matches[x], pattern);

		if(matches) {
                        this.ta.value = this.value;
		        setCaretPosition(this.ta, this.curPos);
                }
	},
	_lookUpReplace : function(self, match, pattern) {
		var key = match.replace(pattern, "$1");
		var preset = presets.get(key);
		if(preset)
			self._updateValue(self, match, preset);
	},
	_saveNotify : function(self, match, pattern) {
		var key = match.replace(pattern, "$1");
		var value = match.replace(pattern, "$2");
		var msg = "{"+key+": ALREADY EXISTS}";
		if(presets.set(key, value))
			msg = "{"+key+": SAVED}";
		self._updateValue(self, match, msg);
	},
	_updateValue : function(self, match, str) {
		self.curPos = self.curPos + (str.length - match.length);
		self.value = self.value.replace(match.toRegExp("g"), str);
	}
};

//**************String Helpers***************************//
String.prototype.escape = function() {
	var specials = ['/', '.', '*', '+', '?', '|', '$', '(', ')', '[', ']', '{', '}', '\\'];
	var reg = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	return this.replace(reg, "\\$1");
};

String.prototype.toRegExp = function(options) {
	if(!options) options = "";
	return new RegExp(this.escape(), options);
};

String.prototype.compile = function(options) {
	if(!options) options = "";
	return new RegExp(this, options);
};

String.prototype.toGMKey = function() {
	return "http://stupiduglysoftware.googlepages.com/autoreplacetext.js;"+this;
};

//*****************MAIN*****************************//
presets = new PresetsMap();
var textAreas = document.getElementsByTagName('textarea');
for(x in textAreas)
	new AutoReplaceText(textAreas[x]);

/*  Copyright 2008 Jacob Wu */