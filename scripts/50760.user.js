// ==UserScript==
// @name           Your TV Toppy Helper
// @namespace      YourTVToppyHelper
// @description    for use with YourTV TV Guide, Topfield PVRs and ToppyWeb. Adds a link to create timers on your toppy
// @include        http://www.yourtv.com.au/guide/index.cfm?action=info&event_id*
// @include        http://yourtv.com.au/guide/index.cfm?action=info&event_id*
// ==/UserScript==
/*

The below 2 URLs are ones to include. They are possible URLs that the Program details appear under in the
popup that appears when you click a program link in the guide

http://yourtv.com.au/guide/index.cfm?action=info&event_id*
http://www.yourtv.com.au/guide/index.cfm?action=info&event_id*

Looks like I might have once had this as a Url to include. But I am not sure.
http://www.yourtv.com.au/guide/index.cfm?action=session_info*
  your_tv_toppy_helper.user.js
The "Your TV Toppy Helper" is a GreaseMonkey script (https://addons.mozilla.org/en-US/firefox/addon/748)
Using the "Your TV Toppy Helper" with GreaseMonkey and Firefox you can have the Your TV Web TV guide
( http://www.yourtv.com.au/)
display a "Create Toppy Timer" Button on the Program Details page. Clicking this button launches
ToppyWeb to create a timer to record the selected program on your Topfield PVR (if you have your
Topfield PVR connected to a network using ToppyWeb

This file needs ToppyWeb by John Stevens  http://www.qmtech.com/topfield/
as modified by TTguy.
  [http://www.aunix.net.au/ttguy/YourTVToppyHelper.htm]

*/
   //               You need to modify this
   //                  to point to the IP address of your Toppy Web Install
      //                   vvvvvvvvvvvvvvvvvvvv
//var ToppyWebAddress = "http://192.168.5.4/";
var ToppyWebAddress = "http://127.0.0.1/";
//                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                 On a home network this IP address may differ from machine to machine.
   //               eg If I browse from the same machine as the Toppy Web server then this is http://127.0.0.1/
   //                If I browse from a PC inside my home network it is the local IP address for the Toppy Web server
   //                If I browse from a PC on the internet this is the IP address assigned to your PC by your ISP
   //                (as reported back from http://tools.whois.net/yourip/ when accessed from your local PC)


var TimerCreationURL = "yourTV.php";

function getStartTime(timesAndChan )
{
    var posDash;
    posDash=   timesAndChan.indexOf(String.fromCharCode(32));

    return (timesAndChan.substr(0,posDash));

}

  function getDuration (table)
  {
    var result,tblText,iPosDur, iPosMins;

       tblText=table.textContent;
       iPosDur= tblText.indexOf("Duration:");
       iPosMins  = tblText.indexOf("mins",iPosDur + 9);
       result=  tblText.substr( iPosDur+9, iPosMins -( iPosDur + 9) );
       return result;
  }

  function trim(str)
  {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
//return ( str.replace(/^\s+|\s+$/g, ''))
  }


/*****************************************************

        Main

*******************************************************/



  var spans, Divs ,pgrp,strongs , tables, DivForNewLink, ToppyForm , DivNumberForNewLink, DivNumberOfProgDate;
  var div25;
  var i;
  var progTitle, progDate, Channel, Times, StartTime, Duration;

    spans= document.getElementsByTagName("span")     ;
    progTitle =  spans[0].textContent   ;
    Channel =    spans[1].textContent   ;
  /*
  for ( i=0; i < spans.length; i++) {
    spans[i].innerHTML +=  " span #" + i  ;
   }
   */
   tables= document.getElementsByTagName("table")     ;
    Duration = getDuration(tables[4]);
   /*
    for ( i=0; i < tables.length; i++) {
   tables[i].innerHTML +=  "<tr> <td> table  num" + i + "</tr><td>"  ;

   }
   */
  Divs= document.getElementsByTagName("div")     ;
  div25=    Divs[25].textContent  ;
  if (div25=="") // Prog has no subtitle. May or may not have a description
  {
    DivNumberOfProgDate=27;
    progDate= Divs[DivNumberOfProgDate].textContent  ;
    Times = Divs[26].textContent  ;



    if ((trim(Divs[28].textContent)).charCodeAt(0)==60)// does not have a description
                                                       // why Char 60? I dunno. Found out by experiment.
    {
      DivNumberForNewLink=DivNumberOfProgDate;  // put the Create toppy timer button under the Program Date
      DivForNewLink= Divs[DivNumberForNewLink];
    }
    else  // does have a description
    {
      DivNumberForNewLink=28;        // put the Create toppy timer button under the Description
      DivForNewLink= Divs[DivNumberForNewLink];
    }

  }
  else // prog has subtitle.
  //Not yet sure how this behaves with a program that has a subtitle but no description
  // Tested for programs that have a subtitle and a description
  {
    progTitle = progTitle + " - " +  div25;
    DivNumberOfProgDate=28;
    progDate= Divs[DivNumberOfProgDate].textContent  ;
     Times = Divs[27].textContent  ;
     DivNumberForNewLink=29;
     DivForNewLink= Divs[DivNumberForNewLink];

  }
   DivForNewLinkText= DivForNewLink.textContent

// global replace of single quote with %27
  progTitle=progTitle.replace( /'/g, "%27");
  StartTime= getStartTime(Times );


  // for ( i=0; i < Divs.length; i++) {
 //  Divs[i].innerHTML +=  " div #" + i  ;
 //  }









 ToppyForm = "     <form action='" + ToppyWebAddress + TimerCreationURL + "' method='post'>\n";
 ToppyForm += "<input type='hidden' name='name' value='" + progTitle + "' /></p>\n";
 ToppyForm += "<input type='hidden' name='Duration' value ='" + Duration + "' /></p> \n";
 ToppyForm += "<input type='hidden' name='Channel' value ='" + Channel +  "' /></p> \n";
 ToppyForm += "<input type='hidden' name='StartTime' value ='" + progDate + " " + StartTime +  "' /></p>\n";

 ToppyForm += "<input value='Create Toppy Timer' name='CreateTimer' type='submit' /></p></form> \n";


 DivForNewLink.innerHTML += ToppyForm;

  // un comment this to write some debuging info into the page
 //Divs[58].innerHTML +="<br>" + "Title: " +   progTitle + "<br>" + "DivNumberOfProgDate: " +  DivNumberOfProgDate + "<br>" + "Date:" + progDate +  "<br>" + "Channel: " + Channel + "<br> Start Time: " +  StartTime + "<br> Duration: "  + Duration + "<br> div25: " + div25 + "<br> DivNumberForNewLink: "  + DivNumberForNewLink + "<br> DivForNewLinkText:" +  DivForNewLinkText + "<br>Divs[28].textContent:" + (trim(Divs[28].textContent)).charCodeAt(0) +"|" ;