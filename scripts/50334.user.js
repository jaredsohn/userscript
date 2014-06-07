var GMSU_meta_50334 = <><![CDATA[
// ==UserScript==
// @name           UserStyles Install Count
// @description    Tells you how many times your styles were installed (in total and separate) plus the average rating for each style
// @namespace      http://projects.izzysoft.de/
// @include        http://*userstyles.org/users/*
// @include        http://userstyles.org/styles/browse*
// @require        http://userscripts.org/scripts/source/51513.user.js
// @uso:script     50334
// @version        1.1.1
// ==/UserScript==
]]></>;
GMSU.init(50334);

// ==========================================================[ Main ]===
GM_addStyle('.good-rating { list-style-image: url(/images/good.gif); } .bad-rating { list-style-image: url(/images/bad.gif); } .ok-rating { list-style-image: url(/images/ok.png); } .installcount { color: gray; }');
var tags=document.getElementById("style-list").getElementsByTagName("li");
var insts = 0, allvotes = 0, fakevotes = 0, avgrating = 0; completed = 0;
sumCount = 0;
for(i=0;i<tags.length;i++){
  var allCount  = tags[i].getAttribute('total-install-count');
  sumCount += parseInt(allCount);
  var weekCount = tags[i].getAttribute('weekly-install-count');
  var aveRating = tags[i].getAttribute('average-rating');
  var span = document.createElement('span');
  span.setAttribute('class','installcount');
  span.innerHTML = ' (total: '+allCount+', week: '+weekCount;
  if (aveRating) span.innerHTML += ', rating: '+aveRating;
  span.innerHTML += ')';
  tags[i].appendChild(span);
}
if (/userstyles\.org\/users\//.test(window.location))
  document.title += ' ('+sumCount+' installs)';
