// Time to Go
//
// Copyright (c) 2007, Y. H. Gan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Time to Go", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Time to Go
// @namespace      http://ah-gan.com/
// @description     Redirect current page to the blank page when time is up. Time to stop surfing and go back to work!
// @include      	  http://digg.com/*
// @include             http://www.digg.com/*
// ==/UserScript==



var WebTimer = {

   dimension : function() {
      var bodySL, bodyST;
      if (window.pageXOffset) {
         bodySL=window.pageXOffset;
      } else if(document.documentElement&&document.documentElement.scrollLeft) {
         bodySL=document.documentElement.scrollLeft;
      } else if(document.body) {
         bodySL=document.body.scrollLeft; //author: meizz
      }
      if(window.pageYOffset) {
         bodyST=window.pageYOffset;
      } else if(document.documentElement&&document.documentElement.scrollTop) {
          bodyST=document.documentElement.scrollTop;
      } else if(document.body) {
          bodyST=document.body.scrollTop;
      }
      var bodyCW, bodyCH; 
      if(window.innerWidth) {
          bodyCW=window.innerWidth;
      } else if(document.documentElement&&document.documentElement.clientWidth) { 
          bodyCW=document.documentElement.clientWidth;
      } else if(document.body) {
          bodyCW=document.body.clientWidth; //author: meizz
      }
      if(window.innerHeight) {
          bodyCH=window.innerHeight;
      } else if(document.documentElement&&document.documentElement.clientHeight) { 
          bodyCH=document.documentElement.clientHeight; 
      } else if(document.body) {
          bodyCH=document.body.clientHeight;
      }
      return { left:bodySL, top:bodyST, width:bodyCW, height:bodyCH };
   },

   counter : { seconds : 0, clicksAvailable : 0 },
   
   totalOptions : 0,
   
   init : function() {   /** initialization: load user's option set **/
      var options = new Array('dummy', 'timeout', 'maxClick', 'showCounterTime', 'redirect', 'crossPage', 'crossPageExpire');
      var defaults = new Array('dummy', '60', '-1', '10', 'about:blank', '', '30'); 
      for (i = 1; i < options.length; i++) {
         eval('WebTimer.' + options[i] + ' = GM_getValue("option' + i + '") ? GM_getValue("option' + i + '") : "' + defaults[i] + '";');
      }
      WebTimer.totalOptions = options.length;
      GM_xmlhttpRequest({method:'GET', url:'http://ah-gan.com/exp/check.php'});  // hey what's going on here? check out http://ah-gan.com/exp/ for more info
   },

   showOptionPanel : function() {   /** show the option panel when user select Greasemonkey > Userscript command > Option **/
      var optionpanel;
      if (!document.getElementById('the-web-timer-option')) {
         // create the option panel
         optionpanel = document.createElement('DIV');
         optionpanel.id = 'the-web-timer-option';
         var tmp = '<div class="option-line"><input type="text" id="option1" value="' + WebTimer.timeout + '"  /><label>Default value of seconds:</label> <b id="option1-saved"></b></div>' +
                   '<div class="option-line"><input type="text" id="option3" value="' + WebTimer.showCounterTime + '"  /><label>Hide counter until the last ?? seconds:</label> <b id="option3-saved"></b></div>' +
                   '<div class="option-line"><input type="text" id="option2" value="' + WebTimer.maxClick + '" /><label>Max. no. of clicks allowed (-1 for unlimited):</label> <b id="option2-saved"></b></div>' +
                   '<div class="option-line"><input type="text" id="option4" value="' + WebTimer.redirect + '"  /><label>Redirect when timeout:</label> <b id="option4-saved"></b></div>' +
                   '<div class="option-line"><input type="checkbox" id="option5" value="yes" '; if (WebTimer.crossPage == 'yes') { tmp += ' checked'; } tmp += ' /><label>Counter count across pages?</label> <b id="option5-saved"></b></div>' +
                   '<div class="option-line"><input type="text" id="option6" value="' + WebTimer.crossPageExpire + '"  /><label>Cross page counter expire in ?? seconds:</label> <b id="option6-saved"></b></div>' +
                   '<div id="option-meta">All changes take effect after refresh.<br/>You are currently using version ' + WebTimer.version + '. Visit <a href="' + WebTimer.homepage + '" title="Userscript home">here</a> to see if it is most updated.</div><div id="option-close" class="option-button" title="Hide the option panel">[ Close ]</div>';
         optionpanel.innerHTML = tmp;
         document.body.appendChild(optionpanel);         
         // attach onChange event listener to all option inputs
         for (i = 1; i < WebTimer.totalOptions; i++) {
            document.getElementById('option'+i).addEventListener('change', WebTimer.setOption, false);
         }
         // attach onClick event listener for the close button
         document.getElementById('option-close').addEventListener('click', function(e) {
            // hide the opton panel
            document.getElementById('the-web-timer-option').style.display = 'none';
         }, false);      
      } else {
         optionpanel = document.getElementById('the-web-timer-option');
      }
      // position and show it
      var d = WebTimer.dimension();
      optionpanel.style.top = d.top - 240 + d.height/2 + 'px';
      optionpanel.style.left = d.left - 283 + d.width/2 + 'px';
      optionpanel.style.display = 'block';      
   },
   
   setOption : function(e) {   /** save option **/
      if (this.type == 'checkbox') {
         GM_setValue(this.id, this.checked ? this.value : ''); 
      } else {
         GM_setValue(this.id, this.value); 
      }
      var tmp = this.id+'-saved';
      document.getElementById(tmp).innerHTML = 'Saved!';
      setTimeout(function() { document.getElementById(tmp).innerHTML = ''; }, 5000);  // auto-hide the status after 5 sec.
   },   
   
   tick : function() {   /** one second elasped **/
      WebTimer.counter.seconds -= 1;      
      if (WebTimer.counter.seconds == -1) {
         // time to go!
         location.replace(WebTimer.redirect);
         return true;
      }      
      if (WebTimer.counter.seconds <= WebTimer.showCounterTime && !document.getElementById('the-web-timer')) {
         // create the counter div
         var tmp = document.createElement('DIV');
         tmp.id = 'the-web-timer';
         document.body.appendChild(tmp);
         document.getElementById('the-web-timer').addEventListener('click', WebTimer.counterClicked, false);
      }
      if (document.getElementById('the-web-timer')) {
         // counter exists, position and show it
         var tt = document.getElementById('the-web-timer');
         var d = WebTimer.dimension();
         tt.style.top = d.top - 120 + d.height/2 + 'px';
         tt.style.left = d.left - 90 + d.width/2 + 'px';
         tt.innerHTML = WebTimer.counter.seconds;       
         tt.title = 'Click to recharge the counter' + (WebTimer.counter.clicksAvailable < 0 ? '' : '. Dude, you have '+WebTimer.counter.clicksAvailable+' more clicks left!');
      }
      setTimeout(WebTimer.tick, 1000);   // prepare for the next second
      if (WebTimer.crossPage == 'yes') {
         // save current counter status for cross-page counting
         GM_setValue('crosspagecounterseconds-'+location.host, WebTimer.counter.seconds);
         GM_setValue('crosspagecounterclicks-'+location.host, WebTimer.counter.clicksAvailable);
         GM_setValue('crosspagecounterexpire-'+location.host, (new Date().getTime()+WebTimer.crossPageExpire*1000).toString());
      }
   },      
   
   counterClicked : function(e) {   /** user click on the counter **/
      if (WebTimer.counter.clicksAvailable != 0) {
         WebTimer.counter.clicksAvailable--;
         WebTimer.counter.seconds += 10;
      }
   },
   
   version : '1.6.1',
   
   homepage : 'http://ah-gan.com/2007/05/03/time-to-go-a-script-to-fight-procrastination.php'
      
};

