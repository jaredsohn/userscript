// ==UserScript==
// @name           Better HTML5 YouTube
// @description    More keyboard controls for the HTML5 YouTube player (like seeking and changing video speed) and other fixes/additions to the player.
// @author         DaVince <VincentBeers@gmail.com>
// @namespace      http://davince.tengudev.com/
// @include        http://youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch#*
// @include        http://*.youtube.com/watch#*
// @include        http://*.youtube.com/embed/*
// @include        http://youtube.com/embed/*
// @version        2011-07-28
// ==/UserScript==


/************************
  Customizable variables
*************************/
//Please use the settings panel to alter these.
var timestep = parseFloat(GM_getValue("timestep", 3));
var bigtimestep = parseFloat(GM_getValue("bigtimestep", 15));
var speed_throttle = parseFloat(GM_getValue("speed_throttle", 0.2));
var autopause = GM_getValue("autopause", 1);
var enable_overlay = GM_getValue("enable_overlay", 1);
var autofullscreen = GM_getValue("autofullscreen", 0);


/************************
  Important global variables
*************************/
var isfirefox = navigator.userAgent.indexOf("Firefox")!=-1;
var isfullscreen = false;
var video = undefined;
var overlay = undefined;
var configpanel = undefined;
window.addEventListener('load', Main, false);


function Main() {
  video = document.getElementsByTagName('video')[0];
  if (video) {
    if (autopause == 1) { video.pause(); video.currentTime = 0; }
    video.playbackRate = 1;  //Fix for Firefox
    
    var playerelement = document.getElementById("watch-player");
    document.getElementById("video-player").focus();
    FixTimeLinks();
    
    /** Special thanks to Snehonja for the following! **/
    if (isfirefox)
    {
      document.addEventListener("keydown", KeyInput, false);
      var inputs = document.getElementsByTagName("input");
      for (i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keydown", function(e){
          e.stopPropagation();
        }, false);
      }

      var textareas = document.getElementsByTagName("textarea");
      for (i = 0; i < textareas.length; i++) {
        textareas[i].addEventListener("keydown", function(e){
          e.stopPropagation();
        }, false);
      }
    }
    else {
      playerelement.addEventListener("keydown", KeyInput, false);
    }
    
    overlay = new Overlay();
    if (autofullscreen == 1) { ToggleFullscreen(); overlay.hide(); }
    configpanel = new ConfigPanel();
    video.addEventListener("ended", function() { overlay.showSuggestions(); }, false);
  }
}


/** Fix the times in comments to work with the HTML5 player **/
function FixTimeLinks() {
  if (isfirefox) return;  //TODO: fix for FF somehow
  var comment_elements = document.getElementsByClassName("comment-text");
  var timevalue;
  
  //Get the time comments and bind new video navigation code to them.
  for (var i = 0; i < comment_elements.length; i++) {
    linknode = comment_elements[i].firstChild.nextSibling.firstChild;
    if (linknode.nodeName == "A" && linknode.innerHTML[0] != "@") {  //Filter out non-link comments and links that are @username.
      linknode.setAttribute("data-timevalue", linknode.innerHTML);
      
      linknode.onclick = function() {  //click event should be replaced in this case
        timevalue = this.getAttribute("data-timevalue").split(":");
        video.currentTime = Number(timevalue[0])*60+Number(timevalue[1]);
        overlay.show("Time: " + GetTime(video.currentTime) + " / " + GetTime(video.duration));
      }
    }
  }
  
  FixPageLinks();
}


/** Adds event listeners to comment page links so FixTimeLinks is run when they are clicked. **/
function FixPageLinks() {
  //Next and prev button will launch FixTimeLinks 1500ms after being clicked so everything gets linked properly.
  //TODO: ensure load instead of giving it 1500ms to load the comments?
  var nextprevlinks = document.getElementsByClassName("yt-uix-pager-link");
  for (var i = 0; i < nextprevlinks.length; i++) {
    nextprevlinks[i].addEventListener("click", function() { setTimeout(function() { FixTimeLinks(); }, 1500); }, false);
  }
  
  //Do the same for the 1...10 page buttons.
  var pagenavlinks = document.getElementsByClassName("yt-uix-pager")[0];
  if (pagenavlinks) {
    pagenavlinks = pagenavlinks.childNodes;
    for (var i = 0; i < pagenavlinks.length; i++) {
      if (pagenavlinks[i].nodeName == "BUTTON") {
        pagenavlinks[i].addEventListener("click", function() { setTimeout(function() { FixTimeLinks(); }, 1500); }, false);
      }
    }
  }
}


