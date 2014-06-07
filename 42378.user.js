// ==UserScript==
// @name           Binnewz auto Login
// @namespace      www.binnews.in
// @description    Binnewz auto Login
// @include        http://*binnews.in/_admin/login.php*
// @version 1.3
// ==/UserScript==
var usrnm="Votre Login ici";
var psswrd="Votre password ici";
document.getElementsByName("try_user")[0].value=usrnm;
var pswrd=document.getElementsByName("try_pass")[0];
pswrd.maxLength="50";
pswrd.value=psswrd;
document.getElementsByTagName("input")[2].click();