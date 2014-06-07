// ==UserScript==
// @name           Hide MSDN Header
// @namespace      http://userscripts.org/users/24908
// @description    Hides the huge header on msnd pages and replaces it with a thin paceholder that can be clicked to show the header.
// @include        http://msdn.microsoft.com/en-us/library/*
// ==/UserScript==
// Version: 1
// Date:    Jan. 7, 2009
// Author:  Aaron McBride

var rheader = document.getElementById('rheader');
var contents = document.getElementById('contents');

var showHeaderDiv = document.createElement('div');
showHeaderDiv.innerHTML = "Show Header";
showHeaderDiv.style.paddingTop = '3px';
showHeaderDiv.style.height = '25px';
showHeaderDiv.style.textAlign = 'center';
showHeaderDiv.style.cursor = 'pointer';
showHeaderDiv.style.backgroundColor = '#F0F0F0';
showHeaderDiv.style.color = 'blue';
showHeaderDiv.style.textDecoration = 'underline';

showHeaderDiv.addEventListener('click', function () {
    showHeaderDiv.style.display = 'none';
    rheader.style.display = 'block';
    contents.style.top = rheader.clientHeight + 'px';
}, false);

//hide the header, and show the replacement
rheader.style.display = 'none';
contents.style.top = '25px';
contents.parentNode.insertBefore(showHeaderDiv, contents);
