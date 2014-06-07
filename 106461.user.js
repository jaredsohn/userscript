// ==UserScript==
// @name           GoodreadsAudibleSearch
// @namespace      http://rampion.myopenid.com
// @description    Add a button to the Goodreads entry for a title to search for it on Audible
// @include        http://www.goodreads.com/book/show/*
// ==/UserScript==

const title = document.getElementById('bookTitle').innerHTML.replace(/<[\s\S]*>/,'').trim();
const audibleButton = document.createElement('li');
audibleButton.innerHTML = '<a href="http://www.audible.com/search?field_language=English&x=0&y=0&searchTitle='+encodeURIComponent(title)+'" class="buttonBar">Audible Search</a>';
const buyButtonBar = document.getElementById('findit').getElementsByTagName('ul')[0];
buyButtonBar.insertBefore(audibleButton, buyButtonBar.lastChild);