/** Get key input **/
function KeyInput(e) {
  //alert(e.keyCode);  //Uncomment to find out keypresses
  var shift = e.shiftKey;
  var ctrl = e.ctrlKey;

  switch (e.keyCode) {
    case 32:  //Space bar
      var button;
      var message;
      e.preventDefault();
      
      if (video.paused) {
        button = document.getElementsByClassName("html5-play-button")[0];
        message = 'Video play<br><span style="font-size: x-large;">Time: ' + GetTime(video.currentTime) + " / " + GetTime(video.duration);
      }
      else {
        button = document.getElementsByClassName("html5-pause-button")[0];
        message = "Pause";
      }
      button.click();
      overlay.show(message);
      break;
    
    //Left/right key navigation
    case 37: case 39:  //Key left and right
      var timedifference = e.keyCode-38;  //A second less or more
      video.currentTime += (shift ? bigtimestep : timestep) * timedifference;
      overlay.show("Time: " + GetTime(video.currentTime) + " / " + GetTime(video.duration));
    break;

    //Go out of fullscreen with the Esc key
    case 27: case 70:  //Key Esc and F
      if (!ctrl) ToggleFullscreen();
    break;

    //Change speed using + and - keys, reset speed with 0 and =
    case 107: case 221:  //+ on keypad and ]
      SetVideoSpeed(video.playbackRate+speed_throttle);
    break;

    case 109: case 189: case 219:  //- keys and [
      SetVideoSpeed(video.playbackRate-speed_throttle);
    break;

    case 187: case 220:  //key = and key \
      SetVideoSpeed(1);
    break;

    //Stop the video and return to beginning with . key (thanks, Orion751!)
      case 190: case 110: //Keys .
      video.pause();
      video.currentTime = 0;
      overlay.show("Video reset and paused");
    break;

    //Toggle Mute with m key (thanks, Orion751!)
    case 77:  //Key m
      video.muted^=true;
      //Update volume icon:
      document.getElementsByClassName('html5-icon')[3].src = document.getElementsByClassName('html5-icon')[3].src;
      if (video.muted) overlay.show("Audio: mute");
      else overlay.show("Audio: on");
    break;

    //Update Volume icon when using up and down keys (thanks, Orion751!)
    case 38: case 40: //Key up and down
    //Update volume icon:
      document.getElementsByClassName('html5-icon')[3].src = document.getElementsByClassName('html5-icon')[3].src;
      overlay.show("Volume: " + Math.round(video.volume*100) + "%");
    break;

    case 84:  //Key T
      overlay.show("Time: " + GetTime(video.currentTime) + " / " + GetTime(video.duration));
      break;

    /** IDEAS & TODOS
      * For F11: compare viewport and screen sizes and go fullscreen when they're close to equal?
      * Make a function for setting the video speed to lower code duplication
      * ---
      * Extra:
      * Have it work with embedded YouTube content.
      */
  }

  /* More types of key input go below the switch/case if they are a large group of keys. */

  //Set video position using the num keys
  if (e.keyCode >= 48 && e.keyCode <= 57) {
    var pos = e.keyCode - 48;
    video.currentTime = (video.duration/10)*pos;
    overlay.show("Time: " + GetTime(video.currentTime) + " / " + GetTime(video.duration));
  }
  else if (e.keyCode >= 96 && e.keyCode <= 105) {
    var pos = e.keyCode - 96;
    video.currentTime = (video.duration/10)*pos;
    overlay.show("Time: " + GetTime(video.currentTime) + " / " + GetTime(video.duration));
  }
}


