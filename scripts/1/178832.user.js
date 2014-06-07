// ==UserScript==
// @name        CookieClicker Speed x2
// @namespace   JavaProphet.CCS
// @description Multiplies the CC speed by 2.
// @include     http://orteil.dashnet.org/cookieclicker/*
// @version     1
// ==/UserScript==
    var scriptCode = new Array();   // this is where we are going to build our new script
    
    // here's the build of the new script, one line at a time
    scriptCode.push('Game.Loop=function()'        );
    scriptCode.push('{'                   );
    scriptCode.push('Game.catchupLogic=0;');
    scriptCode.push('Game.Logic();'  );
    scriptCode.push('Game.catchupLogic=1;'                                 );
    scriptCode.push('Game.accumulatedDelay+=((new Date().getTime()-Game.time)-500/Game.fps);'                                 );
    scriptCode.push('Game.accumulatedDelay=Math.min(Game.accumulatedDelay,500*5);'                                 );
    scriptCode.push('Game.time=new Date().getTime();'                                 );
    scriptCode.push('while (Game.accumulatedDelay>0)'                                 );
    scriptCode.push('{'                                 );
    scriptCode.push('Game.Logic();'                                 );
    scriptCode.push('Game.accumulatedDelay-=500/Game.fps;'                                 );
    scriptCode.push('}'                                 );
    scriptCode.push('Game.catchupLogic=0;'                                 );
    scriptCode.push('Game.Draw();'                                 );
    scriptCode.push('setTimeout(Game.Loop,500/Game.fps);'                                 );
    scriptCode.push('}'                                 );
    
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
    
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script); 