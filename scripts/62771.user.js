// ==UserScript==
// @name           FormFiller
// @namespace      DScripts
// @include        http*
// ==/UserScript==

var isAddingForm = false;
var currentField = null;
var formItems = [];
var currentForm = { urls: [] };
var forms = [];
var formBeingEdited = null;

checkForSavedForms(true, true);

// AJAX HANDLERS -------------------------------------------------

unsafeWindow.formFillerAjaxCallback = function() { 
	checkForSavedForms(true, false);
}

if(typeof unsafeWindow.jQuery == 'function') {
	unsafeWindow.jQuery.privateAjax = unsafeWindow.jQuery.ajax;
	unsafeWindow.jQuery.ajax = function(obj) {
		var cacheCallback = obj.complete;
		obj.complete = function(r, s) {
			if(typeof cacheCallback == 'function')
				cacheCallback(r, s);

			unsafeWindow.formFillerAjaxCallback();
		};
		unsafeWindow.jQuery.privateAjax(obj);
	};
}

if(unsafeWindow.Sys && unsafeWindow.Sys.WebForms && unsafeWindow.Sys.WebForms.PageRequestManager) {
	var prm = unsafeWindow.Sys.WebForms.PageRequestManager.getInstance();
	if(typeof prm != 'object')
		return;

	prm._get_eventHandlerList()._getEvent("endRequest", true).push(unsafeWindow.formFillerAjaxCallback);
}


// FORMS ---------------------------------------------------------
function checkForSavedForms(populate, update) {
	var url = location.href;

	if(update) {
		forms = GM_getValue('formfiller_forms', '[]');
		forms = JSON.parse(forms);
	}

	for(var i = 0; i < forms.length; i++) {
		for(var x = 0; x < forms[i].urls.length; x++) {
			if(urlIsMatch(forms[i].urls[x], url)) {
				forms[i].ix = i;
				foundForm(forms[i], populate);
				break;
			}
		}
	}
}

function urlIsMatch(filter, url) {
	if(filter.indexOf('*') == -1)
		return url.indexOf(filter) >= 0;

	var filterparts = filter.split('*');
	for(var i = 0; i < filterparts.length; i++) {
		var part = filterparts[i];

		if(url.indexOf(part) == -1)
			return false;

		url = url.substring(url.indexOf(part)+part.length);
	}

	return true;
}

function foundForm(form, populate) {
	if(form.auto && populate) {
		fillForm(form);
	}
	notify(form);
}

function notify(form) {
	ensureNotifyPane();

	var cId = 'formfiller_notifypane_btn_'+form.ix;

	if(document.getElementById(cId))
		return;

	var btn = document.createElement('button');
	if(form.auto) {
		btn.innerHTML = ('<span style="color: green;"><b>' + form.name + '</b><br/>Already executed</span>');
	} else {
		btn.innerHTML = ('<b>' + form.name + '</b><br/>Click to fill form.');
	}
	btn.id = cId;
	btn.style.width = '150px';

	document.getElementById('formfiller_notifypane_items').appendChild(btn);

	btn.addEventListener('click', function(e) {
		var target = safe(e).target;

		if(!target) {
			return;
		}

		var ix = parseInt(target.id.substring(26));

		fillForm(forms[ix]);
		target.innerHTML = ('<span style="color: green;"><b>' + forms[ix].name + '</b><br/>Already executed</span>');
	}, false);
}

function ensureNotifyPane() {
	var n = getNotifyPane();
	if(n) return;

	pane = document.createElement('div');
	pane.id = 'formfiller_notifypane';
	pane.style.padding = '5px';
	pane.style.backgroundColor = 'white';
	pane.style.MozBorderRadius = '4px';
	pane.style.borderColor = '#cccccc';
	pane.style.width = '150px';
	pane.style.borderWidth = '1px';
	pane.style.borderStyle = 'solid';
	pane.style.position = 'fixed';
	pane.style.right = '10px';
	pane.style.bottom = '10px';
	pane.style.zIndex = '1905';
	pane.style.fontSize = '12px';
	pane.style.fontFamily = 'arial';

	pane.innerHTML = '<b>There are saved forms for this page</b><br><div id="formfiller_notifypane_items"></div><div><a href="javascript:void(0);" id="formfiller_notifypane_edit">Edit forms</a></div>';

	document.body.appendChild(pane);

        document.getElementById('formfiller_notifypane_edit').addEventListener('click', function() {
		showEditForms();
	}, false);
}

