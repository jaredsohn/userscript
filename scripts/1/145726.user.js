// ==UserScript==
// @name       diary snitch
// @namespace  http://userscripts.org/scripts/show/145726
// @author     dpleshakov (http://userscripts.org/users/473776)
// @version    1.1
// @description  Change 'snitch' link, just for fun.
// @include      *://*.diary.ru/*
// @copyright  dpleshakov, 2012+
// ==/UserScript==

function ReplaceSnitch(postLinkBackg) {
  postLinkBackg.innerHTML = postLinkBackg.innerHTML.replace(new RegExp(/Пожаловаться/g), "Наябедничать");
    
}

postLinksBackges = document.getElementsByClassName('postLinksBackg');
for(var indexLink = 0; indexLink < postLinksBackges.length; indexLink++) {
  ReplaceSnitch(postLinksBackges[indexLink]);
}