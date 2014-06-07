// ==UserScript==
// @name           YouTube: Add this video to QuickList
// @namespace      http://userscripts.org/users/RyanBiscuit
// @description    Enables an option to add the currently playing video to your quicklist
// @include        http://www.youtube.com/watch?v=*
// @creator        Ryan Boylett <ryanbiscuit@live.com>
// @identifier     http://userscripts.org/scripts/source/65582.user.js
// @version        1.0
// @date           2010-1-3
// ==/UserScript==
for(i=0;i<document.getElementsByTagName('link').length;i++) { if(document.getElementsByTagName('link').item(i).getAttribute('rel')=='canonical') { var docId = document.getElementsByTagName('link').item(i).getAttribute('href'); docId = docId.split('='); docId = docId[1]; } }
newQListAdd = document.createElement('div');
newQListAdd.className = 'watch-tab';
newQListAdd.innerHTML = '<a id="watch-action-playlists-link" href="#" class="watch-action-link" onclick="return yt.www.watch.quicklist.onQuickAddClick(this, \''+docId+'\', \'http://i1.ytimg.com/vi/'+docId+'/default.jpg\', \''+document.title.replace(/'/g,"\\\'")+'\'); return false;"><button id="watch-action-playlists" class="master-sprite" title="Add to Quicklist"></button><span class="watch-action-text">Add to Quicklist</span></a><button class="master-sprite watch-tab-arrow" title=""></button>';
document.getElementById('watch-tab-playlists').parentNode.insertBefore(newQListAdd,document.getElementById('watch-tab-playlists').nextSibling);