function showEditForms() {
	bindEditForms(location.href);
}

function bindEditForms(url) {
	ensureEditForms();

	document.getElementById('formfiller_editforms_forms').innerHTML = '';

	for(var i = 0; i < forms.length; i++) {
		for(var x = 0; x < forms[i].urls.length; x++) {
			if(url == '' || urlIsMatch(forms[i].urls[x], url)) {
				addEditForm(forms[i]);
				break;
			}
		}
	}

	showBox(getEditForms());
}

function showEditSingleForm(form) {
	hideBox();

	ensureEditSingleForm();

	document.getElementById('formfiller_editsingleform_title').innerHTML = 'Editing ' + form.name;

	document.getElementById('formfiller_editsingleform_name').value = form.name;
	document.getElementById('formfiller_editsingleform_autoexec').checked = form.auto;

	for(var i = 0; i < form.urls.length; i++) {
		var input = document.createElement('input');
		input.id = 'formfiller_editsingleform_url'+(i+1);
		input.style.width = '200px';
		input.style.float = 'left';
		input.value = form.urls[i];

		var del = document.createElement('a');
		del.href = 'javascript:void(0);';
		del.innerHTML = '&nbsp;x';

		var br = document.createElement('br');
		br.clear = 'all';

		del.addEventListener('click', (function(i,b,d) {
			return function() {
				var parent = document.getElementById('formfiller_editsingleform_header');
				parent.removeChild(i);
				parent.removeChild(b);
				parent.removeChild(d);
			}
		})(input, br, del), false);

		document.getElementById('formfiller_editsingleform_header').appendChild(br);
		document.getElementById('formfiller_editsingleform_header').appendChild(input);

		if(i > 0)
			document.getElementById('formfiller_editsingleform_header').appendChild(del);
	}

	var br = document.createElement('br');
	br.clear = 'all';

	var addUrl = document.createElement('a');
	addUrl.href = 'javascript:void(0);';
	addUrl.innerHTML = 'Add URL';

	document.getElementById('formfiller_editsingleform_header').appendChild(br);
	document.getElementById('formfiller_editsingleform_header').appendChild(addUrl);

	addUrl.addEventListener('click', function() {
		var inpts = document.getElementById('formfiller_editsingleform_header').getElementsByTagName('input');
		
		var input = document.createElement('input');
		input.id = 'formfiller_editsingleform_url'+inpts.length;
		input.style.width = '200px';
		input.style.float = 'left';

		var del = document.createElement('a');
		del.href = 'javascript:void(0);';
		del.innerHTML = '&nbsp;x';

		var br = document.createElement('br');
		br.clear = 'all';

		del.addEventListener('click', (function(i,b,d) {
			return function() {
				var parent = document.getElementById('formfiller_editsingleform_header');
				parent.removeChild(i);
				parent.removeChild(b);
				parent.removeChild(d);
			}
		})(input, br, del), false);

		document.getElementById('formfiller_editsingleform_header').insertBefore(input,addUrl);
		document.getElementById('formfiller_editsingleform_header').insertBefore(del,addUrl);
		document.getElementById('formfiller_editsingleform_header').insertBefore(br,addUrl);

		input.focus();
	}, false);

	document.getElementById('formfiller_editsingleform_save').addEventListener('click', (function(f) {
		return function() {
			var jsform = JSON.stringify(f);

			for(var i = 0; i < forms.length; i++) {
				if(JSON.stringify(forms[i]) != jsform)
					continue;

				var newurls = [];

				var inputs = document.getElementById('formfiller_editsingleform_header');
				inputs = inputs.getElementsByTagName('input');

				for(var x = 2; x < inputs.length; x++) {
					if(inputs[x].value.length > 0)
						newurls.push(inputs[x].value);
				}

				forms[i].name = document.getElementById('formfiller_editsingleform_name').value;
				forms[i].auto = document.getElementById('formfiller_editsingleform_autoexec').checked;
				forms[i].urls = newurls;
				break;
			}

			GM_setValue('formfiller_forms', JSON.stringify(forms));
			hideBox();
		}
	})(form), false);

	document.getElementById('formfiller_editsingleform_delete').addEventListener('click', (function(f) {
		return function() {
			if(!confirm('Are you sure you want to delete this form?\nThe action cannot be undone.'))
				return;

			var newforms = [];
			var jsform = JSON.stringify(f);
			for(var i = 0; i < forms.length; i++) {
				if(JSON.stringify(forms[i]) != jsform)
					newforms.push(forms[i]);
			}

			forms = newforms;
			GM_setValue('formfiller_forms', JSON.stringify(forms));
			hideBox();
		}
	})(form), false);

	document.getElementById('formfiller_editsingleform_editfields').addEventListener('click', (function(f) {
		return function() {
			hideBox();
			editCurrentForm(f);
		}
	})(form), false);

	showBox(getEditSingleForm());
}

