// ==UserScript==
// @name          Archive Embed Code Poster
// @author        Robin Tweedie <robin.tweedie@gmail.com>
// @namespace     http://www.archive.org
// @description   Sends flowplayer embed code to Songkick (for Songkick Bootleg Injector userscript)
// @include       http://www.archive.org/details/*
// @version       0.1
// ==/UserScript==
// --------------------------------------------------------------------
//
// See: http://userscripts.org/scripts/show/60820
//
//---------------------------------------------------------------------

function FP_wait() {
  // We only want to do things if the window is a popup.
  if (!unsafeWindow.opener) {
    return false;
  }
  
  //check that the player has loaded
  if (typeof unsafeWindow.$f(0) === 'undefined') { 
    wait_time = wait_time + 150;
    //the player might not ever load, give up after 10 seconds
    if (wait_time <= 10000) {
      window.setTimeout(FP_wait, 150);
    } else {
      window.close();
    }
  } else { 
    $f = unsafeWindow.$f;
    
    $f(0).play();

    function waitForPlay() {
      //check if player state is "playing" (3)
      if ($f(0).getState() === 3) {
        $f(0).pause();
        //run archive.org's embed code generation function
        unsafeWindow.IAPlay.embedthis();
        
        embedCode = document.getElementById("embed").value;
        
        //post embed code back to parent window
        unsafeWindow.opener.postMessage(embedCode, "http://www.songkick.com");
        window.close();
      } else { 
        //wait 100ms and try again
        window.setTimeout(waitForPlay, 100);    
      }
    }
    waitForPlay();
  }
}
wait_time = 0;
FP_wait();
