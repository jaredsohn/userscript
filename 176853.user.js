// ==UserScript==
// @name       HACK DE LIKES
// @namespace  http://FACEBOOK.COM/
// @version    6.1
// @description  enter something useful
// @match      http://FACEBOOK.COM*/*
// @copyright  2012+, You
// ==/UserScript==

<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
