// ==UserScript==
// @name           showClock
// @namespace      http://www.greasemonkey.smilinginthesun.de/showClock/V51
// @description    Shows a clock in a corner of every webpage.
// @include        *
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

// version and URL
var VersionUrl = "http://www.greasemonkey.smilinginthesun.de/showClock.xml"
var thisVersion = 5.2

// menu
makeMenuToggle("simpleClock", false, "Show clock without border in color style of web page", "show clock with border and white background", "showClock");
makeMenuToggle("runningClock", true, "Running Clock", "Non Running Clock (Time of Pageload)", "showClock");
makeMenuToggle("showSeconds", false, "Show Seconds", "Hide Seconds", "showClock");
makeMenuToggle("rightleft", true, "Clock on the Right Side", "Clock on the Left Side", "showClock");
makeMenuToggle("bottomtop", true, "Clock at Bottom of Page", "Clock at Top of Page", "showClock");
makeMenuToggle("displayhide", true, "Show Clock on all Pages", "Hide Clock on all Pages", "showClock");
makeMenuToggle("updateCheck", false, "Check for Updates automatically", "Don't check for Updates automatically", "showClock");

if (rightleft) horizontal = "right";  
else horizontal = "left";  
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
  
  // date
  var weekdays = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa");
  var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez");
  var datum = "(" + weekdays[jetzt.getDay()] + ") " + months[jetzt.getMonth()] + " " + jetzt.getDate() +  ", " + jetzt.getFullYear(); + "."
  if (document.getElementById("dateDiv")) document.getElementById("dateDiv").innerHTML = datum; 
}


// create elements
// ---------------------------------------------------------------------
function createElements() {
  if (simpleClock) {
    clockStyle = "position: fixed; "+horizontal+": 0px; "+vertical+": 0px; font-family:arial; font-size: 10px; z-index:1000; width:auto; padding-left:2px; padding-right:2px; ";
    dateStyle = "position: fixed; "+horizontal+": 10px; "+vertical+": 20px; font-family:arial; font-size: 10px; z-index:1001; width:auto; padding-left:2px; padding-right:2px; display: none; ";
  } 
  else {
    clockStyle = "position: fixed; "+horizontal+": 0px; "+vertical+": 0px; font-family:arial; font-size: 10px; z-index:1000; background-color:white; color:black; border: 1px solid silver; width:auto; padding-left:2px; padding-right:2px; ";
    dateStyle = "position: fixed; "+horizontal+": 10px; "+vertical+": 20px; font-family:arial; font-size: 10px; z-index:1001; background-color:yellow; color:black; border: 1px solid silver; width:auto; padding-left:2px; padding-right:2px; display: none; ";
  }
  


  // create clock element
  var clock = document.createElement('div');
  clock.id = "clockDiv";
  clock.style.cssText = clockStyle;
  if (document.getElementsByTagName('body')[0]) document.getElementsByTagName('body')[0].appendChild(clock);

  // create date element
  var dateEl = document.createElement('div');
  dateEl.id = "dateDiv";
  dateEl.style.cssText = dateStyle;
  if (document.getElementsByTagName('body')[0]) document.getElementsByTagName('body')[0].appendChild(dateEl);

  // hide on click (other ways, but I liked to try this)
  var wegmachen = document.createAttribute("onClick");
  wegmachen.nodeValue = "document.getElementById('clockDiv').style.display = 'none';";
  if (document.getElementsByTagName('body')[0]) document.getElementById("clockDiv").setAttributeNode(wegmachen);

  // show date
  var showDate = document.createAttribute("onMouseOver");
  showDate.nodeValue = "document.getElementById('dateDiv').style.display = 'block'; ";
  if (document.getElementsByTagName('body')[0]) document.getElementById("clockDiv").setAttributeNode(showDate);

  // hide date
  var hideDate = document.createAttribute("onMouseOut");
  hideDate.nodeValue = "document.getElementById('dateDiv').style.display = 'none';";
  if (document.getElementsByTagName('body')[0]) document.getElementById("clockDiv").setAttributeNode(hideDate);

  // add style for printing (just another way)
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = "@media print {div#clockDiv {display:none;}} @media screen {div#clockDiv {display:"+displayClock+";}}";
  head.appendChild(style);
}


// ckeck for updates
// ---------------------------------------------------------------------
function checkForUpdates() {
  // check just once a day for a new version
  d = new Date();
  today = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + thisVersion;
  if (GM_getValue("lastUpdateCheck") != today) {

    // new version available?
    function get(url, cb) {
      GM_xmlhttpRequest({
        method: "GET",
         url: url,
         onload: function(xhr) { cb(xhr.responseText); }
      });
    }

    function inform(newVersion) {
      if (newVersion > thisVersion) {
        goToUpdate = confirm("Version " + newVersion + "of the Greasemonkey script \"showClock\" is availabe. You have Version " + thisVersion +" installed.\nDo you want to visit http://userscripts.org/scripts/show/11939 to install the new Version?\n(You can disable this message under \"Tools > Greasemonkey > User Script Commands\")");
        if (goToUpdate) window.open("http://userscripts.org/scripts/show/11939", "userscripts");
      }
    }
       
    get(VersionUrl, inform);

    GM_setValue("lastUpdateCheck", today);
  }
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
  
    // date
    var weekdays = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa");
    var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez");
    var datum = "(" + weekdays[jetzt.getDay()] + ") " + months[jetzt.getMonth()] + " " + jetzt.getDate() +  ", " + jetzt.getFullYear(); + "."
    document.getElementById("dateDiv").innerHTML = datum; 
  
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

if (updateCheck) {
  checkForUpdates();
}

// update clock in given interval if desired
if (runningClock) {
  updateClockDiv();
}