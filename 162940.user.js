// ==UserScript==
// @description      This script moves bazarr listings to the top of the item market page on torn.com
// @include          *.torn.com/imarket.php*
// @name             bazaar link mover
// @namespace        notused
// @require          https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js
// ==/UserScript==

function grabFormFields(url)
	{//splits the form fields of the given url into an array for easier data use.
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
		{
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
		}
    return vars;
	}
var formfields = grabFormFields(window.location.href);

if(!isNaN(formfields['type']))
	{
	//move the table
	$('table[width="90%"][cellspacing="0"][cellpadding="0"]').insertBefore($('table[class="list"][width="40%"][bgcolor="#EAEAEA"]'));
	//insert a couple of line breaks after the table to make things look nicer.
	$('<br/><br/>').insertAfter($('table[width="90%"][cellspacing="0"][cellpadding="0"]'));
	}