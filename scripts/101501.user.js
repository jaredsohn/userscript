// ==UserScript==
// @name           ByPass page blanche sur beta.lense
// @namespace      JpScripts
// @include        http://beta.lense.fr/wp-comments-post.php
// ==/UserScript==
if(document.referrer && !document.getElementById('error-page')){
  setTimeout(function(){
    document.location.assign(document.referrer);
  },500);
}