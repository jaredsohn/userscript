// ==UserScript==
// @name           HDBits FreeLeech Countdown
// @description    Countdown till the end of current FreeLeech
// @include        https://hdbits.org*
// @include        http://hdbits.org*
// ==/UserScript==

/**************************************\
*                                    *
*    CONFIGURE start & end times     *
*                                    *
\**************************************/


fl_start = 'Aug 03 2007 00:00:00 GMT';
fl_end   = 'Aug 06 2007 00:00:00 GMT';


/**************************************\
*                                    *
*  CAN'T TOUCH THIS! (HAMMER TIME!)  *
*                                    *
\**************************************/

// find Table
donateTD = null;
imgs = document.getElementsByTagName('img');
for(j = 0; j < imgs.length; j++){
   if(imgs[j].alt == 'Make a donation'){
       donateTD = imgs[j].parentNode.parentNode;
       break;
   }
}

// create & insert
cdTD = document.createElement('td');
cdTD.className = 'embedded';
//cdTD.style.border = '1px solid black';
cdTD.style.textAlign = 'center';
cdTD.style.padding = '0';
cdTD.style.margin = '0';

cdTD.innerHTML = "<span style='border:1px solid black;padding:2px 6px'>"
   + "<b style='color:black'>FREELEECH: </b> <span style='color:#000099'"
   + " id='flcd'>you should see some time here :p</span></span>";

donateTD.parentNode.appendChild(cdTD);
cdSPAN = document.getElementById('flcd');


// calculate & display
timestampStart = Date.parse(fl_start);
timestampEnd = Date.parse(fl_end);


continuousDisplay();


// functions
function continuousDisplay(){
   
   cdSPAN.innerHTML = calcTimeOffset();
   setTimeout(continuousDisplay,1000);
}

function calcTimeOffset(){ // returns string

   timestampNow = new Date().getTime();
   
   if(timestampNow < timestampStart){
       diff = timestampStart - timestampNow;
       return "<font color='grey'><b>starts in:</b> "
                  + getPrettyString(diff) + "</font>";
   } else if(timestampNow > timestampEnd){
       return "<font color='grey'>freeleech is over :/</font>";
   }else {
       diff = timestampEnd - timestampNow;
       return getPrettyString(diff) + " left";    
   }    
}

function getPrettyString(millis){
   seconds = millis/1000;
   minutes = seconds/60;
   hours = minutes/60;
   days = hours/24;

   s = Math.floor(seconds) % 60;
   m = Math.floor(minutes) % 60;
   h = Math.floor(hours) % 24;
   d = Math.floor(days);
   
   result = "";    
   if(d > 0){    // if less than a day is left, don't display '0 days'
       result = d + " day" + getS(d) + ", ";
   }                
   result += h + " hour" + getS(h) + ", " + m + " minute"
               + getS(m) + ", " + twoDigits(s) + " second" + getS(s);
   return result;
}

function getS(number){
   return ((number==1)?'':'s');
}

function twoDigits(number){
   return (number>9)?number:'0'+number;
}