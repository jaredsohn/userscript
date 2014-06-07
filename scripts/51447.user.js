

// ==UserScript==
// @name           Super SpyMaster Bot
// @namespace      yeskiller
// @description    Simple bot that plays spymaster for you while you're away. Leave your 
// browser window open on the tasks screen, press run in the imacro and this will perform  // tasks for you. 
// @include        http://playspymaster.com/tasks
// @include        http://www.playspymaster.com/tasks
// @include        https://twitter.com/yeskiller
// ==/UserScript==

﻿var MyMacroCode;
          var delay;
          var task;
          
          // Not really sure why iMacros uses a var for this but it's in their examples so I'll use it too
          var jsNewLine="\n";
          
          // Random interval between tasks. (150s - 599s) Makes clicks this appear slightly more human.
          function getdelay() {
              return Math.round(449*Math.random())+1;
          }
          
          // Running the same task repeatedly greatly reduces returns so it's better to randomize tasks. (1-5)
          // If there are only 4 tasks at your experience level iMacros may throw an error but it'll keep running.
          function gettask() {
              Math.round(3*Math.random())+1;    
          }
          
          // !!! This code will hang the firefox process !!! 
          
          // There's no way to break a Javascript loop from within iMacros.
          // see http://forum.iopus.com/viewtopic.php?f=11&t=6830
          
          // Change this to a "for" loop if you don't want to have to kill the process.
          // for(i = 0; i < 30; i++){ 
          while (true) {
              task = gettask();
              delay = getdelay();
          
              MyMacroCode = "CODE:";
              MyMacroCode = MyMacroCode+"TAB T=1" + jsNewLine;
              MyMacroCode = MyMacroCode+"URL GOTO=http://playspymaster.com/tasks" + jsNewLine;
              MyMacroCode = MyMacroCode+"TAG POS=" + task + " TYPE=A ATTR=TXT:Perform<SP>Task" + jsNewLine;
          
             
             MyMacroCode = MyMacroCode+"WAIT SECONDS=" + delay + jsNewLine;
              
          
          
              iimPlay(MyMacroCode);
              
          }
//if you like, be part os my spy rings: http://twitter.com/yeskiller