/** Create and manage the video overlay. */
function Overlay() {
  this.element = document.createElement("div");
  this.element.setAttribute("class", "video-overlay");
  this.element.setAttribute("style", 'padding: 0 5px; float: left; display: none; position: \
                            relative; top: 10px; left: 20px; font-size: 30pt; color: white; background: rgba(0,0,0,0.5); z-index: 10000;');
  
  this.cur_timeout = 0;
  
  var playerelement = document.getElementById("video-player");
  playerelement.appendChild(this.element);
  
  this.show = function(what, indefinite) {
    if (enable_overlay == 0) return;
    clearTimeout(this.cur_timeout);
    this.element.innerHTML = what;
    this.element.style.display = "inline";
    if (!indefinite) this.cur_timeout = setTimeout(function() { overlay.hide() }, what.length*20+1000);
  }
  
  this.hide = function() {
    this.element.style.display = "none";
  }
  
  this.showSuggestions = function() {
    if (isfullscreen) ToggleFullscreen();
    overlay.show("Video stop");
    
    //TODO: to finish.
    /*
    var suggestionelement = document.createElement("div");
    suggestionelement.setAttribute("style", 'margin: 0; padding: 1.5%; position: relative; font-size: large; \
    color: white; width: 100%; height: 100%;');
    
    suggestionelement.innerHTML =
    '<span style="font-size: large;"> \
    <style type="text/css">.h5sp-suggestion-box { display: block; float: left; height: ' +
    '21%; width: 35%; margin: 0 1.5% 1.5% 0; background: rgba(140,0,0,0.85); clear: both; } \
    .h5sp-big-suggestion-box { }</style> \
    <div class="h5sp-suggestion-box">Testing!</div> \
    <div class="h5sp-suggestion-box">Testing 2!</div> \
    <div class="h5sp-suggestion-box">Testing 3!</div> \
    <div class="h5sp-suggestion-box">Testing 4!</div> \
    \
    </span>';
    
    playerelement.appendChild(suggestionelement);
    */
  }
}


/** Get video time as a neat string. **/
function GetTime(time) {
  var string = "";
  var hours = Math.floor(time/3600);
  var minutes = Math.floor(time/60);
  var seconds = Math.floor(time%60);
  
  string += (hours) ? (hours+":") : "";  //Is hours not 0? Then display it. Otherwise don't bother.
  string += (minutes<10) ? "0"+minutes : minutes;  //Are minutes a single digit? Prepend a 0.
  string += ":";
  string += (seconds<10) ? "0"+seconds : seconds;
  return string;
}


