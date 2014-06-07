// ==UserScript==
// @name           turn out the internet
// @namespace      *
// @include        *
// ==/UserScript==

var inf="23:30"; // evening time
var sup="6:45"; // morning time

var q=new Date();
var nowtime=q.getHours()*60+q.getMinutes();
var infforbiddentime=parseInt(inf.split(":")[0])*60+parseInt(inf.split(":")[1]);
if(parseInt(inf.split(":")[0])<parseInt(sup.split(":")[0])){infforbiddentime+=24*60;}
var supforbiddentime=parseInt(sup.split(":")[0])*60+24*60+parseInt(sup.split(":")[1]);

if(nowtime>=infforbiddentime && nowtime<=supforbiddentime){document.body.style.display="none";}