function addEditForm(form) {
	var container = document.getElementById('formfiller_editforms_forms');
	
	var div = document.createElement('div');

	var a = document.createElement('a');

	a.href = 'javascript:void(0);';
	a.innerHTML = form.name;

	a.addEventListener('click', (function(f) {
		return function() {
			showEditSingleForm(f);
		};
	})(form), false);

	div.appendChild(a);
	container.appendChild(div);
}

function ensureEditSingleForm() {
	var ef = getEditSingleForm();
	if(ef) return;

	ef = document.createElement('div');
	ef.id = 'formfiller_editsingleform';
	ef.style.padding = '5px';
	ef.style.backgroundColor = 'white';
	ef.style.fontSize = '12px';
	ef.style.fontFamily = 'arial';

	ef.innerHTML = '<b id="formfiller_editsingleform_title"></b><div id="formfiller_editsingleform_header">Name<br/><input type="text" id="formfiller_editsingleform_name" style="width: 200px;" /><br/><input type="checkbox" id="formfiller_editsingleform_autoexec" /><label for="formfiller_editsingleform_autoexec">&nbsp;Execute automatically</label><br/><br/>URLs:</div><br/><input type="button" id="formfiller_editsingleform_save" value="Save changes" /> <input type="button" id="formfiller_editsingleform_delete" value="Delete form" /> <input type="button" id="formfiller_editsingleform_editfields" value="Edit fields" />';

	document.body.appendChild(ef);
}

function getEditSingleForm() { return document.getElementById('formfiller_editsingleform'); }

function ensureEditForms() {
	var ef = getEditForms();
	if(ef) return;

	ef = document.createElement('div');
	ef.id = 'formfiller_editforms';
	ef.style.padding = '5px';
	ef.style.backgroundColor = 'white';
	ef.style.width = '150px';
	ef.style.fontSize = '12px';
	ef.style.fontFamily = 'arial';

	ef.innerHTML = '<b>Select form to edit</b><div id="formfiller_editforms_forms" style="max-height: 200px; overflow: auto;"></div>';

	document.body.appendChild(ef);
}

function getEditForms() { return document.getElementById('formfiller_editforms'); }

function getNotifyPane() { return document.getElementById('formfiller_notifypane'); }

function fillForm(form) {
	for(var i = 0; i < form.items.length; i++) {

		var itm = form.items[i];

		if(itm.type != 'radio') {
			e = document.getElementById(itm.id);
			if(e) {
				if(itm.type == 'checkbox')
					e.checked = itm.value == 'true';
				else
					e.value = itm.value;
			}
		} else {
			var rds = document.getElementsByTagName('input');
			for(var x = 0; x < rds.length; x++) {
				rds[x] = safe(rds[x]);
				if(rds[x].type != 'radio') continue;

				if(rds[x].name != itm.id) continue;

				if(rds[x].value == itm.value) {
					rds[x].checked = true;
					break;
				}
			}
		}

	}
}

function addCurrentForm() {
	if(currentForm.items.length == 0) {
		showBox('You have not added any form controls to this form.<br/>The form cannot be saved at this point.<br/><br/><input type="button" id="formfiller_nocontrolNotice" value="OK" />');
		document.getElementById('formfiller_nocontrolNotice').addEventListener('click', hideBox, false);
		return false;
	}

	var forms = GM_getValue('formfiller_forms', '[]');
	forms = JSON.parse(forms);

	if(formBeingEdited) {
		var jsform = JSON.stringify(formBeingEdited);
		for(var i = 0; i < forms.length; i++) {
			if(jsform == JSON.stringify(forms[i])) {
				forms[i] = currentForm;
				break;
			}
		}
		formBeingEdited = null;
	} else {

		forms.push(currentForm);
	}

	GM_setValue('formfiller_forms', JSON.stringify(forms));

	return true;
}

