// ==UserScript==
// @name           SI - Refresh 6mn
// @namespace      SpaceInvasion
// @description   Refresh de 6mn pour SpaceInvasion 
// @version       0.1
// @date          19-12-2009
// @include        *.spaceinvasion.*/indexInternal.es?action=internalHome*
// @include        http://spaceinvasion.*/indexInternal.es?action=internalHome*
// ==/UserScript==


function Home() {

        delay=360; timer=null;
        startTimer=function() { timer=window.setTimeout(function(){ window.location.reload(); }, delay*1000); };
        stopTimer=function() { window.clearTimeout(timer); };
        restartTimer=function() { stopTimer(); startTimer(); };
        startTimer();

      }

Home();
