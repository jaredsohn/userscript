// ==UserScript==
// @name           Your TV Nav Extender
// @namespace      YourTVNavExtender
// @description    adds extra links to move around dates on YourTV guide
// @include        http://www.yourtv.com.au/guide/index.cfm
// @include        http://yourtv.com.au/guide/index.cfm
// ==/UserScript==

  //http://yourtv.com.au/guide/index.cfm*
  // http://www.yourtv.com.au/guide/index.cfm*
 //your_tv_nav_extender.user.js
 // On the grid pages on Your TV there are tabs above the grid for navigation. This greasemonkey script adds
 // extra navigation items to allow jumps of greater than 24 hrs.
 // This script also adds a link back to ToppyWeb. 
 //  ToppyWeb is a program that can be used to program and operate a topfield PVR over a web interface.
 // By using your_tv_toppy_helper grease monkey script and the YourTV version of ToppyWeb
 // [http://www.aunix.net.au/ttguy/YourTVToppyHelper.htm] you can program 
 // Topfield timers using the YourTV web based TV guide.
 // This (YourTVNavExtender) script adds a link to the grid pages that bring you back to the ToppyWeb
 // For this to work configure TOPPYWEBURL below to the URL of your Toppy Web instalation and the page
 // on Toppy Web you would like to link to from the YourTV grid pages.
 // set    TOPPYWEBURL=""  to turn off the ToppyWeb link function
var TOPPYWEBURL= "http://127.0.0.1/timers.php";
//var TOPPYWEBURL= "";  //  Use this to turn off having a the ToppyWeb link display

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

  // ------------------------------------------------------------------
//http://mattkruse.com/javascript/date/source.html

// ===================================================================
// Author: Matt Kruse <matt@mattkruse.com>
// WWW: http://www.mattkruse.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download.
// If you wish to share this code with others, please just point them
// to the URL instead.
// Please DO NOT link directly to my .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================

// HISTORY
// ------------------------------------------------------------------
// May 17, 2003: Fixed bug in parseDate() for dates <1970
// March 11, 2003: Added parseDate() function
// March 11, 2003: Added "NNN" formatting option. Doesn't match up
//                 perfectly with SimpleDateFormat formats, but
//                 backwards-compatability was required.

// ------------------------------------------------------------------
// These functions use the same 'format' strings as the
// java.text.SimpleDateFormat class, with minor exceptions.
// The format string consists of the following abbreviations:
//
// Field        | Full Form          | Short Form
// -------------+--------------------+-----------------------
// Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
// Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)
//              | NNN (abbr.)        |
// Day of Month | dd (2 digits)      | d (1 or 2 digits)
// Day of Week  | EE (name)          | E (abbr)
// Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
// Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
// Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
// Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
// Minute       | mm (2 digits)      | m (1 or 2 digits)
// Second       | ss (2 digits)      | s (1 or 2 digits)
// AM/PM        | a                  |
//
// NOTE THE DIFFERENCE BETWEEN MM and mm! Month=MM, not mm!
// Examples:
//  "MMM d, y" matches: January 01, 2000
//                      Dec 1, 1900
//                      Nov 20, 00
//  "M/d/yy"   matches: 01/20/00
//                      9/2/00
//  "MMM dd, yyyy hh:mm:ssa" matches: "January 01, 2000 12:30:45AM"
//Wednesday, 6 May, 2009 EE, d MMM, yyyy
// ------------------------------------------------------------------

var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
function LZ(x) {return(x<0||x>9?"":"0")+x}

// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
        var digits="1234567890";
        for (var i=0; i < val.length; i++) {
                if (digits.indexOf(val.charAt(i))==-1) { return false; }
                }
        return true;
        }
function _getInt(str,i,minlength,maxlength) {
        for (var x=maxlength; x>=minlength; x--) {
                var token=str.substring(i,i+x);
                if (token.length < minlength) { return null; }
                if (_isInteger(token)) { return token; }
                }
        return null;
        }

// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//


