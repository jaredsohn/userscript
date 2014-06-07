// ==UserScript==
// @name          Intense Debate Notify by Email
// @namespace     http://aaronhockley.com
// @description   Selects the "Notify me of follow-up comments via email" checkbox on IntenseDebate-powered blog comment sites.
// @include       *
// @exclude	      */wp-admin/*
// ==/UserScript==
function findcheckbox(iden)
{
	return document.getElementById(iden);
}

findcheckbox('IDSubscribeToThis').checked = true;