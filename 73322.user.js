// ==UserScript==
// @name           Freeleech Countdown
// @namespace      what.cd
// @description    Countdown the remaining freeleech time
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

//Countdown modified from http://scripts.franciscocharrua.com/countdown-clock.php
function countdown_clock(year, month, day, hour, minute, format)
         {
         var clockDiv = document.createElement("div");
         clockDiv.id = "countdown";
         clockDiv.setAttribute("style", "padding-bottom:10px;");
         document.getElementById("content").insertBefore(clockDiv, document.getElementById("content").firstChild);
         
         var clockH = document.createElement("h2");
         clockH.setAttribute("style", "text-align:center;");
         clockH.id = "clockH";
         document.getElementById("countdown").appendChild(clockH);
         
         countdown(year, month, day, hour, minute, format);                
         }
         
countdown = function(year, month, day, hour, minute, format)
         {
         Today = new Date();
         Todays_Year = Today.getUTCFullYear();
         Todays_Month = Today.getUTCMonth();                  
         
         //Convert both today's date and the target date into miliseconds.                           
         Todays_Date = Date.UTC(Todays_Year, Todays_Month, Today.getUTCDate(), 
                                 Today.getUTCHours(), Today.getUTCMinutes(), Today.getUTCSeconds());                                 
         Target_Date = Date.UTC(year, month - 1, day, hour, minute, 00);                  
         
         //Find their difference, and convert that into seconds.                  
         Time_Left = Math.round((Target_Date - Todays_Date) / 1000);
         
         if(Time_Left < 0)
            Time_Left = 0;
         
         var clockH = document.getElementById("clockH");
         switch(format)
               {
               case 0:
                    //The simplest way to display the time left.
                    clockH.innerHTML = Time_Left + ' seconds';
                    break;
               case 1:
                    //More datailed.
                    days = Math.floor(Time_Left / (60 * 60 * 24));
                    Time_Left %= (60 * 60 * 24);
                    hours = Math.floor(Time_Left / (60 * 60));
                    Time_Left %= (60 * 60);
                    minutes = Math.floor(Time_Left / 60);
                    Time_Left %= 60;
                    seconds = Time_Left;
                    
                    dps = 's'; hps = 's'; mps = 's'; sps = 's';
                    //ps is short for plural suffix.
                    if(days == 1) dps ='';
                    if(hours == 1) hps ='';
                    if(minutes == 1) mps ='';
                    if(seconds == 1) sps ='';
                    
                    clockH.innerHTML = days + ' day' + dps + ', ';
                    clockH.innerHTML += hours + ' hour' + hps + ', ';
                    clockH.innerHTML += minutes + ' minute' + mps + ', and ';
                    clockH.innerHTML += seconds + ' second' + sps;
                    break;
               default: 
                    clockH.innerHTML = Time_Left + ' seconds';
               }
        	 clockH.innerHTML += " left of freeleech!"
               
         //Recursive call, keeps the clock ticking.
         setTimeout(countdown, 1000, year, month, day, hour, minute, format);
         }

countdown_clock(2010, 4, 6, 23, 59, 1);