// ------------------------------------------------------------------
function getDateFromFormat(val,format) {
        val=val+"";
        format=format+"";
        var i_val=0;
        var i_format=0;
        var c="";
        var token="";
        var token2="";
        var x,y;
        var now=new Date();
        var year=now.getYear();
        var month=now.getMonth()+1;
        var date=1;
       var hh=now.getHours();
        //var mm=now.getMinutes();
        //var ss=now.getSeconds();

        var mm=0;
        var ss=0;
        var ampm="";

        while (i_format < format.length) {
                // Get next token from format string
                c=format.charAt(i_format);
                token="";
                while ((format.charAt(i_format)==c) && (i_format < format.length)) {
                        token += format.charAt(i_format++);
                        }
                // Extract contents of value based on format token
                if (token=="yyyy" || token=="yy" || token=="y") {
                        if (token=="yyyy") { x=4;y=4; }
                        if (token=="yy")   { x=2;y=2; }
                        if (token=="y")    { x=2;y=4; }
                        year=_getInt(val,i_val,x,y);
                        if (year==null) { return 0; }
                        i_val += year.length;
                        if (year.length==2) {
                                if (year > 70) { year=1900+(year-0); }
                                else { year=2000+(year-0); }
                                }
                        }
                else if (token=="MMM"||token=="NNN"){
                        month=0;
                        for (var i=0; i<MONTH_NAMES.length; i++) {
                                var month_name=MONTH_NAMES[i];
                                if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
                                        if (token=="MMM"||(token=="NNN"&&i>11)) {
                                                month=i+1;
                                                if (month>12) { month -= 12; }
                                                i_val += month_name.length;
                                                break;
                                                }
                                        }
                                }
                        if ((month < 1)||(month>12)){return 0;}
                        }
                else if (token=="EE"||token=="E"){
                        for (var i=0; i<DAY_NAMES.length; i++) {
                                var day_name=DAY_NAMES[i];
                                if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
                                        i_val += day_name.length;
                                        break;
                                        }
                                }
                        }
                else if (token=="MM"||token=="M") {
                        month=_getInt(val,i_val,token.length,2);
                        if(month==null||(month<1)||(month>12)){return 0;}
                        i_val+=month.length;}
                else if (token=="dd"||token=="d") {
                        date=_getInt(val,i_val,token.length,2);
                        if(date==null||(date<1)||(date>31)){return 0;}
                        i_val+=date.length;}
                else if (token=="hh"||token=="h") {
                        hh=_getInt(val,i_val,token.length,2);
                        if(hh==null||(hh<1)||(hh>12)){return 0;}
                        i_val+=hh.length;}
                else if (token=="HH"||token=="H") {
                        hh=_getInt(val,i_val,token.length,2);
                        if(hh==null||(hh<0)||(hh>23)){return 0;}
                        i_val+=hh.length;}
                else if (token=="KK"||token=="K") {
                        hh=_getInt(val,i_val,token.length,2);
                        if(hh==null||(hh<0)||(hh>11)){return 0;}
                        i_val+=hh.length;}
                else if (token=="kk"||token=="k") {
                        hh=_getInt(val,i_val,token.length,2);
                        if(hh==null||(hh<1)||(hh>24)){return 0;}
                        i_val+=hh.length;hh--;}
                else if (token=="mm"||token=="m") {
                        mm=_getInt(val,i_val,token.length,2);
                        if(mm==null||(mm<0)||(mm>59)){return 0;}
                        i_val+=mm.length;}
                else if (token=="ss"||token=="s") {
                        ss=_getInt(val,i_val,token.length,2);
                        if(ss==null||(ss<0)||(ss>59)){return 0;}
                        i_val+=ss.length;}
                else if (token=="a") {
                        if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
                        else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
                        else {return 0;}
                        i_val+=2;}
                else {
                        if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
                        else {i_val+=token.length;}
                        }
                }
        // If there are any trailing characters left in the value, it doesn't match
        if (i_val != val.length) { return 0; }
        // Is date valid for month?
        if (month==2) {
                // Check for leap year
                if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
                        if (date > 29){ return 0; }
                        }
                else { if (date > 28) { return 0; } }
                }
        if ((month==4)||(month==6)||(month==9)||(month==11)) {
                if (date > 30) { return 0; }
                }
        // Correct hours value
        if (hh<12 && ampm=="PM") { hh=hh-0+12; }
        else if (hh>11 && ampm=="AM") { hh-=12; }
        var newdate=new Date(year,month-1,date,hh,mm,ss);
        return newdate;
        }

        // ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
