// ==UserScript==
// @name        TwitchPlaysPokemon: Insert UTC time
// @namespace   Misael.K
// @include     http://www.twitch.tv/twitchplayspokemon
// @version     1.0
// @grant       none
// ==/UserScript==

// Content Script Injection
// http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function() {
    function injectGreasemonkeyScript() {
        var player = $("#player");
        if ($(player).length === 0) {
            setTimeout(injectGreasemonkeyScript, 1000);
            return;
        }
        
        $(player).prepend("\
            <div id='local_time' style='position: absolute; top: -25px; width: 100%; text-align: center; font: 20px monospace;'></div> \
        ");
        
        setInterval(function() {
        
            var localDate = new Date();
            var formattedTime = localDate.toUTCString().slice(20, 25);
            var mils = Math.round(localDate.getMilliseconds() / 10);
            formattedTime += "." + ("0" + mils).slice(-2);

            var elLocalTime = document.getElementById("local_time");
            elLocalTime.innerHTML = "utc " + formattedTime;

        }, 42); // 41.67ms is 24 fps
    };
    setTimeout(injectGreasemonkeyScript, 1000);
});