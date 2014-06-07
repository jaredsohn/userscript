// ==UserScript==
// @author        Crend King
// @version       1.0.1
// @name          Textarea Backup with Expiry
// @namespace     http://www.cs.ucsc.edu/~kjin
// @description   Retains text entered into textareas, and expires after certain time span.
// @include       http://*
// @include       https://*
// @exclude       http://mail.google.com
// @exclude       https://mail.google.com
// ==/UserScript==

/*

Version History

1.0.1 on 02/22/2009:
- Extract the expiry time stamp codes to stand-alone functions

1.0 on 02/21/2009:
- Initial version.

*/

// backup when keypress event triggers
var keypress_backup = false;

// backup when textarea loses focus
var blur_backup = true;

// backup at time interval
var timed_backup = true;

// backup time interval, in millisecond
var backup_interval = 10000;

// auxiliary variable to compute expiry_timespan
var expire_after_days = 0;
var expire_after_hours = 0;
var expire_after_minutes = 30;

// expiry time for a backup, in millisecond
var expiry_timespan = (((expire_after_days * 24) + expire_after_hours) * 60 + expire_after_minutes) * 60000;

function GM_getValueUTF8(key)
{
	var value = GM_getValue(key);
	return (value && value.length) ? decodeURI(value) : '';
}

function GM_setValueUTF8(key, value)
{
	GM_setValue(key, encodeURI(value));
}

// moved this function out of SaveTextArea
// for expiration check routine use
function is_significant(str)
{
	return typeof str == 'string' &&
		str.replace(/\s+/g, '').length > 0;
}
	
function append_time_stamp(str)
{
	return str + '@' + (new Date()).getTime();
}

function remove_time_stamp(str)
{
	var time_pos = str.search(/@\d+$/);
	return str.substring(0, time_pos);
}

function get_time_stamp(str)
{
	var time_pos = str.search(/@\d+$/);
	return str.substring(time_pos + 1);
}

function SaveTextArea(txta)
{
	this.ta = (typeof txta == 'string' ?
		document.getElementById(txta) : txta);

	this.initial_txt = this.ta.textContent;
	this.committed = '';

	this.listen();
	this.restore();
}

SaveTextArea.prototype =
{
	listen: function()
	{
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
		var onsubmit = function(e)
		{
			GM_deleteValue(self.key());
		};

		var theform = this.ta.form;
		// Delete buffer when the form has been submitted.
		theform.addEventListener('submit', onsubmit, true);

		// Keep a copy of the submit method.
		theform.the_actual_submit_method = theform.submit;
		// Catch direct calls to submit() which doesn't trigger the submit event.
		theform.submit = function()
		{
			onsubmit();
			self.ta.form.the_actual_submit_method();
		};
	},

	_stay_tuned: function()
	{
		var self = this;
		setTimeout(function()
		{
			self.commit();
			self._stay_tuned();
		}, backup_interval);
	},

	restore: function()
	{
		// backup text is in format of "backup_content@save_time",
		// where save_time is the millisecond from Javascript Date object's getTime()
		var buff = remove_time_stamp(GM_getValueUTF8(this.key()));
		
		// Only restore buffer if previously saved (i.e form not submitted).
		if(!is_significant(buff))
			return;

		// Check with user before overwriting existing content with backup.
		if (buff != this.ta.textContent && is_significant(this.ta.textContent))
			this._confirm_restore(buff);
		else
			this.ta.value = buff;

		this.previous_backup = this.ta.value;
		var self = this;
		GM_registerMenuCommand(
			'Restore previous backup for '+ this.ref(),
			function() { self.ta.value = self.previous_backup }
		);
	},

	_confirm_restore: function(buff)
	{
		var to_restore = remove_time_stamp(GM_getValueUTF8(this.key()));
		
		// Keep existing border so it's not lost when highlighting.
		this.old_border = this.ta.style.border;

		var msg = "Existing text detected in '" + this.ref()
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

	_highlight_textarea: function(border, toggle)
	{
		var self = this;
		
		setTimeout(function(ta_border, toggle)
		{
			if(self.confirming)
			{
				self.ta.style.border = ( toggle ? '3px red solid' : ta_border );
				self._highlight_textarea(ta_border, toggle);
			} else
				self.ta.style.border = this.old_border;
		}, 1000, border, !toggle);

		return this.ta.style.border;
	},

	commit: function()
	{
		this.committed = append_time_stamp(this.ta.value);
		
		// Only save if:
		// a) There's significant text in the <textarea>.
		// b) The text that was there when the page loaded has changed.
		if(is_significant(this.committed) && this.initial_txt != this.committed)
			GM_setValueUTF8( this.key(), this.committed );
	},

	// Rough'n'ready method which should be nicer.
	key: function()
	{
		// If there are two textareas and neither of them have a name or id
		// then they will collide, but a textarea without either would be useless.
		return this.ta.baseURI + ';' + this.ref();
	},

	// Attempt to return the most appropriate textarea reference.
	ref: function()
	{
		return this.ta.id || this.ta.name || '';
	}
};

// expiration check routine
// get all associated backups, and compare timestamp now and then
var curr_time = (new Date()).getTime();
var stored_bak = GM_listValues();
for (var i in stored_bak)
{
	var curr_bak = GM_getValueUTF8(stored_bak[i]);
	var bak_text = remove_time_stamp(curr_bak);
	var bak_time = get_time_stamp(curr_bak);
	
	// also remove empty backups
	if (curr_time - bak_time >= expiry_timespan ||
		!is_significant(bak_text))
	{
		GM_deleteValue(stored_bak[i]);
	}
}

var textareas = document.getElementsByTagName('textarea');
for(var i = 0; i < textareas.length; i++)
{
	var ta = textareas[i];
	// Occasionally a textarea might not have a form, weird.
	if(ta['form'])
		new SaveTextArea(ta);
}