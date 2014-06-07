// ==UserScript==
// @name           Twitter Account ID
// @namespace      http://twitter.com/chrisirmo
// @description    Shows which Twitter account is currently logged in
// @include        http://twitter.com/*
// ==/UserScript==

(function () {

metaCollection = document.getElementsByTagName('meta');

for (i=0;i<metaCollection.length;i++) {
nameAttribute = metaCollection[i].name.search(/session-user-screen_name/);

if (nameAttribute!= -1) {
var username = metaCollection[i].content;
}
}
   
   var div_embed = document.getElementById('sign_out_link');
   if (div_embed) {
      div_embed.innerHTML = div_embed.innerHTML + ': ' +username;
  }
  
})();