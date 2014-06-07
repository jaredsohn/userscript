// ==UserScript==
// @name          IMDB Countdown Ticker
// @namespace     http://blog.dasickis.com
// @include       http://*.imdb.com/title/*
// @description   Add a countdown clock for any movie on IMDB only if it's after today's date
// ==/UserScript==
// Last Modified: April 23, 2007
// Credit to countingdown.com for the original SWF

//---------EDIT BELOW CONSTANT---------//
SWFlink="http://images.countingdown.com/images/clock.swf";
/*Hate using the bandwidth of original location.
  Uncomment only if you can't use otherwise*/
//SWFlink="http://localhost/gm/clock.swf"; //It wouldn't read from my local folder (using Ubuntu 7.04)

//---------DON'T EDIT BELOW THIS---------//
//Main function to add the countdown clock
function countDown(){

  movieElement = document.evaluate("//div[@class='info']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2);

  if(movieElement){
    //Extract date from the movieElement
    movieDate=String(movieElement.innerHTML.match('[0-9][0-9]? [a-zA-Z]+ [0-9]{4}')).split(' ');
    //Create an element to compare the current Date with
    movieDateComp=new Date(movieDate[2],convMonth(movieDate[1]),movieDate[0]);
    //Find out the user's current date
    myDate=new Date();
    //Only for new movies show the count down
    if(myDate<movieDateComp){
      //Create the now field for the swf
      now=String(myDate.getFullYear()+addZero(myDate.getMonth()+1)+addZero(myDate.getDate())+addZero(myDate.getHours())+addZero(myDate.getMinutes())+addZero(myDate.getSeconds()));
      //Create the end field for the swf
      end=String(movieDate[2]+addZero(convMonth(movieDate[1])+1)+addZero(movieDate[0])+"000000");
      
      SWFlink+="?now="+now+"&end="+end+"&event=%20OPENING%20DAY";
      
      //Create a table element to hold the SWF
      countdownElem=document.createElement("table");
      countdownElem.setAttribute('border','0');
      countdownElem.setAttribute('cellspacing','0');
      countdownElem.setAttribute('cellpadding','0');
      countdownElem.setAttribute('width','185');
      countdownElem.setAttribute('id','countDown');
      countdownElem.innerHTML='<tr><td height="55" width="185" bgcolor="#000000"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,2,0" width="185" height="55" id=clock.swf><param name=movie value='+SWFlink+'&stat=3><param name=quality value=high><param name=bgcolor value=#000000><embed src='+SWFlink+' quality="high" bgcolor=#000000 name="clock.swf" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="185" height="55" swliveconnect="true"></object>  </td></tr>';
      
      //Finally add the countdown to the div with 'Release Date:'
      movieElement.appendChild(countdownElem);
    }
  }
}

/*Begin Auxillary (helper) functions*/
  //Convert the month name to month number [0-11]
  function convMonth(m){
    months = new Array("January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December");
  
    for(x=0; x<months.length; x++)
      if(months[x]==m)
        return x;
  }
  
  //Add a zero preceding single digits so the swf works well
  function addZero(num){
    return (num<=9)? "0"+num : num;
  }
/*End Auxillary (helper) functions*/

//Load with the body
document.body.onLoad=countDown();