// COMMAND MENU ---------------------------------------------------

GM_registerMenuCommand("Save a form...", cmdSaveNewForm);
GM_registerMenuCommand("Edit saved forms", cmdEditSavedForms);

function cmdSaveNewForm() {

	if(isAddingForm) {
		alert('You are already editing a form.\nYou may only edit one form at a time');
		return;
	}

	var html = '<div id="formfiller_saveform"><b>Create a form</b><br/>Form name:<br/><input id="formfiller_saveform_name" type="text" value="' + document.title + '" style="width: 200px;" /><br/><br/>URLs:<div id="formfiller_saveform_urls"><input id="formfiller_saveform_url1" style="width: 200px;" type="text" value="' + location.href + '" /></div><a href="javascript:void(0);" id="formfiller_saveform_addurl">Add URL</a> (use * for wildcards in URL)<br/><input id="formfiller_saveform_submitbutton" type="button" value="Add" /></div>';
	showBox(html);

	document.getElementById('formfiller_saveform_addurl').addEventListener('click', function() {
		var input = document.createElement('input');
		var parent = document.getElementById('formfiller_saveform_urls');

		input.type = 'text';
		input.id = 'formfiller_saveform_url' + (parent.getElementsByTagName('input').length + 1);
		input.style.width = '200px';

		parent.appendChild(document.createElement('br'));
		parent.appendChild(input);

		input.focus();

	}, false);

	document.getElementById('formfiller_saveform_submitbutton').addEventListener('click', function(e) {
		var target = safe(safe(e).target);
		var form = safe(document.getElementById('formfiller_saveform_urls'));

		var urls = [];
		var name = document.getElementById('formfiller_saveform_name').value;

		var inputs = form.getElementsByTagName('input');
		for(var i = 0; i < inputs.length; i++) {
			if(inputs[i].value.length > 0)
				urls.push(inputs[i].value);
		}

		hideBox();
		setupNewForm(urls, name);
	}, false);
}

function cmdEditSavedForms() {
	bindEditForms('');
}

function editCurrentForm(form) {
	currentForm = form;
	formItems = form.items;
	isAddingForm = true;
	formBeingEdited = form;

	getBox().innerHTML = '';

	var inputs = document.getElementsByTagName('input');
	var txts = document.getElementsByTagName('textarea');
	var ddls = document.getElementsByTagName('select');

	var anythingEdited = false;

	for(var i = 0; i < inputs.length; i++) {
		if(!/button|submit|reset/.test(inputs[i].type)) {
			setupForEdit(inputs[i]);
			anythingEdited = true;
		}
	}

	if(!anythingEdited && txts.length == 0 && ddls.length == 0) {
		showBox('There are no form controls on this page.<br>There is nothing here to save...<br><input type="button" id="formfiller_noFormNotice" value="OK" />');
		document.getElementById('formfiller_noFormNotice').addEventListener('click', hideBox, false);
		return;
	}

	for(var i = 0; i < txts.length; i++)
		setupForEdit(txts[i]);

	for(var i = 0; i < ddls.length; i++)
		setupForEdit(ddls[i]);

	showEditPane(form.name);
	document.getElementById('formfiller_editpane_auto').checked = form.auto;
}

// NEW FORM DLG ---------------------------------------------------
function setupNewForm(urls, value) {
	getBox().innerHTML = '';

	var inputs = document.getElementsByTagName('input');
	var txts = document.getElementsByTagName('textarea');
	var ddls = document.getElementsByTagName('select');

	currentForm.urls = urls;
	currentForm.name = value;

	var anythingEdited = false;

	for(var i = 0; i < inputs.length; i++) {
		if(!/button|submit|reset/.test(inputs[i].type)) {
			setupForEdit(inputs[i]);
			anythingEdited = true;
		}
	}

	if(!anythingEdited && txts.length == 0 && ddls.length == 0) {
		showBox('There are no form controls on this page.<br>There is nothing here to save...<br><input type="button" id="formfiller_noFormNotice" value="OK" />');
		document.getElementById('formfiller_noFormNotice').addEventListener('click', hideBox, false);
		return;
	}

	for(var i = 0; i < txts.length; i++)
		setupForEdit(txts[i]);

	for(var i = 0; i < ddls.length; i++)
		setupForEdit(ddls[i]);

	showEditPane(value);
	isAddingForm = true;
}