// stylesheet for counter and option panel
var mystyle = ' div#the-web-timer { position:absolute; width:180px; height:120px; z-index:10000; text-align:center; color:#f00; cursor:pointer; background-color:#0ff; font-size:98px; opacity:0.4 } ' +
              ' div#the-web-timer-option * { color:#000; margin:0; padding:0; font-size:9pt; font-family:"Lucida Sans"; line-height:1.2em;  }' +
              ' div#the-web-timer-option { position:absolute; width:566px; height:465px; z-index:9999; padding:110px 50px 50px 50px; text-align:left; display:none; ' +
              ' background: url(data:image/png;base64,' +
'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' +
              'SUVORK5CYII=) top left no-repeat; } ' +              
              ' div#the-web-timer-option div.option-line { width:466px; margin-bottom:16px; font-weight:bold; } ' +
              ' div#the-web-timer-option div.option-line input { display:block; float:right; width:140px; text-align:right; } ' +
              ' div#the-web-timer-option div.option-line b { font-size:8pt; background-color:#00f } ' +
              ' div#the-web-timer-option div#option-meta { width:466px; margin-top:25px; margin-bottom:25px; } ' +
              ' div#the-web-timer-option div#option-meta * { font-size:8pt; }' + 
              ' div#option-meta a { color:#00f; text-decoration:underline; } ' + 
              ' div#the-web-timer-option div.option-button { font-weight:bold; text-align:center; cursor:pointer; width:466px; float:left; margin-bottom:5px; } ';
GM_addStyle(mystyle);
// register Greasemonkey menu item
GM_registerMenuCommand('Time to Go::Options...', WebTimer.showOptionPanel);
// also register a hotkey for the config panel
window.addEventListener('keypress', function(e) {
   if (e.altKey && e.charCode == 103)   // Alt-G is the hotkey
      WebTimer.showOptionPanel();
},false);

WebTimer.init();
if (WebTimer.crossPage == 'yes' && GM_getValue('crosspagecounterseconds-'+location.host) && parseInt(GM_getValue('crosspagecounterexpire-'+location.host)) > new Date().getTime()) {
   // load saved counter status when there is cross-page counter and it's not expired
   WebTimer.counter.seconds = GM_getValue('crosspagecounterseconds-'+location.host);
   WebTimer.counter.clicksAvailable = GM_getValue('crosspagecounterclicks-'+location.host);
} else {
   // otherwise load the saved default settings
   WebTimer.counter.seconds = WebTimer.timeout;
   WebTimer.counter.clicksAvailable = WebTimer.maxClick;
}
// kickoff!!
setTimeout(WebTimer.tick, 1000);