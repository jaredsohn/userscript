// ==UserScript==
// @name           ETI Random User ID
// @namespace      shoecream@luelinks.net (updated by hollow life)
// @description    randomly brings up a user id. commissioned by the haunted and moltar. requires firefox 3
// @include        http://*.endoftheinter.net*
// @include        http://endoftheinter.net*
// @include        https://*.endoftheinter.net*
// @include        https://endoftheinter.net*
// ==/UserScript==


var day = 86400000;

var site = document.getElementsByClassName('menubar');

var last_visited = GM_getValue('last_visited', 'new Date()');
last_visited = eval(last_visited);
var highest_id = GM_getValue('highest_id', 21289);


if (site[0]) {
   var created = document.createElement('div');
   created.innerHTML = 'Please stand by...';
   created.setAttribute('id','random-id');
   created.setAttribute('style','position:absolute;right:1em;');
   site[0].parentNode.insertBefore(created,site[0].nextSibling);

   var now = new Date();
   if (last_visited < (now - day)) {
      GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://endoftheinter.net/userlist.php?user=&sort=2&sortd=2',
            onload: request});
   } else {
      set (highest_id);
   }
}

function request (responseDetails) {
   var html = document.createElement('html');
   html.innerHTML = responseDetails.responseText;
   highest = html.getElementsByTagName('td')[0].firstChild.search.match(/(\d+)/)[1];
   GM_setValue('highest_id', highest);
   GM_setValue('last_visited', (new Date()).toSource());
   set(highest);
}

function set (num) {
   var a = document.createElement('a');
   a.setAttribute('href', 'http://endoftheinter.net/profile.php?user=' + random(num));
   a.innerHTML = 'Random User!';
   created.innerHTML = '';
   created.appendChild(a);
}

function random (d) {
   return (Math.floor(Math.random()*(+d+1))+1);
}