function setupForEdit(field) {
	field.addEventListener('mouseover', function(e) {
		if(!isAddingForm) return;

		var e = safe(e);
		currentField = safe(e.target);

		showFormToolbar(currentField);
	}, false);
}

function hideFormToolbar(field) {
	var tb = getFormToolbar();
	if(!tb.r) return;

	tb.l.style.display = tb.r.style.display = tb.t.style.display = tb.b.style.display = 'none';
}

function showFormToolbar(field) {
	ensureFormToolbar();

	var tb = getFormToolbar();
	var f = 6; // must be same as in ensureFormToolbar

	var h = field.clientHeight;
	var w = field.clientWidth;

	//hack height for select boxes
	if(field.tagName == 'SELECT' && field.size < 2) {
		h = field.getElementsByTagName('option')[0].clientHeight + 3;
	}

	var oT = pos(field).y;
	var oL = pos(field).x;	

	tb.l.style.top = tb.r.style.top = tb.t.style.top = (oT - f) + 'px';

	tb.l.style.height = h + f + 'px';
	tb.l.style.left = oL - f + 'px';

	tb.t.style.width = w - f + 'px';
	tb.t.style.left = oL + 'px';

	tb.r.style.height = h + f + 'px';
	tb.r.style.left = oL + w + 'px';

	tb.b.style.width = w - f + 'px';
	tb.b.style.top = oT + h + 'px';
	tb.b.style.left = oL + 'px';

	tb.l.style.display = tb.r.style.display = tb.t.style.display = tb.b.style.display = 'block';
}

function showEditPane(name) {
	ensureEditPane();

	var pane = getEditPane();
	populateItems();

	pane.style.display = 'block';
	document.getElementById('formfiller_editpane_formname').innerHTML = name;
}

function populateItems() {
	for(var i = 0; i < formItems.length; i++) {
		populateFormItem(formItems[i].id, formItems[i].value, formItems[i].type);
	}
}

function ensureEditPane() {
	var pane = getEditPane();
	if(pane) return;

	pane = document.createElement('div');
	pane.id = 'formfiller_editpane';
	pane.style.padding = '5px';
	pane.style.backgroundColor = 'white';
	pane.style.MozBorderRadius = '4px';
	pane.style.borderColor = '#cccccc';
	pane.style.width = '200px';
	pane.style.borderWidth = '1px';
	pane.style.borderStyle = 'solid';
	pane.style.position = 'fixed';
	pane.style.right = '10px';
	pane.style.bottom = '10px';
	pane.style.zIndex = '1910';
	pane.style.fontSize = '12px';
	pane.style.fontFamily = 'arial';

	pane.innerHTML = '<b>Editing form</b><br><span id="formfiller_editpane_formname"></span><br><br><b>Added elements:</b><br/><div id="formfiller_editpane_noitems" style="color: #CCCCCC;">Hover form controls in the page to select the controls that are to be saved</div><div id="formfiller_editpane_items"></div><input type="checkbox" id="formfiller_editpane_auto"> <label for="formfiller_editpane_auto">Populate on page load</label><br/><input type="button" value="Done" id="formfiller_editpane_save" /> <input type="button" value="Cancel" id="formfiller_editpane_cancel" />';

	document.body.appendChild(pane);

	document.getElementById('formfiller_editpane_cancel').addEventListener('click', function() {
		getEditPane().style.display = 'none';
		hideFormToolbar();
		formItems = [];
		currentField = null;
		isAddingForm = false;
		currentForm = { urls: [] };
		safe(document.getElementById('formfiller_editpane_noitems')).style.display = 'block';
		safe(document.getElementById('formfiller_editpane_items')).innerHTML = '';
	}, false);

	document.getElementById('formfiller_editpane_save').addEventListener('click', function() {

		currentForm.items = formItems;
		currentForm.auto = document.getElementById('formfiller_editpane_auto').checked;

		if(!addCurrentForm())
			return;

		getEditPane().style.display = 'none';
		hideFormToolbar();
		formItems = [];
		currentField = null;
		isAddingForm = false;		
		currentForm = { urls: [] };
		safe(document.getElementById('formfiller_editpane_noitems')).style.display = 'block';
		safe(document.getElementById('formfiller_editpane_items')).innerHTML = '';
	}, false);
}

