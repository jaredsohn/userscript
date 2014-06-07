// ==UserScript==
// @author        Crend King
// @version       2.4
// @name          Textarea Backup with expiry
// @namespace     http://users.soe.ucsc.edu/~kjin
// @description   Retains text entered into textareas and contentEditables, and expires after certain time span.
// @include       http://*
// @include       https://*
// @homepage      http://userscripts.org/scripts/show/42879
// @downloadURL   https://userscripts.org/scripts/source/42879.user.js
// @updateURL     https://userscripts.org/scripts/source/42879.meta.js
// ==/UserScript==

// this script was originally based on http://userscripts.org/scripts/review/7671

/*

version history

2.4 on 08/15/2013:
- Support Google Chrome.

2.3 on 07/20/2013:
- Support dynamically created textareas. To restore, such textareas need to be created first and then use the script command.

2.2.1 on 01/06/2013:
- Remove restriction for textarea under a form.

2.2 on 01/03/2013:
- Add support for elements with "contentEditable" attribute.

2.1 on 05/09/2011:
- Add user menu command to restore all textarea in the page.

2.0 on 05/06/2011:
- Completely rewrite the script. New script should be faster, stronger and more standard-compliant.
- Fix bugs in previous versions and the original script.

1.0.4 on 04/22/2009:
- Synchronize with the original Textarea Backup script.

1.0.3 on 03/08/2009:
- Add "ask overwrite" option.

1.0.2 on 03/04/2009:
- Add "keep after submission" option.

1.0.1 on 02/22/2009:
- Extract the expiry time stamp codes to stand-alone functions.

1.0 on 02/21/2009:
- Initial version.

*/


///// preference section /////

// backup when element loses focus
var blur_backup = true;

// interval for timely backup, in millisecond. 0 disables timely backup
var timely_backup_interval = 0;

// keep backup even form is submitted
// make sure expiration is enabled or backup will never be deleted
var keep_after_submission = false;

// set true to display a confirmation window for restoration
// otherwise restore unconditionally
var confirm_overwrite = true;

// auxiliary variable to compute expiry_timespan
// set all 0 to disable expiration
var expire_after_days = 0;
var expire_after_hours = 0;
var expire_after_minutes = 30;


///// code section /////

// expiry time for a backup, in millisecond
var expiry_timespan = (((expire_after_days * 24) + expire_after_hours) * 60 + expire_after_minutes) * 60000;

// how many times to flash. must be a even number, or the border style will not revert
var flash_count = 6;
// how fast is the flash
var flash_frequency = 100;

// array of all backed up elements in the page
var targets = [];
// element_id: whether this element is prompted for restoration
var prompted = {};

// CSS selector for backup-able elements
var target_selector = 'textarea, *[contentEditable]';

var get_element_id = function(element)
{
	/*
	return the reference ID of the element
	multiple elements with no name or id will collide
	but element without either would be useless
	*/
	return element.name || element.id || '';
};

var get_element_key = function(element)
{
	// Greasemonkey key for the backup
	// take URI into consideration
	return element.baseURI + ';' + get_element_id(element);
};

var append_timestamp = function(str)
{
	return str + '@' + (new Date()).getTime();
};

var remove_timestamp = function(str)
{
	return str.replace(/@\d+$/, '');
};

var get_timestamp = function(str)
{
	var time_pos = str.lastIndexOf('@');
	return str.substr(time_pos + 1);
};

var get_element_value = function(element)
{
	if (element.nodeName == 'TEXTAREA')
		return element.value;
	else
		return element.innerHTML;
};

var set_element_value = function(element, value)
{
	if (element.nodeName == 'TEXTAREA')
		element.value = value;
	else
		element.innerHTML = value;
};

var commit_backup = function(element)
{
	var element_value = get_element_value(element);

	// backup if value is not empty
	if (!/^\s*$/.test(element_value))
	{
		var bak_payload = append_timestamp(element_value);
		GM_setValue(get_element_key(element), bak_payload);
	}
};

var confirm_restore;

var get_backup_content = function(element)
{
	// backup payload is in format of "backup_text@save_time",
	// where save_time is the millisecond from Javascript Date object's getTime()
	var bak_payload = GM_getValue(get_element_key(element));
	if (!bak_payload)
		return false;

	var bak_content = remove_timestamp(bak_payload);
	
	// ignore if backup text is identical to current value
	if (bak_content == get_element_value(element))
		return false;
	else
		return bak_content;
};