//  note 4 digit year is yyyy not YYYY
// ------------------------------------------------------------------
function formatDate(date,format) {
        format=format+"";
        var result="";
        var i_format=0;
        var c="";
        var token="";
        var y=date.getYear()+"";
        var M=date.getMonth()+1;
        var d=date.getDate();
        var E=date.getDay();
     //   var H=date.getHours();    // ttguy finds this function is out by one hour
        var H=date.getHours()-1;    //   make this change to try and fix this.
        var m=date.getMinutes();
        var s=date.getSeconds();
        var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
        // Convert real date parts into formatted versions
        var value=new Object();
        if (y.length < 4) {y=""+(y-0+1900);}
        value["y"]=""+y;
        value["yyyy"]=y;
        value["yy"]=y.substring(2,4);
        value["M"]=M;
        value["MM"]=LZ(M);
        value["MMM"]=MONTH_NAMES[M-1];
        value["NNN"]=MONTH_NAMES[M+11];
        value["d"]=d;
        value["dd"]=LZ(d);
        value["E"]=DAY_NAMES[E+7];
        value["EE"]=DAY_NAMES[E];
        value["H"]=H;
        value["HH"]=LZ(H);
        if (H==0){value["h"]=12;}
        else if (H>12){value["h"]=H-12;}
        else {value["h"]=H;}
        value["hh"]=LZ(value["h"]);
        if (H>11){value["K"]=H-12;} else {value["K"]=H;}
        value["k"]=H+1;
        value["KK"]=LZ(value["K"]);
        value["kk"]=LZ(value["k"]);
        if (H > 11) { value["a"]="PM"; }
        else { value["a"]="AM"; }
        value["m"]=m;
        value["mm"]=LZ(m);
        value["s"]=s;
        value["ss"]=LZ(s);
        while (i_format < format.length) {
                c=format.charAt(i_format);
                token="";
                while ((format.charAt(i_format)==c) && (i_format < format.length)) {
                        token += format.charAt(i_format++);
                        }
                if (value[token] != null) { result=result + value[token]; }
                else { result=result + token; }
                }
        return result;
        }

function modifyHref(hrefStr, newDate)
{
  var newHrefStr, dateStr;
  dateStr= formatDate(newDate,"yyyy-MM-dd");
  newHrefStr="javascript:gridSubmit('" + dateStr + hrefStr.substring( 33) ;
  return (newHrefStr) ;
}
function dateFromHrefStr(hrefStr)
{
  var dtStr, dtDate;
  // 0         1         2         3         4
  // 1234567890123456789012345678901234567890
  //"javascript:gridSubmit('2009-05-06', '3')"
  dtStr=hrefStr.substring( 23,33);
  dtDate =getDateFromFormat(  dtStr,"yyyy-MM-dd");
  return ( dtDate);
}
/*
On the grid pages on Your TV there are tabs above the grid for navigation.
These tabs are in fact <li> {list} objects.
These tabs contain links to different grid times to display - they display by having a javascript:gridSubmit()
command in the href of the link in the list.
This function creates a new <li> elements with new times to pass to javascript:gridSubmit
The dayIncrement parameter defines how many days different to the href string passed in as the plus24hrefStr
We call this function to create new list elements to add to the tabs at the top of the grid to supply extra navigation 
items
*/
function createNewList (plus24hrefStr, dayIncrement)
{
  var  newHref, newLink, newList,plus24Date, newDate, newDtStr,newDtStrDay;

   plus24Date= dateFromHrefStr(plus24hrefStr);// extract a date out of the plus24hrefSt
   newDate=new Date();
   newDate.setDate(plus24Date.getDate() + dayIncrement);  // adjust the date by dayIncrement. Can be -ve
   newDtStrDay =   formatDate(  newDate, "E");  // The day as a Short Name
   newDtStr = formatDate(  newDate, "E dd NNN yy"); // The Date
   newHref=  modifyHref( plus24hrefStr, newDate)  ;  // generate a new href string using the new date
      // create a newLink element
   newLink= document.createElement("a");
   newLink.setAttribute("href",newHref);
   newLink.setAttribute("title",  newDtStr);   // this appears in the tool tip
   newLink.appendChild(document.createTextNode(newDtStrDay) );
   // create a new List element
   newList=document.createElement("li");
   newList.setAttribute("class", "tab");
   newList.appendChild( newLink);
   return (newList);
}

