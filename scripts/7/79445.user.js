// Allow Password Remembering
// version 1.0
// 2010-17-06
// Copyright (c) 2010, Acmex
// Released under the ACCE license
// http://www.dgnet.reg3.net
// Based on the remember password bookmarklet:
//  http://www.squarefree.com/bookmarklets/forms.html#remember_password
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// If you want, you can configure the Included and Excluded pages in 
//  the GreaseMonkey configuration.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Allow Password Remembering", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Sites can direct the browser not to save some password fields (for
//  increased security). They do it by tagging the password field with
//  autocomplete="off", in the HTML. "Allow Password Remembering" removes
//  these tags, so that the user can decide which password the browser 
//  should save.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Allow Password Remembering
// @namespace       http://dgnet.rg3.net
// @description     Removes autocomplete="off" attributes 
// @include         http://*
// @include         https://*
// ==/UserScript==

// Updated (2010/17/10):
// Included Mark Pilgrim's fix for DeerPark:
// must access element.attributes as an array of objects and use .name and .value properties, can't shortcut with element.attributes['autocomplete']


var allowAutoComplete = function(element) {
    var iAttrCount = element.attributes.length;
    for (var i = 0; i < iAttrCount; i++) {
	var oAttr = element.attributes[i];
	if (oAttr.name == 'autocomplete') {
	    oAttr.value = 'on';
	    break;
	}
    }
}

var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++)
{
    var form = forms[i];
    var elements = form.elements;

    allowAutoComplete(form);

    for (var j = 0; j < elements.length; j++)
    {
        allowAutoComplete(elements[j]);
    }
}

