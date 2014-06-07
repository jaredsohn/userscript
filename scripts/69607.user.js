// ==UserScript==
// @name           unlabelled
// @namespace      GMail
// @include        http*://mail.google.com/mail/*
// ==/UserScript==

function enumlabels(concat_char)
{
	gmail = document.getElementById("canvas_frame").contentDocument;
	tblLabels = gmail.getElementsByClassName("Mdjed")[1];
	Labels = tblLabels.getElementsByClassName('n0');
	TextField = gmail.getElementById(":rh");

	search_term=""

	for each (var Label in Labels)
	{
		search_term=search_term+concat_char+"label:"+Label.title.replace(" ","-");
	}
	TextField.value=TextField.value+"("+search_term+")";
}

function any_label()
{
	enumlabels(" OR ");
}

function no_label()
{
	enumlabels(" -");
}

GM_registerMenuCommand("Labelled",any_label);
GM_registerMenuCommand("UnLabelled",no_label);
