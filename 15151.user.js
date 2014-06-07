// ==UserScript==
// @name           Auto-Login
// @namespace      http://t-hawk.com
// @description    Global auto-login script
// @include        http://server/controlpanel/*
// @include        file:///*
// ==/UserScript==

// Run settings
var formI;
var cSite;
var body;
var selected = new Array ();
var form;
var debug = true;

// DIVS
var details;

settings ();
sortForms ();

// DEBUG ONLY
if (debug) {
    displayOverlay ();
}

// Load settings
function settings () {
    GM_registerMenuCommand ("Setup auto-login", displayOverlay);
    cSite = GM_getValue (document.domain, null);
    if (cSite != null) {
	cSite = new Array ();
	//Username to login with
	cSite['username'] = GM_getValue (document.domain+'user', null);
	//Password to login with
	cSite['password'] = GM_getValue (document.domain+'pass', null);

	//Identity of the form
	cSite['form'] = GM_getValue (document.domain+'form', null);

	//Field to place username
	cSite['ufield'] = GM_getValue (document.domain+'ufield', null);

	//Field to place password
	cSite['pfield'] = GM_getValue (document.domain+'pfield', null);
    }

    // --- Setup styles

    // Overlay main
    GM_addStyle (".hide {background: url('http://server/grease/black.php'); position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; height: 100%; width: 100%;}");
    GM_addStyle ('.overlay {position: fixed; top: 10px; height: 500px; left: 100px; right: 100px; overflow: none; border: 2px dotted #C0C0C0; top: 10px; background: #FFF');
    
    // Overlay header
    GM_addStyle ('.head {margin: 0; left: 0; right: 0; border-bottom: 1px s'
		 +'olid #000; background: #000; height: 25px; color: #C0C0C'
		 +'0; font-size: 14pt; text-align: right;}');

    // Overlay body
    GM_addStyle ('.oBody {margin: 0; left: 0; right: 0; border: 0; top: 25p'
		 +'x; bottom: 0; color: #000; position: absolute; overflow:'
		 +'auto; background: #FFF}');

    // Form tab
    GM_addStyle (".formTab {position: absolute; border: 1px solid #000; bac"
		 +"kground: #C0C0C0; color: #000; width: 100px; text-align:"
		 +" center; height: 20px; cursor: default; float: left; top"
		 +": 10px;}");
    GM_addStyle (".formTabSel {position: absolute; border: 1px solid #000;"
		 +" background: #909090; color: #000; width: 100px; text-al"
		 +"ign: center; height: 20px; cursor: default; float: left;"
		 +" border-bottom: 1px solid #909090; top: 10px}");

    // Form details
    GM_addStyle ('.inner {position: absolute; top: 31px; border: 1px solid '
		 +'#000; right: 10px; left: 10px; background: #909090; colo'
		 +'r: #000;}');

    // Field - overlay
    GM_addStyle ('.field {border-bottom: 1px dotted #C0C0C0; width: 100%; f'
		 +'loat: left; margin-top: 2px;}');

    // Form field - overlay
    GM_addStyle ('.ffield {border: 1px solid #000; background: #C0C0C0; col'
		 +'or: #000; width: 80px; height: 20px; float: right; text-'
		 +'align: center; margin-right: 2px; cursor: default}');

    // Form field name - overlay
    GM_addStyle ('.nfield {float: left; margin-left: 5px}');
    GM_addStyle ('.nfield-sel {float: left; margin-left: 5px; font-weight: '
		 +'bold}');
}

// --- Core ---

// Show config overlay
function displayOverlay () {
    back = document.createElement ('div');
    back.setAttribute ('class', 'hide');
    back.addEventListener ('click', function () {document.body.removeChild (div); document.body.removeChild (back);}, true);

    div = document.createElement ('div');
    div.setAttribute ('class', 'overlay');

    head = document.createElement ('div');
    head.setAttribute ('class', 'head');
    head.innerHTML = 'Auto-Login Config';
    div.appendChild (head);

    body = document.createElement ('div');
    body.setAttribute ('class', 'oBody');
    div.appendChild (body);
    
    form = new Array ();
    for (i = 0; i < formI.length; i++) {
	form[i] = document.createElement ('div');
	form[i].setAttribute ('class', 'formTab');
	form[i].setAttribute ('style', 'left: '+(10+(i * 100))+'px');
	form[i].addEventListener ("click", displayForm, true);
	form[i].innerHTML = formI[i][0];
    }

    if (cSite == null) {
	displayForm (-1);
    } else {
	displayForm (cSite['form']);
    }
    
    document.body.appendChild (back);
    document.body.appendChild (div);
}