function ConfigPanel() {
  //Create and place the button.
  var button = document.createElement("button");
  button.setAttribute("title", "Better HTML5 YouTube settings");
  button.setAttribute("type", "button");
  button.setAttribute("class", "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip");
  button.setAttribute("role", "button");
  button.setAttribute("aria-pressed", "false");
  button.innerHTML = '<span class="yt-uix-button-content">HTML5 settings</span>';
  button.onclick = ";return false;";
  button.addEventListener("click", function() { (configpanel.element.style.display == "none") ? configpanel.show() : configpanel.hide(); }, false);
  document.getElementById("watch-actions").appendChild(button);
  
  //Create the config element.
  this.element = document.createElement("div");
  this.element.id = "html5-settings-panel";
  this.element.style.display = "none";
  this.element.innerHTML =
    '<style type="text/css">#html5-settings-panel td, #html5-settings-panel h3 { padding: 0 5px; }</style>'+
    '<h3><strong>Better HTML5 YouTube settings panel</strong></h3><form><table><tbody>'+
    '<tr><td>Action</td><td>Key</td><td>Setting</td></tr>'+
    
    '<tr style="display: none;"><td>Small time step</td><td>Left / right</td>'+
    '<td><input id="h5sp-timestep" type="text" style="width: 30px;" value="'+timestep+'"> seconds</td></tr>'+
    
    '<tr style="display: none;"><td>Big time step</td><td>Shift + left / right</td>'+
    '<td><input id="h5sp-bigtimestep" type="text" style="width: 30px;" value="'+bigtimestep+'"> seconds</td></tr>'+
    
    '<tr><td>Speed up/down throttle</td><td>[ or -; ] or +; = or \\</td>'+
    '<td><input id="h5sp-speed" type="text" style="width: 30px;" value="'+speed_throttle+'"> times</td></tr>'+
    
    '<tr><td>Pause on page load</td><td>N/A</td>'+
    '<td><select id="h5sp-autopause"><option value="true">True</option><option value="false">False</option></select></td></tr>'+
    
    '<tr><td>Enable video overlay</td><td>N/A</td>'+
    '<td><select id="h5sp-overlay"><option value="true">True</option><option value="false">False</option></select></td></tr>'+
    
    '<tr><td>Toggle autofullscreen</td><td>F or Esc = fullscreen</td>'+
    '<td><select id="h5sp-autofullscreen"><option value="true">True</option><option value="false">False</option></select></td></tr>'+
    
    '</tbody></table><button id="h5sp-save" class="yt-uix-button" value="save">Save settings</button>'+
    '<button id="h5sp-cancel" class="yt-uix-button" value="cancel">Close without saving</button>'+
    '</form>';
  
  document.getElementById("watch-actions").appendChild(this.element);
  document.getElementById("h5sp-save").addEventListener("click",
    function(e) { e.preventDefault(); configpanel.save(); configpanel.hide(); }, false);
  document.getElementById("h5sp-cancel").addEventListener("click", function(e) { e.preventDefault(); configpanel.hide(); }, false);
  
  //Values are flipped around because option 0 is true and option 1 is false.
  document.getElementById("h5sp-autopause").selectedIndex = (autopause == 1) ? 0 : 1;
  document.getElementById("h5sp-overlay").selectedIndex = (enable_overlay == 1) ? 0 : 1;
  document.getElementById("h5sp-autofullscreen").selectedIndex = (autofullscreen == 1) ? 0 : 1;
  
  this.show = function() {
    this.element.style.display = "block";
  }
  
  this.hide = function() {
    this.element.style.display = "none";
  }
  
  /** Save the settings. **/
  this.save = function() {
    //Load values from the settings panel into the regular variables.
    timestep = parseFloat(document.getElementById("h5sp-timestep").value);
    bigtimestep = parseFloat(document.getElementById("h5sp-bigtimestep").value);
    speed_throttle = parseFloat(document.getElementById("h5sp-speed").value);
    autopause = (document.getElementById("h5sp-autopause").selectedIndex == 1) ? 0 : 1;  //Saved as int for GreaseMonkey compatibility
    enable_overlay = (document.getElementById("h5sp-overlay").selectedIndex == 1) ? 0 : 1;
    autofullscreen = (document.getElementById("h5sp-autofullscreen").selectedIndex == 1) ? 0 : 1;
    
    //TODO: check for validity in values (must be a number)
    //Store values persistently.
    GM_setValue("timestep", String(timestep));
    GM_setValue("bigtimestep", String(bigtimestep));
    GM_setValue("speed_throttle", String(speed_throttle));
    GM_setValue("autopause", autopause);
    GM_setValue("enable_overlay", enable_overlay);
    GM_setValue("autofullscreen", autofullscreen);
    
    overlay.show("Settings saved.");
  }
}

function SetVideoSpeed(speed) {
  var speedlabel = document.getElementsByClassName('html5-speed-button')[0].childNodes[1];
  video.playbackRate = speed;
  speedlabel.innerHTML = Math.round(video.playbackRate*100)/100 + "x Speed";
  if (video.playbackRate == 1) { speedlabel.innerHTML = "Normal"; overlay.show("Speed: Normal"); }
  else overlay.show("Speed: " + Math.round(video.playbackRate*100)/100);
}

function ToggleFullscreen() {
  isfullscreen = !isfullscreen;
  document.getElementsByClassName('html5-fullscreen-button')[0].click();
  overlay.show('<span style="font-size: x-large;">Toggling fullscreen</span>');
}