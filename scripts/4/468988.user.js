// ==UserScript==
// @name       Facebook lists head image remover
// @version    1.1
// @description  Remove the random fucking image that apears on top of a facebook "Custom list" time line.
// @include	   http://facebook.com/*
// @include	   http://*.facebook.com/*
// @include    https://facebook.com/*
// @include	   https://*.facebook.com/*
// @run-at document-body
// @copyright  2014+, Petiso
// ==/UserScript==

function fixLists() {
	try {
            var element = document.getElementById('pagelet_friend_list_header');
            if (element!=null)
            {
              element.style.display = 'none';
            }
		}
	 catch (e) {}
}

function checkNew(e)
{
   fixLists();
}

document.addEventListener('DOMNodeInserted', checkNew);
fixLists();
