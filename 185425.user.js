// ==UserScript==
// @name          Swyter Tweaks for Spotify [Fork]
//				                             Currently based on Version '2013.12.04'  
//
// @description   Skips the audio ads on play.spotify.com, while they are still being played, so *everyone* is happy.
// @updateURL     http://userscripts.org/scripts/source/183023.meta.js
// @downloadURL   http://userscripts.org/scripts/source/183023.user.js
// ^-Here is the orgiginal Script

// @-match         *://*
// @-match         *://play.spotify.com/apps/player/*
// @match         *://play.spotify.com/*
// @exclude       *://play.spotify.com/apps/*
// @grant         none
// @version       2014.02.01
// @author        Swyter / Djamana
//
// History: 
//    Feb 2014
//      Autologin added    
//
// ==/UserScript==

  var AUTOLOGIN_Enabled  = 1
  
     var AUTOLOGIN_Username = "a8631142"
     var AUTOLOGIN_Password = "qweasd"
  

  try {
     if (AUTOLOGIN_Enabled) {
        $("login-usr" ).value = AUTOLOGIN_Username
        $("login-pass").value = AUTOLOGIN_Password
        
        $("login-pass").nextElementSibling.click()
        //$("sp-login-form").submit()
      }
      
  } catch (e) {
  }
  
// -----------------------------------------------------------
console.log( 'Injecting AdFree_Spotify  on: ' + location.pathname );
//debugger

function when_external_loaded() {
   
   try {
   
      // Bruteforce our way to get the instance reference, nice spaguetti code, JS at its finest!
      // F*ck you Firefox!— Said the angry programmer with the hair-raising voice of a stud.
      var SpotifyFlashplayerParams      = document.querySelector( "param[name*='flashvars']" ).value
      var SpotifyFlashplayer_instanceId = SpotifyFlashplayerParams.match( /instanceId=([^&]*)/ ) [1]
      
      var _core = Spotify.Instances.get ( SpotifyFlashplayer_instanceId );
      
      
      // Here's the real meat...  We'll get here if there was now error
      console.log("Binding Swyter Tweaks for Spotify on the player's code.");
      debugger
      
      _core.audioManager.bind("PLAYING" , function(e) {
         
  //       debugger
         
         var Player=_core.audioManager.getActivePlayer();
         
         if (Player.isAd)  {
            debugger
            console.log("So so we're loading a spotify AudioAd, skipping “" + document.title + "”");
            
            
            Player.seek(
                  Player.getDuration()  ||	 GetSongLengthFromWebpage()
            );
//         } else {
         }
      })
      
     // -------------------------------------------------------------
     
     // Avoids that " - Spotify" gets appended to the website title
        function SimpilifyTitle () {
            document.title = document.title
                               .replace(/ - Spotify/g,'')
       }   
       setInterval( SimpilifyTitle, 300);

      
      } catch (e) {
            // Wait in cycles of 100 ms until the client finally loads
            setTimeout(arguments.callee, 100);
      }
 
   

   
         
   }; 
   
   when_external_loaded(); // Ugly as hell, damn you Spotify engineers for a nicely done work! :-)


   
   /*SimpilifyTitle();
   
   function SimpilifyTitle() {
      try {
         debugger
         
         var aa = Spotify.Bridge.Responder.getHandler("application_set_title")
         aa.fn = function(a, b) {
            var d = this._createPromise();
            var c = b.args[0];
            document.title = !c || !c.replace(/^\s+|\s+$/g, "") ? "Spotify" : c;// + " - Spotify";
            d.fulfill(!0);
            return d;
         }
      } catch (e) {
         console.error("ERROR: " + e.message);
         setTimeout(arguments.callee, 100);
         
      }
   }
    */    
   function GetSongLengthFromWebpage() {
      
      var milliseconds;
      try {
         
         var timestamp = $("app-player").contentDocument.getElementById("track-length").innerHTML.split(":");
         milliseconds =  timestamp[0] * 60 + _
         timestamp[1] *  1;
         return  milliseconds * 1000;
         
      } catch (e) {
         console.error("ERROR: Execution of script 'Swyter Tweaks for Spotify'::GetMilliseconds failed! " + e.message);
      }
   }
