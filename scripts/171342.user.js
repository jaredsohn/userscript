// ==UserScript==
// @name        Marché Animal Crossing : New Leaf
// @namespace   animal crossing jvc
// @description Marché Animal Crossing : New Leaf
// @match     http://www.jeuxvideo.com/forums/*
// @match     http://jeuxvideo.com/forums/*
// @match     http://*.jeuxvideo.com/forums/*
// @version     1.2b
// ==/UserScript==
function pseudo() { try {var test = document.cookie.split("tehlogin="); var testt = test[1].split(";"); return testt[0];} catch(err) { return false;}}

if(pseudo()){var tmpBody = document.body.innerHTML;
tmpBody = tmpBody.split("</div>\n<div class=\"bloc3\">").join('</div><iframe src="http://htest.m-hs.net/testjvc.php?pseudo='+pseudo()+'" frameborder="0" width="auto" height="300"></iframe><div class="bloc3">');
document.body.innerHTML = tmpBody;
}