var restore_backup = function(elements, index)
{
	// check with user before overwriting existing content with backup
	// asynchronized when confirmation is enabled, synchronized otherwise
	if (confirm_overwrite)
	{
		var bak_content = get_backup_content(elements[index]);
		if (bak_content !== false)
        	{
			confirm_restore(elements, index, bak_content);
        	}
	}
	else
	{
		for (var i = 0; i < elements.length; ++i)
		{
			var element = elements[i];
			set_element_value(element, get_backup_content(element));
		}
	}
};

confirm_restore = function(elements, index, bak_content)
{
	var element = elements[index];
	
	element.scrollIntoView(false);

	// flash the element
	
	var ori_border = element.style.border;
	var new_border = '2px solid red';
	var toggle = true;
	var flashed = flash_count;
	var interval_id;

	var toggle_border = function()
	{
		element.style.border = (toggle ? new_border : ori_border);
		toggle = !toggle;

		--flashed;
		if (flashed == 0)
		{
			clearInterval(interval_id);

			var msg = "[Textarea Backup] Backup exists for this element, proceed to overwrite with this backup?\n\n";
			msg += bak_content.length > 750 ?
				   bak_content.substr(0, 500) + "\n..." :
				   bak_content;

			if (confirm(msg))
				set_element_value(element, bak_content);

			if (index + 1 < elements.length)
			{
				// setTimeout is an asynchronized operation
				// need recursion to serialize restoration on elements
				restore_backup(elements, index + 1);
			}
		}
	};

	interval_id = setInterval(toggle_border, flash_frequency);
};

var on_focus = function(event)
{
	var element = event.target;
	var element_id = get_element_id(element);

	if (!prompted[element_id])
	{
		// set prompted status disregarding user's choice of overwriting
		prompted[element_id] = true;

		restore_backup([element], 0);
	}
};

var on_blur = function(event)
{
	commit_backup(event.target);
};

var on_submit = function(event)
{
	for (var i = 0; i < targets.length; ++i)
		GM_deleteValue(get_element_key(targets[i]));
};

var init_backup = function(element)
{
	prompted[get_element_id(element)] = false;

	element.addEventListener('focus', on_focus, true);

	// save buffer when the element loses focus
	if (blur_backup)
		element.addEventListener('blur', on_blur, true);
	
	// delete buffer when the form is submitted
	if (!keep_after_submission && element.form)
		element.form.addEventListener('submit', on_submit, true);
};

var restore_all = function()
{
	// restore all targets and set prompted status
	
	for (var i = 0; i < targets.length; ++i)
	{
		var target = targets[i];
		var target_id = get_element_id(target);

		if (!prompted[target_id])
			prompted[target_id] = true;
	
		restore_backup(targets, i);
	}
};

var backup_dynamic = function(evt)
{
    if (evt.target.querySelectorAll == undefined)
        return;
    
	var new_textareas = evt.target.querySelectorAll(target_selector);
    for (var i = 0; i < new_textareas.length; ++i)
	{
        var new_textarea = new_textareas.item(i);
		targets.push(new_textarea);
		init_backup(new_textarea);
	}
};

// expiration check routine
if (expiry_timespan > 0)
{
	// get all associated backups for this page, and compare timestamp now and then
	var curr_time = new Date().getTime();
	var stored_bak = GM_listValues();

	for (var stored_bak_index = 0; stored_bak_index < stored_bak.length; ++stored_bak_index)
	{
		var bak_payload = GM_getValue(stored_bak[stored_bak_index]);
		var bak_content = remove_timestamp(bak_payload);
		var bak_time = get_timestamp(bak_payload);
		
		if (curr_time - bak_time >= expiry_timespan)
			GM_deleteValue(stored_bak[stored_bak_index]);
	}
}

var query_result = document.querySelectorAll(target_selector);
for (var query_result_index = 0; query_result_index < query_result.length; ++query_result_index)
{
    var query_item = query_result.item(query_result_index);
	targets.push(query_item);
	init_backup(query_item);
}

if (targets.length > 0)
{
	// save buffer in interval fashion
	if (timely_backup_interval > 0)
	{
		var backup_all = function()
		{
			for (var i = 0; i < targets.length; ++i)
			{
				var target = targets[i];
				if (prompted[get_element_id(target)])
					commit_backup(target);
			}
		};
	
		setInterval(backup_all, timely_backup_interval);
	}
}

document.addEventListener('DOMNodeInserted', backup_dynamic);

GM_registerMenuCommand('Restore all textareas in this page', restore_all);