function createToppyWebList ()
{
  var  newHref, newLink, newList;

   newHref= TOPPYWEBURL ;
      // create a newLink element
   newLink= document.createElement("a");
   newLink.setAttribute("href",newHref);
   newLink.setAttribute("title",  "Toppy Web");   // this appears in the tool tip
   newLink.appendChild(document.createTextNode("ToppyWeb") );
   // create a new List element
   newList=document.createElement("li");
   newList.setAttribute("class", "tab");
   newList.appendChild( newLink);
   return (newList);
}

/*****************************************************

        Main

*******************************************************/



  var spans, strongs,Divs , tables, TabDiv,  TheDiv, lists ,newList,newList2,newList3,  plus24List, plus24Link,plus24Href;
  var HeadingDiv,dateDisplayed;

//    spans= document.getElementsByTagName("span")     ;

  /*
  for ( i=0; i < spans.length; i++) {
    spans[i].innerHTML +=  " span #" + i  ;
   }
    */

  //    strongs= document.getElementsByTagName("strong")     ;
    // strong zero has the date we are displaying eg  Morning - Wednesday, 6 May, 2009
 // dateDisplayed=GetDateDisplayed( strongs[0].textContent);
  /*
  for ( i=0; i < strongs.length; i++) {
    strongs[i].innerHTML +=  " strong #" + i  ;
   }
   */
 //  tables= document.getElementsByTagName("table")     ;

   /*
    for ( i=0; i < tables.length; i++) {
   tables[i].innerHTML +=  "<tr> <td> table  num" + i + "</tr><td>"  ;

   }
   */
   Divs= document.getElementsByTagName("div")     ;
   HeadingDiv=Divs[77];   // #228 might be a usefull Div to output to
  //for ( i=0; i < Divs.length; i++) {
  // Divs[i].innerHTML +=  " div #" + i  ;
   //}

   TabDiv = document.getElementById("showhead_wrap") ;

   //TabDiv.innerHTML += "TabDiv"  ;
   Divs=TabDiv.getElementsByTagName("div")   ;
   TheDiv= Divs[0];
   //TheDiv.innerHTML += "The div"  ;
   lists=TheDiv.getElementsByTagName("li")   ;

   plus24List= lists[5];
   plus24Link=  (plus24List.getElementsByTagName("a"))[0];
   plus24Href= plus24Link.getAttribute("href")  ;
   // <li class="tab"><a href="javascript:gridSubmit('2009-05-06', '3')" title="Next 48 hours">+24 &gt;&gt;</a></li>

   newList= createNewList(plus24Href,+1);

   TheDiv.appendChild(newList);
   newList2= createNewList(plus24Href,-3); // substract 3 days from the Plus 24 date to get -48 hrs
   TheDiv.insertBefore (newList2,lists[0]);   // this puts at the begining
   newList3= createNewList(plus24Href,+2);
   TheDiv.appendChild(newList3);
   if (TOPPYWEBURL!="")
   {
      newList4=createToppyWebList();
      TheDiv.appendChild(newList4);
   }
   //  HeadingDiv.innerHTML=  strongs[0].textContent;
   /*
   yourtv has 4 numbered timer ranges that you can navigate around
   Early hours - 1
   Morning - 2
   Afternoon/Evening - 3
   Night/Primetime - 4
   if number of <li> =4
    guide from past   On now/next list #0  For the rest of today list #1   # +6 >> list #2 # +24 >> list #3

    guide near the end # << -24 list #0 # << -6 list #1 # On now/next list #2 # For the rest of today list #3

   if number of <li> =5
 at begining of week  << -6" list #0 # On now/next list #1 # For the rest of today list #2 # +6 >> list #3 # +24 >> list #4
 at end of week  << -24 list #0 << -6 list #1 On now/next list #2   For the rest of today list #3  # +6 >> list #4

   if number of <li> =6
   #  << -24 list #0  # << -6 list #1  # On now/next list #2 # For the rest of today list #3 # +6 >> list #4 # +24 >> list #5

   */
 //   for ( i=0; i < lists.length; i++) {
  // lists[i].innerHTML +=  " list #" + i  ;
  // }

  // for ( i=0; i < Divs.length; i++) {
//   Divs[i].innerHTML +=  " div #" + i  ;
 //  }
//    div 81 is the tabs with the date navigation
 //   div #77 is the TV Guide heading