function getEditPane() { return document.getElementById('formfiller_editpane'); }

function ensureFormToolbar() {
	var tb = getFormToolbar();
	if(tb.r) return;

	var l = document.createElement('div');
	var r = document.createElement('div');
	var t = document.createElement('div');
	var b = document.createElement('div');

	l.id = 'formfiller_floatingtoolbar_l';
	t.id = 'formfiller_floatingtoolbar_t';
	b.id = 'formfiller_floatingtoolbar_b';
	r.id = 'formfiller_floatingtoolbar';

	var f = 6; // must be same as in showFormToolbar

	l.style.opacity = t.style.opacity = b.style.opacity = r.style.opacity = '0.8';
	l.style.backgroundColor = t.style.backgroundColor = b.style.backgroundColor = r.style.backgroundColor = '#CCCCCC';
	l.style.display = t.style.display = b.style.display = r.style.display = 'none';
	l.style.position = t.style.position = b.style.position = r.style.position = 'absolute';
	l.style.padding = t.style.padding = b.style.padding = r.style.padding = (f/2)+'px';
	
	r.innerHTML = '<button id="formfiller_floatingtoolbar_button">Add</button>';

	document.body.appendChild(l);
	document.body.appendChild(t);
	document.body.appendChild(r);
	document.body.appendChild(b);

	r.addEventListener('mouseout', formToolbarMouseOut, false);
	l.addEventListener('mouseout', formToolbarMouseOut, false);
	t.addEventListener('mouseout', formToolbarMouseOut, false);
	b.addEventListener('mouseout', formToolbarMouseOut, false);

	document.getElementById('formfiller_floatingtoolbar_button').addEventListener('click', function(e) {
		var id = currentField.id;
		var value = currentField.value;
		var type = currentField.tagName.toLowerCase();

		if(currentField.tagName == 'INPUT') {
			type = currentField.type.toLowerCase();

			if(/checkbox/.test(currentField.type)) {
				value = currentField.checked.toString();
			} else if(/radio/.test(currentField.type)) {
				var rbl = currentField.form[currentField.name];
				id = currentField.name;
				for(var i = 0; i < rbl.length; i++) {
					if(rbl[i].checked) {
						value = rbl[i].value;
						break;
					}
				}
			}
		}

		addItemToForm(id, value, type);
	}, false);
}

function formToolbarMouseOut(e) {
	var target = safe(e).relatedTarget;

	if(!target) {
		return;
	}

	try {
		if(target === currentField || target.parentNode.id.indexOf('formfiller_floatingtoolbar') >= 0 || target.id.indexOf('formfiller_floatingtoolbar') >= 0)
			return;
	} catch(ex) { }

	hideFormToolbar();
}

function addItemToForm(id, value, type) {

	if(!id) {
		showBox('You have tried to add an item that does<br/>not have an identifier specified.<br/><br/>The script will not be able to find this item.<br/>The action is aborted.<br/><br/><input type="button" id="formfiller_floatingtoolbar_noidnotice" value="OK" />');
		document.getElementById('formfiller_floatingtoolbar_noidnotice').addEventListener('click', hideBox, false);
		return;
	}

	formItems.push({ id: id, value: value, type: type });
	populateFormItem(id, value, type);
}

function populateFormItem(id, value, type) {
	var container = safe(document.getElementById('formfiller_editpane_items'));
	safe(document.getElementById('formfiller_editpane_noitems')).style.display = 'none';

	var div = document.createElement('div');
	div.id = 'formfiller_editpane_items_' + id;

	var a = document.createElement('a');
	a.href = 'javascript:void(0);';
	a.innerHTML = getName(id);

	div.appendChild(a);

	container.appendChild(div);

	a.addEventListener('click', function(e) {
		var target = safe(e).target;
		if(!target) {
			return;
		}

		try {
			var p = safe(target.parentNode).id;
		} catch(ex) {
			return;
		}
		var id = p.substring(26);

		showItemInfo(id);
	}, false);

	hideFormToolbar();
}

