// ==UserScript==
// @name		Textarea Backup Localstorage
// @author 		Frans de Jonge (Frenzie)
// @version		1.02
// @namespace		http://extendopera.org/userjs/content/textarea-backup-localstorage
// @description		Retains text entered into textareas.
// @include		*
// @exclude		http://mail.google.com/*
// @exclude		https://mail.google.com/*
// ==/UserScript==
// This script is based on http://userscripts.org/scripts/show/42879 which is based on http://userscripts.org/scripts/show/7671
// Changelog
// 1.02 March 10, 2010. Faux-patched a variable leak bug. Still investigating the real cause.
// 1.01 March 10, 2010. Fixed bug where localStorage values not set by this script were often accidentally deleted.
// 1.0 March 7, 2010. Initial release.

(function () {
/* Preferences */

// display menu
var menu_display = /*@Display menu@bool@*/true/*@*/;
// backup when keypress event triggers
var keypress_backup = /*@Backup on keypress@bool@*/true/*@*/;
// backup when textarea loses focus
var blur_backup = /*@Backup on blur (when textarea loses focus)@bool@*/true/*@*/;
// backup at time interval
var timed_backup = /*@Timed backup@bool@*/false/*@*/;
// backup time interval, in millisecond
var backup_interval = /*@_Backup interval (ms)@int@*/10000/*@*/;
// keep backup even successfully submitted
// make sure expiration is enabled 
var keep_after_submission = /*@Keep backup after submission@bool@*/true/*@*/;
// set true to display a confirmation window of restoration
// when the target textarea of is not empty
// set false to skip restoration if not empty
// user still can manually restore using GM menu
var restore_auto = /*@Restore automatically@bool@*/true/*@*/;
var ask_overwrite = /*@_Ask before overwriting@bool@*/true/*@*/;
var em_available = /*@_Emphasize backup available (only works if automatic restoring is disabled)@bool@*/true/*@*/;
var em_color = /*@__Emphasizing color@string@*/'hsla(0, 100%, 50%, .4)'/*@*/;
// auxiliary variable to compute expiry_timespan
// set all 0 to disable expiration
var expire_after_days = /*@Expire after days@int@*/0/*@*/;
var expire_after_hours = /*@Expire after hours@int@*/2/*@*/;
var expire_after_minutes = /*@Expire after minutes@int@*/30/*@*/;

/* Code */
// GM compatibility
var myLocalStorage;
if (typeof unsafeWindow != 'undefined') {
	myLocalStorage = unsafeWindow.localStorage;
}
else {
	myLocalStorage = localStorage;
}

// expiry time for a backup, in millisecond
var expiry_timespan = (((expire_after_days * 24) + expire_after_hours) * 60 + expire_after_minutes) * 60000;

function getAbsolutePosition(element,direction) {
	var ele = element, dir = direction, pos, tempEle;
	(dir=='x') ? pos = ele.offsetLeft : pos = ele.offsetTop;
	tempEle = ele.offsetParent;
	while(tempEle != null) {
		pos += (dir=='x') ? tempEle.offsetLeft : tempEle.offsetTop;
		tempEle = tempEle.offsetParent;
	}
	return pos;
}

function getValue(key) {
	var value = myLocalStorage[key];
	return ( value && (value != 'undefined') ) ? value : '';
}
function setValue(key, value) {
	myLocalStorage[key] = value;
}
function deleteValue(key) {
	myLocalStorage.removeItem(key);
}

// moved this function out of SaveTextArea
// for expiration check routine use
function is_significant(str) {
	return typeof str == 'string' &&
		str.replace(/\s+/g, '').length > 0;
}
function append_time_stamp(str) {
	return str + '@' + (new Date()).getTime();
}
function remove_time_stamp(str) {
	var time_pos = str.search(/@\d+$/);
	return (time_pos != -1) ? str.substring(0, time_pos) : str;
}
function get_time_stamp(str) {
	var time_pos = str.search(/@\d+$/);
	return str.substring(time_pos + 1);
}
function SaveTextArea(txta) {
	this.ta = (typeof txta == 'string' ?
		document.getElementById(txta) : txta);

	this.initial_txt = this.ta.textContent;
	this.committed = '';

	this.listen();
	this.restore();
}
SaveTextArea.prototype = {
	listen: function() {
		var self = this;
		// Save buffer every keystrokes.
		if (keypress_backup)
			this.ta.addEventListener('keypress', function(e)
			{
				self.commit(self.ta.value);
			}, true);

		// Save buffer when the textarea loses focus.
		if (blur_backup)
			this.ta.addEventListener('blur', function(e)
			{
				self.commit();
			}, true);

		// Save buffer every second.
		if (timed_backup)
			this._stay_tuned();

		// Should be a method really but there'd be more code to get it to work as
		// expected with event handlers so I won't bother.
		var onsubmit = function(e) {
			if (!keep_after_submission)
				deleteValue(self.key());
		};

		var theform = this.ta.form;
		// Delete buffer when the form has been submitted.
		theform.addEventListener('submit', onsubmit, true);

		// Keep a copy of the submit method.
		theform.the_actual_submit_method = theform.submit;
		// Catch direct calls to submit() which doesn't trigger the submit event.
		theform.submit = function() {
			onsubmit();
			self.ta.form.the_actual_submit_method();
		};
	},
	_stay_tuned: function() {
		var self = this;
		setTimeout(function() {
			self.commit();
			self._stay_tuned();
		}, backup_interval);
	},
	menu: function(emphasize) {
		var em = emphasize, self = this, taMenu = document.createElement('div'), opacity = .2;
		
		//opera.postError(this.ta.style.borderTopWidth);
		//var offsetTop = this.ta.style.borderTopWidth + this.ta.style.marginTop + getAbsolutePosition(this.ta, 'y');
		var offsetTop = getAbsolutePosition(this.ta, 'y');
		//var offsetRight = window.innerWidth - (getAbsolutePosition(this.ta, 'x')+this.ta.offsetWidth+this.ta.style.marginLeft+this.ta.style.marginRight);
		var offsetRight = window.innerWidth - (getAbsolutePosition(this.ta, 'x')+this.ta.offsetWidth);

		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.textContent = '\
			#textarea_backup_menu {\
				border: 2px solid hsla(0, 0%, 0%, .8);\
				border-width: 0 2px 2px 2px;\
				border-radius: 0 0 5px 5px;\
				text-align: left;\
				padding: 0;\
				background: hsl(200, 30%, 90%);\
				color: hsla(0, 0%, 0%, 0);\
				font-size: 12px;\
				font-family: "Deja Vu Sans", Verdana;\
				opacity: .2;\
				position: absolute;\
				z-index: 1000;\
				width: 12px;\
				height: 12px;\
				overflow: hidden;\
				top: '+offsetTop+'px;\
				right: '+offsetRight+'px;\
				-o-transition-property: background, width, height, color;\
				-o-transition-duration: .5s, .5s, .5s, .5s;\
				-o-transition-delay: 0s, 0s, 0s, .5s;\
			}\
			#textarea_backup_menu ul {\
				margin: 0;\
				padding: 0;\
				list-style: none;\
				height: 0;\
				overflow: hidden;\
				-o-transition-property: height;\
				-o-transition-duration: .5s;\
			}\
			#textarea_backup_menu li {\
				margin: 0;\
				padding: 0;\
			}\
			#textarea_backup_menu a {\
				display: block;\
				width: 100%;\
				padding: 5px;\
				border-top: 1px solid #000;\
				color: hsla(0, 0%, 0%, .1);\
				-o-transition-property: color;\
				-o-transition-duration: .5s;\
				-o-transition-delay: .5s;\
			}\
				#textarea_backup_menu:hover a, #textarea_backup_menu:focus a {\
					height: auto;\
					color: hsl(230, 70%, 10%);\
				}\
			#textarea_backup_menu li a:hover {\
				background: hsla(100, 100%, 100%, .8);\
			}\
			#textarea_backup_menu:hover, #textarea_backup_menu:focus {\
				opacity: 1;\
				width: auto;\
				height: auto;\
				color: #000;\
			}\
			#textarea_backup_menu:hover ul, #textarea_backup_menu:focus ul {\
				height: auto;\
			}\
		';
		document.body.previousSibling.appendChild(style);
		if (em) {
			taMenu.style.opacity = 1;
			taMenu.style.backgroundColor = em_color;
		}
		
		taMenu.id = 'textarea_backup_menu';
		taMenu.textContent = 'Textarea Backup Actions';
		
		// taMenu.appendChild(menuList = document.createElement('ul'));
		
		// Define all the actions that should go in the menu
		var menuFunctions = new Array();
		menuFunctions[menuFunctions.length] = new Array(
			'Восстановить резервную копию для ' + this.ref(),
			function() { self.ta.value = self.previous_backup }
		);
		menuFunctions[menuFunctions.length] = new Array(
			'Удалить резервную копию для ' + this.ref(),
			function() {
				if (confirm('Удалить резервную копию для ' + self.ref() + '?')) {
					deleteValue(self.key());
					this.parentNode.removeChild(this);
				}
			}
		);
		menuFunctions[menuFunctions.length] = new Array(
			textContent = 'Очистить ' + this.ref(),
			function() {
				if(confirm('Очистить ' + self.ref() + '?'))
					self.ta.value = '';
			}
		);
		
		for (var i in menuFunctions) {
			// Checking if there are no outside "menuFunctions" leaking into the script. They can still leak (I don't understand why), but only if they are constructed the exact same way.
			if (typeof menuFunctions[i] == 'object' && typeof menuFunctions[i][0] == 'string' && typeof menuFunctions[i][1] == 'function') {
				menuList.appendChild(li = document.createElement('li'));
				li.appendChild(a = document.createElement('a'));
				with (a) {
					textContent = menuFunctions[i][0];
					addEventListener('click', menuFunctions[i][1], false);
				}
			}
		}
		
		var body = document.body;
		body.appendChild(taMenu);
	},
	restore: function() {
		var em;
		// backup text is in format of "backup_content@save_time",
		// where save_time is the millisecond from Javascript Date object's getTime()
		var buff = remove_time_stamp(getValue(this.key()));
		
		// Only restore buffer if previously saved (i.e form not submitted).
		if(!is_significant(buff))
			return;
		
		//myLocalStorage['tab_temp'] = this.ta.textContent;
		//opera.postError(typeof buff);
		//opera.postError(typeof myLocalStorage['tab_temp']);
		//opera.postError(buff == myLocalStorage['tab_temp']);
		
		// Check with user before overwriting existing content with backup.
		if (buff != this.ta.textContent && is_significant(this.ta.textContent) && ask_overwrite) {
			this._confirm_restore(buff);
		}
		else {
			if (restore_auto)
				this.ta.value = buff;
			else if (em_available)
				em = true;
		}

		//this.previous_backup = this.ta.value;
		this.previous_backup = buff;

		if (menu_display)
			this.menu(em);
	},
	_confirm_restore: function(buff) {
		var to_restore = remove_time_stamp(getValue(this.key()));
		
		// Keep existing border so it's not lost when highlighting.
		this.old_border = this.ta.style.border;

		var msg = "[Textarea Backup] Existing text detected in '" + this.ref()
						+ "', overwrite with this backup?\n\n";
		msg += to_restore.length > 750
				 ? to_restore.substring(0, 500) + "\n..."
				 : to_restore;

		this.confirming = true;
		this.ta.scrollIntoView();
		
		// Highlight the textarea that the confirm message refers to.
		this._highlight_textarea(this.old_border);

		// Let the user see the existing content as Firefox will sometimes
		// maintain the old value.
		this.ta.value = this.ta.textContent;
		if (window.confirm(msg))
			this.ta.value = buff;

		this.confirming = false;
		this.ta.style.border = this.old_border;
	},
	_highlight_textarea: function(border, toggle) {
		var self = this;
		
		setTimeout(function(ta_border, toggle) {
			if(self.confirming) {
				self.ta.style.border = ( toggle ? '3px red solid' : ta_border );
				self._highlight_textarea(ta_border, toggle);
			} else
				self.ta.style.border = this.old_border;
		}, 1000, border, !toggle);

		return this.ta.style.border;
	},
	commit: function() {
		this.committed = append_time_stamp(this.ta.value);
		
		// Only save if:
		// a) There's significant text in the <textarea>.
		// b) The text that was there when the page loaded has changed.
		if(is_significant(this.committed) && this.initial_txt != this.committed)
			setValue( this.key(), this.committed );
	},
	// Rough'n'ready method which should be nicer.
	key: function()	{
		// If there are two textareas and neither of them have a name or id
		// then they will collide, but a textarea without either would be useless.
		return this.ta.baseURI + ';' + this.ref();
	},
	// Attempt to return the most appropriate textarea reference.
	ref: function() {
		return this.ta.id || this.ta.name || '';
	}
};

// expiration check routine
if (expiry_timespan > 0) {
	// get all associated backups, and compare timestamp now and then
	var curr_time = (new Date()).getTime();
	for (var i=0;i<myLocalStorage.length;i++) {
		var curr_bak = getValue(myLocalStorage.key(i));
		var bak_text = remove_time_stamp(curr_bak);
		var bak_time = get_time_stamp(curr_bak);
		// also remove empty backups
		if ( (curr_time - bak_time >= expiry_timespan)	|| (!is_significant(bak_text)) ) {
			deleteValue(myLocalStorage.key(i));
		}
	}
}

var textareas = document.getElementsByTagName('textarea');
for(var i = 0; i < textareas.length; i++) {
	var ta = textareas[i];
	// Occasionally a textarea might not have a form, weird.
	if(ta['form'])
		new SaveTextArea(ta);
}

})();