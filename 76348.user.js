// ==UserScript==
// @name           Choose All Facebook Friends
// @description    Allows you to choose all your facebook friends
// @include        http://userscripts.org/topics/*
// ==/UserScript==

elms = document.getElementById('friends').getElementsByTagName('li');
for(var fid in elms) {
   if(typeof elms[fid] === 'object')
   {
      fs.click(elms[fid]);
   }
}