// Display form details
function displayForm (e) {
    if (typeof(eval(details)) == "object") {
	try {body.removeChild (details);}
	catch (e) {/* Do nothing */}
    }
    details = document.createElement ('div');
    details.setAttribute ('class', 'inner');
    if (this.innerHTML == undefined) {
	id = e;
    } else {
	id = this.innerHTML;
    }
    
    if (id != -1) {
	var cForm = getForm (id);
	this.setAttribute ('class', 'formTabSel');
	selected['form'] = id;
	if (cSite != null) {
	    if (cForm[0] == cSite['form']) {
		for (i = 0; i < cForm[1].length; i++) {
		    if (cForm['ufield'] ==  cForm[1][i]) {
			field = addField (cForm[0], cForm[1][i], 'ufield');
		    } else {
			field = addField (cForm[0], cForm[1][i]);
		    }
		    details.appendChild (field);
		}
	    }
	} else {
	    for (i = 0; i < cForm[1].length; i++) {
		field = addField (cForm[0], cForm[1][i]);
		details.appendChild (field);
	    }
	    for (i = 0; i < cForm[2].length; i++) {
		field = addField (cForm[0], cForm[2][i]);
		details.appendChild (field);
	    }
	}
	// Save button
	buttonSave = document.createElement ('div');
	buttonSave.setAttribute ('class', 'ffield');
	buttonSave.setAttribute ('style', 'font-weight: bold; font-style: italic');
	buttonSave.innerHTML = 'Save';

	// Cancel button
	buttonCanc = document.createElement ('div');
	buttonCanc.setAttribute ('class', 'ffield');
	buttonCanc.setAttribute ('style', 'font-weight: bold; font-style: italic');
	buttonCanc.innerHTML = 'Cancel';

	details.appendChild (buttonCanc);
	details.appendChild (buttonSave);
    } else {
	details.innerHTML = 'Please select a form element';
    }

    body.appendChild (details);

    for (i = 0; i < form.length; i++) {
	body.appendChild (form[i]);
    }
}

// Show form field in settings overlay
function addField (form, id, type) {
    var field = document.createElement ('div');
    field.setAttribute ('class', 'field');

    var uField = document.createElement ('div');
    uField.setAttribute ('class', 'ffield');
    uField.addEventListener ("click", setUser, true);
    uField.setAttribute ('id', form+';'+id);
    uField.innerHTML = 'Username';
    
    var pField = document.createElement ('div');
    pField.setAttribute ('class', 'ffield');
    pField.addEventListener ("click", setPass, true);
    pField.setAttribute ('id', form+';'+id);
    pField.innerHTML = 'Password';
    
    var nField = document.createElement ('div');
    nField.innerHTML = id;

    if (type == null) {
	nField.setAttribute ('class', 'nfield');
    } else {
	nField.setAttribute ('class', 'nfield-sel');
	if (type == 'ufield') {
	    uField.style.background = '#000000';
	    uField.style.color = '#FFFFFF';
	} else if (type == 'pfield') {
	    pField.style.background = '#000000';
	    pField.style.color = '#FFFFFF';
	}
    }

    field.appendChild (nField);
    field.appendChild (pField);
    field.appendChild (uField);
    
    return field;
}

// Set selected username and password
function setUser () {
    selected['user'] = this.id;
    checkBackground ('user');
}

function setPass () {
    selected['pass'] = this.id;
    checkBackground ('pass');
}

// Set background of currently selected
function checkBackground (type) {
    fields = details.getElementsByTagName ('div');
    for (i = 0; i < fields.length; i++) {
	ffields = fields[i].getElementsByTagName ('div');
	for (j = 0; j < ffields.length; j++) {
	    if (type == 'user' && ffields[j].innerHTML == 'Username') {
		if (selected['user'] == ffields[j].id) {
		    ffields[j].style.background = '#000000';
		    ffields[j].style.color = '#FFFFFF';
		    ffields[j].removeEventListener ("click", setUser, true);
		} else {
		    ffields[j].style.background = '#C0C0C0';
		    ffields[j].style.color = '#000000';
		    ffields[j].addEventListener ("click", setUser, true);
		}
	    } else if (type == 'pass' && ffields[j].innerHTML == 'Password') {
		if (selected['pass'] == ffields[j].id) {
		    ffields[j].style.background = '#000000';
		    ffields[j].style.color = '#FFFFFF';
		    ffields[j].removeEventListener ("click", setPass, true);
		} else {
		    ffields[j].style.background = '#C0C0C0';
		    ffields[j].style.color = '#000000';
		    ffields[j].addEventListener ("click", setPass, true);
		}
	    }
	}
    }
/*    for (i = 0; i < details.child.length; i++) {
	alert (details.child[i].child.length);
    }*/
}

// Get data for specific form
function getForm (id) {
    for (i = 0; i < formI.length; i++) {
	if (formI[i][0] == id)
	    return formI[i];
    }
}

// Analyse and sort forms on site
function sortForms () {
    var forms = document.forms;
    formI = new Array ();
    for (i = 0; i < forms.length; i++) {
	var inputs = forms[i].getElementsByTagName ('input');
	formI[i] = new Array ();
	if (forms[i].name != '') {
	    formI[i][0] = forms[i].name;
	} else {
	    formI[i][0] = forms[i].getAttribute ('action').split ('/');
	    formI[i][0] = formI[i][0][formI[i][0].length - 1];
	}
	formI[i][1] = new Array ();
	formI[i][2] = new Array ();
	for (j = 0; j < inputs.length; j++) {
            if (inputs[j].type == 'text') {
		formI[i][1][formI[i][1].length] = inputs[j].name;
            } else if (inputs[j].type == 'password') {
		formI[i][2][formI[i][2].length] = inputs[j].name;
            }
	}
    }
}