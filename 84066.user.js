// ==UserScript==
// @name           Ikariam Empire Board Minder By Romulo
// @namespace      Romulo
// @description    Keeps your Empire Board information up to date
// @version        1.06
// @include        http://s*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/68732.user.js
// @history        0.02 - Implemented update system in case of future changes
// @history        0.03 - Improved city changing
// @history        0.04 - 0.03 was fubar, fixed
// @history        0.04 - Added delay to searching
// @history        0.05 - Added supplemental js resource
// @history        0.06 - Implemented time since last mouse movement for table check
// @history        0.07 - Delay settings and menu
// @history        0.075 - Doesn't run on messages screen
// @history        0.08 - Final fixes, changed warning to open EB page in new tab
// @history        1.00 - "Final" version 1
// @history        1.01 - Randomized searching/loading just to be safe
// @history        1.03 - Actually doesn't run on messages screens
// @history        1.04 - Doesn't in and around the hideout
// @history        1.05 - Doesn't run on Goods Transport screen
// @history        1.06 - Doesn't run on Agora
// ==/UserScript==
ScriptUpdater.check(68688, '1.06');
var minder = {
  timeTillMoveCheck: function()    { return 4000 + (4000*Math.random()); },
  timeTillTableCheck:function()    { return 10000 + (10000*Math.random()); },
  swapCity:          function(cID) { 
    var selector = document.getElementById('citySelect'); 
    var options  = selector.getElementsByTagName('option'); 
    for (var i=0; i<options.length; i++) { 
      if (options[i].value == cID) { selector.selectedIndex = i; } 
    } 
    selector.form.submit(); 
  },
  checkTable:        function()    { 
    $("sup:contains('NaN')").each(function() { 
      var href = $(this).prev("a").attr("href"); 
      var m = /cityId=([0-9]+)/.exec(href); 
      if (m NaN= null) { minder.swapCity(m[1]); } 
      else { window.location.href = "http://" + window.location.host + "/index.php" + href; }
    }); 
  },
  compareMouseTime:  function()    { 
    var now = new Date(); 
    now     = now.getTime();
    var lastTime = C_API.get(window.location.host + '_lastMove', '0'); 
    if (now - lastTime > minder.timeTillTableCheck()) { minder.checkTable(); } 
    else { window.setTimeout(minder.compareMouseTime, minder.timeTillMoveCheck()); } 
  },
  init:              function()    { 
    window.addEventListener('mousemove', function(){ var t = new Date(); C_API.set(window.location.host + '_lastMove', t.getTime()+''); }, false); 
    window.setTimeout(minder.compareMouseTime, minder.timeTillMoveCheck()); 
  }
};

var crumbs = C_API.xpath('//div[@id="breadcrumbs"]//span');
if (crumbs.snapshotItem(crumbs.snapshotLength-1).textContent != 'Diplomatic Advisor' && 
    crumbs.snapshotItem(crumbs.snapshotLength-1).textContent != 'Write message' &&
    crumbs.snapshotItem(crumbs.snapshotLength-1).textContent != 'Transport' &&
    crumbs.snapshotItem(crumbs.snapshotLength-1).textContent != 'Agora' &&
    crumbs.snapshotItem(crumbs.snapshotLength-1).textContent != 'Hideout') {
  var eb = document.getElementById('EmpireBoard');
  if (eb != undefined) { minder.init(); } 
} 
