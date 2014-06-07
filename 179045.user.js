// ==UserScript==
// @name           tinyClock
// @namespace      http://random.random.random
// @description    Dimply overlays a clock in the corner of every webpage. Modified and simplified version, credits to Janp
// @include        *
// @version 1.5
// ==/UserScript==


/*
THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR 
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


// ---------------------------------------------------------------------
// options
// ---------------------------------------------------------------------

// menu
makeMenuToggle("simpleClock", false, "Show clock without border in color style of web page", "show clock with border and white background", "showClock");
makeMenuToggle("runningClock", true, "Running Clock", "Non Running Clock (Time of Pageload)", "showClock");
makeMenuToggle("showSeconds", false, "Show Seconds", "Hide Seconds", "showClock");
makeMenuToggle("rightleft", true, "Clock on the Right Side", "Clock on the Left Side", "showClock");
makeMenuToggle("bottomtop", true, "Clock at Bottom of Page", "Clock at Top of Page", "showClock");
makeMenuToggle("displayhide", true, "Show Clock on all Pages", "Hide Clock on all Pages", "showClock");
makeMenuToggle("updateCheck", false, "Check for Updates automatically", "Don't check for Updates automatically", "showClock");

if (rightleft) horizontal = "left";  
else horizontal = "right";  
if (bottomtop) vertical = "bottom";  
else vertical = "top";  
if (displayhide) displayClock = "block";  
else displayClock = "none";  


// set update interval (in seconds)
if (showSeconds) var updateInterval = 0.1;
else var updateInterval = 10;



// ---------------------------------------------------------------------
// GM functions
// ---------------------------------------------------------------------

// menu
// ---------------------------------------------------------------------
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}



// ---------------------------------------------------------------------
// functions
// ---------------------------------------------------------------------

// show initial clock and prepare date
// ---------------------------------------------------------------------
function showClock() {
  var jetzt = new Date(); 
  
  // time
  var zeit = jetzt.getHours() +':';  
  if (jetzt.getMinutes() < 10) 
    zeit = zeit + '0';  
  zeit = zeit + jetzt.getMinutes(); 
  if (showSeconds) {
    zeit=zeit+':'
    if (jetzt.getSeconds() < 10)
      zeit = zeit + '0';  
    zeit=zeit+jetzt.getSeconds();
  }
  if (document.getElementById("clockDiv")) document.getElementById("clockDiv").innerHTML = zeit; 
  
  
}


// create elements
// ---------------------------------------------------------------------
function createElements() {
  if (simpleClock) {
    clockStyle = "position: fixed; "+horizontal+": 0px; "+vertical+": 0px; font-family:arial; font-size: 15px; z-index:1000; width:auto; padding-left:2px; padding-right:2px; ";
  } 
  else {
    clockStyle = "position: fixed; "+horizontal+": 0px; "+vertical+": 0px; font-family:arial; font-size: 15px; z-index:1000; background-color:white; color:black; border: 1px solid silver; width:auto; padding-left:2px; padding-right:2px; ";
  }
  


  // create clock element
  var clock = document.createElement('div');
  clock.id = "clockDiv";
  clock.style.cssText = clockStyle;
  if (document.getElementsByTagName('body')[0]) document.getElementsByTagName('body')[0].appendChild(clock);

}




// update clock
// ---------------------------------------------------------------------
function updateClockDiv() {
  var updateClock = window.setInterval(
  function(){
    var jetzt = new Date(); 
   // time
   var zeit = jetzt.getHours() +':';  
    if (jetzt.getMinutes() < 10) 
      zeit = zeit + '0';  
    zeit = zeit + jetzt.getMinutes(); 
    if (showSeconds) {
      zeit=zeit+':'
      if (jetzt.getSeconds() < 10)
        zeit = zeit + '0';  
      zeit=zeit+jetzt.getSeconds();
    }
    document.getElementById("clockDiv").innerHTML = zeit; 
  
    
  }, updateInterval*1000);
}


// ---------------------------------------------------------------------
// script
// ---------------------------------------------------------------------

 
// anti-frame / thanks to jerone
if(top.location != location){ 
    return
};


createElements();
showClock();

// update clock in given interval if desired
if (runningClock) {
  updateClockDiv();
}