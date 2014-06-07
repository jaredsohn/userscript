// ==UserScript==
// @name         Digg Keyboard Shortcuts
// @namespace    http://userscripts.org/scripts/show/67837
// @description  This user script adds a 'view' (v) keyboard shortcut to digg.com.
// @include      http://digg.com/*
// @include      http://www.digg.com/*
// ==/UserScript==

window.addEventListener('keypress', getKeyevent, false);

function getKeyevent(e)
{
  if(e.which == 118)
  {
	window.stop();
    window.location = document.getElementById('permalink-story').getElementsByTagName('a')[0];
  }
}