function showItemInfo(id) {
	var cItem = null;
	for(var i = 0; i < formItems.length; i++) {
		if(formItems[i].id == id) {
			cItem = formItems[i];
			break;
		}
	}

	if(!cItem) return;

	var type = cItem.type.substring(0, 1).toUpperCase();
	type += cItem.type.substring(1).toLowerCase();
	var html = '<b>' + getName(cItem.id) + '</b><div style="width: 300px;">' + type +' of the ID <i>' + cItem.id + '</i> will be populated with the following value:<br/><i>' + cItem.value + '</i></div><br/><br/>';
	showBox(html);
	
	var buttons = document.createElement('div');

	var btn1 = document.createElement('button');
	btn1.innerHTML = 'OK';

	var btn2 = document.createElement('button');
	btn2.id = 'formfiller_iteminfo_' + id;
	btn2.innerHTML = 'Remove';

	buttons.appendChild(btn1);
	buttons.appendChild(btn2);

	getBox().appendChild(buttons);

	btn1.addEventListener('click', hideBox, false);
	btn2.addEventListener('click', function(e) {
		if(!safe(e).target) {
			return;
		}

		var id = safe(e).target.id.substring(20);
		var newItems = [];
		for(var i = 0; i < formItems.length; i++) {
			if(formItems[i].id == id) continue;
			newItems.push(formItems[i]);
		}
		formItems = newItems;
		document.getElementById('formfiller_editpane_items_' + id).style.display = 'none';
		if(formItems.length == 0)
			safe(document.getElementById('formfiller_editpane_noitems')).style.display = 'block';
		hideBox();
	}, false);
}

function getName(name) {
	if(name.length > 30)
		return name.substring(0, 10) + '..' + name.substring(name.length-20, name.length);

	return name;
}

function getFormToolbar() { 
	return {
		l: document.getElementById('formfiller_floatingtoolbar_l'),
		t: document.getElementById('formfiller_floatingtoolbar_t'),
		r: document.getElementById('formfiller_floatingtoolbar'),
		b: document.getElementById('formfiller_floatingtoolbar_b')
	};
}

// BOX UI ---------------------------------------------------------
function safe(obj) { return obj.wrappedJSObject || obj }

function ensureBox() {
	var box = getBox();
	if(box) return;

	box = document.createElement('div');
	box.id = 'formfiller_uibox';
	box.style.padding = '5px 10px 5px 5px';
	box.style.backgroundColor = 'white';
	box.style.MozBorderRadius = '4px';
	box.style.borderColor = '#cccccc';
	box.style.borderWidth = '1px';
	box.style.borderStyle = 'solid';
	box.style.position = 'fixed';
	box.style.zIndex = '2001';
	box.style.fontSize = '12px';
	box.style.fontFamily = 'arial';

	document.body.appendChild(box);
}

function ensureBG() {
	var bg = getBG();
	if(bg) return;

	bg = document.createElement('div');
	bg.id = 'formfiller_bgshade';
	bg.style.width = '100%';
	bg.style.height = '100%';
	bg.style.position = 'fixed';
	bg.style.opacity = '.7';
	bg.style.backgroundColor = 'black';
	bg.style.zIndex = '2000';
	bg.style.top = '0';
	bg.style.left = '0';

	document.body.appendChild(bg);
}

function centerObj(obj) {
	obj.style.left = Math.round(document.width / 2 - obj.clientWidth / 2) + 'px';
	obj.style.top = Math.round(window.innerHeight / 2 - obj.clientHeight / 2) + 'px';
}

function getBox() { return document.getElementById('formfiller_uibox'); }
function getBG() { return document.getElementById('formfiller_bgshade'); }

function showBox(html) {
	ensureBox();

	if(html) {
		if(typeof html == 'string')
			getBox().innerHTML = html;
		else {
			getBox().innerHTML = '';
			getBox().appendChild(html);
		}
	}

	var close = document.createElement('a');
	close.href = 'javascript:void(0);';
	close.innerHTML = 'x';
	close.style.position = 'absolute';
	close.style.right = '2px';
	close.style.top = '2px';

	getBox().appendChild(close);

	getBox().style.display = 'block';
	centerObj(getBox());

	showBG();

	close.addEventListener('click', function() { hideBox() }, false);
}

function showBG() {
	ensureBG();
	getBG().style.display = 'block';
}

function hideBox() {
	getBox().style.display = 'none';
	hideBG();
}

function hideBG() {
	getBG().style.display = 'none';
}

function pos(o){
	var x = 0;
	var y = 0;
              
	while(o){
		x += o.offsetLeft;
		y += o.offsetTop;
		o = o.offsetParent;
	}
                        		      
	return {x:x,y:y};
}

var SUC_script_num = 62771;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}