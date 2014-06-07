// ==UserScript==
// @name        Google+ Promotion Bar Removal
// @namespace   http://www.forum-3dcenter.org
// @description Remove the annoying blue bar that tries to lure you into Google+
// @author      Plutos
// @version     1.0
// @include     http://www.google.*
// @include     https://www.google.*


// ==/UserScript==
var gbprw = document.getElementById("gbprw");
gbprw.parentNode.removeChild(gbprw);
