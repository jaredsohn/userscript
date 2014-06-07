// ==UserScript==
// @name           XNXX Min Vid Length
// @namespace      http://video.xnxx.com
// @description    Now working - SHOW ONLY VIDEOS OVER A MINIMUM LENGTH OF MINUTES - Working !!!
// @include        http://video.xnxx.com/*
// @include        http://video.xnxx.com/
// ==/UserScript==

// FIXED - SHOW ONLY VIDEOS OVER A MINIMUM LENGTH OF MINUTES

// SET THE MINIMUM NUMBER OF MINUTES HERE (default is 10 minutes)
var minlen = 10;

// this section finds the video files

var regexp1 = /([0-9]{1,2} min)/;
var regexp2 = /([0-9]{1,2}h [0-9]{1,2} min)/;

// this section removes the videos < minlen

x=document.getElementsByTagName("td");
for (i=0;i<x.length;i++)
{
 if ( x[i].getAttribute("width") == "183" ) {

  res1 = x[i].getElementsByTagName("font")[0].innerHTML.match(regexp1);
  res2 = x[i].getElementsByTagName("font")[0].innerHTML.match(regexp2); 
  if ( res1 != null ) {
   if ( parseInt(res1[0]) >= minlen ) {
    continue;
   }
  }
  if ( res2 != null ) {
   continue;
  }
  

  x[i].parentNode.removeChild(x[i]);

  /* tree has changed, references no longer valid */
  x=document.getElementsByTagName("td");
  /* only the last child in this search was removed */
  i--;
 }
}


// this section reorders the video cells so there are 4 in each row again


// go through each row manually, if it has less than 4, pull from next rows to fill it

// find the main td containing all the main tables
t=document.getElementsByTagName("td");
for (i=0;i<t.length;i++)
{
 if ( t[i].getAttribute("width") == "730" ) {
   td = t[i].getElementsByTagName("table");
   break;
 }
}

for (i=2;i<td.length-1;i++)
{
 // find number of td's in this table (each table has one row)
 x = td[i].getElementsByTagName("td");
 // if the row is empty just skip it (it won't be displayed anyway)
 if ( x.length < 4 && x.length != 0 ) {
  // need to pull elements from other rows


  found = true;
  while (x.length < 4 && found == true) {

   found = false;
   for (j=i+1; j<td.length-1;j++)
   {
    y = td[j].getElementsByTagName("td");
    if ( y.length != 0 ) {
     // it is not empty so pull an element from it
     x[0].parentNode.appendChild(y[0].cloneNode(true));
     y[0].parentNode.removeChild(y[0]);
     found = true;
     break;
    }
   }

  }


 }
}